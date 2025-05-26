import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();

  // Pages that should not show the footer
  const noFooterPages = ['/news', '/calendar', '/ai-search', '/schedule-visit'];
  const shouldShowFooter = !noFooterPages.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow pt-16 overflow-x-hidden">
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout;