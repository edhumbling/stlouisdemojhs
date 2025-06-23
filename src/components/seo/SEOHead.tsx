import React from 'react';
import { Helmet } from 'react-helmet-async';
import { galleryImages } from '../../data';

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
  // New props for dynamic social media images
  pageType?: 'home' | 'students-hub' | 'stem' | 'gallery' | 'news' | 'ai-search' | 'contact' | 'about' | 'academics' | 'admissions' | 'faculty' | 'alumni' | 'media' | 'donation' | 'legal';
  useGalleryImages?: boolean;
  socialImagePreferences?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}

// Generate unique descriptions based on page type
const getPageDescription = (pageType: string, customDescription?: string): string => {
  if (customDescription) return customDescription;

  const descriptions: Record<string, string> = {
    home: "Welcome to St. Louis Demonstration JHS, Ghana's premier junior high school. We provide exceptional education with modern facilities, experienced teachers, and comprehensive academic programs that prepare students for success in senior high school and beyond.",
    'students-hub': "Discover your ultimate learning companion at St. Louis Demonstration JHS Students Hub. Access curated educational resources, STEM tools, study guides, scholarship opportunities, and interactive learning materials designed specifically for junior high school success.",
    stem: "Ignite your passion for Science, Technology, Engineering, and Mathematics at St. Louis Demonstration JHS. Explore hands-on experiments, coding tutorials, engineering challenges, and mathematical problem-solving tools designed to inspire the next generation of innovators.",
    gallery: "Explore the vibrant life at St. Louis Demonstration JHS through our comprehensive photo gallery. Witness our students' academic achievements, campus events, modern facilities, and the dynamic learning environment that makes our school special.",
    news: "Stay updated with the latest news, events, and achievements from St. Louis Demonstration JHS. Discover upcoming activities, academic milestones, student accomplishments, and important announcements from our school community.",
    'ai-search': "Experience the future of learning with our AI-powered educational search platform. Find personalized study materials, academic resources, and learning tools tailored specifically for St. Louis Demonstration JHS students.",
    contact: "Connect with St. Louis Demonstration JHS - Ghana's leading junior high school. Find our location, contact information, admission details, and schedule a visit to experience our exceptional educational environment firsthand.",
    about: "Learn about St. Louis Demonstration JHS - our rich history, educational mission, core values, and unwavering commitment to providing quality junior high school education that shapes future leaders in Ghana.",
    academics: "Discover our comprehensive academic programs at St. Louis Demonstration JHS. From core subjects to specialized courses, we offer rigorous curriculum designed to challenge and inspire students while building strong foundations for future success.",
    admissions: "Join the St. Louis Demonstration JHS family! Learn about our admission process, requirements, application deadlines, and discover how to become part of Ghana's most prestigious junior high school community.",
    faculty: "Meet our exceptional faculty at St. Louis Demonstration JHS. Our dedicated teachers and staff bring years of experience, passion for education, and commitment to nurturing every student's potential for academic and personal growth.",
    alumni: "Celebrate the achievements of St. Louis Demonstration JHS alumni. Discover success stories, career paths, and the lasting impact of our education on graduates who are making a difference in Ghana and around the world.",
    media: "Explore multimedia content from St. Louis Demonstration JHS. Watch videos, view photos, and experience the dynamic learning environment that makes our school a leader in junior high school education in Ghana.",
    donation: "Support excellence in education at St. Louis Demonstration JHS. Your generous donations help us maintain high standards, improve facilities, and provide opportunities for all students to achieve their full potential.",
    legal: "Important legal information and policies for St. Louis Demonstration JHS. Review our terms of service, privacy policy, and other legal documents that govern our educational services and website usage."
  };

  return descriptions[pageType] || descriptions.home;
};

// Dynamic image selection based on page type and social network
const getOptimalSocialImage = (
  pageType: string = 'home',
  network: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' = 'facebook',
  customImage?: string,
  preferences?: { facebook?: string; twitter?: string; linkedin?: string; whatsapp?: string }
): string => {
  // Use custom preference if provided
  if (preferences && preferences[network]) {
    return preferences[network]!;
  }

  // Use custom image if provided
  if (customImage) {
    return customImage;
  }

  // School logo for homepage (high-quality version)
  const schoolLogo = "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs";

  // Default fallback image (school logo)
  const defaultImage = schoolLogo;

  // Page-specific image selection from gallery
  const imageSelections: Record<string, Record<string, string>> = {
    home: {
      facebook: schoolLogo, // Always use school logo for homepage
      twitter: schoolLogo,
      linkedin: schoolLogo,
      whatsapp: schoolLogo,
    },
    'students-hub': {
      facebook: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('group'))?.src || defaultImage,
      twitter: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('learning'))?.src || defaultImage,
      linkedin: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('classroom'))?.src || defaultImage,
      whatsapp: galleryImages.find(img => img.category === 'Academic Life')?.src || defaultImage,
    },
    stem: {
      facebook: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('practical'))?.src || defaultImage,
      twitter: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('hands-on'))?.src || defaultImage,
      linkedin: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('creative'))?.src || defaultImage,
      whatsapp: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('activities'))?.src || defaultImage,
    },
    gallery: {
      facebook: galleryImages[0]?.src || defaultImage,
      twitter: galleryImages[1]?.src || defaultImage,
      linkedin: galleryImages[2]?.src || defaultImage,
      whatsapp: galleryImages[3]?.src || defaultImage,
    },
    news: {
      facebook: galleryImages.find(img => img.category === 'School Events')?.src || defaultImage,
      twitter: galleryImages.find(img => img.category === 'School Events' && img.alt.includes('activities'))?.src || defaultImage,
      linkedin: galleryImages.find(img => img.category === 'School Events' && img.alt.includes('engagement'))?.src || defaultImage,
      whatsapp: galleryImages.find(img => img.category === 'School Events')?.src || defaultImage,
    },
    'ai-search': {
      facebook: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('discussions'))?.src || defaultImage,
      twitter: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('presentations'))?.src || defaultImage,
      linkedin: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('collaborative'))?.src || defaultImage,
      whatsapp: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('interactive'))?.src || defaultImage,
    },
    contact: {
      facebook: galleryImages.find(img => img.category === 'Campus Life')?.src || defaultImage,
      twitter: galleryImages.find(img => img.category === 'Campus Life' && img.alt.includes('facilities'))?.src || defaultImage,
      linkedin: galleryImages.find(img => img.category === 'Campus Life' && img.alt.includes('environment'))?.src || defaultImage,
      whatsapp: galleryImages.find(img => img.category === 'Campus Life')?.src || defaultImage,
    },
    about: {
      facebook: galleryImages.find(img => img.category === 'Original Hero Collection')?.src || defaultImage,
      twitter: galleryImages.find(img => img.category === 'Campus Life' && img.alt.includes('community'))?.src || defaultImage,
      linkedin: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('environment'))?.src || defaultImage,
      whatsapp: galleryImages.find(img => img.category === 'Campus Life' && img.alt.includes('student'))?.src || defaultImage,
    },
    academics: {
      facebook: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('classroom'))?.src || defaultImage,
      twitter: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('learning'))?.src || defaultImage,
      linkedin: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('instruction'))?.src || defaultImage,
      whatsapp: galleryImages.find(img => img.category === 'Academic Life')?.src || defaultImage,
    },
    admissions: {
      facebook: galleryImages.find(img => img.category === 'Campus Life' && img.alt.includes('facilities'))?.src || defaultImage,
      twitter: galleryImages.find(img => img.category === 'Campus Life' && img.alt.includes('environment'))?.src || defaultImage,
      linkedin: galleryImages.find(img => img.category === 'Original Hero Collection')?.src || defaultImage,
      whatsapp: galleryImages.find(img => img.category === 'Campus Life')?.src || defaultImage,
    },
    faculty: {
      facebook: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('instruction'))?.src || defaultImage,
      twitter: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('teaching'))?.src || defaultImage,
      linkedin: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('guidance'))?.src || defaultImage,
      whatsapp: galleryImages.find(img => img.category === 'Academic Life')?.src || defaultImage,
    },
    alumni: {
      facebook: galleryImages.find(img => img.category === 'School Events' && img.alt.includes('achievement'))?.src || defaultImage,
      twitter: galleryImages.find(img => img.category === 'School Events' && img.alt.includes('celebration'))?.src || defaultImage,
      linkedin: galleryImages.find(img => img.category === 'School Events' && img.alt.includes('success'))?.src || defaultImage,
      whatsapp: galleryImages.find(img => img.category === 'School Events')?.src || defaultImage,
    },
    media: {
      facebook: galleryImages[0]?.src || defaultImage,
      twitter: galleryImages[2]?.src || defaultImage,
      linkedin: galleryImages[4]?.src || defaultImage,
      whatsapp: galleryImages[6]?.src || defaultImage,
    },
    donation: {
      facebook: galleryImages.find(img => img.category === 'Campus Life' && img.alt.includes('facilities'))?.src || defaultImage,
      twitter: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('opportunities'))?.src || defaultImage,
      linkedin: galleryImages.find(img => img.category === 'Original Hero Collection')?.src || defaultImage,
      whatsapp: galleryImages.find(img => img.category === 'Campus Life')?.src || defaultImage,
    },
    legal: {
      facebook: schoolLogo,
      twitter: schoolLogo,
      linkedin: schoolLogo,
      whatsapp: schoolLogo,
    }
  };

  return imageSelections[pageType]?.[network] || defaultImage;
};

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "ST. LOUIS DEMONSTRATION J.H.S - Leading Education",
  description,
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
  structuredData,
  pageType = 'home',
  useGalleryImages = true,
  socialImagePreferences
}) => {
  const baseUrl = "https://stlouisdemojhs.com";
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  const canonicalUrl = canonical || fullUrl;

  // Generate dynamic description based on page type
  const finalDescription = getPageDescription(pageType, description);

  // Default structured data for the school with enhanced logo schema
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "St. Louis Demonstration Junior High School",
    "alternateName": ["St. Louis Demonstration JHS", "St. Louis Demo JHS", "SLDJHS"],
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO",
      "width": 512,
      "height": 512,
      "caption": "St. Louis Demonstration Junior High School Logo"
    },
    "image": [
      {
        "@type": "ImageObject",
        "url": "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO",
        "width": 512,
        "height": 512,
        "caption": "St. Louis Demonstration JHS School Logo"
      },
      {
        "@type": "ImageObject",
        "url": "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/afffabd4-9771-46d5-b98a-a0adf6a5a3d0.png?updatedAt=1748272090100",
        "width": 1200,
        "height": 800,
        "caption": "St. Louis Demonstration JHS School Building"
      }
    ],
    "description": finalDescription,
    "foundingDate": "1977",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "P.O. Box 3041, Mbrom-Kumasi",
      "addressCountry": "Ghana",
      "addressRegion": "Ashanti Region",
      "addressLocality": "Suame Mbrom",
      "postalCode": "AK-015-1612"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.6885,
      "longitude": -1.6244
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "admissions",
        "telephone": "+233-244-758-575",
        "email": "contact@stlouisdemojhs.com",
        "url": `${baseUrl}/contact`,
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+233-244-758-575",
        "url": `${baseUrl}/contact`
      }
    ],
    "sameAs": [
      "https://www.facebook.com/stlouisdemojhs",
      "https://whatsapp.com/channel/0029VbBO7RD7IUYZjOnapG3q",
      "https://www.tiktok.com/@st.louis.demonstr",
      "https://stlouisdemojhs.blogspot.com"
    ],
    "educationalCredentialAwarded": "Junior High School Certificate",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Junior High School Education"
    },
    "numberOfStudents": 800,
    "slogan": "Primus Interparis - The Best Among the Rest",
    "motto": "UT SINT UNUM – DIEU LE VEUT",
    "areaServed": {
      "@type": "Place",
      "name": "Ashanti Region, Ghana"
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  // Get optimized images for different social networks
  const facebookImage = useGalleryImages ? getOptimalSocialImage(pageType, 'facebook', image, socialImagePreferences) : image;
  const twitterImage = useGalleryImages ? getOptimalSocialImage(pageType, 'twitter', image, socialImagePreferences) : image;
  const linkedinImage = useGalleryImages ? getOptimalSocialImage(pageType, 'linkedin', image, socialImagePreferences) : image;
  const whatsappImage = useGalleryImages ? getOptimalSocialImage(pageType, 'whatsapp', image, socialImagePreferences) : image;

  // Generate current date for publish time
  const currentDate = new Date().toISOString();
  const finalPublishedTime = publishedTime || currentDate;
  const finalModifiedTime = modifiedTime || currentDate;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Robots Meta */}
      <meta
        name="robots"
        content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'},max-snippet:-1,max-image-preview:large,max-video-preview:-1`}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Favicon and Logo Links for Google and Search Engines */}
      <link rel="icon" type="image/png" sizes="32x32" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="icon" type="image/png" sizes="16x16" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="icon" type="image/x-icon" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="apple-touch-icon" sizes="180x180" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="apple-touch-icon" sizes="152x152" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="apple-touch-icon" sizes="144x144" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="apple-touch-icon" sizes="120x120" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="apple-touch-icon" sizes="114x114" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="apple-touch-icon" sizes="76x76" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="apple-touch-icon" sizes="72x72" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="apple-touch-icon" sizes="60x60" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="apple-touch-icon" sizes="57x57" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="shortcut icon" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <link rel="icon" href="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />

      {/* Microsoft Tiles for Windows */}
      <meta name="msapplication-TileImage" content="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <meta name="msapplication-TileColor" content="#1a1a1a" />
      <meta name="msapplication-square70x70logo" content="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <meta name="msapplication-square150x150logo" content="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <meta name="msapplication-wide310x150logo" content="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />
      <meta name="msapplication-square310x310logo" content="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO" />

      {/* Web App Manifest */}
      <link rel="manifest" href="/manifest.json" />

      {/* Alternate Languages */}
      {alternateLanguages.map((lang, index) => (
        <link key={index} rel="alternate" hrefLang={lang.hreflang} href={lang.href} />
      ))}

      {/* Open Graph Meta Tags - Facebook & LinkedIn optimized */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={facebookImage} />
      <meta property="og:image:secure_url" content={facebookImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Best School in Ghana - SLDJHS" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content={finalModifiedTime} />

      {/* Standard image meta tag for broader compatibility */}
      <meta name="image" property="og:image" content={facebookImage} />

      {/* Additional Open Graph images for different networks */}
      <meta property="og:image" content={linkedinImage} />
      <meta property="og:image" content={whatsappImage} />

      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          <meta property="article:published_time" content={finalPublishedTime} />
          <meta property="article:modified_time" content={finalModifiedTime} />
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags - Twitter optimized */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@stlouisdemojhs" />
      <meta name="twitter:creator" content="@stlouisdemojhs" />

      {/* Additional Meta Tags for Better SEO */}
      <meta name="theme-color" content="#1a1a1a" />
      <meta name="msapplication-TileColor" content="#1a1a1a" />
      <meta name="application-name" content="Best School in Ghana - SLDJHS" />
      <meta name="apple-mobile-web-app-title" content="Best School in Ghana - SLDJHS" />
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

      {/* Additional Organization Schema for Google Logo */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "St. Louis Demonstration Junior High School",
          "url": "https://stlouisdemojhs.com",
          "logo": "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1M6q6dmU5zPYJTensbIFy9BQvGZ6hHUoNLkwlO",
          "sameAs": [
            "https://www.facebook.com/stlouisdemojhs",
            "https://whatsapp.com/channel/0029VbBO7RD7IUYZjOnapG3q",
            "https://www.tiktok.com/@st.louis.demonstr"
          ]
        })}
      </script>

      {/* Additional Performance Hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="GH-AH" />
      <meta name="geo.country" content="Ghana" />
      <meta name="geo.placename" content="P.O. Box 3041, Mbrom-Kumasi, GPS: AK-015-1612" />
      <meta name="geo.position" content="6.6885,-1.6244" />
      <meta name="ICBM" content="6.6885,-1.6244" />
      <meta name="gps.coordinates" content="AK-015-1612" />

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
