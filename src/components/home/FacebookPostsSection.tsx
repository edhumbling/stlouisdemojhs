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
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-500"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-300 rounded-full opacity-60 animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-300 rounded-full opacity-40 animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-cyan-300 rounded-full opacity-50 animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-pink-300 rounded-full opacity-30 animate-bounce delay-1500"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-noise-pattern opacity-10"></div>
      </div>

      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent backdrop-blur-[0.5px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 ring-4 ring-white/10">
              <Facebook size={28} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Latest Updates
            </h2>
          </div>
          <p className="text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            Stay connected with our school community. Follow our latest news, events, and achievements on Facebook.
          </p>

          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-8 h-0.5 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-cyan-400 rounded-full"></div>
          </div>
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
              <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="relative">
                  <Loader2 size={48} className="text-blue-300 animate-spin mx-auto mb-4" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-ping"></div>
                </div>
                <p className="text-blue-100 font-medium">Loading Facebook posts...</p>
                <div className="flex items-center justify-center gap-1 mt-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          {/* Error State - Fallback */}
          {loadError && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20 p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25 ring-4 ring-white/10">
                  <Facebook size={36} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-3">
                  Connect with us on Facebook
                </h3>
                <p className="text-blue-100/80 mb-8 leading-relaxed max-w-md mx-auto">
                  Stay updated with our latest news, events, and school activities by following our official Facebook page.
                </p>
                <a
                  href={facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 ring-2 ring-white/20"
                >
                  <Facebook size={22} />
                  <span>Visit Our Facebook Page</span>
                  <ExternalLink size={18} />
                </a>

                {/* Decorative elements */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-6 h-0.5 bg-blue-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
                  <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-cyan-400 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* Facebook Page Plugin Container */}
          {!isLoading && !loadError && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30 ring-1 ring-white/20">
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
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 ring-2 ring-white/20 backdrop-blur-sm"
            >
              <Facebook size={22} />
              <span>Visit Our Facebook Page</span>
              <ExternalLink size={18} />
            </a>
          </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FacebookPostsSection;
