import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { galleryImages } from '../../data';
import { X } from 'lucide-react';

const GalleryPreview: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const previewImages = galleryImages.slice(0, 6);

  const openModal = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-4 md:mb-6">
            School Life
          </h2>
          <p className="text-base sm:text-lg text-gray-700 px-1">
            Get a glimpse of daily activities, special events, and the vibrant atmosphere at
            St. Louis Demonstration Junior High School.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          {previewImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg shadow-md aspect-square cursor-pointer group"
              onClick={() => openModal(image.id)}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 text-center">
                <span className="text-white text-xs sm:text-sm font-medium">{image.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white font-medium rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 text-sm sm:text-base hover:scale-105"
          >
            View Full Gallery
          </Link>
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-4xl w-full">
              <button
                onClick={closeModal}
                className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
                aria-label="Close modal"
              >
                <X size={20} className="sm:hidden" />
                <X size={24} className="hidden sm:block" />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                {galleryImages.find(img => img.id === selectedImage) && (
                  <>
                    <img
                      src={galleryImages.find(img => img.id === selectedImage)?.src}
                      alt={galleryImages.find(img => img.id === selectedImage)?.alt}
                      className="w-full max-h-[70vh] sm:max-h-[80vh] object-contain"
                    />
                    <div className="p-3 sm:p-4 bg-white">
                      <p className="text-base sm:text-lg font-medium text-gray-900">
                        {galleryImages.find(img => img.id === selectedImage)?.alt}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        Category: {galleryImages.find(img => img.id === selectedImage)?.category}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryPreview;