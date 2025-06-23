import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Calendar, Eye, Trophy, Brain, Vote } from 'lucide-react';
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
  baseViews: number; // Base view count
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

  // Calculate current view count with automatic daily increment
  const calculateCurrentViews = (baseViews: number, uploadDate: string): string => {
    const now = new Date();
    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Parse upload date to determine days since upload
    let daysSinceUpload = 0;

    if (uploadDate.includes('hours ago')) {
      daysSinceUpload = 0;
    } else if (uploadDate.includes('1 day ago')) {
      daysSinceUpload = 1;
    } else if (uploadDate.includes('2 days ago')) {
      daysSinceUpload = 2;
    } else if (uploadDate.includes('3 days ago')) {
      daysSinceUpload = 3;
    } else if (uploadDate.includes('days ago')) {
      const match = uploadDate.match(/(\d+) days ago/);
      daysSinceUpload = match ? parseInt(match[1]) : 0;
    }

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
    // Election Diaries 2025
    {
      id: '1',
      title: 'Election Diaries 2025 - Episode 1',
      description: 'Coverage of the school election preparations and candidate presentations at St. Louis Demonstration JHS.',
      driveUrl: 'https://drive.google.com/file/d/1EYNZ4XLCFzCaS_9p3RGsM-W8nhTNWLfo/view',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1EYNZ4XLCFzCaS_9p3RGsM-W8nhTNWLfo/view'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1EYNZ4XLCFzCaS_9p3RGsM-W8nhTNWLfo/view'),
      duration: '0:30',
      baseViews: 1200, // Base views, will auto-increment by 1K daily
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
      baseViews: 856, // Base views, will auto-increment by 1K daily
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
      baseViews: 2100, // Base views, will auto-increment by 1K daily
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
      baseViews: 1800, // Base views, will auto-increment by 1K daily
      uploadDate: '12 hours ago',
      category: 'Election Diaries 2025'
    },

    // Sports Competitions
    {
      id: '5',
      title: 'Inter-House Sports Competition 2025',
      description: 'Exciting sports competition between different houses at St. Louis Demonstration JHS featuring various athletic events.',
      driveUrl: 'https://drive.google.com/file/d/1ly09Lgr-tDdg262pGPvdwNn5bex-9THk/view?usp=drive_link',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1ly09Lgr-tDdg262pGPvdwNn5bex-9THk/view?usp=drive_link'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1ly09Lgr-tDdg262pGPvdwNn5bex-9THk/view?usp=drive_link'),
      duration: '2:15',
      baseViews: 2800, // Base views, will auto-increment by 1K daily
      uploadDate: '5 days ago',
      category: 'Sports Competitions'
    },
    {
      id: '6',
      title: 'Athletics Championship Finals',
      description: 'Final rounds of the athletics championship with track and field events showcasing student talents at St. Louis Demonstration JHS.',
      driveUrl: 'https://drive.google.com/file/d/1_mj1rl56w59ls8yN_Bqdviim-YGmE-AE/view?usp=drive_link',
      embedUrl: convertToEmbedUrl('https://drive.google.com/file/d/1_mj1rl56w59ls8yN_Bqdviim-YGmE-AE/view?usp=drive_link'),
      thumbnail: generateThumbnail('https://drive.google.com/file/d/1_mj1rl56w59ls8yN_Bqdviim-YGmE-AE/view?usp=drive_link'),
      duration: '3:42',
      baseViews: 3200, // Base views, will auto-increment by 1K daily
      uploadDate: '4 days ago',
      category: 'Sports Competitions'
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
      baseViews: 1950, // Base views, will auto-increment by 1K daily
      uploadDate: '6 days ago',
      category: 'Quiz Competitions'
    },
    {
      id: '8',
      title: 'St. Louis Demo JHS - School Life & Activities',
      description: 'Showcasing daily school activities, student engagement, and community involvement at St. Louis Demonstration JHS.',
      driveUrl: 'https://www.youtube.com/watch?v=c90tOBl5K6g',
      embedUrl: 'https://www.youtube.com/embed/c90tOBl5K6g?rel=0&modestbranding=1&controls=1',
      thumbnail: 'https://img.youtube.com/vi/c90tOBl5K6g/maxresdefault.jpg',
      duration: '5:42',
      baseViews: 3400, // Base views, will auto-increment by 1K daily
      uploadDate: '2 weeks ago',
      category: 'Quiz Competitions'
    },
    {
      id: '9',
      title: 'St. Louis Demo JHS - Academic Excellence',
      description: 'Highlighting academic programs, teaching methods, and educational excellence at St. Louis Demonstration JHS.',
      driveUrl: 'https://www.youtube.com/watch?v=vMUVyKTTFZA',
      embedUrl: 'https://www.youtube.com/embed/vMUVyKTTFZA?rel=0&modestbranding=1&controls=1',
      thumbnail: 'https://img.youtube.com/vi/vMUVyKTTFZA/maxresdefault.jpg',
      duration: '7:23',
      baseViews: 4200, // Base views, will auto-increment by 1K daily
      uploadDate: '3 weeks ago',
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
      case 'Election Diaries 2025':
        return <Vote className="w-5 h-5 text-blue-500" />;
      case 'Sports Competitions':
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
      case 'Election Diaries 2025':
        return 'bg-blue-600';
      case 'Sports Competitions':
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
      />

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Compact Hero Header */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-2 sm:py-3">
        <div className="px-3 sm:px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-1 sm:space-x-2 text-white/90 hover:text-white transition-colors bg-black/20 px-2 py-1 rounded-md"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">Back</span>
            </button>

            <div className="text-center flex-1 mx-4">
              <h1 className="text-sm sm:text-lg font-bold text-white">
                St. Louis Media Files
              </h1>
              <p className="text-xs text-white/80 mt-0.5 hidden sm:block">
                Elections • Sports • Quiz • School Events
              </p>
            </div>

            <div className="w-12 sm:w-16"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

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
                      <div className={`${getCategoryColor(video.category)} rounded-full p-2 group-hover:scale-110 transition-transform`}>
                        <Play className="w-4 h-4 text-white fill-current" />
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className={`absolute top-2 left-2 ${getCategoryColor(video.category)} text-white text-xs px-2 py-1 rounded`}>
                      {video.category === 'Election Diaries 2025' ? 'Election' :
                       video.category === 'Sports Competitions' ? 'Sports' :
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
                        <span className="text-xs">{calculateCurrentViews(video.baseViews, video.uploadDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs truncate">{video.uploadDate}</span>
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
      <div className="bg-gradient-to-r from-gray-900 to-black py-6 px-4 sm:px-6 border-t border-gray-800">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-2xl">🎵</span>
            <h3 className="text-lg font-semibold text-white">Want More School Videos?</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Follow us on TikTok for daily school life, student activities, and behind-the-scenes content!
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full">
              <span className="text-white font-bold text-sm">@StLouisDemoJHS</span>
            </div>
            <div className="text-yellow-400 animate-pulse">
              <span className="text-sm font-medium">✨ New videos daily!</span>
            </div>
          </div>
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
                  <span>{calculateCurrentViews(selectedVideo.baseViews, selectedVideo.uploadDate)} views</span>
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
