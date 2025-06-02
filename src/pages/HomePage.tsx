import React, { useState, useEffect } from 'react';
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
        <div className="relative h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0">
            <ShimmerLoader variant="silver" width="w-full" height="h-full" className="rounded-none" />
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

  return (
    <>
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