import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown, Home, Newspaper, Zap, Beaker, BookOpen, Camera, FileText, Mail, Calendar, Handshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, schoolDropdownItems, contactDropdownItems } from '../../data';
import DonateButton from '../common/DonateButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchoolDropdownOpen, setIsSchoolDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
            <div className={`md:hidden flex items-center transition-colors duration-300 text-white min-w-0 overflow-hidden`}>
              <div className="min-w-0 overflow-hidden">
                <h1 className="text-xs sm:text-sm font-bold leading-tight tracking-tight truncate">St. Louis Demonstration</h1>
                <p className="text-[10px] sm:text-xs leading-tight tracking-tight truncate">Junior High School</p>
              </div>
              <img
                src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MhQQRoQ5lei2Xoxy0tQ8z7rZTRLfvgpmsuw35"
                alt="School Badge"
                className="h-5 sm:h-6 w-auto ml-1 flex-shrink-0"
              />
            </div>
            <div className={`hidden md:flex items-center transition-colors duration-300 text-white min-w-0 overflow-hidden`}>
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
          <nav className="hidden md:block relative">
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
                    `}
                  >
                    Home
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
                      className={`transition-transform duration-100 ${isSchoolDropdownOpen ? 'rotate-180' : ''}`}
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
                        className="absolute top-full left-0 mt-3 w-[500px] bg-black/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden z-[9999]"
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

                        {/* Horizontal Layout with Beautiful Dividers */}
                        <div className="flex gap-0 p-1.5 relative">
                          {/* Vertical Dividers between items */}
                          {schoolDropdownItems.map((_, index) => (
                            index < schoolDropdownItems.length - 1 && (
                              <div
                                key={`divider-${index}`}
                                className="absolute top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent z-10"
                                style={{ left: `${((index + 1) / schoolDropdownItems.length) * 100}%` }}
                              />
                            )
                          ))}

                          {schoolDropdownItems.map((item, index) => (
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
                              className="relative z-20 flex-1"
                            >
                              <Link
                                to={item.path}
                                className="flex flex-col items-center p-2 mx-1 hover:bg-white/10 rounded-xl transition-all duration-300 group relative overflow-hidden h-full"
                                onClick={() => {
                                  setIsSchoolDropdownOpen(false);
                                  window.scrollTo({ top: 0, behavior: 'instant' });
                                }}
                              >
                                {/* Hover Background Effect */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-xl opacity-0 group-hover:opacity-100"
                                  initial={false}
                                  animate={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                />

                                {/* Image with Enhanced Hover Effect */}
                                <motion.div
                                  className="w-8 h-8 rounded-lg overflow-hidden mb-1.5 flex-shrink-0 relative"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                  <img
                                    src={item.image}
                                    alt={item.label}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>

                                {/* Content */}
                                <div className="text-center relative z-10 flex-1">
                                  <motion.h4
                                    className="text-white font-semibold text-xs mb-1 group-hover:text-blue-300 transition-colors duration-300"
                                    whileHover={{ y: -1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {item.label}
                                  </motion.h4>
                                  <p className="text-gray-400 text-[10px] leading-tight group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                                    {item.description}
                                  </p>
                                </div>

                                {/* Subtle Border Glow on Hover */}
                                <motion.div
                                  className="absolute inset-0 rounded-xl border border-blue-400/0 group-hover:border-blue-400/30"
                                  initial={false}
                                  whileHover={{
                                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                                    transition: { duration: 0.3 }
                                  }}
                                />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                      `}
                    >
                      {link.label}
                      {/* Red Buzzing Notification Dot for News & Events */}
                      {link.label === 'News & Events' && (
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

                      {/* STEM Indicator */}
                      {link.label === 'STEM' && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-green-600 to-blue-600 shadow-[0_0_10px_rgba(34,197,94,0.8),0_0_20px_rgba(34,197,94,0.6),0_0_30px_rgba(34,197,94,0.4)] animate-pulse"></span>
                        </span>
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
                    <ChevronDown size={16} className="ml-1 transition-transform duration-150 group-hover:rotate-180" />
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
              </ul>
              <DonateButton variant="header" />
            </div>
          </nav>

          {/* Mobile Navigation - Donate Button and Menu */}
          <div className="md:hidden flex items-center space-x-2 sm:space-x-4 flex-shrink-0 min-w-0">
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
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/85 backdrop-blur-lg border-t border-white/10 max-h-[80vh] overflow-y-auto"
        >
          <div className="p-3">
            {/* Home Link - Mobile with Icon */}
            <div className="mb-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <NavLink
                  to="/"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className={({ isActive }) => `
                    flex items-center justify-center py-2 px-3 font-medium rounded-lg text-sm relative transition-all duration-200
                    ${isActive
                      ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                      : 'text-white/90 hover:bg-white/10 border border-transparent hover:border-white/20'
                    }
                  `}
                >
                  <Home size={16} className="mr-2" />
                  Home
                </NavLink>
              </motion.div>
            </div>

            {/* School Section - Mobile (No Arrows) - Smaller Containers */}
            <div className="mb-2">
              <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5 px-1">School</h3>
              <div className="grid grid-cols-2 gap-1">
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
                      className="flex flex-col items-center p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20"
                    >
                      <div className="w-6 h-6 rounded-md overflow-hidden mb-1 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-medium text-white text-[10px] text-center leading-tight">{item.label}</h4>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Other Menu Items - Compact Grid with Icons */}
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {navLinks.map((link, index) => {
                // Get icon for each link
                const getIcon = (label: string) => {
                  switch (label) {
                    case 'News & Events': return <Newspaper size={14} className="mr-1.5" />;
                    case 'STEM': return <Beaker size={14} className="mr-1.5" />;
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
                        flex items-center justify-center py-2 px-2 font-medium rounded-lg text-xs relative transition-all duration-200
                        ${isActive
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'text-white/90 hover:bg-white/10 border border-transparent hover:border-white/20'
                        }
                      `}
                    >
                      {getIcon(link.label)}
                      {link.label}
                      {/* Red Buzzing Notification Dot for News & Events - Mobile */}
                      {link.label === 'News & Events' && (
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
                    flex items-center justify-center py-2 px-2 font-medium rounded-lg text-xs relative transition-all duration-200
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
            </div>

            {/* Contact Section - Mobile (With Arrows) */}
            <div className="mb-3">
              <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 px-1 flex items-center">
                Contact
                <ChevronDown size={12} className="ml-1 text-white/50" />
              </h3>
              <div className="grid grid-cols-2 gap-1.5">
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
                      className="flex items-center justify-between p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20"
                    >
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 mr-2 flex-shrink-0 flex items-center justify-center">
                          <div className="text-white text-xs">
                            {item.icon && renderContactIcon(item.icon, 12)}
                          </div>
                        </div>
                        <h4 className="font-medium text-white text-xs truncate">{item.label}</h4>
                      </div>
                      <ChevronDown size={10} className="text-white/50 transform -rotate-90 flex-shrink-0 ml-1" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Donate Button - Simplified for Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-center"
            >
              <DonateButton variant="footer" />
            </motion.div>
          </div>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;