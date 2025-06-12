import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, BookOpen, MapPin, GraduationCap, Search, Users, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface TeacherInstitution {
  id: string;
  name: string;
  location: string;
  region: string;
  type: 'University' | 'College of Education' | 'Training College';
  programs: string[];
  website: string;
  description: string;
  established?: string;
  accreditation: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

const TeacherTrainingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const teacherInstitutions: TeacherInstitution[] = [
    // Premier University
    {
      id: 'uew',
      name: 'University of Education, Winneba (UEW)',
      location: 'Winneba',
      region: 'Central',
      type: 'University',
      programs: ['Bachelor of Education', 'Master of Education', 'PhD in Education', 'Early Childhood Education', 'Special Education'],
      website: 'https://www.uew.edu.gh',
      description: 'Premier teacher training university in Ghana, offering comprehensive education programs from diploma to PhD level.',
      established: '1992',
      accreditation: 'National Accreditation Board (NAB), National Teaching Council',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },

    // Major Colleges of Education
    {
      id: 'accra-coe',
      name: 'Accra College of Education',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'College of Education',
      programs: ['Diploma in Basic Education', 'Bachelor of Education (Primary)', 'Early Childhood Education'],
      website: 'https://acce.edu.gh',
      description: 'Leading college of education in the Greater Accra region, committed to excellence in teacher education.',
      established: '1909',
      accreditation: 'National Accreditation Board (NAB), National Teaching Council',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'presbyterian-coe-akropong',
      name: 'Presbyterian College of Education, Akropong',
      location: 'Akropong-Akuapem',
      region: 'Eastern',
      type: 'College of Education',
      programs: ['Diploma in Basic Education', 'Bachelor of Education', 'JHS Education', 'Primary Education'],
      website: 'https://presby-coe-akropong.edu.gh',
      description: 'Historic Presbyterian teacher training college with a strong tradition of educational excellence.',
      established: '1848',
      accreditation: 'National Accreditation Board (NAB), National Teaching Council',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-indigo-600',
      glowColor: '#7c3aed'
    },
    {
      id: 'st-louis-coe',
      name: 'St. Louis College of Education',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'College of Education',
      programs: ['Diploma in Basic Education', 'Bachelor of Education', 'Mathematics Education', 'Science Education'],
      website: 'https://stlouis-coe.edu.gh',
      description: 'Catholic college of education known for quality teacher training in mathematics and sciences.',
      established: '1962',
      accreditation: 'National Accreditation Board (NAB), National Teaching Council',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626'
    },
    {
      id: 'bagabaga-coe',
      name: 'Bagabaga College of Education',
      location: 'Tamale',
      region: 'Northern',
      type: 'College of Education',
      programs: ['Diploma in Basic Education', 'Bachelor of Education', 'Islamic Education', 'French Education'],
      website: 'https://bagabaga-coe.edu.gh',
      description: 'Leading teacher training institution serving the northern regions of Ghana.',
      established: '1944',
      accreditation: 'National Accreditation Board (NAB), National Teaching Council',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },
    {
      id: 'wesley-coe',
      name: 'Wesley College of Education',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'College of Education',
      programs: ['Diploma in Basic Education', 'Bachelor of Education', 'English Education', 'Social Studies'],
      website: 'https://wesley-coe.edu.gh',
      description: 'Methodist college of education with strong emphasis on holistic teacher development.',
      established: '1922',
      accreditation: 'National Accreditation Board (NAB), National Teaching Council',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#0d9488'
    },
    {
      id: 'mount-mary-coe',
      name: 'Mount Mary College of Education',
      location: 'Somanya',
      region: 'Eastern',
      type: 'College of Education',
      programs: ['Diploma in Basic Education', 'Bachelor of Education', 'Early Childhood Education', 'Special Education'],
      website: 'https://mountmary-coe.edu.gh',
      description: 'Catholic women\'s college of education specializing in early childhood and special education.',
      established: '1946',
      accreditation: 'National Accreditation Board (NAB), National Teaching Council',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-pink-600 to-rose-600',
      glowColor: '#ec4899'
    },
    {
      id: 'st-francis-coe',
      name: 'St. Francis College of Education',
      location: 'Hohoe',
      region: 'Volta',
      type: 'College of Education',
      programs: ['Diploma in Basic Education', 'Bachelor of Education', 'Technical Education', 'ICT Education'],
      website: 'https://stfrancis-coe.edu.gh',
      description: 'Catholic college of education with focus on technical and ICT education.',
      established: '1963',
      accreditation: 'National Accreditation Board (NAB), National Teaching Council',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'berekum-coe',
      name: 'Berekum College of Education',
      location: 'Berekum',
      region: 'Bono',
      type: 'College of Education',
      programs: ['Diploma in Basic Education', 'Bachelor of Education', 'Agricultural Science Education', 'Home Economics'],
      website: 'https://berekum-coe.edu.gh',
      description: 'Regional college of education serving the Bono and Ahafo regions.',
      established: '1953',
      accreditation: 'National Accreditation Board (NAB), National Teaching Council',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    },
    {
      id: 'holy-child-coe',
      name: 'Holy Child College of Education',
      location: 'Takoradi',
      region: 'Western',
      type: 'College of Education',
      programs: ['Diploma in Basic Education', 'Bachelor of Education', 'English Education', 'Social Studies'],
      website: 'https://holychild-coe.edu.gh',
      description: 'Catholic college of education serving the Western and Western North regions.',
      established: '1946',
      accreditation: 'National Accreditation Board (NAB), National Teaching Council',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-teal-600',
      glowColor: '#059669'
    }
  ];

  const institutionTypes = ['All', 'University', 'College of Education', 'Training College'];

  const filteredInstitutions = teacherInstitutions.filter(institution => {
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
        title="Teacher Training Institutions in Ghana | St. Louis Demonstration JHS"
        description="Comprehensive directory of teacher training colleges and education universities in Ghana. Find accredited programs, admission requirements, and contact information."
        keywords="teacher training Ghana, colleges of education Ghana, UEW, education universities, teacher education programs, teaching careers Ghana"
        url="/teacher-training"
        type="website"
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

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Teacher Training Institutions
            </h1>
              <p className="text-sm text-blue-200 truncate">
                Comprehensive directory of teacher education institutions in Ghana
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
              placeholder="Search institutions, locations, or programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
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
                    {institution.type.replace(' of Education', '').replace(' College', '')}
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
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No institutions found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherTrainingPage;
