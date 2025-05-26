import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Palette, Music, Camera, Mic, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreativeArtsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-pink-900">
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl">
              <Palette className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Creative Arts & Culture
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Celebrating Ghana's rich cultural heritage through artistic expression and creativity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Arts Programs */}
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
                icon: <Music className="w-8 h-8" />,
                title: "Music Program",
                description: "Traditional Ghanaian music, contemporary styles, choir, and instrumental training",
                activities: ["School Choir Group", "Traditional Drumming", "Modern Band", "Music Theory"]
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Choreography Group",
                description: "Traditional and modern dance, cultural performances, and movement expression",
                activities: ["Adowa Dance", "Contemporary Dance", "Cultural Festivals", "Performance Arts"]
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Visual Arts",
                description: "Drawing, painting, sculpture, and traditional Ghanaian art forms",
                activities: ["Kente Design", "Pottery & Ceramics", "Painting & Drawing", "Cultural Artifacts"]
              },
              {
                icon: <Mic className="w-8 h-8" />,
                title: "Drama & Theatre",
                description: "Storytelling, dramatic performances, and cultural narratives",
                activities: ["Traditional Stories", "Modern Theatre", "Public Speaking", "Cultural Plays"]
              },
              {
                icon: <Camera className="w-8 h-8" />,
                title: "Media Arts",
                description: "Photography, digital design, and multimedia creation",
                activities: ["Photography Club", "Digital Design", "Video Production", "Graphic Arts"]
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Cultural Heritage",
                description: "Preserving and celebrating Ghanaian traditions and customs",
                activities: ["Cultural Days", "Heritage Projects", "Traditional Crafts", "Storytelling"]
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
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white mr-4">
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{program.title}</h3>
                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{program.description}</p>
                <div className="space-y-1">
                  {program.activities.map((activity, idx) => (
                    <div key={idx} className="text-xs text-purple-300 flex items-center">
                      <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                      {activity}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Ghanaian Cultural Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-dark p-8 rounded-2xl mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Ghana's Rich Artistic Heritage</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-4">Traditional Arts</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Kente Weaving:</strong> Sacred cloth patterns telling stories of our heritage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Adinkra Symbols:</strong> Visual representations of wisdom and cultural values</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Traditional Drumming:</strong> Talking drums and rhythmic communication</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Oral Traditions:</strong> Anansi stories and cultural narratives</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pink-300 mb-4">Contemporary Expression</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Afrobeats and highlife music fusion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Modern Ghanaian cinema and storytelling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Contemporary visual arts and installations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Digital media and creative technology</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Extracurricular Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card p-8 rounded-2xl mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Creative Extracurriculars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "School Choir Group",
                  description: "Harmonious voices celebrating both traditional and contemporary music",
                  highlight: "Regional Competition Winners"
                },
                {
                  title: "Choreography Group",
                  description: "Dynamic dance performances showcasing Ghanaian culture",
                  highlight: "Cultural Festival Champions"
                },
                {
                  title: "Traditional Band",
                  description: "Authentic Ghanaian instruments and rhythms",
                  highlight: "Heritage Preservation Award"
                },
                {
                  title: "Drama Club",
                  description: "Theatrical performances and storytelling excellence",
                  highlight: "Best School Production 2023"
                },
                {
                  title: "Art Exhibition Team",
                  description: "Showcasing student creativity and cultural pride",
                  highlight: "National Youth Art Recognition"
                },
                {
                  title: "Cultural Ambassadors",
                  description: "Representing Ghanaian heritage at events",
                  highlight: "International Cultural Exchange"
                }
              ].map((activity, index) => (
                <div key={activity.title} className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{activity.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{activity.description}</p>
                  <div className="text-xs text-yellow-400 font-medium bg-yellow-400/10 px-2 py-1 rounded">
                    🏆 {activity.highlight}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Impact & Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass-dark p-8 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Creative Arts Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: "500+", label: "Students in Arts Programs" },
                { number: "25+", label: "Cultural Performances Annually" },
                { number: "15+", label: "Regional Arts Awards" },
                { number: "100%", label: "Cultural Heritage Participation" }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{stat.number}</div>
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

export default CreativeArtsPage;
