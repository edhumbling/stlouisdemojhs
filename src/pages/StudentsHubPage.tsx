import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  Mic,
  FileText,
  Calculator,
  Languages,
  ArrowLeft,
  Users,
  DollarSign,
  Briefcase,
  Lightbulb,
  ExternalLink,
  AlertCircle,
  Smartphone,
  Palette,
  Code,
  Zap,
  Heart,
  Rocket,
  Library,
  Book,
  Archive,
  GraduationCap,
  Bot,
  MousePointer,
  Wind,
  Globe,
  Mail,
  Calendar,
  FileCheck,
  Repeat,
  Target,
  Music,
  Play
} from 'lucide-react';
import { useHeader } from '../contexts/HeaderContext';
import SmartSearchBar, { SearchableItem, FilterOption } from '../components/common/SmartSearchBar';
import ShimmerLoader from '../components/common/ShimmerLoader';
import useEnhancedNavigation from '../hooks/useEnhancedNavigation';
import SEOHead from '../components/seo/SEOHead';

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  isInternal?: boolean;
  alternativeUrls?: string[];
  embedStrategy?: 'iframe' | 'external' | 'smart';
  forceExternal?: boolean;
  proxyUrls?: string[];
  customScripts?: boolean;
  isUSSD?: boolean;
  openInNewTab?: boolean;
  isYouTube?: boolean;
  forceFullPage?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  sandbox?: string;
}

const StudentsHubPage: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedYouTubeVideo, setSelectedYouTubeVideo] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showShimmer, setShowShimmer] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [smartLoadingPhase, setSmartLoadingPhase] = useState<'connecting' | 'loading' | 'error' | 'success'>('connecting');
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  const { setShowHeader } = useHeader();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [openLofiId, setOpenLofiId] = useState<string | null>(null);
  const { handleInternalStateChange, savePageState } = useEnhancedNavigation();

  // Handle initial page loading with shimmer effect
  useEffect(() => {
    setPageLoading(true);

    // Simulate loading time for initial page load
    const loadingTimer = setTimeout(() => {
      setPageLoading(false);
    }, 1500); // 1.5 second initial loading

    return () => clearTimeout(loadingTimer);
  }, []);

  // Control header visibility based on whether we're viewing an individual resource
  useEffect(() => {
    if (selectedResource) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }

    // Cleanup: ensure header is shown when component unmounts
    return () => {
      setShowHeader(true);
    };
  }, [selectedResource, setShowHeader]);

  // 📚 CATEGORIZED STUDENTS HUB RESOURCES 📚
  // Organized by learning areas for better navigation and discovery
  const resourceCategories: { [category: string]: Resource[] } = {
    "📚 Academic Resources": [
      {
        id: 1,
        title: "Audiobooks",
        description: "Free audiobooks collection",
        url: "https://marhamilresearch4.blob.core.windows.net/gutenberg-public/Website/browse.html",
        icon: <Mic className="w-5 h-5" />,
        color: "#007AFF"
      },
      {
        id: 200,
        title: "Educational Pathways & Opportunities",
        description: "Complete guide to scholarships, SAT prep, TVET programs, startup hubs, and all educational pathways from SHS to career success",
        url: "/scholarship-opportunities",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "#FF6B35",
        isInternal: true
      },
      {
        id: 2,
        title: "Poetry Archive",
        description: "Children's poetry collection",
        url: "https://childrens.poetryarchive.org/",
        icon: <BookOpen className="w-5 h-5" />,
        color: "#FF3B30"
      },
      {
        id: 17,
        title: "Ebook Library",
        description: "Comprehensive digital library with thousands of free ebooks",
        url: "https://divinemonk.github.io/ebooklibrary/",
        icon: <Library className="w-5 h-5" />,
        color: "#8B5CF6",
        embedStrategy: 'iframe',
        sandbox: "allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation",
        customScripts: true,
        forceFullPage: true,
        hideHeader: true,
        hideFooter: true
      },
      {
        id: 19,
        title: "DBooks Library",
        description: "Free programming and technical books library for developers and students",
        url: "https://www.dbooks.org/",
        icon: <Code className="w-5 h-5" />,
        color: "#059669",
        embedStrategy: 'iframe'
      },
      {
        id: 20,
        title: "Gutenberg Library",
        description: "Classic literature and public domain books - over 70,000 free ebooks",
        url: "https://www.gutenberg.org/ebooks/categories",
        icon: <BookOpen className="w-5 h-5" />,
        color: "#DC2626",
        embedStrategy: 'iframe'
      },
      {
        id: 21,
        title: "Libgen Library",
        description: "Comprehensive digital archive with millions of books, papers, and documents",
        url: "https://libgen.is/",
        icon: <Archive className="w-5 h-5" />,
        color: "#7C2D12",
        embedStrategy: 'iframe'
      },
      {
        id: 22,
        title: "JHS Textbooks",
        description: "Free Junior High School textbooks and notes organized by subject",
        url: "/jhs-textbooks",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "#0F766E",
        isInternal: true
      },
      {
        id: 26,
        title: "Dreamhive Resources",
        description: "Professional development guides: resume writing, essay crafting, and email etiquette",
        url: "/dream-hive-resources",
        icon: <Briefcase className="w-5 h-5" />,
        color: "#7C3AED",
        isInternal: true
      },
      {
        id: 27,
        title: "Career Reel Resources",
        description: "Job hunting tools: tracking sheets, resume guides, and career development resources",
        url: "/career-reel-resources",
        icon: <Users className="w-5 h-5" />,
        color: "#DC2626",
        isInternal: true
      }
    ],
    "📝 Exam Preparation": [
      {
        id: 3,
        title: "BECE PASCO",
        description: "BECE past questions",
        url: "https://emmadeeofficial.gumroad.com/l/becepasco",
        icon: <FileText className="w-5 h-5" />,
        color: "#34C759"
      },
      {
        id: 11,
        title: "BECE Pasco 2",
        description: "Alternative BECE past questions database",
        url: "https://www.becepastquestions.com/",
        icon: <FileText className="w-5 h-5" />,
        color: "#7C3AED",
        embedStrategy: 'iframe',
        customScripts: true
      },
      {
        id: 12,
        title: "BECE Pasco Via USSD",
        description: "Access past questions directly on your mobile phone!",
        url: "ussd://dial",
        icon: <Smartphone className="w-5 h-5" />,
        color: "#FF9500",
        isUSSD: true
      },
      {
        id: 4,
        title: "JHS MOCKS",
        description: "JHS mock examinations",
        url: "https://emmadeeofficial.gumroad.com/l/jhsmocks",
        icon: <FileText className="w-5 h-5" />,
        color: "#FF9500"
      }
    ],
    "🧮 STEM Tools": [
      {
        id: 5,
        title: "QWEN Maths",
        description: "AI maths problem solver",
        url: "https://qwen-qwen2-math-demo.hf.space",
        icon: <Calculator className="w-5 h-5" />,
        color: "#5856D6",
        embedStrategy: 'iframe'
      },
      {
        id: 58,
        title: "Khan Academy",
        description: "Free world-class education in math, science, and more with interactive exercises!",
        url: "https://www.khanacademy.org/",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "#14A085",
        openInNewTab: true
      },
      {
        id: 59,
        title: "Wolfram Alpha",
        description: "Computational knowledge engine for math, science, and engineering problems!",
        url: "https://www.wolframalpha.com/",
        icon: <Calculator className="w-5 h-5" />,
        color: "#FF6C0C",
        openInNewTab: true
      },
      {
        id: 60,
        title: "Desmos Graphing Calculator",
        description: "Advanced online graphing calculator for exploring mathematical functions!",
        url: "https://www.desmos.com/calculator",
        icon: <Calculator className="w-5 h-5" />,
        color: "#2F7D32",
        embedStrategy: 'iframe'
      },
      {
        id: 61,
        title: "PhET Interactive Simulations",
        description: "Interactive science and math simulations from University of Colorado Boulder!",
        url: "https://phet.colorado.edu/",
        icon: <Zap className="w-5 h-5" />,
        color: "#1976D2",
        openInNewTab: true
      },
      {
        id: 62,
        title: "GeoGebra",
        description: "Dynamic mathematics software for geometry, algebra, and calculus!",
        url: "https://www.geogebra.org/",
        icon: <Calculator className="w-5 h-5" />,
        color: "#666666",
        embedStrategy: 'iframe'
      },
      {
        id: 63,
        title: "Brilliant",
        description: "Learn STEM concepts through interactive problem-solving and guided courses!",
        url: "https://brilliant.org/",
        icon: <Lightbulb className="w-5 h-5" />,
        color: "#FFB300",
        openInNewTab: true
      },
      {
        id: 64,
        title: "Coursera STEM",
        description: "University-level STEM courses from top institutions worldwide!",
        url: "https://www.coursera.org/browse/physical-science-and-engineering",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "#0056D3",
        openInNewTab: true
      },
      {
        id: 65,
        title: "NASA Education",
        description: "Educational resources, simulations, and activities from NASA!",
        url: "https://www.nasa.gov/audience/foreducators/",
        icon: <Rocket className="w-5 h-5" />,
        color: "#FC3D21",
        openInNewTab: true
      },
      {
        id: 66,
        title: "Codecademy",
        description: "Interactive coding lessons and computer science fundamentals!",
        url: "https://www.codecademy.com/",
        icon: <Code className="w-5 h-5" />,
        color: "#1F4056",
        openInNewTab: true
      },
      {
        id: 67,
        title: "Scratch Programming",
        description: "Visual programming language perfect for learning coding concepts!",
        url: "https://scratch.mit.edu/",
        icon: <Code className="w-5 h-5" />,
        color: "#FF8C1A",
        openInNewTab: true
      }
    ],

    "🌍 Language & Communication": [
      {
        id: 6,
        title: "KHAYA Translator",
        description: "AI language translator",
        url: "https://translate.ghananlp.org/",
        icon: <Languages className="w-5 h-5" />,
        color: "#AF52DE"
      },
      {
        id: 18,
        title: "Britannica Dictionary",
        description: "Comprehensive English dictionary with clear definitions and usage examples",
        url: "https://www.britannica.com/dictionary",
        icon: <Book className="w-5 h-5" />,
        color: "#0066CC",
        embedStrategy: 'iframe'
      },
      {
        id: 34,
        title: "Wikipedia",
        description: "Free online encyclopedia with millions of articles on every topic",
        url: "https://en.wikipedia.org/wiki/Main_Page",
        icon: <Globe className="w-5 h-5" />,
        color: "#000000",
        embedStrategy: 'iframe'
      },
      {
        id: 83,
        title: "Duolingo",
        description: "Fun and interactive language learning app perfect for junior high students!",
        url: "https://www.duolingo.com/",
        icon: <Languages className="w-5 h-5" />,
        color: "#58CC02",
        openInNewTab: true
      },
      {
        id: 84,
        title: "Babbel",
        description: "Practical language learning designed for real conversations and communication!",
        url: "https://www.babbel.com/",
        icon: <Languages className="w-5 h-5" />,
        color: "#FFD900",
        openInNewTab: true
      },
      {
        id: 85,
        title: "Busuu",
        description: "Language learning with speech recognition and conversation practice!",
        url: "https://www.busuu.com/",
        icon: <Languages className="w-5 h-5" />,
        color: "#1CB0F6",
        openInNewTab: true
      },
      {
        id: 86,
        title: "FluentU",
        description: "Learn languages through real-world videos like music videos and movie trailers!",
        url: "https://www.fluentu.com/",
        icon: <Languages className="w-5 h-5" />,
        color: "#FF6B35",
        openInNewTab: true
      },
      {
        id: 87,
        title: "Speechling",
        description: "Improve pronunciation and speaking skills with AI feedback and human coaches!",
        url: "https://speechling.com/",
        icon: <Mic className="w-5 h-5" />,
        color: "#4CAF50",
        openInNewTab: true
      },
      {
        id: 88,
        title: "Lingoda",
        description: "Online language classes with certified teachers for structured learning!",
        url: "https://www.lingoda.com/",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "#FF4081",
        openInNewTab: true
      },
      {
        id: 89,
        title: "HelloTalk",
        description: "Language exchange app to chat with native speakers around the world!",
        url: "https://www.hellotalk.com/",
        icon: <Globe className="w-5 h-5" />,
        color: "#FF5722",
        openInNewTab: true
      },
      {
        id: 90,
        title: "Memrise",
        description: "Learn vocabulary and phrases through spaced repetition and memory techniques!",
        url: "https://www.memrise.com/",
        icon: <Lightbulb className="w-5 h-5" />,
        color: "#9C27B0",
        openInNewTab: true
      },
      {
        id: 91,
        title: "Rosetta Stone",
        description: "Immersive language learning program trusted by schools worldwide!",
        url: "https://www.rosettastone.com/",
        icon: <Languages className="w-5 h-5" />,
        color: "#FFB300",
        openInNewTab: true
      },
      {
        id: 92,
        title: "Cambly",
        description: "Practice English conversation with native speakers through video chat!",
        url: "https://www.cambly.com/",
        icon: <Mic className="w-5 h-5" />,
        color: "#00BCD4",
        openInNewTab: true
      }
    ],
    "💰 Financial Literacy": [
      {
        id: 8,
        title: "Khan Academy Financial Literacy",
        description: "Learn personal finance and money management",
        url: "https://www.khanacademy.org/college-careers-more/financial-literacy",
        icon: <DollarSign className="w-5 h-5" />,
        color: "#00C896",
        embedStrategy: 'smart',
        alternativeUrls: [
          "https://www.investopedia.com/financial-literacy-4776932",
          "https://www.practicalmoneyskills.com/",
          "https://www.jumpstart.org/",
          "https://www.mymoney.gov/"
        ],
        proxyUrls: [
          "https://web.archive.org/web/20240101000000*/https://www.khanacademy.org/college-careers-more/financial-literacy"
        ]
      },
      {
        id: 28,
        title: "Personal Finance Basics",
        description: "Essential guide to managing your money and building financial security",
        url: "https://drive.google.com/file/d/1Sg8I986nRXGfk3Ir1Eyx6aDyw6F4E6lz/preview",
        icon: <DollarSign className="w-5 h-5" />,
        color: "#059669",
        embedStrategy: 'iframe'
      },
      {
        id: 29,
        title: "Budgeting and Saving",
        description: "Learn how to create budgets and develop smart saving habits",
        url: "https://drive.google.com/file/d/1dwEaBuMyCFvmt0D8go44SpZTxq-PiJUN/preview",
        icon: <DollarSign className="w-5 h-5" />,
        color: "#0EA5E9",
        embedStrategy: 'iframe'
      },
      {
        id: 30,
        title: "Investment Fundamentals",
        description: "Introduction to investing and growing your wealth over time",
        url: "https://drive.google.com/file/d/1wehgmwts4fLxPkVIgjXSDeXNOPMtzFIP/preview",
        icon: <DollarSign className="w-5 h-5" />,
        color: "#8B5CF6",
        embedStrategy: 'iframe'
      },
      {
        id: 31,
        title: "Credit and Debt Management",
        description: "Understanding credit scores, loans, and responsible debt management",
        url: "https://drive.google.com/file/d/1tDhpCsr36husIUKf-OIfUWZZ6GuuAGEh/preview",
        icon: <DollarSign className="w-5 h-5" />,
        color: "#F59E0B",
        embedStrategy: 'iframe'
      },
      {
        id: 32,
        title: "Financial Planning for Students",
        description: "Money management strategies specifically designed for students",
        url: "https://drive.google.com/file/d/11M0ZPnV5OLqRPoqPBoDDcuAJFE11u6QC/preview",
        icon: <DollarSign className="w-5 h-5" />,
        color: "#EF4444",
        embedStrategy: 'iframe'
      },
      {
        id: 33,
        title: "Money Smart Links",
        description: "300+ comprehensive financial education websites and resources directory",
        url: "/money-smart-links",
        icon: <Globe className="w-5 h-5" />,
        color: "#059669",
        isInternal: true
      }
    ],
    "💼 Life Skills & Career": [
      {
        id: 7,
        title: "Advice from Successful People",
        description: "Commencement speeches from leaders",
        url: "/advice-speeches",
        icon: <Users className="w-5 h-5" />,
        color: "#FF6B35",
        isInternal: true
      },
      {
        id: 9,
        title: "Business Skills Chat",
        description: "AI-powered business skills development",
        url: "https://www.nfx.com/chat",
        icon: <Briefcase className="w-5 h-5" />,
        color: "#1E40AF",
        embedStrategy: 'smart',
        alternativeUrls: [
          "https://www.coursera.org/browse/business",
          "https://www.edx.org/learn/business",
          "https://www.futurelearn.com/subjects/business-and-management-courses",
          "https://alison.com/courses/business"
        ],
        proxyUrls: [
          "https://web.archive.org/web/20240101000000*/https://www.nfx.com/chat"
        ]
      },
      {
        id: 10,
        title: "Product Creation Chat",
        description: "Learn product development and creation",
        url: "https://www.lennybot.com/",
        icon: <Lightbulb className="w-5 h-5" />,
        color: "#F59E0B"
      },
      {
        id: 93,
        title: "LinkedIn Learning",
        description: "Free career development courses and professional skills training!",
        url: "https://www.linkedin.com/learning/",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "#0077B5",
        openInNewTab: true
      },
      {
        id: 94,
        title: "Coursera Career Courses",
        description: "Free career-focused courses from top universities and companies!",
        url: "https://www.coursera.org/browse/personal-development",
        icon: <Briefcase className="w-5 h-5" />,
        color: "#0056D3",
        openInNewTab: true
      },
      {
        id: 95,
        title: "Indeed Career Guide",
        description: "Free career advice, resume tips, and interview preparation resources!",
        url: "https://www.indeed.com/career-advice",
        icon: <FileCheck className="w-5 h-5" />,
        color: "#2557A7",
        openInNewTab: true
      },
      {
        id: 96,
        title: "O*NET Interest Profiler",
        description: "Free career assessment tool to discover careers that match your interests!",
        url: "https://www.mynextmove.org/explore/ip",
        icon: <Target className="w-5 h-5" />,
        color: "#28A745",
        openInNewTab: true
      },
      {
        id: 97,
        title: "Khan Academy Life Skills",
        description: "Free courses on personal finance, college prep, and life skills!",
        url: "https://www.khanacademy.org/college-careers-more",
        icon: <Lightbulb className="w-5 h-5" />,
        color: "#14A085",
        openInNewTab: true
      },
      {
        id: 98,
        title: "Alison Life Skills",
        description: "Free online courses in communication, leadership, and personal development!",
        url: "https://alison.com/courses/personal-development",
        icon: <Users className="w-5 h-5" />,
        color: "#FF6B35",
        openInNewTab: true
      },
      {
        id: 99,
        title: "edX Professional Skills",
        description: "Free professional development courses from Harvard, MIT, and other top institutions!",
        url: "https://www.edx.org/learn/professional-development",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "#02262B",
        openInNewTab: true
      },
      {
        id: 100,
        title: "Google Career Certificates",
        description: "Free access to Google's career certificate programs and job training!",
        url: "https://grow.google/certificates/",
        icon: <Briefcase className="w-5 h-5" />,
        color: "#4285F4",
        openInNewTab: true
      },
      {
        id: 101,
        title: "FutureLearn Life Skills",
        description: "Free courses on communication, leadership, and personal effectiveness!",
        url: "https://www.futurelearn.com/subjects/personal-development-courses",
        icon: <Lightbulb className="w-5 h-5" />,
        color: "#DE00A5",
        openInNewTab: true
      },
      {
        id: 102,
        title: "Skillshare Free Classes",
        description: "Free creative and business skills classes for personal and professional growth!",
        url: "https://www.skillshare.com/browse/business",
        icon: <Palette className="w-5 h-5" />,
        color: "#00FF88",
        openInNewTab: true
      }
    ],
    "🎨 Creative Tools": [
      {
        id: 13,
        title: "AI Comic Factory",
        description: "Create amazing comics and stories with AI - unleash your creativity!",
        url: "https://huggingface.co/spaces/jbilcke-hf/ai-comic-factory",
        icon: <Palette className="w-5 h-5" />,
        color: "#E91E63",
        openInNewTab: true
      },
      {
        id: 48,
        title: "DALL-E 3",
        description: "OpenAI's most advanced AI image generator for creating stunning artwork from text!",
        url: "https://openai.com/dall-e-3",
        icon: <Palette className="w-5 h-5" />,
        color: "#412991",
        openInNewTab: true
      },
      {
        id: 49,
        title: "Midjourney",
        description: "Premium AI art generator known for creating beautiful, artistic images!",
        url: "https://www.midjourney.com/",
        icon: <Palette className="w-5 h-5" />,
        color: "#FF6B35",
        openInNewTab: true
      },
      {
        id: 50,
        title: "Stable Diffusion",
        description: "Open-source AI image generator with incredible customization options!",
        url: "https://stability.ai/stable-diffusion",
        icon: <Palette className="w-5 h-5" />,
        color: "#8B5CF6",
        openInNewTab: true
      },
      {
        id: 51,
        title: "Leonardo AI",
        description: "AI-powered creative suite for generating art, designs, and visual content!",
        url: "https://leonardo.ai/",
        icon: <Palette className="w-5 h-5" />,
        color: "#059669",
        openInNewTab: true
      },
      {
        id: 52,
        title: "Canva AI",
        description: "AI-enhanced design platform for creating presentations, posters, and graphics!",
        url: "https://www.canva.com/ai-image-generator/",
        icon: <Palette className="w-5 h-5" />,
        color: "#00C4CC",
        openInNewTab: true
      },
      {
        id: 53,
        title: "Adobe Firefly",
        description: "Adobe's AI creative suite for generating images, text effects, and designs!",
        url: "https://www.adobe.com/products/firefly.html",
        icon: <Palette className="w-5 h-5" />,
        color: "#FF0000",
        openInNewTab: true
      },
      {
        id: 54,
        title: "RunwayML",
        description: "AI-powered video editing and creative tools for next-generation content creation!",
        url: "https://runwayml.com/",
        icon: <Palette className="w-5 h-5" />,
        color: "#000000",
        openInNewTab: true
      },
      {
        id: 55,
        title: "Artbreeder",
        description: "Collaborative AI art platform for creating and evolving unique images!",
        url: "https://www.artbreeder.com/",
        icon: <Palette className="w-5 h-5" />,
        color: "#9333EA",
        openInNewTab: true
      },
      {
        id: 56,
        title: "DeepArt",
        description: "Transform your photos into artwork using AI and famous artistic styles!",
        url: "https://deepart.io/",
        icon: <Palette className="w-5 h-5" />,
        color: "#DC2626",
        openInNewTab: true
      },
      {
        id: 57,
        title: "Playground AI",
        description: "Free AI image generator with powerful editing tools and creative features!",
        url: "https://playgroundai.com/",
        icon: <Palette className="w-5 h-5" />,
        color: "#F59E0B",
        openInNewTab: true
      }
    ],
    "⚙️ Educational Automation Tools": [
      {
        id: 168,
        title: "Anki",
        description: "Intelligent flashcard system with spaced repetition for efficient memorization!",
        url: "https://apps.ankiweb.net/",
        icon: <Repeat className="w-5 h-5" />,
        color: "#0093D0",
        openInNewTab: true
      },
      {
        id: 169,
        title: "Quizlet",
        description: "Automated study tools with flashcards, games, and practice tests!",
        url: "https://quizlet.com/",
        icon: <Target className="w-5 h-5" />,
        color: "#4255FF",
        openInNewTab: true
      },
      {
        id: 170,
        title: "StudyBlue",
        description: "Digital study tools that automatically organize your notes and create study guides!",
        url: "https://www.studyblue.com/",
        icon: <FileCheck className="w-5 h-5" />,
        color: "#00A8E6",
        openInNewTab: true
      },
      {
        id: 171,
        title: "Evernote",
        description: "Smart note-taking app that automatically syncs and organizes your study materials!",
        url: "https://evernote.com/",
        icon: <FileCheck className="w-5 h-5" />,
        color: "#00A82D",
        openInNewTab: true
      },
      {
        id: 172,
        title: "Google Scholar Alerts",
        description: "Automated research alerts that notify you of new academic papers in your field!",
        url: "https://scholar.google.com/scholar_alerts",
        icon: <Mail className="w-5 h-5" />,
        color: "#4285F4",
        openInNewTab: true
      },
      {
        id: 173,
        title: "Zotero",
        description: "Research tool that automatically captures and organizes citations and references!",
        url: "https://www.zotero.org/",
        icon: <Archive className="w-5 h-5" />,
        color: "#CC2936",
        openInNewTab: true
      },
      {
        id: 174,
        title: "Mendeley",
        description: "Reference manager that automatically organizes research papers and generates bibliographies!",
        url: "https://www.mendeley.com/",
        icon: <Archive className="w-5 h-5" />,
        color: "#9D1620",
        openInNewTab: true
      },
      {
        id: 175,
        title: "Coursera Auto-Enroll",
        description: "Automated course enrollment and deadline tracking for online learning!",
        url: "https://www.coursera.org/",
        icon: <Calendar className="w-5 h-5" />,
        color: "#0056D3",
        openInNewTab: true
      },
      {
        id: 176,
        title: "Khan Academy Progress",
        description: "Automated learning progress tracking and personalized study recommendations!",
        url: "https://www.khanacademy.org/",
        icon: <Target className="w-5 h-5" />,
        color: "#14A085",
        openInNewTab: true
      },
      {
        id: 177,
        title: "Grammarly for Students",
        description: "AI writing assistant specifically designed for academic writing and essays!",
        url: "https://www.grammarly.com/edu",
        icon: <FileCheck className="w-5 h-5" />,
        color: "#15C39A",
        openInNewTab: true
      },
      {
        id: 178,
        title: "Notion",
        description: "All-in-one workspace for notes, tasks, wikis, and databases - organize your entire academic life!",
        url: "https://www.notion.so/",
        icon: <FileCheck className="w-5 h-5" />,
        color: "#000000",
        openInNewTab: true
      },
      {
        id: 179,
        title: "Obsidian",
        description: "Knowledge management app with linked notes - perfect for building your personal knowledge graph!",
        url: "https://obsidian.md/",
        icon: <Globe className="w-5 h-5" />,
        color: "#7C3AED",
        openInNewTab: true
      },
      {
        id: 180,
        title: "Otter.ai",
        description: "AI-powered meeting transcription and note-taking for lectures and study sessions!",
        url: "https://otter.ai/",
        icon: <Mic className="w-5 h-5" />,
        color: "#00D4AA",
        openInNewTab: true
      },
      {
        id: 181,
        title: "Loom",
        description: "Screen recording tool for creating educational videos and presentations effortlessly!",
        url: "https://www.loom.com/",
        icon: <Smartphone className="w-5 h-5" />,
        color: "#625DF5",
        openInNewTab: true
      },
      {
        id: 182,
        title: "Figma",
        description: "Collaborative design tool perfect for creating presentations, diagrams, and visual projects!",
        url: "https://www.figma.com/",
        icon: <Palette className="w-5 h-5" />,
        color: "#F24E1E",
        openInNewTab: true
      }
    ],
    "💻 Coding": [
      {
        id: 14,
        title: "LlamaCoder",
        description: "AI-powered coding assistant - learn programming with AI guidance!",
        url: "https://llamacoder.together.ai/",
        icon: <Code className="w-5 h-5" />,
        color: "#10B981",
        embedStrategy: 'iframe'
      },
      {
        id: 15,
        title: "Bolt.new",
        description: "Build and deploy full-stack web apps instantly with AI!",
        url: "https://bolt.new/",
        icon: <Zap className="w-5 h-5" />,
        color: "#F59E0B",
        embedStrategy: 'iframe'
      },
      {
        id: 16,
        title: "Lovable",
        description: "Create beautiful web applications with AI-powered development!",
        url: "https://lovable.dev/",
        icon: <Heart className="w-5 h-5" />,
        color: "#EC4899",
        embedStrategy: 'iframe'
      },
      {
        id: 23,
        title: "AI.dev",
        description: "AI-powered development platform for building applications with artificial intelligence!",
        url: "https://ai.dev/",
        icon: <Bot className="w-5 h-5" />,
        color: "#6366F1",
        openInNewTab: true
      },
      {
        id: 24,
        title: "Cursor",
        description: "AI-powered code editor that helps you write code faster and smarter!",
        url: "https://cursor.com/",
        icon: <MousePointer className="w-5 h-5" />,
        color: "#000000",
        openInNewTab: true
      },
      {
        id: 25,
        title: "Windsurf",
        description: "Advanced AI coding assistant for seamless development experience!",
        url: "https://windsurf.com/",
        icon: <Wind className="w-5 h-5" />,
        color: "#0EA5E9",
        openInNewTab: true
      },
      {
        id: 37,
        title: "Factory AI",
        description: "AI-powered software development platform for building applications faster!",
        url: "https://www.factory.ai/",
        icon: <Bot className="w-5 h-5" />,
        color: "#FF6B35",
        openInNewTab: true
      },
      {
        id: 38,
        title: "GitHub Copilot",
        description: "AI pair programmer that helps you write code faster with intelligent suggestions!",
        url: "https://github.com/features/copilot",
        icon: <Code className="w-5 h-5" />,
        color: "#24292e",
        openInNewTab: true
      },
      {
        id: 39,
        title: "Replit AI",
        description: "AI-powered online IDE for coding, collaborating, and learning programming!",
        url: "https://replit.com/ai",
        icon: <Bot className="w-5 h-5" />,
        color: "#F26207",
        openInNewTab: true
      },
      {
        id: 40,
        title: "Tabnine",
        description: "AI code completion tool that predicts and suggests your next lines of code!",
        url: "https://www.tabnine.com/",
        icon: <Zap className="w-5 h-5" />,
        color: "#4A90E2",
        openInNewTab: true
      },
      {
        id: 41,
        title: "CodeWhisperer",
        description: "Amazon's AI coding companion for generating code suggestions in real-time!",
        url: "https://aws.amazon.com/codewhisperer/",
        icon: <Bot className="w-5 h-5" />,
        color: "#FF9900",
        openInNewTab: true
      },
      {
        id: 42,
        title: "Codeium",
        description: "Free AI-powered code acceleration toolkit with autocomplete and chat!",
        url: "https://codeium.com/",
        icon: <Zap className="w-5 h-5" />,
        color: "#09B6A2",
        openInNewTab: true
      },
      {
        id: 43,
        title: "Claude Dev",
        description: "AI assistant for software development with advanced reasoning and coding capabilities!",
        url: "https://claude.ai/",
        icon: <Bot className="w-5 h-5" />,
        color: "#D97706",
        openInNewTab: true
      },
      {
        id: 44,
        title: "Sourcegraph Cody",
        description: "AI coding assistant that understands your entire codebase for better suggestions!",
        url: "https://sourcegraph.com/cody",
        icon: <Code className="w-5 h-5" />,
        color: "#00B4FF",
        openInNewTab: true
      },
      {
        id: 45,
        title: "CodeT5",
        description: "AI model for code understanding and generation with multilingual support!",
        url: "https://huggingface.co/Salesforce/codet5-large",
        icon: <Bot className="w-5 h-5" />,
        color: "#FF6B6B",
        openInNewTab: true
      },
      {
        id: 46,
        title: "Codex by OpenAI",
        description: "Powerful AI system that translates natural language to code in multiple languages!",
        url: "https://openai.com/blog/openai-codex",
        icon: <Zap className="w-5 h-5" />,
        color: "#412991",
        openInNewTab: true
      },
      {
        id: 47,
        title: "Aider",
        description: "AI pair programming tool that works with your existing codebase in the terminal!",
        url: "https://aider.chat/",
        icon: <Code className="w-5 h-5" />,
        color: "#2ECC71",
        openInNewTab: true
      },
      {
        id: 48,
        title: "v0 by Vercel",
        description: "AI-powered UI generator that creates React components from text descriptions!",
        url: "https://v0.dev/",
        icon: <Zap className="w-5 h-5" />,
        color: "#000000",
        openInNewTab: true
      },
      {
        id: 49,
        title: "Continue",
        description: "Open-source AI code assistant that works with any IDE and any model!",
        url: "https://continue.dev/",
        icon: <Code className="w-5 h-5" />,
        color: "#6366F1",
        openInNewTab: true
      },
      {
        id: 50,
        title: "Supermaven",
        description: "Ultra-fast AI code completion with 1 million token context window!",
        url: "https://supermaven.com/",
        icon: <Zap className="w-5 h-5" />,
        color: "#FF6B35",
        openInNewTab: true
      },
      {
        id: 51,
        title: "Blackbox AI",
        description: "AI-powered coding assistant with code search and generation capabilities!",
        url: "https://www.blackbox.ai/",
        icon: <Bot className="w-5 h-5" />,
        color: "#1A1A1A",
        openInNewTab: true
      },
      {
        id: 52,
        title: "CodeGPT",
        description: "AI coding assistant extension for VS Code with multiple AI models!",
        url: "https://codegpt.co/",
        icon: <Code className="w-5 h-5" />,
        color: "#00D4AA",
        openInNewTab: true
      },
      {
        id: 53,
        title: "Pieces",
        description: "AI-powered developer productivity tool for code snippets and workflow!",
        url: "https://pieces.app/",
        icon: <Bot className="w-5 h-5" />,
        color: "#FF4081",
        openInNewTab: true
      },
      {
        id: 54,
        title: "Refact",
        description: "AI coding assistant with code completion, chat, and refactoring tools!",
        url: "https://refact.ai/",
        icon: <Zap className="w-5 h-5" />,
        color: "#7C3AED",
        openInNewTab: true
      },
      {
        id: 55,
        title: "Bito AI",
        description: "AI assistant for developers with code generation and explanation features!",
        url: "https://bito.ai/",
        icon: <Bot className="w-5 h-5" />,
        color: "#F59E0B",
        openInNewTab: true
      },
      {
        id: 56,
        title: "CodeCompanion",
        description: "AI-powered coding companion for faster development and debugging!",
        url: "https://codecompanion.ai/",
        icon: <Code className="w-5 h-5" />,
        color: "#10B981",
        openInNewTab: true
      },
      {
        id: 57,
        title: "Safurai",
        description: "AI code assistant that helps with code generation, optimization, and debugging!",
        url: "https://www.safurai.com/",
        icon: <Bot className="w-5 h-5" />,
        color: "#3B82F6",
        openInNewTab: true
      },
      {
        id: 58,
        title: "Mintlify",
        description: "AI-powered documentation generator that creates beautiful docs from code!",
        url: "https://mintlify.com/",
        icon: <FileCheck className="w-5 h-5" />,
        color: "#06B6D4",
        openInNewTab: true
      },
      {
        id: 59,
        title: "Stenography",
        description: "AI-powered code documentation tool that automatically documents your codebase!",
        url: "https://stenography.dev/",
        icon: <FileCheck className="w-5 h-5" />,
        color: "#8B5CF6",
        openInNewTab: true
      },
      {
        id: 60,
        title: "Figstack",
        description: "AI tool suite for reading, writing, and understanding code in any language!",
        url: "https://figstack.com/",
        icon: <Code className="w-5 h-5" />,
        color: "#EF4444",
        openInNewTab: true
      },
      {
        id: 61,
        title: "Explain Code",
        description: "AI-powered code explanation tool that helps understand complex code snippets!",
        url: "https://explain.dev/",
        icon: <Lightbulb className="w-5 h-5" />,
        color: "#F59E0B",
        openInNewTab: true
      },
      {
        id: 62,
        title: "CodeConvert",
        description: "AI-powered code converter that translates code between programming languages!",
        url: "https://codeconvert.ai/",
        icon: <Code className="w-5 h-5" />,
        color: "#10B981",
        openInNewTab: true
      },
      {
        id: 63,
        title: "AI Code Translator",
        description: "Convert code from one programming language to another using AI!",
        url: "https://ai-code-translator.vercel.app/",
        icon: <Globe className="w-5 h-5" />,
        color: "#6366F1",
        openInNewTab: true
      },
      {
        id: 64,
        title: "Programming Helper",
        description: "AI assistant for programming tasks, code generation, and problem solving!",
        url: "https://www.programming-helper.com/",
        icon: <Bot className="w-5 h-5" />,
        color: "#EC4899",
        openInNewTab: true
      }
    ],

    "🎵 Lofi Playlists for Study/Focused Learning": [
      {
        id: 1001,
        title: "lofi hip hop radio 📚 beats to relax/study to",
        description: "Lofi Girl - 24/7 lofi hip hop radio for studying",
        url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
        icon: <Music className="w-5 h-5" />,
        color: "#FF6B6B",
        isYouTube: true
      },
      {
        id: 1002,
        title: "lofi hip hop mix beats to relax/study to (Part 1)",
        description: "Lofi Girl - Curated mix of lofi hip hop beats",
        url: "https://www.youtube.com/watch?v=CFGLoQIhmow",
        icon: <Music className="w-5 h-5" />,
        color: "#4ECDC4",
        isYouTube: true
      },
      {
        id: 1003,
        title: "Best of lofi hip hop 2023 - beats to relax/study to",
        description: "Lofi Girl - Best lofi tracks from 2023",
        url: "https://www.youtube.com/watch?v=mmKguZohAck",
        icon: <Music className="w-5 h-5" />,
        color: "#45B7D1",
        isYouTube: true
      },
      {
        id: 1004,
        title: "Best of lofi 2024 beats to chill/study to",
        description: "Lofi Girl - Latest and best lofi beats for 2024",
        url: "https://www.youtube.com/watch?v=lA9FONoiuFA",
        icon: <Music className="w-5 h-5" />,
        color: "#96CEB4",
        isYouTube: true
      },
      {
        id: 1005,
        title: "lofi hip hop radio - beats to study/relax to",
        description: "Lofi Girl - Alternative lofi radio stream",
        url: "https://www.youtube.com/watch?v=7NOSDKb0HlU",
        icon: <Music className="w-5 h-5" />,
        color: "#FFEAA7",
        isYouTube: true
      },
      {
        id: 1006,
        title: "study with me with lofi music | pomodoro (25 min study & 5 min rest)",
        description: "Lofi Girl - Pomodoro study session with lofi music",
        url: "https://www.youtube.com/watch?v=EbOTwmzpquE",
        icon: <Music className="w-5 h-5" />,
        color: "#DDA0DD",
        isYouTube: true
      },
      {
        id: 1007,
        title: "Chill Study Lofi Beats — Instrumental Music for Concentration | K12",
        description: "Lofi Girl - Study beats for K12 students",
        url: "https://www.youtube.com/watch?v=7aPzNJ4lf5A",
        icon: <Music className="w-5 h-5" />,
        color: "#98D8C8",
        isYouTube: true
      },
      {
        id: 1008,
        title: "Work Lofi Lofi Deep Focus Study Work Concentration [chill lo-fi hip hop beats]",
        description: "Lofi Girl - Deep focus music for work and study",
        url: "https://www.youtube.com/watch?v=FkfEMReEl5g",
        icon: <Music className="w-5 h-5" />,
        color: "#F7DC6F",
        isYouTube: true
      },
      {
        id: 1009,
        title: "90's Chill Lofi ☕️ Study Music Lofi Rain Chillhop Beats",
        description: "Lofi Girl - 90s inspired chill lofi with rain sounds",
        url: "https://www.youtube.com/watch?v=sF80I-TQiW0",
        icon: <Music className="w-5 h-5" />,
        color: "#AED6F1",
        isYouTube: true
      },
      {
        id: 1010,
        title: "Morning Coffee ☕️ [lofi hip hop]",
        description: "Lofi Girl - Perfect morning coffee vibes with lofi beats",
        url: "https://www.youtube.com/watch?v=1fueZCTYkpA",
        icon: <Music className="w-5 h-5" />,
        color: "#F8C471",
        isYouTube: true
      },
      {
        id: 1011,
        title: "lofi hip hop radio - beats to relax/study to",
        description: "College Music - 24/7 lofi hip hop radio for studying",
        url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        icon: <Music className="w-5 h-5" />,
        color: "#82E0AA",
        isYouTube: true
      },
      {
        id: 1012,
        title: "lofi hip hop radio 24/7",
        description: "College Music - 24/7 lofi hip hop radio stream",
        url: "https://www.youtube.com/watch?v=DWcJFNfaw9c",
        icon: <Music className="w-5 h-5" />,
        color: "#D7BDE2",
        isYouTube: true
      },
      {
        id: 1013,
        title: "lofi hip hop radio - beats to relax/study to [LIVE 24/7]",
        description: "College Music - Live 24/7 lofi hip hop radio",
        url: "https://www.youtube.com/watch?v=kgx4WGK0oNU",
        icon: <Music className="w-5 h-5" />,
        color: "#85C1E9",
        isYouTube: true
      },
      {
        id: 1014,
        title: "lofi hip hop radio - beats to relax/study to [LIVE]",
        description: "College Music - Live lofi hip hop radio stream",
        url: "https://www.youtube.com/watch?v=5yx6BWlEVcY",
        icon: <Music className="w-5 h-5" />,
        color: "#A9CCE3",
        isYouTube: true
      },
      {
        id: 1015,
        title: "lofi hip hop radio - beats to relax/study to [LIVE 24/7]",
        description: "College Music - Another 24/7 lofi hip hop stream",
        url: "https://www.youtube.com/watch?v=7NOSDKb0HlU",
        icon: <Music className="w-5 h-5" />,
        color: "#F9E79F",
        isYouTube: true
      },
      {
        id: 1016,
        title: "lofi hip hop radio - beats to relax/study to",
        description: "Chillhop Music - 24/7 lofi hip hop radio",
        url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        icon: <Music className="w-5 h-5" />,
        color: "#ABEBC6",
        isYouTube: true
      },
      {
        id: 1017,
        title: "lofi hip hop radio 24/7",
        description: "Chillhop Music - 24/7 lofi hip hop radio stream",
        url: "https://www.youtube.com/watch?v=DWcJFNfaw9c",
        icon: <Music className="w-5 h-5" />,
        color: "#D5A6BD",
        isYouTube: true
      },
      {
        id: 1018,
        title: "lofi hip hop radio - beats to relax/study to [LIVE 24/7]",
        description: "Chillhop Music - Live 24/7 lofi hip hop radio",
        url: "https://www.youtube.com/watch?v=kgx4WGK0oNU",
        icon: <Music className="w-5 h-5" />,
        color: "#D1ECF1",
        isYouTube: true
      },
      {
        id: 1019,
        title: "lofi hip hop radio - beats to relax/study to [LIVE]",
        description: "Chillhop Music - Live lofi hip hop radio stream",
        url: "https://www.youtube.com/watch?v=5yx6BWlEVcY",
        icon: <Music className="w-5 h-5" />,
        color: "#E8DAEF",
        isYouTube: true
      },
      {
        id: 1020,
        title: "lofi hip hop radio - beats to relax/study to [LIVE 24/7]",
        description: "Chillhop Music - Another 24/7 lofi hip hop stream",
        url: "https://www.youtube.com/watch?v=7NOSDKb0HlU",
        icon: <Music className="w-5 h-5" />,
        color: "#D5F4E6",
        isYouTube: true
      },
      {
        id: 1021,
        title: "lofi hip hop radio - beats to relax/study to",
        description: "The Bootleg Boy - 24/7 lofi hip hop radio",
        url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        icon: <Music className="w-5 h-5" />,
        color: "#D6EAF8",
        isYouTube: true
      },
      {
        id: 1022,
        title: "lofi hip hop radio 24/7",
        description: "The Bootleg Boy - 24/7 lofi hip hop radio stream",
        url: "https://www.youtube.com/watch?v=DWcJFNfaw9c",
        icon: <Music className="w-5 h-5" />,
        color: "#FEF9E7",
        isYouTube: true
      },
      {
        id: 1023,
        title: "lofi hip hop radio - beats to relax/study to [LIVE 24/7]",
        description: "The Bootleg Boy - Live 24/7 lofi hip hop radio",
        url: "https://www.youtube.com/watch?v=kgx4WGK0oNU",
        icon: <Music className="w-5 h-5" />,
        color: "#FDEDEC",
        isYouTube: true
      },
      {
        id: 1024,
        title: "lofi hip hop radio - beats to relax/study to [LIVE]",
        description: "The Bootleg Boy - Live lofi hip hop radio stream",
        url: "https://www.youtube.com/watch?v=5yx6BWlEVcY",
        icon: <Music className="w-5 h-5" />,
        color: "#F8F9FA",
        isYouTube: true
      },
      {
        id: 1025,
        title: "lofi hip hop radio - beats to relax/study to [LIVE 24/7]",
        description: "The Bootleg Boy - Another 24/7 lofi hip hop stream",
        url: "https://www.youtube.com/watch?v=7NOSDKb0HlU",
        icon: <Music className="w-5 h-5" />,
        color: "#E9ECEF",
        isYouTube: true
      },
      {
        id: 1026,
        title: "lofi hip hop radio - beats to relax/study to",
        description: "Chillhop Essentials - 24/7 lofi hip hop radio",
        url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        icon: <Music className="w-5 h-5" />,
        color: "#DEE2E6",
        isYouTube: true
      },
      {
        id: 1027,
        title: "lofi hip hop radio 24/7",
        description: "Chillhop Essentials - 24/7 lofi hip hop radio stream",
        url: "https://www.youtube.com/watch?v=DWcJFNfaw9c",
        icon: <Music className="w-5 h-5" />,
        color: "#6C757D",
        isYouTube: true
      },
      {
        id: 1028,
        title: "lofi hip hop radio - beats to relax/study to [LIVE 24/7]",
        description: "Chillhop Essentials - Live 24/7 lofi hip hop radio",
        url: "https://www.youtube.com/watch?v=kgx4WGK0oNU",
        icon: <Music className="w-5 h-5" />,
        color: "#495057",
        isYouTube: true
      },
      {
        id: 1029,
        title: "lofi hip hop radio - beats to relax/study to [LIVE]",
        description: "Chillhop Essentials - Live lofi hip hop radio stream",
        url: "https://www.youtube.com/watch?v=5yx6BWlEVcY",
        icon: <Music className="w-5 h-5" />,
        color: "#343A40",
        isYouTube: true
      },
      {
        id: 1030,
        title: "Best of lofi hip hop 2022 - beats to relax/study to",
        description: "Lofi Girl - Best lofi tracks from 2022",
        url: "https://www.youtube.com/watch?v=i43tkaTXtwI",
        icon: <Music className="w-5 h-5" />,
        color: "#212529",
        isYouTube: true
      },
      {
        id: 1031,
        title: "lofi hip hop radio 24/7",
        description: "The Bootleg Boy - 24/7 lofi hip hop radio stream",
        url: "https://www.youtube.com/watch?v=DWcJFNfaw9c",
        icon: <Music className="w-5 h-5" />,
        color: "#FF6B6B",
        isYouTube: true
      },
      {
        id: 1032,
        title: "lofi hip hop radio - beats to relax/study to [LIVE 24/7]",
        description: "The Bootleg Boy - Live 24/7 lofi hip hop radio",
        url: "https://www.youtube.com/watch?v=kgx4WGK0oNU",
        icon: <Music className="w-5 h-5" />,
        color: "#4ECDC4",
        isYouTube: true
      },
      {
        id: 1033,
        title: "lofi hip hop radio - beats to relax/study to [LIVE]",
        description: "The Bootleg Boy - Live lofi hip hop radio stream",
        url: "https://www.youtube.com/watch?v=5yx6BWlEVcY",
        icon: <Music className="w-5 h-5" />,
        color: "#45B7D1",
        isYouTube: true
      },
      {
        id: 1034,
        title: "lofi hip hop radio - beats to relax/study to [LIVE 24/7]",
        description: "The Bootleg Boy - Another 24/7 lofi hip hop stream",
        url: "https://www.youtube.com/watch?v=7NOSDKb0HlU",
        icon: <Music className="w-5 h-5" />,
        color: "#96CEB4",
        isYouTube: true
      },
      {
        id: 1035,
        title: "lofi hip hop radio - beats to relax/study to",
        description: "Chillhop Essentials - 24/7 lofi hip hop radio",
        url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        icon: <Music className="w-5 h-5" />,
        color: "#FFEAA7",
        isYouTube: true
      },
      {
        id: 1036,
        title: "lofi hip hop radio 24/7",
        description: "Chillhop Essentials - 24/7 lofi hip hop radio stream",
        url: "https://www.youtube.com/watch?v=DWcJFNfaw9c",
        icon: <Music className="w-5 h-5" />,
        color: "#DDA0DD",
        isYouTube: true
      },
      {
        id: 1037,
        title: "lofi hip hop radio - beats to relax/study to [LIVE 24/7]",
        description: "Chillhop Essentials - Live 24/7 lofi hip hop radio",
        url: "https://www.youtube.com/watch?v=kgx4WGK0oNU",
        icon: <Music className="w-5 h-5" />,
        color: "#98D8C8",
        isYouTube: true
      },
      {
        id: 1038,
        title: "Best of lofi hip hop 2022 - beats to relax/study to",
        description: "Lofi Girl - Best lofi tracks from 2022",
        url: "https://www.youtube.com/watch?v=i43tkaTXtwI",
        icon: <Music className="w-5 h-5" />,
        color: "#F7DC6F",
        isYouTube: true
      },
      {
        id: 1039,
        title: "Best of lofi hip hop 2023 - beats to relax/study to",
        description: "Lofi Girl - Best lofi tracks from 2023",
        url: "https://www.youtube.com/watch?v=mmKguZohAck",
        icon: <Music className="w-5 h-5" />,
        color: "#AED6F1",
        isYouTube: true
      },
      {
        id: 1040,
        title: "Best of lofi 2024 beats to chill/study to",
        description: "Lofi Girl - Latest and best lofi beats for 2024",
        url: "https://www.youtube.com/watch?v=lA9FONoiuFA",
        icon: <Music className="w-5 h-5" />,
        color: "#F8C471",
        isYouTube: true
      },
      {
        id: 1041,
        title: "Chill Study Lofi Beats — Instrumental Music for Concentration | K12",
        description: "Lofi Girl - Study beats for K12 students",
        url: "https://www.youtube.com/watch?v=7aPzNJ4lf5A",
        icon: <Music className="w-5 h-5" />,
        color: "#82E0AA",
        isYouTube: true
      },
      {
        id: 1042,
        title: "90's Chill Lofi ☕️ Study Music Lofi Rain Chillhop Beats",
        description: "Lofi Girl - 90s inspired chill lofi with rain sounds",
        url: "https://www.youtube.com/watch?v=sF80I-TQiW0",
        icon: <Music className="w-5 h-5" />,
        color: "#D7BDE2",
        isYouTube: true
      },
      {
        id: 1043,
        title: "lofi hip hop mix beats to relax/study to (Part 1)",
        description: "Lofi Girl - Curated mix of lofi hip hop beats",
        url: "https://www.youtube.com/watch?v=CFGLoQIhmow",
        icon: <Music className="w-5 h-5" />,
        color: "#85C1E9",
        isYouTube: true
      },
      {
        id: 1044,
        title: "Work Lofi Lofi Deep Focus Study Work Concentration [chill lo-fi hip hop beats]",
        description: "Lofi Girl - Deep focus music for work and study",
        url: "https://www.youtube.com/watch?v=FkfEMReEl5g",
        icon: <Music className="w-5 h-5" />,
        color: "#A9CCE3",
        isYouTube: true
      },
      {
        id: 1045,
        title: "lofi hip hop radio - beats to study/relax to",
        description: "Lofi Girl - Alternative lofi radio stream",
        url: "https://www.youtube.com/watch?v=7NOSDKb0HlU",
        icon: <Music className="w-5 h-5" />,
        color: "#F9E79F",
        isYouTube: true
      },
      {
        id: 1046,
        title: "lofi hip hop radio - beats to relax/study to",
        description: "Lofi Girl - 24/7 lofi hip hop radio for studying",
        url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        icon: <Music className="w-5 h-5" />,
        color: "#ABEBC6",
        isYouTube: true
      },
      {
        id: 1047,
        title: "lofi hip hop radio - beats to sleep/chill to",
        description: "Lofi Girl - Relaxing lofi beats for sleep and chill",
        url: "https://www.youtube.com/watch?v=DWcJFNfaw9c",
        icon: <Music className="w-5 h-5" />,
        color: "#D5A6BD",
        isYouTube: true
      },
      {
        id: 1048,
        title: "study with me with lofi music | pomodoro (25 min study & 5 min rest)",
        description: "Lofi Girl - Pomodoro study session with lofi music",
        url: "https://www.youtube.com/watch?v=EbOTwmzpquE",
        icon: <Music className="w-5 h-5" />,
        color: "#F8D7DA",
        isYouTube: true
      },
      {
        id: 1049,
        title: "Best of lofi hip hop 2022 - beats to relax/study to",
        description: "Lofi Girl - Best lofi tracks from 2022",
        url: "https://www.youtube.com/watch?v=i43tkaTXtwI",
        icon: <Music className="w-5 h-5" />,
        color: "#D1ECF1",
        isYouTube: true
      },
      {
        id: 1050,
        title: "Best of lofi hip hop 2023 - beats to relax/study to",
        description: "Lofi Girl - Best lofi tracks from 2023",
        url: "https://www.youtube.com/watch?v=mmKguZohAck",
        icon: <Music className="w-5 h-5" />,
        color: "#FADBD8",
        isYouTube: true
      }
    ],
    "📚 Encyclopedias": [
      {
        id: 1051,
        title: "Wikipedia",
        description: "Free online encyclopedia with millions of articles in multiple languages",
        url: "https://www.wikipedia.org/",
        icon: <Globe className="w-5 h-5" />,
        color: "#000000",
        openInNewTab: true
      },
      {
        id: 1052,
        title: "Britannica",
        description: "Comprehensive encyclopedia with expert-written articles and educational content",
        url: "https://www.britannica.com/",
        icon: <BookOpen className="w-5 h-5" />,
        color: "#1E3A8A",
        openInNewTab: true
      },
      {
        id: 1053,
        title: "Encyclopedia.com",
        description: "Free online encyclopedia with over 200,000 articles from trusted sources",
        url: "https://www.encyclopedia.com/",
        icon: <Archive className="w-5 h-5" />,
        color: "#059669",
        openInNewTab: true
      },
      {
        id: 1054,
        title: "World Book Online",
        description: "Educational encyclopedia designed for students and researchers",
        url: "https://www.worldbookonline.com/",
        icon: <Globe className="w-5 h-5" />,
        color: "#DC2626",
        openInNewTab: true
      },
      {
        id: 1055,
        title: "Scholarpedia",
        description: "Peer-reviewed open-access encyclopedia written by scholars",
        url: "http://www.scholarpedia.org/",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "#7C3AED",
        openInNewTab: true
      },
      {
        id: 1056,
        title: "Stanford Encyclopedia of Philosophy",
        description: "Comprehensive reference work in philosophy maintained by Stanford University",
        url: "https://plato.stanford.edu/",
        icon: <Lightbulb className="w-5 h-5" />,
        color: "#B91C1C",
        openInNewTab: true
      },
      {
        id: 1057,
        title: "Internet Encyclopedia of Philosophy",
        description: "Peer-reviewed academic resource covering all areas of philosophy",
        url: "https://iep.utm.edu/",
        icon: <Lightbulb className="w-5 h-5" />,
        color: "#1D4ED8",
        openInNewTab: true
      },
      {
        id: 1058,
        title: "Citizendium",
        description: "Expert-guided encyclopedia with real-name contributors",
        url: "https://citizendium.org/",
        icon: <Users className="w-5 h-5" />,
        color: "#059669",
        openInNewTab: true
      },
      {
        id: 1059,
        title: "Infoplease",
        description: "Free online almanac, dictionary, encyclopedia, and homework help",
        url: "https://www.infoplease.com/",
        icon: <FileCheck className="w-5 h-5" />,
        color: "#EA580C",
        openInNewTab: true
      },
      {
        id: 1060,
        title: "Reference.com",
        description: "Quick answers and reference information on various topics",
        url: "https://www.reference.com/",
        icon: <Globe className="w-5 h-5" />,
        color: "#7C2D12",
        openInNewTab: true
      }
    ],
    "📖 Dictionaries & Thesaurus": [
      {
        id: 1061,
        title: "Merriam-Webster Dictionary",
        description: "America's most trusted online dictionary with definitions, pronunciations, and word games",
        url: "https://www.merriam-webster.com/",
        icon: <BookOpen className="w-5 h-5" />,
        color: "#DC2626",
        openInNewTab: true
      },
      {
        id: 1062,
        title: "Oxford English Dictionary",
        description: "The definitive record of the English language with historical word origins",
        url: "https://www.oed.com/",
        icon: <Archive className="w-5 h-5" />,
        color: "#1E40AF",
        openInNewTab: true
      },
      {
        id: 1063,
        title: "Cambridge Dictionary",
        description: "Free English dictionary with definitions, pronunciations, and translations",
        url: "https://dictionary.cambridge.org/",
        icon: <Globe className="w-5 h-5" />,
        color: "#059669",
        openInNewTab: true
      },
      {
        id: 1064,
        title: "Dictionary.com",
        description: "Free online dictionary with definitions, synonyms, and word origins",
        url: "https://www.dictionary.com/",
        icon: <BookOpen className="w-5 h-5" />,
        color: "#7C3AED",
        openInNewTab: true
      },
      {
        id: 1065,
        title: "Thesaurus.com",
        description: "Free online thesaurus with synonyms, antonyms, and related words",
        url: "https://www.thesaurus.com/",
        icon: <FileCheck className="w-5 h-5" />,
        color: "#EA580C",
        openInNewTab: true
      },
      {
        id: 1066,
        title: "WordNet",
        description: "Lexical database of English developed by Princeton University",
        url: "http://wordnetweb.princeton.edu/perl/webwn",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "#B91C1C",
        openInNewTab: true
      },
      {
        id: 1067,
        title: "Wiktionary",
        description: "Free multilingual dictionary and thesaurus with etymology and pronunciation",
        url: "https://en.wiktionary.org/",
        icon: <Globe className="w-5 h-5" />,
        color: "#000000",
        openInNewTab: true
      },
      {
        id: 1068,
        title: "OneLook Dictionary Search",
        description: "Search multiple dictionaries and find definitions across various sources",
        url: "https://www.onelook.com/",
        icon: <Globe className="w-5 h-5" />,
        color: "#1D4ED8",
        openInNewTab: true
      },
      {
        id: 1069,
        title: "Vocabulary.com",
        description: "Intelligent dictionary that helps you learn words with adaptive questions",
        url: "https://www.vocabulary.com/",
        icon: <Target className="w-5 h-5" />,
        color: "#059669",
        openInNewTab: true
      },
      {
        id: 1070,
        title: "Urban Dictionary",
        description: "Crowdsourced online dictionary for slang words and phrases",
        url: "https://www.urbandictionary.com/",
        icon: <Users className="w-5 h-5" />,
        color: "#7C2D12",
        openInNewTab: true
      },
      {
        id: 1071,
        title: "Wordnik",
        description: "Online dictionary with real-world examples and word relationships",
        url: "https://www.wordnik.com/",
        icon: <FileCheck className="w-5 h-5" />,
        color: "#9333EA",
        openInNewTab: true
      },
      {
        id: 1072,
        title: "Power Thesaurus",
        description: "Crowdsourced thesaurus with synonyms and antonyms voted by users",
        url: "https://www.powerthesaurus.org/",
        icon: <Users className="w-5 h-5" />,
        color: "#F59E0B",
        openInNewTab: true
      }
    ],
    "👥 Staff Resources": [
      {
        id: 1,
        title: "E-PaySlip Portal",
        description: "Access your electronic payslips and salary information securely",
        url: "https://www.gogpayslip.com/index.php?action=login",
        icon: <FileText className="w-5 h-5" />,
        color: "#1E40AF", // Deep Blue
        embedStrategy: 'iframe',
        customScripts: true,
        forceFullPage: true,
        hideHeader: true,
        hideFooter: true,
        sandbox: "allow-same-origin allow-scripts allow-popups allow-forms"
      },
      {
        id: 2,
        title: "Staff Handbook",
        description: "Comprehensive guide to school policies and procedures",
        url: "/staff-handbook",
        icon: <BookOpen className="w-5 h-5" />,
        color: "#7C3AED",
        isInternal: true
      },
    ]
  };

  // Flatten all resources for backward compatibility
  const resources: Resource[] = Object.values(resourceCategories).flat();

  // Convert resources to searchable items
  const searchableItems: SearchableItem[] = useMemo(() => {
    return resources.map(resource => ({
      ...resource,
      category: Object.keys(resourceCategories).find(categoryName =>
        resourceCategories[categoryName].some(r => r.id === resource.id)
      ) || 'Other',
      type: resource.isInternal ? 'internal' : 'website',
    }));
  }, [resources]);

  // Filter options for search
  const categoryOptions: FilterOption[] = useMemo(() => {
    return Object.keys(resourceCategories).map(categoryName => ({
      value: categoryName,
      label: categoryName,
      count: resourceCategories[categoryName].length
    }));
  }, []);

  const typeOptions: FilterOption[] = [
    { value: 'website', label: 'Websites', count: resources.filter(r => !r.isInternal).length },
    { value: 'internal', label: 'Internal Pages', count: resources.filter(r => r.isInternal).length }
  ];

  // Handle search results
  const handleSearchResults = useCallback((results: SearchableItem[]) => {
    setSearchResults(results);
  }, []);

  // Get filtered categories based on search results
  const filteredCategories = useMemo(() => {
    if (searchResults.length === 0) {
      return resourceCategories;
    }

    // Group search results by category
    const filtered: Record<string, Resource[]> = {};

    searchResults.forEach(item => {
      const categoryName = item.category;
      if (!filtered[categoryName]) {
        filtered[categoryName] = [];
      }

      // Find the original resource
      const originalResource = resources.find(r => r.id === item.id);
      if (originalResource) {
        filtered[categoryName].push(originalResource);
      }
    });

    return filtered;
  }, [searchResults, resources]);

  // Smart loading simulation effect
  useEffect(() => {
    if (isLoading && selectedResource?.embedStrategy === 'smart') {
      setSmartLoadingPhase('connecting');
      setLoadingProgress(0);

      // Simulate realistic loading phases
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

          // Animate progress
          let progress = loadingProgress;
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
                  // Show alternatives after loading simulation
                  setIframeError(true);
                  setShowAlternatives(true);
                  setIsLoading(false);
                }
              }, currentPhase.duration);
            }
          }, 50);
        }
      };

      runPhase();
    }
  }, [isLoading, selectedResource]);

  const handleResourceClick = (resource: Resource) => {
    // Handle USSD cards with special modal
    if (resource.isUSSD) {
      setSelectedResource(resource);
      return;
    }

    // Handle YouTube videos - open in dedicated full-screen page within the website
    if (resource.isYouTube) {
      // Save current scroll position before opening video
      savePageState();
      setSelectedYouTubeVideo(resource);
      setShowHeader(false);
      setShowShimmer(true);
      setVideoLoaded(false);

      // Simulate loading time for shimmer effect
      setTimeout(() => {
        setShowShimmer(false);
        setVideoLoaded(true);
      }, 2000); // 2 second shimmer loading
      return;
    }

    // Handle resources that should open in new tab
    if (resource.openInNewTab) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (resource.isInternal) {
      navigate(resource.url);
    } else {
      // Handle all embedded resources (iframe, smart, or regular website embedding)
      setIsLoading(true);
      setIframeError(false);
      setCurrentUrlIndex(0);
      setShowAlternatives(false);
      // Save current scroll position before opening resource
      savePageState();
      setSelectedResource(resource);
      setShowHeader(false);
    }
  };

  // Helper function to extract YouTube video ID from URL
  const extractYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Helper function to get YouTube thumbnail URL
  const getYouTubeThumbnail = (url: string): string => {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return '/api/placeholder/400/225'; // Fallback placeholder
  };

  const handleBack = () => {
    // Use enhanced navigation to restore exact scroll position
    handleInternalStateChange(() => {
      setSelectedResource(null);
      setIsLoading(false);
      setIframeError(false);
      setCurrentUrlIndex(0);
      setShowAlternatives(false);
      setLoadingProgress(0);
      setSmartLoadingPhase('connecting');
      setShowHeader(true);
    });
  };

  const handleBackFromYouTube = () => {
    // Use enhanced navigation to restore exact scroll position
    handleInternalStateChange(() => {
      setSelectedYouTubeVideo(null);
      setShowHeader(true);
      setShowShimmer(true);
      setVideoLoaded(false);
    });
  };

  const handleUSSDDial = () => {
    const ussdCode = '*790*700#';

    // Try multiple methods to open the phone app with the USSD code
    try {
      // Method 1: tel: protocol with USSD code (works on most mobile browsers)
      window.location.href = `tel:${encodeURIComponent(ussdCode)}`;
    } catch (error) {
      try {
        // Method 2: Direct tel link
        window.open(`tel:${ussdCode}`, '_self');
      } catch (error2) {
        try {
          // Method 3: Create a temporary link and click it
          const link = document.createElement('a');
          link.href = `tel:${ussdCode}`;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error3) {
          // Fallback: Show alert with instructions
          alert(`Please dial ${ussdCode} on your phone to access BECE past questions.`);
        }
      }
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setIframeError(false);
    setSmartLoadingPhase('success');

    // Inject custom scripts for BECE Past Questions to remove ads and unwanted sections
    if (selectedResource?.customScripts && iframeRef.current) {
      try {
        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

        if (iframeDoc) {
          // Create and inject custom CSS to hide unwanted elements
          const style = iframeDoc.createElement('style');
          style.textContent = `
            /* NUCLEAR FOOTER REMOVAL - Based on actual website structure */
            footer, .footer, #footer, [class*="footer"], [id*="footer"],
            [class*="Footer"], [id*="Footer"], .site-footer, #site-footer,
            .page-footer, #page-footer, .main-footer, #main-footer,
            .website-footer, #website-footer, .bottom-footer, #bottom-footer,
            .footer-section, .footer-content, .footer-wrapper, .footer-container,
            .footer-area, .footer-widget, .footer-info, .footer-links,
            .copyright, .copyright-text, .copyright-info, .copyright-notice,
            [class*="copyright"], [id*="copyright"], .site-info, .site-credits,
            /* Specific to becepastquestions.com */
            .site-footer-wrapper, .footer-widgets, .footer-bottom,
            .footer-copyright, .site-info-wrapper {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              height: 0 !important;
              width: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              position: absolute !important;
              left: -9999px !important;
              top: -9999px !important;
              z-index: -9999 !important;
              overflow: hidden !important;
            }

            /* NUCLEAR AD BLOCKING - Based on actual website analysis */
            .ad, .ads, .advertisement, .advert, .adsense, .google-ads,
            [class*="ad-"], [class*="ads-"], [class*="advert"], [class*="banner"],
            [id*="ad-"], [id*="ads-"], [id*="advert"], [id*="banner"],
            .sidebar-ads, .header-ads, .content-ads, .popup-ad, .inline-ad,
            .sponsored, .promotion, .promo, [class*="sponsor"], [class*="promo"],
            iframe[src*="googlesyndication"], iframe[src*="doubleclick"],
            iframe[src*="googleadservices"], iframe[src*="amazon-adsystem"],
            iframe[src*="adsystem"], .google-auto-placed, .adsbygoogle,
            ins.adsbygoogle, .adsbox, .ad-container, .ad-wrapper, .ad-space,
            .advertisement-container, .ads-container, .banner-container,
            /* Specific ad patterns found on becepastquestions.com */
            div[style*="height: required"], .sticky-sidebar, .advertisment,
            .advertisement-section, [class*="advertisment"], [id*="advertisment"],
            /* Facebook tracking pixel */
            img[src*="facebook.com/tr"], noscript img[src*="facebook.com"],
            /* Generic ad tracking */
            [src*="googletagmanager"], [src*="google-analytics"],
            script[src*="ads"], script[src*="adsystem"],
            /* Ad click tracking */
            [onclick*="Ad Clicks"], [onclick*="Ad Views"],
            /* Newsletter and subscription boxes */
            .newsletter-signup, .email-subscription, .subscribe-box {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              height: 0 !important;
              width: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              position: absolute !important;
              left: -9999px !important;
              top: -9999px !important;
              z-index: -9999 !important;
              overflow: hidden !important;
            }

            /* NUCLEAR DISTRACTION REMOVAL - Based on website analysis */
            .recent, .popular, .trending, .related, .suggestions, .recommended,
            [class*="recent"], [class*="popular"], [class*="trending"],
            [class*="related"], [class*="suggest"], [class*="recommend"],
            .sidebar-recent, .sidebar-popular, .widget-recent, .widget-popular,
            .recent-posts, .popular-posts, .related-posts, .more-posts,
            .you-may-like, .similar-content, .other-articles,
            /* Specific to becepastquestions.com sidebar */
            .sidebar, .widget-area, .secondary, aside,
            h3:contains("Recent popular post"), h3:contains("ADVERTISMENT"),
            h3:contains("Social Media"), h3:contains("Quick Links"),
            h3:contains("Newsletter"), h3:contains("Recent Posts"),
            /* Remove entire sidebar sections */
            .sidebar-wrapper, .widget-wrapper, .sidebar-content {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              height: 0 !important;
              width: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              position: absolute !important;
              left: -9999px !important;
              top: -9999px !important;
              z-index: -9999 !important;
            }

            /* BRUTE FORCE SOCIAL MEDIA REMOVAL */
            .social-share, .share-buttons, .social-media, .social-icons,
            [class*="social"], [class*="share"], .fb-like, .twitter-share,
            .addthis, .sharethis, .social-widget, .share-widget,
            .facebook-share, .twitter-share, .linkedin-share, .whatsapp-share,
            .social-follow, .follow-us, .social-links {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
            }

            /* BRUTE FORCE NEWSLETTER/SIGNUP REMOVAL */
            .newsletter, .subscribe, .subscription, .email-signup, .signup-form,
            [class*="newsletter"], [class*="subscribe"], [class*="signup"],
            .email-capture, .lead-magnet, .opt-in, .mailing-list {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
            }

            /* BRUTE FORCE POPUP/MODAL REMOVAL */
            .modal, .popup, .overlay, [class*="modal"], [class*="popup"],
            .lightbox, .dialog, .alert, .notification, .toast,
            .cookie-notice, .cookie-banner, .gdpr-notice, .privacy-notice,
            [class*="cookie"], [class*="gdpr"], [class*="privacy"],
            .consent-banner, .privacy-banner, .terms-notice {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              position: absolute !important;
              left: -9999px !important;
              top: -9999px !important;
              z-index: -9999 !important;
            }

            /* BRUTE FORCE SIDEBAR REMOVAL */
            .sidebar, .side-bar, #sidebar, #side-bar, .widget-area,
            .secondary, .aside, aside, .complementary,
            [class*="sidebar"], [id*="sidebar"] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
            }

            /* BRUTE FORCE NAVIGATION CLEANUP */
            .breadcrumb, .breadcrumbs, .nav-breadcrumb, .page-breadcrumb,
            .pagination, .page-numbers, .nav-links, .post-navigation {
              display: none !important;
            }

            /* CLEAN LAYOUT ENFORCEMENT */
            body {
              margin: 0 !important;
              padding: 10px !important;
              background: #ffffff !important;
              overflow-x: hidden !important;
            }

            /* MAIN CONTENT OPTIMIZATION */
            .main, .content, .container, .wrapper, main, article,
            .post-content, .entry-content, .page-content, .single-content {
              max-width: 100% !important;
              margin: 0 auto !important;
              padding: 15px !important;
              width: 100% !important;
              box-sizing: border-box !important;
            }

            /* FORCE HIDE ANY REMAINING BOTTOM ELEMENTS */
            body > *:last-child:not(.main):not(.content):not(.container):not(.wrapper):not(main):not(article) {
              display: none !important;
            }

            /* NUCLEAR OPTION - Hide elements at bottom of page */
            [style*="position: fixed"][style*="bottom"],
            [style*="position: absolute"][style*="bottom"] {
              display: none !important;
            }
          `;

          iframeDoc.head.appendChild(style);

          // Also inject JavaScript to continuously remove ads that might load dynamically
          const script = iframeDoc.createElement('script');
          script.textContent = `
            (function() {
              // NUCLEAR ELEMENT REMOVAL FUNCTION - Enhanced for becepastquestions.com
              function removeUnwantedElements() {
                const selectors = [
                  // FOOTER NUCLEAR REMOVAL
                  'footer', '.footer', '#footer', '[class*="footer"]', '[id*="footer"]',
                  '[class*="Footer"]', '[id*="Footer"]', '.site-footer', '#site-footer',
                  '.page-footer', '#page-footer', '.main-footer', '#main-footer',
                  '.website-footer', '#website-footer', '.bottom-footer', '#bottom-footer',
                  '.footer-section', '.footer-content', '.footer-wrapper', '.footer-container',
                  '.footer-area', '.footer-widget', '.footer-info', '.footer-links',
                  '.copyright', '.copyright-text', '.copyright-info', '.copyright-notice',
                  '[class*="copyright"]', '[id*="copyright"]', '.site-info', '.site-credits',
                  '.site-footer-wrapper', '.footer-widgets', '.footer-bottom', '.footer-copyright',

                  // AD BRUTE FORCE
                  '.ad', '.ads', '.advertisement', '.advert', '.adsense', '.google-ads',
                  '[class*="ad-"]', '[class*="ads-"]', '[class*="advert"]', '[class*="banner"]',
                  '[id*="ad-"]', '[id*="ads-"]', '[id*="advert"]', '[id*="banner"]',
                  '.sidebar-ads', '.header-ads', '.content-ads', '.popup-ad', '.inline-ad',
                  '.sponsored', '.promotion', '.promo', '[class*="sponsor"]', '[class*="promo"]',
                  'iframe[src*="googlesyndication"]', 'iframe[src*="doubleclick"]',
                  'iframe[src*="googleadservices"]', 'iframe[src*="amazon-adsystem"]',
                  'iframe[src*="adsystem"]', '.google-auto-placed', '.adsbygoogle',
                  'ins.adsbygoogle', '.adsbox', '.ad-container', '.ad-wrapper', '.ad-space',
                  '.advertisement-container', '.ads-container', '.banner-container',

                  // DISTRACTION NUCLEAR REMOVAL
                  '.recent', '.popular', '.trending', '.related', '.suggestions', '.recommended',
                  '[class*="recent"]', '[class*="popular"]', '[class*="trending"]',
                  '[class*="related"]', '[class*="suggest"]', '[class*="recommend"]',
                  '.sidebar-recent', '.sidebar-popular', '.widget-recent', '.widget-popular',
                  '.recent-posts', '.popular-posts', '.related-posts', '.more-posts',
                  '.you-may-like', '.similar-content', '.other-articles',
                  // Specific sidebar elements from becepastquestions.com
                  '.sidebar', '.widget-area', '.secondary', 'aside',
                  '.sidebar-wrapper', '.widget-wrapper', '.sidebar-content',

                  // SOCIAL MEDIA BRUTE FORCE
                  '.social-share', '.share-buttons', '.social-media', '.social-icons',
                  '[class*="social"]', '[class*="share"]', '.fb-like', '.twitter-share',
                  '.addthis', '.sharethis', '.social-widget', '.share-widget',
                  '.facebook-share', '.twitter-share', '.linkedin-share', '.whatsapp-share',
                  '.social-follow', '.follow-us', '.social-links',

                  // NEWSLETTER BRUTE FORCE
                  '.newsletter', '.subscribe', '.subscription', '.email-signup', '.signup-form',
                  '[class*="newsletter"]', '[class*="subscribe"]', '[class*="signup"]',
                  '.email-capture', '.lead-magnet', '.opt-in', '.mailing-list',

                  // POPUP BRUTE FORCE
                  '.modal', '.popup', '.overlay', '[class*="modal"]', '[class*="popup"]',
                  '.lightbox', '.dialog', '.alert', '.notification', '.toast',
                  '.cookie-notice', '.cookie-banner', '.gdpr-notice', '.privacy-notice',
                  '[class*="cookie"]', '[class*="gdpr"]', '[class*="privacy"]',
                  '.consent-banner', '.privacy-banner', '.terms-notice',

                  // SIDEBAR BRUTE FORCE
                  '.sidebar', '.side-bar', '#sidebar', '#side-bar', '.widget-area',
                  '.secondary', '.aside', 'aside', '.complementary',
                  '[class*="sidebar"]', '[id*="sidebar"]',

                  // NAVIGATION BRUTE FORCE
                  '.breadcrumb', '.breadcrumbs', '.nav-breadcrumb', '.page-breadcrumb',
                  '.pagination', '.page-numbers', '.nav-links', '.post-navigation'
                ];

                // NUCLEAR REMOVAL - Multiple aggressive methods
                selectors.forEach(selector => {
                  try {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(el => {
                      if (el) {
                        // Method 1: Hide completely
                        el.style.display = 'none';
                        el.style.visibility = 'hidden';
                        el.style.opacity = '0';
                        el.style.height = '0';
                        el.style.width = '0';
                        el.style.margin = '0';
                        el.style.padding = '0';
                        el.style.overflow = 'hidden';

                        // Method 2: Move off-screen
                        el.style.position = 'absolute';
                        el.style.left = '-9999px';
                        el.style.top = '-9999px';
                        el.style.zIndex = '-9999';

                        // Method 3: Disable interactions
                        el.style.pointerEvents = 'none';
                        el.style.userSelect = 'none';
                        el.setAttribute('aria-hidden', 'true');

                        // Method 4: Remove from DOM
                        try {
                          el.parentNode && el.parentNode.removeChild(el);
                        } catch (e) {
                          el.remove();
                        }
                      }
                    });
                  } catch (e) {
                    // Ignore errors for invalid selectors
                  }
                });

                // ADDITIONAL AGGRESSIVE TECHNIQUES
                // Remove elements by text content
                const textPatterns = [
                  'ADVERTISMENT', 'Recent popular post', 'Social Media',
                  'Quick Links', 'Newsletter', 'Recent Posts', 'Ad Clicks',
                  'Ad Views', 'Copyright at 2025', 'All Rights Reserved'
                ];

                textPatterns.forEach(pattern => {
                  try {
                    const xpath = \`//\*[contains(text(), '\${pattern}')]\`;
                    const result = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    for (let i = 0; i < result.snapshotLength; i++) {
                      const element = result.snapshotItem(i);
                      if (element && element.parentNode) {
                        // Remove the parent container too
                        const parent = element.closest('div, section, aside, footer, header');
                        if (parent) {
                          parent.remove();
                        } else {
                          element.remove();
                        }
                      }
                    }
                  } catch (e) {
                    // Ignore XPath errors
                  }
                });

                // Remove tracking scripts
                const scripts = document.querySelectorAll('script');
                scripts.forEach(script => {
                  const src = script.src || '';
                  const content = script.textContent || '';
                  if (src.includes('facebook.com') ||
                      src.includes('google-analytics') ||
                      src.includes('googletagmanager') ||
                      content.includes('Ad Clicks') ||
                      content.includes('Ad Views')) {
                    script.remove();
                  }
                });

                // NUCLEAR OPTION: Remove last child if it looks like footer
                try {
                  const lastChild = document.body.lastElementChild;
                  if (lastChild && (
                    lastChild.tagName.toLowerCase() === 'footer' ||
                    lastChild.className.toLowerCase().includes('footer') ||
                    lastChild.id.toLowerCase().includes('footer') ||
                    lastChild.className.toLowerCase().includes('copyright') ||
                    lastChild.textContent.toLowerCase().includes('copyright') ||
                    lastChild.textContent.toLowerCase().includes('all rights reserved')
                  )) {
                    lastChild.remove();
                  }
                } catch (e) {
                  // Ignore errors
                }

                // BRUTE FORCE: Remove elements with footer-like text content
                try {
                  const allElements = document.querySelectorAll('*');
                  allElements.forEach(el => {
                    const text = el.textContent.toLowerCase();
                    if (text.includes('copyright') ||
                        text.includes('all rights reserved') ||
                        text.includes('terms of service') ||
                        text.includes('privacy policy') ||
                        (text.includes('©') && text.length < 200)) {
                      el.style.display = 'none';
                      el.remove();
                    }
                  });
                } catch (e) {
                  // Ignore errors
                }
              }

              // AGGRESSIVE CLEANUP SCHEDULE
              // Remove elements immediately
              removeUnwantedElements();

              // Remove elements after DOM is loaded
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', removeUnwantedElements);
              }

              // Remove after window load
              window.addEventListener('load', removeUnwantedElements);

              // Continuously monitor for new ads/unwanted content
              const observer = new MutationObserver(function(mutations) {
                let shouldClean = false;
                mutations.forEach(function(mutation) {
                  if (mutation.addedNodes.length > 0) {
                    shouldClean = true;
                  }
                });
                if (shouldClean) {
                  setTimeout(removeUnwantedElements, 50);
                }
              });

              observer.observe(document.body, {
                childList: true,
                subtree: true
              });

              // NUCLEAR INTERVALS - Extremely aggressive cleanup
              setInterval(removeUnwantedElements, 500);   // Every 0.5 seconds
              setInterval(removeUnwantedElements, 2000);  // Every 2 seconds
              setInterval(removeUnwantedElements, 5000);  // Every 5 seconds
              setInterval(removeUnwantedElements, 10000); // Every 10 seconds

              // EVENT-BASED CLEANUP
              window.addEventListener('scroll', function() {
                setTimeout(removeUnwantedElements, 50);
              });

              window.addEventListener('resize', function() {
                setTimeout(removeUnwantedElements, 100);
              });

              window.addEventListener('focus', function() {
                setTimeout(removeUnwantedElements, 100);
              });

              // ADDITIONAL NUCLEAR TECHNIQUES
              // Block new script injections
              const originalAppendChild = Node.prototype.appendChild;
              Node.prototype.appendChild = function(child) {
                if (child.tagName === 'SCRIPT') {
                  const src = child.src || '';
                  const content = child.textContent || '';
                  if (src.includes('ads') ||
                      src.includes('facebook.com') ||
                      src.includes('google-analytics') ||
                      content.includes('Ad Clicks') ||
                      content.includes('Ad Views')) {
                    return child; // Block the script
                  }
                }
                return originalAppendChild.call(this, child);
              };

              // Block new iframe injections for ads
              const originalCreateElement = document.createElement;
              document.createElement = function(tagName) {
                const element = originalCreateElement.call(this, tagName);
                if (tagName.toLowerCase() === 'iframe') {
                  const originalSetAttribute = element.setAttribute;
                  element.setAttribute = function(name, value) {
                    if (name === 'src' && (
                        value.includes('googlesyndication') ||
                        value.includes('doubleclick') ||
                        value.includes('adsystem'))) {
                      return; // Block ad iframes
                    }
                    return originalSetAttribute.call(this, name, value);
                  };
                }
                return element;
              };
            })();
          `;

          iframeDoc.body.appendChild(script);

          console.log('Custom scripts injected for BECE Past Questions - ads and unwanted sections blocked');
        }
      } catch (error) {
        console.log('Could not inject custom scripts (cross-origin restriction):', error);
        // This is expected for cross-origin iframes, but we still try
      }
    }
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setIframeError(true);
    setSmartLoadingPhase('error');

    // If the resource has alternative URLs, show them
    if (selectedResource?.alternativeUrls && selectedResource.alternativeUrls.length > 0) {
      setShowAlternatives(true);
    }
  };

  const handleTryAlternative = (url: string) => {
    if (iframeRef.current) {
      setIsLoading(true);
      setIframeError(false);
      setShowAlternatives(false);
      iframeRef.current.src = url;
    }
  };

  const handleOpenOriginal = () => {
    if (selectedResource) {
      window.open(selectedResource.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Add this before the return statement
  const preloadResources = useCallback(() => {
    // Preload all iframe resources
    Object.values(resourceCategories).flat().forEach(resource => {
      if (resource.embedStrategy === 'iframe') {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'document';
        preloadLink.href = resource.url;
        document.head.appendChild(preloadLink);
      }
    });
  }, [resourceCategories]);

  // Add preloading on component mount
  useEffect(() => {
    preloadResources();
  }, [preloadResources]);

  // Optimize iframe rendering
  const renderIframe = (resource: Resource) => (
    selectedResource ? (
      <iframe
        ref={iframeRef}
        src={resource.url}
        className="w-full h-full border-0"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation"
        referrerPolicy="no-referrer"
        loading="eager"
        title={selectedResource.title}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          outline: 'none'
        }}
      />
    ) : null
  );

  // Define renderLoadingState and renderYouTubeVideo as empty functions for now to fix linter errors
  const renderLoadingState = () => null;
  const renderYouTubeVideo = () => null;

  // If a YouTube video is selected, show the full-screen video view
  if (selectedYouTubeVideo) {
    const videoId = extractYouTubeVideoId(selectedYouTubeVideo.url);
    const embedUrl = videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&fs=1&modestbranding=1&rel=0&showinfo=0&controls=1`
      : selectedYouTubeVideo.url;

    return (
      <div className="min-h-screen bg-black">
        {/* Header with Back Button */}
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-3 sm:py-4 pt-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBackFromYouTube}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-700/50 hover:bg-red-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-red-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                  {selectedYouTubeVideo.title}
                </h1>
                <p className="text-sm text-red-200 truncate">
                  {selectedYouTubeVideo.description}
                </p>
              </div>

              {/* YouTube Logo */}
              <div className="flex items-center gap-2 text-red-200">
                <Play className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">YouTube</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Screen Video Container */}
        <div className="h-[calc(100vh-80px)] bg-black flex items-center justify-center relative">
          {/* Shimmer Loading Effect */}
          {showShimmer && (
            <div className="absolute inset-0 z-10">
              <ShimmerLoader
                variant="silver"
                className="w-full h-full"
                width="w-full"
                height="h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center text-white">
                  <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-lg font-medium">Loading Video...</p>
                  <p className="text-sm text-gray-300 mt-2">Preparing your lofi experience</p>
                </div>
              </div>
            </div>
          )}

          {/* Video Player */}
          <div className={`w-full h-full max-w-none transition-opacity duration-500 ${showShimmer ? 'opacity-0' : 'opacity-100'}`}>
            <iframe
              src={embedUrl}
              title={selectedYouTubeVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => {
                setShowShimmer(false);
                setVideoLoaded(true);
              }}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                outline: 'none'
              }}
            />
          </div>
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
              <ShimmerLoader variant="silver" width="w-48" height="h-8" className="rounded-lg" />
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

            {/* Categories Shimmer */}
            <div className="space-y-8">
              {[1, 2, 3].map((category) => (
                <div key={category} className="space-y-4">
                  {/* Category Header Shimmer */}
                  <div className="flex items-center gap-3">
                    <ShimmerLoader variant="silver" width="w-48" height="h-8" className="rounded-lg" />
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                    <ShimmerLoader variant="silver" width="w-16" height="h-6" className="rounded-full" />
                  </div>

                  {/* Category Resources Grid Shimmer */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                      <ShimmerLoader
                        key={item}
                        variant="silver"
                        width="w-full"
                        height="h-[200px]"
                        className="rounded-2xl"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const studyLofiVideos = [
    {
      id: 'lofi-1',
      title: 'Lofi Hip Hop Radio - beats to relax/study to',
      description: 'A 24/7 lofi hip hop radio stream perfect for studying and relaxing',
      url: 'https://www.youtube.com/embed/jfKfPfyJRdk'
    },
    {
      id: 'lofi-2',
      title: 'ChilledCow - Lofi Hip Hop Radio',
      description: 'Another great lofi hip hop stream for focus and relaxation',
      url: 'https://www.youtube.com/embed/rUxyA5a0mRw'
    },
    {
      id: 'lofi-3',
      title: 'Lofi Girl - Lofi Hip Hop Radio',
      description: 'The iconic lofi girl stream with relaxing beats',
      url: 'https://www.youtube.com/embed/n61ULEU7CO0'
    }
  ];

  // Add this section before the return statement
  const renderStudyLofiSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-silver-200">Study Lofi Videos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {studyLofiVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group"
          >
            <div
              className="w-full h-[200px] bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:bg-gray-700/60 active:scale-[0.98] text-left relative overflow-hidden group flex flex-col cursor-pointer"
              onClick={() => setOpenLofiId(openLofiId === video.id ? null : video.id)}
            >
              {/* Background Gradient */}
              <div
                className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, #8b5cf620 0%, transparent 50%)` // purple glow for lofi
                }}
              />
              {/* Status Indicator */}
              <div className="absolute top-3 right-3 flex gap-1 z-10">
                <div className="px-2 py-1 rounded-full text-xs font-bold text-white bg-purple-500/80">
                  Lofi
                </div>
              </div>
              {/* Thumbnail or Iframe */}
              <div className="relative mb-3 flex-shrink-0 w-full flex items-center justify-center" style={{height: '48px'}}>
                {openLofiId === video.id ? (
                  <iframe
                    src={video.url}
                    className="w-full aspect-video rounded-xl border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                    style={{ minHeight: 120, background: '#000' }}
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden bg-black"
                    style={{ backgroundColor: '#8b5cf6' }}
                  >
                    <img
                      src={getYouTubeThumbnail(video.url)}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={e => { e.currentTarget.src = '/api/placeholder/400/225'; }}
                    />
                  </div>
                )}
                {/* Resource Type Indicator */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
                  <ExternalLink className="w-2.5 h-2.5 text-purple-400" />
                </div>
              </div>
              {/* Content */}
              <div className="flex-1 flex flex-col space-y-2">
                {/* Title */}
                <h3 className="text-sm font-bold text-white leading-tight group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                  {video.title}
                </h3>
                {/* Category */}
                <p className="text-xs text-purple-400 font-medium line-clamp-1">
                  Lofi Video
                </p>
                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1">
                  {video.description}
                </p>
                {/* Action Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-700/30 mt-auto">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-purple-400 font-medium">
                      YouTube
                    </span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                    <ExternalLink size={10} className="text-purple-400 group-hover:text-purple-300" />
                  </div>
                </div>
              </div>
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // SEO structured data for Students Hub
  const studentsHubStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Students Hub - Digital Learning Resources",
    "description": "Comprehensive digital learning platform with educational resources, STEM tools, study materials, and interactive content for junior high school students.",
    "url": "https://stlouisdemojhs.com/students-hub",
    "isPartOf": {
      "@type": "WebSite",
      "name": "St. Louis Demonstration JHS",
      "url": "https://stlouisdemojhs.com"
    },
    "about": {
      "@type": "EducationalOrganization",
      "name": "St. Louis Demonstration Junior High School"
    },
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    }
  };

  // Main render function
  const renderMainContent = () => (
    <>
      <SEOHead
        title="Students Hub - Digital Learning Resources | St. Louis Demonstration JHS"
        description="Access comprehensive digital learning resources, STEM tools, study materials, educational videos, and interactive content designed for junior high school students at St. Louis Demonstration JHS."
        keywords="students hub, digital learning, educational resources, STEM tools, study materials, JHS resources, online learning, educational technology, student portal, learning platform"
        url="/students-hub"
        type="website"
        structuredData={studentsHubStructuredData}
      />
      <div className="min-h-screen bg-gradient-to-b from-silver-900 to-silver-800">
      {/* Main Students Hub Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {/* Introduction */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-silver-100 mb-3 drop-shadow-lg">
              Students Hub
            </h1>
            <p className="text-lg sm:text-xl text-silver-300 max-w-2xl mx-auto mb-4">
              Explore a world of learning, creativity, and opportunity. Search or browse curated resources for every subject, skill, and dream!
            </p>
          </div>

          {/* Smart Search Bar */}
          <div className="mb-8">
            <SmartSearchBar
              items={searchableItems}
              onSearchResults={handleSearchResults}
              placeholder={`Search ${resources.length}+ educational resources...`}
              accentColor="purple"
              categories={categoryOptions}
              types={typeOptions}
              enableIntentDetection={true}
              className="mb-6"
            />
            {/* SHS Database/Guide and Results & Placement Checker Buttons */}
            <div className="flex flex-row gap-3 justify-center items-center w-full mt-2">
              <Link
                to="/shs-database"
                className="flex-1 min-w-0 px-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 shadow-md hover:shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2 relative overflow-hidden group"
                style={{ filter: 'drop-shadow(0 0 6px #22c55e)' }}
              >
                <FileText className="w-4 h-4 mr-1" />
                SHS Database/Guide
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </Link>
              <Link
                to="/results-placement"
                className="flex-1 min-w-0 px-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 shadow-md hover:shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2 relative overflow-hidden group"
                style={{ filter: 'drop-shadow(0 0 6px #eab308)' }}
              >
                <FileCheck className="w-4 h-4 mr-1" />
                Results & Placement Checker
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </Link>
            </div>
          </div>

          {/* Resource Categories */}
          <div className="space-y-8">
            {Object.entries(filteredCategories).map(([category, resources]) => (
              <section key={category} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className={`text-xl sm:text-2xl font-bold flex items-center gap-2 ${
                    category === '📚 Academic Resources' ? 'text-blue-300' :
                    category === '🧮 STEM Tools' ? 'text-green-300' :
                    category === '💰 Scholarship Opportunities' ? 'text-yellow-300' :
                    category === '🎵 Study Lofi' ? 'text-purple-300' :
                    category === '🎮 AI Comic Factory' ? 'text-pink-300' :
                    category === '🎨 Generative World' ? 'text-cyan-300' :
                    category === '🔧 Automation Tools' ? 'text-orange-300' :
                    category === '👥 Boys Club' ? 'text-indigo-300' :
                    category === '👥 Girls Club' ? 'text-rose-300' :
                    category === '📊 Data & Analytics' ? 'text-teal-300' :
                    category === '🌍 Global Resources' ? 'text-emerald-300' :
                    'text-silver-200'
                  }`}>
                    {category}
                  </h2>
                  <div className={`flex-1 h-px bg-gradient-to-r to-transparent ${
                    category === '📚 Academic Resources' ? 'from-blue-500/50' :
                    category === '🧮 STEM Tools' ? 'from-green-500/50' :
                    category === '💰 Scholarship Opportunities' ? 'from-yellow-500/50' :
                    category === '🎵 Study Lofi' ? 'from-purple-500/50' :
                    category === '🎮 AI Comic Factory' ? 'from-pink-500/50' :
                    category === '🎨 Generative World' ? 'from-cyan-500/50' :
                    category === '🔧 Automation Tools' ? 'from-orange-500/50' :
                    category === '👥 Boys Club' ? 'from-indigo-500/50' :
                    category === '👥 Girls Club' ? 'from-rose-500/50' :
                    category === '📊 Data & Analytics' ? 'from-teal-500/50' :
                    category === '🌍 Global Resources' ? 'from-emerald-500/50' :
                    'from-purple-500/50'
                  }`}></div>
                  <span className={`text-xs font-semibold ${
                    category === '📚 Academic Resources' ? 'text-blue-400' :
                    category === '🧮 STEM Tools' ? 'text-green-400' :
                    category === '💰 Scholarship Opportunities' ? 'text-yellow-400' :
                    category === '🎵 Study Lofi' ? 'text-purple-400' :
                    category === '🎮 AI Comic Factory' ? 'text-pink-400' :
                    category === '🎨 Generative World' ? 'text-cyan-400' :
                    category === '🔧 Automation Tools' ? 'text-orange-400' :
                    category === '👥 Boys Club' ? 'text-indigo-400' :
                    category === '👥 Girls Club' ? 'text-rose-400' :
                    category === '📊 Data & Analytics' ? 'text-teal-400' :
                    category === '🌍 Global Resources' ? 'text-emerald-400' :
                    'text-silver-400'
                  }`}>{resources.length} resources</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {resources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group"
                    >
                      {/* Render specialized lofi video card if it's a YouTube video */}
                      {resource.isYouTube ? (
                        <button
                          onClick={() => handleResourceClick(resource)}
                          className="w-full h-[280px] bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:bg-gray-800/90 active:scale-[0.98] text-left relative group"
                        >
                          {/* YouTube Thumbnail Background */}
                          <div className="relative h-[160px] overflow-hidden">
                            <img
                              src={getYouTubeThumbnail(resource.url)}
                              alt={resource.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                // Fallback to a gradient background if thumbnail fails
                                e.currentTarget.style.display = 'none';
                                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                if (nextElement) {
                                  nextElement.style.display = 'block';
                                }
                              }}
                            />
                            {/* Fallback gradient background */}
                            <div
                              className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 hidden"
                              style={{ display: 'none' }}
                            />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
                              </div>
                            </div>

                            {/* YouTube Badge */}
                            <div className="absolute top-3 right-3">
                              <div className="px-2 py-1 rounded-full text-xs font-bold text-white bg-red-600/90 backdrop-blur-sm">
                                YouTube
                              </div>
                            </div>

                            {/* Lofi Badge */}
                            <div className="absolute top-3 left-3">
                              <div className="px-2 py-1 rounded-full text-xs font-bold text-white bg-purple-600/90 backdrop-blur-sm flex items-center gap-1">
                                <Music className="w-3 h-3" />
                                Lofi
                              </div>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-4 flex flex-col h-[120px]">
                            {/* Title */}
                            <h3 className="text-sm font-bold text-white leading-tight group-hover:text-purple-300 transition-colors duration-300 line-clamp-2 mb-2">
                              {resource.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1 mb-2">
                              {resource.description}
                            </p>

                            {/* Action Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-700/30 mt-auto">
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-purple-400 font-medium">
                                  Study Music
                                </span>
                              </div>
                              <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                                <Play size={10} className="text-purple-400 group-hover:text-purple-300" />
                              </div>
                            </div>
                          </div>

                          {/* Hover Effect Overlay */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </button>
                      ) : (
                        /* Regular resource card for non-YouTube resources */
                        <button
                          onClick={() => handleResourceClick(resource)}
                          className={`w-full h-[200px] backdrop-blur-sm rounded-2xl p-4 border transition-all duration-300 active:scale-[0.98] text-left relative overflow-hidden group flex flex-col ${
                            resource.id === 200
                              ? 'bg-white/10 border-white/30 hover:border-white/60 hover:shadow-2xl hover:shadow-white/20 hover:bg-white/15'
                              : 'bg-gray-800/50 border-gray-600/30 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 hover:bg-gray-700/60'
                          }`}
                        >
                          {/* Background Gradient */}
                          <div
                            className={`absolute inset-0 transition-opacity duration-300 ${
                              resource.id === 200
                                ? 'opacity-10 group-hover:opacity-20'
                                : 'opacity-5 group-hover:opacity-10'
                            }`}
                            style={{
                              background: resource.id === 200
                                ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
                                : `linear-gradient(135deg, ${resource.color}20 0%, transparent 50%)`
                            }}
                          />

                          {/* Special Ghana flag glow effect for Educational Pathways card */}
                          {resource.id === 200 && (
                            <>
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 via-yellow-500/10 to-green-500/10 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-500/30 via-yellow-500/30 to-green-500/30 opacity-40 group-hover:opacity-60 transition-opacity duration-300 blur-sm -z-10" />
                              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-red-400/20 via-yellow-400/20 to-green-400/20 opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-md -z-20" />
                            </>
                          )}
                          {/* Status Indicators */}
                          <div className="absolute top-3 right-3 flex gap-1">
                            <div className="px-2 py-1 rounded-full text-xs font-bold text-white bg-purple-500/80">
                              Resource
                            </div>
                          </div>
                          {/* Icon Container */}
                          <div className="relative mb-3 flex-shrink-0">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                                resource.id === 200 ? 'shadow-white/20 group-hover:shadow-white/40' : ''
                              }`}
                              style={{
                                backgroundColor: resource.id === 200 ? 'rgba(255,255,255,0.2)' : resource.color,
                                boxShadow: resource.id === 200 ? '0 0 20px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.1)' : undefined
                              }}
                            >
                              {resource.icon}
                            </div>
                            {/* Resource Type Indicator */}
                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                              resource.id === 200
                                ? 'bg-white/20 border-white/40'
                                : 'bg-gray-800 border-gray-700'
                            }`}>
                              <ExternalLink className={`w-2.5 h-2.5 ${
                                resource.id === 200 ? 'text-white' : 'text-purple-400'
                              }`} />
                            </div>
                          </div>
                          {/* Content */}
                          <div className="flex-1 flex flex-col space-y-2">
                            {/* Title */}
                            <h3 className={`text-sm font-bold leading-tight transition-colors duration-300 line-clamp-2 ${
                              resource.id === 200
                                ? 'text-white group-hover:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                                : 'text-white group-hover:text-purple-300'
                            }`}>
                              {resource.title}
                            </h3>
                            {/* Category */}
                            <p className={`text-xs font-medium line-clamp-1 ${
                              resource.id === 200
                                ? 'text-white/80'
                                : 'text-purple-400'
                            }`}>
                              {category}
                            </p>
                            {/* Description */}
                            <p className={`text-xs leading-relaxed line-clamp-2 flex-1 ${
                              resource.id === 200
                                ? 'text-white/70'
                                : 'text-gray-400'
                            }`}>
                              {resource.description}
                            </p>
                            {/* Action Footer */}
                            <div className={`flex items-center justify-between pt-2 border-t mt-auto ${
                              resource.id === 200
                                ? 'border-white/20'
                                : 'border-gray-700/30'
                            }`}>
                              <div className="flex items-center gap-1">
                                <span className={`text-xs font-medium ${
                                  resource.id === 200
                                    ? 'text-white/80'
                                    : 'text-purple-400'
                                }`}>
                                  Resource
                                </span>
                              </div>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                resource.id === 200
                                  ? 'bg-white/20 group-hover:bg-white/30'
                                  : 'bg-purple-500/20 group-hover:bg-purple-500/30'
                              }`}>
                                <ExternalLink size={10} className={`${
                                  resource.id === 200
                                    ? 'text-white group-hover:text-white'
                                    : 'text-purple-400 group-hover:text-purple-300'
                                }`} />
                              </div>
                            </div>
                          </div>
                          {/* Hover Effect Overlay */}
                          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                            resource.id === 200
                              ? 'bg-gradient-to-br from-white/10 to-transparent'
                              : 'bg-gradient-to-br from-purple-500/5 to-transparent'
                          }`} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
    </>
  );

  // Conditional rendering based on state
  if (pageLoading) {
    return renderLoadingState();
  }

  if (selectedYouTubeVideo) {
    return renderYouTubeVideo();
  }

  // Add this before the main render function
  if (selectedResource) {
    return (
      <div className="min-h-screen bg-black">
        {/* Header with Back Button */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4 pt-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                  {selectedResource.title}
                </h1>
                <p className="text-sm text-purple-200 truncate">
                  {selectedResource.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Full-Screen Iframe Container */}
        <div className="h-[calc(100vh-80px)] bg-black flex items-center justify-center relative">
          {renderIframe(selectedResource)}
        </div>
      </div>
    );
  }

  return renderMainContent();
};

export default StudentsHubPage;
