import React from 'react';
import SEOHead from '../components/seo/SEOHead';

const PagesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="All Pages | St. Louis Demonstration JHS"
        description="Browse all pages and sections of the St. Louis Demonstration JHS website. Find academic programs, student resources, admissions information, news, events, and more."
        keywords="all pages, website pages, site navigation, St. Louis Demonstration JHS pages, school website sections"
        url="/pages"
        type="website"
        pageType="about"
        useGalleryImages={true}
      />
      {/* Page content will be added here */}
    </div>
  );
};

export default PagesPage;