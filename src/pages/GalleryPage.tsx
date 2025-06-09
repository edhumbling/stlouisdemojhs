import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { galleryImages } from '../data';
import LightboxGallery from '../components/common/LightboxGallery';

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');

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

  return (
    <div className="min-h-screen bg-black">
      {/* Compact Header - Minimal height */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg transition-all duration-300 text-sm backdrop-blur-sm border border-blue-500/30"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">Gallery</h1>
              <p className="text-xs text-blue-200">Click any image to view</p>
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
        >
          <LightboxGallery images={filteredImages} />
        </motion.div>
      </div>
    </div>
  );
};

export default GalleryPage;
