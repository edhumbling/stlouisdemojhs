import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cal, { getCalApi } from "@calcom/embed-react";

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
        <Cal
          namespace="schedule-visit-to-st.-louis-demonstration-j.h.s"
          calLink="stlouisdemojhs/schedule-visit-to-st.-louis-demonstration-j.h.s"
          style={{
            width: "100%",
            height: "100%",
            border: "none"
          }}
          config={{
            "layout": "month_view"
          }}
        />
      </div>
    </div>
  );
};

export default ScheduleVisitPage;
