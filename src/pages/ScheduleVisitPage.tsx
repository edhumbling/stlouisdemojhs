import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScheduleVisitPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

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

      {/* Cal.com Iframe */}
      <div className="w-full" style={{ height: 'calc(100vh - 120px)' }}>
        <iframe
          src="https://cal.com/stlouisdemojhs/schedule-visit-to-st.-louis-demonstration-j.h.s"
          width="100%"
          height="100%"
          style={{
            border: "none",
            width: "100%",
            height: "100%"
          }}
          title="Schedule Your Visit to St. Louis Demonstration JHS"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ScheduleVisitPage;
