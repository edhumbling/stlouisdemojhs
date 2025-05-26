import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Calculator, Microscope, Globe, Users, Languages, Palette, Computer, Wrench, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CoreAcademicPage: React.FC = () => {
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
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Core Academic Subjects
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Comprehensive BECE curriculum preparing students for academic excellence and future success
            </p>
          </motion.div>
        </div>
      </section>

      {/* BECE Subjects Grid */}
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
                description: "Comprehensive language arts focusing on reading, writing, speaking, listening, and literature analysis for effective communication.",
                color: "from-blue-500 to-cyan-500",
                skills: ["Reading Comprehension", "Essay Writing", "Grammar & Vocabulary", "Literature Analysis"]
              },
              {
                icon: <Calculator className="w-8 h-8" />,
                title: "Mathematics",
                description: "Core mathematical concepts including algebra, geometry, statistics, and problem-solving for analytical thinking.",
                color: "from-green-500 to-emerald-500",
                skills: ["Algebra & Equations", "Geometry & Mensuration", "Statistics & Probability", "Problem Solving"]
              },
              {
                icon: <Microscope className="w-8 h-8" />,
                title: "Integrated Science",
                description: "Comprehensive science education combining physics, chemistry, and biology with hands-on laboratory experiences.",
                color: "from-purple-500 to-violet-500",
                skills: ["Physics Concepts", "Chemistry Principles", "Biology & Life Sciences", "Scientific Method"]
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Social Studies",
                description: "Exploration of Ghanaian history, geography, civics, and cultural studies for national and global awareness.",
                color: "from-orange-500 to-red-500",
                skills: ["Ghanaian History", "Geography & Environment", "Civics & Government", "Cultural Studies"]
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Religious & Moral Education",
                description: "Character development through ethical reasoning, moral values, and spiritual formation for responsible citizenship.",
                color: "from-indigo-500 to-purple-500",
                skills: ["Moral Values", "Religious Studies", "Character Formation", "Ethical Reasoning"]
              },
              {
                icon: <Languages className="w-8 h-8" />,
                title: "Ghanaian Language (Asante Twi)",
                description: "Cultural heritage preservation through native language mastery, oral traditions, and cultural identity.",
                color: "from-yellow-500 to-orange-500",
                skills: ["Oral Communication", "Cultural Traditions", "Proverbs & Wisdom", "Language Structure"]
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "French",
                description: "International language skills for global communication, ECOWAS integration, and cultural exchange.",
                color: "from-pink-500 to-rose-500",
                skills: ["Conversational French", "Grammar & Vocabulary", "Cultural Awareness", "International Relations"]
              },
              {
                icon: <Wrench className="w-8 h-8" />,
                title: "Career Technology",
                description: "Practical skills in design, technology, and vocational preparation for technical and entrepreneurial careers.",
                color: "from-teal-500 to-cyan-500",
                skills: ["Technical Drawing", "Practical Skills", "Design Thinking", "Entrepreneurship"]
              },
              {
                icon: <Computer className="w-8 h-8" />,
                title: "Computing (ICT)",
                description: "Digital literacy, programming fundamentals, and technology skills for the modern digital world.",
                color: "from-blue-600 to-indigo-600",
                skills: ["Computer Literacy", "Programming Basics", "Digital Skills", "Technology Applications"]
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Creative Arts & Design",
                description: "Artistic expression through visual arts, design principles, and creative projects for cultural appreciation.",
                color: "from-purple-600 to-pink-600",
                skills: ["Visual Arts", "Design Principles", "Creative Expression", "Cultural Arts"]
              },
              {
                icon: <Music className="w-8 h-8" />,
                title: "Music",
                description: "Musical education including theory, performance, and appreciation of traditional and contemporary music.",
                color: "from-emerald-500 to-teal-500",
                skills: ["Music Theory", "Performance Skills", "Traditional Music", "Contemporary Styles"]
              }
            ].map((subject, index) => (
              <motion.div
                key={subject.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center text-white mr-4`}>
                    {subject.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{subject.title}</h3>
                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{subject.description}</p>
                <div className="space-y-1">
                  {subject.skills.map((skill, idx) => (
                    <div key={idx} className="text-xs text-blue-300 flex items-center">
                      <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* BECE Excellence Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-dark p-8 rounded-2xl mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">BECE Excellence at St. Louis Demo</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-300 mb-4">Our BECE Success</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>98%+ Pass Rate:</strong> Consistently excellent BECE results year after year</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Top Performers:</strong> Students regularly achieve aggregate scores of 6-15</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Subject Excellence:</strong> Outstanding performance across all 11 subjects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>SHS Placement:</strong> 95%+ students gain admission to top senior high schools</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Our Teaching Approach</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Interactive and engaging classroom instruction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Regular assessments and progress monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Extra classes and remedial support when needed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Mock examinations and BECE preparation programs</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Success Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Academic Achievement Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: "98%", label: "BECE Pass Rate" },
                { number: "11", label: "Core Subjects" },
                { number: "95%", label: "SHS Admission Rate" },
                { number: "47+", label: "Years of Excellence" }
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

export default CoreAcademicPage;
