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

          {/* Robotics Research & Academic Excellence */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-cyan-400">
              Leading Robotics Research Institutions
            </h2>

            <div className="space-y-6 ml-4">
              <div>
                <h3 className="text-2xl font-bold text-blue-300 mb-4 underline decoration-1 underline-offset-2">
                  Top Universities & Research Labs
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-yellow-300 mb-3 underline decoration-1 underline-offset-2">
                      Massachusetts Institute of Technology (MIT)
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-blue-300">MIT's Computer Science and Artificial Intelligence Laboratory (CSAIL)</strong> is a world leader in robotics research. Notable projects include the <strong className="text-green-300">Cheetah robot</strong> (fastest running robot), <strong className="text-purple-300">Atlas humanoid development</strong> (in partnership with Boston Dynamics), and <strong className="text-yellow-300">soft robotics innovations</strong>. MIT researchers pioneered behavior-based robotics and continue advancing autonomous navigation, manipulation, and human-robot interaction.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-green-300 mb-3 underline decoration-1 underline-offset-2">
                      Carnegie Mellon University - Robotics Institute
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      The <strong className="text-green-300">Robotics Institute at CMU</strong> is the world's first and largest robotics research organization. Founded in 1979, it has produced groundbreaking work in <strong className="text-blue-300">autonomous vehicles</strong> (DARPA Grand Challenge winners), <strong className="text-purple-300">field robotics</strong>, and <strong className="text-orange-300">machine learning for robotics</strong>. CMU's robots have explored Antarctica, mapped underground mines, and pioneered self-driving car technology.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-purple-300 mb-3 underline decoration-1 underline-offset-2">
                      Stanford University - Artificial Intelligence Laboratory
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-purple-300">Stanford AI Lab (SAIL)</strong> focuses on human-centered AI and robotics. Their research includes <strong className="text-cyan-300">robotic manipulation</strong>, <strong className="text-red-300">autonomous driving</strong> (Stanford Racing Team), and <strong className="text-yellow-300">surgical robotics</strong>. Stanford developed the first autonomous vehicle to complete the DARPA Grand Challenge and continues leading research in robot learning and perception.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-cyan-300 mb-3 underline decoration-1 underline-offset-2">
                      Other Leading Institutions
                    </h4>
                    <ul className="space-y-2 text-base">
                      <li>• <strong className="text-blue-300">Georgia Tech:</strong> Humanoid robotics and AI ethics</li>
                      <li>• <strong className="text-green-300">UC Berkeley:</strong> Robot learning and computer vision</li>
                      <li>• <strong className="text-purple-300">University of Washington:</strong> Medical robotics and HCI</li>
                      <li>• <strong className="text-yellow-300">ETH Zurich:</strong> Autonomous systems and drones</li>
                      <li>• <strong className="text-red-300">University of Tokyo:</strong> Humanoid and service robots</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Robotics Market & Industry Statistics */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-orange-400">
              Robotics Market & Industry Growth
            </h2>

            <div className="space-y-6 ml-4">
              <div>
                <h3 className="text-2xl font-bold text-orange-300 mb-4 underline decoration-1 underline-offset-2">
                  Global Market Statistics
                </h3>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-600/40">
                    <h4 className="text-lg font-bold text-blue-300 mb-2">Market Size 2024</h4>
                    <p className="text-3xl font-bold text-white mb-2">$51.8B</p>
                    <p className="text-sm text-gray-300">Global robotics market revenue</p>
                  </div>

                  <div className="bg-green-900/30 rounded-xl p-6 border border-green-600/40">
                    <h4 className="text-lg font-bold text-green-300 mb-2">Projected 2029</h4>
                    <p className="text-3xl font-bold text-white mb-2">$73.0B</p>
                    <p className="text-sm text-gray-300">9.49% annual growth rate</p>
                  </div>

                  <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-600/40">
                    <h4 className="text-lg font-bold text-purple-300 mb-2">Industrial Robots</h4>
                    <p className="text-3xl font-bold text-white mb-2">4M+</p>
                    <p className="text-sm text-gray-300">Robots working in factories worldwide</p>
                  </div>
                </div>

                <p className="text-base leading-relaxed mb-4">
                  The <strong className="text-blue-300">global robotics industry</strong> is experiencing unprecedented growth, driven by advances in AI, decreasing hardware costs, and increasing demand for automation. <strong className="text-green-300">Industrial robotics</strong> dominates the market, accounting for over 60% of total revenue, while <strong className="text-purple-300">service robotics</strong> is the fastest-growing segment with applications in healthcare, logistics, and consumer markets.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-yellow-300 mb-3 underline decoration-1 underline-offset-2">
                      Key Growth Drivers
                    </h4>
                    <ul className="space-y-2 text-base">
                      <li>• <strong className="text-blue-300">Labor Shortages:</strong> Aging populations in developed countries</li>
                      <li>• <strong className="text-green-300">Cost Reduction:</strong> 50% decrease in robot prices over 10 years</li>
                      <li>• <strong className="text-purple-300">AI Advancement:</strong> Machine learning and computer vision breakthroughs</li>
                      <li>• <strong className="text-orange-300">Pandemic Impact:</strong> Accelerated automation adoption</li>
                      <li>• <strong className="text-cyan-300">5G Networks:</strong> Enhanced connectivity for remote operations</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-red-300 mb-3 underline decoration-1 underline-offset-2">
                      Regional Markets
                    </h4>
                    <ul className="space-y-2 text-base">
                      <li>• <strong className="text-blue-300">Asia-Pacific:</strong> 65% of global robot installations</li>
                      <li>• <strong className="text-green-300">China:</strong> World's largest robot market (52% share)</li>
                      <li>• <strong className="text-purple-300">North America:</strong> $8.2B market, 15% growth</li>
                      <li>• <strong className="text-yellow-300">Europe:</strong> Strong automotive and manufacturing sectors</li>
                      <li>• <strong className="text-orange-300">Emerging Markets:</strong> Africa, Latin America showing rapid adoption</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Robotics Applications */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-red-400">
              Advanced Robotics Applications
            </h2>

            <div className="space-y-6 ml-4">
              <div>
                <h3 className="text-2xl font-bold text-red-300 mb-4 underline decoration-1 underline-offset-2">
                  Medical & Healthcare Robotics
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-bold text-blue-300 mb-3 underline decoration-1 underline-offset-2">
                      Surgical Robotics Revolution
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-blue-300">Da Vinci Surgical Systems</strong> by Intuitive Surgical have revolutionized minimally invasive surgery. With over 7,000 systems worldwide, these robots enable surgeons to perform complex procedures through tiny incisions with enhanced precision, 3D visualization, and tremor elimination. The system has been used in over 10 million procedures across urology, gynecology, cardiothoracic, and general surgery.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('QYRdaWK7wgY')}
                      >
                        <img
                          src="https://img.youtube.com/vi/QYRdaWK7wgY/maxresdefault.jpg"
                          alt="Da Vinci Surgical Robot"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Da Vinci Surgery Demo</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('0XdC1HUp-rU')}
                      >
                        <img
                          src="https://img.youtube.com/vi/0XdC1HUp-rU/maxresdefault.jpg"
                          alt="Medical Robotics Future"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Future of Medical Robots</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-lg font-bold text-green-300 mb-2 underline decoration-1 underline-offset-2">
                          Rehabilitation Robots
                        </h5>
                        <p className="text-sm leading-relaxed">
                          <strong className="text-green-300">Lokomat</strong> gait training systems, <strong className="text-blue-300">ReWalk</strong> exoskeletons for spinal cord patients, and <strong className="text-purple-300">HAL</strong> (Hybrid Assistive Limb) suits for mobility assistance.
                        </p>
                      </div>

                      <div>
                        <h5 className="text-lg font-bold text-yellow-300 mb-2 underline decoration-1 underline-offset-2">
                          Pharmacy Automation
                        </h5>
                        <p className="text-sm leading-relaxed">
                          <strong className="text-yellow-300">PillPick</strong> systems, <strong className="text-cyan-300">IV compounding robots</strong>, and automated dispensing systems reducing medication errors by 85% while increasing efficiency.
                        </p>
                      </div>

                      <div>
                        <h5 className="text-lg font-bold text-orange-300 mb-2 underline decoration-1 underline-offset-2">
                          Elderly Care Robots
                        </h5>
                        <p className="text-sm leading-relaxed">
                          <strong className="text-orange-300">PARO</strong> therapeutic seals, <strong className="text-pink-300">Pepper</strong> companion robots, and <strong className="text-indigo-300">TUG</strong> hospital delivery robots improving patient care and reducing staff workload.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-purple-300 mb-4 underline decoration-1 underline-offset-2">
                  Military & Defense Applications
                </h3>

                <div className="space-y-4">
                  <p className="text-base leading-relaxed mb-4">
                    <strong className="text-purple-300">Military robotics</strong> represents one of the most advanced and controversial applications of robotic technology. The U.S. Department of Defense has over <strong className="text-red-300">800 active AI projects</strong>, with DARPA leading breakthrough research in autonomous systems, battlefield robotics, and unmanned vehicles.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-blue-300 mb-3 underline decoration-1 underline-offset-2">
                        Unmanned Systems
                      </h4>
                      <ul className="space-y-2 text-base">
                        <li>• <strong className="text-yellow-300">MQ-9 Reaper Drones:</strong> Long-endurance surveillance and strike missions</li>
                        <li>• <strong className="text-green-300">PackBot:</strong> Explosive ordnance disposal and reconnaissance</li>
                        <li>• <strong className="text-blue-300">TALON Robots:</strong> Combat engineering and hazardous material handling</li>
                        <li>• <strong className="text-purple-300">Autonomous Underwater Vehicles:</strong> Naval mine detection and clearance</li>
                        <li>• <strong className="text-orange-300">Ghost Robotics Dogs:</strong> Perimeter security and patrol operations</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-red-300 mb-3 underline decoration-1 underline-offset-2">
                        DARPA Research Projects
                      </h4>
                      <ul className="space-y-2 text-base">
                        <li>• <strong className="text-cyan-300">Squad X:</strong> Human-machine teaming for small units</li>
                        <li>• <strong className="text-pink-300">Gremlins Program:</strong> Recoverable drone swarms</li>
                        <li>• <strong className="text-indigo-300">OFFSET:</strong> Urban swarm tactics and technologies</li>
                        <li>• <strong className="text-teal-300">Robotic Servicing:</strong> Satellite maintenance and repair</li>
                        <li>• <strong className="text-lime-300">ATLAS Program:</strong> Humanoid robots for disaster response</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-600/40 rounded-lg p-4 mt-4">
                    <h5 className="text-lg font-bold text-yellow-300 mb-2">⚠️ Ethical Considerations</h5>
                    <p className="text-sm leading-relaxed text-gray-200">
                      The development of <strong className="text-red-300">lethal autonomous weapons systems (LAWS)</strong> raises significant ethical concerns. International organizations, including the UN and Red Cross, advocate for regulations on fully autonomous weapons. The debate centers on accountability, proportionality, and the preservation of human control in life-and-death decisions.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-green-300 mb-4 underline decoration-1 underline-offset-2">
                  Space Exploration Robotics
                </h3>

                <div className="space-y-4">
                  <p className="text-base leading-relaxed mb-4">
                    <strong className="text-green-300">Space robotics</strong> enables humanity to explore environments too dangerous or distant for human presence. From Mars rovers to satellite servicing missions, robots serve as our eyes, hands, and tools in the cosmos.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-red-300 mb-2 underline decoration-1 underline-offset-2">
                        Mars Exploration
                      </h4>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-blue-300">Perseverance Rover:</strong> Sample collection and analysis</li>
                        <li>• <strong className="text-green-300">Ingenuity Helicopter:</strong> First powered flight on Mars</li>
                        <li>• <strong className="text-purple-300">Curiosity Rover:</strong> 12+ years of geological research</li>
                        <li>• <strong className="text-yellow-300">Future Missions:</strong> Sample return and human preparation</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-blue-300 mb-2 underline decoration-1 underline-offset-2">
                        Orbital Operations
                      </h4>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-cyan-300">Canadarm2:</strong> ISS assembly and maintenance</li>
                        <li>• <strong className="text-orange-300">OSAM-1:</strong> Satellite refueling demonstration</li>
                        <li>• <strong className="text-pink-300">ClearSpace-1:</strong> Space debris removal mission</li>
                        <li>• <strong className="text-indigo-300">Robotic Refueling:</strong> Extending satellite lifespans</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-purple-300 mb-2 underline decoration-1 underline-offset-2">
                        Deep Space Missions
                      </h4>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-teal-300">Voyager Probes:</strong> 45+ years of exploration</li>
                        <li>• <strong className="text-lime-300">New Horizons:</strong> Pluto and Kuiper Belt study</li>
                        <li>• <strong className="text-amber-300">Europa Clipper:</strong> Jupiter moon exploration</li>
                        <li>• <strong className="text-rose-300">Dragonfly:</strong> Titan helicopter mission</li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 mt-4"
                    onClick={() => openVideoModal('gm0b_ijaYMQ')}
                  >
                    <img
                      src="https://img.youtube.com/vi/gm0b_ijaYMQ/maxresdefault.jpg"
                      alt="Mars Perseverance Rover"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play size={40} className="text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-lg font-semibold text-white">Mars Perseverance Rover: Engineering Marvel</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emerging Technologies & Future Trends */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-pink-400">
              Emerging Technologies & Future Trends
            </h2>

            <div className="space-y-6 ml-4">
              <div>
                <h3 className="text-2xl font-bold text-pink-300 mb-4 underline decoration-1 underline-offset-2">
                  2024-2025 Breakthrough Technologies
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-cyan-300 mb-3 underline decoration-1 underline-offset-2">
                      Generative AI Integration
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-cyan-300">Large Language Models (LLMs)</strong> are being integrated into robotic systems, enabling natural language interaction and reasoning. <strong className="text-blue-300">Google's RT-2</strong> and <strong className="text-green-300">OpenAI's robotics research</strong> demonstrate robots that can understand complex instructions and adapt to new situations through language-based learning.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-yellow-300 mb-3 underline decoration-1 underline-offset-2">
                      Neuromorphic Computing
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-yellow-300">Brain-inspired processors</strong> like Intel's Loihi and IBM's TrueNorth enable robots to process sensory information with ultra-low power consumption. This technology promises <strong className="text-purple-300">real-time learning</strong> and <strong className="text-orange-300">adaptive behavior</strong> in resource-constrained environments.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-green-300 mb-3 underline decoration-1 underline-offset-2">
                      Soft Robotics Revolution
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-green-300">Bio-inspired soft robots</strong> use flexible materials and pneumatic actuators to safely interact with humans and delicate objects. Applications include <strong className="text-blue-300">medical devices</strong>, <strong className="text-purple-300">food handling</strong>, and <strong className="text-red-300">search and rescue operations</strong> in confined spaces.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-orange-300 mb-3 underline decoration-1 underline-offset-2">
                      Quantum-Enhanced Robotics
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-orange-300">Quantum sensors</strong> and <strong className="text-cyan-300">quantum computing algorithms</strong> are beginning to enhance robot perception and decision-making. Quantum-enhanced navigation, optimization, and machine learning promise exponential improvements in robotic capabilities.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-indigo-300 mb-4 underline decoration-1 underline-offset-2">
                  Future Predictions (2025-2040)
                </h3>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-600/40">
                      <h4 className="text-lg font-bold text-blue-300 mb-2">2025-2027</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Humanoid robots in factories</li>
                        <li>• Autonomous delivery widespread</li>
                        <li>• AI-powered surgical assistants</li>
                        <li>• Smart home robot integration</li>
                      </ul>
                    </div>

                    <div className="bg-green-900/30 rounded-lg p-4 border border-green-600/40">
                      <h4 className="text-lg font-bold text-green-300 mb-2">2028-2032</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• General-purpose home robots</li>
                        <li>• Autonomous construction crews</li>
                        <li>• Robot teachers and caregivers</li>
                        <li>• Self-repairing robot systems</li>
                      </ul>
                    </div>

                    <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-600/40">
                      <h4 className="text-lg font-bold text-purple-300 mb-2">2033-2040</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Human-level robot intelligence</li>
                        <li>• Robots outnumber humans (Musk prediction)</li>
                        <li>• Fully autonomous cities</li>
                        <li>• Robot-human hybrid workforces</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-600/40 mt-6">
                    <h4 className="text-xl font-bold text-pink-300 mb-3">🚀 Elon Musk's Bold Prediction</h4>
                    <p className="text-base leading-relaxed">
                      Tesla CEO Elon Musk predicts that by <strong className="text-yellow-300">2040</strong>, there will be more <strong className="text-blue-300">humanoid robots than humans</strong> on Earth. With Tesla's Optimus robot potentially costing <strong className="text-green-300">$20,000-$25,000</strong>, Musk envisions a future where robots handle most physical labor, fundamentally transforming the global economy and society.
                    </p>
                  </div>
                </div>
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
