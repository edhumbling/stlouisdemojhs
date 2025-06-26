import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, ZoomIn } from 'lucide-react';
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

  // Action button handlers
  const handleCopyImage = useCallback(async (imageSrc: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      // You could add a toast notification here
      console.log('Image copied to clipboard');
    } catch (error) {
      // Fallback: copy image URL
      try {
        await navigator.clipboard.writeText(imageSrc);
        console.log('Image URL copied to clipboard');
      } catch (fallbackError) {
        console.error('Failed to copy image:', fallbackError);
      }
    }
  }, []);

  const handleDownloadImage = useCallback((imageSrc: string, imageAlt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `${imageAlt.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleZoomImage = useCallback((index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    openLightbox(index);
  }, [openLightbox]);

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

              {/* Hover overlay with action buttons */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-center pb-2">
                {/* Action buttons - only show on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2"
                >
                  {/* Copy Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleCopyImage(image.src, e)}
                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-200"
                    title="Copy image"
                  >
                    <Copy size={16} />
                  </motion.button>

                  {/* Download Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleDownloadImage(image.src, image.alt, e)}
                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-200"
                    title="Download image"
                  >
                    <Download size={16} />
                  </motion.button>

                  {/* Zoom Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleZoomImage(index, e)}
                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-200"
                    title="View full size"
                  >
                    <ZoomIn size={16} />
                  </motion.button>
                </motion.div>
              </div>
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
