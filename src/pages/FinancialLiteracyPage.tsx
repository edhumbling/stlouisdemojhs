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
        pageType="stem"
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

          {/* Comprehensive Financial Literacy Introduction */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400 underline">
              Complete Guide to Financial Literacy & Wealth Building
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                <strong className="text-yellow-300">Financial literacy is the cornerstone of personal freedom and economic empowerment.</strong> It encompasses the knowledge, skills, and confidence needed to make informed financial decisions that lead to financial security, independence, and wealth creation. In today's complex economic landscape, understanding money management is not optional - it's essential for survival and prosperity.
              </p>

              <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20">
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">🎯 Core Financial Literacy Components</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-yellow-200 mb-2">💰 Money Management</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Budgeting and expense tracking</li>
                      <li>• Cash flow optimization</li>
                      <li>• Emergency fund building</li>
                      <li>• Debt management strategies</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-200 mb-2">📈 Investment Knowledge</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Risk and return principles</li>
                      <li>• Asset allocation strategies</li>
                      <li>• Compound interest mastery</li>
                      <li>• Portfolio diversification</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-200 mb-2">🏦 Banking & Credit</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Banking products and services</li>
                      <li>• Credit scores and reports</li>
                      <li>• Loan types and terms</li>
                      <li>• Interest rate mechanics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-200 mb-2">🎯 Financial Planning</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Goal setting and achievement</li>
                      <li>• Retirement planning</li>
                      <li>• Insurance and protection</li>
                      <li>• Tax optimization strategies</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-yellow-300">The journey to financial mastery begins with understanding fundamental concepts.</strong> Money is a tool that, when properly understood and managed, becomes a powerful force for creating opportunities, security, and freedom. The principles of financial literacy are universal - they apply whether you're earning your first cedi or managing millions in assets.
              </p>

              <div className="bg-gray-900/50 p-6 rounded-lg border border-green-500/20">
                <h3 className="text-xl font-semibold text-green-300 mb-4">🚀 The Wealth Building Formula</h3>
                <p className="mb-4">
                  <strong>Wealth = (Income - Expenses) × Time × Investment Returns</strong>
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-200 mb-2">📊 Income Optimization</h4>
                    <p className="text-gray-300">Maximize earning potential through education, skills development, career advancement, and multiple income streams. Focus on increasing your human capital - your ability to generate income.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-200 mb-2">💸 Expense Management</h4>
                    <p className="text-gray-300">Control spending through conscious budgeting, distinguishing between needs and wants, and optimizing major expenses like housing, transportation, and food.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-200 mb-2">⏰ Time Advantage</h4>
                    <p className="text-gray-300">Start early to harness the power of compound interest. Time is your greatest asset in wealth building - every year you delay costs exponentially.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-200 mb-2">📈 Investment Returns</h4>
                    <p className="text-gray-300">Understand risk-return relationships, diversification principles, and long-term investment strategies that build wealth systematically.</p>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-yellow-300">Financial literacy empowers you to break cycles of financial struggle and build generational wealth.</strong> It's about understanding that every financial decision - from daily spending choices to major investment decisions - either moves you closer to or further from your financial goals. The knowledge you gain today becomes the foundation for a lifetime of financial success.
              </p>

              <div className="bg-gray-900/50 p-6 rounded-lg border border-red-500/20">
                <h3 className="text-xl font-semibold text-red-300 mb-4">⚠️ The Cost of Financial Illiteracy</h3>
                <div className="space-y-3 text-sm">
                  <p><strong className="text-red-200">Debt Traps:</strong> Without understanding interest rates and compound interest, people fall into high-interest debt cycles that can take decades to escape.</p>
                  <p><strong className="text-red-200">Missed Opportunities:</strong> Lack of investment knowledge means missing out on compound growth that could create substantial wealth over time.</p>
                  <p><strong className="text-red-200">Poor Decision Making:</strong> Financial illiteracy leads to emotional money decisions, falling for scams, and choosing inappropriate financial products.</p>
                  <p><strong className="text-red-200">Retirement Insecurity:</strong> Inadequate planning and saving result in financial stress and dependence in later years.</p>
                </div>
              </div>

              <p>
                <strong className="text-yellow-300">This comprehensive library provides you with world-class financial education from legendary investors, successful entrepreneurs, and financial experts.</strong> From timeless classics like "The Richest Man in Babylon" to modern masterpieces like "The Psychology of Money," you have access to the same knowledge that has created countless millionaires and billionaires. Combined with practical videos, real-world examples, and actionable strategies, this education will transform your relationship with money and set you on the path to financial freedom.
              </p>
            </div>
          </div>

          {/* Financial Literacy Library */}
          <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 p-6 rounded-lg border border-yellow-500/30 mb-8">
            <h3 className="text-xl font-bold mb-4 text-yellow-300">📚 Complete Financial Literacy Library</h3>
            <p className="text-gray-300 mb-6">
              Access our comprehensive collection of premium financial education books and resources. Each book opens in a dedicated viewer for the best reading experience.
            </p>

            {/* Financial Books Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                        The Richest Man in Babylon
                        {loadingBook === 'richest-man-babylon' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">George Clason</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('rich-dad-poor-dad', 'Rich Dad Poor Dad')}
                    disabled={loadingBook === 'rich-dad-poor-dad'}
                    className="w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'rich-dad-poor-dad' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Rich Dad Poor Dad
                        {loadingBook === 'rich-dad-poor-dad' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Robert Kiyosaki</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('millionaire-next-door', 'The Millionaire Next Door')}
                    disabled={loadingBook === 'millionaire-next-door'}
                    className="w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'millionaire-next-door' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        The Millionaire Next Door
                        {loadingBook === 'millionaire-next-door' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Stanley & Danko</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Modern Strategies */}
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
                        The Psychology of Money
                        {loadingBook === 'psychology-of-money' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Morgan Housel</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('total-money-makeover', 'The Total Money Makeover')}
                    disabled={loadingBook === 'total-money-makeover'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'total-money-makeover' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        The Total Money Makeover
                        {loadingBook === 'total-money-makeover' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Dave Ramsey</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Investment & Wealth Building */}
              <div className="bg-black/30 rounded-lg p-4 border border-blue-500/20 md:col-span-2 lg:col-span-2">
                <h4 className="text-lg font-semibold text-blue-200 mb-3">📈 Investment & Wealth Building</h4>
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
                        The Intelligent Investor
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

            <div className="text-center mt-6">
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
              💰 Saving Strategies: Building Your Financial Security
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

            <h4 className="text-xl font-semibold mb-4 text-yellow-300">Emergency Fund: Your Financial Safety Net</h4>
            <p className="text-gray-300 mb-4">
              An emergency fund is money set aside for unexpected expenses like medical bills, car repairs, or temporary loss of income. As a student, aim to save at least GH¢500-1000 for emergencies.
            </p>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-green-500/20 mb-6">
              <h4 className="text-lg font-semibold text-green-300 mb-4">💡 Smart Saving Strategies for Students</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-green-200 mb-2">🎯 The 50/30/20 Rule</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• 50% for needs (food, transport)</li>
                    <li>• 30% for wants (entertainment)</li>
                    <li>• 20% for savings and debt</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-200 mb-2">💰 Automatic Savings</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Set up automatic transfers</li>
                    <li>• Save before you spend</li>
                    <li>• Use mobile banking apps</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-200 mb-2">🏆 Challenge Yourself</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• 52-week savings challenge</li>
                    <li>• Round-up savings</li>
                    <li>• No-spend days/weeks</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-200 mb-2">📱 Use Technology</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Savings apps and tools</li>
                    <li>• Expense tracking apps</li>
                    <li>• Goal-based savings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 mb-6">
              <h4 className="text-lg font-semibold text-yellow-300 mb-4">🎯 Student Savings Goals</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <div>
                    <h5 className="font-semibold text-yellow-200">Short-term (1-6 months)</h5>
                    <p className="text-gray-300 text-sm">Emergency fund (GH¢500-1000)</p>
                  </div>
                  <div className="text-yellow-400 font-bold">Priority: High</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <div>
                    <h5 className="font-semibold text-green-200">Medium-term (6 months - 2 years)</h5>
                    <p className="text-gray-300 text-sm">University fees, laptop, skills training</p>
                  </div>
                  <div className="text-green-400 font-bold">Priority: Medium</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <div>
                    <h5 className="font-semibold text-blue-200">Long-term (2+ years)</h5>
                    <p className="text-gray-300 text-sm">Business startup, investment capital</p>
                  </div>
                  <div className="text-blue-400 font-bold">Priority: Future</div>
                </div>
              </div>
            </div>
          </section>

          {/* Banking Fundamentals Section */}
          <section id="banking-fundamentals" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🏦 Banking Fundamentals: Managing Your Money Safely
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Understanding how banks work and choosing the right banking products is essential for managing your money safely and efficiently.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="baoufhsGoIk"
                title="Banking Basics: What is a Bank Account? | Financial Literacy"
              />
              <VideoCard
                videoId="5dMpNccHbVk"
                title="The Best Board Games for Teaching Kids About Money"
              />
            </div>
          </section>

          {/* Credit & Debt Management Section */}
          <section id="credit-debt" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              💳 Credit & Debt Management: Building Good Financial Habits
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Understanding credit and debt is crucial for your financial future. Good credit opens doors to better loan rates, while poor credit can limit your opportunities.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="nziW3yg9Bvc"
                title="What is Social Security? A Simple Explanation for Beginners"
              />
              <VideoCard
                videoId="aHhu6JKfhBs"
                title="Cost Of Living Is TOO EXPENSIVE... How is everyone making it"
              />
            </div>
          </section>

          {/* Investing Basics Section */}
          <section id="investing-basics" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              📈 Investing for Beginners: Growing Your Wealth
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Investing is how you make your money work for you. While saving preserves your money, investing helps it grow over time. Starting early gives you a huge advantage due to compound interest.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="BaLGOmLiB5k"
                title="Types of Sustainable Investing | Intro to ESG Course"
              />
              <VideoCard
                videoId="fjruHJV9L34"
                title="FHSA EXPLAINED: Saving For Your First Home in Canada"
              />
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-blue-500/20 mb-6">
              <h4 className="text-lg font-semibold text-blue-300 mb-4">🎯 Investment Fundamentals</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-blue-200 mb-2">📊 Risk vs Return</h5>
                  <p className="text-gray-300 mb-2">Higher potential returns usually come with higher risk. Understand your risk tolerance.</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Low risk: Savings accounts, bonds</li>
                    <li>• Medium risk: Index funds, ETFs</li>
                    <li>• High risk: Individual stocks, crypto</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-200 mb-2">⏰ Compound Interest Magic</h5>
                  <p className="text-gray-300 mb-2">The earlier you start, the more time your money has to grow exponentially.</p>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-yellow-300 font-semibold">Example:</p>
                    <p className="text-gray-300">GH¢100/month from age 18 = GH¢1.2M by 65</p>
                    <p className="text-gray-300">GH¢100/month from age 28 = GH¢400K by 65</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-200 mb-2">🎯 Diversification</h5>
                  <p className="text-gray-300 mb-2">Don't put all eggs in one basket. Spread investments across:</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Different asset classes</li>
                    <li>• Various industries</li>
                    <li>• Multiple companies</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-200 mb-2">📈 Dollar-Cost Averaging</h5>
                  <p className="text-gray-300 mb-2">Invest a fixed amount regularly, regardless of market conditions.</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Reduces timing risk</li>
                    <li>• Builds discipline</li>
                    <li>• Smooths out volatility</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-green-500/20 mb-6">
              <h4 className="text-lg font-semibold text-green-300 mb-4">🚀 Investment Options for Students</h4>
              <div className="space-y-4">
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-semibold text-green-200 mb-2">📚 Education First</h5>
                  <p className="text-gray-300 text-sm">The best investment is in yourself. Skills, knowledge, and education provide the highest returns.</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-semibold text-blue-200 mb-2">💼 Index Funds & ETFs</h5>
                  <p className="text-gray-300 text-sm">Low-cost, diversified funds that track market indices. Perfect for beginners.</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-semibold text-yellow-200 mb-2">🏢 Blue-Chip Stocks</h5>
                  <p className="text-gray-300 text-sm">Shares in large, established companies with strong track records.</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-semibold text-purple-200 mb-2">🏦 Government Bonds</h5>
                  <p className="text-gray-300 text-sm">Low-risk investments backed by government. Good for conservative portfolios.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Teen Entrepreneurship Section */}
          <section id="entrepreneurship" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🚀 Teen Entrepreneurship: Starting Your Own Business
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Entrepreneurship is a powerful way to build wealth and gain financial independence. Many successful businesses were started by teenagers. The key is to start small, learn from failures, and scale gradually.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="s2DIOOV1z3s"
                title="My Budgeting System for 2025: How I Manage My Money"
              />
              <VideoCard
                videoId="03YBi5do1Ks"
                title="Buying a House at 18 - Real Estate Investing As a Teen"
              />
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-orange-500/20 mb-6">
              <h4 className="text-lg font-semibold text-orange-300 mb-4">💡 Business Ideas for Students</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-orange-200 mb-2">💻 Digital Services</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Social media management</li>
                    <li>• Graphic design services</li>
                    <li>• Website development</li>
                    <li>• Online tutoring</li>
                    <li>• Content creation</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-orange-200 mb-2">🛍️ Physical Products</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Handmade crafts</li>
                    <li>• Food and snacks</li>
                    <li>• Fashion accessories</li>
                    <li>• School supplies</li>
                    <li>• Phone accessories</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-orange-200 mb-2">🎓 Educational Services</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Homework assistance</li>
                    <li>• Language lessons</li>
                    <li>• Music lessons</li>
                    <li>• Sports coaching</li>
                    <li>• Study groups</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-orange-200 mb-2">🏠 Local Services</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Pet sitting</li>
                    <li>• House cleaning</li>
                    <li>• Garden maintenance</li>
                    <li>• Event planning</li>
                    <li>• Delivery services</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-green-500/20 mb-6">
              <h4 className="text-lg font-semibold text-green-300 mb-4">📋 Business Planning Essentials</h4>
              <div className="space-y-4">
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-semibold text-green-200 mb-2">1. Market Research</h5>
                  <p className="text-gray-300 text-sm">Understand your target customers, their needs, and what they're willing to pay. Study your competition and find your unique advantage.</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-semibold text-blue-200 mb-2">2. Financial Planning</h5>
                  <p className="text-gray-300 text-sm">Calculate startup costs, ongoing expenses, and projected revenue. Keep detailed records of all business transactions.</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-semibold text-yellow-200 mb-2">3. Marketing Strategy</h5>
                  <p className="text-gray-300 text-sm">Use social media, word-of-mouth, and local networks to promote your business. Focus on building relationships and providing excellent service.</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-semibold text-purple-200 mb-2">4. Legal Considerations</h5>
                  <p className="text-gray-300 text-sm">Understand basic business laws, tax obligations, and any permits required. Keep your business activities legal and ethical.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Financial Goals Section */}
          <section id="financial-goals" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🎯 Setting Financial Goals: Planning Your Future
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Setting clear financial goals gives direction to your money management efforts. Whether you're saving for a new phone, university fees, or long-term wealth building, having specific goals helps you stay motivated and focused.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="qDVNOA0HU-0"
                title="ETFs vs Mutual Funds | Jill on Money"
              />
              <VideoCard
                videoId="jTW777ENc3c"
                title="Financial Education for Young People"
              />
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/20 mb-6">
              <h4 className="text-lg font-semibold text-purple-300 mb-4">🎯 SMART Financial Goals Framework</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-purple-200 mb-2">S - Specific</h5>
                  <p className="text-gray-300 mb-2">Be clear about what you want to achieve.</p>
                  <div className="bg-black/30 p-2 rounded text-xs">
                    <p className="text-red-300">❌ "Save money"</p>
                    <p className="text-green-300">✅ "Save GH¢2,000 for laptop"</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-purple-200 mb-2">M - Measurable</h5>
                  <p className="text-gray-300 mb-2">Track your progress with numbers.</p>
                  <div className="bg-black/30 p-2 rounded text-xs">
                    <p className="text-green-300">✅ "Save GH¢200 per month"</p>
                    <p className="text-green-300">✅ "Reduce expenses by 15%"</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-purple-200 mb-2">A - Achievable</h5>
                  <p className="text-gray-300 mb-2">Set realistic goals based on your income.</p>
                  <div className="bg-black/30 p-2 rounded text-xs">
                    <p className="text-red-300">❌ "Save GH¢5,000/month on GH¢1,000 income"</p>
                    <p className="text-green-300">✅ "Save GH¢200/month on GH¢1,000 income"</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-purple-200 mb-2">R - Relevant</h5>
                  <p className="text-gray-300 mb-2">Align goals with your values and priorities.</p>
                  <div className="bg-black/30 p-2 rounded text-xs">
                    <p className="text-green-300">✅ Education fund for university</p>
                    <p className="text-green-300">✅ Emergency fund for security</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <h5 className="font-semibold text-purple-200 mb-2">T - Time-bound</h5>
                  <p className="text-gray-300 mb-2">Set deadlines to create urgency and focus.</p>
                  <div className="bg-black/30 p-2 rounded text-xs">
                    <p className="text-green-300">✅ "Save GH¢2,000 for laptop by December 2025"</p>
                    <p className="text-green-300">✅ "Build GH¢1,000 emergency fund in 6 months"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 mb-6">
              <h4 className="text-lg font-semibold text-yellow-300 mb-4">📊 Student Financial Goal Categories</h4>
              <div className="space-y-4">
                <div className="p-4 bg-black/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold text-red-200">🚨 Emergency Goals (Priority 1)</h5>
                    <span className="text-red-400 text-sm font-bold">URGENT</span>
                  </div>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Emergency fund (GH¢500-1,000)</li>
                    <li>• Health insurance or medical fund</li>
                    <li>• Transportation backup fund</li>
                  </ul>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold text-yellow-200">📚 Education Goals (Priority 2)</h5>
                    <span className="text-yellow-400 text-sm font-bold">HIGH</span>
                  </div>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• University tuition and fees</li>
                    <li>• Laptop and study materials</li>
                    <li>• Professional courses and certifications</li>
                    <li>• Books and educational resources</li>
                  </ul>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold text-green-200">🎯 Personal Goals (Priority 3)</h5>
                    <span className="text-green-400 text-sm font-bold">MEDIUM</span>
                  </div>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• New smartphone or gadgets</li>
                    <li>• Fashion and personal items</li>
                    <li>• Travel and experiences</li>
                    <li>• Hobbies and entertainment</li>
                  </ul>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold text-blue-200">🚀 Wealth Building Goals (Priority 4)</h5>
                    <span className="text-blue-400 text-sm font-bold">LONG-TERM</span>
                  </div>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Investment portfolio start (GH¢1,000+)</li>
                    <li>• Business startup capital</li>
                    <li>• Real estate down payment fund</li>
                    <li>• Retirement savings (start early!)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-green-500/20 mb-6">
              <h4 className="text-lg font-semibold text-green-300 mb-4">📈 Goal Achievement Strategies</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-green-200 mb-2">🔄 Break Down Big Goals</h5>
                  <p className="text-gray-300 mb-2">Divide large goals into smaller, manageable steps.</p>
                  <div className="bg-black/30 p-2 rounded text-xs">
                    <p className="text-yellow-300">Goal: GH¢2,400 laptop in 12 months</p>
                    <p className="text-green-300">→ GH¢200 per month</p>
                    <p className="text-green-300">→ GH¢50 per week</p>
                    <p className="text-green-300">→ GH¢7 per day</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-green-200 mb-2">📱 Use Technology</h5>
                  <p className="text-gray-300 mb-2">Leverage apps and tools to track progress.</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Savings apps with goal tracking</li>
                    <li>• Calendar reminders</li>
                    <li>• Progress visualization charts</li>
                    <li>• Automatic transfers</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-200 mb-2">🎉 Celebrate Milestones</h5>
                  <p className="text-gray-300 mb-2">Reward yourself for reaching mini-goals.</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• 25% progress: Small treat</li>
                    <li>• 50% progress: Fun activity</li>
                    <li>• 75% progress: Special meal</li>
                    <li>• 100% progress: Major celebration</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-200 mb-2">👥 Get Support</h5>
                  <p className="text-gray-300 mb-2">Share goals with family and friends for accountability.</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Tell trusted friends your goals</li>
                    <li>• Join savings challenges</li>
                    <li>• Find an accountability partner</li>
                    <li>• Regular progress check-ins</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Ghana Financial System Section */}
          <section id="ghana-finance" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🇬🇭 Ghana Financial System: Local Context
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Understanding Ghana's financial system is crucial for making informed financial decisions. Learn about local banking, investment opportunities, government programs, and economic factors that affect your money.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <VideoCard
                videoId="_qEmKVNcC60"
                title="Career Possibilities - Financial Planning Careers"
              />
              <VideoCard
                videoId="Q5rQ2r-Ggx0"
                title="Personal Finance Education for Students"
              />
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-red-500/20 mb-6">
              <h4 className="text-lg font-semibold text-red-300 mb-4">🏦 Major Banks in Ghana</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-red-200 mb-2">🏛️ Universal Banks</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Ghana Commercial Bank (GCB)</li>
                    <li>• Ecobank Ghana</li>
                    <li>• Standard Chartered Bank</li>
                    <li>• Absa Bank Ghana</li>
                    <li>• Fidelity Bank Ghana</li>
                    <li>• Zenith Bank Ghana</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-red-200 mb-2">📱 Digital Banking</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Mobile money services</li>
                    <li>• Internet banking platforms</li>
                    <li>• USSD banking codes</li>
                    <li>• Digital wallet services</li>
                    <li>• QR code payments</li>
                    <li>• ATM network access</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-green-500/20 mb-6">
              <h4 className="text-lg font-semibold text-green-300 mb-4">💰 Investment Opportunities in Ghana</h4>
              <div className="space-y-4">
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-semibold text-green-200 mb-2">📈 Ghana Stock Exchange (GSE)</h5>
                  <p className="text-gray-300 text-sm mb-2">Invest in publicly listed Ghanaian companies through the stock market.</p>
                  <ul className="space-y-1 text-gray-300 text-xs">
                    <li>• Blue-chip stocks: MTN Ghana, Ecobank, CAL Bank</li>
                    <li>• Minimum investment: As low as GH¢100</li>
                    <li>• Trading through licensed brokers</li>
                  </ul>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-semibold text-yellow-200 mb-2">🏛️ Government Securities</h5>
                  <p className="text-gray-300 text-sm mb-2">Low-risk investments backed by the Government of Ghana.</p>
                  <ul className="space-y-1 text-gray-300 text-xs">
                    <li>• Treasury Bills (91, 182, 364 days)</li>
                    <li>• Government Bonds (2-20 years)</li>
                    <li>• Minimum investment: GH¢100</li>
                  </ul>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h5 className="font-semibold text-blue-200 mb-2">🏢 Mutual Funds</h5>
                  <p className="text-gray-300 text-sm mb-2">Professionally managed investment portfolios.</p>
                  <ul className="space-y-1 text-gray-300 text-xs">
                    <li>• Databank, EDC, SIC mutual funds</li>
                    <li>• Diversified investment options</li>
                    <li>• Professional fund management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-blue-500/20 mb-6">
              <h4 className="text-lg font-semibold text-blue-300 mb-4">🎓 Financial Education Resources in Ghana</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-blue-200 mb-2">🏛️ Government Initiatives</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Bank of Ghana financial literacy programs</li>
                    <li>• Ministry of Education financial education</li>
                    <li>• Ghana Association of Banks programs</li>
                    <li>• Securities and Exchange Commission education</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-200 mb-2">🏢 Private Sector Programs</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Bank-sponsored financial literacy</li>
                    <li>• Insurance company education programs</li>
                    <li>• Investment firm workshops</li>
                    <li>• NGO financial inclusion projects</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default FinancialLiteracyPage;
