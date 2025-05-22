import React from 'react';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import ProgramsSection from '../components/home/ProgramsSection';
import NewsEventsSection from '../components/home/NewsEventsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import GalleryPreview from '../components/home/GalleryPreview';
import CTASection from '../components/home/CTASection';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProgramsSection />
      <NewsEventsSection />
      <GalleryPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default HomePage;