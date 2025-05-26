import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Shimmer Loading Component
const ShimmerLoader: React.FC<{ className?: string; rounded?: string }> = ({
  className = "w-full h-full",
  rounded = "rounded-xl"
}) => (
  <div className={`relative overflow-hidden ${rounded} bg-gray-800 ${className}`}>
    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800"></div>

    {/* Calendar-like placeholder content */}
    <div className="absolute inset-0 p-6 flex flex-col">
      {/* Header placeholder */}
      <div className="mb-6">
        <div className="h-8 bg-white/10 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-white/10 rounded w-1/2"></div>
      </div>

      {/* Calendar grid placeholder */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 bg-white/10 rounded"></div>
        ))}
      </div>

      {/* Calendar days placeholder */}
      <div className="grid grid-cols-7 gap-2 flex-1">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="h-10 bg-white/10 rounded"></div>
        ))}
      </div>

      {/* Time slots placeholder */}
      <div className="mt-6 space-y-2">
        <div className="h-4 bg-white/10 rounded w-1/4 mb-3"></div>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-white/10 rounded"></div>
          ))}
        </div>
      </div>
    </div>

    {/* Beautiful blur lights for shimmer effect */}
    <div className="absolute inset-0 opacity-60">
      <motion.div
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute top-3/4 right-1/3 w-12 h-12 bg-green-400/20 rounded-full blur-lg"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-8 h-8 bg-cyan-400/20 rounded-full blur-md"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
    </div>

    {/* Loading text with school logo */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center space-y-4">
        <motion.div
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/20 rounded-full mx-auto flex items-center justify-center text-4xl sm:text-5xl md:text-6xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          📅
        </motion.div>
        <div className="space-y-2">
          <div className="text-white/80 font-semibold text-lg">Loading Calendar...</div>
          <div className="text-white/60 text-sm">Preparing your visit scheduling</div>
        </div>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  </div>
);

const ScheduleVisitPage: React.FC = () => {
  const navigate = useNavigate();
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleIframeLoad = () => {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setIsIframeLoaded(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Native Back Button Header - Dark Aero */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4 mt-16 relative">
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl sm:text-3xl"
              >
                📅
              </motion.div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                Schedule Your Campus Visit
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Cal.com Iframe with Shimmer Loading */}
      <div className="w-full relative" style={{ height: 'calc(100vh - 120px)' }}>
        {/* Shimmer Loading Effect */}
        {!isIframeLoaded && (
          <div className="absolute inset-0 z-10">
            <ShimmerLoader className="w-full h-full" rounded="rounded-none" />
          </div>
        )}

        {/* Cal.com Iframe */}
        <iframe
          src="https://cal.com/stlouisdemojhs/schedule-visit-to-st.-louis-demonstration-j.h.s"
          width="100%"
          height="100%"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            opacity: isIframeLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
          title="Schedule Your Visit to St. Louis Demonstration JHS"
          loading="lazy"
          onLoad={handleIframeLoad}
        />
      </div>
    </div>
  );
};

export default ScheduleVisitPage;
