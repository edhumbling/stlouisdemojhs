import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollButton from '../common/ScrollButton';

import { useHeader } from '../../contexts/HeaderContext';
import { useEnhancedNavigation } from '../../hooks/useEnhancedNavigation';

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

  // Homepage should not have top padding (content can go under header)
  const isHomePage = location.pathname === '/';
  const shouldHaveTopPadding = !isHomePage && showHeader;





  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {showHeader && <Header />}

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