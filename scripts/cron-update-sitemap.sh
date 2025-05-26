#!/bin/bash

# Cron job script for updating sitemap daily
# Add this to your crontab with: 0 2 * * * /path/to/your/project/scripts/cron-update-sitemap.sh

# Set script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Log file for cron job output
LOG_FILE="$PROJECT_DIR/logs/sitemap-update.log"

# Create logs directory if it doesn't exist
mkdir -p "$PROJECT_DIR/logs"

# Function to log with timestamp
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to send notification (optional - configure with your notification service)
send_notification() {
    local message="$1"
    local status="$2"
    
    # Example: Send to Slack webhook (uncomment and configure)
    # curl -X POST -H 'Content-type: application/json' \
    #   --data "{\"text\":\"🏫 St. Louis Demo JHS Sitemap Update: $message\"}" \
    #   "$SLACK_WEBHOOK_URL"
    
    # Example: Send email (uncomment and configure)
    # echo "$message" | mail -s "Sitemap Update - $status" admin@stlouisdemojhs.com
    
    log "Notification: $message"
}

# Start logging
log "🚀 Starting automated sitemap update process"

# Change to project directory
cd "$PROJECT_DIR" || {
    log "❌ Error: Could not change to project directory: $PROJECT_DIR"
    exit 1
}

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    log "❌ Error: Node.js is not installed or not in PATH"
    send_notification "Node.js not found - sitemap update failed" "ERROR"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    log "❌ Error: npm is not installed or not in PATH"
    send_notification "npm not found - sitemap update failed" "ERROR"
    exit 1
fi

# Check if the sitemap generation script exists
if [ ! -f "$PROJECT_DIR/scripts/generate-sitemap.js" ]; then
    log "❌ Error: Sitemap generation script not found"
    send_notification "Sitemap script missing - update failed" "ERROR"
    exit 1
fi

# Store current file checksums for comparison
SITEMAP_BEFORE=""
ROBOTS_BEFORE=""
LLMS_BEFORE=""

if [ -f "public/sitemap.xml" ]; then
    SITEMAP_BEFORE=$(md5sum "public/sitemap.xml" | cut -d' ' -f1)
fi

if [ -f "public/robots.txt" ]; then
    ROBOTS_BEFORE=$(md5sum "public/robots.txt" | cut -d' ' -f1)
fi

if [ -f "public/llms.txt" ]; then
    LLMS_BEFORE=$(md5sum "public/llms.txt" | cut -d' ' -f1)
fi

# Run the sitemap generation script
log "📝 Generating updated sitemap files..."

if npm run generate-sitemap >> "$LOG_FILE" 2>&1; then
    log "✅ Sitemap generation completed successfully"
else
    log "❌ Error: Sitemap generation failed"
    send_notification "Sitemap generation script failed" "ERROR"
    exit 1
fi

# Check for changes
CHANGES_DETECTED=false
CHANGED_FILES=()

# Check sitemap.xml
if [ -f "public/sitemap.xml" ]; then
    SITEMAP_AFTER=$(md5sum "public/sitemap.xml" | cut -d' ' -f1)
    if [ "$SITEMAP_BEFORE" != "$SITEMAP_AFTER" ]; then
        CHANGES_DETECTED=true
        CHANGED_FILES+=("sitemap.xml")
        log "📄 sitemap.xml updated"
    fi
fi

# Check robots.txt
if [ -f "public/robots.txt" ]; then
    ROBOTS_AFTER=$(md5sum "public/robots.txt" | cut -d' ' -f1)
    if [ "$ROBOTS_BEFORE" != "$ROBOTS_AFTER" ]; then
        CHANGES_DETECTED=true
        CHANGED_FILES+=("robots.txt")
        log "🤖 robots.txt updated"
    fi
fi

# Check llms.txt
if [ -f "public/llms.txt" ]; then
    LLMS_AFTER=$(md5sum "public/llms.txt" | cut -d' ' -f1)
    if [ "$LLMS_BEFORE" != "$LLMS_AFTER" ]; then
        CHANGES_DETECTED=true
        CHANGED_FILES+=("llms.txt")
        log "🧠 llms.txt updated"
    fi
fi

# Report results
if [ "$CHANGES_DETECTED" = true ]; then
    CHANGED_LIST=$(IFS=', '; echo "${CHANGED_FILES[*]}")
    log "🎉 Sitemap update completed successfully"
    log "📊 Updated files: $CHANGED_LIST"
    
    # Optional: Ping search engines
    log "🔔 Notifying search engines..."
    
    # Ping Google
    if curl -s "https://www.google.com/ping?sitemap=https://stlouisdemojhs.com/sitemap.xml" > /dev/null 2>&1; then
        log "✅ Google notified successfully"
    else
        log "⚠️ Warning: Failed to notify Google"
    fi
    
    # Ping Bing
    if curl -s "https://www.bing.com/ping?sitemap=https://stlouisdemojhs.com/sitemap.xml" > /dev/null 2>&1; then
        log "✅ Bing notified successfully"
    else
        log "⚠️ Warning: Failed to notify Bing"
    fi
    
    send_notification "Sitemap updated successfully - Files: $CHANGED_LIST" "SUCCESS"
else
    log "ℹ️ No changes detected in sitemap files"
    log "📅 Files are already up to date"
fi

# Clean up old log files (keep last 30 days)
find "$PROJECT_DIR/logs" -name "sitemap-update.log.*" -mtime +30 -delete 2>/dev/null || true

# Rotate current log if it's too large (>10MB)
if [ -f "$LOG_FILE" ] && [ $(stat -f%z "$LOG_FILE" 2>/dev/null || stat -c%s "$LOG_FILE" 2>/dev/null || echo 0) -gt 10485760 ]; then
    mv "$LOG_FILE" "$LOG_FILE.$(date +'%Y%m%d_%H%M%S')"
    log "📋 Log file rotated due to size"
fi

log "🏁 Sitemap update process completed"
log "----------------------------------------"

exit 0
