import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Cpu, Network, BookOpen, Briefcase, TrendingUp, AlertTriangle, Lightbulb, Code, Database, Eye, MessageSquare, Car, Bot, Stethoscope, Calculator, Globe, Zap, Play, Users, Award, Rocket, Target, Star, Heart, Shield, Sparkles } from 'lucide-react';
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
        <iframe
          className={`w-full rounded-lg transition-opacity duration-300 ${isLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
          style={{ height: isLoading ? '0' : 'auto', paddingBottom: isLoading ? '0' : '56.25%', position: isLoading ? 'absolute' : 'relative' }}
          src={src}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        ></iframe>
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
        <section className="w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 sm:py-12">
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
        <section className="w-full bg-gradient-to-br from-blue-900 to-cyan-900 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <Lightbulb size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">What is AI? 🤖</h3>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                <strong className="text-cyan-300">Artificial Intelligence (AI)</strong> is like giving computers a brain! 🧠 It's the technology that makes machines think, learn, and make decisions like humans. AI is everywhere around you - from Siri understanding your voice to Netflix recommending movies you'll love.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
                  <h4 className="text-base sm:text-lg font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                    <Brain size={16} className="sm:w-5 sm:h-5" />
                    How AI Works ⚡
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-blue-100">
                    <li>• <strong>Learning:</strong> Gets smarter from experience</li>
                    <li>• <strong>Reasoning:</strong> Makes logical decisions</li>
                    <li>• <strong>Problem-solving:</strong> Finds creative solutions</li>
                    <li>• <strong>Pattern Recognition:</strong> Spots hidden connections</li>
                  </ul>
                </div>

                <div className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-600/30">
                  <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <Sparkles size={16} className="sm:w-5 sm:h-5" />
                    AI in Your Life 🌟
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-cyan-100">
                    <li>• <strong>Voice Assistants:</strong> Siri, Alexa, Google</li>
                    <li>• <strong>Social Media:</strong> Instagram filters, TikTok FYP</li>
                    <li>• <strong>Gaming:</strong> Smart NPCs, game recommendations</li>
                    <li>• <strong>Shopping:</strong> Amazon suggestions, price alerts</li>
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
          gradient="from-red-900 to-pink-900"
          note="🏛️ MIT OpenCourseWare: Prof. Patrick Winston's legendary lecture that has inspired millions of AI students worldwide!"
        />

        {/* Types of AI - Edge to Edge */}
        <section className="w-full bg-gradient-to-br from-green-900 to-emerald-900 py-8 sm:py-12">
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
                  AI that's really good at ONE specific thing. This is what we use today!
                </p>
                <div className="text-xs text-blue-200">
                  <strong>Examples:</strong> Chess programs, Spotify playlists, spam filters
                </div>
              </div>

              <div className="bg-purple-800/40 rounded-lg p-4 border border-purple-600/40">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-3">
                  <Brain size={20} className="text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-purple-300 mb-2">General AI (AGI) 🌟</h4>
                <p className="text-xs sm:text-sm text-purple-100 mb-3 leading-relaxed">
                  AI as smart as humans in EVERYTHING. Still being developed!
                </p>
                <div className="text-xs text-purple-200">
                  <strong>Timeline:</strong> Maybe 2030-2050 (scientists are working hard!)
                </div>
              </div>

              <div className="bg-red-800/40 rounded-lg p-4 border border-red-600/40">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-3">
                  <Zap size={20} className="text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-red-300 mb-2">Super AI (ASI) ⚡</h4>
                <p className="text-xs sm:text-sm text-red-100 mb-3 leading-relaxed">
                  AI smarter than ALL humans combined. Pure sci-fi for now!
                </p>
                <div className="text-xs text-red-200">
                  <strong>Status:</strong> Theoretical - like having superpowers!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Machine Learning Deep Dive - Edge to Edge */}
        <section className="w-full bg-gradient-to-br from-indigo-900 to-purple-900 py-8 sm:py-12">
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

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-green-800/30 rounded-lg p-4 text-center border border-green-600/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BookOpen size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-green-300 mb-2">Supervised Learning 📚</h4>
                  <p className="text-xs sm:text-sm text-green-100">Like studying with answer keys - we show AI the right answers!</p>
                </div>

                <div className="bg-yellow-800/30 rounded-lg p-4 text-center border border-yellow-600/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Eye size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-yellow-300 mb-2">Unsupervised Learning 🔍</h4>
                  <p className="text-xs sm:text-sm text-yellow-100">Like being a detective - AI finds hidden patterns on its own!</p>
                </div>

                <div className="bg-purple-800/30 rounded-lg p-4 text-center border border-purple-600/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-purple-300 mb-2">Reinforcement Learning 🎮</h4>
                  <p className="text-xs sm:text-sm text-purple-100">Like playing video games - AI learns by trial and error!</p>
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
          gradient="from-pink-900 to-red-900"
          note="🎨 3Blue1Brown: Grant Sanderson makes the most complex math concepts incredibly beautiful and easy to understand!"
        />

        {/* Neural Networks Deep Dive - Edge to Edge */}
        <section className="w-full bg-gradient-to-br from-pink-900 to-red-900 py-8 sm:py-12">
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
          gradient="from-yellow-900 to-orange-900"
          note="🔥 Transformer Deep Dive: This groundbreaking paper made ChatGPT, GPT-4, and modern language models possible!"
        />

        {/* Attention Mechanism - Edge to Edge */}
        <section className="w-full bg-gradient-to-br from-yellow-900 to-orange-900 py-8 sm:py-12">
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

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-yellow-800/30 rounded-lg p-4 border border-yellow-600/30">
                  <h4 className="text-base sm:text-lg font-semibold text-orange-300 mb-3">What is Attention? 👀</h4>
                  <p className="text-xs sm:text-sm text-yellow-100 mb-3 leading-relaxed">
                    Attention is like having a super-smart spotlight! 🔦 When you read a sentence, your brain automatically focuses on the most important words. The attention mechanism teaches AI to do the same thing.
                  </p>
                  <div className="bg-orange-800/30 rounded-lg p-3">
                    <h6 className="font-semibold text-white text-sm mb-1">Example:</h6>
                    <p className="text-xs text-yellow-200 italic">
                      "The cat sat on the <span className="text-orange-300 font-bold">mat</span> because it was <span className="text-orange-300 font-bold">comfortable</span>."
                    </p>
                    <p className="text-xs text-orange-200 mt-1">
                      AI learns that "it" refers to "mat" by paying attention! 🎯
                    </p>
                  </div>
                </div>

                <div className="bg-orange-800/30 rounded-lg p-4 border border-orange-600/30">
                  <h4 className="text-base sm:text-lg font-semibold text-yellow-300 mb-3">Transformer Impact 🚀</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-yellow-100"><strong>ChatGPT:</strong> Conversational AI that understands context</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-yellow-100"><strong>Google Translate:</strong> Better language translation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-yellow-100"><strong>DALL-E:</strong> Creates images from text descriptions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-yellow-100"><strong>GitHub Copilot:</strong> AI that writes code for you</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-700/30">
                <p className="text-xs sm:text-sm text-yellow-200">
                  <strong>💡 Mind-Blowing Fact:</strong> The Transformer architecture is so powerful that it's used not just for text, but also for images, music, video, and even predicting protein structures for medical research! 🧬
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Career Opportunities - Edge to Edge */}
        <section className="w-full bg-gradient-to-br from-green-900 to-emerald-900 py-8 sm:py-12">
          <div className="px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Briefcase size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Amazing AI Careers 💼</h3>
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-green-100 leading-relaxed">
                The AI revolution is creating incredible career opportunities! 🚀 These jobs are not only super exciting but also pay really well. Here are some of the coolest AI careers you can pursue:
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-800/40 rounded-lg p-4 border border-blue-600/40">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-lg flex items-center justify-center mb-3">
                    <Code size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-blue-300 mb-2">ML Engineer 🤖</h4>
                  <p className="text-xs text-blue-100 mb-2 leading-relaxed">Build AI systems that learn from data</p>
                  <div className="text-xs text-blue-200">
                    <strong>Salary:</strong> $120K-$200K+/year 💰
                  </div>
                </div>

                <div className="bg-purple-800/40 rounded-lg p-4 border border-purple-600/40">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mb-3">
                    <Database size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-purple-300 mb-2">Data Scientist 📊</h4>
                  <p className="text-xs text-purple-100 mb-2 leading-relaxed">Find patterns in data to solve problems</p>
                  <div className="text-xs text-purple-200">
                    <strong>Salary:</strong> $95K-$165K+/year 💰
                  </div>
                </div>

                <div className="bg-green-800/40 rounded-lg p-4 border border-green-600/40">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center mb-3">
                    <Bot size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-green-300 mb-2">AI Researcher 🔬</h4>
                  <p className="text-xs text-green-100 mb-2 leading-relaxed">Invent new AI technologies</p>
                  <div className="text-xs text-green-200">
                    <strong>Salary:</strong> $150K-$300K+/year 💰
                  </div>
                </div>

                <div className="bg-orange-800/40 rounded-lg p-4 border border-orange-600/40">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center mb-3">
                    <Eye size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-orange-300 mb-2">Computer Vision Engineer 👁️</h4>
                  <p className="text-xs text-orange-100 mb-2 leading-relaxed">Teach computers to "see" images</p>
                  <div className="text-xs text-orange-200">
                    <strong>Salary:</strong> $110K-$180K+/year 💰
                  </div>
                </div>

                <div className="bg-teal-800/40 rounded-lg p-4 border border-teal-600/40">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-lg flex items-center justify-center mb-3">
                    <MessageSquare size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-teal-300 mb-2">NLP Engineer 💬</h4>
                  <p className="text-xs text-teal-100 mb-2 leading-relaxed">Build AI that understands language</p>
                  <div className="text-xs text-teal-200">
                    <strong>Salary:</strong> $115K-$190K+/year 💰
                  </div>
                </div>

                <div className="bg-indigo-800/40 rounded-lg p-4 border border-indigo-600/40">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                    <Shield size={18} className="text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-indigo-300 mb-2">AI Ethics Specialist ⚖️</h4>
                  <p className="text-xs text-indigo-100 mb-2 leading-relaxed">Make sure AI is fair and safe</p>
                  <div className="text-xs text-indigo-200">
                    <strong>Salary:</strong> $90K-$150K+/year 💰
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
          gradient="from-red-900 to-orange-900"
          note="📺 FRONTLINE PBS: Award-winning documentary exploring AI's promise and challenges, from job changes to privacy concerns."
        />

        {/* Future of Work - Edge to Edge */}
        <section className="w-full bg-gradient-to-br from-red-900 to-orange-900 py-8 sm:py-12">
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
          gradient="from-green-900 to-emerald-900"
          note="🌟 Zach Star: Perfect introduction to machine learning concepts explained in simple terms that anyone can understand!"
        />

        {/* Learning Resources - Edge to Edge */}
        <section className="w-full bg-gradient-to-br from-cyan-900 to-blue-900 py-8 sm:py-12">
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
