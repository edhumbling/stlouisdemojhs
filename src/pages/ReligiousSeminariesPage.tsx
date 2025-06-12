import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, BookOpen, MapPin, Search, Users, Award, Clock, Building, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface ReligiousSeminary {
  id: string;
  name: string;
  nickname?: string;
  location: string;
  region: string;
  type: 'Seminary' | 'Theological College' | 'Bible College' | 'Islamic Institute';
  programs: string[];
  website: string;
  description: string;
  established?: string;
  accreditation: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  duration?: string;
  denomination?: string;
}

const ReligiousSeminariesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const religiousSeminaries: ReligiousSeminary[] = [
    // Christian Seminaries
    {
      id: 'trinity-theological-seminary',
      name: 'Trinity Theological Seminary',
      nickname: 'Trinity Seminary',
      location: 'Legon, Accra',
      region: 'Greater Accra',
      type: 'Seminary',
      programs: ['Bachelor of Theology', 'Master of Divinity', 'Doctor of Ministry', 'Christian Education'],
      website: 'https://www.trinity.edu.gh',
      description: 'Premier ecumenical theological institution in Ghana and West Africa, training Christian leaders.',
      established: '1942',
      accreditation: 'National Accreditation Board, Association of Theological Institutions in Eastern Africa',
      duration: '3-4 years',
      denomination: 'Ecumenical',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'good-news-theological-college',
      name: 'Good News Theological College & Seminary',
      nickname: 'GNTCS',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Theological College',
      programs: ['Diploma in Theology', 'Bachelor of Theology', 'Master of Theology', 'Pastoral Ministry'],
      website: 'https://gntcs.edu.gh',
      description: 'Pentecostal theological institution training ministers and Christian workers.',
      established: '1986',
      accreditation: 'National Accreditation Board, Pentecostal World Fellowship',
      duration: '2-4 years',
      denomination: 'Pentecostal',
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#a855f7'
    },
    {
      id: 'methodist-university-college',
      name: 'Methodist University College Ghana',
      nickname: 'MUCG',
      location: 'Dansoman, Accra',
      region: 'Greater Accra',
      type: 'Theological College',
      programs: ['Theology & Religious Studies', 'Christian Education', 'Church Music', 'Pastoral Care'],
      website: 'https://mucg.edu.gh',
      description: 'Methodist institution offering theological education and general university programs.',
      established: '2000',
      accreditation: 'National Accreditation Board, World Methodist Council',
      duration: '3-4 years',
      denomination: 'Methodist',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },

    // Catholic Institutions
    {
      id: 'st-peter-regional-seminary',
      name: 'St. Peter\'s Regional Seminary',
      nickname: 'St. Peter\'s Seminary',
      location: 'Cape Coast',
      region: 'Central',
      type: 'Seminary',
      programs: ['Philosophy', 'Theology', 'Pastoral Formation', 'Spiritual Direction'],
      website: 'https://stpeters-seminary.edu.gh',
      description: 'Catholic regional seminary training priests for dioceses in Ghana and West Africa.',
      established: '1950',
      accreditation: 'Catholic Bishops Conference, Vatican Congregation for Catholic Education',
      duration: '6-8 years',
      denomination: 'Catholic',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626'
    },
    {
      id: 'catholic-university-college',
      name: 'Catholic University College of Ghana',
      nickname: 'CUCG',
      location: 'Fiapre, Sunyani',
      region: 'Bono',
      type: 'Theological College',
      programs: ['Religious Studies', 'Philosophy', 'Social Sciences', 'Development Studies'],
      website: 'https://cucg.edu.gh',
      description: 'Catholic university offering theological education alongside secular programs.',
      established: '2003',
      accreditation: 'National Accreditation Board, International Federation of Catholic Universities',
      duration: '3-4 years',
      denomination: 'Catholic',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },

    // Bible Colleges
    {
      id: 'christian-service-university-college',
      name: 'Christian Service University College',
      nickname: 'CSUC',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'Bible College',
      programs: ['Biblical Studies', 'Christian Ministry', 'Missions', 'Church Leadership'],
      website: 'https://csuc.edu.gh',
      description: 'Evangelical university college focusing on Christian service and biblical education.',
      established: '1974',
      accreditation: 'National Accreditation Board, Association for Biblical Higher Education',
      duration: '3-4 years',
      denomination: 'Evangelical',
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#0d9488'
    },
    {
      id: 'evangelical-presbyterian-university-college',
      name: 'Evangelical Presbyterian University College',
      nickname: 'EPUC',
      location: 'Ho',
      region: 'Volta',
      type: 'Theological College',
      programs: ['Theology', 'Religious Education', 'Church Administration', 'Youth Ministry'],
      website: 'https://epuc.edu.gh',
      description: 'Presbyterian institution training ministers and Christian educators.',
      established: '2003',
      accreditation: 'National Accreditation Board, World Communion of Reformed Churches',
      duration: '3-4 years',
      denomination: 'Presbyterian',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },

    // Islamic Institutions
    {
      id: 'islamic-university-college',
      name: 'Islamic University College Ghana',
      nickname: 'IUCG',
      location: 'East Legon, Accra',
      region: 'Greater Accra',
      type: 'Islamic Institute',
      programs: ['Islamic Studies', 'Arabic Language', 'Islamic Banking', 'Sharia Law'],
      website: 'https://iucg.edu.gh',
      description: 'Premier Islamic higher education institution in Ghana offering Islamic and contemporary studies.',
      established: '2004',
      accreditation: 'National Accreditation Board, Organization of Islamic Cooperation',
      duration: '3-4 years',
      denomination: 'Islamic',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-teal-600',
      glowColor: '#059669'
    },
    {
      id: 'al-furqan-islamic-foundation',
      name: 'Al-Furqan Islamic Foundation',
      nickname: 'Al-Furqan',
      location: 'Kumasi',
      region: 'Ashanti',
      type: 'Islamic Institute',
      programs: ['Quranic Studies', 'Islamic Jurisprudence', 'Arabic Literature', 'Islamic History'],
      website: 'https://alfurqan.edu.gh',
      description: 'Islamic educational foundation providing traditional and modern Islamic education.',
      established: '1995',
      accreditation: 'National Chief Imam Office, Islamic Educational Organizations',
      duration: '2-4 years',
      denomination: 'Islamic',
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    },

    // Specialized Religious Training
    {
      id: 'akrofi-christaller-institute',
      name: 'Akrofi-Christaller Institute of Theology, Mission and Culture',
      nickname: 'ACI',
      location: 'Akropong-Akuapem',
      region: 'Eastern',
      type: 'Theological College',
      programs: ['African Christianity', 'Mission Studies', 'Cultural Studies', 'Translation Studies'],
      website: 'https://aci.edu.gh',
      description: 'Specialized institute focusing on African Christianity, mission, and cultural studies.',
      established: '1987',
      accreditation: 'National Accreditation Board, International Association of Mission Studies',
      duration: '1-3 years',
      denomination: 'Ecumenical',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-cyan-600 to-blue-600',
      glowColor: '#0891b2'
    }
  ];

  const seminaryTypes = ['All', 'Seminary', 'Theological College', 'Bible College', 'Islamic Institute'];

  const filteredSeminaries = religiousSeminaries.filter(seminary => {
    const matchesSearch = seminary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seminary.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seminary.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seminary.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (seminary.nickname && seminary.nickname.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (seminary.denomination && seminary.denomination.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'All' || seminary.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Religious Seminaries & Theological Colleges in Ghana | St. Louis Demonstration JHS"
        description="Comprehensive directory of religious seminaries, theological colleges, and religious training institutions in Ghana. Find Christian, Islamic, and interfaith education programs."
        keywords="religious seminaries Ghana, theological colleges Ghana, Trinity Seminary, Islamic University College, Christian education, theology programs"
        url="/religious-seminaries"
        type="website"
      />

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-indigo-700/50 hover:bg-indigo-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-indigo-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                Religious Seminaries & Theological Colleges
              </h1>
              <p className="text-sm text-indigo-200 truncate">
                Religious education and theological training institutions
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
              placeholder="Search seminaries, programs, or denominations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {seminaryTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Seminaries Grid - Improved Mobile Layout */}
      <div className="px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredSeminaries.map((seminary) => (
              <motion.div
                key={seminary.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br ${seminary.color} p-5 sm:p-6 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group min-h-[280px] sm:min-h-[320px] flex flex-col`}
                style={{
                  boxShadow: `0 4px 20px ${seminary.glowColor}20, 0 0 0 1px ${seminary.glowColor}10`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm`}>
                    {seminary.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                    {seminary.denomination || seminary.type}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition-colors line-clamp-2">
                  {seminary.name}
                  {seminary.nickname && (
                    <span className="block text-sm text-white/70 font-normal mt-1">
                      ({seminary.nickname})
                    </span>
                  )}
                </h3>

                <div className="flex items-center gap-2 text-white/80 mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{seminary.location}, {seminary.region}</span>
                </div>

                <p className="text-white/70 text-sm mb-4 line-clamp-3 flex-grow">
                  {seminary.description}
                </p>

                <div className="space-y-3 mt-auto">
                  <div>
                    <h4 className="text-sm font-semibold text-white/90 mb-2">Programs:</h4>
                    <div className="flex flex-wrap gap-1">
                      {seminary.programs.slice(0, 3).map((program, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80"
                        >
                          {program}
                        </span>
                      ))}
                      {seminary.programs.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80">
                          +{seminary.programs.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{seminary.duration || 'Varies'}</span>
                    </div>
                    <a
                      href={seminary.website}
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

          {filteredSeminaries.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No seminaries found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReligiousSeminariesPage;
