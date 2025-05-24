import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mic, FileText, Calculator, Languages, ExternalLink, GraduationCap } from 'lucide-react';

const LearnHubPage: React.FC = () => {
  const resources = [
    {
      id: 1,
      title: "Audiobooks",
      description: "Access thousands of free audiobooks from classic literature to educational content",
      url: "https://marhamilresearch4.blob.core.windows.net/gutenberg-public/Website/browse.html",
      icon: <Mic className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      id: 2,
      title: "Poetry Archive",
      description: "Explore children's poetry with audio recordings and interactive features",
      url: "https://childrens.poetryarchive.org/",
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600"
    },
    {
      id: 3,
      title: "BECE PASCO",
      description: "Comprehensive BECE past questions and answers for effective exam preparation",
      url: "https://emmadeeofficial.gumroad.com/l/becepasco",
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      id: 4,
      title: "JHS MOCKS",
      description: "Practice with mock examinations designed specifically for JHS students",
      url: "https://emmadeeofficial.gumroad.com/l/jhsmocks",
      icon: <FileText className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 5,
      title: "QWEN Maths Solver",
      description: "AI-powered mathematics problem solver for step-by-step solutions",
      url: "https://qwen-qwen2-math-demo.hf.space",
      icon: <Calculator className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
    {
      id: 6,
      title: "KHAYA AI Translator",
      description: "Advanced AI translator supporting Ghanaian languages and more",
      url: "https://translate.ghananlp.org/",
      icon: <Languages className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-school-blue via-school-green to-school-yellow">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/20 rounded-full blur-lg animate-pulse delay-500"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-4 bg-white/20 rounded-full"
              >
                <BookOpen className="w-12 h-12 text-white" />
              </motion.div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
                style={{ fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              LearnHub
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-white"
                style={{ fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              St. Louis Demonstration JHS
            </h2>
            <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto leading-relaxed"
               style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Your comprehensive learning resource center with curated educational tools, 
              audiobooks, exam materials, and AI-powered learning assistants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Dedicated Learning Resources</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Explore our carefully selected collection of educational resources designed to enhance your learning experience. 
              From audiobooks and poetry to exam preparation and AI-powered tools, everything you need is here.
            </p>
          </motion.section>

          {/* Resources Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className={`${resource.bgColor} rounded-xl p-4 sm:p-6 h-full border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg group-hover:scale-105 relative overflow-hidden`}>
                      {/* Background Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ${resource.bgColor} rounded-lg mb-4 ${resource.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                          {resource.icon}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-gray-700 transition-colors duration-300">
                          {resource.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                          {resource.description}
                        </p>

                        {/* External Link Indicator */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors duration-300">
                            Open Resource
                          </span>
                          <ExternalLink className="w-4 h-4 text-blue-600 group-hover:text-blue-800 transition-colors duration-300" />
                        </div>
                      </div>

                      {/* Hover Effect Border */}
                      <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-opacity-50 transition-all duration-300`}
                           style={{ borderColor: resource.color.includes('purple') ? '#8b5cf6' :
                                                 resource.color.includes('pink') ? '#ec4899' :
                                                 resource.color.includes('blue') ? '#3b82f6' :
                                                 resource.color.includes('green') ? '#10b981' :
                                                 resource.color.includes('orange') ? '#f97316' :
                                                 resource.color.includes('teal') ? '#14b8a6' : '#6b7280' }}>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-school-blue/10 via-school-green/10 to-school-yellow/10 rounded-xl p-8 border border-gray-200">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Start Your Learning Journey</h3>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                These resources are designed to support your academic success at St. Louis Demonstration JHS. 
                Click on any resource above to begin exploring and enhancing your learning experience.
              </p>
              <div className="flex justify-center items-center space-x-2 text-school-blue">
                <BookOpen className="w-6 h-6" />
                <span className="font-semibold">Happy Learning!</span>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default LearnHubPage;
