# Domain Redirect Setup - 301 Permanent Redirect

## Overview

This project is configured to permanently redirect (301) from the non-www domain to the www domain:

**From**: `stlouisdemojhs.com`  
**To**: `www.stlouisdemojhs.com`

## Why 301 Redirect?

A 301 redirect is a **permanent redirect** that:
- Transfers SEO value (link juice) from the old URL to the new URL
- Tells search engines the page has permanently moved
- Updates browser bookmarks automatically
- Prevents duplicate content issues
- Consolidates domain authority to one canonical domain

## Configuration Files Created

### 1. Netlify (`public/_redirects` and `public/netlify.toml`)

**File**: `public/_redirects`
```
http://stlouisdemojhs.com/*  https://www.stlouisdemojhs.com/:splat  301!
https://stlouisdemojhs.com/*  https://www.stlouisdemojhs.com/:splat  301!
```

**File**: `public/netlify.toml`
- Handles both HTTP and HTTPS redirects
- Uses `force = true` to override other rules
- Includes SPA fallback for React Router

**Setup**:
1. Deploy to Netlify
2. Configure DNS:
   - A record: `stlouisdemojhs.com` → Netlify IP
   - CNAME: `www.stlouisdemojhs.com` → your-site.netlify.app
3. Add both domains in Netlify dashboard
4. Enable HTTPS for both domains

### 2. Vercel (`vercel.json`)

**File**: `vercel.json`
- Uses host-based redirect matching
- `permanent: true` creates 301 redirect
- Includes SPA rewrite rules

**Setup**:
1. Deploy to Vercel
2. Add both domains in Vercel dashboard
3. Configure DNS:
   - A record: `stlouisdemojhs.com` → Vercel IP
   - CNAME: `www.stlouisdemojhs.com` → cname.vercel-dns.com
4. Vercel automatically handles HTTPS

### 3. Apache (`public/.htaccess`)

**File**: `public/.htaccess`
- For traditional Apache hosting (cPanel, shared hosting)
- Uses mod_rewrite for redirects
- Forces HTTPS as well
- Includes SPA fallback

**Setup**:
1. Upload to your Apache server
2. Ensure mod_rewrite is enabled
3. Configure DNS A records for both domains
4. Install SSL certificate for both domains

### 4. Firebase Hosting (`firebase.json`)

**File**: `firebase.json`
- Uses Firebase hosting redirects
- Includes cache headers for performance
- SPA rewrite configuration

**Setup**:
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`
5. Add both domains in Firebase console

## DNS Configuration

Regardless of hosting provider, you need to configure DNS:

### Option A: Both domains point to hosting
```
A     @     <hosting-ip>        (stlouisdemojhs.com)
CNAME www   <hosting-domain>    (www.stlouisdemojhs.com)
```

### Option B: Non-www redirects at DNS level
Some DNS providers (Cloudflare, Route53) can handle redirects:
```
A     @     <redirect-service>  (with redirect rule)
CNAME www   <hosting-domain>    (actual site)
```

## Testing the Redirect

### 1. Command Line Test
```bash
# Test non-www redirect
curl -I http://stlouisdemojhs.com

# Should return:
# HTTP/1.1 301 Moved Permanently
# Location: https://www.stlouisdemojhs.com/

# Test HTTPS non-www redirect
curl -I https://stlouisdemojhs.com

# Should return:
# HTTP/1.1 301 Moved Permanently
# Location: https://www.stlouisdemojhs.com/
```

### 2. Browser Test
1. Visit `http://stlouisdemojhs.com`
2. Should redirect to `https://www.stlouisdemojhs.com`
3. Check browser address bar shows www version
4. Check browser developer tools → Network tab
5. Should see 301 status code

### 3. Online Tools
- **Redirect Checker**: https://httpstatus.io/
- **SEO Redirect Test**: https://www.redirect-checker.org/
- **Google Search Console**: Check URL inspection tool

## SEO Considerations

### 1. Update Canonical URLs
Ensure all pages have canonical tags pointing to www version:
```html
<link rel="canonical" href="https://www.stlouisdemojhs.com/page" />
```

### 2. Update Sitemap
Update `public/sitemap.xml` to use www URLs:
```xml
<url>
  <loc>https://www.stlouisdemojhs.com/</loc>
</url>
```

### 3. Update Google Search Console
1. Add both properties:
   - `stlouisdemojhs.com`
   - `www.stlouisdemojhs.com`
2. Set www version as preferred domain
3. Submit sitemap for www version

### 4. Update Social Media Links
Update all social media profiles to use www version:
- Facebook
- Twitter/X
- LinkedIn
- Instagram
- YouTube

### 5. Update External Links
Contact sites linking to you and request they update to www version.

## Common Issues & Solutions

### Issue 1: Redirect Loop
**Symptom**: Browser shows "Too many redirects"
**Solution**: 
- Check for conflicting redirect rules
- Ensure hosting provider isn't adding extra redirects
- Clear browser cache and cookies

### Issue 2: Mixed Content Warnings
**Symptom**: HTTPS page loads HTTP resources
**Solution**:
- Update all internal links to use HTTPS
- Use protocol-relative URLs: `//example.com/image.jpg`
- Or relative URLs: `/image.jpg`

### Issue 3: Redirect Not Working
**Symptom**: Non-www domain doesn't redirect
**Solution**:
- Verify DNS is properly configured
- Check hosting provider has both domains added
- Wait for DNS propagation (up to 48 hours)
- Clear browser cache

### Issue 4: SSL Certificate Error
**Symptom**: "Your connection is not private" error
**Solution**:
- Ensure SSL certificate covers both domains
- Use wildcard certificate: `*.stlouisdemojhs.com`
- Or multi-domain certificate with both versions

## Monitoring

### 1. Google Analytics
- Filter to show www traffic only
- Set up alerts for non-www traffic
- Monitor redirect performance

### 2. Server Logs
- Check for 301 redirect entries
- Monitor for any 404 errors
- Track redirect response times

### 3. Uptime Monitoring
- Set up monitoring for both domains
- Ensure both resolve correctly
- Alert on redirect failures

## Rollback Plan

If you need to reverse the redirect:

1. **Remove redirect rules** from configuration files
2. **Update DNS** to point both domains to hosting
3. **Update canonical tags** to preferred version
4. **Notify search engines** via Search Console
5. **Update all marketing materials**

## Best Practices

✅ **Do**:
- Use 301 (permanent) redirects for domain changes
- Redirect both HTTP and HTTPS versions
- Test thoroughly before going live
- Monitor for issues after deployment
- Keep redirect rules simple and clear

❌ **Don't**:
- Use 302 (temporary) redirects for permanent changes
- Create redirect chains (A→B→C)
- Forget to update internal links
- Ignore SSL certificate coverage
- Skip testing on multiple browsers

## Support

For issues with redirects:
1. Check hosting provider documentation
2. Review DNS configuration
3. Test with online tools
4. Contact hosting support if needed
5. Review server logs for errors

---

**Configuration Version**: 1.0.0  
**Last Updated**: January 2025  
**Status**: Ready for Deployment
