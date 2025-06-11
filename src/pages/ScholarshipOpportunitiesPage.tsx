import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, BookOpen, Globe, DollarSign, Users, Target, Award, Briefcase, ExternalLink, Search, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';
import useEnhancedNavigation from '../hooks/useEnhancedNavigation';
import SEOHead from '../components/seo/SEOHead';
import ShimmerLoader from '../components/common/ShimmerLoader';
import SmartSearchBar, { SearchableItem, FilterOption } from '../components/common/SmartSearchBar';
import { useSearchState } from '../hooks/useSearchState';

interface ScholarshipItem {
  id: string;
  name: string;
  description: string;
  url: string;
  icon?: React.ReactNode;
  color?: string;
  glowColor?: string;
  hasWhiteBackground?: boolean;
  embedStrategy?: 'iframe' | 'external' | 'smart';
  sandbox?: string;
  alternativeUrls?: string[];
  proxyUrls?: string[];
}

const ScholarshipOpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { setShowHeader } = useHeader();
  const { handleInternalStateChange, savePageState } = useEnhancedNavigation();

  // AI Search page functionality states
  const [selectedScholarship, setSelectedScholarship] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [connectionRefused, setConnectionRefused] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [autoRedirectTimer, setAutoRedirectTimer] = useState<NodeJS.Timeout | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Search functionality
  const {
    searchState,
    updateSearchTerm,
    updateFilters,
    clearSearch,
    handleExternalLinkClick
  } = useSearchState('scholarship-opportunities');

  // Scholarship data with corrected URLs and AI Search page format
  const scholarshipOpportunities: ScholarshipItem[] = [
    // Academic Success Resources
    {
      id: 'khan-academy',
      name: 'Khan Academy',
      url: 'https://www.khanacademy.org',
      description: 'Free online courses and practice exercises for all subjects',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'afex-hub',
      name: 'AFEX Hub',
      url: 'https://www.afextestprep.com',
      description: 'Professional SAT preparation and college application support',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },
    {
      id: 'yaf-ghana',
      name: 'YAfGhana',
      url: 'https://yafghana.org',
      description: 'Free SAT training and scholarship opportunities for Ghanaian students',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#2563eb'
    },
    {
      id: 'education-usa-ghana',
      name: 'EducationUSA Ghana',
      url: 'https://gh.usembassy.gov/education-culture/educationusa/',
      description: 'U.S. Department of State official source for U.S. higher education',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-cyan-600',
      glowColor: '#0891b2'
    },
    {
      id: 'veritas-foundation',
      name: 'Veritas Foundation',
      url: 'https://theveritasfoundation.co',
      description: 'Professional SAT preparation and college counseling services',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#9333ea'
    },
    {
      id: 'college-board',
      name: 'College Board',
      url: 'https://www.collegeboard.org',
      description: 'Official SAT testing and preparation resources',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#4f46e5'
    },

    // Local Scholarship Opportunities (Fixed URLs)
    {
      id: 'ghana-scholarship-secretariat',
      name: 'Ghana Scholarship Secretariat',
      url: 'https://www.scholarshipgh.com',
      description: 'Government scholarships for tertiary education in Ghana',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-cyan-600',
      glowColor: '#0891b2'
    },
    {
      id: 'mastercard-foundation',
      name: 'Mastercard Foundation Scholars',
      url: 'https://mastercardfdn.org/en/what-we-do/our-programs/mastercard-foundation-scholars-program/',
      description: 'Full scholarships at partner universities in Ghana and Africa',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    },
    {
      id: 'knust-admissions',
      name: 'KNUST Admissions Portal',
      url: 'https://apps.knust.edu.gh/admissions',
      description: 'Kwame Nkrumah University of Science and Technology admissions and scholarships',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-teal-600',
      glowColor: '#059669'
    },
    {
      id: 'ug-financial-aid',
      name: 'University of Ghana Financial Aid',
      url: 'https://www.ug.edu.gh/financialaid/',
      description: 'Scholarships and financial support for University of Ghana students',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-green-600',
      glowColor: '#10b981'
    },
    {
      id: 'ashesi-scholarships',
      name: 'Ashesi University Scholarships',
      url: 'https://ashesi.edu.gh/scholarships/',
      description: 'Merit-based and need-based scholarships for undergraduate studies',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-indigo-600',
      glowColor: '#7c3aed'
    },
    {
      id: 'getfund',
      name: 'Ghana Education Trust Fund',
      url: 'https://getfund.gov.gh',
      description: 'Government scholarship fund for tertiary education in Ghana',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-purple-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'gnpc-foundation',
      name: 'GNPC Foundation',
      url: 'https://gnpcfoundation.org',
      description: 'Ghana National Petroleum Corporation scholarships for STEM students',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },
    {
      id: 'vodafone-ghana',
      name: 'Vodafone Ghana Foundation',
      url: 'https://www.vodafone.com.gh/foundation',
      description: 'Educational scholarships and support programs in Ghana',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626'
    },
    {
      id: 'mtn-foundation',
      name: 'MTN Foundation Ghana',
      url: 'https://www.mtn.com.gh/mtn-foundation',
      description: 'Educational scholarships and community support initiatives',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    },
    {
      id: 'cocobod-scholarships',
      name: 'COCOBOD Scholarships',
      url: 'https://cocobod.gh',
      description: 'Ghana Cocoa Board scholarships for children of cocoa farmers',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-amber-600 to-yellow-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'dream-hive',
      name: 'Dream Hive Scholarship',
      url: 'https://dhscholarship.org',
      description: 'A Hive of Dreams, A Buzz of Success - Supporting student dreams',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-pink-600 to-purple-600',
      glowColor: '#ec4899'
    },
    // International Opportunities (Fixed URLs)
    {
      id: 'commonwealth-scholarships',
      name: 'Commonwealth Scholarships',
      url: 'https://www.cscuk.fcdo.gov.uk',
      description: 'UK government scholarships for Commonwealth citizens',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'daad-scholarships',
      name: 'DAAD Scholarships',
      url: 'https://www.daad.de/en',
      description: 'German Academic Exchange Service scholarships for international students',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-orange-600',
      glowColor: '#dc2626'
    },
    {
      id: 'chevening-scholarships',
      name: 'Chevening Scholarships',
      url: 'https://www.chevening.org',
      description: 'UK government global scholarship programme for future leaders',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-cyan-600',
      glowColor: '#0891b2'
    },
    {
      id: 'fulbright-program',
      name: 'Fulbright Program Ghana',
      url: 'https://gh.usembassy.gov/education-culture/fulbright/',
      description: 'US government international educational exchange program',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#4f46e5'
    },
    {
      id: 'erasmus-plus',
      name: 'Erasmus+ Program',
      url: 'https://erasmus-plus.ec.europa.eu',
      description: 'European Union scholarships for study and training in Europe',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#9333ea'
    },
    {
      id: 'australia-awards',
      name: 'Australia Awards',
      url: 'https://www.dfat.gov.au/people-to-people/australia-awards',
      description: 'Australian government scholarships for international students',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#059669'
    },
    {
      id: 'chinese-government-scholarships',
      name: 'Chinese Government Scholarships',
      url: 'https://www.studyinchina.edu.cn',
      description: 'Full and partial scholarships for study in China',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-yellow-600',
      glowColor: '#dc2626'
    },
    {
      id: 'mext-scholarships',
      name: 'MEXT Scholarships Japan',
      url: 'https://www.studyinjapan.go.jp/en',
      description: 'Japanese Government scholarships for international students',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-pink-600 to-red-600',
      glowColor: '#ec4899'
    },
    {
      id: 'korean-government-scholarship',
      name: 'Korean Government Scholarship',
      url: 'https://www.studyinkorea.go.kr',
      description: 'Full scholarships for undergraduate and graduate studies in Korea',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-purple-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'rotary-global-grants',
      name: 'Rotary Foundation Global Grants',
      url: 'https://www.rotary.org/en/our-programs/scholarships',
      description: 'International scholarships for graduate-level studies worldwide',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#f59e0b'
    }
  ];

  // Page loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Header management
  useEffect(() => {
    if (selectedScholarship) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    return () => {
      setShowHeader(true);
    };
  }, [selectedScholarship, setShowHeader]);

  // Get selected scholarship data
  const selectedScholarshipData = selectedScholarship
    ? scholarshipOpportunities.find(s => s.id === selectedScholarship)
    : null;

  // Search functionality
  const searchableItems: SearchableItem[] = useMemo(() =>
    scholarshipOpportunities.map(scholarship => ({
      id: scholarship.id,
      title: scholarship.name,
      description: scholarship.description,
      category: scholarship.name.toLowerCase().includes('international') ||
                scholarship.name.toLowerCase().includes('commonwealth') ||
                scholarship.name.toLowerCase().includes('daad') ||
                scholarship.name.toLowerCase().includes('chevening') ||
                scholarship.name.toLowerCase().includes('fulbright') ||
                scholarship.name.toLowerCase().includes('erasmus') ||
                scholarship.name.toLowerCase().includes('australia') ||
                scholarship.name.toLowerCase().includes('chinese') ||
                scholarship.name.toLowerCase().includes('japanese') ||
                scholarship.name.toLowerCase().includes('korean') ||
                scholarship.name.toLowerCase().includes('rotary')
                ? 'International'
                : scholarship.name.toLowerCase().includes('ghana') ||
                  scholarship.name.toLowerCase().includes('knust') ||
                  scholarship.name.toLowerCase().includes('ug') ||
                  scholarship.name.toLowerCase().includes('ashesi') ||
                  scholarship.name.toLowerCase().includes('getfund') ||
                  scholarship.name.toLowerCase().includes('gnpc') ||
                  scholarship.name.toLowerCase().includes('vodafone') ||
                  scholarship.name.toLowerCase().includes('mtn') ||
                  scholarship.name.toLowerCase().includes('cocobod') ||
                  scholarship.name.toLowerCase().includes('dream hive')
                  ? 'Local'
                  : 'Academic',
      tags: [scholarship.name, scholarship.description].join(' ').toLowerCase().split(' ')
    })), [scholarshipOpportunities]);

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'All Scholarships', count: scholarshipOpportunities.length },
    { id: 'Academic', label: 'Academic Resources', count: searchableItems.filter(item => item.category === 'Academic').length },
    { id: 'Local', label: 'Local Scholarships', count: searchableItems.filter(item => item.category === 'Local').length },
    { id: 'International', label: 'International', count: searchableItems.filter(item => item.category === 'International').length }
  ];

  const filteredScholarships = useMemo(() => {
    let filtered = scholarshipOpportunities;

    // Apply category filter
    if (searchState.selectedFilters.length > 0 && !searchState.selectedFilters.includes('all')) {
      filtered = filtered.filter(scholarship => {
        const item = searchableItems.find(item => item.id === scholarship.id);
        return item && searchState.selectedFilters.includes(item.category);
      });
    }

    // Apply search term
    if (searchState.searchTerm.trim()) {
      const searchLower = searchState.searchTerm.toLowerCase();
      filtered = filtered.filter(scholarship =>
        scholarship.name.toLowerCase().includes(searchLower) ||
        scholarship.description.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [scholarshipOpportunities, searchableItems, searchState.selectedFilters, searchState.searchTerm]);

  // Enhanced iframe monitoring with connection detection (from AI Search page)
  useEffect(() => {
    if (selectedScholarship && !iframeError && !connectionRefused) {
      let checkCount = 0;
      const maxChecks = 5;
      let connectionFailures = 0;

      const checkIframeStatus = () => {
        const iframe = document.querySelector('iframe[title="' + selectedScholarshipData?.name + '"]') as HTMLIFrameElement;

        if (iframe && isLoading && checkCount < maxChecks) {
          checkCount++;

          try {
            const iframeSrc = iframe.src;
            const hasConnectionError = iframe.contentDocument === null && iframe.contentWindow === null;

            if (hasConnectionError) {
              console.log(`${selectedScholarshipData?.name} connection refused detected`);
              setConnectionRefused(true);
              setIsLoading(false);
              return;
            }

            if (iframeSrc && iframeSrc !== 'about:blank') {
              if (checkCount >= 4) {
                console.log(`${selectedScholarshipData?.name} appears to be loading slowly, giving more time`);
                return;
              }
            } else {
              connectionFailures++;
              if (connectionFailures >= 3) {
                console.log(`${selectedScholarshipData?.name} multiple connection failures detected`);
                setConnectionRefused(true);
                setIsLoading(false);
                return;
              }
            }

            if (checkCount < maxChecks) {
              setTimeout(checkIframeStatus, 2000);
            }

          } catch (e) {
            connectionFailures++;
            console.log(`Connection check ${checkCount} for ${selectedScholarshipData?.name}:`, e instanceof Error ? e.message : 'Unknown error');

            if (connectionFailures >= 3) {
              console.log(`${selectedScholarshipData?.name} multiple connection failures, treating as connection refused`);
              setConnectionRefused(true);
              setIsLoading(false);
              return;
            }

            if (checkCount < maxChecks) {
              setTimeout(checkIframeStatus, 2000);
            }
          }
        }
      };

      const timer = setTimeout(checkIframeStatus, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedScholarship, isLoading, iframeError, connectionRefused, selectedScholarshipData?.name]);

  const handleScholarshipClick = (scholarshipId: string) => {
    setIsLoading(true);
    setIframeError(false);
    setShowAlternatives(false);
    setConnectionRefused(false);
    setLoadAttempts(prev => prev + 1);
    setSelectedScholarship(scholarshipId);

    const scholarshipData = scholarshipOpportunities.find(s => s.id === scholarshipId);

    // Auto-redirect timer for slow loading
    const timer = setTimeout(() => {
      if (scholarshipData && isLoading) {
        console.log(`Auto-redirecting ${scholarshipData.name} to browser due to loading timeout after 8 seconds`);
        setIsLoading(false);
        setIframeError(true);

        setTimeout(() => {
          handleExternalLinkClick(scholarshipData.url);
          setTimeout(() => {
            setSelectedScholarship(null);
            setIframeError(false);
            setShowAlternatives(false);
          }, 500);
        }, 1500);
      }
    }, 8000);

    setAutoRedirectTimer(timer);
  };

  const handleIframeLoad = () => {
    console.log(`${selectedScholarshipData?.name} iframe loaded successfully`);
    setIsLoading(false);
    setIframeError(false);
    if (autoRedirectTimer) {
      clearTimeout(autoRedirectTimer);
      setAutoRedirectTimer(null);
    }
  };

  const handleIframeError = () => {
    console.log('Iframe error detected - this might be normal for some sites');

    setTimeout(() => {
      if (isLoading) {
        console.log('Iframe still loading after error event, treating as actual failure');
        setIsLoading(false);
        setIframeError(true);
        setShowAlternatives(true);

        if (autoRedirectTimer) {
          clearTimeout(autoRedirectTimer);
          setAutoRedirectTimer(null);
        }

        const scholarshipData = scholarshipOpportunities.find(s => s.id === selectedScholarship);
        if (scholarshipData) {
          console.log(`Auto-redirecting ${scholarshipData.name} to browser due to confirmed iframe failure`);
          setTimeout(() => {
            handleExternalLinkClick(scholarshipData.url);
            setTimeout(() => {
              setSelectedScholarship(null);
              setIframeError(false);
              setShowAlternatives(false);
            }, 500);
          }, 2000);
        }
      }
    }, 3000);
  };

  const handleOpenInBrowser = () => {
    if (selectedScholarshipData) {
      handleExternalLinkClick(selectedScholarshipData.url);
    }
  };

  const handleRefresh = () => {
    if (selectedScholarship) {
      console.log(`Refreshing ${selectedScholarshipData?.name}`);
      setIsLoading(true);
      setIframeError(false);
      setConnectionRefused(false);
      setShowAlternatives(false);
      setLoadAttempts(prev => prev + 1);

      if (autoRedirectTimer) {
        clearTimeout(autoRedirectTimer);
        setAutoRedirectTimer(null);
      }

      const iframe = document.querySelector('iframe[title="' + selectedScholarshipData?.name + '"]') as HTMLIFrameElement;
      if (iframe && selectedScholarshipData) {
        iframe.src = selectedScholarshipData.url + (selectedScholarshipData.url.includes('?') ? '&' : '?') + 'refresh=' + Date.now();
      }
    }
  };

  const handleBack = () => {
    if (selectedScholarship) {
      handleInternalStateChange(() => {
        setSelectedScholarship(null);
        setIsLoading(false);
        setIframeError(false);
        setShowAlternatives(false);
        setConnectionRefused(false);
        setShowHeader(true);
        if (autoRedirectTimer) {
          clearTimeout(autoRedirectTimer);
          setAutoRedirectTimer(null);
        }
      });
    } else {
      navigate('/students-hub');
    }
  };

  // If a scholarship is selected, show the embedded view (like AI Search page)
  if (selectedScholarship && selectedScholarshipData) {
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

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {selectedScholarshipData.name}
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

        {/* Full viewport iframe */}
        <div className="w-full h-full pt-20 sm:pt-24 relative">
          {!iframeError ? (
            <>
              <iframe
                src={selectedScholarshipData.url}
                className="w-full h-full border-0 relative z-10"
                title={selectedScholarshipData.name}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads allow-modals allow-presentation"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                referrerPolicy="no-referrer-when-downgrade"
                style={selectedScholarshipData.hasWhiteBackground ? {
                  filter: 'invert(1) hue-rotate(180deg)',
                  background: 'white'
                } : {}}
              />

              {/* Loading overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-20">
                  <div className="text-center">
                    <ShimmerLoader variant="silver" width="w-16" height="h-16" className="rounded-full mx-auto mb-4" />
                    <p className="text-white text-lg font-medium mb-2">Loading {selectedScholarshipData.name}...</p>
                    <p className="text-gray-400 text-sm">This may take a few moments</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Error state with alternatives */
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-8">
              <div className="max-w-md w-full text-center">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExternalLink className="w-10 h-10 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Unable to Load</h3>
                  <p className="text-gray-400 mb-6">
                    {selectedScholarshipData.name} cannot be displayed in an embedded frame.
                    This is normal for many scholarship websites due to security policies.
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
                      <div className="font-semibold">Open {selectedScholarshipData.name}</div>
                      <div className="text-sm opacity-90">Launch in new browser tab</div>
                    </div>
                  </button>

                  <p className="text-sm text-gray-400">
                    This will open {selectedScholarshipData.name} in a new tab where you can use all its features without restrictions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Scholarship Opportunities | St. Louis Demonstration JHS"
        description="Comprehensive guide to scholarships, SAT preparation, and educational opportunities in Ghana and abroad for students at St. Louis Demonstration JHS."
        keywords="scholarships, SAT preparation, educational opportunities, Ghana scholarships, international scholarships, college preparation"
        url="/scholarship-opportunities"
        type="website"
      />

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
                Scholarship Opportunities
              </h1>
              <p className="text-sm text-purple-200 truncate">
                Explore scholarships, SAT preparation, and educational opportunities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {/* Search Bar */}
          <div className="mb-8">
            <SmartSearchBar
              searchableItems={searchableItems}
              filterOptions={filterOptions}
              searchState={searchState}
              onSearchChange={updateSearchTerm}
              onFiltersChange={updateFilters}
              onClearSearch={clearSearch}
              placeholder="Search scholarship opportunities..."
              className="w-full"
            />
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm">
              {filteredScholarships.length === scholarshipOpportunities.length
                ? `Showing all ${scholarshipOpportunities.length} scholarship opportunities`
                : `Showing ${filteredScholarships.length} of ${scholarshipOpportunities.length} scholarship opportunities`
              }
              {searchState.searchTerm && ` for "${searchState.searchTerm}"`}
            </p>
          </div>

          {/* Scholarship Opportunities Grid - Exact AI Search Page Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredScholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <button
                  onClick={() => handleScholarshipClick(scholarship.id)}
                  className="w-full h-[200px] bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:bg-gray-700/60 active:scale-[0.98] text-left relative overflow-hidden group flex flex-col"
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${scholarship.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                  />

                  {/* Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${scholarship.glowColor}20 0%, transparent 70%)`
                    }}
                  />

                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm mb-3 group-hover:bg-white/20 transition-colors duration-300">
                    {scholarship.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                      {scholarship.name}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-3 flex-1 leading-relaxed">
                      {scholarship.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-600/30">
                    <span className="text-xs text-gray-400 font-medium">
                      Visit Website
                    </span>
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                      <ExternalLink size={10} className="text-gray-400 group-hover:text-white" />
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* No results message */}
          {filteredScholarships.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No scholarships found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={clearSearch}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );

  // Show shimmer loading for initial page load
  if (pageLoading) {
    return (
      <div className="min-h-screen bg-black">
        {/* Header Shimmer */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4 pt-20">
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
            {/* Search Bar Shimmer */}
            <div className="mb-8">
              <ShimmerLoader variant="silver" width="w-full" height="h-12" className="rounded-xl" />
            </div>

            {/* Grid Shimmer */}
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
          </div>
        </main>
      </div>
    );
  }
};

export default ScholarshipOpportunitiesPage; 