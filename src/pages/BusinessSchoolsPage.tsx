import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Briefcase, MapPin, Search, Users, Award, Clock, Building, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface BusinessSchool {
  id: string;
  name: string;
  nickname?: string;
  location: string;
  region: string;
  type: 'Business School' | 'MBA Program' | 'Executive Education' | 'Management Institute';
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

const BusinessSchoolsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const businessSchools: BusinessSchool[] = [
    {
      id: 'ug-business-school',
      name: 'University of Ghana Business School',
      nickname: 'UGBS',
      location: 'Legon, Accra',
      region: 'Greater Accra',
      type: 'Business School',
      programs: ['MBA', 'Executive MBA', 'MSc Finance', 'MSc Marketing', 'PhD Business Administration'],
      website: 'https://ugbs.ug.edu.gh',
      description: 'Premier business school in Ghana offering world-class business education and executive training.',
      established: '1966',
      accreditation: 'AACSB, Association of MBAs (AMBA)',
      duration: '1-3 years',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'knust-business-school',
      name: 'KNUST School of Business',
      nickname: 'KSB',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'Business School',
      programs: ['MBA', 'MSc Management', 'MSc Accounting', 'Executive Development Programs'],
      website: 'https://ksb.knust.edu.gh',
      description: 'Leading business school offering innovative business education and research.',
      established: '1996',
      accreditation: 'National Accreditation Board, International Business Schools',
      duration: '1-2 years',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'gimpa-business-school',
      name: 'Ghana Institute of Management and Public Administration',
      nickname: 'GIMPA',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Management Institute',
      programs: ['MBA', 'Executive MBA', 'Public Administration', 'Project Management', 'Leadership Development'],
      website: 'https://gimpa.edu.gh',
      description: 'Specialized institute for management and public administration education.',
      established: '1961',
      accreditation: 'National Accreditation Board, International Management Schools',
      duration: '1-3 years',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-indigo-600',
      glowColor: '#7c3aed'
    },
    {
      id: 'ashesi-business',
      name: 'Ashesi University Business Department',
      nickname: 'Ashesi Business',
      location: 'Berekuso',
      region: 'Eastern',
      type: 'Business School',
      programs: ['Business Administration', 'Entrepreneurship', 'Management Information Systems', 'Executive Education'],
      website: 'https://ashesi.edu.gh/business',
      description: 'Innovation-focused business education with emphasis on entrepreneurship and leadership.',
      established: '2002',
      accreditation: 'National Accreditation Board, Liberal Arts Accreditation',
      duration: '4 years',
      icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-cyan-600 to-blue-600',
      glowColor: '#0891b2'
    },
    {
      id: 'central-university-business',
      name: 'Central University Business School',
      nickname: 'CU Business',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Business School',
      programs: ['MBA', 'MSc Finance', 'MSc Human Resource Management', 'Executive Programs'],
      website: 'https://central.edu.gh/business',
      description: 'Private business school offering comprehensive business and management education.',
      established: '1998',
      accreditation: 'National Accreditation Board',
      duration: '1-2 years',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626'
    },
    {
      id: 'lancaster-business-school-ghana',
      name: 'Lancaster University Ghana Business School',
      nickname: 'LUG Business',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Business School',
      programs: ['MBA', 'MSc Management', 'MSc Finance', 'Executive Education'],
      website: 'https://lancaster.edu.gh/business',
      description: 'Branch of UK\'s Lancaster University offering internationally recognized business programs.',
      established: '2013',
      accreditation: 'AACSB, EQUIS, AMBA (Triple Crown)',
      duration: '1-2 years',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },
    {
      id: 'wisconsin-business-school-ghana',
      name: 'Wisconsin International University College Business School',
      nickname: 'WIUC Business',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Business School',
      programs: ['MBA', 'MSc International Business', 'Executive Development', 'Leadership Programs'],
      website: 'https://wiuc.edu.gh/business',
      description: 'International business school offering American-style business education.',
      established: '2000',
      accreditation: 'National Accreditation Board, International Accreditation',
      duration: '1-2 years',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#0d9488'
    },
    {
      id: 'ghana-management-university',
      name: 'Ghana Management University',
      nickname: 'GMU',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Management Institute',
      programs: ['MBA', 'Executive MBA', 'Management Development', 'Corporate Training'],
      website: 'https://gmu.edu.gh',
      description: 'Specialized university focusing on management education and corporate development.',
      established: '2007',
      accreditation: 'National Accreditation Board',
      duration: '1-2 years',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    }
  ];

  const schoolTypes = ['All', 'Business School', 'MBA Program', 'Executive Education', 'Management Institute'];

  const filteredSchools = businessSchools.filter(school => {
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
        title="Business Schools & MBA Programs in Ghana | St. Louis Demonstration JHS"
        description="Comprehensive directory of business schools, MBA programs, and executive education institutions in Ghana. Find management and business administration programs."
        keywords="business schools Ghana, MBA programs Ghana, UGBS, GIMPA, executive education, management training"
        url="/business-schools"
        type="website"
        pageType="students-hub"
        useGalleryImages={true}
      />

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-2 sm:py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                Business Schools & MBA Programs
              </h1>
              <p className="text-sm text-blue-200 truncate">
                Management education and executive development programs
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
              placeholder="Search schools, programs, or specializations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
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
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
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
              <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No schools found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessSchoolsPage;
