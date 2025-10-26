import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Wrench, MapPin, Search, Users, Award, Clock, Building, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface TVETSchool {
  id: string;
  name: string;
  nickname?: string;
  location: string;
  region: string;
  type: 'Technical Institute' | 'Vocational School' | 'Skills Training Center' | 'Polytechnic';
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

const TVETSchoolsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const tvetSchools: TVETSchool[] = [
    // Technical Institutes
    {
      id: 'actt',
      name: 'African Centre for Technical Training',
      nickname: 'ACTT',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Technical Institute',
      programs: ['Electrical Engineering', 'Mechanical Engineering', 'Automotive Technology', 'Welding & Fabrication'],
      website: 'https://actt.edu.gh',
      description: 'Private technical training institution offering hands-on engineering and technical skills training.',
      established: '2010',
      accreditation: 'National Board for Professional & Technician Examinations (NABPTEX)',
      duration: '6 months - 2 years',
      icon: <Wrench className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },
    {
      id: 'gtti',
      name: 'Ghana Technology Training Institute',
      nickname: 'GTTI',
      location: 'Tema',
      region: 'Greater Accra',
      type: 'Technical Institute',
      programs: ['Industrial Maintenance', 'Refrigeration & Air Conditioning', 'Plumbing', 'Electrical Installation'],
      website: 'https://gtti.edu.gh',
      description: 'Leading technical institute specializing in industrial and maintenance technology training.',
      established: '1995',
      accreditation: 'NABPTEX, Council for Technical and Vocational Education and Training (COTVET)',
      duration: '3 months - 1 year',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },

    // Vocational Schools
    {
      id: 'nvti',
      name: 'National Vocational Training Institute',
      nickname: 'NVTI',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Vocational School',
      programs: ['Carpentry & Joinery', 'Masonry', 'Tailoring & Dressmaking', 'Catering & Hotel Management'],
      website: 'https://nvti.edu.gh',
      description: 'National institute providing vocational and technical education across multiple trades.',
      established: '1970',
      accreditation: 'NABPTEX, COTVET',
      duration: '6 months - 2 years',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'kumasi-technical-institute',
      name: 'Kumasi Technical Institute',
      nickname: 'KTI',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'Technical Institute',
      programs: ['Motor Vehicle Mechanics', 'Electronics', 'Building Construction', 'Fashion Design'],
      website: 'https://kti.edu.gh',
      description: 'Regional technical institute offering practical skills training in various technical fields.',
      established: '1963',
      accreditation: 'NABPTEX, COTVET',
      duration: '1-3 years',
      icon: <Wrench className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-indigo-600',
      glowColor: '#7c3aed'
    },

    // Skills Training Centers
    {
      id: 'skills-development-fund',
      name: 'Skills Development Fund Training Centers',
      nickname: 'SDF Centers',
      location: 'Multiple Locations',
      region: 'Nationwide',
      type: 'Skills Training Center',
      programs: ['ICT Skills', 'Entrepreneurship', 'Agribusiness', 'Renewable Energy Technology'],
      website: 'https://sdf.gov.gh',
      description: 'Government-funded skills training centers across Ghana focusing on employable skills.',
      established: '2011',
      accreditation: 'Ministry of Employment and Labour Relations',
      duration: '3-6 months',
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    },
    {
      id: 'opportunity-industrialization-centers',
      name: 'Opportunity Industrialization Centers',
      nickname: 'OIC Ghana',
      location: 'Accra, Kumasi, Tamale',
      region: 'Multiple Regions',
      type: 'Skills Training Center',
      programs: ['Computer Literacy', 'Business Skills', 'Artisan Training', 'Life Skills'],
      website: 'https://oicghana.org',
      description: 'Non-profit organization providing skills training and employment opportunities for youth.',
      established: '1970',
      accreditation: 'COTVET, International OIC Network',
      duration: '3-12 months',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#0d9488'
    },

    // Specialized Training Centers
    {
      id: 'ghana-institute-of-welding',
      name: 'Ghana Institute of Welding',
      nickname: 'GIW',
      location: 'Tema',
      region: 'Greater Accra',
      type: 'Technical Institute',
      programs: ['Arc Welding', 'Gas Welding', 'TIG Welding', 'Welding Inspection'],
      website: 'https://giw.edu.gh',
      description: 'Specialized institute for welding technology and metal fabrication training.',
      established: '1985',
      accreditation: 'International Institute of Welding (IIW)',
      duration: '3-6 months',
      icon: <Wrench className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626'
    },
    {
      id: 'automotive-training-center',
      name: 'National Automotive Training Center',
      nickname: 'NATC',
      location: 'Suame, Kumasi',
      region: 'Ashanti',
      type: 'Technical Institute',
      programs: ['Auto Mechanics', 'Auto Electrical', 'Panel Beating', 'Spray Painting'],
      website: 'https://natc.edu.gh',
      description: 'Specialized automotive training center serving the Suame Magazine industrial cluster.',
      established: '2008',
      accreditation: 'NABPTEX, Ghana Standards Authority',
      duration: '6 months - 1 year',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },

    // Regional TVET Centers
    {
      id: 'northern-tvet-center',
      name: 'Northern Regional TVET Center',
      nickname: 'NRTC',
      location: 'Tamale',
      region: 'Northern',
      type: 'Vocational School',
      programs: ['Agricultural Mechanization', 'Solar Technology', 'Motorcycle Repair', 'Leather Works'],
      website: 'https://nrtc.edu.gh',
      description: 'Regional TVET center focusing on skills relevant to northern Ghana\'s economy.',
      established: '2015',
      accreditation: 'COTVET, NABPTEX',
      duration: '3 months - 1 year',
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-teal-600',
      glowColor: '#059669'
    }
  ];

  const schoolTypes = ['All', 'Technical Institute', 'Vocational School', 'Skills Training Center', 'Polytechnic'];

  const filteredSchools = tvetSchools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (school.nickname && school.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'All' || school.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="TVET & Vocational Schools in Ghana | St. Louis Demonstration JHS"
        description="Master practical skills with our comprehensive directory of Technical and Vocational Education and Training (TVET) institutions in Ghana. Discover hands-on training programs in automotive, welding, carpentry, fashion design, and other technical fields that lead to immediate employment opportunities."
        keywords="TVET Ghana, vocational schools Ghana, technical training, skills development, NVTI, automotive training, welding institute"
        url="/tvet-schools"
        type="website"
        pageType="students-hub"
        useGalleryImages={true}
      /
        canonical="https://stlouisdemojhs.com/tvet-schools"
      >

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-orange-900 via-orange-800 to-orange-900 py-2 sm:py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-orange-700/50 hover:bg-orange-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-orange-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              TVET & Vocational Schools
            </h1>
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
              placeholder="Search schools, programs, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {schoolTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                  selectedType === type
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Schools Grid - Improved Mobile Layout */}
      <div className="px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredSchools.map((school) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br ${school.color} p-5 sm:p-6 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group min-h-[280px] sm:min-h-[320px] flex flex-col`}
                style={{
                  boxShadow: `0 4px 20px ${school.glowColor}20, 0 0 0 1px ${school.glowColor}10`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm`}>
                    {school.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                    {school.type.replace(' Institute', '').replace(' School', '')}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition-colors line-clamp-2">
                  {school.name}
                  {school.nickname && (
                    <span className="block text-sm text-white/70 font-normal mt-1">
                      ({school.nickname})
                    </span>
                  )}
                </h3>

                <div className="flex items-center gap-2 text-white/80 mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{school.location}, {school.region}</span>
                </div>

                <p className="text-white/70 text-sm mb-4 line-clamp-3 flex-grow">
                  {school.description}
                </p>

                <div className="space-y-3 mt-auto">
                  <div>
                    <h4 className="text-sm font-semibold text-white/90 mb-2">Programs:</h4>
                    <div className="flex flex-wrap gap-1">
                      {school.programs.slice(0, 3).map((program, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80"
                        >
                          {program}
                        </span>
                      ))}
                      {school.programs.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80">
                          +{school.programs.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{school.duration || 'Varies'}</span>
                    </div>
                    <a
                      href={school.website}
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

          {filteredSchools.length === 0 && (
            <div className="text-center py-12">
              <Wrench className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No schools found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TVETSchoolsPage;
