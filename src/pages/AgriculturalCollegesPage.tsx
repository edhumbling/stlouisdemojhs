import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Leaf, MapPin, Search, Users, Award, Clock, Building, Sprout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface AgriculturalCollege {
  id: string;
  name: string;
  nickname?: string;
  location: string;
  region: string;
  type: 'Agricultural College' | 'Research Institute' | 'Training Center' | 'University Faculty';
  programs: string[];
  website: string;
  description: string;
  established?: string;
  accreditation: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  duration?: string;
}

const AgriculturalCollegesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const agriculturalColleges: AgriculturalCollege[] = [
    {
      id: 'knust-agriculture',
      name: 'KNUST College of Agriculture and Natural Resources',
      nickname: 'KNUST Agriculture',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'University Faculty',
      programs: ['Agricultural Engineering', 'Crop Science', 'Animal Science', 'Food Science', 'Forestry'],
      website: 'https://canr.knust.edu.gh',
      description: 'Leading agricultural education and research institution in Ghana.',
      established: '1961',
      accreditation: 'National Accreditation Board, International Agricultural Organizations',
      duration: '4 years',
      icon: <Leaf className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'ug-agriculture',
      name: 'University of Ghana College of Basic and Applied Sciences',
      nickname: 'UG Agriculture',
      location: 'Legon, Accra',
      region: 'Greater Accra',
      type: 'University Faculty',
      programs: ['Agriculture', 'Nutrition', 'Biochemistry', 'Botany', 'Zoology'],
      website: 'https://cbas.ug.edu.gh',
      description: 'Comprehensive agricultural and applied sciences education at Ghana\'s premier university.',
      established: '1948',
      accreditation: 'National Accreditation Board',
      duration: '4 years',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'uds-agriculture',
      name: 'University for Development Studies Faculty of Agriculture',
      nickname: 'UDS Agriculture',
      location: 'Tamale',
      region: 'Northern',
      type: 'University Faculty',
      programs: ['Agricultural Technology', 'Animal Husbandry', 'Agribusiness', 'Sustainable Agriculture'],
      website: 'https://uds.edu.gh/agriculture',
      description: 'Agricultural education focused on sustainable development and food security.',
      established: '1992',
      accreditation: 'National Accreditation Board',
      duration: '4 years',
      icon: <Sprout className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#0d9488'
    },
    {
      id: 'crops-research-institute',
      name: 'Crops Research Institute',
      nickname: 'CRI',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'Research Institute',
      programs: ['Crop Breeding', 'Plant Pathology', 'Soil Science', 'Agricultural Extension'],
      website: 'https://cri.csir.org.gh',
      description: 'Premier agricultural research institute developing improved crop varieties.',
      established: '1964',
      accreditation: 'Council for Scientific and Industrial Research (CSIR)',
      duration: '1-3 years',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    },
    {
      id: 'animal-research-institute',
      name: 'Animal Research Institute',
      nickname: 'ARI',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Research Institute',
      programs: ['Animal Breeding', 'Veterinary Science', 'Livestock Management', 'Animal Nutrition'],
      website: 'https://ari.csir.org.gh',
      description: 'Leading research in animal science and livestock development.',
      established: '1960',
      accreditation: 'Council for Scientific and Industrial Research (CSIR)',
      duration: '1-3 years',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-indigo-600',
      glowColor: '#7c3aed'
    },
    {
      id: 'forestry-research-institute',
      name: 'Forestry Research Institute of Ghana',
      nickname: 'FORIG',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'Research Institute',
      programs: ['Forest Management', 'Wood Technology', 'Environmental Conservation', 'Agroforestry'],
      website: 'https://forig.org.gh',
      description: 'Research institute focusing on forest resources and environmental conservation.',
      established: '1964',
      accreditation: 'Council for Scientific and Industrial Research (CSIR)',
      duration: '6 months - 2 years',
      icon: <Leaf className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-teal-600',
      glowColor: '#059669'
    },
    {
      id: 'agricultural-development-bank-training',
      name: 'Agricultural Development Bank Training Institute',
      nickname: 'ADB Training',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Training Center',
      programs: ['Agricultural Finance', 'Rural Banking', 'Agribusiness Management', 'Cooperative Development'],
      website: 'https://adb.com.gh/training',
      description: 'Specialized training in agricultural finance and rural development.',
      established: '1970',
      accreditation: 'Bank of Ghana, Ministry of Food and Agriculture',
      duration: '3 months - 1 year',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626'
    },
    {
      id: 'cocoa-research-institute',
      name: 'Cocoa Research Institute of Ghana',
      nickname: 'CRIG',
      location: 'Tafo',
      region: 'Eastern',
      type: 'Research Institute',
      programs: ['Cocoa Breeding', 'Plant Protection', 'Soil Fertility', 'Post-Harvest Technology'],
      website: 'https://crig.org.gh',
      description: 'World-renowned research institute specializing in cocoa production and technology.',
      established: '1938',
      accreditation: 'Council for Scientific and Industrial Research (CSIR)',
      duration: '6 months - 2 years',
      icon: <Sprout className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    }
  ];

  const collegeTypes = ['All', 'Agricultural College', 'Research Institute', 'Training Center', 'University Faculty'];

  const filteredColleges = agriculturalColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (college.nickname && college.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'All' || college.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Agricultural Colleges & Research Institutes in Ghana | St. Louis Demonstration JHS"
        description="Comprehensive directory of agricultural colleges, research institutes, and farming training institutions in Ghana. Find programs in crop science, animal husbandry, and agribusiness."
        keywords="agricultural colleges Ghana, KNUST agriculture, farming education, agricultural research, crop science, animal science"
        url="/agricultural-colleges"
        type="website"
      />

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                Agricultural Colleges & Research Institutes
              </h1>
              <p className="text-sm text-green-200 truncate">
                Specialized farming and agricultural training institutions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search colleges, programs, or agricultural fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {collegeTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                  selectedType === type
                    ? 'bg-green-600 text-white shadow-lg shadow-green-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Colleges Grid - Improved Mobile Layout */}
      <div className="px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredColleges.map((college) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br ${college.color} p-5 sm:p-6 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group min-h-[280px] sm:min-h-[320px] flex flex-col`}
                style={{
                  boxShadow: `0 4px 20px ${college.glowColor}20, 0 0 0 1px ${college.glowColor}10`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm`}>
                    {college.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                    {college.type.replace(' College', '').replace(' Institute', '')}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition-colors line-clamp-2">
                  {college.name}
                  {college.nickname && (
                    <span className="block text-sm text-white/70 font-normal mt-1">
                      ({college.nickname})
                    </span>
                  )}
                </h3>

                <div className="flex items-center gap-2 text-white/80 mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{college.location}, {college.region}</span>
                </div>

                <p className="text-white/70 text-sm mb-4 line-clamp-3 flex-grow">
                  {college.description}
                </p>

                <div className="space-y-3 mt-auto">
                  <div>
                    <h4 className="text-sm font-semibold text-white/90 mb-2">Programs:</h4>
                    <div className="flex flex-wrap gap-1">
                      {college.programs.slice(0, 3).map((program, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80"
                        >
                          {program}
                        </span>
                      ))}
                      {college.programs.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80">
                          +{college.programs.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{college.duration || 'Varies'}</span>
                    </div>
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 text-white text-sm font-medium"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <div className="text-center py-12">
              <Leaf className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No colleges found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgriculturalCollegesPage;
