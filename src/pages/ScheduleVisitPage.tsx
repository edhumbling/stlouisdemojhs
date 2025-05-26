import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScheduleVisitPage: React.FC = () => {
  useEffect(() => {
    // Load Cal.com script
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize Cal.com after script loads
      if (window.Cal) {
        window.Cal("init", "schedule-visit-to-st.-louis-demonstration-j.h.s", {
          origin: "https://cal.com"
        });

        window.Cal.ns["schedule-visit-to-st.-louis-demonstration-j.h.s"]("inline", {
          elementOrSelector: "#my-cal-inline",
          config: { "layout": "month_view" },
          calLink: "stlouisdemojhs/schedule-visit-to-st.-louis-demonstration-j.h.s",
        });

        window.Cal.ns["schedule-visit-to-st.-louis-demonstration-j.h.s"]("ui", {
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
      }
    };

    return () => {
      // Cleanup script on unmount
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block text-6xl mb-4"
              >
                📅
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Schedule Your Visit
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Experience our campus, meet our teachers, and see why St. Louis Demo is the perfect choice for your child!
              </p>
            </div>

            {/* Visit Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <MapPin className="text-blue-400 mb-4 mx-auto" size={40} />
                <h3 className="text-white font-semibold mb-2">Campus Tour</h3>
                <p className="text-gray-300 text-sm">Explore our facilities</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <Users className="text-green-400 mb-4 mx-auto" size={40} />
                <h3 className="text-white font-semibold mb-2">Meet Teachers</h3>
                <p className="text-gray-300 text-sm">Connect with our staff</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <Clock className="text-yellow-400 mb-4 mx-auto" size={40} />
                <h3 className="text-white font-semibold mb-2">Flexible Times</h3>
                <p className="text-gray-300 text-sm">Choose your schedule</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <Calendar className="text-purple-400 mb-4 mx-auto" size={40} />
                <h3 className="text-white font-semibold mb-2">Easy Booking</h3>
                <p className="text-gray-300 text-sm">Simple scheduling</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  🌟 Book Your Visit 🌟
                </h2>
                <p className="text-gray-300 text-lg">
                  Select a convenient time for your campus visit. We can't wait to meet you!
                </p>
              </div>

              {/* Cal.com Embed Container */}
              <div className="bg-white rounded-xl overflow-hidden shadow-2xl min-h-[600px]">
                <div 
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'scroll',
                    minHeight: '600px'
                  }} 
                  id="my-cal-inline"
                >
                  {/* Loading placeholder */}
                  <div className="flex items-center justify-center h-96 text-gray-500">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p>Loading calendar...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-500/20 rounded-lg p-6 border border-blue-400/30">
                  <h4 className="text-blue-300 font-semibold mb-3">📋 What to Expect</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Comprehensive campus tour</li>
                    <li>• Meet with admissions team</li>
                    <li>• Q&A session with teachers</li>
                    <li>• Information about programs</li>
                  </ul>
                </div>

                <div className="bg-green-500/20 rounded-lg p-6 border border-green-400/30">
                  <h4 className="text-green-300 font-semibold mb-3">⏰ Visit Duration</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Standard visit: 1-2 hours</li>
                    <li>• Available weekdays & weekends</li>
                    <li>• Morning and afternoon slots</li>
                    <li>• Group or individual tours</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Need Help Scheduling? 📞
            </h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto border border-white/10">
              <h4 className="text-white font-semibold mb-4">Contact Our Admissions Team</h4>
              <div className="space-y-2 text-gray-300">
                <p>📱 0244758575</p>
                <p>📱 0244730726</p>
                <p>✉️ support@stlouisdemojhs.com</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link
                to="/apply-now"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
                style={{
                  boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)',
                }}
              >
                🎓 Ready to Apply?
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
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
