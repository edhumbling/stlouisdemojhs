import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, ExternalLink, Loader2 } from 'lucide-react';

// Facebook SDK types
declare global {
  interface Window {
    FB: {
      init: (params: any) => void;
      XFBML: {
        parse: () => void;
      };
    };
  }
}

const FacebookPostsSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fbLoaded, setFbLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Facebook Page URL - St. Louis Demonstration JHS Official Page
  const facebookPageUrl = "https://www.facebook.com/stlouisdemojhs";

  useEffect(() => {
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      if (window.FB) {
        setFbLoaded(true);
        setIsLoading(false);
        return;
      }

      // Create Facebook SDK script
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';

      script.onload = () => {
        if (window.FB) {
          window.FB.init({
            xfbml: true,
            version: 'v18.0'
          });
          setFbLoaded(true);
          setIsLoading(false);
        }
      };

      script.onerror = () => {
        setIsLoading(false);
        setLoadError(true);
      };

      document.head.appendChild(script);
    };

    loadFacebookSDK();

    // Cleanup
    return () => {
      // Remove script if component unmounts
      const existingScript = document.querySelector('script[src*="connect.facebook.net"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Refresh Facebook widgets when loaded
  useEffect(() => {
    if (fbLoaded && window.FB) {
      setTimeout(() => {
        window.FB.XFBML.parse();
      }, 100);
    }
  }, [fbLoaded]);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Facebook size={24} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Latest Updates
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay connected with our school community. Follow our latest news, events, and achievements on Facebook.
          </p>
        </motion.div>

        {/* Facebook Posts Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Loading State */}
          {isLoading && !loadError && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 size={48} className="text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading Facebook posts...</p>
              </div>
            </div>
          )}

          {/* Error State - Fallback */}
          {loadError && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Facebook size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Connect with us on Facebook
                </h3>
                <p className="text-gray-600 mb-6">
                  Stay updated with our latest news, events, and school activities by following our official Facebook page.
                </p>
                <a
                  href={facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  <Facebook size={20} />
                  <span>Visit Our Facebook Page</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          )}

          {/* Facebook Page Plugin Container */}
          {!isLoading && !loadError && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Desktop Layout - 3 Posts Horizontally */}
            <div className="hidden lg:block">
              <div
                className="fb-page"
                data-href={facebookPageUrl}
                data-tabs="timeline"
                data-width="1000"
                data-height="600"
                data-small-header="true"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="false"
                data-show-posts="true"
                data-lazy="true"
              >
                <blockquote cite={facebookPageUrl} className="fb-xfbml-parse-ignore">
                  <a href={facebookPageUrl} className="text-blue-600 hover:text-blue-800 transition-colors">
                    Visit our Facebook page
                  </a>
                </blockquote>
              </div>
            </div>

            {/* Mobile/Tablet Layout - Vertical Stack */}
            <div className="block lg:hidden">
              <div
                className="fb-page"
                data-href={facebookPageUrl}
                data-tabs="timeline"
                data-width="400"
                data-height="600"
                data-small-header="true"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="false"
                data-show-posts="true"
                data-lazy="true"
              >
                <blockquote cite={facebookPageUrl} className="fb-xfbml-parse-ignore">
                  <a href={facebookPageUrl} className="text-blue-600 hover:text-blue-800 transition-colors">
                    Visit our Facebook page
                  </a>
                </blockquote>
              </div>
            </div>
          </div>
          )}

          {/* Visit Facebook Page Button */}
          {!loadError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              <Facebook size={20} />
              <span>Visit Our Facebook Page</span>
              <ExternalLink size={16} />
            </a>
          </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FacebookPostsSection;
