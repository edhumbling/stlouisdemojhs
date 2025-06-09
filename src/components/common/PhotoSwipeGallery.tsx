import React, { useEffect, useRef } from 'react';
import PhotoSwipe from 'photoswipe';
import 'photoswipe/style.css';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface PhotoSwipeGalleryProps {
  images: GalleryImage[];
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

const PhotoSwipeGallery: React.FC<PhotoSwipeGalleryProps> = ({
  images,
  isOpen,
  initialIndex,
  onClose
}) => {
  const pswpRef = useRef<PhotoSwipe | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (isOpen && images.length > 0) {
      setIsLoading(true);
      // Function to get image dimensions
      const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
          };
          img.onerror = () => {
            resolve({ width: 1200, height: 800 }); // Fallback dimensions
          };
          img.src = src;
        });
      };

      // Create PhotoSwipe items with proper dimensions
      const createItems = async () => {
        const items = await Promise.all(
          images.map(async (image) => {
            const dimensions = await getImageDimensions(image.src);
            return {
              src: image.src,
              width: dimensions.width,
              height: dimensions.height,
              alt: image.alt,
              category: image.category
            };
          })
        );

        return items;
      };

      // Initialize PhotoSwipe with items
      const initPhotoSwipe = async () => {
        const items = await createItems();

        // PhotoSwipe options with enhanced mobile support
        const options = {
          index: initialIndex,
          showHideAnimationType: 'zoom' as const,
          bgOpacity: 0.95,
          spacing: 0.1,
          allowPanToNext: true,
          loop: true,
          pinchToClose: true,
          closeOnVerticalDrag: true,
          // Responsive padding
          padding: window.innerWidth < 768
            ? { top: 20, bottom: 40, left: 20, right: 20 }
            : { top: 20, bottom: 40, left: 100, right: 100 },
          // Enhanced mobile gestures
          tapAction: 'toggle-controls' as const,
          doubleTapAction: 'zoom' as const,
          preloaderDelay: 500,
          // Custom UI elements
          ui: {
            closeButton: true,
            arrowPrev: true,
            arrowNext: true,
            zoom: true,
            counter: true
          }
        };

        // Initialize PhotoSwipe
        pswpRef.current = new PhotoSwipe(options);

        // Add custom data source
        pswpRef.current.addFilter('itemData', (itemData, index) => {
          return {
            ...itemData,
            ...items[index]
          };
        });

        // Handle close event
        pswpRef.current.on('close', () => {
          onClose();
        });

        // Add keyboard shortcuts
        pswpRef.current.on('keydown', (e) => {
          if (e.originalEvent.key === 'i' || e.originalEvent.key === 'I') {
            // Trigger info display on 'i' key
            const currentItem = pswpRef.current?.currSlide?.data;
            if (currentItem) {
              // Same info display as the button
              const infoDiv = document.createElement('div');
              infoDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 20px;
                border-radius: 12px;
                backdrop-filter: blur(20px);
                z-index: 100001;
                max-width: 300px;
                text-align: center;
                font-family: 'Poppins', sans-serif;
              `;
              infoDiv.innerHTML = `
                <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">${currentItem.alt}</h3>
                <p style="margin: 0; font-size: 14px; color: #cccccc;">Category: ${currentItem.category}</p>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">Press 'i' for info • ESC to close</p>
                <button onclick="this.parentElement.remove()" style="
                  margin-top: 15px;
                  padding: 8px 16px;
                  background: rgba(59, 130, 246, 0.8);
                  color: white;
                  border: none;
                  border-radius: 6px;
                  cursor: pointer;
                  font-size: 12px;
                ">Close</button>
              `;
              document.body.appendChild(infoDiv);

              // Auto-remove after 5 seconds
              setTimeout(() => {
                if (infoDiv.parentElement) {
                  infoDiv.remove();
                }
              }, 5000);
            }
          }
        });

        // Custom UI enhancements
        pswpRef.current.on('uiRegister', () => {
          // Add custom info button
          pswpRef.current?.ui?.registerElement({
            name: 'custom-info',
            order: 9,
            isButton: true,
            html: {
              isCustomSVG: true,
              inner: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>',
              outlineID: 'pswp__icn-info'
            },
            onInit: (el, pswp) => {
              el.setAttribute('title', 'Image Info');
            },
            onClick: (event, el, pswp) => {
              const currentItem = pswp.currSlide?.data;
              if (currentItem) {
                // Create a more elegant info display
                const infoDiv = document.createElement('div');
                infoDiv.style.cssText = `
                  position: fixed;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  background: rgba(0, 0, 0, 0.9);
                  color: white;
                  padding: 20px;
                  border-radius: 12px;
                  backdrop-filter: blur(20px);
                  z-index: 100001;
                  max-width: 300px;
                  text-align: center;
                  font-family: 'Poppins', sans-serif;
                `;
                infoDiv.innerHTML = `
                  <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">${currentItem.alt}</h3>
                  <p style="margin: 0; font-size: 14px; color: #cccccc;">Category: ${currentItem.category}</p>
                  <button onclick="this.parentElement.remove()" style="
                    margin-top: 15px;
                    padding: 8px 16px;
                    background: rgba(59, 130, 246, 0.8);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 12px;
                  ">Close</button>
                `;
                document.body.appendChild(infoDiv);

                // Auto-remove after 5 seconds
                setTimeout(() => {
                  if (infoDiv.parentElement) {
                    infoDiv.remove();
                  }
                }, 5000);
              }
            }
          });
        });

        // Initialize and open
        pswpRef.current.init();
        setIsLoading(false);
      };

      // Call the async initialization with error handling
      initPhotoSwipe().catch((error) => {
        console.error('PhotoSwipe initialization failed:', error);
        setIsLoading(false);
        // Fallback: close the gallery if initialization fails
        onClose();
      });

      return () => {
        if (pswpRef.current) {
          pswpRef.current.destroy();
          pswpRef.current = null;
        }
      };
    }
  }, [isOpen, images, initialIndex, onClose]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pswpRef.current) {
        pswpRef.current.destroy();
        pswpRef.current = null;
      }
    };
  }, []);

  // Show loading overlay while PhotoSwipe is initializing
  if (isLoading && isOpen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <div style={{
          color: 'white',
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Loading gallery...</p>
        </div>
      </div>
    );
  }

  return null; // PhotoSwipe creates its own DOM elements
};

export default PhotoSwipeGallery;
