import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Briefcase, Lightbulb, Code, Bot, Calculator, Zap, Play, Rocket, Target, Heart, Brain, Network, Database, Eye, MessageSquare, Car, Shield, Sparkles, AlertTriangle, TrendingUp, Star, X, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

// Enhanced Silver Shimmer Loading Component for Videos
const VideoShimmer: React.FC = () => (
  <div className="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700/50" style={{ paddingBottom: '56.25%' }}>
    {/* Base shimmer background */}
    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
      {/* Silver shimmer wave effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent"
        style={{
          animation: 'shimmer 2s ease-in-out infinite alternate'
        }}
      ></div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          animation: 'shimmer 3s ease-in-out infinite alternate-reverse'
        }}
      ></div>

      {/* Animated silver lines */}
      <div className="absolute top-4 left-4 right-4 h-3 bg-gradient-to-r from-transparent via-gray-300/40 to-transparent rounded animate-pulse"></div>
      <div className="absolute top-10 left-8 right-8 h-2 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
      <div className="absolute top-16 left-6 right-12 h-2 bg-gradient-to-r from-transparent via-gray-300/25 to-transparent rounded animate-pulse" style={{ animationDelay: '0.5s' }}></div>

      {/* Center play button with silver glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-400/20 to-gray-600/30 rounded-full flex items-center justify-center animate-pulse border border-gray-400/40 shadow-lg shadow-gray-400/20">
            <Play size={28} className="text-gray-300 ml-1 animate-pulse" />
          </div>
          {/* Pulsing silver ring */}
          <div className="absolute inset-0 w-20 h-20 border-2 border-gray-400/60 rounded-full animate-ping"></div>
          <div className="absolute inset-2 w-16 h-16 border border-gray-300/40 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading text with silver shimmer */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 rounded-full border border-gray-400/30">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <span className="text-gray-300 text-xs font-medium ml-2">Loading Video...</span>
        </div>
      </div>
    </div>

    {/* Custom CSS for shimmer animation */}
    <style jsx>{`
      @keyframes shimmer {
        0% { transform: translateX(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
      }
    `}</style>
  </div>
);

// Enhanced Video Component with Shimmer Loading and Error Handling
const AIVideo: React.FC<{
  src: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  note: string;
}> = ({ src, title, description, icon, gradient, note }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount(prev => prev + 1);
  };

  // Auto-retry mechanism
  useEffect(() => {
    if (hasError && retryCount < 3) {
      const timer = setTimeout(() => {
        handleRetry();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasError, retryCount]);

  return (
    <div className={`w-full bg-gradient-to-br ${gradient} p-4 sm:p-6 mb-8`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{title}</h3>
          <p className="text-xs sm:text-sm text-white/80">{description}</p>
        </div>
      </div>

      <div className="relative w-full mb-4">
        {isLoading && <VideoShimmer />}

        {hasError && (
          <div className="relative w-full bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-lg border border-red-700/50 flex items-center justify-center" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4 border border-red-400/40">
                <AlertTriangle size={24} className="text-red-300" />
              </div>
              <h4 className="text-white font-semibold mb-2">Video Loading Error</h4>
              <p className="text-red-200 text-sm mb-4">Unable to load video. Retrying automatically...</p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-red-600/50 hover:bg-red-600/70 text-white rounded-lg border border-red-500/50 transition-all duration-200 text-sm"
              >
                Retry Now ({retryCount}/3)
              </button>
            </div>
          </div>
        )}

        <div className={`relative w-full ${isLoading || hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`} style={{ paddingBottom: '56.25%' }}>
          <iframe
            key={retryCount} // Force re-render on retry
            className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-600/30"
            src={src}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-black/20 rounded-lg p-3 border border-white/10">
        <p className="text-xs sm:text-sm text-white/90">{note}</p>
      </div>
    </div>
  );
};

const AILearningPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleBack = () => {
    navigate(-1);
  };

  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedVideo) {
        closeVideoModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo]);

  // Enhanced Video Modal Component with Shimmer Loading
  const VideoModal = () => {
    const [modalLoading, setModalLoading] = useState(true);
    const [modalError, setModalError] = useState(false);

    if (!selectedVideo) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeVideoModal();
      }
    };

    const handleModalLoad = () => {
      setModalLoading(false);
      setModalError(false);
    };

    const handleModalError = () => {
      setModalLoading(false);
      setModalError(true);
    };

    // Reset loading state when video changes
    useEffect(() => {
      if (selectedVideo) {
        setModalLoading(true);
        setModalError(false);
      }
    }, [selectedVideo]);

    return (
      <div
        className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="relative w-full max-w-5xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
          <button
            onClick={closeVideoModal}
            className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
            title="Close video (or click anywhere outside)"
          >
            <X size={20} />
          </button>

          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {modalLoading && (
              <div className="absolute inset-0">
                <VideoShimmer />
              </div>
            )}

            {modalError && (
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-xl border border-red-700/50 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4 mx-auto border border-red-400/40">
                    <AlertTriangle size={24} className="text-red-300" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Video Loading Error</h4>
                  <p className="text-red-200 text-sm mb-4">Unable to load Andrej Karpathy video</p>
                  <button
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${selectedVideo}`, '_blank')}
                    className="px-4 py-2 bg-red-600/50 hover:bg-red-600/70 text-white rounded-lg border border-red-500/50 transition-all duration-200 text-sm"
                  >
                    Open on YouTube
                  </button>
                </div>
              </div>
            )}

            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Andrej Karpathy - AI Education Video"
              style={{ border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className={`absolute top-0 left-0 w-full h-full rounded-xl transition-opacity duration-500 ${modalLoading || modalError ? 'opacity-0' : 'opacity-100'}`}
              onLoad={handleModalLoad}
              onError={handleModalError}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <VideoModal />
      <SEOHead
        title="Learn Artificial Intelligence | Complete AI Guide for Students - St. Louis Demonstration JHS"
        description="Comprehensive AI learning guide covering everything from basics to advanced concepts. Explore machine learning, neural networks, career opportunities, and the future of AI technology."
        keywords="artificial intelligence, AI learning, machine learning, neural networks, AI careers, technology education, AI basics, deep learning"
        image="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO"
        url="/ai"
        type="article"
        pageType="educational"
        useGalleryImages={false}
        socialImagePreferences={{
          facebook: "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO",
          twitter: "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO",
          linkedin: "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO",
          whatsapp: "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO"
        }}
      />

      {/* Back Bar - With proper spacing from header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4 mt-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Learn Artificial Intelligence
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content - True Edge to Edge, No Containers */}
      <main className="w-full">
        {/* Hero Section - Edge to Edge with Background Image */}
        <section
          className="w-full py-16 sm:py-24 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4 sm:px-6 relative z-10"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-400 to-blue-600 rounded-2xl mb-6 sm:mb-8 shadow-2xl backdrop-blur-sm border border-white/20">
              <Brain size={40} className="sm:w-12 sm:h-12 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent leading-tight">
              Master Artificial Intelligence
            </h2>
            <p className="text-base sm:text-lg text-white leading-relaxed max-w-3xl mx-auto mb-8">
              🚀 Embark on an incredible journey into AI. From basic concepts to cutting-edge tech reshaping our world. Explore the complete story from Dartmouth 1956 to the US-China AI race.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <span className="text-purple-300">🏛️ AGI Research Labs</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <span className="text-blue-300">🌟 AI Pioneers</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <span className="text-cyan-300">📚 Expert Books</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <span className="text-green-300">🎥 Video Learning</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* What is AI & Deep History - Edge to Edge */}
        <section className="w-full bg-gray-800 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <Lightbulb size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">What is AI? The Complete Story 🤖</h3>
            </div>

            <div className="space-y-6">
              {/* Modern Definition */}
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
                <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-4">
                  <strong className="text-cyan-300">Artificial Intelligence (AI)</strong> is technology that enables computers and machines to simulate human learning, comprehension, problem-solving, decision-making, creativity and autonomy. Today's AI can write essays, create art, diagnose diseases, drive cars, and even engage in philosophical conversations! 🧠✨
                </p>
                <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                  In 2024-2025, we're experiencing an unprecedented AI revolution with <strong className="text-cyan-300">Generative AI</strong> (ChatGPT, Claude), <strong className="text-cyan-300">AI Agents</strong> (autonomous task completion), and <strong className="text-cyan-300">Multimodal AI</strong> (understanding text, images, audio, video simultaneously).
                </p>
              </div>

              {/* The Birth of AI: Dartmouth 1956 */}
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  🏛️ The Birth of AI: Dartmouth College, Summer 1956
                </h4>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                    The field of Artificial Intelligence was officially born during a historic 6-week workshop at <strong className="text-purple-300">Dartmouth College</strong> in the summer of 1956. This legendary gathering brought together the brightest minds who would shape the future of computing and human civilization.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                      <h5 className="font-semibold text-purple-300 text-sm mb-2">🧠 The Founding Fathers</h5>
                      <ul className="space-y-1 text-xs text-purple-100">
                        <li>• <strong>John McCarthy</strong> - Coined the term "Artificial Intelligence"</li>
                        <li>• <strong>Marvin Minsky</strong> - MIT AI pioneer, neural networks</li>
                        <li>• <strong>Claude Shannon</strong> - Information theory genius</li>
                        <li>• <strong>Allen Newell</strong> - Logic Theorist creator</li>
                        <li>• <strong>Herbert Simon</strong> - Nobel Prize winner, cognitive science</li>
                        <li>• <strong>Arthur Samuel</strong> - Machine learning pioneer</li>
                      </ul>
                    </div>

                    <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                      <h5 className="font-semibold text-blue-300 text-sm mb-2">🎯 The Bold Vision</h5>
                      <p className="text-xs text-blue-100 mb-2">
                        Their proposal stated: <em>"Every aspect of learning or any other feature of intelligence can be so precisely described that a machine can be made to simulate it."</em>
                      </p>
                      <p className="text-xs text-blue-100">
                        This audacious claim launched a field that would eventually create ChatGPT, self-driving cars, and AI that can beat world champions at chess and Go!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pre-History: The Mathematical Foundations */}
              <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-6 border border-green-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-4">⚡ The Mathematical Foundations (1940s-1950s)</h4>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-green-800/30 rounded-lg p-4 border border-green-600/30">
                      <h5 className="font-semibold text-green-300 text-sm mb-2">🧮 McCulloch & Pitts (1943)</h5>
                      <p className="text-xs text-green-100 mb-2">
                        <strong>Warren McCulloch</strong> (neurophysiologist) and <strong>Walter Pitts</strong> (mathematical prodigy) published the first mathematical model of artificial neurons - the foundation of all modern neural networks!
                      </p>
                      <p className="text-xs text-green-200">
                        Their paper "A Logical Calculus of Ideas Immanent in Nervous Activity" proved that networks of simple artificial neurons could compute any logical function.
                      </p>
                    </div>

                    <div className="bg-teal-800/30 rounded-lg p-4 border border-teal-600/30">
                      <h5 className="font-semibold text-teal-300 text-sm mb-2">🤖 Alan Turing (1950)</h5>
                      <p className="text-xs text-teal-100 mb-2">
                        The brilliant British mathematician proposed the famous <strong>"Turing Test"</strong> in his paper "Computing Machinery and Intelligence" - asking whether machines can think.
                      </p>
                      <p className="text-xs text-teal-200">
                        His question "Can machines think?" launched philosophical debates that continue today with ChatGPT and advanced AI systems!
                      </p>
                    </div>
                  </div>

                  <div className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30">
                    <h5 className="font-semibold text-cyan-300 text-sm mb-2">🌐 Cybernetics Movement</h5>
                    <p className="text-xs text-cyan-100 mb-3">
                      <strong>Norbert Wiener's</strong> "Cybernetics" (1948) explored feedback loops and control systems, inspiring early AI researchers to think about machines that could learn and adapt - concepts central to today's AI systems.
                    </p>

                    {/* AI History Video */}
                    <div className="bg-black/30 rounded-lg p-2 border border-cyan-500/30">
                      <div className="aspect-video rounded overflow-hidden">
                        <iframe
                          src="https://www.youtube.com/embed/R3YFxF0n8n8?si=stu901"
                          title="The History of Artificial Intelligence [Documentary]"
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <p className="text-xs text-cyan-300 mt-1 text-center">🏛️ Complete AI History Documentary</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Golden Age and AI Winter */}
              <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border border-yellow-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-yellow-300 mb-4">🌟 The Golden Age & The AI Winter (1960s-1980s)</h4>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30">
                      <h5 className="font-semibold text-yellow-300 text-sm mb-2">🚀 The Perceptron (1957)</h5>
                      <p className="text-xs text-yellow-100 mb-2">
                        <strong>Frank Rosenblatt</strong> created the Perceptron at Cornell University - the first artificial neural network that could learn! The New York Times proclaimed it would be "the embryo of an electronic computer that [the Navy] expects will be able to walk, talk, see, write, reproduce itself and be conscious of its existence."
                      </p>
                    </div>

                    <div className="bg-orange-800/30 rounded-lg p-4 border border-orange-600/30">
                      <h5 className="font-semibold text-orange-300 text-sm mb-2">🏥 Expert Systems (1970s-80s)</h5>
                      <p className="text-xs text-orange-100 mb-2">
                        <strong>MYCIN</strong> (medical diagnosis) and <strong>DENDRAL</strong> (chemical analysis) were early expert systems that could match human specialists in narrow domains. These systems used rule-based reasoning - very different from today's neural networks.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-800/30 rounded-lg p-4 border border-red-600/30">
                    <h5 className="font-semibold text-red-300 text-sm mb-2">❄️ The AI Winter (1970s-1980s)</h5>
                    <p className="text-xs text-red-100">
                      Overpromising and underdelivering led to massive funding cuts. The limitations of early neural networks were exposed, and symbolic AI dominated. This "AI Winter" lasted until the 1990s when neural networks made a dramatic comeback with better algorithms and more computing power.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modern AI Renaissance */}
              <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg p-6 border border-indigo-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-indigo-300 mb-4">🔥 The Modern AI Renaissance (1990s-Present)</h4>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-2">🧠 Deep Learning Revolution</h5>
                      <ul className="space-y-1 text-xs text-indigo-100">
                        <li>• <strong>1990s:</strong> Backpropagation algorithm perfected</li>
                        <li>• <strong>2006:</strong> Geoffrey Hinton's deep learning breakthrough</li>
                        <li>• <strong>2012:</strong> AlexNet wins ImageNet, CNN revolution begins</li>
                        <li>• <strong>2017:</strong> Transformer architecture ("Attention is All You Need")</li>
                        <li>• <strong>2018:</strong> BERT and GPT models emerge</li>
                      </ul>
                    </div>

                    <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                      <h5 className="font-semibold text-purple-300 text-sm mb-2">🏆 Historic Milestones</h5>
                      <ul className="space-y-1 text-xs text-purple-100">
                        <li>• <strong>1997:</strong> IBM Deep Blue beats chess champion Garry Kasparov</li>
                        <li>• <strong>2016:</strong> AlphaGo defeats Go world champion Lee Sedol</li>
                        <li>• <strong>2020:</strong> GPT-3 shows emergent language abilities</li>
                        <li>• <strong>2022:</strong> ChatGPT launches, reaching 100M users in 2 months</li>
                        <li>• <strong>2024:</strong> AI achieves human-level performance in many domains</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current AI Capabilities */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                  <h4 className="text-base sm:text-lg font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                    <Brain size={16} className="sm:w-5 sm:h-5" />
                    How Modern AI Works ⚡
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-blue-100">
                    <li>• <strong>Deep Learning:</strong> Neural networks with millions of parameters</li>
                    <li>• <strong>Transformer Architecture:</strong> Attention mechanisms for language</li>
                    <li>• <strong>Reinforcement Learning:</strong> Learning through trial and error</li>
                    <li>• <strong>Transfer Learning:</strong> Applying knowledge across domains</li>
                    <li>• <strong>Multimodal Processing:</strong> Understanding multiple data types</li>
                    <li>• <strong>Emergent Abilities:</strong> Capabilities that arise at scale</li>
                  </ul>
                </div>

                <div className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30">
                  <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <Sparkles size={16} className="sm:w-5 sm:h-5" />
                    AI in Your Daily Life 🌟
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-cyan-100">
                    <li>• <strong>ChatGPT & Claude:</strong> AI tutors and writing assistants</li>
                    <li>• <strong>Sora & DALL-E:</strong> AI creates videos and images from text</li>
                    <li>• <strong>GitHub Copilot:</strong> AI writes code for programmers</li>
                    <li>• <strong>Tesla Autopilot:</strong> Self-driving car technology</li>
                    <li>• <strong>AI Agents:</strong> Book flights, schedule meetings autonomously</li>
                    <li>• <strong>Medical AI:</strong> Diagnoses diseases from medical scans</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MIT AI Introduction Video */}
        <AIVideo
          src="https://www.youtube.com/embed/TjZBTDzGeGg"
          title="🎓 MIT's Introduction to AI"
          description="Perfect starting point from world's top university"
          icon={<BookOpen size={20} className="text-white" />}
          gradient="from-gray-900 to-gray-800"
          note="🏛️ MIT OpenCourseWare: Prof. Patrick Winston's legendary lecture that has inspired millions of AI students worldwide!"
        />

        {/* Types of AI - Edge to Edge */}
        <section className="w-full bg-gray-900 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Network size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">3 Types of AI 🔥</h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-blue-800/40 rounded-lg p-4 border border-blue-600/40">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <Bot size={20} className="text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-blue-300 mb-2">Narrow AI (ANI) 🎯</h4>
                <p className="text-xs sm:text-sm text-blue-100 mb-3 leading-relaxed">
                  AI that's really good at ONE specific thing. This is what we use today! Also called "Weak AI," it's designed to perform specific tasks within a limited domain.
                </p>
                <div className="text-xs text-blue-200 mb-2">
                  <strong>Real Examples:</strong> ChatGPT (text), DALL-E (images), Tesla Autopilot (driving), AlphaGo (Go game)
                </div>
                <div className="text-xs text-blue-200 mb-3">
                  <strong>Capabilities:</strong> Exceeds human performance in specific domains but can't transfer knowledge to other areas
                </div>

                {/* Narrow AI Video */}
                <div className="bg-black/30 rounded-lg p-2 border border-blue-500/30">
                  <div className="aspect-video rounded overflow-hidden">
                    <iframe
                      src="https://www.youtube.com/embed/W01tIRP_Rqs?si=abc123"
                      title="Supervised vs Unsupervised Learning - Narrow AI Examples"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-xs text-blue-300 mt-1 text-center">🎯 Narrow AI in Action: Real-World Examples</p>
                </div>
              </div>

              <div className="bg-purple-800/40 rounded-lg p-4 border border-purple-600/40">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-3">
                  <Brain size={20} className="text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-purple-300 mb-2">General AI (AGI) 🌟</h4>
                <p className="text-xs sm:text-sm text-purple-100 mb-3 leading-relaxed">
                  AI as smart as humans in EVERYTHING. Also called "Strong AI," it would match human cognitive abilities across all domains with reasoning, learning, and creativity.
                </p>
                <div className="text-xs text-purple-200 mb-2">
                  <strong>Current Status:</strong> Major research focus at OpenAI, DeepMind, Anthropic. No system has achieved AGI yet.
                </div>
                <div className="text-xs text-purple-200 mb-3">
                  <strong>Timeline:</strong> Experts debate 2030-2050, but significant challenges remain
                </div>

                {/* AGI Video */}
                <div className="bg-black/30 rounded-lg p-2 border border-purple-500/30">
                  <div className="aspect-video rounded overflow-hidden">
                    <iframe
                      src="https://www.youtube.com/embed/LhLyOWoUnDI?si=def456"
                      title="Artificial General Intelligence (AGI) Simply Explained"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-xs text-purple-300 mt-1 text-center">🌟 AGI Explained: The Future of Intelligence</p>
                </div>
              </div>

              <div className="bg-red-800/40 rounded-lg p-4 border border-red-600/40">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-3">
                  <Zap size={20} className="text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-red-300 mb-2">Super AI (ASI) ⚡</h4>
                <p className="text-xs sm:text-sm text-red-100 mb-3 leading-relaxed">
                  AI smarter than ALL humans combined. Also called "Artificial Superintelligence," it would vastly outperform humans in every field including creativity and wisdom.
                </p>
                <div className="text-xs text-red-200 mb-2">
                  <strong>Theoretical Capabilities:</strong> Scientific breakthroughs, solving climate change, space exploration
                </div>
                <div className="text-xs text-red-200 mb-3">
                  <strong>Status:</strong> Purely theoretical - requires solving AGI first, then recursive self-improvement
                </div>

                {/* ASI Video */}
                <div className="bg-black/30 rounded-lg p-2 border border-red-500/30">
                  <div className="aspect-video rounded overflow-hidden">
                    <iframe
                      src="https://www.youtube.com/embed/P_w7YJPASlE?si=ghi789"
                      title="What is Artificial Super Intelligence Explained (ASI)"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-xs text-red-300 mt-1 text-center">⚡ ASI: Beyond Human Intelligence</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/20 rounded-lg p-4 border border-gray-700/30 mt-6">
              <h4 className="text-base sm:text-lg font-semibold text-green-300 mb-3">🔬 Deep Dive: Understanding AI Types</h4>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-white text-sm mb-3">Narrow AI (What We Have Now) 🤖</h5>
                  <div className="space-y-2 text-xs text-gray-100">
                    <p><strong>Definition:</strong> AI systems designed for specific tasks that can match or exceed human performance in narrow domains.</p>
                    <p><strong>Key Characteristics:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Operates within predefined parameters</li>
                      <li>• Cannot transfer learning to new domains</li>
                      <li>• Requires human programming for each task</li>
                      <li>• Lacks consciousness or self-awareness</li>
                    </ul>
                    <p><strong>Current Applications:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• <strong>Language Models:</strong> GPT-4, Claude, Gemini</li>
                      <li>• <strong>Computer Vision:</strong> Medical imaging, facial recognition</li>
                      <li>• <strong>Game AI:</strong> AlphaGo, chess engines</li>
                      <li>• <strong>Recommendation Systems:</strong> Netflix, Spotify, Amazon</li>
                      <li>• <strong>Autonomous Vehicles:</strong> Tesla, Waymo (limited scenarios)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-white text-sm mb-3">AGI vs ASI: The Future 🚀</h5>
                  <div className="space-y-2 text-xs text-gray-100">
                    <p><strong>Artificial General Intelligence (AGI):</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Human-level intelligence across all cognitive tasks</li>
                      <li>• Ability to understand, learn, and apply knowledge flexibly</li>
                      <li>• Transfer learning between different domains</li>
                      <li>• Reasoning, creativity, and problem-solving like humans</li>
                    </ul>
                    <p><strong>Artificial Superintelligence (ASI):</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Intelligence that vastly exceeds human cognitive abilities</li>
                      <li>• Recursive self-improvement capabilities</li>
                      <li>• Could solve humanity's greatest challenges</li>
                      <li>• Potential risks require careful safety research</li>
                    </ul>
                    <p><strong>Research Challenges:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• <strong>Alignment Problem:</strong> Ensuring AI goals match human values</li>
                      <li>• <strong>Control Problem:</strong> Maintaining human oversight</li>
                      <li>• <strong>Consciousness:</strong> Understanding machine consciousness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30 mt-4">
              <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-3">🏢 What Major AI Companies Are Building</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-white text-sm mb-2">Current Narrow AI Leaders:</h5>
                  <ul className="space-y-1 text-xs text-blue-100">
                    <li>• <strong>OpenAI:</strong> GPT-4, ChatGPT, DALL-E, Sora (text, images, video)</li>
                    <li>• <strong>Google DeepMind:</strong> Gemini, AlphaFold, Bard (multimodal AI)</li>
                    <li>• <strong>Anthropic:</strong> Claude (constitutional AI, safety-focused)</li>
                    <li>• <strong>Microsoft:</strong> Copilot integration across Office, Azure AI</li>
                    <li>• <strong>Meta:</strong> LLaMA models, Reality Labs (VR/AR AI)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-white text-sm mb-2">AGI Research Efforts:</h5>
                  <ul className="space-y-1 text-xs text-blue-100">
                    <li>• <strong>OpenAI:</strong> Explicit AGI mission, scaling transformer models</li>
                    <li>• <strong>DeepMind:</strong> General intelligence research, multi-task learning</li>
                    <li>• <strong>Anthropic:</strong> Constitutional AI for safe, beneficial AGI</li>
                    <li>• <strong>Stanford AI Lab:</strong> Fundamental research on intelligence</li>
                    <li>• <strong>MIT CSAIL:</strong> Cognitive architectures, reasoning systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google AI Journey - Edge to Edge */}
        <section className="w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center p-1">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyLjU2IDEyLjI1QzIyLjU2IDExLjQ3IDIyLjQ5IDEwLjcyIDIyLjM2IDEwSDEyVjE0LjI2SDE3LjkyQzE3LjY2IDE1LjYgMTYuOTIgMTYuNzQgMTUuODQgMTcuNVYyMC4yNkgxOS4zNkMyMS4wOSAxOC42MyAyMi41NiAxNS42NyAyMi41NiAxMi4yNVoiIGZpbGw9IiM0Mjg1RjQiLz4KPHBhdGggZD0iTTEyIDI0QzE1LjI0IDI0IDE3LjkyIDIyLjkyIDE5LjM2IDIwLjI2TDE1Ljg0IDE3LjVDMTQuNzYgMTguMjQgMTMuNDYgMTguNzIgMTIgMTguNzJDOC44NyAxOC43MiA2LjIyIDE3LjA5IDUuMjcgMTQuNjZIMi4xOFYxNy40MkMzLjYxIDIwLjI1IDcuNTYgMjQgMTIgMjRaIiBmaWxsPSIjMzRBODUzIi8+CjxwYXRoIGQ9Ik01LjI3IDE0LjY2QzUuMDIgMTMuOTIgNC44OCAxMy4xMyA0Ljg4IDEyLjI1QzQuODggMTEuMzcgNS4wMiAxMC41OCA1LjI3IDkuODRWNy4wOEgyLjE4QzEuNDMgOC41NSAxIDEwLjMzIDEgMTIuMjVDMSAxNC4xNyAxLjQzIDE1Ljk1IDIuMTggMTcuNDJMNS4yNyAxNC42NloiIGZpbGw9IiNGQkJDMDQiLz4KPHBhdGggZD0iTTEyIDUuNzhDMTMuNjIgNS43OCAxNS4wNiA2LjM0IDE2LjE5IDcuNDJMMTkuMzYgNC4yNkMxNy45MiAyLjkyIDE1LjI0IDIgMTIgMkM3LjU2IDIgMy42MSA1Ljc1IDIuMTggNy4wOEw1LjI3IDkuODRDNi4yMiA3LjQxIDguODcgNS43OCAxMiA1Ljc4WiIgZmlsbD0iI0VBNDMzNSIvPgo8L3N2Zz4K';
                  }}
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Learn Google's AI Journey 🚀</h3>
            </div>

            <div className="space-y-6">
              {/* Overview */}
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
                <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                  <strong className="text-blue-300">Discover Google's AI Evolution!</strong> Explore how Google transformed from a search engine into the world's leading AI powerhouse. From PageRank to Transformers, from DeepMind to Gemini - witness the incredible journey that shaped modern artificial intelligence. 🌟✨
                </p>
              </div>

              {/* Google AI Journey Card */}
              <div className="bg-gradient-to-r from-blue-800/30 to-indigo-800/30 rounded-lg p-6 border border-blue-600/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2">
                      <img
                        src="https://www.google.com/favicon.ico"
                        alt="Google AI Journey"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyLjU2IDEyLjI1QzIyLjU2IDExLjQ3IDIyLjQ5IDEwLjcyIDIyLjM2IDEwSDEyVjE0LjI2SDE3LjkyQzE3LjY2IDE1LjYgMTYuOTIgMTYuNzQgMTUuODQgMTcuNVYyMC4yNkgxOS4zNkMyMS4wOSAxOC42MyAyMi41NiAxNS42NyAyMi41NiAxMi4yNVoiIGZpbGw9IiM0Mjg1RjQiLz4KPHBhdGggZD0iTTEyIDI0QzE1LjI0IDI0IDE3LjkyIDIyLjkyIDE5LjM2IDIwLjI2TDE1Ljg0IDE3LjVDMTQuNzYgMTguMjQgMTMuNDYgMTguNzIgMTIgMTguNzJDOC44NyAxOC43MiA2LjIyIDE3LjA5IDUuMjcgMTQuNjZIMi4xOFYxNy40MkMzLjYxIDIwLjI1IDcuNTYgMjQgMTIgMjRaIiBmaWxsPSIjMzRBODUzIi8+CjxwYXRoIGQ9Ik01LjI3IDE0LjY2QzUuMDIgMTMuOTIgNC44OCAxMy4xMyA0Ljg4IDEyLjI1QzQuODggMTEuMzcgNS4wMiAxMC41OCA1LjI3IDkuODRWNy4wOEgyLjE4QzEuNDMgOC41NSAxIDEwLjMzIDEgMTIuMjVDMSAxNC4xNyAxLjQzIDE1Ljk1IDIuMTggMTcuNDJMNS4yNyAxNC42NloiIGZpbGw9IiNGQkJDMDQiLz4KPHBhdGggZD0iTTEyIDUuNzhDMTMuNjIgNS43OCAxNS4wNiA2LjM0IDE2LjE5IDcuNDJMMTkuMzYgNC4yNkMxNy45MiAyLjkyIDE1LjI0IDIgMTIgMkM3LjU2IDIgMy42MSA1Ljc1IDIuMTggNy4wOEw1LjI3IDkuODRDNi4yMiA3LjQxIDguODcgNS43OCAxMiA1Ljc4WiIgZmlsbD0iI0VBNDMzNSIvPgo8L3N2Zz4K';
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-2">Google's AI Journey: From Search to Superintelligence</h4>
                    <p className="text-sm sm:text-base text-blue-100 mb-4 leading-relaxed">
                      Explore Google's remarkable transformation from a Stanford research project to the world's AI leader. Discover breakthrough moments, revolutionary technologies, and the visionary minds behind innovations like TensorFlow, Transformers, AlphaGo, and Gemini that changed everything.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      <div className="bg-blue-700/30 rounded-lg p-2 text-center">
                        <div className="text-xs font-semibold text-blue-300">🔍 Search Revolution</div>
                      </div>
                      <div className="bg-indigo-700/30 rounded-lg p-2 text-center">
                        <div className="text-xs font-semibold text-indigo-300">🧠 DeepMind Acquisition</div>
                      </div>
                      <div className="bg-purple-700/30 rounded-lg p-2 text-center">
                        <div className="text-xs font-semibold text-purple-300">⚡ Transformer Architecture</div>
                      </div>
                      <div className="bg-cyan-700/30 rounded-lg p-2 text-center">
                        <div className="text-xs font-semibold text-cyan-300">🌟 Gemini Era</div>
                      </div>
                    </div>

                    <a
                      href="https://ai.google/our-ai-journey/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-blue-400/25 hover:scale-105 text-sm sm:text-base"
                    >
                      <span>Explore Google's AI Journey</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Key Milestones */}
              <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg p-4 border border-indigo-700/30">
                <h5 className="font-semibold text-indigo-300 text-sm mb-3">🌟 Key Milestones in Google's AI Journey</h5>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-xs text-blue-100"><strong>1998:</strong> PageRank algorithm revolutionizes web search</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-xs text-indigo-100"><strong>2014:</strong> DeepMind acquisition brings world-class AI research</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-xs text-purple-100"><strong>2017:</strong> "Attention is All You Need" - Transformer revolution</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-xs text-cyan-100"><strong>2023:</strong> Gemini launch - multimodal AI breakthrough</p>
                  </div>
                </div>
              </div>

              {/* Why This Matters */}
              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-4 border border-green-700/30">
                <h5 className="font-semibold text-green-300 text-sm mb-3">💡 Why Google's AI Journey Matters for Students</h5>
                <p className="text-xs text-green-100 leading-relaxed">
                  Understanding Google's AI evolution provides invaluable insights into how breakthrough technologies emerge, scale, and transform entire industries. From their research methodology to their approach to AI safety and ethics, Google's journey offers a masterclass in innovation, strategic thinking, and responsible AI development that every aspiring technologist should study.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Machine Learning Deep Dive - Edge to Edge */}
        <section className="w-full bg-gray-800 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Database size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Machine Learning: The Magic ✨</h3>
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
                <strong className="text-purple-300">Machine Learning (ML)</strong> is like teaching a computer to learn patterns, just like how you learned to recognize your friends' faces! Instead of programming every single rule, we show the computer lots of examples and it figures out the patterns by itself. 🤯
              </p>

              <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
                ML is the foundation of modern AI breakthroughs! It creates models by training algorithms on massive datasets to make predictions or decisions. From Netflix recommendations to medical diagnoses, ML algorithms are revolutionizing every industry by finding patterns humans could never spot.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-green-800/30 rounded-lg p-4 text-center border border-green-600/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BookOpen size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-green-300 mb-2">Supervised Learning 📚</h4>
                  <p className="text-xs sm:text-sm text-green-100 mb-2">Like studying with answer keys - we show AI the right answers!</p>
                  <div className="text-xs text-green-200 mb-3">
                    <strong>Examples:</strong> Email spam detection, medical diagnosis, image recognition, price prediction
                  </div>

                  {/* Supervised Learning Video */}
                  <div className="bg-black/30 rounded-lg p-2 border border-green-500/30">
                    <div className="aspect-video rounded overflow-hidden">
                      <iframe
                        src="https://www.youtube.com/embed/wvODQqb3D_8?si=jkl012"
                        title="Supervised & Unsupervised Machine Learning"
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <p className="text-xs text-green-300 mt-1 text-center">📚 Supervised Learning Explained</p>
                  </div>
                </div>

                <div className="bg-yellow-800/30 rounded-lg p-4 text-center border border-yellow-600/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Eye size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-yellow-300 mb-2">Unsupervised Learning 🔍</h4>
                  <p className="text-xs sm:text-sm text-yellow-100 mb-2">Like being a detective - AI finds hidden patterns on its own!</p>
                  <div className="text-xs text-yellow-200 mb-3">
                    <strong>Examples:</strong> Customer segmentation, anomaly detection, data compression, market research
                  </div>

                  {/* Unsupervised Learning Video */}
                  <div className="bg-black/30 rounded-lg p-2 border border-yellow-500/30">
                    <div className="aspect-video rounded overflow-hidden">
                      <iframe
                        src="https://www.youtube.com/embed/D6gtZrsYi6c?si=mno345"
                        title="Unsupervised Learning | Machine Learning Tutorial"
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <p className="text-xs text-yellow-300 mt-1 text-center">🔍 Unsupervised Learning Deep Dive</p>
                  </div>
                </div>

                <div className="bg-purple-800/30 rounded-lg p-4 text-center border border-purple-600/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-purple-300 mb-2">Reinforcement Learning 🎮</h4>
                  <p className="text-xs sm:text-sm text-purple-100 mb-2">Like playing video games - AI learns by trial and error!</p>
                  <div className="text-xs text-purple-200 mb-3">
                    <strong>Examples:</strong> Game AI (AlphaGo), autonomous vehicles, robotics, trading algorithms
                  </div>

                  {/* Reinforcement Learning Video */}
                  <div className="bg-black/30 rounded-lg p-2 border border-purple-500/30">
                    <div className="aspect-video rounded overflow-hidden">
                      <iframe
                        src="https://www.youtube.com/embed/Mut_u40Sqz4?si=pqr678"
                        title="Reinforcement Learning in 3 Hours"
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <p className="text-xs text-purple-300 mt-1 text-center">🎮 Reinforcement Learning Mastery</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-purple-300 mb-3">🧠 Advanced ML Techniques (2024-2025)</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Foundation Models:</h5>
                    <ul className="space-y-1 text-xs text-indigo-100">
                      <li>• <strong>Large Language Models (LLMs):</strong> GPT-4, Claude, Gemini</li>
                      <li>• <strong>Vision Models:</strong> DALL-E, Midjourney, Stable Diffusion</li>
                      <li>• <strong>Multimodal Models:</strong> GPT-4o, Gemini Ultra</li>
                      <li>• <strong>Code Models:</strong> GitHub Copilot, CodeT5</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Cutting-Edge Techniques:</h5>
                    <ul className="space-y-1 text-xs text-indigo-100">
                      <li>• <strong>Transfer Learning:</strong> Reusing pre-trained models</li>
                      <li>• <strong>Few-Shot Learning:</strong> Learning from minimal examples</li>
                      <li>• <strong>Self-Supervised Learning:</strong> Learning without labels</li>
                      <li>• <strong>Federated Learning:</strong> Training across devices privately</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-indigo-300 mb-3">🔬 Advanced Machine Learning Types (Deep Dive)</h4>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-3">Supervised Learning (Detailed) 📚</h5>
                    <div className="space-y-2 text-xs text-purple-100">
                      <p><strong>How it works:</strong> Uses labeled training data (input-output pairs) to learn patterns and make predictions on new, unseen data.</p>

                      <p><strong>Two Main Types:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• <strong>Classification:</strong> Predicts categories (spam/not spam, cat/dog)</li>
                        <li>• <strong>Regression:</strong> Predicts continuous values (house prices, stock prices)</li>
                      </ul>

                      <p><strong>Popular Algorithms:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• <strong>Linear/Logistic Regression:</strong> Simple, interpretable</li>
                        <li>• <strong>Decision Trees:</strong> Easy to understand, visual</li>
                        <li>• <strong>Random Forest:</strong> Multiple decision trees combined</li>
                        <li>• <strong>Support Vector Machines (SVM):</strong> Great for complex boundaries</li>
                        <li>• <strong>Neural Networks:</strong> Deep learning for complex patterns</li>
                      </ul>

                      <p><strong>Real Examples:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• Gmail spam detection (classification)</li>
                        <li>• Netflix movie recommendations (regression)</li>
                        <li>• Medical diagnosis from symptoms (classification)</li>
                        <li>• Stock price prediction (regression)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-white text-sm mb-3">Unsupervised Learning (Detailed) 🔍</h5>
                    <div className="space-y-2 text-xs text-purple-100">
                      <p><strong>How it works:</strong> Finds hidden patterns in data without labeled examples. The algorithm explores data to discover structure.</p>

                      <p><strong>Main Types:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• <strong>Clustering:</strong> Groups similar data points together</li>
                        <li>• <strong>Association:</strong> Finds relationships between variables</li>
                        <li>• <strong>Dimensionality Reduction:</strong> Simplifies complex data</li>
                      </ul>

                      <p><strong>Popular Algorithms:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• <strong>K-Means Clustering:</strong> Groups data into K clusters</li>
                        <li>• <strong>Hierarchical Clustering:</strong> Creates tree-like groupings</li>
                        <li>• <strong>Principal Component Analysis (PCA):</strong> Reduces dimensions</li>
                        <li>• <strong>DBSCAN:</strong> Finds clusters of varying shapes</li>
                        <li>• <strong>Apriori Algorithm:</strong> Market basket analysis</li>
                      </ul>

                      <p><strong>Real Examples:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• Customer segmentation for marketing</li>
                        <li>• Gene sequencing analysis</li>
                        <li>• Anomaly detection in network security</li>
                        <li>• Market basket analysis ("people who buy X also buy Y")</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 rounded-lg p-4 border border-green-700/30 mt-4">
                <h4 className="text-base sm:text-lg font-semibold text-green-300 mb-3">🎮 Reinforcement Learning & Semi-Supervised Learning</h4>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-3">Reinforcement Learning (RL) 🎮</h5>
                    <div className="space-y-2 text-xs text-green-100">
                      <p><strong>How it works:</strong> An agent learns through trial and error by receiving rewards or penalties for actions in an environment.</p>

                      <p><strong>Key Components:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• <strong>Agent:</strong> The learner/decision maker</li>
                        <li>• <strong>Environment:</strong> The world the agent operates in</li>
                        <li>• <strong>Actions:</strong> What the agent can do</li>
                        <li>• <strong>Rewards:</strong> Feedback for good/bad actions</li>
                        <li>• <strong>Policy:</strong> Strategy for choosing actions</li>
                      </ul>

                      <p><strong>Popular Algorithms:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• <strong>Q-Learning:</strong> Learns action values</li>
                        <li>• <strong>Deep Q-Networks (DQN):</strong> Neural network Q-learning</li>
                        <li>• <strong>Policy Gradient:</strong> Directly optimizes policy</li>
                        <li>• <strong>Actor-Critic:</strong> Combines value and policy methods</li>
                      </ul>

                      <p><strong>Breakthrough Applications:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• <strong>AlphaGo:</strong> Defeated world Go champion</li>
                        <li>• <strong>OpenAI Five:</strong> Mastered Dota 2</li>
                        <li>• <strong>Tesla Autopilot:</strong> Self-driving cars</li>
                        <li>• <strong>ChatGPT:</strong> RLHF for human alignment</li>
                        <li>• <strong>Trading Bots:</strong> Algorithmic trading</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-white text-sm mb-3">Semi-Supervised Learning 🔄</h5>
                    <div className="space-y-2 text-xs text-green-100">
                      <p><strong>How it works:</strong> Combines small amounts of labeled data with large amounts of unlabeled data for training.</p>

                      <p><strong>Why it's useful:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• Labeling data is expensive and time-consuming</li>
                        <li>• Unlabeled data is often abundant and cheap</li>
                        <li>• Can achieve better performance than supervised learning alone</li>
                        <li>• Reduces human annotation effort significantly</li>
                      </ul>

                      <p><strong>Common Techniques:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• <strong>Self-Training:</strong> Use model predictions as labels</li>
                        <li>• <strong>Co-Training:</strong> Multiple models teach each other</li>
                        <li>• <strong>Graph-Based:</strong> Propagate labels through data graphs</li>
                        <li>• <strong>Generative Models:</strong> Model data distribution</li>
                      </ul>

                      <p><strong>Real Applications:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• <strong>Web Page Classification:</strong> Few labeled, millions unlabeled</li>
                        <li>• <strong>Speech Recognition:</strong> Limited transcribed audio</li>
                        <li>• <strong>Medical Imaging:</strong> Expert annotations are rare</li>
                        <li>• <strong>Natural Language Processing:</strong> Text understanding</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-700/30 mt-4">
                <h4 className="text-base sm:text-lg font-semibold text-orange-300 mb-3">🚀 Cutting-Edge ML Techniques (2024-2025)</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Self-Supervised Learning 🤖</h5>
                    <ul className="space-y-1 text-xs text-orange-100">
                      <li>• <strong>Concept:</strong> Creates its own labels from data structure</li>
                      <li>• <strong>Example:</strong> Predicting next word in sentence</li>
                      <li>• <strong>Powers:</strong> GPT models, BERT, image models</li>
                      <li>• <strong>Advantage:</strong> No human labeling needed</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Transfer Learning 🔄</h5>
                    <ul className="space-y-1 text-xs text-orange-100">
                      <li>• <strong>Concept:</strong> Reuse pre-trained models for new tasks</li>
                      <li>• <strong>Example:</strong> Use ImageNet model for medical images</li>
                      <li>• <strong>Benefits:</strong> Faster training, less data needed</li>
                      <li>• <strong>Foundation:</strong> Basis for modern AI applications</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Few-Shot Learning 🎯</h5>
                    <ul className="space-y-1 text-xs text-orange-100">
                      <li>• <strong>Concept:</strong> Learn new tasks with very few examples</li>
                      <li>• <strong>Example:</strong> GPT-4 learning from just a few examples</li>
                      <li>• <strong>Techniques:</strong> Meta-learning, prompt engineering</li>
                      <li>• <strong>Goal:</strong> Human-like learning efficiency</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/30 mt-4">
                <h4 className="text-base sm:text-lg font-semibold text-indigo-300 mb-3">🚀 Real-World ML Applications by Industry</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Healthcare 🏥</h5>
                    <ul className="space-y-1 text-xs text-purple-100">
                      <li>• <strong>Medical Imaging:</strong> Cancer detection, X-ray analysis</li>
                      <li>• <strong>Drug Discovery:</strong> AlphaFold protein folding</li>
                      <li>• <strong>Personalized Medicine:</strong> Treatment recommendations</li>
                      <li>• <strong>Epidemic Modeling:</strong> COVID-19 spread prediction</li>
                      <li>• <strong>Robotic Surgery:</strong> Precision surgical assistance</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Technology 💻</h5>
                    <ul className="space-y-1 text-xs text-purple-100">
                      <li>• <strong>Search Engines:</strong> Google's PageRank algorithm</li>
                      <li>• <strong>Recommendation Systems:</strong> Netflix, YouTube, Spotify</li>
                      <li>• <strong>Fraud Detection:</strong> Credit card, banking security</li>
                      <li>• <strong>Autonomous Vehicles:</strong> Tesla, Waymo self-driving</li>
                      <li>• <strong>Voice Assistants:</strong> Siri, Alexa, Google Assistant</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Business & Finance 📈</h5>
                    <ul className="space-y-1 text-xs text-purple-100">
                      <li>• <strong>Algorithmic Trading:</strong> High-frequency trading bots</li>
                      <li>• <strong>Risk Assessment:</strong> Credit scoring, loan approval</li>
                      <li>• <strong>Customer Analytics:</strong> Behavior prediction, churn analysis</li>
                      <li>• <strong>Supply Chain:</strong> Demand forecasting, optimization</li>
                      <li>• <strong>Marketing:</strong> Targeted ads, A/B testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neural Networks Video */}
        <AIVideo
          src="https://www.youtube.com/embed/aircAruvnKk"
          title="🧠 Neural Networks Explained"
          description="3Blue1Brown's brilliant visual explanation"
          icon={<Network size={20} className="text-white" />}
          gradient="from-gray-900 to-gray-800"
          note="🎨 3Blue1Brown: Grant Sanderson makes the most complex math concepts incredibly beautiful and easy to understand!"
        />

        {/* Neural Networks Deep Dive - Edge to Edge */}
        <section className="w-full bg-gray-900 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg flex items-center justify-center">
                <Network size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Neural Networks: AI's Brain 🧠</h3>
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-pink-100 leading-relaxed">
                <strong className="text-red-300">Neural Networks</strong> are like a simplified version of your brain! 🧠 Just like your brain has billions of neurons connected together, neural networks have artificial neurons that work together to recognize patterns and make decisions. They're inspired by how your brain learns to recognize faces, understand speech, and solve problems.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-base sm:text-lg font-semibold text-pink-300 mb-3">How Neural Networks Work 🔄</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">1</div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">Input Layer 📥</h5>
                        <p className="text-xs text-pink-200">Gets raw data (like pixels in a photo)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">2</div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">Hidden Layers 🔄</h5>
                        <p className="text-xs text-pink-200">Process and find patterns in the data</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">3</div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">Output Layer 📤</h5>
                        <p className="text-xs text-pink-200">Makes the final decision or prediction</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-red-300 mb-3">Cool Applications 🚀</h4>
                  <div className="space-y-2">
                    <div className="bg-red-800/30 rounded-lg p-3 border border-red-600/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Eye size={14} className="text-red-300" />
                        <span className="font-semibold text-white text-sm">Computer Vision</span>
                      </div>
                      <p className="text-xs text-red-200">Instagram filters, medical scans, self-driving cars</p>
                    </div>
                    <div className="bg-red-800/30 rounded-lg p-3 border border-red-600/30">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare size={14} className="text-green-300" />
                        <span className="font-semibold text-white text-sm">Language AI</span>
                      </div>
                      <p className="text-xs text-red-200">ChatGPT, Google Translate, Grammarly</p>
                    </div>
                    <div className="bg-red-800/30 rounded-lg p-3 border border-red-600/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Car size={14} className="text-purple-300" />
                        <span className="font-semibold text-white text-sm">Autonomous Systems</span>
                      </div>
                      <p className="text-xs text-red-200">Tesla autopilot, delivery drones, smart robots</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformer Revolution Video */}
        <AIVideo
          src="https://www.youtube.com/embed/iDulhoQ2pro"
          title="⚡ Attention is All You Need"
          description="The paper that revolutionized AI"
          icon={<Zap size={20} className="text-white" />}
          gradient="from-gray-900 to-gray-800"
          note="🔥 Transformer Deep Dive: This groundbreaking paper made ChatGPT, GPT-4, and modern language models possible!"
        />

        {/* Attention Mechanism - Edge to Edge */}
        <section className="w-full bg-gray-800 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Zap size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">The Transformer Revolution ⚡</h3>
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-yellow-100 leading-relaxed">
                In 2017, Google researchers published <strong className="text-orange-300">"Attention is All You Need"</strong> - a paper that completely changed AI forever! 🤯 It introduced the <strong className="text-yellow-300">Transformer architecture</strong> that powers ChatGPT, GPT-4, Google Translate, and almost every modern AI you use today.
              </p>

              <p className="text-sm sm:text-base text-yellow-100 leading-relaxed">
                The Transformer revolutionized AI by solving the fundamental problem of understanding context and relationships in sequences. Before Transformers, AI struggled with long-term dependencies - now it can understand entire books, write coherent essays, and even generate code that works! 🚀
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30">
                  <h4 className="text-base sm:text-lg font-semibold text-orange-300 mb-3">What is Attention? 👀</h4>
                  <p className="text-xs sm:text-sm text-yellow-100 mb-3 leading-relaxed">
                    Attention is like having a super-smart spotlight! 🔦 When you read a sentence, your brain automatically focuses on the most important words. The attention mechanism teaches AI to do the same thing, but across massive amounts of text simultaneously.
                  </p>
                  <div className="bg-orange-800/30 rounded-lg p-3 mb-3">
                    <h6 className="font-semibold text-white text-sm mb-1">Example:</h6>
                    <p className="text-xs text-yellow-200 italic">
                      "The cat sat on the <span className="text-orange-300 font-bold">mat</span> because it was <span className="text-orange-300 font-bold">comfortable</span>."
                    </p>
                    <p className="text-xs text-orange-200 mt-1">
                      AI learns that "it" refers to "mat" by paying attention! 🎯
                    </p>
                  </div>
                  <div className="space-y-1 text-xs text-yellow-200">
                    <div>• <strong>Self-Attention:</strong> Words attend to other words in the same sentence</div>
                    <div>• <strong>Multi-Head Attention:</strong> Multiple attention patterns simultaneously</div>
                    <div>• <strong>Cross-Attention:</strong> Connecting different types of data</div>
                  </div>
                </div>

                <div className="bg-orange-800/30 rounded-lg p-4 border border-orange-600/30">
                  <h4 className="text-base sm:text-lg font-semibold text-yellow-300 mb-3">Transformer Impact 🚀</h4>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-yellow-100"><strong>ChatGPT/GPT-4:</strong> Conversational AI that understands context</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-yellow-100"><strong>Google Translate:</strong> Near-human quality translation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-yellow-100"><strong>DALL-E/Midjourney:</strong> Creates images from text</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-yellow-100"><strong>GitHub Copilot:</strong> AI that writes code for you</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-yellow-100"><strong>Sora:</strong> Generates realistic videos from text</span>
                    </div>
                  </div>
                  <div className="text-xs text-orange-200">
                    <strong>Latest 2024-2025:</strong> Vision Transformers (ViTs), Audio Transformers, and Multimodal Transformers that understand text, images, audio, and video together!
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-orange-300 mb-3">🔬 How Transformers Actually Work</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Key Components:</h5>
                    <ul className="space-y-1 text-xs text-yellow-100">
                      <li>• <strong>Encoder:</strong> Understands input (like reading)</li>
                      <li>• <strong>Decoder:</strong> Generates output (like writing)</li>
                      <li>• <strong>Attention Layers:</strong> Focus on relevant parts</li>
                      <li>• <strong>Feed-Forward Networks:</strong> Process information</li>
                      <li>• <strong>Positional Encoding:</strong> Understands word order</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Why They're Revolutionary:</h5>
                    <ul className="space-y-1 text-xs text-yellow-100">
                      <li>• <strong>Parallel Processing:</strong> Much faster training</li>
                      <li>• <strong>Long-Range Dependencies:</strong> Understands context</li>
                      <li>• <strong>Transfer Learning:</strong> Pre-train once, use everywhere</li>
                      <li>• <strong>Scalability:</strong> Bigger models = better performance</li>
                      <li>• <strong>Versatility:</strong> Works for text, images, audio, video</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-yellow-300 mb-3">🌟 Latest Transformer Innovations (2024-2025)</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Language Models:</h5>
                    <ul className="space-y-1 text-xs text-orange-100">
                      <li>• <strong>GPT-4.5:</strong> Enhanced reasoning</li>
                      <li>• <strong>Claude 3:</strong> Constitutional AI</li>
                      <li>• <strong>Gemini Ultra:</strong> Multimodal capabilities</li>
                      <li>• <strong>LLaMA 3:</strong> Open-source powerhouse</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Vision & Media:</h5>
                    <ul className="space-y-1 text-xs text-orange-100">
                      <li>• <strong>DALL-E 3:</strong> Photorealistic images</li>
                      <li>• <strong>Sora:</strong> Hollywood-quality videos</li>
                      <li>• <strong>ViT-G:</strong> Giant vision transformers</li>
                      <li>• <strong>CLIP:</strong> Image-text understanding</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Specialized Applications:</h5>
                    <ul className="space-y-1 text-xs text-orange-100">
                      <li>• <strong>AlphaFold:</strong> Protein structure prediction</li>
                      <li>• <strong>CodeT5:</strong> Advanced code generation</li>
                      <li>• <strong>MusicLM:</strong> AI music composition</li>
                      <li>• <strong>Med-PaLM:</strong> Medical AI assistant</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-700/30">
                <p className="text-xs sm:text-sm text-yellow-200">
                  <strong>💡 Mind-Blowing Fact:</strong> The Transformer architecture is so powerful that it's used not just for text, but also for images, music, video, protein folding, weather prediction, and even controlling robots! The same attention mechanism that helps ChatGPT understand your questions also helps self-driving cars navigate traffic and helps doctors diagnose diseases from medical scans. 🧬🚗🏥
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Career Opportunities - Edge to Edge */}
        <section className="w-full bg-gray-900 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Briefcase size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Amazing AI Careers 💼</h3>
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-green-100 leading-relaxed">
                The AI revolution is creating incredible career opportunities! 🚀 In 2024-2025, AI job demand has exploded with companies like Microsoft, Google, OpenAI, and Anthropic hiring thousands of AI professionals. These jobs are not only super exciting but also pay exceptionally well, with some positions reaching $500K+ at top companies.
              </p>

              <p className="text-sm sm:text-base text-green-100 leading-relaxed">
                The latest trend is <strong className="text-green-300">AI Agents</strong> - autonomous systems that can complete complex tasks independently. Companies are desperately seeking professionals who can build, deploy, and manage these intelligent agents across industries.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-800/40 rounded-lg p-4 border border-blue-600/40">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-lg flex items-center justify-center mb-3">
                    <Code size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-blue-300 mb-2">ML Engineer 🤖</h4>
                  <p className="text-xs text-blue-100 mb-2 leading-relaxed">Build AI systems that learn from data, deploy models at scale</p>
                  <div className="text-xs text-blue-200 mb-2">
                    <strong>Salary:</strong> $120K-$250K+/year 💰
                  </div>
                  <div className="text-xs text-blue-200">
                    <strong>Hot Skills:</strong> PyTorch, TensorFlow, MLOps, Kubernetes
                  </div>
                </div>

                <div className="bg-purple-800/40 rounded-lg p-4 border border-purple-600/40">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mb-3">
                    <Database size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-purple-300 mb-2">Data Scientist 📊</h4>
                  <p className="text-xs text-purple-100 mb-2 leading-relaxed">Extract insights from data, build predictive models</p>
                  <div className="text-xs text-purple-200 mb-2">
                    <strong>Salary:</strong> $95K-$180K+/year 💰
                  </div>
                  <div className="text-xs text-purple-200">
                    <strong>Hot Skills:</strong> Python, SQL, Statistics, A/B Testing
                  </div>
                </div>

                <div className="bg-green-800/40 rounded-lg p-4 border border-green-600/40">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center mb-3">
                    <Bot size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-green-300 mb-2">AI Researcher 🔬</h4>
                  <p className="text-xs text-green-100 mb-2 leading-relaxed">Invent breakthrough AI technologies, publish papers</p>
                  <div className="text-xs text-green-200 mb-2">
                    <strong>Salary:</strong> $150K-$500K+/year 💰
                  </div>
                  <div className="text-xs text-green-200">
                    <strong>Hot Skills:</strong> Deep Learning, Research, Mathematics
                  </div>
                </div>

                <div className="bg-orange-800/40 rounded-lg p-4 border border-orange-600/40">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center mb-3">
                    <Eye size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-orange-300 mb-2">Computer Vision Engineer 👁️</h4>
                  <p className="text-xs text-orange-100 mb-2 leading-relaxed">Build AI that sees: autonomous cars, medical imaging</p>
                  <div className="text-xs text-orange-200 mb-2">
                    <strong>Salary:</strong> $110K-$220K+/year 💰
                  </div>
                  <div className="text-xs text-orange-200">
                    <strong>Hot Skills:</strong> OpenCV, YOLO, Transformers, CNNs
                  </div>
                </div>

                <div className="bg-teal-800/40 rounded-lg p-4 border border-teal-600/40">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-lg flex items-center justify-center mb-3">
                    <MessageSquare size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-teal-300 mb-2">LLM Engineer 💬</h4>
                  <p className="text-xs text-teal-100 mb-2 leading-relaxed">Build ChatGPT-like systems, fine-tune language models</p>
                  <div className="text-xs text-teal-200 mb-2">
                    <strong>Salary:</strong> $130K-$280K+/year 💰
                  </div>
                  <div className="text-xs text-teal-200">
                    <strong>Hot Skills:</strong> Transformers, RAG, Vector DBs, LangChain
                  </div>
                </div>

                <div className="bg-indigo-800/40 rounded-lg p-4 border border-indigo-600/40">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                    <Shield size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-indigo-300 mb-2">AI Safety Engineer ⚖️</h4>
                  <p className="text-xs text-indigo-100 mb-2 leading-relaxed">Ensure AI systems are safe, aligned, and beneficial</p>
                  <div className="text-xs text-indigo-200 mb-2">
                    <strong>Salary:</strong> $120K-$200K+/year 💰
                  </div>
                  <div className="text-xs text-indigo-200">
                    <strong>Hot Skills:</strong> AI Alignment, Ethics, Risk Assessment
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/20 rounded-lg p-4 border border-gray-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-green-300 mb-3">🔥 Hottest New AI Jobs (2024-2025)</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-2 text-xs sm:text-sm text-green-100">
                      <li>• <strong className="text-green-300">AI Agent Developer:</strong> $140K-$300K+ - Build autonomous AI systems</li>
                      <li>• <strong className="text-blue-300">Prompt Engineer:</strong> $80K-$150K+ - Optimize AI interactions</li>
                      <li>• <strong className="text-purple-300">AI Product Manager:</strong> $120K-$250K+ - Lead AI product strategy</li>
                      <li>• <strong className="text-orange-300">Multimodal AI Engineer:</strong> $130K-$280K+ - Build AI that handles text, images, video</li>
                      <li>• <strong className="text-yellow-300">AI Automation Engineer:</strong> $110K-$220K+ - Automate business processes with AI</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2 text-xs sm:text-sm text-green-100">
                      <li>• <strong className="text-cyan-300">AI Infrastructure Engineer:</strong> $125K-$270K+ - Scale AI systems</li>
                      <li>• <strong className="text-pink-300">AI UX Designer:</strong> $90K-$160K+ - Design AI user experiences</li>
                      <li>• <strong className="text-red-300">AI Trainer/Tutor:</strong> $70K-$120K+ - Train AI models with human feedback</li>
                      <li>• <strong className="text-violet-300">AI Compliance Officer:</strong> $100K-$180K+ - Ensure AI regulatory compliance</li>
                      <li>• <strong className="text-emerald-300">AI Ethics Specialist:</strong> $95K-$170K+ - Ensure responsible AI development</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 rounded-lg p-4 border border-green-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-green-300 mb-3">🌟 Top Companies Hiring AI Talent</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Tech Giants:</h5>
                    <ul className="space-y-1 text-xs text-green-100">
                      <li>• <strong>Microsoft:</strong> Copilot, Azure AI (10,000+ AI roles)</li>
                      <li>• <strong>Google:</strong> Gemini, DeepMind (8,000+ AI roles)</li>
                      <li>• <strong>Meta:</strong> LLaMA, Reality Labs (5,000+ AI roles)</li>
                      <li>• <strong>Amazon:</strong> Alexa, AWS AI (7,000+ AI roles)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">AI-First Companies:</h5>
                    <ul className="space-y-1 text-xs text-green-100">
                      <li>• <strong>OpenAI:</strong> ChatGPT, GPT-4 (1,500+ roles)</li>
                      <li>• <strong>Anthropic:</strong> Claude AI (800+ roles)</li>
                      <li>• <strong>Hugging Face:</strong> Open-source AI (400+ roles)</li>
                      <li>• <strong>Stability AI:</strong> Stable Diffusion (300+ roles)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Traditional Industries:</h5>
                    <ul className="space-y-1 text-xs text-green-100">
                      <li>• <strong>Healthcare:</strong> Medical AI, drug discovery</li>
                      <li>• <strong>Finance:</strong> Trading algorithms, fraud detection</li>
                      <li>• <strong>Automotive:</strong> Self-driving cars, Tesla, Waymo</li>
                      <li>• <strong>Retail:</strong> Recommendation systems, supply chain</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 rounded-lg p-4 border border-green-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                  <Rocket size={18} />
                  How to Start Your AI Journey 🚀
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Essential Skills:</h5>
                    <ul className="space-y-1 text-xs text-green-100">
                      <li>• <strong>Programming:</strong> Python (easiest to learn!)</li>
                      <li>• <strong>Math:</strong> Statistics, basic algebra</li>
                      <li>• <strong>Curiosity:</strong> Love for solving puzzles</li>
                      <li>• <strong>Creativity:</strong> Thinking outside the box</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-2">Learning Steps:</h5>
                    <ul className="space-y-1 text-xs text-green-100">
                      <li>• <strong>Step 1:</strong> Learn Python basics (fun!)</li>
                      <li>• <strong>Step 2:</strong> Take online AI courses</li>
                      <li>• <strong>Step 3:</strong> Build cool projects</li>
                      <li>• <strong>Step 4:</strong> Share your work online</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 100+ Companies Hiring in AI - Edge to Edge */}
        <section className="w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Briefcase size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">100+ Companies Hiring in AI 🚀</h3>
            </div>

            <div className="space-y-6">
              {/* Introduction */}
              <div className="bg-indigo-800/50 rounded-lg p-6 border border-indigo-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-indigo-300 mb-4">🌟 Your Dream AI Job Awaits!</h4>
                <p className="text-sm sm:text-base text-indigo-100 leading-relaxed mb-4">
                  From tech giants to innovative startups, from robotics companies to consulting firms - here's your comprehensive guide to 100+ companies actively hiring AI talent. Each link takes you directly to their careers page!
                </p>
                <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
                  💡 <strong>Pro Tip:</strong> Click on any company name to visit their careers page and explore current AI job openings. Many offer internships, entry-level positions, and remote work opportunities!
                </p>
              </div>

              {/* Top Tech Giants */}
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-6 border border-blue-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-4">🏛️ Top Tech Giants (The Big Players)</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-3">🔥 AI Leaders</h5>
                    <ul className="space-y-2 text-xs text-blue-100">
                      <li>• <a href="https://careers.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">Google/Alphabet</a> - DeepMind, Bard, Search AI</li>
                      <li>• <a href="https://careers.microsoft.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">Microsoft</a> - OpenAI partner, Copilot, Azure AI</li>
                      <li>• <a href="https://openai.com/careers" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">OpenAI</a> - ChatGPT, GPT models, AGI research</li>
                      <li>• <a href="https://www.anthropic.com/careers" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">Anthropic</a> - Claude AI, Constitutional AI</li>
                      <li>• <a href="https://careers.meta.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">Meta</a> - Llama models, VR/AR AI</li>
                    </ul>
                  </div>

                  <div className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30">
                    <h5 className="font-semibold text-cyan-300 text-sm mb-3">🍎 FAANG Companies</h5>
                    <ul className="space-y-2 text-xs text-cyan-100">
                      <li>• <a href="https://jobs.apple.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">Apple</a> - Siri, Core ML, on-device AI</li>
                      <li>• <a href="https://amazon.jobs" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">Amazon</a> - Alexa, AWS AI, robotics</li>
                      <li>• <a href="https://careers.netflix.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">Netflix</a> - Recommendation algorithms</li>
                      <li>• <a href="https://careers.salesforce.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">Salesforce</a> - Einstein AI platform</li>
                      <li>• <a href="https://careers.adobe.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">Adobe</a> - Creative AI, Firefly</li>
                    </ul>
                  </div>

                  <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                    <h5 className="font-semibold text-purple-300 text-sm mb-3">🚀 Cloud & Enterprise</h5>
                    <ul className="space-y-2 text-xs text-purple-100">
                      <li>• <a href="https://www.ibm.com/careers" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">IBM</a> - Watson AI, enterprise solutions</li>
                      <li>• <a href="https://careers.oracle.com" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">Oracle</a> - Database AI, cloud services</li>
                      <li>• <a href="https://careers.servicenow.com" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">ServiceNow</a> - IT automation AI</li>
                      <li>• <a href="https://careers.workday.com" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">Workday</a> - HR and finance AI</li>
                      <li>• <a href="https://careers.vmware.com" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">VMware</a> - Infrastructure AI</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* AI Hardware Companies */}
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-6 border border-green-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-4">🔧 AI Hardware & Semiconductor Companies</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-green-800/30 rounded-lg p-4 border border-green-600/30">
                    <h5 className="font-semibold text-green-300 text-sm mb-3">💎 Chip Giants</h5>
                    <ul className="space-y-2 text-xs text-green-100">
                      <li>• <a href="https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline">NVIDIA</a> - GPU computing, AI chips</li>
                      <li>• <a href="https://jobs.amd.com" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline">AMD</a> - AI accelerators, GPUs</li>
                      <li>• <a href="https://jobs.intel.com" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline">Intel</a> - AI processors, edge computing</li>
                      <li>• <a href="https://careers.qualcomm.com" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline">Qualcomm</a> - Mobile AI, 5G + AI</li>
                      <li>• <a href="https://www.broadcom.com/company/careers" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline">Broadcom</a> - Networking AI chips</li>
                    </ul>
                  </div>

                  <div className="bg-emerald-800/30 rounded-lg p-4 border border-emerald-600/30">
                    <h5 className="font-semibold text-emerald-300 text-sm mb-3">⚡ AI Chip Startups</h5>
                    <ul className="space-y-2 text-xs text-emerald-100">
                      <li>• <a href="https://www.cerebras.net/careers" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline">Cerebras</a> - Wafer-scale AI processors</li>
                      <li>• <a href="https://www.graphcore.ai/careers" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline">Graphcore</a> - Intelligence Processing Units</li>
                      <li>• <a href="https://sambanova.ai/careers" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline">SambaNova</a> - Dataflow AI chips</li>
                      <li>• <a href="https://groq.com/careers" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline">Groq</a> - Language Processing Units</li>
                      <li>• <a href="https://www.habana.ai/careers" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline">Habana Labs</a> - Intel AI accelerators</li>
                    </ul>
                  </div>

                  <div className="bg-teal-800/30 rounded-lg p-4 border border-teal-600/30">
                    <h5 className="font-semibold text-teal-300 text-sm mb-3">🔬 Research Hardware</h5>
                    <ul className="space-y-2 text-xs text-teal-100">
                      <li>• <a href="https://www.d-wave.com/careers" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 underline">D-Wave</a> - Quantum computing for AI</li>
                      <li>• <a href="https://rigetti.com/careers" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 underline">Rigetti</a> - Quantum cloud services</li>
                      <li>• <a href="https://www.ionq.com/careers" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 underline">IonQ</a> - Trapped ion quantum computers</li>
                      <li>• <a href="https://www.xanadu.ai/careers" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 underline">Xanadu</a> - Photonic quantum computing</li>
                      <li>• <a href="https://www.pasqal.io/careers" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 underline">Pasqal</a> - Neutral atom quantum</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* AI Startups & Unicorns */}
              <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border border-yellow-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-yellow-300 mb-4">🦄 AI Startups & Unicorns (The Innovators)</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30">
                    <h5 className="font-semibold text-yellow-300 text-sm mb-3">🚀 Generative AI Startups</h5>
                    <ul className="space-y-2 text-xs text-yellow-100">
                      <li>• <a href="https://stability.ai/careers" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">Stability AI</a> - Stable Diffusion, open-source AI</li>
                      <li>• <a href="https://www.midjourney.com/jobs" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">Midjourney</a> - AI art generation platform</li>
                      <li>• <a href="https://runwayml.com/careers" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">Runway ML</a> - Creative AI tools, video generation</li>
                      <li>• <a href="https://www.jasper.ai/careers" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">Jasper</a> - AI writing assistant</li>
                      <li>• <a href="https://www.copy.ai/careers" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">Copy.ai</a> - AI copywriting platform</li>
                    </ul>
                  </div>

                  <div className="bg-orange-800/30 rounded-lg p-4 border border-orange-600/30">
                    <h5 className="font-semibold text-orange-300 text-sm mb-3">🧠 AI Research Startups</h5>
                    <ul className="space-y-2 text-xs text-orange-100">
                      <li>• <a href="https://cohere.com/careers" target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:text-orange-200 underline">Cohere</a> - Large language models</li>
                      <li>• <a href="https://www.adept.ai/careers" target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:text-orange-200 underline">Adept</a> - AI that acts on computers</li>
                      <li>• <a href="https://www.inflection.ai/careers" target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:text-orange-200 underline">Inflection AI</a> - Personal AI assistant Pi</li>
                      <li>• <a href="https://www.character.ai/careers" target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:text-orange-200 underline">Character.AI</a> - Conversational AI characters</li>
                      <li>• <a href="https://www.perplexity.ai/careers" target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:text-orange-200 underline">Perplexity</a> - AI-powered search engine</li>
                    </ul>
                  </div>

                  <div className="bg-red-800/30 rounded-lg p-4 border border-red-600/30">
                    <h5 className="font-semibold text-red-300 text-sm mb-3">💼 Enterprise AI Startups</h5>
                    <ul className="space-y-2 text-xs text-red-100">
                      <li>• <a href="https://scale.com/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Scale AI</a> - Data labeling and ML ops</li>
                      <li>• <a href="https://www.weights-biases.com/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Weights & Biases</a> - ML experiment tracking</li>
                      <li>• <a href="https://www.huggingface.co/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Hugging Face</a> - Open-source AI community</li>
                      <li>• <a href="https://www.anyscale.com/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Anyscale</a> - Distributed AI computing</li>
                      <li>• <a href="https://www.modal.com/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Modal</a> - Cloud functions for AI</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Robotics & Autonomous Systems */}
              <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-lg p-6 border border-red-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-red-300 mb-4">🤖 Robotics & Autonomous Systems</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-red-800/30 rounded-lg p-4 border border-red-600/30">
                    <h5 className="font-semibold text-red-300 text-sm mb-3">🚗 Autonomous Vehicles</h5>
                    <ul className="space-y-2 text-xs text-red-100">
                      <li>• <a href="https://www.tesla.com/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Tesla</a> - Autopilot, FSD, robotics</li>
                      <li>• <a href="https://waymo.com/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Waymo</a> - Google's self-driving cars</li>
                      <li>• <a href="https://getcruise.com/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Cruise</a> - GM's autonomous vehicles</li>
                      <li>• <a href="https://zoox.com/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Zoox</a> - Amazon's robotaxi service</li>
                      <li>• <a href="https://aurora.tech/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Aurora</a> - Self-driving technology</li>
                    </ul>
                  </div>

                  <div className="bg-pink-800/30 rounded-lg p-4 border border-pink-600/30">
                    <h5 className="font-semibold text-pink-300 text-sm mb-3">🦾 Humanoid Robotics</h5>
                    <ul className="space-y-2 text-xs text-pink-100">
                      <li>• <a href="https://www.bostondynamics.com/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Boston Dynamics</a> - Atlas, Spot robots</li>
                      <li>• <a href="https://www.figure.ai/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Figure</a> - Humanoid robots for work</li>
                      <li>• <a href="https://www.agility.ai/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Agility Robotics</a> - Digit humanoid robot</li>
                      <li>• <a href="https://www.1x.tech/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">1X Technologies</a> - NEO humanoid robots</li>
                      <li>• <a href="https://apptronik.com/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Apptronik</a> - Apollo humanoid robot</li>
                    </ul>
                  </div>

                  <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                    <h5 className="font-semibold text-purple-300 text-sm mb-3">🏭 Industrial Robotics</h5>
                    <ul className="space-y-2 text-xs text-purple-100">
                      <li>• <a href="https://www.abb.com/careers" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">ABB Robotics</a> - Industrial automation</li>
                      <li>• <a href="https://www.kuka.com/careers" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">KUKA</a> - Manufacturing robots</li>
                      <li>• <a href="https://www.fanuc.com/careers" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">FANUC</a> - Factory automation</li>
                      <li>• <a href="https://www.universal-robots.com/careers" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">Universal Robots</a> - Collaborative robots</li>
                      <li>• <a href="https://www.berkshiregrey.com/careers" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">Berkshire Grey</a> - AI-powered automation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Enterprise AI & Data Companies */}
              <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-6 border border-cyan-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-cyan-300 mb-4">🏢 Enterprise AI & Data Companies</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30">
                    <h5 className="font-semibold text-cyan-300 text-sm mb-3">📊 Data Platforms</h5>
                    <ul className="space-y-2 text-xs text-cyan-100">
                      <li>• <a href="https://www.databricks.com/careers" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">Databricks</a> - Unified analytics platform</li>
                      <li>• <a href="https://careers.snowflake.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">Snowflake</a> - Cloud data warehouse</li>
                      <li>• <a href="https://www.palantir.com/careers" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">Palantir</a> - Big data analytics</li>
                      <li>• <a href="https://c3.ai/careers" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">C3.ai</a> - Enterprise AI applications</li>
                      <li>• <a href="https://www.datarobot.com/careers" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline">DataRobot</a> - Automated machine learning</li>
                    </ul>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-3">🔍 Analytics & BI</h5>
                    <ul className="space-y-2 text-xs text-blue-100">
                      <li>• <a href="https://www.tableau.com/careers" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">Tableau</a> - Data visualization</li>
                      <li>• <a href="https://careers.looker.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">Looker</a> - Business intelligence</li>
                      <li>• <a href="https://www.alteryx.com/careers" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">Alteryx</a> - Self-service analytics</li>
                      <li>• <a href="https://h2o.ai/careers" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">H2O.ai</a> - Open-source ML platform</li>
                      <li>• <a href="https://www.dataiku.com/careers" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">Dataiku</a> - Data science platform</li>
                    </ul>
                  </div>

                  <div className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30">
                    <h5 className="font-semibold text-indigo-300 text-sm mb-3">🛡️ AI Security & MLOps</h5>
                    <ul className="space-y-2 text-xs text-indigo-100">
                      <li>• <a href="https://www.crowdstrike.com/careers" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 underline">CrowdStrike</a> - AI-powered cybersecurity</li>
                      <li>• <a href="https://www.darktrace.com/careers" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 underline">Darktrace</a> - AI cyber defense</li>
                      <li>• <a href="https://www.mlflow.org/careers" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 underline">MLflow</a> - ML lifecycle management</li>
                      <li>• <a href="https://www.kubeflow.org/careers" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 underline">Kubeflow</a> - ML workflows on Kubernetes</li>
                      <li>• <a href="https://neptune.ai/careers" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 underline">Neptune.ai</a> - ML experiment management</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Consulting & Professional Services */}
              <div className="bg-gradient-to-r from-purple-900/30 to-violet-900/30 rounded-lg p-6 border border-purple-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-4">💼 Consulting & Professional Services</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                    <h5 className="font-semibold text-purple-300 text-sm mb-3">🏛️ Top Strategy Firms</h5>
                    <ul className="space-y-2 text-xs text-purple-100">
                      <li>• <a href="https://www.mckinsey.com/careers" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">McKinsey & Company</a> - QuantumBlack AI</li>
                      <li>• <a href="https://careers.bcg.com" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">Boston Consulting Group</a> - BCG Gamma</li>
                      <li>• <a href="https://www.bain.com/careers" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">Bain & Company</a> - Advanced Analytics</li>
                      <li>• <a href="https://www.oliverwyman.com/careers" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">Oliver Wyman</a> - Digital & Analytics</li>
                      <li>• <a href="https://www.kearney.com/careers" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">Kearney</a> - Analytics practice</li>
                    </ul>
                  </div>

                  <div className="bg-violet-800/30 rounded-lg p-4 border border-violet-600/30">
                    <h5 className="font-semibold text-violet-300 text-sm mb-3">🏢 Big Four Consulting</h5>
                    <ul className="space-y-2 text-xs text-violet-100">
                      <li>• <a href="https://www2.deloitte.com/careers" target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-violet-200 underline">Deloitte</a> - AI & Data practice</li>
                      <li>• <a href="https://www.pwc.com/careers" target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-violet-200 underline">PwC</a> - AI & Analytics</li>
                      <li>• <a href="https://careers.ey.com" target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-violet-200 underline">Ernst & Young</a> - AI advisory</li>
                      <li>• <a href="https://home.kpmg/careers" target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-violet-200 underline">KPMG</a> - Data & Analytics</li>
                      <li>• <a href="https://www.accenture.com/careers" target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-violet-200 underline">Accenture</a> - Applied Intelligence</li>
                    </ul>
                  </div>

                  <div className="bg-pink-800/30 rounded-lg p-4 border border-pink-600/30">
                    <h5 className="font-semibold text-pink-300 text-sm mb-3">🔧 Tech Consulting</h5>
                    <ul className="space-y-2 text-xs text-pink-100">
                      <li>• <a href="https://www.capgemini.com/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Capgemini</a> - AI & Analytics</li>
                      <li>• <a href="https://www.cognizant.com/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Cognizant</a> - Digital engineering</li>
                      <li>• <a href="https://www.tcs.com/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Tata Consultancy Services</a> - AI services</li>
                      <li>• <a href="https://www.infosys.com/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Infosys</a> - AI & automation</li>
                      <li>• <a href="https://www.wipro.com/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Wipro</a> - AI & cognitive computing</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Fintech & Financial Services */}
              <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-lg p-6 border border-emerald-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-emerald-300 mb-4">💳 Fintech & Financial Services</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-emerald-800/30 rounded-lg p-4 border border-emerald-600/30">
                    <h5 className="font-semibold text-emerald-300 text-sm mb-3">💰 Payment Platforms</h5>
                    <ul className="space-y-2 text-xs text-emerald-100">
                      <li>• <a href="https://stripe.com/jobs" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline">Stripe</a> - Payment processing AI</li>
                      <li>• <a href="https://squareup.com/careers" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline">Square</a> - Financial services AI</li>
                      <li>• <a href="https://www.paypal.com/careers" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline">PayPal</a> - Fraud detection AI</li>
                      <li>• <a href="https://www.adyen.com/careers" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline">Adyen</a> - Payment optimization</li>
                      <li>• <a href="https://plaid.com/careers" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline">Plaid</a> - Financial data APIs</li>
                    </ul>
                  </div>

                  <div className="bg-green-800/30 rounded-lg p-4 border border-green-600/30">
                    <h5 className="font-semibold text-green-300 text-sm mb-3">📈 Trading & Investment</h5>
                    <ul className="space-y-2 text-xs text-green-100">
                      <li>• <a href="https://robinhood.com/careers" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline">Robinhood</a> - Commission-free trading</li>
                      <li>• <a href="https://www.coinbase.com/careers" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline">Coinbase</a> - Cryptocurrency platform</li>
                      <li>• <a href="https://www.affirm.com/careers" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline">Affirm</a> - Buy now, pay later</li>
                      <li>• <a href="https://www.klarna.com/careers" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline">Klarna</a> - Shopping & payments</li>
                      <li>• <a href="https://www.sofi.com/careers" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline">SoFi</a> - Digital financial services</li>
                    </ul>
                  </div>

                  <div className="bg-teal-800/30 rounded-lg p-4 border border-teal-600/30">
                    <h5 className="font-semibold text-teal-300 text-sm mb-3">🏦 Traditional Finance</h5>
                    <ul className="space-y-2 text-xs text-teal-100">
                      <li>• <a href="https://www.jpmorgan.com/careers" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 underline">JPMorgan Chase</a> - AI research & trading</li>
                      <li>• <a href="https://www.goldmansachs.com/careers" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 underline">Goldman Sachs</a> - Algorithmic trading</li>
                      <li>• <a href="https://www.morganstanley.com/careers" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 underline">Morgan Stanley</a> - AI & analytics</li>
                      <li>• <a href="https://careers.blackrock.com" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 underline">BlackRock</a> - Aladdin AI platform</li>
                      <li>• <a href="https://www.citadel.com/careers" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 underline">Citadel</a> - Quantitative trading</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Healthcare & Life Sciences */}
              <div className="bg-gradient-to-r from-rose-900/30 to-red-900/30 rounded-lg p-6 border border-rose-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-rose-300 mb-4">🏥 Healthcare & Life Sciences AI</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-rose-800/30 rounded-lg p-4 border border-rose-600/30">
                    <h5 className="font-semibold text-rose-300 text-sm mb-3">💊 Drug Discovery</h5>
                    <ul className="space-y-2 text-xs text-rose-100">
                      <li>• <a href="https://www.deepmind.com/careers" target="_blank" rel="noopener noreferrer" className="text-rose-300 hover:text-rose-200 underline">DeepMind</a> - AlphaFold protein folding</li>
                      <li>• <a href="https://www.atomwise.com/careers" target="_blank" rel="noopener noreferrer" className="text-rose-300 hover:text-rose-200 underline">Atomwise</a> - AI drug discovery</li>
                      <li>• <a href="https://www.benevolent.com/careers" target="_blank" rel="noopener noreferrer" className="text-rose-300 hover:text-rose-200 underline">BenevolentAI</a> - Drug development AI</li>
                      <li>• <a href="https://www.insitro.com/careers" target="_blank" rel="noopener noreferrer" className="text-rose-300 hover:text-rose-200 underline">Insitro</a> - ML for drug discovery</li>
                      <li>• <a href="https://www.recursion.com/careers" target="_blank" rel="noopener noreferrer" className="text-rose-300 hover:text-rose-200 underline">Recursion</a> - Digital biology platform</li>
                    </ul>
                  </div>

                  <div className="bg-red-800/30 rounded-lg p-4 border border-red-600/30">
                    <h5 className="font-semibold text-red-300 text-sm mb-3">🔬 Medical Imaging</h5>
                    <ul className="space-y-2 text-xs text-red-100">
                      <li>• <a href="https://www.aidoc.com/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Aidoc</a> - Radiology AI</li>
                      <li>• <a href="https://www.zebra-med.com/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Zebra Medical</a> - Medical imaging AI</li>
                      <li>• <a href="https://www.pathai.com/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">PathAI</a> - Pathology AI</li>
                      <li>• <a href="https://www.paige.ai/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Paige</a> - Cancer detection AI</li>
                      <li>• <a href="https://www.tempus.com/careers" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline">Tempus</a> - Precision medicine</li>
                    </ul>
                  </div>

                  <div className="bg-pink-800/30 rounded-lg p-4 border border-pink-600/30">
                    <h5 className="font-semibold text-pink-300 text-sm mb-3">🩺 Digital Health</h5>
                    <ul className="space-y-2 text-xs text-pink-100">
                      <li>• <a href="https://www.teladoc.com/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Teladoc</a> - Telehealth platform</li>
                      <li>• <a href="https://www.veracyte.com/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Veracyte</a> - Genomic diagnostics</li>
                      <li>• <a href="https://www.flatiron.com/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Flatiron Health</a> - Oncology data platform</li>
                      <li>• <a href="https://www.23andme.com/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">23andMe</a> - Personal genomics</li>
                      <li>• <a href="https://www.modernhealth.com/careers" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">Modern Health</a> - Mental health AI</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Summary & Call to Action */}
              <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-lg p-6 border border-amber-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-amber-300 mb-4">🎯 Your AI Career Journey Starts Here!</h4>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-amber-800/30 rounded-lg p-4 border border-amber-600/30">
                    <h5 className="font-semibold text-amber-300 text-sm mb-3">📊 By the Numbers</h5>
                    <ul className="space-y-2 text-xs text-amber-100">
                      <li>• <strong>100+ Companies</strong> actively hiring AI talent</li>
                      <li>• <strong>15+ Industries</strong> from tech to healthcare</li>
                      <li>• <strong>$80K-$500K+</strong> salary ranges available</li>
                      <li>• <strong>Remote & Hybrid</strong> opportunities worldwide</li>
                      <li>• <strong>Entry to Senior</strong> level positions</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30">
                    <h5 className="font-semibold text-yellow-300 text-sm mb-3">🚀 Next Steps</h5>
                    <ul className="space-y-2 text-xs text-yellow-100">
                      <li>• <strong>Pick 5-10 companies</strong> that excite you most</li>
                      <li>• <strong>Visit their careers pages</strong> and explore openings</li>
                      <li>• <strong>Follow them on LinkedIn</strong> for updates</li>
                      <li>• <strong>Build relevant skills</strong> for your target roles</li>
                      <li>• <strong>Network with employees</strong> on professional platforms</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-4 p-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Rocket size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base sm:text-lg font-bold text-white mb-1">Ready to Launch Your AI Career? 🌟</h4>
                      <p className="text-xs sm:text-sm text-amber-100">The future is AI, and your dream job is waiting. Start applying today! 💫</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Career Guide Video 1 */}
        <AIVideo
          src="https://www.youtube.com/embed/aircAruvnKk"
          title="🚀 How to Get Started in AI/ML Career"
          description="3Blue1Brown's guide to breaking into AI careers"
          icon={<Briefcase size={20} className="text-white" />}
          gradient="from-green-900 to-emerald-800"
          note="💼 3Blue1Brown: Excellent career guidance from one of the best math/AI educators on YouTube!"
        />

        {/* Job Automation Documentary */}
        <AIVideo
          src="https://www.youtube.com/embed/5dZ_lvDgevk"
          title="🎬 In the Age of AI (Documentary)"
          description="FRONTLINE's deep look at AI's impact on society"
          icon={<AlertTriangle size={20} className="text-white" />}
          gradient="from-gray-900 to-gray-800"
          note="📺 FRONTLINE PBS: Award-winning documentary exploring AI's promise and challenges, from job changes to privacy concerns."
        />

        {/* Future of Work - Edge to Edge */}
        <section className="w-full bg-gray-800 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">AI & the Future of Work 🔮</h3>
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-red-100 leading-relaxed">
                AI is changing how we work, but it's not all scary! 😊 While some jobs might change, AI is also creating amazing new opportunities. The key is understanding what's happening and preparing for the future.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-red-800/30 rounded-lg p-4 border border-red-600/30">
                  <h4 className="text-base sm:text-lg font-semibold text-red-300 mb-3 flex items-center gap-2">
                    <AlertTriangle size={18} />
                    Jobs That Might Change ⚠️
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-red-100"><strong>Data Entry:</strong> AI can type faster</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-red-100"><strong>Basic Customer Service:</strong> Chatbots are getting smarter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-red-100"><strong>Simple Assembly:</strong> Robots are precise</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-800/30 rounded-lg p-4 border border-green-600/30">
                  <h4 className="text-base sm:text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                    <Heart size={18} />
                    Jobs That Are Safe 💚
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-green-100"><strong>Teachers:</strong> Humans need human connection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-green-100"><strong>Doctors:</strong> Caring requires empathy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-green-100"><strong>Artists:</strong> Creativity is uniquely human</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-orange-300 mb-3">🌟 New Jobs AI is Creating</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-1 text-xs sm:text-sm text-orange-100">
                      <li>• <strong>AI Trainers:</strong> Teaching AI systems</li>
                      <li>• <strong>Prompt Engineers:</strong> Talking to AI effectively</li>
                      <li>• <strong>AI Auditors:</strong> Making sure AI is fair</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1 text-xs sm:text-sm text-orange-100">
                      <li>• <strong>Human-AI Designers:</strong> Making AI user-friendly</li>
                      <li>• <strong>Robot Technicians:</strong> Fixing AI systems</li>
                      <li>• <strong>AI Ethicists:</strong> Keeping AI responsible</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-purple-300 mb-3">💪 How to Future-Proof Yourself</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <BookOpen size={18} className="text-white" />
                    </div>
                    <h5 className="font-semibold text-white text-sm mb-1">Keep Learning 📚</h5>
                    <p className="text-xs text-purple-100">Stay curious and learn new skills</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Brain size={18} className="text-white" />
                    </div>
                    <h5 className="font-semibold text-white text-sm mb-1">Learn AI 🤖</h5>
                    <p className="text-xs text-purple-100">Work WITH AI, not against it</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Heart size={18} className="text-white" />
                    </div>
                    <h5 className="font-semibold text-white text-sm mb-1">Human Skills 💝</h5>
                    <p className="text-xs text-purple-100">Creativity, empathy, teamwork</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Resources Video - Replace Andrew Ng */}
        <AIVideo
          src="https://www.youtube.com/embed/VyWAvY2CF9c"
          title="🎓 Machine Learning Explained"
          description="Zach Star's beginner-friendly ML introduction"
          icon={<BookOpen size={20} className="text-white" />}
          gradient="from-gray-900 to-gray-800"
          note="🌟 Zach Star: Perfect introduction to machine learning concepts explained in simple terms that anyone can understand!"
        />

        {/* AI Career Guide Video 2 */}
        <AIVideo
          src="https://www.youtube.com/embed/MhCHrvfAXlc"
          title="💰 AI Engineer Roadmap - How I'd Learn AI in 2024"
          description="Complete roadmap to becoming an AI engineer"
          icon={<DollarSign size={20} className="text-white" />}
          gradient="from-yellow-900 to-orange-800"
          note="💰 Career Guide: Comprehensive AI learning roadmap with practical steps and high-paying career paths!"
        />

        {/* AI Resources - Edge to Edge */}
        <section className="w-full bg-gray-900 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Rocket size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">AI Resources & Learning Materials 📚</h3>
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-green-100 leading-relaxed text-center">
                Explore the best AI resources from GitHub repositories to world-class educational content! 🌟
              </p>

              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-4 text-center">🎓 AI Literacy Resources</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-600/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2">Google AI Literacy</h5>
                    <p className="text-xs text-blue-100 mb-2">Build AI knowledge and literacy with free resources for students, teachers, and families.</p>
                    <a href="https://ai.google/literacy" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-blue-300 hover:text-blue-200 underline">
                      ai.google/literacy
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-purple-300 mb-4 text-center">🏛️ Leading AGI Research Labs</h4>
                <p className="text-xs sm:text-sm text-gray-100 text-center mb-4">
                  These world-class research institutions are racing to build Artificial General Intelligence (AGI) - AI as smart as humans! 🧠
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-green-800/30 rounded-lg p-3 border border-green-600/30">
                    <h5 className="font-semibold text-green-300 text-sm mb-2">🤖 OpenAI</h5>
                    <p className="text-xs text-green-100 mb-2">Creator of ChatGPT & GPT-4 - Leading AGI research</p>
                    <a href="https://openai.com" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-green-300 hover:text-green-200 underline">
                      openai.com
                    </a>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-600/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2">🧠 Google DeepMind</h5>
                    <p className="text-xs text-blue-100 mb-2">AlphaGo, Gemini, AlphaFold - Google's AI powerhouse</p>
                    <a href="https://deepmind.google" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-blue-300 hover:text-blue-200 underline">
                      deepmind.google
                    </a>
                  </div>

                  <div className="bg-purple-800/30 rounded-lg p-3 border border-purple-600/30">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2">⚖️ Anthropic</h5>
                    <p className="text-xs text-purple-100 mb-2">Claude AI, Constitutional AI - Safety-focused AGI</p>
                    <a href="https://anthropic.com" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-purple-300 hover:text-purple-200 underline">
                      anthropic.com
                    </a>
                  </div>

                  <div className="bg-orange-800/30 rounded-lg p-3 border border-orange-600/30">
                    <h5 className="font-semibold text-orange-300 text-sm mb-2">🔬 Microsoft Research</h5>
                    <p className="text-xs text-orange-100 mb-2">Copilot, Azure AI - Enterprise AGI solutions</p>
                    <a href="https://www.microsoft.com/en-us/research/lab/microsoft-research-ai" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-orange-300 hover:text-orange-200 underline">
                      microsoft.com/research
                    </a>
                  </div>

                  <div className="bg-cyan-800/30 rounded-lg p-3 border border-cyan-600/30">
                    <h5 className="font-semibold text-cyan-300 text-sm mb-2">🌐 Meta FAIR</h5>
                    <p className="text-xs text-cyan-100 mb-2">LLaMA models, VR/AR AI - Fundamental AI Research</p>
                    <a href="https://ai.meta.com" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-cyan-300 hover:text-cyan-200 underline">
                      ai.meta.com
                    </a>
                  </div>

                  <div className="bg-red-800/30 rounded-lg p-3 border border-red-600/30">
                    <h5 className="font-semibold text-red-300 text-sm mb-2">🚗 Tesla AI</h5>
                    <p className="text-xs text-red-100 mb-2">Full Self-Driving, Optimus Robot - Real-world AI</p>
                    <a href="https://www.tesla.com/AI" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-red-300 hover:text-red-200 underline">
                      tesla.com/AI
                    </a>
                  </div>

                  <div className="bg-yellow-800/30 rounded-lg p-3 border border-yellow-600/30">
                    <h5 className="font-semibold text-yellow-300 text-sm mb-2">🏛️ Stanford HAI</h5>
                    <p className="text-xs text-yellow-100 mb-2">Human-Centered AI Institute - Academic research</p>
                    <a href="https://hai.stanford.edu" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-yellow-300 hover:text-yellow-200 underline">
                      hai.stanford.edu
                    </a>
                  </div>

                  <div className="bg-teal-800/30 rounded-lg p-3 border border-teal-600/30">
                    <h5 className="font-semibold text-teal-300 text-sm mb-2">🎓 MIT CSAIL</h5>
                    <p className="text-xs text-teal-100 mb-2">Computer Science & AI Lab - Cutting-edge research</p>
                    <a href="https://www.csail.mit.edu" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-teal-300 hover:text-teal-200 underline">
                      csail.mit.edu
                    </a>
                  </div>

                  <div className="bg-pink-800/30 rounded-lg p-3 border border-pink-600/30">
                    <h5 className="font-semibold text-pink-300 text-sm mb-2">🇨🇳 DeepSeek</h5>
                    <p className="text-xs text-pink-100 mb-2">Chinese AGI lab - Open-source AI models</p>
                    <a href="https://www.deepseek.com" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-pink-300 hover:text-pink-200 underline">
                      deepseek.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-orange-300 mb-4 text-center">🌟 Prominent AI Figures & Researchers</h4>
                <p className="text-xs sm:text-sm text-gray-100 text-center mb-4">
                  Meet the brilliant minds shaping the future of AI - from Nobel Prize winners to industry pioneers! 🏆
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-yellow-800/30 rounded-lg p-3 border border-yellow-600/30">
                    <h5 className="font-semibold text-yellow-300 text-sm mb-2">🏆 Geoffrey Hinton</h5>
                    <p className="text-xs text-yellow-100 mb-2">Nobel Prize 2024 - "Godfather of Deep Learning"</p>
                    <a href="https://en.wikipedia.org/wiki/Geoffrey_Hinton" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-yellow-300 hover:text-yellow-200 underline">
                      Wikipedia →
                    </a>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-600/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2">🧠 Yann LeCun</h5>
                    <p className="text-xs text-blue-100 mb-2">Turing Award Winner - CNN Pioneer, Meta Chief AI Scientist</p>
                    <a href="https://en.wikipedia.org/wiki/Yann_LeCun" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-blue-300 hover:text-blue-200 underline">
                      Wikipedia →
                    </a>
                  </div>

                  <div className="bg-green-800/30 rounded-lg p-3 border border-green-600/30">
                    <h5 className="font-semibold text-green-300 text-sm mb-2">🎓 Yoshua Bengio</h5>
                    <p className="text-xs text-green-100 mb-2">Turing Award Winner - Deep Learning Pioneer</p>
                    <a href="https://en.wikipedia.org/wiki/Yoshua_Bengio" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-green-300 hover:text-green-200 underline">
                      Wikipedia →
                    </a>
                  </div>

                  <div className="bg-purple-800/30 rounded-lg p-3 border border-purple-600/30">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2">👁️ Fei-Fei Li</h5>
                    <p className="text-xs text-purple-100 mb-2">Stanford AI Lab - Computer Vision Pioneer, ImageNet</p>
                    <a href="https://en.wikipedia.org/wiki/Fei-Fei_Li" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-purple-300 hover:text-purple-200 underline">
                      Wikipedia →
                    </a>
                  </div>

                  <div className="bg-red-800/30 rounded-lg p-3 border border-red-600/30">
                    <h5 className="font-semibold text-red-300 text-sm mb-2">🚀 Sam Altman</h5>
                    <p className="text-xs text-red-100 mb-2">OpenAI CEO - Leading the ChatGPT revolution</p>
                    <a href="https://en.wikipedia.org/wiki/Sam_Altman" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-red-300 hover:text-red-200 underline">
                      Wikipedia →
                    </a>
                  </div>

                  <div className="bg-cyan-800/30 rounded-lg p-3 border border-cyan-600/30">
                    <h5 className="font-semibold text-cyan-300 text-sm mb-2">🏛️ Demis Hassabis</h5>
                    <p className="text-xs text-cyan-100 mb-2">Nobel Prize 2024 - DeepMind CEO, AlphaGo creator</p>
                    <a href="https://en.wikipedia.org/wiki/Demis_Hassabis" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-cyan-300 hover:text-cyan-200 underline">
                      Wikipedia →
                    </a>
                  </div>

                  <div className="bg-pink-800/30 rounded-lg p-3 border border-pink-600/30">
                    <h5 className="font-semibold text-pink-300 text-sm mb-2">⚖️ Dario Amodei</h5>
                    <p className="text-xs text-pink-100 mb-2">Anthropic CEO - AI Safety & Constitutional AI</p>
                    <a href="https://en.wikipedia.org/wiki/Dario_Amodei" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-pink-300 hover:text-pink-200 underline">
                      Wikipedia →
                    </a>
                  </div>

                  <div className="bg-teal-800/30 rounded-lg p-3 border border-teal-600/30">
                    <h5 className="font-semibold text-teal-300 text-sm mb-2">🇨🇳 Kai-Fu Lee</h5>
                    <p className="text-xs text-teal-100 mb-2">AI Superpowers author - Former Google China head</p>
                    <a href="https://en.wikipedia.org/wiki/Kai-Fu_Lee" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-teal-300 hover:text-teal-200 underline">
                      Wikipedia →
                    </a>
                  </div>

                  <div className="bg-indigo-800/30 rounded-lg p-3 border border-indigo-600/30">
                    <h5 className="font-semibold text-indigo-300 text-sm mb-2">🎯 Andrew Ng</h5>
                    <p className="text-xs text-indigo-100 mb-2">DeepLearning.AI founder - Stanford AI pioneer</p>
                    <a href="https://en.wikipedia.org/wiki/Andrew_Ng" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-indigo-300 hover:text-indigo-200 underline">
                      Wikipedia →
                    </a>
                  </div>

                  <div className="bg-emerald-800/30 rounded-lg p-3 border border-emerald-600/30">
                    <h5 className="font-semibold text-emerald-300 text-sm mb-2">🧪 Ilya Sutskever</h5>
                    <p className="text-xs text-emerald-100 mb-2">OpenAI Co-founder - Transformer architecture pioneer</p>
                    <a href="https://en.wikipedia.org/wiki/Ilya_Sutskever" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-emerald-300 hover:text-emerald-200 underline">
                      Wikipedia →
                    </a>
                  </div>

                  <div className="bg-rose-800/30 rounded-lg p-3 border border-rose-600/30">
                    <h5 className="font-semibold text-rose-300 text-sm mb-2">📚 Ian Goodfellow</h5>
                    <p className="text-xs text-rose-100 mb-2">GAN inventor - Deep Learning book co-author</p>
                    <a href="https://en.wikipedia.org/wiki/Ian_Goodfellow" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-rose-300 hover:text-rose-200 underline">
                      Wikipedia →
                    </a>
                  </div>

                  <div className="bg-amber-800/30 rounded-lg p-3 border border-amber-600/30">
                    <h5 className="font-semibold text-amber-300 text-sm mb-2">🚗 Andrej Karpathy</h5>
                    <p className="text-xs text-amber-100 mb-2">Former Tesla AI Director - Neural Networks educator</p>
                    <a href="https://en.wikipedia.org/wiki/Andrej_Karpathy" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-amber-300 hover:text-amber-200 underline">
                      Wikipedia →
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-4 text-center">📚 Essential AI Books - From Beginner to Mastery</h4>
                <p className="text-xs sm:text-sm text-gray-100 text-center mb-6">
                  Master AI with these world-class books - from your first steps to cutting-edge research! 📖✨
                </p>

                {/* Beginner Level Books */}
                <div className="mb-6">
                  <h5 className="text-sm sm:text-base font-semibold text-green-300 mb-3 text-center">🌱 Beginner Level - Start Your AI Journey</h5>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-green-800/30 rounded-lg p-3 border border-green-600/30">
                      <h6 className="font-semibold text-green-300 text-sm mb-2">🤖 AI: A Modern Approach</h6>
                      <p className="text-xs text-green-100 mb-2">Russell & Norvig - The definitive AI textbook</p>
                      <p className="text-xs text-green-200 mb-2">Perfect introduction to all AI concepts</p>
                      <a href="https://aima.cs.berkeley.edu" target="_blank" rel="noopener noreferrer"
                         className="text-xs text-green-300 hover:text-green-200 underline">
                        Preview & Info →
                      </a>
                    </div>

                    <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-600/30">
                      <h6 className="font-semibold text-blue-300 text-sm mb-2">🎯 Machine Learning Yearning</h6>
                      <p className="text-xs text-blue-100 mb-2">Andrew Ng - FREE practical ML guide</p>
                      <p className="text-xs text-blue-200 mb-2">Learn how to structure ML projects</p>
                      <a href="https://www.deeplearning.ai/machine-learning-yearning" target="_blank" rel="noopener noreferrer"
                         className="text-xs text-blue-300 hover:text-blue-200 underline">
                        Free Download →
                      </a>
                    </div>

                    <div className="bg-purple-800/30 rounded-lg p-3 border border-purple-600/30">
                      <h6 className="font-semibold text-purple-300 text-sm mb-2">🧠 The Hundred-Page ML Book</h6>
                      <p className="text-xs text-purple-100 mb-2">Andriy Burkov - Concise ML overview</p>
                      <p className="text-xs text-purple-200 mb-2">All ML essentials in 100 pages</p>
                      <a href="http://themlbook.com" target="_blank" rel="noopener noreferrer"
                         className="text-xs text-purple-300 hover:text-purple-200 underline">
                        Read Online →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Intermediate Level Books */}
                <div className="mb-6">
                  <h5 className="text-sm sm:text-base font-semibold text-yellow-300 mb-3 text-center">⚡ Intermediate Level - Build Real Skills</h5>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-orange-800/30 rounded-lg p-3 border border-orange-600/30">
                      <h6 className="font-semibold text-orange-300 text-sm mb-2">🛠️ Hands-On Machine Learning</h6>
                      <p className="text-xs text-orange-100 mb-2">Aurélien Géron - Scikit-Learn, Keras, TensorFlow</p>
                      <p className="text-xs text-orange-200 mb-2">Build real ML systems with Python</p>
                      <a href="https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632" target="_blank" rel="noopener noreferrer"
                         className="text-xs text-orange-300 hover:text-orange-200 underline">
                        O'Reilly Preview →
                      </a>
                    </div>

                    <div className="bg-teal-800/30 rounded-lg p-3 border border-teal-600/30">
                      <h6 className="font-semibold text-teal-300 text-sm mb-2">📊 Python Machine Learning</h6>
                      <p className="text-xs text-teal-100 mb-2">Sebastian Raschka - Practical Python ML</p>
                      <p className="text-xs text-teal-200 mb-2">From linear models to deep learning</p>
                      <a href="https://sebastianraschka.com/books/#python-machine-learning-3rd-edition" target="_blank" rel="noopener noreferrer"
                         className="text-xs text-teal-300 hover:text-teal-200 underline">
                        Author's Page →
                      </a>
                    </div>

                    <div className="bg-pink-800/30 rounded-lg p-3 border border-pink-600/30">
                      <h6 className="font-semibold text-pink-300 text-sm mb-2">🎨 Deep Learning Illustrated</h6>
                      <p className="text-xs text-pink-100 mb-2">Jon Krohn - Visual guide to deep learning</p>
                      <p className="text-xs text-pink-200 mb-2">Beautiful illustrations make DL easy</p>
                      <a href="https://www.deeplearningillustrated.com" target="_blank" rel="noopener noreferrer"
                         className="text-xs text-pink-300 hover:text-pink-200 underline">
                        Official Site →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Advanced/Mastery Level Books */}
                <div className="mb-4">
                  <h5 className="text-sm sm:text-base font-semibold text-red-300 mb-3 text-center">🔥 Advanced/Mastery - Become an Expert</h5>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-red-800/30 rounded-lg p-3 border border-red-600/30">
                      <h6 className="font-semibold text-red-300 text-sm mb-2">🧬 Deep Learning</h6>
                      <p className="text-xs text-red-100 mb-2">Goodfellow, Bengio, Courville - The DL Bible</p>
                      <p className="text-xs text-red-200 mb-2">Comprehensive mathematical foundation</p>
                      <a href="https://www.deeplearningbook.org" target="_blank" rel="noopener noreferrer"
                         className="text-xs text-red-300 hover:text-red-200 underline">
                        Free Online →
                      </a>
                    </div>

                    <div className="bg-indigo-800/30 rounded-lg p-3 border border-indigo-600/30">
                      <h6 className="font-semibold text-indigo-300 text-sm mb-2">📈 Elements of Statistical Learning</h6>
                      <p className="text-xs text-indigo-100 mb-2">Hastie, Tibshirani, Friedman - ML Theory</p>
                      <p className="text-xs text-indigo-200 mb-2">Mathematical foundations of ML</p>
                      <a href="https://hastie.su.domains/ElemStatLearn" target="_blank" rel="noopener noreferrer"
                         className="text-xs text-indigo-300 hover:text-indigo-200 underline">
                        Free PDF →
                      </a>
                    </div>

                    <div className="bg-emerald-800/30 rounded-lg p-3 border border-emerald-600/30">
                      <h6 className="font-semibold text-emerald-300 text-sm mb-2">🎯 Pattern Recognition & ML</h6>
                      <p className="text-xs text-emerald-100 mb-2">Christopher Bishop - Bayesian approach</p>
                      <p className="text-xs text-emerald-200 mb-2">Graduate-level ML theory</p>
                      <a href="https://www.microsoft.com/en-us/research/people/cmbishop/prml-book" target="_blank" rel="noopener noreferrer"
                         className="text-xs text-emerald-300 hover:text-emerald-200 underline">
                        Microsoft Research →
                      </a>
                    </div>

                    <div className="bg-amber-800/30 rounded-lg p-3 border border-amber-600/30">
                      <h6 className="font-semibold text-amber-300 text-sm mb-2">🚀 Reinforcement Learning</h6>
                      <p className="text-xs text-amber-100 mb-2">Sutton & Barto - RL: An Introduction</p>
                      <p className="text-xs text-amber-200 mb-2">The definitive RL textbook</p>
                      <a href="http://incompleteideas.net/book/the-book-2nd.html" target="_blank" rel="noopener noreferrer"
                         className="text-xs text-amber-300 hover:text-amber-200 underline">
                        Free Online →
                      </a>
                    </div>

                    <div className="bg-cyan-800/30 rounded-lg p-3 border border-cyan-600/30">
                      <h6 className="font-semibold text-cyan-300 text-sm mb-2">🌐 Information Theory</h6>
                      <p className="text-xs text-cyan-100 mb-2">MacKay - Information Theory & ML</p>
                      <p className="text-xs text-cyan-200 mb-2">Deep mathematical insights</p>
                      <a href="http://www.inference.org.uk/mackay/itila" target="_blank" rel="noopener noreferrer"
                         className="text-xs text-cyan-300 hover:text-cyan-200 underline">
                        Free Download →
                      </a>
                    </div>

                    <div className="bg-violet-800/30 rounded-lg p-3 border border-violet-600/30">
                      <h6 className="font-semibold text-violet-300 text-sm mb-2">🔬 Probabilistic ML</h6>
                      <p className="text-xs text-violet-100 mb-2">Kevin Murphy - Advanced Probabilistic ML</p>
                      <p className="text-xs text-violet-200 mb-2">Cutting-edge probabilistic methods</p>
                      <a href="https://probml.github.io/pml-book" target="_blank" rel="noopener noreferrer"
                         className="text-xs text-violet-300 hover:text-violet-200 underline">
                        Free Online →
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-center bg-gray-800/30 rounded-lg p-3 border border-gray-600/30">
                  <p className="text-xs sm:text-sm text-gray-200">
                    💡 <strong>Pro Tip:</strong> Start with beginner books, practice with code, then advance to theory-heavy books.
                    Many of these books are available FREE online! 🎉
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/20 rounded-lg p-4 border border-gray-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-green-300 mb-4 text-center">🚀 Top AI GitHub Repositories</h4>
                <p className="text-xs sm:text-sm text-gray-100 text-center mb-4">
                  Explore these amazing open-source AI projects to learn, contribute, and build incredible things!
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-600/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2">🤖 AutoGPT</h5>
                    <p className="text-xs text-blue-100 mb-2">176k+ ⭐ - Autonomous AI agents</p>
                    <a href="https://github.com/Significant-Gravitas/AutoGPT" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-blue-300 hover:text-blue-200 underline">
                      github.com/Significant-Gravitas/AutoGPT
                    </a>
                  </div>

                  <div className="bg-purple-800/30 rounded-lg p-3 border border-purple-600/30">
                    <h5 className="font-semibold text-purple-300 text-sm mb-2">📚 LLMs from Scratch</h5>
                    <p className="text-xs text-purple-100 mb-2">57k+ ⭐ - Build ChatGPT from scratch</p>
                    <a href="https://github.com/rasbt/LLMs-from-scratch" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-purple-300 hover:text-purple-200 underline">
                      github.com/rasbt/LLMs-from-scratch
                    </a>
                  </div>

                  <div className="bg-green-800/30 rounded-lg p-3 border border-green-600/30">
                    <h5 className="font-semibold text-green-300 text-sm mb-2">🎓 AI for Beginners</h5>
                    <p className="text-xs text-green-100 mb-2">38k+ ⭐ - Microsoft's AI curriculum</p>
                    <a href="https://github.com/microsoft/AI-For-Beginners" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-green-300 hover:text-green-200 underline">
                      github.com/microsoft/AI-For-Beginners
                    </a>
                  </div>

                  <div className="bg-orange-800/30 rounded-lg p-3 border border-orange-600/30">
                    <h5 className="font-semibold text-orange-300 text-sm mb-2">🔧 Flowise</h5>
                    <p className="text-xs text-orange-100 mb-2">41k+ ⭐ - Build AI agents visually</p>
                    <a href="https://github.com/FlowiseAI/Flowise" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-orange-300 hover:text-orange-200 underline">
                      github.com/FlowiseAI/Flowise
                    </a>
                  </div>

                  <div className="bg-cyan-800/30 rounded-lg p-3 border border-cyan-600/30">
                    <h5 className="font-semibold text-cyan-300 text-sm mb-2">🧠 spaCy</h5>
                    <p className="text-xs text-cyan-100 mb-2">32k+ ⭐ - Industrial NLP library</p>
                    <a href="https://github.com/explosion/spaCy" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-cyan-300 hover:text-cyan-200 underline">
                      github.com/explosion/spaCy
                    </a>
                  </div>

                  <div className="bg-pink-800/30 rounded-lg p-3 border border-pink-600/30">
                    <h5 className="font-semibold text-pink-300 text-sm mb-2">📊 500 AI Projects</h5>
                    <p className="text-xs text-pink-100 mb-2">24k+ ⭐ - Massive project collection</p>
                    <a href="https://github.com/ashishpatel26/500-AI-Machine-learning-Deep-learning-Computer-vision-NLP-Projects-with-code" target="_blank" rel="noopener noreferrer"
                       className="text-xs text-pink-300 hover:text-pink-200 underline">
                      github.com/ashishpatel26/500-AI-Projects
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-indigo-300 mb-4 text-center">🎥 Learn from Andrej Karpathy</h4>
                <p className="text-xs sm:text-sm text-gray-100 text-center mb-4">
                  Former Tesla AI Director & OpenAI researcher - Learn AI from one of the world's best teachers!
                  <a href="https://www.youtube.com/@AndrejKarpathy" target="_blank" rel="noopener noreferrer"
                     className="text-indigo-300 hover:text-indigo-200 underline ml-1">
                    Visit his YouTube channel →
                  </a>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <button
                     onClick={() => openVideoModal('VMj-3S1tku0')}
                     className="bg-red-800/30 rounded-lg p-2 border border-red-600/30 text-center hover:bg-red-800/50 transition-colors w-full">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play size={14} className="text-white" />
                    </div>
                    <h6 className="text-xs font-semibold text-red-300 mb-1">Micrograd</h6>
                    <p className="text-xs text-red-100">Autograd Engine</p>
                  </button>

                  <button
                     onClick={() => openVideoModal('PaCmpygFfXo')}
                     className="bg-blue-800/30 rounded-lg p-2 border border-blue-600/30 text-center hover:bg-blue-800/50 transition-colors w-full">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play size={14} className="text-white" />
                    </div>
                    <h6 className="text-xs font-semibold text-blue-300 mb-1">Makemore pt1</h6>
                    <p className="text-xs text-blue-100">Bigram Model</p>
                  </button>

                  <button
                     onClick={() => openVideoModal('TCH_1BHY58I')}
                     className="bg-green-800/30 rounded-lg p-2 border border-green-600/30 text-center hover:bg-green-800/50 transition-colors w-full">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play size={14} className="text-white" />
                    </div>
                    <h6 className="text-xs font-semibold text-green-300 mb-1">Makemore pt2</h6>
                    <p className="text-xs text-green-100">MLP Language Model</p>
                  </button>

                  <button
                     onClick={() => openVideoModal('P6sfmUTpUmc')}
                     className="bg-purple-800/30 rounded-lg p-2 border border-purple-600/30 text-center hover:bg-purple-800/50 transition-colors w-full">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play size={14} className="text-white" />
                    </div>
                    <h6 className="text-xs font-semibold text-purple-300 mb-1">Makemore pt3</h6>
                    <p className="text-xs text-purple-100">Activations & Gradients</p>
                  </button>

                  <button
                     onClick={() => openVideoModal('q8SA3rM6ckI')}
                     className="bg-orange-800/30 rounded-lg p-2 border border-orange-600/30 text-center hover:bg-orange-800/50 transition-colors w-full">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play size={14} className="text-white" />
                    </div>
                    <h6 className="text-xs font-semibold text-orange-300 mb-1">Makemore pt4</h6>
                    <p className="text-xs text-orange-100">Manual Backprop</p>
                  </button>

                  <button
                     onClick={() => openVideoModal('t3YJ5hKiMQ0')}
                     className="bg-cyan-800/30 rounded-lg p-2 border border-cyan-600/30 text-center hover:bg-cyan-800/50 transition-colors w-full">
                    <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play size={14} className="text-white" />
                    </div>
                    <h6 className="text-xs font-semibold text-cyan-300 mb-1">Makemore pt5</h6>
                    <p className="text-xs text-cyan-100">WaveNet</p>
                  </button>

                  <button
                     onClick={() => openVideoModal('kCc8FmEb1nY')}
                     className="bg-pink-800/30 rounded-lg p-2 border border-pink-600/30 text-center hover:bg-pink-800/50 transition-colors w-full">
                    <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play size={14} className="text-white" />
                    </div>
                    <h6 className="text-xs font-semibold text-pink-300 mb-1">GPT from Scratch</h6>
                    <p className="text-xs text-pink-100">Build ChatGPT</p>
                  </button>

                  <button
                     onClick={() => openVideoModal('l8pRSuU81PU')}
                     className="bg-yellow-800/30 rounded-lg p-2 border border-yellow-600/30 text-center hover:bg-yellow-800/50 transition-colors w-full">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play size={14} className="text-white" />
                    </div>
                    <h6 className="text-xs font-semibold text-yellow-300 mb-1">Tokenization</h6>
                    <p className="text-xs text-yellow-100">Text to Numbers</p>
                  </button>

                  <button
                     onClick={() => openVideoModal('bZQun8Y4L2A')}
                     className="bg-teal-800/30 rounded-lg p-2 border border-teal-600/30 text-center hover:bg-teal-800/50 transition-colors w-full">
                    <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play size={14} className="text-white" />
                    </div>
                    <h6 className="text-xs font-semibold text-teal-300 mb-1">State of GPT</h6>
                    <p className="text-xs text-teal-100">Microsoft Build</p>
                  </button>

                  <button
                     onClick={() => openVideoModal('zjkBMFhNj_g')}
                     className="bg-indigo-800/30 rounded-lg p-2 border border-indigo-600/30 text-center hover:bg-indigo-800/50 transition-colors w-full">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play size={14} className="text-white" />
                    </div>
                    <h6 className="text-xs font-semibold text-indigo-300 mb-1">Intro to LLMs</h6>
                    <p className="text-xs text-indigo-100">1hr Talk</p>
                  </button>

                  <button
                     onClick={() => openVideoModal('EWvNQjAaOHw')}
                     className="bg-rose-800/30 rounded-lg p-2 border border-rose-600/30 text-center hover:bg-rose-800/50 transition-colors w-full">
                    <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play size={14} className="text-white" />
                    </div>
                    <h6 className="text-xs font-semibold text-rose-300 mb-1">How I use LLMs</h6>
                    <p className="text-xs text-rose-100">Practical Guide</p>
                  </button>

                  <button
                     onClick={() => openVideoModal('7xTGNNLPyMI')}
                     className="bg-emerald-800/30 rounded-lg p-2 border border-emerald-600/30 text-center hover:bg-emerald-800/50 transition-colors w-full">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play size={14} className="text-white" />
                    </div>
                    <h6 className="text-xs font-semibold text-emerald-300 mb-1">Deep Dive LLMs</h6>
                    <p className="text-xs text-emerald-100">Under the Hood</p>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Star size={24} className="sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2">Ready to Change the World? 🌍</h4>
                    <p className="text-xs sm:text-sm text-blue-100">The AI revolution is happening now. Don't just watch it - be part of it! ✨</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* US-China AI Competition - Edge to Edge */}
        <section className="w-full bg-gradient-to-br from-red-900 via-gray-900 to-blue-900 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Target size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">The Great AI Race: USA vs China 🌍</h3>
            </div>

            <div className="space-y-6">
              {/* Introduction */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-red-300 mb-4">🚨 The Most Important Competition of Our Time</h4>
                <p className="text-sm sm:text-base text-gray-100 leading-relaxed mb-4">
                  The race for AI supremacy between the United States and China represents the defining geopolitical struggle of the 21st century. As <strong className="text-red-300">Kai-Fu Lee</strong> argues in his seminal book <em>"AI Superpowers: China, Silicon Valley, and the New World Order"</em>, this competition will determine not just technological leadership, but the fundamental structure of global power, economic systems, and human society itself.
                </p>
                <p className="text-sm sm:text-base text-gray-100 leading-relaxed mb-4">
                  From Silicon Valley's innovation ecosystem to China's state-coordinated AI strategy, from semiconductor export controls to surveillance technologies, this competition touches every aspect of modern life. The outcome will determine whether the future is shaped by democratic values of freedom, privacy, and human rights, or by authoritarian control, surveillance, and state power.
                </p>
                <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
                  As <strong className="text-red-300">Henry Kissinger, Eric Schmidt, and Daniel Huttenlocher</strong> warn in <em>"The Age of AI: And Our Human Future"</em>, we are witnessing a transformation as profound as the Industrial Revolution, but compressed into decades rather than centuries. The stakes could not be higher.
                </p>
              </div>

              {/* Essential Reading */}
              <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-lg p-6 border border-amber-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-amber-300 mb-4">📚 Essential Books: Understanding the AI Superpowers</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-amber-800/30 rounded-lg p-4 border border-amber-600/30">
                    <h5 className="font-semibold text-amber-300 text-sm mb-2">🇨🇳 AI Superpowers (2018)</h5>
                    <p className="text-xs text-amber-100 mb-2"><strong>Kai-Fu Lee</strong> - Former Google China President</p>
                    <p className="text-xs text-amber-200 mb-2">
                      Prophetic analysis of China's AI strategy and the coming US-China competition. Lee predicted China's rapid AI advancement and the "four waves" of AI implementation.
                    </p>
                    <p className="text-xs text-amber-300">Key insight: China's data advantage and implementation speed vs US innovation edge</p>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2">🤖 The Age of AI (2021)</h5>
                    <p className="text-xs text-blue-100 mb-2"><strong>Kissinger, Schmidt, Huttenlocher</strong></p>
                    <p className="text-xs text-blue-200 mb-2">
                      Geopolitical analysis by former Secretary of State, ex-Google CEO, and MIT dean. Explores how AI transforms international relations and power structures.
                    </p>
                    <p className="text-xs text-blue-300">Key insight: AI as the new nuclear weapon in great power competition</p>
                  </div>

                  <div className="bg-green-800/30 rounded-lg p-4 border border-green-600/30">
                    <h5 className="font-semibold text-green-300 text-sm mb-2">⚡ The Technology Trap (2019)</h5>
                    <p className="text-xs text-green-100 mb-2"><strong>Carl Benedikt Frey</strong> - Oxford economist</p>
                    <p className="text-xs text-green-200 mb-2">
                      Historical analysis of technological revolutions and their impact on labor, power, and society. Provides crucial context for understanding AI's disruptive potential.
                    </p>
                    <p className="text-xs text-green-300">Key insight: How technological leadership determines global power shifts</p>
                  </div>
                </div>
              </div>

              {/* The Stakes */}
              <div className="bg-gradient-to-r from-red-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-4">⚔️ What's at Stake: The Future of Everything</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-red-800/30 rounded-lg p-4 border border-red-600/30">
                    <h5 className="font-semibold text-red-300 text-sm mb-2">🇺🇸 US Advantages</h5>
                    <ul className="space-y-1 text-xs text-red-100">
                      <li>• <strong>Silicon Valley Innovation:</strong> Google, Microsoft, OpenAI, Meta</li>
                      <li>• <strong>Semiconductor Dominance:</strong> NVIDIA, Intel, advanced chips</li>
                      <li>• <strong>Research Universities:</strong> MIT, Stanford, Carnegie Mellon</li>
                      <li>• <strong>Venture Capital:</strong> $50+ billion in AI investments</li>
                      <li>• <strong>Global Alliances:</strong> NATO, Five Eyes, democratic partners</li>
                      <li>• <strong>Open Innovation:</strong> Collaborative research ecosystem</li>
                    </ul>
                  </div>

                  <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-2">🇨🇳 China's Strengths</h5>
                    <ul className="space-y-1 text-xs text-blue-100">
                      <li>• <strong>State Coordination:</strong> Unified national AI strategy</li>
                      <li>• <strong>Massive Data:</strong> 1.4 billion people, surveillance state</li>
                      <li>• <strong>Tech Giants:</strong> Baidu, Alibaba, Tencent, ByteDance</li>
                      <li>• <strong>Manufacturing Scale:</strong> World's factory for AI hardware</li>
                      <li>• <strong>Talent Pool:</strong> Millions of STEM graduates annually</li>
                      <li>• <strong>Speed of Deployment:</strong> Rapid implementation without regulation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* China's AI Strategy */}
              <div className="bg-gradient-to-r from-yellow-900/30 to-red-900/30 rounded-lg p-6 border border-yellow-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-yellow-300 mb-4">🐉 China's Master Plan: AI Superpower by 2030</h4>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-yellow-100 leading-relaxed">
                    In July 2017, China unveiled its <strong>"New Generation Artificial Intelligence Development Plan"</strong> - a comprehensive strategy to become the world's primary AI innovation center by 2030, with a domestic AI industry worth $150 billion. This plan, as <strong className="text-yellow-300">Kai-Fu Lee</strong> explains, represents the most ambitious national AI strategy ever conceived, combining state coordination with market forces in unprecedented ways.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30">
                      <h5 className="font-semibold text-yellow-300 text-sm mb-2">📈 Three-Phase Strategy</h5>
                      <ul className="space-y-1 text-xs text-yellow-100">
                        <li>• <strong>2020:</strong> Catch up with global AI leaders (✅ Achieved)</li>
                        <li>• <strong>2025:</strong> Achieve major breakthroughs in AI applications (🔄 In Progress)</li>
                        <li>• <strong>2030:</strong> Become the world's primary AI innovation center (🎯 Target)</li>
                        <li>• <strong>Investment:</strong> $150+ billion in state and private funding</li>
                        <li>• <strong>Research:</strong> 40% of global AI papers by 2024</li>
                        <li>• <strong>Patents:</strong> Leading in AI patent applications globally</li>
                      </ul>
                    </div>

                    <div className="bg-red-800/30 rounded-lg p-4 border border-red-600/30">
                      <h5 className="font-semibold text-red-300 text-sm mb-2">🏢 National AI Champions (2024 Update)</h5>
                      <ul className="space-y-1 text-xs text-red-100">
                        <li>• <strong>Baidu:</strong> ERNIE LLM, Apollo autonomous driving, $13B AI investment</li>
                        <li>• <strong>Alibaba:</strong> Qwen models, cloud AI, "ALL IN AI" strategy 2025</li>
                        <li>• <strong>Tencent:</strong> Hunyuan models, gaming AI, medical imaging</li>
                        <li>• <strong>ByteDance:</strong> Doubao LLM, TikTok AI algorithms</li>
                        <li>• <strong>DeepSeek:</strong> Revolutionary cost-efficient AI models (2025 breakthrough)</li>
                        <li>• <strong>SenseTime:</strong> Computer vision, facial recognition, IPO $8.8B</li>
                      </ul>
                    </div>
                  </div>

                  {/* Kai-Fu Lee's Four Waves Analysis */}
                  <div className="bg-orange-800/30 rounded-lg p-4 border border-orange-600/30">
                    <h5 className="font-semibold text-orange-300 text-sm mb-3">🌊 Kai-Fu Lee's "Four Waves of AI" - China's Advantages</h5>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-orange-100 mb-2"><strong>Wave 1: Internet AI</strong> 🌐</p>
                        <p className="text-xs text-orange-200 mb-2">China's advantage: Massive user base (1.4B), mobile-first adoption, data abundance</p>

                        <p className="text-xs text-orange-100 mb-2"><strong>Wave 2: Business AI</strong> 💼</p>
                        <p className="text-xs text-orange-200">China's advantage: Rapid deployment, less regulation, state coordination</p>
                      </div>
                      <div>
                        <p className="text-xs text-orange-100 mb-2"><strong>Wave 3: Perception AI</strong> 👁️</p>
                        <p className="text-xs text-orange-200 mb-2">China's advantage: Surveillance infrastructure, facial recognition, smart cities</p>

                        <p className="text-xs text-orange-100 mb-2"><strong>Wave 4: Autonomous AI</strong> 🚗</p>
                        <p className="text-xs text-orange-200">China's advantage: Government support, dedicated lanes, data collection</p>
                      </div>
                    </div>
                  </div>

                  {/* DeepSeek Revolution 2025 */}
                  <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                    <h5 className="font-semibold text-purple-300 text-sm mb-3">🚀 The DeepSeek Revolution (2025): Game-Changing Breakthrough</h5>
                    <p className="text-xs text-purple-100 mb-2">
                      In January 2025, Chinese startup <strong>DeepSeek</strong> shocked the AI world by developing competitive AI models at a fraction of the cost of US counterparts, demonstrating that China can achieve AI leadership through efficiency rather than just scale.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-purple-200 mb-1"><strong>Cost Efficiency:</strong> 53x cheaper than OpenAI models</p>
                        <p className="text-xs text-purple-200 mb-1"><strong>Performance:</strong> Competitive with GPT-4 and Claude</p>
                        <p className="text-xs text-purple-200"><strong>Innovation:</strong> Novel training techniques, optimized architectures</p>
                      </div>
                      <div>
                        <p className="text-xs text-purple-200 mb-1"><strong>Impact:</strong> NVIDIA stock dropped 17% in one day</p>
                        <p className="text-xs text-purple-200 mb-1"><strong>Strategy:</strong> Turning US chip restrictions into advantage</p>
                        <p className="text-xs text-purple-200"><strong>Signal:</strong> China's AI independence accelerating</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Dark Side: Surveillance State */}
              <div className="bg-gradient-to-r from-gray-900/50 to-red-900/50 rounded-lg p-6 border border-red-800/50">
                <h4 className="text-lg sm:text-xl font-bold text-red-400 mb-4">👁️ The Dark Side: AI-Powered Authoritarianism</h4>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-red-100 leading-relaxed">
                    China's AI development has a sinister side: the creation of the world's most sophisticated surveillance state. The Chinese government uses AI to monitor, control, and oppress its own citizens, particularly ethnic minorities.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-red-900/40 rounded-lg p-4 border border-red-700/50">
                      <h5 className="font-semibold text-red-300 text-sm mb-2">🔍 Social Credit System</h5>
                      <p className="text-xs text-red-100 mb-2">
                        AI-powered system that scores citizens based on behavior, restricting travel, education, and employment for "untrustworthy" individuals.
                      </p>
                      <ul className="space-y-1 text-xs text-red-200">
                        <li>• 200+ million cameras with facial recognition</li>
                        <li>• Real-time behavior monitoring and scoring</li>
                        <li>• Punishment for "social infractions"</li>
                      </ul>
                    </div>

                    <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                      <h5 className="font-semibold text-gray-300 text-sm mb-2">⚠️ Xinjiang Surveillance</h5>
                      <p className="text-xs text-gray-100 mb-2">
                        AI systems specifically designed to target and oppress Uyghur Muslims and other ethnic minorities in Xinjiang province.
                      </p>
                      <ul className="space-y-1 text-xs text-gray-200">
                        <li>• Ethnic profiling algorithms</li>
                        <li>• Mass detention based on AI predictions</li>
                        <li>• Cultural and religious suppression</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* US Response: Export Controls & National Security */}
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-6 border border-blue-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-4">🛡️ America Fights Back: The Chip War & Silicon Valley's Response</h4>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                    The United States has launched the most comprehensive technology export control regime since the Cold War, as documented by <strong className="text-blue-300">David Sanger</strong> in <em>"The Perfect Weapon"</em> and <em>"New Cold Wars"</em>. This represents a fundamental shift from economic integration to strategic competition, with AI at the center of national security policy.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                      <h5 className="font-semibold text-blue-300 text-sm mb-2">🚫 Export Controls Evolution (2022-2025)</h5>
                      <ul className="space-y-1 text-xs text-blue-100">
                        <li>• <strong>October 2022:</strong> Initial semiconductor controls, NVIDIA H100/A100 banned</li>
                        <li>• <strong>2023:</strong> Expanded to include more chip types, cloud services</li>
                        <li>• <strong>2024:</strong> Allied coordination with Netherlands (ASML), Japan</li>
                        <li>• <strong>January 2025:</strong> AI Diffusion Framework - country caps on AI chips</li>
                        <li>• <strong>May 2025:</strong> Biden-era rules rescinded, new Trump approach</li>
                        <li>• <strong>Entity List:</strong> 200+ Chinese AI companies blacklisted</li>
                        <li>• <strong>Software Controls:</strong> EDA tools, chip design software restricted</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-2">🤝 Democratic AI Alliance Building</h5>
                      <ul className="space-y-1 text-xs text-indigo-100">
                        <li>• <strong>CHIPS Act (2022):</strong> $52B for US semiconductor manufacturing</li>
                        <li>• <strong>AUKUS Partnership:</strong> AI cooperation with UK, Australia</li>
                        <li>• <strong>Japan Alliance:</strong> Joint semiconductor research, export controls</li>
                        <li>• <strong>Netherlands Coordination:</strong> ASML lithography restrictions</li>
                        <li>• <strong>NATO AI Strategy:</strong> Article 5 extended to cyber/AI attacks</li>
                        <li>• <strong>G7 AI Principles:</strong> Democratic values in AI development</li>
                        <li>• <strong>EU-US Tech Council:</strong> Coordinated AI governance</li>
                      </ul>
                    </div>
                  </div>

                  {/* Silicon Valley's AI Dominance */}
                  <div className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30">
                    <h5 className="font-semibold text-cyan-300 text-sm mb-3">🏛️ Silicon Valley: The AI Innovation Engine</h5>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-cyan-100 mb-2"><strong>OpenAI Revolution:</strong></p>
                        <ul className="space-y-1 text-xs text-cyan-200">
                          <li>• ChatGPT: 100M users in 2 months (2022)</li>
                          <li>• $13B Microsoft partnership</li>
                          <li>• GPT-4, o3 models leading globally</li>
                          <li>• $157B valuation (2025)</li>
                        </ul>

                        <p className="text-xs text-cyan-100 mb-2 mt-3"><strong>Google DeepMind:</strong></p>
                        <ul className="space-y-1 text-xs text-cyan-200">
                          <li>• Gemini models competitive with GPT</li>
                          <li>• AlphaFold protein folding breakthrough</li>
                          <li>• $100B+ AI investment commitment</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-cyan-100 mb-2"><strong>Anthropic & Meta:</strong></p>
                        <ul className="space-y-1 text-xs text-cyan-200">
                          <li>• Claude models: Constitutional AI approach</li>
                          <li>• $4B Amazon investment in Anthropic</li>
                          <li>• Meta's Llama: Open-source strategy</li>
                          <li>• $65B Meta AI infrastructure investment</li>
                        </ul>

                        <p className="text-xs text-cyan-100 mb-2 mt-3"><strong>NVIDIA Dominance:</strong></p>
                        <ul className="space-y-1 text-xs text-cyan-200">
                          <li>• 90%+ AI chip market share</li>
                          <li>• $2T+ market capitalization</li>
                          <li>• H100 chips: $40K each, 6-month wait</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* The DeepSeek Challenge */}
                  <div className="bg-red-800/30 rounded-lg p-4 border border-red-600/30">
                    <h5 className="font-semibold text-red-300 text-sm mb-3">⚠️ The DeepSeek Wake-Up Call (January 2025)</h5>
                    <p className="text-xs text-red-100 mb-2">
                      DeepSeek's breakthrough exposed vulnerabilities in the US strategy, showing that export controls may accelerate rather than prevent Chinese AI innovation.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-red-200 mb-1"><strong>Market Impact:</strong></p>
                        <ul className="space-y-1 text-xs text-red-200">
                          <li>• NVIDIA stock dropped 17% ($600B loss)</li>
                          <li>• Questions about AI infrastructure spending</li>
                          <li>• Rethinking of export control effectiveness</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-red-200 mb-1"><strong>Strategic Implications:</strong></p>
                        <ul className="space-y-1 text-xs text-red-200">
                          <li>• China achieving AI leadership through efficiency</li>
                          <li>• US advantage in raw compute challenged</li>
                          <li>• Need for new competitive strategies</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Current Battlefield */}
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-4">⚡ The Current Battlefield: 2024-2025</h4>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                      <h5 className="font-semibold text-purple-300 text-sm mb-2">🧠 Large Language Models</h5>
                      <p className="text-xs text-purple-100 mb-2"><strong>US Leaders:</strong></p>
                      <ul className="space-y-1 text-xs text-purple-200">
                        <li>• OpenAI GPT-4, o3</li>
                        <li>• Anthropic Claude</li>
                        <li>• Google Gemini</li>
                      </ul>
                      <p className="text-xs text-purple-100 mb-2 mt-2"><strong>China Response:</strong></p>
                      <ul className="space-y-1 text-xs text-purple-200">
                        <li>• Baidu ERNIE</li>
                        <li>• Alibaba Qwen</li>
                        <li>• DeepSeek models</li>
                      </ul>
                    </div>

                    <div className="bg-pink-800/30 rounded-lg p-4 border border-pink-600/30">
                      <h5 className="font-semibold text-pink-300 text-sm mb-2">🔬 AI Research</h5>
                      <p className="text-xs text-pink-100 mb-2"><strong>Publication Race:</strong></p>
                      <ul className="space-y-1 text-xs text-pink-200">
                        <li>• China: 40% of AI papers globally</li>
                        <li>• US: 35% of AI papers globally</li>
                        <li>• Quality vs Quantity debate</li>
                      </ul>
                      <p className="text-xs text-pink-100 mb-2 mt-2"><strong>Talent War:</strong></p>
                      <ul className="space-y-1 text-xs text-pink-200">
                        <li>• Brain drain from China to US</li>
                        <li>• Visa restrictions impact</li>
                        <li>• Competing for top researchers</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-2">💰 Investment & Funding</h5>
                      <p className="text-xs text-indigo-100 mb-2"><strong>US Private Investment:</strong></p>
                      <ul className="space-y-1 text-xs text-indigo-200">
                        <li>• $50+ billion in AI startups</li>
                        <li>• OpenAI: $13 billion from Microsoft</li>
                        <li>• Venture capital dominance</li>
                      </ul>
                      <p className="text-xs text-indigo-100 mb-2 mt-2"><strong>China State Investment:</strong></p>
                      <ul className="space-y-1 text-xs text-indigo-200">
                        <li>• $150 billion national AI plan</li>
                        <li>• State-backed AI funds</li>
                        <li>• Coordinated industrial policy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* What This Means for the World */}
              <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-6 border border-green-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-4">🌍 What This Means for the World</h4>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-green-100 leading-relaxed">
                    The outcome of this AI race will determine whether the future is shaped by democratic values of freedom, privacy, and human rights, or by authoritarian control, surveillance, and oppression.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-green-800/30 rounded-lg p-4 border border-green-600/30">
                      <h5 className="font-semibold text-green-300 text-sm mb-2">🕊️ Democratic AI Future</h5>
                      <ul className="space-y-1 text-xs text-green-100">
                        <li>• AI that respects human rights and privacy</li>
                        <li>• Transparent, accountable AI systems</li>
                        <li>• AI that empowers individuals and communities</li>
                        <li>• Global cooperation on AI safety and ethics</li>
                        <li>• AI that reduces inequality and promotes freedom</li>
                      </ul>
                    </div>

                    <div className="bg-teal-800/30 rounded-lg p-4 border border-teal-600/30">
                      <h5 className="font-semibold text-teal-300 text-sm mb-2">⚠️ Authoritarian AI Future</h5>
                      <ul className="space-y-1 text-xs text-teal-100">
                        <li>• AI-powered surveillance and social control</li>
                        <li>• Suppression of dissent and free speech</li>
                        <li>• AI that serves state power over individual rights</li>
                        <li>• Export of authoritarian AI technologies globally</li>
                        <li>• AI that increases inequality and oppression</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Trends Reports */}
              <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-lg p-6 border border-amber-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-amber-300 mb-4">📊 Essential Reading: AI Trends & Decision Reports</h4>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
                    Stay ahead with the most comprehensive analysis of AI trends, competition, and strategic implications from leading technology analysts and industry experts.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Mary Meeker Report */}
                    <div className="bg-amber-800/30 rounded-lg p-4 border border-amber-600/30">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h5 className="font-semibold text-amber-300 text-sm">Mary Meeker's AI Trends</h5>
                      </div>
                      <p className="text-xs text-amber-100 mb-3 leading-relaxed">
                        Comprehensive analysis of AI investment trends, competitive dynamics, and future predictions from one of the world's top technology analysts.
                      </p>
                      <a
                        href="https://www.bondcap.com/report/tai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm w-full justify-center"
                      >
                        📈 Read Full Report
                      </a>
                    </div>

                    {/* Microsoft AI Decision Brief */}
                    <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
                          <img
                            src="https://www.microsoft.com/favicon.ico"
                            alt="Microsoft"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjExIiBoZWlnaHQ9IjExIiBmaWxsPSIjRjI1MDIyIi8+CjxyZWN0IHg9IjEzIiB3aWR0aD0iMTEiIGhlaWdodD0iMTEiIGZpbGw9IiM3RkJBMDAiLz4KPHJlY3QgeT0iMTMiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgZmlsbD0iIzAwQTRFRiIvPgo8cmVjdCB4PSIxMyIgeT0iMTMiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgZmlsbD0iI0ZGQjkwMCIvPgo8L3N2Zz4K';
                            }}
                          />
                        </div>
                        <h5 className="font-semibold text-blue-300 text-sm">Microsoft AI Decision Brief</h5>
                      </div>
                      <p className="text-xs text-blue-100 mb-3 leading-relaxed">
                        Strategic insights and decision-making guidance for AI adoption in business. Microsoft's expert analysis on AI implementation, ROI, and enterprise transformation.
                      </p>
                      <a
                        href="https://info.microsoft.com/ww-landing-ai-decision-brief.html?lcid=en-us"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm w-full justify-center"
                      >
                        🧭 Get Decision Brief
                      </a>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-800/30 to-amber-800/30 rounded-lg p-4 border border-yellow-600/30">
                    <p className="text-xs text-yellow-100 text-center">
                      💡 <strong>Pro Tip:</strong> Read both reports for comprehensive insights - Mary Meeker for market trends and Microsoft for strategic implementation guidance!
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-6 border border-cyan-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-cyan-300 mb-4">🎯 Your Role in the AI Future</h4>
                <p className="text-sm sm:text-base text-cyan-100 leading-relaxed mb-4">
                  As the next generation, you have the power to shape how AI develops and is used. Whether you become an AI researcher, policymaker, entrepreneur, or informed citizen, your voice matters in determining whether AI serves humanity or controls it.
                </p>
                <div className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30">
                  <h5 className="font-semibold text-cyan-300 text-sm mb-2">💡 How You Can Make a Difference</h5>
                  <ul className="space-y-1 text-xs text-cyan-100">
                    <li>• <strong>Learn AI:</strong> Understand the technology to participate in its governance</li>
                    <li>• <strong>Advocate for Ethics:</strong> Support AI that respects human rights and dignity</li>
                    <li>• <strong>Stay Informed:</strong> Follow AI developments and their societal implications</li>
                    <li>• <strong>Choose Wisely:</strong> Support companies and technologies that align with your values</li>
                    <li>• <strong>Engage Politically:</strong> Vote for leaders who understand AI's importance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Career Guide Video 3 */}
        <AIVideo
          src="https://www.youtube.com/embed/_buMdqF7o-A"
          title="🎯 AI Engineer Roadmap 2025: Step-by-Step Guide"
          description="Complete step-by-step guide to master AI engineering"
          icon={<Target size={20} className="text-white" />}
          gradient="from-purple-900 to-indigo-800"
          note="🎯 Roadmap Guide: Latest 2025 comprehensive step-by-step path to becoming an AI engineer with practical advice!"
        />

        {/* Start Your Journey - Edge to Edge */}
        <section className="w-full bg-cyan-900 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Rocket size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Start Your AI Journey Today! 🚀</h3>
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-cyan-100 leading-relaxed text-center">
                Ready to become an AI wizard? 🧙‍♂️ Here are the best free resources to start your incredible journey into artificial intelligence!
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-blue-800/30 rounded-lg p-4 text-center border border-blue-600/30">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Code size={20} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-blue-300 mb-3">Learn Programming 💻</h4>
                  <ul className="space-y-1 text-xs text-blue-100 text-left">
                    <li>• <strong>Python.org:</strong> Official Python tutorial</li>
                    <li>• <strong>Codecademy:</strong> Interactive coding</li>
                    <li>• <strong>freeCodeCamp:</strong> Full bootcamp</li>
                    <li>• <strong>Scratch:</strong> Visual programming</li>
                  </ul>
                </div>

                <div className="bg-green-800/30 rounded-lg p-4 text-center border border-green-600/30">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Brain size={20} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-green-300 mb-3">AI & ML Courses 🧠</h4>
                  <ul className="space-y-1 text-xs text-green-100 text-left">
                    <li>• <strong>Coursera:</strong> University courses</li>
                    <li>• <strong>edX:</strong> MIT & Harvard classes</li>
                    <li>• <strong>Udacity:</strong> AI nanodegrees</li>
                    <li>• <strong>Fast.ai:</strong> Practical deep learning</li>
                  </ul>
                </div>

                <div className="bg-purple-800/30 rounded-lg p-4 text-center border border-purple-600/30">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calculator size={20} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-purple-300 mb-3">Math Made Fun 📊</h4>
                  <ul className="space-y-1 text-xs text-purple-100 text-left">
                    <li>• <strong>Khan Academy:</strong> Statistics & probability</li>
                    <li>• <strong>3Blue1Brown:</strong> Beautiful math videos</li>
                    <li>• <strong>PatrickJMT:</strong> Math tutorials</li>
                    <li>• <strong>Professor Leonard:</strong> Calculus</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-yellow-300 mb-4 text-center">🎯 Your 30-Day AI Challenge</h4>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-sm">1</div>
                    <h5 className="font-semibold text-white text-sm mb-1">Week 1</h5>
                    <p className="text-xs text-yellow-100">Learn Python basics & have fun coding!</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-sm">2</div>
                    <h5 className="font-semibold text-white text-sm mb-1">Week 2</h5>
                    <p className="text-xs text-yellow-100">Watch AI videos & start online course</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-sm">3</div>
                    <h5 className="font-semibold text-white text-sm mb-1">Week 3</h5>
                    <p className="text-xs text-yellow-100">Build your first AI project!</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-sm">4</div>
                    <h5 className="font-semibold text-white text-sm mb-1">Week 4</h5>
                    <p className="text-xs text-yellow-100">Share your work & celebrate! 🎉</p>
                  </div>
                </div>
              </div>

              {/* Top AI Substack Publications */}
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-700/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Top AI Newsletters 🤖</h3>
                </div>

                <div className="space-y-6">
                  {/* Overview */}
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/30">
                    <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                      <strong className="text-purple-300">Stay ahead in AI!</strong> These are the highest-rated AI newsletters trusted by professionals, researchers, and enthusiasts worldwide. 🚀✨
                    </p>
                  </div>

                  {/* Top Tier AI Newsletters */}
                  <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-6 border border-blue-700/30">
                    <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                      🏆 Top Tier AI Newsletters
                    </h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <a href="https://www.therundown.ai/" target="_blank" rel="noopener noreferrer" className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30 hover:border-blue-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-blue-300 text-sm mb-2 group-hover:text-blue-200">The Rundown AI</h5>
                        <p className="text-xs text-blue-100 mb-2">by Rowan Cheung</p>
                        <p className="text-xs text-blue-100">Daily AI news and insights for professionals</p>
                      </a>

                      <a href="https://bensbites.beehiiv.com/" target="_blank" rel="noopener noreferrer" className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30 hover:border-cyan-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-cyan-300 text-sm mb-2 group-hover:text-cyan-200">Ben's Bites</h5>
                        <p className="text-xs text-cyan-100 mb-2">by Ben Tossell</p>
                        <p className="text-xs text-cyan-100">Daily AI news with a fun, accessible approach</p>
                      </a>

                      <a href="https://www.theneuron.ai/" target="_blank" rel="noopener noreferrer" className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30 hover:border-indigo-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-indigo-300 text-sm mb-2 group-hover:text-indigo-200">The Neuron</h5>
                        <p className="text-xs text-indigo-100 mb-2">by Pete Huang</p>
                        <p className="text-xs text-indigo-100">Curated AI news without information overload</p>
                      </a>

                      <a href="https://www.superhuman.ai/" target="_blank" rel="noopener noreferrer" className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30 hover:border-purple-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-purple-300 text-sm mb-2 group-hover:text-purple-200">Superhuman AI</h5>
                        <p className="text-xs text-purple-100 mb-2">by Zain Kahn</p>
                        <p className="text-xs text-purple-100">AI tools and productivity insights</p>
                      </a>

                      <a href="https://tldr.tech/ai" target="_blank" rel="noopener noreferrer" className="bg-teal-800/30 rounded-lg p-4 border border-teal-600/30 hover:border-teal-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-teal-300 text-sm mb-2 group-hover:text-teal-200">TLDR AI</h5>
                        <p className="text-xs text-teal-100 mb-2">by TLDR Team</p>
                        <p className="text-xs text-teal-100">Concise AI news and research summaries</p>
                      </a>

                      <a href="https://www.deeplearning.ai/the-batch/" target="_blank" rel="noopener noreferrer" className="bg-red-800/30 rounded-lg p-4 border border-red-600/30 hover:border-red-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-red-300 text-sm mb-2 group-hover:text-red-200">The Batch</h5>
                        <p className="text-xs text-red-100 mb-2">by Andrew Ng</p>
                        <p className="text-xs text-red-100">Weekly AI insights from DeepLearning.AI</p>
                      </a>
                    </div>
                  </div>

                  {/* Research & Technical AI Publications */}
                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-6 border border-green-700/30">
                    <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                      🔬 Research & Technical AI
                    </h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <a href="https://import.ai/" target="_blank" rel="noopener noreferrer" className="bg-green-800/30 rounded-lg p-4 border border-green-600/30 hover:border-green-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-green-300 text-sm mb-2 group-hover:text-green-200">Import AI</h5>
                        <p className="text-xs text-green-100 mb-2">by Jack Clark</p>
                        <p className="text-xs text-green-100">In-depth AI research analysis and policy</p>
                      </a>

                      <a href="https://artificialintelligencemadesimple.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-emerald-800/30 rounded-lg p-4 border border-emerald-600/30 hover:border-emerald-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-emerald-300 text-sm mb-2 group-hover:text-emerald-200">AI Made Simple</h5>
                        <p className="text-xs text-emerald-100 mb-2">by Devansh</p>
                        <p className="text-xs text-emerald-100">Complex AI concepts explained simply</p>
                      </a>

                      <a href="https://cameronrwolfe.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-teal-800/30 rounded-lg p-4 border border-teal-600/30 hover:border-teal-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-teal-300 text-sm mb-2 group-hover:text-teal-200">Deep Learning Focus</h5>
                        <p className="text-xs text-teal-100 mb-2">by Cameron Wolfe</p>
                        <p className="text-xs text-teal-100">Deep learning research and applications</p>
                      </a>

                      <a href="https://supervised.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30 hover:border-cyan-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-cyan-300 text-sm mb-2 group-hover:text-cyan-200">Supervised</h5>
                        <p className="text-xs text-cyan-100 mb-2">by Matthew Lynley</p>
                        <p className="text-xs text-cyan-100">AI, ML, and analytics industry coverage</p>
                      </a>

                      <a href="https://www.aisnakeoil.com/" target="_blank" rel="noopener noreferrer" className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30 hover:border-blue-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-blue-300 text-sm mb-2 group-hover:text-blue-200">AI Snake Oil</h5>
                        <p className="text-xs text-blue-100 mb-2">by Arvind Narayanan</p>
                        <p className="text-xs text-blue-100">Critical analysis of AI hype and reality</p>
                      </a>

                      <a href="https://www.latent.space/" target="_blank" rel="noopener noreferrer" className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30 hover:border-indigo-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-indigo-300 text-sm mb-2 group-hover:text-indigo-200">Latent Space</h5>
                        <p className="text-xs text-indigo-100 mb-2">by Swyx & Alessio</p>
                        <p className="text-xs text-indigo-100">AI engineering and developer insights</p>
                      </a>
                    </div>
                  </div>

                  {/* Business & Industry AI Publications */}
                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border border-yellow-700/30">
                    <h4 className="text-lg sm:text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                      💼 Business & Industry AI
                    </h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <a href="https://aibreakfast.beehiiv.com/" target="_blank" rel="noopener noreferrer" className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30 hover:border-yellow-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-yellow-300 text-sm mb-2 group-hover:text-yellow-200">AI Breakfast</h5>
                        <p className="text-xs text-yellow-100 mb-2">by Neil Reddy</p>
                        <p className="text-xs text-yellow-100">Daily AI business news and trends</p>
                      </a>

                      <a href="https://mindstream.news/" target="_blank" rel="noopener noreferrer" className="bg-orange-800/30 rounded-lg p-4 border border-orange-600/30 hover:border-orange-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-orange-300 text-sm mb-2 group-hover:text-orange-200">Mindstream</h5>
                        <p className="text-xs text-orange-100 mb-2">by Mindstream Team</p>
                        <p className="text-xs text-orange-100">AI industry analysis and investment insights</p>
                      </a>

                      <a href="https://www.aisupremacy.com/" target="_blank" rel="noopener noreferrer" className="bg-red-800/30 rounded-lg p-4 border border-red-600/30 hover:border-red-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-red-300 text-sm mb-2 group-hover:text-red-200">AI Supremacy</h5>
                        <p className="text-xs text-red-100 mb-2">by Michael Spencer</p>
                        <p className="text-xs text-red-100">AI industry trends and future predictions</p>
                      </a>

                      <a href="https://www.exponentialview.co/" target="_blank" rel="noopener noreferrer" className="bg-pink-800/30 rounded-lg p-4 border border-pink-600/30 hover:border-pink-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-pink-300 text-sm mb-2 group-hover:text-pink-200">Exponential View</h5>
                        <p className="text-xs text-pink-100 mb-2">by Azeem Azhar</p>
                        <p className="text-xs text-pink-100">Technology's impact on society and business</p>
                      </a>

                      <a href="https://www.thealgorithm.io/" target="_blank" rel="noopener noreferrer" className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30 hover:border-purple-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-purple-300 text-sm mb-2 group-hover:text-purple-200">The Algorithm</h5>
                        <p className="text-xs text-purple-100 mb-2">by MIT Technology Review</p>
                        <p className="text-xs text-purple-100">Weekly AI news from MIT Tech Review</p>
                      </a>

                      <a href="https://www.chinai.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30 hover:border-indigo-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-indigo-300 text-sm mb-2 group-hover:text-indigo-200">ChinAI Newsletter</h5>
                        <p className="text-xs text-indigo-100 mb-2">by Jeffrey Ding</p>
                        <p className="text-xs text-indigo-100">China's AI developments and policy</p>
                      </a>
                    </div>
                  </div>

                  {/* AI Tools & Practical Applications */}
                  <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-6 border border-cyan-700/30">
                    <h4 className="text-lg sm:text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                      🛠️ AI Tools & Applications
                    </h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <a href="https://www.futuretools.io/" target="_blank" rel="noopener noreferrer" className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30 hover:border-cyan-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-cyan-300 text-sm mb-2 group-hover:text-cyan-200">Future Tools</h5>
                        <p className="text-xs text-cyan-100 mb-2">by Matt Wolfe</p>
                        <p className="text-xs text-cyan-100">Latest AI tools and practical applications</p>
                      </a>

                      <a href="https://www.aitidbits.ai/" target="_blank" rel="noopener noreferrer" className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30 hover:border-blue-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-blue-300 text-sm mb-2 group-hover:text-blue-200">AI Tidbits</h5>
                        <p className="text-xs text-blue-100 mb-2">by Rohan Chaubey</p>
                        <p className="text-xs text-blue-100">Practical AI tips and tool reviews</p>
                      </a>

                      <a href="https://www.aiadvantage.beehiiv.com/" target="_blank" rel="noopener noreferrer" className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30 hover:border-indigo-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-indigo-300 text-sm mb-2 group-hover:text-indigo-200">AI Advantage</h5>
                        <p className="text-xs text-indigo-100 mb-2">by AI Advantage Team</p>
                        <p className="text-xs text-indigo-100">AI productivity and business applications</p>
                      </a>

                      <a href="https://www.airesearch.co/" target="_blank" rel="noopener noreferrer" className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30 hover:border-purple-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-purple-300 text-sm mb-2 group-hover:text-purple-200">AI Research</h5>
                        <p className="text-xs text-purple-100 mb-2">by AI Research Team</p>
                        <p className="text-xs text-purple-100">Weekly AI research paper summaries</p>
                      </a>

                      <a href="https://www.aiethics.substack.com/" target="_blank" rel="noopener noreferrer" className="bg-teal-800/30 rounded-lg p-4 border border-teal-600/30 hover:border-teal-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-teal-300 text-sm mb-2 group-hover:text-teal-200">AI Ethics Brief</h5>
                        <p className="text-xs text-teal-100 mb-2">by AI Ethics Team</p>
                        <p className="text-xs text-teal-100">Ethical considerations in AI development</p>
                      </a>

                      <a href="https://www.machinelearnings.co/" target="_blank" rel="noopener noreferrer" className="bg-green-800/30 rounded-lg p-4 border border-green-600/30 hover:border-green-400/50 transition-all duration-300 group">
                        <h5 className="font-semibold text-green-300 text-sm mb-2 group-hover:text-green-200">Machine Learnings</h5>
                        <p className="text-xs text-green-100 mb-2">by Charlie Guo</p>
                        <p className="text-xs text-green-100">ML engineering and practical insights</p>
                      </a>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-6 border border-green-700/30">
                    <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                      📖 Start Your AI Learning Journey Today!
                    </h4>
                    <p className="text-sm sm:text-base text-green-100 leading-relaxed mb-4">
                      These top-rated AI newsletters will keep you at the forefront of artificial intelligence developments. Subscribe to stay informed about the latest breakthroughs, tools, and opportunities! 🌟
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="https://www.therundown.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl hover:from-green-300 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-green-400/25 hover:scale-105 text-sm sm:text-base"
                      >
                        <span>Start with The Rundown AI</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <a
                        href="/ai"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base"
                      >
                        <span>Back to AI Learning</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google AI Experiments Section */}
              <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-6 border border-orange-700/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center p-1">
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyLjU2IDEyLjI1QzIyLjU2IDExLjQ3IDIyLjQ5IDEwLjcyIDIyLjM2IDEwSDEyVjE0LjI2SDE3LjkyQzE3LjY2IDE1LjYgMTYuOTIgMTYuNzQgMTUuODQgMTcuNVYyMC4yNkgxOS4zNkMyMS4wOSAxOC42MyAyMi41NiAxNS42NyAyMi41NiAxMi4yNVoiIGZpbGw9IiM0Mjg1RjQiLz4KPHBhdGggZD0iTTEyIDI0QzE1LjI0IDI0IDE3LjkyIDIyLjkyIDE5LjM2IDIwLjI2TDE1Ljg0IDE3LjVDMTQuNzYgMTguMjQgMTMuNDYgMTguNzIgMTIgMTguNzJDOC44NyAxOC43MiA2LjIyIDE3LjA5IDUuMjcgMTQuNjZIMi4xOFYxNy40MkMzLjYxIDIwLjI1IDcuNTYgMjQgMTIgMjRaIiBmaWxsPSIjMzRBODUzIi8+CjxwYXRoIGQ9Ik01LjI3IDE0LjY2QzUuMDIgMTMuOTIgNC44OCAxMy4xMyA0Ljg4IDEyLjI1QzQuODggMTEuMzcgNS4wMiAxMC41OCA1LjI3IDkuODRWNy4wOEgyLjE4QzEuNDMgOC41NSAxIDEwLjMzIDEgMTIuMjVDMSAxNC4xNyAxLjQzIDE1Ljk1IDIuMTggMTcuNDJMNS4yNyAxNC42NloiIGZpbGw9IiNGQkJDMDQiLz4KPHBhdGggZD0iTTEyIDUuNzhDMTMuNjIgNS43OCAxNS4wNiA2LjM0IDE2LjE5IDcuNDJMMTkuMzYgNC4yNkMxNy45MiAyLjkyIDE1LjI0IDIgMTIgMkM3LjU2IDIgMy42MSA1Ljc1IDIuMTggNy4wOEw1LjI3IDkuODRDNi4yMiA3LjQxIDguODcgNS43OCAxMiA1Ljc4WiIgZmlsbD0iI0VBNDMzNSIvPgo8L3N2Zz4K';
                      }}
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Google AI Experiments 🧪</h3>
                </div>

                <div className="space-y-4">
                  {/* Overview */}
                  <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-700/30">
                    <p className="text-sm sm:text-base text-orange-100 leading-relaxed">
                      <strong className="text-orange-300">Explore Google's Cutting-Edge AI Experiments!</strong> Discover interactive demos, prototypes, and experimental AI tools created by Google's research teams. Experience the future of AI through hands-on experimentation and learning. 🚀✨
                    </p>
                  </div>

                  {/* Google AI Experiments Card */}
                  <div className="bg-gradient-to-r from-orange-800/30 to-red-800/30 rounded-lg p-6 border border-orange-600/30">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2">
                          <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google AI Experiments"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyLjU2IDEyLjI1QzIyLjU2IDExLjQ3IDIyLjQ5IDEwLjcyIDIyLjM2IDEwSDEyVjE0LjI2SDE3LjkyQzE3LjY2IDE1LjYgMTYuOTIgMTYuNzQgMTUuODQgMTcuNVYyMC4yNkgxOS4zNkMyMS4wOSAxOC42MyAyMi41NiAxNS42NyAyMi41NiAxMi4yNVoiIGZpbGw9IiM0Mjg1RjQiLz4KPHBhdGggZD0iTTEyIDI0QzE1LjI0IDI0IDE3LjkyIDIyLjkyIDE5LjM2IDIwLjI2TDE1Ljg0IDE3LjVDMTQuNzYgMTguMjQgMTMuNDYgMTguNzIgMTIgMTguNzJDOC44NyAxOC43MiA2LjIyIDE3LjA5IDUuMjcgMTQuNjZIMi4xOFYxNy40MkMzLjYxIDIwLjI1IDcuNTYgMjQgMTIgMjRaIiBmaWxsPSIjMzRBODUzIi8+CjxwYXRoIGQ9Ik01LjI3IDE0LjY2QzUuMDIgMTMuOTIgNC44OCAxMy4xMyA0Ljg4IDEyLjI1QzQuODggMTEuMzcgNS4wMiAxMC41OCA1LjI3IDkuODRWNy4wOEgyLjE4QzEuNDMgOC41NSAxIDEwLjMzIDEgMTIuMjVDMSAxNC4xNyAxLjQzIDE1Ljk1IDIuMTggMTcuNDJMNS4yNyAxNC42NloiIGZpbGw9IiNGQkJDMDQiLz4KPHBhdGggZD0iTTEyIDUuNzhDMTMuNjIgNS43OCAxNS4wNiA2LjM0IDE2LjE5IDcuNDJMMTkuMzYgNC4yNkMxNy45MiAyLjkyIDE1LjI0IDIgMTIgMkM3LjU2IDIgMy42MSA1Ljc1IDIuMTggNy4wOEw1LjI3IDkuODRDNi4yMiA3LjQxIDguODcgNS43OCAxMiA1Ljc4WiIgZmlsbD0iI0VBNDMzNSIvPgo8L3N2Zz4K';
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-bold text-orange-300 mb-2">Google Labs: AI Experiments Platform</h4>
                        <p className="text-sm sm:text-base text-orange-100 mb-4 leading-relaxed">
                          Interactive playground featuring Google's latest AI experiments and prototypes. Explore machine learning demos, creative AI tools, and experimental technologies that showcase the future of artificial intelligence through hands-on learning experiences.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          <div className="bg-orange-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-orange-300">🧪 Interactive Demos</div>
                          </div>
                          <div className="bg-red-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-red-300">🎨 Creative AI Tools</div>
                          </div>
                          <div className="bg-pink-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-pink-300">🔬 Research Prototypes</div>
                          </div>
                          <div className="bg-yellow-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-yellow-300">📚 Learning Focused</div>
                          </div>
                        </div>

                        <a
                          href="https://labs.google/experiments/?category=learn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:from-orange-400 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-orange-400/25 hover:scale-105 text-sm sm:text-base"
                        >
                          <span>Explore AI Experiments</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Experiment Categories */}
                  <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-lg p-4 border border-red-700/30">
                    <h5 className="font-semibold text-red-300 text-sm mb-3">🌟 Types of AI Experiments You'll Discover</h5>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-orange-100"><strong>Machine Learning Demos:</strong> Interactive visualizations of ML algorithms and concepts</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-red-100"><strong>Creative AI Tools:</strong> Art generation, music creation, and creative writing assistants</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-pink-100"><strong>Language Models:</strong> Text generation, translation, and natural language processing</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-yellow-100"><strong>Computer Vision:</strong> Image recognition, object detection, and visual AI experiments</p>
                      </div>
                    </div>
                  </div>

                  {/* Learning Benefits */}
                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700/30">
                    <h5 className="font-semibold text-yellow-300 text-sm mb-3">💡 Why Explore Google AI Experiments?</h5>
                    <p className="text-xs text-yellow-100 leading-relaxed">
                      Google AI Experiments provide an unparalleled opportunity to interact with cutting-edge AI technologies before they become mainstream products. By experimenting with these prototypes, students gain hands-on experience with the latest AI research, understand how complex algorithms work in practice, and develop intuition for AI capabilities and limitations. This experiential learning approach makes abstract AI concepts tangible and inspires creative applications of artificial intelligence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Google AI Skills Learning Section */}
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-6 border border-blue-700/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center p-1">
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyLjU2IDEyLjI1QzIyLjU2IDExLjQ3IDIyLjQ5IDEwLjcyIDIyLjM2IDEwSDEyVjE0LjI2SDE3LjkyQzE3LjY2IDE1LjYgMTYuOTIgMTYuNzQgMTUuODQgMTcuNVYyMC4yNkgxOS4zNkMyMS4wOSAxOC42MyAyMi41NiAxNS42NyAyMi41NiAxMi4yNVoiIGZpbGw9IiM0Mjg1RjQiLz4KPHBhdGggZD0iTTEyIDI0QzE1LjI0IDI0IDE3LjkyIDIyLjkyIDE5LjM2IDIwLjI2TDE1Ljg0IDE3LjVDMTQuNzYgMTguMjQgMTMuNDYgMTguNzIgMTIgMTguNzJDOC44NyAxOC43MiA2LjIyIDE3LjA5IDUuMjcgMTQuNjZIMi4xOFYxNy40MkMzLjYxIDIwLjI1IDcuNTYgMjQgMTIgMjRaIiBmaWxsPSIjMzRBODUzIi8+CjxwYXRoIGQ9Ik01LjI3IDE0LjY2QzUuMDIgMTMuOTIgNC44OCAxMy4xMyA0Ljg4IDEyLjI1QzQuODggMTEuMzcgNS4wMiAxMC41OCA1LjI3IDkuODRWNy4wOEgyLjE4QzEuNDMgOC41NSAxIDEwLjMzIDEgMTIuMjVDMSAxNC4xNyAxLjQzIDE1Ljk1IDIuMTggMTcuNDJMNS4yNyAxNC42NloiIGZpbGw9IiNGQkJDMDQiLz4KPHBhdGggZD0iTTEyIDUuNzhDMTMuNjIgNS43OCAxNS4wNiA2LjM0IDE2LjE5IDcuNDJMMTkuMzYgNC4yNkMxNy45MiAyLjkyIDE1LjI0IDIgMTIgMkM3LjU2IDIgMy42MSA1Ljc1IDIuMTggNy4wOEw1LjI3IDkuODRDNi4yMiA3LjQxIDguODcgNS43OCAxMiA1Ljc4WiIgZmlsbD0iI0VBNDMzNSIvPgo8L3N2Zz4K';
                      }}
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Learn AI Skills with Google 🎓</h3>
                </div>

                <div className="space-y-4">
                  {/* Overview */}
                  <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
                    <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                      <strong className="text-blue-300">Master AI with Google's Official Training!</strong> Access comprehensive AI courses, certifications, and hands-on learning experiences designed by Google's AI experts. 🚀✨
                    </p>
                  </div>

                  {/* Google AI Skills Card */}
                  <div className="bg-gradient-to-r from-blue-800/30 to-indigo-800/30 rounded-lg p-6 border border-blue-600/30">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2">
                          <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google AI"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyLjU2IDEyLjI1QzIyLjU2IDExLjQ3IDIyLjQ5IDEwLjcyIDIyLjM2IDEwSDEyVjE0LjI2SDE3LjkyQzE3LjY2IDE1LjYgMTYuOTIgMTYuNzQgMTUuODQgMTcuNVYyMC4yNkgxOS4zNkMyMS4wOSAxOC42MyAyMi41NiAxNS42NyAyMi41NiAxMi4yNVoiIGZpbGw9IiM0Mjg1RjQiLz4KPHBhdGggZD0iTTEyIDI0QzE1LjI0IDI0IDE3LjkyIDIyLjkyIDE5LjM2IDIwLjI2TDE1Ljg0IDE3LjVDMTQuNzYgMTguMjQgMTMuNDYgMTguNzIgMTIgMTguNzJDOC44NyAxOC43MiA2LjIyIDE3LjA5IDUuMjcgMTQuNjZIMi4xOFYxNy40MkMzLjYxIDIwLjI1IDcuNTYgMjQgMTIgMjRaIiBmaWxsPSIjMzRBODUzIi8+CjxwYXRoIGQ9Ik01LjI3IDE0LjY2QzUuMDIgMTMuOTIgNC44OCAxMy4xMyA0Ljg4IDEyLjI1QzQuODggMTEuMzcgNS4wMiAxMC41OCA1LjI3IDkuODRWNy4wOEgyLjE4QzEuNDMgOC41NSAxIDEwLjMzIDEgMTIuMjVDMSAxNC4xNyAxLjQzIDE1Ljk1IDIuMTggMTcuNDJMNS4yNyAxNC42NloiIGZpbGw9IiNGQkJDMDQiLz4KPHBhdGggZD0iTTEyIDUuNzhDMTMuNjIgNS43OCAxNS4wNiA2LjM0IDE2LjE5IDcuNDJMMTkuMzYgNC4yNkMxNy45MiAyLjkyIDE1LjI0IDIgMTIgMkM3LjU2IDIgMy42MSA1Ljc1IDIuMTggNy4wOEw1LjI3IDkuODRDNi4yMiA3LjQxIDguODcgNS43OCAxMiA1Ljc4WiIgZmlsbD0iI0VBNDMzNSIvPgo8L3N2Zz4K';
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-2">Google AI Skills Platform</h4>
                        <p className="text-sm sm:text-base text-blue-100 mb-4 leading-relaxed">
                          Comprehensive AI learning platform featuring courses on machine learning, generative AI, TensorFlow, and more. Learn from Google's AI researchers and engineers with hands-on projects and industry-recognized certifications.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          <div className="bg-blue-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-blue-300">🤖 Machine Learning</div>
                          </div>
                          <div className="bg-indigo-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-indigo-300">✨ Generative AI</div>
                          </div>
                          <div className="bg-purple-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-purple-300">🔧 TensorFlow</div>
                          </div>
                          <div className="bg-cyan-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-cyan-300">📜 Certificates</div>
                          </div>
                        </div>

                        <a
                          href="https://ai.google/learn-ai-skills/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-blue-400/25 hover:scale-105 text-sm sm:text-base"
                        >
                          <span>Start Learning with Google AI</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-4 border border-green-700/30">
                    <h5 className="font-semibold text-green-300 text-sm mb-3">🌟 Why Choose Google AI Skills?</h5>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-green-100"><strong>Expert-Led:</strong> Learn from Google's AI pioneers and researchers</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-blue-100"><strong>Hands-On:</strong> Real projects with Google's AI tools and platforms</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-purple-100"><strong>Industry-Recognized:</strong> Certificates valued by top employers</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-cyan-100"><strong>Free Access:</strong> Many courses available at no cost</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Microsoft AI Skills Navigator Section */}
              <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-6 border border-cyan-700/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center p-1">
                    <img
                      src="https://www.microsoft.com/favicon.ico"
                      alt="Microsoft"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjExIiBoZWlnaHQ9IjExIiBmaWxsPSIjRjI1MDIyIi8+CjxyZWN0IHg9IjEzIiB3aWR0aD0iMTEiIGhlaWdodD0iMTEiIGZpbGw9IiM3RkJBMDAiLz4KPHJlY3QgeT0iMTMiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgZmlsbD0iIzAwQTRFRiIvPgo8cmVjdCB4PSIxMyIgeT0iMTMiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgZmlsbD0iI0ZGQjkwMCIvPgo8L3N2Zz4K';
                      }}
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Microsoft AI Skills Navigator 🧭</h3>
                </div>

                <div className="space-y-4">
                  {/* Overview */}
                  <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-700/30">
                    <p className="text-sm sm:text-base text-cyan-100 leading-relaxed">
                      <strong className="text-cyan-300">Navigate Your AI Career with Microsoft!</strong> Discover personalized learning paths, skill assessments, and career guidance powered by Microsoft's AI expertise and Azure cloud platform. 🚀✨
                    </p>
                  </div>

                  {/* Microsoft AI Skills Navigator Card */}
                  <div className="bg-gradient-to-r from-cyan-800/30 to-blue-800/30 rounded-lg p-6 border border-cyan-600/30">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2">
                          <img
                            src="https://www.microsoft.com/favicon.ico"
                            alt="Microsoft AI"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjExIiBoZWlnaHQ9IjExIiBmaWxsPSIjRjI1MDIyIi8+CjxyZWN0IHg9IjEzIiB3aWR0aD0iMTEiIGhlaWdodD0iMTEiIGZpbGw9IiM3RkJBMDAiLz4KPHJlY3QgeT0iMTMiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgZmlsbD0iIzAwQTRFRiIvPgo8cmVjdCB4PSIxMyIgeT0iMTMiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgZmlsbD0iI0ZGQjkwMCIvPgo8L3N2Zz4K';
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">AI Skills Navigator Platform</h4>
                        <p className="text-sm sm:text-base text-cyan-100 mb-4 leading-relaxed">
                          Personalized AI learning journey with skill assessments, curated learning paths, and career guidance. Master Azure AI services, Microsoft Copilot, and enterprise AI solutions with hands-on labs and real-world projects.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          <div className="bg-cyan-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-cyan-300">🧭 Career Paths</div>
                          </div>
                          <div className="bg-blue-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-blue-300">☁️ Azure AI</div>
                          </div>
                          <div className="bg-indigo-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-indigo-300">🤖 Copilot</div>
                          </div>
                          <div className="bg-purple-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-purple-300">📊 Assessments</div>
                          </div>
                        </div>

                        <a
                          href="https://aiskillsnavigator.microsoft.com/en-us?wt.mc_id=aihub_aisn_webpage_cnl"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25 hover:scale-105 text-sm sm:text-base"
                        >
                          <span>Navigate AI Skills with Microsoft</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-4 border border-blue-700/30">
                    <h5 className="font-semibold text-blue-300 text-sm mb-3">🌟 Why Choose Microsoft AI Skills Navigator?</h5>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-cyan-100"><strong>Personalized:</strong> AI-powered skill assessments and custom learning paths</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-blue-100"><strong>Enterprise-Ready:</strong> Learn Azure AI, Copilot, and business AI solutions</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-indigo-100"><strong>Career Guidance:</strong> Navigate AI career paths with industry insights</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-purple-100"><strong>Hands-On Labs:</strong> Practice with real Microsoft AI tools and services</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Anthropic Academy Section */}
              <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-lg p-6 border border-purple-700/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center p-1">
                    <img
                      src="https://www.anthropic.com/favicon.ico"
                      alt="Anthropic"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3TDEyIDEyTDIyIDdMMTIgMloiIGZpbGw9IiM4QjVDRjYiLz4KPHBhdGggZD0iTTIgMTdMMTIgMjJMMjIgMTciIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlV2lkdGg9IjIiIHN0cm9rZUxpbmVjYXA9InJvdW5kIiBzdHJva2VMaW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTIgMTJMMTIgMTdMMjIgMTIiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlV2lkdGg9IjIiIHN0cm9rZUxpbmVjYXA9InJvdW5kIiBzdHJva2VMaW5lam9pbj0icm91bmQiLz4KPC9zdmc+';
                      }}
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Anthropic Academy 🎓</h3>
                </div>

                <div className="space-y-4">
                  {/* Overview */}
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/30">
                    <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                      <strong className="text-purple-300">Learn AI Safety & Ethics with Anthropic!</strong> Discover responsible AI development, constitutional AI principles, and safety-first approaches from the creators of Claude. Master the future of safe, beneficial artificial intelligence. 🛡️✨
                    </p>
                  </div>

                  {/* Anthropic Academy Card */}
                  <div className="bg-gradient-to-r from-purple-800/30 to-indigo-800/30 rounded-lg p-6 border border-purple-600/30">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2">
                          <img
                            src="https://www.anthropic.com/favicon.ico"
                            alt="Anthropic Academy"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3TDEyIDEyTDIyIDdMMTIgMloiIGZpbGw9IiM4QjVDRjYiLz4KPHBhdGggZD0iTTIgMTdMMTIgMjJMMjIgMTciIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlV2lkdGg9IjIiIHN0cm9rZUxpbmVjYXA9InJvdW5kIiBzdHJva2VMaW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTIgMTJMMTIgMTdMMjIgMTIiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlV2lkdGg9IjIiIHN0cm9rZUxpbmVjYXA9InJvdW5kIiBzdHJva2VMaW5lam9pbj0icm91bmQiLz4KPC9zdmc+';
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-2">Anthropic Academy: AI Safety & Ethics</h4>
                        <p className="text-sm sm:text-base text-purple-100 mb-4 leading-relaxed">
                          Comprehensive learning platform focused on responsible AI development, constitutional AI principles, and AI safety research. Learn from Anthropic's pioneering work in building helpful, harmless, and honest AI systems like Claude.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          <div className="bg-purple-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-purple-300">🛡️ AI Safety</div>
                          </div>
                          <div className="bg-indigo-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-indigo-300">⚖️ AI Ethics</div>
                          </div>
                          <div className="bg-violet-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-violet-300">📜 Constitutional AI</div>
                          </div>
                          <div className="bg-pink-700/30 rounded-lg p-2 text-center">
                            <div className="text-xs font-semibold text-pink-300">🤖 Claude Insights</div>
                          </div>
                        </div>

                        <a
                          href="https://www.anthropic.com/learn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-400 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-purple-400/25 hover:scale-105 text-sm sm:text-base"
                        >
                          <span>Learn with Anthropic Academy</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg p-4 border border-indigo-700/30">
                    <h5 className="font-semibold text-indigo-300 text-sm mb-3">🌟 Why Choose Anthropic Academy?</h5>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-purple-100"><strong>Safety-First:</strong> Learn responsible AI development and deployment practices</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-indigo-100"><strong>Constitutional AI:</strong> Understand Anthropic's breakthrough approach to AI alignment</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-violet-100"><strong>Research Insights:</strong> Access cutting-edge AI safety and ethics research</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-pink-100"><strong>Claude Expertise:</strong> Learn from the team behind one of the world's safest AI assistants</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Combined Learning Platforms Call-to-Action */}
              <div className="bg-gradient-to-r from-slate-900/30 to-gray-900/30 rounded-lg p-6 border border-slate-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-slate-300 mb-4 text-center flex items-center justify-center gap-2">
                  🚀 Start Your AI Learning Journey Today!
                </h4>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed mb-6 text-center">
                  Choose your preferred learning platform or explore all three! Google, Microsoft, and Anthropic offer complementary AI education experiences covering technical skills, enterprise solutions, and AI safety. 🌟
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://ai.google/learn-ai-skills/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-blue-400/25 hover:scale-105 text-sm sm:text-base"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                    <span>Google AI Skills</span>
                  </a>
                  <a
                    href="https://aiskillsnavigator.microsoft.com/en-us?wt.mc_id=aihub_aisn_webpage_cnl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25 hover:scale-105 text-sm sm:text-base"
                  >
                    <img src="https://www.microsoft.com/favicon.ico" alt="Microsoft" className="w-4 h-4" />
                    <span>Microsoft AI Navigator</span>
                  </a>
                  <a
                    href="https://www.anthropic.com/learn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-400 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-purple-400/25 hover:scale-105 text-sm sm:text-base"
                  >
                    <img src="https://www.anthropic.com/favicon.ico" alt="Anthropic" className="w-4 h-4" />
                    <span>Anthropic Academy</span>
                  </a>
                </div>

                {/* Platform Comparison */}
                <div className="mt-6 grid sm:grid-cols-3 gap-4">
                  <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-700/30 text-center">
                    <h6 className="font-semibold text-blue-300 text-xs mb-2">🔬 Google AI Skills</h6>
                    <p className="text-xs text-blue-100">Research-focused • TensorFlow • Generative AI • Academic approach</p>
                  </div>
                  <div className="bg-cyan-900/20 rounded-lg p-3 border border-cyan-700/30 text-center">
                    <h6 className="font-semibold text-cyan-300 text-xs mb-2">💼 Microsoft AI Navigator</h6>
                    <p className="text-xs text-cyan-100">Enterprise-focused • Azure AI • Copilot • Business applications</p>
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-700/30 text-center">
                    <h6 className="font-semibold text-purple-300 text-xs mb-2">🛡️ Anthropic Academy</h6>
                    <p className="text-xs text-purple-100">Safety-focused • AI Ethics • Constitutional AI • Responsible development</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-green-600 to-cyan-600 rounded-2xl">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Heart size={24} className="sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2">Your AI Adventure Starts Now! 🌟</h4>
                    <p className="text-xs sm:text-sm text-green-100">Every expert was once a beginner. Take the first step today! 💫</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AILearningPage;
