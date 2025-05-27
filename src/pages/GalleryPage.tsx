import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Grid, Play, Pause, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { galleryImages } from '../data';

// Shimmer Loading Component for Gallery Images
const ImageShimmer: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 ${className}`}>
    {/* Camera Icon */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center animate-pulse">
        <Camera className="w-5 h-5 text-blue-300" />
      </div>
    </div>

    {/* Shimmer Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-wave"></div>

    {/* Loading Dots */}
    <div className="absolute bottom-2 left-2 flex space-x-1">
      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  </div>
);

// Gallery Image Component with Loading State
const GalleryImage: React.FC<{
  image: any;
  index: number;
  onClick: () => void;
  className?: string;
}> = ({ image, index, onClick, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`relative aspect-square overflow-hidden rounded-xl cursor-pointer group ${className}`}
      onClick={onClick}
    >
      {/* Shimmer Loading State */}
      {!isLoaded && !hasError && (
        <ImageShimmer className="absolute inset-0 z-10" />
      )}

      {/* Actual Image */}
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
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

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
        <div className="text-white">
          <p className="text-xs font-medium">{image.category}</p>
          <p className="text-xs opacity-80 mt-1">{image.alt}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Slideshow Image Component with Loading State
const SlideshowImage: React.FC<{
  image: any;
  currentSlide: number;
}> = ({ image, currentSlide }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset loading state when slide changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [currentSlide]);

  return (
    <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
      {/* Shimmer Loading State for Slideshow */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10">
          <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 relative overflow-hidden">
            {/* Large Camera Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-500/30 rounded-2xl flex items-center justify-center animate-pulse">
                <Camera className="w-10 h-10 text-blue-300" />
              </div>
            </div>

            {/* Loading Text */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="h-6 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-1/3 bg-gradient-to-r from-gray-500/30 to-gray-400/30 rounded animate-pulse"></div>
            </div>

            {/* Shimmer Wave */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-wave"></div>
          </div>
        </div>
      )}

      {/* Slideshow Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={image?.src}
          alt={image?.alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
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

      {/* Image Info Overlay */}
      {isLoaded && !hasError && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="text-white text-lg font-semibold mb-1">
            {image?.alt}
          </h3>
          <p className="text-gray-300 text-sm">
            {image?.category}
          </p>
        </div>
      )}
    </div>
  );
};

// Thumbnail Image Component with Loading State
const ThumbnailImage: React.FC<{
  image: any;
  index: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ image, index, isActive, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all relative ${
        isActive
          ? 'border-blue-500 scale-110'
          : 'border-gray-600 hover:border-gray-500'
      }`}
    >
      {/* Shimmer Loading for Thumbnail */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10">
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-500/40 rounded animate-pulse">
              <Camera className="w-3 h-3 text-blue-300" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-wave"></div>
          </div>
        </div>
      )}

      {/* Thumbnail Image */}
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
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
};

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState<string>('All');

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];

  // Filter images based on selected category
  const filteredImages = filter === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  // Auto-play slideshow
  useEffect(() => {
    if (viewMode === 'slideshow' && isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % filteredImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [viewMode, isPlaying, filteredImages.length]);

  const openModal = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const toggleSlideshow = () => {
    setViewMode(viewMode === 'grid' ? 'slideshow' : 'grid');
    setCurrentSlide(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-black pt-16">
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
                onClick={() => {
                  setFilter(category);
                  setCurrentSlide(0);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
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

      {/* Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-6xl w-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryImages.find(img => img.id === selectedImage) && (
                <>
                  <img
                    src={galleryImages.find(img => img.id === selectedImage)?.src}
                    alt={galleryImages.find(img => img.id === selectedImage)?.alt}
                    className="w-full max-h-[80vh] object-contain"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {galleryImages.find(img => img.id === selectedImage)?.alt}
                    </h3>
                    <p className="text-gray-400">
                      Category: {galleryImages.find(img => img.id === selectedImage)?.category}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
