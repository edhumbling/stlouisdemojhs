import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Rocket, Play, X as CloseIcon, Menu, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';

const SpaceExplorationPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);

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

  // Navigation sections
  const navigationSections = [
    { id: 'nasa-missions', title: 'NASA Missions', icon: '🚀' },
    { id: 'private-space', title: 'Private Space Companies', icon: '🏢' },
    { id: 'space-stations', title: 'Space Stations', icon: '🛰️' },
    { id: 'mars-exploration', title: 'Mars Exploration', icon: '🔴' },
    { id: 'space-telescopes', title: 'Space Telescopes', icon: '🔭' },
    { id: 'careers', title: 'Space Careers', icon: '👨‍🚀' },
    { id: 'future', title: 'Future Missions', icon: '🌌' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setShowNavMenu(false);
    }
  };

  // Close navigation menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target as Node)) {
        setShowNavMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Space Exploration | NASA Missions, Private Space Companies & Astronomy - St. Louis Demonstration JHS"
        description="Explore the universe with comprehensive space exploration resources covering NASA missions, SpaceX, Mars rovers, space telescopes, astronaut careers, and the future of space travel."
        keywords="space exploration, NASA missions, SpaceX, Mars exploration, space telescopes, astronaut careers, space science, astronomy, space technology"
        url="/space-exploration"
      />
      <Header />

      {/* Back Navigation Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 py-3 sm:py-4 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back to STEM</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Space Exploration
              </h1>
            </div>

            {/* Navigation Menu */}
            <div className="relative" ref={navMenuRef}>
              <button
                onClick={() => setShowNavMenu(!showNavMenu)}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-cyan-700/50 hover:bg-cyan-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-cyan-500/30"
              >
                <Menu size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Navigate</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${showNavMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showNavMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700/50 py-2 z-50">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-700/50">
                    Quick Navigation
                  </div>
                  {navigationSections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-600/30 transition-colors duration-200 text-sm"
                    >
                      <span className="text-lg">{section.icon}</span>
                      <span className="text-white font-medium">{section.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative mb-8">
              <img
                src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Space Exploration"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  🚀 Explore the Universe
                </h2>
                <p className="text-lg sm:text-xl text-gray-200 max-w-3xl">
                  Journey through space exploration from NASA missions to private space companies, Mars rovers to space telescopes, and discover your path to the stars.
                </p>
              </div>
            </div>
          </div>

          {/* NASA Missions Section */}
          <div id="nasa-missions" className="mb-12">
            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-2xl p-6 sm:p-8 border border-blue-600/40">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-300 mb-6 underline decoration-2 underline-offset-4">
                🚀 NASA Missions & Programs
              </h3>

              <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-200">
                <strong className="text-blue-300">NASA</strong> continues to push the boundaries of human knowledge and exploration with groundbreaking missions that inspire generations. From returning humans to the Moon through the <strong className="text-purple-300">Artemis Program</strong> to exploring Mars with advanced rovers and preparing for future crewed missions to the Red Planet.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-purple-300 mb-4 underline decoration-1 underline-offset-2">
                    Artemis Program - Return to the Moon
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    The <a href="https://www.nasa.gov/humans-in-space/artemis/" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline font-bold">Artemis Program</a> represents humanity's bold return to the Moon, with plans to establish a sustainable lunar presence by <strong className="text-yellow-300">2028</strong>. <strong className="text-blue-300">Artemis III</strong> will land the first woman and next man on the lunar surface, while <strong className="text-green-300">Artemis Base Camp</strong> will serve as a stepping stone to Mars exploration.
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('_T8cn2J13-4', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/_T8cn2J13-4/maxresdefault.jpg"
                        alt="Artemis Program Overview"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Artemis Program Overview</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('4YKGsgZMoXE', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/4YKGsgZMoXE/maxresdefault.jpg"
                        alt="Artemis II Mission"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Artemis II Mission</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('vl6jn-DdafM', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/vl6jn-DdafM/maxresdefault.jpg"
                        alt="Orion Spacecraft"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Orion Spacecraft</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('weNHIyVL5PM', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/weNHIyVL5PM/maxresdefault.jpg"
                        alt="Space Launch System"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Space Launch System</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-600/40">
                    <h5 className="text-lg font-bold text-purple-300 mb-2">🌙 Artemis Mission Timeline</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-blue-300">Artemis I (2022):</strong> Uncrewed lunar flyby mission completed</li>
                        <li>• <strong className="text-green-300">Artemis II (2025):</strong> Crewed lunar flyby mission</li>
                        <li>• <strong className="text-yellow-300">Artemis III (2026):</strong> First lunar landing since Apollo</li>
                      </ul>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-orange-300">Artemis IV (2028):</strong> Lunar Gateway station assembly</li>
                        <li>• <strong className="text-purple-300">Artemis V (2029):</strong> Extended lunar surface operations</li>
                        <li>• <strong className="text-cyan-300">2030s:</strong> Sustainable lunar base establishment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Private Space Companies Section */}
          <div id="private-space" className="mb-12">
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-6 sm:p-8 border border-orange-600/40">
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-300 mb-6 underline decoration-2 underline-offset-4">
                🏢 Private Space Companies Revolution
              </h3>

              <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-200">
                The <strong className="text-orange-300">commercial space industry</strong> has revolutionized space exploration with companies like <strong className="text-blue-300">SpaceX</strong>, <strong className="text-green-300">Blue Origin</strong>, and <strong className="text-purple-300">Virgin Galactic</strong> making space more accessible than ever before. These companies are driving innovation, reducing costs, and opening new frontiers for space tourism and exploration.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-blue-300 mb-4 underline decoration-1 underline-offset-2">
                    SpaceX - Revolutionizing Space Travel
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    <a href="https://www.spacex.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline font-bold">SpaceX</a>, founded by Elon Musk in 2002, has transformed space exploration with reusable rockets, crewed missions to the ISS, and ambitious plans for Mars colonization. The company's <strong className="text-green-300">Falcon 9</strong> and <strong className="text-purple-300">Falcon Heavy</strong> rockets have dramatically reduced launch costs, while <strong className="text-yellow-300">Starship</strong> promises to make interplanetary travel a reality.
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('A0FZIwabctw', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/A0FZIwabctw/maxresdefault.jpg"
                        alt="SpaceX Starship"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">SpaceX Starship</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('Z4TXCZG_NEY', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/Z4TXCZG_NEY/maxresdefault.jpg"
                        alt="Falcon Heavy Launch"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Falcon Heavy Launch</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('xY96v0OIcK4', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/xY96v0OIcK4/maxresdefault.jpg"
                        alt="Dragon Crew Mission"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Dragon Crew Mission</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('u0-pfzKbh2k', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/u0-pfzKbh2k/maxresdefault.jpg"
                        alt="Starlink Satellites"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Starlink Satellites</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-600/40 mb-6">
                    <h5 className="text-lg font-bold text-blue-300 mb-2">🚀 SpaceX Achievements</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-green-300">First private company</strong> to send astronauts to ISS</li>
                        <li>• <strong className="text-yellow-300">200+ successful</strong> Falcon 9 landings</li>
                        <li>• <strong className="text-purple-300">5,000+ Starlink</strong> satellites deployed</li>
                      </ul>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-orange-300">90% cost reduction</strong> in launch prices</li>
                        <li>• <strong className="text-cyan-300">Crew Dragon</strong> certified for human spaceflight</li>
                        <li>• <strong className="text-pink-300">Mars mission</strong> planned for 2029</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-green-300 mb-4 underline decoration-1 underline-offset-2">
                    Blue Origin - Gradual Path to Space
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    <a href="https://www.blueorigin.com/" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline font-bold">Blue Origin</a>, founded by Jeff Bezos, focuses on making space accessible through reusable rockets and space tourism. Their <strong className="text-blue-300">New Shepard</strong> suborbital vehicle has successfully flown paying customers to space, while <strong className="text-purple-300">New Glenn</strong> orbital rocket aims to compete with SpaceX's Falcon 9.
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('GQ98hGUe6FM', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/GQ98hGUe6FM/maxresdefault.jpg"
                        alt="Blue Origin New Shepard"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">New Shepard Flight</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('FjPv0S3z5tY', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/FjPv0S3z5tY/maxresdefault.jpg"
                        alt="Jeff Bezos Space Flight"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Jeff Bezos Space Flight</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('7hRxN_Fg0i4', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/7hRxN_Fg0i4/maxresdefault.jpg"
                        alt="Blue Origin New Glenn"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">New Glenn Rocket</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('d-HgVj0q5_s', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/d-HgVj0q5_s/maxresdefault.jpg"
                        alt="Blue Origin Space Tourism"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Space Tourism</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mars Exploration Section */}
          <div id="mars-exploration" className="mb-12">
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-6 sm:p-8 border border-red-600/40">
              <h3 className="text-2xl sm:text-3xl font-bold text-red-300 mb-6 underline decoration-2 underline-offset-4">
                🔴 Mars Exploration & Red Planet Missions
              </h3>

              <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-200">
                <strong className="text-red-300">Mars exploration</strong> represents humanity's next giant leap, with multiple rovers currently exploring the Red Planet and ambitious plans for human missions in the 2030s. From <strong className="text-blue-300">Perseverance</strong> searching for signs of ancient life to <strong className="text-green-300">Ingenuity</strong> achieving powered flight on another world, Mars continues to reveal its secrets.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-orange-300 mb-4 underline decoration-1 underline-offset-2">
                    Current Mars Missions
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    NASA's <a href="https://mars.nasa.gov/mars2020/" target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:text-orange-200 underline font-bold">Perseverance rover</a> and <strong className="text-green-300">Ingenuity helicopter</strong> are revolutionizing our understanding of Mars. Perseverance is collecting samples for future return to Earth, while Ingenuity has completed over <strong className="text-yellow-300">70 flights</strong>, proving that powered flight is possible on Mars.
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('4czjS9h4Fpg', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/4czjS9h4Fpg/maxresdefault.jpg"
                        alt="Perseverance Mars Landing"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Perseverance Landing</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('GhsZUZmJvaM', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/GhsZUZmJvaM/maxresdefault.jpg"
                        alt="Ingenuity Mars Helicopter"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Ingenuity First Flight</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('nlnHJoWMjSs', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/nlnHJoWMjSs/maxresdefault.jpg"
                        alt="Mars Sample Return Mission"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Mars Sample Return</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('M4tdMR5HLtg', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/M4tdMR5HLtg/maxresdefault.jpg"
                        alt="Curiosity Mars Rover"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Curiosity Discoveries</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-4 border border-red-600/40">
                    <h5 className="text-lg font-bold text-red-300 mb-2">🚀 Future Mars Missions</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-blue-300">Mars Sample Return (2028):</strong> Bring Martian samples to Earth</li>
                        <li>• <strong className="text-green-300">Human Mars Mission (2030s):</strong> First crewed landing</li>
                        <li>• <strong className="text-purple-300">Mars Base Alpha:</strong> Permanent settlement plans</li>
                      </ul>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-yellow-300">SpaceX Starship:</strong> Mars colonization vehicle</li>
                        <li>• <strong className="text-cyan-300">MOXIE Technology:</strong> Oxygen production on Mars</li>
                        <li>• <strong className="text-pink-300">Terraforming Research:</strong> Long-term habitability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Space Telescopes Section */}
          <div id="space-telescopes" className="mb-12">
            <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-2xl p-6 sm:p-8 border border-purple-600/40">
              <h3 className="text-2xl sm:text-3xl font-bold text-purple-300 mb-6 underline decoration-2 underline-offset-4">
                🔭 Space Telescopes & Cosmic Discovery
              </h3>

              <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-200">
                <strong className="text-purple-300">Space telescopes</strong> are our windows to the universe, revealing distant galaxies, exoplanets, and cosmic phenomena. The <strong className="text-blue-300">James Webb Space Telescope</strong> has revolutionized astronomy with infrared observations, while <strong className="text-green-300">Hubble</strong> continues to amaze us with stunning visible light images after over 30 years in space.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-blue-300 mb-4 underline decoration-1 underline-offset-2">
                    James Webb Space Telescope - Revolutionary Discoveries
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    The <a href="https://www.jwst.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline font-bold">James Webb Space Telescope</a> launched in 2021 and has already transformed our understanding of the universe. With its <strong className="text-yellow-300">6.5-meter golden mirror</strong> and advanced infrared instruments, Webb can see the first galaxies that formed after the Big Bang and study the atmospheres of distant exoplanets.
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('7nT7JGZdPtw', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/7nT7JGZdPtw/maxresdefault.jpg"
                        alt="James Webb First Images"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Webb First Images</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('nmMRMIE3MGw', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/nmMRMIE3MGw/maxresdefault.jpg"
                        alt="Webb vs Hubble Comparison"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Webb vs Hubble</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('FL_3WeYhzWo', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/FL_3WeYhzWo/maxresdefault.jpg"
                        alt="Webb Exoplanet Discovery"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Exoplanet Discovery</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('6cUe4oMk69E', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/6cUe4oMk69E/maxresdefault.jpg"
                        alt="Hubble Greatest Discoveries"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Hubble Discoveries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Space Careers Section */}
          <div id="careers" className="mb-12">
            <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-2xl p-6 sm:p-8 border border-green-600/40">
              <h3 className="text-2xl sm:text-3xl font-bold text-green-300 mb-6 underline decoration-2 underline-offset-4">
                👨‍🚀 Space Careers & Astronaut Training
              </h3>

              <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-200">
                The <strong className="text-green-300">space industry</strong> offers diverse career opportunities from astronauts and engineers to mission controllers and planetary scientists. With the growth of commercial space companies, there are more pathways than ever to contribute to space exploration and make your mark on the final frontier.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-cyan-300 mb-4 underline decoration-1 underline-offset-2">
                    Becoming an Astronaut
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    <a href="https://www.nasa.gov/careers/how-to-apply/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline font-bold">NASA astronaut selection</a> is highly competitive, with thousands of applicants for just a few positions. Requirements include a master's degree in STEM, professional experience, and passing rigorous physical and psychological evaluations. International space agencies like <strong className="text-blue-300">ESA</strong>, <strong className="text-purple-300">JAXA</strong>, and <strong className="text-yellow-300">CSA</strong> also recruit astronauts.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-4 border border-cyan-600/40">
                      <h5 className="text-lg font-bold text-cyan-300 mb-2">🎓 Education Requirements</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-blue-300">Master's degree</strong> in engineering, science, or mathematics</li>
                        <li>• <strong className="text-green-300">3+ years</strong> professional experience or 1,000+ pilot hours</li>
                        <li>• <strong className="text-purple-300">Physical fitness</strong> and medical clearance</li>
                        <li>• <strong className="text-yellow-300">Leadership skills</strong> and teamwork experience</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-4 border border-green-600/40">
                      <h5 className="text-lg font-bold text-green-300 mb-2">🚀 Training Process</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-orange-300">2+ years</strong> basic astronaut training</li>
                        <li>• <strong className="text-red-300">Mission-specific</strong> training (6-18 months)</li>
                        <li>• <strong className="text-indigo-300">Survival training</strong> and emergency procedures</li>
                        <li>• <strong className="text-pink-300">International cooperation</strong> and language skills</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('doN4t5NKW-k', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/doN4t5NKW-k/maxresdefault.jpg"
                        alt="Astronaut Training"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Astronaut Training</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('Kz1hLVKVz8E', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/Kz1hLVKVz8E/maxresdefault.jpg"
                        alt="Space Careers Guide"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">Space Careers Guide</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('W_E_RoWEP7M', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/W_E_RoWEP7M/maxresdefault.jpg"
                        alt="NASA Johnson Space Center"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">NASA Johnson Center</p>
                      </div>
                    </div>

                    <div
                      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={(e) => openVideoModal('2Aq_LqkKsWQ', e)}
                    >
                      <img
                        src="https://img.youtube.com/vi/2Aq_LqkKsWQ/maxresdefault.jpg"
                        alt="SpaceX Careers"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-white">SpaceX Careers</p>
                      </div>
                    </div>
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
                      <p className="text-white/80 text-sm font-medium">Loading space video...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* YouTube Iframe */}
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="Space Exploration Video"
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

export default SpaceExplorationPage;
