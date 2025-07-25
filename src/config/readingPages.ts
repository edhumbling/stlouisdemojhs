// Configuration for pages that should show the scroll progress indicator
// These are typically content-heavy pages where users read through long content

export const READING_PAGES = [
  // Legal and Policy Pages
  '/privacy-policy',
  '/terms-of-service',
  '/sitemap',

  // Educational Content Pages
  '/about',
  '/academics',
  '/core-academic',
  '/stem-education',
  '/creative-arts',
  '/language-communication',
  '/character-education',
  '/educational-guide',
  '/scholarship-opportunities',

  // Subject Pages
  '/subject/english-language',
  '/subject/mathematics',
  '/subject/integrated-science',
  '/subject/social-studies',
  '/subject/religious-moral-education',
  '/subject/ghanaian-language',
  '/subject/french',
  '/subject/ict',
  '/subject/rme',
  '/subject/career-technology',
  '/subject/pre-technical-skills',
  '/subject/pre-vocational-skills',

  // Educational Institution Pages
  '/nursing-institutions',
  '/teacher-training',
  '/local-universities',
  '/professional-institutes',
  '/tvet-schools',
  '/military-academies',
  '/religious-seminaries',
  '/art-creative-schools',
  '/agricultural-colleges',
  '/business-schools',

  // Resource Pages
  '/staff-resources',
  '/ai-teaching-guide',
  '/jhs-textbooks',
  '/dream-hive-resources',
  '/career-reel-resources',
  '/money-smart-links',
  '/tech-resources',

  // Long-form Content Pages
  '/advice-speeches',
  '/news',
  '/media',
  '/alumni',
  '/pta',
  '/leadership-excellence',

  // AI and Learning Pages
  '/ai',
  '/ai-learning',
  '/stem-deep-learning',
  '/financial-literacy',

  // Career and Guidance Pages
  '/careers-list',
  '/results-placement',

  // Special Content Pages
  '/loading-test' // For testing purposes
];

// Pages that should NOT show the scroll indicator
export const NO_SCROLL_INDICATOR_PAGES = [
  // Homepage and main navigation
  '/',
  
  // Interactive/Application Pages
  '/apply-now',
  '/schedule-visit',
  '/contact',
  '/give-feedback',
  
  // Donation Pages
  '/donate',
  '/donate-one-dollar',
  '/paypal-donate',
  '/donate-us-bank',
  '/donate-uk-bank',
  '/donate-euro-bank',
  '/donate-monthly-10',
  '/donate-monthly-25',
  '/donate-monthly-50',
  '/donate-monthly-100',
  '/donate-monthly-200',
  '/donate-monthly-500',
  '/donate-monthly-1000',
  '/donate-monthly-3000',
  '/donate-monthly-5000',
  
  // Media and Gallery Pages
  '/gallery',
  '/media-files',
  '/shop',
  
  // Interactive Tools
  '/ai-search',
  '/calendar',
  '/tiktok',
  '/tiktok-submission',
  
  // Database and Viewer Pages
  '/shs-database',
  '/financial-library',
  
  // Thank you and confirmation pages
  '/thank-you',
  '/donation-thank-you',
  
  // Error pages
  '/404'
];

// Helper function to check if a page should show the scroll indicator
export const shouldShowScrollIndicator = (pathname: string): boolean => {
  // Remove trailing slash for consistent comparison
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;

  // Check if explicitly excluded
  if (NO_SCROLL_INDICATOR_PAGES.includes(normalizedPath)) {
    return false;
  }

  // Check if explicitly included
  if (READING_PAGES.includes(normalizedPath)) {
    return true;
  }

  // Check for dynamic routes that should show indicator
  const dynamicReadingRoutes = [
    '/shs-database/pdf/',
    '/financial-library/',
    '/subject/',
    '/donate-monthly-'
  ];

  const shouldShowForDynamicRoute = dynamicReadingRoutes.some(route => 
    normalizedPath.startsWith(route)
  );

  if (shouldShowForDynamicRoute) {
    return true;
  }

  // Default: don't show for unlisted pages
  return false;
};

// Helper function to get the appropriate color for different page types
export const getScrollIndicatorColor = (pathname: string): string => {
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;

  // AI and Tech pages - Blue/Cyan
  if (normalizedPath.startsWith('/ai') || 
      normalizedPath.startsWith('/tech') || 
      normalizedPath.startsWith('/stem')) {
    return 'bg-gradient-to-r from-cyan-500 to-blue-500';
  }

  // Educational content - Green
  if (normalizedPath.startsWith('/subject') || 
      normalizedPath.startsWith('/academics') ||
      normalizedPath.startsWith('/educational')) {
    return 'bg-gradient-to-r from-green-500 to-emerald-500';
  }

  // Legal/Policy pages - Purple
  if (normalizedPath.includes('privacy') || 
      normalizedPath.includes('terms') ||
      normalizedPath.includes('policy')) {
    return 'bg-gradient-to-r from-purple-500 to-violet-500';
  }

  // Default orange gradient
  return 'bg-gradient-to-r from-orange-500 to-red-500';
};
