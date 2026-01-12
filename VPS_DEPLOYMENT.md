# 🚀 GPL Website VPS Deployment Guide

Complete guide for deploying your GPL Website to any VPS (Ubuntu/Debian/CentOS) with Docker.

## 📋 Table of Contents

- [🔧 Prerequisites](#-prerequisites)
- [⚡ Quick Start (5 minutes)](#-quick-start-5-minutes)
- [🔐 Security Setup](#-security-setup)
- [📦 Full Installation](#-full-installation)
- [🚀 Deployment](#-deployment)
- [📊 Monitoring](#-monitoring)
- [🔧 Maintenance](#-maintenance)
- [🆘 Troubleshooting](#-troubleshooting)

---

## 🔧 Prerequisites

### VPS Requirements
- **CPU**: 2+ cores (4+ recommended)
- **RAM**: 2GB+ (4GB+ recommended)
- **Storage**: 20GB+ SSD
- **OS**: Ubuntu 20.04+, Debian 11+, or CentOS 8+
- **Network**: Public IP with ports 80, 443, and 22 open

### Domain Setup
- Domain name pointing to your VPS IP
- DNS A record: `your-domain.com → YOUR_VPS_IP`
- Optional: `www.your-domain.com → YOUR_VPS_IP`

---

## ⚡ Quick Start (5 minutes)

### 1. Connect to Your VPS
```bash
ssh root@YOUR_VPS_IP
```

### 2. Install Docker & Dependencies (One Command)
```bash
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh && \
sudo usermod -aG docker $USER && \
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
sudo chmod +x /usr/local/bin/docker-compose && \
sudo apt update && sudo apt install -y git curl nano
```

### 3. Clone & Configure
```bash
git clone https://github.com/yourusername/gpl-website.git
cd gpl-website
cp .env.production .env.production.local
nano .env.production.local  # Edit your configuration
```

### 4. Deploy!
```bash
./deploy.sh production
```

**🎉 Your site will be live at `http://YOUR_VPS_IP:3000`**

---

## 🔐 Security Setup

### 1. Create Non-Root User
```bash
# Create user
adduser gpl
usermod -aG sudo,docker gpl

# Copy SSH keys
mkdir /home/gpl/.ssh
cp ~/.ssh/authorized_keys /home/gpl/.ssh/
chown -R gpl:gpl /home/gpl/.ssh
chmod 700 /home/gpl/.ssh
chmod 600 /home/gpl/.ssh/authorized_keys

# Switch to new user
su - gpl
```

### 2. Secure SSH
```bash
sudo nano /etc/ssh/sshd_config
```

Add/modify these lines:
```
PermitRootLogin no
PasswordAuthentication no
Port 2222  # Optional: change SSH port
```

Restart SSH:
```bash
sudo systemctl restart ssh
```

### 3. Setup Firewall
```bash
sudo ufw allow 2222/tcp  # SSH (if you changed port)
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

---

## 📦 Full Installation

### 1. System Updates
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nano htop unzip software-properties-common
```

### 2. Install Docker
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### 3. Install Node.js & Bun (for local development)
```bash
# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

### 4. Clone Project
```bash
cd /home/gpl
git clone https://github.com/yourusername/gpl-website.git
cd gpl-website
```

---

## 🚀 Deployment

### 1. Environment Configuration
```bash
# Copy production environment template
cp .env.production .env.production.local

# Edit configuration
nano .env.production.local
```

**Essential variables to update:**
```bash
DOMAIN=your-domain.com
POSTGRES_PASSWORD=your_secure_password_123
BETTER_AUTH_SECRET=generate_64_character_random_string
GITHUB_CLIENT_ID=your_github_oauth_app_id
GITHUB_CLIENT_SECRET=your_github_oauth_secret
RESEND_API_KEY=your_resend_api_key
ACME_EMAIL=your-email@domain.com
```

### 2. Generate Secure Secrets
```bash
# Generate secure password for PostgreSQL
openssl rand -base64 32

# Generate Better Auth secret
openssl rand -hex 32
```

### 3. OAuth App Setup

#### GitHub OAuth App:
1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: GPL Website
   - **Homepage URL**: `https://your-domain.com`
   - **Authorization callback URL**: `https://your-domain.com/auth/callback/github`
4. Copy Client ID and Client Secret to your `.env.production.local`

#### Resend Email API:
1. Go to https://resend.com
2. Create account and get API key
3. Add to `.env.production.local`

### 4. Deploy Application
```bash
# Make deploy script executable
chmod +x deploy.sh

# Deploy to production
./deploy.sh production
```

### 5. Setup SSL with Let's Encrypt (Automatic via Traefik)
Your SSL certificates will be automatically generated via Traefik and Let's Encrypt!

---

## 📊 Monitoring

### View Application Logs
```bash
# Real-time logs
docker-compose --env-file .env.production.local logs -f app

# All service logs
docker-compose --env-file .env.production.local logs -f

# Database logs
docker-compose --env-file .env.production.local logs -f postgres
```

### Check Container Status
```bash
./deploy.sh status
```

### Monitor Resources
```bash
# System resources
htop

# Docker container stats
docker stats

# Disk usage
df -h
du -sh /home/gpl/gpl-website
```

### Database Access
```bash
# Connect to PostgreSQL
docker-compose --env-file .env.production.local exec postgres psql -U gpl_user gpl_website

# Database backup
docker-compose --env-file .env.production.local exec postgres pg_dump -U gpl_user gpl_website > backup.sql

# Database restore
docker-compose --env-file .env.production.local exec -T postgres psql -U gpl_user gpl_website < backup.sql
```

---

## 🔧 Maintenance

### Update Application
```bash
# Pull latest code and deploy
git pull origin main
./deploy.sh production
```

### Rollback Deployment
```bash
./deploy.sh rollback
```

### Backup Database
```bash
# Manual backup
mkdir -p backups
docker-compose exec postgres pg_dump -U gpl_user gpl_website > backups/backup_$(date +%Y%m%d_%H%M%S).sql
```

### Update System
```bash
sudo apt update && sudo apt upgrade -y
sudo reboot  # If kernel updates
```

### Cleanup Docker
```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Complete cleanup
docker system prune -a
```

---

## 🆘 Troubleshooting

### Application Won't Start
```bash
# Check logs
docker-compose --env-file .env.production.local logs app

# Check environment variables
docker-compose --env-file .env.production.local config

# Restart containers
docker-compose --env-file .env.production.local restart
```

### Database Connection Issues
```bash
# Check database status
docker-compose --env-file .env.production.local exec postgres pg_isready -U gpl_user

# Reset database
docker-compose --env-file .env.production.local down
docker volume rm gpl-website_postgres_data
./deploy.sh production
```

### SSL Certificate Issues
```bash
# Check Traefik logs
docker-compose --env-file .env.production.local logs traefik

# Regenerate certificates
docker-compose --env-file .env.production.local down
docker volume rm gpl-website_traefik_acme
docker-compose --env-file .env.production.local up -d
```

### Port Already in Use
```bash
# Find what's using the port
sudo netstat -tlnp | grep :3000

# Kill the process
sudo kill -9 PID_NUMBER
```

### Memory Issues
```bash
# Check memory usage
free -h

# Restart services to free memory
docker-compose --env-file .env.production.local restart

# Add swap if needed (2GB)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 🔧 Advanced Configuration

### Custom Domain with Traefik
Already configured! Just update the `DOMAIN` in your `.env.production.local`

### Multiple Environments
Create additional environment files:
```bash
cp .env.production .env.staging
# Edit .env.staging with staging configuration
./deploy.sh staging
```

### Backup Automation
Add to crontab:
```bash
crontab -e
# Add line for daily backup at 2 AM:
0 2 * * * cd /home/gpl/gpl-website && docker-compose exec postgres pg_dump -U gpl_user gpl_website > backups/auto_backup_$(date +\%Y\%m\%d).sql
```

---

## 🎯 Performance Optimization

### Enable Gzip Compression
Already enabled in Traefik configuration!

### Database Performance
```sql
-- Connect to database and run:
-- Optimize PostgreSQL for your VPS size
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
SELECT pg_reload_conf();
```

### Monitor Application Performance
- Use the built-in error tracking with Sentry
- Monitor PostgreSQL with `pg_stat_statements`
- Use Redis for caching frequently accessed data

---

## 📞 Support

If you run into issues:

1. Check the logs: `docker-compose logs -f app`
2. Verify environment variables: `docker-compose config`
3. Check system resources: `htop` and `df -h`
4. Review this troubleshooting guide
5. Check the project repository for updates

**🎉 Happy deploying! Your GPL Website should now be running smoothly on your VPS.**