import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Star, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

const SchoolAdministrationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  // Notable Teachers List
  const notableTeachers = [
    'Mr. Nyame Enock',
    'Mr Lawrence Tamakloe',
    'Mrs Grace Elsie',
    'Mr Eugene Essel',
    'Mrs Dora Antwi',
    'Mr Agyare',
    'Mr Clement Owusu Agyemang',
    'Mrs Dillys Tandoh',
    'Mr Agyabeng'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <SEOHead
        title="School Administration | St. Louis Demonstration JHS"
        description="Meet the dedicated administration team at St. Louis Demonstration JHS. Our experienced leadership provides guidance, support, and strategic direction to ensure educational excellence and student success."
        keywords="school administration, leadership team, headmaster, assistant headmaster, school management, educational leadership, St. Louis Demonstration JHS staff"
        url="/school-administration"
        type="website"
        pageType="faculty"
        useGalleryImages={true}
      />

      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <div className="flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                School Administration
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                Leadership dedicated to excellence in education
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Administration content will be added here in future */}
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Administration Team</h2>
          <p className="text-gray-300">Detailed administration profiles coming soon...</p>
        </div>
      </div>

      {/* Wall of Notable Teachers - Past & Present */}
      <div className="py-12 px-4">
        <div className="container mx-auto">
          {/* Notice Board Style Background */}
          <div className="relative">
            {/* Cork Board Background */}
            <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 rounded-2xl shadow-2xl border-8 border-amber-800 relative overflow-hidden">
              {/* Cork Board Texture Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 20% 20%, #8B4513 2px, transparent 2px),
                                   radial-gradient(circle at 80% 80%, #A0522D 1px, transparent 1px),
                                   radial-gradient(circle at 40% 60%, #CD853F 1.5px, transparent 1.5px)`,
                  backgroundSize: '60px 60px, 40px 40px, 80px 80px'
                }}></div>
              </div>

              {/* Push Pins in Corners */}
              <div className="absolute top-4 left-4 w-4 h-4 bg-red-500 rounded-full shadow-lg border-2 border-red-600"></div>
              <div className="absolute top-4 right-4 w-4 h-4 bg-blue-500 rounded-full shadow-lg border-2 border-blue-600"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 bg-green-500 rounded-full shadow-lg border-2 border-green-600"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 bg-yellow-500 rounded-full shadow-lg border-2 border-yellow-600"></div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-12">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Star className="w-8 h-8 text-amber-600" />
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-900">
                      WALL OF NOTABLE TEACHERS
                    </h2>
                    <Star className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="bg-amber-800 text-amber-100 px-4 py-2 rounded-lg inline-block font-bold text-lg sm:text-xl">
                    PAST & PRESENT
                  </div>
                </motion.div>

                {/* Teachers Grid */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid grid-cols-3 lg:grid-cols-8 gap-3 sm:gap-4 lg:gap-6 mb-8"
                >
                  {notableTeachers.map((teacher, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, rotateY: 90 }}
                      whileInView={{ opacity: 1, rotateY: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                      whileHover={{ scale: 1.05, rotateZ: 2 }}
                      className="relative"
                    >
                      {/* Paper Note Style */}
                      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 sm:p-4 transform rotate-1 hover:rotate-0 transition-all duration-300">
                        {/* Small push pin */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-400 rounded-full shadow-md border border-red-500"></div>

                        <div className="text-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                            {teacher.split(' ').map(name => name[0]).join('')}
                          </div>
                          <h3 className="font-bold text-gray-800 text-xs sm:text-sm lg:text-base leading-tight">
                            {teacher}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Contact Note */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="text-center"
                >
                  <div className="bg-yellow-200 border-l-4 border-yellow-500 p-4 sm:p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <MessageCircle className="w-6 h-6 text-yellow-700" />
                      <h3 className="font-bold text-yellow-800 text-lg sm:text-xl">
                        Missing from the List?
                      </h3>
                    </div>
                    <p className="text-yellow-800 text-sm sm:text-base leading-relaxed">
                      If your name is not included in our Wall of Notable Teachers, please reach out to
                      <strong className="text-yellow-900"> Emma</strong> and he will add you to the list.
                    </p>
                    <div className="mt-4 bg-yellow-300 rounded-lg p-3 inline-block">
                      <p className="font-bold text-yellow-900 text-sm sm:text-base">
                        📱 WhatsApp: <span className="text-lg">0208705290</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolAdministrationPage;