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
            name: "CKodo Foundation",
            description: "Offers comprehensive SAT preparation programs and college application guidance",
            website: "https://ckodofoundation.org"
          },
          {
            name: "Ferdinand Quayson Foundation",
            description: "Provides free SAT training and scholarship opportunities for Ghanaian students",
            website: "https://yafghana.org"
          },
          {
            name: "EducationUSA Ghana",
            description: "U.S. Department of State's official source for U.S. higher education",
            website: "https://gh.usembassy.gov/education-culture/educationusa/"
          },
          {
            name: "The Learning Project",
            description: "Offers SAT preparation courses and college counseling services",
            website: "https://thelearningprojectgh.com"
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
          },
          {
            name: "Youth Bridge Foundation",
            description: "Provides free SAT preparation and college application support for underprivileged students",
            website: "https://youthbridgefoundation.org"
          },
          {
            name: "Ghana Education Project",
            description: "Offers free SAT prep resources and mentorship programs",
            website: "https://ghanaeducationproject.org"
          },
          {
            name: "DreamOval Foundation",
            description: "Provides digital SAT preparation resources and tech skills training",
            website: "https://dreamoval.org"
          },
          {
            name: "Ghana Think Foundation",
            description: "Offers free SAT prep workshops and college application guidance",
            website: "https://ghanathink.org"
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
      
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] bg-gradient-to-r from-purple-900/90 to-blue-900/90">
        <div className="absolute inset-0 bg-[url('https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7115.HEIC')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {scholarshipData.title}
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            {scholarshipData.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8">
          {scholarshipData.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl"
            >
              <div className="flex items-start gap-6 mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: section.color }}
                >
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">{section.content}</p>
                </div>
              </div>

              {section.items && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                      className="bg-white/5 hover:bg-white/10 rounded-xl p-6 transition-all duration-300 border border-white/10 hover:border-white/20"
                    >
                      <h3 className="text-xl font-semibold text-white mb-3">{item.name}</h3>
                      <p className="text-gray-300 mb-4">{item.description}</p>
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
                      >
                        Visit Website
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipOpportunitiesPage; 