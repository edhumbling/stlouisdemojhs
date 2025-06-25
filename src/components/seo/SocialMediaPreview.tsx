import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, MessageCircle, ExternalLink, Copy, Check } from 'lucide-react';
import { galleryImages } from '../../data';

interface SocialMediaPreviewProps {
  title?: string;
  description?: string;
  url?: string;
  pageType?: 'home' | 'students-hub' | 'stem' | 'gallery' | 'news' | 'ai-search' | 'contact' | 'about' | 'admissions' | 'faculty' | 'alumni' | 'pta' | 'calendar' | 'apply-now' | 'scholarship-opportunities' | 'shs-database' | 'mayamiles-ai' | 'donate';
}

const SocialMediaPreview: React.FC<SocialMediaPreviewProps> = ({
  title = "St. Louis Demonstration Junior High School - Excellence in Education | Ghana",
  description = "St. Louis Demonstration JHS is a premier educational institution in Ghana, offering quality junior high school education with modern facilities, experienced teachers, and comprehensive academic programs.",
  url = "https://stlouisdemojhs.com",
  pageType = 'home'
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Get optimized images for different networks (same logic as SEOHead)
  const getOptimalSocialImage = (network: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp'): string => {
    const defaultImage = "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs";

    const imageSelections: Record<string, Record<string, string>> = {
      home: {
        facebook: galleryImages.find(img => img.category === 'Original Hero Collection')?.src || defaultImage,
        twitter: galleryImages.find(img => img.category === 'Campus Life')?.src || defaultImage,
        linkedin: galleryImages.find(img => img.category === 'Academic Life')?.src || defaultImage,
        whatsapp: galleryImages.find(img => img.category === 'Original Hero Collection')?.src || defaultImage,
      },
      'students-hub': {
        facebook: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('group'))?.src || defaultImage,
        twitter: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('learning'))?.src || defaultImage,
        linkedin: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('classroom'))?.src || defaultImage,
        whatsapp: galleryImages.find(img => img.category === 'Academic Life')?.src || defaultImage,
      },
      stem: {
        facebook: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('practical'))?.src || defaultImage,
        twitter: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('hands-on'))?.src || defaultImage,
        linkedin: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('creative'))?.src || defaultImage,
        whatsapp: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('activities'))?.src || defaultImage,
      },
      gallery: {
        facebook: galleryImages[0]?.src || defaultImage,
        twitter: galleryImages[1]?.src || defaultImage,
        linkedin: galleryImages[2]?.src || defaultImage,
        whatsapp: galleryImages[3]?.src || defaultImage,
      },
      news: {
        facebook: galleryImages.find(img => img.category === 'School Events')?.src || defaultImage,
        twitter: galleryImages.find(img => img.category === 'School Events' && img.alt.includes('activities'))?.src || defaultImage,
        linkedin: galleryImages.find(img => img.category === 'School Events' && img.alt.includes('engagement'))?.src || defaultImage,
        whatsapp: galleryImages.find(img => img.category === 'School Events')?.src || defaultImage,
      },
      'ai-search': {
        facebook: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('discussions'))?.src || defaultImage,
        twitter: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('presentations'))?.src || defaultImage,
        linkedin: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('collaborative'))?.src || defaultImage,
        whatsapp: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('interactive'))?.src || defaultImage,
      },
      contact: {
        facebook: galleryImages.find(img => img.category === 'Campus Life')?.src || defaultImage,
        twitter: galleryImages.find(img => img.category === 'Campus Life' && img.alt.includes('facilities'))?.src || defaultImage,
        linkedin: galleryImages.find(img => img.category === 'Campus Life' && img.alt.includes('environment'))?.src || defaultImage,
        whatsapp: galleryImages.find(img => img.category === 'Campus Life')?.src || defaultImage,
      },
      about: {
        facebook: galleryImages.find(img => img.category === 'Original Hero Collection')?.src || defaultImage,
        twitter: galleryImages.find(img => img.category === 'Campus Life' && img.alt.includes('community'))?.src || defaultImage,
        linkedin: galleryImages.find(img => img.category === 'Academic Life' && img.alt.includes('environment'))?.src || defaultImage,
        whatsapp: galleryImages.find(img => img.category === 'Campus Life' && img.alt.includes('student'))?.src || defaultImage,
      }
    };

    return imageSelections[pageType]?.[network] || defaultImage;
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const previews = [
    {
      network: 'Facebook',
      icon: Facebook,
      color: '#1877F2',
      bgColor: 'bg-[#1877F2]',
      image: getOptimalSocialImage('facebook'),
      titleLimit: 100,
      descLimit: 300,
      format: 'large'
    },
    {
      network: 'Twitter',
      icon: Twitter,
      color: '#1DA1F2',
      bgColor: 'bg-[#1DA1F2]',
      image: getOptimalSocialImage('twitter'),
      titleLimit: 70,
      descLimit: 200,
      format: 'large'
    },
    {
      network: 'LinkedIn',
      icon: Linkedin,
      color: '#0A66C2',
      bgColor: 'bg-[#0A66C2]',
      image: getOptimalSocialImage('linkedin'),
      titleLimit: 150,
      descLimit: 300,
      format: 'large'
    },
    {
      network: 'WhatsApp',
      icon: MessageCircle,
      color: '#25D366',
      bgColor: 'bg-[#25D366]',
      image: getOptimalSocialImage('whatsapp'),
      titleLimit: 65,
      descLimit: 160,
      format: 'compact'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔗 Social Media Link Previews
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            See how your website links will appear across different social media platforms
          </p>

          {/* URL Display with Copy */}
          <div className="flex items-center justify-center gap-3 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
            <span className="text-blue-400 font-mono text-sm md:text-base">{url}</span>
            <button
              onClick={copyUrl}
              className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
            >
              {copiedUrl ? <Check size={16} /> : <Copy size={16} />}
              {copiedUrl ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {previews.map((preview, index) => (
            <motion.div
              key={preview.network}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            >
              {/* Network Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${preview.bgColor}`}>
                  <preview.icon size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{preview.network}</h3>
              </div>

              {/* Preview Card */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                {/* Image */}
                <div className="relative aspect-[1.91/1] bg-gray-200">
                  <img
                    src={preview.image}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                    {url.replace('https://', '').replace('http://', '')}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 leading-tight">
                    {truncateText(title, preview.titleLimit)}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {truncateText(description, preview.descLimit)}
                  </p>
                </div>
              </div>

              {/* Network-specific info */}
              <div className="mt-3 text-xs text-gray-400">
                <span>Image: {preview.image.includes('galleryImages') ? 'From Gallery' : 'Custom'}</span>
                <span className="mx-2">•</span>
                <span>Format: {preview.format}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">
              🎯 Dynamic Image Selection Active
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Each social network gets optimized images from your gallery based on the page type.
              Facebook gets hero images, Twitter gets campus life photos, LinkedIn gets academic shots,
              and WhatsApp gets engaging student photos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPreview;
