import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getGalleryImagesByCategory, getGalleryCategories } from '../data';
import OptimizedGallery from '../components/common/OptimizedGallery';
import SEOHead from '../components/seo/SEOHead';

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');

  // Get optimized categories (pre-indexed)
  const categories = useMemo(() => getGalleryCategories(), []);

  // Get filtered images using optimized indexing
  const filteredImages = useMemo(() => getGalleryImagesByCategory(filter), [filter]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleFilterChange = useCallback((category: string) => {
    setFilter(category);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Gallery | School Life Photos & Campus Memories - St. Louis Demonstration JHS"
        description="Gallery - Explore the vibrant life at St. Louis Demonstration JHS through our comprehensive photo gallery. Witness our students' academic achievements, campus events, modern facilities, and the dynamic learning environment that makes our school special."
        keywords="St. Louis Demonstration JHS gallery, school photos, campus life, student activities, academic achievements, school events, facilities, Ghana JHS"
        url="/gallery"
        type="website"
        pageType="gallery"
        useGalleryImages={true}
      />
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

      {/* Red Announcement Bar */}
      <div className="bg-red-600 py-1.5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-white text-sm font-medium">📹 View video files from</span>
            <button
              onClick={() => navigate('/media-files')}
              className="bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1 rounded-md shadow-md hover:shadow-lg transition-all duration-300 border border-white/30 backdrop-blur-sm text-sm"
            >
              St Louis Media
            </button>
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

      {/* Optimized Images Grid - Immediate visibility */}
      <div className="container mx-auto px-2 py-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <OptimizedGallery images={filteredImages} />
        </motion.div>
      </div>
    </div>
  );
};

export default GalleryPage;
