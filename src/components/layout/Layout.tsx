import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollButton from '../common/ScrollButton';
import { useHeader } from '../../contexts/HeaderContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const { showHeader } = useHeader();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Check for ElevenLabs ConvAI widget script (now loaded via HTML)
  useEffect(() => {
    console.log('🚀 Layout mounted, checking for ElevenLabs script...');

    // Since script is now in HTML, just wait a bit and check if it's loaded
    const checkScript = () => {
      const scriptExists = document.querySelector('script[src*="elevenlabs.io/convai-widget"]');
      console.log('Script exists in DOM:', !!scriptExists);

      if (scriptExists) {
        setScriptLoaded(true);
        console.log('✅ ElevenLabs script found in DOM');

        // Check for custom element
        setTimeout(() => {
          if (customElements.get('elevenlabs-convai')) {
            console.log('✅ elevenlabs-convai custom element is defined');
          } else {
            console.warn('⚠️ elevenlabs-convai custom element not yet defined, will keep checking...');
          }
        }, 2000);
      } else {
        console.log('⏳ Script not yet loaded, will check again...');
        setTimeout(checkScript, 1000);
      }
    };

    // Start checking after a short delay
    setTimeout(checkScript, 500);
  }, []);

  // Pages that should not show the footer
  const noFooterPages = ['/news', '/calendar', '/ai-search', '/schedule-visit', '/learnhub', '/advice-speeches'];
  const shouldShowFooter = !noFooterPages.includes(location.pathname);

  // Homepage should not have top padding (content can go under header)
  const isHomePage = location.pathname === '/';
  const shouldHaveTopPadding = !isHomePage && showHeader;

  // Structured data for Google search features
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "St. Louis Demonstration Junior High School",
    "alternateName": "St. Louis Demo JHS",
    "url": "https://stlouisdemojhs.com",
    "logo": "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748099386709",
    "image": "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?updatedAt=1748185709667",
    "description": "Premier educational institution in Kumasi, Ghana with over 47 years of excellence in education. We have successfully trained 30,000+ students with exceptional BECE success rates.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "St. Louis Demonstration J.H.S",
      "addressLocality": "Kumasi",
      "addressRegion": "Ashanti Region",
      "postalCode": "3041",
      "addressCountry": "GH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+233244758575",
      "contactType": "customer service",
      "email": "contact@stlouisdemojhs.com"
    },
    "sameAs": [
      "https://stlouisdemojhs.com/about",
      "https://stlouisdemojhs.com/academics",
      "https://stlouisdemojhs.com/contact"
    ],
    "foundingDate": "1978",
    "numberOfStudents": "900",
    "educationalCredentialAwarded": "Basic Education Certificate Examination (BECE)"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "St. Louis Demonstration JHS",
    "url": "https://stlouisdemojhs.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://stlouisdemojhs.com/ai-search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://stlouisdemojhs.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://stlouisdemojhs.com/about"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Academics",
        "item": "https://stlouisdemojhs.com/academics"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contact",
        "item": "https://stlouisdemojhs.com/contact"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Apply Now",
        "item": "https://stlouisdemojhs.com/apply-now"
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {showHeader && <Header />}
      <main className={`flex-grow ${shouldHaveTopPadding ? 'pt-16' : 'pt-0'} overflow-x-hidden`}>
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}

      {/* Global Scroll Button - Always visible like taskbar time */}
      <ScrollButton />

      {/* ElevenLabs ConvAI Widget - Fixed on right side, more visible positioning */}
      <div
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-[9999] pointer-events-auto"
        style={{
          position: 'fixed',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 9999,
          pointerEvents: 'auto'
        }}
      >
        {/* Always show a test indicator first */}
        <div className="mb-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          Widget Area
        </div>

        {scriptLoaded ? (
          <div className="convai-widget-container bg-white/10 p-2 rounded">
            <elevenlabs-convai agent-id="fAiPNUtMGChNGFI7nFy4"></elevenlabs-convai>
            {/* Debug indicator */}
            <div className="mt-2 bg-green-500 text-white text-xs px-2 py-1 rounded text-center">
              AI Chat Loaded
            </div>
          </div>
        ) : (
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;