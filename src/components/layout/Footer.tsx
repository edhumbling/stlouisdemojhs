import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone, MapPin } from 'lucide-react';
import ScrollingBanner from '../common/ScrollingBanner';
import DonateButton from '../common/DonateButton';
import { getSchoolStats } from '../../utils/schoolStats';

const Footer: React.FC = () => {
  // Get dynamic school statistics
  const schoolStats = getSchoolStats();

  return (
    <footer className="glass-dark text-white pt-10 md:pt-12 pb-6 relative">

      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="space-y-8 mb-8">
          {/* Top Row - School Info and Social Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
            {/* School Info */}
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <img
                  src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs"
                  alt="St. Louis Demonstration Junior High School"
                  className="h-10 sm:h-12 w-auto mr-3"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-bold">St. Louis Demonstration</h3>
                  <p className="text-xs">Junior High School</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Established in {schoolStats.foundingYear}, providing quality education and nurturing young minds in Kumasi, Ghana.
                Guided by "UT SINT UNUM – DIEU LE VEUT" - fostering unity, discipline, and service
                while delivering the NaCCA-based Common Core Programme.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex flex-col">
              <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Connect With Us</h4>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">
                Stay updated with school news, events, and announcements. Follow us on social media!
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/stlouisdemojhs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2] hover:bg-[#166FE5] transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Facebook size={18} className="text-white" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="https://whatsapp.com/channel/0029VbBO7RD7IUYZjOnapG3q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#22C55E] transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-[18px] h-[18px]"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="sr-only">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Middle Row - Quick Links and Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
            {/* Quick Links */}
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Quick Links</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/academics" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                    Academic Programs
                  </Link>
                </li>
                <li>
                  <Link to="/faculty" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                    Faculty & Staff
                  </Link>
                </li>
                <li>
                  <Link to="/admissions" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                    News & Events
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                    Photo Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Contact Us</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start">
                  <MapPin size={16} className="mr-2 sm:mr-3 mt-1 flex-shrink-0 text-white/60 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">P.O. Box 3041, Kumasi, Ashanti Region, Ghana</span>
                </li>
                <li className="flex items-start">
                  <Phone size={16} className="mr-2 sm:mr-3 mt-1 flex-shrink-0 text-white/60 sm:w-5 sm:h-5" />
                  <div className="text-sm sm:text-base">
                    <div>📱 0244758575</div>
                    <div>📱 0244730726</div>
                    <div>📱 0548696528</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <Mail size={16} className="mr-2 sm:mr-3 flex-shrink-0 text-white/60 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">support@stlouisdemojhs.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row - Donate Section (Centered) */}
          <div className="border-t border-white/10 pt-6 relative z-10">
            <div className="text-center max-w-md mx-auto">
              <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Support Our Mission</h4>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">
                Help us modernize education for the AI era. Support teachers, students, and facilities development.
              </p>
              <DonateButton variant="footer" />
            </div>
          </div>
        </div>

        {/* Primus Intaparis Text */}
        <div className="relative z-10 text-center mt-12 mb-8 overflow-hidden">
          <h2
            className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold leading-none tracking-tight relative"
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: 'white',
              filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.3)) drop-shadow(0 2px 6px rgba(255, 255, 255, 0.2))',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)'
            }}
          >
Primus Intaparis
          </h2>
        </div>

        {/* Scrolling Banner */}
        <div className="relative z-10 -mx-4 mt-8 mb-0 overflow-hidden">
          <ScrollingBanner text="THE BEST AMONG THE REST!" />
        </div>

        <div className="border-t border-white/10 pt-4 sm:pt-5 mt-0 relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
              &copy; {new Date().getFullYear()} St. Louis Demonstration Junior High School. All rights reserved.
            </p>
            <div className="mt-3 md:mt-0">
              <ul className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500">
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

          {/* Creator credit with glowing effect */}
          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              Made with <span className="text-red-500">❤️</span> by{" "}
              <a
                href="https://www.linkedin.com/in/edhumbling"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block px-1 py-0.5 group"
              >
                <span className="relative z-10 font-medium text-yellow-300 group-hover:text-yellow-200 transition-colors">
                  Emmanuel Dwamena
                </span>
                <span className="absolute inset-0 -m-1 bg-yellow-400/30 blur-md animate-pulse rounded-lg group-hover:bg-yellow-400/40 transition-colors"></span>
                <span className="absolute inset-0 -m-0.5 bg-yellow-300/20 blur-sm animate-pulse rounded-lg" style={{ animationDelay: '0.5s' }}></span>
              </a>
              {" "}- 2012 Alumnus
            </p>
          </div>
        </div>

        {/* Footer image at the bottom */}
        <div className="mt-10 -mx-4 -mb-6 overflow-hidden">
          <img
            src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MqO2sszQQOhZkrEnRa2dswxvNMHPcmT9p0b6z"
            alt="Footer decoration"
            className="w-full h-auto"
            style={{
              display: 'block',
              marginBottom: '-1px' // Ensure it touches the bottom edge perfectly
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;