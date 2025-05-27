import React from 'react';
import { motion } from 'framer-motion';

interface SocialMediaIconsProps {
  className?: string;
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ className = '' }) => {
  return (
    <div
      className={`fixed
        left-4 top-20 sm:left-6 sm:top-24 md:left-8 md:top-28
        lg:left-auto lg:right-4 lg:top-20 xl:right-6 xl:top-24 2xl:right-8 2xl:top-28
        z-[9999] flex flex-col space-y-2 ${className}`}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
        contain: 'layout style'
      }}
    >

      {/* Facebook Icon */}
      <motion.a
        href="https://www.facebook.com/stlouisdemojhs"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                   rounded-full shadow-lg hover:shadow-2xl transition-all duration-300
                   bg-[#1877F2]/90 hover:bg-[#1877F2] border border-[#1877F2]/50 hover:border-[#1877F2]
                   transform hover:scale-110 hover:-translate-y-1"
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{
          boxShadow: '0 0 15px rgba(24, 119, 242, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2)',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      >
        {/* Official Facebook Logo SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-[#1877F2] opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
      </motion.a>

      {/* WhatsApp Icon - Overlapping slightly */}
      <motion.a
        href="https://whatsapp.com/channel/0029VbBO7RD7IUYZjOnapG3q"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                   rounded-full shadow-lg hover:shadow-2xl transition-all duration-300
                   bg-[#25D366]/90 hover:bg-[#25D366] border border-[#25D366]/50 hover:border-[#25D366]
                   transform hover:scale-110 hover:-translate-y-1 -mt-2"
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={{
          boxShadow: '0 0 15px rgba(37, 211, 102, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2)',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      >
        {/* Official WhatsApp Logo SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
        </svg>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 hover:opacity-20 transition-opacity duration-300"></div>

        {/* Pulse effect for WhatsApp */}
        <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-20"></span>
      </motion.a>
    </div>
  );
};

export default SocialMediaIcons;
