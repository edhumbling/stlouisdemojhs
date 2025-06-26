import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import BackButton from '../components/BackButton';

// Shimmer Loading Component
const VideoShimmer: React.FC = () => (
  <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
    <div className="flex items-center justify-center h-full">
      <div className="w-16 h-16 bg-gray-600 rounded-full animate-pulse flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
);

// Video Modal Component
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoId, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

// Video Card Component with Shimmer Loading
interface VideoCardProps {
  videoId: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  hoverColor: string;
  textColor: string;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  videoId,
  title,
  description,
  gradientFrom,
  gradientTo,
  borderColor,
  hoverColor,
  textColor,
  onClick
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setThumbnailLoaded(true);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl overflow-hidden border ${borderColor} hover:${hoverColor} transition-all duration-300 group cursor-pointer`}
      onClick={onClick}
    >
      <div className="relative aspect-video bg-gray-800">
        {isLoading ? (
          <VideoShimmer />
        ) : (
          <div className="relative w-full h-full">
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${thumbnailLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setThumbnailLoaded(true)}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <h4 className={`font-semibold text-white text-sm mb-2 group-hover:${textColor} transition-colors`}>{title}</h4>
        <p className="text-xs text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const StemDeepLearningPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<{id: string, title: string} | null>(null);
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Master STEM Fields - Deep Learning & Career Guidance | St. Louis Demo JHS</title>
        <meta name="description" content="Comprehensive STEM education guide covering Science, Technology, Engineering, and Mathematics. Explore career pathways, skills development, and educational resources for students at St. Louis Demonstration JHS." />
        <meta name="keywords" content="STEM education, science careers, technology jobs, engineering pathways, mathematics, Ghana education, JHS STEM, career guidance" />
        <meta property="og:title" content="Master STEM Fields - Deep Learning & Career Guidance" />
        <meta property="og:description" content="Comprehensive STEM education guide covering Science, Technology, Engineering, and Mathematics career pathways and skills development." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:url" content="https://stlouisdemojhs.com/stem-deep-learning" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Master STEM Fields - Deep Learning & Career Guidance" />
        <meta name="twitter:description" content="Comprehensive STEM education guide covering Science, Technology, Engineering, and Mathematics career pathways." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
        <link rel="canonical" href="https://stlouisdemojhs.com/stem-deep-learning" />
      </Helmet>

      {/* Back Button */}
      <div className="relative z-10">
        <div className="px-4 py-4">
          <BackButton />
        </div>
      </div>

      {/* Main Content - True Edge to Edge, No Containers */}
      <main className="w-full">
        {/* Compact Hero Section - Edge to Edge with Background Image */}
        <section
          className="w-full py-8 sm:py-12 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="px-4 sm:px-6 text-center">
            {/* Compact Gradient Icon */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Compact Gradient Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Master STEM Fields
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-200 mb-4 max-w-3xl mx-auto leading-relaxed">
              🚀 Unlock <strong className="text-blue-300">Science</strong>, <strong className="text-green-300">Technology</strong>, <strong className="text-purple-300">Engineering</strong>, and <strong className="text-yellow-300">Mathematics</strong> career pathways! 🌟
            </p>

            {/* Compact STEM Field Badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-medium">
                🔬 Science
              </span>
              <span className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-xs font-medium">
                💻 Technology
              </span>
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-xs font-medium">
                ⚙️ Engineering
              </span>
              <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-yellow-300 text-xs font-medium">
                📊 Mathematics
              </span>
            </div>

            {/* Compact CTA Button */}
            <a
              href="/stem"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 hover:scale-105 text-sm sm:text-base"
              style={{
                textShadow: '0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.6)',
                boxShadow: '0 0 20px rgba(255, 255, 0, 0.3), 0 0 40px rgba(255, 255, 0, 0.2)'
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Explore STEM Resources</span>
            </a>
          </div>
        </section>

        {/* STEM Definition Section - Edge to Edge */}
        <section className="w-full bg-gray-800 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">What is STEM? 🤔</h3>
            </div>

            <div className="space-y-6">
              {/* STEM Overview */}
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
                <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                  <strong className="text-blue-300">STEM</strong> represents the integrated study of <strong>Science, Technology, Engineering, and Mathematics</strong> - the foundation of innovation and progress in our modern world! 🌍✨
                </p>
              </div>

              {/* Four Pillars */}
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-6 border border-blue-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  🏛️ The Four Pillars of STEM
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2">🔬 Science</h5>
                    <ul className="space-y-1 text-xs text-blue-100">
                      <li>• <strong>Physics</strong> - Matter, energy, and motion</li>
                      <li>• <strong>Chemistry</strong> - Atoms, molecules, and reactions</li>
                      <li>• <strong>Biology</strong> - Living organisms and life processes</li>
                      <li>• <strong>Earth Science</strong> - Our planet and environment</li>
                    </ul>
                  </div>

                  <div className="bg-green-800/30 rounded-lg p-4 border border-green-600/30">
                    <h5 className="font-semibold text-green-300 text-sm mb-2">💻 Technology</h5>
                    <ul className="space-y-1 text-xs text-green-100">
                      <li>• <strong>Computer Science</strong> - Programming and algorithms</li>
                      <li>• <strong>Information Technology</strong> - Systems and networks</li>
                      <li>• <strong>Digital Media</strong> - Graphics, web, and multimedia</li>
                      <li>• <strong>Artificial Intelligence</strong> - Machine learning and automation</li>
                    </ul>
                  </div>

                  <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2">⚙️ Engineering</h5>
                    <ul className="space-y-1 text-xs text-purple-100">
                      <li>• <strong>Civil Engineering</strong> - Infrastructure and construction</li>
                      <li>• <strong>Mechanical Engineering</strong> - Machines and systems</li>
                      <li>• <strong>Electrical Engineering</strong> - Electronics and power</li>
                      <li>• <strong>Software Engineering</strong> - Applications and systems</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30">
                    <h5 className="font-semibold text-yellow-300 text-sm mb-2">📊 Mathematics</h5>
                    <ul className="space-y-1 text-xs text-yellow-100">
                      <li>• <strong>Algebra & Calculus</strong> - Advanced mathematical concepts</li>
                      <li>• <strong>Statistics</strong> - Data analysis and probability</li>
                      <li>• <strong>Geometry</strong> - Shapes, space, and measurement</li>
                      <li>• <strong>Applied Math</strong> - Real-world problem solving</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEM Career Pathways - Edge to Edge */}
        <section className="w-full bg-black py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">STEM Career Pathways 💼</h3>
            </div>

            <div className="space-y-6">
              {/* Career Overview */}
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-700/30">
                <p className="text-sm sm:text-base text-green-100 leading-relaxed">
                  <strong className="text-green-300">STEM careers are booming!</strong> With technology advancing rapidly, STEM professionals are in high demand across all industries. Explore exciting career paths with excellent growth potential and competitive salaries! 💰🚀
                </p>
              </div>

              {/* High-Demand Careers */}
              <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-lg p-6 border border-blue-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  🔥 High-Demand STEM Careers (2024-2025)
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2">💻 Software Developer</h5>
                    <p className="text-xs text-blue-100 mb-2">Median Salary: $70,000 - $120,000</p>
                    <p className="text-xs text-blue-100">Growth: 25% (Much faster than average)</p>
                  </div>
                  <div className="bg-green-800/30 rounded-lg p-4 border border-green-600/30">
                    <h5 className="font-semibold text-green-300 text-sm mb-2">🤖 AI/ML Engineer</h5>
                    <p className="text-xs text-green-100 mb-2">Median Salary: $90,000 - $150,000</p>
                    <p className="text-xs text-green-100">Growth: 35% (Extremely high demand)</p>
                  </div>
                  <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2">🔬 Data Scientist</h5>
                    <p className="text-xs text-purple-100 mb-2">Median Salary: $80,000 - $130,000</p>
                    <p className="text-xs text-purple-100">Growth: 31% (Much faster than average)</p>
                  </div>
                  <div className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30">
                    <h5 className="font-semibold text-yellow-300 text-sm mb-2">⚡ Electrical Engineer</h5>
                    <p className="text-xs text-yellow-100 mb-2">Median Salary: $65,000 - $110,000</p>
                    <p className="text-xs text-yellow-100">Growth: 7% (Steady growth)</p>
                  </div>
                  <div className="bg-red-800/30 rounded-lg p-4 border border-red-600/30">
                    <h5 className="font-semibold text-red-300 text-sm mb-2">🏥 Biomedical Engineer</h5>
                    <p className="text-xs text-red-100 mb-2">Median Salary: $70,000 - $115,000</p>
                    <p className="text-xs text-red-100">Growth: 6% (Faster than average)</p>
                  </div>
                  <div className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30">
                    <h5 className="font-semibold text-cyan-300 text-sm mb-2">🔐 Cybersecurity Analyst</h5>
                    <p className="text-xs text-cyan-100 mb-2">Median Salary: $75,000 - $125,000</p>
                    <p className="text-xs text-cyan-100">Growth: 33% (Much faster than average)</p>
                  </div>
                </div>
              </div>

              {/* Emerging Fields */}
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  🌟 Emerging STEM Fields (Future-Ready Careers)
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-purple-800/30 rounded-lg p-3 border border-purple-600/30">
                      <h5 className="font-semibold text-purple-300 text-sm mb-1">🧬 Biotechnology</h5>
                      <p className="text-xs text-purple-100">Gene therapy, personalized medicine, bioengineering</p>
                    </div>
                    <div className="bg-pink-800/30 rounded-lg p-3 border border-pink-600/30">
                      <h5 className="font-semibold text-pink-300 text-sm mb-1">🌱 Renewable Energy</h5>
                      <p className="text-xs text-pink-100">Solar, wind, battery technology, smart grids</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-indigo-800/30 rounded-lg p-3 border border-indigo-600/30">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-1">🚀 Space Technology</h5>
                      <p className="text-xs text-indigo-100">Satellite systems, space exploration, aerospace engineering</p>
                    </div>
                    <div className="bg-teal-800/30 rounded-lg p-3 border border-teal-600/30">
                      <h5 className="font-semibold text-teal-300 text-sm mb-1">⚛️ Quantum Computing</h5>
                      <p className="text-xs text-teal-100">Quantum algorithms, cryptography, quantum systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEM Videos Section - Edge to Edge */}
        <section className="w-full bg-gray-800 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">STEM Career Guidance Videos 🎥</h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* What is STEM Education */}
              <VideoCard
                videoId="CWnMBRHd9Ho"
                title="What is STEM Education?"
                description="Comprehensive overview of Science, Technology, Engineering, and Mathematics education"
                gradientFrom="from-blue-900/30"
                gradientTo="to-cyan-900/30"
                borderColor="border-blue-700/30"
                hoverColor="border-blue-500/50"
                textColor="text-blue-300"
                onClick={() => setSelectedVideo({id: 'CWnMBRHd9Ho', title: 'What is STEM Education?'})}
              />

              {/* STEM Career Benefits */}
              <VideoCard
                videoId="PVJ3S6Lb8F8"
                title="STEM Degrees = Success?"
                description="Career perks, university insights, and STEM education benefits explained"
                gradientFrom="from-green-900/30"
                gradientTo="to-emerald-900/30"
                borderColor="border-green-700/30"
                hoverColor="border-green-500/50"
                textColor="text-green-300"
                onClick={() => setSelectedVideo({id: 'PVJ3S6Lb8F8', title: 'STEM Degrees = Success? Top Universities and Career Perks'})}
              />

              {/* Women in STEM */}
              <VideoCard
                videoId="kA08vfoZAJY"
                title="Women in STEM Careers"
                description="Challenges and opportunities for women in science, technology, engineering, and math"
                gradientFrom="from-purple-900/30"
                gradientTo="to-pink-900/30"
                borderColor="border-purple-700/30"
                hoverColor="border-purple-500/50"
                textColor="text-purple-300"
                onClick={() => setSelectedVideo({id: 'kA08vfoZAJY', title: 'Why do so many women leave their careers in STEM?'})}
              />

              {/* STEM Importance */}
              <VideoCard
                videoId="fH5iLx_jCUk"
                title="Why is STEM Important?"
                description="Understanding the importance and impact of STEM education in today's world"
                gradientFrom="from-orange-900/30"
                gradientTo="to-red-900/30"
                borderColor="border-orange-700/30"
                hoverColor="border-orange-500/50"
                textColor="text-orange-300"
                onClick={() => setSelectedVideo({id: 'fH5iLx_jCUk', title: 'STEM - What is it and why is it important?'})}
              />

              {/* STEM Role Models */}
              <VideoCard
                videoId="mulAuJFcxQQ"
                title="STEM Role Models"
                description="The importance of relatable role models in STEM education and careers"
                gradientFrom="from-teal-900/30"
                gradientTo="to-cyan-900/30"
                borderColor="border-teal-700/30"
                hoverColor="border-teal-500/50"
                textColor="text-teal-300"
                onClick={() => setSelectedVideo({id: 'mulAuJFcxQQ', title: 'We Need More STEM Role Models Who Are A Bit Less Brilliant'})}
              />

              {/* Robotics Engineering Career */}
              <VideoCard
                videoId="2nQ_5zXuSm8"
                title="Robotics Engineering Career"
                description="Real-world insights from a robotics engineer about STEM careers"
                gradientFrom="from-indigo-900/30"
                gradientTo="to-purple-900/30"
                borderColor="border-indigo-700/30"
                hoverColor="border-indigo-500/50"
                textColor="text-indigo-300"
                onClick={() => setSelectedVideo({id: '2nQ_5zXuSm8', title: 'In The Know with Robotics Engineer Dr. Carlotta Berry'})}
              />
            </div>
          </div>
        </section>

        {/* STEM Education Pathways - Edge to Edge */}
        <section className="w-full bg-black py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">STEM Education Pathways 🎓</h3>
            </div>

            <div className="space-y-6">
              {/* Education Overview */}
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
                <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                  <strong className="text-blue-300">Build a strong STEM foundation</strong> from Junior High School through University and beyond. Each educational stage prepares you for the next level of STEM excellence! 📚✨
                </p>
              </div>

              {/* Educational Stages */}
              <div className="bg-gradient-to-r from-green-900/30 to-purple-900/30 rounded-lg p-6 border border-green-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                  🏫 Educational Journey: JHS → SHS → University
                </h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-green-800/30 rounded-lg p-4 border border-green-600/30">
                    <h5 className="font-semibold text-green-300 text-sm mb-2">🌱 Junior High School (JHS)</h5>
                    <ul className="space-y-1 text-xs text-green-100">
                      <li>• <strong>Mathematics</strong> - Algebra, Geometry foundations</li>
                      <li>• <strong>Integrated Science</strong> - Basic scientific concepts</li>
                      <li>• <strong>ICT</strong> - Computer literacy and basic programming</li>
                      <li>• <strong>Critical Thinking</strong> - Problem-solving skills</li>
                    </ul>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2">🚀 Senior High School (SHS)</h5>
                    <ul className="space-y-1 text-xs text-blue-100">
                      <li>• <strong>Advanced Math</strong> - Calculus, Statistics</li>
                      <li>• <strong>Specialized Sciences</strong> - Physics, Chemistry, Biology</li>
                      <li>• <strong>Programming</strong> - Computer Science fundamentals</li>
                      <li>• <strong>Research Projects</strong> - Scientific method application</li>
                    </ul>
                  </div>

                  <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2">🎓 University & Beyond</h5>
                    <ul className="space-y-1 text-xs text-purple-100">
                      <li>• <strong>Bachelor's Degree</strong> - Specialized STEM field</li>
                      <li>• <strong>Internships</strong> - Real-world experience</li>
                      <li>• <strong>Graduate Studies</strong> - Advanced specialization</li>
                      <li>• <strong>Continuous Learning</strong> - Professional development</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ghana Education System Focus */}
              <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border border-yellow-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                  🇬🇭 Ghana Education System STEM Track
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-yellow-800/30 rounded-lg p-3 border border-yellow-600/30">
                      <h5 className="font-semibold text-yellow-300 text-sm mb-1">📋 BECE Preparation</h5>
                      <p className="text-xs text-yellow-100">Excel in Mathematics and Integrated Science for STEM program placement</p>
                    </div>
                    <div className="bg-yellow-800/30 rounded-lg p-3 border border-yellow-600/30">
                      <h5 className="font-semibold text-yellow-300 text-sm mb-1">🔬 SHS Science Programs</h5>
                      <p className="text-xs text-yellow-100">Choose General Science or specialized tracks for university preparation</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-orange-800/30 rounded-lg p-3 border border-orange-600/30">
                      <h5 className="font-semibold text-orange-300 text-sm mb-1">🎯 WASSCE Excellence</h5>
                      <p className="text-xs text-orange-100">Achieve top grades in Core Math, Integrated Science, and electives</p>
                    </div>
                    <div className="bg-orange-800/30 rounded-lg p-3 border border-orange-600/30">
                      <h5 className="font-semibold text-orange-300 text-sm mb-1">🏛️ University Admission</h5>
                      <p className="text-xs text-orange-100">Meet cut-off points for Engineering, Medicine, Computer Science programs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Essential STEM Skills - Edge to Edge */}
        <section className="w-full bg-gray-800 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Essential STEM Skills 🛠️</h3>
            </div>

            <div className="space-y-6">
              {/* Skills Overview */}
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/30">
                <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                  <strong className="text-purple-300">Master these critical skills</strong> to excel in any STEM field and prepare for the challenges of tomorrow. These competencies are essential for success in modern STEM careers! 🚀💡
                </p>
              </div>

              {/* Core Skills Categories */}
              <div className="bg-gradient-to-r from-red-900/30 to-blue-900/30 rounded-lg p-6 border border-red-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
                  🧠 Core STEM Competencies
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-red-800/30 rounded-lg p-4 border border-red-600/30 text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h5 className="font-semibold text-red-300 text-sm mb-2">Problem Solving</h5>
                    <p className="text-xs text-red-100">Breaking down complex challenges into manageable solutions</p>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30 text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h5 className="font-semibold text-blue-300 text-sm mb-2">Programming</h5>
                    <p className="text-xs text-blue-100">Coding skills essential for modern STEM applications</p>
                  </div>

                  <div className="bg-green-800/30 rounded-lg p-4 border border-green-600/30 text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h5 className="font-semibold text-green-300 text-sm mb-2">Data Analysis</h5>
                    <p className="text-xs text-green-100">Interpreting and drawing insights from complex datasets</p>
                  </div>

                  <div className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30 text-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h5 className="font-semibold text-yellow-300 text-sm mb-2">Critical Thinking</h5>
                    <p className="text-xs text-yellow-100">Evaluating information and making logical decisions</p>
                  </div>
                </div>
              </div>

              {/* Advanced Skills */}
              <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-lg p-6 border border-cyan-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                  🚀 Advanced STEM Skills (21st Century)
                </h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30">
                    <h5 className="font-semibold text-cyan-300 text-sm mb-2">🤖 AI & Machine Learning</h5>
                    <ul className="space-y-1 text-xs text-cyan-100">
                      <li>• Neural Networks & Deep Learning</li>
                      <li>• Data Science & Analytics</li>
                      <li>• Algorithm Development</li>
                    </ul>
                  </div>
                  <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2">🔬 Research & Innovation</h5>
                    <ul className="space-y-1 text-xs text-purple-100">
                      <li>• Scientific Method Application</li>
                      <li>• Experimental Design</li>
                      <li>• Peer Review & Publication</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30">
                    <h5 className="font-semibold text-indigo-300 text-sm mb-2">🌐 Digital Literacy</h5>
                    <ul className="space-y-1 text-xs text-indigo-100">
                      <li>• Cloud Computing & DevOps</li>
                      <li>• Cybersecurity Awareness</li>
                      <li>• Digital Communication</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEM Global Impact - Edge to Edge */}
        <section className="w-full bg-black py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">STEM's Global Impact 🌍</h3>
            </div>

            <div className="space-y-6">
              {/* Global Impact Overview */}
              <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-700/30">
                <p className="text-sm sm:text-base text-cyan-100 leading-relaxed">
                  <strong className="text-cyan-300">STEM drives global innovation</strong> and solves humanity's greatest challenges. From healthcare breakthroughs to climate solutions, STEM professionals are shaping our future! 🚀🌟
                </p>
              </div>

              {/* Impact Areas */}
              <div className="bg-gradient-to-r from-red-900/30 to-blue-900/30 rounded-lg p-6 border border-red-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
                  🌟 STEM Impact Across Industries
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-red-800/30 rounded-lg p-4 border border-red-600/30">
                    <h5 className="font-semibold text-red-300 text-sm mb-2">🏥 Healthcare</h5>
                    <ul className="space-y-1 text-xs text-red-100">
                      <li>• Gene therapy & personalized medicine</li>
                      <li>• AI-powered diagnostics</li>
                      <li>• Robotic surgery systems</li>
                      <li>• Vaccine development</li>
                    </ul>
                  </div>

                  <div className="bg-green-800/30 rounded-lg p-4 border border-green-600/30">
                    <h5 className="font-semibold text-green-300 text-sm mb-2">🌱 Environment</h5>
                    <ul className="space-y-1 text-xs text-green-100">
                      <li>• Renewable energy systems</li>
                      <li>• Climate modeling & prediction</li>
                      <li>• Sustainable materials</li>
                      <li>• Carbon capture technology</li>
                    </ul>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2">🚗 Transportation</h5>
                    <ul className="space-y-1 text-xs text-blue-100">
                      <li>• Autonomous vehicles</li>
                      <li>• Electric vehicle technology</li>
                      <li>• Smart traffic systems</li>
                      <li>• Aerospace innovation</li>
                    </ul>
                  </div>

                  <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2">📡 Communication</h5>
                    <ul className="space-y-1 text-xs text-purple-100">
                      <li>• 5G & 6G networks</li>
                      <li>• Satellite internet</li>
                      <li>• Quantum communication</li>
                      <li>• Virtual & augmented reality</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border border-yellow-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                  🚀 Start Your STEM Journey Today
                </h4>
                <p className="text-sm sm:text-base text-yellow-100 leading-relaxed mb-4">
                  The future belongs to those who understand and shape technology. Begin building your STEM foundation at St. Louis Demonstration JHS and unlock unlimited possibilities! 🌟
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="/stem"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 hover:scale-105 text-sm sm:text-base"
                    style={{
                      textShadow: '0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.6)',
                      boxShadow: '0 0 20px rgba(255, 255, 0, 0.3), 0 0 40px rgba(255, 255, 0, 0.2)'
                    }}
                  >
                    <span>Explore STEM Resources</span>
                  </a>
                  <a
                    href="/academics"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base"
                  >
                    <span>View Our Curriculum</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEM Substack Publications - Edge to Edge */}
        <section className="w-full bg-gray-800 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v3a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h1V5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2h-1v-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">STEM Substack Publications 📚</h3>
            </div>

            <div className="space-y-6">
              {/* Publications Overview */}
              <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-700/30">
                <p className="text-sm sm:text-base text-orange-100 leading-relaxed">
                  <strong className="text-orange-300">Discover top STEM newsletters</strong> from leading experts, researchers, and educators. Stay updated with the latest in science, technology, engineering, and mathematics! 📖✨
                </p>
              </div>

              {/* Engineering & Technology Publications */}
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-6 border border-blue-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  ⚙️ Engineering & Technology
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <a href="https://newsletter.pragmaticengineer.com/" target="_blank" rel="noopener noreferrer" className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30 hover:border-blue-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2 group-hover:text-blue-200">The Pragmatic Engineer</h5>
                    <p className="text-xs text-blue-100 mb-2">by Gergely Orosz</p>
                    <p className="text-xs text-blue-100">Big Tech engineering practices, career advice, and industry insights</p>
                  </a>

                  <a href="https://dataengineeringweekly.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30 hover:border-cyan-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-cyan-300 text-sm mb-2 group-hover:text-cyan-200">Data Engineering Weekly</h5>
                    <p className="text-xs text-cyan-100 mb-2">by Ananth Packkildurai</p>
                    <p className="text-xs text-cyan-100">Latest tools and best practices for building data platforms</p>
                  </a>

                  <a href="https://qualityeng.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30 hover:border-indigo-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-indigo-300 text-sm mb-2 group-hover:text-indigo-200">Quality Engineering Newsletter</h5>
                    <p className="text-xs text-indigo-100 mb-2">by Jit Gosai</p>
                    <p className="text-xs text-indigo-100">Building quality into every part of software systems</p>
                  </a>

                  <a href="https://juhache.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30 hover:border-purple-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2 group-hover:text-purple-200">Ju Data Engineering Newsletter</h5>
                    <p className="text-xs text-purple-100 mb-2">by Julien Hurault</p>
                    <p className="text-xs text-purple-100">Weekly exploration of data engineering tools and practices</p>
                  </a>

                  <a href="https://eczachly.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-teal-800/30 rounded-lg p-4 border border-teal-600/30 hover:border-teal-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-teal-300 text-sm mb-2 group-hover:text-teal-200">DataEngineer.io Newsletter</h5>
                    <p className="text-xs text-teal-100 mb-2">by Zach Wilson</p>
                    <p className="text-xs text-teal-100">Data engineering and technology trends discussion</p>
                  </a>

                  <a href="https://detectionengineering.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-red-800/30 rounded-lg p-4 border border-red-600/30 hover:border-red-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-red-300 text-sm mb-2 group-hover:text-red-200">Detection Engineering Weekly</h5>
                    <p className="text-xs text-red-100 mb-2">by Zack Allen</p>
                    <p className="text-xs text-red-100">Latest news and how-tos in detection engineering</p>
                  </a>
                </div>
              </div>

              {/* Science & Research Publications */}
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-6 border border-green-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                  🔬 Science & Research
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <a href="https://fromthescienceclass.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-green-800/30 rounded-lg p-4 border border-green-600/30 hover:border-green-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-green-300 text-sm mb-2 group-hover:text-green-200">From the Science Class</h5>
                    <p className="text-xs text-green-100 mb-2">by Elisabeth Marnik, PhD</p>
                    <p className="text-xs text-green-100">Science education, funding, and STEM policy insights</p>
                  </a>

                  <a href="https://pinoyscientists.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-emerald-800/30 rounded-lg p-4 border border-emerald-600/30 hover:border-emerald-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-emerald-300 text-sm mb-2 group-hover:text-emerald-200">The Pinoy Scientists Newsletter</h5>
                    <p className="text-xs text-emerald-100 mb-2">by Filipino Scientists Community</p>
                    <p className="text-xs text-emerald-100">Highlighting Filipino scientists and their research</p>
                  </a>

                  <a href="https://ultracold.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-teal-800/30 rounded-lg p-4 border border-teal-600/30 hover:border-teal-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-teal-300 text-sm mb-2 group-hover:text-teal-200">Ultracold</h5>
                    <p className="text-xs text-teal-100 mb-2">by Karmela Padavic Callaghan</p>
                    <p className="text-xs text-teal-100">Physics research and quantum science exploration</p>
                  </a>

                  <a href="https://beyondeuclid.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30 hover:border-cyan-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-cyan-300 text-sm mb-2 group-hover:text-cyan-200">Beyond Euclid</h5>
                    <p className="text-xs text-cyan-100 mb-2">by Ali Kaya</p>
                    <p className="text-xs text-cyan-100">Mathematics, physics, and scientific discoveries</p>
                  </a>

                  <a href="https://mattsclancy.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30 hover:border-blue-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2 group-hover:text-blue-200">New Things Under the Sun</h5>
                    <p className="text-xs text-blue-100 mb-2">by Matt Clancy</p>
                    <p className="text-xs text-blue-100">Innovation research and science of science</p>
                  </a>

                  <a href="https://rssdsaisection.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30 hover:border-purple-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2 group-hover:text-purple-200">RSS DS+AI Section</h5>
                    <p className="text-xs text-purple-100 mb-2">by Royal Statistical Society</p>
                    <p className="text-xs text-purple-100">Data science and AI research insights</p>
                  </a>
                </div>
              </div>

              {/* Mathematics & Analytics Publications */}
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  📊 Mathematics & Analytics
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <a href="https://learnanalyticsengineering.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30 hover:border-purple-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2 group-hover:text-purple-200">Learn Analytics Engineering</h5>
                    <p className="text-xs text-purple-100 mb-2">by Madison Mae</p>
                    <p className="text-xs text-purple-100">Practical analytics engineering skills for data professionals</p>
                  </a>

                  <a href="https://datawithbaraa.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-pink-800/30 rounded-lg p-4 border border-pink-600/30 hover:border-pink-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-pink-300 text-sm mb-2 group-hover:text-pink-200">Data with Baraa</h5>
                    <p className="text-xs text-pink-100 mb-2">by Baraa</p>
                    <p className="text-xs text-pink-100">Data engineering roadmaps and big data project insights</p>
                  </a>

                  <a href="https://joereis.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30 hover:border-indigo-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-indigo-300 text-sm mb-2 group-hover:text-indigo-200">Joe Reis</h5>
                    <p className="text-xs text-indigo-100 mb-2">by Joe Reis</p>
                    <p className="text-xs text-indigo-100">Fundamentals of data engineering and industry trends</p>
                  </a>

                  <a href="https://econhappyhour.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30 hover:border-yellow-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-yellow-300 text-sm mb-2 group-hover:text-yellow-200">Econ Happy Hour</h5>
                    <p className="text-xs text-yellow-100 mb-2">by Economics Researchers</p>
                    <p className="text-xs text-yellow-100">Economics as a STEM discipline and quantitative analysis</p>
                  </a>

                  <a href="https://astralcodexten.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-red-800/30 rounded-lg p-4 border border-red-600/30 hover:border-red-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-red-300 text-sm mb-2 group-hover:text-red-200">Astral Codex Ten</h5>
                    <p className="text-xs text-red-100 mb-2">by Scott Alexander</p>
                    <p className="text-xs text-red-100">Mathematics, statistics, and scientific reasoning</p>
                  </a>

                  <a href="https://dwarkesh.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-orange-800/30 rounded-lg p-4 border border-orange-600/30 hover:border-orange-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-orange-300 text-sm mb-2 group-hover:text-orange-200">The Lunar Society</h5>
                    <p className="text-xs text-orange-100 mb-2">by Dwarkesh Patel</p>
                    <p className="text-xs text-orange-100">Mathematics education and technology interviews</p>
                  </a>
                </div>
              </div>

              {/* AI & Computer Science Publications */}
              <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-6 border border-cyan-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                  🤖 AI & Computer Science
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <a href="https://drphilippahardman.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30 hover:border-cyan-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-cyan-300 text-sm mb-2 group-hover:text-cyan-200">Dr Phil's Newsletter</h5>
                    <p className="text-xs text-cyan-100 mb-2">by Dr Philippa Hardman</p>
                    <p className="text-xs text-cyan-100">AI in learning science and educational technology</p>
                  </a>

                  <a href="https://addyo.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30 hover:border-blue-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2 group-hover:text-blue-200">The Prompt Engineering Playbook</h5>
                    <p className="text-xs text-blue-100 mb-2">by Addy Osmani</p>
                    <p className="text-xs text-blue-100">Prompt engineering techniques for programmers</p>
                  </a>

                  <a href="https://productfaculty.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30 hover:border-indigo-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-indigo-300 text-sm mb-2 group-hover:text-indigo-200">Product Faculty</h5>
                    <p className="text-xs text-indigo-100 mb-2">by Product Faculty Team</p>
                    <p className="text-xs text-indigo-100">AI reasoning and path to artificial general intelligence</p>
                  </a>

                  <a href="https://edbeng.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30 hover:border-purple-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2 group-hover:text-purple-200">EDB Engineering Newsletter</h5>
                    <p className="text-xs text-purple-100 mb-2">by EDB Team</p>
                    <p className="text-xs text-purple-100">PostgreSQL development and database engineering</p>
                  </a>

                  <a href="https://techsoda.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-teal-800/30 rounded-lg p-4 border border-teal-600/30 hover:border-teal-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-teal-300 text-sm mb-2 group-hover:text-teal-200">Tech Soda</h5>
                    <p className="text-xs text-teal-100 mb-2">by Tech Soda Team</p>
                    <p className="text-xs text-teal-100">STEM career transitions and technology innovation</p>
                  </a>

                  <a href="https://jameswphillips.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-green-800/30 rounded-lg p-4 border border-green-600/30 hover:border-green-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-green-300 text-sm mb-2 group-hover:text-green-200">Science & Technology Research</h5>
                    <p className="text-xs text-green-100 mb-2">by James Phillips</p>
                    <p className="text-xs text-green-100">Research ecosystems and scientific innovation</p>
                  </a>
                </div>
              </div>

              {/* Innovation & Future Tech Publications */}
              <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border border-yellow-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                  🚀 Innovation & Future Tech
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <a href="https://fasterplease.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30 hover:border-yellow-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-yellow-300 text-sm mb-2 group-hover:text-yellow-200">Faster, Please!</h5>
                    <p className="text-xs text-yellow-100 mb-2">by James Pethokoukis</p>
                    <p className="text-xs text-yellow-100">Innovation policy and STEM excellence promotion</p>
                  </a>

                  <a href="https://tamingcomplexity.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-orange-800/30 rounded-lg p-4 border border-orange-600/30 hover:border-orange-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-orange-300 text-sm mb-2 group-hover:text-orange-200">Taming Complexity</h5>
                    <p className="text-xs text-orange-100 mb-2">by Complexity Researchers</p>
                    <p className="text-xs text-orange-100">Humanities in STEM and engineering society interactions</p>
                  </a>

                  <a href="https://nirhindie.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-red-800/30 rounded-lg p-4 border border-red-600/30 hover:border-red-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-red-300 text-sm mb-2 group-hover:text-red-200">Nir Hindie</h5>
                    <p className="text-xs text-red-100 mb-2">by Nir Hindie</p>
                    <p className="text-xs text-red-100">Technology design and the importance of arts in tech</p>
                  </a>

                  <a href="https://charlotteledger.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-pink-800/30 rounded-lg p-4 border border-pink-600/30 hover:border-pink-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-pink-300 text-sm mb-2 group-hover:text-pink-200">Charlotte Ledger</h5>
                    <p className="text-xs text-pink-100 mb-2">by Lindsey Banks</p>
                    <p className="text-xs text-pink-100">Robotics education and STEM workforce development</p>
                  </a>

                  <a href="https://latinometrics.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30 hover:border-purple-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2 group-hover:text-purple-200">LatinOmetrics</h5>
                    <p className="text-xs text-purple-100 mb-2">by LatinOmetrics Team</p>
                    <p className="text-xs text-purple-100">STEM graduates and technology adoption in Latin America</p>
                  </a>

                  <a href="https://michaelshermer.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30 hover:border-indigo-400/50 transition-all duration-300 group">
                    <h5 className="font-semibold text-indigo-300 text-sm mb-2 group-hover:text-indigo-200">Skeptic</h5>
                    <p className="text-xs text-indigo-100 mb-2">by Michael Shermer</p>
                    <p className="text-xs text-indigo-100">Scientific skepticism and critical thinking in STEM</p>
                  </a>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-6 border border-green-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                  📖 Start Reading & Learning Today!
                </h4>
                <p className="text-sm sm:text-base text-green-100 leading-relaxed mb-4">
                  These STEM Substack publications offer world-class insights from leading experts, researchers, and educators. Subscribe to expand your knowledge and stay at the forefront of scientific and technological innovation! 🌟
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://substack.com/discover/category/technology"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl hover:from-green-300 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-green-400/25 hover:scale-105 text-sm sm:text-base"
                  >
                    <span>Explore More STEM Publications</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    href="/stem"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base"
                  >
                    <span>Back to STEM Resources</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoId={selectedVideo.id}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
};

export default StemDeepLearningPage;