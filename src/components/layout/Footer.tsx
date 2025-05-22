import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="glass-dark text-white pt-12 pb-6 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* School Info */}
          <div className="flex flex-col relative z-10">
            <div className="flex items-center mb-4">
              <img 
                src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs" 
                alt="St. Louis Demonstration Junior High School" 
                className="h-12 w-auto mr-3"
              />
              <div>
                <h3 className="text-lg font-bold">St. Louis</h3>
                <p className="text-xs">Demonstration Junior High School</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Providing quality education and nurturing young minds since 1985. 
              Our mission is to create a supportive learning environment where 
              students can develop academically, socially, and emotionally.
            </p>
            <div className="flex space-x-4 mt-auto">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-gray-400 hover:text-white transition-colors">
                  Academic Programs
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="text-gray-400 hover:text-white transition-colors">
                  Faculty & Staff
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-gray-400 hover:text-white transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition-colors">
                  News & Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-white transition-colors">
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 flex-shrink-0 text-white/60" />
                <span>123 Education Avenue, St. Louis, MO 63101, United States</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 flex-shrink-0 text-white/60" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 flex-shrink-0 text-white/60" />
                <span>info@stlouisdemo.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 mt-6 relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} St. Louis Demonstration Junior High School. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-white/90 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white/90 transition-colors">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white/90 transition-colors">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;