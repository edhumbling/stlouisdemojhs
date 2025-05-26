import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet-async';

const Layout: React.FC = () => {
  const location = useLocation();

  // Pages that should not show the footer
  const noFooterPages = ['/news', '/calendar', '/ai-search', '/schedule-visit'];
  const shouldShowFooter = !noFooterPages.includes(location.pathname);

  // Homepage should not have top padding (content can go under header)
  const isHomePage = location.pathname === '/';
  const shouldHaveTopPadding = !isHomePage;

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
      "streetAddress": "St. Louis Educational Complex",
      "addressLocality": "Kumasi",
      "addressRegion": "Ashanti Region",
      "postalCode": "3041",
      "addressCountry": "GH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+233244758575",
      "contactType": "customer service",
      "email": "support@stlouisdemojhs.com"
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
      <Helmet>
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>

        {/* Meta tags for better SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="yandex" content="index, follow" />

        {/* Open Graph for social sharing */}
        <meta property="og:site_name" content="St. Louis Demonstration JHS" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@stlouisdemojhs" />

        {/* Additional meta tags */}
        <meta name="author" content="St. Louis Demonstration JHS" />
        <meta name="publisher" content="St. Louis Demonstration JHS" />
        <meta name="copyright" content="© 2025 St. Louis Demonstration JHS" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://stlouisdemojhs.com${location.pathname}`} />

        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Helmet>

      <Header />
      <main className={`flex-grow ${shouldHaveTopPadding ? 'pt-16' : 'pt-0'} overflow-x-hidden`}>
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout;