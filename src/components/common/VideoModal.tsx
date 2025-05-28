import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ExternalLink, Facebook } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  description?: string;
  platform?: 'facebook' | 'youtube' | 'vimeo' | 'other';
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  description,
  platform = 'other'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Convert various video URLs to embeddable format
  const getEmbedUrl = (url: string, platform: string) => {
    try {
      if (platform === 'facebook') {
        // Facebook video embed
        if (url.includes('facebook.com/watch')) {
          const videoId = url.match(/v=(\d+)/)?.[1];
          if (videoId) {
            return `https://www.facebook.com/plugins/video.php?height=314&href=${encodeURIComponent(url)}&show_text=false&width=560&t=0`;
          }
        }
        return url;
      } else if (platform === 'youtube') {
        // YouTube embed
        const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        }
      } else if (platform === 'vimeo') {
        // Vimeo embed
        const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
        if (videoId) {
          return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
        }
      }
      return url;
    } catch (error) {
      console.error('Error processing video URL:', error);
      return url;
    }
  };

  const embedUrl = getEmbedUrl(videoUrl, platform);

  const getPlatformIcon = () => {
    switch (platform) {
      case 'facebook':
        return <Facebook size={20} className="text-blue-600" />;
      case 'youtube':
        return <Play size={20} className="text-red-600" />;
      default:
        return <Play size={20} className="text-gray-600" />;
    }
  };

  const getPlatformColor = () => {
    switch (platform) {
      case 'facebook':
        return 'from-blue-600 to-blue-700';
      case 'youtube':
        return 'from-red-600 to-red-700';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {getPlatformIcon()}
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                      {description}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Open in new tab button */}
                <button
                  onClick={() => window.open(videoUrl, '_blank')}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink size={18} />
                </button>
                
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative bg-black">
              <div className="aspect-video">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={title}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getPlatformColor()}`}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </span>
                  {description && (
                    <span className="text-xs text-gray-500 hidden sm:block">
                      {description}
                    </span>
                  )}
                </div>
                
                <button
                  onClick={() => window.open(videoUrl, '_blank')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink size={16} />
                  <span className="hidden sm:inline">View Original</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
