import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Heart, BookOpen, Target, Handshake, Mail, Phone, Calendar, Award, Shield, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

const PTAPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const objectives = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Educational Excellence",
      description: "Foster a collaborative environment that enhances the quality of education and academic achievement for all students."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Building",
      description: "Strengthen the bond between parents, teachers, and students to create a supportive school community."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Student Welfare",
      description: "Ensure the physical, emotional, and social well-being of all students within the school environment."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation & Development",
      description: "Promote innovative teaching methods and continuous improvement in educational practices."
    }
  ];

  const parentResponsibilities = [
    {
      title: "Academic Support",
      items: [
        "Monitor and assist with homework completion",
        "Attend parent-teacher conferences regularly",
        "Provide necessary learning materials and resources",
        "Create a conducive learning environment at home"
      ]
    },
    {
      title: "School Engagement",
      items: [
        "Participate actively in PTA meetings and events",
        "Volunteer for school activities and programs",
        "Support fundraising initiatives for school development",
        "Communicate regularly with teachers about child's progress"
      ]
    },
    {
      title: "Student Welfare",
      items: [
        "Ensure proper nutrition and health care",
        "Monitor child's social and emotional development",
        "Encourage positive behavior and discipline",
        "Support extracurricular activities and talents"
      ]
    },
    {
      title: "Community Partnership",
      items: [
        "Build positive relationships with other parents",
        "Advocate for school policies and improvements",
        "Share expertise and skills with the school community",
        "Promote the school's reputation in the wider community"
      ]
    }
  ];

  const teacherResponsibilities = [
    {
      title: "Academic Excellence",
      items: [
        "Deliver quality instruction aligned with curriculum standards",
        "Provide regular assessment and feedback to students",
        "Maintain professional development and continuous learning",
        "Create engaging and inclusive learning experiences"
      ]
    },
    {
      title: "Student Development",
      items: [
        "Foster critical thinking and problem-solving skills",
        "Support individual learning needs and styles",
        "Encourage creativity and innovation in learning",
        "Promote character development and moral values"
      ]
    },
    {
      title: "Communication & Collaboration",
      items: [
        "Maintain open communication with parents and guardians",
        "Collaborate effectively with fellow educators",
        "Participate actively in PTA initiatives and meetings",
        "Provide timely updates on student progress and concerns"
      ]
    },
    {
      title: "School Environment",
      items: [
        "Create a safe and supportive classroom atmosphere",
        "Implement effective classroom management strategies",
        "Contribute to school-wide policies and improvement initiatives",
        "Mentor and guide students beyond academic subjects"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Parents and Teachers Association (PTA) | St. Louis Demonstration JHS"
        description="Join the St. Louis Demo JHS PTA community. Learn about our objectives, parent and teacher responsibilities, and how we work together to enhance educational excellence and student welfare."
        keywords="PTA, parents teachers association, school community, educational excellence, student welfare, parent engagement, teacher collaboration"
        url="/pta"
        type="website"
        pageType="pta"
      />

      {/* Back Bar - Donate Page Style */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-2 sm:py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBackClick}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-700/50 hover:bg-red-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-red-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              🤝 Parents & Teachers Association
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section - Compact */}
      <section className="py-4 sm:py-6">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-white">
              Building Stronger Communities
            </h2>
            <p className="text-sm text-gray-300 mb-4 max-w-2xl mx-auto">
              Fostering collaboration between families and educators for student success.
            </p>
            <div className="flex justify-center gap-2">
              <span className="text-green-400 text-xs">🤝 Unity</span>
              <span className="text-blue-400 text-xs">📚 Excellence</span>
              <span className="text-yellow-400 text-xs">🌟 Growth</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PTA Objectives Section */}
      <section className="py-6 sm:py-8">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
              Our <span className="text-green-400">Objectives</span>
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm">
              Creating an environment where education thrives through collaboration.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-green-400/30 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <div className="text-green-400 text-sm">{objective.icon}</div>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{objective.title}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed">{objective.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Responsibilities Section */}
      <section className="py-6 sm:py-8 bg-gray-900/30">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
              <span className="text-blue-400">Parent</span> Responsibilities
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm">
              Partners in education supporting their child's journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {parentResponsibilities.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-blue-500/10 rounded-lg p-3 sm:p-4 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300"
              >
                <h3 className="text-sm font-bold text-blue-400 mb-2 flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  {category.title}
                </h3>
                <ul className="space-y-1">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-blue-400 mr-1 text-xs">•</span>
                      <span className="text-gray-300 text-xs leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Responsibilities Section */}
      <section className="py-6 sm:py-8">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
              <span className="text-yellow-400">Teacher</span> Responsibilities
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm">
              Dedicated educators providing quality education and nurturing potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {teacherResponsibilities.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-yellow-500/10 rounded-lg p-3 sm:p-4 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
              >
                <h3 className="text-sm font-bold text-yellow-400 mb-2 flex items-center">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {category.title}
                </h3>
                <ul className="space-y-1">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-yellow-400 mr-1 text-xs">•</span>
                      <span className="text-gray-300 text-xs leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique PTA Features Section */}
      <section className="py-6 sm:py-8 bg-gray-900/30">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
              What Makes Our <span className="text-green-400">PTA Unique</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-purple-500/10 rounded-lg p-3 sm:p-4 border border-purple-400/20 text-center"
            >
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-sm font-bold text-purple-400 mb-1">Monthly Forums</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Interactive sessions for progress discussions and collaboration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-red-500/10 rounded-lg p-3 sm:p-4 border border-red-400/20 text-center"
            >
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Award className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-sm font-bold text-red-400 mb-1">Excellence Awards</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Recognition for academic, character, and community achievements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-cyan-500/10 rounded-lg p-3 sm:p-4 border border-cyan-400/20 text-center col-span-2 lg:col-span-1"
            >
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Handshake className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold text-cyan-400 mb-1">Community Outreach</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Service projects and cultural exchanges beyond the classroom.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Feedback Section */}
      <section className="py-6 sm:py-8">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
              Get <span className="text-green-400">Involved</span> Today
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mb-4">
              Share feedback, suggestions, or concerns to improve our PTA.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-green-400/30 mb-4">
              <div className="flex items-center justify-center mb-2">
                <Mail className="w-5 h-5 text-green-400 mr-2" />
                <h3 className="text-sm font-bold text-white">PTA Coordinator</h3>
              </div>
              <a
                href="mailto:michelle@stlouisdemojhs.com?subject=PTA%20Feedback%20and%20Suggestions"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded transition-all duration-300"
              >
                <Mail className="w-3 h-3 mr-1" />
                michelle@stlouisdemojhs.com
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-center">
              <div className="bg-blue-500/10 p-2 rounded border border-blue-400/20">
                <h4 className="font-bold text-blue-400 text-xs mb-1">📝 Feedback</h4>
                <p className="text-gray-300 text-xs">Share thoughts</p>
              </div>
              <div className="bg-yellow-500/10 p-2 rounded border border-yellow-400/20">
                <h4 className="font-bold text-yellow-400 text-xs mb-1">💡 Suggestions</h4>
                <p className="text-gray-300 text-xs">New ideas</p>
              </div>
              <div className="bg-red-500/10 p-2 rounded border border-red-400/20 col-span-2 lg:col-span-1">
                <h4 className="font-bold text-red-400 text-xs mb-1">⚠️ Concerns</h4>
                <p className="text-gray-300 text-xs">Report issues</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PTAPage;