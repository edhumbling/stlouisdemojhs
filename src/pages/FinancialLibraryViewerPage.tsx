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
