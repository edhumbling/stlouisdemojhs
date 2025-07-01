import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, ExternalLink, FileText } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';
import SEOHead from '../components/seo/SEOHead';
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

const FinancialLibraryViewerPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();
  const [selectedBook, setSelectedBook] = useState<FinancialBook | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const { setShowHeader } = useHeader();

  // Financial books database
  const financialBooks: Record<string, FinancialBook> = {
    'richest-man-babylon': {
      id: 'richest-man-babylon',
      title: 'The Richest Man in Babylon',
      author: 'George S. Clason',
      description: 'Timeless financial wisdom through ancient Babylonian parables. Learn the fundamental principles of wealth building that have helped millions achieve financial success.',
      url: 'https://thediamondsmine.com/files/Ebooks/Clason-RichestManInBabylon.pdf',
      category: 'Classic Financial Wisdom',
      color: '#f59e0b'
    },
    'rich-dad-poor-dad': {
      id: 'rich-dad-poor-dad',
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      description: 'The #1 personal finance book of all time. Discover what the rich teach their kids about money that the poor and middle class do not.',
      url: 'https://archive.org/download/rich-dad-poor-dad_bongotweet/rich-dad-poor-dad.pdf',
      category: 'Classic Financial Wisdom',
      color: '#f59e0b'
    },
    'millionaire-next-door': {
      id: 'millionaire-next-door',
      title: 'The Millionaire Next Door',
      author: 'Thomas Stanley & William Danko',
      description: 'Groundbreaking research revealing the surprising secrets of America\'s wealthy and how ordinary people build extraordinary wealth.',
      url: 'https://archive.org/download/StanleyThomasJDankoWilliamDTheMillionaireNextDoorTheSurprisingSecretsOfAmericasWealthy/Stanley%2C%20Thomas%20J%20%26%20Danko%2C%20William%20D%20-%20The%20Millionaire%20Next%20Door%20-%20The%20Surprising%20Secrets%20of%20America%27s%20Wealthy.pdf',
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
    'total-money-makeover': {
      id: 'total-money-makeover',
      title: 'The Total Money Makeover',
      author: 'Dave Ramsey',
      description: 'A proven plan for financial fitness. Learn Dave Ramsey\'s step-by-step approach to getting out of debt and building wealth.',
      url: 'https://archive.org/download/the-total-money-makeover-a-proven-plan-for-financial-fitness_202102/The%20Total%20Money%20Makeover%20A%20Proven%20Plan%20For%20Financial%20Fitness.pdf',
      category: 'Modern Financial Strategies',
      color: '#10b981'
    },
    'if-you-can': {
      id: 'if-you-can',
      title: 'If You Can',
      author: 'William Bernstein',
      description: 'How Millennials Can Get Rich Slowly. This excellent 15-page PDF provides practical investment advice specifically for young people.',
      url: 'https://www.etf.com/docs/IfYouCan.pdf',
      category: 'Modern Financial Strategies',
      color: '#10b981'
    },
    'practical-money-skills': {
      id: 'practical-money-skills',
      title: 'Practical Money Skills',
      author: 'Visa Foundation',
      description: 'Professional financial education curriculum from Visa. Comprehensive lessons on budgeting, saving, credit, and financial planning for students.',
      url: 'https://usa.visa.com/dam/VCOM/download/corporate/media/PMSFL_Everyone_070214.pdf',
      category: 'Government & Institutional Resources',
      color: '#8b5cf6'
    },
    'your-money-or-your-life': {
      id: 'your-money-or-your-life',
      title: 'Your Money or Your Life',
      author: 'Vicki Robin & Joe Dominguez',
      description: 'Transform your relationship with money and achieve financial independence. This groundbreaking book provides a proven program for financial freedom.',
      url: 'https://archive.org/download/your-money-or-your-life-9-steps-to-transforming-your-relationship-with-money-and-achieving-financial-independence-revised-and-updated-for-the-21st-century/Your%20Money%20or%20Your%20Life_%209%20Steps%20to%20Transforming%20Your%20Relationship%20with%20Money%20and%20Achieving%20Financial%20Independence%20-%20Revised%20and%20Updated%20for%20the%2021st%20Century.pdf',
      category: 'Classic Financial Wisdom',
      color: '#f59e0b'
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
    'think-and-grow-rich': {
      id: 'think-and-grow-rich',
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      description: 'The classic guide to wealth and success. Based on 25 years of research into the lives of successful people, this book reveals the secrets of achievement.',
      url: 'https://archive.org/download/think-and-grow-rich/think-and-grow-rich.pdf',
      category: 'Mindset & Success',
      color: '#dc2626'
    },
    'compound-effect': {
      id: 'compound-effect',
      title: 'The Compound Effect',
      author: 'Darren Hardy',
      description: 'Discover how small, smart choices compound into remarkable results. Learn the principle that can transform your life and finances through consistent action.',
      url: 'https://archive.org/download/sheikh-yameen-100-best-selling-self-help-books_202107/The%20Compound%20Effect%20-%20Darren%20hardy.pdf',
      category: 'Mindset & Success',
      color: '#dc2626'
    },
    'atomic-habits': {
      id: 'atomic-habits',
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'An easy and proven way to build good habits and break bad ones. Learn how tiny changes can lead to remarkable financial and life improvements.',
      url: 'https://archive.org/download/atomic-habits-pdfdrive/Atomic%20habits%20%28%20PDFDrive%20%29.pdf',
      category: 'Mindset & Success',
      color: '#dc2626'
    },
    'automatic-millionaire': {
      id: 'automatic-millionaire',
      title: 'The Automatic Millionaire',
      author: 'David Bach',
      description: 'A powerful one-step plan to live and finish rich. Learn how to automate your finances and build wealth without budgeting or discipline.',
      url: 'https://archive.org/download/the-automatic-millionaire-a-powerful-one-step-plan-to-live-and-finish-rich/The%20Automatic%20Millionaire_%20A%20Powerful%20One-Step%20Plan%20to%20Live%20and%20Finish%20Rich.pdf',
      category: 'Investment & Wealth Building',
      color: '#059669'
    },
    'little-book-common-sense-investing': {
      id: 'little-book-common-sense-investing',
      title: 'The Little Book of Common Sense Investing',
      author: 'John C. Bogle',
      description: 'The classic guide to getting smart about the market. Learn the only way to guarantee your fair share of stock market returns through index investing.',
      url: 'https://archive.org/download/littlebookofcomm0000bogl_o5f9/littlebookofcomm0000bogl_o5f9.pdf',
      category: 'Investment & Wealth Building',
      color: '#059669'
    },
    'random-walk-wall-street': {
      id: 'random-walk-wall-street',
      title: 'A Random Walk Down Wall Street',
      author: 'Burton Malkiel',
      description: 'The time-tested strategy for successful investing. Learn why a blindfolded monkey throwing darts can select a portfolio as well as the experts.',
      url: 'https://archive.org/download/randomwalkdownwa0000malk_n9g7/randomwalkdownwa0000malk_n9g7.pdf',
      category: 'Investment & Wealth Building',
      color: '#059669'
    },
    'wealthy-barber': {
      id: 'wealthy-barber',
      title: 'The Wealthy Barber',
      author: 'David Chilton',
      description: 'The common sense guide to successful financial planning. Learn financial wisdom through an entertaining story format that makes complex concepts simple.',
      url: 'https://archive.org/download/wealthybarbereve00chil_0/wealthybarbereve00chil_0.pdf',
      category: 'Classic Financial Wisdom',
      color: '#f59e0b'
    },
    'science-getting-rich': {
      id: 'science-getting-rich',
      title: 'The Science of Getting Rich',
      author: 'Wallace D. Wattles',
      description: 'The classic 1910 guide to wealth creation. Learn the scientific approach to getting rich through right thinking and definite action.',
      url: 'https://archive.org/download/TheScienceOfGettingRich.pdf/the_science_of_getting_rich.pdf',
      category: 'Classic Financial Wisdom',
      color: '#f59e0b'
    },
    'cashflow-quadrant': {
      id: 'cashflow-quadrant',
      title: 'The Cashflow Quadrant',
      author: 'Robert Kiyosaki',
      description: 'Rich Dad\'s guide to financial freedom. Learn the four different ways people make money and how to move from employee to investor.',
      url: 'https://archive.org/download/rich-dad-poor-dad_bongotweet/rich-dad-poor-dad.pdf',
      category: 'Modern Financial Strategies',
      color: '#10b981'
    },
    'four-hour-workweek': {
      id: 'four-hour-workweek',
      title: 'The 4-Hour Workweek',
      author: 'Tim Ferriss',
      description: 'Escape 9-5, live anywhere, and join the new rich. Learn how to eliminate, automate, and liberate yourself to create the lifestyle you want.',
      url: 'https://archive.org/download/FERRISSTimothyThe4HourWorkweek/FERRISS_Timothy_-_The_4-Hour_Workweek.pdf',
      category: 'Entrepreneurship & Business',
      color: '#7c3aed'
    },
    'lean-startup': {
      id: 'lean-startup',
      title: 'The Lean Startup',
      author: 'Eric Ries',
      description: 'How constant innovation creates radically successful businesses. Learn the methodology for developing businesses and products through validated learning.',
      url: 'https://archive.org/download/TheLeanStartupErickRies/The%20Lean%20Startup%20-%20Erick%20Ries.pdf',
      category: 'Entrepreneurship & Business',
      color: '#7c3aed'
    },
    'e-myth-revisited': {
      id: 'e-myth-revisited',
      title: 'The E-Myth Revisited',
      author: 'Michael E. Gerber',
      description: 'Why most small businesses don\'t work and what to do about it. Learn the entrepreneurial myth and how to build a business that works without you.',
      url: 'https://archive.org/download/TheEMythRevisitedMichaelE.Gerber/The%20E-Myth%20Revisited%20-%20Michael%20E.%20Gerber.pdf',
      category: 'Entrepreneurship & Business',
      color: '#7c3aed'
    },
    'zero-to-one': {
      id: 'zero-to-one',
      title: 'Zero to One',
      author: 'Peter Thiel',
      description: 'Notes on startups, or how to build the future. Learn how to build companies that create new things and go from zero to one.',
      url: 'https://archive.org/download/zero-to-one-peter-thiel-and-blake-masters/zero-to-one-peter-thiel-and-blake-masters.pdf',
      category: 'Entrepreneurship & Business',
      color: '#7c3aed'
    },
    'millionaire-fastlane': {
      id: 'millionaire-fastlane',
      title: 'The Millionaire Fastlane',
      author: 'MJ DeMarco',
      description: 'Crack the code to wealth and live rich for a lifetime. Learn the fastlane to millions through entrepreneurship and business ownership.',
      url: 'https://archive.org/download/the-millionaire-fastlane-140113153049-phpapp01/the-millionaire-fastlane.pdf',
      category: 'Entrepreneurship & Business',
      color: '#7c3aed'
    },
    'simple-dollar-guide': {
      id: 'simple-dollar-guide',
      title: 'Everything You Need to Know About Personal Finance',
      author: 'Trent Hamm (The Simple Dollar)',
      description: 'A comprehensive one-page guide to personal finance covering budgeting, saving, investing, and building wealth. Perfect for beginners.',
      url: 'https://archive.org/download/EverythingYouEverReallyNeededToKnowAboutPersonalFinanceOnJustOne/OnePage.pdf',
      category: 'Modern Financial Strategies',
      color: '#10b981'
    },
    'dhandho-investor': {
      id: 'dhandho-investor',
      title: 'The Dhandho Investor',
      author: 'Mohnish Pabrai',
      description: 'The low-risk value method to high returns. Learn the investment philosophy that has made fortunes for generations of Indian businessmen.',
      url: 'https://archive.org/download/dhandhoinvestorl00pabr_0/dhandhoinvestorl00pabr_0.pdf',
      category: 'Investment & Wealth Building',
      color: '#059669'
    },
    'little-book-value-investing': {
      id: 'little-book-value-investing',
      title: 'The Little Book of Value Investing',
      author: 'Christopher H. Browne',
      description: 'A proven approach for finding undervalued stocks. Learn the time-tested strategies of value investing from a Wall Street veteran.',
      url: 'https://archive.org/download/littlebookofvalu0000brow/littlebookofvalu0000brow.pdf',
      category: 'Investment & Wealth Building',
      color: '#059669'
    },
    'little-book-bull-moves': {
      id: 'little-book-bull-moves',
      title: 'The Little Book of Bull Moves',
      author: 'Peter D. Schiff',
      description: 'How to keep your portfolio up when the market is down. Learn contrarian investment strategies for bear markets.',
      url: 'https://archive.org/download/pdfy-EC7QAM3D1KofSGi9/Peter%20Schiff%20-%20The%20Little%20Book%20of%20Bull%20Moves%20in%20Bear%20Markets.pdf',
      category: 'Investment & Wealth Building',
      color: '#059669'
    },
    'how-economy-grows': {
      id: 'how-economy-grows',
      title: 'How an Economy Grows and Why It Crashes',
      author: 'Peter D. Schiff & Andrew J. Schiff',
      description: 'An illustrated guide to economics using humor and simple examples. Understand how economies work and why they sometimes fail.',
      url: 'https://ia601405.us.archive.org/14/items/how-an-economy-grows-and-why-it-crashes-by-schiff/How%20an%20Economy%20Grows%20and%20Why%20It%20Crashes%20by%20Schiff.pdf',
      category: 'Economic Education',
      color: '#0ea5e9'
    },
    'little-book-beats-market': {
      id: 'little-book-beats-market',
      title: 'The Little Book That Still Beats the Market',
      author: 'Joel Greenblatt',
      description: 'A simple formula for finding great investments. Learn the magic formula that has consistently beaten the market.',
      url: 'https://archive.org/download/littlebookthatst0000gree/littlebookthatst0000gree.pdf',
      category: 'Investment & Wealth Building',
      color: '#059669'
    },
    'essays-warren-buffett': {
      id: 'essays-warren-buffett',
      title: 'The Essays of Warren Buffett',
      author: 'Warren Buffett & Lawrence Cunningham',
      description: 'Lessons for corporate America from the Oracle of Omaha. Direct wisdom from Warren Buffett\'s annual letters to shareholders.',
      url: 'https://archive.org/download/pdfy-Ey8vCqxHzf5bXMbi/The+Essays+Of+Warren+Buffett+-+Lessons+For+Corporate+America.pdf',
      category: 'Investment & Wealth Building',
      color: '#059669'
    },
    'coffeehouse-investor': {
      id: 'coffeehouse-investor',
      title: 'The Coffeehouse Investor',
      author: 'Bill Schultheis',
      description: 'How to build wealth, ignore Wall Street, and get on with your life. A simple approach to investing that works.',
      url: 'https://archive.org/download/coffeehouseinves0000schu_r0y5/coffeehouseinves0000schu_r0y5.pdf',
      category: 'Investment & Wealth Building',
      color: '#059669'
    },
    'lazy-persons-investing': {
      id: 'lazy-persons-investing',
      title: 'The Lazy Person\'s Guide to Investing',
      author: 'Paul B. Farrell',
      description: 'A book for procrastinators, the financially challenged, and everyone who worries about dealing with their money.',
      url: 'https://archive.org/download/lazypersonsguide0000farr/lazypersonsguide0000farr.pdf',
      category: 'Investment & Wealth Building',
      color: '#059669'
    }
  };

  // Helper functions
  const getGooglePdfViewerUrl = (url: string) => {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const handleBack = () => {
    navigate('/financialliteracy');
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set selected book based on URL parameter
  useEffect(() => {
    if (bookId && financialBooks[bookId]) {
      setSelectedBook(financialBooks[bookId]);
      // Reset loading states when book changes
      setIsLoading(true);
      setPdfLoaded(false);

      // Initial loading timer
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(loadingTimer);
    } else {
      // Redirect to financial literacy page if book not found
      navigate('/financialliteracy');
    }
  }, [bookId, navigate]);

  // Handle PDF load events
  const handlePdfLoad = () => {
    setPdfLoaded(true);
    setIsLoading(false);
  };

  const handlePdfError = () => {
    setPdfLoaded(false);
    setIsLoading(false);
  };

  // Control header visibility
  useEffect(() => {
    setShowHeader(false);
    return () => {
      setShowHeader(true);
    };
  }, [setShowHeader]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Silver shimmer loading component
  const SilverShimmerLoader = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
      {/* Animated silver shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -skew-x-12 animate-shimmer"></div>

      {/* Content placeholder */}
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full mb-6 animate-pulse shadow-lg"></div>

        <div className="text-center space-y-4">
          <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg w-64 animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg w-48 animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg w-56 animate-pulse"></div>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <div className="text-lg font-semibold text-gray-600 mb-2">Loading {selectedBook?.title}</div>
          <div className="text-sm text-gray-500">Preparing your reading experience...</div>
        </div>

        {/* Loading dots animation */}
        <div className="flex space-x-2 mt-6">
          <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* Additional shimmer lines for document effect */}
      <div className="absolute top-20 left-8 right-8 space-y-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-3 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse"
            style={{
              width: `${Math.random() * 40 + 60}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );

  if (!selectedBook) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <SEOHead
        title={`${selectedBook.title} by ${selectedBook.author} | Financial Literacy Library - St. Louis Demonstration JHS`}
        description={selectedBook.description}
        keywords={`${selectedBook.title}, ${selectedBook.author}, financial literacy, personal finance, money management, wealth building`}
        url={`/financial-library/${selectedBook.id}`}
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

      {/* Header Bar */}
      <div className="bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900 py-3 sm:py-4 flex-shrink-0 border-b border-yellow-700/30">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Left side - Back button and title */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-3 py-2 bg-yellow-700/50 hover:bg-yellow-600/70 text-white font-medium rounded-lg transition-all duration-300 text-sm backdrop-blur-sm border border-yellow-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back</span>
              </button>

              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg font-bold text-white truncate">
                  {selectedBook.title}
                </h1>
                <p className="text-xs sm:text-sm text-yellow-200 truncate">
                  by {selectedBook.author}
                </p>
              </div>
            </div>

            {/* Right side - Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={selectedBook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-all duration-300 text-sm"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Download</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer with Loading States */}
      <div className="flex-1 relative">
        {/* Show shimmer loader while loading */}
        {isLoading && (
          <div className="absolute inset-0 z-10">
            <SilverShimmerLoader />
          </div>
        )}

        {/* PDF Content */}
        <div className={`w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {isMobile ? (
            /* Google Docs Viewer for Mobile PDFs */
            <div className="w-full h-full bg-white">
              <iframe
                src={getGooglePdfViewerUrl(selectedBook.url)}
                className="w-full h-full border-0"
                title={`${selectedBook.title} - Mobile PDF Viewer`}
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
                onLoad={handlePdfLoad}
                onError={handlePdfError}
              >
                {/* Fallback to Google Viewer for browsers that don't support object tag */}
                <iframe
                  src={getGooglePdfViewerUrl(selectedBook.url)}
                  className="w-full h-full border-0"
                  title={selectedBook.title}
                  onLoad={handlePdfLoad}
                  onError={handlePdfError}
                >
                  {/* Final fallback message */}
                  <div className="flex items-center justify-center w-full h-full bg-gray-50">
                    <div className="text-center max-w-md px-6">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-yellow-600" />
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

        {/* Loading indicator overlay for additional feedback */}
        {isLoading && (
          <div className="absolute bottom-4 right-4 z-20">
            <div className="bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="text-sm">Loading PDF...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialLibraryViewerPage;
