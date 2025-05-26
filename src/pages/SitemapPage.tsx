import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Map, Home, Users, BookOpen, Phone, Search, Camera, Newspaper, Heart, Calendar, FileText } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const SitemapPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const sitemapSections = [
    {
      title: 'Main Navigation',
      icon: Home,
      color: 'blue',
      links: [
        { name: 'Home', path: '/', description: 'Welcome to St. Louis Demonstration JHS' },
        { name: 'News & Events', path: '/news', description: 'Latest school news and upcoming events' },
        { name: 'STEM Education', path: '/stem', description: 'Science, Technology, Engineering & Mathematics' },
        { name: 'LearnHub', path: '/learnhub', description: 'Digital learning platform and resources' },
        { name: 'AI Search', path: '/ai-search', description: 'Intelligent search for school information' },
        { name: 'Gallery', path: '/gallery', description: 'Photos and videos from school events' },
      ]
    },
    {
      title: 'School Information',
      icon: Users,
      color: 'green',
      links: [
        { name: 'About Us', path: '/about', description: 'School history, mission, and vision' },
        { name: 'Academics', path: '/academics', description: 'Academic programs and curriculum' },
        { name: 'Administration', path: '/faculty', description: 'School leadership and staff' },
        { name: 'Alumni Community', path: '/alumni', description: 'Connect with our graduates' },
      ]
    },
    {
      title: 'Academic Programs',
      icon: BookOpen,
      color: 'purple',
      links: [
        { name: 'Core Academic Subjects', path: '/core-academic', description: 'Foundation subjects for BECE preparation' },
        { name: 'STEM Education', path: '/stem-education', description: 'Advanced science and technology programs' },
        { name: 'Language & Communication', path: '/language-communication', description: 'English, Twi, and French language programs' },
        { name: 'Creative Arts', path: '/creative-arts', description: 'Music, visual arts, and creative expression' },
        { name: 'Character Education', path: '/character-education', description: 'Values-based education and moral development' },
      ]
    },
    {
      title: 'Connect With Us',
      icon: Phone,
      color: 'orange',
      links: [
        { name: 'Contact Us', path: '/contact', description: 'Get in touch with school administration' },
        { name: 'Apply Now', path: '/apply-now', description: 'Submit your application for enrollment' },
        { name: 'Schedule Visit', path: '/schedule-visit', description: 'Book a tour of our facilities' },
        { name: 'Partner With Us', path: '/partner', description: 'Collaboration and partnership opportunities' },
        { name: 'Media & Press', path: '/media', description: 'Press releases and media resources' },
      ]
    },
    {
      title: 'Support & Resources',
      icon: Heart,
      color: 'red',
      links: [
        { name: 'Donate', path: '/donate', description: 'Support our educational mission' },
        { name: 'Privacy Policy', path: '/privacy-policy', description: 'How we protect your personal information' },
        { name: 'Terms of Service', path: '/terms-of-service', description: 'Terms and conditions for using our services' },
        { name: 'Sitemap', path: '/sitemap', description: 'Complete overview of our website structure' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Sitemap
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Map className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Website Sitemap
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Complete overview of all pages and sections on our website. Find exactly what you're looking for.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Total Pages:</strong> {sitemapSections.reduce((total, section) => total + section.links.length, 0)} pages organized in {sitemapSections.length} categories
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sitemap Sections */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sitemapSections.map((section, sectionIndex) => {
                const IconComponent = section.icon;
                const colorClasses = {
                  blue: 'bg-blue-50 border-blue-200 text-blue-800',
                  green: 'bg-green-50 border-green-200 text-green-800',
                  purple: 'bg-purple-50 border-purple-200 text-purple-800',
                  orange: 'bg-orange-50 border-orange-200 text-orange-800',
                  red: 'bg-red-50 border-red-200 text-red-800',
                };

                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                    className={`${colorClasses[section.color as keyof typeof colorClasses]} border rounded-xl p-6`}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 bg-${section.color}-600 rounded-lg flex items-center justify-center mr-3`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold">{section.title}</h2>
                    </div>
                    
                    <div className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <motion.div
                          key={link.path}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                        >
                          <Link
                            to={link.path}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                            className="block p-3 bg-white rounded-lg hover:shadow-md transition-all duration-200 group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className={`font-semibold text-${section.color}-800 group-hover:text-${section.color}-900 transition-colors`}>
                                  {link.name}
                                </h3>
                                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                  {link.description}
                                </p>
                              </div>
                              <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Website Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {sitemapSections.reduce((total, section) => total + section.links.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Pages</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">{sitemapSections.length}</div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 mb-1">5</div>
                  <div className="text-sm text-gray-600">Academic Programs</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-orange-600 mb-1">5</div>
                  <div className="text-sm text-gray-600">Contact Options</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SitemapPage;
