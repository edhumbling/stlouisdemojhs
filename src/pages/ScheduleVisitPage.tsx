import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cal, { getCalApi } from "@calcom/embed-react";

const ScheduleVisitPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"schedule-visit-to-st.-louis-demonstration-j.h.s"});
      cal("ui", {
        "cssVarsPerTheme": {
          "light": {"cal-brand": "#2b8709"},
          "dark": {"cal-brand": "#eae700"}
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

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
        {/* Minimal Dark Header */}
        <div className="bg-slate-900/80 backdrop-blur-xl border-b border-gray-700/30 px-4 sm:px-6 py-2">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                  Book Your Visit to St. Louis Demo
                </h2>
                <p className="text-xs sm:text-sm text-gray-300">
                  Choose a convenient time to explore our campus and meet our amazing team!
                </p>
              </div>

              {/* Cute Info Pills - Dark Theme */}
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-400/30">
                  <MapPin size={10} />
                  Campus Tour
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium border border-green-400/30">
                  <Users size={10} />
                  Meet Teachers
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-400/30">
                  <Clock size={10} />
                  1-2 Hours
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Calendar Container - Cal.com React Component */}
        <div className="h-[calc(100%-60px)] w-full">
          <Cal
            namespace="schedule-visit-to-st.-louis-demonstration-j.h.s"
            calLink="stlouisdemojhs/schedule-visit-to-st.-louis-demonstration-j.h.s"
            style={{
              width: "100%",
              height: "100%",
              overflow: "scroll",
              border: "none",
              borderRadius: "0"
            }}
            config={{
              "layout": "month_view"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisitPage;
