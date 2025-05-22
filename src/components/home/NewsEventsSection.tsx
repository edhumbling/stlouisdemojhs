import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { newsItems, upcomingEvents } from '../../data';

const NewsEventsSection: React.FC = () => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-primary-800 mb-16"
        >
          News & Upcoming Events
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* News Section */}
          <div>
            <h3 className="text-2xl font-semibold text-primary-700 mb-6">Latest News</h3>
            <div className="space-y-8">
              {newsItems.slice(0, 3).map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {news.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <Clock size={16} className="mr-1" />
                      {formatDate(news.date)}
                    </p>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{news.title}</h4>
                    <p className="text-gray-700 mb-4">{news.summary}</p>
                    <Link
                      to={`/news/${news.id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
                    >
                      Read More
                      <ChevronRight size={18} className="ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/news"
                className="inline-flex items-center justify-center px-5 py-2 bg-yellow-500 text-black font-medium rounded-full shadow-lg hover:bg-yellow-400 transition-colors duration-300"
              >
                View All News
              </Link>
            </div>
          </div>

          {/* Events Section */}
          <div>
            <h3 className="text-2xl font-semibold text-primary-700 mb-6">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.slice(0, 4).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex"
                >
                  {event.image && (
                    <div className="w-1/3 h-32">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 w-2/3">
                    <p className="text-sm text-accent-600 mb-1 flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {event.date}
                    </p>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h4>
                    <Link
                      to={`/events/${event.id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-800 text-sm font-medium"
                    >
                      Details
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/events"
                className="inline-flex items-center justify-center px-5 py-2 bg-green-600 text-white font-medium rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300"
              >
                View All Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEventsSection;