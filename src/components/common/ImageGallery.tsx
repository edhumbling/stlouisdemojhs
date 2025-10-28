import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, ImageIcon } from 'lucide-react';

interface ImageKitFile {
  fileId: string;
  name: string;
  url: string;
  thumbnail: string;
  fileType: string;
  filePath: string;
  tags: string[];
  AITags: any[];
  versionInfo: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ImageGalleryProps {
  title: string;
  folder: string;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  title, 
  folder, 
  className = "" 
}) => {
  const [images, setImages] = useState<ImageKitFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        setError(null);

        // Use ImageKit's public API with authentication
        const response = await axios.get('https://api.imagekit.io/v1/files', {
          auth: {
            username: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
            password: '', // ImageKit public API doesn't require password
          },
          params: {
            path: folder, // e.g., "stlouisdemojhs/academic-life/"
            sort: 'DESC_CREATED',
            limit: 50,
          },
        });

        setImages(response.data || []);
      } catch (err: any) {
        console.error('Error fetching images:', err);
        setError(err.response?.data?.message || 'Failed to load images');
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [folder]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <section className={`p-8 bg-gray-50 ${className}`}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {title}
        </h2>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading images...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`p-8 bg-gray-50 ${className}`}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {title}
        </h2>
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-red-600 mb-2">Error loading images</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className={`p-8 bg-gray-50 ${className}`}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {title}
        </h2>
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            No images uploaded yet in {title}.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Upload photos to the "{folder}" folder in ImageKit to see them here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id={folder.replace(/\//g, "-")}
      className={`p-8 bg-gray-50 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="text-2xl font-bold text-center mb-6 text-gray-800"
        variants={itemVariants}
      >
        {title}
      </motion.h2>

      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        variants={containerVariants}
      >
        {images.map((file) => (
          <motion.div
            key={file.fileId}
            className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={`${file.url}?tr=w-400,h-400,fo-auto,q-80`}
                alt={file.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-image.png'; // Fallback image
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>
            
            {/* Image info overlay */}
            <div className="p-2 bg-white">
              <p className="text-xs text-gray-600 truncate" title={file.name}>
                {file.name}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(file.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {images.length >= 50 && (
        <motion.div 
          className="text-center mt-6"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-sm">
            Showing latest 50 images. Upload more to see additional photos.
          </p>
        </motion.div>
      )}
    </motion.section>
  );
};

export default ImageGallery;
