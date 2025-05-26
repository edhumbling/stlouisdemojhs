import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Globe, BookOpen, Users, Mic, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LanguageCommunicationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-slate-900 to-blue-900">
      {/* Back Button */}
      <div className="pt-20 pb-4 px-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-6 shadow-2xl">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Language & Communication
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Mastering multilingual communication for global citizenship and cultural preservation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Language Programs */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "English Language",
                description: "Comprehensive language arts focusing on reading, writing, speaking, and critical thinking",
                skills: ["Academic Writing", "Literature Analysis", "Public Speaking", "Critical Reading"]
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Ghanaian Language (Asante Twi)",
                description: "Preserving our cultural heritage through native language mastery and oral traditions",
                skills: ["Oral Traditions", "Cultural Stories", "Proverbs & Wisdom", "Traditional Communication"]
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "French Language",
                description: "International communication skills for West African integration and global opportunities",
                skills: ["Conversational French", "ECOWAS Integration", "Cultural Exchange", "International Relations"]
              }
            ].map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white mr-4">
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{program.title}</h3>
                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{program.description}</p>
                <div className="space-y-1">
                  {program.skills.map((skill, idx) => (
                    <div key={idx} className="text-xs text-green-300 flex items-center">
                      <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Ghana's Linguistic Landscape */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-dark p-8 rounded-2xl mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Ghana's Multilingual Heritage</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-300 mb-4">Local Languages</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Asante Twi:</strong> Most widely spoken Akan dialect in Ghana</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Cultural Preservation:</strong> Maintaining oral traditions and wisdom</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Community Connection:</strong> Strengthening local identity and belonging</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Proverbs & Wisdom:</strong> Traditional knowledge systems and values</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Global Languages</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>English:</strong> Official language and gateway to global opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>French:</strong> ECOWAS integration and West African cooperation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Digital Communication:</strong> Online literacy and global connectivity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Academic Excellence:</strong> University preparation and scholarship opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Communication Skills Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card p-8 rounded-2xl mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">21st Century Communication Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Mic className="w-8 h-8" />,
                  title: "Public Speaking",
                  description: "Confident presentation and oratory skills for leadership"
                },
                {
                  icon: <PenTool className="w-8 h-8" />,
                  title: "Creative Writing",
                  description: "Storytelling, poetry, and expressive writing techniques"
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Collaborative Communication",
                  description: "Teamwork, negotiation, and interpersonal skills"
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Digital Literacy",
                  description: "Online communication and media literacy skills"
                }
              ].map((skill, index) => (
                <div key={skill.title} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{skill.title}</h3>
                  <p className="text-gray-300 text-sm">{skill.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Real-World Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass-dark p-8 rounded-2xl mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Preparing for Ghana's Future</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-300 mb-4">Career Readiness</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Business communication and professional writing</li>
                  <li>• Media and journalism opportunities</li>
                  <li>• Tourism and hospitality industry</li>
                  <li>• International trade and diplomacy</li>
                  <li>• Education and cultural preservation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Academic Pathways</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• University of Ghana language programs</li>
                  <li>• International scholarship opportunities</li>
                  <li>• ECOWAS educational exchanges</li>
                  <li>• Cultural studies and linguistics</li>
                  <li>• Translation and interpretation careers</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Success Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Language Program Success</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: "98%", label: "English BECE Pass Rate" },
                { number: "85%", label: "Twi Fluency Achievement" },
                { number: "70%", label: "French Conversational Level" },
                { number: "100%", label: "Communication Skills Development" }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LanguageCommunicationPage;
