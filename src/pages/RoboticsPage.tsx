import React, { useState } from 'react';
import { ArrowLeft, Bot, Play, X as CloseIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';

const RoboticsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);

  const handleBack = () => {
    navigate('/stem');
  };

  const openVideoModal = (videoId: string, event: React.MouseEvent) => {
    // Capture exact click position relative to viewport
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX || (rect.left + rect.width / 2);
    const clickY = event.clientY || (rect.top + rect.height / 2);

    setClickPosition({
      x: clickX,
      y: clickY
    });

    setVideoLoading(true);
    setSelectedVideo(videoId);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setVideoLoading(false);
    setClickPosition(null);

    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const handleVideoLoad = () => {
    setVideoLoading(false);
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
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back to STEM</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Robotics & Automation
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full py-8">

        {/* Header Section */}
        <div
          className="relative h-64 sm:h-80 mb-12 overflow-hidden"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
          <div className="relative h-full flex items-center justify-start px-4 sm:px-8 lg:px-12">
            <div>
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
                Robotics and Automation
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 max-w-2xl">
                Exploring the Future of Intelligent Automation, Robotic Systems, and Industrial Revolution 4.0
              </p>
            </div>
          </div>
        </div>

        {/* Word Document Style Content */}
        <div className="bg-black px-4 sm:px-8 lg:px-12 py-8 sm:py-12">

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-lg sm:text-xl leading-relaxed mb-6">
              <strong className="text-blue-300">Robotics and Automation</strong> represent the driving force behind the Fourth Industrial Revolution, fundamentally transforming how we manufacture, work, and live. From fully automated factories in China producing millions of products daily to Amazon's robotic fulfillment centers processing billions of orders, automation has become the backbone of modern industry. This comprehensive field integrates robotics, artificial intelligence, machine learning, and advanced control systems to create intelligent automated solutions that operate with unprecedented precision, speed, and efficiency.
            </p>
          </div>

          {/* Industrial Automation Revolution */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-orange-400">
              Industrial Automation Revolution
            </h2>

            <div className="space-y-6 ml-4">
              <div>
                <h3 className="text-2xl font-bold text-orange-300 mb-4 underline decoration-1 underline-offset-2">
                  What is Industrial Automation?
                </h3>

                <p className="text-base leading-relaxed mb-6">
                  <strong className="text-orange-300">Industrial Automation</strong> is the use of control systems, computers, robots, and information technologies to handle different processes and machinery in an industry to replace human intervention. It represents the second step beyond mechanization in the scope of industrialization. Modern automation systems integrate <strong className="text-blue-300">Artificial Intelligence</strong>, <strong className="text-green-300">Machine Learning</strong>, <strong className="text-purple-300">Internet of Things (IoT)</strong>, and <strong className="text-yellow-300">Advanced Robotics</strong> to create intelligent manufacturing ecosystems that can adapt, learn, and optimize themselves in real-time.
                </p>

                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-6 border border-orange-600/40 mb-6">
                  <h4 className="text-xl font-bold text-orange-300 mb-3">🏭 Types of Industrial Automation</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-lg font-bold text-yellow-300 mb-3">🔧 Fixed Automation</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-blue-300">High-volume production:</strong> Automotive assembly lines</li>
                        <li>• <strong className="text-green-300">Dedicated systems:</strong> Chemical processing plants</li>
                        <li>• <strong className="text-purple-300">Continuous operation:</strong> Oil refineries</li>
                        <li>• <strong className="text-cyan-300">Low flexibility:</strong> Optimized for specific products</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-pink-300 mb-3">🤖 Flexible Automation</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-indigo-300">Programmable systems:</strong> CNC machines</li>
                        <li>• <strong className="text-teal-300">Adaptable production:</strong> Multi-product lines</li>
                        <li>• <strong className="text-amber-300">Quick changeover:</strong> Electronics manufacturing</li>
                        <li>• <strong className="text-lime-300">AI-driven optimization:</strong> Smart factories</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-blue-300 mb-4 underline decoration-1 underline-offset-2">
                    Amazon's Automation Empire
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    <a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline font-bold">Amazon</a> has revolutionized logistics and fulfillment through massive automation investments. With over <strong className="text-yellow-300">750,000 mobile robots</strong> deployed across their fulfillment centers globally, Amazon processes over <strong className="text-green-300">5 billion packages annually</strong> with unprecedented speed and accuracy. Their automation systems include robotic arms, autonomous mobile robots, AI-powered sorting systems, and predictive analytics that optimize every aspect of the supply chain.
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('TUx-ljgB-5Q', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/TUx-ljgB-5Q/maxresdefault.jpg"
                        alt="Amazon Warehouse Robots"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Amazon Warehouse Robots</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('NZTVgExZqoI', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/NZTVgExZqoI/maxresdefault.jpg"
                        alt="Amazon Robots Universe"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Dazzling Universe of Amazon Robots</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('eBsir9mqGeg', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/eBsir9mqGeg/maxresdefault.jpg"
                        alt="Amazon Robotic Fulfillment Center"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">New Robotic Fulfillment Center</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('cLVCGEmkJs0', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/cLVCGEmkJs0/maxresdefault.jpg"
                        alt="Amazon Warehouse Mind Blowing"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Mind Blowing Warehouse Automation</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-green-300 mb-4 underline decoration-1 underline-offset-2">
                    NVIDIA's AI-Powered Manufacturing Revolution
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    <a href="https://www.nvidia.com/" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline font-bold">NVIDIA</a> is transforming manufacturing through AI-powered automation solutions. Their <strong className="text-blue-300">Omniverse platform</strong> enables digital twins of entire factories, while <strong className="text-purple-300">Isaac Sim</strong> provides robotics simulation capabilities. NVIDIA's <strong className="text-yellow-300">Metropolis platform</strong> powers intelligent video analytics for factory monitoring, quality control, and safety systems. Their AI solutions are deployed in automotive, electronics, and heavy industry manufacturing worldwide.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="text-lg font-bold text-cyan-300 mb-3">🏭 NVIDIA Manufacturing Solutions</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong className="text-blue-300">Digital Twins:</strong> Virtual factory replicas for optimization</li>
                        <li>• <strong className="text-green-300">AI Quality Control:</strong> Real-time defect detection</li>
                        <li>• <strong className="text-purple-300">Predictive Maintenance:</strong> AI-powered equipment monitoring</li>
                        <li>• <strong className="text-orange-300">Robotic Simulation:</strong> Isaac platform for robot training</li>
                        <li>• <strong className="text-red-300">Computer Vision:</strong> Automated visual inspection</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-pink-300 mb-3">🤖 Industry Applications</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong className="text-indigo-300">Automotive:</strong> BMW, Mercedes-Benz production lines</li>
                        <li>• <strong className="text-teal-300">Electronics:</strong> Foxconn, TSMC semiconductor fabs</li>
                        <li>• <strong className="text-amber-300">Aerospace:</strong> Boeing, Airbus manufacturing</li>
                        <li>• <strong className="text-lime-300">Pharmaceuticals:</strong> Drug manufacturing automation</li>
                        <li>• <strong className="text-rose-300">Energy:</strong> Solar panel and battery production</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-red-300 mb-4 underline decoration-1 underline-offset-2">
                    China's "Dark Factories" - Lights-Out Manufacturing
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    China is pioneering the future of manufacturing with <strong className="text-red-300">"Dark Factories"</strong> - fully automated facilities that operate 24/7 without human workers or even lights. These revolutionary manufacturing plants use AI-powered robots, IoT sensors, and machine learning algorithms to produce everything from smartphones to automobiles with unprecedented efficiency. Companies like <strong className="text-blue-300">Foxconn</strong>, <strong className="text-green-300">Xiaomi</strong>, and <strong className="text-purple-300">BYD</strong> have deployed these lights-out factories across China, representing the ultimate evolution of industrial automation.
                  </p>

                  <div className="bg-gradient-to-r from-red-900/30 to-gray-900/30 rounded-lg p-6 border border-red-600/40 mb-6">
                    <h5 className="text-lg font-bold text-red-300 mb-3">🌃 Dark Factory Characteristics</h5>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="text-base font-bold text-yellow-300 mb-2">🤖 Full Automation</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong className="text-blue-300">Zero human workers:</strong> Completely unmanned operations</li>
                          <li>• <strong className="text-green-300">24/7 operation:</strong> Continuous production cycles</li>
                          <li>• <strong className="text-purple-300">No lighting needed:</strong> Robots work in darkness</li>
                          <li>• <strong className="text-cyan-300">AI coordination:</strong> Intelligent system orchestration</li>
                        </ul>
                      </div>

                      <div>
                        <h6 className="text-base font-bold text-orange-300 mb-2">📊 Performance Benefits</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong className="text-indigo-300">99.9% uptime:</strong> Minimal downtime or breaks</li>
                          <li>• <strong className="text-teal-300">50% cost reduction:</strong> Lower operational expenses</li>
                          <li>• <strong className="text-pink-300">Zero defects:</strong> Perfect quality control</li>
                          <li>• <strong className="text-amber-300">Scalable production:</strong> Instant capacity adjustment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-purple-300 mb-4 underline decoration-1 underline-offset-2">
                    Global Automotive Manufacturing Automation
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    The automotive industry leads the world in manufacturing automation, with companies like <strong className="text-blue-300">Tesla</strong>, <strong className="text-green-300">BMW</strong>, <strong className="text-purple-300">Toyota</strong>, and <strong className="text-orange-300">Mercedes-Benz</strong> deploying thousands of robots in their production lines. These automated systems handle everything from welding and painting to final assembly, achieving production rates that would be impossible with human workers alone.
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('P7fi4hP_y80', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/P7fi4hP_y80/maxresdefault.jpg"
                        alt="BMW Factory Robots"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">BMW Factory Robots Production</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => openVideoModal('Fo6pWIi-Ixo')}
                    >
                      <img
                        src="https://img.youtube.com/vi/Fo6pWIi-Ixo/maxresdefault.jpg"
                        alt="BMW AI Production Line"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">BMW AI Production Integration</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => openVideoModal('sY5s9TAPA-Q')}
                    >
                      <img
                        src="https://img.youtube.com/vi/sY5s9TAPA-Q/maxresdefault.jpg"
                        alt="Fully Automated Assembly Line"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Fully Automated Assembly Line</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => openVideoModal('sjAZGUcjrP8')}
                    >
                      <img
                        src="https://img.youtube.com/vi/sjAZGUcjrP8/maxresdefault.jpg"
                        alt="Car Factory Production Line"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Modern Car Factory Automation</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-cyan-300 mb-4 underline decoration-1 underline-offset-2">
                    Companies Leading Automation Revolution
                  </h4>

                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-600/40">
                      <h5 className="text-lg font-bold text-blue-300 mb-3">
                        <a href="https://www.tesla.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">Tesla</a>
                      </h5>
                      <p className="text-sm text-gray-200 mb-2">Gigafactory automation with advanced robotics</p>
                      <ul className="space-y-1 text-xs">
                        <li>• <strong className="text-yellow-300">Production:</strong> 2M+ vehicles annually</li>
                        <li>• <strong className="text-green-300">Automation:</strong> 95% automated assembly</li>
                        <li>• <strong className="text-purple-300">Innovation:</strong> "Alien Dreadnought" factory concept</li>
                      </ul>
                    </div>

                    <div className="bg-orange-900/30 rounded-lg p-4 border border-orange-600/40">
                      <h5 className="text-lg font-bold text-orange-300 mb-3">
                        <a href="https://www.foxconn.com/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200 underline">Foxconn</a>
                      </h5>
                      <p className="text-sm text-gray-200 mb-2">World's largest electronics manufacturer</p>
                      <ul className="space-y-1 text-xs">
                        <li>• <strong className="text-blue-300">Robots:</strong> 1M+ industrial robots deployed</li>
                        <li>• <strong className="text-green-300">Products:</strong> iPhones, iPads, gaming consoles</li>
                        <li>• <strong className="text-red-300">Facilities:</strong> 30+ automated factories globally</li>
                      </ul>
                    </div>

                    <div className="bg-green-900/30 rounded-lg p-4 border border-green-600/40">
                      <h5 className="text-lg font-bold text-green-300 mb-3">
                        <a href="https://www.samsung.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 underline">Samsung</a>
                      </h5>
                      <p className="text-sm text-gray-200 mb-2">Semiconductor and electronics automation leader</p>
                      <ul className="space-y-1 text-xs">
                        <li>• <strong className="text-cyan-300">Fabs:</strong> Fully automated chip production</li>
                        <li>• <strong className="text-purple-300">Capacity:</strong> 20M+ smartphones monthly</li>
                        <li>• <strong className="text-yellow-300">Technology:</strong> AI-driven quality control</li>
                      </ul>
                    </div>

                    <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-600/40">
                      <h5 className="text-lg font-bold text-purple-300 mb-3">
                        <a href="https://www.mercedes-benz.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 underline">Mercedes-Benz</a>
                      </h5>
                      <p className="text-sm text-gray-200 mb-2">Luxury automotive manufacturing excellence</p>
                      <ul className="space-y-1 text-xs">
                        <li>• <strong className="text-orange-300">Factory 56:</strong> Carbon-neutral production</li>
                        <li>• <strong className="text-blue-300">Flexibility:</strong> Multi-model assembly lines</li>
                        <li>• <strong className="text-green-300">Quality:</strong> Zero-defect manufacturing</li>
                      </ul>
                    </div>

                    <div className="bg-red-900/30 rounded-lg p-4 border border-red-600/40">
                      <h5 className="text-lg font-bold text-red-300 mb-3">
                        <a href="https://www.toyota.com/" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 underline">Toyota</a>
                      </h5>
                      <p className="text-sm text-gray-200 mb-2">Lean manufacturing and automation pioneer</p>
                      <ul className="space-y-1 text-xs">
                        <li>• <strong className="text-indigo-300">TPS:</strong> Toyota Production System</li>
                        <li>• <strong className="text-teal-300">Kaizen:</strong> Continuous improvement culture</li>
                        <li>• <strong className="text-amber-300">Robots:</strong> Human-robot collaboration</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-600/40">
                      <h5 className="text-lg font-bold text-indigo-300 mb-3">
                        <a href="https://www.apple.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200 underline">Apple</a>
                      </h5>
                      <p className="text-sm text-gray-200 mb-2">Precision manufacturing and assembly automation</p>
                      <ul className="space-y-1 text-xs">
                        <li>• <strong className="text-pink-300">Precision:</strong> Micron-level accuracy</li>
                        <li>• <strong className="text-lime-300">Innovation:</strong> Custom automation equipment</li>
                        <li>• <strong className="text-rose-300">Scale:</strong> 200M+ devices annually</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-900/30 to-purple-900/30 rounded-lg p-6 border border-orange-600/40">
                  <h4 className="text-xl font-bold text-orange-300 mb-3">🚀 The Future of Industrial Automation</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-lg font-bold text-yellow-300 mb-3">🔮 Emerging Technologies</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong className="text-blue-300">Collaborative Robots (Cobots):</strong> Safe human-robot interaction</li>
                        <li>• <strong className="text-green-300">5G-Enabled Factories:</strong> Ultra-low latency communication</li>
                        <li>• <strong className="text-purple-300">Digital Twins:</strong> Virtual factory optimization</li>
                        <li>• <strong className="text-cyan-300">Edge AI:</strong> Real-time decision making</li>
                        <li>• <strong className="text-red-300">Autonomous Mobile Robots:</strong> Flexible material handling</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-pink-300 mb-3">📈 Industry Impact</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong className="text-indigo-300">Productivity:</strong> 30-50% increase in output</li>
                        <li>• <strong className="text-teal-300">Quality:</strong> 99.9% defect-free production</li>
                        <li>• <strong className="text-amber-300">Cost Reduction:</strong> 20-40% lower manufacturing costs</li>
                        <li>• <strong className="text-lime-300">Flexibility:</strong> Rapid product changeover</li>
                        <li>• <strong className="text-rose-300">Sustainability:</strong> Reduced energy and waste</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Autonomous Vehicles & Self-Driving Cars */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-cyan-400">
              Autonomous Vehicles & Self-Driving Cars Revolution
            </h2>

            <div className="space-y-6 ml-4">
              <div>
                <h3 className="text-2xl font-bold text-cyan-300 mb-4 underline decoration-1 underline-offset-2">
                  The History of Autonomous Vehicles
                </h3>

                <p className="text-base leading-relaxed mb-6">
                  The dream of <strong className="text-cyan-300">self-driving cars</strong> began long before modern computers existed. From Leonardo da Vinci's self-propelled cart in the Renaissance to today's AI-powered vehicles navigating city streets, autonomous transportation represents one of humanity's most ambitious technological pursuits. The modern era began with the <strong className="text-blue-300">DARPA Grand Challenge</strong> in 2004, which catalyzed the development of today's autonomous vehicle industry worth over <strong className="text-green-300">$100 billion</strong>.
                </p>

                <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-6 border border-cyan-600/40 mb-6">
                  <h4 className="text-xl font-bold text-cyan-300 mb-3">🚗 Autonomous Vehicle Timeline</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-lg font-bold text-yellow-300 mb-3">🏛️ Early Era (1920s-1990s)</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-blue-300">1925:</strong> First radio-controlled car demonstration</li>
                        <li>• <strong className="text-green-300">1939:</strong> General Motors Futurama exhibit</li>
                        <li>• <strong className="text-purple-300">1980s:</strong> Carnegie Mellon NavLab project</li>
                        <li>• <strong className="text-orange-300">1995:</strong> CMU's NavLab 5 drives coast-to-coast</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-pink-300 mb-3">🚀 Modern Era (2000s-Present)</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-indigo-300">2004:</strong> DARPA Grand Challenge begins</li>
                        <li>• <strong className="text-teal-300">2009:</strong> Google starts self-driving car project</li>
                        <li>• <strong className="text-amber-300">2016:</strong> Tesla launches Autopilot</li>
                        <li>• <strong className="text-lime-300">2020s:</strong> Commercial robotaxi services launch</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-blue-300 mb-4 underline decoration-1 underline-offset-2">
                    American Self-Driving Car Leaders
                  </h4>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-bold text-red-300 mb-3 underline decoration-1 underline-offset-2">
                        Tesla - Full Self-Driving (FSD) Pioneer
                      </h5>

                      <p className="text-base leading-relaxed mb-4">
                        <a href="https://www.tesla.com/" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline font-bold">Tesla</a> revolutionized the automotive industry with <strong className="text-blue-300">Autopilot</strong> and <strong className="text-green-300">Full Self-Driving (FSD)</strong> technology. With over <strong className="text-yellow-300">6 million vehicles</strong> equipped with Autopilot hardware and billions of miles of real-world driving data, Tesla leads in neural network-based autonomous driving. Their approach uses <strong className="text-purple-300">vision-only systems</strong> powered by custom AI chips and massive data collection from their global fleet.
                      </p>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={(e) => openVideoModal('tlThdr3O5Qo', e)}
                        >
                          <img
                            src="https://img.youtube.com/vi/tlThdr3O5Qo/maxresdefault.jpg"
                            alt="Tesla Full Self-Driving Demo"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Tesla Full Self-Driving Demo</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={(e) => openVideoModal('TUDiG7PcLBs', e)}
                        >
                          <img
                            src="https://img.youtube.com/vi/TUDiG7PcLBs/maxresdefault.jpg"
                            alt="Tesla FSD Supervised"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">FSD Supervised Capabilities</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={(e) => openVideoModal('P6tAnt1u8SA', e)}
                        >
                          <img
                            src="https://img.youtube.com/vi/P6tAnt1u8SA/maxresdefault.jpg"
                            alt="Tesla FSD Demonstration"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">How Tesla FSD Works</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={(e) => openVideoModal('aaOB-ErYq6Y', e)}
                        >
                          <img
                            src="https://img.youtube.com/vi/aaOB-ErYq6Y/maxresdefault.jpg"
                            alt="Tesla Autopilot Technology"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Tesla Autopilot Technology</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-green-300 mb-3 underline decoration-1 underline-offset-2">
                        Waymo - Google's Autonomous Driving Pioneer
                      </h5>

                      <p className="text-base leading-relaxed mb-4">
                        <a href="https://waymo.com/" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline font-bold">Waymo</a>, originally Google's self-driving car project, is the world's most experienced autonomous driving company with over <strong className="text-blue-300">20 million miles</strong> driven autonomously on public roads. Operating commercial robotaxi services in <strong className="text-purple-300">Phoenix, San Francisco, Los Angeles, and Austin</strong>, Waymo uses advanced <strong className="text-yellow-300">LiDAR, cameras, and radar</strong> to achieve Level 4 autonomy. Their Waymo Driver technology represents the gold standard in fully autonomous vehicles.
                      </p>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={(e) => openVideoModal('JHgr9SgeicM', e)}
                        >
                          <img
                            src="https://img.youtube.com/vi/JHgr9SgeicM/maxresdefault.jpg"
                            alt="Waymo Real Driverless Car"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Waymo Real Driverless Experience</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={(e) => openVideoModal('hA_-MkU0Nfw', e)}
                        >
                          <img
                            src="https://img.youtube.com/vi/hA_-MkU0Nfw/maxresdefault.jpg"
                            alt="Waymo Driver Technology"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Sense, Solve, and Go</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={(e) => openVideoModal('ErgD-ZHVMsQ', e)}
                        >
                          <img
                            src="https://img.youtube.com/vi/ErgD-ZHVMsQ/maxresdefault.jpg"
                            alt="Waymo Safety Technology"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Waymo Safety Showcase</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={(e) => openVideoModal('mLSnFlE5R8U', e)}
                        >
                          <img
                            src="https://img.youtube.com/vi/mLSnFlE5R8U/maxresdefault.jpg"
                            alt="Waymo Expansion"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Road to More Driverless Cars</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-orange-300 mb-3 underline decoration-1 underline-offset-2">
                        Zoox - Amazon's Revolutionary Robotaxi
                      </h5>

                      <p className="text-base leading-relaxed mb-4">
                        <a href="https://zoox.com/" target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:text-orange-200 underline font-bold">Zoox</a>, acquired by Amazon for <strong className="text-green-300">$1.3 billion</strong>, represents a radical reimagining of autonomous vehicles. Unlike traditional cars adapted for self-driving, Zoox built the world's first <strong className="text-blue-300">purpose-built robotaxi</strong> from the ground up. Their bidirectional vehicle with <strong className="text-purple-300">four-wheel steering</strong> and <strong className="text-yellow-300">carriage-style seating</strong> can travel up to 75 mph and is designed specifically for urban ride-hailing services.
                      </p>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={(e) => openVideoModal('1JgGeIJ_DgQ', e)}
                        >
                          <img
                            src="https://img.youtube.com/vi/1JgGeIJ_DgQ/maxresdefault.jpg"
                            alt="Inside Zoox Driverless Taxi"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Inside Zoox Driverless Taxi</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={(e) => openVideoModal('0OjZaI-aANE', e)}
                        >
                          <img
                            src="https://img.youtube.com/vi/0OjZaI-aANE/maxresdefault.jpg"
                            alt="Riding in Zoox Robotaxi"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">I Rode in Zoox Robotaxi</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={(e) => openVideoModal('aaOB-ErYq6Y', e)}
                        >
                          <img
                            src="https://img.youtube.com/vi/aaOB-ErYq6Y/maxresdefault.jpg"
                            alt="Zoox vs Waymo Technology"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Autonomous Driving Technology</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={(e) => openVideoModal('JHgr9SgeicM', e)}
                        >
                          <img
                            src="https://img.youtube.com/vi/JHgr9SgeicM/maxresdefault.jpg"
                            alt="Amazon Zoox Testing"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Amazon's Self-Driving Future</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-red-300 mb-4 underline decoration-1 underline-offset-2">
                    Chinese Autonomous Vehicle Giants
                  </h4>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-bold text-yellow-300 mb-3 underline decoration-1 underline-offset-2">
                        Baidu Apollo - China's Autonomous Driving Platform
                      </h5>

                      <p className="text-base leading-relaxed mb-4">
                        <a href="https://apollo.auto/" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline font-bold">Baidu Apollo</a> is China's leading autonomous driving platform, operating the world's largest robotaxi fleet with <strong className="text-blue-300">Apollo Go</strong> services in over <strong className="text-green-300">11 Chinese cities</strong>. With over <strong className="text-purple-300">40 million kilometers</strong> of autonomous driving testing, Baidu has achieved Level 4 autonomy and plans to expand globally. Their <strong className="text-cyan-300">6th generation robotaxi</strong> costs 60% less than previous models, making autonomous transportation economically viable.
                      </p>

                      <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-600/40 mb-4">
                        <h6 className="text-lg font-bold text-yellow-300 mb-2">🚗 Baidu Apollo Achievements</h6>
                        <div className="grid md:grid-cols-2 gap-4">
                          <ul className="space-y-1 text-sm">
                            <li>• <strong className="text-blue-300">Apollo Go:</strong> 6M+ robotaxi rides completed</li>
                            <li>• <strong className="text-green-300">Global Reach:</strong> Testing in 30+ cities worldwide</li>
                            <li>• <strong className="text-purple-300">Partnerships:</strong> 200+ ecosystem partners</li>
                          </ul>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong className="text-cyan-300">Technology:</strong> L4 autonomous driving capability</li>
                            <li>• <strong className="text-orange-300">Cost Reduction:</strong> 60% lower than previous generation</li>
                            <li>• <strong className="text-pink-300">Safety:</strong> Zero at-fault accidents in commercial operation</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-green-300 mb-3 underline decoration-1 underline-offset-2">
                        BYD & Xpeng - Electric Vehicle Autonomous Leaders
                      </h5>

                      <p className="text-base leading-relaxed mb-4">
                        <a href="https://www.byd.com/" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline font-bold">BYD</a>, the world's largest EV manufacturer, partners with Baidu Apollo for autonomous driving technology. <a href="https://www.xpeng.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline font-bold">Xpeng</a> leads in <strong className="text-purple-300">smart EV technology</strong> with advanced driver assistance systems and plans for full autonomy. Both companies represent China's rapid advancement in combining electric vehicles with autonomous driving capabilities.
                      </p>

                      <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-4 border border-green-600/40 mb-4">
                        <h6 className="text-lg font-bold text-green-300 mb-2">🇨🇳 Chinese AV Market Leadership</h6>
                        <div className="grid md:grid-cols-2 gap-4">
                          <ul className="space-y-1 text-sm">
                            <li>• <strong className="text-blue-300">Market Size:</strong> $7.6B autonomous vehicle market</li>
                            <li>• <strong className="text-purple-300">Government Support:</strong> National AI strategy backing</li>
                            <li>• <strong className="text-yellow-300">Testing Miles:</strong> 1.8M+ miles on US roads</li>
                          </ul>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong className="text-cyan-300">Innovation:</strong> Leading in smart city integration</li>
                            <li>• <strong className="text-orange-300">Production:</strong> Mass production capabilities</li>
                            <li>• <strong className="text-pink-300">Global Expansion:</strong> Entering European markets</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h6 className="text-lg font-bold text-yellow-300 mb-3 underline decoration-1 underline-offset-2">
                          Chinese Autonomous Driving Technology Videos
                        </h6>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                          <div
                            className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={(e) => openVideoModal('56yvmC8AdS8', e)}
                          >
                            <img
                              src="https://img.youtube.com/vi/56yvmC8AdS8/maxresdefault.jpg"
                              alt="China's Latest Driverless Robotaxi"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-sm font-semibold text-white">China's Latest Driverless Robotaxi</p>
                            </div>
                          </div>

                          <div
                            className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={(e) => openVideoModal('FwABzdr5elM', e)}
                          >
                            <img
                              src="https://img.youtube.com/vi/FwABzdr5elM/maxresdefault.jpg"
                              alt="Baidu Apollo Go Wuhan Experience"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-sm font-semibold text-white">Baidu Apollo Go Wuhan Experience</p>
                            </div>
                          </div>

                          <div
                            className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={(e) => openVideoModal('81Pn7MIefqw', e)}
                          >
                            <img
                              src="https://img.youtube.com/vi/81Pn7MIefqw/maxresdefault.jpg"
                              alt="XPeng XNGP FSD Leader Test"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-sm font-semibold text-white">XPeng XNGP FSD Leader Test</p>
                            </div>
                          </div>

                          <div
                            className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={(e) => openVideoModal('CFSk-34kgpY', e)}
                          >
                            <img
                              src="https://img.youtube.com/vi/CFSk-34kgpY/maxresdefault.jpg"
                              alt="BYD God's Eye Self-Driving Test"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-sm font-semibold text-white">BYD God's Eye Self-Driving Test</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                          <div
                            className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={(e) => openVideoModal('dtRwMh7dbf4', e)}
                          >
                            <img
                              src="https://img.youtube.com/vi/dtRwMh7dbf4/maxresdefault.jpg"
                              alt="Amazing Autonomous Taxi Experience China"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-sm font-semibold text-white">Amazing Autonomous Taxi Experience</p>
                            </div>
                          </div>

                          <div
                            className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={(e) => openVideoModal('lr4W9vb-LI0', e)}
                          >
                            <img
                              src="https://img.youtube.com/vi/lr4W9vb-LI0/maxresdefault.jpg"
                              alt="XPeng XNGP Vision-Based ADAS"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-sm font-semibold text-white">XPeng XNGP Vision-Based ADAS</p>
                            </div>
                          </div>

                          <div
                            className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={(e) => openVideoModal('bpyrkHdD2WU', e)}
                          >
                            <img
                              src="https://img.youtube.com/vi/bpyrkHdD2WU/maxresdefault.jpg"
                              alt="NIO Autopilot Mountain Road Test"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-sm font-semibold text-white">NIO Autopilot Mountain Road Test</p>
                            </div>
                          </div>

                          <div
                            className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={(e) => openVideoModal('erWmPlG3zac', e)}
                          >
                            <img
                              src="https://img.youtube.com/vi/erWmPlG3zac/maxresdefault.jpg"
                              alt="BYD Takes on Tesla Autonomous Driving"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-sm font-semibold text-white">BYD Takes on Tesla Autonomous</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-red-900/30 to-yellow-900/30 rounded-lg p-4 border border-red-600/40 mb-4">
                          <h6 className="text-lg font-bold text-red-300 mb-2">🚗 Chinese Autonomous Driving Technologies</h6>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h7 className="text-base font-bold text-yellow-300 mb-2">🤖 Baidu Apollo Go</h7>
                              <ul className="space-y-1 text-xs">
                                <li>• <strong className="text-blue-300">Cities:</strong> Wuhan, Beijing, Shenzhen, Guangzhou</li>
                                <li>• <strong className="text-green-300">Fleet:</strong> 500+ robotaxis operational</li>
                                <li>• <strong className="text-purple-300">Rides:</strong> 6M+ completed rides</li>
                                <li>• <strong className="text-cyan-300">Technology:</strong> L4 autonomous driving</li>
                              </ul>
                            </div>

                            <div>
                              <h7 className="text-base font-bold text-orange-300 mb-2">⚡ XPeng XNGP</h7>
                              <ul className="space-y-1 text-xs">
                                <li>• <strong className="text-indigo-300">System:</strong> Vision-based autonomous driving</li>
                                <li>• <strong className="text-teal-300">Coverage:</strong> City NGP nationwide rollout</li>
                                <li>• <strong className="text-amber-300">Features:</strong> Highway and city driving</li>
                                <li>• <strong className="text-pink-300">Innovation:</strong> LiDAR + camera fusion</li>
                              </ul>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <h7 className="text-base font-bold text-green-300 mb-2">👁️ BYD God's Eye</h7>
                              <ul className="space-y-1 text-xs">
                                <li>• <strong className="text-blue-300">Technology:</strong> Advanced LiDAR sensor system</li>
                                <li>• <strong className="text-purple-300">Coverage:</strong> 21 models with smart driving</li>
                                <li>• <strong className="text-yellow-300">Features:</strong> Free self-driving system</li>
                                <li>• <strong className="text-cyan-300">Integration:</strong> DeepSeek AI partnership</li>
                              </ul>
                            </div>

                            <div>
                              <h7 className="text-base font-bold text-blue-300 mb-2">🚙 NIO NOP+</h7>
                              <ul className="space-y-1 text-xs">
                                <li>• <strong className="text-red-300">System:</strong> Navigate on Pilot Plus</li>
                                <li>• <strong className="text-green-300">Capability:</strong> Highway and city autonomous</li>
                                <li>• <strong className="text-orange-300">Expansion:</strong> Beijing and major cities</li>
                                <li>• <strong className="text-pink-300">Performance:</strong> Mountain road capability</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-purple-300 mb-4 underline decoration-1 underline-offset-2">
                    2025 Robotaxi Services in Operation
                  </h4>

                  <p className="text-base leading-relaxed mb-6">
                    <strong className="text-purple-300">2025</strong> marks a pivotal year for autonomous vehicles, with multiple companies launching commercial robotaxi services across major cities. From Tesla's FSD Supervised service in Austin to Waymo's expansion in Los Angeles and Zoox's Las Vegas debut, the robotaxi revolution is finally becoming reality for everyday consumers.
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('FhAGUsDbQUI', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/FhAGUsDbQUI/maxresdefault.jpg"
                        alt="Waymo 2025 San Francisco"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Waymo 2025 San Francisco Experience</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('I-kzcWadOYE', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/I-kzcWadOYE/maxresdefault.jpg"
                        alt="Tesla Robotaxi 2025 Production"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Tesla Robotaxi 2025 Production Plan</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('Hc7La5njhZ4', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/Hc7La5njhZ4/maxresdefault.jpg"
                        alt="Tesla Robotaxi Austin Challenges"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Tesla Robotaxi Austin Challenges</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('OA74GfYH86c', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/OA74GfYH86c/maxresdefault.jpg"
                        alt="Tesla Robotaxi First Passenger Test"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Tesla Robotaxi First Passenger Test</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-lg p-6 border border-purple-600/40 mb-6">
                    <h5 className="text-xl font-bold text-purple-300 mb-4">🚗 Current 2025 Robotaxi Operations</h5>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="text-lg font-bold text-blue-300 mb-3">🇺🇸 United States Services</h6>
                        <ul className="space-y-2 text-sm">
                          <li>• <strong className="text-green-300">Tesla Austin:</strong> FSD Supervised service launched June 2025</li>
                          <li>• <strong className="text-yellow-300">Waymo LA:</strong> Full commercial service across Los Angeles</li>
                          <li>• <strong className="text-orange-300">Zoox Las Vegas:</strong> Early Rider Program on the Strip</li>
                          <li>• <strong className="text-cyan-300">Waymo Phoenix:</strong> Largest operational robotaxi fleet</li>
                          <li>• <strong className="text-pink-300">Waymo SF:</strong> Dense urban autonomous driving</li>
                        </ul>
                      </div>

                      <div>
                        <h6 className="text-lg font-bold text-red-300 mb-3">🌍 Global Expansion</h6>
                        <ul className="space-y-2 text-sm">
                          <li>• <strong className="text-indigo-300">Baidu Apollo Go:</strong> 11 Chinese cities operational</li>
                          <li>• <strong className="text-teal-300">Cruise San Francisco:</strong> Limited commercial service</li>
                          <li>• <strong className="text-amber-300">Aurora Freight:</strong> Autonomous trucking pilots</li>
                          <li>• <strong className="text-lime-300">Motional Las Vegas:</strong> Partnership with Lyft</li>
                          <li>• <strong className="text-rose-300">Argo AI:</strong> Testing in multiple US cities</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-6 border border-green-600/40 mb-6">
                    <h5 className="text-xl font-bold text-green-300 mb-4">📊 2025 Robotaxi Market Statistics</h5>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h6 className="text-lg font-bold text-yellow-300 mb-2">🚗 Fleet Size</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong className="text-blue-300">Waymo:</strong> 700+ vehicles</li>
                          <li>• <strong className="text-green-300">Tesla:</strong> 1,000+ FSD vehicles</li>
                          <li>• <strong className="text-purple-300">Baidu:</strong> 500+ Apollo Go vehicles</li>
                          <li>• <strong className="text-orange-300">Zoox:</strong> 100+ test vehicles</li>
                        </ul>
                      </div>

                      <div>
                        <h6 className="text-lg font-bold text-cyan-300 mb-2">📈 Rides Completed</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong className="text-indigo-300">Waymo:</strong> 2M+ rides monthly</li>
                          <li>• <strong className="text-teal-300">Apollo Go:</strong> 6M+ total rides</li>
                          <li>• <strong className="text-amber-300">Tesla:</strong> 100K+ test rides</li>
                          <li>• <strong className="text-pink-300">Total Market:</strong> 10M+ rides in 2025</li>
                        </ul>
                      </div>

                      <div>
                        <h6 className="text-lg font-bold text-red-300 mb-2">💰 Market Value</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong className="text-lime-300">Current:</strong> $7.6B global market</li>
                          <li>• <strong className="text-rose-300">Growth:</strong> 45% YoY increase</li>
                          <li>• <strong className="text-violet-300">Projection:</strong> $2.1T by 2030</li>
                          <li>• <strong className="text-emerald-300">Investment:</strong> $50B+ in 2025</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-lg p-6 border border-cyan-600/40">
                  <h4 className="text-xl font-bold text-cyan-300 mb-3">🚀 The Future of Autonomous Transportation</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-lg font-bold text-yellow-300 mb-3">🔮 Technology Trends</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong className="text-blue-300">AI Foundation Models:</strong> Large language models for driving</li>
                        <li>• <strong className="text-green-300">5G Connectivity:</strong> Vehicle-to-everything communication</li>
                        <li>• <strong className="text-purple-300">Edge Computing:</strong> Real-time decision making</li>
                        <li>• <strong className="text-orange-300">Sensor Fusion:</strong> LiDAR, cameras, radar integration</li>
                        <li>• <strong className="text-red-300">Digital Twins:</strong> Virtual testing environments</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-pink-300 mb-3">📈 Market Projections</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong className="text-indigo-300">Market Value:</strong> $2.1 trillion by 2030</li>
                        <li>• <strong className="text-teal-300">Robotaxi Fleet:</strong> 20M+ vehicles by 2035</li>
                        <li>• <strong className="text-amber-300">Safety Improvement:</strong> 90% reduction in accidents</li>
                        <li>• <strong className="text-lime-300">Cost Savings:</strong> 40% lower transportation costs</li>
                        <li>• <strong className="text-rose-300">Global Adoption:</strong> 50+ cities with AV services</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('I44_zbEwz_w')}
                      >
                        <img
                          src="https://img.youtube.com/vi/I44_zbEwz_w/maxresdefault.jpg"
                          alt="Atlas Walk Run Crawl"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Atlas Walk, Run, Crawl</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('F_7IPm7f1vI')}
                      >
                        <img
                          src="https://img.youtube.com/vi/F_7IPm7f1vI/maxresdefault.jpg"
                          alt="Atlas Goes Hands On"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Atlas Goes Hands On</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('XPVC4IyRTG8')}
                      >
                        <img
                          src="https://img.youtube.com/vi/XPVC4IyRTG8/maxresdefault.jpg"
                          alt="Spot at Work"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Spot at Work</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('uhND7Mvp3f4')}
                      >
                        <img
                          src="https://img.youtube.com/vi/uhND7Mvp3f4/maxresdefault.jpg"
                          alt="Stretch Robot"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Stretch Warehouse Robot</p>
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
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('M2snk_hwLq8')}
                      >
                        <img
                          src="https://img.youtube.com/vi/M2snk_hwLq8/maxresdefault.jpg"
                          alt="Tesla Optimus 2025 Update"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">2025 Optimus Update</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('DrNcXgoFv20')}
                      >
                        <img
                          src="https://img.youtube.com/vi/DrNcXgoFv20/maxresdefault.jpg"
                          alt="Optimus Navigating"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Optimus Navigating Around</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('Nt1XmiDwxhY')}
                      >
                        <img
                          src="https://img.youtube.com/vi/Nt1XmiDwxhY/maxresdefault.jpg"
                          alt="Tesla Robotaxi Event"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Robotaxi Event Highlights</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('THoGPPOyakU')}
                      >
                        <img
                          src="https://img.youtube.com/vi/THoGPPOyakU/maxresdefault.jpg"
                          alt="Optimus Gen 2 Rivals"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Optimus Gen 2 Rivals</p>
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
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('q8IdbodRG14')}
                      >
                        <img
                          src="https://img.youtube.com/vi/q8IdbodRG14/maxresdefault.jpg"
                          alt="Agility Amazon Partnership"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Amazon Partnership</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('29ECwExc-_M')}
                      >
                        <img
                          src="https://img.youtube.com/vi/29ECwExc-_M/maxresdefault.jpg"
                          alt="Digit vs Atlas"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Humanoid Robot Comparison</p>
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
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                        onClick={() => openVideoModal('0FGtASjXCLI')}
                      >
                        <img
                          src="https://img.youtube.com/vi/0FGtASjXCLI/maxresdefault.jpg"
                          alt="Figure AI Conversations"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Full Conversations with AI</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('TAyK9RYzf3I')}
                      >
                        <img
                          src="https://img.youtube.com/vi/TAyK9RYzf3I/maxresdefault.jpg"
                          alt="Figure OpenAI Partnership"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">OpenAI Partnership</p>
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
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('47QJhWyHMHM')}
                      >
                        <img
                          src="https://img.youtube.com/vi/47QJhWyHMHM/maxresdefault.jpg"
                          alt="Unitree Go1 Backflip"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">Go1 Backflip Demo</p>
                        </div>
                      </div>
                      <div
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openVideoModal('2jvLPxY6JWw')}
                      >
                        <img
                          src="https://img.youtube.com/vi/2jvLPxY6JWw/maxresdefault.jpg"
                          alt="Unitree A1 Robot Dog"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-sm font-semibold text-white">A1 Robot Dog Demo</p>
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

          {/* Chinese Robotics Innovation & Leadership */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-red-400">
              Chinese Robotics Innovation & Global Leadership
            </h2>

            <div className="space-y-6 ml-4">
              <div>
                <h3 className="text-2xl font-bold text-red-300 mb-4 underline decoration-1 underline-offset-2">
                  China's Robotics Dominance
                </h3>

                <p className="text-base leading-relaxed mb-6">
                  <strong className="text-red-300">China</strong> has emerged as the world's largest robotics market and a global leader in robotics innovation. With over <strong className="text-yellow-300">52% of global robot installations</strong> and the world's most comprehensive robotics ecosystem, China is driving the future of automation across industries from manufacturing and logistics to consumer robotics and artificial intelligence.
                </p>

                <div className="bg-gradient-to-r from-red-900/30 to-yellow-900/30 rounded-lg p-6 border border-red-600/40 mb-6">
                  <h4 className="text-xl font-bold text-yellow-300 mb-3">🇨🇳 Market Leadership Statistics</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-red-300 mb-2">52%</p>
                      <p className="text-sm text-gray-200">Global Robot Market Share</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-yellow-300 mb-2">400K+</p>
                      <p className="text-sm text-gray-200">Industrial Robots Installed Annually</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-orange-300 mb-2">$13.8B</p>
                      <p className="text-sm text-gray-200">Robotics Market Value</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-orange-300 mb-4 underline decoration-1 underline-offset-2">
                    Leading Chinese Robotics Companies
                  </h4>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-bold text-blue-300 mb-3 underline decoration-1 underline-offset-2">
                        UBTECH Robotics - Humanoid Robot Pioneer
                      </h5>
                      <p className="text-base leading-relaxed mb-3">
                        <a href="https://www.ubtrobot.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline font-bold">UBTECH Robotics</a> is China's leading humanoid robotics company, founded in 2012 in Shenzhen. The company achieved the largest AI funding in history with <strong className="text-yellow-300">$820 million Series C</strong> investment. UBTECH's flagship <strong className="text-green-300">Walker X humanoid robot</strong> and <strong className="text-purple-300">Alpha series</strong> have revolutionized entertainment and service robotics globally.
                      </p>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openVideoModal('dBSSGaZWJXs')}
                        >
                          <img
                            src="https://img.youtube.com/vi/dBSSGaZWJXs/maxresdefault.jpg"
                            alt="UBTECH Walker X Robot"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Walker X Humanoid Robot</p>
                          </div>
                        </div>
                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openVideoModal('KQ8ABQwqZkM')}
                        >
                          <img
                            src="https://img.youtube.com/vi/KQ8ABQwqZkM/maxresdefault.jpg"
                            alt="UBTECH Alpha Robot Performance"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Alpha Robot Performance</p>
                          </div>
                        </div>
                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openVideoModal('IzXP-kZoYuA')}
                        >
                          <img
                            src="https://img.youtube.com/vi/IzXP-kZoYuA/maxresdefault.jpg"
                            alt="UBTECH Walker C Tour Guide"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Walker C Tour Guide</p>
                          </div>
                        </div>
                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openVideoModal('Sq1QZB5baNw')}
                        >
                          <img
                            src="https://img.youtube.com/vi/Sq1QZB5baNw/maxresdefault.jpg"
                            alt="UBTECH Robot Showcase"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">UBTECH Robot Showcase</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-green-300 mb-3 underline decoration-1 underline-offset-2">
                        SIASUN Robot & Automation - Industrial Robotics Leader
                      </h5>
                      <p className="text-base leading-relaxed mb-3">
                        <a href="https://en.siasun.com/" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline font-bold">SIASUN Robot & Automation</a> is China's largest robotics manufacturer, founded in Shenyang, Liaoning Province. As a spin-off from the Chinese Academy of Sciences' Shenyang Institute of Automation, SIASUN has become a global leader in industrial automation, mobile robots, and intelligent manufacturing systems with over <strong className="text-blue-300">30 years of experience</strong>.
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h6 className="text-base font-bold text-cyan-300 mb-2">Key Achievements</h6>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong className="text-yellow-300">China's First:</strong> Industrial robot manufacturer</li>
                            <li>• <strong className="text-blue-300">Global Reach:</strong> Operations in 40+ countries</li>
                            <li>• <strong className="text-green-300">Innovation Hub:</strong> 1,000+ patents and IP rights</li>
                            <li>• <strong className="text-purple-300">Smart Factory:</strong> World's largest robotic industrial base</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-base font-bold text-orange-300 mb-2">Product Portfolio</h6>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong className="text-red-300">Industrial Robots:</strong> 6-axis articulated robots</li>
                            <li>• <strong className="text-indigo-300">Mobile Robots:</strong> AGV and logistics automation</li>
                            <li>• <strong className="text-teal-300">Clean Room Robots:</strong> Semiconductor manufacturing</li>
                            <li>• <strong className="text-pink-300">Special Purpose:</strong> Welding, painting, assembly</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-purple-300 mb-3 underline decoration-1 underline-offset-2">
                        Consumer Robotics Dominance
                      </h5>
                      <p className="text-base leading-relaxed mb-4">
                        Chinese companies dominate the global consumer robotics market, particularly in <strong className="text-cyan-300">robotic vacuum cleaners</strong> where they hold over <strong className="text-yellow-300">70% market share</strong> globally. Leading brands have revolutionized home automation with AI-powered cleaning solutions.
                      </p>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-600/40">
                          <h6 className="text-base font-bold text-blue-300 mb-2">
                            <a href="https://www.ecovacs.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">Ecovacs</a>
                          </h6>
                          <p className="text-sm text-gray-200">22.22% China market share, DEEBOT series, global leader in robotic cleaning</p>
                        </div>

                        <div className="bg-orange-900/30 rounded-lg p-4 border border-orange-600/40">
                          <h6 className="text-base font-bold text-orange-300 mb-2">
                            <a href="https://www.roborock.com/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200 underline">Roborock</a>
                          </h6>
                          <p className="text-sm text-gray-200">20.29% China market share, premium robotic vacuums with LiDAR navigation</p>
                        </div>

                        <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-600/40">
                          <h6 className="text-base font-bold text-gray-300 mb-2">
                            <a href="https://www.mi.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 underline">Xiaomi</a>
                          </h6>
                          <p className="text-sm text-gray-200">Mijia robot vacuums, affordable smart home robotics ecosystem</p>
                        </div>

                        <div className="bg-green-900/30 rounded-lg p-4 border border-green-600/40">
                          <h6 className="text-base font-bold text-green-300 mb-2">
                            <a href="https://www.dreame.tech/" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 underline">Dreame</a>
                          </h6>
                          <p className="text-sm text-gray-200">High-performance robotic vacuums with advanced AI and mapping technology</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-cyan-300 mb-4 underline decoration-1 underline-offset-2">
                    Chinese Research Institutions & Innovation Centers
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-lg font-bold text-blue-300 mb-3 underline decoration-1 underline-offset-2">
                        Chinese Academy of Sciences (CAS) Robotics Network
                      </h5>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h6 className="text-base font-bold text-yellow-300 mb-2">
                            <a href="http://english.ia.cas.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 underline">Institute of Automation (CASIA)</a>
                          </h6>
                          <p className="text-sm leading-relaxed mb-2">
                            Located in Beijing, CASIA is China's premier robotics research institute. Home to the <strong className="text-green-300">Brain-inspired Intelligence Research Center</strong> and <strong className="text-purple-300">Intelligent Manufacturing Technology Center</strong>, conducting cutting-edge research in AI robotics, computer vision, and autonomous systems.
                          </p>
                          <ul className="space-y-1 text-xs">
                            <li>• <strong className="text-cyan-300">Research Focus:</strong> Brain-inspired AI, autonomous robots</li>
                            <li>• <strong className="text-orange-300">Key Projects:</strong> Humanoid robots, service robotics</li>
                            <li>• <strong className="text-pink-300">Collaborations:</strong> International AI research partnerships</li>
                          </ul>
                        </div>

                        <div>
                          <h6 className="text-base font-bold text-green-300 mb-2">Shenyang Institute of Automation (SIA)</h6>
                          <p className="text-sm leading-relaxed mb-2">
                            The birthplace of China's robotics industry, SIA pioneered industrial robotics research in China. Known for developing China's first industrial robot and establishing the foundation for companies like SIASUN. Specializes in <strong className="text-blue-300">underwater robotics</strong>, <strong className="text-red-300">space robotics</strong>, and <strong className="text-yellow-300">manufacturing automation</strong>.
                          </p>
                          <ul className="space-y-1 text-xs">
                            <li>• <strong className="text-indigo-300">Historic Achievement:</strong> China's first industrial robot (1980s)</li>
                            <li>• <strong className="text-teal-300">Specialization:</strong> Underwater and space robotics</li>
                            <li>• <strong className="text-amber-300">Industry Impact:</strong> Founded multiple robotics companies</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-purple-300 mb-3 underline decoration-1 underline-offset-2">
                        Leading Universities in Robotics Research
                      </h5>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-600/40">
                          <h6 className="text-base font-bold text-purple-300 mb-2">
                            <a href="https://www.tsinghua.edu.cn/en/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 underline">Tsinghua University</a>
                          </h6>
                          <p className="text-sm text-gray-200">China's MIT, leading AI and robotics research. Home to advanced robotics labs and international collaborations.</p>
                        </div>

                        <div className="bg-red-900/20 rounded-lg p-4 border border-red-600/40">
                          <h6 className="text-base font-bold text-red-300 mb-2">
                            <a href="https://english.pku.edu.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 underline">Peking University</a>
                          </h6>
                          <p className="text-sm text-gray-200">Premier research in AI and machine learning for robotics, computer vision, and autonomous systems.</p>
                        </div>

                        <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-600/40">
                          <h6 className="text-base font-bold text-blue-300 mb-2">
                            <a href="https://english.bit.edu.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">Beijing Institute of Technology</a>
                          </h6>
                          <p className="text-sm text-gray-200">Specializes in military and defense robotics, autonomous vehicles, and advanced manufacturing systems.</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-orange-300 mb-3 underline decoration-1 underline-offset-2">
                        Emerging Technologies & Future Directions
                      </h5>
                      <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-6 border border-orange-600/40">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h6 className="text-base font-bold text-yellow-300 mb-3">🚀 Next-Generation Developments</h6>
                            <ul className="space-y-2 text-sm">
                              <li>• <strong className="text-cyan-300">5G-Enabled Robotics:</strong> Ultra-low latency remote control</li>
                              <li>• <strong className="text-green-300">AI-Powered Manufacturing:</strong> Lights-out factories</li>
                              <li>• <strong className="text-purple-300">Swarm Robotics:</strong> Coordinated multi-robot systems</li>
                              <li>• <strong className="text-blue-300">Soft Robotics:</strong> Bio-inspired flexible robots</li>
                              <li>• <strong className="text-red-300">Quantum Robotics:</strong> Quantum-enhanced navigation</li>
                            </ul>
                          </div>

                          <div>
                            <h6 className="text-base font-bold text-pink-300 mb-3">🎯 Strategic Initiatives</h6>
                            <ul className="space-y-2 text-sm">
                              <li>• <strong className="text-indigo-300">Made in China 2025:</strong> Robotics as key industry</li>
                              <li>• <strong className="text-teal-300">Belt and Road:</strong> Global robotics expansion</li>
                              <li>• <strong className="text-amber-300">Smart City Projects:</strong> Urban robotics integration</li>
                              <li>• <strong className="text-lime-300">Healthcare Robotics:</strong> Aging population solutions</li>
                              <li>• <strong className="text-rose-300">Space Exploration:</strong> Lunar and Mars robotics</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-red-300 mb-4 underline decoration-1 underline-offset-2">
                    Fierce Chinese Robotics Competitions
                  </h4>

                  <p className="text-base leading-relaxed mb-6">
                    China hosts some of the world's most intense and spectacular robotics competitions, featuring high-stakes robot battles, advanced autonomous systems, and cutting-edge engineering. These competitions showcase the fierce competitive spirit and technological prowess of Chinese robotics teams.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-bold text-yellow-300 mb-3 underline decoration-1 underline-offset-2">
                        RoboMaster - DJI's Ultimate Robot Battle Arena
                      </h5>
                      <p className="text-base leading-relaxed mb-4">
                        <a href="https://www.robomaster.com/en-US" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline font-bold">RoboMaster</a> is China's premier robotics competition, organized by <strong className="text-blue-300">DJI</strong> since 2015. This intense battlefield competition features teams of robots engaging in strategic combat, requiring advanced engineering, AI programming, and real-time tactical decision-making. Over <strong className="text-green-300">200 universities</strong> from China and internationally compete in this high-stakes tournament.
                      </p>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openVideoModal('-o_WYEoxWGY')}
                        >
                          <img
                            src="https://img.youtube.com/vi/-o_WYEoxWGY/maxresdefault.jpg"
                            alt="RoboMaster 2019 Champion Final"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">2019 Champion Final SJTU vs NEU</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openVideoModal('VRL-xmK0nvw')}
                        >
                          <img
                            src="https://img.youtube.com/vi/VRL-xmK0nvw/maxresdefault.jpg"
                            alt="RoboMaster 2022 Grand Finals"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">2022 Grand Finals UW vs TAMU</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openVideoModal('a16aDyN3nfs')}
                        >
                          <img
                            src="https://img.youtube.com/vi/a16aDyN3nfs/maxresdefault.jpg"
                            alt="RoboMaster 2017 Finals"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">2017 Finals Robot Battles</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openVideoModal('EpRZWIOaPKU')}
                        >
                          <img
                            src="https://img.youtube.com/vi/EpRZWIOaPKU/maxresdefault.jpg"
                            alt="RoboMaster Youth Championship"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Youth Championship 2022</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-orange-300 mb-3 underline decoration-1 underline-offset-2">
                        Chinese Robot Combat & Fighting Championships
                      </h5>
                      <p className="text-base leading-relaxed mb-4">
                        China's robot fighting scene features intense combat competitions where heavily armored robots battle for supremacy. These competitions showcase advanced engineering, destructive weaponry, and strategic combat tactics in arena-style tournaments.
                      </p>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openVideoModal('yVTCXe-0798')}
                        >
                          <img
                            src="https://img.youtube.com/vi/yVTCXe-0798/maxresdefault.jpg"
                            alt="CMG World Robot Competition"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">CMG Mecha Fighting Series</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openVideoModal('Sq1QZB5baNw')}
                        >
                          <img
                            src="https://img.youtube.com/vi/Sq1QZB5baNw/maxresdefault.jpg"
                            alt="Chinese Robot Fighting Arena"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Robot Fighting Arena Battles</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openVideoModal('X2UxtKLZnNo')}
                        >
                          <img
                            src="https://img.youtube.com/vi/X2UxtKLZnNo/maxresdefault.jpg"
                            alt="Chinese Robot Combat Championship"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Robot Combat Championship</p>
                          </div>
                        </div>

                        <div
                          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => openVideoModal('29ECwExc-_M')}
                        >
                          <img
                            src="https://img.youtube.com/vi/29ECwExc-_M/maxresdefault.jpg"
                            alt="Chinese Humanoid Robot Competition"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={32} className="text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-sm font-semibold text-white">Humanoid Robot Showdown</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6 border border-red-600/40">
                      <h5 className="text-lg font-bold text-red-300 mb-3">🏆 Competition Highlights & Features</h5>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h6 className="text-base font-bold text-yellow-300 mb-3">🎯 RoboMaster Competition Features</h6>
                          <ul className="space-y-2 text-sm">
                            <li>• <strong className="text-cyan-300">Strategic Combat:</strong> Multi-robot team battles</li>
                            <li>• <strong className="text-green-300">Advanced AI:</strong> Autonomous and manual control</li>
                            <li>• <strong className="text-purple-300">Real-time Strategy:</strong> Base defense and attack</li>
                            <li>• <strong className="text-blue-300">Engineering Excellence:</strong> Custom robot design</li>
                            <li>• <strong className="text-orange-300">Global Reach:</strong> International university teams</li>
                          </ul>
                        </div>

                        <div>
                          <h6 className="text-base font-bold text-pink-300 mb-3">⚔️ Combat Competition Elements</h6>
                          <ul className="space-y-2 text-sm">
                            <li>• <strong className="text-indigo-300">Destructive Weapons:</strong> Spinning discs, hammers, flippers</li>
                            <li>• <strong className="text-teal-300">Armor Systems:</strong> Advanced protective designs</li>
                            <li>• <strong className="text-amber-300">Arena Battles:</strong> Enclosed combat environments</li>
                            <li>• <strong className="text-lime-300">Elimination Rounds:</strong> Tournament-style competition</li>
                            <li>• <strong className="text-rose-300">Spectacle:</strong> High-energy entertainment value</li>
                          </ul>
                        </div>
                      </div>
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

          {/* Robotics Careers & Opportunities */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-2 underline-offset-4 decoration-green-400">
              Robotics Careers & Professional Opportunities
            </h2>

            <div className="space-y-6 ml-4">
              <div>
                <h3 className="text-2xl font-bold text-green-300 mb-4 underline decoration-1 underline-offset-2">
                  Career Paths in Robotics Engineering
                </h3>

                <p className="text-base leading-relaxed mb-6">
                  The robotics industry offers diverse and exciting career opportunities across multiple disciplines. From designing autonomous systems to programming AI algorithms, robotics professionals are shaping the future of technology and automation. With the global robotics market projected to reach <strong className="text-yellow-300">$218 billion by 2030</strong>, career prospects in this field are exceptionally promising.
                </p>

                <div>
                  <h4 className="text-xl font-bold text-blue-300 mb-4 underline decoration-1 underline-offset-2">
                    Core Robotics Engineering Roles
                  </h4>

                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-600/40">
                      <h5 className="text-lg font-bold text-blue-300 mb-3">🤖 Robotics Engineer</h5>
                      <p className="text-sm text-gray-200 mb-2">Design, build, and test robotic systems and components</p>
                      <ul className="space-y-1 text-xs">
                        <li>• System integration and testing</li>
                        <li>• Mechanical design and prototyping</li>
                        <li>• Control systems development</li>
                        <li>• Performance optimization</li>
                      </ul>
                    </div>

                    <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-600/40">
                      <h5 className="text-lg font-bold text-purple-300 mb-3">🧠 AI/ML Robotics Engineer</h5>
                      <p className="text-sm text-gray-200 mb-2">Develop artificial intelligence and machine learning algorithms for robots</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Computer vision systems</li>
                        <li>• Neural network development</li>
                        <li>• Autonomous navigation</li>
                        <li>• Behavioral programming</li>
                      </ul>
                    </div>

                    <div className="bg-green-900/30 rounded-lg p-4 border border-green-600/40">
                      <h5 className="text-lg font-bold text-green-300 mb-3">💻 Software Engineer</h5>
                      <p className="text-sm text-gray-200 mb-2">Create software systems and applications for robotic platforms</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Real-time control software</li>
                        <li>• User interface development</li>
                        <li>• Simulation and modeling</li>
                        <li>• System architecture design</li>
                      </ul>
                    </div>

                    <div className="bg-orange-900/30 rounded-lg p-4 border border-orange-600/40">
                      <h5 className="text-lg font-bold text-orange-300 mb-3">⚡ Hardware Engineer</h5>
                      <p className="text-sm text-gray-200 mb-2">Design and develop electronic systems and components</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Circuit board design</li>
                        <li>• Sensor integration</li>
                        <li>• Power systems</li>
                        <li>• Embedded systems</li>
                      </ul>
                    </div>

                    <div className="bg-red-900/30 rounded-lg p-4 border border-red-600/40">
                      <h5 className="text-lg font-bold text-red-300 mb-3">🔧 Mechanical Engineer</h5>
                      <p className="text-sm text-gray-200 mb-2">Design mechanical systems, actuators, and structural components</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Kinematic design</li>
                        <li>• Materials selection</li>
                        <li>• Manufacturing processes</li>
                        <li>• Structural analysis</li>
                      </ul>
                    </div>

                    <div className="bg-cyan-900/30 rounded-lg p-4 border border-cyan-600/40">
                      <h5 className="text-lg font-bold text-cyan-300 mb-3">👁️ Computer Vision Engineer</h5>
                      <p className="text-sm text-gray-200 mb-2">Develop visual perception systems for robotic applications</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Image processing algorithms</li>
                        <li>• Object recognition</li>
                        <li>• 3D reconstruction</li>
                        <li>• Visual SLAM</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-yellow-300 mb-4 underline decoration-1 underline-offset-2">
                    Specialized Robotics Positions
                  </h4>

                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    <div className="bg-indigo-900/30 rounded-lg p-3 border border-indigo-600/40">
                      <h6 className="text-base font-bold text-indigo-300 mb-2">🎮 Controls Engineer</h6>
                      <p className="text-xs text-gray-200">Design control algorithms and feedback systems</p>
                    </div>

                    <div className="bg-teal-900/30 rounded-lg p-3 border border-teal-600/40">
                      <h6 className="text-base font-bold text-teal-300 mb-2">🔬 Research Scientist</h6>
                      <p className="text-xs text-gray-200">Conduct advanced research in robotics technologies</p>
                    </div>

                    <div className="bg-pink-900/30 rounded-lg p-3 border border-pink-600/40">
                      <h6 className="text-base font-bold text-pink-300 mb-2">🏭 Automation Engineer</h6>
                      <p className="text-xs text-gray-200">Implement robotic solutions in manufacturing</p>
                    </div>

                    <div className="bg-amber-900/30 rounded-lg p-3 border border-amber-600/40">
                      <h6 className="text-base font-bold text-amber-300 mb-2">🛠️ Field Service Engineer</h6>
                      <p className="text-xs text-gray-200">Maintain and repair robotic systems on-site</p>
                    </div>

                    <div className="bg-lime-900/30 rounded-lg p-3 border border-lime-600/40">
                      <h6 className="text-base font-bold text-lime-300 mb-2">📊 Product Manager</h6>
                      <p className="text-xs text-gray-200">Lead product development and strategy</p>
                    </div>

                    <div className="bg-rose-900/30 rounded-lg p-3 border border-rose-600/40">
                      <h6 className="text-base font-bold text-rose-300 mb-2">💼 Sales Engineer</h6>
                      <p className="text-xs text-gray-200">Technical sales and customer support</p>
                    </div>

                    <div className="bg-violet-900/30 rounded-lg p-3 border border-violet-600/40">
                      <h6 className="text-base font-bold text-violet-300 mb-2">🎯 Systems Integrator</h6>
                      <p className="text-xs text-gray-200">Integrate robotic systems into existing workflows</p>
                    </div>

                    <div className="bg-emerald-900/30 rounded-lg p-3 border border-emerald-600/40">
                      <h6 className="text-base font-bold text-emerald-300 mb-2">🔍 Quality Assurance</h6>
                      <p className="text-xs text-gray-200">Test and validate robotic systems</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-cyan-300 mb-4 underline decoration-1 underline-offset-2">
                    Leading Robotics Companies - Career Opportunities
                  </h4>

                  <p className="text-base leading-relaxed mb-6">
                    Explore career opportunities at the world's leading robotics companies. These organizations are at the forefront of robotics innovation and offer exciting career paths for engineers, researchers, and technology professionals.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-bold text-blue-300 mb-3 underline decoration-1 underline-offset-2">
                        Major Robotics & AI Companies
                      </h5>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-600/40">
                          <h6 className="text-base font-bold text-blue-300 mb-2">
                            <a href="https://bostondynamics.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">Boston Dynamics</a>
                          </h6>
                          <p className="text-sm text-gray-200">World leader in mobile robotics - Atlas, Spot, Stretch robots</p>
                        </div>

                        <div className="bg-red-900/20 rounded-lg p-4 border border-red-600/40">
                          <h6 className="text-base font-bold text-red-300 mb-2">
                            <a href="https://www.tesla.com/careers/search" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 underline">Tesla</a>
                          </h6>
                          <p className="text-sm text-gray-200">Optimus humanoid robots, AI & robotics engineering</p>
                        </div>

                        <div className="bg-green-900/20 rounded-lg p-4 border border-green-600/40">
                          <h6 className="text-base font-bold text-green-300 mb-2">
                            <a href="https://www.amazon.jobs/" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 underline">Amazon Robotics</a>
                          </h6>
                          <p className="text-sm text-gray-200">Warehouse automation, fulfillment robotics, logistics</p>
                        </div>

                        <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-600/40">
                          <h6 className="text-base font-bold text-purple-300 mb-2">
                            <a href="https://www.agilityrobotics.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 underline">Agility Robotics</a>
                          </h6>
                          <p className="text-sm text-gray-200">Digit humanoid robots for logistics and warehousing</p>
                        </div>

                        <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-600/40">
                          <h6 className="text-base font-bold text-orange-300 mb-2">
                            <a href="https://www.figure.ai/careers" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200 underline">Figure AI</a>
                          </h6>
                          <p className="text-sm text-gray-200">General-purpose humanoid robots with AI integration</p>
                        </div>

                        <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-600/40">
                          <h6 className="text-base font-bold text-cyan-300 mb-2">
                            <a href="https://neuralink.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200 underline">Neuralink</a>
                          </h6>
                          <p className="text-sm text-gray-200">Brain-computer interfaces, neural robotics, medical devices</p>
                        </div>

                        <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-600/40">
                          <h6 className="text-base font-bold text-yellow-300 mb-2">
                            <a href="https://www.unitree.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 underline">Unitree Robotics</a>
                          </h6>
                          <p className="text-sm text-gray-200">Quadruped robots, consumer robotics, AI navigation</p>
                        </div>

                        <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-600/40">
                          <h6 className="text-base font-bold text-indigo-300 mb-2">
                            <a href="https://www.1x.tech/careers" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200 underline">1X Technologies</a>
                          </h6>
                          <p className="text-sm text-gray-200">Android workforce robots, service robotics</p>
                        </div>

                        <div className="bg-pink-900/20 rounded-lg p-4 border border-pink-600/40">
                          <h6 className="text-base font-bold text-pink-300 mb-2">
                            <a href="https://sanctuary.ai/careers" target="_blank" rel="noopener noreferrer" className="hover:text-pink-200 underline">Sanctuary AI</a>
                          </h6>
                          <p className="text-sm text-gray-200">Human-like intelligence in general-purpose robots</p>
                        </div>

                        <div className="bg-teal-900/20 rounded-lg p-4 border border-teal-600/40">
                          <h6 className="text-base font-bold text-teal-300 mb-2">
                            <a href="https://apptronik.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 underline">Apptronik</a>
                          </h6>
                          <p className="text-sm text-gray-200">Apollo humanoid robots for logistics and manufacturing</p>
                        </div>

                        <div className="bg-lime-900/20 rounded-lg p-4 border border-lime-600/40">
                          <h6 className="text-base font-bold text-lime-300 mb-2">
                            <a href="https://www.irobot.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-lime-200 underline">iRobot</a>
                          </h6>
                          <p className="text-sm text-gray-200">Roomba vacuum robots, consumer robotics, home automation</p>
                        </div>

                        <div className="bg-rose-900/20 rounded-lg p-4 border border-rose-600/40">
                          <h6 className="text-base font-bold text-rose-300 mb-2">
                            <a href="https://www.ubtrobot.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-rose-200 underline">UBTECH Robotics</a>
                          </h6>
                          <p className="text-sm text-gray-200">Walker humanoid robots, Alpha series, educational robotics</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-cyan-300 mb-4 underline decoration-1 underline-offset-2">
                    Leading Robotics Companies - Career Opportunities
                  </h4>

                  <p className="text-base leading-relaxed mb-6">
                    Explore career opportunities at the world's leading robotics companies. These organizations are at the forefront of robotics innovation and offer exciting career paths for engineers, researchers, and technology professionals.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-bold text-blue-300 mb-3 underline decoration-1 underline-offset-2">
                        Major Robotics & AI Companies
                      </h5>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-600/40">
                          <h6 className="text-base font-bold text-blue-300 mb-2">
                            <a href="https://bostondynamics.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">Boston Dynamics</a>
                          </h6>
                          <p className="text-sm text-gray-200">World leader in mobile robotics - Atlas, Spot, Stretch robots</p>
                        </div>

                        <div className="bg-red-900/20 rounded-lg p-4 border border-red-600/40">
                          <h6 className="text-base font-bold text-red-300 mb-2">
                            <a href="https://www.tesla.com/careers/search" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 underline">Tesla</a>
                          </h6>
                          <p className="text-sm text-gray-200">Optimus humanoid robots, AI & robotics engineering</p>
                        </div>

                        <div className="bg-green-900/20 rounded-lg p-4 border border-green-600/40">
                          <h6 className="text-base font-bold text-green-300 mb-2">
                            <a href="https://www.amazon.jobs/" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 underline">Amazon Robotics</a>
                          </h6>
                          <p className="text-sm text-gray-200">Warehouse automation, fulfillment robotics, logistics</p>
                        </div>

                        <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-600/40">
                          <h6 className="text-base font-bold text-purple-300 mb-2">
                            <a href="https://www.agilityrobotics.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 underline">Agility Robotics</a>
                          </h6>
                          <p className="text-sm text-gray-200">Digit humanoid robots for logistics and warehousing</p>
                        </div>

                        <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-600/40">
                          <h6 className="text-base font-bold text-orange-300 mb-2">
                            <a href="https://www.figure.ai/careers" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200 underline">Figure AI</a>
                          </h6>
                          <p className="text-sm text-gray-200">General-purpose humanoid robots with AI integration</p>
                        </div>

                        <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-600/40">
                          <h6 className="text-base font-bold text-cyan-300 mb-2">
                            <a href="https://neuralink.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200 underline">Neuralink</a>
                          </h6>
                          <p className="text-sm text-gray-200">Brain-computer interfaces, neural robotics, medical devices</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-green-300 mb-3 underline decoration-1 underline-offset-2">
                        Industrial Robotics Companies
                      </h5>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-yellow-900/20 rounded-lg p-3 border border-yellow-600/40">
                          <h6 className="text-base font-bold text-yellow-300 mb-2">
                            <a href="https://careers.abb/global/en/home" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 underline">ABB Robotics</a>
                          </h6>
                          <p className="text-xs text-gray-200">Industrial automation, collaborative robots</p>
                        </div>

                        <div className="bg-orange-900/20 rounded-lg p-3 border border-orange-600/40">
                          <h6 className="text-base font-bold text-orange-300 mb-2">
                            <a href="https://www.kuka.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200 underline">KUKA</a>
                          </h6>
                          <p className="text-xs text-gray-200">Automotive robotics, precision manufacturing</p>
                        </div>

                        <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-600/40">
                          <h6 className="text-base font-bold text-purple-300 mb-2">
                            <a href="https://www.fanuc.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 underline">FANUC</a>
                          </h6>
                          <p className="text-xs text-gray-200">CNC systems, factory automation</p>
                        </div>

                        <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-600/40">
                          <h6 className="text-base font-bold text-blue-300 mb-2">
                            <a href="https://www.universal-robots.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">Universal Robots</a>
                          </h6>
                          <p className="text-xs text-gray-200">Collaborative robots, human-robot collaboration</p>
                        </div>

                        <div className="bg-red-900/20 rounded-lg p-3 border border-red-600/40">
                          <h6 className="text-base font-bold text-red-300 mb-2">
                            <a href="https://en.siasun.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 underline">SIASUN Robot</a>
                          </h6>
                          <p className="text-xs text-gray-200">China's largest robotics manufacturer</p>
                        </div>

                        <div className="bg-green-900/20 rounded-lg p-3 border border-green-600/40">
                          <h6 className="text-base font-bold text-green-300 mb-2">
                            <a href="https://www.yaskawa.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 underline">Yaskawa</a>
                          </h6>
                          <p className="text-xs text-gray-200">Motoman robots, servo systems</p>
                        </div>

                        <div className="bg-indigo-900/20 rounded-lg p-3 border border-indigo-600/40">
                          <h6 className="text-base font-bold text-indigo-300 mb-2">
                            <a href="https://www.kawasaki.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200 underline">Kawasaki Robotics</a>
                          </h6>
                          <p className="text-xs text-gray-200">Heavy-duty industrial robots</p>
                        </div>

                        <div className="bg-teal-900/20 rounded-lg p-3 border border-teal-600/40">
                          <h6 className="text-base font-bold text-teal-300 mb-2">
                            <a href="https://www.staubli.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 underline">Stäubli</a>
                          </h6>
                          <p className="text-xs text-gray-200">Precision robotics, clean room applications</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-purple-300 mb-3 underline decoration-1 underline-offset-2">
                        Tech Giants & AI Companies
                      </h5>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-600/40">
                          <h6 className="text-base font-bold text-blue-300 mb-2">
                            <a href="https://careers.google.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">Google/Alphabet</a>
                          </h6>
                          <p className="text-xs text-gray-200">AI research, autonomous vehicles, robotics R&D</p>
                        </div>

                        <div className="bg-gray-900/20 rounded-lg p-3 border border-gray-600/40">
                          <h6 className="text-base font-bold text-gray-300 mb-2">
                            <a href="https://careers.apple.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 underline">Apple</a>
                          </h6>
                          <p className="text-xs text-gray-200">Autonomous systems, machine learning, robotics</p>
                        </div>

                        <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-600/40">
                          <h6 className="text-base font-bold text-blue-300 mb-2">
                            <a href="https://careers.microsoft.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">Microsoft</a>
                          </h6>
                          <p className="text-xs text-gray-200">AI platforms, robotics development tools</p>
                        </div>

                        <div className="bg-green-900/20 rounded-lg p-3 border border-green-600/40">
                          <h6 className="text-base font-bold text-green-300 mb-2">
                            <a href="https://www.nvidia.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 underline">NVIDIA</a>
                          </h6>
                          <p className="text-xs text-gray-200">AI computing, robotics simulation, autonomous systems</p>
                        </div>

                        <div className="bg-orange-900/20 rounded-lg p-3 border border-orange-600/40">
                          <h6 className="text-base font-bold text-orange-300 mb-2">
                            <a href="https://www.metacareers.com/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200 underline">Meta (Facebook)</a>
                          </h6>
                          <p className="text-xs text-gray-200">VR/AR robotics, AI research, metaverse</p>
                        </div>

                        <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-600/40">
                          <h6 className="text-base font-bold text-purple-300 mb-2">
                            <a href="https://openai.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 underline">OpenAI</a>
                          </h6>
                          <p className="text-xs text-gray-200">AI research, robotics applications, AGI development</p>
                        </div>

                        <div className="bg-red-900/20 rounded-lg p-3 border border-red-600/40">
                          <h6 className="text-base font-bold text-red-300 mb-2">
                            <a href="https://www.anthropic.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 underline">Anthropic</a>
                          </h6>
                          <p className="text-xs text-gray-200">AI safety, robotics ethics, safe AI systems</p>
                        </div>

                        <div className="bg-yellow-900/20 rounded-lg p-3 border border-yellow-600/40">
                          <h6 className="text-base font-bold text-yellow-300 mb-2">
                            <a href="https://www.deepmind.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 underline">DeepMind</a>
                          </h6>
                          <p className="text-xs text-gray-200">AI research, robotics learning, neural networks</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-orange-300 mb-3 underline decoration-1 underline-offset-2">
                        Aerospace & Defense Robotics
                      </h5>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-600/40">
                          <h6 className="text-base font-bold text-blue-300 mb-2">
                            <a href="https://www.nasa.gov/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">NASA</a>
                          </h6>
                          <p className="text-xs text-gray-200">Space robotics, planetary rovers, robotic missions</p>
                        </div>

                        <div className="bg-gray-900/20 rounded-lg p-3 border border-gray-600/40">
                          <h6 className="text-base font-bold text-gray-300 mb-2">
                            <a href="https://www.spacex.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 underline">SpaceX</a>
                          </h6>
                          <p className="text-xs text-gray-200">Autonomous systems, rocket recovery, space robotics</p>
                        </div>

                        <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-600/40">
                          <h6 className="text-base font-bold text-blue-300 mb-2">
                            <a href="https://www.blueorigin.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">Blue Origin</a>
                          </h6>
                          <p className="text-xs text-gray-200">Space systems, lunar robotics, autonomous spacecraft</p>
                        </div>

                        <div className="bg-red-900/20 rounded-lg p-3 border border-red-600/40">
                          <h6 className="text-base font-bold text-red-300 mb-2">
                            <a href="https://www.lockheedmartin.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 underline">Lockheed Martin</a>
                          </h6>
                          <p className="text-xs text-gray-200">Defense robotics, autonomous systems, space technology</p>
                        </div>

                        <div className="bg-green-900/20 rounded-lg p-3 border border-green-600/40">
                          <h6 className="text-base font-bold text-green-300 mb-2">
                            <a href="https://boeing.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 underline">Boeing</a>
                          </h6>
                          <p className="text-xs text-gray-200">Aerospace robotics, autonomous aircraft, space systems</p>
                        </div>

                        <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-600/40">
                          <h6 className="text-base font-bold text-purple-300 mb-2">
                            <a href="https://www.northropgrumman.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 underline">Northrop Grumman</a>
                          </h6>
                          <p className="text-xs text-gray-200">Defense systems, autonomous vehicles, space robotics</p>
                        </div>

                        <div className="bg-orange-900/20 rounded-lg p-3 border border-orange-600/40">
                          <h6 className="text-base font-bold text-orange-300 mb-2">
                            <a href="https://www.raytheon.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200 underline">Raytheon</a>
                          </h6>
                          <p className="text-xs text-gray-200">Defense robotics, missile systems, autonomous platforms</p>
                        </div>

                        <div className="bg-indigo-900/20 rounded-lg p-3 border border-indigo-600/40">
                          <h6 className="text-base font-bold text-indigo-300 mb-2">
                            <a href="https://www.generaldynamics.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200 underline">General Dynamics</a>
                          </h6>
                          <p className="text-xs text-gray-200">Military robotics, unmanned systems, defense technology</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-red-300 mb-3 underline decoration-1 underline-offset-2">
                        Automotive & Autonomous Vehicles
                      </h5>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-600/40">
                          <h6 className="text-base font-bold text-blue-300 mb-2">
                            <a href="https://waymo.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">Waymo</a>
                          </h6>
                          <p className="text-xs text-gray-200">Self-driving cars, autonomous vehicle technology</p>
                        </div>

                        <div className="bg-green-900/20 rounded-lg p-3 border border-green-600/40">
                          <h6 className="text-base font-bold text-green-300 mb-2">
                            <a href="https://getcruise.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 underline">Cruise</a>
                          </h6>
                          <p className="text-xs text-gray-200">Autonomous vehicles, robotaxi services</p>
                        </div>

                        <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-600/40">
                          <h6 className="text-base font-bold text-purple-300 mb-2">
                            <a href="https://aurora.tech/careers" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 underline">Aurora</a>
                          </h6>
                          <p className="text-xs text-gray-200">Self-driving technology, trucking automation</p>
                        </div>

                        <div className="bg-orange-900/20 rounded-lg p-3 border border-orange-600/40">
                          <h6 className="text-base font-bold text-orange-300 mb-2">
                            <a href="https://www.ford.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200 underline">Ford</a>
                          </h6>
                          <p className="text-xs text-gray-200">Autonomous vehicles, manufacturing robotics</p>
                        </div>

                        <div className="bg-red-900/20 rounded-lg p-3 border border-red-600/40">
                          <h6 className="text-base font-bold text-red-300 mb-2">
                            <a href="https://www.gm.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 underline">General Motors</a>
                          </h6>
                          <p className="text-xs text-gray-200">Autonomous driving, manufacturing automation</p>
                        </div>

                        <div className="bg-yellow-900/20 rounded-lg p-3 border border-yellow-600/40">
                          <h6 className="text-base font-bold text-yellow-300 mb-2">
                            <a href="https://www.bmwgroup.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 underline">BMW</a>
                          </h6>
                          <p className="text-xs text-gray-200">Autonomous driving, production robotics</p>
                        </div>

                        <div className="bg-indigo-900/20 rounded-lg p-3 border border-indigo-600/40">
                          <h6 className="text-base font-bold text-indigo-300 mb-2">
                            <a href="https://www.toyota.com/careers/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200 underline">Toyota</a>
                          </h6>
                          <p className="text-xs text-gray-200">Manufacturing robotics, autonomous systems</p>
                        </div>

                        <div className="bg-teal-900/20 rounded-lg p-3 border border-teal-600/40">
                          <h6 className="text-base font-bold text-teal-300 mb-2">
                            <a href="https://www.volkswagen.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 underline">Volkswagen</a>
                          </h6>
                          <p className="text-xs text-gray-200">Autonomous driving, factory automation</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-cyan-300 mb-3 underline decoration-1 underline-offset-2">
                        Medical & Healthcare Robotics
                      </h5>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-600/40">
                          <h6 className="text-base font-bold text-blue-300 mb-2">
                            <a href="https://www.intuitive.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">Intuitive Surgical</a>
                          </h6>
                          <p className="text-xs text-gray-200">da Vinci surgical robots, medical robotics</p>
                        </div>

                        <div className="bg-green-900/20 rounded-lg p-3 border border-green-600/40">
                          <h6 className="text-base font-bold text-green-300 mb-2">
                            <a href="https://www.medtronic.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 underline">Medtronic</a>
                          </h6>
                          <p className="text-xs text-gray-200">Medical devices, surgical robotics, healthcare AI</p>
                        </div>

                        <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-600/40">
                          <h6 className="text-base font-bold text-purple-300 mb-2">
                            <a href="https://www.stryker.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 underline">Stryker</a>
                          </h6>
                          <p className="text-xs text-gray-200">Surgical robotics, orthopedic systems</p>
                        </div>

                        <div className="bg-orange-900/20 rounded-lg p-3 border border-orange-600/40">
                          <h6 className="text-base font-bold text-orange-300 mb-2">
                            <a href="https://www.jnj.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200 underline">Johnson & Johnson</a>
                          </h6>
                          <p className="text-xs text-gray-200">Medical robotics, surgical systems</p>
                        </div>

                        <div className="bg-red-900/20 rounded-lg p-3 border border-red-600/40">
                          <h6 className="text-base font-bold text-red-300 mb-2">
                            <a href="https://www.zimmer.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 underline">Zimmer Biomet</a>
                          </h6>
                          <p className="text-xs text-gray-200">Orthopedic robotics, surgical navigation</p>
                        </div>

                        <div className="bg-yellow-900/20 rounded-lg p-3 border border-yellow-600/40">
                          <h6 className="text-base font-bold text-yellow-300 mb-2">
                            <a href="https://www.philips.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 underline">Philips Healthcare</a>
                          </h6>
                          <p className="text-xs text-gray-200">Medical imaging, healthcare robotics</p>
                        </div>

                        <div className="bg-indigo-900/20 rounded-lg p-3 border border-indigo-600/40">
                          <h6 className="text-base font-bold text-indigo-300 mb-2">
                            <a href="https://www.siemens-healthineers.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200 underline">Siemens Healthineers</a>
                          </h6>
                          <p className="text-xs text-gray-200">Medical technology, diagnostic robotics</p>
                        </div>

                        <div className="bg-teal-900/20 rounded-lg p-3 border border-teal-600/40">
                          <h6 className="text-base font-bold text-teal-300 mb-2">
                            <a href="https://www.gehealthcare.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 underline">GE Healthcare</a>
                          </h6>
                          <p className="text-xs text-gray-200">Medical imaging, healthcare automation</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-pink-300 mb-3 underline decoration-1 underline-offset-2">
                        Consumer & Service Robotics
                      </h5>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-green-900/20 rounded-lg p-3 border border-green-600/40">
                          <h6 className="text-base font-bold text-green-300 mb-2">
                            <a href="https://www.ecovacs.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 underline">Ecovacs</a>
                          </h6>
                          <p className="text-xs text-gray-200">DEEBOT vacuum robots, home cleaning automation</p>
                        </div>

                        <div className="bg-orange-900/20 rounded-lg p-3 border border-orange-600/40">
                          <h6 className="text-base font-bold text-orange-300 mb-2">
                            <a href="https://www.roborock.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200 underline">Roborock</a>
                          </h6>
                          <p className="text-xs text-gray-200">Premium robotic vacuums, smart home robotics</p>
                        </div>

                        <div className="bg-gray-900/20 rounded-lg p-3 border border-gray-600/40">
                          <h6 className="text-base font-bold text-gray-300 mb-2">
                            <a href="https://www.mi.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 underline">Xiaomi</a>
                          </h6>
                          <p className="text-xs text-gray-200">Mijia robots, smart home ecosystem</p>
                        </div>

                        <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-600/40">
                          <h6 className="text-base font-bold text-blue-300 mb-2">
                            <a href="https://www.shark.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 underline">Shark</a>
                          </h6>
                          <p className="text-xs text-gray-200">Robotic vacuums, home cleaning solutions</p>
                        </div>

                        <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-600/40">
                          <h6 className="text-base font-bold text-purple-300 mb-2">
                            <a href="https://www.dyson.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 underline">Dyson</a>
                          </h6>
                          <p className="text-xs text-gray-200">Robotic vacuums, home automation technology</p>
                        </div>

                        <div className="bg-red-900/20 rounded-lg p-3 border border-red-600/40">
                          <h6 className="text-base font-bold text-red-300 mb-2">
                            <a href="https://www.anki.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 underline">Anki</a>
                          </h6>
                          <p className="text-xs text-gray-200">Consumer robotics, entertainment robots</p>
                        </div>

                        <div className="bg-yellow-900/20 rounded-lg p-3 border border-yellow-600/40">
                          <h6 className="text-base font-bold text-yellow-300 mb-2">
                            <a href="https://www.sphero.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 underline">Sphero</a>
                          </h6>
                          <p className="text-xs text-gray-200">Educational robots, STEM robotics</p>
                        </div>

                        <div className="bg-indigo-900/20 rounded-lg p-3 border border-indigo-600/40">
                          <h6 className="text-base font-bold text-indigo-300 mb-2">
                            <a href="https://www.lego.com/careers" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200 underline">LEGO</a>
                          </h6>
                          <p className="text-xs text-gray-200">Educational robotics, MINDSTORMS platform</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-6 border border-green-600/40 mt-6">
                      <h5 className="text-xl font-bold text-green-300 mb-3">🚀 Career Growth & Opportunities</h5>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h6 className="text-base font-bold text-blue-300 mb-3">💰 Salary Ranges (USD)</h6>
                          <ul className="space-y-2 text-sm">
                            <li>• <strong className="text-yellow-300">Entry Level:</strong> $70,000 - $95,000</li>
                            <li>• <strong className="text-green-300">Mid Level:</strong> $95,000 - $140,000</li>
                            <li>• <strong className="text-orange-300">Senior Level:</strong> $140,000 - $200,000</li>
                            <li>• <strong className="text-red-300">Principal/Staff:</strong> $200,000 - $300,000+</li>
                            <li>• <strong className="text-purple-300">Leadership:</strong> $250,000 - $500,000+</li>
                          </ul>
                        </div>

                        <div>
                          <h6 className="text-base font-bold text-cyan-300 mb-3">🎯 Key Skills in Demand</h6>
                          <ul className="space-y-2 text-sm">
                            <li>• <strong className="text-indigo-300">Programming:</strong> Python, C++, ROS, MATLAB</li>
                            <li>• <strong className="text-teal-300">AI/ML:</strong> TensorFlow, PyTorch, Computer Vision</li>
                            <li>• <strong className="text-pink-300">Hardware:</strong> Embedded systems, sensors, actuators</li>
                            <li>• <strong className="text-amber-300">Mathematics:</strong> Linear algebra, control theory</li>
                            <li>• <strong className="text-lime-300">Simulation:</strong> Gazebo, Unity, MATLAB Simulink</li>
                          </ul>
                        </div>
                      </div>
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
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 p-2 sm:p-4"
          style={{
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={closeVideoModal}
        >
          <div
            className="absolute w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animation: clickPosition
                ? `scaleFromPoint 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`
                : 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transformOrigin: clickPosition
                ? `${((clickPosition.x / window.innerWidth) * 100)}% ${((clickPosition.y / window.innerHeight) * 100)}%`
                : 'center center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-black/70 hover:bg-black/90 rounded-full p-2 transition-all duration-200 hover:scale-110"
            >
              <CloseIcon size={20} className="text-white" />
            </button>

            {/* Shimmer Loading Effect */}
            {videoLoading && (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="w-full h-full relative overflow-hidden">
                  {/* Shimmer Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse"></div>

                  {/* Shimmer Wave */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    style={{
                      animation: 'shimmer 1.5s infinite',
                      transform: 'translateX(-100%)'
                    }}
                  ></div>

                  {/* Loading Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                      <p className="text-white/80 text-sm font-medium">Loading video...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* YouTube Iframe */}
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="Robotics Video"
              className={`w-full h-full border-0 transition-opacity duration-300 ${videoLoading ? 'opacity-0' : 'opacity-100'}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={handleVideoLoad}
            />
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes scaleFromPoint {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.1);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default RoboticsPage;
