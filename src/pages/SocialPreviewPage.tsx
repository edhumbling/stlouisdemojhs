import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Users, Microscope, Image, Newspaper, Search, Phone, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SocialMediaPreview from '../components/seo/SocialMediaPreview';
import SEOHead from '../components/seo/SEOHead';

const SocialPreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPageType, setSelectedPageType] = useState<'home' | 'students-hub' | 'stem' | 'gallery' | 'news' | 'ai-search' | 'contact' | 'about'>('home');

  const pageTypes = [
    {
      id: 'home' as const,
      name: 'Home Page',
      icon: Globe,
      title: 'St. Louis Demonstration Junior High School - Excellence in Education | Ghana',
      description: 'St. Louis Demonstration JHS is a premier educational institution in Ghana, offering quality junior high school education with modern facilities, experienced teachers, and comprehensive academic programs.',
      url: 'https://stlouisdemojhs.com'
    },
    {
      id: 'students-hub' as const,
      name: 'Students Hub',
      icon: Users,
      title: 'Students Hub - Learning Resources | St. Louis Demonstration JHS',
      description: 'Comprehensive learning resources, study materials, and educational tools for St. Louis Demonstration JHS students. Access STEM resources, study guides, and interactive learning materials.',
      url: 'https://stlouisdemojhs.com/learnhub'
    },
    {
      id: 'stem' as const,
      name: 'STEM Page',
      icon: Microscope,
      title: 'STEM Education Resources | St. Louis Demonstration JHS',
      description: 'Explore Science, Technology, Engineering, and Mathematics resources at St. Louis Demonstration JHS. Interactive labs, experiments, and hands-on learning experiences.',
      url: 'https://stlouisdemojhs.com/stem'
    },
    {
      id: 'gallery' as const,
      name: 'Gallery',
      icon: Image,
      title: 'School Gallery - Campus Life | St. Louis Demonstration JHS',
      description: 'Explore our vibrant school community through photos of academic life, campus events, student activities, and school facilities at St. Louis Demonstration JHS.',
      url: 'https://stlouisdemojhs.com/gallery'
    },
    {
      id: 'news' as const,
      name: 'News & Events',
      icon: Newspaper,
      title: 'News & Events | St. Louis Demonstration JHS',
      description: 'Stay updated with the latest news, events, announcements, and achievements from St. Louis Demonstration Junior High School.',
      url: 'https://stlouisdemojhs.com/news'
    },
    {
      id: 'ai-search' as const,
      name: 'AI Search',
      icon: Search,
      title: 'AI-Powered Learning Search | St. Louis Demonstration JHS',
      description: 'Discover educational resources with our AI-powered search. Find study materials, learning tools, and academic resources tailored for JHS students.',
      url: 'https://stlouisdemojhs.com/ai-search'
    },
    {
      id: 'contact' as const,
      name: 'Contact',
      icon: Phone,
      title: 'Contact Us | St. Louis Demonstration JHS',
      description: 'Get in touch with St. Louis Demonstration Junior High School. Find our location, contact information, and schedule a visit to our campus.',
      url: 'https://stlouisdemojhs.com/contact'
    },
    {
      id: 'about' as const,
      name: 'About',
      icon: Info,
      title: 'About Us | St. Louis Demonstration JHS',
      description: 'Learn about St. Louis Demonstration Junior High School - our history, mission, values, and commitment to providing quality education in Ghana.',
      url: 'https://stlouisdemojhs.com/about'
    }
  ];

  const currentPage = pageTypes.find(page => page.id === selectedPageType)!;

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Social Media Preview Tool | St. Louis Demonstration JHS"
        description="Preview how St. Louis Demonstration JHS website links will appear across different social media platforms including Facebook, Twitter, LinkedIn, and WhatsApp."
        pageType="about"
        useGalleryImages={true}
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-blue-500/30"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                🔗 Social Media Link Previews
              </h1>
              <p className="text-blue-200 text-sm">
                See how your links appear on different platforms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Page Type Selector */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <h2 className="text-white font-semibold mb-3">Select Page Type:</h2>
          <div className="flex flex-wrap gap-2">
            {pageTypes.map((pageType) => (
              <button
                key={pageType.id}
                onClick={() => setSelectedPageType(pageType.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedPageType === pageType.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                }`}
              >
                <pageType.icon size={16} />
                {pageType.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Page Info */}
      <div className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <currentPage.icon size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">{currentPage.title}</h3>
              <p className="text-gray-300 text-sm mt-1">{currentPage.description}</p>
              <p className="text-blue-400 text-sm mt-2 font-mono">{currentPage.url}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Preview Component */}
      <SocialMediaPreview
        title={currentPage.title}
        description={currentPage.description}
        url={currentPage.url}
        pageType={selectedPageType}
      />
    </div>
  );
};

export default SocialPreviewPage;
