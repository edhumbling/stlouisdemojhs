import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Calendar, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface MediaVideo {
  id: string;
  title: string;
  description: string;
  driveUrl: string;
  embedUrl: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
  category: string;
}

const MediaFilesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<MediaVideo | null>(null);

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

  const mediaVideos: MediaVideo[] = [
    {
      id: '1',
      title: 'Election Diaries 2025 - Episode 1',
      description: 'Coverage of the school election preparations and candidate presentations at St. Louis Demonstration JHS.',
      driveUrl: 'https://drive.google.com/file/d/1EYNZ4XLCFzCaS_9p3RGsM-W8nhTNWLfo/view',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1EYNZ4XLCFzCaS_9p3RGsM-W8nhTNWLfo/view'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1EYNZ4XLCFzCaS_9p3RGsM-W8nhTNWLfo/view'),
      duration: '0:30',
      views: '1.2K',
      uploadDate: '3 days ago',
      category: 'Election Diaries 2025'
    },
    {
      id: '2',
      title: 'Election Diaries 2025 - Episode 2',
      description: 'Student campaign activities and voting preparations at St. Louis Demonstration JHS.',
      driveUrl: 'https://drive.google.com/file/d/1KG71HVjDiSXkw9T4-QiOscqp1Vhji8bI/view?usp=drive_link',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1KG71HVjDiSXkw9T4-QiOscqp1Vhji8bI/view?usp=drive_link'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1KG71HVjDiSXkw9T4-QiOscqp1Vhji8bI/view?usp=drive_link'),
      duration: '0:33',
      views: '856',
      uploadDate: '2 days ago',
      category: 'Election Diaries 2025'
    },
    {
      id: '3',
      title: 'Election Diaries 2025 - Episode 3',
      description: 'Student voting process and election activities at St. Louis Demonstration JHS.',
      driveUrl: 'https://drive.google.com/file/d/1XK4BGl_kWtEFKNWFCw_0PoBXtrxFdeww/view?usp=drive_link',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1XK4BGl_kWtEFKNWFCw_0PoBXtrxFdeww/view?usp=drive_link'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1XK4BGl_kWtEFKNWFCw_0PoBXtrxFdeww/view?usp=drive_link'),
      duration: '0:38',
      views: '2.1K',
      uploadDate: '1 day ago',
      category: 'Election Diaries 2025'
    },
    {
      id: '4',
      title: 'Election Diaries 2025 - Episode 4',
      description: 'Final election day coverage and results announcement at St. Louis Demonstration JHS.',
      driveUrl: 'https://drive.google.com/file/d/1XK4BGl_kWtEFKNWFCw_0PoBXtrxFdeww/view?usp=drive_link',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1XK4BGl_kWtEFKNWFCw_0PoBXtrxFdeww/view?usp=drive_link'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1XK4BGl_kWtEFKNWFCw_0PoBXtrxFdeww/view?usp=drive_link'),
      duration: '0:45',
      views: '1.8K',
      uploadDate: '12 hours ago',
      category: 'Election Diaries 2025'
    }
  ];

  const handleVideoClick = (video: MediaVideo) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
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
      />

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Compact Hero Header */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-3 sm:py-4">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>

            <div className="text-center">
              <h1 className="text-lg sm:text-xl font-bold text-white">
                St. Louis Media Files
              </h1>
              <p className="text-xs sm:text-sm text-white/80 mt-1">
                Exclusive Coverage by St. Louis Media Team
              </p>
            </div>

            <div className="w-16"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-semibold text-white">Election Diaries 2025</h2>
          <span className="text-sm text-gray-400">(4 videos)</span>
        </div>
      </div>

      {/* Video Grid - YouTube-like Interface */}
      <div className="px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {mediaVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer group"
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
                  <div className="bg-red-600 rounded-full p-2 group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-white line-clamp-2 mb-2">
                  {video.title}
                </h3>

                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{video.uploadDate}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-gray-900 rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player */}
            <div className="aspect-video bg-black">
              <iframe
                src={selectedVideo.embedUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={selectedVideo.title}
              />
            </div>

            {/* Video Details */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2">
                {selectedVideo.title}
              </h2>

              <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{selectedVideo.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedVideo.uploadDate}</span>
                </div>
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                  {selectedVideo.category}
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {selectedVideo.description}
              </p>

              <button
                onClick={closeVideoModal}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
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
