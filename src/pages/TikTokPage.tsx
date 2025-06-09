import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Heart, MessageCircle, Share, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TikTokPage: React.FC = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    navigate(-1);
  };

  // Load TikTok embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch videos from our generated HTML file
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // This will be populated by our Python script
        const response = await fetch('/tiktok-videos.json');
        if (response.ok) {
          const data = await response.json();
          setVideos(data.videos || []);
        }
      } catch (error) {
        console.error('Error fetching TikTok videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-pink-900 via-purple-800 to-pink-900 py-3 sm:py-4 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-pink-700/50 hover:bg-pink-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-pink-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              🎵 St. Louis on TikTok
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-purple-900 via-pink-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Our TikTok Community
              </h2>
            </div>
            
            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
              Follow our journey on TikTok! See the latest videos featuring St. Louis Demonstration JHS - 
              from student activities and achievements to school events and community moments.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-pink-600/20 text-pink-200 px-4 py-2 rounded-full text-sm font-medium border border-pink-500/30">
                📱 Student Life
              </div>
              <div className="bg-purple-600/20 text-purple-200 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30">
                🎓 School Events
              </div>
              <div className="bg-blue-600/20 text-blue-200 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30">
                🏆 Achievements
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-black via-purple-900/20 to-black">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              <p className="text-gray-300 mt-4">Loading TikTok videos...</p>
            </div>
          ) : videos.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Latest Videos Featuring St. Louis Demo JHS
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Automatically updated weekly with the latest content
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {videos.map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300"
                  >
                    {/* TikTok Embed */}
                    <div className="aspect-[9/16] bg-black rounded-t-2xl overflow-hidden">
                      <blockquote 
                        className="tiktok-embed w-full h-full" 
                        cite={video.url}
                        data-video-id={video.id}
                      >
                        <section className="w-full h-full flex items-center justify-center bg-gray-800">
                          <div className="text-center text-gray-400">
                            <Play className="w-12 h-12 mx-auto mb-2" />
                            <p className="text-sm">Loading TikTok video...</p>
                          </div>
                        </section>
                      </blockquote>
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <h4 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                        {video.description || 'St. Louis Demo JHS on TikTok'}
                      </h4>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span>@{video.username}</span>
                        <span>{video.date}</span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{video.likes || '0'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{video.comments || '0'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share className="w-3 h-3" />
                          <span>{video.shares || '0'}</span>
                        </div>
                      </div>

                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 text-sm font-medium transition-colors duration-200"
                      >
                        <span>View on TikTok</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Videos Found Yet</h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                We're currently searching for TikTok videos featuring St. Louis Demonstration JHS. 
                Check back soon for the latest content!
              </p>
              <div className="text-sm text-gray-400">
                Videos are automatically updated weekly
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-pink-900/50 to-purple-900/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Share Your St. Louis Moments
            </h3>
            <p className="text-gray-300 mb-6">
              Tag us in your TikTok videos using <strong>#StLouisDemoJHS</strong> or mention 
              <strong> "St. Louis Demo JHS"</strong> to be featured on our website!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-pink-600/30 text-pink-200 px-4 py-2 rounded-full text-sm font-medium">
                #StLouisDemoJHS
              </span>
              <span className="bg-purple-600/30 text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                #DemonstrationJHS
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TikTokPage;
