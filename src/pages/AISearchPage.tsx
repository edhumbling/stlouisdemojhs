import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, BookOpen, ExternalLink, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useHeader } from '../contexts/HeaderContext';
import SmartSearchBar, { SearchableItem, FilterOption } from '../components/common/SmartSearchBar';
import { useSearchState } from '../hooks/useSearchState';
import ShimmerLoader from '../components/common/ShimmerLoader';
import SEOHead from '../components/seo/SEOHead';

const AISearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [autoRedirectTimer, setAutoRedirectTimer] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [connectionRefused, setConnectionRefused] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const { setShowHeader } = useHeader();

  // Handle initial page loading with shimmer effect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setPageLoading(false);
    }, 1600); // 1.6 second initial loading

    return () => clearTimeout(loadingTimer);
  }, []);

  // Search state management
  const { handleExternalLinkClick } = useSearchState('ai-search');

  const aiEngines = [
    {
      id: 'index-globe',
      name: 'Index.Globe',
      url: 'https://index.globe.engineer/?theme=light&mode=light&color-scheme=light',
      description: 'Advanced AI-powered search engine with global indexing capabilities',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-cyan-600',
      glowColor: '#06b6d4',
      hasWhiteBackground: true
    },

    {
      id: 'farfalle',
      name: 'Farfalle',
      url: 'https://www.farfalle.dev',
      description: 'Intelligent search platform designed for developers and researchers',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#ec4899'
    },
    {
      id: 'chatlima',
      name: 'ChatLima',
      url: 'https://chatlima.com',
      description: 'Advanced AI chat platform with intelligent conversation capabilities',
      icon: <Bot className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-lime-500 to-green-600',
      glowColor: '#22c55e',
      hasWhiteBackground: true
    },
    {
      id: 'turboseek',
      name: 'TurboSeek',
      url: 'https://www.turboseek.io',
      description: 'Lightning-fast AI search with turbocharged performance',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-500 to-orange-600',
      glowColor: '#f97316'
    },
    {
      id: 't3-chat',
      name: 'T3 Chat',
      url: 'https://t3.chat',
      description: 'Advanced AI chat platform with modern interface and powerful capabilities',
      icon: <Bot className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-cyan-500 to-blue-600',
      glowColor: '#0ea5e9',
      hasWhiteBackground: true
    },
    {
      id: 'omniplex',
      name: 'Omniplex AI',
      url: 'https://omniplex.ai',
      description: 'Comprehensive AI search solution with multi-modal capabilities',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'andi',
      name: 'Andi Search',
      url: 'https://andisearch.com',
      description: 'Next-generation search engine powered by conversational AI',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'memfree',
      name: 'MemFree',
      url: 'https://www.memfree.me/',
      description: 'Free AI-powered search engine with memory and context awareness',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-teal-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'felladrin-minisearch',
      name: 'Felladrin MiniSearch',
      url: 'https://felladrin-minisearch.hf.space/',
      description: 'Compact AI search engine powered by Hugging Face with fast results',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },
    {
      id: 'explorer-globe',
      name: 'Explorer Globe',
      url: 'https://explorer.globe.engineer/',
      description: 'Advanced exploration and discovery platform with global search capabilities',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-cyan-600 to-blue-600',
      glowColor: '#0891b2'
    },
    {
      id: 'translator-globe',
      name: 'Translator Globe',
      url: 'https://translator.globe.engineer/',
      description: 'AI-powered translation and language processing platform with global reach',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-violet-600 to-purple-600',
      glowColor: '#7c3aed'
    },
    {
      id: 'britannica-chatbot',
      name: 'Britannica Chatbot',
      url: 'https://www.britannica.com/chatbot',
      description: 'Educational AI chatbot powered by Britannica\'s trusted knowledge base',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-amber-600 to-orange-600',
      glowColor: '#f59e0b',
      hasWhiteBackground: true
    },
    {
      id: 'grok',
      name: 'Grok',
      url: 'https://grok.com',
      description: 'Advanced AI assistant with real-time information and witty personality',
      icon: <img src="https://x.ai/favicon.ico" alt="Grok" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/000000/ffffff?text=G'; }} />,
      color: 'from-gray-800 to-black',
      glowColor: '#000000',
      hasWhiteBackground: true
    },
    {
      id: 'claude',
      name: 'Claude AI',
      url: 'https://claude.ai',
      description: 'Anthropic\'s AI assistant for thoughtful, helpful, and harmless conversations',
      icon: <img src="https://claude.ai/favicon.ico" alt="Claude" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/ea580c/ffffff?text=C'; }} />,
      color: 'from-orange-500 to-red-600',
      glowColor: '#ea580c',
      hasWhiteBackground: true
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      url: 'https://chatgpt.com/c/',
      description: 'OpenAI\'s conversational AI for creative and analytical tasks',
      icon: <img src="https://chat.openai.com/favicon.ico" alt="ChatGPT" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/10b981/ffffff?text=GPT'; }} />,
      color: 'from-green-500 to-emerald-600',
      glowColor: '#10b981',
      hasWhiteBackground: true
    },
    {
      id: 'mistral',
      name: 'Mistral Chat',
      url: 'https://chat.mistral.ai/chat',
      description: 'European AI assistant with advanced reasoning capabilities',
      icon: <img src="https://chat.mistral.ai/favicon.ico" alt="Mistral" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/3b82f6/ffffff?text=M'; }} />,
      color: 'from-blue-600 to-indigo-700',
      glowColor: '#3b82f6',
      hasWhiteBackground: true
    },
    {
      id: 'gemini',
      name: 'Gemini',
      url: 'https://gemini.google.com',
      description: 'Google\'s most capable AI model for multimodal understanding',
      icon: <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="Gemini" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/8b5cf6/ffffff?text=G'; }} />,
      color: 'from-blue-500 to-purple-600',
      glowColor: '#8b5cf6',
      hasWhiteBackground: true
    },
    {
      id: 'deepseek',
      name: 'DeepSeek Chat',
      url: 'https://deepseek.com/chat',
      description: 'Advanced AI model with deep reasoning and coding capabilities',
      icon: <img src="https://chat.deepseek.com/favicon.ico" alt="DeepSeek" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/ec4899/ffffff?text=DS'; }} />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#ec4899',
      hasWhiteBackground: true
    },
    {
      id: 'opennote',
      name: 'OpenNote',
      url: 'https://opennote.me/',
      description: 'AI-powered note-taking and knowledge management platform',
      icon: <img src="https://opennote.me/favicon.ico" alt="OpenNote" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/06b6d4/ffffff?text=ON'; }} />,
      color: 'from-teal-500 to-cyan-600',
      glowColor: '#06b6d4',
      hasWhiteBackground: true
    },
    {
      id: 'perplexity',
      name: 'Perplexity AI',
      url: 'https://perplexity.ai',
      description: 'AI-powered search engine that provides accurate answers with cited sources',
      icon: <img src="https://perplexity.ai/favicon.ico" alt="Perplexity" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/3b82f6/ffffff?text=P'; }} />,
      color: 'from-indigo-600 to-blue-700',
      glowColor: '#3b82f6',
      hasWhiteBackground: true
    },
    {
      id: 'perplexity-labs',
      name: 'Perplexity Labs',
      url: 'https://labs.perplexity.ai/',
      description: 'Experimental AI features and cutting-edge search capabilities from Perplexity',
      icon: <img src="https://labs.perplexity.ai/favicon.ico" alt="Perplexity Labs" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/7c3aed/ffffff?text=PL'; }} />,
      color: 'from-purple-600 to-violet-700',
      glowColor: '#7c3aed',
      hasWhiteBackground: true
    },
    {
      id: 'copilot',
      name: 'Microsoft Copilot',
      url: 'https://copilot.microsoft.com/',
      description: 'Microsoft\'s AI assistant for productivity, creativity, and everyday tasks',
      icon: <img src="https://copilot.microsoft.com/favicon.ico" alt="Microsoft Copilot" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/0078d4/ffffff?text=MS'; }} />,
      color: 'from-blue-600 to-cyan-600',
      glowColor: '#0078d4',
      hasWhiteBackground: true
    },
    {
      id: 'genspark',
      name: 'Genspark AI',
      url: 'https://www.genspark.ai/',
      description: 'AI-powered search engine that generates comprehensive sparkpages for queries',
      icon: <img src="https://www.genspark.ai/favicon.ico" alt="Genspark" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/ec4899/ffffff?text=GS'; }} />,
      color: 'from-pink-500 to-rose-600',
      glowColor: '#ec4899',
      hasWhiteBackground: true
    },
    {
      id: 'pi',
      name: 'Pi AI',
      url: 'https://pi.ai/',
      description: 'Personal AI assistant designed for supportive, smart, and helpful conversations',
      icon: <img src="https://pi.ai/favicon.svg" alt="Pi AI" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/8b5cf6/ffffff?text=π'; }} />,
      color: 'from-violet-500 to-purple-600',
      glowColor: '#8b5cf6',
      hasWhiteBackground: true
    },
    {
      id: 'qwen',
      name: 'Qwen Chat',
      url: 'https://chat.qwen.ai/',
      description: 'Advanced AI chat model with multilingual capabilities and reasoning skills',
      icon: <img src="https://qwen.ai/favicon.ico" alt="Qwen Chat" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/f97316/ffffff?text=Q'; }} />,
      color: 'from-red-500 to-orange-600',
      glowColor: '#f97316',
      hasWhiteBackground: true
    },
    {
      id: 'manus',
      name: 'Manus',
      url: 'https://manus.im/app',
      description: 'AI-powered writing and productivity assistant for enhanced creativity',
      icon: <img src="https://manus.im/favicon.ico" alt="Manus" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/10b981/ffffff?text=M'; }} />,
      color: 'from-emerald-500 to-green-600',
      glowColor: '#10b981',
      hasWhiteBackground: true
    },
    {
      id: 'together',
      name: 'Together AI',
      url: 'https://chat.together.ai/',
      description: 'Collaborative AI platform with access to multiple open-source models',
      icon: <img src="https://chat.together.ai/favicon.ico" alt="Together AI" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/64748b/ffffff?text=T'; }} />,
      color: 'from-slate-600 to-gray-700',
      glowColor: '#64748b',
      hasWhiteBackground: true
    },
    {
      id: 'huggingface',
      name: 'Hugging Face Chat',
      url: 'https://huggingface.co/chat/',
      description: 'Open-source AI chat platform with access to cutting-edge language models',
      icon: <img src="https://huggingface.co/favicon.ico" alt="Hugging Face Chat" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/f59e0b/ffffff?text=HF'; }} />,
      color: 'from-yellow-500 to-amber-600',
      glowColor: '#f59e0b',
      hasWhiteBackground: true
    },
    {
      id: 'notebooklm',
      name: 'NotebookLM',
      url: 'https://notebooklm.google.com/',
      description: 'Google\'s AI-powered research and note-taking assistant for personalized insights',
      icon: <img src="https://notebooklm.google.com/favicon.ico" alt="NotebookLM" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/3b82f6/ffffff?text=NB'; }} />,
      color: 'from-blue-500 to-indigo-600',
      glowColor: '#3b82f6',
      hasWhiteBackground: true
    },
    {
      id: 'khoj',
      name: 'Khoj AI',
      url: 'https://app.khoj.dev/',
      description: 'AI-powered personal assistant for search, chat, and knowledge management',
      icon: <img src="https://app.khoj.dev/static/assets/icons/favicon-32x32.png" alt="Khoj AI" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/f59e0b/ffffff?text=K'; }} />,
      color: 'from-amber-500 to-yellow-600',
      glowColor: '#f59e0b',
      hasWhiteBackground: true
    },
    {
      id: 'wolframalpha',
      name: 'WolframAlpha',
      url: 'https://www.wolframalpha.com/',
      description: 'Searchable knowledge base for computational queries and mathematical problems',
      icon: <img src="https://www.wolframalpha.com/favicon.ico" alt="WolframAlpha" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/ff6600/ffffff?text=W'; }} />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ff6600',
      hasWhiteBackground: true
    },
    {
      id: 'you-search',
      name: 'You.com',
      url: 'https://you.com/',
      description: 'AI search engine with personalized results and privacy focus',
      icon: <img src="https://you.com/favicon.ico" alt="You.com" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/0066cc/ffffff?text=Y'; }} />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#0066cc',
      hasWhiteBackground: true
    },
    {
      id: 'phind',
      name: 'Phind',
      url: 'https://www.phind.com/',
      description: 'Llama-powered search engine optimized for developers and technical queries',
      icon: <img src="https://www.phind.com/favicon.ico" alt="Phind" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/10b981/ffffff?text=P'; }} />,
      color: 'from-emerald-600 to-green-600',
      glowColor: '#10b981',
      hasWhiteBackground: true
    },
    {
      id: 'morphic',
      name: 'Morphic',
      url: 'https://www.morphic.sh/',
      description: 'GPT-4o-mini AI search engine with conversational interface',
      icon: <img src="https://www.morphic.sh/favicon.ico" alt="Morphic" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/8b5cf6/ffffff?text=M'; }} />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6',
      hasWhiteBackground: true
    },
    {
      id: 'komo',
      name: 'Komo AI',
      url: 'https://komo.ai/',
      description: 'AI search engine with instant answers and no sign-up required',
      icon: <img src="https://komo.ai/favicon.ico" alt="Komo AI" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/f59e0b/ffffff?text=K'; }} />,
      color: 'from-yellow-500 to-orange-600',
      glowColor: '#f59e0b',
      hasWhiteBackground: true
    },
    {
      id: 'jina-search',
      name: 'Jina Search',
      url: 'https://search.jina.ai/',
      description: 'AI search engine with neural information retrieval capabilities',
      icon: <img src="https://jina.ai/favicon.ico" alt="Jina Search" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/3b82f6/ffffff?text=J'; }} />,
      color: 'from-blue-500 to-cyan-600',
      glowColor: '#3b82f6',
      hasWhiteBackground: true
    },
    {
      id: 'felo',
      name: 'Felo AI',
      url: 'https://felo.ai/',
      description: 'AI search engine with AI agents and multilingual support',
      icon: <img src="https://felo.ai/favicon.ico" alt="Felo AI" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/ec4899/ffffff?text=F'; }} />,
      color: 'from-pink-500 to-rose-600',
      glowColor: '#ec4899',
      hasWhiteBackground: true
    },
    {
      id: 'searc-ai',
      name: 'Searc.ai',
      url: 'https://searc.ai/',
      description: 'AI-powered search engine with intelligent query understanding',
      icon: <img src="https://searc.ai/favicon.ico" alt="Searc.ai" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/059669/ffffff?text=S'; }} />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#059669',
      hasWhiteBackground: true
    },
    {
      id: 'rabbitholes',
      name: 'RabbitHoles',
      url: 'https://rabbitholes.dojoma.ai/',
      description: 'Mind map style AI search with visual knowledge exploration',
      icon: <img src="https://rabbitholes.dojoma.ai/favicon.ico" alt="RabbitHoles" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/7c3aed/ffffff?text=R'; }} />,
      color: 'from-violet-600 to-purple-600',
      glowColor: '#7c3aed',
      hasWhiteBackground: true
    },
    {
      id: 'hika',
      name: 'Hika',
      url: 'https://hika.fyi/',
      description: 'DeepSeek-R1 powered AI search engine with fast results',
      icon: <img src="https://hika.fyi/favicon.ico" alt="Hika" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/06b6d4/ffffff?text=H'; }} />,
      color: 'from-cyan-500 to-teal-600',
      glowColor: '#06b6d4',
      hasWhiteBackground: true
    },
    {
      id: 'ayesoul',
      name: 'AyeSoul',
      url: 'https://ayesoul.com/',
      description: 'AI search engine with personalized results and no sign-up required',
      icon: <img src="https://ayesoul.com/favicon.ico" alt="AyeSoul" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/f97316/ffffff?text=A'; }} />,
      color: 'from-orange-500 to-red-600',
      glowColor: '#f97316',
      hasWhiteBackground: true
    },
    {
      id: 'venice',
      name: 'Venice AI',
      url: 'https://venice.ai/',
      description: 'LLama 3 powered AI search engine with privacy focus',
      icon: <img src="https://venice.ai/favicon.ico" alt="Venice AI" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/1e40af/ffffff?text=V'; }} />,
      color: 'from-blue-700 to-indigo-700',
      glowColor: '#1e40af',
      hasWhiteBackground: true
    },
    {
      id: 'uncovr',
      name: 'Uncovr',
      url: 'https://uncovr.app/',
      description: 'GPT-4o-mini and Gemini-2.0-Flash powered AI search engine',
      icon: <img src="https://uncovr.app/favicon.ico" alt="Uncovr" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/dc2626/ffffff?text=U'; }} />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626',
      hasWhiteBackground: true
    },
    {
      id: 'exa',
      name: 'Exa',
      url: 'https://exa.ai/',
      description: 'AI search engine for finding high-quality web content',
      icon: <img src="https://exa.ai/favicon.ico" alt="Exa" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/9333ea/ffffff?text=E'; }} />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#9333ea',
      hasWhiteBackground: true
    },
    {
      id: 'lepton-search',
      name: 'Lepton Search',
      url: 'https://search.lepton.run/',
      description: 'Open-source AI search engine with fast and accurate results',
      icon: <img src="https://lepton.ai/favicon.ico" alt="Lepton Search" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/0ea5e9/ffffff?text=L'; }} />,
      color: 'from-sky-500 to-blue-600',
      glowColor: '#0ea5e9',
      hasWhiteBackground: true
    },
    {
      id: 'scira',
      name: 'Scira AI',
      url: 'https://scira.ai/',
      description: 'Claude Sonnet 3.7, Grok 3, Mistral Small 3.1 with AI search engine capabilities',
      icon: <img src="https://scira.ai/favicon.ico" alt="Scira AI" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/8b5cf6/ffffff?text=S'; }} />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6',
      hasWhiteBackground: true
    },
    {
      id: 'lmarena',
      name: 'LMArena',
      url: 'https://lmarena.ai/',
      description: 'Multiple chatbots arena with no sign-up required for model comparison',
      icon: <img src="https://lmarena.ai/favicon.ico" alt="LMArena" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/f59e0b/ffffff?text=LM'; }} />,
      color: 'from-yellow-500 to-orange-600',
      glowColor: '#f59e0b',
      hasWhiteBackground: true
    },
    {
      id: 'duckduckgo-ai',
      name: 'DuckDuckGo AI',
      url: 'https://duck.ai/',
      description: 'Multiple chatbots including o3-Mini with privacy-focused approach',
      icon: <img src="https://duck.ai/favicon.ico" alt="DuckDuckGo AI" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/de5833/ffffff?text=DD'; }} />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#de5833',
      hasWhiteBackground: true
    },
    {
      id: 'chatk',
      name: 'ChatK',
      url: 'https://chat.oaichat.cc/',
      description: 'GPT-4o and DeepSeek-R1-32b with multiple chatbot access',
      icon: <img src="https://chat.oaichat.cc/favicon.ico" alt="ChatK" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/10b981/ffffff?text=CK'; }} />,
      color: 'from-emerald-600 to-green-600',
      glowColor: '#10b981',
      hasWhiteBackground: true
    },
    {
      id: 'ai-assistant-bot',
      name: 'AI Assistant',
      url: 'https://aiassistantbot.pages.dev/',
      description: 'Deepseek-R1, Qwen QwQ-32B and multiple chatbots with no sign-up',
      icon: <img src="https://aiassistantbot.pages.dev/favicon.ico" alt="AI Assistant" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/3b82f6/ffffff?text=AI'; }} />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6',
      hasWhiteBackground: true
    },
    {
      id: 'liquid-ai',
      name: 'Liquid AI Playground',
      url: 'https://playground.liquid.ai/chat?model=cm648lmn1000008js1hxh1ir5',
      description: 'Advanced AI playground with cutting-edge liquid neural networks and reasoning models',
      icon: <img src="https://playground.liquid.ai/favicon.ico" alt="Liquid AI" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/06b6d4/ffffff?text=LA'; }} />,
      color: 'from-cyan-500 to-blue-600',
      glowColor: '#06b6d4',
      hasWhiteBackground: true,
      openExternally: true
    },
    {
      id: 'supermemory-opensearch',
      name: 'SuperMemory OpenSearch',
      url: 'https://opensearch.supermemory.ai',
      description: 'Advanced AI-powered search and memory system for intelligent information retrieval',
      icon: <img src="https://opensearch.supermemory.ai/favicon.ico" alt="SuperMemory" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/8b5cf6/ffffff?text=SM'; }} />,
      color: 'from-violet-500 to-purple-600',
      glowColor: '#8b5cf6',
      hasWhiteBackground: true,
      openExternally: true
    },
    {
      id: 'gizai',
      name: 'GizAI',
      url: 'https://www.giz.ai/',
      description: 'Multiple chatbots platform with various AI models and capabilities',
      icon: <img src="https://www.giz.ai/favicon.ico" alt="GizAI" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/ec4899/ffffff?text=GZ'; }} />,
      color: 'from-pink-500 to-rose-600',
      glowColor: '#ec4899',
      hasWhiteBackground: true
    },
    {
      id: 'scispace',
      name: 'SciSpace',
      url: 'https://scispace.com/',
      description: 'Research paper chatbot for scientific literature and academic queries',
      icon: <img src="https://scispace.com/favicon.ico" alt="SciSpace" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/059669/ffffff?text=SS'; }} />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#059669',
      hasWhiteBackground: true
    },
    {
      id: 'learn-about',
      name: 'Learn About',
      url: 'https://learning.google.com/experiments/learn-about',
      description: 'Google\'s educational search AI for learning and discovery',
      icon: <img src="https://learning.google.com/favicon.ico" alt="Learn About" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/4285f4/ffffff?text=LA'; }} />,
      color: 'from-blue-500 to-cyan-600',
      glowColor: '#4285f4',
      hasWhiteBackground: true
    },
    {
      id: 'helixmind',
      name: 'HelixMind',
      url: 'https://helixmind.online/',
      description: 'Multiple chatbots platform with various AI models and capabilities',
      icon: <img src="https://helixmind.online/favicon.ico" alt="HelixMind" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/7c3aed/ffffff?text=HM'; }} />,
      color: 'from-violet-600 to-purple-600',
      glowColor: '#7c3aed',
      hasWhiteBackground: true
    },
    {
      id: 'infermatic',
      name: 'Infermatic',
      url: 'https://infermatic.ai/',
      description: 'Multiple chatbots platform with advanced AI inference capabilities',
      icon: <img src="https://infermatic.ai/favicon.ico" alt="Infermatic" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/f97316/ffffff?text=IF'; }} />,
      color: 'from-orange-500 to-red-600',
      glowColor: '#f97316',
      hasWhiteBackground: true
    },
    {
      id: 'electron-hub',
      name: 'Electron Hub',
      url: 'https://www.electronhub.top/',
      description: 'Deepseek-R1, o3-Mini-High and multiple chatbots platform',
      icon: <img src="https://www.electronhub.top/favicon.ico" alt="Electron Hub" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/06b6d4/ffffff?text=EH'; }} />,
      color: 'from-cyan-500 to-teal-600',
      glowColor: '#06b6d4',
      hasWhiteBackground: true
    },
    {
      id: 'nvidia-nim',
      name: 'NVIDIA NIM',
      url: 'https://build.nvidia.com/',
      description: 'Deepseek-R1 and multiple chatbots with no sign-up required',
      icon: <img src="https://build.nvidia.com/favicon.ico" alt="NVIDIA NIM" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/76b900/ffffff?text=NV'; }} />,
      color: 'from-green-500 to-lime-600',
      glowColor: '#76b900',
      hasWhiteBackground: true
    },
    {
      id: 'oichat',
      name: 'OIChat',
      url: 'https://oichat.cc/',
      description: 'Multiple chatbots platform with various AI models and capabilities',
      icon: <img src="https://oichat.cc/favicon.ico" alt="OIChat" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/1e40af/ffffff?text=OI'; }} />,
      color: 'from-blue-700 to-indigo-700',
      glowColor: '#1e40af',
      hasWhiteBackground: true
    },
    {
      id: 'kimi-chat',
      name: 'Kimi',
      url: 'https://kimi.moonshot.cn/',
      description: 'Moonshot AI chatbot with long context understanding capabilities',
      icon: <img src="https://kimi.moonshot.cn/favicon.ico" alt="Kimi" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/9333ea/ffffff?text=K'; }} />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#9333ea',
      hasWhiteBackground: true
    },
    {
      id: 'groq-chat',
      name: 'Groq',
      url: 'https://groq.com/',
      description: 'Ultra-fast AI inference with Llama and Mixtral models',
      icon: <img src="https://groq.com/favicon.ico" alt="Groq" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/f97316/ffffff?text=GQ'; }} />,
      color: 'from-orange-500 to-red-600',
      glowColor: '#f97316',
      hasWhiteBackground: true
    },
    {
      id: 'sambanova',
      name: 'SambaNova',
      url: 'https://cloud.sambanova.ai/',
      description: 'High-performance AI platform with advanced language models',
      icon: <img src="https://cloud.sambanova.ai/favicon.ico" alt="SambaNova" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/dc2626/ffffff?text=SN'; }} />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626',
      hasWhiteBackground: true
    },
    {
      id: 'lambda-chat',
      name: 'Lambda Chat',
      url: 'https://lambda.chat/',
      description: 'Multiple AI models platform with advanced chatbot capabilities',
      icon: <img src="https://lambda.chat/favicon.ico" alt="Lambda Chat" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/059669/ffffff?text=LC'; }} />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#059669',
      hasWhiteBackground: true
    },
    {
      id: 'maisa',
      name: 'Maisa',
      url: 'https://maisa.ai/',
      description: 'AI assistant platform with multiple chatbot models and capabilities',
      icon: <img src="https://maisa.ai/favicon.ico" alt="Maisa" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/8b5cf6/ffffff?text=MA'; }} />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6',
      hasWhiteBackground: true
    },
    {
      id: 'meta-ai',
      name: 'Meta AI',
      url: 'https://www.meta.ai/',
      description: 'Meta\'s AI assistant powered by Llama models with advanced capabilities',
      icon: <img src="https://www.meta.ai/favicon.ico" alt="Meta AI" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/1877f2/ffffff?text=M'; }} />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#1877f2',
      hasWhiteBackground: true
    },
    {
      id: 'baidu-chat',
      name: 'Baidu Chat',
      url: 'https://yiyan.baidu.com/',
      description: 'Baidu\'s ERNIE-powered AI chatbot with Chinese language expertise',
      icon: <img src="https://yiyan.baidu.com/favicon.ico" alt="Baidu Chat" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/2932e1/ffffff?text=BD'; }} />,
      color: 'from-blue-700 to-indigo-800',
      glowColor: '#2932e1',
      hasWhiteBackground: true
    },
    {
      id: 'minimax-ai',
      name: 'MiniMax AI',
      url: 'https://www.minimaxi.com/',
      description: 'Advanced AI chatbot platform with multimodal capabilities',
      icon: <img src="https://www.minimaxi.com/favicon.ico" alt="MiniMax AI" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/06b6d4/ffffff?text=MM'; }} />,
      color: 'from-cyan-500 to-teal-600',
      glowColor: '#06b6d4',
      hasWhiteBackground: true
    },
    {
      id: 'reka-ai',
      name: 'Reka',
      url: 'https://chat.reka.ai/',
      description: 'Multimodal AI assistant with advanced reasoning capabilities',
      icon: <img src="https://chat.reka.ai/favicon.ico" alt="Reka" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/f59e0b/ffffff?text=R'; }} />,
      color: 'from-yellow-500 to-orange-600',
      glowColor: '#f59e0b',
      hasWhiteBackground: true
    },
    {
      id: 'poe-ai',
      name: 'Poe',
      url: 'https://poe.com/',
      description: 'Quora\'s AI platform with access to multiple chatbots and models',
      icon: <img src="https://poe.com/favicon.ico" alt="Poe" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/7c3aed/ffffff?text=P'; }} />,
      color: 'from-violet-600 to-purple-600',
      glowColor: '#7c3aed',
      hasWhiteBackground: true
    },
    {
      id: 'opendeepresearch',
      name: 'OpenDeepResearch',
      url: 'https://opendeepresearch.dev/',
      description: 'Open-source deep research platform for AI-powered academic and scientific research',
      icon: <img src="https://opendeepresearch.dev/favicon.ico" alt="OpenDeepResearch" className="w-6 h-6 sm:w-8 sm:h-8" loading="eager" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/32/10b981/ffffff?text=ODR'; }} />,
      color: 'from-emerald-600 to-green-600',
      glowColor: '#10b981',
      hasWhiteBackground: true
    }
  ];

  const selectedEngineData = aiEngines.find(engine => engine.id === selectedEngine);

  // Convert engines to searchable items
  const searchableItems: SearchableItem[] = useMemo(() => {
    return aiEngines.map(engine => ({
      id: engine.id,
      title: engine.name,
      description: engine.description,
      category: engine.name.includes('Chat') || engine.name.includes('AI') || engine.name.includes('GPT') ? 'AI Assistants' : 'Search Engines',
      type: 'ai-tool',
      url: engine.url,
      ...engine
    }));
  }, []);

  // Filter options for search
  const categoryOptions: FilterOption[] = [
    { value: 'AI Assistants', label: 'AI Assistants', count: aiEngines.filter(e => e.name.includes('Chat') || e.name.includes('AI') || e.name.includes('GPT')).length },
    { value: 'Search Engines', label: 'Search Engines', count: aiEngines.filter(e => !e.name.includes('Chat') && !e.name.includes('AI') && !e.name.includes('GPT')).length }
  ];

  const typeOptions: FilterOption[] = [
    { value: 'ai-tool', label: 'AI Tools', count: aiEngines.length }
  ];

  // Handle search results
  const handleSearchResults = useCallback((results: SearchableItem[]) => {
    setSearchResults(results);
  }, []);

  // Get filtered engines based on search results
  const filteredEngines = useMemo(() => {
    if (searchResults.length === 0) {
      return aiEngines;
    }

    return searchResults.map(result => {
      return aiEngines.find(engine => engine.id === result.id);
    }).filter(Boolean) as typeof aiEngines;
  }, [searchResults]);

  // Control header visibility based on whether we're viewing an individual engine
  useEffect(() => {
    if (selectedEngine) {
      // Hide header when viewing individual engine
      setShowHeader(false);
    } else {
      // Show header when viewing main grid
      setShowHeader(true);
    }

    // Cleanup: ensure header is shown when component unmounts
    return () => {
      setShowHeader(true);
    };
  }, [selectedEngine, setShowHeader]);

  // Enhanced iframe monitoring with connection detection
  useEffect(() => {
    if (selectedEngine && !iframeError && !connectionRefused) {
      let checkCount = 0;
      const maxChecks = 5; // Check 5 times over 10 seconds
      let connectionFailures = 0;

      const checkIframeStatus = () => {
        const iframe = document.querySelector('iframe[title="' + selectedEngineData?.name + '"]') as HTMLIFrameElement;

        if (iframe && isLoading && checkCount < maxChecks) {
          checkCount++;

          try {
            // Multiple ways to detect if iframe is loading properly
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            const iframeSrc = iframe.src;

            // Check if iframe has loaded content successfully
            if (iframeDoc && iframeDoc.readyState === 'complete') {
              // Additional check to see if the page actually loaded content
              const bodyContent = iframeDoc.body?.innerHTML || '';
              if (bodyContent.length > 100) { // Has substantial content
                console.log(`${selectedEngineData?.name} iframe loaded successfully with content`);
                handleIframeLoad();
                return;
              }
            }

            // Check for connection refused indicators
            if (iframeDoc) {
              const pageText = iframeDoc.body?.textContent?.toLowerCase() || '';
              const pageHTML = iframeDoc.body?.innerHTML?.toLowerCase() || '';

              // Look for common connection error messages
              const connectionErrorIndicators = [
                'connection refused',
                'connection timed out',
                'this site can\'t be reached',
                'refused to connect',
                'err_connection_refused',
                'err_connection_timed_out',
                'err_network_changed',
                'unable to connect',
                'connection failed',
                'network error'
              ];

              const hasConnectionError = connectionErrorIndicators.some(indicator =>
                pageText.includes(indicator) || pageHTML.includes(indicator)
              );

              if (hasConnectionError) {
                console.log(`${selectedEngineData?.name} connection refused detected`);
                setConnectionRefused(true);
                setIsLoading(false);
                return;
              }
            }

            // Check if iframe URL is accessible and not blank
            if (iframeSrc && iframeSrc !== 'about:blank') {
              // If we've checked multiple times and still loading, it might be working
              if (checkCount >= 4) {
                console.log(`${selectedEngineData?.name} appears to be loading slowly, giving more time`);
                return;
              }
            } else {
              connectionFailures++;
              if (connectionFailures >= 3) {
                console.log(`${selectedEngineData?.name} multiple connection failures detected`);
                setConnectionRefused(true);
                setIsLoading(false);
                return;
              }
            }

            // Schedule next check
            if (checkCount < maxChecks) {
              setTimeout(checkIframeStatus, 2000); // Check every 2 seconds
            }

          } catch (e) {
            connectionFailures++;
            console.log(`Connection check ${checkCount} for ${selectedEngineData?.name}:`, e instanceof Error ? e.message : 'Unknown error');

            // If we have multiple connection failures, likely a connection issue
            if (connectionFailures >= 3) {
              console.log(`${selectedEngineData?.name} multiple connection failures, treating as connection refused`);
              setConnectionRefused(true);
              setIsLoading(false);
              return;
            }

            // Schedule next check
            if (checkCount < maxChecks) {
              setTimeout(checkIframeStatus, 2000);
            }
          }
        }
      };

      // Start checking after 3 seconds to give iframe time to start loading
      const initialTimer = setTimeout(checkIframeStatus, 3000);

      return () => {
        clearTimeout(initialTimer);
      };
    }
  }, [selectedEngine, iframeError, isLoading, selectedEngineData, connectionRefused, loadAttempts]);

  const handleBack = () => {
    if (selectedEngine) {
      setSelectedEngine(null);
      setIsLoading(false);
      setIframeError(false);
      setShowAlternatives(false);
      setConnectionRefused(false);
      setLoadAttempts(0);
      // Clear any auto-redirect timer
      if (autoRedirectTimer) {
        clearTimeout(autoRedirectTimer);
        setAutoRedirectTimer(null);
      }
      // Scroll to top when returning to main page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(-1);
    }
  };



  const handleEngineClick = (engineId: string) => {
    setIsLoading(true);
    setIframeError(false);
    setShowAlternatives(false);
    setConnectionRefused(false);
    setLoadAttempts(prev => prev + 1);
    setSelectedEngine(engineId);

    const engineData = aiEngines.find(engine => engine.id === engineId);

    // List of engines that are definitely known to block iframe embedding - redirect immediately
    // Reduced list to only the most problematic ones
    const definitelyBlockedEngines = ['grok', 'claude', 'chatgpt', 'mistral', 'gemini', 'copilot', 'meta-ai', 'groq-chat', 'poe-ai', 'baidu-chat'];

    if (definitelyBlockedEngines.includes(engineId)) {
      console.log(`${engineData?.name} is known to block iframes, redirecting immediately`);
      setIsLoading(false);
      setIframeError(true);

      // Show brief message then redirect
      setTimeout(() => {
        if (engineData) {
          handleExternalLinkClick(engineData.url);
          // Go back to main page
          setTimeout(() => {
            setSelectedEngine(null);
            setIframeError(false);
            setShowAlternatives(false);
          }, 500);
        }
      }, 1000);
      return;
    }

    // For other engines, give them more time to load - 8 seconds instead of 2
    const timer = setTimeout(() => {
      if (engineData && isLoading) {
        console.log(`Auto-redirecting ${engineData.name} to browser due to loading timeout after 8 seconds`);
        setIsLoading(false);
        setIframeError(true);

        // Show error message briefly then redirect
        setTimeout(() => {
          handleExternalLinkClick(engineData.url);
          // Go back to main page after opening
          setTimeout(() => {
            setSelectedEngine(null);
            setIframeError(false);
            setShowAlternatives(false);
          }, 500);
        }, 1500);
      }
    }, 8000); // Increased from 2000 to 8000 (8 seconds)

    setAutoRedirectTimer(timer);
  };

  const handleIframeLoad = () => {
    console.log(`${selectedEngineData?.name} iframe loaded successfully`);
    setIsLoading(false);
    setIframeError(false);
    // Clear auto-redirect timer since iframe loaded successfully
    if (autoRedirectTimer) {
      clearTimeout(autoRedirectTimer);
      setAutoRedirectTimer(null);
    }
  };

  const handleIframeError = () => {
    console.log('Iframe error detected - this might be normal for some sites');

    // Don't immediately set error state - many sites trigger this but still work
    // Only set error if we're still loading after the timeout
    setTimeout(() => {
      if (isLoading) {
        console.log('Iframe still loading after error event, treating as actual failure');
        setIsLoading(false);
        setIframeError(true);
        setShowAlternatives(true);

        // Clear auto-redirect timer
        if (autoRedirectTimer) {
          clearTimeout(autoRedirectTimer);
          setAutoRedirectTimer(null);
        }

        // Auto-redirect when iframe definitely fails
        const engineData = aiEngines.find(engine => engine.id === selectedEngine);
        if (engineData) {
          console.log(`Auto-redirecting ${engineData.name} to browser due to confirmed iframe failure`);
          setTimeout(() => {
            handleExternalLinkClick(engineData.url);
            // Go back to main page after opening
            setTimeout(() => {
              setSelectedEngine(null);
              setIframeError(false);
              setShowAlternatives(false);
            }, 500);
          }, 2000); // Wait 2 seconds to show the error message
        }
      }
    }, 3000); // Wait 3 seconds before treating error as real failure
  };

  const handleOpenInBrowser = () => {
    if (selectedEngineData) {
      handleExternalLinkClick(selectedEngineData.url);
    }
  };

  const handleRefresh = () => {
    if (selectedEngine) {
      console.log(`Refreshing ${selectedEngineData?.name}`);
      setIsLoading(true);
      setIframeError(false);
      setConnectionRefused(false);
      setShowAlternatives(false);
      setLoadAttempts(prev => prev + 1);

      // Clear any existing timer
      if (autoRedirectTimer) {
        clearTimeout(autoRedirectTimer);
        setAutoRedirectTimer(null);
      }

      // Force iframe reload by changing src
      const iframe = document.querySelector('iframe[title="' + selectedEngineData?.name + '"]') as HTMLIFrameElement;
      if (iframe && selectedEngineData) {
        iframe.src = selectedEngineData.url + (selectedEngineData.url.includes('?') ? '&' : '?') + 'refresh=' + Date.now();
      }
    }
  };

  // If an engine is selected, show the full-page iframe view - Like LearnHub
  if (selectedEngine && selectedEngineData) {
    // All AI engines use their original white backgrounds when opened

    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* Header - Enhanced Purple Back Button */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-4 sm:py-5 shadow-2xl border-b border-purple-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-purple-700/70 hover:bg-purple-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/50 hover:border-purple-400/70 flex-shrink-0 ring-2 ring-purple-500/20 hover:ring-purple-400/30"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {selectedEngineData.name}
              </h1>

              {/* Quick access button */}
              <button
                onClick={handleOpenInBrowser}
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/80 hover:bg-blue-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm ml-auto"
              >
                <Globe size={14} />
                <span className="hidden sm:inline">Open in Browser</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full viewport iframe - No footer */}
        <div className="w-full h-full pt-20 sm:pt-24 relative">
          {!iframeError ? (
            <>
              <iframe
                src={selectedEngineData.url}
                className="w-full h-full border-0 relative z-10"
                title={selectedEngineData.name}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads allow-modals allow-presentation"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                referrerPolicy="no-referrer-when-downgrade"
                style={selectedEngineData.hasWhiteBackground ? {
                  filter: 'invert(1) hue-rotate(180deg)',
                  background: 'white'
                } : {}}
              />

              {/* Loading Overlay with Shimmer Effect */}
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center z-20">
                  <div className="text-center max-w-md px-6">
                    {/* Shimmer Logo Placeholder */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-xl shimmer-dark"></div>

                    {/* Shimmer Text Lines */}
                    <div className="space-y-3 mb-6">
                      <div className="h-6 w-48 mx-auto rounded shimmer-dark"></div>
                      <div className="h-4 w-64 mx-auto rounded shimmer-dark"></div>
                      <div className="h-4 w-56 mx-auto rounded shimmer-dark"></div>
                    </div>

                    {/* Loading Spinner */}
                    <div className="w-8 h-8 border-2 border-gray-600 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>

                    {/* Loading Text */}
                    <p className="text-white font-medium text-lg">Loading {selectedEngineData.name}...</p>
                    <p className="text-gray-300 text-sm mt-2">Checking connection and loading within the page</p>
                    <p className="text-blue-400 text-xs mt-1">
                      {loadAttempts > 1 ? `Attempt #${loadAttempts} • ` : ''}
                      Will provide options if connection fails
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : connectionRefused ? (
            /* Connection Refused State - Show user options */
            <div className="w-full h-full bg-gradient-to-br from-red-900/20 via-gray-800 to-gray-900 flex items-center justify-center p-6">
              <div className="text-center max-w-lg">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-10 h-10 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Connection Issue</h3>
                  <p className="text-gray-300 mb-4">
                    {selectedEngineData.name} is having trouble loading within the page.
                  </p>
                  <p className="text-yellow-400 mb-6 font-medium">
                    ⚠️ This could be due to network issues or site restrictions.
                  </p>
                </div>

                {/* User Options */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Refresh Button */}
                    <button
                      onClick={handleRefresh}
                      className="p-4 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold">Try Again</div>
                        <div className="text-sm opacity-90">Refresh the page</div>
                      </div>
                    </button>

                    {/* Open in Browser Button */}
                    <button
                      onClick={handleOpenInBrowser}
                      className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                    >
                      <Globe className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-semibold">Open Externally</div>
                        <div className="text-sm opacity-90">New browser tab</div>
                      </div>
                    </button>
                  </div>

                  <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <p className="text-sm text-gray-300 mb-2">
                      <strong>Attempt #{loadAttempts}</strong> - What would you like to do?
                    </p>
                    <p className="text-xs text-gray-400">
                      • <strong>Try Again:</strong> Refresh and attempt to load within the page<br/>
                      • <strong>Open Externally:</strong> Launch in a new browser tab with full functionality
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Error State - Show alternatives */
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Opening {selectedEngineData.name}</h3>
                  <p className="text-gray-300 mb-4">
                    {selectedEngineData.name} requires opening in a new browser tab for the best experience.
                  </p>
                  <p className="text-blue-400 mb-6 font-medium">
                    🚀 Opening in browser now...
                  </p>
                </div>

                {/* Open in Browser Button */}
                <div className="space-y-4">
                  <button
                    onClick={handleOpenInBrowser}
                    className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <Globe className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-semibold">Open {selectedEngineData.name}</div>
                      <div className="text-sm opacity-90">Launch in new browser tab</div>
                    </div>
                  </button>

                  <p className="text-sm text-gray-400">
                    This will open {selectedEngineData.name} in a new tab where you can use all its features without restrictions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show shimmer loading for initial page load
  if (pageLoading) {
    return (
      <div className="min-h-screen bg-black">
        {/* Header Shimmer */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <ShimmerLoader variant="silver" width="w-20" height="h-10" className="rounded-lg" />
              <ShimmerLoader variant="silver" width="w-32" height="h-8" className="rounded-lg" />
            </div>
          </div>
        </div>

        {/* Main Content Shimmer */}
        <main className="flex-1 py-6 sm:py-8">
          <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
            {/* Introduction Shimmer */}
            <div className="text-center mb-8">
              <ShimmerLoader variant="silver" width="w-16" height="h-16" className="mx-auto mb-4 rounded-2xl" />
              <ShimmerLoader variant="silver" width="w-64" height="h-8" className="mx-auto mb-4 rounded-lg" />
              <ShimmerLoader variant="silver" width="w-96" height="h-6" className="mx-auto mb-2 rounded-lg" />
              <ShimmerLoader variant="silver" width="w-80" height="h-6" className="mx-auto rounded-lg" />
            </div>

            {/* Search Bar Shimmer */}
            <div className="mb-8">
              <ShimmerLoader variant="silver" width="w-full" height="h-12" className="rounded-xl" />
            </div>

            {/* AI Tools Grid Shimmer */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <ShimmerLoader
                  key={item}
                  variant="silver"
                  width="w-full"
                  height="h-[200px]"
                  className="rounded-2xl"
                />
              ))}
            </div>

            {/* Footer Message Shimmer */}
            <div className="mt-8 sm:mt-12 text-center">
              <ShimmerLoader variant="silver" width="w-full" height="h-32" className="rounded-2xl" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="AI Search | AI-Powered Learning & Educational Resources - St. Louis Demonstration JHS"
        description="AI Search - Experience the future of learning with our AI-powered educational search platform. Find personalized study materials, academic resources, and learning tools tailored specifically for St. Louis Demonstration JHS students."
        keywords="AI search, educational AI, learning tools, study materials, academic resources, AI-powered search, educational technology, student resources"
        url="/ai-search"
        type="website"
        pageType="ai-search"
        useGalleryImages={true}
      />
      {/* Back Button and Title Section */}
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
              AI Search
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {/* Introduction */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-4 shadow-2xl">
              <Bot size={32} className="text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              AI Search & Chat Tools
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Access {aiEngines.length}+ powerful AI search engines and chat assistants in one place.
            </p>
          </div>

          {/* Smart Search Bar */}
          <div className="mb-8">
            <SmartSearchBar
              items={searchableItems}
              onSearchResults={handleSearchResults}
              placeholder={`Search ${aiEngines.length}+ AI tools...`}
              accentColor="purple"
              categories={categoryOptions}
              types={typeOptions}
              enableIntentDetection={true}
              className="mb-6"
              pageKey="ai-search"
              onExternalLinkClick={handleExternalLinkClick}
            />

            {/* Learn more about AI link */}
            <div className="text-center">
              <p className="text-base text-gray-400 leading-relaxed">
                Learn more about{' '}
                <button
                  onClick={() => navigate('/ai')}
                  className="text-yellow-400 hover:text-yellow-300 underline decoration-yellow-400 hover:decoration-yellow-300 underline-offset-2 font-medium transition-all duration-300 hover:shadow-[0_0_10px_rgba(250,204,21,0.5)] hover:text-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                  style={{
                    textShadow: '0 0 8px rgba(250, 204, 21, 0.6), 0 0 16px rgba(250, 204, 21, 0.4)',
                    filter: 'drop-shadow(0 0 4px rgba(250, 204, 21, 0.3))'
                  }}
                >
                  Artificial Intelligence here
                </button>
              </p>
            </div>
          </div>

          {/* AI Engines Grid - Standardized Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredEngines.map((engine, index) => (
              <motion.div
                key={engine.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <button
                  onClick={() => handleEngineClick(engine.id)}
                  className="w-full h-[200px] bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:bg-gray-700/60 active:scale-[0.98] text-left relative overflow-hidden group flex flex-col"
                >
                  {/* Background Gradient */}
                  <div
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${engine.glowColor}20 0%, transparent 50%)`
                    }}
                  />

                  {/* Status Indicators */}
                  <div className="absolute top-3 right-3 flex gap-1">
                    <div className="px-2 py-1 rounded-full text-xs font-bold text-white bg-purple-500/80">
                      AI
                    </div>
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-3 flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: engine.glowColor }}
                    >
                      {React.isValidElement(engine.icon) && engine.icon.type === 'img' ? (
                        React.cloneElement(engine.icon as React.ReactElement<any>, {
                          className: "w-6 h-6"
                        })
                      ) : (
                        React.cloneElement(engine.icon as React.ReactElement<any>, {
                          className: "w-6 h-6"
                        })
                      )}
                    </div>

                    {/* Resource Type Indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
                      <ExternalLink className="w-2.5 h-2.5 text-purple-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col space-y-2">
                    {/* Title */}
                    <h3 className="text-sm font-bold text-white leading-tight group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                      {engine.name}
                    </h3>

                    {/* Category */}
                    <p className="text-xs text-purple-400 font-medium line-clamp-1">
                      {engine.name.includes('Chat') || engine.name.includes('AI') || engine.name.includes('GPT') ? 'AI Assistant' : 'Search Engine'}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1">
                      {engine.description}
                    </p>

                    {/* Action Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-700/30 mt-auto">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-purple-400 font-medium">
                          AI Tool
                        </span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                        <ExternalLink size={10} className="text-purple-400 group-hover:text-purple-300" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Footer Message */}
          <div className="mt-8 sm:mt-12 text-center">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Bot className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">AI-Powered Search & Chat</h3>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                Access {aiEngines.length}+ AI tools including ChatGPT, Claude, Gemini, and specialized search engines
              </p>
              <p className="text-xs text-gray-400">
                Click any tool to open it directly in your browser with full functionality
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AISearchPage;
