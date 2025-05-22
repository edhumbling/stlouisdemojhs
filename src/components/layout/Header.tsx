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
          <NavLink to="/" className="flex items-center space-x-2 sm:space-x-3">
            <img
              src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs"
              alt="St. Louis Demonstration Junior High School"
              className="h-8 xs:h-10 sm:h-12 w-auto"
            />
            <div className={`md:hidden flex items-center transition-colors duration-300 ${
              scrolled ? 'text-white' : 'text-primary-800'
            }`}>
              <div>
                <h1 className="text-xs sm:text-sm font-bold leading-tight tracking-tight">St. Louis Demonstration</h1>
                <p className="text-[10px] sm:text-xs leading-tight tracking-tight">Junior High School</p>
              </div>
              <img
                src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MqAHf0GQQOhZkrEnRa2dswxvNMHPcmT9p0b6z"
                alt="School Badge"
                className="h-6 w-auto ml-2"
              />
            </div>
            <div className={`hidden md:flex items-center transition-colors duration-300 ${
              scrolled ? 'text-white' : 'text-primary-800'
            }`}>
              <div>
                <h1 className="text-lg font-bold leading-tight">St. Louis Demonstration</h1>
                <p className="text-xs">Junior High School</p>
              </div>
              <img
                src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MqAHf0GQQOhZkrEnRa2dswxvNMHPcmT9p0b6z"
                alt="School Badge"
                className="h-8 w-auto ml-3"
              />
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
            className="md:hidden text-primary-800 p-2 rounded-full hover:bg-white/10 transition-colors"
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
                    block py-3 px-4 font-medium rounded-lg text-center text-base
                    ${isActive
                      ? 'bg-green-600 text-white'
                      : 'text-white hover:bg-white/10'
                    }
                  `}
                >
                  {link.label}
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