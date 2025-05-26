import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScheduleVisitPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // No useEffect needed - we're embedding directly with iframe

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Back Button and Title Section - Original Style */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl sm:text-3xl"
              >
                📅
              </motion.div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                Schedule Your Campus Visit
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Full Window Calendar Section - Apple Style */}
      <div className="h-[calc(100vh-80px)] w-full bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Apple-style Header */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-4 sm:px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  🌟 Book Your Visit to St. Louis Demo
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Choose a convenient time to explore our campus and meet our amazing team!
                </p>
              </div>

              {/* Cute Info Pills */}
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  <MapPin size={12} />
                  Campus Tour
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  <Users size={12} />
                  Meet Teachers
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  <Clock size={12} />
                  1-2 Hours
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Calendar Container */}
        <div className="h-[calc(100%-120px)] w-full">
          <iframe
            src="https://cal.com/stlouisdemojhs/schedule-visit-to-st.-louis-demonstration-j.h.s?overlayCalendar=true"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{
              border: 'none',
              borderRadius: '0',
              minHeight: '600px'
            }}
            title="Schedule Your Visit - St. Louis Demonstration JHS"
            allow="camera; microphone; geolocation; display-capture"
          />
        </div>

        {/* Apple-style Footer */}
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50 px-4 sm:px-6 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Unavailable</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-600">Need help?</span>
                <div className="flex items-center gap-2 text-blue-600">
                  <span>📱 0244758575</span>
                  <span>•</span>
                  <span>✉️ support@stlouisdemojhs.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Cal: any;
  }
}

export default ScheduleVisitPage;
