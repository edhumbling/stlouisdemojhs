import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getGalleryImagesByCategory, getGalleryCategories } from '../data';
import OptimizedGallery from '../components/common/OptimizedGallery';
import SEOHead from '../components/seo/SEOHead';

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');
  const [imageKitImages, setImageKitImages] = useState<any[]>([]);
  const [imageKitLoading, setImageKitLoading] = useState(false);
  const [imageKitError, setImageKitError] = useState<string | null>(null);

  // ImageKit folder mapping
  const imageKitFolderMap: { [key: string]: string } = {
    'All': 'stlouisdemojhs/',
    'Academic Life': 'stlouisdemojhs/academic-life/',
    'Campus Life': 'stlouisdemojhs/campus-life/',
    'Graduation Pictures': 'stlouisdemojhs/graduation-pictures/',
    'Original Hero Collection': 'stlouisdemojhs/original-hero-collection/',
    'School Events': 'stlouisdemojhs/school-events/',
  };

  // Get optimized categories (pre-indexed) and combine with ImageKit categories
  const staticCategories = useMemo(() => getGalleryCategories(), []);
  const imageKitCategories = Object.keys(imageKitFolderMap);
  
  // Combine static and ImageKit categories, removing duplicates
  const categories = useMemo(() => {
    const combined = [...new Set([...imageKitCategories, ...staticCategories])];
    return combined;
  }, [staticCategories, imageKitCategories]);

  // Get filtered images using optimized indexing
  const filteredImages = useMemo(() => getGalleryImagesByCategory(filter), [filter]);

  // Fetch ImageKit images - Using a different approach since /v1/files requires private key
  const fetchImageKitImages = useCallback(async (folder: string) => {
    try {
      setImageKitLoading(true);
      setImageKitError(null);

      console.log('Fetching ImageKit images for folder:', folder); // Debug log

      // For now, we'll use a mock approach or you can implement a server-side proxy
      // The /v1/files API requires a private key which shouldn't be exposed client-side
      
      // Option 1: Use a server-side proxy endpoint
      const response = await axios.get('/api/imagekit-files', {
        params: {
          folder: folder,
          limit: 200, // Increased limit to show more images
        },
      });

      console.log('ImageKit response:', response.data?.length, 'images found'); // Debug log
      setImageKitImages(response.data || []);
    } catch (err: any) {
      console.error('Error fetching ImageKit images:', err);
      setImageKitError(err.response?.data?.message || 'Failed to load ImageKit images');
      setImageKitImages([]);
    } finally {
      setImageKitLoading(false);
    }
  }, []);

  // Fetch ImageKit images when filter changes
  useEffect(() => {
    const folder = imageKitFolderMap[filter];
    console.log('Filter changed to:', filter, 'Mapped folder:', folder); // Debug log
    if (folder) {
      fetchImageKitImages(folder);
    } else {
      console.log('No ImageKit folder mapping for filter:', filter); // Debug log
      setImageKitImages([]); // Clear ImageKit images if no mapping
    }
  }, [filter, fetchImageKitImages]);

  // Combine static and ImageKit images
  const combinedImages = useMemo(() => {
    const staticImages = filteredImages || [];
    
    // Convert ImageKit images to match OptimizedGallery interface
    const imageKitConverted = imageKitImages.map((img, index) => ({
      id: parseInt(img.fileId.replace(/\D/g, '')) || (Date.now() + index), // Convert fileId to number or use timestamp
      src: `${img.url}?tr=w-800,h-800,fo-auto,q-90`, // Higher quality for lightbox
      alt: img.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      category: filter,
      isImageKit: true,
      createdAt: img.createdAt,
    }));
    
    // Combine with ImageKit images first (newest), then static images
    return [...imageKitConverted, ...staticImages];
  }, [filteredImages, imageKitImages, filter]);

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
        image="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MgqIz8s7W0LQyCA6JY2x5PlO4s79mU8GbXkh3"
        url="/gallery"
        type="website"
        pageType="gallery"
        useGalleryImages={false}
        socialImagePreferences={{
          facebook: "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MgqIz8s7W0LQyCA6JY2x5PlO4s79mU8GbXkh3",
          twitter: "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MgqIz8s7W0LQyCA6JY2x5PlO4s79mU8GbXkh3",
          linkedin: "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MgqIz8s7W0LQyCA6JY2x5PlO4s79mU8GbXkh3",
          whatsapp: "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MgqIz8s7W0LQyCA6JY2x5PlO4s79mU8GbXkh3"
        }}
        canonical="https://stlouisdemojhs.com/gallery"
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

      {/* Optimized Images Grid - Combined Static + ImageKit */}
      <div className="container mx-auto px-2 py-2">
        {imageKitLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
            <span className="ml-2 text-gray-300 text-sm">Loading new photos...</span>
          </div>
        )}
        
        {imageKitError && (
          <div className="text-center py-4">
            <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-400 text-sm">Unable to load new photos from ImageKit</p>
            <button
              onClick={() => {
                const folder = imageKitFolderMap[filter];
                if (folder) {
                  fetchImageKitImages(folder);
                }
              }}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <OptimizedGallery images={combinedImages} />
        </motion.div>

        {/* Show ImageKit count if available */}
        {imageKitImages.length > 0 && (
          <div className="text-center mt-4">
            <p className="text-gray-400 text-xs">
              Showing {imageKitImages.length} new photos from ImageKit + {filteredImages?.length || 0} existing photos
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Upload photos to ImageKit folders to see them appear instantly here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
