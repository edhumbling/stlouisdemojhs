import React from 'react';
import AdSenseAd from './AdSenseAd';

// Header Banner Ad (728x90 or responsive)
export const HeaderBannerAd: React.FC = () => (
  <div className="w-full flex justify-center py-4 bg-gray-900/50">
    <AdSenseAd
      adSlot="1234567890" // Replace with your ad slot ID
      adFormat="horizontal"
      className="max-w-4xl"
      adStyle={{
        display: 'block',
        width: '728px',
        height: '90px'
      }}
    />
  </div>
);

// Sidebar Ad (300x250)
export const SidebarAd: React.FC = () => (
  <div className="w-full mb-6">
    <div className="text-xs text-gray-400 mb-2 text-center">Advertisement</div>
    <AdSenseAd
      adSlot="2345678901" // Replace with your ad slot ID
      adFormat="rectangle"
      adStyle={{
        display: 'block',
        width: '300px',
        height: '250px'
      }}
    />
  </div>
);

// In-Content Ad (Responsive)
export const InContentAd: React.FC = () => (
  <div className="w-full my-8 flex justify-center">
    <div className="max-w-2xl w-full">
      <div className="text-xs text-gray-400 mb-2 text-center">Advertisement</div>
      <AdSenseAd
        adSlot="3456789012" // Replace with your ad slot ID
        adFormat="auto"
        className="w-full"
        adStyle={{
          display: 'block',
          minHeight: '250px'
        }}
      />
    </div>
  </div>
);

// Footer Ad (728x90 or responsive)
export const FooterAd: React.FC = () => (
  <div className="w-full py-6 bg-gray-900/30 border-t border-gray-800">
    <div className="container mx-auto px-4">
      <div className="text-xs text-gray-400 mb-2 text-center">Advertisement</div>
      <div className="flex justify-center">
        <AdSenseAd
          adSlot="4567890123" // Replace with your ad slot ID
          adFormat="horizontal"
          className="max-w-4xl"
          adStyle={{
            display: 'block',
            width: '728px',
            height: '90px'
          }}
        />
      </div>
    </div>
  </div>
);

// Mobile Banner Ad (320x50)
export const MobileBannerAd: React.FC = () => (
  <div className="w-full py-2 bg-gray-900/50 md:hidden">
    <div className="text-xs text-gray-400 mb-1 text-center">Advertisement</div>
    <div className="flex justify-center">
      <AdSenseAd
        adSlot="5678901234" // Replace with your ad slot ID
        adFormat="horizontal"
        adStyle={{
          display: 'block',
          width: '320px',
          height: '50px'
        }}
      />
    </div>
  </div>
);

// Auto Ad Component (Let Google decide placement)
export const AutoAd: React.FC = () => (
  <AdSenseAd
    adSlot="6789012345" // Replace with your ad slot ID
    adFormat="auto"
    className="w-full"
    adStyle={{
      display: 'block'
    }}
  />
);

// Educational Content Ad (Blends with educational content)
export const EducationalAd: React.FC = () => (
  <div className="w-full my-6 p-4 bg-gray-900/20 rounded-lg border border-gray-800">
    <div className="text-xs text-gray-400 mb-3 text-center">Sponsored Content</div>
    <AdSenseAd
      adSlot="7890123456" // Replace with your ad slot ID
      adFormat="auto"
      className="w-full"
      adStyle={{
        display: 'block',
        minHeight: '200px'
      }}
    />
  </div>
);
