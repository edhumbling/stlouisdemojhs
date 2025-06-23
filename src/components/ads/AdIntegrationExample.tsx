import React from 'react';
import { useLocation } from 'react-router-dom';
import { shouldShowAds, getAdSettings } from '../../config/adsense';
import { 
  HeaderBannerAd, 
  SidebarAd, 
  InContentAd, 
  FooterAd, 
  MobileBannerAd,
  EducationalAd 
} from './AdComponents';

// Example: News Page with Integrated Ads
const NewsPageWithAds: React.FC = () => {
  const location = useLocation();
  const showAds = shouldShowAds(location.pathname);
  const adSettings = getAdSettings();

  if (!showAds) {
    return <NewsPageContent />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Banner Ad - Desktop/Tablet */}
      {adSettings.showDesktopAds && <HeaderBannerAd />}
      
      {/* Mobile Banner Ad */}
      {adSettings.showMobileAds && <MobileBannerAd />}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold mb-8">School News & Updates</h1>
            
            {/* First Article */}
            <article className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Latest School Achievement</h2>
              <p className="text-gray-300 mb-4">
                Our students have achieved remarkable success in the recent academic competitions...
              </p>
            </article>

            {/* In-Content Ad after first article */}
            <InContentAd />

            {/* Second Article */}
            <article className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
              <p className="text-gray-300 mb-4">
                Mark your calendars for these exciting upcoming events at St. Louis Demo JHS...
              </p>
            </article>

            {/* Educational Ad */}
            <EducationalAd />

            {/* More articles... */}
          </div>

          {/* Sidebar with Ads */}
          <div className="lg:col-span-1">
            {/* Sidebar Ad */}
            {adSettings.showDesktopAds && <SidebarAd />}
            
            {/* Other sidebar content */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/academics" className="text-blue-400 hover:text-blue-300">Academics</a></li>
                <li><a href="/admissions" className="text-blue-400 hover:text-blue-300">Admissions</a></li>
                <li><a href="/gallery" className="text-blue-400 hover:text-blue-300">Gallery</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Ad */}
      {adSettings.showDesktopAds && <FooterAd />}
    </div>
  );
};

// Placeholder for actual news content
const NewsPageContent: React.FC = () => (
  <div className="min-h-screen bg-black text-white">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">School News & Updates</h1>
      {/* Regular content without ads */}
    </div>
  </div>
);

export default NewsPageWithAds;
