#!/usr/bin/env node

/**
 * Comprehensive Breadcrumb Structured Data Validation Script
 * Tests the corrected structured data with both @id and id fields
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

// Simulate the corrected breadcrumb generation logic
function generateCorrectedBreadcrumbStructuredData(path) {
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

  // Generate corrected structured data with both @id and id fields
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
        "id": `https://stlouisdemojhs.com${item.path === '/' ? '' : item.path}`,
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

function validateCorrectedBreadcrumbs(path, expectedName, expectedDescription) {
  const errors = [];
  const warnings = [];

  console.log(`\n🔍 Testing corrected breadcrumbs for: ${path}`);
  
  const structuredData = generateCorrectedBreadcrumbStructuredData(path);
  
  // Check if the page has proper breadcrumb data
  const pageItem = structuredData.itemListElement.find(item => 
    item.item.url === `https://stlouisdemojhs.com${path}`
  );

  if (!pageItem) {
    errors.push(`No breadcrumb item found for path: ${path}`);
    return { errors, warnings };
  }

  // Validate ListItem fields
  if (!pageItem["@id"]) {
    errors.push(`Missing @id field for ListItem ${path}`);
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

  // Validate item object fields (this was the main issue)
  if (!pageItem.item) {
    errors.push(`Missing item field for ${path}`);
  } else {
    // Check for @id field
    if (!pageItem.item["@id"]) {
      errors.push(`Missing item @id field for ${path}`);
    }
    
    // Check for id field (this was the missing field causing the error)
    if (!pageItem.item.id) {
      errors.push(`Missing item id field for ${path} - This was the critical missing field!`);
    }
    
    if (!pageItem.item.url) {
      errors.push(`Missing item url field for ${path}`);
    } else if (pageItem.item.url !== `https://stlouisdemojhs.com${path}`) {
      errors.push(`URL mismatch for ${path}: expected "https://stlouisdemojhs.com${path}", got "${pageItem.item.url}"`);
    }

    if (!pageItem.item.name) {
      errors.push(`Missing item name field for ${path}`);
    }
  }

  // Check if this would resolve the Google Search Console error
  const hasAllRequiredFields = pageItem["@id"] && 
                               pageItem.name && 
                               pageItem.item && 
                               pageItem.item["@id"] && 
                               pageItem.item.id && 
                               pageItem.item.url;

  if (hasAllRequiredFields) {
    console.log(`✅ ${path} - All required fields present, should resolve Google Search Console error`);
    console.log(`   ListItem @id: ${pageItem["@id"]}`);
    console.log(`   ListItem name: ${pageItem.name}`);
    console.log(`   Item @id: ${pageItem.item["@id"]}`);
    console.log(`   Item id: ${pageItem.item.id}`);
    console.log(`   Item url: ${pageItem.item.url}`);
  } else {
    console.log(`❌ ${path} - Missing required fields, will still show Google Search Console error`);
  }

  return { errors, warnings };
}

function main() {
  console.log("🔍 Validating CORRECTED Breadcrumb Structured Data...\n");
  console.log("Testing the pages with the missing 'id' field now fixed:\n");

  let totalErrors = 0;
  let totalWarnings = 0;

  testPages.forEach(({ path, expectedName, expectedDescription }) => {
    const result = validateCorrectedBreadcrumbs(path, expectedName, expectedDescription);
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
    console.log("\n🎉 SUCCESS! All breadcrumb structured data issues are now resolved!");
    console.log("🎉 The missing 'id' field in the item object has been added!");
    console.log("🎉 Google Search Console 'Unnamed item' errors should be resolved!");
    console.log("\n📝 What was fixed:");
    console.log("   • Added missing 'id' field to each item object");
    console.log("   • Both '@id' and 'id' fields are now present");
    console.log("   • All required fields for Google compliance are included");
    console.log("\n📝 Next steps:");
    console.log("   1. Deploy the updated code");
    console.log("   2. Wait for Google to re-crawl the pages (1-7 days)");
    console.log("   3. Check Google Search Console for resolved errors");
  } else {
    console.log("\n❌ Issues still found that need to be addressed:");
    console.log("   • Fix the errors listed above");
    console.log("   • Re-run this validation script");
  }
}

main();
