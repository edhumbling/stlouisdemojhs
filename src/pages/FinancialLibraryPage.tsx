import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Search, Book, Star, Clock, User, X, Download, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';
import ShimmerLoader from '../components/common/ShimmerLoader';

interface FinancialBook {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  pages: number;
  description: string;
  topics: string[];
  url?: string;
}

const FinancialLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loadingBook, setLoadingBook] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<FinancialBook | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleBack = () => {
    navigate('/financialliteracy');
  };

  // Handle book opening in modal (like dream-hive-resources)
  const openBook = (book: FinancialBook, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setSelectedBook(book);
    setPdfLoading(true);
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

  // Legacy navigation function (keeping for compatibility)
  const handleBookNavigation = (bookId: string, title: string) => {
    setLoadingBook(bookId);
    setTimeout(() => {
      navigate(`/financial-library/${bookId}`, {
        state: { title }
      });
    }, 500);
  };

  // Complete Financial Books Library - 36 Premium Books
  const financialBooks = [
    // Classic Financial Wisdom
    {
      id: 'richest-man-babylon',
      title: 'The Richest Man in Babylon',
      author: 'George S. Clason',
      category: 'classic',
      rating: 4.8,
      pages: 194,
      description: 'Timeless financial wisdom through ancient Babylonian parables. Learn the fundamental principles of wealth building.',
      topics: ['Saving', 'Investing', 'Wealth Building', 'Financial Discipline'],
      url: 'https://thediamondsmine.com/files/Ebooks/Clason-RichestManInBabylon.pdf'
    },
    {
      id: 'rich-dad-poor-dad',
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      category: 'classic',
      rating: 4.7,
      pages: 336,
      description: 'Revolutionary perspective on money and investing. Challenges conventional wisdom about wealth.',
      topics: ['Financial Education', 'Assets vs Liabilities', 'Passive Income', 'Mindset'],
      url: 'https://archive.org/download/rich-dad-poor-dad_bongotweet/rich-dad-poor-dad.pdf'
    },
    {
      id: 'millionaire-next-door',
      title: 'The Millionaire Next Door',
      author: 'Thomas Stanley & William Danko',
      category: 'classic',
      rating: 4.6,
      pages: 272,
      description: 'Research-based insights into the habits and characteristics of wealthy Americans.',
      topics: ['Wealth Accumulation', 'Frugality', 'Financial Habits', 'Millionaire Mindset'],
      url: 'https://archive.org/download/StanleyThomasJDankoWilliamDTheMillionaireNextDoorTheSurprisingSecretsOfAmericasWealthy/Stanley%2C%20Thomas%20J%20%26%20Danko%2C%20William%20D%20-%20The%20Millionaire%20Next%20Door%20-%20The%20Surprising%20Secrets%20of%20America%27s%20Wealthy.pdf'
    },
    {
      id: 'think-grow-rich',
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      category: 'classic',
      rating: 4.7,
      pages: 320,
      description: 'Classic success philosophy based on interviews with successful individuals.',
      topics: ['Success Principles', 'Mindset', 'Goal Setting', 'Wealth Creation'],
      url: 'https://archive.org/download/think-and-grow-rich/think-and-grow-rich.pdf'
    },

    // Modern Financial Strategies
    {
      id: 'psychology-of-money',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      category: 'modern',
      rating: 4.9,
      pages: 256,
      description: 'Explores the behavioral aspects of money management and financial decision-making.',
      topics: ['Behavioral Finance', 'Money Psychology', 'Investment Behavior', 'Financial Decisions'],
      url: 'https://inspiredbyislam.wordpress.com/wp-content/uploads/2022/08/the-psychology-of-money-timeless-lessons-on-wealth-greed-and-happiness-morgan-housel-z-lib.org_.pdf'
    },
    {
      id: 'total-money-makeover',
      title: 'The Total Money Makeover',
      author: 'Dave Ramsey',
      category: 'modern',
      rating: 4.6,
      pages: 272,
      description: 'Step-by-step plan for financial fitness and debt elimination.',
      topics: ['Debt Elimination', 'Budgeting', 'Emergency Fund', 'Financial Planning'],
      url: 'https://archive.org/download/the-total-money-makeover-a-proven-plan-for-financial-fitness_202102/The%20Total%20Money%20Makeover%20A%20Proven%20Plan%20For%20Financial%20Fitness.pdf'
    },
    {
      id: 'automatic-millionaire',
      title: 'The Automatic Millionaire',
      author: 'David Bach',
      category: 'modern',
      rating: 4.5,
      pages: 256,
      description: 'Simple system for building wealth through automation.',
      topics: ['Automatic Investing', 'Pay Yourself First', 'Compound Interest', 'Wealth Building']
    },
    {
      id: 'i-will-teach-you-rich',
      title: 'I Will Teach You to Be Rich',
      author: 'Ramit Sethi',
      category: 'modern',
      rating: 4.6,
      pages: 352,
      description: 'Practical 6-week program for young adults to manage money effectively.',
      topics: ['Personal Finance', 'Banking', 'Investing', 'Automation']
    },

    // Investment & Wealth Building
    {
      id: 'intelligent-investor',
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      category: 'investing',
      rating: 4.8,
      pages: 640,
      description: 'The definitive book on value investing by Warren Buffett\'s mentor.',
      topics: ['Value Investing', 'Market Analysis', 'Risk Management', 'Investment Strategy'],
      url: 'https://archive.org/download/thirumala/TheIntelligentInvestor.pdf'
    },
    {
      id: 'essays-warren-buffett',
      title: 'The Essays of Warren Buffett',
      author: 'Warren Buffett',
      category: 'investing',
      rating: 4.7,
      pages: 352,
      description: 'Collection of Berkshire Hathaway shareholder letters with investment wisdom.',
      topics: ['Investment Philosophy', 'Business Analysis', 'Long-term Investing', 'Value Creation']
    },
    {
      id: 'common-stocks-uncommon-profits',
      title: 'Common Stocks and Uncommon Profits',
      author: 'Philip Fisher',
      category: 'investing',
      rating: 4.6,
      pages: 288,
      description: 'Growth investing principles and company analysis techniques.',
      topics: ['Growth Investing', 'Company Analysis', 'Stock Selection', 'Investment Research']
    },
    {
      id: 'random-walk-wall-street',
      title: 'A Random Walk Down Wall Street',
      author: 'Burton Malkiel',
      category: 'investing',
      rating: 4.5,
      pages: 448,
      description: 'Comprehensive guide to investing with focus on index funds and market efficiency.',
      topics: ['Index Investing', 'Market Efficiency', 'Portfolio Theory', 'Investment Strategy']
    },

    // Entrepreneurship & Business
    {
      id: 'lean-startup',
      title: 'The Lean Startup',
      author: 'Eric Ries',
      category: 'business',
      rating: 4.4,
      pages: 336,
      description: 'Revolutionary approach to building successful businesses through validated learning.',
      topics: ['Entrepreneurship', 'Innovation', 'Business Strategy', 'Startup Methodology']
    },
    {
      id: 'zero-to-one',
      title: 'Zero to One',
      author: 'Peter Thiel',
      category: 'business',
      rating: 4.3,
      pages: 224,
      description: 'Insights on building companies that create new things and monopolistic advantages.',
      topics: ['Innovation', 'Monopoly', 'Technology', 'Business Building']
    },
    {
      id: 'good-to-great',
      title: 'Good to Great',
      author: 'Jim Collins',
      category: 'business',
      rating: 4.5,
      pages: 320,
      description: 'Research-based insights into what makes companies achieve sustained excellence.',
      topics: ['Leadership', 'Business Excellence', 'Company Culture', 'Strategic Planning']
    },
    {
      id: 'cashflow-quadrant',
      title: 'Rich Dad\'s CASHFLOW Quadrant',
      author: 'Robert Kiyosaki',
      category: 'business',
      rating: 4.4,
      pages: 368,
      description: 'Guide to financial freedom through understanding different income sources.',
      topics: ['Financial Freedom', 'Passive Income', 'Business Ownership', 'Investment']
    },

    // Personal Development & Mindset
    {
      id: 'compound-effect',
      title: 'The Compound Effect',
      author: 'Darren Hardy',
      category: 'mindset',
      rating: 4.6,
      pages: 176,
      description: 'How small, smart choices compound into remarkable results over time.',
      topics: ['Habits', 'Success Principles', 'Personal Development', 'Goal Achievement']
    },
    {
      id: 'atomic-habits',
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'mindset',
      rating: 4.8,
      pages: 320,
      description: 'Proven framework for improving every day through tiny changes.',
      topics: ['Habit Formation', 'Behavior Change', 'Personal Growth', 'Productivity']
    },
    {
      id: 'mindset',
      title: 'Mindset: The New Psychology of Success',
      author: 'Carol Dweck',
      category: 'mindset',
      rating: 4.5,
      pages: 276,
      description: 'How a simple idea about the brain can help you love challenges and transform your life.',
      topics: ['Growth Mindset', 'Psychology', 'Learning', 'Success']
    },
    {
      id: 'power-of-now',
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      category: 'mindset',
      rating: 4.4,
      pages: 236,
      description: 'Spiritual guide to enlightenment and living in the present moment.',
      topics: ['Mindfulness', 'Spirituality', 'Present Moment', 'Inner Peace']
    },

    // Advanced Investment Strategies
    {
      id: 'security-analysis',
      title: 'Security Analysis',
      author: 'Benjamin Graham & David Dodd',
      category: 'investing',
      rating: 4.7,
      pages: 768,
      description: 'Classic text on fundamental analysis and value investing principles.',
      topics: ['Fundamental Analysis', 'Value Investing', 'Security Valuation', 'Financial Analysis']
    },
    {
      id: 'one-up-wall-street',
      title: 'One Up On Wall Street',
      author: 'Peter Lynch',
      category: 'investing',
      rating: 4.6,
      pages: 304,
      description: 'How to use what you already know to make money in the market.',
      topics: ['Stock Picking', 'Investment Strategy', 'Market Analysis', 'Individual Investing']
    },
    {
      id: 'little-book-common-sense',
      title: 'The Little Book of Common Sense Investing',
      author: 'John Bogle',
      category: 'investing',
      rating: 4.5,
      pages: 216,
      description: 'The only way to guarantee your fair share of stock market returns.',
      topics: ['Index Funds', 'Long-term Investing', 'Cost Management', 'Market Returns']
    },
    {
      id: 'margin-of-safety',
      title: 'Margin of Safety',
      author: 'Seth Klarman',
      category: 'investing',
      rating: 4.8,
      pages: 256,
      description: 'Risk-averse value investing strategies for the thoughtful investor.',
      topics: ['Risk Management', 'Value Investing', 'Market Psychology', 'Investment Philosophy']
    },

    // Money Management & Budgeting
    {
      id: 'your-money-or-your-life',
      title: 'Your Money or Your Life',
      author: 'Vicki Robin & Joe Dominguez',
      category: 'modern',
      rating: 4.4,
      pages: 368,
      description: 'Nine-step program for transforming your relationship with money.',
      topics: ['Financial Independence', 'Life Values', 'Money Management', 'Frugal Living']
    },
    {
      id: 'barefoot-investor',
      title: 'The Barefoot Investor',
      author: 'Scott Pape',
      category: 'modern',
      rating: 4.6,
      pages: 272,
      description: 'Simple step-by-step plan to financial freedom.',
      topics: ['Financial Planning', 'Budgeting', 'Investment Strategy', 'Debt Management']
    },
    {
      id: 'simple-path-wealth',
      title: 'The Simple Path to Wealth',
      author: 'JL Collins',
      category: 'modern',
      rating: 4.7,
      pages: 286,
      description: 'Your road map to financial independence and a rich, free life.',
      topics: ['Financial Independence', 'Index Investing', 'Wealth Building', 'FIRE Movement']
    },
    {
      id: 'bogleheads-guide',
      title: 'The Bogleheads\' Guide to Investing',
      author: 'Taylor Larimore, Mel Lindauer, Michael LeBoeuf',
      category: 'modern',
      rating: 4.5,
      pages: 352,
      description: 'Time-tested strategies for building wealth through index fund investing.',
      topics: ['Index Investing', 'Asset Allocation', 'Portfolio Management', 'Long-term Strategy']
    },

    // Real Estate & Alternative Investments
    {
      id: 'millionaire-real-estate-investor',
      title: 'The Millionaire Real Estate Investor',
      author: 'Gary Keller',
      category: 'realestate',
      rating: 4.4,
      pages: 336,
      description: 'Anyone can learn to invest wisely in real estate and build wealth.',
      topics: ['Real Estate Investing', 'Property Investment', 'Wealth Building', 'Passive Income']
    },
    {
      id: 'book-on-rental-property',
      title: 'The Book on Rental Property Investing',
      author: 'Brandon Turner',
      category: 'realestate',
      rating: 4.5,
      pages: 416,
      description: 'How to create wealth and passive income through rental properties.',
      topics: ['Rental Properties', 'Real Estate Analysis', 'Property Management', 'Cash Flow']
    },
    {
      id: 'cryptocurrency-investing',
      title: 'Cryptocurrency Investing For Dummies',
      author: 'Kiana Danial',
      category: 'crypto',
      rating: 4.2,
      pages: 384,
      description: 'Your guide to digital currency investment strategies.',
      topics: ['Cryptocurrency', 'Blockchain', 'Digital Assets', 'Alternative Investing']
    },
    {
      id: 'bitcoin-standard',
      title: 'The Bitcoin Standard',
      author: 'Saifedean Ammous',
      category: 'crypto',
      rating: 4.3,
      pages: 304,
      description: 'The decentralized alternative to central banking.',
      topics: ['Bitcoin', 'Monetary Theory', 'Digital Currency', 'Economic History']
    },

    // Additional Popular Financial Books
    {
      id: 'money-master-the-game',
      title: 'MONEY Master the Game',
      author: 'Tony Robbins',
      category: 'modern',
      rating: 4.0,
      pages: 688,
      description: '7 simple steps to financial freedom from the world\'s top financial experts.',
      topics: ['Financial Freedom', 'Investment Strategy', 'Wealth Building', 'Financial Planning']
    },
    {
      id: 'millionaire-fastlane',
      title: 'The Millionaire Fastlane',
      author: 'M.J. DeMarco',
      category: 'business',
      rating: 4.3,
      pages: 337,
      description: 'Crack the code to wealth and live rich for a lifetime through entrepreneurship.',
      topics: ['Entrepreneurship', 'Wealth Creation', 'Business Strategy', 'Financial Independence']
    },
    {
      id: 'die-with-zero',
      title: 'Die with Zero',
      author: 'Bill Perkins',
      category: 'modern',
      rating: 3.9,
      pages: 256,
      description: 'Getting all you can from your money and your life through optimal spending.',
      topics: ['Life Optimization', 'Spending Strategy', 'Experience Economy', 'Financial Philosophy']
    },
    {
      id: 'broke-millennial',
      title: 'Broke Millennial',
      author: 'Erin Lowry',
      category: 'modern',
      rating: 3.9,
      pages: 272,
      description: 'Stop scraping by and get your financial life together with practical advice for young adults.',
      topics: ['Young Adult Finance', 'Budgeting', 'Debt Management', 'Financial Basics']
    },
    {
      id: 'secrets-millionaire-mind',
      title: 'Secrets of the Millionaire Mind',
      author: 'T. Harv Eker',
      category: 'mindset',
      rating: 4.2,
      pages: 224,
      description: 'Mastering the inner game of wealth through mindset transformation.',
      topics: ['Wealth Mindset', 'Money Psychology', 'Success Principles', 'Mental Programming']
    },
    {
      id: 'wealthy-barber',
      title: 'The Wealthy Barber',
      author: 'David Chilton',
      category: 'classic',
      rating: 4.0,
      pages: 224,
      description: 'Common sense guide to successful financial planning told through engaging stories.',
      topics: ['Financial Planning', 'Saving Strategies', 'Investment Basics', 'Retirement Planning']
    },
    {
      id: 'four-pillars-investing',
      title: 'The Four Pillars of Investing',
      author: 'William J. Bernstein',
      category: 'investing',
      rating: 4.2,
      pages: 384,
      description: 'Lessons for building a winning portfolio based on theory, history, psychology, and business.',
      topics: ['Portfolio Theory', 'Investment History', 'Behavioral Finance', 'Asset Allocation']
    },
    {
      id: 'you-need-budget',
      title: 'You Need a Budget',
      author: 'Jesse Mecham',
      category: 'modern',
      rating: 4.1,
      pages: 272,
      description: 'The proven system for breaking the paycheck-to-paycheck cycle and building wealth.',
      topics: ['Budgeting System', 'Financial Control', 'Debt Elimination', 'Money Management']
    },
    {
      id: 'millionaire-mind',
      title: 'The Millionaire Mind',
      author: 'Thomas J. Stanley',
      category: 'classic',
      rating: 4.2,
      pages: 416,
      description: 'What makes the wealthy different - their habits, strategies, and mindset.',
      topics: ['Wealth Psychology', 'Success Habits', 'Millionaire Behavior', 'Financial Mindset']
    },
    {
      id: 'almanack-naval-ravikant',
      title: 'The Almanack of Naval Ravikant',
      author: 'Eric Jorgenson',
      category: 'modern',
      rating: 4.4,
      pages: 242,
      description: 'A guide to wealth and happiness from Silicon Valley\'s most successful angel investor.',
      topics: ['Wealth Creation', 'Happiness', 'Decision Making', 'Life Philosophy']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Books', count: financialBooks.length },
    { id: 'classic', name: 'Classic Wisdom', count: financialBooks.filter(book => book.category === 'classic').length },
    { id: 'modern', name: 'Modern Strategies', count: financialBooks.filter(book => book.category === 'modern').length },
    { id: 'investing', name: 'Investment & Wealth', count: financialBooks.filter(book => book.category === 'investing').length },
    { id: 'business', name: 'Business & Entrepreneurship', count: financialBooks.filter(book => book.category === 'business').length },
    { id: 'mindset', name: 'Mindset & Development', count: financialBooks.filter(book => book.category === 'mindset').length },
    { id: 'realestate', name: 'Real Estate', count: financialBooks.filter(book => book.category === 'realestate').length },
    { id: 'crypto', name: 'Cryptocurrency', count: financialBooks.filter(book => book.category === 'crypto').length }
  ];

  const filteredBooks = financialBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Complete Financial Literacy Library | 36 Premium Books - St. Louis Demonstration JHS"
        description="Access our comprehensive collection of 36 premium financial education books. From classic wisdom to modern strategies, build your financial knowledge with world-class resources."
        keywords="financial books, investment books, money management books, financial education library, wealth building books, personal finance books"
        image="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO"
        url="/financial-library"
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
                <span className="hidden sm:inline md:hidden">Finance</span>
                <span className="hidden md:inline">Back to Finance</span>
              </button>

              <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-white truncate">
                <span className="hidden sm:inline">📚 Complete Financial Education Library</span>
                <span className="sm:hidden">📚 Library</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div
        className="relative h-48 sm:h-60 md:h-72 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="relative h-full flex items-end justify-start px-3 sm:px-4 pb-6 sm:pb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              📚 Complete Financial Education Library
            </h1>
            <p className="text-sm sm:text-base text-gray-200 max-w-xl leading-relaxed">
              ✨ 36 Premium Books from Legendary Investors & Financial Experts
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-black px-3 sm:px-4 py-6">

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search books, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-yellow-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid - Compact Design with 2-Grid Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-gray-900/50 rounded-lg border border-gray-700/30 overflow-hidden hover:border-yellow-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
            >
              {/* Compact Book Content */}
              <div className="p-3 sm:p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1 line-clamp-2 leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-1 mb-2">
                      <User size={10} className="sm:w-3 sm:h-3 flex-shrink-0" />
                      <span className="truncate">{book.author}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs ml-2">
                    <Star size={10} fill="currentColor" />
                    {book.rating}
                  </div>
                </div>

                <p className="text-gray-300 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
                  {book.description}
                </p>

                {/* Compact Book Stats */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Book size={10} />
                    <span>{book.pages}p</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={10} />
                    <span>{Math.ceil(book.pages / 250)}h</span>
                  </div>
                </div>

                {/* Compact Topics */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {book.topics.slice(0, 2).map((topic, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 bg-gray-800/50 text-gray-300 text-xs rounded"
                    >
                      {topic}
                    </span>
                  ))}
                  {book.topics.length > 2 && (
                    <span className="px-1.5 py-0.5 bg-gray-800/50 text-gray-400 text-xs rounded">
                      +{book.topics.length - 2}
                    </span>
                  )}
                </div>

                {/* Compact Action Buttons */}
                <div className="flex gap-2">
                  {/* Quick View Button (Modal) */}
                  {book.url && (
                    <button
                      onClick={(e) => openBook(book, e)}
                      className="flex-1 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-medium rounded transition-all duration-200"
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <Book size={12} />
                        <span>Quick View</span>
                      </div>
                    </button>
                  )}

                  {/* Full Page Button */}
                  <button
                    onClick={() => handleBookNavigation(book.id, book.title)}
                    disabled={loadingBook === book.id}
                    className="flex-1 py-2 sm:py-2.5 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-600/50 text-white text-xs sm:text-sm font-medium rounded transition-all duration-200 relative overflow-hidden disabled:cursor-not-allowed"
                  >
                    {loadingBook === book.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative flex items-center justify-center gap-1.5">
                      {loadingBook === book.id ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Opening...</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink size={12} />
                          <span>Full Page</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Book size={48} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No books found</h3>
              <p>Try adjusting your search terms or category filter.</p>
            </div>
          </div>
        )}

        {/* Library Stats */}
        <div className="mt-12 bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 p-6 rounded-lg border border-yellow-500/30">
          <h3 className="text-xl font-bold mb-4 text-yellow-300">📊 Library Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">{financialBooks.length}</div>
              <div className="text-sm text-gray-300">Total Books</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">
                {financialBooks.reduce((sum, book) => sum + book.pages, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-300">Total Pages</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">
                {Math.ceil(financialBooks.reduce((sum, book) => sum + book.pages, 0) / 250)}
              </div>
              <div className="text-sm text-gray-300">Reading Hours</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">
                {(financialBooks.reduce((sum, book) => sum + book.rating, 0) / financialBooks.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-300">Avg Rating</div>
            </div>
          </div>
        </div>

      </div>

      {/* PDF Modal Viewer - Quick View Modal */}
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
                    by {selectedBook.author} • Quick View
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={selectedBook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-yellow-600/80 hover:bg-yellow-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <button
                  onClick={() => {
                    setSelectedBook(null);
                    handleBookNavigation(selectedBook.id, selectedBook.title);
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-green-600/80 hover:bg-green-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm"
                >
                  <ExternalLink size={14} />
                  <span className="hidden sm:inline">Full Page</span>
                </button>
              </div>
            </div>
          </div>

          {/* PDF Content Viewer - Proper scroll boundaries */}
          <div className="flex-1 relative overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
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

            {/* PDF Viewer with proper scroll boundaries */}
            <div className="w-full h-full bg-white overflow-auto">
              <iframe
                src={getGooglePdfViewerUrl(selectedBook.url!)}
                className="w-full h-full border-0 block"
                title={`${selectedBook.title} - PDF Viewer`}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'block'
                }}
                loading="lazy"
                onLoad={handlePdfLoad}
                onError={handlePdfError}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialLibraryPage;