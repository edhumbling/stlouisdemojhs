import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    <div className="fixed inset-0 bg-white">
      {/* Floating Back Button */}
      <button
        onClick={handleBack}
        className="fixed top-4 left-4 z-50 inline-flex items-center gap-2 px-4 py-2 bg-gray-900/80 hover:bg-gray-800/90 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm backdrop-blur-sm border border-gray-700/30"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      {/* Full Screen Calendar */}
      <div className="w-full h-full">
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

        <iframe
          src="https://cal.com/stlouisdemojhs/schedule-visit-to-st.-louis-demonstration-j.h.s"
          width="100%"
          height="100%"
          style={{
            border: "none",
            width: "100%",
            height: "100%"
          }}
          onLoad={() => setIsLoading(false)}
          title="Schedule Your Visit to St. Louis Demonstration JHS"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ScheduleVisitPage;
