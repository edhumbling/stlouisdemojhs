import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Palette, MapPin, Search, Users, Award, Clock, Building, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface ArtSchool {
  id: string;
  name: string;
  nickname?: string;
  location: string;
  region: string;
  type: 'Art School' | 'Film Institute' | 'Music Academy' | 'Design College' | 'Creative Institute';
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

const ArtCreativeSchoolsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const artSchools: ArtSchool[] = [
    // Film & Television
    {
      id: 'nafti',
      name: 'National Film and Television Institute',
      nickname: 'NAFTI',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Film Institute',
      programs: ['Film Production', 'Television Production', 'Animation', 'Sound Engineering', 'Cinematography'],
      website: 'https://nafti.edu.gh',
      description: 'Premier film and television training institute in Ghana, producing industry professionals.',
      established: '1978',
      accreditation: 'National Accreditation Board, International Film Schools Association',
      duration: '2-3 years',
      icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#a855f7'
    },

    // Visual Arts
    {
      id: 'ghanatta-college-of-art-and-design',
      name: 'Ghanatta College of Art and Design',
      nickname: 'GCAD',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Art School',
      programs: ['Fine Arts', 'Graphic Design', 'Fashion Design', 'Interior Design', 'Sculpture'],
      website: 'https://ghanatta.edu.gh',
      description: 'Leading art and design college offering comprehensive creative arts education.',
      established: '2002',
      accreditation: 'National Accreditation Board, International Association of Art Schools',
      duration: '3-4 years',
      icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'radford-university-college',
      name: 'Radford University College',
      nickname: 'RUC',
      location: 'East Legon, Accra',
      region: 'Greater Accra',
      type: 'Design College',
      programs: ['Fashion Design', 'Textile Design', 'Product Design', 'Visual Communication'],
      website: 'https://radford.edu.gh',
      description: 'Specialized university college focusing on design and creative arts education.',
      established: '1998',
      accreditation: 'National Accreditation Board',
      duration: '3-4 years',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-pink-600 to-rose-600',
      glowColor: '#ec4899'
    },

    // Music & Performing Arts
    {
      id: 'national-theatre-of-ghana',
      name: 'National Theatre of Ghana Drama Studio',
      nickname: 'Drama Studio',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Creative Institute',
      programs: ['Theatre Arts', 'Drama', 'Dance', 'Music Performance', 'Stage Management'],
      website: 'https://nationaltheatre.gov.gh',
      description: 'National center for performing arts training and cultural education.',
      established: '1992',
      accreditation: 'Ministry of Tourism, Arts and Culture',
      duration: '1-2 years',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-orange-600',
      glowColor: '#dc2626'
    },
    {
      id: 'ghana-music-academy',
      name: 'Ghana Music Academy',
      nickname: 'GMA',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'Music Academy',
      programs: ['Music Performance', 'Music Production', 'Sound Engineering', 'Music Business'],
      website: 'https://ghanamusicacademy.com',
      description: 'Professional music training academy focusing on contemporary and traditional music.',
      established: '2010',
      accreditation: 'Ghana Music Rights Organization',
      duration: '6 months - 2 years',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },

    // Digital Arts & Media
    {
      id: 'ipmc-ghana',
      name: 'Institute of Professional Media and Communication',
      nickname: 'IPMC',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Creative Institute',
      programs: ['Digital Media', 'Graphic Design', 'Web Design', 'Photography', 'Video Editing'],
      website: 'https://ipmc.edu.gh',
      description: 'Modern institute specializing in digital media and communication arts.',
      established: '2008',
      accreditation: 'National Accreditation Board',
      duration: '6 months - 2 years',
      icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-cyan-600 to-blue-600',
      glowColor: '#0891b2'
    },
    {
      id: 'blue-crest-college',
      name: 'BlueCrest College',
      nickname: 'BlueCrest',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Design College',
      programs: ['Game Design', '3D Animation', 'Digital Arts', 'UI/UX Design', 'Motion Graphics'],
      website: 'https://bluecrest.edu.gh',
      description: 'Technology-focused college offering cutting-edge digital arts and design programs.',
      established: '2005',
      accreditation: 'National Accreditation Board, International Design Organizations',
      duration: '1-3 years',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },

    // Fashion & Textiles
    {
      id: 'accra-fashion-week-academy',
      name: 'Accra Fashion Week Academy',
      nickname: 'AFW Academy',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Design College',
      programs: ['Fashion Design', 'Fashion Marketing', 'Textile Design', 'Fashion Photography'],
      website: 'https://accrafashionweek.com/academy',
      description: 'Fashion academy connected to Ghana\'s premier fashion event, training industry professionals.',
      established: '2015',
      accreditation: 'Ghana Fashion Council',
      duration: '6 months - 1 year',
      icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    },

    // Traditional Arts
    {
      id: 'centre-for-national-culture',
      name: 'Centre for National Culture Arts Training',
      nickname: 'CNC Arts',
      location: 'Multiple Locations',
      region: 'Nationwide',
      type: 'Creative Institute',
      programs: ['Traditional Crafts', 'Kente Weaving', 'Wood Carving', 'Pottery', 'Traditional Music'],
      website: 'https://cnc.gov.gh',
      description: 'Government centers promoting and teaching traditional Ghanaian arts and crafts.',
      established: '1957',
      accreditation: 'Ministry of Tourism, Arts and Culture',
      duration: '3 months - 1 year',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-teal-600',
      glowColor: '#059669'
    },

    // Photography & Visual Media
    {
      id: 'ghana-institute-of-photography',
      name: 'Ghana Institute of Photography',
      nickname: 'GIP',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Creative Institute',
      programs: ['Professional Photography', 'Photo Journalism', 'Commercial Photography', 'Digital Imaging'],
      website: 'https://gip.edu.gh',
      description: 'Specialized institute for photography education and visual storytelling.',
      established: '2012',
      accreditation: 'Professional Photographers Association of Ghana',
      duration: '3 months - 1 year',
      icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#0d9488'
    }
  ];

  const schoolTypes = ['All', 'Art School', 'Film Institute', 'Music Academy', 'Design College', 'Creative Institute'];

  const filteredSchools = artSchools.filter(school => {
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
        title="Art & Creative Schools in Ghana | St. Louis Demonstration JHS"
        description="Comprehensive directory of art schools, film institutes, music academies, and creative training institutions in Ghana. Find programs in visual arts, performing arts, and digital media."
        keywords="art schools Ghana, NAFTI, creative arts education, film school Ghana, music academy, design college, fashion design"
        url="/art-creative-schools"
        type="website"
        pageType="students-hub"
        useGalleryImages={true}

      canonical="https://stlouisdemojhs.com/art-creative-schools"

      />

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-pink-900 via-pink-800 to-pink-900 py-2 sm:py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-pink-700/50 hover:bg-pink-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-pink-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                Art & Creative Schools
              </h1>
              <p className="text-sm text-pink-200 truncate">
                Creative arts, design, and media training institutions
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
              placeholder="Search schools, programs, or creative fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
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
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/25'
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
                    {school.type.replace(' School', '').replace(' Institute', '')}
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
              <Palette className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No schools found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtCreativeSchoolsPage;
