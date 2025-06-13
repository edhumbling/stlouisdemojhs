import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Users, Star, BookOpen, Award, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

const CharacterEducationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Character & Values Education | St. Louis Demonstration JHS"
        description="Building moral foundations and ethical leadership at St. Louis Demonstration JHS. Our character education program integrates traditional Ghanaian values with modern citizenship skills, fostering integrity, respect, and service."
        keywords="character education, moral values, ethics, integrity, Ghanaian values, Sankofa, Ubuntu, cultural heritage, leadership development, citizenship"
        url="/character-education"
        type="website"
        pageType="academics"
        useGalleryImages={true}
      />
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              ⭐ Character & Values Education
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-8 pb-12 md:pt-12 md:pb-16 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_6995.HEIC"
            alt="Character Education Background"
            className="w-full h-full object-cover"
          />
          {/* Blue-Green overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-700/85 to-green-700/80"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mb-6 shadow-2xl">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Character & Values Education
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Building moral foundations and ethical leadership for Ghana's future leaders
            </p>
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 py-2 mt-6 shadow-lg">
              <span className="text-yellow-400 text-lg">✨</span>
              <span className="text-yellow-300 text-sm font-semibold">Character Excellence Program</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7010.HEIC"
            alt="Character Values Background"
            className="w-full h-full object-cover"
          />
          {/* Dark glass overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Core Values Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Integrity & Honesty",
                description: "Teaching students to be truthful, trustworthy, and morally upright in all their dealings, reflecting the core Ghanaian value of 'nokware' (truthfulness)."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Respect & Unity",
                description: "Fostering mutual respect among diverse ethnic groups, embodying Ghana's motto 'Unity in Diversity' and promoting peaceful coexistence."
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Excellence & Diligence",
                description: "Instilling the Ghanaian work ethic of 'adwuma' (hard work) and striving for excellence in academics, character, and service to community."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Cultural Pride",
                description: "Celebrating Ghanaian heritage, traditions, and values while preparing students to be global citizens who represent Ghana with dignity."
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Wisdom & Knowledge",
                description: "Emphasizing the Akan proverb 'Nyansa ne ahoɔden' (wisdom is strength) and encouraging lifelong learning and critical thinking."
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Service & Leadership",
                description: "Developing servant leaders who understand that true leadership means serving others, inspired by Ghana's founding fathers and mothers."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-dark rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white mr-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{value.title}</h3>
                </div>
                <p className="text-gray-200 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Ghanaian Context Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-dark p-8 rounded-2xl mb-12 border border-white/20"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Rooted in Ghanaian Values</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Traditional Wisdom</h3>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Sankofa:</strong> Learning from the past to build a better future</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Ubuntu Philosophy:</strong> "I am because we are" - community interconnectedness</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Respect for Elders:</strong> Honoring wisdom and experience in Ghanaian culture</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Hospitality (Akwaaba):</strong> Welcoming spirit and kindness to all</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-300 mb-4">Modern Applications</h3>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Digital citizenship and responsible technology use</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Environmental stewardship and sustainable living</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Global awareness while maintaining cultural identity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Entrepreneurship and innovation with ethical foundations</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Practical Implementation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-dark p-8 rounded-2xl shadow-lg border border-white/20"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">How We Teach Character</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Daily Practices</h3>
                <ul className="space-y-2 text-gray-200">
                  <li>• Morning devotions and reflection time</li>
                  <li>• Peer mentoring and buddy systems</li>
                  <li>• Community service projects</li>
                  <li>• Cultural celebrations and heritage days</li>
                  <li>• Conflict resolution and mediation training</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-300 mb-4">Assessment Methods</h3>
                <ul className="space-y-2 text-gray-200">
                  <li>• Character portfolios and self-reflection journals</li>
                  <li>• Peer evaluation and feedback systems</li>
                  <li>• Community impact projects</li>
                  <li>• Leadership opportunities and responsibilities</li>
                  <li>• Recognition and awards for character excellence</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CharacterEducationPage;
