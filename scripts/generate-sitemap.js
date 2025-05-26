#!/usr/bin/env node

/**
 * Automated Sitemap Generator for St. Louis Demonstration JHS
 * Automatically updates sitemap.xml with current dates
 * Run this script daily via cron job or CI/CD pipeline
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get current date in ISO format
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Site configuration
const SITE_CONFIG = {
  baseUrl: 'https://stlouisdemojhs.com',
  currentDate: getCurrentDate(),

  // Page configurations with priorities and change frequencies
  pages: [
    // Homepage - Highest priority, changes daily
    {
      path: '/',
      priority: '1.0',
      changefreq: 'daily',
      lastmod: getCurrentDate()
    },

    // Main Navigation - High priority
    {
      path: '/news',
      priority: '0.9',
      changefreq: 'daily',
      lastmod: getCurrentDate()
    },
    {
      path: '/stem',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: getCurrentDate()
    },
    {
      path: '/learnhub',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: getCurrentDate()
    },
    {
      path: '/ai-search',
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/gallery',
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: getCurrentDate()
    },

    // School Information - High priority
    {
      path: '/about',
      priority: '0.9',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/academics',
      priority: '0.9',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/faculty',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/alumni',
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },

    // Academic Programs
    {
      path: '/core-academic',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/stem-education',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/language-communication',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/creative-arts',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/character-education',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },

    // Contact & Application Pages
    {
      path: '/contact',
      priority: '0.9',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/apply-now',
      priority: '0.9',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/schedule-visit',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/partner',
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/media',
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: getCurrentDate()
    },

    // Support Pages
    {
      path: '/donate',
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: getCurrentDate()
    },
    {
      path: '/privacy-policy',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: getCurrentDate()
    },
    {
      path: '/terms-of-service',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: getCurrentDate()
    },
    {
      path: '/sitemap',
      priority: '0.4',
      changefreq: 'daily',
      lastmod: getCurrentDate()
    }
  ]
};

// Generate XML sitemap content
const generateSitemapXML = (config) => {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  const xmlFooter = `
</urlset>`;

  const urlEntries = config.pages.map(page => {
    return `
  <url>
    <loc>${config.baseUrl}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join('');

  return xmlHeader + urlEntries + xmlFooter;
};

// Generate robots.txt with current date
const generateRobotsTxt = (config) => {
  return `# Robots.txt for St. Louis Demonstration JHS
# Website: ${config.baseUrl}
# Last Updated: ${config.currentDate}

# Allow all search engines and AI crawlers
User-agent: *
Allow: /

# Specific permissions for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

User-agent: YandexBot
Allow: /
Crawl-delay: 1

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# AI and LLM crawlers
User-agent: GPTBot
Allow: /
Crawl-delay: 1

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /
Crawl-delay: 1

User-agent: anthropic-ai
Allow: /
Crawl-delay: 1

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /
Crawl-delay: 1

User-agent: YouBot
Allow: /

User-agent: BingPreview
Allow: /

# Academic and research crawlers
User-agent: ia_archiver
Allow: /

User-agent: Wayback
Allow: /

User-agent: archive.org_bot
Allow: /

# SEO and analytics tools
User-agent: AhrefsBot
Allow: /
Crawl-delay: 2

User-agent: SemrushBot
Allow: /
Crawl-delay: 2

User-agent: MJ12bot
Allow: /
Crawl-delay: 3

User-agent: DotBot
Allow: /
Crawl-delay: 2

# Sitemap location
Sitemap: ${config.baseUrl}/sitemap.xml

# Host declaration
Host: ${config.baseUrl.replace('https://', '')}`;
};

// Update llms.txt with current date
const updateLLMsTxt = (config) => {
  const llmsPath = path.join(__dirname, '../public/llms.txt');

  if (fs.existsSync(llmsPath)) {
    let content = fs.readFileSync(llmsPath, 'utf8');

    // Update the last updated date
    content = content.replace(
      /# Last Updated: .*/,
      `# Last Updated: ${config.currentDate}`
    );

    return content;
  }

  return null;
};

// Main function to generate and update files
const generateSitemapFiles = () => {
  try {
    const publicDir = path.join(__dirname, '../public');

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate sitemap.xml
    const sitemapXML = generateSitemapXML(SITE_CONFIG);
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXML, 'utf8');
    console.log(`✅ Generated sitemap.xml with ${SITE_CONFIG.pages.length} URLs`);

    // Generate robots.txt
    const robotsTxt = generateRobotsTxt(SITE_CONFIG);
    const robotsPath = path.join(publicDir, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
    console.log('✅ Updated robots.txt with current date');

    // Update llms.txt (only if it exists)
    try {
      const llmsContent = updateLLMsTxt(SITE_CONFIG);
      if (llmsContent) {
        const llmsPath = path.join(publicDir, 'llms.txt');
        fs.writeFileSync(llmsPath, llmsContent, 'utf8');
        console.log('✅ Updated llms.txt with current date');
      }
    } catch (llmsError) {
      console.log('ℹ️ llms.txt not found, skipping update');
    }

    console.log(`🎉 All SEO files updated successfully on ${SITE_CONFIG.currentDate}`);

  } catch (error) {
    console.error('❌ Error generating sitemap files:', error.message);
    // Don't exit with error code in build environment
    if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
      process.exit(1);
    }
  }
};

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemapFiles();
}

export {
  generateSitemapFiles,
  SITE_CONFIG
};
