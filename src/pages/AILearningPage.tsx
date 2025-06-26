import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Cpu, Network, BookOpen, Briefcase, TrendingUp, AlertTriangle, Lightbulb, Code, Database, Eye, MessageSquare, Car, Bot, Stethoscope, Calculator, Globe, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

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

      {/* Main Content - Edge to Edge, No Containers */}
      <main className="py-8 sm:py-12">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-600 rounded-3xl mb-6 shadow-2xl">
              <Brain size={40} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Master Artificial Intelligence
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
              Embark on an incredible journey into the world of AI. From understanding basic concepts to exploring cutting-edge technologies that are reshaping our world.
            </p>
          </motion.div>
        </section>

        {/* What is AI Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Lightbulb size={24} className="text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">What is Artificial Intelligence?</h3>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-800">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                <strong className="text-purple-400">Artificial Intelligence (AI)</strong> is the simulation of human intelligence in machines that are programmed to think, learn, and make decisions like humans. It's the technology behind voice assistants, recommendation systems, autonomous vehicles, and countless other innovations transforming our daily lives.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Brain size={20} />
                    Key Characteristics
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>Learning:</strong> Ability to improve from experience</li>
                    <li>• <strong>Reasoning:</strong> Making logical decisions</li>
                    <li>• <strong>Problem-solving:</strong> Finding solutions to complex challenges</li>
                    <li>• <strong>Perception:</strong> Understanding and interpreting data</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <Zap size={20} />
                    Real-World Examples
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>Siri & Alexa:</strong> Voice assistants</li>
                    <li>• <strong>Netflix:</strong> Movie recommendations</li>
                    <li>• <strong>Google Maps:</strong> Route optimization</li>
                    <li>• <strong>ChatGPT:</strong> Conversational AI</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* AI Introduction Video */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-blue-800/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Eye size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Watch: MIT's Introduction to AI</h3>
                  <p className="text-gray-300 text-sm">Get started with this comprehensive introduction from MIT</p>
                </div>
              </div>

              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/TjZBTDzGeGg"
                  title="MIT Introduction to Artificial Intelligence"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                <p className="text-sm text-blue-200">
                  <strong>🎓 MIT OpenCourseWare:</strong> This lecture by Prof. Patrick Winston provides an excellent foundation for understanding AI concepts and scope.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Types of AI Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Network size={24} className="text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Types of Artificial Intelligence</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-800/30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <Bot size={28} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-blue-400 mb-3">Narrow AI (ANI)</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  AI designed for specific tasks. This is what we use today - from chess programs to image recognition.
                </p>
                <div className="text-xs text-blue-300">
                  <strong>Examples:</strong> Siri, Google Translate, Spam filters
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-800/30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <Brain size={28} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-purple-400 mb-3">General AI (AGI)</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  AI with human-level intelligence across all domains. Still theoretical and under development.
                </p>
                <div className="text-xs text-purple-300">
                  <strong>Status:</strong> Future technology, estimated 2030-2050
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-red-900/50 to-orange-900/50 backdrop-blur-sm rounded-2xl p-6 border border-red-800/30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mb-4">
                  <Zap size={28} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-red-400 mb-3">Super AI (ASI)</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  AI that surpasses human intelligence in all aspects. Purely hypothetical at this stage.
                </p>
                <div className="text-xs text-red-300">
                  <strong>Timeline:</strong> Highly speculative, post-2050
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Machine Learning Fundamentals */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Database size={24} className="text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Machine Learning: The Heart of AI</h3>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-800 mb-8">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                <strong className="text-cyan-400">Machine Learning (ML)</strong> is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed for every task. Instead of following pre-written instructions, ML systems find patterns in data and make predictions.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-green-400 mb-2">Supervised Learning</h4>
                  <p className="text-sm text-gray-300">Learning from labeled examples, like teaching with answer keys</p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Unsupervised Learning</h4>
                  <p className="text-sm text-gray-300">Finding hidden patterns in data without guidance</p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">Reinforcement Learning</h4>
                  <p className="text-sm text-gray-300">Learning through trial and error, like playing games</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Neural Networks Video */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-pink-900/30 to-red-900/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-pink-800/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Network size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Watch: Neural Networks Explained</h3>
                  <p className="text-gray-300 text-sm">3Blue1Brown's brilliant visual explanation of how neural networks work</p>
                </div>
              </div>

              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/aircAruvnKk"
                  title="But what is a neural network? | Deep learning chapter 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="mt-4 p-4 bg-pink-900/20 rounded-lg border border-pink-700/30">
                <p className="text-sm text-pink-200">
                  <strong>🧠 3Blue1Brown:</strong> This is the gold standard for understanding neural networks visually. Grant Sanderson makes complex math concepts incredibly intuitive.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Neural Networks & Deep Learning */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl flex items-center justify-center">
                <Network size={24} className="text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Neural Networks & Deep Learning</h3>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-800 mb-8">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                <strong className="text-pink-400">Neural Networks</strong> are computing systems inspired by biological neural networks in animal brains. They consist of interconnected nodes (neurons) that process information and learn patterns from data.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-pink-400 mb-4">How Neural Networks Work</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                      <div>
                        <h5 className="font-semibold text-white">Input Layer</h5>
                        <p className="text-sm text-gray-400">Receives raw data (images, text, numbers)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                      <div>
                        <h5 className="font-semibold text-white">Hidden Layers</h5>
                        <p className="text-sm text-gray-400">Process and transform the data through mathematical operations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                      <div>
                        <h5 className="font-semibold text-white">Output Layer</h5>
                        <p className="text-sm text-gray-400">Produces the final prediction or classification</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-blue-400 mb-4">Deep Learning Applications</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Eye size={16} className="text-blue-400" />
                        <span className="font-semibold text-white">Computer Vision</span>
                      </div>
                      <p className="text-sm text-gray-400">Image recognition, medical imaging, autonomous vehicles</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare size={16} className="text-green-400" />
                        <span className="font-semibold text-white">Natural Language Processing</span>
                      </div>
                      <p className="text-sm text-gray-400">ChatGPT, language translation, sentiment analysis</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Car size={16} className="text-purple-400" />
                        <span className="font-semibold text-white">Autonomous Systems</span>
                      </div>
                      <p className="text-sm text-gray-400">Self-driving cars, drones, robotics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Attention is All You Need - Transformers */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">The Transformer Revolution: "Attention is All You Need"</h3>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-800/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <BookOpen size={28} className="text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-yellow-400 mb-2">The Paper That Changed Everything</h4>
                  <p className="text-gray-300 leading-relaxed">
                    In 2017, Google researchers published "Attention is All You Need," introducing the <strong className="text-yellow-400">Transformer architecture</strong> that revolutionized AI and made modern language models like ChatGPT, GPT-4, and BERT possible.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="text-xl font-semibold text-orange-400 mb-4">What is the Attention Mechanism?</h5>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The attention mechanism allows AI models to focus on relevant parts of input data, just like how humans pay attention to important words in a sentence while reading.
                  </p>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h6 className="font-semibold text-white mb-2">Example:</h6>
                    <p className="text-sm text-gray-400 italic">
                      "The cat sat on the <span className="text-yellow-400 font-bold">mat</span> because it was <span className="text-yellow-400 font-bold">comfortable</span>."
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      The model learns that "it" refers to "mat" by paying attention to context.
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xl font-semibold text-blue-400 mb-4">Impact on Modern AI</h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300"><strong className="text-white">ChatGPT & GPT-4:</strong> Conversational AI</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300"><strong className="text-white">BERT:</strong> Search and understanding</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-300"><strong className="text-white">DALL-E:</strong> Image generation from text</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className="text-gray-300"><strong className="text-white">GitHub Copilot:</strong> Code generation</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
                <p className="text-sm text-yellow-200">
                  <strong>💡 Fun Fact:</strong> The Transformer architecture is so powerful that it's used not just for text, but also for images, music, and even protein folding predictions!
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Transformer Architecture Video */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-800/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Zap size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Watch: "Attention is All You Need" Explained</h3>
                  <p className="text-gray-300 text-sm">Deep dive into the paper that revolutionized AI</p>
                </div>
              </div>

              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/iDulhoQ2pro"
                  title="Attention Is All You Need"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="mt-4 p-4 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
                <p className="text-sm text-yellow-200">
                  <strong>⚡ Transformer Deep Dive:</strong> This video breaks down the groundbreaking paper that made ChatGPT, GPT-4, and modern language models possible.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* AI Ethics and Responsible AI */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Stethoscope size={24} className="text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">AI Ethics & Responsible Development</h3>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-800">
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                As AI becomes more powerful, ensuring it's developed and used responsibly becomes crucial. Understanding AI ethics is essential for anyone working in this field.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-indigo-400 mb-4">Key Ethical Challenges</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-red-400" />
                        Bias and Fairness
                      </h5>
                      <p className="text-sm text-gray-300">AI systems can perpetuate or amplify human biases, leading to unfair treatment of certain groups.</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <Eye size={16} className="text-blue-400" />
                        Privacy and Surveillance
                      </h5>
                      <p className="text-sm text-gray-300">AI can process vast amounts of personal data, raising concerns about privacy and surveillance.</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <Brain size={16} className="text-green-400" />
                        Transparency and Explainability
                      </h5>
                      <p className="text-sm text-gray-300">Many AI systems are "black boxes" - we don't understand how they make decisions.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-purple-400 mb-4">Principles of Responsible AI</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">1</div>
                      <div>
                        <h5 className="font-semibold text-white">Fairness</h5>
                        <p className="text-sm text-gray-400">AI should treat all people equitably and avoid discriminatory outcomes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">2</div>
                      <div>
                        <h5 className="font-semibold text-white">Accountability</h5>
                        <p className="text-sm text-gray-400">Clear responsibility for AI decisions and their consequences</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">3</div>
                      <div>
                        <h5 className="font-semibold text-white">Transparency</h5>
                        <p className="text-sm text-gray-400">AI systems should be understandable and their decisions explainable</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">4</div>
                      <div>
                        <h5 className="font-semibold text-white">Human-Centered</h5>
                        <p className="text-sm text-gray-400">AI should augment human capabilities, not replace human judgment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-xl border border-indigo-800/30">
                <h4 className="text-xl font-semibold text-indigo-400 mb-4">Real-World Examples</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-white mb-2">❌ AI Bias Cases:</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Facial recognition systems with higher error rates for darker skin tones</li>
                      <li>• Hiring algorithms that discriminated against women</li>
                      <li>• Criminal justice algorithms with racial bias</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">✅ Positive AI Applications:</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• AI helping diagnose diseases earlier and more accurately</li>
                      <li>• Language models breaking down communication barriers</li>
                      <li>• AI optimizing energy usage to fight climate change</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Real-World AI Applications */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Globe size={24} className="text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">AI in Action: Real-World Applications</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <Stethoscope size={20} className="text-white" />
                </div>
                <h4 className="text-lg font-bold text-blue-400 mb-3">Healthcare</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Medical Imaging:</strong> AI detects cancer in X-rays and MRIs</li>
                  <li>• <strong>Drug Discovery:</strong> AI accelerates development of new medicines</li>
                  <li>• <strong>Personalized Treatment:</strong> AI tailors treatments to individual patients</li>
                  <li>• <strong>Epidemic Tracking:</strong> AI monitors disease outbreaks</li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-sm rounded-xl p-6 border border-green-800/30"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <Car size={20} className="text-white" />
                </div>
                <h4 className="text-lg font-bold text-green-400 mb-3">Transportation</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Autonomous Vehicles:</strong> Self-driving cars and trucks</li>
                  <li>• <strong>Traffic Optimization:</strong> AI manages traffic flow in cities</li>
                  <li>• <strong>Route Planning:</strong> GPS systems find optimal paths</li>
                  <li>• <strong>Predictive Maintenance:</strong> AI prevents vehicle breakdowns</li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-800/30"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare size={20} className="text-white" />
                </div>
                <h4 className="text-lg font-bold text-purple-400 mb-3">Communication</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Language Translation:</strong> Real-time translation across languages</li>
                  <li>• <strong>Voice Assistants:</strong> Siri, Alexa, Google Assistant</li>
                  <li>• <strong>Content Moderation:</strong> AI filters harmful content online</li>
                  <li>• <strong>Accessibility:</strong> AI helps people with disabilities</li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-sm rounded-xl p-6 border border-orange-800/30"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl flex items-center justify-center mb-4">
                  <Lightbulb size={20} className="text-white" />
                </div>
                <h4 className="text-lg font-bold text-orange-400 mb-3">Environment</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Climate Modeling:</strong> AI predicts climate change impacts</li>
                  <li>• <strong>Energy Optimization:</strong> Smart grids reduce energy waste</li>
                  <li>• <strong>Wildlife Conservation:</strong> AI tracks endangered species</li>
                  <li>• <strong>Disaster Response:</strong> AI coordinates emergency responses</li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-800/30"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <Calculator size={20} className="text-white" />
                </div>
                <h4 className="text-lg font-bold text-yellow-400 mb-3">Finance</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Fraud Detection:</strong> AI spots suspicious transactions</li>
                  <li>• <strong>Algorithmic Trading:</strong> AI makes investment decisions</li>
                  <li>• <strong>Credit Scoring:</strong> AI assesses loan applications</li>
                  <li>• <strong>Personal Finance:</strong> AI budgeting and investment apps</li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-800/30"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen size={20} className="text-white" />
                </div>
                <h4 className="text-lg font-bold text-indigo-400 mb-3">Education</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Personalized Learning:</strong> AI adapts to each student's pace</li>
                  <li>• <strong>Automated Grading:</strong> AI grades essays and assignments</li>
                  <li>• <strong>Language Learning:</strong> AI tutors for language practice</li>
                  <li>• <strong>Accessibility:</strong> AI helps students with learning disabilities</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* AI Career Opportunities */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Briefcase size={24} className="text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Exciting AI Career Opportunities</h3>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-800 mb-8">
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                The AI revolution is creating countless new career opportunities across every industry. Here are some of the most exciting and well-paying roles you can pursue:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                    <Code size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-blue-400 mb-2">Machine Learning Engineer</h4>
                  <p className="text-sm text-gray-300 mb-3">Design and build AI systems that can learn from data</p>
                  <div className="text-xs text-blue-300">
                    <strong>Salary:</strong> $120,000 - $200,000+/year
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-800/30"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                    <Database size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-purple-400 mb-2">Data Scientist</h4>
                  <p className="text-sm text-gray-300 mb-3">Extract insights from data to solve business problems</p>
                  <div className="text-xs text-purple-300">
                    <strong>Salary:</strong> $95,000 - $165,000+/year
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-sm rounded-xl p-6 border border-green-800/30"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                    <Bot size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-green-400 mb-2">AI Research Scientist</h4>
                  <p className="text-sm text-gray-300 mb-3">Develop new AI algorithms and techniques</p>
                  <div className="text-xs text-green-300">
                    <strong>Salary:</strong> $150,000 - $300,000+/year
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-sm rounded-xl p-6 border border-orange-800/30"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl flex items-center justify-center mb-4">
                    <Eye size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-orange-400 mb-2">Computer Vision Engineer</h4>
                  <p className="text-sm text-gray-300 mb-3">Build systems that can "see" and understand images</p>
                  <div className="text-xs text-orange-300">
                    <strong>Salary:</strong> $110,000 - $180,000+/year
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-teal-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-teal-800/30"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                    <MessageSquare size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-teal-400 mb-2">NLP Engineer</h4>
                  <p className="text-sm text-gray-300 mb-3">Create AI that understands and generates human language</p>
                  <div className="text-xs text-teal-300">
                    <strong>Salary:</strong> $115,000 - $190,000+/year
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-800/30"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Stethoscope size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-indigo-400 mb-2">AI Ethics Specialist</h4>
                  <p className="text-sm text-gray-300 mb-3">Ensure AI systems are fair, safe, and beneficial</p>
                  <div className="text-xs text-indigo-300">
                    <strong>Salary:</strong> $90,000 - $150,000+/year
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl border border-green-800/30">
                <h4 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                  <Lightbulb size={20} />
                  How to Start Your AI Career Journey
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Essential Skills to Develop:</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• <strong>Programming:</strong> Python, R, JavaScript</li>
                      <li>• <strong>Mathematics:</strong> Statistics, Linear Algebra, Calculus</li>
                      <li>• <strong>Machine Learning:</strong> Algorithms and frameworks</li>
                      <li>• <strong>Data Analysis:</strong> SQL, Excel, Visualization</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Learning Path:</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• <strong>Step 1:</strong> Learn Python programming basics</li>
                      <li>• <strong>Step 2:</strong> Study statistics and mathematics</li>
                      <li>• <strong>Step 3:</strong> Take online ML courses (Coursera, edX)</li>
                      <li>• <strong>Step 4:</strong> Build projects and create a portfolio</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* AI and Job Automation */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                <AlertTriangle size={24} className="text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">AI, Job Automation & the Future of Work</h3>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-800">
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                AI is rapidly transforming the job market, automating some roles while creating entirely new opportunities. Understanding this shift is crucial for planning your future career.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-900/20 rounded-xl p-6 border border-red-800/30">
                  <h4 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <AlertTriangle size={20} />
                    Jobs at Risk of Automation
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300"><strong>Data Entry Clerks:</strong> 99% automation risk</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300"><strong>Telemarketers:</strong> 99% automation risk</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-gray-300"><strong>Cashiers:</strong> 97% automation risk</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-gray-300"><strong>Fast Food Workers:</strong> 92% automation risk</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-300"><strong>Truck Drivers:</strong> 79% automation risk</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 rounded-xl p-6 border border-green-800/30">
                  <h4 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                    <TrendingUp size={20} />
                    Jobs Safe from Automation
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300"><strong>Teachers:</strong> 1% automation risk</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300"><strong>Therapists:</strong> 0.7% automation risk</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300"><strong>Social Workers:</strong> 0.3% automation risk</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300"><strong>Software Engineers:</strong> 4.2% automation risk</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300"><strong>Doctors:</strong> 0.4% automation risk</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-800/30 mb-8">
                <h4 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
                  <Globe size={20} />
                  The Future of Work: Key Trends
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-white mb-3">🚀 New Job Categories Emerging:</h5>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• <strong>AI Trainers:</strong> Teaching AI systems</li>
                      <li>• <strong>Human-AI Interaction Designers:</strong> Making AI user-friendly</li>
                      <li>• <strong>AI Auditors:</strong> Ensuring AI fairness and safety</li>
                      <li>• <strong>Prompt Engineers:</strong> Optimizing AI communication</li>
                      <li>• <strong>Robot Maintenance Technicians:</strong> Keeping AI systems running</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-3">💡 Skills That Will Always Matter:</h5>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• <strong>Creativity:</strong> AI can't replace human imagination</li>
                      <li>• <strong>Emotional Intelligence:</strong> Understanding people</li>
                      <li>• <strong>Critical Thinking:</strong> Analyzing complex problems</li>
                      <li>• <strong>Leadership:</strong> Guiding teams and making decisions</li>
                      <li>• <strong>Adaptability:</strong> Learning new skills quickly</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-800/30">
                <h4 className="text-xl font-semibold text-purple-400 mb-4">💪 How to Future-Proof Your Career</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen size={20} className="text-white" />
                    </div>
                    <h5 className="font-semibold text-white mb-2">Keep Learning</h5>
                    <p className="text-sm text-gray-300">Continuously update your skills and stay curious about new technologies</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Brain size={20} className="text-white" />
                    </div>
                    <h5 className="font-semibold text-white mb-2">Develop AI Skills</h5>
                    <p className="text-sm text-gray-300">Learn to work WITH AI tools rather than compete against them</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lightbulb size={20} className="text-white" />
                    </div>
                    <h5 className="font-semibold text-white mb-2">Focus on Human Skills</h5>
                    <p className="text-sm text-gray-300">Strengthen creativity, empathy, and complex problem-solving abilities</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* AI and Future of Work Video */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-red-800/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Watch: In the Age of AI (Documentary)</h3>
                  <p className="text-gray-300 text-sm">FRONTLINE's comprehensive look at AI's impact on jobs and society</p>
                </div>
              </div>

              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/5dZ_lvDgevk"
                  title="In the Age of AI (full documentary) | FRONTLINE"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="mt-4 p-4 bg-red-900/20 rounded-lg border border-red-700/30">
                <p className="text-sm text-red-200">
                  <strong>📺 FRONTLINE PBS:</strong> This award-winning documentary explores AI's promise and perils, from job displacement to privacy concerns and the US-China AI race.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Getting Started Resources */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen size={24} className="text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Start Your AI Journey Today</h3>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-800/30">
              <p className="text-lg text-gray-300 leading-relaxed mb-8 text-center">
                Ready to dive into the exciting world of AI? Here are the best resources to get you started on your journey from beginner to AI expert.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Code size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-blue-400 mb-3">Free Programming Courses</h4>
                  <ul className="space-y-2 text-sm text-gray-300 text-left">
                    <li>• <strong>Python.org:</strong> Official Python tutorial</li>
                    <li>• <strong>Codecademy:</strong> Interactive Python course</li>
                    <li>• <strong>freeCodeCamp:</strong> Full programming bootcamp</li>
                    <li>• <strong>Khan Academy:</strong> Computer programming basics</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Brain size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-green-400 mb-3">AI & ML Courses</h4>
                  <ul className="space-y-2 text-sm text-gray-300 text-left">
                    <li>• <strong>Coursera:</strong> Andrew Ng's ML Course</li>
                    <li>• <strong>edX:</strong> MIT Introduction to AI</li>
                    <li>• <strong>Udacity:</strong> AI Programming Nanodegree</li>
                    <li>• <strong>Fast.ai:</strong> Practical Deep Learning</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calculator size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-purple-400 mb-3">Mathematics Resources</h4>
                  <ul className="space-y-2 text-sm text-gray-300 text-left">
                    <li>• <strong>Khan Academy:</strong> Statistics & Probability</li>
                    <li>• <strong>3Blue1Brown:</strong> Linear Algebra videos</li>
                    <li>• <strong>MIT OpenCourseWare:</strong> Calculus courses</li>
                    <li>• <strong>StatQuest:</strong> Statistics made simple</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl p-6 border border-yellow-800/30 mb-8">
                <h4 className="text-xl font-semibold text-yellow-400 mb-4 text-center">🎯 Your 30-Day AI Learning Challenge</h4>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">1</div>
                    <h5 className="font-semibold text-white mb-2">Week 1</h5>
                    <p className="text-sm text-gray-300">Learn Python basics and complete first programming exercises</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">2</div>
                    <h5 className="font-semibold text-white mb-2">Week 2</h5>
                    <p className="text-sm text-gray-300">Study statistics and start Andrew Ng's ML course</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">3</div>
                    <h5 className="font-semibold text-white mb-2">Week 3</h5>
                    <p className="text-sm text-gray-300">Build your first ML model with real data</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">4</div>
                    <h5 className="font-semibold text-white mb-2">Week 4</h5>
                    <p className="text-sm text-gray-300">Create a portfolio project and share it online</p>
                  </div>
                </div>
              </div>

              {/* Andrew Ng Course Video */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-green-800/30">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white">Watch: Andrew Ng's Machine Learning Course</h4>
                      <p className="text-gray-300 text-sm">The most popular ML course in the world - Stanford CS229</p>
                    </div>
                  </div>

                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-xl"
                      src="https://www.youtube.com/embed/jGwO_UgTS7I"
                      title="Stanford CS229: Machine Learning Course, Lecture 1 - Andrew Ng"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="mt-4 p-4 bg-green-900/20 rounded-lg border border-green-700/30">
                    <p className="text-sm text-green-200">
                      <strong>🎓 Stanford University:</strong> Andrew Ng's legendary course has taught millions of students worldwide. This is where many AI careers begin!
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Zap size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-white mb-2">Ready to Transform Your Future?</h4>
                    <p className="text-blue-100">The AI revolution is happening now. Don't just watch it - be part of it!</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default AILearningPage;
