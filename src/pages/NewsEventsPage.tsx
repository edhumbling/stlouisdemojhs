import React from 'react';
import SEOHead from '../components/seo/SEOHead';

const NewsEventsPage = () => (
  <div className="min-h-screen pt-16">
    <SEOHead
      title="News & Events | St. Louis Demonstration JHS"
      description="Stay updated with the latest news, events, and achievements from St. Louis Demonstration JHS. Discover upcoming activities, academic milestones, student accomplishments, and important announcements from our school community."
      keywords="school news, events, announcements, achievements, activities, St. Louis Demonstration JHS news, school updates, academic milestones"
      url="/news-events"
      type="website"
      pageType="news"
      useGalleryImages={true}
    />
    <div className="bg-purple-700 -mt-16 z-10 relative py-6 px-4">
      <button className="bg-purple-800 text-white rounded-lg px-4 py-2 mr-4">← Back</button>
      <span className="text-white text-2xl font-bold align-middle">News/Updates</span>
    </div>
    {/* Page content goes here */}
  </div>
);

export default NewsEventsPage; 