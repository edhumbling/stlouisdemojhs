import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  alternateLanguages?: Array<{ hreflang: string; href: string }>;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "St. Louis Demonstration Junior High School - Excellence in Education",
  description = "St. Louis Demonstration JHS is a premier educational institution in Ghana, offering quality junior high school education with modern facilities, experienced teachers, and comprehensive academic programs.",
  keywords = "St. Louis Demonstration JHS, junior high school Ghana, quality education Ghana, JHS Ghana, secondary education, academic excellence, STEM education, student resources, Ghana education",
  image = "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs",
  url = "https://stlouisdemojhs.com",
  type = "website",
  author = "St. Louis Demonstration JHS",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  nofollow = false,
  canonical,
  alternateLanguages = [],
  structuredData
}) => {
  const baseUrl = "https://stlouisdemojhs.com";
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  const canonicalUrl = canonical || fullUrl;

  // Default structured data for the school
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "St. Louis Demonstration Junior High School",
    "alternateName": "St. Louis Demonstration JHS",
    "url": baseUrl,
    "logo": image,
    "image": image,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Ghana",
      "addressRegion": "Greater Accra Region"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "admissions",
      "url": `${baseUrl}/contact`
    },
    "sameAs": [
      "https://www.facebook.com/stlouisdemojhs",
      "https://stlouisdemojhs.blogspot.com"
    ],
    "educationalCredentialAwarded": "Junior High School Certificate",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Junior High School Education"
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Robots Meta */}
      <meta 
        name="robots" 
        content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'},max-snippet:-1,max-image-preview:large,max-video-preview:-1`} 
      />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate Languages */}
      {alternateLanguages.map((lang, index) => (
        <link key={index} rel="alternate" hrefLang={lang.hreflang} href={lang.href} />
      ))}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="St. Louis Demonstration JHS" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@stlouisdemojhs" />
      <meta name="twitter:creator" content="@stlouisdemojhs" />
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="theme-color" content="#1a1a1a" />
      <meta name="msapplication-TileColor" content="#1a1a1a" />
      <meta name="application-name" content="St. Louis Demonstration JHS" />
      <meta name="apple-mobile-web-app-title" content="St. Louis Demo JHS" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://6z76leifsf.ufs.sh" />
      
      {/* DNS Prefetch for better performance */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Additional Performance Hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="GH" />
      <meta name="geo.country" content="Ghana" />
      <meta name="geo.placename" content="Accra" />
      <meta name="ICBM" content="5.6037,-0.1870" />
      
      {/* Educational Institution Specific Meta */}
      <meta name="education.level" content="Junior High School" />
      <meta name="education.type" content="Secondary Education" />
      <meta name="institution.type" content="Educational" />
      <meta name="audience" content="Students, Parents, Educators" />
      
      {/* Language and Content Meta */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="content-type" content="text/html; charset=utf-8" />
      
      {/* Cache Control for better performance */}
      <meta httpEquiv="cache-control" content="public, max-age=31536000" />
      
      {/* Verification Meta Tags (add when you have accounts) */}
      {/* <meta name="google-site-verification" content="your-google-verification-code" /> */}
      {/* <meta name="msvalidate.01" content="your-bing-verification-code" /> */}
      {/* <meta name="yandex-verification" content="your-yandex-verification-code" /> */}
    </Helmet>
  );
};

export default SEOHead;
