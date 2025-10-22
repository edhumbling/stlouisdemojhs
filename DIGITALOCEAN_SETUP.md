# DigitalOcean Deployment Guide for St. Louis Demo JHS

## Prerequisites
- DigitalOcean Droplet (Ubuntu 22.04 LTS recommended)
- Domain DNS pointing to droplet IP
- SSH access to droplet

## Step 1: Initial Server Setup

```bash
# SSH into your droplet
ssh root@YOUR_DROPLET_IP

# Update system
apt update && apt upgrade -y

# Install Nginx
apt install nginx -y

# Install Node.js (for build if needed)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install nodejs -y

# Install Certbot for SSL
apt install certbot python3-certbot-nginx -y
```

## Step 2: Configure Nginx

Create Nginx config:

```bash
nano /etc/nginx/sites-available/stlouisdemojhs
```

Paste this configuration:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name stlouisdemojhs.com www.stlouisdemojhs.com;
    return 301 https://www.stlouisdemojhs.com$request_uri;
}

# Redirect non-www to www
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name stlouisdemojhs.com;
    
    ssl_certificate /etc/letsencrypt/live/stlouisdemojhs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/stlouisdemojhs.com/privkey.pem;
    
    return 301 https://www.stlouisdemojhs.com$request_uri;
}

# Main server block
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.stlouisdemojhs.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/stlouisdemojhs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/stlouisdemojhs.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Root directory
    root /var/www/stlouisdemojhs;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # No cache for HTML and service worker
    location ~* \.(html)$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    location = /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Service-Worker-Allowed "/";
    }

    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

Enable the site:

```bash
# Create symlink
ln -s /etc/nginx/sites-available/stlouisdemojhs /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

## Step 3: Get SSL Certificate

```bash
# Get certificate (do this BEFORE uploading files)
certbot --nginx -d stlouisdemojhs.com -d www.stlouisdemojhs.com

# Auto-renewal (already set up by certbot)
certbot renew --dry-run
```

## Step 4: Deploy Your Site

On your local machine:

```bash
# Build the site
npm run build

# Upload to server (replace YOUR_DROPLET_IP)
scp -r dist/* root@YOUR_DROPLET_IP:/var/www/stlouisdemojhs/
```

Or use rsync for faster uploads:

```bash
rsync -avz --delete dist/ root@YOUR_DROPLET_IP:/var/www/stlouisdemojhs/
```

## Step 5: Set Permissions

On the server:

```bash
# Set proper ownership
chown -R www-data:www-data /var/www/stlouisdemojhs

# Set proper permissions
chmod -R 755 /var/www/stlouisdemojhs
```

## Step 6: Firewall Setup

```bash
# Allow SSH, HTTP, HTTPS
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## Automated Deployment Script

Create this script on your local machine:

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Building site..."
npm run build

echo "📦 Uploading to DigitalOcean..."
rsync -avz --delete dist/ root@YOUR_DROPLET_IP:/var/www/stlouisdemojhs/

echo "🔧 Setting permissions..."
ssh root@YOUR_DROPLET_IP "chown -R www-data:www-data /var/www/stlouisdemojhs && chmod -R 755 /var/www/stlouisdemojhs"

echo "✅ Deployment complete!"
```

Make it executable:

```bash
chmod +x deploy.sh
```

## Performance Optimizations

### Enable HTTP/2
Already enabled in the Nginx config above.

### Enable Brotli Compression (Optional)
```bash
apt install nginx-module-brotli -y
```

Add to Nginx config:
```nginx
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/javascript application/json image/svg+xml;
```

### CDN Integration (Optional)
Consider using Cloudflare in front of your droplet for:
- Global CDN
- DDoS protection
- Additional caching
- Free SSL

## Monitoring

```bash
# Check Nginx status
systemctl status nginx

# View Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Check SSL certificate expiry
certbot certificates
```

## Troubleshooting

### Site not loading?
```bash
# Check Nginx config
nginx -t

# Check if Nginx is running
systemctl status nginx

# Restart Nginx
systemctl restart nginx
```

### SSL issues?
```bash
# Renew certificate
certbot renew --force-renewal

# Restart Nginx
systemctl restart nginx
```

## Next Steps

1. Set up automatic deployments with GitHub Actions
2. Configure monitoring (Uptime Robot, etc.)
3. Set up backups
4. Configure CDN (Cloudflare recommended)

## Estimated Performance Improvement

- **Load time**: 40-60% faster than Firebase
- **TTFB**: < 100ms (vs 200-400ms on Firebase)
- **Global CDN**: Add Cloudflare for worldwide speed
- **Cost**: $6-12/month for droplet vs Firebase free tier limits
