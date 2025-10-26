import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Code, 
  Brain, 
  Laptop, 
  Briefcase, 
  Star, 
  ExternalLink, 
  Search,
  Filter,
  Zap,
  BookOpen,
  Users,
  Trophy,
  Sparkles,
  Globe,
  Database,
  Cpu,
  Target,
  Rocket,
  Shield,
  Heart,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';
import ShimmerLoader from '../components/common/ShimmerLoader';
import SEOHead from '../components/seo/SEOHead';
import SmartSearchBar, { SearchableItem, FilterOption } from '../components/common/SmartSearchBar';

interface TechResource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: 'Featured' | 'Learning' | 'Practice' | 'Productivity' | 'Career' | 'Textbooks';
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  isNew?: boolean;
  isHot?: boolean;
  isFree?: boolean;
  tags: string[];
}

const TechResourcesPage: React.FC = () => {
  const navigate = useNavigate();
  const { setShowHeader, setShowFooter } = useHeader();
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Configure header and footer
  useEffect(() => {
    setShowHeader(true);
    setShowFooter(false); // Hide footer on Tech Resources page

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);

    // Cleanup: restore footer when leaving page
    return () => {
      clearTimeout(timer);
      setShowFooter(true);
    };
  }, [setShowHeader, setShowFooter]);

  // Handle back navigation
  const handleBack = () => {
    navigate('/students-hub', {
      state: {
        scrollToSection: '🎓 Academic Resources',
        returnFromCardContent: true
      }
    });
  };

  // Tech resources data based on scraped content
  const techResources: TechResource[] = [
    // Featured Resources
    {
      id: 'nvidia-ai-webinar',
      name: 'NVIDIA AI Webinar',
      url: 'https://nvda.ws/44drMiL',
      description: 'Free AI webinar from NVIDIA - cutting-edge artificial intelligence training',
      category: 'Featured',
      icon: <Cpu className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      glowColor: '#10b981',
      isNew: true,
      isFree: true,
      tags: ['AI', 'Machine Learning', 'NVIDIA', 'Webinar', 'Training']
    },
    {
      id: 'jobright-ai-agent',
      name: 'JobRight AI Agent',
      url: 'https://jobright.ai/ai-agent?utm_id=agent&utm_source=1021&utm_campaign=michelle',
      description: 'First ever auto-applying AI job agent that applies to jobs for you',
      category: 'Featured',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      glowColor: '#06b6d4',
      isNew: true,
      tags: ['Job Search', 'AI', 'Automation', 'Career', 'Applications']
    },
    {
      id: 'cs-girlies-discord',
      name: 'CS Girlies Discord',
      url: 'https://csgirlies.com',
      description: 'Join our community of 13,000+ Gen Z women in tech',
      category: 'Featured',
      icon: <Users className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-600',
      glowColor: '#ec4899',
      isHot: true,
      isFree: true,
      tags: ['Community', 'Women in Tech', 'Discord', 'Networking', 'Support']
    },

    // Textbooks
    {
      id: 'girly-guide-ai',
      name: 'Girly Guide to AI',
      url: 'https://michellexcomputer.gumroad.com/l/girly-guide-to-ai',
      description: 'Beginner-friendly intro to artificial intelligence, with ✨vibes✨',
      category: 'Textbooks',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-purple-500 to-violet-600',
      glowColor: '#8b5cf6',
      isNew: true,
      isFree: true,
      tags: ['AI', 'Beginner', 'Guide', 'Free', 'Learning']
    },
    {
      id: 'girly-guide-algorithms',
      name: 'Girly Guide to Algorithms',
      url: 'https://michellexcomputer.gumroad.com/l/algorithmsforthegirlies',
      description: 'Cute but powerful breakdowns of classic algorithm concepts',
      category: 'Textbooks',
      icon: <Code className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-600',
      glowColor: '#6366f1',
      isFree: true,
      tags: ['Algorithms', 'Data Structures', 'Programming', 'Free', 'Guide']
    },

    // Learning Resources
    {
      id: 'codedx',
      name: 'Codédx',
      url: 'https://www.codedx.io',
      description: 'Gamified coding adventures for total beginners (and girlies who love aesthetics)',
      category: 'Learning',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-600',
      glowColor: '#f59e0b',
      isHot: true,
      isFree: true,
      tags: ['Coding', 'Beginner', 'Gamified', 'Interactive', 'Aesthetics']
    },
    {
      id: 'missing-semester',
      name: 'The Missing Semester (MIT)',
      url: 'https://missing.csail.mit.edu',
      description: 'Learn the CS stuff nobody teaches you (shell, git, vim, etc)',
      category: 'Learning',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-red-500 to-pink-600',
      glowColor: '#ef4444',
      isFree: true,
      tags: ['MIT', 'Shell', 'Git', 'Vim', 'Tools', 'Command Line']
    },
    {
      id: 'mit-bttai-fellowship',
      name: 'MIT BTTAI Fellowship',
      url: 'https://www.breakthroughtech.org',
      description: 'The AI program that changed my life',
      category: 'Learning',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-600',
      glowColor: '#10b981',
      tags: ['MIT', 'AI', 'Fellowship', 'Program', 'Career Change']
    },
    {
      id: 'google-notebook-lm',
      name: 'Google Notebook LM',
      url: 'https://notebooklm.google.com',
      description: 'My new fave tool for learning anything faster w/ generative AI',
      category: 'Learning',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-600',
      glowColor: '#3b82f6',
      isFree: true,
      tags: ['Google', 'AI', 'Learning', 'Notes', 'Generative AI']
    },

    // Practice & Projects
    {
      id: 'kaggle',
      name: 'Kaggle',
      url: 'https://www.kaggle.com',
      description: 'Tutorials, datasets, and competitions to get into data science & ML',
      category: 'Practice',
      icon: <Database className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      glowColor: '#06b6d4',
      isFree: true,
      tags: ['Data Science', 'Machine Learning', 'Competitions', 'Datasets', 'Tutorials']
    },
    {
      id: 'leetcode',
      name: 'LeetCode',
      url: 'https://leetcode.com',
      description: 'Practice coding problems and prepare for technical interviews',
      category: 'Practice',
      icon: <Code className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600',
      glowColor: '#f97316',
      tags: ['Coding', 'Interviews', 'Algorithms', 'Data Structures', 'Practice']
    },
    {
      id: 'neetcode',
      name: 'Neetcode',
      url: 'https://neetcode.io',
      description: 'A very helpful DSA roadmap and lots of explainer videos for Leetcode',
      category: 'Practice',
      icon: <Target className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      glowColor: '#10b981',
      isHot: true,
      isFree: true,
      tags: ['DSA', 'Roadmap', 'LeetCode', 'Videos', 'Explanations']
    },
    {
      id: 'github-student-pack',
      name: 'GitHub Student Pack',
      url: 'https://education.github.com/pack',
      description: 'Free developer tools and services for students',
      category: 'Practice',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-gray-600 to-gray-800',
      glowColor: '#6b7280',
      isHot: true,
      isFree: true,
      tags: ['GitHub', 'Student', 'Free Tools', 'Developer', 'Services']
    },

    // Productivity Tools
    {
      id: 'obsidian',
      name: 'Obsidian',
      url: 'https://obsidian.md',
      description: 'My second brain, literally. Perfect for taking smart notes and organizing ideas',
      category: 'Productivity',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-600',
      glowColor: '#8b5cf6',
      tags: ['Notes', 'Knowledge Management', 'Second Brain', 'Organization', 'Ideas']
    },
    {
      id: 'windsurf',
      name: 'Windsurf',
      url: 'https://codeium.com/windsurf',
      description: 'Vibe coding with an AI tool that actively helps you brainstorm + build',
      category: 'Productivity',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-cyan-500 to-blue-600',
      glowColor: '#06b6d4',
      isNew: true,
      tags: ['AI Coding', 'Brainstorm', 'Development', 'Assistant', 'Building']
    },
    {
      id: '16personalities',
      name: '16Personalities.com',
      url: 'https://www.16personalities.com',
      description: 'Because knowing your brain helps you train your brain (I also just really like MBTI 🤭)',
      category: 'Productivity',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-600',
      glowColor: '#ec4899',
      isFree: true,
      tags: ['Personality', 'MBTI', 'Self-Knowledge', 'Psychology', 'Personal Development']
    },

    // Career & Internships
    {
      id: 'intern-list',
      name: 'Intern List',
      url: 'https://www.intern-list.com',
      description: 'Curated list of newly posted internships, updated every hour!!',
      category: 'Career',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-500 to-teal-600',
      glowColor: '#10b981',
      isNew: true,
      isFree: true,
      tags: ['Internships', 'Jobs', 'Career', 'Opportunities', 'Updated Hourly']
    },
    {
      id: 'levels-fyi',
      name: 'Levels.fyi',
      url: 'https://www.levels.fyi',
      description: 'Compare career levels and compensation across companies',
      category: 'Career',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-600',
      glowColor: '#f59e0b',
      tags: ['Compensation', 'Career Levels', 'Companies', 'Salary', 'Comparison']
    },
    {
      id: 'tech-interview-handbook',
      name: 'Tech Interview Handbook',
      url: 'https://www.techinterviewhandbook.org',
      description: 'Prepare for coding interviews with free guides and resources',
      category: 'Career',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-blue-500 to-purple-600',
      glowColor: '#3b82f6',
      isFree: true,
      tags: ['Interviews', 'Coding', 'Preparation', 'Guides', 'Resources']
    }
  ];

  // Convert resources to searchable items
  const searchableItems: SearchableItem[] = useMemo(() => {
    return techResources.map(resource => ({
      id: resource.id,
      title: resource.name,
      description: resource.description,
      category: resource.category,
      type: 'tech-resource',
      url: resource.url,
      tags: resource.tags,
      ...resource
    }));
  }, []);

  // Filter options for search
  const categoryOptions: FilterOption[] = [
    { value: 'Featured', label: 'Featured', count: techResources.filter(r => r.category === 'Featured').length },
    { value: 'Learning', label: 'Learning', count: techResources.filter(r => r.category === 'Learning').length },
    { value: 'Practice', label: 'Practice', count: techResources.filter(r => r.category === 'Practice').length },
    { value: 'Productivity', label: 'Productivity', count: techResources.filter(r => r.category === 'Productivity').length },
    { value: 'Career', label: 'Career', count: techResources.filter(r => r.category === 'Career').length },
    { value: 'Textbooks', label: 'Textbooks', count: techResources.filter(r => r.category === 'Textbooks').length }
  ];

  const typeOptions: FilterOption[] = [
    { value: 'tech-resource', label: 'Tech Resources', count: techResources.length }
  ];

  // Handle search results
  const handleSearchResults = useCallback((results: SearchableItem[]) => {
    setSearchResults(results);
  }, []);

  // Filter resources based on search and category
  const filteredResources = useMemo(() => {
    let resources = searchResults.length > 0 ? 
      searchResults.filter(item => item.type === 'tech-resource').map(item => 
        techResources.find(r => r.id === item.id)!
      ) : 
      techResources;

    if (selectedCategory !== 'All') {
      resources = resources.filter(resource => resource.category === selectedCategory);
    }

    return resources;
  }, [searchResults, selectedCategory]);

  // Group resources by category
  const groupedResources = useMemo(() => {
    const groups: { [key: string]: TechResource[] } = {};
    filteredResources.forEach(resource => {
      if (!groups[resource.category]) {
        groups[resource.category] = [];
      }
      groups[resource.category].push(resource);
    });
    return groups;
  }, [filteredResources]);

  // Handle resource click
  const handleResourceClick = (resource: TechResource) => {
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <main className="flex-1 py-6 sm:py-8">
          <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
            {/* Header Shimmer */}
            <div className="text-center mb-8">
              <ShimmerLoader variant="silver" width="w-16" height="h-16" className="mx-auto mb-4 rounded-2xl" />
              <ShimmerLoader variant="silver" width="w-64" height="h-8" className="mx-auto mb-4 rounded-lg" />
              <ShimmerLoader variant="silver" width="w-96" height="h-6" className="mx-auto mb-2 rounded-lg" />
            </div>

            {/* Search Bar Shimmer */}
            <div className="mb-8">
              <ShimmerLoader variant="silver" width="w-full" height="h-12" className="rounded-xl" />
            </div>

            {/* Cards Grid Shimmer */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <ShimmerLoader variant="silver" width="w-full" height="h-48" className="rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Tech Resources | Coding Tools, AI Resources & Developer Learning - St. Louis Demonstration JHS"
        description="Discover curated tech resources including coding tools, AI platforms, productivity apps, and learning materials for aspiring developers and tech enthusiasts."
        keywords="tech resources, coding tools, AI resources, programming, developer tools, productivity apps, tech learning, computer science"
        image="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png"
        url="/tech-resources"
        type="website"
      /
        canonical="https://stlouisdemojhs.com/tech-resources"
      >

      <div className="min-h-screen bg-black text-white">
        {/* Back Button Bar - With proper spacing from header */}
        <div className="bg-gradient-to-r from-cyan-900 via-cyan-800 to-cyan-900 py-3 sm:py-4 mt-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-cyan-700/50 hover:bg-cyan-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-cyan-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Tech Resources
              </h1>
            </div>
          </div>
        </div>

        <main className="flex-1 py-6 sm:py-8">
          <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4"
                style={{ filter: 'drop-shadow(0 0 20px #06b6d4)' }}
              >
                <Code className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg"
              >
                Tech Resources
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-4"
              >
                Curated collection of coding tools, AI resources, productivity apps, and tech learning platforms for aspiring developers and tech enthusiasts
              </motion.p>
            </div>

            {/* Smart Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <SmartSearchBar
                items={searchableItems}
                onSearchResults={handleSearchResults}
                placeholder={`Search ${techResources.length}+ tech resources...`}
                accentColor="cyan"
                categories={categoryOptions}
                types={typeOptions}
                enableIntentDetection={true}
                className="mb-6"
                pageKey="tech-resources"
              />
            </motion.div>

            {/* Resource Categories */}
            <div className="space-y-8">
              {Object.entries(groupedResources).map(([category, resources], categoryIndex) => (
                <motion.section
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + categoryIndex * 0.1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className={`text-xl sm:text-2xl font-bold flex items-center gap-2 ${
                      category === 'Featured' ? 'text-yellow-300' :
                      category === 'Learning' ? 'text-blue-300' :
                      category === 'Practice' ? 'text-green-300' :
                      category === 'Productivity' ? 'text-purple-300' :
                      category === 'Career' ? 'text-orange-300' :
                      category === 'Textbooks' ? 'text-pink-300' :
                      'text-gray-300'
                    }`}>
                      {category === 'Featured' && <Star className="w-6 h-6" />}
                      {category === 'Learning' && <BookOpen className="w-6 h-6" />}
                      {category === 'Practice' && <Code className="w-6 h-6" />}
                      {category === 'Productivity' && <Zap className="w-6 h-6" />}
                      {category === 'Career' && <Briefcase className="w-6 h-6" />}
                      {category === 'Textbooks' && <BookOpen className="w-6 h-6" />}
                      {category}
                    </h2>
                    <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                      {resources.length} resources
                    </span>
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
                        <button
                          onClick={() => handleResourceClick(resource)}
                          className="w-full h-[200px] bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:bg-gray-700/60 active:scale-[0.98] text-left relative overflow-hidden group flex flex-col"
                        >
                          {/* Background Gradient */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                          />

                          {/* Badges */}
                          <div className="absolute top-3 right-3 flex gap-1">
                            {resource.isNew && (
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">
                                NEW
                              </span>
                            )}
                            {resource.isHot && (
                              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full border border-red-500/30">
                                HOT
                              </span>
                            )}
                            {resource.isFree && (
                              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30">
                                FREE
                              </span>
                            )}
                          </div>

                          {/* Icon */}
                          <div
                            className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${resource.color} rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300`}
                            style={{ filter: `drop-shadow(0 0 10px ${resource.glowColor})` }}
                          >
                            {resource.icon}
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col">
                            <h3 className="text-white font-bold text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">
                              {resource.name}
                            </h3>
                            <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 mb-3 flex-1">
                              {resource.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-2">
                              {resource.tags.slice(0, 2).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {resource.tags.length > 2 && (
                                <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                                  +{resource.tags.length - 2}
                                </span>
                              )}
                            </div>

                            {/* External Link Icon */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{resource.category}</span>
                              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                            </div>
                          </div>

                          {/* Hover Effect Overlay */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>

            {/* Footer Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Rocket className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-white">Tech Resources Hub</h3>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Curated collection of {techResources.length}+ tech resources for learning, coding, and career development
                </p>
                <p className="text-xs text-gray-400">
                  Resources curated from Michelle Lawson's collection - for learning faster, coding smarter, and living your best tech life
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TechResourcesPage;
