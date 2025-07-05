import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OptimizedGallery from '../components/common/OptimizedGallery';
import SEOHead from '../components/seo/SEOHead';

// Shop items data - Official St. Louis Demo JHS merchandise
const shopItems = [
  {
    id: 1,
    src: 'https://ik.imagekit.io/humbling/65589f7e-20a1-4c35-94e1-1ed8c7b3dafa.webp',
    alt: 'St. Louis Demo JHS Official Merchandise - Item 1',
    category: 'Merchandise'
  },
  {
    id: 2,
    src: 'https://ik.imagekit.io/humbling/f01a340b-25b7-4edf-927c-ffbb3da3dd5b.webp',
    alt: 'St. Louis Demo JHS Official Merchandise - Item 2',
    category: 'Merchandise'
  },
  {
    id: 3,
    src: 'https://ik.imagekit.io/humbling/896d14c7-6189-43a6-8d2f-766bcb4b0676.webp',
    alt: 'St. Louis Demo JHS Official Merchandise - Item 3',
    category: 'Merchandise'
  },
  {
    id: 4,
    src: 'https://ik.imagekit.io/humbling/9d98c4c5-2814-4eb3-be36-1bfcb4661300.webp',
    alt: 'St. Louis Demo JHS Official Merchandise - Item 4',
    category: 'Merchandise'
  },
  {
    id: 5,
    src: 'https://ik.imagekit.io/humbling/7e072dbc-a68e-4200-a765-2f35c1a5b370.webp',
    alt: 'St. Louis Demo JHS Official Merchandise - Item 5',
    category: 'Merchandise'
  },
  {
    id: 6,
    src: 'https://ik.imagekit.io/humbling/fd9c323d-7444-4362-959a-d91a2faef386.webp',
    alt: 'St. Louis Demo JHS Official Merchandise - Item 6',
    category: 'Merchandise'
  },
  {
    id: 7,
    src: 'https://ik.imagekit.io/humbling/3500fe16-8e70-46a2-a53b-78404ab65d1d.jpg',
    alt: 'St. Louis Demo JHS Official Merchandise - Item 7',
    category: 'Merchandise'
  }
];

const ShopGalleryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Alumni Shop Gallery | Official St. Louis Demo JHS Merchandise - Show Your School Pride"
        description="Alumni Shop Gallery - Browse our collection of official St. Louis Demonstration JHS merchandise. T-shirts, hoodies, mugs, and more to show your school pride. Support your alma mater with quality branded items."
        keywords="St. Louis Demo JHS shop, alumni merchandise, school branded items, t-shirts, hoodies, mugs, school pride, alumni shop"
        url="/shop"
        type="website"
        pageType="shop"
        useGalleryImages={false}
      />

      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-indigo-700/50 hover:bg-indigo-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-indigo-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                Alumni Shop Gallery
              </h1>
              <p className="text-indigo-200 text-xs sm:text-sm mt-1">
                Official St. Louis Demo JHS Merchandise
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Shop CTA Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
              🛍️ Show Your School Pride!
            </h2>
            <p className="text-indigo-100 text-sm sm:text-base mb-4 max-w-2xl mx-auto">
              Browse our collection of official merchandise and support your alma mater. 
              Quality branded items with worldwide shipping available.
            </p>
            <a
              href="https://stlouisdemojhs-shop.fourthwall.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-indigo-50"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto px-2 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-6 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Available Merchandise
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Click any item to view in full size • All items available in our online shop
            </p>
          </div>
          
          <OptimizedGallery 
            images={shopItems} 
            className="max-w-6xl mx-auto"
          />
        </motion.div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-8 sm:py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Ready to Shop?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base mb-6">
              Visit our official store to purchase these items and more. 
              Every purchase helps support St. Louis Demonstration JHS.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://stlouisdemojhs-shop.fourthwall.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5" />
                Visit Alumni Shop
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => navigate('/alumni')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg border border-gray-600 transition-all duration-300"
              >
                Back to Alumni Page
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShopGalleryPage;
