import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import ShimmerLoader from './ShimmerLoader';

interface EnhancedModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  imageCategory: string;
}

const EnhancedModal: React.FC<EnhancedModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  imageCategory
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsLoaded(false);
    }
  }, [isOpen]);

  // Handle zoom
  const handleZoom = (delta: number) => {
    const newScale = Math.max(0.5, Math.min(5, scale + delta));
    setScale(newScale);
    
    // Reset position if zooming out to 1x
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    handleZoom(delta);
  };

  // Handle touch/mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile pinch zoom
  const [touches, setTouches] = useState<Touch[]>([]);
  const [lastDistance, setLastDistance] = useState(0);

  const getDistance = (touch1: Touch, touch2: Touch) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchList = Array.from(e.touches);
    setTouches(touchList);
    
    if (touchList.length === 2) {
      const distance = getDistance(touchList[0], touchList[1]);
      setLastDistance(distance);
    } else if (touchList.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: touchList[0].clientX - position.x,
        y: touchList[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touchList = Array.from(e.touches);
    
    if (touchList.length === 2 && touches.length === 2) {
      const distance = getDistance(touchList[0], touchList[1]);
      const delta = (distance - lastDistance) * 0.01;
      handleZoom(delta);
      setLastDistance(distance);
    } else if (touchList.length === 1 && isDragging && scale > 1) {
      setPosition({
        x: touchList[0].clientX - dragStart.x,
        y: touchList[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setTouches([]);
    setIsDragging(false);
  };

  // Reset zoom and position
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Enhanced Background with Blur */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
        
        {/* Modal Content */}
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center p-2 sm:p-4"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
          >
            <X size={24} />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <button
              onClick={() => handleZoom(0.2)}
              className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={() => handleZoom(-0.2)}
              className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={handleReset}
              className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          {/* Image Container - Optimized for immediate visibility */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-[95vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Strong Silver Shimmer Loading */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <ShimmerLoader
                  variant="silver"
                  className="w-full h-full max-w-[90vw] max-h-[80vh]"
                />
              </div>
            )}

            {/* Enhanced Image with Pinch Zoom - Optimized for immediate visibility */}
            <img
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              className={`w-auto h-auto max-w-full max-h-full object-contain transition-all duration-200 ${
                isDragging ? 'cursor-grabbing' : scale > 1 ? 'cursor-grab' : 'cursor-zoom-in'
              } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                transformOrigin: 'center center',
                maxWidth: '95vw',
                maxHeight: '85vh'
              }}
              onLoad={() => setIsLoaded(true)}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              draggable={false}
            />
          </motion.div>

          {/* Image Info - Positioned to not interfere with image visibility */}
          <div className="absolute bottom-2 left-2 right-2 z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-sm sm:text-base font-semibold mb-1 line-clamp-1">{imageAlt}</h3>
              <p className="text-xs text-gray-300">Category: {imageCategory}</p>
              <p className="text-xs text-gray-400 mt-1">
                Wheel/pinch to zoom • Drag to pan • Click outside to close
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnhancedModal;
