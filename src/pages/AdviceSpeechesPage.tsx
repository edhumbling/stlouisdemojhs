import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Calendar, MapPin, Quote, Search } from 'lucide-react';
import { commencementSpeeches } from '../data/commencementSpeeches';
import SEOHead from '../components/seo/SEOHead';

const AdviceSpeechesPage: React.FC = () => {
  const [selectedSpeech, setSelectedSpeech] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter speeches based on search query
  const filteredSpeeches = useMemo(() => {
    if (!searchQuery.trim()) {
      return commencementSpeeches;
    }

    const query = searchQuery.toLowerCase().trim();
    return commencementSpeeches.filter(speech =>
      speech.speaker.toLowerCase().includes(query) ||
      speech.title.toLowerCase().includes(query) ||
      speech.university.toLowerCase().includes(query) ||
      speech.excerpt.toLowerCase().includes(query) ||
      speech.keyPoints.some(point => point.toLowerCase().includes(query)) ||
      speech.year.toString().includes(query)
    );
  }, [searchQuery]);

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
        /
        canonical="https://stlouisdemojhs.com/advice-speeches"
      >
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

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search speeches by speaker, title, university, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-400">
                  Found {filteredSpeeches.length} speech{filteredSpeeches.length !== 1 ? 'es' : ''} matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>

          {/* Speeches Grid - Apple Style Cards */}
          {filteredSpeeches.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredSpeeches.map((speech, index) => (
              <motion.div
                key={speech.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => handleSpeechClick(speech)}
                  className="w-full aspect-square bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 active:scale-95 text-left relative overflow-hidden group flex flex-col justify-center items-center text-center"
                >

                  {/* Speaker Name - Large and Prominent */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                    {speech.speaker}
                  </h3>

                  {/* Speech Title */}
                  <h4 className="text-sm sm:text-base font-medium text-orange-300 mb-3 leading-tight line-clamp-2">
                    {speech.title}
                  </h4>

                  {/* University and Year */}
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-400 mb-3 justify-center">
                    <span>{speech.university}</span>
                    <span>•</span>
                    <span>{speech.year}</span>
                  </div>

                  {/* Excerpt - Smaller and Limited */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2">
                    "{speech.excerpt}"
                  </p>
                </button>
              </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No speeches found</h3>
              <p className="text-gray-400 mb-4">
                No speeches match your search for "{searchQuery}". Try different keywords or clear your search.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Footer Message */}
          {filteredSpeeches.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-400">
                Tap any card to read the full commencement speech
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdviceSpeechesPage;
