import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, ZoomIn } from 'lucide-react';
import CustomLightbox from './CustomLightbox';
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

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handleIndexChange = useCallback((index: number) => {
    setLightboxIndex(index);
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                {/* Action buttons positioned at bottom */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 px-2">
                  {/* Copy Button */}
                  <button
                    onClick={(e) => handleCopyImage(image.src, e)}
                    className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-sm border border-white/30 transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Copy image"
                  >
                    <Copy size={14} />
                  </button>

                  {/* Download Button */}
                  <button
                    onClick={(e) => handleDownloadImage(image.src, image.alt, e)}
                    className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-sm border border-white/30 transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Download image"
                  >
                    <Download size={14} />
                  </button>

                  {/* Zoom Button */}
                  <button
                    onClick={(e) => handleZoomImage(index, e)}
                    className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-sm border border-white/30 transition-all duration-200 hover:scale-110 active:scale-95"
                    title="View full size"
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom Lightbox */}
      <CustomLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={lightboxSlides}
        currentIndex={lightboxIndex}
        onIndexChange={handleIndexChange}
      />
    </>
  );
};

export default OptimizedGallery;
