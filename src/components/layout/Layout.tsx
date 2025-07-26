import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollButton from '../common/ScrollButton';
import UnifiedBreadcrumb from '../common/Breadcrumb';
import ScrollProgressIndicator from '../common/ScrollProgressIndicator';

import { useHeader } from '../../contexts/HeaderContext';
import { useEnhancedNavigation } from '../../hooks/useEnhancedNavigation';
import { shouldShowScrollIndicator, getScrollIndicatorColor } from '../../config/readingPages';

const Layout: React.FC = () => {
  const location = useLocation();
  const { showHeader, showFooter } = useHeader();
  const { restorePageState } = useEnhancedNavigation();

  // Handle scroll restoration on route changes with multiple attempts
  useEffect(() => {
    // Multiple restoration attempts to ensure it works
    const restoreAttempts = [100, 250, 500];
    const timers: ReturnType<typeof setTimeout>[] = [];

    restoreAttempts.forEach((delay) => {
      const timer = setTimeout(() => {
        restorePageState();
      }, delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [location.pathname, restorePageState]);

  // Pages that should not show the footer
  const noFooterPages = [
    '/news',
    '/calendar',
    '/ai-search',
    '/ai',
    '/stem-deep-learning',
    '/schedule-visit',
    '/learnhub',
    '/advice-speeches',
    '/staff-resources',
    '/ai-teaching-guide',
    '/jhs-textbooks',
    '/dream-hive-resources',
    '/career-reel-resources',
    '/money-smart-links',
    '/donate',
    '/donate-one-dollar',
    '/donate-paypal',
    '/donate-uk-bank',
    '/donate-us-bank',
    '/donate-euro-bank',
    '/apply-now',
    '/thank-you',
    '/news-events',
    '/shs-database',
    '/results-placement',
    '/students-hub',
    '/tiktok',
    '/gallery',
    '/scholarship-opportunities',
    '/educational-pathway-guide',
    '/leadership-excellence',
    '/subject/english-language',
    '/subject/mathematics',
    '/subject/integrated-science',
    '/subject/social-studies',
    '/subject/religious-moral-education',
    '/subject/ghanaian-language',
    '/subject/french',
    '/subject/career-technology',
    '/subject/computing-ict',
    '/subject/creative-arts-design',
    '/subject/music',
    '/financialliteracy',
    ...((location.pathname.startsWith('/shs-database/pdf/')) ? [location.pathname] : []),
    ...((location.pathname.startsWith('/financial-library/')) ? [location.pathname] : []),
  ];
  const shouldShowFooter = !noFooterPages.includes(location.pathname) && showFooter;

  // Pages that should not show breadcrumbs (typically full-screen or special pages)
  const noBreadcrumbPages = [
    '/',
    '/news',
    '/calendar',
    '/ai-search',
    '/schedule-visit',
    '/apply-now',
    '/thank-you',
    '/tiktok',
    '/gallery',
    ...((location.pathname.startsWith('/shs-database/pdf/')) ? [location.pathname] : []),
    ...((location.pathname.startsWith('/financial-library/')) ? [location.pathname] : []),
  ];
  const shouldShowBreadcrumbs = !noBreadcrumbPages.includes(location.pathname);

  // Pages that should not have top padding (content can go under header)
  const noTopPaddingPages = [
    '/',
    '/apply-now',
    '/donate',
    '/donate-one-dollar',
    '/learnhub'
  ];
  const shouldHaveTopPadding = !noTopPaddingPages.includes(location.pathname) && showHeader;

  // Determine breadcrumb theme based on page
  const darkBreadcrumbPages = [
    '/ai',
    '/stem',
    '/stem-education',
    '/stem-deep-learning',
    '/robotics',
    '/space-exploration',
    '/mayamiles-ai',
    '/ask-louis',
    '/tech-resources',
    '/ai-teaching-guide'
  ];
  const breadcrumbTheme = darkBreadcrumbPages.some(page => location.pathname.startsWith(page)) ? 'dark' : 'light';

  // Determine if scroll indicator should be shown
  const showScrollIndicator = shouldShowScrollIndicator(location.pathname);
  const scrollIndicatorColor = getScrollIndicatorColor(location.pathname);





  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Orange Scroll Progress Indicator for Reading Pages */}
      {showScrollIndicator && (
        <ScrollProgressIndicator
          color={scrollIndicatorColor}
          height="h-1"
          className="z-50"
        />
      )}

      {showHeader && <Header />}

      {/* Unified Google-Optimized Breadcrumb Navigation */}
      {shouldShowBreadcrumbs && (
        <UnifiedBreadcrumb
          theme={breadcrumbTheme}
          className="relative z-40"
        />
      )}

      <main className={`flex-grow ${shouldHaveTopPadding ? 'pt-16' : 'pt-0'} overflow-x-hidden`}>
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}

      {/* Global Scroll Button - Always visible like taskbar time */}
      <ScrollButton />
    </div>
  );
};

export default Layout;