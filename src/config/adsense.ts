// AdSense Configuration
export const ADSENSE_CONFIG = {
  // Your actual AdSense Publisher ID
  PUBLISHER_ID: 'ca-pub-3612569845845172',

  // Ad Slot IDs - Replace with your actual ad slot IDs from AdSense
  AD_SLOTS: {
    HEADER_BANNER: '1234567890',
    SIDEBAR_RECTANGLE: '2345678901',
    IN_CONTENT: '3456789012',
    FOOTER_BANNER: '4567890123',
    MOBILE_BANNER: '5678901234',
    AUTO_AD: '6789012345',
    EDUCATIONAL_CONTENT: '7890123456'
  },

  // Ad Settings
  SETTINGS: {
    // Enable/disable ads globally
    ADS_ENABLED: true,

    // Show ads only on specific pages
    SHOW_ON_PAGES: [
      '/',
      '/news',
      '/academics',
      '/about',
      '/gallery',
      '/media-files',
      '/alumni',
      '/resources'
    ],

    // Pages where ads should NOT appear
    EXCLUDE_PAGES: [
      '/apply-now',
      '/donate',
      '/contact',
      '/pta',
      '/admissions'
    ],

    // Ad frequency settings
    MAX_ADS_PER_PAGE: 3,
    MIN_CONTENT_LENGTH: 500, // Minimum content length before showing ads

    // Mobile settings
    MOBILE_ADS_ENABLED: true,
    TABLET_ADS_ENABLED: true,

    // Performance settings
    LAZY_LOAD_ADS: true,
    AD_REFRESH_INTERVAL: 30000, // 30 seconds
  }
};

// Helper function to check if ads should be shown on current page
export const shouldShowAds = (pathname: string): boolean => {
  if (!ADSENSE_CONFIG.SETTINGS.ADS_ENABLED) return false;

  // Check if page is excluded
  if (ADSENSE_CONFIG.SETTINGS.EXCLUDE_PAGES.includes(pathname)) {
    return false;
  }

  // Check if page is in allowed list (if specified)
  if (ADSENSE_CONFIG.SETTINGS.SHOW_ON_PAGES.length > 0) {
    return ADSENSE_CONFIG.SETTINGS.SHOW_ON_PAGES.includes(pathname);
  }

  return true;
};

// Helper function to get device-appropriate ad settings
export const getAdSettings = () => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  return {
    showMobileAds: isMobile && ADSENSE_CONFIG.SETTINGS.MOBILE_ADS_ENABLED,
    showTabletAds: isTablet && ADSENSE_CONFIG.SETTINGS.TABLET_ADS_ENABLED,
    showDesktopAds: !isMobile && !isTablet,
    maxAdsPerPage: ADSENSE_CONFIG.SETTINGS.MAX_ADS_PER_PAGE
  };
};
