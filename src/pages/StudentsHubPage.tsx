import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Mic, FileText, Calculator, Languages, X, ArrowLeft, Users, DollarSign, Briefcase, Lightbulb,
  ExternalLink, AlertCircle, RefreshCw, Smartphone, Palette, Code, Zap, Heart, Rocket, Library, Book,
  Archive, GraduationCap, Bot, MousePointer, Wind, Globe, Search, Target, TrendingUp, History, Filter,
  ChevronDown, ChevronUp, Volume2, ThumbsUp, Star
} from 'lucide-react';
import { useHeader } from '../contexts/HeaderContext';

// Enhanced Resource Interface
interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  category: string; // Added category field
  keywords?: string[]; // Added keywords for better search
  isInternal?: boolean;
  alternativeUrls?: string[];
  embedStrategy?: 'iframe' | 'external' | 'smart';
  forceExternal?: boolean;
  proxyUrls?: string[];
  customScripts?: boolean;
  isUSSD?: boolean;
  openInNewTab?: boolean; // From previous update
  popularityScore?: number; // For trending
}

// Search-related Interfaces
interface SearchResult extends Resource {
  relevanceScore: number;
  matchedTerms?: string[];
}

interface DetectedIntent {
  intent: string;
  confidence: number; // 0 to 1
  matchedKeywords: string[];
  displayName: string;
}

interface SearchSuggestion {
  type: 'history' | 'resource' | 'intent';
  text: string;
  icon?: React.ReactNode;
  resourceId?: number;
  intentKey?: string;
}

interface SearchAnalytics {
  queries: { query: string, timestamp: number, count: number }[];
  clicks: { resourceId: number, count: number, lastClicked: number }[];
  sessions: { startTime: number, endTime?: number, queries: string[] }[];
}

const LS_ANALYTICS_KEY = 'stlouisdemojhs_studentsHub_analytics';
const LS_HISTORY_KEY = 'stlouisdemojhs_studentsHub_searchHistory';

// Intent Definitions
const INTENT_DEFINITIONS: Record<string, { displayName: string, keywords: string[], categories: string[], icon: React.ReactNode }> = {
  exam_prep: { displayName: "Exam Preparation", keywords: ['bece', 'pasco', 'exam', 'mock', 'test', 'waec', 'past questions', 'jhs mocks'], categories: ["📝 Exam Preparation"], icon: <FileText size={18} /> },
  financial_literacy: { displayName: "Financial Literacy", keywords: ['money', 'finance', 'budget', 'invest', 'savings', 'loan', 'credit', 'khan academy financial', 'personal finance', 'debt', 'wealth'], categories: ["💰 Financial Literacy"], icon: <DollarSign size={18} /> },
  coding: { displayName: "Coding & Development", keywords: ['code', 'coding', 'programming', 'developer', 'software', 'web app', 'llamacoder', 'bolt.new', 'lovable', 'ai.dev', 'cursor', 'windsurf'], categories: ["💻 Coding"], icon: <Code size={18} /> },
  academic_resources: { displayName: "Academic Resources", keywords: ['audiobook', 'poetry', 'ebook', 'library', 'gutenberg', 'libgen', 'textbook', 'dreamhive', 'career reel', 'study'], categories: ["📚 Academic Resources"], icon: <BookOpen size={18} /> },
  career_development: { displayName: "Career Development", keywords: ['career', 'job', 'resume', 'advice', 'successful people', 'business skills', 'product creation', 'professional development'], categories: ["💼 Life Skills & Career", "📚 Academic Resources"], icon: <Briefcase size={18} /> },
  creative_tools: { displayName: "Creative Tools", keywords: ['comic', 'creative', 'art', 'design', 'story'], categories: ["🎨 Creative Tools"], icon: <Palette size={18} /> },
  language_communication: { displayName: "Language & Communication", keywords: ['translate', 'translator', 'dictionary', 'britannica', 'language', 'communication', 'wikipedia'], categories: ["🌍 Language & Communication"], icon: <Languages size={18} /> },
  stem_tools: { displayName: "STEM Tools", keywords: ['maths', 'math', 'calculator', 'qwen', 'science', 'technology', 'engineering'], categories: ["🧮 STEM Tools"], icon: <Calculator size={18} /> },
};


const StudentsHubPage: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isLoadingIframe, setIsLoadingIframe] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0); // Kept for compatibility if smart loading logic is extended
  const [loadingProgress, setLoadingProgress] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAlternatives, setShowAlternatives] = useState(false); // Kept for compatibility
  const [smartLoadingPhase, setSmartLoadingPhase] = useState<'connecting' | 'loading' | 'error' | 'success'>('connecting');
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  const { setShowHeader } = useHeader();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [detectedIntentInfo, setDetectedIntentInfo] = useState<DetectedIntent | null>(null);
  const [isSearching, setIsSearching] = useState(false); // True when search term is active
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestionsDropdown, setShowSuggestionsDropdown] = useState(false);
  const [activeQuickIntent, setActiveQuickIntent] = useState<string | null>(null);

  // Analytics State (simplified for now)
  const [analytics, setAnalytics] = useState<SearchAnalytics>(() => {
    try {
      const stored = localStorage.getItem(LS_ANALYTICS_KEY);
      return stored ? JSON.parse(stored) : { queries: [], clicks: [], sessions: [] };
    } catch (e) { return { queries: [], clicks: [], sessions: [] }; }
  });

  // Load search history
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(LS_HISTORY_KEY);
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    } catch (e) { console.error("Failed to load search history:", e); }
    
    // Start a new session for analytics
    setAnalytics(prev => {
      const newSession = { startTime: Date.now(), queries: [] };
      const updatedSessions = [...(prev.sessions || []), newSession];
      // Limit sessions stored
      if (updatedSessions.length > 20) updatedSessions.shift();
      const newAnalytics = { ...prev, sessions: updatedSessions };
      localStorage.setItem(LS_ANALYTICS_KEY, JSON.stringify(newAnalytics));
      return newAnalytics;
    });

  }, []);

  // Debounce search term
  useEffect(() => {
    setIsLoadingSearch(true);
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      if (searchTerm.trim() === '') {
        setIsSearching(false);
        setSearchResults([]);
        setDetectedIntentInfo(null);
        setIsLoadingSearch(false);
      } else {
        setIsSearching(true);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Perform search when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim() !== '') {
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);


  // Header visibility management
  useEffect(() => {
    if (selectedResource) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    return () => setShowHeader(true); // Ensure header is shown on unmount
  }, [selectedResource, setShowHeader]);


  const resourceCategories = useMemo(() => ({
    "📚 Academic Resources": [
      { id: 1, title: "Audiobooks", description: "Free audiobooks collection", url: "https://marhamilresearch4.blob.core.windows.net/gutenberg-public/Website/browse.html", icon: <Mic className="w-5 h-5" />, color: "#007AFF", category: "📚 Academic Resources", keywords: ["audio", "books", "listening", "literature"] },
      { id: 2, title: "Poetry Archive", description: "Children's poetry collection", url: "https://childrens.poetryarchive.org/", icon: <BookOpen className="w-5 h-5" />, color: "#FF3B30", category: "📚 Academic Resources", keywords: ["poems", "poetry", "literature", "kids"] },
      { id: 17, title: "Ebook Library", description: "Comprehensive digital library with thousands of free ebooks", url: "https://divinemonk.github.io/ebooklibrary/", icon: <Library className="w-5 h-5" />, color: "#8B5CF6", embedStrategy: 'iframe', category: "📚 Academic Resources", keywords: ["ebooks", "digital books", "reading", "free library"] },
      { id: 19, title: "DBooks Library", description: "Free programming and technical books library for developers and students", url: "https://www.dbooks.org/", icon: <Code className="w-5 h-5" />, color: "#059669", embedStrategy: 'iframe', category: "📚 Academic Resources", keywords: ["programming books", "technical books", "coding books", "developer library"] },
      { id: 20, title: "Gutenberg Library", description: "Classic literature and public domain books - over 70,000 free ebooks", url: "https://www.gutenberg.org/ebooks/categories", icon: <BookOpen className="w-5 h-5" />, color: "#DC2626", embedStrategy: 'iframe', category: "📚 Academic Resources", keywords: ["gutenberg", "classic books", "public domain", "literature"] },
      { id: 21, title: "Libgen Library", description: "Comprehensive digital archive with millions of books, papers, and documents", url: "https://libgen.is/", icon: <Archive className="w-5 h-5" />, color: "#7C2D12", embedStrategy: 'iframe', category: "📚 Academic Resources", keywords: ["libgen", "research papers", "academic documents", "textbooks"] },
      { id: 22, title: "JHS Textbooks", description: "Free Junior High School textbooks and notes organized by subject", url: "/jhs-textbooks", icon: <GraduationCap className="w-5 h-5" />, color: "#0F766E", isInternal: true, category: "📚 Academic Resources", keywords: ["jhs", "junior high", "textbooks", "school notes", "curriculum"] },
      { id: 26, title: "Dreamhive Resources", description: "Professional development guides: resume writing, essay crafting, and email etiquette", url: "/dream-hive-resources", icon: <Briefcase className="w-5 h-5" />, color: "#7C3AED", isInternal: true, category: "📚 Academic Resources", keywords: ["resume", "cv", "essay writing", "email etiquette", "job skills"] },
      { id: 27, title: "Career Reel Resources", description: "Job hunting tools: tracking sheets, resume guides, and career development resources", url: "/career-reel-resources", icon: <Users className="w-5 h-5" />, color: "#DC2626", isInternal: true, category: "📚 Academic Resources", keywords: ["job hunting", "career tools", "resume guide", "job application"] }
    ],
    "📝 Exam Preparation": [
      { id: 3, title: "BECE PASCO", description: "BECE past questions", url: "https://emmadeeofficial.gumroad.com/l/becepasco", icon: <FileText className="w-5 h-5" />, color: "#34C759", category: "📝 Exam Preparation", keywords: ["bece", "pasco", "past questions", "exam practice", "ghana exams"] },
      { id: 11, title: "BECE Pasco 2", description: "Alternative BECE past questions database", url: "https://www.becepastquestions.com/", icon: <FileText className="w-5 h-5" />, color: "#7C3AED", embedStrategy: 'iframe', customScripts: true, category: "📝 Exam Preparation", keywords: ["bece", "pasco", "past questions", "exam practice", "online test"] },
      { id: 12, title: "BECE Pasco Via USSD", description: "Access past questions directly on your mobile phone!", url: "ussd://dial", icon: <Smartphone className="w-5 h-5" />, color: "#FF9500", isUSSD: true, category: "📝 Exam Preparation", keywords: ["bece", "pasco", "ussd", "mobile access", "offline exams"] },
      { id: 4, title: "JHS MOCKS", description: "JHS mock examinations", url: "https://emmadeeofficial.gumroad.com/l/jhsmocks", icon: <FileText className="w-5 h-5" />, color: "#FF9500", category: "📝 Exam Preparation", keywords: ["jhs", "mock exams", "test preparation", "practice tests"] }
    ],
    "🧮 STEM Tools": [
      { id: 5, title: "QWEN Maths", description: "AI maths problem solver", url: "https://qwen-qwen2-math-demo.hf.space", icon: <Calculator className="w-5 h-5" />, color: "#5856D6", category: "🧮 STEM Tools", keywords: ["math", "mathematics", "ai solver", "equations", "algebra", "calculus"] }
    ],
    "🌍 Language & Communication": [
      { id: 6, title: "KHAYA Translator", description: "AI language translator", url: "https://translate.ghananlp.org/", icon: <Languages className="w-5 h-5" />, color: "#AF52DE", category: "🌍 Language & Communication", keywords: ["translate", "language tool", "dictionary", "ghanaian languages"] },
      { id: 18, title: "Britannica Dictionary", description: "Comprehensive English dictionary with clear definitions and usage examples", url: "https://www.britannica.com/dictionary", icon: <Book className="w-5 h-5" />, color: "#0066CC", embedStrategy: 'iframe', category: "🌍 Language & Communication", keywords: ["dictionary", "english words", "definitions", "vocabulary", "britannica"] },
      { id: 34, title: "Wikipedia", description: "Free online encyclopedia with millions of articles on every topic", url: "https://en.wikipedia.org/wiki/Main_Page", icon: <Globe className="w-5 h-5" />, color: "#000000", embedStrategy: 'iframe', category: "🌍 Language & Communication", keywords: ["encyclopedia", "information", "research", "knowledge base", "wiki"] }
    ],
    "💰 Financial Literacy": [
      { id: 8, title: "Khan Academy Financial Literacy", description: "Learn personal finance and money management", url: "https://www.khanacademy.org/college-careers-more/financial-literacy", icon: <DollarSign className="w-5 h-5" />, color: "#00C896", embedStrategy: 'smart', alternativeUrls: ["https://www.investopedia.com/financial-literacy-4776932", "https://www.practicalmoneyskills.com/", "https://www.jumpstart.org/", "https://www.mymoney.gov/"], proxyUrls: ["https://web.archive.org/web/20240101000000*/https://www.khanacademy.org/college-careers-more/financial-literacy"], category: "💰 Financial Literacy", keywords: ["khan academy", "finance", "money management", "personal finance", "budgeting"] },
      { id: 28, title: "Personal Finance Basics", description: "Essential guide to managing your money and building financial security", url: "https://drive.google.com/file/d/1Sg8I986nRXGfk3Ir1Eyx6aDyw6F4E6lz/preview", icon: <DollarSign className="w-5 h-5" />, color: "#059669", embedStrategy: 'iframe', category: "💰 Financial Literacy", keywords: ["personal finance", "money basics", "financial security", "wealth building"] },
      { id: 29, title: "Budgeting and Saving", description: "Learn how to create budgets and develop smart saving habits", url: "https://drive.google.com/file/d/1dwEaBuMyCFvmt0D8go44SpZTxq-PiJUN/preview", icon: <DollarSign className="w-5 h-5" />, color: "#0EA5E9", embedStrategy: 'iframe', category: "💰 Financial Literacy", keywords: ["budgeting", "saving money", "financial habits", "expense tracking"] },
      { id: 30, title: "Investment Fundamentals", description: "Introduction to investing and growing your wealth over time", url: "https://drive.google.com/file/d/1wehgmwts4fLxPkVIgjXSDeXNOPMtzFIP/preview", icon: <DollarSign className="w-5 h-5" />, color: "#8B5CF6", embedStrategy: 'iframe', category: "💰 Financial Literacy", keywords: ["investing", "wealth growth", "stocks", "bonds", "investment basics"] },
      { id: 31, title: "Credit and Debt Management", description: "Understanding credit scores, loans, and responsible debt management", url: "https://drive.google.com/file/d/1tDhpCsr36husIUKf-OIfUWZZ6GuuAGEh/preview", icon: <DollarSign className="w-5 h-5" />, color: "#F59E0B", embedStrategy: 'iframe', category: "💰 Financial Literacy", keywords: ["credit score", "debt management", "loans", "financial responsibility"] },
      { id: 32, title: "Financial Planning for Students", description: "Money management strategies specifically designed for students", url: "https://drive.google.com/file/d/11M0ZPnV5OLqRPoqPBoDDcuAJFE11u6QC/preview", icon: <DollarSign className="w-5 h-5" />, color: "#EF4444", embedStrategy: 'iframe', category: "💰 Financial Literacy", keywords: ["student finance", "student loans", "money for students", "college budget"] },
      { id: 33, title: "Money Smart Links", description: "300+ comprehensive financial education websites and resources directory", url: "/money-smart-links", icon: <Globe className="w-5 h-5" />, color: "#059669", isInternal: true, category: "💰 Financial Literacy", keywords: ["financial education", "money links", "finance websites", "resource directory"] }
    ],
    "💼 Life Skills & Career": [
      { id: 7, title: "Advice from Successful People", description: "Commencement speeches from leaders", url: "/advice-speeches", icon: <Users className="w-5 h-5" />, color: "#FF6B35", isInternal: true, category: "💼 Life Skills & Career", keywords: ["advice", "success", "speeches", "motivation", "leadership"] },
      { id: 9, title: "Business Skills Chat", description: "AI-powered business skills development", url: "https://www.nfx.com/chat", icon: <Briefcase className="w-5 h-5" />, color: "#1E40AF", embedStrategy: 'smart', alternativeUrls: ["https://www.coursera.org/browse/business", "https://www.edx.org/learn/business", "https://www.futurelearn.com/subjects/business-and-management-courses", "https://alison.com/courses/business"], proxyUrls: ["https://web.archive.org/web/20240101000000*/https://www.nfx.com/chat"], category: "💼 Life Skills & Career", keywords: ["business skills", "ai chat", "entrepreneurship", "management"] },
      { id: 10, title: "Product Creation Chat", description: "Learn product development and creation", url: "https://www.lennybot.com/", icon: <Lightbulb className="w-5 h-5" />, color: "#F59E0B", category: "💼 Life Skills & Career", keywords: ["product development", "innovation", "startup ideas", "lennybot"] }
    ],
    "🎨 Creative Tools": [
      { id: 13, title: "AI Comic Factory", description: "Create amazing comics and stories with AI - unleash your creativity!", url: "https://huggingface.co/spaces/jbilcke-hf/ai-comic-factory", icon: <Palette className="w-5 h-5" />, color: "#E91E63", openInNewTab: true, category: "🎨 Creative Tools", keywords: ["ai comic", "story generator", "creative writing", "art tool"] }
    ],
    "💻 Coding": [
      { id: 14, title: "LlamaCoder", description: "AI-powered coding assistant - learn programming with AI guidance!", url: "https://llamacoder.together.ai/", icon: <Code className="w-5 h-5" />, color: "#10B981", embedStrategy: 'iframe', category: "💻 Coding", keywords: ["ai coding", "llamacoder", "programming assistant", "learn to code"] },
      { id: 15, title: "Bolt.new", description: "Build and deploy full-stack web apps instantly with AI!", url: "https://bolt.new/", icon: <Zap className="w-5 h-5" />, color: "#F59E0B", embedStrategy: 'iframe', category: "💻 Coding", keywords: ["ai web development", "full-stack app", "bolt new", "rapid development"] },
      { id: 16, title: "Lovable", description: "Create beautiful web applications with AI-powered development!", url: "https://lovable.dev/", icon: <Heart className="w-5 h-5" />, color: "#EC4899", embedStrategy: 'iframe', category: "💻 Coding", keywords: ["ai app builder", "lovable dev", "web design", "ui development"] },
      { id: 23, title: "AI.dev", description: "AI-powered development platform for building applications with artificial intelligence!", url: "https://ai.dev/", icon: <Bot className="w-5 h-5" />, color: "#6366F1", openInNewTab: true, category: "💻 Coding", keywords: ["ai development", "ai platform", "machine learning", "artificial intelligence"] },
      { id: 24, title: "Cursor", description: "AI-powered code editor that helps you write code faster and smarter!", url: "https://cursor.com/", icon: <MousePointer className="w-5 h-5" />, color: "#000000", openInNewTab: true, category: "💻 Coding", keywords: ["ai code editor", "cursor ide", "smarter coding", "developer tool"] },
      { id: 25, title: "Windsurf", description: "Advanced AI coding assistant for seamless development experience!", url: "https://windsurf.com/", icon: <Wind className="w-5 h-5" />, color: "#0EA5E9", openInNewTab: true, category: "💻 Coding", keywords: ["ai coding assistant", "windsurf ai", "developer productivity", "code completion"] }
    ]
  }), []);
  
  const allResources: Resource[] = useMemo(() => Object.values(resourceCategories).flat(), [resourceCategories]);

  const updateAnalytics = useCallback((type: 'query' | 'click' | 'sessionEnd', data: any) => {
    setAnalytics(prev => {
      let newAnalytics = { ...prev };
      if (type === 'query') {
        const existingQueryIndex = (newAnalytics.queries || []).findIndex(q => q.query === data.query);
        if (existingQueryIndex > -1) {
          newAnalytics.queries[existingQueryIndex].count++;
          newAnalytics.queries[existingQueryIndex].timestamp = Date.now();
        } else {
          newAnalytics.queries = [...(newAnalytics.queries || []), { query: data.query, timestamp: Date.now(), count: 1 }];
        }
        // Add to current session
        if (newAnalytics.sessions && newAnalytics.sessions.length > 0) {
          const currentSession = newAnalytics.sessions[newAnalytics.sessions.length - 1];
          currentSession.queries = [...(currentSession.queries || []), data.query];
        }

      } else if (type === 'click') {
        const existingClickIndex = (newAnalytics.clicks || []).findIndex(c => c.resourceId === data.resourceId);
        if (existingClickIndex > -1) {
          newAnalytics.clicks[existingClickIndex].count++;
          newAnalytics.clicks[existingClickIndex].lastClicked = Date.now();
        } else {
          newAnalytics.clicks = [...(newAnalytics.clicks || []), { resourceId: data.resourceId, count: 1, lastClicked: Date.now() }];
        }
      } else if (type === 'sessionEnd') {
        if (newAnalytics.sessions && newAnalytics.sessions.length > 0) {
          newAnalytics.sessions[newAnalytics.sessions.length - 1].endTime = Date.now();
        }
      }
      localStorage.setItem(LS_ANALYTICS_KEY, JSON.stringify(newAnalytics));
      return newAnalytics;
    });
  }, []);
  
  // End session on unmount
  useEffect(() => {
    return () => {
      updateAnalytics('sessionEnd', {});
    };
  }, [updateAnalytics]);


  const logSearchQuery = useCallback((query: string) => {
    if (!query.trim()) return;
    // Update search history
    setSearchHistory(prevHistory => {
      const newHistory = [query, ...prevHistory.filter(h => h !== query)].slice(0, 10); // Keep last 10
      localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
    // Update analytics
    updateAnalytics('query', { query });
  }, [updateAnalytics]);

  const logResourceClickAnalytics = useCallback((resourceId: number) => {
    updateAnalytics('click', { resourceId });
  }, [updateAnalytics]);


  const detectUserIntent = useCallback((query: string): DetectedIntent | null => {
    const lowerQuery = query.toLowerCase();
    let bestMatch: DetectedIntent | null = null;
    let highestConfidence = 0;

    for (const intentKey in INTENT_DEFINITIONS) {
      const intentDef = INTENT_DEFINITIONS[intentKey];
      let matchCount = 0;
      const matchedKws: string[] = [];

      intentDef.keywords.forEach(kw => {
        if (lowerQuery.includes(kw.toLowerCase())) {
          matchCount++;
          matchedKws.push(kw);
        }
      });
      
      // Simple confidence: proportion of matched keywords from query words, plus bonus for longer matches
      const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2);
      let confidence = queryWords.length > 0 ? matchCount / queryWords.length : 0;
      confidence = Math.min(confidence, 1.0); // Cap at 1.0

      // Boost confidence for more specific matches or if many keywords match
      if (matchCount > 1) confidence += 0.1 * (matchCount -1);
      if (matchedKws.some(kw => kw.length > 5)) confidence += 0.1;
      
      confidence = Math.min(Math.max(confidence, 0), 1);


      if (matchCount > 0 && confidence > highestConfidence) {
        highestConfidence = confidence;
        bestMatch = {
          intent: intentKey,
          confidence: parseFloat(confidence.toFixed(2)),
          matchedKeywords: matchedKws,
          displayName: intentDef.displayName
        };
      }
    }
    // If confidence is too low, don't classify
    if (bestMatch && bestMatch.confidence < 0.3) return null;
    return bestMatch;
  }, []);

  const calculateResourceRelevance = useCallback((resource: Resource, query: string, intent: DetectedIntent | null): SearchResult => {
    const lowerQuery = query.toLowerCase();
    let score = 0;
    const matchedTerms: string[] = [];

    const queryTerms = lowerQuery.split(/\s+/).filter(term => term.length > 1);

    queryTerms.forEach(term => {
      if (resource.title.toLowerCase().includes(term)) {
        score += 10;
        if (!matchedTerms.includes(term)) matchedTerms.push(term);
      }
      if (resource.description.toLowerCase().includes(term)) {
        score += 5;
        if (!matchedTerms.includes(term)) matchedTerms.push(term);
      }
      if (resource.keywords?.some(kw => kw.toLowerCase().includes(term))) {
        score += 8;
        if (!matchedTerms.includes(term)) matchedTerms.push(term);
      }
    });
    
    // Full phrase match bonus
    if (resource.title.toLowerCase().includes(lowerQuery)) score += 20;
    if (resource.description.toLowerCase().includes(lowerQuery)) score += 10;


    // Intent-based boosting
    if (intent) {
      const intentDef = INTENT_DEFINITIONS[intent.intent];
      if (intentDef && intentDef.categories.includes(resource.category)) {
        score += 20 * intent.confidence; // Boost based on intent confidence
      }
      // Boost if resource keywords match intent keywords
      if (resource.keywords?.some(rk => intent.matchedKeywords.map(ik => ik.toLowerCase()).includes(rk.toLowerCase()))) {
        score += 15 * intent.confidence;
      }
    }
    
    // Popularity boost (example)
    const clickData = analytics.clicks.find(c => c.resourceId === resource.id);
    if (clickData) {
        score += Math.min(clickData.count * 0.5, 10); // Add up to 10 points for popularity
    }


    return { ...resource, relevanceScore: score, matchedTerms };
  }, [analytics.clicks]);


  const performSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setDetectedIntentInfo(null);
      setIsLoadingSearch(false);
      return;
    }

    setIsLoadingSearch(true);
    logSearchQuery(query);

    const intent = detectUserIntent(query);
    setDetectedIntentInfo(intent);

    const results = allResources
      .map(resource => calculateResourceRelevance(resource, query, intent))
      .filter(result => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    setSearchResults(results);
    setIsLoadingSearch(false);
  }, [allResources, calculateResourceRelevance, detectUserIntent, logSearchQuery]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim() !== '') {
      generateSuggestions(newSearchTerm);
      setShowSuggestionsDropdown(true);
    } else {
      setShowSuggestionsDropdown(false);
      setSearchSuggestions([]);
      setActiveQuickIntent(null); // Clear quick intent if search is cleared
    }
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setSearchResults([]);
    setDetectedIntentInfo(null);
    setIsSearching(false);
    setShowSuggestionsDropdown(false);
    setActiveQuickIntent(null);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'history' || suggestion.type === 'resource') {
      setSearchTerm(suggestion.text);
      performSearch(suggestion.text); // Perform search immediately
    } else if (suggestion.type === 'intent' && suggestion.intentKey) {
      setSearchTerm(suggestion.text); // Or a representative query for the intent
      setActiveQuickIntent(suggestion.intentKey);
      // Optionally, pre-filter or set intent directly
      const intent = detectUserIntent(suggestion.text); // Re-detect for consistency
      setDetectedIntentInfo(intent);
      performSearch(suggestion.text);
    }
    setShowSuggestionsDropdown(false);
  };
  
  const handleQuickIntentClick = (intentKey: string) => {
    const intentDef = INTENT_DEFINITIONS[intentKey];
    if (intentDef) {
      setActiveQuickIntent(intentKey);
      setSearchTerm(intentDef.displayName); // Use display name as search term
      // Trigger search with this intent prioritized
      const intent = detectUserIntent(intentDef.displayName); // Simulate intent detection
      setDetectedIntentInfo(intent);
      performSearch(intentDef.displayName);
      setShowSuggestionsDropdown(false);
    }
  };

  const generateSuggestions = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchSuggestions([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const suggestions: SearchSuggestion[] = [];

    // Add history suggestions
    searchHistory
      .filter(h => h.toLowerCase().includes(lowerQuery))
      .slice(0, 2)
      .forEach(h => suggestions.push({ type: 'history', text: h, icon: <History size={16} /> }));

    // Add resource title suggestions
    allResources
      .filter(r => r.title.toLowerCase().includes(lowerQuery))
      .slice(0, 3)
      .forEach(r => suggestions.push({ type: 'resource', text: r.title, resourceId: r.id, icon: r.icon }));
      
    // Add intent suggestions
    Object.entries(INTENT_DEFINITIONS)
      .filter(([key, def]) => def.displayName.toLowerCase().includes(lowerQuery) || def.keywords.some(kw => kw.toLowerCase().includes(lowerQuery)))
      .slice(0,2)
      .forEach(([key, def]) => suggestions.push({ type: 'intent', text: def.displayName, intentKey: key, icon: def.icon }));

    setSearchSuggestions(suggestions.slice(0, 5)); // Limit total suggestions
  }, [allResources, searchHistory]);


  // Smart loading simulation effect (existing logic)
  useEffect(() => {
    if (isLoadingIframe && selectedResource?.embedStrategy === 'smart') {
      setSmartLoadingPhase('connecting');
      setLoadingProgress(0);
      const phases = [
        { phase: 'connecting', duration: 1500, progress: 25 },
        { phase: 'loading', duration: 2000, progress: 75 },
        { phase: 'error', duration: 1000, progress: 100 }
      ];
      let currentPhaseIndex = 0;
      const runPhase = () => {
        if (currentPhaseIndex < phases.length) {
          const currentPhase = phases[currentPhaseIndex];
          setSmartLoadingPhase(currentPhase.phase as any);
          let progress = loadingProgress; // Use current loadingProgress
          const progressInterval = setInterval(() => {
            progress += 2;
            setLoadingProgress(Math.min(progress, currentPhase.progress));
            if (progress >= currentPhase.progress) {
              clearInterval(progressInterval);
              currentPhaseIndex++;
              setTimeout(() => {
                if (currentPhaseIndex < phases.length) {
                  runPhase();
                } else {
                  setIframeError(true);
                  setShowAlternatives(true);
                  setIsLoadingIframe(false);
                }
              }, currentPhase.duration);
            }
          }, 50);
        }
      };
      runPhase();
    }
  }, [isLoadingIframe, selectedResource, loadingProgress]); // Added loadingProgress to dependencies

  const handleResourceClick = (resource: Resource | SearchResult) => {
    logResourceClickAnalytics(resource.id); // Log click for analytics

    if (resource.isUSSD) {
      setSelectedResource(resource as Resource); // USSD modal expects Resource type
      return;
    }
    if (resource.openInNewTab) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (resource.isInternal) {
      navigate(resource.url);
    } else {
      setIsLoadingIframe(true);
      setIframeError(false);
      setCurrentUrlIndex(0);
      setShowAlternatives(false); // Reset alternatives view
      setSelectedResource(resource as Resource); // Other views expect Resource type
    }
  };

  const handleBackFromResourceView = () => {
    setSelectedResource(null);
    setIsLoadingIframe(false);
    setIframeError(false);
    setCurrentUrlIndex(0);
    setShowAlternatives(false);
    setLoadingProgress(0);
    setSmartLoadingPhase('connecting');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleMainBack = () => {
    if (isSearching) {
        handleClearSearch(); // Or navigate(-1) if preferred UX
    } else {
        navigate(-1); 
    }
  };

  // USSD Dialing (existing logic)
  const handleUSSDDial = () => {
    const ussdCode = '*790*700#';
    try { window.location.href = `tel:${encodeURIComponent(ussdCode)}`; }
    catch (error) { try { window.open(`tel:${ussdCode}`, '_self'); }
      catch (error2) { try { const link = document.createElement('a'); link.href = `tel:${ussdCode}`; link.style.display = 'none'; document.body.appendChild(link); link.click(); document.body.removeChild(link); }
        catch (error3) { alert(`Please dial ${ussdCode} on your phone to access BECE past questions.`); }
      }
    }
  };

  // Iframe Load/Error Handlers (existing logic, adapted setIsLoadingIframe)
  const handleIframeLoad = () => {
    setIsLoadingIframe(false);
    setIframeError(false);
    setSmartLoadingPhase('success');
    // Custom script injection logic (existing)
    if (selectedResource?.customScripts && iframeRef.current) {
      try {
        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          const style = iframeDoc.createElement('style');
          style.textContent = `/* NUCLEAR AD/FOOTER/ETC REMOVAL CSS - MINIFIED FOR BREVITY */ footer, .footer, #footer, [class*="footer"], [id*="footer"], [class*="Footer"], [id*="Footer"], .site-footer, #site-footer, .page-footer, #page-footer, .main-footer, #main-footer, .website-footer, #website-footer, .bottom-footer, #bottom-footer, .footer-section, .footer-content, .footer-wrapper, .footer-container, .footer-area, .footer-widget, .footer-info, .footer-links, .copyright, .copyright-text, .copyright-info, .copyright-notice, [class*="copyright"], [id*="copyright"], .site-info, .site-credits, .site-footer-wrapper, .footer-widgets, .footer-bottom, .footer-copyright, .site-info-wrapper, .ad, .ads, .advertisement, .advert, .adsense, .google-ads, [class*="ad-"], [class*="ads-"], [class*="advert"], [class*="banner"], [id*="ad-"], [id*="ads-"], [id*="advert"], [id*="banner"], .sidebar-ads, .header-ads, .content-ads, .popup-ad, .inline-ad, .sponsored, .promotion, .promo, [class*="sponsor"], [class*="promo"], iframe[src*="googlesyndication"], iframe[src*="doubleclick"], iframe[src*="googleadservices"], iframe[src*="amazon-adsystem"], iframe[src*="adsystem"], .google-auto-placed, .adsbygoogle, ins.adsbygoogle, .adsbox, .ad-container, .ad-wrapper, .ad-space, .advertisement-container, .ads-container, .banner-container, div[style*="height: required"], .sticky-sidebar, .advertisment, .advertisement-section, [class*="advertisment"], [id*="advertisment"], img[src*="facebook.com/tr"], noscript img[src*="facebook.com"], [src*="googletagmanager"], [src*="google-analytics"], script[src*="ads"], script[src*="adsystem"], [onclick*="Ad Clicks"], [onclick*="Ad Views"], .newsletter-signup, .email-subscription, .subscribe-box, .recent, .popular, .trending, .related, .suggestions, .recommended, [class*="recent"], [class*="popular"], [class*="trending"], [class*="related"], [class*="suggest"], [class*="recommend"], .sidebar-recent, .sidebar-popular, .widget-recent, .widget-popular, .recent-posts, .popular-posts, .related-posts, .more-posts, .you-may-like, .similar-content, .other-articles, .sidebar, .widget-area, .secondary, aside, h3:contains("Recent popular post"), h3:contains("ADVERTISMENT"), h3:contains("Social Media"), h3:contains("Quick Links"), h3:contains("Newsletter"), h3:contains("Recent Posts"), .sidebar-wrapper, .widget-wrapper, .sidebar-content, .social-share, .share-buttons, .social-media, .social-icons, [class*="social"], [class*="share"], .fb-like, .twitter-share, .addthis, .sharethis, .social-widget, .share-widget, .facebook-share, .twitter-share, .linkedin-share, .whatsapp-share, .social-follow, .follow-us, .social-links, .newsletter, .subscribe, .subscription, .email-signup, .signup-form, [class*="newsletter"], [class*="subscribe"], [class*="signup"], .email-capture, .lead-magnet, .opt-in, .mailing-list, .modal, .popup, .overlay, [class*="modal"], [class*="popup"], .lightbox, .dialog, .alert, .notification, .toast, .cookie-notice, .cookie-banner, .gdpr-notice, .privacy-notice, [class*="cookie"], [class*="gdpr"], [class*="privacy"], .consent-banner, .privacy-banner, .terms-notice, .sidebar, .side-bar, #sidebar, #side-bar, .widget-area, .secondary, .aside, aside, .complementary, [class*="sidebar"], [id*="sidebar"], .breadcrumb, .breadcrumbs, .nav-breadcrumb, .page-breadcrumb, .pagination, .page-numbers, .nav-links, .post-navigation { display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; width: 0 !important; margin: 0 !important; padding: 0 !important; position: absolute !important; left: -9999px !important; top: -9999px !important; z-index: -9999 !important; overflow: hidden !important; } body { margin: 0 !important; padding: 10px !important; background: #ffffff !important; overflow-x: hidden !important; } .main, .content, .container, .wrapper, main, article, .post-content, .entry-content, .page-content, .single-content { max-width: 100% !important; margin: 0 auto !important; padding: 15px !important; width: 100% !important; box-sizing: border-box !important; } body > *:last-child:not(.main):not(.content):not(.container):not(.wrapper):not(main):not(article) { display: none !important; } [style*="position: fixed"][style*="bottom"], [style*="position: absolute"][style*="bottom"] { display: none !important; }`;
          iframeDoc.head.appendChild(style);
          const script = iframeDoc.createElement('script');
          script.textContent = `/* NUCLEAR JS REMOVAL - MINIFIED */ (function(){function r(){const e=["footer",".footer","#footer",'[class*="footer"]','[id*="footer"]','[class*="Footer"]','[id*="Footer"]',".site-footer","#site-footer",".page-footer","#page-footer",".main-footer","#main-footer",".website-footer","#website-footer",".bottom-footer","#bottom-footer",".footer-section",".footer-content",".footer-wrapper",".footer-container",".footer-area",".footer-widget",".footer-info",".footer-links",".copyright",".copyright-text",".copyright-info",".copyright-notice",'[class*="copyright"]','[id*="copyright"]',".site-info",".site-credits",".site-footer-wrapper",".footer-widgets",".footer-bottom",".footer-copyright",".ad",".ads",".advertisement",".advert",".adsense",".google-ads",'[class*="ad-"]','[class*="ads-"]','[class*="advert"]','[class*="banner"]','[id*="ad-"]','[id*="ads-"]','[id*="advert"]','[id*="banner"]',".sidebar-ads",".header-ads",".content-ads",".popup-ad",".inline-ad",".sponsored",".promotion",".promo",'[class*="sponsor"]','[class*="promo"]','iframe[src*="googlesyndication"]','iframe[src*="doubleclick"]','iframe[src*="googleadservices"]','iframe[src*="amazon-adsystem"]','iframe[src*="adsystem"]',".google-auto-placed",".adsbygoogle","ins.adsbygoogle",".adsbox",".ad-container",".ad-wrapper",".ad-space",".advertisement-container",".ads-container",".banner-container",".recent",".popular",".trending",".related",".suggestions",".recommended",'[class*="recent"]','[class*="popular"]','[class*="trending"]','[class*="related"]','[class*="suggest"]','[class*="recommend"]',".sidebar-recent",".sidebar-popular",".widget-recent",".widget-popular",".recent-posts",".popular-posts",".related-posts",".more-posts",".you-may-like",".similar-content",".other-articles",".sidebar",".widget-area",".secondary","aside",".sidebar-wrapper",".widget-wrapper",".sidebar-content",".social-share",".share-buttons",".social-media",".social-icons",'[class*="social"]','[class*="share"]',".fb-like",".twitter-share",".addthis",".sharethis",".social-widget",".share-widget",".facebook-share",".twitter-share",".linkedin-share",".whatsapp-share",".social-follow",".follow-us",".social-links",".newsletter",".subscribe",".subscription",".email-signup",".signup-form",'[class*="newsletter"]','[class*="subscribe"]','[class*="signup"]',".email-capture",".lead-magnet",".opt-in",".mailing-list",".modal",".popup",".overlay",'[class*="modal"]','[class*="popup"]',".lightbox",".dialog",".alert",".notification",".toast",".cookie-notice",".cookie-banner",".gdpr-notice",".privacy-notice",'[class*="cookie"]','[class*="gdpr"]','[class*="privacy"]',".consent-banner",".privacy-banner",".terms-notice",".sidebar",".side-bar","#sidebar","#side-bar",".widget-area",".secondary",".aside","aside",".complementary",'[class*="sidebar"]','[id*="sidebar"]',".breadcrumb",".breadcrumbs",".nav-breadcrumb",".page-breadcrumb",".pagination",".page-numbers",".nav-links",".post-navigation"];e.forEach(t=>{try{document.querySelectorAll(t).forEach(o=>{if(o){o.style.display="none";o.style.visibility="hidden";o.style.opacity="0";o.style.height="0";o.style.width="0";o.style.margin="0";o.style.padding="0";o.style.overflow="hidden";o.style.position="absolute";o.style.left="-9999px";o.style.top="-9999px";o.style.zIndex="-9999";o.style.pointerEvents="none";o.style.userSelect="none";o.setAttribute("aria-hidden","true");try{o.parentNode&&o.parentNode.removeChild(o)}catch(s){o.remove()}}})}catch(o){}})}const t=["ADVERTISMENT","Recent popular post","Social Media","Quick Links","Newsletter","Recent Posts","Ad Clicks","Ad Views","Copyright at 2025","All Rights Reserved"];t.forEach(e=>{try{const o=\`//\\*[contains(text(), '\\\${e}')]\`;const n=document.evaluate(o,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);for(let i=0;i<n.snapshotLength;i++){const l=n.snapshotItem(i);if(l&&l.parentNode){const c=l.closest("div, section, aside, footer, header");c?c.remove():l.remove()}}}catch(o){}})document.querySelectorAll("script").forEach(e=>{const o=e.src||"";const n=e.textContent||"";(o.includes("facebook.com")||o.includes("google-analytics")||o.includes("googletagmanager")||n.includes("Ad Clicks")||n.includes("Ad Views"))&&e.remove()});try{const e=document.body.lastElementChild;e&&(e.tagName.toLowerCase()==="footer"||e.className.toLowerCase().includes("footer")||e.id.toLowerCase().includes("footer")||e.className.toLowerCase().includes("copyright")||e.textContent.toLowerCase().includes("copyright")||e.textContent.toLowerCase().includes("all rights reserved"))&&e.remove()}catch(e){}try{document.querySelectorAll("*").forEach(e=>{const o=e.textContent.toLowerCase();(o.includes("copyright")||o.includes("all rights reserved")||o.includes("terms of service")||o.includes("privacy policy")||o.includes("©")&&o.length<200)&&(e.style.display="none",e.remove())})}catch(e){}}r();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):window.addEventListener("load",r);const o=new MutationObserver(function(n){let i=!1;n.forEach(function(l){l.addedNodes.length>0&&(i=!0)});i&&setTimeout(r,50)});o.observe(document.body,{childList:!0,subtree:!0});setInterval(r,500);setInterval(r,2e3);setInterval(r,5e3);setInterval(r,1e4);window.addEventListener("scroll",function(){setTimeout(r,50)});window.addEventListener("resize",function(){setTimeout(r,100)});window.addEventListener("focus",function(){setTimeout(r,100)});const n=Node.prototype.appendChild;Node.prototype.appendChild=function(i){if(i.tagName==="SCRIPT"){const l=i.src||"";const c=i.textContent||"";if(l.includes("ads")||l.includes("facebook.com")||l.includes("google-analytics")||c.includes("Ad Clicks")||c.includes("Ad Views"))return i}return n.call(this,i)};const i=document.createElement;document.createElement=function(l){const c=i.call(this,l);if(l.toLowerCase()==="iframe"){const s=c.setAttribute;c.setAttribute=function(a,p){if(a==="src"&&(p.includes("googlesyndication")||p.includes("doubleclick")||p.includes("adsystem")))return;return s.call(this,a,p)}}return c}})();`;
          iframeDoc.body.appendChild(script);
          console.log('Custom scripts injected for BECE Past Questions - ads and unwanted sections blocked');
        }
      } catch (error) {
        console.log('Could not inject custom scripts (cross-origin restriction):', error);
      }
    }
  };
  const handleIframeError = () => { setIsLoadingIframe(false); setIframeError(true); setShowAlternatives(true); };
  const handleTryAlternative = (url: string) => { window.open(url, '_blank', 'noopener,noreferrer'); };
  const handleOpenOriginal = () => { if (selectedResource) { window.open(selectedResource.url, '_blank', 'noopener,noreferrer'); } };

  // Memoized sorted categories based on intent
  const sortedCategories = useMemo(() => {
    if (!isSearching || !detectedIntentInfo || !detectedIntentInfo.intent) {
      return Object.entries(resourceCategories); // Default order
    }
    const intentDef = INTENT_DEFINITIONS[detectedIntentInfo.intent];
    if (!intentDef) return Object.entries(resourceCategories);

    return Object.entries(resourceCategories).sort(([catA], [catB]) => {
      const isCatARelevant = intentDef.categories.includes(catA);
      const isCatBRelevant = intentDef.categories.includes(catB);
      if (isCatARelevant && !isCatBRelevant) return -1;
      if (!isCatARelevant && isCatBRelevant) return 1;
      return 0;
    });
  }, [resourceCategories, detectedIntentInfo, isSearching]);
  
  const recommendedForYou = useMemo(() => {
    if (!detectedIntentInfo) return [];
    const intentDef = INTENT_DEFINITIONS[detectedIntentInfo.intent];
    if (!intentDef) return [];
    
    return allResources
      .filter(r => intentDef.categories.includes(r.category) || r.keywords?.some(kw => intentDef.keywords.includes(kw.toLowerCase())))
      .map(r => calculateResourceRelevance(r, searchTerm || detectedIntentInfo.displayName, detectedIntentInfo)) // Score them even if not in main search results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 4); // Show top 4 recommendations
  }, [detectedIntentInfo, allResources, calculateResourceRelevance, searchTerm]);

  const popularResources = useMemo(() => {
    return allResources
      .map(r => {
        const clickData = analytics.clicks.find(c => c.resourceId === r.id);
        return { ...r, popularityScore: clickData ? clickData.count : 0 };
      })
      .filter(r => r.popularityScore > 0)
      .sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0))
      .slice(0, 4); // Top 4 popular
  }, [allResources, analytics.clicks]);


  // Render Functions
  const renderResourceCard = (resource: Resource | SearchResult, index: number, highlightQuery?: string) => {
    const cardContent = (
      <>
        {(resource as SearchResult).relevanceScore > 0 && (
            <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow">
              <Star size={10} className="inline mr-0.5" /> {(resource as SearchResult).relevanceScore.toFixed(0)}
            </div>
        )}
        {resource.embedStrategy === 'smart' && (
          <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500/80 rounded-full flex items-center justify-center" title="Smart Access">
            <AlertCircle size={12} className="text-white" />
          </div>
        )}
        {resource.openInNewTab && (
          <div className="absolute top-2 right-2 w-5 h-5 bg-green-500/80 rounded-full flex items-center justify-center" title="Opens in new tab">
            <ExternalLink size={12} className="text-white" />
          </div>
        )}
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 flex items-center justify-center text-white"
          style={{ backgroundColor: resource.color }}
        >
          {React.cloneElement(resource.icon as React.ReactElement, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-white mb-1 leading-tight">
          {highlightQuery ? 
            (resource.title.split(new RegExp(`(${highlightQuery.split(/\s+/).join('|')})`, 'gi')).map((part, i) => 
              new RegExp(`(${highlightQuery.split(/\s+/).join('|')})`, 'gi').test(part) ? <mark key={i} className="bg-yellow-300 text-black px-0.5 rounded">{part}</mark> : part
            ))
            : resource.title
          }
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 leading-tight line-clamp-2">
         {highlightQuery ? 
            (resource.description.split(new RegExp(`(${highlightQuery.split(/\s+/).join('|')})`, 'gi')).map((part, i) => 
              new RegExp(`(${highlightQuery.split(/\s+/).join('|')})`, 'gi').test(part) ? <mark key={i} className="bg-yellow-300 text-black px-0.5 rounded">{part}</mark> : part
            ))
            : resource.description
          }
        </p>
        {resource.embedStrategy === 'smart' && (
          <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
            <AlertCircle size={12} /><span>Smart Access</span>
          </div>
        )}
        {resource.openInNewTab && (
          <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
            <ExternalLink size={12} /><span>Opens in New Tab</span>
          </div>
        )}
      </>
    );

    return (
      <motion.div
        key={resource.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.03 }}
        className="group h-full"
      >
        <button
          onClick={() => handleResourceClick(resource)}
          className="w-full h-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-gray-600/30 hover:border-purple-500/70 transition-all duration-200 hover:shadow-purple-500/20 hover:shadow-lg hover:bg-gray-700/60 active:scale-95 text-left relative flex flex-col justify-between"
          aria-label={`Open ${resource.title}`}
        >
          {cardContent}
        </button>
      </motion.div>
    );
  };


  // Main return
  if (selectedResource?.isUSSD) { // USSD Modal (existing, adapted)
    return (
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="fixed top-0 left-0 right-0 z-[110] bg-gradient-to-r from-orange-900 via-orange-800 to-red-900 py-4 sm:py-5 shadow-2xl border-b border-orange-700/50">
          <div className="container mx-auto px-4"><div className="flex items-center gap-4 sm:gap-6">
            <button onClick={() => setSelectedResource(null)} className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-orange-700/70 hover:bg-orange-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-orange-500/50 hover:border-orange-400/70 flex-shrink-0 ring-2 ring-orange-500/20 hover:ring-orange-400/30">
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" /><span>Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">📱 BECE Pasco Via USSD</h1>
          </div></div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-orange-400/30 relative overflow-hidden mt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-2xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"><Smartphone size={32} className="text-white" /></div>
              <h2 className="text-2xl font-bold text-white mb-2">📱 BECE Pasco Via USSD</h2>
              <p className="text-orange-100 text-sm">Access past questions directly on your mobile phone!</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-3">🎉 Free Download Available!</h3>
                <p className="text-orange-100 text-sm mb-4">Get BECE past questions sent directly to your phone via SMS</p>
                <button onClick={handleUSSDDial} className="w-full bg-black/30 hover:bg-black/40 rounded-lg p-4 mb-4 transition-all duration-200 border border-orange-500/30 hover:border-orange-400/50">
                  <p className="text-orange-200 text-sm mb-2">Tap to dial this code on your mobile phone:</p>
                  <div className="text-3xl font-bold text-white tracking-wider mb-2">*790*700#</div>
                  <div className="text-xs text-orange-300 flex items-center justify-center gap-1"><span>📞</span><span>Tap to open phone app</span></div>
                </button>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3"><span className="text-orange-300 font-bold">1.</span><span className="text-orange-100 text-sm">Open your phone's dialer</span></div>
                  <div className="flex items-start gap-3"><span className="text-orange-300 font-bold">2.</span><span className="text-orange-100 text-sm">Type <strong>*790*700#</strong> and press call</span></div>
                  <div className="flex items-start gap-3"><span className="text-orange-300 font-bold">3.</span><span className="text-orange-100 text-sm">You'll receive an <strong>SMS message</strong> with download link</span></div>
                  <div className="flex items-start gap-3"><span className="text-orange-300 font-bold">4.</span><span className="text-orange-100 text-sm">Use the <strong>password</strong> in the SMS to open the files</span></div>
                </div>
                <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 mt-4">
                  <div className="flex items-center gap-2 mb-2"><span className="text-lg">📱</span><span className="text-green-200 font-semibold text-sm">SMS Delivery</span></div>
                  <p className="text-green-100 text-xs">You'll receive a text message with:</p>
                  <ul className="text-green-100 text-xs mt-1 space-y-1"><li>• Download link for BECE past questions</li><li>• Password to unlock the files</li><li>• Instructions for easy access</li></ul>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-orange-100 text-sm mb-4">✨ <strong>Dial now!</strong> Get your SMS with download link and password</p>
              <div className="space-y-3">
                <button onClick={handleUSSDDial} className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25">📞 Dial *790*700# Now</button>
                <button onClick={() => setSelectedResource(null)} className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/30">Close</button>
              </div>
              <p className="text-orange-200 text-xs mt-3">💡 <strong>Tip:</strong> Save the SMS for future access to your files</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedResource) { // Iframe/Smart Loading View (existing, adapted)
    return (
      <div className="fixed inset-0 z-[100] bg-black">
        <div className="fixed top-0 left-0 right-0 z-[110] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-4 sm:py-5 shadow-2xl border-b border-purple-700/50">
          <div className="container mx-auto px-4"><div className="flex items-center gap-4 sm:gap-6">
            <button onClick={handleBackFromResourceView} className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-purple-700/70 hover:bg-purple-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/50 hover:border-purple-400/70 flex-shrink-0 ring-2 ring-purple-500/20 hover:ring-purple-400/30">
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" /><span>Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">{selectedResource.title}</h1>
            {selectedResource.embedStrategy === 'smart' && (
              <button onClick={handleOpenOriginal} className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/80 hover:bg-blue-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm ml-auto">
                <ExternalLink size={14} /><span className="hidden sm:inline">Open Original</span>
              </button>
            )}
          </div></div>
        </div>
        <div className="absolute inset-0 pt-20 sm:pt-24">
          {!iframeError && selectedResource.embedStrategy !== 'smart' ? (
            <>
              <iframe ref={iframeRef} src={selectedResource.url} className="w-full h-full border-0" title={selectedResource.title} sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads allow-modals" onLoad={handleIframeLoad} onError={handleIframeError} />
              {isLoadingIframe && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white font-medium">Loading {selectedResource.title}...</p><p className="text-gray-300 text-sm mt-1">Please wait while we load the resource</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
              {isLoadingIframe ? ( // Smart Loading Animation
                <div className="text-center max-w-md">
                  <div className="relative mb-8"><div className="w-20 h-20 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div><div className="absolute inset-0 flex items-center justify-center"><div className="w-12 h-12 bg-blue-500/20 rounded-full animate-pulse"></div></div></div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {smartLoadingPhase === 'connecting' && 'Connecting to External Resource...'}
                    {smartLoadingPhase === 'loading' && 'Loading Content...'}
                    {smartLoadingPhase === 'error' && 'Connection Restricted'}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {smartLoadingPhase === 'connecting' && 'Establishing secure connection'}
                    {smartLoadingPhase === 'loading' && 'Fetching educational content'}
                    {smartLoadingPhase === 'error' && 'This resource blocks iframe embedding'}
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4"><div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${loadingProgress}%` }}></div></div>
                  <p className="text-sm text-gray-400">{loadingProgress}% complete</p>
                </div>
              ) : ( // Alternative Resources Display
                <div className="text-center max-w-4xl">
                  <div className="mb-8"><AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" /><h3 className="text-2xl font-bold text-white mb-2">Resource Access Alternative</h3><p className="text-gray-300 mb-6">{selectedResource.title} cannot be embedded directly. Choose from these excellent alternatives:</p></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <button onClick={handleOpenOriginal} className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"><ExternalLink className="w-8 h-8 mx-auto mb-3" /><h4 className="font-semibold mb-2">Original Resource</h4><p className="text-sm opacity-90">Open {selectedResource.title} in new tab</p></button>
                    {selectedResource.alternativeUrls?.slice(0, 5).map((url, index) => (
                      <button key={index} onClick={() => handleTryAlternative(url)} className="p-6 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"><BookOpen className="w-8 h-8 mx-auto mb-3" /><h4 className="font-semibold mb-2">Alternative {index + 1}</h4><p className="text-sm opacity-90">Similar learning resource</p></button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">All resources open in new tabs for the best learning experience</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main Page Layout with Search
  return (
    <div className="min-h-screen bg-black pt-16 text-white">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4 sticky top-16 z-40 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button onClick={handleMainBack} className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0">
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" /><span>Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Students Hub</h1>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 sticky top-[calc(16rem/4+3.5rem)] sm:top-[calc(16rem/4+4rem)] z-30 bg-black/80 backdrop-blur-md rounded-b-lg shadow-lg">
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search resources or learning intent (e.g., 'BECE Pasco', 'learn finance')"
                value={searchTerm}
                onChange={handleSearchInputChange}
                onFocus={() => { if(searchTerm) generateSuggestions(searchTerm); setShowSuggestionsDropdown(true); }}
                onBlur={() => setTimeout(() => setShowSuggestionsDropdown(false), 150)} // Delay to allow click on suggestions
                className="w-full pl-10 pr-16 py-3 sm:py-3.5 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none placeholder-gray-500"
                aria-label="Search Students Hub resources"
              />
              {searchTerm && (
                <button onClick={handleClearSearch} className="absolute right-10 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-white" aria-label="Clear search">
                  <X size={18} />
                </button>
              )}
            </div>
            <button className="p-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-400 hover:text-white" title="Voice Search (Coming Soon)" aria-label="Voice Search (Coming Soon)">
              <Volume2 size={20} />
            </button>
            <button className="p-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-400 hover:text-white" title="Filters (Coming Soon)" aria-label="Filters (Coming Soon)">
              <Filter size={20} />
            </button>
          </div>
          {/* Suggestions Dropdown */}
          {showSuggestionsDropdown && searchSuggestions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto"
            >
              <ul>
                {searchSuggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-purple-700/30 flex items-center gap-3 transition-colors duration-150"
                    >
                      {suggestion.icon && React.cloneElement(suggestion.icon as React.ReactElement, { className: "text-purple-400" })}
                      <span>{suggestion.text}</span>
                      {suggestion.type === 'history' && <span className="ml-auto text-xs text-gray-500">Recent</span>}
                      {suggestion.type === 'intent' && <span className="ml-auto text-xs text-purple-400">Intent</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
        {/* Quick Intent Chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(INTENT_DEFINITIONS).slice(0,5).map(([key, def]) => ( // Show first 5 common intents
            <button
              key={key}
              onClick={() => handleQuickIntentClick(key)}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-full border transition-all duration-200 flex items-center gap-1.5
                ${activeQuickIntent === key 
                  ? 'bg-purple-600 border-purple-500 text-white shadow-md' 
                  : 'bg-gray-700/70 border-gray-600 hover:bg-purple-700/50 hover:border-purple-600 text-gray-300 hover:text-white'}`}
            >
              {React.cloneElement(def.icon as React.ReactElement, { size: 14 })}
              {def.displayName}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {isSearching && (
            <div className="mb-6">
              {detectedIntentInfo && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-gray-800/60 border border-purple-700/50 rounded-lg text-center"
                >
                  <p className="text-sm text-purple-300 flex items-center justify-center gap-2">
                    <Target size={16} />
                    Detected Intent: <strong className="text-purple-200">{detectedIntentInfo.displayName}</strong>
                    (Confidence: <span className={`font-semibold ${detectedIntentInfo.confidence > 0.7 ? 'text-green-400' : detectedIntentInfo.confidence > 0.4 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {(detectedIntentInfo.confidence * 100).toFixed(0)}%
                    </span>)
                  </p>
                </motion.div>
              )}
              {isLoadingSearch ? (
                <div className="text-center py-10">
                  <div className="w-10 h-10 border-4 border-gray-700 border-t-purple-500 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-gray-400">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Search Results <span className="text-base font-normal text-gray-400">({searchResults.length} found)</span></h2>
                  <p className="text-sm text-gray-400 mb-4">Displaying results for: "{debouncedSearchTerm}"</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <AnimatePresence>
                      {searchResults.map((resource, index) => renderResourceCard(resource, index, debouncedSearchTerm))}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-10 px-4 bg-gray-800/50 rounded-lg"
                >
                  <Search size={48} className="text-purple-500 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Results Found for "{debouncedSearchTerm}"</h3>
                  <p className="text-gray-400 mb-4">Try refining your search, or explore our categories below.</p>
                  {searchHistory.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Recent searches:</p>
                      <div className="flex flex-wrap justify-center gap-2 mt-1">
                        {searchHistory.slice(0,3).map(hist => (
                          <button key={hist} onClick={() => setSearchTerm(hist)} className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-purple-300">{hist}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
              
              {/* Recommended For You Section - if intent detected and search results are shown */}
              {detectedIntentInfo && recommendedForYou.length > 0 && searchResults.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <ThumbsUp size={22} className="text-purple-400" /> Recommended for You (based on "{detectedIntentInfo.displayName}")
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                     {recommendedForYou.map((resource, index) => renderResourceCard(resource, index))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Categorized Resources - Shown when not searching or if search yields no results and user wants to browse */}
          {(!isSearching || (isSearching && searchResults.length === 0 && !isLoadingSearch)) && (
            <div className={`space-y-8 ${isSearching ? 'mt-8 pt-8 border-t border-gray-700' : ''}`}>
              {isSearching && searchResults.length === 0 && !isLoadingSearch && (
                <p className="text-center text-gray-400 text-lg">Alternatively, browse our curated categories:</p>
              )}
              {sortedCategories.map(([categoryName, categoryResources], categoryIndex) => (
                <motion.div
                  key={categoryName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (isSearching ? 0 : categoryIndex * 0.1) }} // No delay if shown after empty search
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{categoryName}</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                    <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                      {categoryResources.length} {categoryResources.length === 1 ? 'tool' : 'tools'}
                    </span>
                  </div>
                  <div className={`grid grid-cols-2 sm:grid-cols-3 ${isSearching ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-3 sm:gap-4`}>
                    {categoryResources.map((resource, index) => renderResourceCard(resource, index))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Popular Resources Section - always visible at the bottom or if not searching */}
          {!isSearching && popularResources.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp size={22} className="text-purple-400" /> Popular Resources
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {popularResources.map((resource, index) => renderResourceCard(resource, index))}
              </div>
            </div>
          )}

          {/* Footer Message (existing) */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-sm text-gray-300 mb-2">Tap any resource to open it within Students Hub</p>
            <div className="flex items-center justify-center text-xs text-gray-400">
              <div className="flex items-center gap-1"><AlertCircle size={12} className="text-blue-400" /><span>Smart Access resources provide alternatives if direct embedding fails.</span></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentsHubPage;
