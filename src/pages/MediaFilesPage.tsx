import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Calendar, Eye, Trophy, Brain, Vote, ImageIcon, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SEOHead from '../components/seo/SEOHead';
import OptimizedGallery from '../components/common/OptimizedGallery';

interface MediaVideo {
  id: string;
  title: string;
  description: string;
  driveUrl: string;
  embedUrl: string;
  thumbnail: string;
  duration: string;
  baseViews: number; // Base view count
  uploadTimestamp: number; // Unix timestamp in milliseconds
  category: string;
}

const MediaFilesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<MediaVideo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [imageKitImages, setImageKitImages] = useState<any[]>([]);
  const [imageKitLoading, setImageKitLoading] = useState(false);
  const [imageKitError, setImageKitError] = useState<string | null>(null);

  // ImageKit folder mapping for Media Files
  const imageKitFolderMap: { [key: string]: string } = {
    'All': 'stlouisdemojhs/media-files/',
    'School Events': 'stlouisdemojhs/media-files/school-events/',
    'Quiz Competitions': 'stlouisdemojhs/media-files/quiz-competitions/',
    'Sports': 'stlouisdemojhs/media-files/sports/',
  };

  // Fetch ImageKit images for the selected category
  const fetchImageKitImages = useCallback(async (folder: string) => {
    try {
      setImageKitLoading(true);
      setImageKitError(null);

      // Use development server API endpoint
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3001/api/imagekit-files'
        : '/api/imagekit-files';
        
      console.log('Fetching ImageKit images for Media Files folder:', folder);
      console.log('Making request to:', `${apiUrl}?folder=${encodeURIComponent(folder)}&limit=200`);
        
      const response = await axios.get(apiUrl, {
        params: {
          folder: folder,
          limit: 200,
        },
      });

      console.log('ImageKit Media Files response:', response);
      console.log('Response data:', response.data);
      console.log('Response status:', response.status);
      
      if (response.data && Array.isArray(response.data)) {
        console.log('ImageKit Media Files response:', response.data.length, 'images found');
        setImageKitImages(response.data);
      } else {
        console.log('No valid data in response:', response.data);
        setImageKitImages([]);
      }
    } catch (err: any) {
      console.error('Error fetching ImageKit Media Files images:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      setImageKitError(err.response?.data?.message || err.message || 'Failed to load Media Files images');
      setImageKitImages([]);
    } finally {
      setImageKitLoading(false);
    }
  }, []);

  // Fetch images when category changes
  useEffect(() => {
    const folder = imageKitFolderMap[selectedCategory];
    if (folder) {
      fetchImageKitImages(folder);
    } else {
      console.log('No ImageKit folder mapping for Media Files category:', selectedCategory);
      setImageKitImages([]);
    }
  }, [selectedCategory, fetchImageKitImages]);

  // Convert ImageKit images to gallery format
  const convertedImages = useMemo(() => {
    return imageKitImages.map((img, index) => ({
      id: parseInt(img.fileId.replace(/\D/g, '')) || (Date.now() + index),
      src: `${img.url}?tr=w-800,h-800,fo-auto,q-90`,
      alt: img.name.replace(/\.[^/.]+$/, ""),
      category: selectedCategory,
      isImageKit: true,
      createdAt: img.createdAt,
    }));
  }, [imageKitImages, selectedCategory]);

  // Convert Google Drive URLs to embed format
  const convertToEmbedUrl = (driveUrl: string): string => {
    const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    return driveUrl;
  };

  // Generate thumbnail URL from Google Drive
  const generateThumbnail = (driveUrl: string): string => {
    const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w320-h180`;
    }
    return '/api/placeholder/320/180';
  };

  // Calculate days since upload from actual date
  const calculateDaysAgo = (uploadTimestamp: number): string => {
    const now = Date.now();
    const uploadDate = uploadTimestamp;
    const diffInMs = now - uploadDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays === 1) {
      return '1 day ago';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 14) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    }
  };

  // Calculate current view count with automatic daily increment
  const calculateCurrentViews = (baseViews: number, uploadTimestamp: number): string => {
    // Calculate days since upload
    const now = Date.now();
    const diffInMs = now - uploadTimestamp;
    const daysSinceUpload = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // Add 1K views per day since upload
    const currentViews = baseViews + (daysSinceUpload * 1000);

    // Format the view count
    if (currentViews >= 1000000) {
      return `${(currentViews / 1000000).toFixed(1)}M`;
    } else if (currentViews >= 1000) {
      return `${(currentViews / 1000).toFixed(1)}K`;
    } else {
      return currentViews.toString();
    }
  };

  const mediaVideos: MediaVideo[] = [
    // School Events
    {
      id: '1',
      title: 'Election Diaries 2025 - Episode 1',
      description: 'Coverage of the school election preparations and candidate presentations at St. Louis Demonstration JHS.',
      driveUrl: 'https://drive.google.com/file/d/1EYNZ4XLCFzCaS_9p3RGsM-W8nhTNWLfo/view',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1EYNZ4XLCFzCaS_9p3RGsM-W8nhTNWLfo/view'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1EYNZ4XLCFzCaS_9p3RGsM-W8nhTNWLfo/view'),
      duration: '0:30',
      baseViews: 1200,
      uploadTimestamp: Date.now() - (4 * 24 * 60 * 60 * 1000),
      category: 'School Events'
    },
    {
      id: '2',
      title: 'Election Diaries 2025 - Episode 2',
      description: 'Student campaign activities and voting preparations at St. Louis Demonstration JHS.',
      driveUrl: 'https://drive.google.com/file/d/1KG71HVjDiSXkw9T4-QiOscqp1Vhji8bI/view?usp=drive_link',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1KG71HVjDiSXkw9T4-QiOscqp1Vhji8bI/view?usp=drive_link'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1KG71HVjDiSXkw9T4-QiOscqp1Vhji8bI/view?usp=drive_link'),
      duration: '0:33',
      baseViews: 856,
      uploadTimestamp: Date.now() - (3 * 24 * 60 * 60 * 1000),
      category: 'School Events'
    },
    {
      id: '3',
      title: 'Election Diaries 2025 - Episode 3',
      description: 'Student voting process and election activities at St. Louis Demonstration JHS.',
      driveUrl: 'https://drive.google.com/file/d/1XK4BGl_kWtEFKNWFCw_0PoBXtrxFdeww/view?usp=drive_link',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1XK4BGl_kWtEFKNWFCw_0PoBXtrxFdeww/view?usp=drive_link'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1XK4BGl_kWtEFKNWFCw_0PoBXtrxFdeww/view?usp=drive_link'),
      duration: '0:38',
      baseViews: 2100,
      uploadTimestamp: Date.now() - (2 * 24 * 60 * 60 * 1000),
      category: 'School Events'
    },
    {
      id: '4',
      title: 'Election Diaries 2025 - Episode 4',
      description: 'Final election day coverage and results announcement at St. Louis Demonstration JHS.',
      driveUrl: 'https://drive.google.com/file/d/1cO5KJHvRetuiuCVqF2OgBKjCI75gc3td/view?usp=drive_link',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1cO5KJHvRetuiuCVqF2OgBKjCI75gc3td/view?usp=drive_link'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1cO5KJHvRetuiuCVqF2OgBKjCI75gc3td/view?usp=drive_link'),
      duration: '0:45',
      baseViews: 1800,
      uploadTimestamp: Date.now() - (1 * 24 * 60 * 60 * 1000),
      category: 'School Events'
    },

    // Sports
    {
      id: '5',
      title: 'Inter-House Sports Competition 2025',
      description: 'Exciting sports competition between different houses at St. Louis Demonstration JHS featuring various athletic events.',
      driveUrl: 'https://drive.google.com/file/d/1ly09Lgr-tDdg262pGPvdwNn5bex-9THk/view?usp=drive_link',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1ly09Lgr-tDdg262pGPvdwNn5bex-9THk/view?usp=drive_link'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1ly09Lgr-tDdg262pGPvdwNn5bex-9THk/view?usp=drive_link'),
      duration: '2:15',
      baseViews: 2800,
      uploadTimestamp: Date.now() - (7 * 24 * 60 * 60 * 1000),
      category: 'Sports'
    },
    {
      id: '6',
      title: 'Athletics Championship Finals',
      description: 'Final rounds of the athletics championship with track and field events showcasing student talents at St. Louis Demonstration JHS.',
      driveUrl: 'https://drive.google.com/file/d/1_mj1rl56w59ls8yN_Bqdviim-YGmE-AE/view?usp=drive_link',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1_mj1rl56w59ls8yN_Bqdviim-YGmE-AE/view?usp=drive_link'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1_mj1rl56w59ls8yN_Bqdviim-YGmE-AE/view?usp=drive_link'),
      duration: '3:42',
      baseViews: 3200,
      uploadTimestamp: Date.now() - (5 * 24 * 60 * 60 * 1000),
      category: 'Sports'
    },

    // Quiz Competitions
    {
      id: '7',
      title: 'Academic Quiz Competition 2025',
      description: 'Intense academic quiz competition featuring bright students from St. Louis Demonstration JHS competing in various subjects.',
      driveUrl: 'https://drive.google.com/file/d/1_Q_Fahvjz_Xt3kkVnxMV-lkZg-gj96zK/view?usp=drive_link',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1_Q_Fahvjz_Xt3kkVnxMV-lkZg-gj96zK/view?usp=drive_link'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1_Q_Fahvjz_Xt3kkVnxMV-lkZg-gj96zK/view?usp=drive_link'),
      duration: '4:18',
      baseViews: 1950,
      uploadTimestamp: Date.now() - (7 * 24 * 60 * 60 * 1000),
      category: 'Quiz Competitions'
    },
    {
      id: '8',
      title: 'St Louis Brags to Win the Quiz Competition',
      description: 'St. Louis Demonstration JHS students showcase their academic prowess and competitive spirit in quiz competitions.',
      driveUrl: 'https://www.youtube.com/watch?v=c90tOBl5K6g&ab_channel=Epiphany',
      embedUrl: 'https://www.youtube.com/embed/c90tOBl5K6g?rel=0&modestbranding=1&controls=1',
      thumbnail: 'https://img.youtube.com/vi/c90tOBl5K6g/maxresdefault.jpg',
      duration: '4:15',
      baseViews: 3400,
      uploadTimestamp: Date.now() - (21 * 24 * 60 * 60 * 1000),
      category: 'Quiz Competitions'
    },
    {
      id: '9',
      title: 'St louis competes with two other Catholic Schools',
      description: 'St. Louis Demonstration JHS competing against two other Catholic schools in an academic quiz competition.',
      driveUrl: 'https://www.youtube.com/watch?v=vMUVyKTTFZA',
      embedUrl: 'https://www.youtube.com/embed/vMUVyKTTFZA?rel=0&modestbranding=1&controls=1',
      thumbnail: 'https://img.youtube.com/vi/vMUVyKTTFZA/maxresdefault.jpg',
      duration: '7:23',
      baseViews: 4200,
      uploadTimestamp: Date.now() - (30 * 24 * 60 * 60 * 1000),
      category: 'Quiz Competitions'
    }
  ];

  const handleVideoClick = (video: MediaVideo) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // Group videos by category
  const videosByCategory = mediaVideos.reduce((acc, video) => {
    if (!acc[video.category]) {
      acc[video.category] = [];
    }
    acc[video.category].push(video);
    return acc;
  }, {} as Record<string, MediaVideo[]>);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'School Events':
        return <Vote className="w-5 h-5 text-blue-500" />;
      case 'Sports':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'Quiz Competitions':
        return <Brain className="w-5 h-5 text-purple-500" />;
      default:
        return <Calendar className="w-5 h-5 text-red-500" />;
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'School Events':
        return 'bg-blue-600';
      case 'Sports':
        return 'bg-yellow-600';
      case 'Quiz Competitions':
        return 'bg-purple-600';
      default:
        return 'bg-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="St. Louis Media Files - School Coverage & Videos | St. Louis Demonstration JHS"
        description="Watch exclusive video coverage from the St. Louis Media Team featuring Election Diaries 2025 and other school events at St. Louis Demonstration JHS."
        keywords="St. Louis media, school videos, election diaries 2025, school coverage, student media, JHS videos"
        url="/media-files"
        type="website"
        pageType="media"
        useGalleryImages={true}
      
      canonical="https://stlouisdemojhs.com/media-files"
      />

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Back Bar - Donate Page Style */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-2 sm:py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-700/50 hover:bg-red-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-red-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              🎬 St. Louis Media Files
            </h1>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-gray-900 py-4 px-4 sm:px-6 border-b border-gray-800">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {Object.keys(imageKitFolderMap).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* ImageKit Images Section */}
      {selectedCategory && (
        <div className="px-4 sm:px-6 py-6">
          <div className="flex items-center space-x-2 mb-4">
            <ImageIcon className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-semibold text-white">
              {selectedCategory} Images
            </h2>
            {imageKitLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
          </div>

          {imageKitError && (
            <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-4">
              <p className="text-red-300 text-sm">{imageKitError}</p>
            </div>
          )}

          {convertedImages.length > 0 ? (
            <OptimizedGallery images={convertedImages} className="mb-8" />
          ) : !imageKitLoading && (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">
                No images found in {selectedCategory}. Upload some images to ImageKit to see them here!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Categories and Videos */}
      <div className="px-4 sm:px-6 py-6 space-y-8">
        {Object.entries(videosByCategory).map(([category, videos], categoryIndex) => (
          <div key={category}>
            {/* Category Header */}
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              {getCategoryIcon(category)}
              <h2 className="text-sm sm:text-lg font-semibold text-white">{category}</h2>
              <span className="text-xs sm:text-sm text-gray-400">({videos.length})</span>
            </div>

            {/* Video Grid for this category */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (index * 0.1) }}
                  className="bg-red-900/80 rounded-lg overflow-hidden hover:bg-red-800/90 transition-colors cursor-pointer group border border-red-700/50"
                  onClick={() => handleVideoClick(video)}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gray-800">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/api/placeholder/320/180';
                      }}
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className={`${getCategoryColor(video.category)} rounded-full p-2 group-hover:scale-110 transition-transform`}>
                        <Play className="w-4 h-4 text-white fill-current" />
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className={`absolute top-2 left-2 ${getCategoryColor(video.category)} text-white text-xs px-2 py-1 rounded`}>
                      {video.category === 'School Events' ? 'Events' :
                       video.category === 'Sports' ? 'Sports' :
                       video.category === 'Quiz Competitions' ? 'Quiz' : video.category}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-2 sm:p-3">
                    <h3 className="text-xs sm:text-sm font-medium text-white line-clamp-2 mb-1 sm:mb-2 leading-tight">
                      {video.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span className="text-xs">{calculateCurrentViews(video.baseViews, video.uploadTimestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs truncate">{calculateDaysAgo(video.uploadTimestamp)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* TikTok Reminder Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-4 px-4 sm:px-6 border-t border-gray-800">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <span className="text-xl">🎵</span>
            <h3 className="text-sm sm:text-base font-semibold text-white">More Videos on TikTok!</h3>
          </div>
          <a
            href="/tiktok"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z"/>
            </svg>
            <span className="text-sm">Watch @StLouisDemoJHS</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Daily!</span>
          </a>
        </div>
      </div>

      {/* Video Modal - Improved for Mobile */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={closeVideoModal}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-red-900/90 rounded-lg overflow-hidden w-full max-w-4xl max-h-[95vh] flex flex-col border border-red-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player - Larger on Mobile */}
            <div className="aspect-video bg-black flex-shrink-0">
              <iframe
                src={selectedVideo.embedUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={selectedVideo.title}
              />
            </div>

            {/* Video Details - Compact */}
            <div className="p-3 sm:p-4 flex-1 min-h-0 overflow-y-auto">
              <h2 className="text-sm sm:text-lg font-bold text-white mb-2 leading-tight">
                {selectedVideo.title}
              </h2>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300 mb-3">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{calculateCurrentViews(selectedVideo.baseViews, selectedVideo.uploadTimestamp)} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{calculateDaysAgo(selectedVideo.uploadTimestamp)}</span>
                </div>
                <span className={`${getCategoryColor(selectedVideo.category)} text-white px-2 py-1 rounded text-xs`}>
                  {selectedVideo.category === 'School Events' ? 'Events' :
                   selectedVideo.category === 'Sports' ? 'Sports' :
                   selectedVideo.category === 'Quiz Competitions' ? 'Quiz' : selectedVideo.category}
                </span>
              </div>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                {selectedVideo.description}
              </p>

              <button
                onClick={closeVideoModal}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Close Video
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MediaFilesPage;
