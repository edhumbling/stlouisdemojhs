import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, GraduationCap, MapPin, Search, Users, Award, Clock, Building, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface University {
  id: string;
  name: string;
  nickname?: string;
  location: string;
  region: string;
  type: 'Public University' | 'Private University' | 'Technical University' | 'Professional Institute';
  programs: string[];
  website: string;
  description: string;
  established?: string;
  accreditation: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  studentCount?: string;
}

const LocalUniversitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const universities: University[] = [
    // Public Universities
    {
      id: 'university-of-ghana',
      name: 'University of Ghana',
      nickname: 'Legon',
      location: 'Legon, Accra',
      region: 'Greater Accra',
      type: 'Public University',
      programs: ['Medicine', 'Law', 'Business', 'Engineering', 'Arts', 'Sciences', 'Social Sciences'],
      website: 'https://www.ug.edu.gh',
      description: 'Ghana\'s premier university, established in 1948. The oldest and largest public university in Ghana.',
      established: '1948',
      accreditation: 'National Accreditation Board (NAB)',
      studentCount: '38,000+',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'knust',
      name: 'Kwame Nkrumah University of Science and Technology',
      nickname: 'KNUST',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'Public University',
      programs: ['Engineering', 'Medicine', 'Dentistry', 'Architecture', 'Agriculture', 'Sciences', 'Business'],
      website: 'https://www.knust.edu.gh',
      description: 'Ghana\'s premier science and technology university, renowned for engineering and technical programs.',
      established: '1952',
      accreditation: 'National Accreditation Board (NAB)',
      studentCount: '23,591',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'ucc',
      name: 'University of Cape Coast',
      nickname: 'Cape Vars',
      location: 'Cape Coast',
      region: 'Central',
      type: 'Public University',
      programs: ['Education', 'Business', 'Arts', 'Sciences', 'Health Sciences', 'Agriculture'],
      website: 'https://www.ucc.edu.gh',
      description: 'Leading university in teacher education and liberal arts, known for academic excellence.',
      established: '1961',
      accreditation: 'National Accreditation Board (NAB)',
      studentCount: '15,835+',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-indigo-600',
      glowColor: '#7c3aed'
    },
    {
      id: 'uew',
      name: 'University of Education, Winneba',
      nickname: 'UEW',
      location: 'Winneba',
      region: 'Central',
      type: 'Public University',
      programs: ['Education', 'Arts', 'Sciences', 'Business', 'Technical Education', 'Special Education'],
      website: 'https://www.uew.edu.gh',
      description: 'Ghana\'s premier teacher training university, specializing in education at all levels.',
      established: '1992',
      accreditation: 'National Accreditation Board (NAB)',
      studentCount: '16,879+',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },
    {
      id: 'uds',
      name: 'University for Development Studies',
      nickname: 'UDS',
      location: 'Tamale',
      region: 'Northern',
      type: 'Public University',
      programs: ['Agriculture', 'Medicine', 'Business', 'Development Studies', 'Applied Sciences'],
      website: 'https://beta.uds.edu.gh',
      description: 'Multi-campus university focused on development studies and northern Ghana development.',
      established: '1992',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#0d9488'
    },
    {
      id: 'umat',
      name: 'University of Mines and Technology',
      nickname: 'UMAT',
      location: 'Tarkwa',
      region: 'Western',
      type: 'Public University',
      programs: ['Mining Engineering', 'Geological Engineering', 'Environmental Engineering', 'Business'],
      website: 'https://www.umat.edu.gh',
      description: 'Specialized university in mining, geological, and environmental sciences.',
      established: '2001',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    },
    {
      id: 'uhas',
      name: 'University of Health and Allied Sciences',
      nickname: 'UHAS',
      location: 'Ho',
      region: 'Volta',
      type: 'Public University',
      programs: ['Medicine', 'Nursing', 'Midwifery', 'Physician Assistant', 'Allied Health Sciences'],
      website: 'https://uhas.edu.gh',
      description: 'Specialized university focused on health sciences and allied health professions.',
      established: '2011',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-pink-600 to-rose-600',
      glowColor: '#ec4899'
    },
    {
      id: 'uenr',
      name: 'University of Energy and Natural Resources',
      nickname: 'UENR',
      location: 'Sunyani',
      region: 'Bono',
      type: 'Public University',
      programs: ['Energy Engineering', 'Natural Resources', 'Environmental Sciences', 'Business'],
      website: 'https://www.uenr.edu.gh',
      description: 'Specialized university in energy, natural resources, and environmental studies.',
      established: '2012',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-teal-600',
      glowColor: '#059669'
    },
    {
      id: 'upsa',
      name: 'University of Professional Studies, Accra',
      nickname: 'UPSA',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Public University',
      programs: ['Business', 'Accounting', 'Management', 'Law', 'IT', 'Public Administration'],
      website: 'https://upsa.edu.gh',
      description: 'Specialized university in business, management, and professional studies.',
      established: '1965',
      accreditation: 'National Accreditation Board (NAB)',
      studentCount: '10,000+',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },

    // Technical Universities
    {
      id: 'accra-technical-university',
      name: 'Accra Technical University',
      nickname: 'ATU',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Technical University',
      programs: ['Engineering', 'Applied Sciences', 'Business', 'Built Environment', 'Applied Arts'],
      website: 'http://www.atu.edu.gh',
      description: 'Leading technical university offering practical and industry-focused programs.',
      established: '1949',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-gray-600 to-slate-600',
      glowColor: '#64748b'
    },
    {
      id: 'kumasi-technical-university',
      name: 'Kumasi Technical University',
      nickname: 'KsTU',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'Technical University',
      programs: ['Engineering', 'Applied Sciences', 'Business', 'Built Environment', 'Art & Design'],
      website: 'https://www.kstu.edu.gh',
      description: 'Premier technical university in the Ashanti region, known for engineering excellence.',
      established: '1954',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-gray-600 to-slate-600',
      glowColor: '#64748b'
    },
    {
      id: 'cape-coast-technical-university',
      name: 'Cape Coast Technical University',
      nickname: 'CCTU',
      location: 'Cape Coast',
      region: 'Central',
      type: 'Technical University',
      programs: ['Engineering', 'Applied Sciences', 'Business', 'Hospitality', 'Applied Arts'],
      website: 'https://cctu.edu.gh',
      description: 'Technical university offering practical education in the Central region.',
      established: '1962',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-gray-600 to-slate-600',
      glowColor: '#64748b'
    },
    {
      id: 'takoradi-technical-university',
      name: 'Takoradi Technical University',
      nickname: 'TTU',
      location: 'Takoradi',
      region: 'Western',
      type: 'Technical University',
      programs: ['Engineering', 'Applied Sciences', 'Business', 'Maritime Studies', 'Applied Arts'],
      website: 'https://ttu.edu.gh',
      description: 'Technical university specializing in maritime and engineering programs.',
      established: '1954',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-gray-600 to-slate-600',
      glowColor: '#64748b'
    },

    // Premier Private Universities
    {
      id: 'ashesi-university',
      name: 'Ashesi University',
      nickname: 'Ashesi',
      location: 'Berekuso',
      region: 'Eastern',
      type: 'Private University',
      programs: ['Computer Science', 'Engineering', 'Business', 'Liberal Arts'],
      website: 'https://www.ashesi.edu.gh',
      description: 'Leading private university known for innovation, leadership, and ethical education.',
      established: '2002',
      accreditation: 'National Accreditation Board (NAB)',
      studentCount: '1,253',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-cyan-600',
      glowColor: '#0891b2'
    },
    {
      id: 'central-university',
      name: 'Central University',
      nickname: 'Central',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Private University',
      programs: ['Business', 'IT', 'Engineering', 'Health Sciences', 'Arts', 'Law'],
      website: 'https://central.edu.gh',
      description: 'Leading private university with strong programs in business and technology.',
      established: '1998',
      accreditation: 'National Accreditation Board (NAB)',
      studentCount: '8,400',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#a855f7'
    },
    {
      id: 'lancaster-university-ghana',
      name: 'Lancaster University Ghana',
      nickname: 'LUG',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Private University',
      programs: ['Business', 'Computer Science', 'Accounting', 'Law', 'Psychology'],
      website: 'https://lancaster.edu.gh',
      description: 'Branch campus of UK\'s Lancaster University, offering British-standard education.',
      established: '2013',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-orange-600',
      glowColor: '#dc2626'
    },
    {
      id: 'valley-view-university',
      name: 'Valley View University',
      nickname: 'VVU',
      location: 'Oyibi',
      region: 'Greater Accra',
      type: 'Private University',
      programs: ['Business', 'IT', 'Health Sciences', 'Education', 'Theology'],
      website: 'https://vvu.edu.gh',
      description: 'Seventh-day Adventist university offering holistic education with Christian values.',
      established: '1979',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'pentecost-university',
      name: 'Pentecost University',
      nickname: 'Pent Vars',
      location: 'Sowutuom',
      region: 'Greater Accra',
      type: 'Private University',
      programs: ['Business', 'IT', 'Engineering', 'Theology', 'Health Sciences'],
      website: 'https://pentvars.edu.gh',
      description: 'Pentecostal university combining academic excellence with Christian values.',
      established: '2003',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-yellow-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'all-nations-university',
      name: 'All Nations University',
      nickname: 'ANU',
      location: 'Koforidua',
      region: 'Eastern',
      type: 'Private University',
      programs: ['Engineering', 'Business', 'IT', 'Pharmacy', 'Medicine'],
      website: 'https://anu.edu.gh',
      description: 'Private university with strong programs in engineering and health sciences.',
      established: '2002',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-blue-600',
      glowColor: '#0d9488'
    },
    {
      id: 'webster-university-ghana',
      name: 'Webster University Ghana',
      nickname: 'Webster',
      location: 'East Legon, Accra',
      region: 'Greater Accra',
      type: 'Private University',
      programs: ['Business', 'International Relations', 'Psychology', 'Computer Science'],
      website: 'https://webster.edu.gh',
      description: 'Branch campus of Webster University (USA), offering American-standard education.',
      established: '2012',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'presbyterian-university-college',
      name: 'Presbyterian University College',
      nickname: 'PUC',
      location: 'Abetifi-Kwahu',
      region: 'Eastern',
      type: 'Private University',
      programs: ['Business', 'IT', 'Development Studies', 'Theology', 'Health Sciences'],
      website: 'https://presbyuniversity.edu.gh',
      description: 'Presbyterian university offering quality education with Christian values.',
      established: '2003',
      accreditation: 'National Accreditation Board (NAB)',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    }
  ];

  const universityTypes = ['All', 'Public University', 'Private University', 'Technical University', 'Professional Institute'];

  const filteredUniversities = universities.filter(university => {
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
        title="Local Universities in Ghana | St. Louis Demonstration JHS"
        description="Explore Ghana's premier universities with our comprehensive directory of public and private institutions. Discover accredited degree programs, admission requirements, tuition fees, and contact information for all major Ghanaian universities including University of Ghana, KNUST, UCC, and Ashesi University."
        keywords="universities Ghana, public universities Ghana, private universities Ghana, University of Ghana, KNUST, UCC, Ashesi University, higher education Ghana"
        url="/local-universities"
        type="website"
        pageType="students-hub"
        useGalleryImages={true}
      />

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              Local Universities in Ghana
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
              placeholder="Search universities, locations, or programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
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

      {/* Universities Grid */}
      <div className="px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredUniversities.map((university) => (
              <motion.div
                key={university.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br ${university.color} p-4 sm:p-6 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group`}
                style={{
                  boxShadow: `0 4px 20px ${university.glowColor}20, 0 0 0 1px ${university.glowColor}10`
                }}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`p-2 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm`}>
                    {university.icon}
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                    {university.type.replace(' University', '')}
                  </span>
                </div>

                <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-gray-100 transition-colors line-clamp-2">
                  {university.name}
                  {university.nickname && (
                    <span className="block text-xs sm:text-sm text-white/70 font-normal">
                      ({university.nickname})
                    </span>
                  )}
                </h3>

                <div className="flex items-center gap-1 sm:gap-2 text-white/80 mb-2 sm:mb-3">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">{university.location}</span>
                </div>

                <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {university.description}
                </p>

                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white/90 mb-1 sm:mb-2">Programs:</h4>
                    <div className="flex flex-wrap gap-1">
                      {university.programs.slice(0, 3).map((program, index) => (
                        <span
                          key={index}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 rounded-md text-xs text-white/80"
                        >
                          {program}
                        </span>
                      ))}
                      {university.programs.length > 3 && (
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 rounded-md text-xs text-white/80">
                          +{university.programs.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/20">
                    <div className="flex items-center gap-1 sm:gap-2 text-white/70">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs">Est. {university.established}</span>
                    </div>
                    <a
                      href={university.website}
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

          {filteredUniversities.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No universities found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalUniversitiesPage;
