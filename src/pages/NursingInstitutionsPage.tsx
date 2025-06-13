import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Heart, MapPin, GraduationCap, Search, Users, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface NursingInstitution {
  id: string;
  name: string;
  location: string;
  region: string;
  type: 'Medical School' | 'Nursing College' | 'University' | 'Training College';
  programs: string[];
  website: string;
  description: string;
  established?: string;
  accreditation: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

const NursingInstitutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const nursingInstitutions: NursingInstitution[] = [
    // Medical Schools
    {
      id: 'ugms',
      name: 'University of Ghana Medical School (UGMS)',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Medical School',
      programs: ['Medicine (MBChB)', 'Nursing', 'Physician Assistant', 'Biomedical Sciences'],
      website: 'https://ugms.ug.edu.gh',
      description: 'Premier medical school in Ghana, established in 1963. Offers comprehensive medical education and training.',
      established: '1963',
      accreditation: 'National Accreditation Board (NAB), Medical & Dental Council',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'knust-smd',
      name: 'KNUST School of Medicine and Dentistry',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'Medical School',
      programs: ['Medicine (MBChB)', 'Dentistry (BDS)', 'Nursing', 'Physician Assistant'],
      website: 'https://sms.knust.edu.gh',
      description: 'Leading medical and dental school offering world-class healthcare education in Ghana.',
      established: '1975',
      accreditation: 'National Accreditation Board (NAB), Medical & Dental Council',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'uhas',
      name: 'University of Health and Allied Sciences (UHAS)',
      location: 'Ho',
      region: 'Volta',
      type: 'University',
      programs: ['Medicine', 'Nursing', 'Midwifery', 'Physician Assistant', 'Allied Health Sciences'],
      website: 'https://uhas.edu.gh',
      description: 'Specialized university focused on health sciences and allied health professions.',
      established: '2011',
      accreditation: 'National Accreditation Board (NAB), Medical & Dental Council',
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },

    // Premier Nursing Colleges
    {
      id: 'korle-bu-ntc',
      name: 'Korle-Bu Nurses Training College',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Nursing College',
      programs: ['Registered General Nursing (RGN)', 'Registered Midwifery', 'Post-Basic Nursing'],
      website: 'https://nmtckb.edu.gh',
      description: 'Premier nursing training institution in Ghana, affiliated with Korle-Bu Teaching Hospital.',
      established: '1945',
      accreditation: 'National Accreditation Board (NAB), Nursing & Midwifery Council',
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626'
    },
    {
      id: 'kath-ntc',
      name: 'KATH Nursing & Midwifery Training College',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'Nursing College',
      programs: ['Registered General Nursing (RGN)', 'Registered Midwifery', 'Community Health Nursing'],
      website: 'https://kath.gov.gh/nursing-college',
      description: 'Leading nursing college affiliated with Komfo Anokye Teaching Hospital.',
      established: '1954',
      accreditation: 'National Accreditation Board (NAB), Nursing & Midwifery Council',
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626'
    },
    {
      id: 'cape-coast-nmtc',
      name: 'Cape Coast Nursing and Midwifery Training College',
      location: 'Cape Coast',
      region: 'Central',
      type: 'Nursing College',
      programs: ['Registered General Nursing (RGN)', 'Registered Midwifery', 'Community Health Nursing'],
      website: 'http://ccnmtc.edu.gh',
      description: 'Established nursing college providing quality healthcare education in the Central Region.',
      established: '1960',
      accreditation: 'National Accreditation Board (NAB), Nursing & Midwifery Council',
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626'
    },

    // Regional Nursing Colleges
    {
      id: '37-military-hospital-ntc',
      name: '37 Military Hospital Nurses Training College',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Training College',
      programs: ['Registered General Nursing (RGN)', 'Military Nursing', 'Emergency Care'],
      website: 'https://37mh.mil.gh/nursing-college',
      description: 'Military nursing college providing specialized healthcare training for military and civilian students.',
      established: '1957',
      accreditation: 'National Accreditation Board (NAB), Nursing & Midwifery Council',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-teal-600',
      glowColor: '#059669'
    },
    {
      id: 'ankaful-ntc',
      name: 'Ankaful Nurses Training College',
      location: 'Cape Coast',
      region: 'Central',
      type: 'Training College',
      programs: ['Registered General Nursing (RGN)', 'Psychiatric Nursing', 'Community Health'],
      website: 'https://pntcankaful.edu.gh',
      description: 'Specialized in psychiatric and mental health nursing education.',
      established: '1963',
      accreditation: 'National Accreditation Board (NAB), Nursing & Midwifery Council',
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-indigo-600',
      glowColor: '#7c3aed'
    },
    {
      id: 'tamale-ntc',
      name: 'Tamale Nurses Training College',
      location: 'Tamale',
      region: 'Northern',
      type: 'Training College',
      programs: ['Registered General Nursing (RGN)', 'Community Health Nursing', 'Midwifery'],
      website: 'https://tamale-ntc.edu.gh',
      description: 'Leading nursing education institution serving the Northern regions of Ghana.',
      established: '1970',
      accreditation: 'National Accreditation Board (NAB), Nursing & Midwifery Council',
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },
    {
      id: 'ho-ntc',
      name: 'Ho Nurses Training College',
      location: 'Ho',
      region: 'Volta',
      type: 'Training College',
      programs: ['Registered General Nursing (RGN)', 'Community Health Nursing', 'Midwifery'],
      website: 'https://ho-ntc.edu.gh',
      description: 'Regional nursing college providing healthcare education in the Volta Region.',
      established: '1975',
      accreditation: 'National Accreditation Board (NAB), Nursing & Midwifery Council',
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#0d9488'
    },
    {
      id: 'sunyani-ntc',
      name: 'Sunyani Nurses Training College',
      location: 'Sunyani',
      region: 'Bono',
      type: 'Training College',
      programs: ['Registered General Nursing (RGN)', 'Community Health Nursing', 'Midwifery'],
      website: 'https://sunyani-ntc.edu.gh',
      description: 'Regional nursing college serving the Bono and Ahafo regions.',
      established: '1978',
      accreditation: 'National Accreditation Board (NAB), Nursing & Midwifery Council',
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    }
  ];

  const institutionTypes = ['All', 'Medical School', 'University', 'Nursing College', 'Training College'];

  const filteredInstitutions = nursingInstitutions.filter(institution => {
    const matchesSearch = institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institution.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institution.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institution.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'All' || institution.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Nursing & Health Training Institutions in Ghana | St. Louis Demonstration JHS"
        description="Pursue a rewarding healthcare career with our comprehensive directory of nursing colleges, medical schools, and health training institutions in Ghana. Find accredited programs at UGMS, KNUST Medicine, UHAS, Korle-Bu Nursing College, and other premier healthcare education institutions."
        keywords="nursing colleges Ghana, medical schools Ghana, health training institutions, UGMS, KNUST medicine, UHAS, Korle-Bu nursing, healthcare education"
        url="/nursing-institutions"
        type="website"
        pageType="students-hub"
        useGalleryImages={true}
      />

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-700/50 hover:bg-red-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-red-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Nursing & Health Training Institutions
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
              placeholder="Search institutions, locations, or programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {institutionTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                  selectedType === type
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Institutions Grid */}
      <div className="px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredInstitutions.map((institution) => (
              <motion.div
                key={institution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br ${institution.color} p-4 sm:p-6 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group`}
                style={{
                  boxShadow: `0 4px 20px ${institution.glowColor}20, 0 0 0 1px ${institution.glowColor}10`
                }}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`p-2 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm`}>
                    {institution.icon}
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                    {institution.type.replace(' College', '').replace(' School', '')}
                  </span>
                </div>

                <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-gray-100 transition-colors line-clamp-2">
                  {institution.name}
                </h3>

                <div className="flex items-center gap-1 sm:gap-2 text-white/80 mb-2 sm:mb-3">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">{institution.location}, {institution.region}</span>
                </div>

                <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {institution.description}
                </p>

                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white/90 mb-1 sm:mb-2">Programs:</h4>
                    <div className="flex flex-wrap gap-1">
                      {institution.programs.slice(0, 3).map((program, index) => (
                        <span
                          key={index}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 rounded-md text-xs text-white/80"
                        >
                          {program}
                        </span>
                      ))}
                      {institution.programs.length > 3 && (
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 rounded-md text-xs text-white/80">
                          +{institution.programs.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/20">
                    <div className="flex items-center gap-1 sm:gap-2 text-white/70">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs">Est. {institution.established}</span>
                    </div>
                    <a
                      href={institution.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 text-white text-xs sm:text-sm font-medium"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredInstitutions.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No institutions found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NursingInstitutionsPage;
