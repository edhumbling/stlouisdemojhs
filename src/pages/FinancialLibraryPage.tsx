import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Search, Book, Star, Clock, User, X, Download, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';
import ShimmerLoader from '../components/common/ShimmerLoader';
import SmartSearchBar, { SearchableItem } from '../components/common/SmartSearchBar';

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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loadingBook, setLoadingBook] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<FinancialBook | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);

  const handleBack = () => {
    navigate('/financialliteracy');
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

  // Handle book opening in modal (like dream-hive-resources)
  const openBook = (book: FinancialBook, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Scroll main page to top before opening modal
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setSelectedBook(book);
    setIsLoading(true);
  };

  // Handle PDF load completion
  const handlePdfLoad = () => {
    // Wait longer to ensure PDF is fully rendered
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handlePdfError = () => {
    // Don't hide loading immediately on error - give more time
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  // Google PDF Viewer URL helper - Always start from top
  const getGooglePdfViewerUrl = (pdfUrl: string) => {
    const timestamp = Date.now();
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true&page=1&view=FitH&toolbar=1&t=${timestamp}`;
  };

  // Handle book click for modal opening
  const handleBookClick = (book: FinancialBook) => {
    if (!book.url) return;

    setLoadingBook(book.id);
    setIsLoading(true);

    setTimeout(() => {
      setSelectedBook(book);
      setLoadingBook(null);

      // Scroll to top of main page before opening modal
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 800);
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
      topics: ['Automatic Investing', 'Pay Yourself First', 'Compound Interest', 'Wealth Building'],
      url: 'https://archive.org/download/the-automatic-millionaire-a-powerful-one-step-plan-to-live-and-finish-rich/The%20Automatic%20Millionaire%20A%20Powerful%20One-Step%20Plan%20to%20Live%20and%20Finish%20Rich.pdf'
    },
    {
      id: 'i-will-teach-you-rich',
      title: 'I Will Teach You to Be Rich',
      author: 'Ramit Sethi',
      category: 'modern',
      rating: 4.6,
      pages: 352,
      description: 'Practical 6-week program for young adults to manage money effectively.',
      topics: ['Personal Finance', 'Banking', 'Investing', 'Automation'],
      url: 'https://archive.org/download/i-will-teach-you-to-be-rich-second-edition-no-guilt-no-excuses-no-bs-just-a-6-week-program-that-works/I%20Will%20Teach%20You%20to%20Be%20Rich%2C%20Second%20Edition%20No%20Guilt.%20No%20Excuses.%20No%20BS.%20Just%20a%206-Week%20Program%20That%20Works.pdf'
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
      topics: ['Investment Philosophy', 'Business Analysis', 'Long-term Investing', 'Value Creation'],
      url: 'https://archive.org/download/the-essays-of-warren-buffett-lessons-for-corporate-america/The%20Essays%20of%20Warren%20Buffett%20Lessons%20for%20Corporate%20America.pdf'
    },
    {
      id: 'common-stocks-uncommon-profits',
      title: 'Common Stocks and Uncommon Profits',
      author: 'Philip Fisher',
      category: 'investing',
      rating: 4.6,
      pages: 288,
      description: 'Growth investing principles and company analysis techniques.',
      topics: ['Growth Investing', 'Company Analysis', 'Stock Selection', 'Investment Research'],
      url: 'https://archive.org/download/common-stocks-and-uncommon-profits-and-other-writings/Common%20Stocks%20and%20Uncommon%20Profits%20and%20Other%20Writings.pdf'
    },
    {
      id: 'random-walk-wall-street',
      title: 'A Random Walk Down Wall Street',
      author: 'Burton Malkiel',
      category: 'investing',
      rating: 4.5,
      pages: 448,
      description: 'Comprehensive guide to investing with focus on index funds and market efficiency.',
      topics: ['Index Investing', 'Market Efficiency', 'Portfolio Theory', 'Investment Strategy'],
      url: 'https://archive.org/download/a-random-walk-down-wall-street-the-time-tested-strategy-for-successful-investing/A%20Random%20Walk%20Down%20Wall%20Street%20The%20Time-Tested%20Strategy%20for%20Successful%20Investing.pdf'
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
      topics: ['Entrepreneurship', 'Innovation', 'Business Strategy', 'Startup Methodology'],
      url: 'https://archive.org/download/the-lean-startup-how-todays-entrepreneurs-use-continuous-innovation-to-create-radically-successful-businesses/The%20Lean%20Startup%20How%20Today%27s%20Entrepreneurs%20Use%20Continuous%20Innovation%20to%20Create%20Radically%20Successful%20Businesses.pdf'
    },
    {
      id: 'zero-to-one',
      title: 'Zero to One',
      author: 'Peter Thiel',
      category: 'business',
      rating: 4.3,
      pages: 224,
      description: 'Insights on building companies that create new things and monopolistic advantages.',
      topics: ['Innovation', 'Monopoly', 'Technology', 'Business Building'],
      url: 'https://archive.org/download/zero-to-one-notes-on-startups-or-how-to-build-the-future/Zero%20to%20One%20Notes%20on%20Startups%2C%20or%20How%20to%20Build%20the%20Future.pdf'
    },
    {
      id: 'good-to-great',
      title: 'Good to Great',
      author: 'Jim Collins',
      category: 'business',
      rating: 4.5,
      pages: 320,
      description: 'Research-based insights into what makes companies achieve sustained excellence.',
      topics: ['Leadership', 'Business Excellence', 'Company Culture', 'Strategic Planning'],
      url: 'https://archive.org/download/good-to-great-why-some-companies-make-the-leap-and-others-dont/Good%20to%20Great%20Why%20Some%20Companies%20Make%20the%20Leap...and%20Others%20Don%27t.pdf'
    },
    {
      id: 'cashflow-quadrant',
      title: 'Rich Dad\'s CASHFLOW Quadrant',
      author: 'Robert Kiyosaki',
      category: 'business',
      rating: 4.4,
      pages: 368,
      description: 'Guide to financial freedom through understanding different income sources.',
      topics: ['Financial Freedom', 'Passive Income', 'Business Ownership', 'Investment'],
      url: 'https://archive.org/download/rich-dads-cashflow-quadrant-guide-to-financial-freedom/Rich%20Dad%27s%20CASHFLOW%20Quadrant%20Guide%20to%20Financial%20Freedom.pdf'
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
      topics: ['Habits', 'Success Principles', 'Personal Development', 'Goal Achievement'],
      url: 'https://archive.org/download/the-compound-effect-darren-hardy/The%20Compound%20Effect%20-%20Darren%20Hardy.pdf'
    },
    {
      id: 'atomic-habits',
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'mindset',
      rating: 4.8,
      pages: 320,
      description: 'Proven framework for improving every day through tiny changes.',
      topics: ['Habit Formation', 'Behavior Change', 'Personal Growth', 'Productivity'],
      url: 'https://archive.org/download/atomic-habits-an-easy-proven-way-to-build-good-habits-break-bad-ones/Atomic%20Habits%20An%20Easy%20%26%20Proven%20Way%20to%20Build%20Good%20Habits%20%26%20Break%20Bad%20Ones.pdf'
    },
    {
      id: 'mindset',
      title: 'Mindset: The New Psychology of Success',
      author: 'Carol Dweck',
      category: 'mindset',
      rating: 4.5,
      pages: 276,
      description: 'How a simple idea about the brain can help you love challenges and transform your life.',
      topics: ['Growth Mindset', 'Psychology', 'Learning', 'Success'],
      url: 'https://archive.org/download/mindset-the-new-psychology-of-success/Mindset%20The%20New%20Psychology%20of%20Success.pdf'
    },
    {
      id: 'power-of-now',
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      category: 'mindset',
      rating: 4.4,
      pages: 236,
      description: 'Spiritual guide to enlightenment and living in the present moment.',
      topics: ['Mindfulness', 'Spirituality', 'Present Moment', 'Inner Peace'],
      url: 'https://archive.org/download/the-power-of-now-a-guide-to-spiritual-enlightenment/The%20Power%20of%20Now%20A%20Guide%20to%20Spiritual%20Enlightenment.pdf'
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
      topics: ['Fundamental Analysis', 'Value Investing', 'Security Valuation', 'Financial Analysis'],
      url: 'https://archive.org/download/security-analysis-sixth-edition-foreword-by-warren-buffett/Security%20Analysis%20Sixth%20Edition%2C%20Foreword%20by%20Warren%20Buffett.pdf'
    },
    {
      id: 'one-up-wall-street',
      title: 'One Up On Wall Street',
      author: 'Peter Lynch',
      category: 'investing',
      rating: 4.6,
      pages: 304,
      description: 'How to use what you already know to make money in the market.',
      topics: ['Stock Picking', 'Investment Strategy', 'Market Analysis', 'Individual Investing'],
      url: 'https://archive.org/download/one-up-on-wall-street-how-to-use-what-you-already-know-to-make-money-in-the-market/One%20Up%20On%20Wall%20Street%20How%20to%20Use%20What%20You%20Already%20Know%20to%20Make%20Money%20in%20the%20Market.pdf'
    },
    {
      id: 'little-book-common-sense',
      title: 'The Little Book of Common Sense Investing',
      author: 'John Bogle',
      category: 'investing',
      rating: 4.5,
      pages: 216,
      description: 'The only way to guarantee your fair share of stock market returns.',
      topics: ['Index Funds', 'Long-term Investing', 'Cost Management', 'Market Returns'],
      url: 'https://archive.org/download/the-little-book-of-common-sense-investing-the-only-way-to-guarantee-your-fair-share-of-stock-market-returns/The%20Little%20Book%20of%20Common%20Sense%20Investing%20The%20Only%20Way%20to%20Guarantee%20Your%20Fair%20Share%20of%20Stock%20Market%20Returns.pdf'
    },
    {
      id: 'margin-of-safety',
      title: 'Margin of Safety',
      author: 'Seth Klarman',
      category: 'investing',
      rating: 4.8,
      pages: 256,
      description: 'Risk-averse value investing strategies for the thoughtful investor.',
      topics: ['Risk Management', 'Value Investing', 'Market Psychology', 'Investment Philosophy'],
      url: 'https://archive.org/download/margin-of-safety-risk-averse-value-investing-strategies-for-the-thoughtful-investor/Margin%20of%20Safety%20Risk-Averse%20Value%20Investing%20Strategies%20for%20the%20Thoughtful%20Investor.pdf'
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
      topics: ['Financial Independence', 'Life Values', 'Money Management', 'Frugal Living'],
      url: 'https://archive.org/download/your-money-or-your-life-9-steps-to-transforming-your-relationship-with-money-and-achieving-financial-independence/Your%20Money%20or%20Your%20Life%209%20Steps%20to%20Transforming%20Your%20Relationship%20with%20Money%20and%20Achieving%20Financial%20Independence.pdf'
    },
    {
      id: 'barefoot-investor',
      title: 'The Barefoot Investor',
      author: 'Scott Pape',
      category: 'modern',
      rating: 4.6,
      pages: 272,
      description: 'Simple step-by-step plan to financial freedom.',
      topics: ['Financial Planning', 'Budgeting', 'Investment Strategy', 'Debt Management'],
      url: 'https://archive.org/download/the-barefoot-investor-the-only-money-guide-youll-ever-need/The%20Barefoot%20Investor%20The%20Only%20Money%20Guide%20You%27ll%20Ever%20Need.pdf'
    },
    {
      id: 'simple-path-wealth',
      title: 'The Simple Path to Wealth',
      author: 'JL Collins',
      category: 'modern',
      rating: 4.7,
      pages: 286,
      description: 'Your road map to financial independence and a rich, free life.',
      topics: ['Financial Independence', 'Index Investing', 'Wealth Building', 'FIRE Movement'],
      url: 'https://archive.org/download/the-simple-path-to-wealth-your-road-map-to-financial-independence-and-a-rich-free-life/The%20Simple%20Path%20to%20Wealth%20Your%20road%20map%20to%20financial%20independence%20and%20a%20rich%2C%20free%20life.pdf'
    },
    {
      id: 'bogleheads-guide',
      title: 'The Bogleheads\' Guide to Investing',
      author: 'Taylor Larimore, Mel Lindauer, Michael LeBoeuf',
      category: 'modern',
      rating: 4.5,
      pages: 352,
      description: 'Time-tested strategies for building wealth through index fund investing.',
      topics: ['Index Investing', 'Asset Allocation', 'Portfolio Management', 'Long-term Strategy'],
      url: 'https://archive.org/download/the-bogleheads-guide-to-investing/The%20Bogleheads%27%20Guide%20to%20Investing.pdf'
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
      topics: ['Real Estate Investing', 'Property Investment', 'Wealth Building', 'Passive Income'],
      url: 'https://archive.org/download/the-millionaire-real-estate-investor/The%20Millionaire%20Real%20Estate%20Investor.pdf'
    },
    {
      id: 'book-on-rental-property',
      title: 'The Book on Rental Property Investing',
      author: 'Brandon Turner',
      category: 'realestate',
      rating: 4.5,
      pages: 416,
      description: 'How to create wealth and passive income through rental properties.',
      topics: ['Rental Properties', 'Real Estate Analysis', 'Property Management', 'Cash Flow'],
      url: 'https://archive.org/download/the-book-on-rental-property-investing-how-to-create-wealth-and-passive-income-through-rental-properties/The%20Book%20on%20Rental%20Property%20Investing%20How%20to%20Create%20Wealth%20and%20Passive%20Income%20Through%20Rental%20Properties.pdf'
    },
    {
      id: 'cryptocurrency-investing',
      title: 'Cryptocurrency Investing For Dummies',
      author: 'Kiana Danial',
      category: 'crypto',
      rating: 4.2,
      pages: 384,
      description: 'Your guide to digital currency investment strategies.',
      topics: ['Cryptocurrency', 'Blockchain', 'Digital Assets', 'Alternative Investing'],
      url: 'https://archive.org/download/cryptocurrency-investing-for-dummies/Cryptocurrency%20Investing%20For%20Dummies.pdf'
    },
    {
      id: 'bitcoin-standard',
      title: 'The Bitcoin Standard',
      author: 'Saifedean Ammous',
      category: 'crypto',
      rating: 4.3,
      pages: 304,
      description: 'The decentralized alternative to central banking.',
      topics: ['Bitcoin', 'Monetary Theory', 'Digital Currency', 'Economic History'],
      url: 'https://archive.org/download/the-bitcoin-standard-the-decentralized-alternative-to-central-banking/The%20Bitcoin%20Standard%20The%20Decentralized%20Alternative%20to%20Central%20Banking.pdf'
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
      topics: ['Financial Freedom', 'Investment Strategy', 'Wealth Building', 'Financial Planning'],
      url: 'https://archive.org/download/money-master-the-game-7-simple-steps-to-financial-freedom/MONEY%20Master%20the%20Game%207%20Simple%20Steps%20to%20Financial%20Freedom.pdf'
    },
    {
      id: 'millionaire-fastlane',
      title: 'The Millionaire Fastlane',
      author: 'M.J. DeMarco',
      category: 'business',
      rating: 4.3,
      pages: 337,
      description: 'Crack the code to wealth and live rich for a lifetime through entrepreneurship.',
      topics: ['Entrepreneurship', 'Wealth Creation', 'Business Strategy', 'Financial Independence'],
      url: 'https://archive.org/download/the-millionaire-fastlane-crack-the-code-to-wealth-and-live-rich-for-a-lifetime/The%20Millionaire%20Fastlane%20Crack%20the%20Code%20to%20Wealth%20and%20Live%20Rich%20for%20a%20Lifetime.pdf'
    },
    {
      id: 'die-with-zero',
      title: 'Die with Zero',
      author: 'Bill Perkins',
      category: 'modern',
      rating: 3.9,
      pages: 256,
      description: 'Getting all you can from your money and your life through optimal spending.',
      topics: ['Life Optimization', 'Spending Strategy', 'Experience Economy', 'Financial Philosophy'],
      url: 'https://archive.org/download/die-with-zero-getting-all-you-can-from-your-money-and-your-life/Die%20with%20Zero%20Getting%20All%20You%20Can%20from%20Your%20Money%20and%20Your%20Life.pdf'
    },
    {
      id: 'broke-millennial',
      title: 'Broke Millennial',
      author: 'Erin Lowry',
      category: 'modern',
      rating: 3.9,
      pages: 272,
      description: 'Stop scraping by and get your financial life together with practical advice for young adults.',
      topics: ['Young Adult Finance', 'Budgeting', 'Debt Management', 'Financial Basics'],
      url: 'https://archive.org/download/broke-millennial-stop-scraping-by-and-get-your-financial-life-together/Broke%20Millennial%20Stop%20Scraping%20By%20and%20Get%20Your%20Financial%20Life%20Together.pdf'
    },
    {
      id: 'secrets-millionaire-mind',
      title: 'Secrets of the Millionaire Mind',
      author: 'T. Harv Eker',
      category: 'mindset',
      rating: 4.2,
      pages: 224,
      description: 'Mastering the inner game of wealth through mindset transformation.',
      topics: ['Wealth Mindset', 'Money Psychology', 'Success Principles', 'Mental Programming'],
      url: 'https://archive.org/download/secrets-of-the-millionaire-mind-mastering-the-inner-game-of-wealth/Secrets%20of%20the%20Millionaire%20Mind%20Mastering%20the%20Inner%20Game%20of%20Wealth.pdf'
    },
    {
      id: 'wealthy-barber',
      title: 'The Wealthy Barber',
      author: 'David Chilton',
      category: 'classic',
      rating: 4.0,
      pages: 224,
      description: 'Common sense guide to successful financial planning told through engaging stories.',
      topics: ['Financial Planning', 'Saving Strategies', 'Investment Basics', 'Retirement Planning'],
      url: 'https://archive.org/download/the-wealthy-barber-the-common-sense-guide-to-successful-financial-planning/The%20Wealthy%20Barber%20The%20Common%20Sense%20Guide%20to%20Successful%20Financial%20Planning.pdf'
    },
    {
      id: 'four-pillars-investing',
      title: 'The Four Pillars of Investing',
      author: 'William J. Bernstein',
      category: 'investing',
      rating: 4.2,
      pages: 384,
      description: 'Lessons for building a winning portfolio based on theory, history, psychology, and business.',
      topics: ['Portfolio Theory', 'Investment History', 'Behavioral Finance', 'Asset Allocation'],
      url: 'https://archive.org/download/the-four-pillars-of-investing-lessons-for-building-a-winning-portfolio/The%20Four%20Pillars%20of%20Investing%20Lessons%20for%20Building%20a%20Winning%20Portfolio.pdf'
    },
    {
      id: 'you-need-budget',
      title: 'You Need a Budget',
      author: 'Jesse Mecham',
      category: 'modern',
      rating: 4.1,
      pages: 272,
      description: 'The proven system for breaking the paycheck-to-paycheck cycle and building wealth.',
      topics: ['Budgeting System', 'Financial Control', 'Debt Elimination', 'Money Management'],
      url: 'https://archive.org/download/you-need-a-budget-the-proven-system-for-breaking-the-paycheck-to-paycheck-cycle/You%20Need%20a%20Budget%20The%20Proven%20System%20for%20Breaking%20the%20Paycheck-to-Paycheck%20Cycle.pdf'
    },
    {
      id: 'millionaire-mind',
      title: 'The Millionaire Mind',
      author: 'Thomas J. Stanley',
      category: 'classic',
      rating: 4.2,
      pages: 416,
      description: 'What makes the wealthy different - their habits, strategies, and mindset.',
      topics: ['Wealth Psychology', 'Success Habits', 'Millionaire Behavior', 'Financial Mindset'],
      url: 'https://archive.org/download/the-millionaire-mind/The%20Millionaire%20Mind.pdf'
    },
    {
      id: 'almanack-naval-ravikant',
      title: 'The Almanack of Naval Ravikant',
      author: 'Eric Jorgenson',
      category: 'modern',
      rating: 4.4,
      pages: 242,
      description: 'A guide to wealth and happiness from Silicon Valley\'s most successful angel investor.',
      topics: ['Wealth Creation', 'Happiness', 'Decision Making', 'Life Philosophy'],
      url: 'https://archive.org/download/the-almanack-of-naval-ravikant-a-guide-to-wealth-and-happiness/The%20Almanack%20of%20Naval%20Ravikant%20A%20Guide%20to%20Wealth%20and%20Happiness.pdf'
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

  // Smart Search Setup
  const searchableItems: SearchableItem[] = financialBooks.map(book => ({
    id: book.id,
    title: book.title,
    description: book.description,
    category: book.category,
    level: '', // Not used for books
    type: book.format || 'pdf',
    url: book.url || '',
    tags: book.topics,
    searchableText: `${book.title} ${book.author} ${book.description} ${book.topics.join(' ')}`,
    metadata: {
      author: book.author,
      rating: book.rating,
      pages: book.pages,
      format: book.format || 'pdf'
    }
  }));

  // Category options for smart search
  const categoryOptions = categories.map(cat => ({
    value: cat.id,
    label: cat.name,
    count: cat.count
  }));

  // Type options for smart search (based on file formats)
  const typeOptions = [
    { value: 'pdf', label: 'PDF Books', count: financialBooks.filter(book => !book.format || book.format === 'pdf').length },
    { value: 'epub', label: 'EPUB Books', count: financialBooks.filter(book => book.format === 'epub').length },
    { value: 'mobi', label: 'MOBI Books', count: financialBooks.filter(book => book.format === 'mobi').length }
  ];

  // Handle search results from SmartSearchBar
  const handleSearchResults = (results: SearchableItem[]) => {
    setSearchResults(results);
  };

  // Get books to display (either search results or all books)
  const displayedBooks = searchResults.length > 0
    ? financialBooks.filter(book => searchResults.some(result => result.id === book.id))
    : financialBooks.filter(book => selectedCategory === 'all' || book.category === selectedCategory);

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

        {/* Smart Search Bar */}
        <div className="mb-8">
          <SmartSearchBar
            items={searchableItems}
            onSearchResults={handleSearchResults}
            placeholder={`Search ${financialBooks.length}+ financial books...`}
            accentColor="green"
            categories={categoryOptions}
            types={typeOptions}
            enableIntentDetection={true}
            className="mb-6"
            pageKey="financial-library"
          />
        </div>

        {/* Books Grid - Compact Design with 2-Grid Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {displayedBooks.map((book) => (
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

                {/* Single View Book Button */}
                <button
                  onClick={(e) => book.url ? openBook(book, e) : handleBookNavigation(book.id, book.title)}
                  disabled={loadingBook === book.id}
                  className="w-full py-2 sm:py-2.5 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-600/50 text-white text-xs sm:text-sm font-medium rounded transition-all duration-200 relative overflow-hidden disabled:cursor-not-allowed"
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
                        <Book size={12} />
                        <span>View Book</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>



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

        {/* Books Grid - Compact Design with 2-Grid Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {displayedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-3 sm:p-4 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer group relative"
              onClick={() => handleBookClick(book)}
            >
              {/* Loading Overlay */}
              {loadingBook === book.id && (
                <div className="absolute inset-0 bg-black/80 rounded-lg flex items-center justify-center z-10">
                  <ShimmerLoader className="w-8 h-8" />
                </div>
              )}

              {/* Book Content */}
              <div className="space-y-2 sm:space-y-3">
                {/* Title and Author */}
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base leading-tight group-hover:text-yellow-400 transition-colors duration-200 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-1">
                    {book.author}
                  </p>
                </div>

                {/* Rating and Pages */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" fill="currentColor" />
                    <span className="text-gray-300">{book.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{book.pages}p</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
                  {book.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1">
                  {book.topics.slice(0, 2).map((topic, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                  {book.topics.length > 2 && (
                    <span className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-md">
                      +{book.topics.length - 2}
                    </span>
                  )}
                </div>

                {/* View Button */}
                <button
                  className="w-full mt-3 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  disabled={!book.url}
                >
                  {book.url ? 'View Book' : 'Coming Soon'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {displayedBooks.length === 0 && (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No books found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
          </div>
        )}

      </div>

      {/* PDF Modal Viewer - Fixed scrollbar positioning */}
      {selectedBook && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          {/* Header - Fixed height */}
          <div className="flex-shrink-0 bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900 py-4 sm:py-5 shadow-2xl border-b border-yellow-700/50">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  type="button"
                  onClick={() => setSelectedBook(null)}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-yellow-700/50 hover:bg-yellow-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm backdrop-blur-sm border border-yellow-500/30"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div className="flex-1 min-w-0">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                    {selectedBook.title}
                  </h1>
                  <p className="text-sm text-yellow-200 truncate">
                    by {selectedBook.author}
                  </p>
                </div>

                <a
                  href={selectedBook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600/80 hover:bg-yellow-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              </div>
            </div>
          </div>

          {/* Content Viewer - Flex-1 to fill remaining space exactly */}
          <div className="flex-1 relative overflow-hidden">
            {/* Shimmer Loading Overlay */}
            {isLoading && (
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
              /* Google Docs Viewer for Mobile PDFs - Internal scroll only */
              <iframe
                src={getGooglePdfViewerUrl(selectedBook.url!)}
                className="w-full h-full border-0 bg-white"
                title={`${selectedBook.title} - Mobile PDF Viewer`}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  overflow: 'hidden'
                }}
                loading="lazy"
                scrolling="auto"
                onLoad={handlePdfLoad}
                onError={handlePdfError}
              />
            ) : (
              /* Native PDF Viewer for Desktop - Internal scroll only */
              <object
                data={`${selectedBook.url}#page=1&view=FitH&toolbar=1&t=${Date.now()}`}
                type="application/pdf"
                className="w-full h-full bg-white"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  overflow: 'hidden'
                }}
                onLoad={handlePdfLoad}
                onError={handlePdfError}
              >
                {/* Fallback to Google Viewer for browsers that don't support object tag */}
                <iframe
                  src={getGooglePdfViewerUrl(selectedBook.url!)}
                  className="w-full h-full border-0 bg-white"
                  title={selectedBook.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    overflow: 'hidden'
                  }}
                  scrolling="auto"
                  onLoad={handlePdfLoad}
                  onError={handlePdfError}
                >
                  {/* Final fallback message */}
                  <div className="flex items-center justify-center w-full h-full bg-gray-50">
                    <div className="text-center max-w-md px-6">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ArrowLeft className="w-8 h-8 text-yellow-600 rotate-180" />
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialLibraryPage;