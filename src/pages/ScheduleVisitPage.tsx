import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Cal } from "@calcom/atoms";

const ScheduleVisitPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  useEffect(() => {
    // Simple loading state management
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Native Back Button Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4 mt-16">
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

      {/* Full Screen Calendar */}
      <div className="w-full" style={{ height: 'calc(100vh - 120px)' }}>
        {isLoading && (
          <div className="absolute inset-0 bg-white flex items-center justify-center z-40">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600">Loading calendar...</p>
            </div>
          </div>
        )}

        <Cal
          calLink="stlouisdemojhs/schedule-visit-to-st.-louis-demonstration-j.h.s"
          style={{
            width: "100%",
            height: "100%"
          }}
          config={{
            layout: "month_view"
          }}
        />
      </div>
    </div>
  );
};

export default ScheduleVisitPage;
