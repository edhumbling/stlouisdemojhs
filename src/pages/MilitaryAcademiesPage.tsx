import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Shield, MapPin, Search, Users, Award, Clock, Building, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface MilitaryAcademy {
  id: string;
  name: string;
  nickname?: string;
  location: string;
  region: string;
  type: 'Military Academy' | 'Police Training' | 'Security Institute' | 'Defense College';
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

const MilitaryAcademiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const militaryAcademies: MilitaryAcademy[] = [
    // Military Academies
    {
      id: 'ghana-military-academy',
      name: 'Ghana Military Academy',
      nickname: 'GMA',
      location: 'Teshie',
      region: 'Greater Accra',
      type: 'Military Academy',
      programs: ['Officer Cadet Training', 'Military Leadership', 'Combat Training', 'Military Engineering'],
      website: 'https://gaf.mil.gh/academy',
      description: 'Premier military academy training officers for the Ghana Armed Forces with emphasis on leadership and military science.',
      established: '1960',
      accreditation: 'Ghana Armed Forces, Ministry of Defence',
      duration: '2-4 years',
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'gafcsc',
      name: 'Ghana Armed Forces Command and Staff College',
      nickname: 'GAFCSC',
      location: 'Teshie',
      region: 'Greater Accra',
      type: 'Defense College',
      programs: ['Staff Course', 'War College', 'Strategic Studies', 'Defense Management'],
      website: 'https://gaf.mil.gh/gafcsc',
      description: 'Senior military education institution for mid-career and senior officers of the Ghana Armed Forces.',
      established: '1963',
      accreditation: 'Ghana Armed Forces, International Military Education',
      duration: '6 months - 1 year',
      icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },

    // Police Training
    {
      id: 'ghana-police-academy',
      name: 'Ghana Police Academy',
      nickname: 'GPA',
      location: 'Tesano, Accra',
      region: 'Greater Accra',
      type: 'Police Training',
      programs: ['Cadet Officer Training', 'Criminal Investigation', 'Traffic Management', 'Community Policing'],
      website: 'https://police.gov.gh/academy',
      description: 'Premier police training institution producing officers for the Ghana Police Service.',
      established: '1959',
      accreditation: 'Ghana Police Service, Ministry of Interior',
      duration: '2-3 years',
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-cyan-600',
      glowColor: '#0891b2'
    },
    {
      id: 'ghana-police-training-school',
      name: 'Ghana Police Training School',
      nickname: 'GPTS',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Police Training',
      programs: ['Basic Police Training', 'Detective Training', 'Specialized Units Training', 'In-Service Training'],
      website: 'https://police.gov.gh/training',
      description: 'Main training facility for Ghana Police Service personnel at various levels.',
      established: '1952',
      accreditation: 'Ghana Police Service',
      duration: '6 months - 2 years',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },

    // Security Institutes
    {
      id: 'kofi-annan-peacekeeping-centre',
      name: 'Kofi Annan International Peacekeeping Training Centre',
      nickname: 'KAIPTC',
      location: 'Teshie',
      region: 'Greater Accra',
      type: 'Security Institute',
      programs: ['Peacekeeping Operations', 'Conflict Prevention', 'Security Sector Reform', 'Peace Support Operations'],
      website: 'https://www.kaiptc.org',
      description: 'International center of excellence for peacekeeping training and conflict prevention in West Africa.',
      established: '2004',
      accreditation: 'ECOWAS, African Union, United Nations',
      duration: '2 weeks - 6 months',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#a855f7'
    },
    {
      id: 'national-security-academy',
      name: 'National Security Academy',
      nickname: 'NSA',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Security Institute',
      programs: ['Intelligence Analysis', 'Counter-Terrorism', 'Cybersecurity', 'National Security Studies'],
      website: 'https://nsa.gov.gh',
      description: 'Specialized academy for national security personnel and intelligence training.',
      established: '2010',
      accreditation: 'National Security Council',
      duration: '3 months - 1 year',
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-gray-600 to-slate-600',
      glowColor: '#64748b'
    },

    // Specialized Training Centers
    {
      id: 'ghana-navy-training-command',
      name: 'Ghana Navy Training Command',
      nickname: 'GNTC',
      location: 'Tema',
      region: 'Greater Accra',
      type: 'Military Academy',
      programs: ['Naval Officer Training', 'Maritime Operations', 'Naval Engineering', 'Seamanship'],
      website: 'https://gn.mil.gh/training',
      description: 'Naval training facility for Ghana Navy officers and ratings specializing in maritime operations.',
      established: '1959',
      accreditation: 'Ghana Navy, International Maritime Organization',
      duration: '6 months - 2 years',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#0d9488'
    },
    {
      id: 'ghana-air-force-training-command',
      name: 'Ghana Air Force Training Command',
      nickname: 'GAFTC',
      location: 'Tamale',
      region: 'Northern',
      type: 'Military Academy',
      programs: ['Pilot Training', 'Aircraft Maintenance', 'Air Traffic Control', 'Aviation Technology'],
      website: 'https://gaf.mil.gh/airforce',
      description: 'Air force training facility specializing in aviation and aerospace technology training.',
      established: '1961',
      accreditation: 'Ghana Air Force, International Civil Aviation Organization',
      duration: '1-3 years',
      icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    },

    // Immigration and Customs
    {
      id: 'ghana-immigration-training-school',
      name: 'Ghana Immigration Service Training School',
      nickname: 'GISTS',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Security Institute',
      programs: ['Immigration Control', 'Border Security', 'Document Verification', 'Customer Service'],
      website: 'https://gis.gov.gh/training',
      description: 'Training facility for Ghana Immigration Service personnel focusing on border control and security.',
      established: '1986',
      accreditation: 'Ghana Immigration Service, Ministry of Interior',
      duration: '3-6 months',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626'
    },
    {
      id: 'customs-training-school',
      name: 'Ghana Revenue Authority Customs Training School',
      nickname: 'GRA CTS',
      location: 'Tema',
      region: 'Greater Accra',
      type: 'Security Institute',
      programs: ['Customs Procedures', 'Trade Facilitation', 'Anti-Smuggling', 'Revenue Collection'],
      website: 'https://gra.gov.gh/training',
      description: 'Specialized training for customs officers and revenue collection personnel.',
      established: '1975',
      accreditation: 'Ghana Revenue Authority, World Customs Organization',
      duration: '2-6 months',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-teal-600',
      glowColor: '#059669'
    }
  ];

  const academyTypes = ['All', 'Military Academy', 'Police Training', 'Security Institute', 'Defense College'];

  const filteredAcademies = militaryAcademies.filter(academy => {
    const matchesSearch = academy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         academy.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         academy.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         academy.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (academy.nickname && academy.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'All' || academy.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Military & Security Academies in Ghana | St. Louis Demonstration JHS"
        description="Comprehensive directory of military academies, police training schools, and security institutes in Ghana. Find defense and security career training programs."
        keywords="military academy Ghana, Ghana Police Academy, Ghana Armed Forces, security training, KAIPTC, defense college"
        url="/military-academies"
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
                Military & Security Academies
              </h1>
              <p className="text-sm text-green-200 truncate">
                Defense and security training institutions in Ghana
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
              placeholder="Search academies, programs, or specializations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {academyTypes.map((type) => (
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

      {/* Academies Grid - Improved Mobile Layout */}
      <div className="px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredAcademies.map((academy) => (
              <motion.div
                key={academy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br ${academy.color} p-5 sm:p-6 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group min-h-[280px] sm:min-h-[320px] flex flex-col`}
                style={{
                  boxShadow: `0 4px 20px ${academy.glowColor}20, 0 0 0 1px ${academy.glowColor}10`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm`}>
                    {academy.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                    {academy.type.replace(' Academy', '').replace(' Training', '')}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition-colors line-clamp-2">
                  {academy.name}
                  {academy.nickname && (
                    <span className="block text-sm text-white/70 font-normal mt-1">
                      ({academy.nickname})
                    </span>
                  )}
                </h3>

                <div className="flex items-center gap-2 text-white/80 mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{academy.location}, {academy.region}</span>
                </div>

                <p className="text-white/70 text-sm mb-4 line-clamp-3 flex-grow">
                  {academy.description}
                </p>

                <div className="space-y-3 mt-auto">
                  <div>
                    <h4 className="text-sm font-semibold text-white/90 mb-2">Programs:</h4>
                    <div className="flex flex-wrap gap-1">
                      {academy.programs.slice(0, 3).map((program, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80"
                        >
                          {program}
                        </span>
                      ))}
                      {academy.programs.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80">
                          +{academy.programs.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{academy.duration || 'Varies'}</span>
                    </div>
                    <a
                      href={academy.website}
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

          {filteredAcademies.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No academies found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MilitaryAcademiesPage;
