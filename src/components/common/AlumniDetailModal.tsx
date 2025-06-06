import React, { useState, useEffect } from 'react'; // useEffect might not be needed here if OptimizedImage is simplified
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

// Copied ShimmerLoader Component
const ShimmerLoader: React.FC<{ className?: string; rounded?: string }> = ({
  className = "w-full h-40",
  rounded = "rounded-xl"
}) => (
  <div className={`relative overflow-hidden ${rounded} bg-gray-800 ${className}`}>
    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800"></div>
  </div>
);

// Copied OptimizedImage Component (and its dependency ShimmerLoader above)
// Note: useState, useEffect might be needed if keeping full functionality.
// For simplicity, if OptimizedImage is complex, a direct <img> might be substituted by the worker if issues arise.
// However, the original OptimizedImage from AlumniPage.tsx is copied here.
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  shimmerClassName?: string;
}> = ({ src, alt, className, onClick, shimmerClassName }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset state if src changes
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className="relative w-full h-full"> {/* Ensure wrapper takes full dimensions */}
      {!isLoaded && !hasError && (
        <ShimmerLoader className={shimmerClassName || className || "w-full h-full"} rounded={className?.includes("rounded-full") ? "rounded-full" : "rounded-xl"} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onClick={onClick}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsLoaded(true); // To remove shimmer
          setHasError(true);
        }}
        style={{ contentVisibility: isLoaded ? 'auto' : 'hidden' }} // manage visibility
      />
      {hasError && (
        <div className={`${className} bg-gray-700 flex items-center justify-center text-gray-400 text-xs`}>
          <span>Image Error</span>
        </div>
      )}
    </div>
  );
};


// Define Alumni type
interface Alumni {
  name: string;
  class: string;
  profession: string;
  achievement: string;
  image: string;
  quote: string;
  linkedin?: string;
  bookUrl?: string;
  facebook?: string;
}

interface AlumniDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  alumnus: Alumni | null;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const AlumniDetailModal: React.FC<AlumniDetailModalProps> = ({
  isOpen,
  onClose,
  alumnus,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}) => {
  if (!alumnus) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={onClose} // Close on overlay click
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-xl p-4 sm:p-6 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-white/20 relative flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 border-2 border-white/30 shadow-lg flex-shrink-0"> {/* Added flex-shrink-0 */}
                <OptimizedImage
                  src={alumnus.image}
                  alt={alumnus.name}
                  className="w-full h-full object-cover rounded-full" // Ensure image is rounded if container is
                  shimmerClassName="w-full h-full rounded-full" // Ensure shimmer is also rounded
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{alumnus.name}</h2>
              <p className="text-blue-400 font-medium mb-1 text-sm sm:text-base">{alumnus.class}</p>
              <p className="text-gray-300 font-medium mb-2 text-sm">{alumnus.profession}</p>
              <p className="text-gray-400 text-xs sm:text-sm mb-3 px-2">{alumnus.achievement}</p>
              <blockquote className="text-gray-300 text-xs sm:text-sm italic border-l-2 border-blue-500 pl-3 mb-4 text-left self-stretch mx-2">
                "{alumnus.quote}"
              </blockquote>

              {/* Links */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {alumnus.linkedin && (
                  <a
                    href={alumnus.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-all duration-200"
                  >
                    <span className="mr-1.5">💼</span> LinkedIn
                  </a>
                )}
                {alumnus.bookUrl && (
                  <a
                    href={alumnus.bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium rounded-md transition-all duration-200"
                  >
                    <span className="mr-1.5">📚</span> Author
                  </a>
                )}
                {alumnus.facebook && (
                  <a
                    href={alumnus.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded-md transition-all duration-200"
                  >
                    <span className="mr-1.5">🌐</span> Facebook
                  </a>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
              <button
                onClick={onPrevious}
                disabled={!hasPrevious}
                className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous alumnus"
              >
                <ArrowLeft size={18} className="mr-2" /> Previous
              </button>
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next alumnus"
              >
                Next <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlumniDetailModal;
