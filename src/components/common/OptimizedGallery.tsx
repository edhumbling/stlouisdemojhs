import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Copy, Download } from 'lucide-react';
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback((imageId: number) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  }, []);

  const openPreview = useCallback((index: number) => {
    setPreviewIndex(index);
    setPreviewOpen(true);
    setImageLoaded(false);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    if (previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
      setImageLoaded(false);
    }
  }, [previewIndex]);

  const goToNext = useCallback(() => {
    if (previewIndex < images.length - 1) {
      setPreviewIndex(previewIndex + 1);
      setImageLoaded(false);
    }
  }, [previewIndex, images.length]);

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

  // Keyboard navigation
  useEffect(() => {
    if (!previewOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closePreview();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [previewOpen, closePreview, goToPrevious, goToNext]);

  const currentImage = images[previewIndex];

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 gap-1 sm:gap-2 ${className}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: Math.min(index * 0.01, 0.5)
            }}
            className="relative group cursor-pointer"
            onClick={() => openPreview(index)}
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
        ))}
      </div>

      {/* Picasa-style Simple Preview */}
      <AnimatePresence>
        {previewOpen && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closePreview}
          >
            {/* Close Button */}
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            {previewIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {previewIndex < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Main Image Container */}
            <div
              className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={previewIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Loading Spinner */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}

                {/* Image */}
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(true)}
                />

                {/* Simple Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-lg font-medium mb-1">
                    {currentImage.alt}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {previewIndex + 1} of {images.length}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Simple Action Buttons */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyImage(currentImage.src, e);
                }}
                className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                title="Copy image"
              >
                <Copy size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadImage(currentImage.src, currentImage.alt, e);
                }}
                className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                title="Download image"
              >
                <Download size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OptimizedGallery;