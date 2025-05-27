import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Share2 } from 'lucide-react';

interface SocialMediaIconsProps {
  className?: string;
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ className = '' }) => {
  const location = useLocation();
  const [shareSuccess, setShareSuccess] = useState(false);

  // Ensure icons are always visible on all pages, including iframe pages
  const isFullScreenPage = ['/learnhub', '/ai-search', '/calendar', '/schedule-visit'].some(path =>
    location.pathname.startsWith(path)
  );

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: 'St. Louis Demonstration J.H.S',
      text: 'Check out St. Louis Demonstration Junior High School - Leading Forces in Excellent & Wholistic Education',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        // Use native share API if available
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (error) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (clipboardError) {
        console.log('Share failed:', error);
      }
    }
  };
  return (
    <div
      className={`fixed right-3 top-1/2 transform -translate-y-1/2 sm:right-4 md:right-6
        ${isFullScreenPage ? 'z-[99999]' : 'z-[9999]'} flex flex-col space-y-1 sm:space-y-2 ${className}`}
      style={{
        transform: 'translateZ(0) translateY(-50%)',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
        contain: 'layout style',
        pointerEvents: 'auto'
      }}
    >

      {/* Facebook Icon */}
      <motion.a
        href="https://www.facebook.com/stlouisdemojhs"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
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
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
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
        className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                   rounded-full shadow-lg hover:shadow-2xl transition-all duration-300
                   bg-[#25D366]/90 hover:bg-[#25D366] border border-[#25D366]/50 hover:border-[#25D366]
                   transform hover:scale-110 hover:-translate-y-1 -mt-1"
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
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
        </svg>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 hover:opacity-20 transition-opacity duration-300"></div>

        {/* Pulse effect for WhatsApp */}
        <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-20"></span>
      </motion.a>

      {/* Share Button */}
      <motion.button
        onClick={handleShare}
        className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                   rounded-full shadow-lg hover:shadow-2xl transition-all duration-300
                   bg-gray-600/90 hover:bg-gray-500 border border-gray-500/50 hover:border-gray-400
                   transform hover:scale-110 hover:-translate-y-1"
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        style={{
          boxShadow: '0 0 15px rgba(107, 114, 128, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2)',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
        title={shareSuccess ? 'Link copied!' : 'Share this page'}
      >
        {/* Share Icon */}
        <Share2
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
          strokeWidth={2.5}
        />

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-gray-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>

        {/* Success feedback */}
        {shareSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
          >
            Link copied!
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default SocialMediaIcons;
