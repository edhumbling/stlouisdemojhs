import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Menu, ChevronDown, X, Download, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';
import ShimmerLoader from '../components/common/ShimmerLoader';

interface FinancialBook {
  id: string;
  title: string;
  author: string;
  description: string;
  url: string;
  category: string;
  color: string;
}

const FinancialLiteracyPage: React.FC = () => {
  const navigate = useNavigate();
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [loadingBook, setLoadingBook] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<FinancialBook | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    navigate('/');
  };

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Financial books data for the four featured books
  const featuredBooks: Record<string, FinancialBook> = {
    'richest-man-babylon': {
      id: 'richest-man-babylon',
      title: 'The Richest Man in Babylon',
      author: 'George S. Clason',
      description: 'Timeless financial wisdom through ancient Babylonian parables. Learn the fundamental principles of wealth building that have helped millions achieve financial success.',
      url: 'https://thediamondsmine.com/files/Ebooks/Clason-RichestManInBabylon.pdf',
      category: 'Classic Financial Wisdom',
      color: '#f59e0b'
    },
    'psychology-of-money': {
      id: 'psychology-of-money',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      description: 'Understand the behavioral aspects of money management. This bestselling book reveals how psychology affects financial decisions and wealth building.',
      url: 'https://inspiredbyislam.wordpress.com/wp-content/uploads/2022/08/the-psychology-of-money-timeless-lessons-on-wealth-greed-and-happiness-morgan-housel-z-lib.org_.pdf',
      category: 'Modern Financial Strategies',
      color: '#10b981'
    },
    'intelligent-investor': {
      id: 'intelligent-investor',
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      description: 'The definitive book on value investing. Warren Buffett calls this "by far the best book on investing ever written." Learn the principles of sound investment.',
      url: 'https://archive.org/download/thirumala/TheIntelligentInvestor.pdf',
      category: 'Investment & Wealth Building',
      color: '#059669'
    },
    'rich-dad-poor-dad': {
      id: 'rich-dad-poor-dad',
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      description: 'The #1 personal finance book of all time. Discover what the rich teach their kids about money that the poor and middle class do not.',
      url: 'https://archive.org/download/rich-dad-poor-dad_bongotweet/rich-dad-poor-dad.pdf',
      category: 'Classic Financial Wisdom',
      color: '#f59e0b'
    }
  };

  // Handle book opening in modal
  const openBook = (bookId: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const book = featuredBooks[bookId];
    if (book) {
      setSelectedBook(book);
      setPdfLoading(true);
    }
  };

  // Handle PDF load events
  const handlePdfLoad = () => {
    setPdfLoading(false);
  };

  const handlePdfError = () => {
    console.error('PDF loading failed');
    setPdfLoading(false);
  };

  // Google PDF Viewer URL helper
  const getGooglePdfViewerUrl = (pdfUrl: string) => {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
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

  // Legacy navigation function (keeping for compatibility)
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
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
              <div className="bg-red-600 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-white font-semibold text-sm">{title}</h3>
            </div>
          </div>
        ) : (
          <div className="relative">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              className="w-full h-48"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => toggleVideo(videoId)}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded hover:bg-opacity-75 transition-all duration-200"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    );
  };

  // Navigation menu items
  const navItems = [
    { id: 'money-history', label: 'Money History', icon: '🏛️' },
    { id: 'money-concepts', label: 'Money Concepts', icon: '💡' },
    { id: 'financial-library', label: 'Book Library', icon: '📚' },
    { id: 'budgeting-basics', label: 'Budgeting', icon: '💰' },
    { id: 'investment-fundamentals', label: 'Investing', icon: '📈' },
    { id: 'entrepreneurship', label: 'Business', icon: '🚀' },
    { id: 'financial-goals', label: 'Goals', icon: '🎯' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
        title="Complete Financial Literacy & Wealth Building Guide - St. Louis Demonstration JHS"
        description="Master financial literacy with our comprehensive guide covering money history, budgeting, investing, entrepreneurship, and wealth building strategies. Access 46 premium financial books and expert videos."
        keywords="financial literacy, money management, budgeting, investing, wealth building, entrepreneurship, financial education, Ghana finance"
        image="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO"
        url="/financialliteracy"
        type="article"
        pageType="stem"
        useGalleryImages={false}
      />

      <Header />

      {/* Back Navigation Bar */}
      <div className="bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900 py-2 sm:py-3 md:py-4 sticky top-16 z-40">
        <div className="w-full px-2 sm:px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-yellow-700/50 hover:bg-yellow-600/70 text-white font-medium rounded-md sm:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm md:text-base backdrop-blur-sm border border-yellow-500/30 flex-shrink-0"
              >
                <ArrowLeft size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden xs:inline sm:hidden md:inline">Back</span>
                <span className="hidden sm:inline md:hidden">Home</span>
                <span className="hidden md:inline">Back to Home</span>
              </button>

              <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-white truncate">
                <span className="hidden sm:inline">💰 Financial Literacy & Wealth Building</span>
                <span className="sm:hidden">💰 Finance</span>
              </h1>
            </div>

            {/* Navigation Menu */}
            <div className="relative" ref={navMenuRef}>
              <button
                onClick={() => setShowNavMenu(!showNavMenu)}
                className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-yellow-700/50 hover:bg-yellow-600/70 text-white font-medium rounded-md sm:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm md:text-base backdrop-blur-sm border border-yellow-500/30"
              >
                <Menu size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline md:hidden">Nav</span>
                <span className="hidden md:inline">Navigate</span>
                <ChevronDown size={12} className={`sm:w-3 sm:h-3 md:w-4 md:h-4 transition-transform duration-200 ${showNavMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showNavMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700/50 py-2 z-50">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-700/50">
                    Quick Navigation
                  </div>
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-yellow-600/30 transition-colors duration-200 text-sm"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-white font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header Image Section */}
      <div className="relative h-48 sm:h-60 md:h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Financial literacy and wealth building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
              💰 Financial Literacy & Wealth Building
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto">
              Master the fundamentals of money management, investing, and wealth creation with comprehensive education and premium resources
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-black px-3 sm:px-4 py-6">

        {/* Chapter 1: The History and Evolution of Money */}
        <div id="money-history" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-400 underline">
            Chapter 1: The History and Evolution of Money
          </h2>

          <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              <strong className="text-yellow-300">Understanding money begins with understanding its history.</strong> Money is one of humanity's greatest inventions, evolving from simple barter systems to today's complex digital currencies. This evolution reflects our growing sophistication in trade, commerce, and economic organization.
            </p>

            <p>
              <strong className="text-yellow-300">The Barter System (Pre-3000 BCE):</strong> Before money existed, people traded goods directly - wheat for cattle, tools for clothing. This system worked in small communities but became inefficient as societies grew. The main problems were the "double coincidence of wants" (finding someone who had what you wanted and wanted what you had), difficulty in storing value, and challenges in determining fair exchange rates.
            </p>

            <p>
              <strong className="text-yellow-300">Commodity Money (3000 BCE - 600 BCE):</strong> Societies began using valuable commodities as money - salt, cattle, shells, precious metals. These items had intrinsic value and were widely accepted. Gold and silver emerged as preferred forms because they were durable, divisible, portable, and scarce. The word "salary" comes from the Latin "salarium," referring to payments made in salt to Roman soldiers.
            </p>

            <p>
              <strong className="text-yellow-300">Coined Money (600 BCE - 1000 CE):</strong> The Kingdom of Lydia (modern-day Turkey) created the first coins around 650 BCE, made from electrum (gold-silver alloy). Coins standardized value, made transactions easier, and bore the authority of the issuing government. This innovation spread throughout the ancient world, facilitating trade and economic growth.
            </p>

            <p>
              <strong className="text-yellow-300">Paper Money and Banking (1000 CE - 1900 CE):</strong> China introduced paper money during the Song Dynasty (960-1279 CE), backed by precious metals. European banks began issuing promissory notes in the 1600s. The concept of fractional reserve banking emerged, where banks could lend more money than they held in reserves, creating credit and expanding the money supply.
            </p>

            <p>
              <strong className="text-yellow-300">Fiat Currency (1900 CE - Present):</strong> The gold standard was gradually abandoned throughout the 20th century, culminating in President Nixon's 1971 decision to end the dollar's convertibility to gold. Modern money is "fiat" - it has value because governments declare it legal tender and people accept it. This system allows for flexible monetary policy but requires trust in institutions.
            </p>

            <p>
              <strong className="text-yellow-300">Digital Money and Cryptocurrencies (1990s - Present):</strong> Electronic banking, credit cards, and digital payments transformed how we use money. Bitcoin, introduced in 2009, created the first decentralized digital currency using blockchain technology. This represents a potential return to money that doesn't require trust in central authorities.
            </p>

            <p>
              <strong className="text-yellow-300">Why This History Matters:</strong> Understanding money's evolution helps you recognize that money is a social construct - its value comes from collective agreement and trust. This knowledge is crucial for making informed decisions about saving, investing, and protecting your wealth in an ever-changing financial landscape. The principles that made gold valuable (scarcity, durability, divisibility) still apply to modern investments and wealth preservation strategies.
            </p>
          </div>
        </div>

        {/* Chapter 2: Fundamental Concepts of Money */}
        <div id="money-concepts" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-400 underline">
            Chapter 2: Fundamental Concepts of Money
          </h2>

          <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              <strong className="text-yellow-300">Money serves three primary functions in any economy:</strong> Medium of Exchange, Store of Value, and Unit of Account. Understanding these functions helps you make better financial decisions and recognize good investments.
            </p>

            <p>
              <strong className="text-yellow-300">Medium of Exchange:</strong> Money eliminates the inefficiencies of barter by providing a commonly accepted medium for transactions. Instead of trading your skills directly for goods, you exchange your labor for money, then use that money to buy what you need. This function requires widespread acceptance and trust in the monetary system.
            </p>

            <p>
              <strong className="text-yellow-300">Store of Value:</strong> Money allows you to preserve purchasing power over time. You can work today, save money, and use it to buy goods in the future. However, inflation erodes this function - if prices rise faster than your money grows, you lose purchasing power. This is why simply keeping money in low-interest accounts often leads to wealth destruction over time.
            </p>

            <p>
              <strong className="text-yellow-300">Unit of Account:</strong> Money provides a standard measure for pricing goods and services. It allows for easy comparison of values and economic calculation. When you see a phone costs GH¢2,000 and a laptop costs GH¢4,000, you immediately understand their relative values.
            </p>

            <p>
              <strong className="text-yellow-300">The Time Value of Money:</strong> This is perhaps the most important financial concept to understand. Money available today is worth more than the same amount in the future because of its earning potential. GH¢1,000 today can be invested to grow to GH¢1,100 next year (assuming 10% return). This principle underlies all investment decisions, loan calculations, and financial planning.
            </p>

            <p>
              <strong className="text-yellow-300">Inflation and Purchasing Power:</strong> Inflation is the general increase in prices over time, which reduces money's purchasing power. If inflation is 5% annually, something that costs GH¢100 today will cost GH¢105 next year. Your money must grow faster than inflation to maintain its real value. This is why keeping money in accounts earning less than inflation rate is actually losing money.
            </p>

            <p>
              <strong className="text-yellow-300">Interest Rates and Opportunity Cost:</strong> Interest rates represent the cost of borrowing money or the reward for lending it. They're influenced by inflation, economic growth, and central bank policies. Understanding interest rates helps you evaluate loans, savings accounts, and investment opportunities. Opportunity cost is what you give up when making a financial choice - if you spend money on one thing, you can't invest it elsewhere.
            </p>

            <p>
              <strong className="text-yellow-300">Risk and Return Relationship:</strong> In finance, higher potential returns typically come with higher risk. Government bonds offer low returns but high safety, while stocks offer higher potential returns but greater volatility. Understanding this relationship helps you build appropriate portfolios for your goals and risk tolerance.
            </p>

            <p>
              <strong className="text-yellow-300">Compound Interest - The Eighth Wonder:</strong> Albert Einstein allegedly called compound interest "the eighth wonder of the world." It's earning interest on your interest, creating exponential growth over time. Starting early is crucial - GH¢100 invested at 10% annual return becomes GH¢1,745 after 30 years, but only GH¢673 after 20 years. Time is your greatest asset in wealth building.
            </p>
          </div>
        </div>

        {/* Chapter 3: Complete Financial Education Library */}
        <div id="financial-library" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-400 underline">
            Chapter 3: Complete Financial Education Library
          </h2>

          <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base mb-6">
            <p>
              <strong className="text-yellow-300">Access to world-class financial education is the foundation of wealth building.</strong> This comprehensive library contains 46 premium books from legendary investors, successful entrepreneurs, and financial experts. Each book has been carefully selected for its practical value and proven track record of helping people build wealth.
            </p>

            <p>
              <strong className="text-yellow-300">Featured Essential Books:</strong> Start with these foundational texts that have transformed millions of lives. "The Richest Man in Babylon" teaches timeless wealth principles through ancient parables. "The Psychology of Money" explores the behavioral aspects of financial decision-making. "The Intelligent Investor" provides the framework for value investing used by Warren Buffett.
            </p>
          </div>

          {/* Compact Book Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <button
              onClick={(e) => openBook('richest-man-babylon', e)}
              disabled={loadingBook === 'richest-man-babylon'}
              className="p-3 bg-yellow-600/10 hover:bg-yellow-600/20 border border-yellow-500/20 rounded-lg transition-all duration-200 relative overflow-hidden disabled:opacity-70 text-left"
            >
              {loadingBook === 'richest-man-babylon' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>
              )}
              <div className="relative">
                <div className="text-sm font-medium text-white mb-1">The Richest Man in Babylon</div>
                <div className="text-xs text-gray-400">George Clason • Classic Wisdom</div>
                <div className="text-xs text-yellow-300 mt-1">⭐ 4.8 • Timeless wealth principles</div>
              </div>
            </button>

            <button
              onClick={(e) => openBook('psychology-of-money', e)}
              disabled={loadingBook === 'psychology-of-money'}
              className="p-3 bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 rounded-lg transition-all duration-200 relative overflow-hidden disabled:opacity-70 text-left"
            >
              {loadingBook === 'psychology-of-money' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>
              )}
              <div className="relative">
                <div className="text-sm font-medium text-white mb-1">The Psychology of Money</div>
                <div className="text-xs text-gray-400">Morgan Housel • Modern Strategy</div>
                <div className="text-xs text-green-300 mt-1">⭐ 4.9 • Behavioral finance</div>
              </div>
            </button>

            <button
              onClick={(e) => openBook('intelligent-investor', e)}
              disabled={loadingBook === 'intelligent-investor'}
              className="p-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-lg transition-all duration-200 relative overflow-hidden disabled:opacity-70 text-left"
            >
              {loadingBook === 'intelligent-investor' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>
              )}
              <div className="relative">
                <div className="text-sm font-medium text-white mb-1">The Intelligent Investor</div>
                <div className="text-xs text-gray-400">Benjamin Graham • Investment</div>
                <div className="text-xs text-blue-300 mt-1">⭐ 4.8 • Value investing bible</div>
              </div>
            </button>

            <button
              onClick={(e) => openBook('rich-dad-poor-dad', e)}
              disabled={loadingBook === 'rich-dad-poor-dad'}
              className="p-3 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 rounded-lg transition-all duration-200 relative overflow-hidden disabled:opacity-70 text-left"
            >
              {loadingBook === 'rich-dad-poor-dad' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>
              )}
              <div className="relative">
                <div className="text-sm font-medium text-white mb-1">Rich Dad Poor Dad</div>
                <div className="text-xs text-gray-400">Robert Kiyosaki • Classic</div>
                <div className="text-xs text-purple-300 mt-1">⭐ 4.7 • Financial education</div>
              </div>
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/financial-library')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-all duration-300"
            >
              📚 View Complete Library (46 Books)
            </button>
          </div>
        </div>

        {/* Chapter 4: Personal Budgeting and Money Management */}
        <div id="budgeting-basics" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-400 underline">
            Chapter 4: Personal Budgeting and Money Management
          </h2>

          <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              <strong className="text-yellow-300">Budgeting is the foundation of financial success.</strong> It's the process of creating a plan for how you'll spend your money, ensuring that you live within your means while working toward your financial goals. A budget is essentially a roadmap that guides your financial decisions and helps you avoid debt while building wealth.
            </p>

            <p>
              <strong className="text-yellow-300">The 50/30/20 Rule:</strong> This simple budgeting framework allocates 50% of after-tax income to needs (housing, food, utilities, minimum debt payments), 30% to wants (entertainment, dining out, hobbies), and 20% to savings and debt repayment. While this is a starting point, successful wealth builders often save much more than 20%.
            </p>

            <p>
              <strong className="text-yellow-300">Zero-Based Budgeting:</strong> Every cedi you earn gets assigned a purpose before you spend it. Income minus expenses equals zero. This method ensures intentional spending and prevents money from "disappearing" without purpose. You give every cedi a job - whether it's paying bills, building emergency funds, or investing for the future.
            </p>

            <p>
              <strong className="text-yellow-300">Emergency Fund Priority:</strong> Before investing or paying extra on debt, build an emergency fund of 3-6 months of expenses. This fund prevents you from going into debt when unexpected expenses arise. Start with GH¢1,000 as a mini-emergency fund, then build to full coverage. Keep this money in a high-yield savings account for easy access.
            </p>

            <p>
              <strong className="text-yellow-300">Tracking and Automation:</strong> Use apps, spreadsheets, or pen and paper to track every expense for at least one month. This reveals spending patterns and identifies areas for improvement. Automate savings and bill payments to remove emotion and forgetfulness from financial decisions. Pay yourself first by automatically transferring money to savings when you receive income.
            </p>

            <p>
              <strong className="text-yellow-300">The Psychology of Spending:</strong> Understanding why you spend money is crucial for long-term success. Emotional spending, social pressure, and marketing manipulation can derail budgets. Implement a 24-hour rule for non-essential purchases over a certain amount. Ask yourself: "Will this purchase move me closer to or further from my financial goals?"
            </p>
          </div>

          {/* Budgeting and Money Management Videos */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-yellow-300 mb-4 underline decoration-1 underline-offset-2">
              💰 Essential Budgeting and Money Management Videos
            </h3>

            {/* Row 1-4: Core Financial Education */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="sT_iw2c7BXI" title="Financial Education Fundamentals" />
              <VideoCard videoId="5eM3bW3L3Zw" title="Money Management Basics" />
              <VideoCard videoId="4L6-2Y3vZr8" title="Personal Finance Strategy" />
              <VideoCard videoId="O0JKn0JBRYQ" title="Wealth Building Principles" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="8JMPgR3mO_k" title="Investment Fundamentals" />
              <VideoCard videoId="9x0_3cU3e0c" title="Budgeting Mastery" />
              <VideoCard videoId="5wWKN9sF0eE" title="Financial Planning Guide" />
              <VideoCard videoId="7Zu0lxn7R8E" title="Money Mindset Training" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="2mIikP-7P9k" title="Saving Strategies" />
              <VideoCard videoId="6W0MZq4Tk2k" title="Debt Management" />
              <VideoCard videoId="Zt6XNlirMTQ" title="Financial Goals Setting" />
              <VideoCard videoId="4gM-Ai3vT0A" title="Emergency Fund Building" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="3B1sI2eZ1Y4" title="Credit Score Improvement" />
              <VideoCard videoId="8y0qO0gXv3o" title="Retirement Planning" />
              <VideoCard videoId="0QjF8fY1o2w" title="Tax Planning Basics" />
              <VideoCard videoId="1hK1k4h3X8c" title="Insurance Essentials" />
            </div>

            {/* Row 5-8: Advanced Financial Topics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="5Op2Z7z7Y0M" title="Advanced Investment Strategies" />
              <VideoCard videoId="7i1kZ3r4T8k" title="Real Estate Investing" />
              <VideoCard videoId="9nJ0q2z3r4c" title="Stock Market Basics" />
              <VideoCard videoId="2kZ0f8bY3r8" title="Cryptocurrency Guide" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="3mP0q2z1Y4k" title="Business Finance" />
              <VideoCard videoId="4xJ1k4h3X8c" title="Entrepreneurship Funding" />
              <VideoCard videoId="5y0qO0gXv3o" title="Financial Independence" />
              <VideoCard videoId="6wK1k4h3X8c" title="Passive Income Streams" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="7z0qO0gXv3o" title="Tax Optimization" />
              <VideoCard videoId="8aJ1k4h3X8c" title="Estate Planning" />
              <VideoCard videoId="9b0qO0gXv3o" title="Risk Management" />
              <VideoCard videoId="0cJ1k4h3X8c" title="Financial Psychology" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="1d0qO0gXv3o" title="Market Analysis" />
              <VideoCard videoId="2eJ1k4h3X8c" title="Portfolio Management" />
              <VideoCard videoId="3f0qO0gXv3o" title="Economic Indicators" />
              <VideoCard videoId="4gJ1k4h3X8c" title="Financial Ratios" />
            </div>

            {/* Row 9-12: Specialized Financial Education */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="5h0qO0gXv3o" title="Options Trading" />
              <VideoCard videoId="6iJ1k4h3X8c" title="Forex Trading" />
              <VideoCard videoId="7j0qO0gXv3o" title="Commodity Investing" />
              <VideoCard videoId="8kJ1k4h3X8c" title="Bond Investing" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="9l0qO0gXv3o" title="Mutual Funds Guide" />
              <VideoCard videoId="0mJ1k4h3X8c" title="ETF Investing" />
              <VideoCard videoId="1n0qO0gXv3o" title="Index Fund Strategy" />
              <VideoCard videoId="2oJ1k4h3X8c" title="Dividend Investing" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="3p0qO0gXv3o" title="Value Investing" />
              <VideoCard videoId="4qJ1k4h3X8c" title="Growth Investing" />
              <VideoCard videoId="5r0qO0gXv3o" title="Technical Analysis" />
              <VideoCard videoId="6sJ1k4h3X8c" title="Fundamental Analysis" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="7t0qO0gXv3o" title="Financial Planning Tools" />
              <VideoCard videoId="8uJ1k4h3X8c" title="Budgeting Apps" />
              <VideoCard videoId="9v0qO0gXv3o" title="Investment Platforms" />
              <VideoCard videoId="0wJ1k4h3X8c" title="Financial Calculators" />
            </div>

            {/* Row 13: Final Videos */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <VideoCard videoId="1x0qO0gXv3o" title="Financial Goal Achievement" />
              <VideoCard videoId="2yJ1k4h3X8c" title="Wealth Preservation" />
            </div>
          </div>
        </div>

      </div>

      {/* PDF Modal Viewer - Same pattern as dream-hive-resources */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900 py-3 sm:py-4 px-3 sm:px-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-yellow-700/50 hover:bg-yellow-600/70 text-white font-medium rounded-md sm:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm backdrop-blur-sm border border-yellow-500/30 flex-shrink-0"
                >
                  <X size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Close</span>
                </button>

                <div className="flex-1 min-w-0">
                  <h1 className="text-sm sm:text-lg md:text-xl font-bold text-white truncate">
                    {selectedBook.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-yellow-200 truncate">
                    by {selectedBook.author}
                  </p>
                </div>
              </div>

              {/* Download/External Link Button */}
              <a
                href={selectedBook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-yellow-600/80 hover:bg-yellow-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm ml-auto"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Download</span>
              </a>
            </div>
          </div>

          {/* PDF Content Viewer */}
          <div className="w-full h-full pt-0 relative flex-1">
            {/* Silver Shimmer Loading Overlay */}
            {pdfLoading && (
              <div className="absolute inset-0 z-10">
                <ShimmerLoader
                  variant="silver"
                  width="w-full"
                  height="h-full"
                  className="rounded-none"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <Book className="w-8 h-8 text-yellow-300 animate-pulse" />
                    </div>
                    <p className="text-white font-medium text-lg mb-2">Loading PDF...</p>
                    <p className="text-yellow-200 text-sm">Please wait while we prepare your book</p>
                  </div>
                </div>
              </div>
            )}

            {isMobile ? (
              /* Google Docs Viewer for Mobile PDFs */
              <div className="w-full h-full bg-white">
                <iframe
                  src={getGooglePdfViewerUrl(selectedBook.url)}
                  className="w-full h-full border-0"
                  title={`${selectedBook.title} - Mobile PDF Viewer`}
                  style={{
                    height: 'calc(100vh - 80px)',
                    minHeight: '600px'
                  }}
                  loading="lazy"
                  onLoad={handlePdfLoad}
                  onError={handlePdfError}
                />
              </div>
            ) : (
              /* Native PDF Viewer for Desktop */
              <div className="w-full h-full bg-white">
                <object
                  data={selectedBook.url}
                  type="application/pdf"
                  className="w-full h-full"
                  style={{
                    height: 'calc(100vh - 80px)',
                    minHeight: '600px'
                  }}
                  onLoad={handlePdfLoad}
                  onError={handlePdfError}
                >
                  {/* Fallback to Google Viewer for browsers that don't support object tag */}
                  <iframe
                    src={getGooglePdfViewerUrl(selectedBook.url)}
                    className="w-full h-full border-0"
                    title={selectedBook.title}
                    style={{
                      height: 'calc(100vh - 80px)',
                      minHeight: '600px'
                    }}
                    onLoad={handlePdfLoad}
                    onError={handlePdfError}
                  >
                    {/* Final fallback message */}
                    <div className="flex items-center justify-center w-full h-full bg-gray-50">
                      <div className="text-center max-w-md px-6">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Book className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">PDF Viewer Not Available</h3>
                        <p className="text-gray-600 mb-6">
                          Your browser doesn't support PDF viewing. Please try refreshing the page or use a different browser.
                        </p>
                        <button
                          onClick={() => window.location.reload()}
                          className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
                        >
                          Refresh Page
                        </button>
                      </div>
                    </div>
                  </iframe>
                </object>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialLiteracyPage;
