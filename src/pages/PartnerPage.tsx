import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, BookOpen, Monitor, Armchair, Users, Mail, Phone, MapPin, Handshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionDivider from '../components/common/SectionDivider';
import SEOHead from '../components/seo/SEOHead';

// Shimmer Loading Component
const ShimmerLoader: React.FC<{ className?: string; rounded?: string }> = ({
  className = "w-full h-40",
  rounded = "rounded-xl"
}) => (
  <div className={`relative overflow-hidden ${rounded} bg-gray-800 ${className}`}>
    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800"></div>
  </div>
);

// Optimized Image Component with Shimmer Loading
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  shimmerClassName?: string;
}> = ({ src, alt, className, onClick, shimmerClassName }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && !hasError && (
        <ShimmerLoader className={shimmerClassName || className} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onClick={onClick}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{ contentVisibility: 'auto' }}
      />
      {hasError && (
        <div className={`${className} bg-gray-800 flex items-center justify-center text-gray-400`}>
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

const PartnerPage: React.FC = () => {
  const navigate = useNavigate();

  const partnershipTypes = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Educational Resources",
      description: "Books, learning materials, educational software, and digital resources",
      items: ["Textbooks & Reference Books", "Educational Software", "Learning Materials", "Digital Resources", "Library Books"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Technology Equipment",
      description: "Computers, tablets, projectors, and modern learning technology",
      items: ["Desktop Computers", "Laptops & Tablets", "Projectors", "Interactive Whiteboards", "Laboratory Equipment"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Armchair className="w-8 h-8" />,
      title: "Furniture & Infrastructure",
      description: "Desks, chairs, classroom furniture, and facility improvements",
      items: ["Student Desks & Chairs", "Teacher Furniture", "Storage Solutions", "Playground Equipment", "Office Furniture"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Professional Services",
      description: "Expertise, training, mentorship, and professional development",
      items: ["Teacher Training", "IT Support", "Maintenance Services", "Professional Mentorship", "Skill Development"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      info: "📱 0244758575, 📱 0244730726",
      description: "Speak directly with our partnership coordinator"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      info: "contact@stlouisdemojhs.com",
      description: "Send us details about your partnership proposal"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      info: "P.O. Box 3041, Mbrom-Kumasi | GPS: AK-015-1612 🏫",
      description: "Schedule a visit to see our facilities and discuss partnerships"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Partner With Us | St. Louis Demonstration JHS"
        description="Join us in transforming education at St. Louis Demonstration JHS through meaningful partnerships. Contribute educational resources, technology, furniture, or professional services to support our students' success."
        keywords="partnership, educational partnership, school collaboration, donate resources, support education, Ghana school partnership, educational sponsorship"
        url="/partner"
        type="website"
        pageType="contact"
        useGalleryImages={true}
      /
        canonical="https://stlouisdemojhs.com/partner"
      >
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Partner With Us
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section with School Background - Dark Aero */}
      <section className="py-8 sm:py-12 md:py-16 text-white relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-1200,h-800,q-70"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover"
            shimmerClassName="w-full h-full"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
        <div className="w-full px-2 sm:px-4 relative z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto text-center"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
              <Handshake className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Partner With Us
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 mb-4 sm:mb-6 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Join us in transforming education at St. Louis Demonstration JHS through meaningful partnerships and generous contributions
            </p>
            <div className="bg-yellow-400/20 backdrop-blur-sm rounded-xl border border-yellow-300/40 p-4 sm:p-6 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8">
              <p className="text-yellow-300 text-sm sm:text-base md:text-lg font-bold text-center" style={{ textShadow: '0 0 10px rgba(255, 255, 0, 0.8)' }}>
                🤝 We Welcome Official Partnerships With:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🏢</div>
                  <p className="text-white text-xs sm:text-sm font-semibold">Local Organizations</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🌍</div>
                  <p className="text-white text-xs sm:text-sm font-semibold">Foreign Education-Oriented Organizations</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">❤️</div>
                  <p className="text-white text-xs sm:text-sm font-semibold">Non-Profit Organizations</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 sm:gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-3 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs sm:text-sm md:text-base font-bold rounded-lg sm:rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" />
                Start Partnership
              </a>
              <a
                href="#partnership-types"
                className="inline-flex items-center justify-center px-3 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs sm:text-sm md:text-base font-bold rounded-lg sm:rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* Partnership Types Section - Dark Aero */}
      <section id="partnership-types" className="py-6 sm:py-8 md:py-12 relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?updatedAt=1748185709667&tr=w-1200,h-800,q-60"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover opacity-30"
            shimmerClassName="w-full h-full opacity-30"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/60 to-green-900/40"></div>
        <div className="w-full px-2 sm:px-4 relative z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-12"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ways to Partner With Us
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
              We warmly welcome partnerships in various forms. Your contribution, whether big or small,
              makes a meaningful difference in our students' educational journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-6xl mx-auto">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${type.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 md:mb-6 shadow-lg`}>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8">
                    {type.icon}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4">{type.title}</h3>
                <p className="text-gray-300 mb-3 sm:mb-4 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">{type.description}</p>
                <ul className="space-y-1 sm:space-y-2">
                  {type.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-300">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" flip={true} />

      {/* Organizational Partnerships Section - Dark Aero */}
      <section className="py-6 sm:py-8 md:py-12 relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-1200,h-800,q-60"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover opacity-30"
            shimmerClassName="w-full h-full opacity-30"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/40 via-black/60 to-orange-900/40"></div>
        <div className="w-full px-2 sm:px-4 relative z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-12"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6">
              Organizational Partnership Opportunities
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
              We actively seek partnerships with organizations that share our commitment to educational excellence and student development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-xs sm:max-w-md md:max-w-5xl lg:max-w-6xl mx-auto">
            {/* Local Organizations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-300/30"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg mx-auto">
                <div className="text-2xl sm:text-3xl">🏢</div>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 text-center">Local Organizations</h3>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Community Development Groups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Local Businesses & Corporations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Religious Organizations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Professional Associations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Alumni Networks</span>
                </li>
              </ul>
            </motion.div>

            {/* Foreign Education-Oriented Organizations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-300/30"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg mx-auto">
                <div className="text-2xl sm:text-3xl">🌍</div>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 text-center">International Education Partners</h3>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>International Schools & Universities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Educational Technology Companies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Research Institutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Cultural Exchange Programs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>International Development Agencies</span>
                </li>
              </ul>
            </motion.div>

            {/* Non-Profit Organizations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-300/30"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg mx-auto">
                <div className="text-2xl sm:text-3xl">❤️</div>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 text-center">Non-Profit Organizations</h3>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Educational Foundations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Youth Development Organizations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Charitable Foundations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Community Service Groups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Humanitarian Organizations</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Partnership Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-12 max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl border border-yellow-300/40 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-yellow-300 mb-4 text-center">Partnership Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center text-white text-sm sm:text-base">
                  <span className="text-yellow-400 mr-2">✨</span>
                  <span>Official recognition and acknowledgment</span>
                </div>
                <div className="flex items-center text-white text-sm sm:text-base">
                  <span className="text-yellow-400 mr-2">📜</span>
                  <span>Partnership certificates and documentation</span>
                </div>
                <div className="flex items-center text-white text-sm sm:text-base">
                  <span className="text-yellow-400 mr-2">🌟</span>
                  <span>Featured on our website and materials</span>
                </div>
                <div className="flex items-center text-white text-sm sm:text-base">
                  <span className="text-yellow-400 mr-2">🤝</span>
                  <span>Long-term collaborative relationships</span>
                </div>
                <div className="flex items-center text-white text-sm sm:text-base">
                  <span className="text-yellow-400 mr-2">📊</span>
                  <span>Impact reports and progress updates</span>
                </div>
                <div className="flex items-center text-white text-sm sm:text-base">
                  <span className="text-yellow-400 mr-2">💝</span>
                  <span>Special gratitude events and ceremonies</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Dark Aero */}
      <section id="contact" className="py-6 sm:py-8 md:py-12 relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?updatedAt=1748185709667&tr=w-1200,h-800,q-70"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover"
            shimmerClassName="w-full h-full"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40"></div>
        <div className="w-full px-2 sm:px-4 relative z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-12"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
              Contact us today to discuss how we can work together to enhance educational opportunities
              for our students. We're excited to hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-5xl mx-auto mb-6 sm:mb-8 md:mb-12">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-2 sm:p-3 md:p-4 lg:p-6 glass-card rounded-lg sm:rounded-xl md:rounded-2xl hover:bg-white/10 transition-colors duration-300 border border-white/20"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white mb-1 sm:mb-2">{method.title}</h3>
                <p className="text-blue-400 font-semibold mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm">{method.info}</p>
                <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-300">{method.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <a
              href="/contact"
              onClick={() => {
                navigate('/contact');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm md:text-base font-bold rounded-lg sm:rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" />
              Contact Us Today
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnerPage;
