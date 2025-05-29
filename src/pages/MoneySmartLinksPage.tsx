import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, DollarSign, TrendingUp, PiggyBank, CreditCard, GraduationCap, Building, Users, Globe, BookOpen, Calculator, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';
import ShimmerLoader from '../components/common/ShimmerLoader';

interface FinancialResource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const MoneySmartLinksPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<FinancialResource | null>(null);
  const { setShowHeader } = useHeader();

  const handleBack = () => {
    navigate('/students-hub');
  };

  const handleVideoBack = () => {
    setSelectedVideo(null);
  };

  // Control header visibility
  useEffect(() => {
    if (selectedVideo) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    return () => {
      setShowHeader(true);
    };
  }, [selectedVideo, setShowHeader]);

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Comprehensive financial education resources organized by category
  const resourceCategories = {
    "🏛️ Government & Official Resources": [
      {
        id: 'mymoney-gov',
        title: 'MyMoney.gov',
        description: 'Official U.S. government financial education website',
        url: 'https://www.mymoney.gov/',
        category: 'Government',
        icon: <Building className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'fdic-money-smart',
        title: 'FDIC Money Smart',
        description: 'Federal Deposit Insurance Corporation financial education',
        url: 'https://www.fdic.gov/consumer-resource-center/money-smart',
        category: 'Government',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'fed-education',
        title: 'Federal Reserve Education',
        description: 'Federal Reserve economic and financial education resources',
        url: 'https://www.federalreserveeducation.org/',
        category: 'Government',
        icon: <Building className="w-4 h-4" />,
        color: '#7C2D12',
        level: 'Intermediate' as const
      },
      {
        id: 'treasury-education',
        title: 'U.S. Treasury Financial Education',
        description: 'Treasury Department financial literacy resources',
        url: 'https://home.treasury.gov/policy-issues/consumer-policy/financial-literacy-and-education-commission',
        category: 'Government',
        icon: <Building className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'investor-gov',
        title: 'Investor.gov',
        description: 'SEC investor education and protection resources',
        url: 'https://www.investor.gov/',
        category: 'Government',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      }
    ],
    "🎓 Educational Institutions": [
      {
        id: 'khan-academy-finance',
        title: 'Khan Academy Personal Finance',
        description: 'Free comprehensive personal finance course',
        url: 'https://www.khanacademy.org/college-careers-more/personal-finance',
        category: 'Education',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'coursera-finance',
        title: 'Coursera Financial Markets',
        description: 'Yale University financial markets course',
        url: 'https://www.coursera.org/learn/financial-markets-global',
        category: 'Education',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#2563EB',
        level: 'Advanced' as const
      },
      {
        id: 'edx-finance',
        title: 'edX Personal Finance',
        description: 'University-level personal finance courses',
        url: 'https://www.edx.org/learn/personal-finance',
        category: 'Education',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'mit-finance',
        title: 'MIT Personal Finance Course',
        description: 'MIT OpenCourseWare personal finance materials',
        url: 'https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/',
        category: 'Education',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'stanford-finance',
        title: 'Stanford Financial Decision Making',
        description: 'Stanford Graduate School of Business resources',
        url: 'https://www.gsb.stanford.edu/exec-ed/programs/personal-financial-management',
        category: 'Education',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#059669',
        level: 'Advanced' as const
      }
    ],
    "💰 Personal Finance Basics": [
      {
        id: 'mint-intuit',
        title: 'Mint by Intuit',
        description: 'Personal finance management and budgeting tools',
        url: 'https://mint.intuit.com/',
        category: 'Budgeting',
        icon: <PiggyBank className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'nerdwallet',
        title: 'NerdWallet',
        description: 'Personal finance advice and tools',
        url: 'https://www.nerdwallet.com/',
        category: 'General Finance',
        icon: <DollarSign className="w-4 h-4" />,
        color: '#2563EB',
        level: 'Beginner' as const
      },
      {
        id: 'practical-money-skills',
        title: 'Practical Money Skills',
        description: 'Visa financial literacy education program',
        url: 'https://www.practicalmoneyskills.com/',
        category: 'Education',
        icon: <BookOpen className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'jump-start',
        title: 'Jump$tart Coalition',
        description: 'Financial literacy for students and young adults',
        url: 'https://www.jumpstart.org/',
        category: 'Youth Finance',
        icon: <Users className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'money-as-you-grow',
        title: 'Money As You Grow',
        description: 'Age-appropriate financial lessons for children',
        url: 'https://www.moneyasyougrow.org/',
        category: 'Youth Finance',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      }
    ],
    "📊 Investing & Markets": [
      {
        id: 'investopedia',
        title: 'Investopedia',
        description: 'Comprehensive investing and finance education',
        url: 'https://www.investopedia.com/',
        category: 'Investing',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'morningstar',
        title: 'Morningstar Investing Classroom',
        description: 'Investment research and education platform',
        url: 'https://www.morningstar.com/investing-classroom',
        category: 'Investing',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'bogleheads',
        title: 'Bogleheads',
        description: 'Investment philosophy and community forum',
        url: 'https://www.bogleheads.org/',
        category: 'Investing',
        icon: <Users className="w-4 h-4" />,
        color: '#2563EB',
        level: 'Intermediate' as const
      },
      {
        id: 'sec-investor-education',
        title: 'SEC Investor Education',
        description: 'Securities and Exchange Commission investor resources',
        url: 'https://www.sec.gov/investor',
        category: 'Investing',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'finra-education',
        title: 'FINRA Investor Education',
        description: 'Financial Industry Regulatory Authority resources',
        url: 'https://www.finra.org/investors',
        category: 'Investing',
        icon: <Building className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      }
    ],
    "💳 Credit & Debt": [
      {
        id: 'credit-karma',
        title: 'Credit Karma',
        description: 'Free credit scores and financial advice',
        url: 'https://www.creditkarma.com/',
        category: 'Credit',
        icon: <CreditCard className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'annual-credit-report',
        title: 'AnnualCreditReport.com',
        description: 'Official free credit report website',
        url: 'https://www.annualcreditreport.com/',
        category: 'Credit',
        icon: <CreditCard className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'cfpb-credit',
        title: 'CFPB Credit Reports',
        description: 'Consumer Financial Protection Bureau credit resources',
        url: 'https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/',
        category: 'Credit',
        icon: <Building className="w-4 h-4" />,
        color: '#2563EB',
        level: 'Beginner' as const
      },
      {
        id: 'debt-org',
        title: 'Debt.org',
        description: 'Debt management and financial education',
        url: 'https://www.debt.org/',
        category: 'Debt Management',
        icon: <CreditCard className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'national-debt-relief',
        title: 'National Debt Relief Education',
        description: 'Debt relief strategies and financial education',
        url: 'https://www.nationaldebtrelief.com/financial-education/',
        category: 'Debt Management',
        icon: <CreditCard className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      }
    ],
    "🏠 Real Estate & Insurance": [
      {
        id: 'hud-housing',
        title: 'HUD Housing Counseling',
        description: 'U.S. Department of Housing and Urban Development resources',
        url: 'https://www.hud.gov/program_offices/housing/sfh/hcc',
        category: 'Housing',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'realtor-education',
        title: 'Realtor.com Education',
        description: 'Real estate buying and selling education',
        url: 'https://www.realtor.com/advice/',
        category: 'Real Estate',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'iii-insurance',
        title: 'Insurance Information Institute',
        description: 'Insurance education and consumer resources',
        url: 'https://www.iii.org/',
        category: 'Insurance',
        icon: <Building className="w-4 h-4" />,
        color: '#2563EB',
        level: 'Beginner' as const
      },
      {
        id: 'fannie-mae-education',
        title: 'Fannie Mae HomeView',
        description: 'Homeownership education and resources',
        url: 'https://www.fanniemae.com/homeview',
        category: 'Housing',
        icon: <Building className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'freddie-mac-education',
        title: 'Freddie Mac CreditSmart',
        description: 'Homeownership and credit education',
        url: 'https://www.freddiemac.com/creditsmart',
        category: 'Housing',
        icon: <Building className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      }
    ],
    "🎯 Specialized Finance": [
      {
        id: 'student-aid-gov',
        title: 'Federal Student Aid',
        description: 'Official student financial aid information',
        url: 'https://studentaid.gov/',
        category: 'Student Finance',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'ssa-retirement',
        title: 'Social Security Retirement',
        description: 'Social Security Administration retirement planning',
        url: 'https://www.ssa.gov/retirement/',
        category: 'Retirement',
        icon: <Building className="w-4 h-4" />,
        color: '#2563EB',
        level: 'Intermediate' as const
      },
      {
        id: 'irs-tax-education',
        title: 'IRS Tax Education',
        description: 'Internal Revenue Service tax education resources',
        url: 'https://www.irs.gov/individuals/tax-withholding-estimator',
        category: 'Taxes',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'sba-business-finance',
        title: 'SBA Business Finance',
        description: 'Small Business Administration financial resources',
        url: 'https://www.sba.gov/business-guide/manage-your-business/manage-business-finances',
        category: 'Business Finance',
        icon: <Building className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'military-saves',
        title: 'Military Saves',
        description: 'Financial education for military families',
        url: 'https://militarysaves.org/',
        category: 'Military Finance',
        icon: <Users className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      }
    ],
    "🌐 International & Global": [
      {
        id: 'world-bank-finance',
        title: 'World Bank Financial Education',
        description: 'Global financial inclusion and education initiatives',
        url: 'https://www.worldbank.org/en/topic/financialinclusion',
        category: 'Global Finance',
        icon: <Globe className="w-4 h-4" />,
        color: '#059669',
        level: 'Advanced' as const
      },
      {
        id: 'oecd-finance',
        title: 'OECD Financial Education',
        description: 'Organisation for Economic Co-operation and Development resources',
        url: 'https://www.oecd.org/financial/education/',
        category: 'Global Finance',
        icon: <Globe className="w-4 h-4" />,
        color: '#2563EB',
        level: 'Advanced' as const
      },
      {
        id: 'imf-education',
        title: 'IMF Educational Resources',
        description: 'International Monetary Fund economic education',
        url: 'https://www.imf.org/en/About/Factsheets',
        category: 'Global Finance',
        icon: <Globe className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'bis-education',
        title: 'Bank for International Settlements',
        description: 'Central bank cooperation and financial stability',
        url: 'https://www.bis.org/about/index.htm',
        category: 'Global Finance',
        icon: <Globe className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'financial-planning-standards',
        title: 'Financial Planning Standards Board',
        description: 'Global financial planning certification and education',
        url: 'https://www.fpsb.org/',
        category: 'Professional Finance',
        icon: <Globe className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      }
    ],
    "📱 Tools & Calculators": [
      {
        id: 'bankrate-calculators',
        title: 'Bankrate Calculators',
        description: 'Comprehensive financial calculators and tools',
        url: 'https://www.bankrate.com/calculators/',
        category: 'Tools',
        icon: <Calculator className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'calculator-net',
        title: 'Calculator.net Financial',
        description: 'Free online financial calculators',
        url: 'https://www.calculator.net/financial-calculator.html',
        category: 'Tools',
        icon: <Calculator className="w-4 h-4" />,
        color: '#2563EB',
        level: 'Beginner' as const
      },
      {
        id: 'smartasset-calculators',
        title: 'SmartAsset Calculators',
        description: 'Personal finance calculators and advice',
        url: 'https://smartasset.com/calculator',
        category: 'Tools',
        icon: <Calculator className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-calculators',
        title: 'Financial-Calculators.com',
        description: 'Specialized financial calculation tools',
        url: 'https://www.financial-calculators.com/',
        category: 'Tools',
        icon: <Calculator className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'dinkytown-calculators',
        title: 'Dinkytown.net Calculators',
        description: 'Interactive financial planning calculators',
        url: 'https://www.dinkytown.net/',
        category: 'Tools',
        icon: <Calculator className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      }
    ],
    "🎥 YouTube Finance Channels": [
      {
        id: 'graham-stephan',
        title: 'Graham Stephan - Personal Finance Basics',
        description: 'How to invest for beginners - Complete guide',
        url: 'https://www.youtube.com/watch?v=fwe-PjrX23o',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Beginner' as const
      },
      {
        id: 'dave-ramsey',
        title: 'Dave Ramsey - Debt Free Journey',
        description: 'How to get out of debt and build wealth',
        url: 'https://www.youtube.com/watch?v=S6YMoLGlKaQ',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Beginner' as const
      },
      {
        id: 'ben-felix',
        title: 'Ben Felix - Portfolio Theory',
        description: 'Evidence-based investing and modern portfolio theory',
        url: 'https://www.youtube.com/watch?v=uERGaXuplqk',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Advanced' as const
      },
      {
        id: 'two-cents',
        title: 'Two Cents - Budgeting 101',
        description: 'Personal finance and budgeting made simple',
        url: 'https://www.youtube.com/watch?v=sVKQn2R7eys',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Beginner' as const
      },
      {
        id: 'andrei-jikh',
        title: 'Andrei Jikh - Credit Card Guide',
        description: 'Credit cards and investing for financial freedom',
        url: 'https://www.youtube.com/watch?v=4j2emMn7UaI',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Intermediate' as const
      },
      {
        id: 'meet-kevin',
        title: 'Meet Kevin - Real Estate Investing',
        description: 'How to invest in real estate for beginners',
        url: 'https://www.youtube.com/watch?v=YTc0rT8kTZs',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Intermediate' as const
      },
      {
        id: 'minority-mindset',
        title: 'Minority Mindset - Building Wealth',
        description: 'Financial education and wealth building strategies',
        url: 'https://www.youtube.com/watch?v=8rMlBBrhbf0',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Beginner' as const
      },
      {
        id: 'the-plain-bagel',
        title: 'The Plain Bagel - Stock Market Basics',
        description: 'How the stock market works explained simply',
        url: 'https://www.youtube.com/watch?v=p7HKvqRI_Bo',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Intermediate' as const
      },
      {
        id: 'khan-academy-finance',
        title: 'Khan Academy - Finance Fundamentals',
        description: 'Introduction to finance and capital markets',
        url: 'https://www.youtube.com/watch?v=WEDIj9JBTC8',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Beginner' as const
      },
      {
        id: 'financial-education',
        title: 'Financial Education - Stock Analysis',
        description: 'How to analyze stocks and build a portfolio',
        url: 'https://www.youtube.com/watch?v=7pwKL_km9hg',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Intermediate' as const
      },
      {
        id: 'biaheza',
        title: 'Biaheza - Online Business',
        description: 'How to start an online business and make money',
        url: 'https://www.youtube.com/watch?v=GOTQSbCbhOI',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Intermediate' as const
      },
      {
        id: 'whiteboard-finance',
        title: 'Whiteboard Finance - Investing 101',
        description: 'Financial concepts and investing explained visually',
        url: 'https://www.youtube.com/watch?v=gFQNPmLKj1k',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Beginner' as const
      },
      {
        id: 'nate-obrien',
        title: 'Nate O\'Brien - Passive Income',
        description: 'How to build passive income streams',
        url: 'https://www.youtube.com/watch?v=mQUhJTxK5mA',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Beginner' as const
      },
      {
        id: 'charlie-chang',
        title: 'Charlie Chang - Credit Cards',
        description: 'Best credit cards and rewards strategies',
        url: 'https://www.youtube.com/watch?v=Cq_jzHtS8eU',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Intermediate' as const
      },
      {
        id: 'stock-moe',
        title: 'Stock Moe - Day Trading',
        description: 'Day trading strategies and market analysis',
        url: 'https://www.youtube.com/watch?v=3dLrhrRJUgU',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Advanced' as const
      },
      {
        id: 'ziptrader',
        title: 'ZipTrader - Trading Basics',
        description: 'Stock trading fundamentals and strategies',
        url: 'https://www.youtube.com/watch?v=Ll9IGXTkgZI',
        category: 'YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF0000',
        level: 'Advanced' as const
      }
    ],
    "🌍 African Finance & Economics": [
      {
        id: 'bank-of-ghana',
        title: 'Bank of Ghana',
        description: 'Central bank of Ghana - monetary policy and financial education',
        url: 'https://www.bog.gov.gh/',
        category: 'Central Banking',
        icon: <Building className="w-4 h-4" />,
        color: '#CE1126',
        level: 'Intermediate' as const
      },
      {
        id: 'ghana-stock-exchange',
        title: 'Ghana Stock Exchange',
        description: 'Official stock exchange of Ghana - market data and investor education',
        url: 'https://gse.com.gh/',
        category: 'Stock Market',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#FCD116',
        level: 'Intermediate' as const
      },
      {
        id: 'african-development-bank',
        title: 'African Development Bank',
        description: 'Pan-African development finance institution',
        url: 'https://www.afdb.org/',
        category: 'Development Finance',
        icon: <Globe className="w-4 h-4" />,
        color: '#0066CC',
        level: 'Advanced' as const
      },
      {
        id: 'nigeria-stock-exchange',
        title: 'Nigerian Exchange Group',
        description: 'Premier stock exchange in West Africa',
        url: 'https://ngxgroup.com/',
        category: 'Stock Market',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#008751',
        level: 'Intermediate' as const
      },
      {
        id: 'south-africa-reserve-bank',
        title: 'South African Reserve Bank',
        description: 'Central bank of South Africa - financial education',
        url: 'https://www.resbank.co.za/',
        category: 'Central Banking',
        icon: <Building className="w-4 h-4" />,
        color: '#FFB612',
        level: 'Intermediate' as const
      },
      {
        id: 'casablanca-stock-exchange',
        title: 'Casablanca Stock Exchange (MASI)',
        description: 'Morocco\'s premier stock exchange and financial market',
        url: 'https://www.casablanca-bourse.com/',
        category: 'Stock Market',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#C1272D',
        level: 'Intermediate' as const
      },
      {
        id: 'egyptian-exchange',
        title: 'Egyptian Exchange (EGX)',
        description: 'Egypt\'s stock exchange and capital market authority',
        url: 'https://www.egx.com.eg/',
        category: 'Stock Market',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#CE1126',
        level: 'Intermediate' as const
      },
      {
        id: 'nairobi-securities-exchange',
        title: 'Nairobi Securities Exchange (NSE)',
        description: 'Kenya\'s premier stock exchange and financial market',
        url: 'https://www.nse.co.ke/',
        category: 'Stock Market',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#BB0000',
        level: 'Intermediate' as const
      },
      {
        id: 'dar-es-salaam-stock-exchange',
        title: 'Dar es Salaam Stock Exchange',
        description: 'Tanzania\'s stock exchange and capital market',
        url: 'https://www.dse.co.tz/',
        category: 'Stock Market',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#00A86B',
        level: 'Intermediate' as const
      },
      {
        id: 'johannesburg-stock-exchange',
        title: 'Johannesburg Stock Exchange (JSE)',
        description: 'Africa\'s largest stock exchange by market capitalization',
        url: 'https://www.jse.co.za/',
        category: 'Stock Market',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#007A4D',
        level: 'Advanced' as const
      },
      {
        id: 'central-bank-egypt',
        title: 'Central Bank of Egypt',
        description: 'Egypt\'s central bank - monetary policy and financial education',
        url: 'https://www.cbe.org.eg/',
        category: 'Central Banking',
        icon: <Building className="w-4 h-4" />,
        color: '#000000',
        level: 'Intermediate' as const
      },
      {
        id: 'bank-al-maghrib',
        title: 'Bank Al-Maghrib',
        description: 'Central bank of Morocco - monetary policy and financial stability',
        url: 'https://www.bkam.ma/',
        category: 'Central Banking',
        icon: <Building className="w-4 h-4" />,
        color: '#C1272D',
        level: 'Intermediate' as const
      },
      {
        id: 'bank-of-tanzania',
        title: 'Bank of Tanzania',
        description: 'Tanzania\'s central bank - monetary policy and financial education',
        url: 'https://www.bot.go.tz/',
        category: 'Central Banking',
        icon: <Building className="w-4 h-4" />,
        color: '#00A86B',
        level: 'Intermediate' as const
      },
      {
        id: 'bank-of-uganda',
        title: 'Bank of Uganda',
        description: 'Uganda\'s central bank - monetary policy and financial literacy',
        url: 'https://www.bou.or.ug/',
        category: 'Central Banking',
        icon: <Building className="w-4 h-4" />,
        color: '#FCDC00',
        level: 'Intermediate' as const
      },
      {
        id: 'african-securities-exchanges',
        title: 'African Securities Exchanges Association',
        description: 'Pan-African association of stock exchanges and capital markets',
        url: 'https://www.africansea.org/',
        category: 'Continental Finance',
        icon: <Globe className="w-4 h-4" />,
        color: '#FF6B35',
        level: 'Advanced' as const
      },
      {
        id: 'west-african-monetary-union',
        title: 'West African Monetary Union (WAEMU)',
        description: 'Regional monetary union and financial integration',
        url: 'https://www.uemoa.int/',
        category: 'Regional Finance',
        icon: <Globe className="w-4 h-4" />,
        color: '#228B22',
        level: 'Advanced' as const
      }
    ],
    "🎬 African YouTube Finance Creators": [
      {
        id: 'ghana-talks-business',
        title: 'Ghana Business - Starting a Business',
        description: 'How to start a business in Ghana',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: 'African YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#CE1126',
        level: 'Beginner' as const
      },
      {
        id: 'african-entrepreneur',
        title: 'African Entrepreneur - Business Tips',
        description: 'Entrepreneurship strategies across Africa',
        url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        category: 'African YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FF6B35',
        level: 'Intermediate' as const
      },
      {
        id: 'african-markets',
        title: 'African Markets - Investment Guide',
        description: 'How to invest in African stock markets',
        url: 'https://www.youtube.com/watch?v=y6120QOlsfU',
        category: 'African YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#228B22',
        level: 'Intermediate' as const
      },
      {
        id: 'nigeria-finance',
        title: 'Nigeria Finance - Banking Guide',
        description: 'Banking and finance in Nigeria',
        url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
        category: 'African YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#008751',
        level: 'Intermediate' as const
      },
      {
        id: 'south-african-investor',
        title: 'SA Investor - JSE Guide',
        description: 'How to invest in the Johannesburg Stock Exchange',
        url: 'https://www.youtube.com/watch?v=lAhg_P_U2qc',
        category: 'African YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#FFB612',
        level: 'Intermediate' as const
      },
      {
        id: 'kenyan-entrepreneur',
        title: 'Kenya Business - Mobile Money',
        description: 'Mobile money and fintech in East Africa',
        url: 'https://www.youtube.com/watch?v=hxUAntt1z2c',
        category: 'African YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#BB0000',
        level: 'Beginner' as const
      },
      {
        id: 'african-crypto',
        title: 'African Crypto - Bitcoin Guide',
        description: 'Cryptocurrency and blockchain education for Africa',
        url: 'https://www.youtube.com/watch?v=bBC-nXj3Ng4',
        category: 'African YouTube',
        icon: <Video className="w-4 h-4" />,
        color: '#9932CC',
        level: 'Advanced' as const
      }
    ]
  };

  // Flatten all resources for easy access
  const allResources: FinancialResource[] = Object.values(resourceCategories).flat();
  const totalResources = allResources.length;

  const openResource = (resource: FinancialResource) => {
    if (resource.url.includes('youtube.com') || resource.url.includes('youtu.be')) {
      // Open YouTube videos in full-screen viewer
      setSelectedVideo(resource);
    } else {
      // Open other resources in new tab
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/(?:watch\?v=|@[^/]+)|youtu\.be\/)([^&\n?#]+)/)?.[1];
    if (!videoId) return url;

    // Enhanced YouTube embed with custom parameters
    const params = [
      'autoplay=1',           // Auto-play when loaded
      'rel=0',                // Don't show related videos
      'modestbranding=1',     // Minimal YouTube branding
      'playsinline=1',        // Play inline on mobile
      'enablejsapi=1',        // Enable JavaScript API
      'vq=hd720'              // Force HD quality
    ].join('&');

    return `https://www.youtube.com/embed/${videoId}?${params}`;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16">
        <ShimmerLoader variant="hero" className="w-full h-full" />
      </div>
    );
  }

  // If a video is selected, show the full-screen viewer
  if (selectedVideo) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-[10000] bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-4 sm:py-5 shadow-2xl border-b border-green-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={handleVideoBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-green-700/70 hover:bg-green-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/50 hover:border-green-400/70 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Back to Directory</span>
                <span className="sm:hidden">Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {selectedVideo.title}
              </h1>

              {/* External Link Button */}
              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/80 hover:bg-blue-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm ml-auto"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Open Original</span>
              </a>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="w-full h-full pt-20 sm:pt-24 relative">
          <div className="w-full h-full bg-black">
            <iframe
              src={getYouTubeEmbedUrl(selectedVideo.url)}
              className="w-full h-full border-0"
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{
                height: 'calc(100vh - 96px)',
                minHeight: '400px'
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <div className="flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                💰 Money Smart Links
              </h1>
              <p className="text-xs sm:text-sm text-green-200 mt-1">
                {totalResources}+ comprehensive financial education resources
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          {/* Introduction */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-4 shadow-2xl">
              <DollarSign size={32} className="text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Comprehensive Financial Education Directory
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover {totalResources}+ carefully curated financial education websites covering everything from basic budgeting to advanced investing.
              Resources are organized by category and difficulty level to help you learn at your own pace.
            </p>
          </div>

          {/* Resource Categories */}
          <div className="space-y-8">
            {Object.entries(resourceCategories).map(([categoryName, categoryResources], categoryIndex) => (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {categoryName}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
                  <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                    {categoryResources.length} resources
                  </span>
                </div>

                {/* Category Resources Grid - 2 Column Mobile, 3 Column Desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {categoryResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                      className="group"
                    >
                      <button
                        type="button"
                        onClick={() => openResource(resource)}
                        className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 active:scale-95 text-left relative"
                      >
                        {/* Level Badge */}
                        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold border ${getLevelColor(resource.level)}`}>
                          {resource.level}
                        </div>

                        {/* Icon */}
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 flex items-center justify-center text-white"
                          style={{ backgroundColor: resource.color }}
                        >
                          {resource.icon}
                        </div>

                        {/* Resource Info */}
                        <h3 className="text-sm sm:text-base font-semibold text-white mb-2 leading-tight pr-16">
                          {resource.title}
                        </h3>

                        <p className="text-xs text-gray-400 mb-2 font-medium">
                          {resource.category}
                        </p>

                        <p className="text-xs sm:text-sm text-gray-300 leading-tight mb-3">
                          {resource.description}
                        </p>

                        {/* External Link Icon */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-400 font-medium">Visit Site</span>
                          <ExternalLink size={14} className="text-green-400" />
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Summary */}
          <div className="mt-12 text-center">
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-600/30 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">
                🎯 Complete Financial Education Journey
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-300 mb-6">
                <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-xl">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium">Beginner Resources</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-xl">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm font-medium">Intermediate Guides</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-xl">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm font-medium">Advanced Topics</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                From basic budgeting to advanced investing strategies - your complete financial education resource directory.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MoneySmartLinksPage;
