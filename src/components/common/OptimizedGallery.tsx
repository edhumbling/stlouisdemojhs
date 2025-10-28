import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, ZoomIn } from 'lucide-react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import ShimmerLoader from './ShimmerLoader';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  isImageKit?: boolean;
}

interface OptimizedGalleryProps {
  images: GalleryImage[];
  className?: string;
}

const OptimizedGallery: React.FC<OptimizedGalleryProps> = ({ images, className = "" }) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = useCallback((imageId: number) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  }, []);

  const handleCopyImage = useCallback(async (src: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      console.log('Image copied to clipboard');
    } catch (error) {
      try {
        await navigator.clipboard.writeText(src);
        console.log('Image URL copied to clipboard');
      } catch (fallbackError) {
        console.error('Failed to copy image:', fallbackError);
      }
    }
  }, []);

  const handleDownloadImage = useCallback((src: string, alt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = src;
    link.download = `${alt.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <Gallery
      options={{
        allowPanToNext: true,
        arrowKeys: true,
        bgOpacity: 0.9,
        closeTitle: 'Close (Esc)',
        counter: true,
        downloadTitle: 'Download image',
        errorMsg: 'The image could not be loaded.',
        fullscreenTitle: 'Toggle fullscreen',
        history: false,
        loadingIndicatorDelay: 0,
        loop: false,
        maxSpreadZoom: 3,
        nextTitle: 'Next (arrow right)',
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
        preload: [1, 1],
        prevTitle: 'Previous (arrow left)',
        returnFocus: true,
        showHideOpacity: true,
        spacing: 0.12,
        tapToClose: true,
        tapToToggleControls: true,
        timeToIdle: 3000,
        timeToIdleOutside: 1000,
        toggleThumbnailsOnClick: true,
        wheelToZoom: true,
        zoomTitle: 'Zoom in/out',
        zoom: true,
        zoomEl: true,
        zoomElEnabled: true,
        zoomPosition: 'center',
        zoomToFit: true
      }}
    >
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 gap-1 sm:gap-2 ${className}`}>
        {images.map((image, index) => (
          <Item
            key={image.id}
            original={image.src}
            thumbnail={image.src}
            width="800"
            height="800"
            alt={image.alt}
            title={`${image.alt} - ${image.category}`}
          >
            {({ ref, open }) => (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: Math.min(index * 0.01, 0.5)
                }}
                className="relative group cursor-pointer"
                onClick={open}
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
                    loading={index < 12 ? 'eager' : 'lazy'}
                    decoding="async"
                    onLoad={() => handleImageLoad(image.id)}
                    onError={() => handleImageLoad(image.id)}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          open();
                        }}
                        className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-sm border border-white/30 transition-all duration-200 hover:scale-110 active:scale-95"
                        title="View full size"
                      >
                        <ZoomIn size={14} />
                      </button>
                    </div>
                  </div>

                  {/* ImageKit indicator */}
                  {image.isImageKit && (
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      New
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
};

export default OptimizedGallery;