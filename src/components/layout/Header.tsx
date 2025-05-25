import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, schoolDropdownItems } from '../../data';
import DonateButton from '../common/DonateButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchoolDropdownOpen, setIsSchoolDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${getHeaderClasses()}`}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)'
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2 sm:space-x-3 flex-1 mr-4">
            <img
              src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs"
              alt="St. Louis Demonstration Junior High School"
              className="h-8 xs:h-10 sm:h-12 w-auto"
            />
            <div className={`md:hidden flex items-center transition-colors duration-300 text-white`}>
              <div>
                <h1 className="text-xs sm:text-sm font-bold leading-tight tracking-tight">St. Louis Demonstration</h1>
                <p className="text-[10px] sm:text-xs leading-tight tracking-tight">Junior High School</p>
              </div>
              <img
                src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MhQQRoQ5lei2Xoxy0tQ8z7rZTRLfvgpmsuw35"
                alt="School Badge"
                className="h-6 w-auto ml-1"
              />
            </div>
            <div className={`hidden md:flex items-center transition-colors duration-300 text-white`}>
              <div>
                <h1 className="text-lg font-bold leading-tight">St. Louis Demonstration</h1>
                <p className="text-xs">Junior High School</p>
              </div>
              <img
                src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MhQQRoQ5lei2Xoxy0tQ8z7rZTRLfvgpmsuw35"
                alt="School Badge"
                className="h-8 w-auto ml-3"
              />
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-6">
              <ul className="flex space-x-6">
                {/* School Dropdown */}
                <li className="relative">
                  <button
                    onMouseEnter={() => setIsSchoolDropdownOpen(true)}
                    onMouseLeave={() => setIsSchoolDropdownOpen(false)}
                    className={`
                      relative font-medium text-sm transition-colors duration-300 hover:text-accent-500 flex items-center gap-1
                      ${isHomePage ? 'text-white' : 'text-white'}
                    `}
                  >
                    School
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isSchoolDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Beautiful Dropdown Menu */}
                  <AnimatePresence>
                    {isSchoolDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setIsSchoolDropdownOpen(true)}
                        onMouseLeave={() => setIsSchoolDropdownOpen(false)}
                        className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50"
                      >
                        {schoolDropdownItems.map((item, index) => (
                          <motion.div
                            key={item.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Link
                              to={item.path}
                              className="flex items-center p-4 hover:bg-blue-50/80 transition-all duration-200 group"
                              onClick={() => setIsSchoolDropdownOpen(false)}
                            >
                              <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.label}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                                  {item.label}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {/* Regular Navigation Links */}
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
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
              </ul>
              <DonateButton variant="header" />
            </div>
          </nav>

          {/* Mobile Navigation - Donate Button and Menu */}
          <div className="md:hidden flex items-center space-x-4 flex-shrink-0">
            <DonateButton variant="header" />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Dark Glass Transparent with Two Columns */}
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/80 backdrop-blur-lg border-t border-white/10"
        >
          <div className="p-4">
            {/* School Section - Mobile */}
            <div className="mb-4">
              <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 px-2">School</h3>
              <div className="grid grid-cols-1 gap-2 mb-4">
                {schoolDropdownItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white text-sm">{item.label}</h4>
                        <p className="text-white/70 text-xs mt-0.5 leading-tight">{item.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Other Menu Items - Two Column Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: (index + schoolDropdownItems.length) * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `
                      block py-3 px-3 font-medium rounded-xl text-center text-sm relative transition-all duration-200
                      ${isActive
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'text-white/90 hover:bg-white/10 border border-transparent hover:border-white/20'
                      }
                    `}
                  >
                    {link.label}
                    {/* Red Buzzing Notification Dot for News & Events - Mobile */}
                    {link.label === 'News & Events' && (
                      <span className="absolute top-1 right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
                      </span>
                    )}
                    {/* AI Sparkle Indicator for AI Search - Mobile */}
                    {link.label === 'AI Search' && (
                      <span className="absolute top-1 right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_8px_rgba(147,51,234,0.8)] animate-pulse"></span>
                      </span>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Donate Button - Exact Copy from Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 relative overflow-hidden px-6 py-3 text-base bg-red-600 hover:bg-red-700 text-white rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.4),0_0_60px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8),0_0_50px_rgba(239,68,68,0.6),0_0_75px_rgba(239,68,68,0.4)] neon-red-glow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="w-4 h-4 mr-2 fill-current relative z-10 text-white neon-text-glow" />
                  <span className="relative z-10 font-bold text-white neon-text-glow">Donate</span>

                  {/* Neon red glowing effect */}
                  <span className="absolute inset-0 bg-red-500 opacity-40 animate-pulse rounded-full"></span>
                  <span className="absolute inset-0 bg-red-400 opacity-30 animate-ping rounded-full" style={{ animationDelay: '0.5s' }}></span>
                  <span className="absolute -inset-1 bg-red-500 opacity-25 blur-md animate-pulse rounded-full" style={{ animationDelay: '1s' }}></span>
                  <span className="absolute -inset-2 bg-red-600 opacity-15 blur-lg animate-pulse rounded-full" style={{ animationDelay: '1.5s' }}></span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;