import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { galleryImages } from '../data';
import EnhancedModal from '../components/common/EnhancedModal';
import ShimmerLoader from '../components/common/ShimmerLoader';

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];
    return cats;
  }, []);

  // Filter images based on selected category
  const filteredImages = useMemo(() =>
    filter === 'All' ? galleryImages : galleryImages.filter(img => img.category === filter),
    [filter]
  );

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleFilterChange = useCallback((category: string) => {
    setFilter(category);
  }, []);

  const openModal = useCallback((id: number) => {
    setSelectedImage(id);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
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
                Click any image to view in full screen
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Category Filter */}
      <div className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50 py-2">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  filter === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Images Grid - Immediate visibility */}
      <div className="container mx-auto px-2 py-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-1 sm:gap-2 md:gap-3"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="relative group cursor-pointer"
              onClick={() => openModal(image.id)}
            >
              <div className="aspect-square relative overflow-hidden bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                {/* Shiny Silver Shimmer Loading */}
                <ShimmerLoader variant="silver" className="absolute inset-0 z-10" />

                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 relative z-20"
                  loading="lazy"
                  decoding="async"
                  onLoad={(e) => {
                    // Hide shimmer when image loads
                    const shimmer = e.currentTarget.previousElementSibling;
                    if (shimmer) {
                      (shimmer as HTMLElement).style.display = 'none';
                    }
                  }}
                />

                {/* Simple hover overlay - no text */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Modal */}
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
