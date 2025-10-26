import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Users, Microscope, Image, Newspaper, Search, Phone, Info, BookOpen, Zap, GraduationCap, Heart, Calendar, FileText, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SocialMediaPreview from '../components/seo/SocialMediaPreview';
import SEOHead from '../components/seo/SEOHead';

const SocialPreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPageType, setSelectedPageType] = useState<'home' | 'students-hub' | 'stem' | 'gallery' | 'news' | 'ai-search' | 'contact' | 'about' | 'admissions' | 'faculty' | 'alumni' | 'pta' | 'calendar' | 'apply-now' | 'scholarship-opportunities' | 'shs-database' | 'mayamiles-ai' | 'donate'>('home');

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
      title: 'Students Hub | Digital Learning Resources & Educational Tools - St. Louis Demonstration JHS',
      description: 'Students Hub - Comprehensive learning resources, study materials, and educational tools for St. Louis Demonstration JHS students. Access STEM resources, study guides, and interactive learning materials.',
      url: 'https://stlouisdemojhs.com/learnhub'
    },
    {
      id: 'stem' as const,
      name: 'STEM Page',
      icon: Microscope,
      title: 'STEM Education | Science, Technology, Engineering & Mathematics Resources - St. Louis Demonstration JHS',
      description: 'STEM Education - Explore Science, Technology, Engineering, and Mathematics resources at St. Louis Demonstration JHS. Interactive labs, experiments, and hands-on learning experiences.',
      url: 'https://stlouisdemojhs.com/stem'
    },
    {
      id: 'gallery' as const,
      name: 'Gallery',
      icon: Image,
      title: 'Gallery | School Life Photos & Campus Memories - St. Louis Demonstration JHS',
      description: 'Gallery - Explore our vibrant school community through photos of academic life, campus events, student activities, and school facilities at St. Louis Demonstration JHS.',
      url: 'https://stlouisdemojhs.com/gallery'
    },
    {
      id: 'news' as const,
      name: 'News & Events',
      icon: Newspaper,
      title: 'News & Updates | Latest School Announcements & Events - St. Louis Demonstration JHS',
      description: 'News & Updates - Stay updated with the latest news, events, announcements, and achievements from St. Louis Demonstration Junior High School.',
      url: 'https://stlouisdemojhs.com/news'
    },
    {
      id: 'ai-search' as const,
      name: 'AI Search',
      icon: Search,
      title: 'AI Search | AI-Powered Learning & Educational Resources - St. Louis Demonstration JHS',
      description: 'AI Search - Discover educational resources with our AI-powered search. Find study materials, learning tools, and academic resources tailored for JHS students.',
      url: 'https://stlouisdemojhs.com/ai-search'
    },
    {
      id: 'contact' as const,
      name: 'Contact',
      icon: Phone,
      title: 'Contact Us | Get in Touch & Visit Our Campus - St. Louis Demonstration JHS',
      description: 'Contact Us - Get in touch with St. Louis Demonstration Junior High School. Find our location, contact information, and schedule a visit to our campus.',
      url: 'https://stlouisdemojhs.com/contact'
    },
    {
      id: 'about' as const,
      name: 'About',
      icon: Info,
      title: 'About Us | Our School History, Mission & Values - St. Louis Demonstration JHS',
      description: 'About Us - Learn about St. Louis Demonstration Junior High School, our history, mission, values, and commitment to providing quality education in Ghana.',
      url: 'https://stlouisdemojhs.com/about'
    },
    {
      id: 'admissions' as const,
      name: 'Admissions',
      icon: BookOpen,
      title: 'Admissions | Join Our School Community & Application Process - St. Louis Demonstration JHS',
      description: 'Admissions - Join the St. Louis Demonstration JHS family! Learn about our admission process, requirements, application deadlines, and discover how to become part of Ghana\'s most prestigious junior high school community.',
      url: 'https://stlouisdemojhs.com/admissions'
    },
    {
      id: 'faculty' as const,
      name: 'Faculty',
      icon: Users,
      title: 'Faculty & Administration | Meet Our Dedicated Teachers & School Leadership - St. Louis Demonstration JHS',
      description: 'Faculty & Administration - Meet the dedicated faculty and administration team at St. Louis Demonstration JHS. Learn about our experienced educators, school leadership, and the passionate professionals committed to student success.',
      url: 'https://stlouisdemojhs.com/faculty'
    },
    {
      id: 'alumni' as const,
      name: 'Alumni',
      icon: GraduationCap,
      title: 'Alumni Network | Connect with Our Distinguished Graduates & Success Stories - St. Louis Demonstration JHS',
      description: 'Alumni Network - Connect with the distinguished alumni network of St. Louis Demonstration JHS. Discover success stories from our graduates who are making a difference across various professions and industries worldwide.',
      url: 'https://stlouisdemojhs.com/alumni'
    },
    {
      id: 'pta' as const,
      name: 'PTA',
      icon: Heart,
      title: 'PTA | Parents & Teachers Association Community - St. Louis Demonstration JHS',
      description: 'PTA - Join the St. Louis Demo JHS Parents and Teachers Association community. Learn about our objectives, parent and teacher responsibilities, and how we work together to enhance educational excellence.',
      url: 'https://stlouisdemojhs.com/pta'
    },
    {
      id: 'calendar' as const,
      name: 'Calendar',
      icon: Calendar,
      title: 'Calendar | School Events, Academic Dates & Important Activities - St. Louis Demonstration JHS',
      description: 'Calendar - Stay up-to-date with all school events, academic calendar, holidays, and important dates at St. Louis Demonstration JHS. View our comprehensive calendar of activities and examinations.',
      url: 'https://stlouisdemojhs.com/calendar'
    },
    {
      id: 'apply-now' as const,
      name: 'Apply Now',
      icon: FileText,
      title: 'Apply Now | Start Your Application & Join Our School Community - St. Louis Demonstration JHS',
      description: 'Apply Now - Apply for admission to St. Louis Demonstration JHS, Ghana\'s premier junior high school. Complete your application online and join our community of academic excellence.',
      url: 'https://stlouisdemojhs.com/apply-now'
    },
    {
      id: 'scholarship-opportunities' as const,
      name: 'Scholarships',
      icon: Award,
      title: 'Scholarship Opportunities | Educational Funding & Global Academic Pathways - St. Louis Demonstration JHS',
      description: 'Scholarship Opportunities - Unlock your future with comprehensive scholarship opportunities and educational pathways. Discover local and international scholarships and global educational opportunities.',
      url: 'https://stlouisdemojhs.com/scholarship-opportunities'
    },
    {
      id: 'shs-database' as const,
      name: 'SHS Database',
      icon: Search,
      title: 'SHS Database | Senior High School Selection Guide & BECE Placement - St. Louis Demonstration JHS',
      description: 'SHS Database - Complete SHS school selection guide and database for BECE students. Access Category A, B, C, D school lists, CSSPS forms, and expert guidance for choosing the right senior high school.',
      url: 'https://stlouisdemojhs.com/shs-database'
    },
    {
      id: 'mayamiles-ai' as const,
      name: 'MayaMiles AI',
      icon: Zap,
      title: 'MayaMiles AI | Personalized Voice & Text Learning Assistant - St. Louis Demonstration JHS',
      description: 'MayaMiles AI - Experience personalized AI learning with MayaMiles. Choose Maya (lady voice) or Miles (guy voice) for voice-powered education, or use SuperChat for text-based learning.',
      url: 'https://stlouisdemojhs.com/mayamiles-ai'
    },
    {
      id: 'donate' as const,
      name: 'Donate',
      icon: Heart,
      title: 'Donate | Support Our Educational Mission & Student Development - St. Louis Demonstration JHS',
      description: 'Donate - Support quality education at St. Louis Demonstration JHS with your generous donation. Help us provide better facilities, resources, and opportunities for our students.',
      url: 'https://stlouisdemojhs.com/donate'
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
      /
        canonical="https://stlouisdemojhs.com/socialpreviewpage.tsx"
      >

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
