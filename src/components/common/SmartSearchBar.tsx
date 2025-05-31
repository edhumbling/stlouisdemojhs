import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { useSearchState } from '../../hooks/useSearchState';
import { motion, AnimatePresence } from 'framer-motion';

export interface SearchableItem {
  id: string | number;
  title: string;
  description: string;
  category: string;
  level?: string;
  type?: string;
  url?: string;
  [key: string]: any;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface SmartSearchBarProps {
  items: SearchableItem[];
  onSearchResults: (results: SearchableItem[]) => void;
  placeholder?: string;
  accentColor?: 'green' | 'purple' | 'blue';
  categories?: FilterOption[];
  levels?: FilterOption[];
  types?: FilterOption[];
  enableIntentDetection?: boolean;
  className?: string;
  searchDelay?: number;
  pageKey?: string; // For search state management
  onExternalLinkClick?: (url: string) => void; // For handling external link clicks
}

export interface SearchIntent {
  isVideoSearch: boolean;
  isWebsiteSearch: boolean;
  isEducationSearch: boolean;
  isGovernmentSearch: boolean;
  isBeginnerSearch: boolean;
  isAdvancedSearch: boolean;
  categoryIntent: string[];
}

// Smart search intent detection utility
export const detectSearchIntent = (searchTerm: string): SearchIntent => {
  const searchLower = searchTerm.toLowerCase().trim();
  
  const videoKeywords = ['video', 'watch', 'tutorial', 'lesson', 'course', 'lecture', 'webinar', 'presentation', 'demo', 'demonstration', 'youtube', 'channel'];
  const websiteKeywords = ['website', 'site', 'portal', 'platform', 'tool', 'calculator', 'resource', 'guide', 'article', 'blog', 'page'];
  const educationKeywords = ['learn', 'education', 'educational', 'teaching', 'study', 'academic', 'school', 'university', 'college', 'institution'];
  const governmentKeywords = ['government', 'official', 'federal', 'state', 'agency', 'department', 'bureau', 'administration', 'treasury', 'irs'];
  const beginnerKeywords = ['beginner', 'basic', 'intro', 'introduction', 'start', 'starting', 'fundamentals', 'basics', 'simple', 'easy'];
  const advancedKeywords = ['advanced', 'expert', 'professional', 'complex', 'sophisticated', 'detailed', 'comprehensive', 'in-depth'];

  const categoryIntents = [
    { keywords: ['investing', 'investment', 'stocks', 'bonds', 'portfolio', 'market'], category: 'investing' },
    { keywords: ['budget', 'budgeting', 'money management', 'spending', 'saving'], category: 'budgeting' },
    { keywords: ['credit', 'credit score', 'credit card', 'debt', 'loan'], category: 'credit' },
    { keywords: ['retirement', 'pension', '401k', 'ira', 'social security'], category: 'retirement' },
    { keywords: ['insurance', 'health insurance', 'life insurance', 'coverage'], category: 'insurance' },
    { keywords: ['tax', 'taxes', 'irs', 'filing', 'deduction'], category: 'taxes' },
    { keywords: ['business', 'entrepreneur', 'startup', 'small business'], category: 'business' },
    { keywords: ['real estate', 'mortgage', 'home buying', 'property'], category: 'real estate' },
    { keywords: ['stem', 'science', 'technology', 'engineering', 'mathematics', 'math'], category: 'stem' },
    { keywords: ['textbook', 'book', 'reading', 'literature'], category: 'textbooks' },
    { keywords: ['career', 'job', 'employment', 'work'], category: 'career' }
  ];

  return {
    isVideoSearch: videoKeywords.some(keyword => searchLower.includes(keyword)),
    isWebsiteSearch: websiteKeywords.some(keyword => searchLower.includes(keyword)),
    isEducationSearch: educationKeywords.some(keyword => searchLower.includes(keyword)),
    isGovernmentSearch: governmentKeywords.some(keyword => searchLower.includes(keyword)),
    isBeginnerSearch: beginnerKeywords.some(keyword => searchLower.includes(keyword)),
    isAdvancedSearch: advancedKeywords.some(keyword => searchLower.includes(keyword)),
    categoryIntent: categoryIntents
      .filter(({ keywords }) => keywords.some(keyword => searchLower.includes(keyword)))
      .map(({ category }) => category)
  };
};

// Smart search scoring algorithm
export const scoreSearchResult = (item: SearchableItem, searchTerm: string, intent: SearchIntent): number => {
  if (!searchTerm.trim()) return 0;

  const searchLower = searchTerm.toLowerCase().trim();
  const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0);
  
  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase();
  const category = item.category.toLowerCase();
  
  let score = 0;
  let hasMatch = false;

  // Exact matches (highest priority)
  if (title === searchLower) {
    score += 1000;
    hasMatch = true;
  } else if (category === searchLower) {
    score += 800;
    hasMatch = true;
  }

  // Phrase matches
  if (title.includes(searchLower)) {
    score += title.startsWith(searchLower) ? 600 : 400;
    hasMatch = true;
  }
  if (category.includes(searchLower)) {
    score += 300;
    hasMatch = true;
  }
  if (description.includes(searchLower)) {
    score += 200;
    hasMatch = true;
  }

  // Individual word matches
  searchWords.forEach(word => {
    if (word.length < 2) return;

    if (title.includes(word)) {
      const titleWords = title.split(/\s+/);
      const exactWordMatch = titleWords.some(titleWord =>
        titleWord === word || titleWord.startsWith(word)
      );
      score += exactWordMatch ? 150 : 100;
      hasMatch = true;
    }

    if (category.includes(word)) {
      score += 80;
      hasMatch = true;
    }

    if (description.includes(word)) {
      score += 50;
      hasMatch = true;
    }
  });

  if (!hasMatch) return 0;

  // Apply intent-based scoring boosts
  const isVideo = item.url?.includes('youtube.com') || item.url?.includes('youtu.be') || item.type === 'video';
  const isWebsite = !isVideo || item.type === 'website';

  // Content type prioritization
  if (intent.isVideoSearch && isVideo) {
    score += 500;
  } else if (intent.isVideoSearch && isWebsite) {
    score -= 100;
  }

  if (intent.isWebsiteSearch && isWebsite) {
    score += 400;
  } else if (intent.isWebsiteSearch && isVideo) {
    score -= 50;
  }

  // Educational content prioritization
  if (intent.isEducationSearch) {
    if (category.includes('educational') || category.includes('academic') || category.includes('university')) {
      score += 300;
    }
  }

  // Government content prioritization
  if (intent.isGovernmentSearch) {
    if (category.includes('government') || category.includes('official') || category.includes('federal')) {
      score += 350;
    }
  }

  // Difficulty level prioritization
  if (intent.isBeginnerSearch && item.level === 'Beginner') {
    score += 200;
  } else if (intent.isAdvancedSearch && item.level === 'Advanced') {
    score += 200;
  }

  // Category intent matching
  intent.categoryIntent.forEach(categoryType => {
    if (category.includes(categoryType) || title.includes(categoryType)) {
      score += 150;
    }
  });

  // Bonus for multiple word matches
  const matchedWords = searchWords.filter(word =>
    title.includes(word) || category.includes(word) || description.includes(word)
  );
  if (matchedWords.length > 1) {
    score += matchedWords.length * 25;
  }

  return score;
};

const SmartSearchBar: React.FC<SmartSearchBarProps> = ({
  items,
  onSearchResults,
  placeholder = "Search resources...",
  accentColor = 'green',
  categories = [],
  levels = [],
  types = [],
  enableIntentDetection = true,
  className = "",
  searchDelay = 300,
  pageKey,
  onExternalLinkClick
}) => {
  // Use search state management if pageKey is provided
  const searchStateHook = pageKey ? useSearchState(pageKey) : null;

  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [localSelectedCategory, setLocalSelectedCategory] = useState('');
  const [localSelectedLevel, setLocalSelectedLevel] = useState('');
  const [localSelectedType, setLocalSelectedType] = useState('');
  const [localShowFilters, setLocalShowFilters] = useState(false);

  // Use either managed state or local state
  const searchTerm = searchStateHook?.searchState.searchTerm ?? localSearchTerm;
  const selectedCategory = searchStateHook?.searchState.selectedCategory ?? localSelectedCategory;
  const selectedLevel = searchStateHook?.searchState.selectedLevel ?? localSelectedLevel;
  const selectedType = searchStateHook?.searchState.selectedType ?? localSelectedType;
  const showFilters = searchStateHook?.searchState.showFilters ?? localShowFilters;

  const setSearchTerm = searchStateHook?.updateSearchTerm ?? setLocalSearchTerm;
  const setSelectedCategory = searchStateHook?.updateSelectedCategory ?? setLocalSelectedCategory;
  const setSelectedLevel = searchStateHook?.updateSelectedLevel ?? setLocalSelectedLevel;
  const setSelectedType = searchStateHook?.updateSelectedType ?? setLocalSelectedType;
  const setShowFilters = searchStateHook?.updateShowFilters ?? setLocalShowFilters;

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search term
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, searchDelay);

    return () => clearTimeout(timer);
  }, [searchTerm, searchDelay]);

  // Get accent colors based on theme
  const getAccentColors = useCallback(() => {
    switch (accentColor) {
      case 'green':
        return {
          primary: 'green-500',
          secondary: 'green-600',
          light: 'green-400',
          ring: 'green-500/50',
          bg: 'green-500/20',
          border: 'green-500/30'
        };
      case 'purple':
        return {
          primary: 'purple-500',
          secondary: 'purple-600',
          light: 'purple-400',
          ring: 'purple-500/50',
          bg: 'purple-500/20',
          border: 'purple-500/30'
        };
      case 'blue':
        return {
          primary: 'blue-500',
          secondary: 'blue-600',
          light: 'blue-400',
          ring: 'blue-500/50',
          bg: 'blue-500/20',
          border: 'blue-500/30'
        };
      default:
        return {
          primary: 'green-500',
          secondary: 'green-600',
          light: 'green-400',
          ring: 'green-500/50',
          bg: 'green-500/20',
          border: 'green-500/30'
        };
    }
  }, [accentColor]);

  const colors = getAccentColors();

  // Smart search with intent detection
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      // Apply only filters when no search term
      return items.filter(item => {
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        const matchesLevel = !selectedLevel || item.level === selectedLevel;
        const matchesType = !selectedType ||
          (selectedType === 'video' && (item.url?.includes('youtube.com') || item.type === 'video')) ||
          (selectedType === 'website' && (!item.url?.includes('youtube.com') && item.type !== 'video'));

        return matchesCategory && matchesLevel && matchesType;
      });
    }

    // Detect search intent
    const intent = enableIntentDetection ? detectSearchIntent(debouncedSearchTerm) : {
      isVideoSearch: false,
      isWebsiteSearch: false,
      isEducationSearch: false,
      isGovernmentSearch: false,
      isBeginnerSearch: false,
      isAdvancedSearch: false,
      categoryIntent: []
    };

    // Score and filter items
    const scoredItems = items
      .map(item => ({
        ...item,
        searchScore: scoreSearchResult(item, debouncedSearchTerm, intent)
      }))
      .filter(item => item.searchScore > 0)
      .filter(item => {
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        const matchesLevel = !selectedLevel || item.level === selectedLevel;
        const matchesType = !selectedType ||
          (selectedType === 'video' && (item.url?.includes('youtube.com') || item.type === 'video')) ||
          (selectedType === 'website' && (!item.url?.includes('youtube.com') && item.type !== 'video'));

        return matchesCategory && matchesLevel && matchesType;
      })
      .sort((a, b) => {
        if (a.searchScore !== b.searchScore) {
          return b.searchScore - a.searchScore;
        }
        return a.title.localeCompare(b.title);
      });

    return scoredItems;
  }, [items, debouncedSearchTerm, selectedCategory, selectedLevel, selectedType, enableIntentDetection]);

  // Update parent component with search results
  useEffect(() => {
    onSearchResults(searchResults);
  }, [searchResults, onSearchResults]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    if (searchStateHook) {
      searchStateHook.clearSearchState();
    } else {
      setSearchTerm('');
      setSelectedCategory('');
      setSelectedLevel('');
      setSelectedType('');
    }
    setDebouncedSearchTerm('');
  }, [searchStateHook]);

  // Count active filters
  const activeFiltersCount = [selectedCategory, selectedLevel, selectedType].filter(Boolean).length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative max-w-3xl mx-auto">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <div className="absolute left-4 flex items-center pointer-events-none z-10">
            <Search className="h-5 w-5 text-gray-400" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-32 py-4 bg-white/5 border border-gray-600/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-${colors.ring} focus:border-${colors.primary}/50 transition-all duration-200 backdrop-blur-sm hover:bg-white/10`}
          />

          {/* Right Side Controls */}
          <div className="absolute right-2 flex items-center gap-2">
            {/* Clear Search Button */}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/70 text-white rounded-xl transition-all duration-200 border border-gray-600/30 text-sm font-medium ${showFilters ? `ring-2 ring-${colors.primary}/50` : ''}`}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className={`bg-${colors.primary} text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center`}>
                    {activeFiltersCount}
                  </span>
                )}
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Dropdown */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-600/30 shadow-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Filter Resources</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 text-gray-400 hover:text-white transition-colors rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Category Filter */}
                {categories.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-${colors.ring}"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label} {category.count ? `(${category.count})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Level Filter */}
                {levels.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Difficulty Level</label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-${colors.ring}"
                    >
                      <option value="">All Levels</option>
                      {levels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label} {level.count ? `(${level.count})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Type Filter */}
                {types.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Resource Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-${colors.ring}"
                    >
                      <option value="">All Types</option>
                      {types.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label} {type.count ? `(${type.count})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Clear Filters Button */}
              {(debouncedSearchTerm || selectedCategory || selectedLevel || selectedType) && (
                <div className="pt-2 border-t border-gray-600/30">
                  <button
                    onClick={clearFilters}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-all duration-200 border border-red-500/30 text-sm"
                  >
                    <X className="h-4 w-4" />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results Summary */}
      <div className="text-center">
        <p className="text-gray-400 text-sm">
          Showing <span className="text-white font-medium">{searchResults.length}</span> of <span className="text-white font-medium">{items.length}</span> resources
          {(debouncedSearchTerm || selectedCategory || selectedLevel || selectedType) && (
            <span className={`text-${colors.light} ml-1 font-medium`}>
              (filtered)
            </span>
          )}
          {isSearching && (
            <span className="text-yellow-400 ml-1 font-medium">
              (searching...)
            </span>
          )}
        </p>

        {/* Search Intent Indicators */}
        {enableIntentDetection && debouncedSearchTerm && (
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {(() => {
              const intent = detectSearchIntent(debouncedSearchTerm);
              const indicators = [];

              if (intent.isVideoSearch) indicators.push({ label: '🎥 Video Search', color: 'bg-red-500/20 text-red-400' });
              if (intent.isWebsiteSearch) indicators.push({ label: '🌐 Website Search', color: 'bg-blue-500/20 text-blue-400' });
              if (intent.isEducationSearch) indicators.push({ label: '🎓 Educational Content', color: 'bg-purple-500/20 text-purple-400' });
              if (intent.isGovernmentSearch) indicators.push({ label: '🏛️ Official Resources', color: 'bg-yellow-500/20 text-yellow-400' });
              if (intent.isBeginnerSearch) indicators.push({ label: '🌱 Beginner Level', color: 'bg-green-500/20 text-green-400' });
              if (intent.isAdvancedSearch) indicators.push({ label: '🚀 Advanced Level', color: 'bg-orange-500/20 text-orange-400' });

              return indicators.map((indicator, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${indicator.color} border-current`}
                >
                  {indicator.label}
                </span>
              ));
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartSearchBar;
