import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();

  // Pages that should not show the footer
  const noFooterPages = ['/news', '/calendar', '/ai-search'];
  const shouldShowFooter = !noFooterPages.includes(location.pathname);

  // Homepage should not have top padding (content can go under header)
  const isHomePage = location.pathname === '/';
  const shouldHaveTopPadding = !isHomePage;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${shouldHaveTopPadding ? 'pt-16' : 'pt-0'}`}>
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout;