import React from 'react';
import { motion } from 'framer-motion';

interface ShimmerLoaderProps {
  variant?: 'card' | 'hero' | 'image' | 'text' | 'section' | 'silver' | 'thumbnail';
  className?: string;
  width?: string;
  height?: string;
}

const ShimmerLoader: React.FC<ShimmerLoaderProps> = ({ 
  variant = 'card', 
  className = '',
  width = 'w-full',
  height = 'h-48'
}) => {
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { 
      x: '100%',
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return 'h-screen w-full bg-gradient-to-br from-blue-900/20 via-slate-900/30 to-green-900/20';
      case 'image':
        return `${width} ${height} bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl`;
      case 'text':
        return 'h-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded';
      case 'section':
        return 'min-h-[400px] w-full bg-gradient-to-br from-blue-900/10 via-slate-900/20 to-green-900/10';
      case 'silver':
        return `${width} ${height} bg-gradient-to-br from-slate-700/80 via-gray-600/90 to-slate-800/80 rounded-xl`;
      case 'thumbnail':
        return `${width} ${height} bg-gradient-to-br from-slate-600/70 via-gray-500/80 to-slate-700/70 rounded-lg`;
      default:
        return `${width} ${height} bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl`;
    }
  };

  return (
    <div className={`relative overflow-hidden ${getVariantClasses()} ${className}`}>
      {/* Enhanced Silver Shimmer Effect */}
      <motion.div
        className={`absolute inset-0 ${
          variant === 'silver' || variant === 'thumbnail'
            ? 'bg-gradient-to-r from-transparent via-slate-300/40 to-transparent'
            : 'bg-gradient-to-r from-transparent via-white/10 to-transparent'
        }`}
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
      />

      {/* Strong Silver Overlay for Silver Variant */}
      {(variant === 'silver' || variant === 'thumbnail') && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent"
          variants={{
            initial: { x: '-100%', opacity: 0.8 },
            animate: {
              x: '100%',
              opacity: [0.8, 1, 0.8],
              transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.3
              }
            }
          }}
          initial="initial"
          animate="animate"
        />
      )}
      
      {/* Additional blur lights for beauty */}
      <div className="absolute inset-0 opacity-60">
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-12 h-12 bg-green-400/20 rounded-full blur-lg"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-8 h-8 bg-cyan-400/20 rounded-full blur-md"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </div>

      {/* Content placeholder for cards */}
      {variant === 'card' && (
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-3 bg-white/10 rounded w-3/4"></div>
            <div className="h-3 bg-white/10 rounded w-1/2"></div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-white/10 rounded w-full"></div>
            <div className="h-2 bg-white/10 rounded w-2/3"></div>
          </div>
        </div>
      )}

      {/* Hero content placeholder */}
      {variant === 'hero' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <motion.div
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/20 rounded-full mx-auto"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <div className="space-y-2">
              <div className="h-4 bg-white/20 rounded w-48 mx-auto"></div>
              <div className="h-3 bg-white/20 rounded w-32 mx-auto"></div>
            </div>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShimmerLoader;
