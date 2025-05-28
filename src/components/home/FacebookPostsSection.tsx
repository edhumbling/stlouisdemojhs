import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, ExternalLink, Loader2 } from 'lucide-react';
import VideoModal from '../common/VideoModal';

// Facebook SDK types
declare global {
  interface Window {
    FB: {
      init: (params: any) => void;
      XFBML: {
        parse: () => void;
      };
    };
  }
}

const FacebookPostsSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fbLoaded, setFbLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [selectedVideoTitle, setSelectedVideoTitle] = useState('');

  // Facebook Page URL - St. Louis Demonstration JHS Official Page
  const facebookPageUrl = "https://www.facebook.com/stlouisdemojhs";

  useEffect(() => {
    // Blazing fast Facebook SDK loading
    const loadFacebookSDK = () => {
      // Immediate check for existing FB
      if (window.FB) {
        setFbLoaded(true);
        setIsLoading(false);
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="connect.facebook.net"]');
      if (existingScript) {
        // Listen for existing script load
        existingScript.addEventListener('load', () => {
          if (window.FB) {
            setFbLoaded(true);
          }
          setIsLoading(false);
        });
        return;
      }

      // Create ultra-optimized Facebook SDK script
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = false; // Remove defer for faster loading
      script.crossOrigin = 'anonymous';

      // Immediate loading handlers
      script.onload = () => {
        if (window.FB) {
          window.FB.init({
            xfbml: true,
            version: 'v18.0'
          });
          setFbLoaded(true);
        }
        setIsLoading(false);
      };

      script.onerror = () => {
        setIsLoading(false);
        setLoadError(true);
      };

      // Immediate append for fastest loading
      document.head.appendChild(script);
    };

    // Start loading immediately without any delays
    loadFacebookSDK();
  }, []);

  // Blazing fast Facebook widgets refresh
  useEffect(() => {
    if (fbLoaded && window.FB) {
      // Immediate parsing for fastest rendering
      window.FB.XFBML.parse();
    }
  }, [fbLoaded]);

  // Handle video modal
  const handleVideoClick = (videoUrl: string, title: string = 'Facebook Video') => {
    setSelectedVideoUrl(videoUrl);
    setSelectedVideoTitle(title);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideoUrl('');
    setSelectedVideoTitle('');
  };

  // Determine video platform
  const getVideoPlatform = (url: string): 'facebook' | 'youtube' | 'vimeo' | 'other' => {
    if (url.includes('facebook.com')) return 'facebook';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('vimeo.com')) return 'vimeo';
    return 'other';
  };

  // Optimized click handlers for Facebook posts
  useEffect(() => {
    if (fbLoaded && window.FB) {
      // Reduced delay for faster interaction
      setTimeout(() => {
        // Add global click listener for video URLs
        const handleVideoLinks = (e: Event) => {
          const target = e.target as HTMLElement;
          const link = target.closest('a[href*="facebook.com/watch"], a[href*="youtube.com"], a[href*="youtu.be"]');

          if (link) {
            const anchor = link as HTMLAnchorElement;
            // Only intercept if it's within our Facebook section
            const fbSection = anchor.closest('.fb-page');
            if (fbSection) {
              e.preventDefault();
              e.stopPropagation();
              handleVideoClick(anchor.href, anchor.textContent || 'Facebook Video');
            }
          }
        };

        document.addEventListener('click', handleVideoLinks, { passive: false });

        // Cleanup function
        return () => {
          document.removeEventListener('click', handleVideoLinks);
        };
      }, 1000); // Reduced from 3000ms to 1000ms
    }
  }, [fbLoaded]);

  // Student gallery images for animated background
  const studentImages = [
    'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-120,h-120,q-60',
    'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?tr=w-120,h-120,q-60',
    'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7124.HEIC?tr=w-120,h-120,q-60',
    'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-120,h-120,q-60',
    'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?tr=w-120,h-120,q-60',
    'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7124.HEIC?tr=w-120,h-120,q-60',
    'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-120,h-120,q-60',
    'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?tr=w-120,h-120,q-60',
    'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7124.HEIC?tr=w-120,h-120,q-60',
    'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-120,h-120,q-60',
    'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?tr=w-120,h-120,q-60',
    'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7124.HEIC?tr=w-120,h-120,q-60'
  ];

  // Fixed subtle colors for stable overlays
  const galleryColors = [
    'rgba(59, 130, 246, 0.15)', // Subtle Blue
    'rgba(34, 197, 94, 0.15)',  // Subtle Green
    'rgba(251, 191, 36, 0.15)', // Subtle Yellow
    'rgba(168, 85, 247, 0.15)', // Subtle Purple
  ];

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      {/* Peaceful Student Photo Galleries - Desktop Only (3 Strips) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {/* Left Strip */}
        <div className="gallery-strip left-8 w-16">
          <div className="gallery-content space-y-6">
            {[...studentImages, ...studentImages].map((img, index) => (
              <div
                key={`left-${index}`}
                className="gallery-item w-12 h-12 rounded-lg shadow-md"
                style={{
                  filter: 'blur(0.5px) brightness(0.8)',
                  opacity: 0.4,
                  transform: 'rotate(1deg)'
                }}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable="false"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{ backgroundColor: galleryColors[index % galleryColors.length] }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Center Strip */}
        <div className="gallery-strip left-1/2 transform -translate-x-1/2 w-16">
          <div className="gallery-content space-y-8" style={{ animationDelay: '-40s' }}>
            {[...studentImages, ...studentImages].map((img, index) => (
              <div
                key={`center-${index}`}
                className="gallery-item w-10 h-10 rounded-lg shadow-sm"
                style={{
                  filter: 'blur(0.8px) brightness(0.6)',
                  opacity: 0.3,
                  transform: 'rotate(-1deg)'
                }}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable="false"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{ backgroundColor: galleryColors[(index + 1) % galleryColors.length] }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Strip */}
        <div className="gallery-strip right-8 w-16">
          <div className="gallery-content space-y-6" style={{ animationDelay: '-80s' }}>
            {[...studentImages, ...studentImages].map((img, index) => (
              <div
                key={`right-${index}`}
                className="gallery-item w-12 h-12 rounded-lg shadow-md"
                style={{
                  filter: 'blur(0.5px) brightness(0.8)',
                  opacity: 0.4,
                  transform: 'rotate(2deg)'
                }}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable="false"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{ backgroundColor: galleryColors[(index + 2) % galleryColors.length] }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 ring-4 ring-blue-100">
              <Facebook size={28} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black" style={{ textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4)' }}>
              Latest Updates
            </h2>
          </div>
          <p className="text-lg text-black font-medium max-w-2xl mx-auto leading-relaxed" style={{ textShadow: '0 0 8px rgba(255,255,255,0.7), 0 0 16px rgba(255,255,255,0.5)' }}>
            Stay connected with our school community. Follow our latest news, events, and achievements on Facebook.
          </p>

          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-8 h-0.5 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-green-400 rounded-full"></div>
          </div>
        </motion.div>

        {/* Facebook Posts Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          {/* Shimmer Loading State */}
          {isLoading && !loadError && (
            <div className="flex justify-center">
              <div className="relative">
                {/* Neon Glow Effects for Loading */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 rounded-2xl blur-sm opacity-75 animate-pulse"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 rounded-2xl blur-xs opacity-50 animate-pulse delay-300"></div>

                {/* Shimmer Container */}
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-white w-[800px] h-[700px]">
                  {/* Header Shimmer */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full shimmer"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded shimmer w-1/2"></div>
                      </div>
                    </div>
                  </div>

                  {/* Posts Shimmer */}
                  <div className="p-4 space-y-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="space-y-3">
                        {/* Post Header */}
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full shimmer"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 rounded shimmer w-1/3"></div>
                            <div className="h-2 bg-gray-200 rounded shimmer w-1/4"></div>
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded shimmer w-full"></div>
                          <div className="h-3 bg-gray-200 rounded shimmer w-4/5"></div>
                          <div className="h-3 bg-gray-200 rounded shimmer w-3/5"></div>
                        </div>

                        {/* Post Image/Video */}
                        <div className="h-48 bg-gray-200 rounded-lg shimmer"></div>

                        {/* Post Actions */}
                        <div className="flex items-center space-x-6">
                          <div className="h-3 bg-gray-200 rounded shimmer w-12"></div>
                          <div className="h-3 bg-gray-200 rounded shimmer w-16"></div>
                          <div className="h-3 bg-gray-200 rounded shimmer w-14"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error State - Fallback */}
          {loadError && (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-gray-200 p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25 ring-4 ring-blue-100">
                  <Facebook size={36} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-3">
                  Connect with us on Facebook
                </h3>
                <p className="text-gray-700 mb-8 leading-relaxed max-w-md mx-auto">
                  Stay updated with our latest news, events, and school activities by following our official Facebook page.
                </p>
                <a
                  href={facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 ring-2 ring-blue-100"
                >
                  <Facebook size={22} />
                  <span>Visit Our Facebook Page</span>
                  <ExternalLink size={18} />
                </a>

                {/* Decorative elements */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-yellow-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-6 h-0.5 bg-yellow-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-300"></div>
                  <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-green-400 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* Facebook Page Plugin - Neon Glow Container */}
          {!isLoading && !loadError && (
            <div className="flex justify-center">
              {/* Desktop Layout - Centered with Neon Glow */}
              <div className="hidden lg:block">
                <div className="relative">
                  {/* Neon Glow Effects */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 rounded-2xl blur-sm opacity-75 animate-pulse"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 rounded-2xl blur-xs opacity-50 animate-pulse delay-300"></div>

                  {/* Main Container */}
                  <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-white">
                    <div
                      className="fb-page"
                      data-href={facebookPageUrl}
                      data-tabs="timeline"
                      data-width="800"
                      data-height="700"
                      data-small-header="false"
                      data-adapt-container-width="false"
                      data-hide-cover="false"
                      data-show-facepile="true"
                      data-show-posts="true"
                      data-lazy="true"
                    >
                      <blockquote cite={facebookPageUrl} className="fb-xfbml-parse-ignore">
                        <a href={facebookPageUrl} className="text-blue-600 hover:text-blue-800 transition-colors">
                          Visit our Facebook page
                        </a>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile/Tablet Layout - Centered with Subtle Glow */}
              <div className="block lg:hidden w-full max-w-md mx-auto">
                <div className="relative">
                  {/* Mobile Neon Glow Effects */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 rounded-xl blur-sm opacity-60 animate-pulse"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 rounded-xl blur-xs opacity-40 animate-pulse delay-300"></div>

                  {/* Mobile Container */}
                  <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border-2 border-white">
                    <div
                      className="fb-page w-full"
                      data-href={facebookPageUrl}
                      data-tabs="timeline"
                      data-width="400"
                      data-height="600"
                      data-small-header="true"
                      data-adapt-container-width="true"
                      data-hide-cover="false"
                      data-show-facepile="false"
                      data-show-posts="true"
                      data-lazy="true"
                    >
                      <blockquote cite={facebookPageUrl} className="fb-xfbml-parse-ignore">
                        <a href={facebookPageUrl} className="text-blue-600 hover:text-blue-800 transition-colors">
                          Visit our Facebook page
                        </a>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visit Facebook Page Button */}
          {!loadError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 ring-2 ring-blue-100"
            >
              <Facebook size={22} />
              <span>Visit Our Facebook Page</span>
              <ExternalLink size={18} />
            </a>
          </motion.div>
          )}
        </motion.div>
      </div>

      {/* Video Modal */}
      {selectedVideoUrl && (
        <VideoModal
          isOpen={showVideoModal}
          onClose={handleCloseVideoModal}
          videoUrl={selectedVideoUrl}
          title={selectedVideoTitle}
          description="Video from St. Louis Demonstration JHS Facebook page"
          platform={getVideoPlatform(selectedVideoUrl)}
        />
      )}
    </section>
  );
};

export default FacebookPostsSection;
