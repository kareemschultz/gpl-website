# VPS Deployment Guide - GPL Website

## Prerequisites

### VPS Requirements
- Ubuntu 20.04+ or Debian 11+ 
- 2GB RAM minimum (4GB recommended)
- 20GB storage minimum
- Domain name pointing to your VPS IP
- SSH access with sudo privileges

### Required Software
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Install Git
sudo apt install git -y
```

## Deployment Steps

### 1. Clone and Setup Project
```bash
# Clone the project
git clone <your-repo-url> gpl-website
cd gpl-website

# Make deployment script executable
chmod +x deploy.sh
```

### 2. Configure Environment
```bash
# Copy and edit production environment
cp .env.production .env

# Edit the environment file with your actual values
nano .env
```

**Required Environment Variables:**
```bash
# Database
DATABASE_URL="postgresql://gpl_user:your_secure_password@postgres:5432/gpl_website"

# Authentication
BETTER_AUTH_SECRET="your-64-char-random-secret"
BETTER_AUTH_URL="https://your-domain.com"

# OAuth (Optional - configure providers you want)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Email (Optional - for email auth)
RESEND_API_KEY="your_resend_api_key"
EMAIL_FROM="noreply@your-domain.com"

# Domain
DOMAIN="your-domain.com"
```

### 3. Configure DNS
Point your domain to your VPS IP address:
```
A record: your-domain.com -> YOUR_VPS_IP
A record: www.your-domain.com -> YOUR_VPS_IP
```

### 4. Deploy
```bash
# Run the deployment script
./deploy.sh
```

The script will:
- Build the Docker images
- Set up the database
- Configure Traefik with automatic SSL
- Start all services
- Run health checks

### 5. Verify Deployment
```bash
# Check all services are running
docker compose ps

# Check logs
docker compose logs app
docker compose logs traefik
docker compose logs postgres

# Test the application
curl -I https://your-domain.com
```

## Production Monitoring

### Health Checks
```bash
# Application health
curl https://your-domain.com/api/health

# Database connection
docker compose exec postgres pg_isready -U gpl_user

# View real-time logs
docker compose logs -f app
```

### Backup Database
```bash
# Create backup
docker compose exec postgres pg_dump -U gpl_user gpl_website > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
docker compose exec -T postgres psql -U gpl_user gpl_website < backup_file.sql
```

### Update Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker compose down
docker compose build --no-cache
docker compose up -d

# Or use the deploy script
./deploy.sh
```

## Security Considerations

### Firewall Setup
```bash
# Configure UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### SSL Certificate
- Traefik automatically handles SSL certificates via Let's Encrypt
- Certificates are stored in `./letsencrypt` directory
- Automatic renewal is configured

### Security Headers
The application includes security headers:
- HTTPS enforcement
- HSTS headers
- Content Security Policy
- X-Frame-Options

## Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Check what's using port 80/443
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Stop conflicting services
sudo systemctl stop apache2 nginx
```

**SSL Certificate Issues:**
```bash
# Check certificate status
docker compose logs traefik | grep -i acme

# Force certificate refresh
docker compose down
sudo rm -rf ./letsencrypt
docker compose up -d
```

**Database Connection Issues:**
```bash
# Check database logs
docker compose logs postgres

# Connect to database directly
docker compose exec postgres psql -U gpl_user gpl_website
```

**Application Won't Start:**
```bash
# Check application logs
docker compose logs app

# Rebuild without cache
docker compose build --no-cache app
docker compose up -d
```

### Performance Optimization

**Database Performance:**
```bash
# Monitor database performance
docker compose exec postgres psql -U gpl_user gpl_website -c "SELECT * FROM pg_stat_activity;"
```

**Memory Usage:**
```bash
# Check container memory usage
docker stats

# If memory issues, increase VPS RAM or optimize containers
```

## Maintenance

### Regular Tasks
- Weekly database backups
- Monthly security updates
- Monitor disk space and logs
- Check SSL certificate status

### Log Rotation
```bash
# Configure log rotation for Docker
sudo nano /etc/docker/daemon.json

{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}

sudo systemctl restart docker
```

## Support

For issues or questions:
1. Check application logs: `docker compose logs app`
2. Check system resources: `htop`
3. Verify environment configuration
4. Review this documentation

## Architecture Overview

```
Internet
    ↓
Traefik Proxy (Port 80/443)
    ↓
gpl-website App (Port 3000)
    ↓
PostgreSQL Database (Port 5432)
    ↓
Redis Cache (Port 6379)
```

All services run in Docker containers with automatic restarts and health monitoring.