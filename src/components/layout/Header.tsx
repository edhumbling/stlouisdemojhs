import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { navLinks } from '../../data';
import DonateButton from '../common/DonateButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

                      {/* LearnHub Indicator */}
                      {link.label === 'LearnHub' && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-orange-600 to-yellow-600 shadow-[0_0_10px_rgba(249,115,22,0.8),0_0_20px_rgba(249,115,22,0.6),0_0_30px_rgba(249,115,22,0.4)] animate-pulse"></span>
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden glass-dark shadow-lg"
        >
          <ul className="py-6 px-2">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.path}
                className="mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <NavLink
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => `
                    block py-3 px-4 font-medium rounded-lg text-center text-base relative
                    ${isActive
                      ? 'bg-green-600 text-white'
                      : 'text-white hover:bg-white/10'
                    }
                  `}
                >
                  {link.label}
                  {/* Red Buzzing Notification Dot for News & Events - Mobile */}
                  {link.label === 'News & Events' && (
                    <span className="absolute top-2 right-2 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.8),0_0_20px_rgba(239,68,68,0.6),0_0_30px_rgba(239,68,68,0.4)] animate-pulse"></span>
                    </span>
                  )}
                  {/* AI Sparkle Indicator for AI Search - Mobile */}
                  {link.label === 'AI Search' && (
                    <span className="absolute top-2 right-2 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_10px_rgba(147,51,234,0.8),0_0_20px_rgba(147,51,234,0.6),0_0_30px_rgba(147,51,234,0.4)] animate-pulse"></span>
                    </span>
                  )}

                  {/* STEM Indicator - Mobile */}
                  {link.label === 'STEM' && (
                    <span className="absolute top-2 right-2 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-green-600 to-blue-600 shadow-[0_0_10px_rgba(34,197,94,0.8),0_0_20px_rgba(34,197,94,0.6),0_0_30px_rgba(34,197,94,0.4)] animate-pulse"></span>
                    </span>
                  )}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;