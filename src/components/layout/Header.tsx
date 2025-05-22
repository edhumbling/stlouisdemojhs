import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { navLinks } from '../../data';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'glass-dark shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-3">
            <img
              src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs"
              alt="St. Louis Demonstration Junior High School"
              className="h-12 w-auto"
            />
            <div className={`hidden md:block transition-colors duration-300 ${
              scrolled ? 'text-white' : 'text-primary-800'
            }`}>
              <h1 className="text-lg font-bold leading-tight">St. Louis Demonstration</h1>
              <p className="text-xs">Junior High School</p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `
                      relative font-medium transition-colors duration-300 hover:text-accent-500
                      ${scrolled
                        ? isActive
                          ? 'text-accent-300'
                          : 'text-white'
                        : isActive
                          ? 'text-primary-700'
                          : 'text-primary-800'
                      }
                    `}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-primary-800"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X size={24} className={scrolled ? 'text-white' : 'text-primary-800'} />
            ) : (
              <Menu size={24} className={scrolled ? 'text-white' : 'text-primary-800'} />
            )}
          </button>
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
          <ul className="py-4">
            {navLinks.map((link) => (
              <li key={link.path} className="px-4 py-2">
                <NavLink
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => `
                    block py-2 font-medium
                    ${isActive ? 'text-primary-700' : 'text-gray-800 hover:text-primary-600'}
                  `}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;