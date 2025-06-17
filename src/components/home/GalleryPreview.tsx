import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { galleryImages } from '../../data';
import { X } from 'lucide-react';
import ShimmerLoader from '../common/ShimmerLoader';

const GalleryPreview: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const previewImages = galleryImages.slice(0, 6);

  const handleImageLoad = (imageId: number) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  };

  const openModal = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-black">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-6"
              style={{ fontFamily: 'Arial, sans-serif' }}>
            School Life at St. Louis
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 px-2 leading-relaxed">
            Experience the vibrant academic environment where students thrive through interactive learning,
            collaborative projects, and engaging classroom activities.
          </p>
        </motion.div>

        {/* Mobile-Optimized Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {previewImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative overflow-hidden rounded-xl shadow-lg aspect-square cursor-pointer group bg-gray-900"
              onClick={() => openModal(image.id)}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Enhanced Silver Shimmer Loading Effect */}
              {!loadedImages.has(image.id) && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-20"
                >
                  <ShimmerLoader
                    variant="silver"
                    className="absolute inset-0 rounded-xl"
                    width="w-full"
                    height="h-full"
                  />

                  {/* Additional Silver Glow Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 via-gray-300/30 to-slate-500/20 rounded-xl"></div>

                  {/* Pulsing Silver Border */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-slate-300/40"
                    animate={{
                      borderColor: ['rgba(203, 213, 225, 0.4)', 'rgba(148, 163, 184, 0.6)', 'rgba(203, 213, 225, 0.4)'],
                      boxShadow: [
                        '0 0 10px rgba(203, 213, 225, 0.3)',
                        '0 0 20px rgba(148, 163, 184, 0.5)',
                        '0 0 10px rgba(203, 213, 225, 0.3)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />

                  {/* Silver Sparkle Effects */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-white/60 rounded-full"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5
                    }}
                  />
                  <motion.div
                    className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-slate-200/50 rounded-full"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1
                    }}
                  />
                </motion.div>
              )}

              {/* Image with Smooth Reveal Animation */}
              <motion.img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 relative z-10"
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: loadedImages.has(image.id) ? 1 : 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onLoad={() => handleImageLoad(image.id)}
              />

              {/* Subtle Hover Overlay for Loaded Images */}
              {loadedImages.has(image.id) && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              )}

            </motion.div>
          ))}
        </div>

        {/* Simple CTA Button */}
        <div className="text-center mt-6 sm:mt-8 md:mt-10">
          <Link
            to="/gallery"
            onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-2xl transition-all duration-300 text-sm sm:text-base hover:scale-105"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
          >
            View Full Gallery
          </Link>
        </div>

        {/* Beautiful Dark Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-5xl w-full">
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2 bg-gray-800/50 rounded-full backdrop-blur-sm"
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
                className="bg-gray-900/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                {galleryImages.find(img => img.id === selectedImage) && (
                  <>
                    <img
                      src={galleryImages.find(img => img.id === selectedImage)?.src}
                      alt={galleryImages.find(img => img.id === selectedImage)?.alt}
                      className="w-full max-h-[70vh] sm:max-h-[80vh] object-contain"
                    />
                    <div className="p-4 sm:p-6 bg-gray-900/95">
                      <p className="text-base sm:text-lg font-semibold text-white mb-2">
                        {galleryImages.find(img => img.id === selectedImage)?.alt}
                      </p>
                      <p className="text-sm text-gray-400">
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