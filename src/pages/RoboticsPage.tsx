import React, { useState } from 'react';
import { ArrowLeft, Bot, ExternalLink, Play, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';

const RoboticsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleBack = () => {
    navigate('/stem');
  };

  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Robotics & AI - Competitions, Companies & Innovation - St. Louis Demo JHS"
        description="Explore the world of robotics and artificial intelligence. Learn about global competitions, leading companies like Boston Dynamics and Tesla, and cutting-edge innovations in robotics technology."
        keywords="robotics, artificial intelligence, AI, Boston Dynamics, Tesla Optimus, robotics competitions, FIRST Robotics, VEX, robot technology, automation"
        canonicalUrl="https://stlouisdemojhs.com/robotics"
        ogImage="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      <Header />

      {/* Back Navigation Bar */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              <ArrowLeft size={20} />
              <span>Back to STEM</span>
            </button>
            <div className="flex items-center gap-2 text-gray-400">
              <Bot size={16} />
              <span className="text-sm">Robotics & AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Section */}
        <div
          className="relative h-64 sm:h-80 rounded-2xl mb-12 overflow-hidden"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
          <div className="relative h-full flex items-center justify-start px-8 sm:px-12">
            <div>
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
                Robotics & AI
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 max-w-2xl">
                Exploring the Future of Automation, Intelligence, and Human-Robot Collaboration
              </p>
            </div>
          </div>
        </div>

        {/* Word Document Style Content */}
        <div className="bg-black rounded-2xl p-8 sm:p-12 border border-gray-700/30 backdrop-blur-sm max-w-5xl mx-auto">

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-lg sm:text-xl leading-relaxed mb-6">
              <strong className="text-blue-300">Robotics and Artificial Intelligence</strong> represent the cutting edge of technological innovation, transforming industries from manufacturing and healthcare to space exploration and entertainment. This rapidly evolving field combines mechanical engineering, computer science, and artificial intelligence to create machines that can perceive, think, and act autonomously.
            </p>
          </div>

          {/* Global Robotics Competitions */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-blue-400">
              Global Robotics Competitions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-blue-300 mb-4 underline decoration-1 underline-offset-2">
                  International Competitions
                </h3>

                <div className="space-y-4 ml-4">
                  <div>
                    <h4 className="text-xl font-bold text-yellow-300 mb-2 underline decoration-1 underline-offset-2">
                      FIRST Robotics Competition (FRC)
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      The <strong className="text-blue-300">FIRST Robotics Competition</strong> is the world's largest high school robotics competition, engaging over 100,000 students from 4,000+ teams across 30+ countries. Teams have six weeks to design, build, and program robots weighing up to 125 pounds to compete in challenging field games. The 2024 season "CRESCENDO" featured robots scoring notes in speakers and amplifiers while climbing on stage.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-green-300 mb-2 underline decoration-1 underline-offset-2">
                      VEX Robotics Competition
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-green-300">VEX Robotics</strong> hosts the world's largest robotics competition with over 20,000 teams from 50+ countries. The competition spans multiple age groups from elementary through university level. The 2023-2024 season "Over Under" challenges teams to score triballs in goals and climb elevation bars, emphasizing strategic gameplay and alliance cooperation.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-purple-300 mb-2 underline decoration-1 underline-offset-2">
                      RoboCup International
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-purple-300">RoboCup</strong> aims to advance robotics and AI research through competitive robotics. The competition includes soccer-playing robots, rescue robots, and service robots. The ultimate goal is to develop a team of fully autonomous humanoid robots that can win against the human FIFA World Cup champions by 2050.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-orange-300 mb-4 underline decoration-1 underline-offset-2">
                  Regional & National Competitions
                </h3>

                <div className="grid md:grid-cols-2 gap-6 ml-4">
                  <div>
                    <h4 className="text-lg font-bold text-cyan-300 mb-2 underline decoration-1 underline-offset-2">
                      United States
                    </h4>
                    <ul className="space-y-2 text-base">
                      <li>• <strong className="text-yellow-300">DARPA Robotics Challenge:</strong> Advanced disaster response robots</li>
                      <li>• <strong className="text-blue-300">NASA Robotics Mining Competition:</strong> Autonomous excavation systems</li>
                      <li>• <strong className="text-green-300">SeaPerch Underwater ROV:</strong> Remotely operated vehicles</li>
                      <li>• <strong className="text-purple-300">BattleBots:</strong> Combat robotics entertainment</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-pink-300 mb-2 underline decoration-1 underline-offset-2">
                      China & Asia
                    </h4>
                    <ul className="space-y-2 text-base">
                      <li>• <strong className="text-red-300">World Robot Contest (WRC):</strong> China's premier robotics event</li>
                      <li>• <strong className="text-indigo-300">RoboMaster:</strong> Real-time strategy robot combat</li>
                      <li>• <strong className="text-teal-300">Asia-Pacific Robot Contest (ABU Robocon):</strong> University-level competition</li>
                      <li>• <strong className="text-orange-300">China Robot Competition:</strong> National championship series</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-red-300 mb-4 underline decoration-1 underline-offset-2">
                  Robotics in Ghana & Africa
                </h3>
                <div className="ml-4">
                  <p className="text-base leading-relaxed mb-4">
                    <strong className="text-green-300">Ghana</strong> is emerging as a hub for robotics education and innovation in West Africa. The country hosts several robotics competitions and educational programs:
                  </p>
                  <ul className="space-y-2 text-base mb-4">
                    <li>• <strong className="text-blue-300">Ghana Robotics Academy Foundation:</strong> Promoting STEM education through robotics</li>
                    <li>• <strong className="text-yellow-300">FIRST Global Ghana:</strong> Representing Ghana in international robotics olympics</li>
                    <li>• <strong className="text-purple-300">University of Ghana Robotics Club:</strong> Leading university-level robotics research</li>
                    <li>• <strong className="text-cyan-300">Ashesi University Robotics:</strong> Innovation in autonomous systems</li>
                  </ul>
                  <p className="text-base leading-relaxed">
                    The <strong className="text-orange-300">African Robotics Network (AFRON)</strong> promotes affordable robotics across the continent, with Ghana participating in the $10 Robot Design Challenge and hosting regional workshops for educators and students.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Leading Robotics Companies */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-green-400">
              Leading Robotics Companies
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-blue-300 mb-4 underline decoration-1 underline-offset-2">
                  Industry Giants & Innovators
                </h3>

                <div className="space-y-6 ml-4">
                  <div>
                    <h4 className="text-xl font-bold text-yellow-300 mb-3 underline decoration-1 underline-offset-2">
                      Boston Dynamics - Advanced Mobility Robots
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-blue-300">Boston Dynamics</strong> is renowned for creating the world's most advanced mobile robots. Their flagship robots include <strong className="text-green-300">Atlas</strong> (humanoid robot with parkour capabilities), <strong className="text-purple-300">Spot</strong> (quadruped robot for industrial inspection), and <strong className="text-yellow-300">Stretch</strong> (warehouse automation robot). Founded in 1992 as a spin-off from MIT, the company has revolutionized robotics with their dynamic movement algorithms and real-time balance control systems.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('fn3KWM1kuAw')}
                      >
                        <img
                          src="https://img.youtube.com/vi/fn3KWM1kuAw/maxresdefault.jpg"
                          alt="Boston Dynamics Atlas Robot"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Atlas Robot Parkour</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('wlkCQXHEgjA')}
                      >
                        <img
                          src="https://img.youtube.com/vi/wlkCQXHEgjA/maxresdefault.jpg"
                          alt="Boston Dynamics Spot Robot"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Spot Robot in Action</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-purple-300 mb-3 underline decoration-1 underline-offset-2">
                      Tesla - Optimus Humanoid Robot
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-purple-300">Tesla's Optimus</strong> represents Elon Musk's vision of general-purpose humanoid robots designed to perform dangerous, repetitive, or boring tasks. Standing 5'8" and weighing 125 pounds, Optimus is designed to navigate the human world using Tesla's Full Self-Driving computer and neural networks. The robot aims to revolutionize manufacturing and eventually assist with household tasks, potentially becoming more significant than Tesla's automotive business.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('XiQkeWOFwmk')}
                      >
                        <img
                          src="https://img.youtube.com/vi/XiQkeWOFwmk/maxresdefault.jpg"
                          alt="Tesla Optimus Robot"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Tesla Optimus Gen 2</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('cpraXaw7dyc')}
                      >
                        <img
                          src="https://img.youtube.com/vi/cpraXaw7dyc/maxresdefault.jpg"
                          alt="Tesla AI Day Optimus"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Optimus AI Day Demo</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-cyan-300 mb-3 underline decoration-1 underline-offset-2">
                      Other Major Robotics Companies
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-lg font-bold text-green-300 mb-2 underline decoration-1 underline-offset-2">
                          Industrial & Service Robots
                        </h5>
                        <ul className="space-y-2 text-base">
                          <li>• <strong className="text-yellow-300">ABB Robotics:</strong> Industrial automation and collaborative robots</li>
                          <li>• <strong className="text-blue-300">KUKA:</strong> German industrial robotics and automation</li>
                          <li>• <strong className="text-purple-300">FANUC:</strong> Japanese industrial robot manufacturer</li>
                          <li>• <strong className="text-red-300">Universal Robots:</strong> Collaborative robot (cobot) pioneers</li>
                          <li>• <strong className="text-orange-300">iRobot:</strong> Consumer robots (Roomba) and military systems</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-lg font-bold text-pink-300 mb-2 underline decoration-1 underline-offset-2">
                          AI & Autonomous Systems
                        </h5>
                        <ul className="space-y-2 text-base">
                          <li>• <strong className="text-indigo-300">Waymo:</strong> Autonomous vehicle technology leader</li>
                          <li>• <strong className="text-teal-300">Agility Robotics:</strong> Bipedal robots for logistics</li>
                          <li>• <strong className="text-lime-300">Figure AI:</strong> General-purpose humanoid robots</li>
                          <li>• <strong className="text-amber-300">1X Technologies:</strong> Android workforce robots</li>
                          <li>• <strong className="text-rose-300">Sanctuary AI:</strong> Human-like intelligence in robots</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Robotics Applications & Future */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-purple-400">
              Applications & Future of Robotics
            </h2>

            <div className="space-y-6 ml-4">
              <div>
                <h3 className="text-2xl font-bold text-orange-300 mb-4 underline decoration-1 underline-offset-2">
                  Current Applications
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-blue-300 mb-2 underline decoration-1 underline-offset-2">
                      Manufacturing
                    </h4>
                    <p className="text-sm leading-relaxed">
                      Automotive assembly lines, electronics manufacturing, quality control, and precision welding operations.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-green-300 mb-2 underline decoration-1 underline-offset-2">
                      Healthcare
                    </h4>
                    <p className="text-sm leading-relaxed">
                      Surgical robots, rehabilitation therapy, elderly care assistance, and pharmaceutical automation.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-purple-300 mb-2 underline decoration-1 underline-offset-2">
                      Space Exploration
                    </h4>
                    <p className="text-sm leading-relaxed">
                      Mars rovers, satellite servicing, space station maintenance, and planetary exploration missions.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-red-300 mb-4 underline decoration-1 underline-offset-2">
                  Future Possibilities
                </h3>
                <p className="text-base leading-relaxed mb-4">
                  The future of robotics promises unprecedented integration into daily life. <strong className="text-cyan-300">Humanoid robots</strong> may become common household assistants, while <strong className="text-yellow-300">autonomous systems</strong> revolutionize transportation and logistics. <strong className="text-green-300">AI-powered robots</strong> will likely achieve human-level dexterity and reasoning, enabling them to perform complex tasks in unstructured environments.
                </p>
                <p className="text-base leading-relaxed">
                  Key developments include <strong className="text-blue-300">brain-computer interfaces</strong> for direct robot control, <strong className="text-purple-300">swarm robotics</strong> for coordinated multi-robot systems, and <strong className="text-orange-300">soft robotics</strong> that can safely interact with humans and delicate objects.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="Robotics Video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoboticsPage;
