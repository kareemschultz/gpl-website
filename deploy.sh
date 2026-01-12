#!/bin/bash
# GPL Website VPS Deployment Script
# Usage: ./deploy.sh [environment]
# Example: ./deploy.sh production

set -e  # Exit on any error

# Configuration
ENVIRONMENT=${1:-production}
PROJECT_NAME="gpl-website"
BACKUP_DIR="backups"
LOG_FILE="deploy.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a $LOG_FILE
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

# Check if environment file exists
check_env_file() {
    if [ ! -f ".env.${ENVIRONMENT}" ]; then
        error "Environment file .env.${ENVIRONMENT} not found!"
    fi
    log "Environment file .env.${ENVIRONMENT} found"
}

# Create backup directory
create_backup_dir() {
    mkdir -p $BACKUP_DIR
    log "Backup directory created/verified"
}

# Backup database (if running)
backup_database() {
    if docker-compose ps postgres | grep -q "Up"; then
        log "Creating database backup..."
        BACKUP_FILE="${BACKUP_DIR}/db_backup_$(date +%Y%m%d_%H%M%S).sql"
        docker-compose exec -T postgres pg_dump -U ${POSTGRES_USER:-gpl_user} ${POSTGRES_DB:-gpl_website} > $BACKUP_FILE
        success "Database backup created: $BACKUP_FILE"
    else
        log "Database not running, skipping backup"
    fi
}

# Pull latest code (if in git repo)
pull_latest_code() {
    if [ -d ".git" ]; then
        log "Pulling latest code from git..."
        git pull origin main
        success "Latest code pulled"
    else
        log "Not a git repository, skipping code pull"
    fi
}

# Build new Docker images
build_images() {
    log "Building Docker images..."
    docker-compose --env-file .env.${ENVIRONMENT} build --no-cache app
    success "Docker images built successfully"
}

# Stop existing containers
stop_containers() {
    log "Stopping existing containers..."
    docker-compose --env-file .env.${ENVIRONMENT} down
    success "Containers stopped"
}

# Start containers
start_containers() {
    log "Starting containers..."
    docker-compose --env-file .env.${ENVIRONMENT} up -d
    success "Containers started"
}

# Wait for services to be healthy
wait_for_health() {
    log "Waiting for services to be healthy..."
    
    # Wait for postgres
    timeout 60 bash -c 'until docker-compose exec postgres pg_isready -U ${POSTGRES_USER:-gpl_user}; do sleep 2; done'
    
    # Wait for app to respond
    timeout 120 bash -c 'until curl -f http://localhost:${APP_PORT:-3000}/health 2>/dev/null; do sleep 5; done'
    
    success "All services are healthy"
}

# Run database migrations
run_migrations() {
    log "Running database migrations..."
    docker-compose --env-file .env.${ENVIRONMENT} exec app bun run db:migrate
    success "Database migrations completed"
}

# Cleanup old images
cleanup_images() {
    log "Cleaning up old Docker images..."
    docker image prune -f
    success "Docker cleanup completed"
}

# Show deployment status
show_status() {
    log "Deployment Status:"
    echo "===================="
    docker-compose --env-file .env.${ENVIRONMENT} ps
    echo ""
    log "Application logs (last 20 lines):"
    echo "=================================="
    docker-compose --env-file .env.${ENVIRONMENT} logs --tail=20 app
}

# Main deployment function
deploy() {
    log "Starting deployment for environment: $ENVIRONMENT"
    log "=================================================="
    
    check_env_file
    create_backup_dir
    backup_database
    pull_latest_code
    build_images
    stop_containers
    start_containers
    wait_for_health
    run_migrations
    cleanup_images
    show_status
    
    success "🚀 Deployment completed successfully!"
    log "=================================================="
    
    # Show useful commands
    echo ""
    echo "📋 Useful commands:"
    echo "  View logs:     docker-compose --env-file .env.${ENVIRONMENT} logs -f app"
    echo "  Restart:       docker-compose --env-file .env.${ENVIRONMENT} restart app"
    echo "  Stop all:      docker-compose --env-file .env.${ENVIRONMENT} down"
    echo "  Database:      docker-compose --env-file .env.${ENVIRONMENT} exec postgres psql -U \${POSTGRES_USER} \${POSTGRES_DB}"
    echo ""
}

# Rollback function
rollback() {
    warning "Rolling back to previous version..."
    
    # Find latest backup
    LATEST_BACKUP=$(ls -t $BACKUP_DIR/db_backup_*.sql 2>/dev/null | head -n 1)
    
    if [ -z "$LATEST_BACKUP" ]; then
        error "No database backup found for rollback!"
    fi
    
    # Stop current containers
    docker-compose --env-file .env.${ENVIRONMENT} down
    
    # Restore database
    log "Restoring database from: $LATEST_BACKUP"
    docker-compose --env-file .env.${ENVIRONMENT} up -d postgres
    sleep 10
    docker-compose --env-file .env.${ENVIRONMENT} exec -T postgres psql -U ${POSTGRES_USER:-gpl_user} ${POSTGRES_DB:-gpl_website} < $LATEST_BACKUP
    
    # Start containers with previous image (you might need to implement image tagging for this)
    docker-compose --env-file .env.${ENVIRONMENT} up -d
    
    success "Rollback completed"
}

# Handle script arguments
case "${1:-deploy}" in
    deploy|production|staging|development)
        deploy
        ;;
    rollback)
        rollback
        ;;
    status)
        show_status
        ;;
    *)
        echo "Usage: $0 {deploy|rollback|status|production|staging|development}"
        echo "  deploy/production: Deploy to production"
        echo "  rollback: Rollback to previous version"
        echo "  status: Show current deployment status"
        exit 1
        ;;
esac