import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, Sparkles } from 'lucide-react';

const NewsEventsSection: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Magical Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-24 h-24 bg-purple-100/40 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-yellow-100/25 rounded-full blur-lg animate-pulse delay-500"></div>
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
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-4 sm:mb-6"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Stay Connected with <span className="text-purple-600">News</span> & <span className="text-blue-600">Events</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto"
          >
            Discover the latest happenings, achievements, and upcoming events at St. Louis Educational Institute
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
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-purple-700">Latest News & Updates</h3>
            </div>

            {/* Blog Preview Container */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-purple-100 group-hover:border-purple-200">
              {/* Preview Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-3 sm:p-4 text-white">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm sm:text-base">St. Louis Educational Institute Blog</h4>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Blog Preview Iframe */}
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                <iframe
                  src="https://stlouisdemojhs.blogspot.com"
                  title="St. Louis Educational Institute Blog Preview"
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

              {/* Action Button */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-purple-100/50">
                <Link
                  to="/news"
                  className="group/btn w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
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
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700">School Events Calendar</h3>
            </div>

            {/* Calendar Container */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-blue-100 group-hover:border-blue-200">
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 sm:p-4 text-white">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm sm:text-base">Upcoming School Events</h4>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="text-xs sm:text-sm opacity-90">Live Calendar</span>
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
                  title="St. Louis Educational Institute Events Calendar"
                />

                {/* Mobile Overlay for Better UX */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Calendar Footer */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-blue-100/50">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-xs sm:text-sm text-blue-700 font-medium">
                      📅 Stay updated with all school events and important dates
                    </p>
                  </div>
                  <a
                    href="https://calendar.google.com/calendar/embed?src=f774a22b7db5c45f12b13c391cddbf261522e8afa5061bdf9696b2d599d9d7f7%40group.calendar.google.com&ctz=Africa%2FAbidjan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm"
                  >
                    <Calendar size={14} />
                    View Full Calendar
                    <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </a>
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