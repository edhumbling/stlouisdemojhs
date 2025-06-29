import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, X as CloseIcon, Menu, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';

const SpaceExplorationPage: React.FC = () => {
  const navigate = useNavigate();
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
  const [showNavMenu, setShowNavMenu] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    navigate('/stem');
  };

  const toggleVideo = (videoId: string) => {
    setPlayingVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  // Navigation sections
  const navigationSections = [
    { id: 'space-history', title: 'History of Space', icon: '🌌' },
    { id: 'russian-space', title: 'Russian Space Program', icon: '🇷🇺' },
    { id: 'chinese-space', title: 'Chinese Space Program', icon: '🇨🇳' },
    { id: 'nasa-missions', title: 'NASA Missions', icon: '🚀' },
    { id: 'private-space', title: 'Private Space Companies', icon: '🏢' },
    { id: 'mars-exploration', title: 'Mars Exploration', icon: '🔴' },
    { id: 'space-telescopes', title: 'Space Telescopes', icon: '🔭' },
    { id: 'international-agencies', title: 'International Agencies', icon: '🌍' },
    { id: 'careers', title: 'Space Careers', icon: '👨‍🚀' }
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

  // Video component for inline YouTube-style playback
  const VideoCard: React.FC<{ videoId: string; title: string; thumbnail?: string }> = ({ videoId, title, thumbnail }) => {
    const isPlaying = playingVideos.has(videoId);
    const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
      <div className="relative bg-gray-800 rounded-lg overflow-hidden group">
        {!isPlaying ? (
          <div
            className="relative cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => toggleVideo(videoId)}
          >
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors duration-300">
              <div className="bg-red-600 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Play size={24} className="text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-sm font-semibold text-white bg-black/70 rounded px-2 py-1">{title}</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              className="w-full aspect-video border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => toggleVideo(videoId)}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 rounded-full p-2 transition-colors duration-200"
            >
              <CloseIcon size={16} className="text-white" />
            </button>
          </div>
        )}
      </div>
    );
  };

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
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 py-2 sm:py-3 md:py-4 sticky top-16 z-40">
        <div className="w-full px-2 sm:px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-md sm:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm md:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
              >
                <ArrowLeft size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden xs:inline sm:hidden md:inline">Back</span>
                <span className="hidden sm:inline md:hidden">STEM</span>
                <span className="hidden md:inline">Back to STEM</span>
              </button>

              <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-white truncate">
                <span className="hidden sm:inline">🚀 Space Exploration</span>
                <span className="sm:hidden">🚀 Space</span>
              </h1>
            </div>

            {/* Navigation Menu */}
            <div className="relative" ref={navMenuRef}>
              <button
                onClick={() => setShowNavMenu(!showNavMenu)}
                className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-cyan-700/50 hover:bg-cyan-600/70 text-white font-medium rounded-md sm:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm md:text-base backdrop-blur-sm border border-cyan-500/30"
              >
                <Menu size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline md:hidden">Nav</span>
                <span className="hidden md:inline">Navigate</span>
                <ChevronDown size={12} className={`sm:w-3 sm:h-3 md:w-4 md:h-4 transition-transform duration-200 ${showNavMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showNavMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700/50 py-2 z-50">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-700/50">
                    Quick Navigation
                  </div>
                  {navigationSections.map((section) => (
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
      <main className="flex-1 w-full">
        <div className="w-full">

          {/* Hero Section */}
          <div className="mb-8">
            <div className="relative mb-6">
              <img
                src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Space Exploration"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
                  🚀 Explore the Universe
                </h2>
                <p className="text-sm sm:text-lg md:text-xl text-gray-200">
                  Journey through space exploration from NASA missions to private space companies, Mars rovers to space telescopes, and discover your path to the stars.
                </p>
              </div>
            </div>
          </div>

          {/* History of Space Exploration Section */}
          <div id="space-history" className="mb-8">
            <div className="bg-gradient-to-r from-gray-900/30 to-slate-900/30 px-3 py-4 sm:px-4 sm:py-6 border-y border-gray-600/40">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-6 underline decoration-2 underline-offset-4">
                🌌 History of Space Exploration
              </h3>

              <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-200">
                The journey to the stars began with <strong className="text-blue-300">Sputnik 1</strong> in 1957, sparking the greatest technological race in human history. From the <strong className="text-red-300">Soviet Union's</strong> early victories to <strong className="text-blue-300">America's</strong> moon landing, space exploration has united humanity in our quest to understand the cosmos.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-yellow-300 mb-4 underline decoration-1 underline-offset-2">
                    The Space Race Era (1957-1975)
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    The <strong className="text-yellow-300">Space Race</strong> began when the Soviet Union launched <strong className="text-red-300">Sputnik 1</strong> on October 4, 1957, shocking the world. This basketball-sized satellite orbited Earth every 96 minutes, proving that space travel was possible and launching humanity into the space age.
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <VideoCard videoId="U1xbVFf0_RU" title="Sputnik 1 Launch 1957" />
                    <VideoCard videoId="7iMa03BApcQ" title="Gagarin First Human 1961" />
                    <VideoCard videoId="S9HdPi9Ikhk" title="Apollo 11 Moon Landing" />
                    <VideoCard videoId="IuXj3mxCNd8" title="Space Race Documentary" />
                  </div>

                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-600/40 mb-6">
                    <h5 className="text-lg font-bold text-yellow-300 mb-2">🏆 Space Race Milestones</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-red-300">1957:</strong> Sputnik 1 - First artificial satellite</li>
                        <li>• <strong className="text-red-300">1961:</strong> Yuri Gagarin - First human in space</li>
                        <li>• <strong className="text-red-300">1963:</strong> Valentina Tereshkova - First woman in space</li>
                        <li>• <strong className="text-red-300">1965:</strong> First spacewalk (Alexei Leonov)</li>
                      </ul>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-blue-300">1969:</strong> Apollo 11 - First moon landing</li>
                        <li>• <strong className="text-blue-300">1971:</strong> First space station (Salyut 1)</li>
                        <li>• <strong className="text-blue-300">1975:</strong> Apollo-Soyuz - Space cooperation begins</li>
                        <li>• <strong className="text-green-300">1981:</strong> Space Shuttle era begins</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-cyan-300 mb-4 underline decoration-1 underline-offset-2">
                      Apollo Program & Moon Landing Legacy
                    </h4>

                    <p className="text-base leading-relaxed mb-4">
                      The <strong className="text-cyan-300">Apollo Program</strong> remains humanity's greatest space achievement. Between 1969 and 1972, <strong className="text-yellow-300">12 astronauts</strong> walked on the Moon across 6 successful missions. <strong className="text-blue-300">Neil Armstrong</strong> and <strong className="text-green-300">Buzz Aldrin</strong> became the first humans to set foot on another world, fulfilling President Kennedy's bold vision.
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <VideoCard videoId="S9HdPi9Ikhk" title="Apollo 11 Documentary" />
                      <VideoCard videoId="GNJpoP642wc" title="Saturn V Rocket" />
                      <VideoCard videoId="nOcDftgR5UQ" title="Apollo 13 Survival" />
                      <VideoCard videoId="PLQ6V6Stm2U" title="Space Shuttle Era" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Soviet/Russian Space Program Section */}
          <div id="russian-space" className="mb-8">
            <div className="bg-gradient-to-r from-red-900/30 to-rose-900/30 px-3 py-4 sm:px-4 sm:py-6 border-y border-red-600/40">
              <h3 className="text-2xl sm:text-3xl font-bold text-red-300 mb-6 underline decoration-2 underline-offset-4">
                🇷🇺 Soviet Union & Russian Space Program
              </h3>

              <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-200">
                The <strong className="text-red-300">Soviet space program</strong> achieved numerous historic firsts, from the first satellite to the first human in space. Today, <strong className="text-blue-300">Roscosmos</strong> continues this legacy with reliable Soyuz spacecraft, Luna missions, and crucial ISS operations, maintaining Russia's position as a major space power.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-rose-300 mb-4 underline decoration-1 underline-offset-2">
                    Soviet Space Achievements & Roscosmos Today
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    The Soviet Union dominated early space exploration with groundbreaking achievements. <strong className="text-yellow-300">Sergei Korolev</strong>, the chief designer, led missions that put the first satellite, first human, and first woman in space. Modern <a href="https://www.roscosmos.ru/" target="_blank" rel="noopener noreferrer" className="text-rose-300 hover:text-rose-200 underline font-bold">Roscosmos</a> continues with Luna missions and ISS partnerships.
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <VideoCard videoId="09gWHfJ08iY" title="Soviet Space Program" />
                    <VideoCard videoId="EUcv9nYOmvQ" title="Soyuz Spacecraft" />
                    <VideoCard videoId="h9h10mQvKUc" title="Luna 25 Mission" />
                    <VideoCard videoId="b_zv5l2J8MI" title="Roscosmos Today" />
                  </div>

                  <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-lg p-4 border border-red-600/40">
                    <h5 className="text-lg font-bold text-red-300 mb-2">🚀 Russian Space Legacy</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-yellow-300">Soyuz:</strong> Most reliable spacecraft (140+ crewed flights)</li>
                        <li>• <strong className="text-blue-300">Salyut & Mir:</strong> Pioneered long-duration spaceflight</li>
                        <li>• <strong className="text-green-300">Luna Program:</strong> First soft moon landing (Luna 9)</li>
                      </ul>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-purple-300">Venera:</strong> First successful Venus landings</li>
                        <li>• <strong className="text-orange-300">ISS Partnership:</strong> Critical crew transportation</li>
                        <li>• <strong className="text-cyan-300">Future Plans:</strong> Luna missions & new space station</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chinese Space Program Section */}
          <div id="chinese-space" className="mb-8">
            <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 px-3 py-4 sm:px-4 sm:py-6 border-y border-yellow-600/40">
              <h3 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-6 underline decoration-2 underline-offset-4">
                🇨🇳 China National Space Administration (CNSA)
              </h3>

              <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-200">
                <strong className="text-yellow-300">China's space program</strong> has rapidly emerged as a major force in space exploration. From the successful <strong className="text-blue-300">Chang'e lunar missions</strong> to the <strong className="text-green-300">Tiangong space station</strong> and <strong className="text-red-300">Tianwen Mars rover</strong>, China is establishing itself as the third major space power alongside the US and Russia.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-amber-300 mb-4 underline decoration-1 underline-offset-2">
                    Chang'e Lunar Program & Tiangong Space Station
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    China's <a href="https://www.cnsa.gov.cn/english/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 underline font-bold">Chang'e program</a> has achieved remarkable success, including the first soft landing on the Moon's far side with <strong className="text-blue-300">Chang'e 4</strong> and sample return missions. The <strong className="text-green-300">Tiangong space station</strong> completed construction in 2022, making China the second nation to operate its own space station.
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <VideoCard videoId="JJi_YEubKCY" title="Chang'e 4 Far Side" />
                    <VideoCard videoId="Q4PhR1i6YSw" title="Tiangong Space Station" />
                    <VideoCard videoId="5fRmwENH9Rs" title="Tianwen-1 Mars" />
                    <VideoCard videoId="9wNPwYXHJok" title="Chang'e 6 Samples" />
                  </div>

                  <div className="bg-gradient-to-r from-yellow-900/30 to-red-900/30 rounded-lg p-4 border border-yellow-600/40">
                    <h5 className="text-lg font-bold text-yellow-300 mb-2">🌙 Chinese Space Achievements</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-blue-300">Chang'e 4:</strong> First far side moon landing (2019)</li>
                        <li>• <strong className="text-green-300">Tiangong:</strong> Operational space station (2022)</li>
                        <li>• <strong className="text-red-300">Tianwen-1:</strong> Successful Mars rover mission</li>
                      </ul>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-purple-300">Chang'e 5:</strong> Lunar sample return (2020)</li>
                        <li>• <strong className="text-orange-300">Shenzhou:</strong> Independent crewed spacecraft</li>
                        <li>• <strong className="text-cyan-300">Future:</strong> Lunar base & Mars sample return</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NASA Missions Section */}
          <div id="nasa-missions" className="mb-8">
            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 px-3 py-4 sm:px-4 sm:py-6 border-y border-blue-600/40">
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

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <VideoCard videoId="_T8cn2J13-4" title="Artemis Program Overview" />
                    <VideoCard videoId="Ke6XX8FHOHM" title="Artemis II Mission" />
                    <VideoCard videoId="YGyE1VESSDw" title="Orion Spacecraft" />
                    <VideoCard videoId="jrDv0OdMt5s" title="Space Launch System" />
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
          <div id="private-space" className="mb-8">
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 px-3 py-4 sm:px-4 sm:py-6 border-y border-orange-600/40">
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

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <VideoCard videoId="A0FZIwabctw" title="SpaceX Starship" />
                    <VideoCard videoId="Z4TXCZG_NEY" title="Falcon Heavy Launch" />
                    <VideoCard videoId="xY96v0OIcK4" title="Dragon Crew Mission" />
                    <VideoCard videoId="u0-pfzKbh2k" title="Starlink Satellites" />
                    <VideoCard videoId="hI9HQfCAw64" title="Starship Flight Test 5" />
                    <VideoCard videoId="IDYt1l_7UvU" title="Crew-9 Re-Entry" />
                    <VideoCard videoId="yf8uN4VGCCs" title="Crew-10 Launch" />
                    <VideoCard videoId="_4TT_1e6rkM" title="Axiom Mission 4" />
                    <VideoCard videoId="wbSwFU6tY1c" title="Falcon Heavy Europa Clipper" />
                    <VideoCard videoId="L8u-doZ2n0M" title="Starship IFT-6 Test" />
                    <VideoCard videoId="921VbEMAwwY" title="Crew Dragon Docking" />
                    <VideoCard videoId="ANv5UfZsvZQ" title="Starlink Deployment" />
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
                    Blue Origin - Pioneering Accessible Space Travel
                  </h4>

                  <p className="text-base leading-relaxed mb-6 text-gray-200">
                    <a href="https://www.blueorigin.com/" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline font-bold">Blue Origin</a>, founded by <strong className="text-blue-300">Jeff Bezos</strong> in 2000, embodies the vision of enabling millions of people to live and work in space for the benefit of Earth. With the company motto <strong className="text-yellow-300">"Gradatim Ferociter"</strong> (Step by Step, Ferociously), Blue Origin has methodically built a comprehensive space infrastructure spanning suborbital tourism, orbital launch capabilities, and lunar exploration systems.
                  </p>

                  <div className="mb-8">
                    <img
                      src="https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Blue Origin Rocket Launch"
                      className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                    />
                    <div className="text-center mt-2">
                      <p className="text-sm text-gray-400 italic">Blue Origin's reusable rocket technology represents the future of sustainable space exploration</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-bold text-cyan-300 mb-3 underline decoration-1 underline-offset-2">
                        New Shepard - Suborbital Space Tourism Pioneer
                      </h5>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        Named after <strong className="text-blue-300">Alan Shepard</strong>, America's first astronaut, the <strong className="text-green-300">New Shepard</strong> system has revolutionized space tourism through its fully reusable design. The vehicle consists of a pressurized crew capsule and a reusable booster that lands vertically after each flight. Since its first crewed flight in July 2021, New Shepard has successfully transported <strong className="text-yellow-300">over 30 people</strong> to space, including Jeff Bezos himself, making space accessible to civilians for the first time in history.
                      </p>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        Each <strong className="text-purple-300">11-minute flight</strong> takes passengers beyond the <strong className="text-cyan-300">Kármán line</strong> at 100 kilometers altitude, providing approximately <strong className="text-orange-300">4 minutes of weightlessness</strong> and breathtaking views of Earth's curvature. The crew capsule features the largest windows ever flown in space, offering passengers an unparalleled view of our planet and the cosmos beyond.
                      </p>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-purple-300 mb-3 underline decoration-1 underline-offset-2">
                        New Glenn - Orbital Launch Revolution
                      </h5>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        <strong className="text-purple-300">New Glenn</strong>, named after <strong className="text-blue-300">John Glenn</strong>, the first American to orbit Earth, represents Blue Origin's ambitious entry into the orbital launch market. This massive <strong className="text-yellow-300">98-meter tall</strong> rocket features a reusable first stage designed for <strong className="text-green-300">25 missions</strong>, significantly reducing launch costs. With its <strong className="text-cyan-300">3.85-meter payload fairing</strong>, New Glenn can deliver up to <strong className="text-orange-300">45 metric tons</strong> to low Earth orbit.
                      </p>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        The rocket's first stage is powered by <strong className="text-red-300">seven BE-4 engines</strong>, each producing 550,000 pounds of thrust using liquid oxygen and liquefied natural gas. After its historic first successful orbital flight in January 2025, New Glenn is positioned to compete directly with SpaceX's Falcon Heavy and support major satellite deployments, space station missions, and deep space exploration.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <VideoCard videoId="UGdV6e2tgVU" title="New Shepard First Flight" />
                    <VideoCard videoId="FjPv0S3z5tY" title="Jeff Bezos Space Flight" />
                    <VideoCard videoId="CMMSiDf_sqw" title="NS-31 Mission" />
                    <VideoCard videoId="7hRxN_Fg0i4" title="New Glenn Rocket" />
                    <VideoCard videoId="FSlITfIpSpI" title="Space Tourism" />
                    <VideoCard videoId="wcD8a9f8Ni0" title="New Glenn First Launch" />
                    <VideoCard videoId="DcWqzZ3I2cY" title="Blue Origin Story" />
                    <VideoCard videoId="hmk1oHzvNKA" title="Blue Moon Lander" />
                  </div>

                  <div className="mb-8">
                    <img
                      src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Earth from Space"
                      className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                    />
                    <div className="text-center mt-2">
                      <p className="text-sm text-gray-400 italic">The view that Blue Origin passengers experience during their suborbital journey</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-bold text-orange-300 mb-3 underline decoration-1 underline-offset-2">
                        Blue Moon - Lunar Exploration Program
                      </h5>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        <strong className="text-orange-300">Blue Moon</strong> represents Blue Origin's ambitious lunar exploration program, designed to support NASA's <strong className="text-blue-300">Artemis missions</strong> and establish a sustainable presence on the Moon. The Blue Moon lander can deliver <strong className="text-yellow-300">3.6 metric tons</strong> to the lunar surface and features advanced life support systems, scientific instruments, and the capability to support extended lunar missions.
                      </p>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        As part of NASA's <strong className="text-purple-300">Human Landing System</strong> program, Blue Moon will play a crucial role in returning astronauts to the lunar surface for the first time since Apollo 17 in 1972. The lander incorporates Blue Origin's proven <strong className="text-green-300">BE-7 engines</strong> and advanced guidance systems to ensure precise and safe lunar landings.
                      </p>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-red-300 mb-3 underline decoration-1 underline-offset-2">
                        Orbital Reef - Commercial Space Station
                      </h5>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        <strong className="text-red-300">Orbital Reef</strong> is Blue Origin's vision for a commercial space station that will serve as a <strong className="text-cyan-300">"mixed-use business park"</strong> in low Earth orbit. Developed in partnership with <strong className="text-blue-300">Sierra Space</strong>, this facility will provide research laboratories, manufacturing capabilities, and tourist accommodations in a single integrated platform.
                      </p>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        The station will feature <strong className="text-yellow-300">830 cubic meters</strong> of usable volume, nearly equivalent to the International Space Station, and will support up to <strong className="text-green-300">10 people</strong> simultaneously. Orbital Reef represents the future of commercial space operations, enabling everything from pharmaceutical research to space manufacturing and tourism.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-purple-300 mb-4 underline decoration-1 underline-offset-2">
                    Virgin Galactic - Pioneering Space Tourism
                  </h4>

                  <p className="text-base leading-relaxed mb-6 text-gray-200">
                    <a href="https://www.virgingalactic.com/" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline font-bold">Virgin Galactic</a>, founded by <strong className="text-blue-300">Sir Richard Branson</strong> in 2004, is the world's first commercial spaceline, pioneering accessible space tourism through its revolutionary <strong className="text-yellow-300">SpaceShipTwo</strong> technology. Unlike traditional rocket-powered spacecraft, Virgin Galactic uses an innovative air-launch system where the <strong className="text-green-300">VSS Unity</strong> spacecraft is carried to altitude by the <strong className="text-cyan-300">VMS Eve</strong> mothership before igniting its rocket motor for the final ascent to space.
                  </p>

                  <div className="mb-8">
                    <img
                      src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Virgin Galactic SpaceShipTwo"
                      className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                    />
                    <div className="text-center mt-2">
                      <p className="text-sm text-gray-400 italic">Virgin Galactic's VSS Unity represents the future of commercial space tourism</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-bold text-cyan-300 mb-3 underline decoration-1 underline-offset-2">
                        VSS Unity - SpaceShipTwo Technology
                      </h5>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        The <strong className="text-cyan-300">VSS Unity</strong> is Virgin Galactic's second-generation SpaceShipTwo vehicle, designed to carry <strong className="text-yellow-300">six passengers</strong> and <strong className="text-green-300">two pilots</strong> to the edge of space at an altitude of over <strong className="text-purple-300">80 kilometers</strong>. The spacecraft features large windows providing passengers with breathtaking views of Earth's curvature and the blackness of space during approximately <strong className="text-orange-300">4 minutes of weightlessness</strong>.
                      </p>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        What makes Virgin Galactic unique is its <strong className="text-blue-300">air-launch system</strong>. The VSS Unity is carried to an altitude of 50,000 feet by the twin-fuselage <strong className="text-red-300">VMS Eve</strong> mothership before being released. The spacecraft then ignites its hybrid rocket motor, accelerating to <strong className="text-yellow-300">Mach 3.5</strong> as it climbs to space, providing passengers with a smooth, airplane-like experience rather than the violent acceleration of traditional rockets.
                      </p>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-orange-300 mb-3 underline decoration-1 underline-offset-2">
                        Historic Achievements & Milestones
                      </h5>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        Virgin Galactic achieved a historic milestone on <strong className="text-green-300">July 11, 2021</strong>, when Sir Richard Branson became the first billionaire founder to fly to space aboard his own spacecraft. This <strong className="text-purple-300">Unity 22</strong> mission marked the beginning of the commercial space tourism era, demonstrating that space travel could be accessible to civilians, not just professional astronauts.
                      </p>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        Since then, Virgin Galactic has successfully completed multiple commercial flights, including the historic <strong className="text-cyan-300">Galactic 01</strong> mission in June 2023, which carried the first paying customers to space. The company operates from <strong className="text-yellow-300">Spaceport America</strong> in New Mexico, the world's first purpose-built commercial spaceport, designed specifically for horizontal takeoff and landing spacecraft.
                      </p>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-red-300 mb-3 underline decoration-1 underline-offset-2">
                        Future of Space Tourism
                      </h5>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        Virgin Galactic is developing its next-generation <strong className="text-red-300">Delta-class</strong> spacecraft, designed to fly more frequently with enhanced passenger capacity and improved operational efficiency. These advanced vehicles will enable the company to conduct <strong className="text-blue-300">weekly flights</strong> and significantly reduce the cost of space tourism, making the experience accessible to a broader audience.
                      </p>

                      <p className="text-base leading-relaxed mb-4 text-gray-200">
                        The company's vision extends beyond tourism to include <strong className="text-green-300">scientific research missions</strong>, <strong className="text-purple-300">astronaut training</strong>, and <strong className="text-orange-300">point-to-point hypersonic travel</strong> on Earth. Virgin Galactic is pioneering a new era where space is no longer the exclusive domain of government agencies but a frontier open to all humanity.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <VideoCard videoId="h8T9mVkGh3s" title="VSS Unity First Spaceflight" />
                    <VideoCard videoId="kmPG0Hqhay8" title="VSS Unity Second Spaceflight" />
                    <VideoCard videoId="8s-zY86Ec-I" title="First Rocket Powered Flight" />
                    <VideoCard videoId="M3RXPF_B7As" title="Richard Branson Space Flight" />
                    <VideoCard videoId="i_Svy8ezVJo" title="First Commercial Flight" />
                    <VideoCard videoId="4Sz2ro1VeGQ" title="Space Tourism Launch" />
                    <VideoCard videoId="3bQQ5lxfKGU" title="Unity 25 Return to Flight" />
                    <VideoCard videoId="BsRSaPxlck0" title="VSS Unity Flight Simulator" />
                  </div>

                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-600/40 mb-6">
                    <h5 className="text-lg font-bold text-purple-300 mb-2">🚀 Virgin Galactic Achievements</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-green-300">First commercial spaceline</strong> to carry paying passengers</li>
                        <li>• <strong className="text-yellow-300">30+ successful</strong> powered test flights</li>
                        <li>• <strong className="text-purple-300">600+ future astronauts</strong> with reservations</li>
                      </ul>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-orange-300">Unique air-launch</strong> system technology</li>
                        <li>• <strong className="text-cyan-300">Spaceport America</strong> operational base</li>
                        <li>• <strong className="text-pink-300">Delta-class</strong> next-generation spacecraft</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mars Exploration Section */}
          <div id="mars-exploration" className="mb-8">
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 px-3 py-4 sm:px-4 sm:py-6 border-y border-red-600/40">
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

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <VideoCard videoId="4czjS9h4Fpg" title="Perseverance Landing" />
                    <VideoCard videoId="GhsZUZmJvaM" title="Ingenuity First Flight" />
                    <VideoCard videoId="nlnHJoWMjSs" title="Mars Sample Return" />
                    <VideoCard videoId="M4tdMR5HLtg" title="Curiosity Discoveries" />
                  </div>

                  <div className="mb-8">
                    <img
                      src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
                      alt="Mars Surface Landscape"
                      className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                    />
                    <div className="text-center mt-2">
                      <p className="text-sm text-gray-400 italic">The Martian landscape as captured by NASA's rovers, revealing the Red Planet's ancient geological history</p>
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
          <div id="space-telescopes" className="mb-8">
            <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 px-3 py-4 sm:px-4 sm:py-6 border-y border-purple-600/40">
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

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <VideoCard videoId="7nT7JGZdPtw" title="Webb First Images" />
                    <VideoCard videoId="nmMRMIE3MGw" title="Webb vs Hubble" />
                    <VideoCard videoId="FL_3WeYhzWo" title="Exoplanet Discovery" />
                    <VideoCard videoId="6cUe4oMk69E" title="Hubble Discoveries" />
                  </div>

                  <div className="mb-8">
                    <img
                      src="https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Deep Space Galaxy"
                      className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                    />
                    <div className="text-center mt-2">
                      <p className="text-sm text-gray-400 italic">A stunning deep space galaxy captured by the Hubble Space Telescope, showcasing the universe's incredible beauty and complexity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* International Space Agencies Section */}
          <div id="international-agencies" className="mb-8">
            <div className="bg-gradient-to-r from-indigo-900/30 to-violet-900/30 px-3 py-4 sm:px-4 sm:py-6 border-y border-indigo-600/40">
              <h3 className="text-2xl sm:text-3xl font-bold text-indigo-300 mb-6 underline decoration-2 underline-offset-4">
                🌍 International Space Agencies & Global Cooperation
              </h3>

              <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-200">
                Space exploration has become a truly <strong className="text-indigo-300">global endeavor</strong>, with agencies from Europe, Japan, India, and other nations contributing to our understanding of the universe. International cooperation through projects like the <strong className="text-blue-300">International Space Station</strong> demonstrates how humanity can work together to achieve extraordinary goals.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-violet-300 mb-4 underline decoration-1 underline-offset-2">
                    European Space Agency (ESA) & Global Partners
                  </h4>

                  <p className="text-base leading-relaxed mb-4">
                    The <a href="https://www.esa.int/" target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-violet-200 underline font-bold">European Space Agency</a> represents 22 European countries in space exploration. ESA has achieved remarkable success with missions like <strong className="text-blue-300">Rosetta</strong> (comet landing), <strong className="text-green-300">BepiColombo</strong> (Mercury mission), and the <strong className="text-yellow-300">James Webb Space Telescope</strong> partnership with NASA.
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <VideoCard videoId="h2I8AoB1xgU" title="ESA Rosetta Mission" />
                    <VideoCard videoId="BFuT7tfqNUc" title="JAXA Hayabusa2" />
                    <VideoCard videoId="6PDkZIAaM08" title="ISRO Mars Mission" />
                    <VideoCard videoId="21X5lGlDOfg" title="ISS Cooperation" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-r from-indigo-900/30 to-blue-900/30 rounded-lg p-4 border border-indigo-600/40">
                      <h5 className="text-lg font-bold text-indigo-300 mb-2">🇪🇺 European Space Agency (ESA)</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-blue-300">22 member states</strong> collaborating in space</li>
                        <li>• <strong className="text-green-300">Rosetta mission:</strong> First comet landing</li>
                        <li>• <strong className="text-purple-300">Gaia telescope:</strong> Mapping the Milky Way</li>
                        <li>• <strong className="text-yellow-300">ExoMars:</strong> Search for life on Mars</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 rounded-lg p-4 border border-violet-600/40">
                      <h5 className="text-lg font-bold text-violet-300 mb-2">🇯🇵 Japan Aerospace Exploration Agency (JAXA)</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-orange-300">Hayabusa missions:</strong> Asteroid sample return</li>
                        <li>• <strong className="text-cyan-300">Kibo module:</strong> Japanese ISS laboratory</li>
                        <li>• <strong className="text-pink-300">SLIM:</strong> Precision lunar landing technology</li>
                        <li>• <strong className="text-lime-300">MMX mission:</strong> Mars moon exploration</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-4 border border-orange-600/40">
                      <h5 className="text-lg font-bold text-orange-300 mb-2">🇮🇳 Indian Space Research Organisation (ISRO)</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-red-300">Mars Orbiter Mission:</strong> Lowest-cost Mars mission</li>
                        <li>• <strong className="text-yellow-300">Chandrayaan:</strong> Lunar exploration program</li>
                        <li>• <strong className="text-green-300">104 satellites:</strong> Single launch record</li>
                        <li>• <strong className="text-blue-300">Gaganyaan:</strong> Upcoming crewed mission</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-lg p-4 border border-teal-600/40">
                      <h5 className="text-lg font-bold text-teal-300 mb-2">🌍 Other Space Agencies</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong className="text-purple-300">CSA (Canada):</strong> Canadarm robotics</li>
                        <li>• <strong className="text-blue-300">KARI (South Korea):</strong> Lunar missions</li>
                        <li>• <strong className="text-green-300">UAE Space Agency:</strong> Mars Hope probe</li>
                        <li>• <strong className="text-yellow-300">CONAE (Argentina):</strong> Earth observation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Space Careers Section */}
          <div id="careers" className="mb-8">
            <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 px-3 py-4 sm:px-4 sm:py-6 border-y border-green-600/40">
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

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <VideoCard videoId="VzwjsWmudJg" title="NASA Astronaut Training Pool" />
                    <VideoCard videoId="Aq_1l316ow8" title="Underwater EVA Training" />
                    <VideoCard videoId="doN4t5NKW-k" title="Astronaut Selection Process" />
                    <VideoCard videoId="W_E_RoWEP7M" title="NASA Johnson Space Center" />
                    <VideoCard videoId="2Aq_LqkKsWQ" title="SpaceX Astronaut Training" />
                    <VideoCard videoId="Kz1hLVKVz8E" title="Space Careers & Requirements" />
                    <VideoCard videoId="6v6dbxPlsXs" title="Centrifuge Training Experience" />
                    <VideoCard videoId="gm0b_ijaYMQ" title="Survival Training Program" />
                  </div>

                  <div className="mb-8">
                    <img
                      src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Astronaut in Space"
                      className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                    />
                    <div className="text-center mt-2">
                      <p className="text-sm text-gray-400 italic">An astronaut conducting a spacewalk outside the International Space Station, representing the pinnacle of human space exploration careers</p>
                    </div>
                  </div>

                  {/* Space Industry Employers Section */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xl font-bold text-orange-300 mb-4 underline decoration-1 underline-offset-2">
                        🏢 Major Space Industry Employers
                      </h4>

                      <p className="text-base leading-relaxed mb-6 text-gray-200">
                        The space industry offers diverse career opportunities across government agencies, aerospace contractors, commercial space companies, and emerging startups. Here's a comprehensive list of major employers actively hiring for space-related positions.
                      </p>

                      <div className="space-y-6">
                        {/* Government Space Agencies */}
                        <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-4 border border-blue-600/40">
                          <h5 className="text-lg font-bold text-blue-300 mb-3">🏛️ Government Space Agencies</h5>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <a href="https://www.nasa.gov/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-300 hover:text-blue-200 hover:underline font-medium">• NASA (USA)</a>
                              <a href="https://www.esa.int/About_Us/Careers_at_ESA" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-300 hover:text-blue-200 hover:underline font-medium">• ESA (Europe)</a>
                              <a href="https://global.jaxa.jp/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-300 hover:text-blue-200 hover:underline font-medium">• JAXA (Japan)</a>
                              <a href="https://www.isro.gov.in/careers.html" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-300 hover:text-blue-200 hover:underline font-medium">• ISRO (India)</a>
                            </div>
                            <div className="space-y-1">
                              <a href="https://www.asc-csa.gc.ca/eng/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-300 hover:text-blue-200 hover:underline font-medium">• CSA (Canada)</a>
                              <a href="http://www.cnsa.gov.cn/" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-300 hover:text-blue-200 hover:underline font-medium">• CNSA (China)</a>
                              <a href="https://www.roscosmos.ru/" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-300 hover:text-blue-200 hover:underline font-medium">• Roscosmos (Russia)</a>
                              <a href="https://cnes.fr/en/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-300 hover:text-blue-200 hover:underline font-medium">• CNES (France)</a>
                            </div>
                            <div className="space-y-1">
                              <a href="https://www.dlr.de/en/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-300 hover:text-blue-200 hover:underline font-medium">• DLR (Germany)</a>
                              <a href="https://www.gov.uk/government/organisations/uk-space-agency" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-300 hover:text-blue-200 hover:underline font-medium">• UK Space Agency</a>
                              <a href="https://www.spaceforce.com/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-300 hover:text-blue-200 hover:underline font-medium">• U.S. Space Force</a>
                            </div>
                          </div>
                        </div>

                        {/* Major Aerospace Contractors */}
                        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-600/40">
                          <h5 className="text-lg font-bold text-purple-300 mb-3">🏭 Major Aerospace Contractors</h5>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <a href="https://jobs.boeing.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-purple-300 hover:text-purple-200 hover:underline font-medium">• Boeing Defense & Space</a>
                              <a href="https://www.lockheedmartinjobs.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-purple-300 hover:text-purple-200 hover:underline font-medium">• Lockheed Martin Space</a>
                              <a href="https://www.northropgrumman.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-purple-300 hover:text-purple-200 hover:underline font-medium">• Northrop Grumman</a>
                            </div>
                            <div className="space-y-1">
                              <a href="https://careers.rtx.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-purple-300 hover:text-purple-200 hover:underline font-medium">• Raytheon Technologies</a>
                              <a href="https://gdmissionsystems.com/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-purple-300 hover:text-purple-200 hover:underline font-medium">• General Dynamics</a>
                              <a href="https://www.l3harris.com/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-purple-300 hover:text-purple-200 hover:underline font-medium">• L3Harris Technologies</a>
                            </div>
                            <div className="space-y-1">
                              <a href="https://www.rocket.com/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-purple-300 hover:text-purple-200 hover:underline font-medium">• Aerojet Rocketdyne</a>
                              <a href="https://www.ulalaunch.com/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-purple-300 hover:text-purple-200 hover:underline font-medium">• United Launch Alliance</a>
                            </div>
                          </div>
                        </div>

                        {/* Commercial Space Companies */}
                        <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-4 border border-green-600/40">
                          <h5 className="text-lg font-bold text-green-300 mb-3">🚀 Commercial Space Companies</h5>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <a href="https://www.spacex.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• SpaceX</a>
                              <a href="https://www.blueorigin.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Blue Origin</a>
                              <a href="https://www.virgingalactic.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Virgin Galactic</a>
                              <a href="https://www.rocketlabusa.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Rocket Lab</a>
                              <a href="https://www.relativityspace.com/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Relativity Space</a>
                            </div>
                            <div className="space-y-1">
                              <a href="https://www.axiomspace.com/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Axiom Space</a>
                              <a href="https://sierraspace.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Sierra Space</a>
                              <a href="https://fireflyspace.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Firefly Aerospace</a>
                              <a href="https://astra.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Astra Space</a>
                              <a href="https://momentus.space/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Momentus</a>
                            </div>
                            <div className="space-y-1">
                              <a href="https://astroscale.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Astroscale</a>
                              <a href="https://redwirespace.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Redwire Space</a>
                              <a href="https://www.capellaspace.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Capella Space</a>
                              <a href="https://www.intuitivemachines.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Intuitive Machines</a>
                              <a href="https://www.astrobotic.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-green-300 hover:text-green-200 hover:underline font-medium">• Astrobotic Technology</a>
                            </div>
                          </div>
                        </div>

                        {/* Satellite & Telecommunications */}
                        <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-600/40">
                          <h5 className="text-lg font-bold text-yellow-300 mb-3">📡 Satellite & Telecommunications</h5>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <a href="https://www.planet.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-yellow-300 hover:text-yellow-200 hover:underline font-medium">• Planet Labs</a>
                              <a href="https://www.maxar.com/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-yellow-300 hover:text-yellow-200 hover:underline font-medium">• Maxar Technologies</a>
                              <a href="https://www.intelsat.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-yellow-300 hover:text-yellow-200 hover:underline font-medium">• Intelsat</a>
                              <a href="https://www.ses.com/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-yellow-300 hover:text-yellow-200 hover:underline font-medium">• SES</a>
                            </div>
                            <div className="space-y-1">
                              <a href="https://www.eutelsat.com/en/careers.html" target="_blank" rel="noopener noreferrer" className="block text-sm text-yellow-300 hover:text-yellow-200 hover:underline font-medium">• Eutelsat</a>
                              <a href="https://careers.viasat.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-yellow-300 hover:text-yellow-200 hover:underline font-medium">• Viasat</a>
                              <a href="https://www.iridium.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-yellow-300 hover:text-yellow-200 hover:underline font-medium">• Iridium Communications</a>
                              <a href="https://oneweb.net/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-yellow-300 hover:text-yellow-200 hover:underline font-medium">• OneWeb</a>
                            </div>
                            <div className="space-y-1">
                              <a href="https://www.ball.com/aerospace/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-yellow-300 hover:text-yellow-200 hover:underline font-medium">• Ball Aerospace</a>
                              <a href="https://www.thalesaleniaspace.com/en" target="_blank" rel="noopener noreferrer" className="block text-sm text-yellow-300 hover:text-yellow-200 hover:underline font-medium">• Thales Alenia Space</a>
                              <a href="https://www.airbus.com/en/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-yellow-300 hover:text-yellow-200 hover:underline font-medium">• Airbus Defence & Space</a>
                            </div>
                          </div>
                        </div>

                        {/* Research & Academia */}
                        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-4 border border-cyan-600/40">
                          <h5 className="text-lg font-bold text-cyan-300 mb-3">🔬 Research & Academia</h5>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <a href="https://www.jpl.nasa.gov/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-cyan-300 hover:text-cyan-200 hover:underline font-medium">• JPL (Caltech)</a>
                              <a href="https://www.ll.mit.edu/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-cyan-300 hover:text-cyan-200 hover:underline font-medium">• MIT Lincoln Laboratory</a>
                              <a href="https://www.jhuapl.edu/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-cyan-300 hover:text-cyan-200 hover:underline font-medium">• Johns Hopkins APL</a>
                            </div>
                            <div className="space-y-1">
                              <a href="https://www.swri.org/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-cyan-300 hover:text-cyan-200 hover:underline font-medium">• Southwest Research Institute</a>
                              <a href="https://www.aerospace.org/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-cyan-300 hover:text-cyan-200 hover:underline font-medium">• The Aerospace Corporation</a>
                              <a href="https://www.mitre.org/careers" target="_blank" rel="noopener noreferrer" className="block text-sm text-cyan-300 hover:text-cyan-200 hover:underline font-medium">• MITRE Corporation</a>
                            </div>
                            <div className="space-y-1">
                              <a href="https://www.spacescience.org/careers.php" target="_blank" rel="noopener noreferrer" className="block text-sm text-cyan-300 hover:text-cyan-200 hover:underline font-medium">• Space Science Institute</a>
                              <a href="https://careers.cern/" target="_blank" rel="noopener noreferrer" className="block text-sm text-cyan-300 hover:text-cyan-200 hover:underline font-medium">• CERN</a>
                            </div>
                          </div>
                        </div>

                        {/* Space Technology & Software */}
                        <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg p-4 border border-indigo-600/40">
                          <h5 className="text-lg font-bold text-indigo-300 mb-3">💻 Space Technology & Software</h5>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <a href="https://aws.amazon.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-indigo-300 hover:text-indigo-200 hover:underline font-medium">• AWS Aerospace</a>
                              <a href="https://careers.microsoft.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-indigo-300 hover:text-indigo-200 hover:underline font-medium">• Microsoft Space</a>
                              <a href="https://careers.google.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-indigo-300 hover:text-indigo-200 hover:underline font-medium">• Google Cloud Space</a>
                            </div>
                            <div className="space-y-1">
                              <a href="https://www.palantir.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-indigo-300 hover:text-indigo-200 hover:underline font-medium">• Palantir Technologies</a>
                              <a href="https://www.ibm.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-indigo-300 hover:text-indigo-200 hover:underline font-medium">• IBM Space & Defense</a>
                              <a href="https://www.nvidia.com/en-us/about-nvidia/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-indigo-300 hover:text-indigo-200 hover:underline font-medium">• NVIDIA Space</a>
                            </div>
                            <div className="space-y-1">
                              <a href="https://www.honeybeerobotics.com/careers/" target="_blank" rel="noopener noreferrer" className="block text-sm text-indigo-300 hover:text-indigo-200 hover:underline font-medium">• Honeybee Robotics</a>
                              <a href="https://www.anduril.com/open-roles/" target="_blank" rel="noopener noreferrer" className="block text-sm text-indigo-300 hover:text-indigo-200 hover:underline font-medium">• Anduril Industries</a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/40">
                        <h5 className="text-lg font-bold text-white mb-2">💼 Common Space Industry Roles</h5>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <strong className="text-blue-300">Engineering:</strong>
                            <ul className="text-gray-300 mt-1 space-y-1">
                              <li>• Aerospace Engineers</li>
                              <li>• Systems Engineers</li>
                              <li>• Software Engineers</li>
                              <li>• Propulsion Engineers</li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-green-300">Operations:</strong>
                            <ul className="text-gray-300 mt-1 space-y-1">
                              <li>• Mission Operations</li>
                              <li>• Flight Controllers</li>
                              <li>• Launch Operations</li>
                              <li>• Satellite Operations</li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-purple-300">Science:</strong>
                            <ul className="text-gray-300 mt-1 space-y-1">
                              <li>• Planetary Scientists</li>
                              <li>• Astrophysicists</li>
                              <li>• Materials Scientists</li>
                              <li>• Data Scientists</li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-orange-300">Business:</strong>
                            <ul className="text-gray-300 mt-1 space-y-1">
                              <li>• Program Managers</li>
                              <li>• Business Development</li>
                              <li>• Sales Engineers</li>
                              <li>• Financial Analysts</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>


    </div>
  );
};

export default SpaceExplorationPage;
