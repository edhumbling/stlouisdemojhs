import React, { useState, useEffect } from 'react';
import SEOHead from '../components/seo/SEOHead';
import Hero from '../components/home/Hero';
import StatsSection from '../components/home/StatsSection';
import AboutSection from '../components/home/AboutSection';
import ProgramsSection from '../components/home/ProgramsSection';
import NewsEventsSection from '../components/home/NewsEventsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import GalleryPreview from '../components/home/GalleryPreview';
import FacebookPostsSection from '../components/home/FacebookPostsSection';
import CTASection from '../components/home/CTASection';
import SectionDivider from '../components/common/SectionDivider';
import ShimmerLoader from '../components/common/ShimmerLoader';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Handle initial page loading with shimmer effect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second initial loading

    return () => clearTimeout(loadingTimer);
  }, []);

  // Show shimmer loading for initial page load
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        {/* Hero Section Shimmer */}
        <div className="relative h-screen" style={{
          backgroundImage: 'url(https://www.cursor.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgradient-hero-prerender.3af0e196.webp&w=1536&q=75)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="absolute inset-0">
            <ShimmerLoader variant="silver" width="w-full" height="h-full" className="rounded-none opacity-50" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-4xl px-6">
              <ShimmerLoader variant="silver" width="w-32" height="h-32" className="mx-auto mb-8 rounded-3xl" />
              <ShimmerLoader variant="silver" width="w-96" height="h-12" className="mx-auto mb-6 rounded-lg" />
              <ShimmerLoader variant="silver" width="w-80" height="h-8" className="mx-auto mb-4 rounded-lg" />
              <ShimmerLoader variant="silver" width="w-64" height="h-8" className="mx-auto mb-8 rounded-lg" />
              <div className="flex gap-4 justify-center">
                <ShimmerLoader variant="silver" width="w-32" height="h-12" className="rounded-lg" />
                <ShimmerLoader variant="silver" width="w-32" height="h-12" className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section Shimmer */}
        <div className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="text-center">
                  <ShimmerLoader variant="silver" width="w-16" height="h-16" className="mx-auto mb-4 rounded-2xl" />
                  <ShimmerLoader variant="silver" width="w-20" height="h-8" className="mx-auto mb-2 rounded-lg" />
                  <ShimmerLoader variant="silver" width="w-24" height="h-6" className="mx-auto rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section Shimmer */}
        <div className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ShimmerLoader variant="silver" width="w-48" height="h-10" className="mb-6 rounded-lg" />
                <ShimmerLoader variant="silver" width="w-full" height="h-6" className="mb-4 rounded-lg" />
                <ShimmerLoader variant="silver" width="w-5/6" height="h-6" className="mb-4 rounded-lg" />
                <ShimmerLoader variant="silver" width="w-4/5" height="h-6" className="mb-6 rounded-lg" />
                <ShimmerLoader variant="silver" width="w-32" height="h-10" className="rounded-lg" />
              </div>
              <div>
                <ShimmerLoader variant="silver" width="w-full" height="h-80" className="rounded-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Programs Section Shimmer */}
        <div className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ShimmerLoader variant="silver" width="w-64" height="h-10" className="mx-auto mb-4 rounded-lg" />
              <ShimmerLoader variant="silver" width="w-96" height="h-6" className="mx-auto rounded-lg" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="text-center">
                  <ShimmerLoader variant="silver" width="w-full" height="h-48" className="mb-6 rounded-2xl" />
                  <ShimmerLoader variant="silver" width="w-32" height="h-8" className="mx-auto mb-4 rounded-lg" />
                  <ShimmerLoader variant="silver" width="w-full" height="h-6" className="mb-2 rounded-lg" />
                  <ShimmerLoader variant="silver" width="w-5/6" height="h-6" className="mx-auto rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Comprehensive structured data for homepage
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://stlouisdemojhs.com/#organization",
        "name": "St. Louis Demonstration Junior High School",
        "alternateName": "St. Louis Demonstration JHS",
        "url": "https://stlouisdemojhs.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs",
          "width": 200,
          "height": 200
        },
        "image": "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs",
        "description": "St. Louis Demonstration JHS is a premier educational institution in Ghana, offering quality junior high school education with modern facilities, experienced teachers, and comprehensive academic programs.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "Ghana",
          "addressRegion": "Greater Accra Region"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "admissions",
            "url": "https://stlouisdemojhs.com/contact"
          },
          {
            "@type": "ContactPoint",
            "contactType": "general inquiries",
            "url": "https://stlouisdemojhs.com/contact"
          }
        ],
        "sameAs": [
          "https://www.facebook.com/stlouisdemojhs",
          "https://stlouisdemojhs.blogspot.com"
        ],
        "educationalCredentialAwarded": "Junior High School Certificate",
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Junior High School Education"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://stlouisdemojhs.com/#website",
        "url": "https://stlouisdemojhs.com",
        "name": "St. Louis Demonstration JHS",
        "description": "Official website of St. Louis Demonstration Junior High School",
        "publisher": {
          "@id": "https://stlouisdemojhs.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://stlouisdemojhs.com/ai-search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="St. Louis Demonstration Junior High School - Excellence in Education | Ghana"
        description="St. Louis Demonstration JHS is a premier educational institution in Ghana, offering quality junior high school education with modern facilities, experienced teachers, comprehensive academic programs, STEM education, and student resources."
        keywords="St. Louis Demonstration JHS, junior high school Ghana, quality education Ghana, JHS Ghana, secondary education, academic excellence, STEM education, student resources, Ghana education, best JHS Ghana, junior secondary school, educational institution Ghana"
        url="https://stlouisdemojhs.com"
        type="website"
        structuredData={homepageStructuredData}
      />
      <Hero />
      <SectionDivider position="bottom" />

      <StatsSection />
      <SectionDivider position="bottom" flip={true} />

      <AboutSection />
      <SectionDivider position="bottom" flip={true} />

      <ProgramsSection />
      <SectionDivider position="bottom" />

      <NewsEventsSection />
      <SectionDivider position="bottom" flip={true} />

      <GalleryPreview />
      <SectionDivider position="bottom" />

      <TestimonialsSection />
      <SectionDivider position="bottom" flip={true} />

      <FacebookPostsSection />
      <SectionDivider position="bottom" />

      <CTASection />
    </>
  );
};

export default HomePage;