import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Microscope, Calculator, Cpu, Lightbulb, Atom, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEMEducationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-green-900">
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full mb-6 shadow-2xl">
              <Atom className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              STEM Education Excellence
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Preparing Ghana's next generation of scientists, engineers, and innovators
            </p>
          </motion.div>
        </div>
      </section>

      {/* STEM Components */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              {
                icon: <Microscope className="w-8 h-8" />,
                title: "Science",
                description: "Integrated Science covering Physics, Chemistry, and Biology with hands-on laboratory experiences",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <Calculator className="w-8 h-8" />,
                title: "Mathematics",
                description: "Advanced mathematical concepts from algebra to statistics, building analytical thinking skills",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Cpu className="w-8 h-8" />,
                title: "Technology",
                description: "Computing and ICT skills, programming fundamentals, and digital literacy for the modern world",
                color: "from-purple-500 to-violet-500"
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Engineering",
                description: "Design thinking, problem-solving, and practical engineering concepts through Career Technology",
                color: "from-orange-500 to-red-500"
              }
            ].map((component, index) => (
              <motion.div
                key={component.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${component.color} rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                  {component.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{component.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{component.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Ghana's STEM Landscape */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-dark p-8 rounded-2xl mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">STEM in Ghana's Context</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4">National Priorities</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Digital Ghana Agenda:</strong> Building a technology-driven economy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Mining & Energy:</strong> Sustainable resource management and renewable energy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Agriculture Innovation:</strong> Modern farming techniques and food security</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Healthcare Technology:</strong> Medical innovations and public health solutions</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-300 mb-4">Career Opportunities</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Software development and cybersecurity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Biomedical engineering and pharmaceuticals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Environmental science and climate research</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Telecommunications and fintech innovation</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Our STEM Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card p-8 rounded-2xl mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Our STEM Methodology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Hands-On Learning</h3>
                <p className="text-gray-300 text-sm">Laboratory experiments, practical projects, and real-world problem solving</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-green-300 mb-3">Innovation Focus</h3>
                <p className="text-gray-300 text-sm">Encouraging creativity, critical thinking, and entrepreneurial mindset</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <Cpu className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-purple-300 mb-3">Technology Integration</h3>
                <p className="text-gray-300 text-sm">Modern tools, software, and digital platforms for enhanced learning</p>
              </div>
            </div>
          </motion.div>

          {/* Success Stories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass-dark p-8 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Our STEM Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: "95%", label: "BECE Science Pass Rate" },
                { number: "40+", label: "Science Fair Awards" },
                { number: "200+", label: "STEM Graduates Annually" },
                { number: "15+", label: "University STEM Programs" }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</div>
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

export default STEMEducationPage;
