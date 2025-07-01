import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, ExternalLink, FileText } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';
import SEOHead from '../components/seo/SEOHead';

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
    } else {
      // Redirect to financial literacy page if book not found
      navigate('/financialliteracy');
    }
  }, [bookId, navigate]);

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

      {/* PDF Viewer */}
      <div className="flex-1 relative">
        {isMobile ? (
          /* Google Docs Viewer for Mobile PDFs */
          <div className="w-full h-full bg-white">
            <iframe
              src={getGooglePdfViewerUrl(selectedBook.url)}
              className="w-full h-full border-0"
              title={`${selectedBook.title} - Mobile PDF Viewer`}
              loading="lazy"
            />
          </div>
        ) : (
          /* Native PDF Viewer for Desktop */
          <div className="w-full h-full bg-white">
            <object
              data={selectedBook.url}
              type="application/pdf"
              className="w-full h-full"
            >
              {/* Fallback to Google Viewer for browsers that don't support object tag */}
              <iframe
                src={getGooglePdfViewerUrl(selectedBook.url)}
                className="w-full h-full border-0"
                title={selectedBook.title}
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
    </div>
  );
};

export default FinancialLibraryViewerPage;
