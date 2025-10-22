# Deploy St. Louis Demo JHS to Bibiniifarms Droplet

## Your Droplet Details
- **IP Address**: 167.71.42.43
- **OS**: Debian 13 x64
- **Memory**: 512 MB
- **Disk**: 10 GB

## Quick Deployment Steps

### Step 1: Connect to Your Droplet

Click "Launch Droplet Console" in DigitalOcean or use SSH:

```bash
ssh root@167.71.42.43
```

### Step 2: Initial Server Setup

Run these commands in your droplet console:

```bash
# Update system
apt update && apt upgrade -y

# Install Nginx
apt install nginx -y

# Install Certbot for SSL
apt install certbot python3-certbot-nginx -y

# Create website directory
mkdir -p /var/www/stlouisdemojhs
```

### Step 3: Configure Nginx

Create the Nginx configuration:

```bash
nano /etc/nginx/sites-available/stlouisdemojhs
```

Paste this configuration (press Ctrl+Shift+V to paste):

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name stlouisdemojhs.com www.stlouisdemojhs.com;
    
    # Temporary: serve site on HTTP until SSL is set up
    root /var/www/stlouisdemojhs;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Save and exit (Ctrl+X, then Y, then Enter).

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

### Step 4: Update DNS (Do this NOW)

Go to your domain registrar and add these DNS records:

```
Type: A
Name: @
Value: 167.71.42.43
TTL: 3600

Type: A
Name: www
Value: 167.71.42.43
TTL: 3600
```

Wait 5-10 minutes for DNS to propagate.

### Step 5: Deploy Your Site from Local Machine

On your Windows machine, open PowerShell in your project folder:

```powershell
# Build the site
npm run build

# Upload to droplet (you'll be asked for password)
scp -r dist/* root@167.71.42.43:/var/www/stlouisdemojhs/
```

Or use the deploy script:

```powershell
# Make script executable (Git Bash)
chmod +x deploy.sh

# Run deployment
./deploy.sh 167.71.42.43
```

### Step 6: Set Permissions (on droplet)

```bash
chown -R www-data:www-data /var/www/stlouisdemojhs
chmod -R 755 /var/www/stlouisdemojhs
```

### Step 7: Get SSL Certificate (after DNS propagates)

Wait until your domain points to the droplet, then:

```bash
# Get SSL certificate
certbot --nginx -d stlouisdemojhs.com -d www.stlouisdemojhs.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS
```

Certbot will automatically update your Nginx config with SSL.

### Step 8: Enable Firewall

```bash
# Allow SSH, HTTP, HTTPS
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## Performance Optimization for 512MB RAM

Since your droplet has limited RAM, let's optimize:

```bash
# Edit Nginx config
nano /etc/nginx/nginx.conf
```

Find and update these values:

```nginx
worker_processes 1;
worker_connections 512;
keepalive_timeout 15;
```

Save and restart:

```bash
systemctl restart nginx
```

## Automated Deployment

After initial setup, deploy updates with:

```bash
# On your local machine
npm run build
scp -r dist/* root@167.71.42.43:/var/www/stlouisdemojhs/
```

## Verify Deployment

1. Visit: http://167.71.42.43 (should show your site)
2. After DNS: http://stlouisdemojhs.com
3. After SSL: https://www.stlouisdemojhs.com

## Troubleshooting

### Site not loading?
```bash
# Check Nginx status
systemctl status nginx

# View logs
tail -f /var/log/nginx/error.log
```

### Need to restart Nginx?
```bash
systemctl restart nginx
```

### Check disk space?
```bash
df -h
```

## Monitoring

```bash
# Check memory usage
free -h

# Check CPU usage
top

# Check Nginx logs
tail -f /var/log/nginx/access.log
```

## Cost Estimate

- Droplet: $6/month (512MB)
- Domain: Already owned
- SSL: Free (Let's Encrypt)
- **Total: $6/month**

## Next Steps

1. ✅ Set up DNS records
2. ✅ Deploy site
3. ✅ Get SSL certificate
4. 🔄 Set up automatic backups (DigitalOcean Backups: +$1.20/month)
5. 🔄 Add Cloudflare CDN (Free tier available)

## Support

If you need help, check:
- Nginx logs: `/var/log/nginx/error.log`
- System logs: `journalctl -xe`
- Disk space: `df -h`
- Memory: `free -h`
