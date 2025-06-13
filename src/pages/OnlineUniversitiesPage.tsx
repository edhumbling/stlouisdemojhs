import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Monitor, MapPin, Search, Users, Award, Clock, Building, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface OnlineUniversity {
  id: string;
  name: string;
  nickname?: string;
  location: string;
  region: string;
  type: 'Online University' | 'Distance Learning' | 'Virtual Campus' | 'Hybrid Program';
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

const OnlineUniversitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const onlineUniversities: OnlineUniversity[] = [
    {
      id: 'ug-distance-learning',
      name: 'University of Ghana Distance Learning',
      nickname: 'UG Distance',
      location: 'Accra (Online)',
      region: 'Greater Accra',
      type: 'Distance Learning',
      programs: ['Bachelor of Arts', 'Bachelor of Science', 'MBA', 'Diploma Programs', 'Certificate Courses'],
      website: 'https://dl.ug.edu.gh',
      description: 'Premier distance learning programs from Ghana\'s oldest university, offering flexible online education.',
      established: '2004',
      accreditation: 'National Accreditation Board, Distance Education Accrediting Commission',
      duration: '2-4 years',
      icon: <Monitor className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'knust-distance-learning',
      name: 'KNUST Distance Learning Programme',
      nickname: 'KNUST Distance',
      location: 'Kumasi (Online)',
      region: 'Ashanti',
      type: 'Distance Learning',
      programs: ['Engineering Technology', 'Business Administration', 'Agriculture', 'Built Environment'],
      website: 'https://dl.knust.edu.gh',
      description: 'Technology-focused distance learning programs from Ghana\'s premier science and technology university.',
      established: '2005',
      accreditation: 'National Accreditation Board',
      duration: '3-4 years',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'ucc-distance-education',
      name: 'University of Cape Coast Distance Education',
      nickname: 'UCC Distance',
      location: 'Cape Coast (Online)',
      region: 'Central',
      type: 'Distance Learning',
      programs: ['Education', 'Business', 'Arts', 'Social Sciences', 'Teacher Training'],
      website: 'https://distance.ucc.edu.gh',
      description: 'Comprehensive distance education programs with focus on teacher training and liberal arts.',
      established: '1996',
      accreditation: 'National Accreditation Board',
      duration: '2-4 years',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-indigo-600',
      glowColor: '#7c3aed'
    },
    {
      id: 'gimpa-online',
      name: 'GIMPA Online Learning Platform',
      nickname: 'GIMPA Online',
      location: 'Accra (Online)',
      region: 'Greater Accra',
      type: 'Online University',
      programs: ['MBA Online', 'Executive Education', 'Public Administration', 'Project Management'],
      website: 'https://online.gimpa.edu.gh',
      description: 'Professional online programs in management and public administration.',
      established: '2010',
      accreditation: 'National Accreditation Board',
      duration: '1-3 years',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },
    {
      id: 'university-of-education-winneba-distance',
      name: 'University of Education Winneba Distance Education',
      nickname: 'UEW Distance',
      location: 'Winneba (Online)',
      region: 'Central',
      type: 'Distance Learning',
      programs: ['Bachelor of Education', 'Diploma in Education', 'Educational Leadership', 'Special Education'],
      website: 'https://distance.uew.edu.gh',
      description: 'Teacher education and professional development through distance learning.',
      established: '2000',
      accreditation: 'National Accreditation Board',
      duration: '2-4 years',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#0d9488'
    },
    {
      id: 'ashesi-online',
      name: 'Ashesi University Online Programs',
      nickname: 'Ashesi Online',
      location: 'Berekuso (Online)',
      region: 'Eastern',
      type: 'Virtual Campus',
      programs: ['Computer Science', 'Business Administration', 'Engineering', 'Executive Education'],
      website: 'https://online.ashesi.edu.gh',
      description: 'Innovation-focused online programs with emphasis on leadership and entrepreneurship.',
      established: '2020',
      accreditation: 'National Accreditation Board, Liberal Arts Accreditation',
      duration: '1-4 years',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-cyan-600 to-blue-600',
      glowColor: '#0891b2'
    },
    {
      id: 'central-university-online',
      name: 'Central University Online Campus',
      nickname: 'Central Online',
      location: 'Accra (Online)',
      region: 'Greater Accra',
      type: 'Virtual Campus',
      programs: ['Business', 'IT', 'Health Sciences', 'Engineering', 'Professional Certificates'],
      website: 'https://online.central.edu.gh',
      description: 'Comprehensive online education with flexible learning schedules and industry-relevant programs.',
      established: '2015',
      accreditation: 'National Accreditation Board',
      duration: '6 months - 4 years',
      icon: <Monitor className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626'
    },
    {
      id: 'wisconsin-online',
      name: 'Wisconsin International University College Online',
      nickname: 'WIUC Online',
      location: 'Accra (Online)',
      region: 'Greater Accra',
      type: 'Online University',
      programs: ['MBA', 'International Business', 'Information Technology', 'Executive Programs'],
      website: 'https://online.wiuc.edu.gh',
      description: 'American-style online education with international accreditation and global recognition.',
      established: '2012',
      accreditation: 'National Accreditation Board, International Accreditation',
      duration: '1-4 years',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'coursera-ghana',
      name: 'Coursera for Ghana Initiative',
      nickname: 'Coursera Ghana',
      location: 'Online Platform',
      region: 'Nationwide',
      type: 'Online University',
      programs: ['University Certificates', 'Professional Certificates', 'Specializations', 'Degree Programs'],
      website: 'https://coursera.org/ghana',
      description: 'Global online learning platform offering courses from top universities and companies worldwide.',
      established: '2020',
      accreditation: 'Partner Universities and Industry Leaders',
      duration: '4 weeks - 4 years',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    },
    {
      id: 'edx-ghana',
      name: 'edX Ghana Programs',
      nickname: 'edX Ghana',
      location: 'Online Platform',
      region: 'Nationwide',
      type: 'Online University',
      programs: ['MicroMasters', 'Professional Education', 'University Courses', 'Executive Education'],
      website: 'https://edx.org/ghana',
      description: 'High-quality online courses from leading universities including MIT, Harvard, and local institutions.',
      established: '2018',
      accreditation: 'Partner Universities',
      duration: '6 weeks - 2 years',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-teal-600',
      glowColor: '#059669'
    }
  ];

  const universityTypes = ['All', 'Online University', 'Distance Learning', 'Virtual Campus', 'Hybrid Program'];

  const filteredUniversities = onlineUniversities.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         university.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         university.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         university.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (university.nickname && university.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'All' || university.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Online Universities & Distance Learning in Ghana | St. Louis Demonstration JHS"
        description="Comprehensive directory of online universities, distance learning programs, and virtual education institutions in Ghana. Find accredited online degree programs."
        keywords="online universities Ghana, distance learning Ghana, virtual education, online degrees, UG distance learning, KNUST online"
        url="/online-universities"
        type="website"
        pageType="students-hub"
        useGalleryImages={true}
      />

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-cyan-900 via-cyan-800 to-cyan-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-cyan-700/50 hover:bg-cyan-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-cyan-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                Online Universities & Distance Learning
              </h1>
              <p className="text-sm text-cyan-200 truncate">
                Accredited online education and virtual learning institutions
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
              placeholder="Search universities, programs, or platforms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {universityTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                  selectedType === type
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Universities Grid - Improved Mobile Layout */}
      <div className="px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredUniversities.map((university) => (
              <motion.div
                key={university.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br ${university.color} p-5 sm:p-6 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group min-h-[280px] sm:min-h-[320px] flex flex-col`}
                style={{
                  boxShadow: `0 4px 20px ${university.glowColor}20, 0 0 0 1px ${university.glowColor}10`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm`}>
                    {university.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                    {university.type.replace(' University', '').replace(' Learning', '')}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition-colors line-clamp-2">
                  {university.name}
                  {university.nickname && (
                    <span className="block text-sm text-white/70 font-normal mt-1">
                      ({university.nickname})
                    </span>
                  )}
                </h3>

                <div className="flex items-center gap-2 text-white/80 mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{university.location}</span>
                </div>

                <p className="text-white/70 text-sm mb-4 line-clamp-3 flex-grow">
                  {university.description}
                </p>

                <div className="space-y-3 mt-auto">
                  <div>
                    <h4 className="text-sm font-semibold text-white/90 mb-2">Programs:</h4>
                    <div className="flex flex-wrap gap-1">
                      {university.programs.slice(0, 3).map((program, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80"
                        >
                          {program}
                        </span>
                      ))}
                      {university.programs.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80">
                          +{university.programs.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{university.duration || 'Varies'}</span>
                    </div>
                    <a
                      href={university.website}
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

          {filteredUniversities.length === 0 && (
            <div className="text-center py-12">
              <Monitor className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No universities found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlineUniversitiesPage;
