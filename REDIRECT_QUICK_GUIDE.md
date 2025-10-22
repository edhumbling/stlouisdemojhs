# 🔄 Domain Redirect Quick Guide

## What Was Set Up

**301 Permanent Redirect**: `stlouisdemojhs.com` → `www.stlouisdemojhs.com`

## Files Created

✅ `public/_redirects` - Netlify redirects  
✅ `public/netlify.toml` - Netlify configuration  
✅ `vercel.json` - Vercel configuration  
✅ `public/.htaccess` - Apache/cPanel configuration  
✅ `firebase.json` - Firebase Hosting configuration  

## Quick Setup by Platform

### Netlify
1. Deploy your site
2. Add both domains in Netlify dashboard
3. Configure DNS (see below)
4. Redirects work automatically ✅

### Vercel
1. Deploy your site
2. Add both domains in Vercel dashboard
3. Configure DNS (see below)
4. Redirects work automatically ✅

### Apache/cPanel
1. Upload `.htaccess` to public folder
2. Ensure mod_rewrite is enabled
3. Configure DNS (see below)
4. Test the redirect ✅

### Firebase
1. Run `firebase deploy`
2. Add both domains in Firebase console
3. Configure DNS (see below)
4. Redirects work automatically ✅

## DNS Configuration

### For Netlify/Vercel/Firebase
```
A Record:     @     →  [Hosting Provider IP]
CNAME Record: www   →  [Your hosting domain]
```

### Example for Netlify
```
A Record:     @     →  75.2.60.5
CNAME Record: www   →  your-site.netlify.app
```

## Testing

### Quick Browser Test
1. Visit: `http://stlouisdemojhs.com`
2. Should redirect to: `https://www.stlouisdemojhs.com`
3. Check address bar shows `www`

### Command Line Test
```bash
curl -I http://stlouisdemojhs.com
# Should show: HTTP/1.1 301 Moved Permanently
# Location: https://www.stlouisdemojhs.com/
```

### Online Test
Visit: https://httpstatus.io/
Enter: `http://stlouisdemojhs.com`
Should show: **301 Redirect** to www version

## What This Does

✅ Redirects non-www to www permanently  
✅ Preserves SEO value (link juice)  
✅ Prevents duplicate content issues  
✅ Works for all pages and paths  
✅ Forces HTTPS (secure connection)  
✅ Updates search engine indexes  

## Important Notes

⚠️ **DNS Propagation**: Changes can take up to 48 hours  
⚠️ **SSL Certificate**: Must cover both domains  
⚠️ **Search Console**: Add both domains, prefer www  
⚠️ **Sitemap**: Update to use www URLs  

## Need Help?

📖 Full documentation: `docs/DOMAIN_REDIRECT_SETUP.md`  
🔧 Hosting-specific guides in that file  
🐛 Troubleshooting section included  

---

**Status**: ✅ Configured and Ready  
**Type**: 301 Permanent Redirect  
**Direction**: non-www → www
