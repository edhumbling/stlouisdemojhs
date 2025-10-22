#!/bin/bash

# DigitalOcean Deployment Script for St. Louis Demo JHS
# Usage: ./deploy.sh YOUR_DROPLET_IP

if [ -z "$1" ]; then
    echo "❌ Error: Please provide droplet IP address"
    echo "Usage: ./deploy.sh YOUR_DROPLET_IP"
    exit 1
fi

DROPLET_IP=$1
DEPLOY_PATH="/var/www/stlouisdemojhs"

echo "🚀 Starting deployment to DigitalOcean..."
echo "📍 Target: $DROPLET_IP"
echo ""

# Build the site
echo "🔨 Building production site..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Upload to server
echo "📦 Uploading files to server..."
rsync -avz --delete --progress dist/ root@$DROPLET_IP:$DEPLOY_PATH/

if [ $? -ne 0 ]; then
    echo "❌ Upload failed!"
    exit 1
fi

echo "✅ Upload successful!"
echo ""

# Set permissions
echo "🔧 Setting permissions..."
ssh root@$DROPLET_IP "chown -R www-data:www-data $DEPLOY_PATH && chmod -R 755 $DEPLOY_PATH"

if [ $? -ne 0 ]; then
    echo "⚠️  Warning: Could not set permissions"
fi

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site should be live at: https://www.stlouisdemojhs.com"
echo ""
