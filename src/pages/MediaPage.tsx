import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Newspaper, Video, Download, ExternalLink, Calendar, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionDivider from '../components/common/SectionDivider';

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

const MediaPage: React.FC = () => {
  const navigate = useNavigate();

  const pressReleases = [
    {
      title: "St. Louis Demo JHS Wins Regional Mathematics Competition",
      date: "May 15, 2025",
      category: "Achievement",
      summary: "Our students secured first place in the regional mathematics olympiad, showcasing exceptional problem-solving skills.",
      downloadUrl: "#",
      image: "https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "New Computer Lab Opens at St. Louis Demo JHS",
      date: "April 22, 2025",
      category: "Infrastructure",
      summary: "State-of-the-art computer lab with 30 high-performance computers enhances our technology curriculum.",
      downloadUrl: "#",
      image: "https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Excellence in Education Award Recognition",
      date: "March 10, 2025",
      category: "Award",
      summary: "St. Louis Demo JHS receives prestigious award for outstanding educational programs and student achievements.",
      downloadUrl: "#",
      image: "https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const mediaKit = [
    {
      title: "School Logo Package",
      description: "High-resolution logos in various formats (PNG, SVG, EPS)",
      type: "Images",
      size: "2.5 MB",
      icon: <Camera className="w-6 h-6" />
    },
    {
      title: "School Fact Sheet",
      description: "Key statistics, history, and achievements overview",
      type: "PDF",
      size: "1.2 MB",
      icon: <Newspaper className="w-6 h-6" />
    },
    {
      title: "Campus Photos",
      description: "High-quality images of facilities and student life",
      type: "Images",
      size: "15.8 MB",
      icon: <Camera className="w-6 h-6" />
    },
    {
      title: "Leadership Bios",
      description: "Biographies and photos of key administrators",
      type: "PDF",
      size: "3.1 MB",
      icon: <Newspaper className="w-6 h-6" />
    }
  ];

  const mediaContacts = [
    {
      name: "Mrs. Michelle Acquaye",
      title: "Headmistress",
      email: "headmistress@stlouisdemo.edu.gh",
      phone: "+233 XX XXX XXXX",
      specialty: "Educational Leadership & School Operations"
    },
    {
      name: "Media Relations Officer",
      title: "Communications Coordinator",
      email: "media@stlouisdemo.edu.gh",
      phone: "+233 XX XXX XXXX",
      specialty: "Press Inquiries & Media Relations"
    }
  ];

  const recentCoverage = [
    {
      outlet: "GhanaWeb",
      title: "St. Louis JHS lacks infrastructural facilities",
      date: "2024",
      type: "Article",
      url: "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/St-Louis-JHS-lacks-infrastructural-facilities-Headmistress-241061"
    },
    {
      outlet: "GhanaWeb",
      title: "Make classroom lively & pupil-friendly",
      date: "2024",
      type: "Article",
      url: "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/Make-the-classroom-lively-and-pupil-friendly-330489"
    },
    {
      outlet: "YouTube",
      title: "School Activities & Community",
      date: "2024",
      type: "Video",
      url: "https://www.youtube.com/watch?v=c90tOBl5K6g"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Native Back Button - Apple Design */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 bg-black/20 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-black/30 transition-all duration-200 shadow-lg"
          style={{ backdropFilter: 'blur(20px)' }}
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* Hero Section with School Background - Dark Aero */}
      <section className="py-12 sm:py-16 md:py-20 text-white relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-1200,h-800,q-70"
            alt="St. Louis Demo JHS Media Background"
            className="w-full h-full object-cover"
            shimmerClassName="w-full h-full"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Newspaper className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Media & Press
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Your source for news, press releases, and media resources about St. Louis Demonstration JHS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#press-releases"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Newspaper className="w-5 h-5 mr-2" />
                Latest News
              </a>
              <a
                href="#media-kit"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                Media Kit
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* Press Releases - Dark Aero */}
      <section id="press-releases" className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
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
        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Latest Press Releases
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Stay updated with the latest news and announcements from St. Louis Demonstration JHS.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pressReleases.map((release, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative h-48">
                  <OptimizedImage
                    src={release.image}
                    alt={release.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-blue-400/30">
                      {release.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {release.date}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{release.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{release.summary}</p>
                  <button className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" flip={true} />

      {/* Media Kit - Dark Aero */}
      <section id="media-kit" className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
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
        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Media Kit & Resources
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Download high-quality assets and information for your media coverage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {mediaKit.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 cursor-pointer border border-white/20"
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mr-4 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{item.type} • {item.size}</span>
                      <button className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* Recent Coverage - Dark Aero */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?updatedAt=1748185709667&tr=w-1200,h-800,q-60"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover opacity-20"
            shimmerClassName="w-full h-full opacity-20"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/60 to-green-900/40"></div>
        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Recent Media Coverage
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              See how St. Louis Demonstration JHS has been featured in the media.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {recentCoverage.map((coverage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white mr-3">
                    {coverage.type === 'Video' ? <Video className="w-4 h-4" /> : <Newspaper className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{coverage.outlet}</h4>
                    <p className="text-xs text-gray-400">{coverage.date}</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{coverage.title}</h3>
                <a
                  href={coverage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Coverage
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" flip={true} />

      {/* Media Contacts - Dark Aero */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
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
        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Media Contacts
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Get in touch with our media relations team for interviews, quotes, and additional information.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mediaContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-2">{contact.name}</h3>
                <p className="text-blue-400 font-semibold mb-4">{contact.title}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-300">
                    <strong>Email:</strong> {contact.email}
                  </p>
                  <p className="text-gray-300">
                    <strong>Phone:</strong> {contact.phone}
                  </p>
                </div>
                <p className="text-sm text-gray-400">{contact.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaPage;
