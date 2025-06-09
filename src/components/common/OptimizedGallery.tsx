import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import ShimmerLoader from './ShimmerLoader';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface OptimizedGalleryProps {
  images: GalleryImage[];
  className?: string;
}

const OptimizedGallery: React.FC<OptimizedGalleryProps> = ({ images, className = "" }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Convert images to lightbox format
  const lightboxSlides = useMemo(() => 
    images.map(image => ({
      src: image.src,
      alt: image.alt,
      title: `${image.alt} - ${image.category}`
    })), [images]
  );

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleImageLoad = useCallback((imageId: number) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  }, []);

  return (
    <>
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 gap-1 sm:gap-2 ${className}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.2, 
              delay: Math.min(index * 0.01, 0.5) // Cap delay to prevent long waits
            }}
            className="relative group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-square relative overflow-hidden bg-gray-900 rounded-md shadow-md hover:shadow-xl transition-all duration-200 group-hover:scale-[1.02]">
              {/* Show shimmer until image loads */}
              {!loadedImages.has(image.id) && (
                <ShimmerLoader variant="silver" className="absolute inset-0 z-10" />
              )}
              
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-cover transition-all duration-200 group-hover:scale-105 ${
                  loadedImages.has(image.id) ? 'opacity-100' : 'opacity-0'
                }`}
                loading={index < 12 ? 'eager' : 'lazy'} // Load first 12 images immediately
                decoding="async"
                onLoad={() => handleImageLoad(image.id)}
                onError={() => handleImageLoad(image.id)} // Hide shimmer even on error
              />
              
              {/* Minimal hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-200"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Yet Another React Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        animation={{ fade: 200, swipe: 300 }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
          closeOnPullUp: true
        }}
        toolbar={{
          buttons: ["close"]
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        on={{
          view: ({ index }) => {
            // Preload adjacent images for smoother navigation
            const preloadIndexes = [index - 1, index + 1].filter(i =>
              i >= 0 && i < lightboxSlides.length
            );
            preloadIndexes.forEach(i => {
              const img = new Image();
              img.src = lightboxSlides[i].src;
            });
          }
        }}
        styles={{
          container: { 
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)"
          },
          slide: {
            filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))"
          }
        }}
        carousel={{
          finite: false,
          preload: 2,
          spacing: "30%",
          imageFit: "contain"
        }}
      />
    </>
  );
};

export default OptimizedGallery;
