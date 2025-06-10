import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Heart, ExternalLink } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const TikTokPage: React.FC = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [videosLoaded, setVideosLoaded] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  // Load TikTok embed script and handle video loading
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;

    // Handle script load to trigger video rendering
    script.onload = () => {
      // Give TikTok a moment to initialize, then mark videos as loaded
      setTimeout(() => {
        setVideosLoaded(true);
        // Trigger TikTok embed rendering if available
        if ((window as any).tiktokEmbed) {
          (window as any).tiktokEmbed.lib.render();
        }
      }, 1000);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
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
        // Quick transition to loaded state
        setTimeout(() => setVideosLoaded(true), 500);
      }
    };

    fetchVideos();
  }, []);

  // Trigger TikTok embed rendering when videos are loaded
  useEffect(() => {
    if (!loading && videos.length > 0) {
      // Small delay to ensure DOM is ready, then trigger TikTok rendering
      const timer = setTimeout(() => {
        if ((window as any).tiktokEmbed) {
          (window as any).tiktokEmbed.lib.render();
        }
        setVideosLoaded(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [loading, videos]);

  return (
    <div className="min-h-screen bg-black overflow-auto">
      {/* Back Button and Title Section - Original Style */}
      <div className="bg-gradient-to-r from-pink-900 via-purple-800 to-pink-900 py-3 sm:py-4">
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

      {/* Compact Hero Section with TikTok Backgrounds */}
      <section className="py-4 sm:py-6 relative overflow-hidden">
        {/* Multiple TikTok Background Images */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 z-10"></div>

          {/* Background Image 1 - 3D Social Media Icons */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: 'url(https://ik.imagekit.io/humbling/3d-rendering-social-media-icon_23-2151413531.avif)',
              transform: 'scale(1.1)'
            }}
          ></div>

          {/* Background Image 2 - TikTok 3D Logo Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
            style={{
              backgroundImage: 'url(https://ik.imagekit.io/humbling/psd-tiktok-logo-3d-icon-front-view_576588-11.avif)',
              transform: 'scale(1.05) rotate(2deg)'
            }}
          ></div>

          {/* Background Image 3 - Repeated Social Media Pattern */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-soft-light"
            style={{
              backgroundImage: 'url(https://ik.imagekit.io/humbling/3d-rendering-social-media-icon_23-2151413531.avif)',
              transform: 'scale(1.08) rotate(-1deg)'
            }}
          ></div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/30 via-purple-600/20 to-blue-600/30 animate-pulse z-5"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                Our TikTok Community
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-200 mb-4 leading-relaxed">
              Latest videos featuring St. Louis Demo JHS
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <div className="bg-pink-600/30 text-pink-200 px-3 py-1 rounded-full text-xs font-medium border border-pink-500/40 backdrop-blur-sm">
                📱 Student Life
              </div>
              <div className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/40 backdrop-blur-sm">
                🎓 School Events
              </div>
              <div className="bg-blue-600/30 text-blue-200 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/40 backdrop-blur-sm">
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
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 relative">
                <div className="absolute inset-0 rounded-full border-2 border-gray-300/20 animate-ping"></div>
              </div>
              <p className="text-gray-300 mt-4">✨ Loading TikTok videos...</p>
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
                    className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 relative group"
                  >
                    {/* Simple Silver Reflection on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
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
                          <span className="text-xs">💬</span>
                          <span>{video.comments || '0'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs">🔄</span>
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
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group hover:scale-105 transition-transform duration-300">
                <Play className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
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
              You can also submit your videos directly through our form below.
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

      {/* Distinguished Footer Submit Video Button */}
      <section className="py-8 bg-gradient-to-r from-black via-gray-900 to-black border-t border-pink-500/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Distinguished Submit Button */}
            <Link to="/tiktok-submit">
              <motion.div
                className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 transform hover:scale-110 border-2 border-pink-500/50 overflow-hidden cursor-pointer"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 40px rgba(255, 20, 147, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                {/* Multiple Shimmer Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-pink-300/20 to-transparent skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1200 delay-200"></div>

                {/* Pulsing Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-pink-400/50 animate-pulse"></div>

                {/* Content */}
                <motion.div
                  className="relative z-10 flex items-center gap-4"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255, 20, 147, 0.5)",
                      "0 0 20px rgba(255, 20, 147, 0.8)",
                      "0 0 10px rgba(255, 20, 147, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.span
                    className="text-3xl"
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    📹
                  </motion.span>
                  <span>Submit Your TikTok Video</span>
                  <motion.span
                    className="text-2xl"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ✨
                  </motion.span>
                </motion.div>
              </motion.div>
            </Link>

            {/* Footer Description */}
            <motion.p
              className="mt-6 text-gray-400 text-sm max-w-md mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Share your St. Louis Demo JHS moments with our community!
              <br />
              <span className="text-pink-300 font-semibold">Click above to open our full-screen submission form</span>
            </motion.p>

            {/* Floating Hashtags */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <motion.span
                className="bg-pink-600/20 text-pink-300 px-3 py-1 rounded-full text-xs border border-pink-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(236, 72, 153, 0.3)" }}
              >
                #StLouisDemoJHS
              </motion.span>
              <motion.span
                className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.3)" }}
              >
                #TikTokSubmission
              </motion.span>
              <motion.span
                className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(37, 99, 235, 0.3)" }}
              >
                #SchoolLife
              </motion.span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TikTokPage;
