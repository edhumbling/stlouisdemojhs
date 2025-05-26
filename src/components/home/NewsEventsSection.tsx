import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, Sparkles } from 'lucide-react';

const NewsEventsSection: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-green-900 relative overflow-hidden">
      {/* Enhanced Blue-Green Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900/50 to-green-900/30"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-16 w-40 h-40 bg-green-500/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-cyan-500/15 rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="max-w-6xl mx-auto text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
            style={{
              fontFamily: 'Arial, sans-serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)'
            }}
          >
            Stay Connected with <span className="text-purple-400">News</span> & <span className="text-blue-400">Events</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
          >
            Discover the latest happenings, achievements, and upcoming events at St. Louis Demonstration J.H.S
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* News & Updates Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-purple-500/20 backdrop-blur-sm rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300 border border-purple-400/30">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-purple-300" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>Latest News & Updates</h3>
            </div>

            {/* Blog Preview Container - Apple Style */}
            <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-700/50 group-hover:border-gray-600/70">
              {/* Preview Header - Apple Style */}
              <div className="bg-gray-800/90 backdrop-blur-sm p-3 sm:p-4 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm sm:text-base text-white">St. Louis Demonstration J.H.S Blog</h4>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Blog Preview Iframe */}
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                <iframe
                  src="https://stlouisdemojhs.blogspot.com"
                  title="St. Louis Demonstration J.H.S Blog Preview"
                  className="w-full h-full border-0 transform scale-75 origin-top-left"
                  style={{
                    width: '133.33%',
                    height: '133.33%',
                    pointerEvents: 'none'
                  }}
                  loading="lazy"
                />

                {/* Overlay for Click-through */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Click to View Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 backdrop-blur-[1px]">
                  <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-purple-200">
                    <span className="text-purple-700 font-semibold text-sm flex items-center gap-2">
                      <ExternalLink size={16} />
                      Click to Read Full Blog
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button - Apple Style */}
              <div className="p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border-t border-gray-700/50">
                <Link
                  to="/news"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="group/btn w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
                >
                  <Sparkles size={16} className="group-hover/btn:animate-spin" />
                  Explore All News & Updates
                  <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Events Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg group-hover:bg-blue-500/30 transition-colors duration-300 border border-blue-400/30">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-300" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>School Events Calendar</h3>
            </div>

            {/* Calendar Container - Apple Style */}
            <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-700/50 group-hover:border-gray-600/70">
              {/* Calendar Header - Apple Style */}
              <div className="bg-gray-800/90 backdrop-blur-sm p-3 sm:p-4 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm sm:text-base text-white">Upcoming School Events</h4>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-400" />
                    <span className="text-xs sm:text-sm text-gray-300">Live Calendar</span>
                  </div>
                </div>
              </div>

              {/* Google Calendar Embed */}
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=f774a22b7db5c45f12b13c391cddbf261522e8afa5061bdf9696b2d599d9d7f7%40group.calendar.google.com&ctz=Africa%2FAbidjan"
                  className="w-full h-full border-0"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  frameBorder="0"
                  scrolling="no"
                  loading="lazy"
                  title="St. Louis Demonstration J.H.S Events Calendar"
                />

                {/* Mobile Overlay for Better UX */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Calendar Footer - Apple Style */}
              <div className="p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border-t border-gray-700/50">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-xs sm:text-sm text-gray-300 font-medium">
                      📅 Stay updated with all school events and important dates
                    </p>
                  </div>
                  <Link
                    to="/calendar"
                    className="group/btn inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm backdrop-blur-sm"
                  >
                    <Calendar size={14} />
                    View Full Calendar
                    <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsEventsSection;