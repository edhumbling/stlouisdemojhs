import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown, Home, Newspaper, Zap, Beaker, BookOpen, Camera, FileText, Mail, Calendar, Handshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, schoolDropdownItems, contactDropdownItems } from '../../data';
import DonateButton from '../common/DonateButton';
import { useDeviceDetection } from '../../hooks/useDeviceDetection';


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchoolDropdownOpen, setIsSchoolDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Smart device detection for navigation - Conservative approach to prevent flashing
  const deviceInfo = useDeviceDetection();
  // Only force mobile nav for tablets (iPads), CSS handles regular mobile/desktop
  const forceTabletMobileNav = deviceInfo.type === 'tablet';

  // Function to render contact icons
  const renderContactIcon = (iconName: string, size: number = 16) => {
    switch (iconName) {
      case 'Mail': return <Mail size={size} />;
      case 'Calendar': return <Calendar size={size} />;
      case 'Handshake': return <Handshake size={size} />;
      case 'Newspaper': return <Newspaper size={size} />;
      default: return <Mail size={size} />;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Enhanced glass effect for all pages
  const getHeaderClasses = () => {
    if (isHomePage) {
      return scrolled
        ? 'glass-homepage shadow-2xl'
        : 'glass-homepage shadow-lg';
    } else {
      return scrolled
        ? 'glass-dark shadow-2xl'
        : 'glass-dark shadow-lg';
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full max-w-full z-50 transition-all duration-500 ease-in-out ${getHeaderClasses()}`}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        contain: 'layout style'
      }}
    >
      <div className="container mx-auto px-4 py-4 max-w-full">
        <div className="flex items-center justify-between min-w-0">
          <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-1 mr-2 sm:mr-4 min-w-0 overflow-hidden">
            <img
              src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs"
              alt="St. Louis Demonstration Junior High School"
              className="h-8 xs:h-10 sm:h-12 w-auto flex-shrink-0"
            />
            <div className={`${forceTabletMobileNav ? 'flex' : 'lg:hidden flex'} items-center transition-colors duration-300 text-white min-w-0 overflow-hidden`}>
              <div className="min-w-0 overflow-hidden">
                <h1 className="text-xs sm:text-sm md:text-base font-bold leading-tight tracking-tight truncate">St. Louis Demonstration</h1>
                <p className="text-[10px] sm:text-xs md:text-sm leading-tight tracking-tight truncate">Junior High School</p>
              </div>
              <img
                src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MhQQRoQ5lei2Xoxy0tQ8z7rZTRLfvgpmsuw35"
                alt="School Badge"
                className="h-5 sm:h-6 md:h-7 w-auto ml-1 flex-shrink-0"
              />
            </div>
            <div className={`${forceTabletMobileNav ? 'hidden' : 'hidden lg:flex'} items-center transition-colors duration-300 text-white min-w-0 overflow-hidden`}>
              <div className="min-w-0 overflow-hidden">
                <h1 className="text-lg font-bold leading-tight truncate">St. Louis Demonstration</h1>
                <p className="text-xs truncate">Junior High School</p>
              </div>
              <img
                src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MhQQRoQ5lei2Xoxy0tQ8z7rZTRLfvgpmsuw35"
                alt="School Badge"
                className="h-8 w-auto ml-3 flex-shrink-0"
              />
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className={`${forceTabletMobileNav ? 'hidden' : 'hidden lg:block'} relative`}>
            <div className="flex items-center space-x-6">
              <ul className="flex space-x-6">
                {/* Home Link */}
                <li>
                  <NavLink
                    to="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className={({ isActive }) => `
                      relative font-medium text-sm transition-colors duration-300 hover:text-accent-500
                      ${isHomePage
                        ? (isActive ? 'text-yellow-300' : 'text-white')
                        : (isActive ? 'text-accent-300' : 'text-white')
                      }
                      ${isActive ? 'nav-glass-glow md:text-yellow-300' : ''}
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        {/* Yellow glass glow effect for active tab on desktop only */}
                        {isActive && (
                          <span
                            className="hidden lg:block absolute inset-0 rounded-xl pointer-events-none z-0"
                            style={{
                              background: 'linear-gradient(120deg, rgba(253, 224, 71, 0.25) 0%, rgba(253, 224, 71, 0.10) 100%)',
                              boxShadow: '0 0 24px 8px rgba(253, 224, 71, 0.25), 0 2px 8px 0 rgba(253, 224, 71, 0.10)',
                              filter: 'blur(2px)'
                            }}
                          />
                        )}
                        <span
                          className={`relative z-10 ${isActive ? 'lg:text-yellow-300' : ''}`}
                          style={isActive ? { textShadow: '0 0 8px #fde047, 0 0 16px #fde04799' } : {}}
                        >
                          Home
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>

                {/* School Dropdown */}
                <li className="relative" style={{ zIndex: 10000 }}>
                  <button
                    onMouseEnter={() => setIsSchoolDropdownOpen(true)}
                    onMouseLeave={() => setIsSchoolDropdownOpen(false)}
                    className={`
                      relative font-medium text-sm transition-colors duration-300 hover:text-accent-500 flex items-center gap-1 h-5
                      ${isHomePage ? 'text-white' : 'text-white'}
                    `}
                  >
                    School
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-100"
                    />
                  </button>

                  {/* Beautiful 2-Column Dropdown Menu */}
                  <AnimatePresence>
                    {isSchoolDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{
                          duration: 0.2,
                          ease: [0.4, 0.0, 0.2, 1],
                          staggerChildren: 0.05
                        }}
                        onMouseEnter={() => setIsSchoolDropdownOpen(true)}
                        onMouseLeave={() => setIsSchoolDropdownOpen(false)}
                        className="absolute top-full left-0 mt-3 w-[480px] min-h-[320px] bg-black/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden z-[9999]"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '0',
                          marginTop: '12px',
                          zIndex: 9999,
                          backdropFilter: 'blur(24px)',
                          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {/* Header */}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-green-600/20"
                        >
                          <h3 className="text-white font-bold text-sm tracking-wide">School Information</h3>
                          <p className="text-gray-300 text-xs mt-1">Learn about our institution</p>
                        </motion.div>

                        {/* Three-Column Vertical Layout - Compact & Unique Design */}
                        <div className="p-4">
                          {/* Header */}
                          <div className="text-center mb-4">
                            <h3 className="text-white/90 text-sm font-semibold mb-1">School Information</h3>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 mx-auto rounded-full"></div>
                          </div>

                          {/* Three-Column Grid */}
                          <div className="grid grid-cols-3 gap-3">
                          {schoolDropdownItems.map((item, index) => (
                            <motion.div
                              key={item.path}
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{
                                  duration: 0.4,
                                  delay: index * 0.05,
                                ease: [0.4, 0.0, 0.2, 1]
                              }}
                              whileHover={{
                                  scale: 1.03,
                                  y: -2,
                                transition: { duration: 0.2 }
                              }}
                                whileTap={{ scale: 0.97 }}
                                className="relative group"
                            >
                              <Link
                                to={item.path}
                                  className="block p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20 relative overflow-hidden"
                                onClick={() => {
                                  setIsSchoolDropdownOpen(false);
                                  window.scrollTo({ top: 0, behavior: 'instant' });
                                }}
                              >
                                  {/* Animated Background Gradient */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5 opacity-0 group-hover:opacity-100"
                                  initial={false}
                                  whileHover={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                />

                                  {/* Content Container */}
                                  <div className="relative z-10">
                                    {/* Icon/Image */}
                                    <div className="flex items-center mb-2">
                                      <div className="w-6 h-6 rounded-md overflow-hidden mr-2 flex-shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.label}
                                    className="w-full h-full object-cover"
                                  />
                                      </div>
                                      <h4 className="text-white text-xs font-medium group-hover:text-blue-300 transition-colors duration-300 truncate">
                                    {item.label}
                                      </h4>
                                    </div>

                                    {/* Description */}
                                  <p className="text-gray-400 text-[10px] leading-tight group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                                    {item.description}
                                  </p>

                                    {/* Hover Arrow Indicator */}
                                    <motion.div
                                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      initial={false}
                                      whileHover={{ x: 2 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </motion.div>

                                    {/* Subtle Glow Effect */}
                                <motion.div
                                      className="absolute inset-0 rounded-lg border border-blue-400/0 group-hover:border-blue-400/20"
                                  initial={false}
                                  whileHover={{
                                        boxShadow: "0 0 15px rgba(59, 130, 246, 0.2)",
                                    transition: { duration: 0.3 }
                                  }}
                                />
                                  </div>
                              </Link>
                            </motion.div>
                          ))}
                          </div>

                          {/* Footer */}
                          <div className="mt-4 pt-3 border-t border-white/10">
                            <p className="text-center text-gray-400 text-[10px]">
                              Explore our comprehensive school resources
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {/* Louis AI - Desktop Only */}
                <li>
                  <NavLink
                    to="/louis-ai"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className={({ isActive }) => `
                      relative font-medium text-sm transition-colors duration-300 hover:text-accent-500
                      ${isHomePage
                        ? (isActive ? 'text-yellow-300' : 'text-white')
                        : (isActive ? 'text-accent-300' : 'text-white')
                      }
                      ${isActive ? 'nav-glass-glow lg:text-yellow-300' : ''}
                    `}
                    style={{ textShadow: '0 0 8px rgba(251, 146, 60, 0.8), 0 0 16px rgba(251, 146, 60, 0.6), 0 0 24px rgba(251, 146, 60, 0.4)' }}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 to-orange-400/20"
                            layoutId="activeNav"
                            initial={false}
                            whileHover={{
                              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                              transition: { duration: 0.3 }
                            }}
                          />
                        )}
                        <span
                          className={`relative z-10 ${isActive ? 'lg:text-yellow-300' : ''}`}
                          style={
                            isActive 
                              ? { textShadow: '0 0 8px #fde047, 0 0 16px #fde04799' } 
                              : { textShadow: '0 0 8px rgba(251, 146, 60, 0.8), 0 0 16px rgba(251, 146, 60, 0.6), 0 0 24px rgba(251, 146, 60, 0.4)' }
                          }
                        >
                          Louis AI
                        </span>
                        {/* Red dot glow indicator for Louis AI */}
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.8),0_0_20px_rgba(239,68,68,0.6),0_0_30px_rgba(239,68,68,0.4)] animate-pulse"></span>
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>

                {/* Regular Navigation Links */}
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                      className={({ isActive }) => `
                        relative font-medium text-sm transition-colors duration-300 hover:text-accent-500
                        ${isHomePage
                          ? (isActive ? 'text-yellow-300' : 'text-white')
                          : (isActive ? 'text-accent-300' : 'text-white')
                        }
                        ${isActive ? 'nav-glass-glow lg:text-yellow-300' : ''}
                      `}
                    >
                      {({ isActive }) => (
                        <>
                          {/* Yellow glass glow effect for active tab on desktop only */}
                          {isActive && (
                            <span
                              className="hidden lg:block absolute inset-0 rounded-xl pointer-events-none z-0"
                              style={{
                                background: 'linear-gradient(120deg, rgba(253, 224, 71, 0.25) 0%, rgba(253, 224, 71, 0.10) 100%)',
                                boxShadow: '0 0 24px 8px rgba(253, 224, 71, 0.25), 0 2px 8px 0 rgba(253, 224, 71, 0.10)',
                                filter: 'blur(2px)'
                              }}
                            />
                          )}
                          <span
                            className={`relative z-10 ${isActive ? 'lg:text-yellow-300' : ''}`}
                            style={
                              isActive 
                                ? { textShadow: '0 0 8px #fde047, 0 0 16px #fde04799' } 
                                : link.label === 'Louis AI' 
                                  ? { textShadow: '0 0 8px rgba(251, 146, 60, 0.8), 0 0 16px rgba(251, 146, 60, 0.6), 0 0 24px rgba(251, 146, 60, 0.4)' }
                                  : {}
                            }
                          >
                            {link.label}
                          </span>
                          {/* Red Buzzing Notification Dot for News */}
                          {link.label === 'News' && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.8),0_0_20px_rgba(239,68,68,0.6),0_0_30px_rgba(239,68,68,0.4)] animate-pulse"></span>
                            </span>
                          )}
                          {/* AI Sparkle Indicator for AI Search */}
                          {link.label === 'AI Search' && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_10px_rgba(147,51,234,0.8),0_0_20px_rgba(147,51,234,0.6),0_0_30px_rgba(147,51,234,0.4)] animate-pulse"></span>
                            </span>
                          )}
                          {/* STEM/TVET Indicator */}
                          {link.label === 'STEM/TVET' && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-green-600 to-blue-600 shadow-[0_0_10px_rgba(34,197,94,0.8),0_0_20px_rgba(34,197,94,0.6),0_0_30px_rgba(34,197,94,0.4)] animate-pulse"></span>
                            </span>
                          )}
                          {/* Red dot glow indicator for Louis AI */}
                          {link.label === 'Louis AI' && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.8),0_0_20px_rgba(239,68,68,0.6),0_0_30px_rgba(239,68,68,0.4)] animate-pulse"></span>
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}

                {/* Contact Dropdown */}
                <li className="relative group">
                  <button className={`
                    flex items-center font-medium text-sm transition-colors duration-300 hover:text-accent-500
                    ${isHomePage ? 'text-white' : 'text-white'}
                  `}>
                    Contact
                    <ChevronDown size={16} className="ml-1 transition-transform duration-150" />
                  </button>

                  <AnimatePresence>
                    {/* Contact 2-Column Dropdown Menu */}
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                        ease: [0.4, 0.0, 0.2, 1],
                        staggerChildren: 0.05
                      }}
                      className="absolute top-full right-0 mt-3 w-80 bg-black/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                      style={{
                        backdropFilter: 'blur(24px)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {/* Header */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20"
                      >
                        <h3 className="text-white font-bold text-sm tracking-wide">Contact Information</h3>
                        <p className="text-gray-300 text-xs mt-1">Get in touch with us</p>
                      </motion.div>

                      {/* 2-Column Grid Layout */}
                      <div className="grid grid-cols-2 gap-0 p-1.5">
                        {contactDropdownItems.map((item, index) => (
                          <motion.div
                            key={item.path}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.08,
                              ease: [0.4, 0.0, 0.2, 1]
                            }}
                            whileHover={{
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Link
                              to={item.path}
                              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                              className="flex flex-col items-center p-3 m-1 hover:bg-white/10 rounded-xl transition-all duration-300 group/item relative overflow-hidden"
                            >
                              {/* Hover Background Effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover/item:opacity-100"
                                initial={false}
                                animate={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />

                              {/* Icon with Enhanced Hover Effect */}
                              <motion.div
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 mb-2 flex-shrink-0 flex items-center justify-center relative"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              >
                                <div className="text-white group-hover/item:text-purple-300 transition-colors duration-300">
                                  {item.icon && renderContactIcon(item.icon, 20)}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-xl" />
                              </motion.div>

                              {/* Content */}
                              <div className="text-center relative z-10">
                                <motion.h4
                                  className="text-white font-semibold text-sm mb-1 group-hover/item:text-purple-300 transition-colors duration-300"
                                  whileHover={{ y: -1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {item.label}
                                </motion.h4>
                                <p className="text-gray-400 text-xs leading-relaxed group-hover/item:text-gray-300 transition-colors duration-300">
                                  {item.description}
                                </p>
                              </div>

                              {/* Subtle Border Glow on Hover */}
                              <motion.div
                                className="absolute inset-0 rounded-xl border border-purple-400/0 group-hover/item:border-purple-400/30"
                                initial={false}
                                whileHover={{
                                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)",
                                  transition: { duration: 0.3 }
                                }}
                              />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </li>

                {/* Apply Now - Standalone */}
                <li>
                  <NavLink
                    to="/apply-now"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className={({ isActive }) => `
                      font-medium text-sm transition-colors duration-300 hover:text-accent-500
                      ${isActive ? 'text-accent-500' : isHomePage ? 'text-white' : 'text-white'}
                    `}
                  >
                    Apply Now
                  </NavLink>
                </li>
                {/* "Become a Sponsor" link removed from desktop nav */}
              </ul>
              <DonateButton variant="header" />
            </div>
          </nav>

          {/* Mobile Navigation - Donate Button and Menu */}
          <div className={`${forceTabletMobileNav ? 'flex' : 'lg:hidden flex'} items-center space-x-2 sm:space-x-4 flex-shrink-0 min-w-0`}>
            <div className="flex-shrink-0">
              <DonateButton variant="header" />
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={20} className="text-white" />
              ) : (
                <Menu size={20} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Compact Dark Glass */}
      {isMenuOpen && (forceTabletMobileNav || window.innerWidth < 1024) && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-black/85 backdrop-blur-lg border-t border-white/10 max-h-[80vh] overflow-y-auto"
        >
          <div className="p-3 md:p-6">

            {/* School Section - Mobile (No Arrows) - Smaller Containers */}
            <div className="mb-2 md:mb-4">
              <h3 className="text-white/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-1.5 md:mb-2 px-1">School</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
                {schoolDropdownItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }}
                      className="flex flex-col items-center p-1.5 md:p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20"
                    >
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-md overflow-hidden mb-1 md:mb-2 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-medium text-white text-[10px] md:text-xs text-center leading-tight">{item.label}</h4>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Other Menu Items - Compact Grid with Icons */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2 mb-3 md:mb-4">
              {navLinks.map((link, index) => {
                // Get icon for each link
                const getIcon = (label: string) => {
                  switch (label) {
                    case 'News': return <Newspaper size={14} className="mr-1.5" />;
                    case 'STEM/TVET': return <Beaker size={14} className="mr-1.5" />;
                    case 'Students Hub': return <BookOpen size={14} className="mr-1.5" />;
                    case 'AI Search': return <Zap size={14} className="mr-1.5" />;
                    case 'Gallery': return <Camera size={14} className="mr-1.5" />;
                    default: return null;
                  }
                };

                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: (index + schoolDropdownItems.length) * 0.05 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        // Only scroll to top for new page visits, not when returning
                        if (!sessionStorage.getItem(`scrollPosition_${link.path}`)) {
                          window.scrollTo({ top: 0, behavior: 'instant' });
                        }
                      }}
                      className={({ isActive }) => `
                        flex items-center justify-center py-2 md:py-3 px-2 md:px-3 font-medium rounded-lg text-xs md:text-sm relative transition-all duration-200
                        ${isActive
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'text-white/90 hover:bg-white/10 border border-transparent hover:border-white/20'
                        }
                      `}
                      style={
                        link.label === 'Louis AI' 
                          ? { textShadow: '0 0 8px rgba(251, 146, 60, 0.8), 0 0 16px rgba(251, 146, 60, 0.6), 0 0 24px rgba(251, 146, 60, 0.4)' }
                          : {}
                      }
                    >
                      {getIcon(link.label)}
                      {link.label}
                      {/* Red Buzzing Notification Dot for News - Mobile */}
                      {link.label === 'News' && (
                        <span className="absolute top-0.5 right-0.5 flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600 shadow-[0_0_6px_rgba(239,68,68,0.8)] animate-pulse"></span>
                        </span>
                      )}
                      {/* AI Sparkle Indicator for AI Search - Mobile */}
                      {link.label === 'AI Search' && (
                        <span className="absolute top-0.5 right-0.5 flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_6px_rgba(147,51,234,0.8)] animate-pulse"></span>
                        </span>
                      )}
                      {/* STEM/TVET Indicator - Mobile */}
                      {link.label === 'STEM/TVET' && (
                        <span className="absolute top-0.5 right-0.5 flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gradient-to-r from-green-600 to-blue-600 shadow-[0_0_6px_rgba(34,197,94,0.8)] animate-pulse"></span>
                        </span>
                      )}
                      {/* Red dot glow indicator for Louis AI - Mobile */}
                      {link.label === 'Louis AI' && (
                        <span className="absolute top-0.5 right-0.5 flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600 shadow-[0_0_6px_rgba(239,68,68,0.8)] animate-pulse"></span>
                        </span>
                      )}
                    </NavLink>
                  </motion.div>
                );
              })}

              {/* Apply Now - Right beside Gallery in 2-column layout */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: (navLinks.length + schoolDropdownItems.length) * 0.05 }}
              >
                <NavLink
                  to="/apply-now"
                  onClick={() => {
                    setIsMenuOpen(false);
                    // Only scroll to top for new page visits, not when returning
                    if (!sessionStorage.getItem(`scrollPosition_/apply-now`)) {
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }
                  }}
                  className={({ isActive }) => `
                    flex items-center justify-center py-2 md:py-3 px-2 md:px-3 font-medium rounded-lg text-xs md:text-sm relative transition-all duration-200
                    ${isActive
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-400/30'
                      : 'text-white/90 hover:bg-white/10 border border-transparent hover:border-white/20'
                    }
                  `}
                >
                  <FileText size={14} className="mr-1.5" />
                  Apply Now
                </NavLink>
              </motion.div>

              {/* Chat with Louis AI - Centered Glowing green button */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: (navLinks.length + schoolDropdownItems.length + 1) * 0.05 }}
                >
                  <NavLink
                    to="/louis-ai"
                    onClick={() => {
                      setIsMenuOpen(false);
                      // Only scroll to top for new page visits, not when returning
                      if (!sessionStorage.getItem(`scrollPosition_/louis-ai`)) {
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }
                    }}
                    className={({ isActive }) => `
                      flex items-center justify-center py-2 md:py-3 px-2 md:px-3 font-medium rounded-lg text-xs md:text-sm relative transition-all duration-200
                      ${isActive
                        ? 'bg-green-500/20 text-orange-300 border border-green-400/30'
                        : 'bg-green-500/10 text-orange-300 border border-green-400/30 hover:bg-green-500/20 hover:border-green-400/50 shadow-lg hover:shadow-green-500/25'
                      }
                      shadow-green-500/20 hover:shadow-green-500/30
                    `}
                    style={{ textShadow: '0 0 8px rgba(251, 146, 60, 0.8), 0 0 16px rgba(251, 146, 60, 0.6), 0 0 24px rgba(251, 146, 60, 0.4)' }}
                  >
                    <div className="relative">
                      <img
                        src="/ai bot.png"
                        alt="Louis AI"
                        className="w-4 h-4 mr-1.5 object-contain"
                      />
                      {/* Red dot glow indicator for Louis AI */}
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.8),0_0_20px_rgba(239,68,68,0.6),0_0_30px_rgba(239,68,68,0.4)] animate-pulse"></span>
                      </span>
                    </div>
                    Chat with Louis AI
                  </NavLink>
                </motion.div>
              </div>

              {/* "Become a Sponsor" link removed from mobile nav */}
            </div>

            {/* Contact Section - Mobile (With Arrows) */}
            <div className="mb-3 md:mb-4">
              <h3 className="text-white/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3 px-1 flex items-center">
                Contact
                <ChevronDown size={12} className="ml-1 text-white/50 md:w-4 md:h-4" />
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2">
                {contactDropdownItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: (index + schoolDropdownItems.length + navLinks.length) * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        // Only scroll to top for new page visits, not when returning
                        if (!sessionStorage.getItem(`scrollPosition_${item.path}`)) {
                          window.scrollTo({ top: 0, behavior: 'instant' });
                        }
                      }}
                      className="flex items-center justify-between p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20"
                    >
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-md bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 mr-2 flex-shrink-0 flex items-center justify-center">
                          <div className="text-white text-xs md:text-sm">
                            {item.icon && renderContactIcon(item.icon, 12)}
                          </div>
                        </div>
                        <h4 className="font-medium text-white text-xs md:text-sm truncate">{item.label}</h4>
                      </div>
                      <ChevronDown size={10} className="text-white/50 transform -rotate-90 flex-shrink-0 ml-1 md:w-3 md:h-3" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Donate Button - Simplified for Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.1 }}
              className="flex justify-center"
            >
              <DonateButton variant="footer" onClick={() => setIsMenuOpen(false)} />
            </motion.div>
          </div>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;