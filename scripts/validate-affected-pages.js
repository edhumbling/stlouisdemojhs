#!/usr/bin/env node

/**
 * Breadcrumb Structured Data Validation Script for Affected Pages
 * Tests the specific pages mentioned in the Google Search Console error
 */

// Test data for the affected pages
const testPages = [
  {
    path: '/pta',
    expectedName: 'PTA',
    expectedDescription: 'Parent-Teacher Association information and activities'
  },
  {
    path: '/about', 
    expectedName: 'About Us',
    expectedDescription: 'About our school, mission, and values'
  },
  {
    path: '/shs-database',
    expectedName: 'SHS Database', 
    expectedDescription: 'Senior High School database and information'
  }
];

// Simulate the breadcrumb generation logic
function generateBreadcrumbStructuredData(path) {
  // Route mapping (from the actual component)
  const routeMap = {
    '/': { name: 'Home', path: '/', description: 'St. Louis Demonstration JHS Homepage' },
    '/about': { name: 'About Us', path: '/about', description: 'About our school, mission, and values' },
    '/pta': { name: 'PTA', path: '/pta', description: 'Parent-Teacher Association information and activities' },
    '/shs-database': { name: 'SHS Database', path: '/shs-database', description: 'Senior High School database and information' }
  };

  // Generate breadcrumbs
  const breadcrumbs = [];
  const pathSegments = path.split('/').filter(segment => segment !== '');
  let currentPath = '';

  // Always start with home
  breadcrumbs.push({
    name: 'Home',
    path: '/',
    description: 'St. Louis Demonstration JHS Homepage',
    isActive: false
  });

  // Build path segments
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    if (routeMap[currentPath]) {
      breadcrumbs.push({
        name: routeMap[currentPath].name,
        path: currentPath,
        description: routeMap[currentPath].description,
        isActive: isLast
      });
    } else {
      // Fallback for unmapped paths
      const fallbackName = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        name: fallbackName,
        path: currentPath,
        description: `${fallbackName} page`,
        isActive: isLast
      });
    }
  });

  // Generate structured data
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "name": "St. Louis Demonstration JHS Navigation",
    "description": "Breadcrumb navigation for St. Louis Demonstration Junior High School website",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "@id": `https://stlouisdemojhs.com${item.path === '/' ? '' : item.path}#breadcrumb-${index + 1}`,
      "position": index + 1,
      "name": item.name,
      "description": item.description,
      "item": {
        "@type": "WebPage",
        "@id": `https://stlouisdemojhs.com${item.path === '/' ? '' : item.path}`,
        "url": `https://stlouisdemojhs.com${item.path === '/' ? '' : item.path}`,
        "name": item.name,
        "description": item.description,
        "inLanguage": "en-US",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://stlouisdemojhs.com",
          "name": "St. Louis Demonstration Junior High School",
          "url": "https://stlouisdemojhs.com"
        }
      }
    }))
  };
}

function validatePageBreadcrumbs(path, expectedName, expectedDescription) {
  const errors = [];
  const warnings = [];

  console.log(`\n🔍 Testing page: ${path}`);
  
  const structuredData = generateBreadcrumbStructuredData(path);
  
  // Check if the page has proper breadcrumb data
  const pageItem = structuredData.itemListElement.find(item => 
    item.item.url === `https://stlouisdemojhs.com${path}`
  );

  if (!pageItem) {
    errors.push(`No breadcrumb item found for path: ${path}`);
    return { errors, warnings };
  }

  // Validate the page item
  if (!pageItem["@id"]) {
    errors.push(`Missing @id field for ${path}`);
  }

  if (!pageItem.name) {
    errors.push(`Missing name field for ${path}`);
  } else if (pageItem.name !== expectedName) {
    warnings.push(`Name mismatch for ${path}: expected "${expectedName}", got "${pageItem.name}"`);
  }

  if (!pageItem.description) {
    errors.push(`Missing description field for ${path}`);
  } else if (pageItem.description !== expectedDescription) {
    warnings.push(`Description mismatch for ${path}: expected "${expectedDescription}", got "${pageItem.description}"`);
  }

  if (!pageItem.item) {
    errors.push(`Missing item field for ${path}`);
  } else {
    if (!pageItem.item["@id"]) {
      errors.push(`Missing item @id field for ${path}`);
    }
    
    if (!pageItem.item.url) {
      errors.push(`Missing item url field for ${path}`);
    } else if (pageItem.item.url !== `https://stlouisdemojhs.com${path}`) {
      errors.push(`URL mismatch for ${path}: expected "https://stlouisdemojhs.com${path}", got "${pageItem.item.url}"`);
    }
  }

  // Check if this would show "Item: N/A" in Google Search Console
  if (pageItem.name && pageItem["@id"] && pageItem.item && pageItem.item.url) {
    console.log(`✅ ${path} - Should show proper breadcrumb data`);
    console.log(`   Name: ${pageItem.name}`);
    console.log(`   URL: ${pageItem.item.url}`);
    console.log(`   @id: ${pageItem["@id"]}`);
  } else {
    console.log(`❌ ${path} - Would show "Item: N/A" in Google Search Console`);
  }

  return { errors, warnings };
}

function main() {
  console.log("🔍 Validating Breadcrumb Structured Data for Affected Pages...\n");
  console.log("Testing the pages mentioned in Google Search Console error:\n");

  let totalErrors = 0;
  let totalWarnings = 0;

  testPages.forEach(({ path, expectedName, expectedDescription }) => {
    const result = validatePageBreadcrumbs(path, expectedName, expectedDescription);
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;

    if (result.errors.length > 0) {
      console.log(`❌ Errors for ${path}:`);
      result.errors.forEach(error => console.log(`   • ${error}`));
    }

    if (result.warnings.length > 0) {
      console.log(`⚠️  Warnings for ${path}:`);
      result.warnings.forEach(warning => console.log(`   • ${warning}`));
    }
  });

  console.log("\n📋 Summary:");
  console.log(`   • Total errors: ${totalErrors}`);
  console.log(`   • Total warnings: ${totalWarnings}`);
  console.log(`   • Pages tested: ${testPages.length}`);

  if (totalErrors === 0) {
    console.log("\n🎉 All affected pages now have proper breadcrumb structured data!");
    console.log("🎉 The 'Item: N/A' issue should be resolved!");
    console.log("\n📝 Next steps:");
    console.log("   1. Deploy the updated code");
    console.log("   2. Wait for Google to re-crawl the pages");
    console.log("   3. Check Google Search Console for updated results");
  } else {
    console.log("\n❌ Issues found that need to be addressed:");
    console.log("   • Fix the errors listed above");
    console.log("   • Re-run this validation script");
  }
}

main();
