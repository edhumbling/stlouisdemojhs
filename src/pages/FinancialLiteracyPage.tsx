import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, DollarSign, Play, X as CloseIcon, Menu, ChevronDown } from 'lucide-react';
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

  const handleBookNavigation = (bookId: string, bookTitle: string) => {
    setLoadingBook(bookId);
    // Add a small delay to show the loading effect
    setTimeout(() => {
      navigate(`/financial-library/${bookId}`);
    }, 500);
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
              <p className="text-sm font-semibold text-white bg-black/70 rounded px-2 py-1">{title}</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              className="w-full aspect-video border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => toggleVideo(videoId)}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 rounded-full p-2 transition-colors duration-200"
            >
              <CloseIcon size={16} className="text-white" />
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
    <div className="min-h-screen bg-black text-white -mt-16 pt-16">
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
                  {navigationSections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-yellow-600/30 transition-colors duration-200 text-sm"
                    >
                      <span className="text-lg">{section.icon}</span>
                      <span className="text-white font-medium">{section.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header Image Section - Money & Finance */}
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
                  <button
                    onClick={() => handleBookNavigation('your-money-or-your-life', 'Your Money or Your Life')}
                    disabled={loadingBook === 'your-money-or-your-life'}
                    className="w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'your-money-or-your-life' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Your Money or Your Life
                        {loadingBook === 'your-money-or-your-life' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Vicki Robin & Joe Dominguez</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('wealthy-barber', 'The Wealthy Barber')}
                    disabled={loadingBook === 'wealthy-barber'}
                    className="w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'wealthy-barber' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        The Wealthy Barber
                        {loadingBook === 'wealthy-barber' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">David Chilton</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('science-getting-rich', 'The Science of Getting Rich')}
                    disabled={loadingBook === 'science-getting-rich'}
                    className="w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'science-getting-rich' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        The Science of Getting Rich
                        {loadingBook === 'science-getting-rich' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Wallace D. Wattles</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Modern Strategies */}
              <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/20">
                <h4 className="text-lg font-semibold text-yellow-200 mb-3">💡 Modern Strategies</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleBookNavigation('psychology-of-money', 'The Psychology of Money')}
                    disabled={loadingBook === 'psychology-of-money'}
                    className="w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
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
                    className="w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
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
                  <button
                    onClick={() => handleBookNavigation('if-you-can', 'If You Can')}
                    disabled={loadingBook === 'if-you-can'}
                    className="w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'if-you-can' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        If You Can
                        {loadingBook === 'if-you-can' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">William Bernstein</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('cashflow-quadrant', 'The Cashflow Quadrant')}
                    disabled={loadingBook === 'cashflow-quadrant'}
                    className="w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'cashflow-quadrant' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        The Cashflow Quadrant
                        {loadingBook === 'cashflow-quadrant' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Robert Kiyosaki</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('simple-dollar-guide', 'Everything You Need to Know About Personal Finance')}
                    disabled={loadingBook === 'simple-dollar-guide'}
                    className="w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'simple-dollar-guide' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Simple Dollar Guide
                        {loadingBook === 'simple-dollar-guide' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Trent Hamm</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Investment & Wealth Building */}
              <div className="bg-black/30 rounded-lg p-4 border border-green-500/20 md:col-span-2 lg:col-span-4">
                <h4 className="text-lg font-semibold text-green-200 mb-3">📈 Investment & Wealth Building</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleBookNavigation('intelligent-investor', 'The Intelligent Investor')}
                    disabled={loadingBook === 'intelligent-investor'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
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
                    onClick={() => handleBookNavigation('automatic-millionaire', 'The Automatic Millionaire')}
                    disabled={loadingBook === 'automatic-millionaire'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'automatic-millionaire' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        The Automatic Millionaire
                        {loadingBook === 'automatic-millionaire' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">David Bach</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('little-book-common-sense-investing', 'The Little Book of Common Sense Investing')}
                    disabled={loadingBook === 'little-book-common-sense-investing'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'little-book-common-sense-investing' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Common Sense Investing
                        {loadingBook === 'little-book-common-sense-investing' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">John C. Bogle</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('random-walk-wall-street', 'A Random Walk Down Wall Street')}
                    disabled={loadingBook === 'random-walk-wall-street'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'random-walk-wall-street' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Random Walk Wall Street
                        {loadingBook === 'random-walk-wall-street' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Burton Malkiel</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('dhandho-investor', 'The Dhandho Investor')}
                    disabled={loadingBook === 'dhandho-investor'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'dhandho-investor' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        The Dhandho Investor
                        {loadingBook === 'dhandho-investor' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Mohnish Pabrai</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('little-book-value-investing', 'The Little Book of Value Investing')}
                    disabled={loadingBook === 'little-book-value-investing'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'little-book-value-investing' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Value Investing
                        {loadingBook === 'little-book-value-investing' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Christopher Browne</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('little-book-bull-moves', 'The Little Book of Bull Moves')}
                    disabled={loadingBook === 'little-book-bull-moves'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'little-book-bull-moves' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Bull Moves Bear Markets
                        {loadingBook === 'little-book-bull-moves' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Peter Schiff</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('little-book-beats-market', 'The Little Book That Still Beats the Market')}
                    disabled={loadingBook === 'little-book-beats-market'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'little-book-beats-market' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Beats the Market
                        {loadingBook === 'little-book-beats-market' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Joel Greenblatt</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('essays-warren-buffett', 'The Essays of Warren Buffett')}
                    disabled={loadingBook === 'essays-warren-buffett'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
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
                  <button
                    onClick={() => handleBookNavigation('coffeehouse-investor', 'The Coffeehouse Investor')}
                    disabled={loadingBook === 'coffeehouse-investor'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'coffeehouse-investor' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Coffeehouse Investor
                        {loadingBook === 'coffeehouse-investor' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Bill Schultheis</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('lazy-persons-investing', 'The Lazy Person\'s Guide to Investing')}
                    disabled={loadingBook === 'lazy-persons-investing'}
                    className="w-full text-left p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg border border-green-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'lazy-persons-investing' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Lazy Person's Investing
                        {loadingBook === 'lazy-persons-investing' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Paul Farrell</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Economic Education - NEW SECTION */}
              <div className="bg-black/30 rounded-lg p-4 border border-blue-500/20">
                <h4 className="text-lg font-semibold text-blue-200 mb-3">🌍 Economic Education</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleBookNavigation('how-economy-grows', 'How an Economy Grows and Why It Crashes')}
                    disabled={loadingBook === 'how-economy-grows'}
                    className="w-full text-left p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg border border-blue-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'how-economy-grows' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        How an Economy Grows
                        {loadingBook === 'how-economy-grows' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Peter & Andrew Schiff</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Government Resources */}
              <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/20">
                <h4 className="text-lg font-semibold text-yellow-200 mb-3">🏛️ Official Resources</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleBookNavigation('practical-money-skills', 'Practical Money Skills')}
                    disabled={loadingBook === 'practical-money-skills'}
                    className="w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'practical-money-skills' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Practical Money Skills
                        {loadingBook === 'practical-money-skills' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Visa Foundation</div>
                    </div>
                  </button>
                  <a
                    href="https://www.fdic.gov/consumer-resource-center/money-smart-young-people"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-colors duration-200"
                  >
                    <div className="font-medium text-white">FDIC Money Smart</div>
                    <div className="text-sm text-gray-300">Government Resource</div>
                  </a>
                  <a
                    href="https://www.federalreserve.gov/pubs/bulletin/2004/autumn04_fined.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 transition-colors duration-200"
                  >
                    <div className="font-medium text-white">Building Wealth Guide</div>
                    <div className="text-sm text-gray-300">Federal Reserve</div>
                  </a>
                </div>
              </div>

              {/* Mindset & Success */}
              <div className="bg-black/30 rounded-lg p-4 border border-red-500/20 md:col-span-2 lg:col-span-4">
                <h4 className="text-lg font-semibold text-red-200 mb-3">🧠 Mindset & Success</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  <button
                    onClick={() => handleBookNavigation('think-and-grow-rich', 'Think and Grow Rich')}
                    disabled={loadingBook === 'think-and-grow-rich'}
                    className="w-full text-left p-3 bg-red-600/20 hover:bg-red-600/30 rounded-lg border border-red-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'think-and-grow-rich' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Think and Grow Rich
                        {loadingBook === 'think-and-grow-rich' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Napoleon Hill</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('compound-effect', 'The Compound Effect')}
                    disabled={loadingBook === 'compound-effect'}
                    className="w-full text-left p-3 bg-red-600/20 hover:bg-red-600/30 rounded-lg border border-red-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'compound-effect' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        The Compound Effect
                        {loadingBook === 'compound-effect' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Darren Hardy</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('atomic-habits', 'Atomic Habits')}
                    disabled={loadingBook === 'atomic-habits'}
                    className="w-full text-left p-3 bg-red-600/20 hover:bg-red-600/30 rounded-lg border border-red-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'atomic-habits' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Atomic Habits
                        {loadingBook === 'atomic-habits' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">James Clear</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Entrepreneurship & Business */}
              <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20 md:col-span-2 lg:col-span-4">
                <h4 className="text-lg font-semibold text-purple-200 mb-3">🚀 Entrepreneurship & Business</h4>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                  <button
                    onClick={() => handleBookNavigation('four-hour-workweek', 'The 4-Hour Workweek')}
                    disabled={loadingBook === 'four-hour-workweek'}
                    className="w-full text-left p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg border border-purple-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'four-hour-workweek' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        The 4-Hour Workweek
                        {loadingBook === 'four-hour-workweek' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Tim Ferriss</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('lean-startup', 'The Lean Startup')}
                    disabled={loadingBook === 'lean-startup'}
                    className="w-full text-left p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg border border-purple-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'lean-startup' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        The Lean Startup
                        {loadingBook === 'lean-startup' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Eric Ries</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('e-myth-revisited', 'The E-Myth Revisited')}
                    disabled={loadingBook === 'e-myth-revisited'}
                    className="w-full text-left p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg border border-purple-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'e-myth-revisited' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        The E-Myth Revisited
                        {loadingBook === 'e-myth-revisited' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Michael E. Gerber</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('zero-to-one', 'Zero to One')}
                    disabled={loadingBook === 'zero-to-one'}
                    className="w-full text-left p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg border border-purple-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'zero-to-one' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Zero to One
                        {loadingBook === 'zero-to-one' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Peter Thiel</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleBookNavigation('millionaire-fastlane', 'The Millionaire Fastlane')}
                    disabled={loadingBook === 'millionaire-fastlane'}
                    className="w-full text-left p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg border border-purple-500/30 transition-all duration-200 relative overflow-hidden disabled:opacity-70"
                  >
                    {loadingBook === 'millionaire-fastlane' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative">
                      <div className="font-medium text-white flex items-center gap-2">
                        Millionaire Fastlane
                        {loadingBook === 'millionaire-fastlane' && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">MJ DeMarco</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Financial Literacy Matters */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
            Why Financial Literacy Matters for Students
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20">
              <h4 className="text-xl font-semibold mb-3 text-yellow-300">🎯 Build Wealth Early</h4>
              <p className="text-gray-300">
                Starting to save and invest as a teenager gives you decades of compound growth. Even small amounts saved now can grow into substantial wealth by the time you retire.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20">
              <h4 className="text-xl font-semibold mb-3 text-yellow-300">🚫 Avoid Debt Traps</h4>
              <p className="text-gray-300">
                Understanding credit, loans, and debt management helps you avoid costly financial mistakes that can take years to recover from.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20">
              <h4 className="text-xl font-semibold mb-3 text-yellow-300">🎓 Fund Your Education</h4>
              <p className="text-gray-300">
                Learn how to save for university, apply for scholarships, and manage student finances effectively to minimize educational debt.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20">
              <h4 className="text-xl font-semibold mb-3 text-yellow-300">🚀 Entrepreneurial Success</h4>
              <p className="text-gray-300">
                Financial literacy is essential for starting and running a successful business, managing cash flow, and making profitable decisions.
              </p>
            </div>
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

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <VideoCard
              videoId="LKxOamnP8J4"
              title="Budgeting and the 50:30:20 rule - Khan Academy"
            />
            <VideoCard
              videoId="eDB8YWeEkxA"
              title="Essential Life Skills for Teens | A Simple Budget"
            />
          </div>

          <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 mb-6">
            <h4 className="text-xl font-semibold mb-4 text-yellow-300">The 50/30/20 Rule for Students</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-300"><strong>50% - Needs:</strong> Essential expenses like school supplies, transportation, basic clothing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300"><strong>30% - Wants:</strong> Entertainment, dining out, hobbies, non-essential purchases</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300"><strong>20% - Savings:</strong> Emergency fund, future goals, investments</span>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-300">Creating Your First Budget</h4>
          <ol className="list-decimal list-inside space-y-3 text-gray-300 mb-6">
            <li><strong>Track your income:</strong> List all money coming in (allowance, part-time job, gifts)</li>
            <li><strong>List your expenses:</strong> Write down everything you spend money on</li>
            <li><strong>Categorize expenses:</strong> Separate needs from wants</li>
            <li><strong>Set spending limits:</strong> Assign dollar amounts to each category</li>
            <li><strong>Track and adjust:</strong> Monitor your spending and adjust as needed</li>
          </ol>

          <div className="grid grid-cols-2 gap-6">
            <VideoCard
              videoId="sNocjsSSRkE"
              title="Budgeting for Teens - Practical Guide"
            />
            <VideoCard
              videoId="olyeIM3V8HE"
              title="Budgeting Activities for Students"
            />
          </div>
        </section>

        {/* Saving Strategies Section */}
        <section id="saving-strategies" className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
            💰 Saving Strategies: Building Your Financial Security
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Saving money is the cornerstone of financial security. It provides a safety net for emergencies and helps you achieve your financial goals. The key is to start early and be consistent.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <VideoCard
              videoId="cnW_HDIBmz4"
              title="Why and how to save - Khan Academy"
            />
            <VideoCard
              videoId="ouvbeb2wSGA"
              title="Financial Literacy In 63 Minutes - Complete Course"
            />
          </div>

          <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 mb-6">
            <h4 className="text-xl font-semibold mb-4 text-yellow-300">Smart Saving Strategies for Students</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-yellow-200 mb-2">🎯 Goal-Based Saving</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Set specific savings goals</li>
                  <li>• Create separate savings for different goals</li>
                  <li>• Use visual reminders and progress tracking</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-yellow-200 mb-2">⚡ Automatic Saving</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Set up automatic transfers</li>
                  <li>• Save before you spend</li>
                  <li>• Use the "pay yourself first" principle</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-yellow-200 mb-2">🏆 Challenge Yourself</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 52-week savings challenge</li>
                  <li>• Round-up savings</li>
                  <li>• No-spend challenges</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-yellow-200 mb-2">💡 Smart Spending</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Compare prices before buying</li>
                  <li>• Use student discounts</li>
                  <li>• Buy generic brands when possible</li>
                </ul>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-300">Emergency Fund: Your Financial Safety Net</h4>
          <p className="text-gray-300 mb-4">
            An emergency fund is money set aside for unexpected expenses like medical bills, car repairs, or temporary loss of income. As a student, aim to save at least GH¢500-1000 for emergencies.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <VideoCard
              videoId="nzIAe8WSSqE"
              title="Short, Medium and Long Term Financial Goals - Khan Academy"
            />
            <VideoCard
              videoId="B-vu01ZS6pg"
              title="Games That Can Teach You About Money! - Two Cents"
            />
          </div>


        </section>

        {/* Banking Fundamentals Section */}
        <section id="banking-fundamentals" className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
            🏦 Banking Fundamentals: Managing Your Money Safely
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Understanding how banks work and choosing the right banking products is essential for managing your money safely and efficiently. Learn about different types of accounts, fees, and banking services.
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

          <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 mb-6">
            <h4 className="text-xl font-semibold mb-4 text-yellow-300">Types of Bank Accounts</h4>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h5 className="font-semibold text-green-400 mb-2">Savings Account</h5>
                <p className="text-gray-300 text-sm">
                  Earns interest on your money, perfect for emergency funds and short-term goals. Limited withdrawals per month.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h5 className="font-semibold text-blue-400 mb-2">Checking Account</h5>
                <p className="text-gray-300 text-sm">
                  For daily transactions, bill payments, and debit card purchases. Usually no withdrawal limits but lower interest.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h5 className="font-semibold text-purple-400 mb-2">Student Account</h5>
                <p className="text-gray-300 text-sm">
                  Special accounts for students with reduced fees, lower minimum balances, and educational resources.
                </p>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-300">Banking in Ghana: What Students Need to Know</h4>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20">
              <h5 className="font-semibold text-yellow-200 mb-3">Major Banks in Ghana</h5>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Ghana Commercial Bank (GCB)</li>
                <li>• Ecobank Ghana</li>
                <li>• Standard Chartered Bank</li>
                <li>• Absa Bank Ghana</li>
                <li>• Fidelity Bank Ghana</li>
                <li>• Zenith Bank Ghana</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20">
              <h5 className="font-semibold text-yellow-200 mb-3">Mobile Money Services</h5>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• MTN Mobile Money</li>
                <li>• Vodafone Cash</li>
                <li>• AirtelTigo Money</li>
                <li>• Zeepay</li>
                <li>• G-Money</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Credit and Debt Management Section */}
        <section id="credit-debt" className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
            💳 Credit & Debt Management: Building Good Financial Habits
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Understanding credit and debt is crucial for your financial future. Good credit opens doors to better loan rates, while poor credit can limit your opportunities. Learn how to build and maintain good credit while avoiding debt traps.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <VideoCard
              videoId="nziW3yg9Bvc"
              title="What is Social Security? A Simple Explanation for Beginners"
            />
            <VideoCard
              videoId="aHhu6JKfhBs"
              title="Cost Of Living Is TOO EXPENSIVE… How is everyone making it"
            />
          </div>

          <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 mb-6">
            <h4 className="text-xl font-semibold mb-4 text-yellow-300">Building Good Credit Habits</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-yellow-200 mb-2">✅ Do These Things</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Pay all bills on time</li>
                  <li>• Keep credit utilization low (under 30%)</li>
                  <li>• Monitor your credit report regularly</li>
                  <li>• Start with a secured credit card</li>
                  <li>• Keep old accounts open</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-red-400 mb-2">❌ Avoid These Mistakes</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Missing payments</li>
                  <li>• Maxing out credit cards</li>
                  <li>• Applying for too many cards at once</li>
                  <li>• Closing old credit accounts</li>
                  <li>• Ignoring your credit report</li>
                </ul>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-300">Student Loans and Educational Debt</h4>
          <p className="text-gray-300 mb-4">
            If you plan to attend university, understanding student loans is essential. Learn about different types of loans, interest rates, and repayment options to make informed decisions about financing your education.
          </p>

          <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20 mb-6">
            <h5 className="font-semibold text-yellow-200 mb-3">Student Loan Tips for Ghana</h5>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Research scholarship opportunities first</li>
              <li>• Consider public universities for lower costs</li>
              <li>• Apply for government student loan schemes</li>
              <li>• Work part-time to reduce borrowing needs</li>
              <li>• Understand repayment terms before borrowing</li>
            </ul>
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

          <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 mb-6">
            <h4 className="text-xl font-semibold mb-4 text-yellow-300">Investment Options for Students</h4>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h5 className="font-semibold text-green-400 mb-2">High-Yield Savings Accounts</h5>
                <p className="text-gray-300 text-sm">
                  Safe option that earns more interest than regular savings. Perfect for emergency funds and short-term goals.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h5 className="font-semibold text-blue-400 mb-2">Government Bonds</h5>
                <p className="text-gray-300 text-sm">
                  Low-risk investment backed by the government. Good for conservative investors who want steady returns.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h5 className="font-semibold text-purple-400 mb-2">Index Funds</h5>
                <p className="text-gray-300 text-sm">
                  Diversified investment that tracks market performance. Good for long-term growth with moderate risk.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h5 className="font-semibold text-orange-400 mb-2">Education Savings Plans</h5>
                <p className="text-gray-300 text-sm">
                  Special accounts designed for education expenses with tax advantages and growth potential.
                </p>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-300">Investment Principles for Young People</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20 text-center">
              <div className="text-2xl mb-2">⏰</div>
              <h5 className="font-semibold text-yellow-200 mb-2">Start Early</h5>
              <p className="text-sm text-gray-300">Time is your biggest advantage. Even small amounts grow significantly over decades.</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h5 className="font-semibold text-yellow-200 mb-2">Diversify</h5>
              <p className="text-sm text-gray-300">Don't put all your eggs in one basket. Spread risk across different investments.</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20 text-center">
              <div className="text-2xl mb-2">📚</div>
              <h5 className="font-semibold text-yellow-200 mb-2">Keep Learning</h5>
              <p className="text-sm text-gray-300">Stay informed about markets and investment strategies. Knowledge reduces risk.</p>
            </div>
          </div>
        </section>

        {/* Teen Entrepreneurship Section */}
        <section id="entrepreneurship" className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
            🚀 Teen Entrepreneurship: Starting Your Own Business
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Entrepreneurship is a powerful way to build wealth and gain financial independence. Many successful businesses were started by teenagers. Learn the basics of starting and running a business while you're still in school.
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

          <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 mb-6">
            <h4 className="text-xl font-semibold mb-4 text-yellow-300">Business Ideas for Students in Ghana</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-yellow-200 mb-2">💻 Digital Services</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Social media management</li>
                  <li>• Graphic design services</li>
                  <li>• Website creation</li>
                  <li>• Online tutoring</li>
                  <li>• Content creation</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-yellow-200 mb-2">🛍️ Physical Products</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Handmade crafts</li>
                  <li>• Food and snacks</li>
                  <li>• School supplies</li>
                  <li>• Fashion accessories</li>
                  <li>• Mobile phone accessories</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-yellow-200 mb-2">🎓 Educational Services</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Homework help</li>
                  <li>• Test preparation</li>
                  <li>• Language lessons</li>
                  <li>• Computer training</li>
                  <li>• Study groups</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-yellow-200 mb-2">🏠 Local Services</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• House cleaning</li>
                  <li>• Pet sitting</li>
                  <li>• Lawn care</li>
                  <li>• Delivery services</li>
                  <li>• Event planning</li>
                </ul>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-300">Steps to Start Your Business</h4>
          <ol className="list-decimal list-inside space-y-3 text-gray-300 mb-6">
            <li><strong>Identify a problem to solve:</strong> Look for needs in your community or school</li>
            <li><strong>Research your market:</strong> Understand your customers and competition</li>
            <li><strong>Create a simple business plan:</strong> Outline your goals, costs, and revenue projections</li>
            <li><strong>Start small:</strong> Test your idea with minimal investment</li>
            <li><strong>Track your finances:</strong> Keep detailed records of income and expenses</li>
            <li><strong>Reinvest profits:</strong> Use earnings to grow your business</li>
            <li><strong>Learn from failures:</strong> Every setback is a learning opportunity</li>
          </ol>
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

          <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 mb-6">
            <h4 className="text-xl font-semibold mb-4 text-yellow-300">Types of Financial Goals</h4>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h5 className="font-semibold text-green-400 mb-2">Short-term Goals (1-12 months)</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• New smartphone or laptop</li>
                  <li>• School trip or excursion</li>
                  <li>• Emergency fund (GH¢500-1000)</li>
                  <li>• Birthday or holiday gifts</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h5 className="font-semibold text-blue-400 mb-2">Medium-term Goals (1-5 years)</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• University tuition and fees</li>
                  <li>• Study abroad program</li>
                  <li>• First car or motorcycle</li>
                  <li>• Starting a business</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h5 className="font-semibold text-purple-400 mb-2">Long-term Goals (5+ years)</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• House down payment</li>
                  <li>• Retirement savings</li>
                  <li>• Investment portfolio</li>
                  <li>• Financial independence</li>
                </ul>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-300">SMART Goal Setting Framework</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div className="bg-gray-900/50 p-3 rounded-lg border border-yellow-500/20 text-center">
              <div className="text-lg font-bold text-yellow-400 mb-1">S</div>
              <div className="text-xs text-gray-300">Specific</div>
            </div>
            <div className="bg-gray-900/50 p-3 rounded-lg border border-yellow-500/20 text-center">
              <div className="text-lg font-bold text-yellow-400 mb-1">M</div>
              <div className="text-xs text-gray-300">Measurable</div>
            </div>
            <div className="bg-gray-900/50 p-3 rounded-lg border border-yellow-500/20 text-center">
              <div className="text-lg font-bold text-yellow-400 mb-1">A</div>
              <div className="text-xs text-gray-300">Achievable</div>
            </div>
            <div className="bg-gray-900/50 p-3 rounded-lg border border-yellow-500/20 text-center">
              <div className="text-lg font-bold text-yellow-400 mb-1">R</div>
              <div className="text-xs text-gray-300">Relevant</div>
            </div>
            <div className="bg-gray-900/50 p-3 rounded-lg border border-yellow-500/20 text-center">
              <div className="text-lg font-bold text-yellow-400 mb-1">T</div>
              <div className="text-xs text-gray-300">Time-bound</div>
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

          <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 mb-6">
            <h4 className="text-xl font-semibold mb-4 text-yellow-300">Key Financial Institutions in Ghana</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-yellow-200 mb-2">🏛️ Regulatory Bodies</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Bank of Ghana (Central Bank)</li>
                  <li>• Securities and Exchange Commission</li>
                  <li>• National Insurance Commission</li>
                  <li>• Ghana Stock Exchange</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-yellow-200 mb-2">💼 Investment Options</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Government Treasury Bills</li>
                  <li>• Fixed Deposits</li>
                  <li>• Mutual Funds</li>
                  <li>• Ghana Stock Exchange</li>
                </ul>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-4 text-yellow-300">Student Financial Programs in Ghana</h4>
          <div className="space-y-4 mb-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20">
              <h5 className="font-semibold text-yellow-200 mb-2">🎓 Student Loan Trust Fund (SLTF)</h5>
              <p className="text-gray-300 text-sm">
                Government program providing loans to Ghanaian students for tertiary education. Offers competitive interest rates and flexible repayment terms.
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20">
              <h5 className="font-semibold text-yellow-200 mb-2">🏆 Scholarship Opportunities</h5>
              <p className="text-gray-300 text-sm">
                Various scholarships available from government, private organizations, and international bodies. Research and apply early for best chances.
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20">
              <h5 className="font-semibold text-yellow-200 mb-2">💰 Youth Employment Programs</h5>
              <p className="text-gray-300 text-sm">
                Government initiatives like Youth Employment Agency (YEA) provide job opportunities and entrepreneurship support for young people.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
            🎉 Your Financial Journey Starts Now
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Congratulations on taking the first step toward financial literacy! Remember, building wealth and achieving financial independence is a marathon, not a sprint. Start with small, consistent actions and gradually build more sophisticated financial habits.
          </p>

          <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 p-6 rounded-lg border border-yellow-500/30 mb-6">
            <h4 className="text-xl font-semibold mb-4 text-yellow-300">Your Next Steps</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Create your first budget using the 50/30/20 rule</li>
              <li>Open a savings account and start your emergency fund</li>
              <li>Set three financial goals (short, medium, and long-term)</li>
              <li>Track your spending for one month</li>
              <li>Research scholarship opportunities for your future education</li>
              <li>Consider starting a small business or side hustle</li>
              <li>Continue learning about personal finance and investing</li>
            </ol>
          </div>

          <div className="text-center mb-8">
            <p className="text-lg text-yellow-300 font-semibold mb-4">
              "The best time to plant a tree was 20 years ago. The second best time is now."
            </p>
            <p className="text-gray-300">
              Start your financial journey today, and your future self will thank you!
            </p>
          </div>

          {/* Advanced Investment Strategies Section */}
          <section id="advanced-investing" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🎯 Advanced Investment Strategies
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Take your investment knowledge to the next level with advanced strategies from world-class investors and financial experts. Learn sophisticated techniques for building and managing investment portfolios.
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
              <VideoCard
                videoId="PHe0bXAIuk0"
                title="The Psychology of Investing - Behavioral Finance"
              />
              <VideoCard
                videoId="AecvTErBQY8"
                title="Index Fund Investing vs Active Management"
              />
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20 mb-6">
              <h4 className="text-xl font-semibold mb-4 text-yellow-300">Advanced Investment Concepts</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-yellow-200 mb-2">📊 Portfolio Theory</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Modern Portfolio Theory</li>
                    <li>• Asset allocation models</li>
                    <li>• Risk-adjusted returns</li>
                    <li>• Correlation and diversification</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-yellow-200 mb-2">🎯 Investment Strategies</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Value investing principles</li>
                    <li>• Growth investing strategies</li>
                    <li>• Dollar-cost averaging</li>
                    <li>• Rebalancing techniques</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Personal Finance Mastery Section */}
          <section id="finance-mastery" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              💪 Personal Finance Mastery
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Master the essential skills of personal finance with expert guidance from top financial educators. Learn practical strategies that you can implement immediately.
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
              <VideoCard
                videoId="1bMFWOlBhF8"
                title="The Complete Guide to Emergency Funds"
              />
              <VideoCard
                videoId="eikbQPldhPY"
                title="How to Pay Off Debt Fast - Debt Snowball Method"
              />
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-green-500/20 mb-6">
              <h4 className="text-xl font-semibold mb-4 text-green-300">Personal Finance Milestones</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h5 className="font-semibold text-green-400 mb-2">🎯 Foundation (Ages 16-25)</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Build emergency fund (GH¢1,000-5,000)</li>
                    <li>• Establish good credit habits</li>
                    <li>• Learn budgeting and saving</li>
                    <li>• Start investing early</li>
                  </ul>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-semibold text-blue-400 mb-2">🚀 Growth (Ages 25-40)</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Maximize income potential</li>
                    <li>• Build substantial investment portfolio</li>
                    <li>• Consider real estate investment</li>
                    <li>• Plan for major life goals</li>
                  </ul>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h5 className="font-semibold text-purple-400 mb-2">💎 Wealth Building (Ages 40+)</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Focus on wealth preservation</li>
                    <li>• Advanced tax strategies</li>
                    <li>• Estate planning</li>
                    <li>• Financial independence</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cryptocurrency & Modern Finance Section */}
          <section id="crypto-modern" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🪙 Cryptocurrency & Modern Finance
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Understand the new world of digital finance, cryptocurrency, and modern financial technologies. Learn how to navigate this evolving landscape safely and profitably.
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
              <VideoCard
                videoId="jhaNkF2GNsw"
                title="DeFi Explained: Decentralized Finance"
              />
              <VideoCard
                videoId="1YyAzVmP9xQ"
                title="How to Invest in Crypto Safely"
              />
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-blue-500/20 mb-6">
              <h4 className="text-xl font-semibold mb-4 text-blue-300">⚠️ Crypto Investment Guidelines</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-blue-200 mb-2">✅ Smart Practices</h5>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Only invest what you can afford to lose</li>
                    <li>• Research thoroughly before investing</li>
                    <li>• Use reputable exchanges</li>
                    <li>• Understand the technology</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-red-200 mb-2">❌ Avoid These Mistakes</h5>
                  <ul className="text-gray-300 space-y-1">
                    <li>• FOMO (Fear of Missing Out) investing</li>
                    <li>• Putting all money in crypto</li>
                    <li>• Following social media hype</li>
                    <li>• Ignoring security practices</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Financial Independence & Early Retirement Section */}
          <section id="fire-movement" className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-yellow-500/30 pb-2">
              🔥 FIRE Movement: Financial Independence & Early Retirement
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Learn about the FIRE (Financial Independence, Retire Early) movement and how young people are achieving financial freedom decades before traditional retirement age.
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
              <VideoCard
                videoId="gFQNPmLKj1k"
                title="Building Multiple Income Streams"
              />
              <VideoCard
                videoId="PHe0bXAIuk0"
                title="The 4% Rule for Early Retirement"
              />
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-orange-500/20 mb-6">
              <h4 className="text-xl font-semibold mb-4 text-orange-300">🔥 FIRE Strategy Breakdown</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-orange-200 mb-2">💰 Lean FIRE</h5>
                  <p className="text-gray-300 text-sm mb-2">Target: GH¢250,000 - 500,000</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Minimalist lifestyle</li>
                    <li>• Lower expenses</li>
                    <li>• Geographic arbitrage</li>
                    <li>• Simple living</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-orange-200 mb-2">🏆 Fat FIRE</h5>
                  <p className="text-gray-300 text-sm mb-2">Target: GH¢1,000,000+</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Maintain current lifestyle</li>
                    <li>• Higher income required</li>
                    <li>• More investment capital</li>
                    <li>• Luxury in retirement</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


        </section>

        </div>
      </div>
    </div>
  );
};

export default FinancialLiteracyPage;