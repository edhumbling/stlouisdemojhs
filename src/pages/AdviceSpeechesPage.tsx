import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Calendar, MapPin, Quote } from 'lucide-react';
import { commencementSpeeches } from '../data/commencementSpeeches';
import SEOHead from '../components/seo/SEOHead';
import ShimmerLoader from '../components/common/ShimmerLoader';

const AdviceSpeechesPage: React.FC = () => {
  const [selectedSpeech, setSelectedSpeech] = useState<any>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSpeechClick = (speech: any) => {
    setSelectedSpeech(speech);
    // Scroll to top when opening speech
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseSpeech = () => {
    setSelectedSpeech(null);
    // Scroll to top when closing speech
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a speech is selected, show the full speech view
  if (selectedSpeech) {
    return (
      <div className="min-h-screen bg-black">
        <SEOHead
          title={`${selectedSpeech.speaker} Speech | St. Louis Demonstration JHS`}
          description={`Read the inspiring commencement speech by ${selectedSpeech.speaker} at ${selectedSpeech.university}. Learn from successful leaders and gain valuable life advice for your educational journey.`}
          keywords={`${selectedSpeech.speaker}, commencement speech, graduation speech, life advice, success advice, inspirational speech, ${selectedSpeech.university}`}
          url="/advice-speeches"
          type="website"
          pageType="students-hub"
          useGalleryImages={true}
        />
        {/* Header with Back Button */}
        <div className="bg-gradient-to-r from-orange-900 via-orange-800 to-orange-900 py-2 sm:py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleCloseSpeech}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-orange-700/50 hover:bg-orange-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-orange-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                {selectedSpeech.speaker}
              </h1>
            </div>
          </div>
        </div>

        {/* Speech Content */}
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
          {/* Speech Header */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-600/30">
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={selectedSpeech.image}
                alt={selectedSpeech.speaker}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0 grayscale blur-sm opacity-60"
              />
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {selectedSpeech.speaker}
                </h2>
                <h3 className="text-lg text-orange-300 mb-3">
                  {selectedSpeech.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{selectedSpeech.university}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{selectedSpeech.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-600/30">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Quote size={18} />
              Key Takeaways
            </h4>
            <ul className="space-y-2">
              {selectedSpeech.keyPoints.map((point: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Speech */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30">
            <h4 className="text-lg font-semibold text-white mb-4">Full Speech</h4>
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {selectedSpeech.fullText}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Advice from Successful People | St. Louis Demonstration JHS"
        description="Learn from inspiring commencement speeches by successful leaders, entrepreneurs, and innovators. Discover valuable life advice and wisdom to guide your educational and career journey."
        keywords="advice from successful people, commencement speeches, graduation speeches, life advice, success stories, inspirational speeches, career guidance"
        url="/advice-speeches"
        type="website"
        pageType="students-hub"
        useGalleryImages={true}
      />
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-orange-900 via-orange-800 to-orange-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-orange-700/50 hover:bg-orange-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-orange-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Advice from Successful People
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {/* Description */}
          <div className="text-center mb-8">
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Learn from the wisdom of successful leaders, entrepreneurs, and innovators through their inspiring commencement speeches.
            </p>
          </div>

          {/* Speeches Grid - Apple Style Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {commencementSpeeches.map((speech, index) => (
              <motion.div
                key={speech.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => handleSpeechClick(speech)}
                  className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 active:scale-95 text-left relative overflow-hidden group"
                >
                  {/* Strong Shimmer Silver Loading Effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-25 transition-opacity duration-300">
                    <ShimmerLoader
                      variant="silver"
                      className="w-full h-full"
                      width="w-full"
                      height="h-full"
                    />
                  </div>
                  {/* Speaker Image */}
                  <div className="w-full h-32 sm:h-40 rounded-xl overflow-hidden mb-4">
                    <img
                      src={speech.image}
                      alt={speech.speaker}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 grayscale blur-sm opacity-60"
                    />
                  </div>

                  {/* Speaker Info */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {speech.speaker}
                  </h3>

                  <h4 className="text-sm sm:text-base font-medium text-orange-300 mb-3 leading-tight">
                    {speech.title}
                  </h4>

                  {/* University and Year */}
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-400 mb-3">
                    <span>{speech.university}</span>
                    <span>•</span>
                    <span>{speech.year}</span>
                  </div>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    "{speech.excerpt}"
                  </p>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Footer Message */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              Tap any card to read the full commencement speech
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdviceSpeechesPage;
