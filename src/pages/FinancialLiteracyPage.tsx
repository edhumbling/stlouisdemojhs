import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Menu, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';

const FinancialLiteracyPage: React.FC = () => {
  const navigate = useNavigate();
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [loadingBook, setLoadingBook] = useState<string | null>(null);
  const navMenuRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    navigate('/');
  };

  const toggleVideo = (videoId: string) => {
    setPlayingVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const handleBookNavigation = (bookId: string, title: string) => {
    setLoadingBook(bookId);
    setTimeout(() => {
      navigate(`/financial-library/${bookId}`, {
        state: { title }
      });
    }, 500);
  };

  // Video component for inline YouTube-style playback
  const VideoCard: React.FC<{ videoId: string; title: string; thumbnail?: string }> = ({ videoId, title, thumbnail }) => {
    const isPlaying = playingVideos.has(videoId);
    const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
      <div className="relative bg-gray-800 rounded-lg overflow-hidden group">
        {!isPlaying ? (
          <div
            className="relative cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => toggleVideo(videoId)}
          >
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors duration-300">
              <div className="bg-red-600 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Play size={24} className="text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <h3 className="text-white text-sm font-medium bg-black/70 px-2 py-1 rounded backdrop-blur-sm">
                {title}
              </h3>
            </div>
          </div>
        ) : (
          <div className="relative">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              className="w-full aspect-video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => toggleVideo(videoId)}
              className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded hover:bg-black/90 transition-colors"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    );
  };

  // Navigation sections
  const navigationSections = [
    { id: 'budgeting-basics', title: 'Budgeting Basics', icon: '📊' },
    { id: 'saving-strategies', title: 'Saving Strategies', icon: '💰' },
    { id: 'banking-fundamentals', title: 'Banking Fundamentals', icon: '🏦' },
    { id: 'credit-debt', title: 'Credit & Debt Management', icon: '💳' },
    { id: 'investing-basics', title: 'Investing for Beginners', icon: '📈' },
    { id: 'advanced-investing', title: 'Advanced Investment Strategies', icon: '🎯' },
    { id: 'finance-mastery', title: 'Personal Finance Mastery', icon: '💪' },
    { id: 'crypto-modern', title: 'Cryptocurrency & Modern Finance', icon: '🪙' },
    { id: 'fire-movement', title: 'FIRE Movement', icon: '🔥' },
    { id: 'entrepreneurship', title: 'Teen Entrepreneurship', icon: '🚀' },
    { id: 'financial-goals', title: 'Setting Financial Goals', icon: '🎯' },
    { id: 'ghana-finance', title: 'Ghana Financial System', icon: '🇬🇭' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setShowNavMenu(false);
    }
  };

  // Close navigation menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target as Node)) {
        setShowNavMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Financial Literacy for Students | Complete Money Management Guide - St. Louis Demonstration JHS"
        description="Master financial literacy with our comprehensive guide for students. Learn budgeting, saving, banking, investing, and money management skills essential for financial success in Ghana and beyond."
        keywords="financial literacy, money management, budgeting for students, saving strategies, banking basics, investing for beginners, Ghana finance, teen entrepreneurship, financial education"
        image="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO"
        url="/financialliteracy"
        type="article"
        pageType="educational"
        useGalleryImages={false}
        socialImagePreferences={{
          facebook: "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO",
          twitter: "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO",
          linkedin: "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO",
          whatsapp: "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO"
        }}
      />

      <Header />

      {/* Back Navigation Bar - Sticks directly to header */}
      <div className="bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900 py-2 sm:py-3 md:py-4 sticky top-16 z-40">
        <div className="w-full px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-yellow-700/50 hover:bg-yellow-600/70 text-white font-medium rounded-md sm:rounded-lg shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 text-xs sm:text-sm md:text-base backdrop-blur-sm border border-yellow-500/30 flex-shrink-0"
              >
                <ArrowLeft size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                💰 Financial Literacy
              </h1>
            </div>

            {/* Navigation Menu - Mobile Compact, Desktop Normal */}
            <div className="relative" ref={navMenuRef}>
              <button
                onClick={() => setShowNavMenu(!showNavMenu)}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-yellow-700/50 hover:bg-yellow-600/70 text-white font-medium rounded-md sm:rounded-lg shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 text-xs sm:text-sm md:text-base backdrop-blur-sm border border-yellow-500/30"
              >
                <Menu size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Navigate</span>
                <ChevronDown size={12} className={`sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 transition-transform duration-200 ${showNavMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showNavMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700/50 py-2 z-50">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-700/50">
                    Quick Navigation
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {navigationSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-200 flex items-center gap-2"
                      >
                        <span className="text-base">{section.icon}</span>
                        <span>{section.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div
        className="relative h-48 sm:h-60 md:h-72 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="relative h-full flex items-end justify-start px-3 sm:px-4 pb-6 sm:pb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              💰 Financial Literacy & Wealth Building
            </h1>
            <p className="text-sm sm:text-base text-gray-200 max-w-xl leading-relaxed">
              ✨ Master Money Management, Investment Strategies & Build Lasting Wealth Through Education
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Edge to Edge */}
      <div className="w-full">
        {/* Word Document Style Content - Edge to Edge */}
        <div className="w-full bg-black px-3 sm:px-4 py-6">
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400 underline">
              Complete Guide to Financial Literacy & Wealth Building
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                <strong className="text-yellow-300">Financial literacy is the cornerstone of personal freedom and economic empowerment.</strong> It encompasses the knowledge, skills, and confidence needed to make informed financial decisions that lead to financial security, independence, and wealth creation.
              </p>
            </div>
          </div>

          {/* Financial Literacy Library */}
          <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 p-6 rounded-lg border border-yellow-500/30 mb-8">
            <h3 className="text-xl font-bold mb-4 text-yellow-300">📚 Complete Financial Literacy Library</h3>
            <p className="text-gray-300 mb-6">
              Access our comprehensive collection of 36 premium financial books from legendary investors, successful entrepreneurs, and financial experts.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Classic Financial Wisdom */}
              <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/20">
                <h4 className="text-lg font-semibold text-yellow-200 mb-3">📖 Classic Wisdom</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleBookNavigation('richest-man-babylon', 'The Richest Man in Babylon')}
                    disabled={loadingBook === 'richest-man-babylon'}
                    className="w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'richest-man-babylon' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Richest Man in Babylon
                        {loadingBook === 'richest-man-babylon' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">George Clason</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Modern Financial Strategies */}
              <div className="bg-black/30 rounded-lg p-4 border border-green-500/20">
                <h4 className="text-lg font-semibold text-green-200 mb-3">💡 Modern Strategies</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleBookNavigation('psychology-of-money', 'The Psychology of Money')}
                    disabled={loadingBook === 'psychology-of-money'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'psychology-of-money' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Psychology of Money
                        {loadingBook === 'psychology-of-money' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Morgan Housel</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Investment & Wealth Building */}
              <div className="bg-black/30 rounded-lg p-4 border border-blue-500/20 md:col-span-2 lg:col-span-2">
                <h4 className="text-lg font-semibold text-blue-200 mb-3">📈 Investment & Wealth</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleBookNavigation('intelligent-investor', 'The Intelligent Investor')}
                    disabled={loadingBook === 'intelligent-investor'}
                    className="w-full text-left p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg border border-blue-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'intelligent-investor' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Intelligent Investor
                        {loadingBook === 'intelligent-investor' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Benjamin Graham</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('essays-warren-buffett', 'The Essays of Warren Buffett')}
                    disabled={loadingBook === 'essays-warren-buffett'}
                    className="w-full text-left p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg border border-blue-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'essays-warren-buffett' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Warren Buffett Essays
                        {loadingBook === 'essays-warren-buffett' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Warren Buffett</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/financial-library')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                📚 View Complete Library (36 Books)
              </button>
            </div>
          </div>

          {/* Budgeting Basics Section */}
          <section id="budgeting-basics" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              📊 Budgeting Basics: Your Financial Foundation
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              A budget is simply a plan for your money. It tells your money where to go instead of wondering where it went. Creating and following a budget is the foundation of all financial success.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="sVKQn2R7eys"
                title="How to Budget Your Money Like a Pro"
              />
              <VideoCard
                videoId="7lHNMGoACdQ"
                title="Budgeting for Beginners - How to Make a Budget From Scratch"
              />
            </div>
          </section>

          {/* Saving Strategies Section */}
          <section id="saving-strategies" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              💰 Saving Strategies: Building Your Financial Safety Net
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Saving money is the foundation of financial security. Learn proven strategies to save more money and build wealth over time.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="R2376CwvlZQ"
                title="10 Money Saving Tips That Actually Work"
              />
              <VideoCard
                videoId="1bMFWOlBhF8"
                title="How to Save Money Fast - 20 Money Saving Tips"
              />
            </div>
          </section>

          {/* Banking Fundamentals Section */}
          <section id="banking-fundamentals" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🏦 Banking Fundamentals: Understanding Financial Institutions
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Understanding how banks work and choosing the right banking products is crucial for managing your money effectively.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="PHe0bXAIuk0"
                title="Banking Basics: How Banks Work"
              />
              <VideoCard
                videoId="AecvTErBQY8"
                title="Choosing the Right Bank Account"
              />
            </div>
          </section>

          {/* Credit & Debt Management Section */}
          <section id="credit-debt" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              💳 Credit & Debt Management: Building Good Credit
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Learn how credit works, how to build good credit, and strategies for managing and eliminating debt.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="eikbQPldhPY"
                title="How Credit Scores Work"
              />
              <VideoCard
                videoId="T71ibcZAX3I"
                title="Debt Snowball vs Debt Avalanche"
              />
            </div>
          </section>

          {/* Investing Basics Section */}
          <section id="investing-basics" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              📈 Investing for Beginners: Growing Your Wealth
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Investing is how you build long-term wealth. Learn the basics of investing and how to get started.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="gFQNPmLKj1k"
                title="Investing for Beginners - Stock Market Basics"
              />
              <VideoCard
                videoId="jhaNkF2GNsw"
                title="Index Funds vs Individual Stocks"
              />
            </div>
          </section>

          {/* Advanced Investment Strategies Section */}
          <section id="advanced-investing" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🎯 Advanced Investment Strategies
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Take your investment knowledge to the next level with advanced strategies from world-class investors and financial experts.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="T71ibcZAX3I"
                title="Warren Buffett's Investment Strategy Explained"
              />
              <VideoCard
                videoId="gFQNPmLKj1k"
                title="Ray Dalio: How to Build the Perfect Portfolio"
              />
            </div>
          </section>

          {/* Personal Finance Mastery Section */}
          <section id="finance-mastery" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              💪 Personal Finance Mastery
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Master the essential skills of personal finance with expert guidance from top financial educators.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="HQzoZfc3GwQ"
                title="Two Cents: How to Adult - Personal Finance"
              />
              <VideoCard
                videoId="R2376CwvlZQ"
                title="Khan Academy: Personal Finance Basics"
              />
            </div>
          </section>

          {/* Cryptocurrency & Modern Finance Section */}
          <section id="crypto-modern" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🪙 Cryptocurrency & Modern Finance
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Understand the new world of digital finance, cryptocurrency, and modern financial technologies.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="VYWc9dFqROI"
                title="Cryptocurrency Explained Simply"
              />
              <VideoCard
                videoId="bBC-nXj3Ng4"
                title="Bitcoin vs Traditional Investing"
              />
            </div>
          </section>

          {/* FIRE Movement Section */}
          <section id="fire-movement" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🔥 FIRE Movement: Financial Independence & Early Retirement
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Learn about the FIRE (Financial Independence, Retire Early) movement and how young people are achieving financial freedom.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="eikbQPldhPY"
                title="How to Retire Early - FIRE Movement Explained"
              />
              <VideoCard
                videoId="T71ibcZAX3I"
                title="Living Below Your Means - Extreme Saving"
              />
            </div>
          </section>

          {/* Teen Entrepreneurship Section */}
          <section id="entrepreneurship" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🚀 Teen Entrepreneurship: Starting Your Business Journey
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Learn how to start and grow a business as a teenager. Discover opportunities and strategies for young entrepreneurs.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="gFQNPmLKj1k"
                title="How to Start a Business as a Teenager"
              />
              <VideoCard
                videoId="jhaNkF2GNsw"
                title="Teen Business Ideas That Actually Work"
              />
            </div>
          </section>

          {/* Financial Goals Section */}
          <section id="financial-goals" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🎯 Setting Financial Goals: Planning Your Future
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Learn how to set and achieve financial goals that will help you build the life you want.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="1YyAzVmP9xQ"
                title="How to Set SMART Financial Goals"
              />
              <VideoCard
                videoId="VYWc9dFqROI"
                title="Financial Planning for Young Adults"
              />
            </div>
          </section>

          {/* Ghana Financial System Section */}
          <section id="ghana-finance" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🇬🇭 Ghana Financial System: Local Banking & Investment
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Understanding the Ghanaian financial system, local banks, and investment opportunities in Ghana.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="bBC-nXj3Ng4"
                title="Banking in Ghana: A Complete Guide"
              />
              <VideoCard
                videoId="jhaNkF2GNsw"
                title="Investment Opportunities in Ghana"
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default FinancialLiteracyPage;
