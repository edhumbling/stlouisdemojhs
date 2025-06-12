import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Briefcase, MapPin, Search, Users, Award, Clock, Building, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface ProfessionalInstitute {
  id: string;
  name: string;
  nickname?: string;
  location: string;
  region: string;
  type: 'Professional Body' | 'Training Institute' | 'Certification Center' | 'Corporate Academy';
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

const ProfessionalInstitutesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const professionalInstitutes: ProfessionalInstitute[] = [
    // Accounting & Finance
    {
      id: 'icag',
      name: 'Institute of Chartered Accountants, Ghana',
      nickname: 'ICAG',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Professional Body',
      programs: ['Chartered Accountant (CA)', 'Professional Accountancy', 'Audit & Assurance', 'Taxation'],
      website: 'https://www.icagh.org',
      description: 'Premier professional accounting body in Ghana, responsible for certification and regulation of accountancy practice.',
      established: '1963',
      accreditation: 'International Federation of Accountants (IFAC)',
      duration: '3-4 years',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'ica-ghana',
      name: 'Institute of Chartered Accountants (Ghana)',
      nickname: 'ICA Ghana',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Professional Body',
      programs: ['ACCA Qualification', 'Professional Ethics', 'Financial Reporting', 'Management Accounting'],
      website: 'https://www.icaghana.org',
      description: 'Professional body offering internationally recognized accounting qualifications and continuing professional development.',
      established: '1970',
      accreditation: 'Association of Chartered Certified Accountants (ACCA)',
      duration: '2-3 years',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'gib',
      name: 'Ghana Institute of Bankers',
      nickname: 'GIB',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Professional Body',
      programs: ['Banking Diploma', 'Risk Management', 'Credit Analysis', 'Digital Banking'],
      website: 'https://www.gib.com.gh',
      description: 'Leading professional body for banking and finance education in Ghana.',
      established: '1960',
      accreditation: 'Bank of Ghana, International Banking Institutes',
      duration: '1-2 years',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-indigo-600',
      glowColor: '#7c3aed'
    },

    // Insurance & Risk Management
    {
      id: 'cii-ghana',
      name: 'Chartered Insurance Institute of Ghana',
      nickname: 'CII Ghana',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Professional Body',
      programs: ['Insurance Diploma', 'Risk Management', 'Claims Management', 'Underwriting'],
      website: 'https://www.cii.com.gh',
      description: 'Professional body for insurance practitioners offering qualifications and professional development.',
      established: '1972',
      accreditation: 'Chartered Insurance Institute (UK)',
      duration: '1-3 years',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },

    // Marketing & Sales
    {
      id: 'gim',
      name: 'Ghana Institute of Marketing',
      nickname: 'GIM',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Professional Body',
      programs: ['Marketing Diploma', 'Digital Marketing', 'Brand Management', 'Sales Management'],
      website: 'https://www.gim.com.gh',
      description: 'Professional marketing body providing marketing education and certification in Ghana.',
      established: '1979',
      accreditation: 'Chartered Institute of Marketing (UK)',
      duration: '1-2 years',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-pink-600 to-rose-600',
      glowColor: '#ec4899'
    },

    // Human Resources
    {
      id: 'ipm-ghana',
      name: 'Institute of Personnel Management Ghana',
      nickname: 'IPM Ghana',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Professional Body',
      programs: ['HR Diploma', 'Personnel Management', 'Industrial Relations', 'Organizational Development'],
      website: 'https://www.ipmghana.org',
      description: 'Leading HR professional body offering human resource management qualifications and development.',
      established: '1966',
      accreditation: 'Chartered Institute of Personnel Development (CIPD)',
      duration: '1-2 years',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#0d9488'
    },

    // Project Management
    {
      id: 'pmi-ghana',
      name: 'Project Management Institute Ghana',
      nickname: 'PMI Ghana',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Professional Body',
      programs: ['PMP Certification', 'Project Management', 'Agile Methodologies', 'Risk Management'],
      website: 'https://www.pmi.org.gh',
      description: 'Ghana chapter of PMI offering project management certification and professional development.',
      established: '2008',
      accreditation: 'Project Management Institute (PMI)',
      duration: '6 months - 1 year',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },

    // Information Technology
    {
      id: 'ics-ghana',
      name: 'Institute of ICT Professionals Ghana',
      nickname: 'ICS Ghana',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Professional Body',
      programs: ['IT Certification', 'Cybersecurity', 'Data Analytics', 'Software Development'],
      website: 'https://www.iipgh.org',
      description: 'Professional body for ICT practitioners offering technology certifications and training.',
      established: '2008',
      accreditation: 'International IT Certification Bodies',
      duration: '3 months - 1 year',
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-cyan-600 to-blue-600',
      glowColor: '#0891b2'
    },

    // Legal & Paralegal
    {
      id: 'gba',
      name: 'Ghana Bar Association',
      nickname: 'GBA',
      location: 'Accra',
      region: 'Greater Accra',
      type: 'Professional Body',
      programs: ['Legal Practice Course', 'Continuing Legal Education', 'Professional Ethics', 'Advocacy Skills'],
      website: 'https://www.ghanarbar.org',
      description: 'Professional body for legal practitioners offering continuing education and professional development.',
      established: '1958',
      accreditation: 'General Legal Council',
      duration: '6 months - 2 years',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-gray-600 to-slate-600',
      glowColor: '#64748b'
    }
  ];

  const instituteTypes = ['All', 'Professional Body', 'Training Institute', 'Certification Center', 'Corporate Academy'];

  const filteredInstitutes = professionalInstitutes.filter(institute => {
    const matchesSearch = institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institute.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institute.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institute.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (institute.nickname && institute.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'All' || institute.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Professional Institutes in Ghana | St. Louis Demonstration JHS"
        description="Comprehensive directory of professional institutes and certification bodies in Ghana. Find accounting, banking, marketing, HR, and other professional qualifications."
        keywords="professional institutes Ghana, ICAG, Ghana Institute of Bankers, professional certification, accounting qualification, banking diploma"
        url="/professional-institutes"
        type="website"
      />

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Professional Institutes
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
              placeholder="Search institutes, programs, or certifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {instituteTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                  selectedType === type
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Institutes Grid - Improved Mobile Layout */}
      <div className="px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredInstitutes.map((institute) => (
              <motion.div
                key={institute.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br ${institute.color} p-5 sm:p-6 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group min-h-[280px] sm:min-h-[320px] flex flex-col`}
                style={{
                  boxShadow: `0 4px 20px ${institute.glowColor}20, 0 0 0 1px ${institute.glowColor}10`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm`}>
                    {institute.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                    {institute.type.replace(' Body', '').replace(' Institute', '')}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition-colors line-clamp-2">
                  {institute.name}
                  {institute.nickname && (
                    <span className="block text-sm text-white/70 font-normal mt-1">
                      ({institute.nickname})
                    </span>
                  )}
                </h3>

                <div className="flex items-center gap-2 text-white/80 mb-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{institute.location}, {institute.region}</span>
                </div>

                <p className="text-white/70 text-sm mb-4 line-clamp-3 flex-grow">
                  {institute.description}
                </p>

                <div className="space-y-3 mt-auto">
                  <div>
                    <h4 className="text-sm font-semibold text-white/90 mb-2">Programs:</h4>
                    <div className="flex flex-wrap gap-1">
                      {institute.programs.slice(0, 3).map((program, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80"
                        >
                          {program}
                        </span>
                      ))}
                      {institute.programs.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80">
                          +{institute.programs.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{institute.duration || 'Varies'}</span>
                    </div>
                    <a
                      href={institute.website}
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

          {filteredInstitutes.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No institutes found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInstitutesPage;
