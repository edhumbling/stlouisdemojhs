import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Grid, Play, Pause, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { galleryImages } from '../data';
import EnhancedModal from '../components/common/EnhancedModal';

// Optimized Silver Shimmer Loading Component
const SilverShimmer: React.FC<{ className?: string; variant?: 'grid' | 'slideshow' | 'thumbnail' }> = ({
  className = "",
  variant = 'grid'
}) => {
  const shimmerContent = useMemo(() => {
    switch (variant) {
      case 'slideshow':
        return (
          <>
            {/* Large Camera Icon for Slideshow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400/20 to-gray-500/20 rounded-2xl flex items-center justify-center animate-pulse">
                <Camera className="w-10 h-10 text-gray-300/60" />
              </div>
            </div>
            {/* Loading Text Placeholder */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="h-6 bg-gradient-to-r from-gray-400/30 to-gray-500/30 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-1/3 bg-gradient-to-r from-gray-500/20 to-gray-400/20 rounded animate-pulse"></div>
            </div>
          </>
        );
      case 'thumbnail':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="w-4 h-4 text-gray-400/60 animate-pulse" />
          </div>
        );
      default: // grid
        return (
          <>
            {/* Camera Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-400/20 to-gray-500/20 rounded-lg flex items-center justify-center animate-pulse">
                <Camera className="w-5 h-5 text-gray-300/60" />
              </div>
            </div>
            {/* Loading Dots */}
            <div className="absolute bottom-2 left-2 flex space-x-1">
              <div className="w-1.5 h-1.5 bg-gray-400/60 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-gray-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </>
        );
    }
  }, [variant]);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-slate-600/90 via-gray-500/95 to-slate-700/90 ${className}`}>
      {shimmerContent}

      {/* Enhanced Silver Shimmer Waves */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/50 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/40 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4
        }}
      />

      {/* Strong metallic pulse */}
      <motion.div
        className="absolute inset-0 bg-slate-300/25"
        animate={{
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
};

// Optimized Gallery Image Component with Performance Enhancements
const GalleryImage: React.FC<{
  image: any;
  index: number;
  onClick: () => void;
  className?: string;
}> = React.memo(({ image, index, onClick, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Optimized image loading handlers
  const handleLoad = useCallback(() => setIsLoaded(true), []);
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  // Optimized click handler
  const handleClick = useCallback(() => onClick(), [onClick]);

  // Reduce animation delay for better perceived performance
  const animationDelay = useMemo(() => Math.min(index * 0.02, 0.3), [index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: animationDelay }}
      className={`relative aspect-square overflow-hidden rounded-xl cursor-pointer group ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Silver Shimmer Loading State */}
      {!isLoaded && !hasError && (
        <SilverShimmer variant="grid" className="absolute inset-0 z-10" />
      )}

      {/* Optimized Image with Better Loading */}
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)' // Force hardware acceleration
        }}
      />

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs">Failed to load</p>
          </div>
        </div>
      )}

      {/* Optimized Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
        <div className="text-white">
          <p className="text-xs font-medium">{image.category}</p>
          <p className="text-xs opacity-80 mt-1 line-clamp-2">{image.alt}</p>
        </div>
      </div>
    </motion.div>
  );
});

// Optimized Slideshow Image Component
const SlideshowImage: React.FC<{
  image: any;
  currentSlide: number;
}> = React.memo(({ image, currentSlide }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset loading state when slide changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [currentSlide]);

  // Optimized handlers
  const handleLoad = useCallback(() => setIsLoaded(true), []);
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
      {/* Silver Shimmer Loading State for Slideshow */}
      {!isLoaded && !hasError && (
        <SilverShimmer variant="slideshow" className="absolute inset-0 z-10" />
      )}

      {/* Optimized Slideshow Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={image?.src}
          alt={image?.alt}
          className={`w-full h-full object-cover ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          loading="eager" // Load slideshow images immediately
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
        />
      </AnimatePresence>

      {/* Error State for Slideshow */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Failed to load image</p>
            <p className="text-sm opacity-70 mt-1">Please try again</p>
          </div>
        </div>
      )}

      {/* Optimized Image Info Overlay */}
      {isLoaded && !hasError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
        >
          <h3 className="text-white text-lg font-semibold mb-1 line-clamp-2">
            {image?.alt}
          </h3>
          <p className="text-gray-300 text-sm">
            {image?.category}
          </p>
        </motion.div>
      )}
    </div>
  );
});

// Optimized Thumbnail Image Component
const ThumbnailImage: React.FC<{
  image: any;
  index: number;
  isActive: boolean;
  onClick: () => void;
}> = React.memo(({ image, index, isActive, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Optimized handlers
  const handleLoad = useCallback(() => setIsLoaded(true), []);
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
        isActive
          ? 'border-blue-500 scale-110 shadow-lg shadow-blue-500/25'
          : 'border-gray-600 hover:border-gray-500 hover:scale-105'
      }`}
    >
      {/* Silver Shimmer Loading for Thumbnail */}
      {!isLoaded && !hasError && (
        <SilverShimmer variant="thumbnail" className="absolute inset-0 z-10" />
      )}

      {/* Optimized Thumbnail Image */}
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-full object-cover transition-opacity duration-200 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />

      {/* Error State for Thumbnail */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
          <Camera className="w-4 h-4 text-gray-400 opacity-50" />
        </div>
      )}
    </button>
  );
});

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState<string>('All');

  // Optimized navigation handler
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Memoized categories to prevent recalculation
  const categories = useMemo(() =>
    ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))],
    []
  );

  // Memoized filtered images for better performance
  const filteredImages = useMemo(() =>
    filter === 'All' ? galleryImages : galleryImages.filter(img => img.category === filter),
    [filter]
  );

  // Optimized auto-play slideshow
  useEffect(() => {
    if (viewMode === 'slideshow' && isPlaying && filteredImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % filteredImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [viewMode, isPlaying, filteredImages.length]);

  // Optimized modal handlers
  const openModal = useCallback((id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  }, []);

  // Optimized slideshow navigation
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  const toggleSlideshow = useCallback(() => {
    setViewMode(prev => prev === 'grid' ? 'slideshow' : 'grid');
    setCurrentSlide(0);
    setIsPlaying(false);
  }, []);

  // Optimized filter handler
  const handleFilterChange = useCallback((category: string) => {
    setFilter(category);
    setCurrentSlide(0);
  }, []);

  // Optimized play/pause handler
  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button and Title Section - Original Style */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <div className="flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                School Life Gallery
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                Explore our vibrant academic community
              </p>
            </div>

            {/* View Mode Toggle */}
            <button
              onClick={toggleSlideshow}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30"
            >
              {viewMode === 'grid' ? <Play className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {viewMode === 'grid' ? 'Slideshow' : 'Grid View'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  filter === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {viewMode === 'grid' ? (
          /* Grid View with Shimmer Loading */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
          >
            {filteredImages.map((image, index) => (
              <GalleryImage
                key={image.id}
                image={image}
                index={index}
                onClick={() => openModal(image.id)}
              />
            ))}
          </motion.div>
        ) : (
          /* Slideshow View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative max-w-6xl mx-auto"
          >
            {/* Slideshow Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlayPause}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <span className="text-gray-400 text-sm">
                  {currentSlide + 1} of {filteredImages.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slideshow Image with Loading */}
            <SlideshowImage
              image={filteredImages[currentSlide]}
              currentSlide={currentSlide}
            />

            {/* Thumbnail Navigation with Loading */}
            <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-2">
              {filteredImages.map((image, index) => (
                <ThumbnailImage
                  key={image.id}
                  image={image}
                  index={index}
                  isActive={index === currentSlide}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Enhanced Modal with Background Blur and Pinch Zoom */}
      <EnhancedModal
        isOpen={selectedImage !== null}
        onClose={closeModal}
        imageSrc={galleryImages.find(img => img.id === selectedImage)?.src || ''}
        imageAlt={galleryImages.find(img => img.id === selectedImage)?.alt || ''}
        imageCategory={galleryImages.find(img => img.id === selectedImage)?.category || ''}
      />
    </div>
  );
};

export default GalleryPage;
