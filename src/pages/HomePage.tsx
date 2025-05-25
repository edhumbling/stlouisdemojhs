import React from 'react';
import Hero from '../components/home/Hero';
import StatsSection from '../components/home/StatsSection';
import AboutSection from '../components/home/AboutSection';
import ProgramsSection from '../components/home/ProgramsSection';
import NewsEventsSection from '../components/home/NewsEventsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import GalleryPreview from '../components/home/GalleryPreview';
import CTASection from '../components/home/CTASection';
import SectionDivider from '../components/common/SectionDivider';

const HomePage: React.FC = () => {
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

      <CTASection />
    </>
  );
};

export default HomePage;