import React, { useEffect } from 'react';
import 'lightbox2/dist/css/lightbox.min.css';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface LightboxGalleryProps {
  images: GalleryImage[];
  className?: string;
}

const LightboxGallery: React.FC<LightboxGalleryProps> = ({ images, className = "" }) => {
  useEffect(() => {
    // Dynamically import lightbox2 to avoid SSR issues
    const initLightbox = async () => {
      const lightbox = await import('lightbox2');
      
      // Configure lightbox options for optimal experience
      lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'Image %1 of %2 - St. Louis Demo JHS Gallery',
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'maxWidth': '95%',
        'maxHeight': '90%',
        'fitImagesInViewport': true,
        'positionFromTop': 50,
        'showImageNumberLabel': true,
        'alwaysShowNavOnTouchDevices': true,
        'disableScrolling': true,
        'sanitizeTitle': false
      });
    };

    initLightbox();
  }, []);

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-1 sm:gap-2 md:gap-3 ${className}`}>
      {images.map((image, index) => (
        <div key={image.id} className="relative group">
          <a
            href={image.src}
            data-lightbox="gallery"
            data-title={`${image.alt} - ${image.category}`}
            className="block relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] hover:z-10"
          >
            {/* Image Container */}
            <div className="aspect-square relative overflow-hidden bg-gray-800">
              {/* Loading placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse"></div>

              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 relative z-10"
                loading="lazy"
                decoding="async"
                onLoad={(e) => {
                  // Hide loading placeholder when image loads
                  const placeholder = e.currentTarget.previousElementSibling;
                  if (placeholder) {
                    placeholder.style.display = 'none';
                  }
                }}
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                  <div className="w-8 h-8 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium">Click to view</p>
                </div>
              </div>
            </div>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <p className="text-white text-xs font-medium truncate">{image.alt}</p>
              <p className="text-gray-300 text-xs truncate">{image.category}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default LightboxGallery;
