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

  // Load ElevenLabs ConvAI widget script
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    if (existingScript) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';

    script.onload = () => {
      console.log('ElevenLabs ConvAI script loaded successfully');
      setScriptLoaded(true);

      // Wait a bit for the custom element to be defined
      setTimeout(() => {
        if (customElements.get('elevenlabs-convai')) {
          console.log('elevenlabs-convai custom element is defined');
        } else {
          console.warn('elevenlabs-convai custom element not yet defined');
        }
      }, 1000);
    };

    script.onerror = () => {
      console.error('Failed to load ElevenLabs ConvAI script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
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

      {/* ElevenLabs ConvAI Widget - Fixed on right side, responsive positioning */}
      <div className="fixed right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-40 pointer-events-auto">
        {scriptLoaded ? (
          <div className="convai-widget-container">
            <elevenlabs-convai agent-id="fAiPNUtMGChNGFI7nFy4"></elevenlabs-convai>
            {/* Debug indicator - remove this later */}
            <div className="absolute -top-8 -left-4 bg-green-500 text-white text-xs px-2 py-1 rounded opacity-75">
              AI Chat
            </div>
          </div>
        ) : (
          <div className="w-12 h-12 bg-blue-600/80 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/30 shadow-lg">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {/* Loading indicator */}
            <div className="absolute -top-8 -left-6 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-75">
              Loading AI
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;