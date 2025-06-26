import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Briefcase, Lightbulb, Code, Bot, Calculator, Zap, Play, Rocket, Target, Heart, Brain, Network, Database, Eye, MessageSquare, Car, Shield, Sparkles, AlertTriangle, TrendingUp, Star } from 'lucide-react';
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Learn Artificial Intelligence | Complete AI Guide for Students - St. Louis Demonstration JHS"
        description="Comprehensive AI learning guide covering everything from basics to advanced concepts. Explore machine learning, neural networks, career opportunities, and the future of AI technology."
        keywords="artificial intelligence, AI learning, machine learning, neural networks, AI careers, technology education, AI basics, deep learning"
        url="/ai-learning"
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

        {/* What is AI - Edge to Edge */}
        <section className="w-full bg-gray-800 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <Lightbulb size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">What is AI? 🤖</h3>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                <strong className="text-cyan-300">Artificial Intelligence (AI)</strong> is like giving computers a brain! 🧠 It's technology that enables computers and machines to simulate human learning, comprehension, problem-solving, decision-making, creativity and autonomy. AI is everywhere around you - from Siri understanding your voice to Netflix recommending movies you'll love.
              </p>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                In 2024-2025, we're experiencing an incredible AI revolution! 🚀 The latest breakthroughs include <strong className="text-cyan-300">Generative AI</strong> (like ChatGPT that can write essays), <strong className="text-cyan-300">AI Agents</strong> (that can complete complex tasks autonomously), and <strong className="text-cyan-300">Multimodal AI</strong> (that can understand text, images, audio, and video all at once).
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                  <h4 className="text-base sm:text-lg font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                    <Brain size={16} className="sm:w-5 sm:h-5" />
                    How AI Works ⚡
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-blue-100">
                    <li>• <strong>Learning:</strong> Gets smarter from experience and data</li>
                    <li>• <strong>Reasoning:</strong> Makes logical decisions step-by-step</li>
                    <li>• <strong>Problem-solving:</strong> Finds creative solutions to complex challenges</li>
                    <li>• <strong>Pattern Recognition:</strong> Spots hidden connections in massive data</li>
                    <li>• <strong>Autonomy:</strong> Acts independently without human intervention</li>
                    <li>• <strong>Creativity:</strong> Generates original content and ideas</li>
                  </ul>
                </div>

                <div className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30">
                  <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <Sparkles size={16} className="sm:w-5 sm:h-5" />
                    Latest AI in Your Life 🌟
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-cyan-100">
                    <li>• <strong>ChatGPT & Claude:</strong> AI tutors and writing assistants</li>
                    <li>• <strong>Sora & DALL-E:</strong> AI creates videos and images from text</li>
                    <li>• <strong>GitHub Copilot:</strong> AI writes code for programmers</li>
                    <li>• <strong>Tesla Autopilot:</strong> Self-driving car technology</li>
                    <li>• <strong>AI Agents:</strong> Book flights, schedule meetings autonomously</li>
                    <li>• <strong>Medical AI:</strong> Diagnoses diseases from X-rays</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
                <h4 className="text-base sm:text-lg font-semibold text-cyan-300 mb-3">🔥 2024-2025 AI Breakthroughs</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-1 text-xs sm:text-sm text-blue-100">
                      <li>• <strong>OpenAI o3:</strong> AI that can reason like a PhD scientist</li>
                      <li>• <strong>GPT-4.5:</strong> Improved pattern recognition and creativity</li>
                      <li>• <strong>AI Agents:</strong> Autonomous systems that complete complex tasks</li>
                      <li>• <strong>Multimodal AI:</strong> Understands text, images, audio, video together</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1 text-xs sm:text-sm text-blue-100">
                      <li>• <strong>Agentic AI:</strong> Multiple AI agents working together</li>
                      <li>• <strong>Real-time AI:</strong> Instant responses across all media types</li>
                      <li>• <strong>AI in Medicine:</strong> Revolutionary diagnostic capabilities</li>
                      <li>• <strong>Quantum + AI:</strong> Solving previously impossible problems</li>
                    </ul>
                  </div>
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
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2 text-xs sm:text-sm text-green-100">
                      <li>• <strong className="text-cyan-300">AI Infrastructure Engineer:</strong> $125K-$270K+ - Scale AI systems</li>
                      <li>• <strong className="text-pink-300">AI UX Designer:</strong> $90K-$160K+ - Design AI user experiences</li>
                      <li>• <strong className="text-yellow-300">AI Trainer/Tutor:</strong> $70K-$120K+ - Train AI models with human feedback</li>
                      <li>• <strong className="text-red-300">AI Compliance Officer:</strong> $100K-$180K+ - Ensure AI regulatory compliance</li>
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

        {/* Learning Resources - Edge to Edge */}
        <section className="w-full bg-gray-900 py-8 sm:py-12">
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
      </main>
    </div>
  );
};

export default AILearningPage;
