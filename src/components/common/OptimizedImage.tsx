import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'shimmer' | 'none';
  onLoad?: () => void;
  onError?: () => void;
  onClick?: () => void;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 80,
  placeholder = 'shimmer',
  onLoad,
  onError,
  onClick,
  sizes,
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Optimize image URL with quality and format parameters
  const optimizeImageUrl = useCallback((url: string) => {
    if (url.includes('ik.imagekit.io')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}tr=q-${quality},f-auto,pr-true`;
    }
    if (url.includes('images.pexels.com')) {
      return url.replace(/w=\d+&h=\d+/, `w=${width || 800}&h=${height || 600}&auto=compress&cs=tinysrgb`);
    }
    return url;
  }, [quality, width, height]);

  // Generate responsive srcSet for better performance
  const generateSrcSet = useCallback((url: string) => {
    if (url.includes('ik.imagekit.io')) {
      const baseUrl = url.split('?')[0];
      return [
        `${baseUrl}?tr=w-400,q-${quality},f-auto 400w`,
        `${baseUrl}?tr=w-800,q-${quality},f-auto 800w`,
        `${baseUrl}?tr=w-1200,q-${quality},f-auto 1200w`,
        `${baseUrl}?tr=w-1600,q-${quality},f-auto 1600w`
      ].join(', ');
    }
    return undefined;
  }, [quality]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, loading]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  const optimizedSrc = optimizeImageUrl(src);
  const srcSet = generateSrcSet(src);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {/* Placeholder */}
      {!isLoaded && placeholder !== 'none' && (
        <div className="absolute inset-0 bg-gray-800">
          {placeholder === 'shimmer' && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
          )}
          {placeholder === 'blur' && (
            <div className="absolute inset-0 bg-gray-800 backdrop-blur-sm" />
          )}
        </div>
      )}

      {/* Main Image */}
      {isInView && (
        <motion.img
          ref={imgRef}
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'opacity'
          }}
        />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-700 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs">Image failed to load</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
