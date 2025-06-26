import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Briefcase, Lightbulb, Code, Bot, Calculator, Zap, Play, Rocket, Target, Heart, Brain, Network, Database, Eye, MessageSquare, Car, Shield, Sparkles, AlertTriangle, TrendingUp, Star, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

// Shimmer Loading Component for Videos
const VideoShimmer: React.FC = () => (
  <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center animate-pulse">
          <Play size={24} className="text-gray-400 ml-1" />
        </div>
      </div>
    </div>
  </div>
);

// Enhanced Video Component with Shimmer Loading
const AIVideo: React.FC<{
  src: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  note: string;
}> = ({ src, title, description, icon, gradient, note }) => {
  const [isLoading, setIsLoading] = useState(true);

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
        <div className={`relative w-full ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={src}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
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

  // Video Modal Component
  const VideoModal = () => {
    if (!selectedVideo) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeVideoModal();
      }
    };

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
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Andrej Karpathy - AI Education Video"
              style={{ border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-xl"
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
        url="/ai"
        type="article"
        pageType="educational"
      />

      {/* Back Bar - Exact same as AI Search Page */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
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
        {/* Hero Section - Edge to Edge */}
        <section className="w-full bg-gray-900 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4 sm:px-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-blue-600 rounded-2xl mb-4 sm:mb-6 shadow-2xl">
              <Brain size={32} className="sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent leading-tight">
              Master Artificial Intelligence
            </h2>
            <p className="text-sm sm:text-base text-purple-100 leading-relaxed max-w-2xl mx-auto">
              🚀 Embark on an incredible journey into AI. From basic concepts to cutting-edge tech reshaping our world.
            </p>
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
                    <p className="text-xs text-cyan-100">
                      <strong>Norbert Wiener's</strong> "Cybernetics" (1948) explored feedback loops and control systems, inspiring early AI researchers to think about machines that could learn and adapt - concepts central to today's AI systems.
                    </p>
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
                <div className="text-xs text-blue-200">
                  <strong>Capabilities:</strong> Exceeds human performance in specific domains but can't transfer knowledge to other areas
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
                <div className="text-xs text-purple-200">
                  <strong>Timeline:</strong> Experts debate 2030-2050, but significant challenges remain
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
                <div className="text-xs text-red-200">
                  <strong>Status:</strong> Purely theoretical - requires solving AGI first, then recursive self-improvement
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
                  <div className="text-xs text-green-200">
                    <strong>Examples:</strong> Email spam detection, medical diagnosis, image recognition, price prediction
                  </div>
                </div>

                <div className="bg-yellow-800/30 rounded-lg p-4 text-center border border-yellow-600/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Eye size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-yellow-300 mb-2">Unsupervised Learning 🔍</h4>
                  <p className="text-xs sm:text-sm text-yellow-100 mb-2">Like being a detective - AI finds hidden patterns on its own!</p>
                  <div className="text-xs text-yellow-200">
                    <strong>Examples:</strong> Customer segmentation, anomaly detection, data compression, market research
                  </div>
                </div>

                <div className="bg-purple-800/30 rounded-lg p-4 text-center border border-purple-600/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-purple-300 mb-2">Reinforcement Learning 🎮</h4>
                  <p className="text-xs sm:text-sm text-purple-100 mb-2">Like playing video games - AI learns by trial and error!</p>
                  <div className="text-xs text-purple-200">
                    <strong>Examples:</strong> Game AI (AlphaGo), autonomous vehicles, robotics, trading algorithms
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

              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-purple-300 mb-4 text-center">🏛️ Leading AGI Research Labs</h4>
                <p className="text-xs sm:text-sm text-gray-100 text-center mb-4">
                  These world-class research institutions are racing to build Artificial General Intelligence (AGI) - AI as smart as humans! 🧠
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  The race for AI supremacy between the United States and China is reshaping global power dynamics, national security strategies, and the future of human civilization. This isn't just about technology—it's about who will lead the world in the 21st century.
                </p>
                <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
                  From Silicon Valley's tech giants to China's state-backed AI champions, from semiconductor export controls to surveillance systems, this competition touches every aspect of modern life and will determine the future of democracy, authoritarianism, and human freedom.
                </p>
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
                    In July 2017, China unveiled its <strong>"New Generation Artificial Intelligence Development Plan"</strong> - a comprehensive strategy to become the world's primary AI innovation center by 2030, with a domestic AI industry worth $150 billion.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30">
                      <h5 className="font-semibold text-yellow-300 text-sm mb-2">📈 Three-Phase Strategy</h5>
                      <ul className="space-y-1 text-xs text-yellow-100">
                        <li>• <strong>2020:</strong> Catch up with global AI leaders</li>
                        <li>• <strong>2025:</strong> Achieve major breakthroughs in AI applications</li>
                        <li>• <strong>2030:</strong> Become the world's primary AI innovation center</li>
                      </ul>
                    </div>

                    <div className="bg-red-800/30 rounded-lg p-4 border border-red-600/30">
                      <h5 className="font-semibold text-red-300 text-sm mb-2">🏢 National AI Champions</h5>
                      <ul className="space-y-1 text-xs text-red-100">
                        <li>• <strong>Baidu:</strong> Autonomous driving, search AI</li>
                        <li>• <strong>Alibaba:</strong> Smart cities, cloud AI</li>
                        <li>• <strong>Tencent:</strong> Medical imaging, gaming AI</li>
                        <li>• <strong>SenseTime:</strong> Computer vision, facial recognition</li>
                        <li>• <strong>iFlytek:</strong> Speech recognition, voice AI</li>
                      </ul>
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
                <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-4">🛡️ America Fights Back: The Chip War</h4>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                    The United States has launched an unprecedented campaign to maintain its technological edge, using export controls, sanctions, and alliance-building to limit China's access to critical AI technologies.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                      <h5 className="font-semibold text-blue-300 text-sm mb-2">🚫 Export Controls (2022-2025)</h5>
                      <ul className="space-y-1 text-xs text-blue-100">
                        <li>• <strong>NVIDIA Restrictions:</strong> Banned H100, A100 AI chips to China</li>
                        <li>• <strong>Semiconductor Equipment:</strong> ASML, Applied Materials blocked</li>
                        <li>• <strong>Software Limits:</strong> EDA tools, chip design software</li>
                        <li>• <strong>Entity List:</strong> 100+ Chinese AI companies blacklisted</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-2">🤝 Alliance Building</h5>
                      <ul className="space-y-1 text-xs text-indigo-100">
                        <li>• <strong>CHIPS Act:</strong> $52 billion for US semiconductor manufacturing</li>
                        <li>• <strong>AUKUS Partnership:</strong> AI cooperation with UK, Australia</li>
                        <li>• <strong>Japan & Netherlands:</strong> Coordinated export controls</li>
                        <li>• <strong>NATO AI Strategy:</strong> Democratic AI alliance</li>
                      </ul>
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

              {/* Mary Meeker Report */}
              <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-lg p-6 border border-amber-700/30">
                <h4 className="text-lg sm:text-xl font-bold text-amber-300 mb-4">📊 Essential Reading: Mary Meeker's AI Trends Report</h4>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
                    For the most comprehensive analysis of AI trends, competition, and global implications, read Mary Meeker's authoritative "Trends of Artificial Intelligence" report - the definitive guide to understanding the AI landscape.
                  </p>

                  <div className="bg-amber-800/30 rounded-lg p-4 border border-amber-600/30 text-center">
                    <h5 className="font-semibold text-amber-300 text-sm mb-3">🔗 Get the Full Report</h5>
                    <a
                      href="https://www.bondcap.com/report/tai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
                    >
                      📈 Read Mary Meeker's AI Trends Report
                    </a>
                    <p className="text-xs text-amber-200 mt-2">
                      Deep dive into AI investment trends, competitive dynamics, and future predictions from one of the world's top technology analysts.
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
