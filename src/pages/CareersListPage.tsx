import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

// Career data structure
interface Career {
  name: string;
  description: string;
  category?: string;
}

// Careers data - Starting with A and B
const careersData: Record<string, Career[]> = {
  A: [
    { name: 'Accountant', description: 'Manage financial records, prepare tax documents, and ensure compliance with financial regulations. Accountants analyze financial data to help businesses make informed decisions about investments, budgeting, and financial planning.' },
    { name: 'Actor', description: 'Perform in theater, film, television, or other entertainment mediums. Actors interpret scripts and bring characters to life through voice, movement, and emotion, often working with directors and other performers.' },
    { name: 'Aerospace Engineer', description: 'Design, develop, and test aircraft, spacecraft, and missiles. They work on propulsion systems, aerodynamics, and flight mechanics for aviation and space exploration, ensuring safety and efficiency.' },
    { name: 'Architect', description: 'Design buildings and structures, creating blueprints and overseeing construction projects. Architects balance functionality, safety, and aesthetic appeal while considering environmental impact and building codes.' },
    { name: 'Artist', description: 'Create visual art through various mediums including painting, sculpture, digital art, and mixed media. Artists express ideas and emotions through creative visual works, often exhibiting in galleries or working on commissions.' },
    { name: 'Astronaut', description: 'Travel to space to conduct scientific research, maintain spacecraft, and explore beyond Earth. Astronauts undergo extensive training in science, engineering, and physical fitness to handle the challenges of space travel.' },
    { name: 'Attorney', description: 'Provide legal advice, represent clients in court, and draft legal documents. Attorneys specialize in various areas of law including criminal, civil, corporate, and family law, advocating for their clients\' rights.' },
    { name: 'Audiologist', description: 'Diagnose and treat hearing and balance disorders. Audiologists work with patients of all ages to improve their hearing and communication abilities through hearing aids, therapy, and other treatments.' },
    { name: 'Author', description: 'Write books, articles, and other written content for publication. Authors research topics, develop narratives, and communicate ideas through the written word across various genres and formats.' },
    { name: 'Automotive Technician', description: 'Repair and maintain vehicles, diagnosing mechanical problems and performing routine maintenance. They work with engines, electrical systems, and computerized components in modern automobiles.' },
    { name: 'Animator', description: 'Create moving images and visual effects for films, television, video games, and digital media. Animators bring characters and stories to life using traditional hand-drawn techniques or computer animation software.' },
    { name: 'Anthropologist', description: 'Study human societies, cultures, and their development over time. Anthropologists conduct fieldwork, analyze cultural practices, and contribute to our understanding of human behavior and social structures.' }
  ],
  B: [
    { name: 'Baker', description: 'Prepare and bake bread, pastries, cakes, and other baked goods. Bakers work in commercial bakeries, restaurants, or run their own bakery businesses, combining culinary skills with business management.' },
    { name: 'Banker', description: 'Provide financial services to individuals and businesses, including loans, investments, and account management. Bankers help clients with financial planning and ensure compliance with banking regulations.' },
    { name: 'Biologist', description: 'Study living organisms and their interactions with the environment. Biologists conduct research, perform experiments, and contribute to scientific knowledge in areas like ecology, genetics, and molecular biology.' },
    { name: 'Broadcaster', description: 'Present news, entertainment, or educational content on television, radio, or digital platforms. Broadcasters research topics, conduct interviews, and communicate information to diverse audiences.' },
    { name: 'Builder', description: 'Construct residential and commercial buildings, working with various materials and following architectural plans. Builders coordinate with other trades and ensure projects meet safety and quality standards.' },
    { name: 'Business Analyst', description: 'Analyze business processes and systems to identify improvements and solutions. Business analysts work with stakeholders to understand requirements and recommend strategies for organizational efficiency.' },
    { name: 'Butcher', description: 'Prepare and cut meat products for retail sale or restaurant use. Butchers understand different cuts of meat, food safety regulations, and customer preferences while maintaining quality standards.' },
    { name: 'Bartender', description: 'Mix and serve alcoholic and non-alcoholic beverages in bars, restaurants, and events. Bartenders interact with customers, manage inventory, and create cocktails while ensuring responsible service.' },
    { name: 'Beautician', description: 'Provide beauty services including hair styling, makeup application, and skincare treatments. Beauticians work in salons, spas, or as freelancers, helping clients enhance their appearance and confidence.' },
    { name: 'Biochemist', description: 'Study the chemical processes within living organisms. Biochemists conduct research to understand biological functions and develop applications in medicine, agriculture, and biotechnology.' }
  ]
  // More letters will be added progressively
};

const CareersListPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Hide footer on this page
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }

    return () => {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const availableLetters = Object.keys(careersData);

  // Smart search filtering
  const filteredCareers = useMemo(() => {
    if (!searchQuery.trim()) {
      return careersData[selectedLetter] || [];
    }

    const query = searchQuery.toLowerCase();
    const allCareers = Object.values(careersData).flat();
    return allCareers.filter(career =>
      career.name.toLowerCase().includes(query) ||
      career.description.toLowerCase().includes(query)
    );
  }, [searchQuery, selectedLetter]);

  const handleLetterClick = (letter: string) => {
    if (availableLetters.includes(letter)) {
      setSelectedLetter(letter);
      setSelectedCareer(null);
      setSearchQuery(''); // Clear search when selecting letter
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCareerClick = (career: Career) => {
    setSelectedCareer(career);
  };

  const closeCareerModal = () => {
    setSelectedCareer(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Career Exploration Guide | 1000+ Career Options A-Z - St. Louis Demo JHS"
        description="Explore over 1000 career options from A-Z. Comprehensive career guide for students to discover their future profession with detailed descriptions and requirements."
        keywords="careers, career guide, job options, career exploration, student careers, career planning, job descriptions"
        url="/careers-list"
        type="website"
        pageType="educational"
      />

      {/* Back Button Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 py-3 sm:py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                Career Exploration Guide
              </h1>
              <p className="text-blue-200 text-xs sm:text-sm mt-1">
                Discover 1000+ Career Options A-Z
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Search Bar */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-4 sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search careers..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* A-Z Navigation */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-4 sm:py-6 sticky top-28 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={!availableLetters.includes(letter)}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-bold text-sm sm:text-base transition-all duration-300
                  ${availableLetters.includes(letter)
                    ? selectedLetter === letter && !searchQuery
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-gray-700 hover:bg-gray-600 text-white hover:shadow-lg'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Careers List - Raw Document Style */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <motion.div
          key={searchQuery ? 'search' : selectedLetter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
            {searchQuery ? `Search Results for "${searchQuery}"` : `Careers Starting with "${selectedLetter}"`}
          </h2>

          {filteredCareers.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              {/* Raw document style layout - 2 columns on mobile, more on larger screens */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3 text-left">
                {filteredCareers.map((career, index) => (
                  <motion.button
                    key={career.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    onClick={() => handleCareerClick(career)}
                    className="text-left hover:bg-gray-800/30 p-2 rounded transition-colors duration-200 group"
                  >
                    <h3 className="text-white text-sm sm:text-base font-normal underline decoration-gray-500 hover:decoration-blue-400 transition-colors duration-200 group-hover:text-blue-300 leading-relaxed">
                      {career.name}
                    </h3>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : searchQuery ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No careers found for "{searchQuery}"
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try a different search term or browse by letter.
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Careers for letter "{selectedLetter}" coming soon!
              </p>
              <p className="text-gray-500 text-sm mt-2">
                We're building a comprehensive list of 1000+ careers.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Career Detail Modal */}
      <AnimatePresence>
        {selectedCareer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeCareerModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedCareer.name}
                </h3>
                <button
                  onClick={closeCareerModal}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {selectedCareer.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareersListPage;
