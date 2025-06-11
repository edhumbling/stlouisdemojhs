import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, Globe, BookOpen, Users, Target, Award, Briefcase, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

const ScholarshipOpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();

  const scholarshipData = {
    title: "Scholarship Opportunities",
    description: "Your gateway to educational excellence and future success",
    sections: [
      {
        title: "Why Excel in JHS?",
        content: "Success in Junior High School opens doors to prestigious Senior High Schools, providing access to exclusive clubs, advanced resources, and specialized programs. This foundation is crucial for both academic and technical/vocational paths. By excelling in JHS, you position yourself for better opportunities in SHS, where you can start preparing for international opportunities like SAT classes and university applications.",
        icon: <Target className="w-6 h-6" />,
        color: "#FF6B35"
      },
      {
        title: "SAT Preparation Resources",
        content: "Several organizations in Ghana offer SAT preparation support. These resources are particularly valuable when you reach SHS, as they help prepare you for international university applications:",
        icon: <BookOpen className="w-6 h-6" />,
        color: "#4CAF50",
        items: [
          {
            name: "AFEX Hub",
            description: "Professional SAT preparation and college application support with proven track record",
            website: "http://www.afextestprep.com"
          },
          {
            name: "YAfGhana",
            description: "Provides free SAT training and scholarship opportunities for Ghanaian students",
            website: "https://yafghana.org"
          },
          {
            name: "EducationUSA Ghana",
            description: "U.S. Department of State's official source for U.S. higher education",
            website: "https://gh.usembassy.gov/education-culture/educationusa/"
          },
          {
            name: "Veritas Foundation",
            description: "Professional SAT preparation and college counseling services",
            website: "https://theveritasfoundation.co"
          },
          {
            name: "College Board Ghana",
            description: "Official SAT testing and preparation resources",
            website: "https://www.collegeboard.org"
          },
          {
            name: "Khan Academy SAT Prep",
            description: "Free official SAT practice tests and personalized study plans",
            website: "https://www.khanacademy.org/sat"
          }
        ]
      },
      {
        title: "Local Scholarship Opportunities",
        content: "Ghanaian universities and organizations offering scholarships for tertiary education:",
        icon: <Award className="w-6 h-6" />,
        color: "#2196F3",
        items: [
          {
            name: "Ghana Scholarship Secretariat",
            description: "Government scholarships for tertiary education",
            website: "https://scholarshipgh.com"
          },
          {
            name: "Mastercard Foundation Scholars Program",
            description: "Full scholarships at partner universities in Ghana",
            website: "https://mastercardfdn.org/scholars"
          },
          {
            name: "KNUST Scholarship Portal",
            description: "Various scholarships available at Kwame Nkrumah University of Science and Technology",
            website: "https://apps.knust.edu.gh/admissions"
          },
          {
            name: "University of Ghana Financial Aid",
            description: "Scholarships and financial support for UG students",
            website: "https://www.ug.edu.gh/students/financial-aid"
          },
          {
            name: "Ashesi University Scholarships",
            description: "Merit-based and need-based scholarships for undergraduate studies",
            website: "https://www.ashesi.edu.gh/admissions/scholarships.html"
          },
          {
            name: "Ghana Education Trust Fund (GETFund)",
            description: "Government scholarship fund for tertiary education",
            website: "https://getfund.gov.gh"
          },
          {
            name: "Ghana National Petroleum Corporation (GNPC) Foundation",
            description: "Scholarships for students in STEM fields",
            website: "https://gnpcfoundation.org"
          },
          {
            name: "Vodafone Ghana Foundation",
            description: "Scholarships and educational support programs",
            website: "https://www.vodafone.com.gh/foundation"
          },
          {
            name: "MTN Foundation",
            description: "Educational scholarships and support initiatives",
            website: "https://www.mtn.com.gh/mtn-foundation"
          },
          {
            name: "Ghana Cocoa Board (COCOBOD) Scholarships",
            description: "Scholarships for children of cocoa farmers",
            website: "https://cocobod.gh"
          },
          {
            name: "Dream Hive Scholarship",
            description: "A Hive of Dreams, A Buzz of Success",
            website: "https://dhscholarship.org"
          }
        ]
      },
      {
        title: "International Opportunities",
        content: "Global scholarship programs available to Ghanaian students:",
        icon: <Globe className="w-6 h-6" />,
        color: "#9C27B0",
        items: [
          {
            name: "Commonwealth Scholarships",
            description: "UK government scholarships for Commonwealth citizens",
            website: "https://cscuk.fcdo.gov.uk"
          },
          {
            name: "DAAD Scholarships",
            description: "German Academic Exchange Service scholarships",
            website: "https://www.daad.de/en"
          },
          {
            name: "Chevening Scholarships",
            description: "UK government's global scholarship programme",
            website: "https://www.chevening.org"
          },
          {
            name: "Fulbright Program",
            description: "US government's international educational exchange program",
            website: "https://gh.usembassy.gov/fulbright"
          },
          {
            name: "Erasmus+ Program",
            description: "EU scholarships for study and training in Europe",
            website: "https://erasmus-plus.ec.europa.eu"
          },
          {
            name: "Australia Awards",
            description: "Australian government scholarships for international students",
            website: "https://www.dfat.gov.au/people-to-people/australia-awards"
          },
          {
            name: "Chinese Government Scholarships",
            description: "Full and partial scholarships for study in China",
            website: "https://www.campuschina.org"
          },
          {
            name: "Japanese Government (MEXT) Scholarships",
            description: "Scholarships for international students in Japan",
            website: "https://www.studyinjapan.go.jp/en"
          },
          {
            name: "Korean Government Scholarship Program",
            description: "Full scholarships for undergraduate and graduate studies in Korea",
            website: "https://www.studyinkorea.go.kr"
          },
          {
            name: "Rotary Foundation Global Grants",
            description: "International scholarships for graduate-level studies",
            website: "https://www.rotary.org/en/our-programs/scholarships"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-silver-900 to-silver-800">
      <SEOHead
        title="Scholarship Opportunities | St. Louis Demonstration JHS"
        description="Comprehensive guide to scholarships, SAT preparation, and educational opportunities in Ghana and abroad for students at St. Louis Demonstration JHS."
        keywords="scholarships, SAT preparation, educational opportunities, Ghana scholarships, international scholarships, college preparation"
        url="/scholarship-opportunities"
        type="website"
      />
      
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate('/students-hub')}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Scholarship Opportunities
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {scholarshipData.sections.map((section, index) => (
            <section key={index} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: section.color }}
                >
                  {section.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {section.title}
                </h2>
              </div>
              <p className="text-silver-300 mb-6">
                {section.content}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                  >
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-[200px] bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:bg-gray-700/60 text-left relative overflow-hidden group flex flex-col"
                    >
                      {/* Background Gradient */}
                      <div
                        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${section.color}20 0%, transparent 50%)`
                        }}
                      />
                      {/* Content */}
                      <div className="flex-1">
                        {/* Title */}
                        <h3 className="text-sm font-bold text-white leading-tight group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                          {item.name}
                        </h3>
                        {/* Description */}
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 flex-1 mt-2">
                          {item.description}
                        </p>
                      </div>
                      {/* Action Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-700/30 mt-auto">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-purple-400 font-medium">
                            Visit Website
                          </span>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                          <ExternalLink size={10} className="text-purple-400 group-hover:text-purple-300" />
                        </div>
                      </div>
                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ScholarshipOpportunitiesPage; 