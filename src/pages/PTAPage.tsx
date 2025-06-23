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

      {/* Back Bar - Same as Media Page */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4">
        <div className="w-full px-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={handleBackClick}
              className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </motion.button>

            <div className="text-center flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-white">
                Parents & Teachers Association
              </h1>
            </div>

            <div className="w-16"></div>
          </div>
        </div>
      </div>

      {/* Hero Section - Edge to Edge */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-green-900/20 via-black to-blue-900/20">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Users className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
              Building Stronger Communities Together
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
              The St. Louis Demonstration JHS Parents and Teachers Association is dedicated to fostering
              collaboration between families and educators to ensure every student reaches their full potential.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-green-500/10 px-4 py-2 rounded-full border border-green-400/30">
                <span className="text-green-400 font-semibold">🤝 Unity</span>
              </div>
              <div className="bg-blue-500/10 px-4 py-2 rounded-full border border-blue-400/30">
                <span className="text-blue-400 font-semibold">📚 Excellence</span>
              </div>
              <div className="bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-400/30">
                <span className="text-yellow-400 font-semibold">🌟 Growth</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PTA Objectives Section */}
      <section className="py-8 sm:py-12 bg-gray-900/30">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Our <span className="text-green-400">Objectives</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              The core mission of our PTA is to create an environment where education thrives through collaboration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                    <div className="text-green-400">{objective.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{objective.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{objective.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Responsibilities Section */}
      <section className="py-8 sm:py-12">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              <span className="text-blue-400">Parent</span> Responsibilities
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              As partners in education, parents play a crucial role in their child's academic journey and overall development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {parentResponsibilities.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-blue-400 mr-2 mt-1">•</span>
                      <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Responsibilities Section */}
      <section className="py-8 sm:py-12 bg-gray-900/30">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              <span className="text-yellow-400">Teacher</span> Responsibilities
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Our dedicated educators are committed to providing quality education and nurturing every student's potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {teacherResponsibilities.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-yellow-500/10 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-yellow-400 mr-2 mt-1">•</span>
                      <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique PTA Features Section */}
      <section className="py-8 sm:py-12">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              What Makes Our <span className="text-green-400">PTA Unique</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/20"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-purple-400 mb-3">Monthly Forums</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Regular interactive sessions where parents and teachers discuss student progress,
                share concerns, and collaborate on solutions for academic and social challenges.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-red-500/10 backdrop-blur-sm rounded-xl p-6 border border-red-400/20"
            >
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-red-400 mb-3">Excellence Awards</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Recognition programs that celebrate outstanding achievements in academics,
                character development, community service, and extracurricular activities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-cyan-500/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20"
            >
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <Handshake className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Community Outreach</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Collaborative initiatives that extend learning beyond the classroom through
                community service projects, environmental programs, and cultural exchanges.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Feedback Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-green-900/20 via-black to-blue-900/20">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Get <span className="text-green-400">Involved</span> Today
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Your voice matters! Share your feedback, suggestions, or concerns to help us
              continuously improve our PTA and create the best possible educational environment for our students.
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-green-400/30 mb-6">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Contact Our PTA Coordinator</h3>
              </div>
              <p className="text-gray-300 mb-4">
                For feedback, complaints, suggestions, or to get more involved in PTA activities:
              </p>
              <a
                href="mailto:michelle@stlouisdemojhs.com?subject=PTA%20Feedback%20and%20Suggestions"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-2" />
                michelle@stlouisdemojhs.com
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-400/20">
                <h4 className="font-bold text-blue-400 mb-2">📝 Feedback</h4>
                <p className="text-gray-300 text-sm">Share your thoughts on PTA initiatives</p>
              </div>
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-400/20">
                <h4 className="font-bold text-yellow-400 mb-2">💡 Suggestions</h4>
                <p className="text-gray-300 text-sm">Propose new ideas for improvement</p>
              </div>
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-400/20">
                <h4 className="font-bold text-red-400 mb-2">⚠️ Concerns</h4>
                <p className="text-gray-300 text-sm">Report issues that need attention</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PTAPage;