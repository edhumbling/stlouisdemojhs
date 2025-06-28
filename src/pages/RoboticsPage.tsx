import React, { useState } from 'react';
import { ArrowLeft, Bot, Play, X as CloseIcon } from 'lucide-react';
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
        canonical="https://stlouisdemojhs.com/robotics"
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
                      <a href="https://www.bostondynamics.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline font-bold">Boston Dynamics</a> is renowned for creating the world's most advanced mobile robots. Their flagship robots include <strong className="text-green-300">Atlas</strong> (humanoid robot with parkour capabilities), <strong className="text-purple-300">Spot</strong> (quadruped robot for industrial inspection), and <strong className="text-yellow-300">Stretch</strong> (warehouse automation robot). Founded in 1992 as a spin-off from MIT, the company has revolutionized robotics with their dynamic movement algorithms and real-time balance control systems.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('29ECwExc-_M')}
                      >
                        <img
                          src="https://img.youtube.com/vi/29ECwExc-_M/maxresdefault.jpg"
                          alt="Boston Dynamics New Atlas"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">All New Atlas Robot</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-purple-300 mb-3 underline decoration-1 underline-offset-2">
                      Tesla - Optimus Humanoid Robot
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <a href="https://www.tesla.com/optimus" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline font-bold">Tesla's Optimus</a> represents Elon Musk's vision of general-purpose humanoid robots designed to perform dangerous, repetitive, or boring tasks. Standing 5'8" and weighing 125 pounds, Optimus is designed to navigate the human world using Tesla's Full Self-Driving computer and neural networks. The robot aims to revolutionize manufacturing and eventually assist with household tasks, potentially becoming more significant than Tesla's automotive business.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('6v6dbxPlsXs')}
                      >
                        <img
                          src="https://img.youtube.com/vi/6v6dbxPlsXs/maxresdefault.jpg"
                          alt="Tesla We Robot Event"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">We Robot Cybercab Unveil</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-cyan-300 mb-3 underline decoration-1 underline-offset-2">
                      Agility Robotics - Digit Humanoid Revolution
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <a href="https://www.agilityrobotics.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline font-bold">Agility Robotics</a> has pioneered bipedal humanoid robots with their flagship <strong className="text-green-300">Digit robot</strong>. Standing 5'9" and weighing 140 pounds, Digit is designed for logistics and warehouse operations, capable of walking, climbing stairs, and manipulating objects in human environments. The company has secured major partnerships with Amazon and Ford for warehouse automation, demonstrating robots that can work alongside humans safely and efficiently.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('HQ1WEiMwWAY')}
                      >
                        <img
                          src="https://img.youtube.com/vi/HQ1WEiMwWAY/maxresdefault.jpg"
                          alt="Agility Robotics Digit"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Digit Robot Warehouse Demo</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('_sBBaNYex3E')}
                      >
                        <img
                          src="https://img.youtube.com/vi/_sBBaNYex3E/maxresdefault.jpg"
                          alt="Agility Robotics Factory"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Agility Robotics Factory Tour</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-pink-300 mb-3 underline decoration-1 underline-offset-2">
                      Figure AI - Next-Generation Humanoids
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <a href="https://www.figure.ai/" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline font-bold">Figure AI</a> is developing general-purpose humanoid robots with their <strong className="text-blue-300">Figure-01</strong> and latest <strong className="text-green-300">Helix model</strong>. The company has raised over $675 million from investors including OpenAI, Microsoft, and NVIDIA. Their robots feature advanced AI integration, natural language processing, and the ability to learn complex tasks through demonstration. Figure AI has partnerships with BMW for automotive manufacturing and is pioneering vision-language-action models for humanoid robotics.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('Sq1QZB5baNw')}
                      >
                        <img
                          src="https://img.youtube.com/vi/Sq1QZB5baNw/maxresdefault.jpg"
                          alt="Figure AI Robot"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Figure-01 Robot Demonstration</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('Z3yQHYNXPws')}
                      >
                        <img
                          src="https://img.youtube.com/vi/Z3yQHYNXPws/maxresdefault.jpg"
                          alt="Figure AI Helix"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Introducing Helix AI Model</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-orange-300 mb-3 underline decoration-1 underline-offset-2">
                      Honda Robotics - ASIMO Legacy & Beyond
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-orange-300">Honda</strong> pioneered humanoid robotics with <strong className="text-blue-300">ASIMO</strong>, the world's most advanced humanoid robot for over two decades. While ASIMO development has concluded, Honda continues robotics research focusing on practical applications including <strong className="text-green-300">mobility assistance robots</strong>, <strong className="text-purple-300">disaster response systems</strong>, and <strong className="text-yellow-300">avatar robots</strong> for remote presence. Honda's robotics division now emphasizes real-world utility over demonstration, developing robots for elderly care and rehabilitation.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('QdQL11uWWcI')}
                      >
                        <img
                          src="https://img.youtube.com/vi/QdQL11uWWcI/maxresdefault.jpg"
                          alt="Honda ASIMO"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">ASIMO Advanced Capabilities</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('ASoCJTYgYB0')}
                      >
                        <img
                          src="https://img.youtube.com/vi/ASoCJTYgYB0/maxresdefault.jpg"
                          alt="Honda Avatar Robot"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Honda Avatar Robot System</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-indigo-300 mb-3 underline decoration-1 underline-offset-2">
                      Unitree Robotics - Quadruped Innovation
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <a href="https://www.unitree.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 underline font-bold">Unitree Robotics</a> has revolutionized affordable quadruped robots with their <strong className="text-green-300">Go series</strong> and advanced <strong className="text-blue-300">B2 models</strong>. Starting at under $3,000, Unitree robots offer Boston Dynamics-level capabilities at consumer prices. Their robots feature advanced AI navigation, 4D LiDAR, and can perform complex maneuvers including backflips, dancing, and autonomous navigation. Unitree has democratized robotic dogs for research, security, and entertainment applications worldwide.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('X2UxtKLZnNo')}
                      >
                        <img
                          src="https://img.youtube.com/vi/X2UxtKLZnNo/maxresdefault.jpg"
                          alt="Unitree B2 Robot"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Unitree B2 Capabilities</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('yYUuWWnfRsk')}
                      >
                        <img
                          src="https://img.youtube.com/vi/yYUuWWnfRsk/maxresdefault.jpg"
                          alt="Unitree Go2 Robot"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Unitree Go2 Advanced Features</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-teal-300 mb-3 underline decoration-1 underline-offset-2">
                      Industrial Robotics Leaders
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-lg font-bold text-green-300 mb-2 underline decoration-1 underline-offset-2">
                          Manufacturing Giants
                        </h5>
                        <ul className="space-y-2 text-base">
                          <li>• <a href="https://new.abb.com/products/robotics" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline font-bold">ABB Robotics:</a> Swiss-Swedish leader in industrial automation with over 500,000 robots installed globally. Pioneers in collaborative robots and AI-powered manufacturing solutions.</li>
                          <li>• <a href="https://www.kuka.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline font-bold">KUKA:</a> German precision robotics company specializing in automotive manufacturing. Known for orange industrial robots and advanced human-robot collaboration systems.</li>
                          <li>• <a href="https://www.fanuc.com/" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline font-bold">FANUC:</a> Japanese industrial robot manufacturer with the largest installed base worldwide. Leaders in CNC systems and factory automation with distinctive yellow robots.</li>
                          <li>• <a href="https://www.universal-robots.com/" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline font-bold">Universal Robots:</a> Danish pioneers of collaborative robots (cobots). Revolutionized manufacturing with safe, easy-to-program robots that work alongside humans.</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-lg font-bold text-pink-300 mb-2 underline decoration-1 underline-offset-2">
                          Emerging AI Companies
                        </h5>
                        <ul className="space-y-2 text-base">
                          <li>• <a href="https://www.1x.tech/" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 underline font-bold">1X Technologies:</a> Norwegian company developing android workforce robots. Focus on safe, human-like robots for service industries and home assistance.</li>
                          <li>• <a href="https://sanctuary.ai/" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 underline font-bold">Sanctuary AI:</a> Canadian company creating human-like intelligence in general-purpose robots. Developing Phoenix robots with human-level dexterity and reasoning.</li>
                          <li>• <a href="https://apptronik.com/" target="_blank" rel="noopener noreferrer" className="text-lime-300 hover:text-lime-200 underline font-bold">Apptronik:</a> Texas-based humanoid robotics company developing Apollo robots for logistics and manufacturing. Focus on practical, deployable humanoid solutions.</li>
                          <li>• <a href="https://www.irobot.com/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 underline font-bold">iRobot:</a> Massachusetts company famous for Roomba vacuum robots. Expanding into military and professional cleaning robots with advanced navigation systems.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-rose-300 mb-3 underline decoration-1 underline-offset-2">
                      Specialized Robotics Companies
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-lg font-bold text-cyan-300 mb-2 underline decoration-1 underline-offset-2">
                          Autonomous Vehicles
                        </h5>
                        <ul className="space-y-1 text-sm">
                          <li>• <a href="https://waymo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline font-bold">Waymo:</a> Google's self-driving car division with over 20 million autonomous miles driven</li>
                          <li>• <a href="https://getcruise.com/" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline font-bold">Cruise:</a> GM's autonomous vehicle subsidiary focusing on urban robotaxis</li>
                          <li>• <a href="https://aurora.tech/" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline font-bold">Aurora:</a> Self-driving technology for trucking and passenger vehicles</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-lg font-bold text-orange-300 mb-2 underline decoration-1 underline-offset-2">
                          Medical Robotics
                        </h5>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong className="text-red-300">Intuitive Surgical:</strong> Da Vinci surgical systems leader with 7,000+ installations</li>
                          <li>• <strong className="text-yellow-300">Stryker:</strong> Orthopedic surgical robots and medical automation</li>
                          <li>• <strong className="text-pink-300">Medtronic:</strong> Robotic-assisted surgery and medical device automation</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-lg font-bold text-indigo-300 mb-2 underline decoration-1 underline-offset-2">
                          Service Robotics
                        </h5>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong className="text-teal-300">SoftBank Robotics:</strong> Pepper and NAO social robots for customer service</li>
                          <li>• <strong className="text-lime-300">Knightscope:</strong> Autonomous security robots for patrol and surveillance</li>
                          <li>• <strong className="text-amber-300">Savioke:</strong> Relay delivery robots for hotels and healthcare facilities</li>
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

          {/* Manufacturing & Industrial Robotics Revolution */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-yellow-400">
              Manufacturing & Industrial Robotics Revolution
            </h2>

            <div className="space-y-6 ml-4">
              <div>
                <h3 className="text-2xl font-bold text-yellow-300 mb-4 underline decoration-1 underline-offset-2">
                  Industry 4.0 & Smart Manufacturing
                </h3>

                <p className="text-base leading-relaxed mb-6">
                  <strong className="text-yellow-300">Industrial robotics</strong> forms the backbone of modern manufacturing, with over <strong className="text-blue-300">4 million robots</strong> currently operating in factories worldwide. The integration of AI, IoT, and advanced sensors has created <strong className="text-green-300">smart factories</strong> where robots collaborate seamlessly with human workers, adapt to changing production requirements, and optimize efficiency in real-time.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-blue-300 mb-3 underline decoration-1 underline-offset-2">
                      Automotive Manufacturing Leaders
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      The <strong className="text-blue-300">automotive industry</strong> remains the largest adopter of industrial robots, accounting for 30% of global installations. Companies like <strong className="text-green-300">Tesla</strong>, <strong className="text-purple-300">BMW</strong>, and <strong className="text-orange-300">Toyota</strong> have revolutionized production lines with fully automated assembly systems capable of producing vehicles with minimal human intervention.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('39cJQqSVU4I')}
                      >
                        <img
                          src="https://img.youtube.com/vi/39cJQqSVU4I/maxresdefault.jpg"
                          alt="Tesla Factory Robots"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={24} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-xs font-semibold text-white">Tesla Giga Texas Factory Tour</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('qhIBxieLJFE')}
                      >
                        <img
                          src="https://img.youtube.com/vi/qhIBxieLJFE/maxresdefault.jpg"
                          alt="BMW Factory Robots"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={24} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-xs font-semibold text-white">BMW Smart Factory</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-green-300 mb-3 underline decoration-1 underline-offset-2">
                      Electronics & Precision Manufacturing
                    </h4>
                    <p className="text-base leading-relaxed mb-3">
                      <strong className="text-green-300">Electronics manufacturing</strong> requires extreme precision and speed, making it ideal for robotic automation. Companies like <strong className="text-blue-300">Foxconn</strong> (Apple's manufacturer) and <strong className="text-purple-300">Samsung</strong> employ millions of robots for smartphone and computer assembly, achieving tolerances measured in micrometers.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('Q8u90WLLbBs')}
                      >
                        <img
                          src="https://img.youtube.com/vi/Q8u90WLLbBs/maxresdefault.jpg"
                          alt="Electronics Manufacturing"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={24} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-xs font-semibold text-white">Electronics Assembly Robots</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('DKe8ZKmMoQQ')}
                      >
                        <img
                          src="https://img.youtube.com/vi/DKe8ZKmMoQQ/maxresdefault.jpg"
                          alt="Precision Manufacturing"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={24} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-xs font-semibold text-white">Precision Robot Assembly</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-purple-300 mb-3 underline decoration-1 underline-offset-2">
                    Collaborative Robots (Cobots) Revolution
                  </h4>
                  <p className="text-base leading-relaxed mb-4">
                    <strong className="text-purple-300">Collaborative robots</strong> represent the fastest-growing segment of industrial robotics. Unlike traditional industrial robots that operate in safety cages, cobots work directly alongside humans, featuring advanced sensors and AI that enable safe interaction. The cobot market is projected to grow from $1.8 billion to over $12 billion by the end of the decade.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="text-lg font-bold text-cyan-300 mb-2 underline decoration-1 underline-offset-2">
                        Key Advantages
                      </h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-blue-300">Safety:</strong> Built-in collision detection and force limiting</li>
                        <li>• <strong className="text-green-300">Flexibility:</strong> Easy reprogramming for different tasks</li>
                        <li>• <strong className="text-purple-300">Cost-Effective:</strong> Lower installation and maintenance costs</li>
                        <li>• <strong className="text-yellow-300">User-Friendly:</strong> Intuitive programming interfaces</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-orange-300 mb-2 underline decoration-1 underline-offset-2">
                        Leading Applications
                      </h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-red-300">Assembly:</strong> Precision component installation</li>
                        <li>• <strong className="text-indigo-300">Quality Control:</strong> Automated inspection and testing</li>
                        <li>• <strong className="text-teal-300">Packaging:</strong> Flexible packaging and palletizing</li>
                        <li>• <strong className="text-pink-300">Machine Tending:</strong> Loading and unloading operations</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-lime-300 mb-2 underline decoration-1 underline-offset-2">
                        Market Leaders
                      </h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-amber-300">Universal Robots:</strong> 50% market share, UR series</li>
                        <li>• <strong className="text-rose-300">ABB:</strong> YuMi and GoFa collaborative robots</li>
                        <li>• <strong className="text-violet-300">KUKA:</strong> LBR iiwa sensitive robotics</li>
                        <li>• <strong className="text-emerald-300">Fanuc:</strong> CR series collaborative robots</li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 mt-4"
                    onClick={() => openVideoModal('iom_KcNiQQI')}
                  >
                    <img
                      src="https://img.youtube.com/vi/iom_KcNiQQI/maxresdefault.jpg"
                      alt="Collaborative Robots"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play size={40} className="text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-lg font-semibold text-white">Collaborative Robots Working with Humans</p>
                    </div>
                  </div>
                </div>
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
                      Regional Markets Distribution
                    </h4>

                    {/* Pie Chart Visualization */}
                    <div className="mb-6">
                      <div className="relative w-64 h-64 mx-auto mb-4">
                        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                          {/* Asia-Pacific: 65% */}
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="20"
                            strokeDasharray="325 500"
                            strokeDashoffset="0"
                            className="opacity-90"
                          />
                          {/* North America: 20% */}
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="20"
                            strokeDasharray="100 500"
                            strokeDashoffset="-325"
                            className="opacity-90"
                          />
                          {/* Europe: 12% */}
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#8B5CF6"
                            strokeWidth="20"
                            strokeDasharray="60 500"
                            strokeDashoffset="-425"
                            className="opacity-90"
                          />
                          {/* Others: 3% */}
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="20"
                            strokeDasharray="15 500"
                            strokeDashoffset="-485"
                            className="opacity-90"
                          />
                        </svg>

                        {/* Center Label */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-lg font-bold text-white">Global</p>
                            <p className="text-sm text-gray-300">Robot Market</p>
                          </div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span className="text-gray-200">Asia-Pacific (65%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="text-gray-200">North America (20%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-purple-500 rounded"></div>
                          <span className="text-gray-200">Europe (12%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                          <span className="text-gray-200">Others (3%)</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 text-base">
                      <li>• <strong className="text-blue-300">Asia-Pacific:</strong> 65% of global robot installations, led by manufacturing automation</li>
                      <li>• <strong className="text-green-300">China:</strong> World's largest robot market within Asia-Pacific region</li>
                      <li>• <strong className="text-purple-300">North America:</strong> $8.2B market, 15% annual growth rate</li>
                      <li>• <strong className="text-yellow-300">Europe:</strong> Strong automotive and precision manufacturing sectors</li>
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

          {/* Neuralink - Brain-Computer Interface Revolution */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-indigo-400">
              Neuralink - Brain-Computer Interface Revolution
            </h2>

            <div className="space-y-6 ml-4">
              <div>
                <h3 className="text-2xl font-bold text-indigo-300 mb-4 underline decoration-1 underline-offset-2">
                  Pioneering Brain Computer Interfaces
                </h3>

                <p className="text-base leading-relaxed mb-6">
                  <a href="https://neuralink.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 underline font-bold">Neuralink Corporation</a> represents one of the most revolutionary advances in neurotechnology and robotics. Founded by <strong className="text-blue-300">Elon Musk</strong> in 2016, Neuralink is developing implantable brain-computer interfaces (BCIs) that create direct communication pathways between the human brain and external devices. The company's mission is to restore autonomy to those with unmet medical needs today and unlock human potential tomorrow.
                </p>

                <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg p-6 border border-indigo-600/40 mb-6">
                  <h4 className="text-xl font-bold text-purple-300 mb-3">🧠 Revolutionary Technology</h4>
                  <p className="text-base leading-relaxed">
                    Neuralink's <strong className="text-cyan-300">N1 Chip</strong> contains over <strong className="text-yellow-300">1,024 electrodes</strong> that can record neural activity from thousands of neurons simultaneously. The chip is surgically implanted using a precision robot that can insert ultra-thin threads (thinner than human hair) into specific brain regions with micrometer accuracy, avoiding blood vessels and minimizing tissue damage.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-cyan-300 mb-4 underline decoration-1 underline-offset-2">
                    Current Human Trials & Patient Success Stories
                  </h4>

                  <div className="space-y-4 mb-6">
                    <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-600/40">
                      <h5 className="text-lg font-bold text-blue-300 mb-2">Three Successful Human Implants</h5>
                      <p className="text-base leading-relaxed mb-3">
                        As of early 2025, <strong className="text-green-300">three patients</strong> have successfully received Neuralink implants through the company's PRIME clinical trial (Precise Robotically Implanted Brain-Computer Interface). The first patient, <strong className="text-yellow-300">Noland Arbaugh</strong>, a quadriplegic, demonstrated remarkable capabilities including playing chess, controlling computers, and even playing video games using only his thoughts.
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-cyan-300">Patient 1 (Noland):</strong> Spinal cord injury, implanted January 2024</li>
                        <li>• <strong className="text-green-300">Patient 2:</strong> Spinal cord injury, implanted summer 2024</li>
                        <li>• <strong className="text-purple-300">Patient 3 (Bradford Smith):</strong> ALS patient, implanted early 2025</li>
                      </ul>
                    </div>

                    <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-600/40">
                      <h5 className="text-lg font-bold text-purple-300 mb-2">Breakthrough Capabilities Demonstrated</h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ul className="space-y-1 text-sm">
                          <li>• <strong className="text-blue-300">Computer Control:</strong> Cursor movement and clicking</li>
                          <li>• <strong className="text-green-300">Gaming:</strong> Chess, Mario Kart, and other video games</li>
                          <li>• <strong className="text-yellow-300">Communication:</strong> Typing and text input</li>
                          <li>• <strong className="text-red-300">Creative Work:</strong> Digital art and design</li>
                        </ul>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong className="text-cyan-300">Video Editing:</strong> YouTube content creation</li>
                          <li>• <strong className="text-orange-300">AI Integration:</strong> Voice synthesis using patient's own voice</li>
                          <li>• <strong className="text-pink-300">Multitasking:</strong> Simultaneous control of multiple applications</li>
                          <li>• <strong className="text-indigo-300">Learning:</strong> Continuous improvement through software updates</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Latest 2025 Videos */}
                  <div>
                    <h4 className="text-xl font-bold text-yellow-300 mb-4 underline decoration-1 underline-offset-2">
                      Latest 2025 Demonstrations & Updates
                    </h4>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('FASMejN_5gs')}
                      >
                        <img
                          src="https://img.youtube.com/vi/FASMejN_5gs/maxresdefault.jpg"
                          alt="Neuralink Summer 2025 Update"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={24} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-xs font-semibold text-white">Summer 2025 Update</p>
                        </div>
                      </div>

                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('WGvIbdzUWoA')}
                      >
                        <img
                          src="https://img.youtube.com/vi/WGvIbdzUWoA/maxresdefault.jpg"
                          alt="Neuralink New Patient"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={24} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-xs font-semibold text-white">New Human Patient</p>
                        </div>
                      </div>

                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('Sd-VQdhR5c0')}
                      >
                        <img
                          src="https://img.youtube.com/vi/Sd-VQdhR5c0/maxresdefault.jpg"
                          alt="Neuralink April 2025 Update"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={24} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-xs font-semibold text-white">April 2025 Update</p>
                        </div>
                      </div>

                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('ZzNHxC96rDE')}
                      >
                        <img
                          src="https://img.youtube.com/vi/ZzNHxC96rDE/maxresdefault.jpg"
                          alt="Neuralink Patient Chess Demo"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={24} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-xs font-semibold text-white">Patient Chess Demo</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('5SrpYZum4Nk')}
                      >
                        <img
                          src="https://img.youtube.com/vi/5SrpYZum4Nk/maxresdefault.jpg"
                          alt="First Patient Chess Playing"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={24} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-xs font-semibold text-white">Chess with Brain Implant</p>
                        </div>
                      </div>

                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('IbM4-rcujxY')}
                      >
                        <img
                          src="https://img.youtube.com/vi/IbM4-rcujxY/maxresdefault.jpg"
                          alt="Patient Experience"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={24} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-xs font-semibold text-white">Patient Experience</p>
                        </div>
                      </div>

                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('YreDYmXTYi4')}
                      >
                        <img
                          src="https://img.youtube.com/vi/YreDYmXTYi4/maxresdefault.jpg"
                          alt="Neuralink Show and Tell"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={24} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-xs font-semibold text-white">Show and Tell Demo</p>
                        </div>
                      </div>

                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('rsCul1sp4hQ')}
                      >
                        <img
                          src="https://img.youtube.com/vi/rsCul1sp4hQ/maxresdefault.jpg"
                          alt="Monkey MindPong"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={24} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-xs font-semibold text-white">Monkey MindPong</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-green-300 mb-4 underline decoration-1 underline-offset-2">
                    Technical Specifications & Innovation
                  </h4>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="text-lg font-bold text-blue-300 mb-3 underline decoration-1 underline-offset-2">
                        Hardware Architecture
                      </h5>
                      <ul className="space-y-2 text-base">
                        <li>• <strong className="text-yellow-300">N1 Chip:</strong> 1,024 electrode channels for neural recording</li>
                        <li>• <strong className="text-green-300">Ultra-thin Threads:</strong> 4-6 μm width, thinner than human hair</li>
                        <li>• <strong className="text-purple-300">Surgical Robot:</strong> Precision insertion avoiding blood vessels</li>
                        <li>• <strong className="text-cyan-300">Wireless Communication:</strong> Bluetooth connectivity to external devices</li>
                        <li>• <strong className="text-orange-300">Battery Life:</strong> All-day operation with wireless charging</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-red-300 mb-3 underline decoration-1 underline-offset-2">
                        Software & AI Integration
                      </h5>
                      <ul className="space-y-2 text-base">
                        <li>• <strong className="text-indigo-300">Machine Learning:</strong> Real-time neural signal processing</li>
                        <li>• <strong className="text-teal-300">Adaptive Algorithms:</strong> Continuous learning and improvement</li>
                        <li>• <strong className="text-pink-300">Signal Decoding:</strong> Intent prediction from neural activity</li>
                        <li>• <strong className="text-lime-300">Software Updates:</strong> Over-the-air capability improvements</li>
                        <li>• <strong className="text-amber-300">API Integration:</strong> Compatible with various applications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-orange-300 mb-4 underline decoration-1 underline-offset-2">
                    Future Applications & Roadmap
                  </h4>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-6 border border-orange-600/40">
                      <h5 className="text-lg font-bold text-orange-300 mb-3">🎯 Expansion Plans</h5>
                      <p className="text-base leading-relaxed mb-3">
                        Neuralink plans to implant <strong className="text-yellow-300">20-30 more patients</strong> throughout 2025, expanding trials to include patients with various neurological conditions. The company is also developing applications for <strong className="text-blue-300">vision restoration</strong>, <strong className="text-green-300">hearing restoration</strong>, and <strong className="text-purple-300">motor function recovery</strong>.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-lg font-bold text-cyan-300 mb-2 underline decoration-1 underline-offset-2">
                          Medical Applications
                        </h5>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong className="text-blue-300">Paralysis:</strong> Restore movement control</li>
                          <li>• <strong className="text-green-300">Blindness:</strong> Visual cortex stimulation</li>
                          <li>• <strong className="text-purple-300">Deafness:</strong> Auditory nerve interfaces</li>
                          <li>• <strong className="text-yellow-300">Depression:</strong> Mood regulation therapy</li>
                          <li>• <strong className="text-red-300">Epilepsy:</strong> Seizure prediction and prevention</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-lg font-bold text-pink-300 mb-2 underline decoration-1 underline-offset-2">
                          Enhancement Applications
                        </h5>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong className="text-indigo-300">Memory:</strong> Enhanced recall and storage</li>
                          <li>• <strong className="text-teal-300">Learning:</strong> Accelerated skill acquisition</li>
                          <li>• <strong className="text-orange-300">Communication:</strong> Direct brain-to-brain interfaces</li>
                          <li>• <strong className="text-lime-300">Computing:</strong> Seamless human-AI collaboration</li>
                          <li>• <strong className="text-amber-300">Creativity:</strong> Enhanced artistic and musical abilities</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-lg font-bold text-violet-300 mb-2 underline decoration-1 underline-offset-2">
                          Long-term Vision
                        </h5>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong className="text-emerald-300">Telepathy:</strong> Direct thought transmission</li>
                          <li>• <strong className="text-rose-300">Digital Immortality:</strong> Consciousness uploading</li>
                          <li>• <strong className="text-sky-300">Superhuman Intelligence:</strong> AI-human symbiosis</li>
                          <li>• <strong className="text-fuchsia-300">Virtual Reality:</strong> Direct neural immersion</li>
                          <li>• <strong className="text-slate-300">Global Brain:</strong> Collective human intelligence</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-lg p-6 border border-purple-600/40 mt-6">
                  <h4 className="text-xl font-bold text-purple-300 mb-3">🚀 The Future of Human-Machine Integration</h4>
                  <p className="text-base leading-relaxed">
                    Neuralink represents more than just a medical device company—it's pioneering the future of human-machine integration. By creating seamless interfaces between biological and artificial intelligence, Neuralink is laying the foundation for a future where the boundaries between human cognition and artificial intelligence become increasingly blurred, potentially ushering in a new era of enhanced human capabilities and consciousness.
                  </p>
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
              <CloseIcon size={24} className="text-white" />
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
