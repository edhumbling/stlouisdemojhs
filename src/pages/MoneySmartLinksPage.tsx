import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, DollarSign, TrendingUp, PiggyBank, CreditCard, GraduationCap, Building, Users, Globe, BookOpen, Calculator, Video, Mic, Briefcase, Search, Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';
import ShimmerLoader from '../components/common/ShimmerLoader';
import SmartSearchBar, { SearchableItem, FilterOption } from '../components/common/SmartSearchBar';

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
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const { setShowHeader } = useHeader();

  const handleBack = () => {
    navigate('/students-hub');
  };

  const handleVideoBack = () => {
    setSelectedVideo(null);
    // Restore scroll position after a brief delay to allow DOM to update
    setTimeout(() => {
      window.scrollTo({
        top: previousScrollPosition,
        behavior: 'smooth'
      });
    }, 100);
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
    "🎓 Educational Organizations": [
      {
        id: 'nefe-financial-education',
        title: 'National Endowment for Financial Education (NEFE)',
        description: 'Leading nonprofit foundation for empowered financial decision making',
        url: 'https://www.nefe.org/',
        category: 'Educational Organization',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'cfp-board',
        title: 'CFP Board - Certified Financial Planner',
        description: 'Standards and certification for financial planning professionals',
        url: 'https://www.cfp.net/',
        category: 'Professional Organization',
        icon: <Building className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'lets-make-a-plan-cfp',
        title: 'Let\'s Make a Plan - CFP Board',
        description: 'Find trusted financial advisors and planning professionals',
        url: 'https://www.letsmakeaplan.org/',
        category: 'Professional Organization',
        icon: <Users className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'seminole-state-financial-literacy',
        title: 'Seminole State College - Financial Literacy Guide',
        description: 'Comprehensive financial literacy resources for college students',
        url: 'https://www.seminolestate.edu/financial-aid/resources/financial-literacy',
        category: 'Educational Institution',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'purdue-global-finance-tools',
        title: 'Purdue Global - Personal Finance Tools',
        description: 'Best personal finance tools and budgeting apps for 2025',
        url: 'https://www.purdueglobal.edu/blog/student-life/budgeting-apps-personal-finance-tools/',
        category: 'Educational Institution',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      }
    ],
    "🏦 Government Consumer Protection": [
      {
        id: 'cfpb-consumer-finance',
        title: 'Consumer Financial Protection Bureau (CFPB)',
        description: 'U.S. government agency for fair treatment by financial institutions',
        url: 'https://www.consumerfinance.gov/',
        category: 'Government Agency',
        icon: <Building className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'fdic-money-smart-older-adults',
        title: 'FDIC Money Smart for Older Adults',
        description: 'Financial education for older adults including lesson plans and videos',
        url: 'https://www.fdic.gov/consumer-resource-center/money-smart-older-adults',
        category: 'Government Agency',
        icon: <Building className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'nd-dfi-financial-literacy',
        title: 'North Dakota Department of Financial Institutions',
        description: 'State financial literacy resources and consumer protection',
        url: 'https://www.nd.gov/dfi/education-and-other-resources/financial-literacy',
        category: 'State Government',
        icon: <Building className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      }
    ],
    "📱 Personal Finance Apps & Tools": [
      {
        id: 'ynab-budgeting',
        title: 'You Need A Budget (YNAB)',
        description: 'Award-winning budgeting software for personal finance management',
        url: 'https://www.youneedabudget.com/',
        category: 'Budgeting Tool',
        icon: <Calculator className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'personal-capital',
        title: 'Personal Capital (Empower)',
        description: 'Free financial tools for tracking net worth and investments',
        url: 'https://www.empower.com/',
        category: 'Investment Tracking',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'tiller-spreadsheets',
        title: 'Tiller Money',
        description: 'Automated spreadsheet-based budgeting and financial tracking',
        url: 'https://www.tillerhq.com/',
        category: 'Budgeting Tool',
        icon: <Calculator className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: 'pocketguard-app',
        title: 'PocketGuard',
        description: 'Simple budgeting app to prevent overspending',
        url: 'https://pocketguard.com/',
        category: 'Budgeting Tool',
        icon: <PiggyBank className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'goodbudget-app',
        title: 'Goodbudget',
        description: 'Envelope budgeting app for couples and families',
        url: 'https://goodbudget.com/',
        category: 'Budgeting Tool',
        icon: <PiggyBank className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      }
    ],
    "🎧 Financial Podcasts & Media": [
      {
        id: 'suze-orman-website',
        title: 'Suze Orman Official Website',
        description: 'Personal finance expert with 40+ years of experience',
        url: 'https://www.suzeorman.com/',
        category: 'Financial Expert',
        icon: <Mic className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'clark-howard-website',
        title: 'Clark Howard',
        description: 'Consumer expert and money-saving advice',
        url: 'https://www.clarkhoward.com/',
        category: 'Financial Expert',
        icon: <Mic className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'motley-fool',
        title: 'The Motley Fool',
        description: 'Investment advice and stock market education',
        url: 'https://www.fool.com/',
        category: 'Investment Education',
        icon: <TrendingUp className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'kiplinger',
        title: 'Kiplinger',
        description: 'Personal finance, investing, and business forecasts',
        url: 'https://www.kiplinger.com/',
        category: 'Financial Media',
        icon: <BookOpen className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'money-magazine',
        title: 'Money Magazine',
        description: 'Personal finance news, advice, and money management tips',
        url: 'https://money.com/',
        category: 'Financial Media',
        icon: <BookOpen className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'forbes-personal-finance',
        title: 'Forbes Personal Finance',
        description: 'Personal finance news and advice from Forbes',
        url: 'https://www.forbes.com/personal-finance/',
        category: 'Financial Media',
        icon: <BookOpen className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      }
    ],
    "🏠 Real Estate & Housing Finance": [
      {
        id: 'zillow-learning-center',
        title: 'Zillow Learning Center',
        description: 'Real estate education and home buying guides',
        url: 'https://www.zillow.com/learn/',
        category: 'Real Estate Education',
        icon: <Building className="w-4 h-4" />,
        color: '#0066CC',
        level: 'Beginner' as const
      },
      {
        id: 'bigger-pockets',
        title: 'BiggerPockets',
        description: 'Real estate investing education and community',
        url: 'https://www.biggerpockets.com/',
        category: 'Real Estate Investing',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'rocket-mortgage-learning',
        title: 'Rocket Mortgage Learning Center',
        description: 'Mortgage education and home financing guides',
        url: 'https://www.rocketmortgage.com/learn',
        category: 'Mortgage Education',
        icon: <Building className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'bankrate-mortgages',
        title: 'Bankrate Mortgages',
        description: 'Mortgage rates, calculators, and home loan advice',
        url: 'https://www.bankrate.com/mortgages/',
        category: 'Mortgage Education',
        icon: <Calculator className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'realtor-com-advice',
        title: 'Realtor.com Advice',
        description: 'Home buying, selling, and real estate investment advice',
        url: 'https://www.realtor.com/advice/',
        category: 'Real Estate Education',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      }
    ],
    "💼 Business & Entrepreneurship Finance": [
      {
        id: 'score-business-mentors',
        title: 'SCORE Business Mentors',
        description: 'Free business mentoring and small business resources',
        url: 'https://www.score.org/',
        category: 'Business Education',
        icon: <Briefcase className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'sba-learning-center',
        title: 'SBA Learning Center',
        description: 'Small Business Administration education and training',
        url: 'https://www.sba.gov/learning-center',
        category: 'Business Education',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'quickbooks-resource-center',
        title: 'QuickBooks Resource Center',
        description: 'Small business accounting and financial management resources',
        url: 'https://quickbooks.intuit.com/resources/',
        category: 'Business Finance',
        icon: <Calculator className="w-4 h-4" />,
        color: '#0066CC',
        level: 'Intermediate' as const
      },
      {
        id: 'entrepreneur-finance',
        title: 'Entrepreneur - Finance',
        description: 'Business finance advice and entrepreneurship resources',
        url: 'https://www.entrepreneur.com/topic/finance',
        category: 'Business Finance',
        icon: <Briefcase className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'inc-finance-section',
        title: 'Inc. Magazine - Finance',
        description: 'Business finance news and advice for entrepreneurs',
        url: 'https://www.inc.com/finance',
        category: 'Business Finance',
        icon: <Briefcase className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      }
    ],
    "🔒 Financial Security & Fraud Prevention": [
      {
        id: 'ftc-consumer-information',
        title: 'FTC Consumer Information',
        description: 'Federal Trade Commission consumer protection and fraud prevention',
        url: 'https://consumer.ftc.gov/',
        category: 'Consumer Protection',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'identity-theft-gov',
        title: 'IdentityTheft.gov',
        description: 'Official U.S. government site for identity theft recovery',
        url: 'https://www.identitytheft.gov/',
        category: 'Identity Protection',
        icon: <Building className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'aarp-fraud-watch',
        title: 'AARP Fraud Watch Network',
        description: 'Fraud prevention resources and scam alerts',
        url: 'https://www.aarp.org/money/scams-fraud/',
        category: 'Fraud Prevention',
        icon: <Users className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'better-business-bureau',
        title: 'Better Business Bureau (BBB)',
        description: 'Business reliability and scam prevention resources',
        url: 'https://www.bbb.org/',
        category: 'Consumer Protection',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'experian-credit-education',
        title: 'Experian Credit Education',
        description: 'Credit monitoring, identity protection, and financial education',
        url: 'https://www.experian.com/blogs/ask-experian/',
        category: 'Credit Education',
        icon: <CreditCard className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      }
    ],
    "🏦 Credit Unions & Community Banking": [
      {
        id: 'ncua-financial-education',
        title: 'NCUA Financial Education Resources',
        description: 'National Credit Union Administration financial literacy and education',
        url: 'https://www.ncua.gov/consumers/financial-literacy-resources',
        category: 'Credit Union Education',
        icon: <Building className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'credit-union-national-association',
        title: 'Credit Union National Association (CUNA)',
        description: 'National trade association for credit unions and financial education',
        url: 'https://www.cuna.org/',
        category: 'Credit Union Organization',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'balance-financial-fitness',
        title: 'Balance Financial Fitness Program',
        description: 'Comprehensive financial wellness and education platform',
        url: 'https://www.balancepro.org/',
        category: 'Financial Wellness',
        icon: <Users className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'cooperative-trust',
        title: 'Cooperative Trust',
        description: 'Financial education and resources for cooperative members',
        url: 'https://www.cooperativetrust.org/',
        category: 'Cooperative Finance',
        icon: <Users className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'community-development-financial-institutions',
        title: 'CDFI Fund - Community Development Financial Institutions',
        description: 'Community development and financial inclusion resources',
        url: 'https://www.cdfifund.gov/',
        category: 'Community Development',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      }
    ],
    "🛡️ Insurance Education & Protection": [
      {
        id: 'insurance-information-institute',
        title: 'Insurance Information Institute (III)',
        description: 'Comprehensive insurance education and consumer information',
        url: 'https://www.iii.org/',
        category: 'Insurance Education',
        icon: <Building className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'life-happens',
        title: 'Life Happens - Life Insurance Education',
        description: 'Life insurance awareness and education nonprofit organization',
        url: 'https://www.lifehappens.org/',
        category: 'Life Insurance',
        icon: <Users className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'naic-consumer-information',
        title: 'NAIC Consumer Information',
        description: 'National Association of Insurance Commissioners consumer resources',
        url: 'https://content.naic.org/consumer-information',
        category: 'Insurance Regulation',
        icon: <Building className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'healthcare-gov-learn',
        title: 'HealthCare.gov Learn',
        description: 'Health insurance education and marketplace information',
        url: 'https://www.healthcare.gov/learn/',
        category: 'Health Insurance',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'disability-insurance-education',
        title: 'Council for Disability Awareness',
        description: 'Disability insurance education and awareness resources',
        url: 'https://disabilitycanhappen.org/',
        category: 'Disability Insurance',
        icon: <Users className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      }
    ],
    "🎅 Retirement Planning & Social Security": [
      {
        id: 'usa-gov-retirement-planning',
        title: 'USA.gov Retirement Planning Tools',
        description: 'Official U.S. government retirement planning resources and tools',
        url: 'https://www.usa.gov/retirement-planning-tools',
        category: 'Government Retirement',
        icon: <Building className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'tiaa-retirement-planning',
        title: 'TIAA Retirement Planning',
        description: 'Retirement income, planning, investing, and financial advice',
        url: 'https://www.tiaa.org/public',
        category: 'Retirement Services',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'john-hancock-retirement',
        title: 'John Hancock Retirement Plan Services',
        description: 'Retirement plan education, calculators, and financial planning',
        url: 'https://myplan.johnhancock.com/us/en',
        category: 'Retirement Services',
        icon: <Calculator className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'california-dfpi-retirement',
        title: 'California DFPI - Retirement Planning',
        description: 'State financial protection and retirement planning education',
        url: 'https://dfpi.ca.gov/news/insights/consumer-financial-education-savings-planning-for-retirement/',
        category: 'State Government',
        icon: <Building className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'employee-benefit-research-institute',
        title: 'Employee Benefit Research Institute (EBRI)',
        description: 'Retirement and employee benefit research and education',
        url: 'https://www.ebri.org/',
        category: 'Research Organization',
        icon: <BookOpen className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      }
    ],
    "📊 Tax Education & Preparation": [
      {
        id: 'irs-understanding-taxes',
        title: 'IRS Understanding Taxes - Teacher Site',
        description: 'Tax education curriculum and resources for educators',
        url: 'https://apps.irs.gov/app/understandingTaxes/teacher/index.jsp',
        category: 'Tax Education',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'irs-charities-nonprofits',
        title: 'IRS Charities and Nonprofits',
        description: 'Tax education and guidance for charitable organizations',
        url: 'https://www.irs.gov/charities-and-nonprofits',
        category: 'Tax Education',
        icon: <Building className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'vita-tax-preparation',
        title: 'VITA - Volunteer Income Tax Assistance',
        description: 'Free tax preparation help for qualifying taxpayers',
        url: 'https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers',
        category: 'Tax Assistance',
        icon: <Users className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'ny-state-taxation-finance',
        title: 'NYS Department of Taxation and Finance',
        description: 'New York State tax responsibilities and education',
        url: 'https://www.tax.ny.gov/',
        category: 'State Tax',
        icon: <Building className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'taxpayer-advocate-service',
        title: 'Taxpayer Advocate Service',
        description: 'Independent organization within IRS to help taxpayers',
        url: 'https://www.taxpayeradvocate.irs.gov/',
        category: 'Tax Assistance',
        icon: <Users className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      }
    ],
    "🎓 College Financial Aid & Student Resources": [
      {
        id: 'federal-student-aid',
        title: 'Federal Student Aid',
        description: 'Largest provider of financial aid for college in the U.S.',
        url: 'https://studentaid.gov/',
        category: 'Federal Aid',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'pheaa-student-aid',
        title: 'PHEAA - Pennsylvania Higher Education Assistance Agency',
        description: 'National provider of financial aid services for students and schools',
        url: 'https://www.pheaa.org/',
        category: 'State Aid Agency',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'college-board-financial-aid',
        title: 'College Board Financial Aid',
        description: 'College planning and financial aid information and tools',
        url: 'https://bigfuture.collegeboard.org/pay-for-college',
        category: 'College Planning',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'fastweb-scholarships',
        title: 'Fastweb Scholarship Search',
        description: 'Free scholarship search and college financial aid information',
        url: 'https://www.fastweb.com/',
        category: 'Scholarship Search',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'college-navigator',
        title: 'College Navigator - NCES',
        description: 'National Center for Education Statistics college search tool',
        url: 'https://nces.ed.gov/collegenavigator/',
        category: 'College Search',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      }
    ],
    "💰 Cryptocurrency & Digital Assets": [
      {
        id: 'rba-cryptocurrency-education',
        title: 'Reserve Bank of Australia - Digital Currencies',
        description: 'Central bank education on cryptocurrencies and digital tokens',
        url: 'https://www.rba.gov.au/education/resources/explainers/cryptocurrencies.html',
        category: 'Central Bank Education',
        icon: <Globe className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'cftc-digital-assets',
        title: 'CFTC Digital Assets',
        description: 'Commodity Futures Trading Commission digital asset education',
        url: 'https://www.cftc.gov/digitalassets/index.htm',
        category: 'Federal Regulation',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'connecticut-cryptocurrency-risks',
        title: 'Connecticut - Cryptocurrency Risks',
        description: 'State education on cryptocurrency risks and scam prevention',
        url: 'https://portal.ct.gov/dob/consumer/consumer-education/cryptocurrency-risks',
        category: 'State Education',
        icon: <Building className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'south-carolina-digital-assets',
        title: 'South Carolina Digital Assets Literacy Project',
        description: 'State digital currencies financial literacy education',
        url: 'https://treasurer.sc.gov/what-we-do/for-governments/digital-assets/',
        category: 'State Education',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'blockchain-education-network',
        title: 'Blockchain Education Network',
        description: 'Student-run organization promoting blockchain education',
        url: 'https://www.blockchainedu.org/',
        category: 'Educational Organization',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      }
    ],
    "🌍 Nonprofit Financial Education Organizations": [
      {
        id: 'foundation-financial-education',
        title: 'Foundation for Financial Education (F3E)',
        description: '501(c)(3) nonprofit dedicated to spreading financial literacy with free resources',
        url: 'https://f3eonline.org/',
        category: 'Nonprofit Organization',
        icon: <Users className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'operation-hope-financial-literacy',
        title: 'Operation HOPE - Financial Literacy for All',
        description: 'Financial literacy education in the classroom and community',
        url: 'https://operationhope.org/initiatives/financial-literacy-for-all/',
        category: 'Nonprofit Organization',
        icon: <Users className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'schwab-moneywise',
        title: 'Schwab Moneywise Financial Literacy Programs',
        description: 'Free financial literacy programs from leading nonprofit organizations',
        url: 'https://www.schwabmoneywise.com/teaching-kids/financial-literacy-programs',
        category: 'Corporate Foundation',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'council-economic-education',
        title: 'Council for Economic Education (CEE)',
        description: 'Financial education organization transforming lives by equipping K-12 students',
        url: 'https://www.councilforeconed.org/',
        category: 'Educational Organization',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'junior-achievement',
        title: 'Junior Achievement USA',
        description: 'World\'s largest organization providing youth financial education resources',
        url: 'https://www.ja.org/',
        category: 'Youth Organization',
        icon: <Users className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      }
    ],
    "🏦 Federal & State Government Programs": [
      {
        id: 'fdic-money-smart',
        title: 'FDIC Money Smart Program',
        description: 'Federal financial education program with lesson plans and videos',
        url: 'https://www.fdic.gov/consumer-resource-center/money-smart',
        category: 'Federal Program',
        icon: <Building className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'treasury-financial-literacy-commission',
        title: 'Financial Literacy and Education Commission',
        description: 'U.S. Treasury federal financial literacy programs and grants',
        url: 'https://home.treasury.gov/policy-issues/consumer-policy/financial-literacy-and-education-commission',
        category: 'Federal Commission',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'mymoney-gov',
        title: 'MyMoney.gov',
        description: 'Federal government\'s one-stop shop for financial literacy and education',
        url: 'https://www.mymoney.gov/',
        category: 'Federal Portal',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'vermont-financial-literacy',
        title: 'Vermont Financial Literacy Education',
        description: 'State Treasurer\'s Office financial literacy website MyMoney.Vermont.Gov',
        url: 'https://www.vermonttreasurer.gov/financial-literacy-vermont',
        category: 'State Program',
        icon: <Building className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'tennessee-financial-education',
        title: 'Tennessee Financial Education Commission',
        description: 'State financial literacy resources for Tennessee schools and families',
        url: 'https://treasury.tn.gov/Financial-Education/Financial-Literacy-Commission/Education-Worth-the-Investment',
        category: 'State Program',
        icon: <Building className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      }
    ],
    "🏦 Banking Industry Education Resources": [
      {
        id: 'occ-financial-literacy-directory',
        title: 'OCC Financial Literacy Resource Directory',
        description: 'Office of Comptroller of Currency financial literacy resources for banks',
        url: 'https://www.occ.gov/topics/consumers-and-communities/community-affairs/resource-directories/financial-literacy/',
        category: 'Federal Banking',
        icon: <Building className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'aba-foundation-financial-education',
        title: 'American Bankers Association Foundation',
        description: 'Financial education programs for bankers to strengthen community well-being',
        url: 'https://www.aba.com/about-us/aba-foundation/financial-education-programs',
        category: 'Banking Association',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'oregon-bankers-education',
        title: 'Oregon Bankers Association - Financial Education',
        description: 'Financial education resource guide for teachers and bankers',
        url: 'https://www.oregonbankers.com/financial-education-resource-guide.html',
        category: 'State Banking Association',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'community-bankers-education',
        title: 'Independent Community Bankers of America (ICBA)',
        description: 'Community banking financial education and resources',
        url: 'https://www.icba.org/',
        category: 'Banking Association',
        icon: <Building className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'mortgage-bankers-education',
        title: 'Mortgage Bankers Association (MBA)',
        description: 'Mortgage industry education and homeownership resources',
        url: 'https://www.mba.org/',
        category: 'Industry Association',
        icon: <Building className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      }
    ],
    "🎯 Military & Veterans Financial Resources": [
      {
        id: 'va-financial-literacy',
        title: 'VA Financial Literacy Resources',
        description: 'Veterans Affairs financial literacy and personal finance management',
        url: 'https://benefits.va.gov/benefits/financial-literacy.asp',
        category: 'Veterans Affairs',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'military-saves',
        title: 'Military Saves',
        description: 'Financial education and savings program for military families',
        url: 'https://militarysaves.org/',
        category: 'Military Program',
        icon: <Users className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'military-family-life-counselors',
        title: 'Military Family Life Counselors (MFLC)',
        description: 'Financial counseling and education for military families',
        url: 'https://www.militaryfamilylife.org/',
        category: 'Military Support',
        icon: <Users className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'armed-forces-financial-network',
        title: 'Armed Forces Financial Network',
        description: 'Financial education and resources for all military branches',
        url: 'https://www.affn.org/',
        category: 'Military Network',
        icon: <Users className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'usaa-educational-foundation',
        title: 'USAA Educational Foundation',
        description: 'Financial education for military members and their families',
        url: 'https://www.usaa.com/inet/wc/about-usaa-educational-foundation',
        category: 'Military Foundation',
        icon: <Building className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      }
    ],
    "👩 Women & Minority Financial Empowerment": [
      {
        id: 'women-financial-empowerment',
        title: 'UN Women - Economic Empowerment',
        description: 'Global women\'s economic empowerment and financial inclusion resources',
        url: 'https://www.unwomen.org/en/what-we-do/economic-empowerment',
        category: 'International Organization',
        icon: <Globe className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'illinois-minority-business',
        title: 'Illinois Economic Equity & Empowerment',
        description: 'Minority, Veteran & Woman Owned Business financial resources',
        url: 'https://dceo.illinois.gov/',
        category: 'State Program',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'national-womens-business-council',
        title: 'National Women\'s Business Council',
        description: 'Federal advisory council on women\'s business and financial issues',
        url: 'https://www.nwbc.gov/',
        category: 'Federal Council',
        icon: <Building className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: 'minority-business-development-agency',
        title: 'Minority Business Development Agency (MBDA)',
        description: 'Federal agency promoting minority business enterprise and financial growth',
        url: 'https://www.mbda.gov/',
        category: 'Federal Agency',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'women-business-centers',
        title: 'Women\'s Business Centers (WBC)',
        description: 'SBA-funded centers providing business and financial education for women',
        url: 'https://www.sba.gov/local-assistance/resource-partners/womens-business-centers-wbc',
        category: 'SBA Program',
        icon: <Users className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      }
    ],
    "🌍 International Financial Education": [
      {
        id: 'gflec-global-financial-literacy',
        title: 'Global Financial Literacy Excellence Center (GFLEC)',
        description: 'World\'s leading center for financial literacy research and policy',
        url: 'https://gflec.org/',
        category: 'Research Center',
        icon: <Globe className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'oecd-infe',
        title: 'OECD International Network on Financial Education (INFE)',
        description: 'Global network promoting financial literacy and education worldwide',
        url: 'https://www.oecd.org/en/networks/infe.html',
        category: 'International Organization',
        icon: <Globe className="w-4 h-4" />,
        color: '#059669',
        level: 'Advanced' as const
      },
      {
        id: 'world-bank-financial-inclusion',
        title: 'World Bank - Financial Inclusion',
        description: 'Global financial inclusion and literacy development programs',
        url: 'https://www.worldbank.org/en/topic/financialinclusion',
        category: 'International Bank',
        icon: <Globe className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'financial-planning-standards-board',
        title: 'Financial Planning Standards Board (FPSB)',
        description: 'Global financial planning standards and education',
        url: 'https://www.fpsb.org/',
        category: 'International Standards',
        icon: <Globe className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'child-youth-finance-international',
        title: 'Child & Youth Finance International',
        description: 'Global movement advancing financial inclusion for children and youth',
        url: 'https://www.childfinanceinternational.org/',
        category: 'Youth Organization',
        icon: <Users className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      }
    ],
    "💼 Professional Financial Organizations": [
      {
        id: 'financial-planning-association',
        title: 'Financial Planning Association (FPA)',
        description: 'Professional development and practice management support for CFPs and financial planning professionals',
        url: 'https://www.financialplanningassociation.org/',
        category: 'Professional Association',
        icon: <Briefcase className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'fpa-pro-bono-program',
        title: 'FPA Pro Bono Program',
        description: 'Free financial planning advice and education workshops from FPA members',
        url: 'https://www.financialplanningassociation.org/advocacy/pro-bono-program',
        category: 'Professional Service',
        icon: <Users className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'association-financial-counseling-planning',
        title: 'Association for Financial Counseling & Planning Education (AFCPE)',
        description: 'Professional organization for financial counselors and educators',
        url: 'https://www.afcpe.org/',
        category: 'Professional Association',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      },
      {
        id: 'financial-therapy-association',
        title: 'Financial Therapy Association',
        description: 'Professional organization advancing the field of financial therapy',
        url: 'https://www.financialtherapyassociation.org/',
        category: 'Professional Association',
        icon: <Users className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'national-association-personal-financial-advisors',
        title: 'National Association of Personal Financial Advisors (NAPFA)',
        description: 'Fee-only financial advisor association with consumer education resources',
        url: 'https://www.napfa.org/',
        category: 'Professional Association',
        icon: <Briefcase className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      }
    ],
    "🎓 Academic & Research Institutions": [
      {
        id: 'texas-tech-financial-planning',
        title: 'Texas Tech University - Personal Financial Planning',
        description: 'Academic program and research in personal financial planning',
        url: 'https://www.depts.ttu.edu/hs/pfp/',
        category: 'Academic Institution',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'university-georgia-financial-planning',
        title: 'University of Georgia - Financial Planning Program',
        description: 'Academic financial planning education and research center',
        url: 'https://www.fcs.uga.edu/extension/financial-planning-program',
        category: 'Academic Institution',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'kansas-state-financial-counseling',
        title: 'Kansas State University - Financial Counseling',
        description: 'Research and education in financial counseling and planning',
        url: 'https://www.k-state.edu/finplan/',
        category: 'Academic Institution',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      },
      {
        id: 'ohio-state-financial-wellness',
        title: 'Ohio State University - Financial Wellness',
        description: 'University financial wellness and education programs',
        url: 'https://financialwellness.osu.edu/',
        category: 'Academic Institution',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'purdue-extension-financial-education',
        title: 'Purdue Extension - Financial Education',
        description: 'Extension programs for financial education and money management',
        url: 'https://extension.purdue.edu/programs/financial-education',
        category: 'Extension Program',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      }
    ],
    "🌎 State & Local Financial Education Programs": [
      {
        id: 'california-jump-start-coalition',
        title: 'California Jump$tart Coalition',
        description: 'State coalition advancing financial literacy education in California',
        url: 'https://www.cajumpstart.org/',
        category: 'State Coalition',
        icon: <Building className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'texas-jump-start-coalition',
        title: 'Texas Jump$tart Coalition',
        description: 'Advancing financial literacy education throughout Texas',
        url: 'https://www.texasjumpstart.org/',
        category: 'State Coalition',
        icon: <Building className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'florida-financial-literacy-council',
        title: 'Florida Financial Literacy Council',
        description: 'State council promoting financial education in Florida schools',
        url: 'https://www.fldoe.org/academics/standards/financial-literacy/',
        category: 'State Council',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'new-york-financial-literacy-coalition',
        title: 'New York Financial Literacy Coalition',
        description: 'Coalition of organizations promoting financial education in New York',
        url: 'https://www.wise-ny.org/',
        category: 'State Coalition',
        icon: <Building className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'minnesota-council-economic-education',
        title: 'Minnesota Council on Economic Education',
        description: 'Nonpartisan nonprofit promoting economic and financial education',
        url: 'https://www.mncouncil.org/',
        category: 'State Organization',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      }
    ],
    "📺 Corporate Financial Education Programs": [
      {
        id: 'visa-practical-money-skills',
        title: 'Visa Practical Money Skills',
        description: 'Free financial education resources for teachers, parents, and students',
        url: 'https://www.practicalmoneyskills.com/',
        category: 'Corporate Program',
        icon: <CreditCard className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'mastercard-financial-education',
        title: 'Mastercard Financial Education',
        description: 'Global financial inclusion and education initiatives',
        url: 'https://www.mastercardcenter.org/financial-inclusion',
        category: 'Corporate Program',
        icon: <CreditCard className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'wells-fargo-hands-on-banking',
        title: 'Wells Fargo Hands on Banking',
        description: 'Free financial education curriculum for all ages',
        url: 'https://handsonbanking.org/',
        category: 'Corporate Program',
        icon: <Building className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'chase-financial-education',
        title: 'Chase Financial Education',
        description: 'Financial education resources and community programs',
        url: 'https://www.chase.com/personal/education',
        category: 'Corporate Program',
        icon: <Building className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'bank-of-america-better-money-habits',
        title: 'Bank of America Better Money Habits',
        description: 'Free financial education resources and tools',
        url: 'https://bettermoneyhabits.bankofamerica.com/',
        category: 'Corporate Program',
        icon: <Building className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      }
    ],
    "📱 Digital Financial Education Platforms": [
      {
        id: 'everfi-financial-literacy',
        title: 'Everfi Financial Literacy',
        description: 'Digital learning platform for K-12 financial education',
        url: 'https://everfi.com/courses/k-12/financial-literacy-high-school/',
        category: 'Digital Platform',
        icon: <Calculator className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'biz-kid-educational-resources',
        title: 'Biz Kid$ Educational Resources',
        description: 'Financial education and entrepreneurship for kids and teens',
        url: 'https://bizkids.com/',
        category: 'Youth Platform',
        icon: <Users className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'practical-money-skills-games',
        title: 'Practical Money Skills Games',
        description: 'Interactive financial education games and simulations',
        url: 'https://www.practicalmoneyskills.com/games',
        category: 'Interactive Platform',
        icon: <Calculator className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'money-as-you-grow',
        title: 'Money As You Grow',
        description: 'Age-appropriate financial lessons from birth to college',
        url: 'https://www.moneyasyougrow.org/',
        category: 'Government Platform',
        icon: <GraduationCap className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'financial-football',
        title: 'Financial Football',
        description: 'NFL-themed financial education video game',
        url: 'https://www.practicalmoneyskills.com/games/financial_football',
        category: 'Educational Game',
        icon: <Calculator className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      }
    ],
    "🎥 Financial Education Videos": [
      {
        id: 'khan-academy-financial-literacy',
        title: 'Khan Academy - Financial Literacy',
        description: 'Complete introduction to personal finance and financial literacy',
        url: 'https://www.youtube.com/watch?v=Lys4EVugJmk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1BA05B',
        level: 'Beginner' as const
      },
      {
        id: 'dave-ramsey-baby-steps',
        title: 'Dave Ramsey - The 7 Baby Steps Explained',
        description: 'Complete guide to Dave Ramsey\'s 7 Baby Steps for financial freedom',
        url: 'https://www.youtube.com/watch?v=OO25TrVo_dU',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#0066CC',
        level: 'Beginner' as const
      },
      {
        id: 'ben-felix-common-sense-investing',
        title: 'Ben Felix - Welcome to Common Sense Investing',
        description: 'Evidence-based investing principles and portfolio theory',
        url: 'https://www.youtube.com/watch?v=tvXw2Jfqz9w',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#FF6B35',
        level: 'Advanced' as const
      },
      {
        id: 'personal-finance-101-guide',
        title: 'Personal Finance 101 - Complete Guide to Building Wealth',
        description: 'Comprehensive guide to personal finance fundamentals',
        url: 'https://www.youtube.com/watch?v=ASYMb_q55Bk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'personal-finance-basics',
        title: 'Personal Finance Basics - Money Management Fundamentals',
        description: 'Learn personal finance basics, fundamentals, and best practices',
        url: 'https://www.youtube.com/watch?v=EsOTfVIcdEI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'student-personal-finance',
        title: 'Student Guide to Personal Finance - Adulting 101',
        description: 'Personal finance guide specifically designed for students',
        url: 'https://www.youtube.com/watch?v=MXCvtC0HqLE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'money-management-learning-path',
        title: 'Money Management Learning Path',
        description: 'Complete learning path for money management and investing basics',
        url: 'https://www.youtube.com/watch?v=BJlXQrsvVTk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'ben-felix-timing-market',
        title: 'Ben Felix - Is Now the Best Time to Invest?',
        description: 'Market timing and investment strategy analysis',
        url: 'https://www.youtube.com/watch?v=X1qzuPRvsM0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'investopedia-what-are-stocks',
        title: 'Investopedia - What Are Stocks?',
        description: 'Complete explanation of stocks and how they work',
        url: 'https://www.youtube.com/watch?v=JrGp4ofULzQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'investopedia-earnings-per-share',
        title: 'Investopedia - Earnings Per Share Explained (EPS)',
        description: 'Understanding earnings per share and financial metrics',
        url: 'https://www.youtube.com/watch?v=XGmNahd9Ne0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'warren-buffett-beginners',
        title: 'Warren Buffett - How to Invest for Beginners',
        description: 'Investment wisdom from the Oracle of Omaha',
        url: 'https://www.youtube.com/watch?v=EsqewS_DEbk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'ali-abdaal-investing',
        title: 'Ali Abdaal - How to Invest for Beginners',
        description: 'Modern approach to investing for young people',
        url: 'https://www.youtube.com/watch?v=gFQNPmLKj1k',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'how-to-investopedia',
        title: 'How to Use Investopedia',
        description: 'Guide to using Investopedia for financial education',
        url: 'https://www.youtube.com/watch?v=yA4SGfmL6JA',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'stock-market-beginners-2025',
        title: 'How to Invest for Beginners (2025)',
        description: 'Updated investing guide for the current year',
        url: 'https://www.youtube.com/watch?v=lNdOtlpmH5U',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'stock-market-beginners-why-invest',
        title: 'Stock Market For Beginners - Why You Should Invest NOW',
        description: 'Motivation and basics for starting your investment journey',
        url: 'https://www.youtube.com/watch?v=Hk9huA6Q28k',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'bogleheads-investing-principles',
        title: '5 Boglehead Investing Principles',
        description: 'Core principles of index fund investing',
        url: 'https://www.youtube.com/watch?v=voaiJ_GGDgw',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'vanguard-index-portfolios',
        title: 'Vanguard Index Portfolios - Inside Look',
        description: 'Deep dive into Vanguard\'s index fund strategies',
        url: 'https://www.youtube.com/watch?v=4vR_GWdKIzQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'bogleheads-factor-investing',
        title: 'Bogleheads University - Factor Investing',
        description: 'Advanced factor investing strategies',
        url: 'https://www.youtube.com/watch?v=8C3KhRJCwCQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'vanguard-index-fund-secrets',
        title: 'Things You DON\'T Know About Vanguard',
        description: 'Hidden facts about Vanguard and index fund investing',
        url: 'https://www.youtube.com/watch?v=I7A1ufp-HKc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'build-credit-at-18',
        title: 'How to Build Credit at 18',
        description: 'Complete guide to building credit as a young adult',
        url: 'https://www.youtube.com/watch?v=mGASUQv997g',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'build-credit-with-cards',
        title: 'How To Build Credit Using A Credit Card',
        description: 'Step-by-step guide to building credit with credit cards',
        url: 'https://www.youtube.com/watch?v=nzbYMqZQ4yY',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'pick-best-credit-card',
        title: 'How To Pick The BEST Credit Card (For You)',
        description: 'Guide to choosing the right credit card for your needs',
        url: 'https://www.youtube.com/watch?v=xWxZHQw5xK8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'credit-card-how-it-works',
        title: 'How Does A Credit Card Work? Beginner Guide 101',
        description: 'Complete beginner\'s guide to understanding credit cards',
        url: 'https://www.youtube.com/watch?v=EqpZYH9FEe8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'business-credit-fast',
        title: 'How to Build Business Credit FAST in 2023',
        description: 'Strategies for building business credit quickly',
        url: 'https://www.youtube.com/watch?v=HTw4kWMPZgk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'complete-retirement-plan',
        title: 'Complete Retirement Plan Guide - 3 Hour Masterclass',
        description: 'Comprehensive retirement planning strategies and 401k/IRA rules',
        url: 'https://www.youtube.com/watch?v=SJ70TPt2-Iw',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'rollover-ira-tutorial',
        title: 'Rollover IRA - Step-by-Step Tutorial at Fidelity',
        description: 'Complete guide to rolling over your 401k to an IRA',
        url: 'https://www.youtube.com/watch?v=kulruQn0fE8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'roth-vs-traditional-401k',
        title: 'Retirement Planning - ROTH vs Traditional 401k/IRA',
        description: 'Choosing between Roth and traditional retirement accounts',
        url: 'https://www.youtube.com/watch?v=OQUAkNeCtfk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'roth-401k-and-ira',
        title: 'Can You Max Out a Roth 401k and Roth IRA in the Same Year?',
        description: 'Understanding contribution limits for retirement accounts',
        url: 'https://www.youtube.com/watch?v=gwXsFts8_-U',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      },
      {
        id: 'should-roll-401k-to-ira',
        title: 'Should You Roll Your 401k Into an IRA?',
        description: 'Pros and cons of rolling over your 401k to an IRA',
        url: 'https://www.youtube.com/watch?v=uAPRxAtkiTw',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: '50-30-20-budget-rule',
        title: 'How to Use the 50/30/20 Rule to Budget & Manage Money',
        description: 'Simple budgeting method for managing your finances',
        url: 'https://www.youtube.com/watch?v=1EqXMvJMJIw',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'stress-free-budget-50-30-20',
        title: 'How to Make a Stress-Free Budget: 50/30/20 Rule',
        description: 'Easy budgeting method for beginners using the 50/30/20 rule',
        url: 'https://www.youtube.com/watch?v=7pROCR24cVg',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'budget-like-pro-50-30-20',
        title: 'Build a Budget Like a Pro - Use the 50/30/20 Budgeting Rule',
        description: 'Professional budgeting strategies using the 50/30/20 method',
        url: 'https://www.youtube.com/watch?v=EZQs4HygT_o',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'notion-budgeting-50-30-20',
        title: 'How to use Notion for Budgeting (50-30-20 Rule)',
        description: 'Using Notion app for budget tracking with the 50/30/20 rule',
        url: 'https://www.youtube.com/watch?v=zC60IxEHX5w',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'google-sheets-50-30-20-budget',
        title: 'How to Make a 50/30/20 Budget in Google Sheets',
        description: 'Creating a budget spreadsheet using Google Sheets',
        url: 'https://www.youtube.com/watch?v=bLqsx6aWljk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'what-i-wish-knew-reits',
        title: 'What I Wish I Knew Before Buying REITs',
        description: 'Important considerations before investing in REITs',
        url: 'https://www.youtube.com/watch?v=CNMR9DjbbCY',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'dangers-of-reit-investing',
        title: 'The Dangers of REIT Investing: 5 MUST KNOWS',
        description: 'Critical risks to understand before buying REITs',
        url: 'https://www.youtube.com/watch?v=rXZheBmZHQ4',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'reits-explained-canadians',
        title: 'REITs Explained for CANADIANS - Real Estate Investing',
        description: 'Understanding REITs for Canadian investors',
        url: 'https://www.youtube.com/watch?v=4j0VuUQHpB8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'what-is-reit-explained',
        title: 'What is a REIT? - Real Estate Investment Trust Explained',
        description: 'Complete explanation of Real Estate Investment Trusts',
        url: 'https://www.youtube.com/watch?v=UyhzcglO0oE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'liquid-real-estate-investing',
        title: 'Masterclass in Liquid Real Estate Investing',
        description: 'Advanced strategies for liquid real estate investments',
        url: 'https://www.youtube.com/watch?v=EXx6vCa9ff8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'bitcoin-trading-beginners',
        title: 'How To Trade Bitcoin Cryptocurrency for Beginners',
        description: 'Complete guide to trading Bitcoin and cryptocurrency',
        url: 'https://www.youtube.com/watch?v=M-qYym-i1_8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F7931A',
        level: 'Intermediate' as const
      },
      {
        id: 'what-is-bitcoin-beginners',
        title: 'What is Bitcoin? Ultimate Beginners Guide',
        description: 'Complete explanation of Bitcoin for absolute beginners',
        url: 'https://www.youtube.com/watch?v=i201o7k8C5o',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F7931A',
        level: 'Beginner' as const
      },
      {
        id: 'buy-sell-bitcoin-beginners',
        title: 'How to Buy and Sell Bitcoin for Beginners',
        description: 'Step-by-step guide to buying and selling Bitcoin',
        url: 'https://www.youtube.com/watch?v=SekU_uJC96I',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F7931A',
        level: 'Beginner' as const
      },
      {
        id: 'tax-planning-high-net-worth',
        title: '10 Tax Planning Strategies for High Net Worth Individuals',
        description: 'Advanced tax strategies for wealthy individuals',
        url: 'https://www.youtube.com/watch?v=LJtcDH999mg',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'tax-planning-rentals',
        title: 'Tax Planning for your Rentals',
        description: 'Tax strategies for real estate rental properties',
        url: 'https://www.youtube.com/watch?v=xRboubGX2K0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'year-end-tax-strategies',
        title: '5 Year-End Tax Strategies The IRS Wants You To Ignore',
        description: 'Year-end tax planning strategies and tips',
        url: 'https://www.youtube.com/watch?v=A9LXhPfnDx0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'tax-planning-2024-year-end',
        title: 'Tax Planning 2024 Year End - Projecting Taxable Income',
        description: 'Year-end tax planning and income projection strategies',
        url: 'https://www.youtube.com/watch?v=KJfmQjh2lcE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'real-estate-tax-strategy',
        title: 'The Real Estate Tax Strategy NO One Is Talking About',
        description: 'Hidden real estate tax strategies for investors',
        url: 'https://www.youtube.com/watch?v=VFVK8zfQlMk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Advanced' as const
      },
      {
        id: 'best-ai-passive-income-2024',
        title: 'The BEST A.I. Passive Income Side Hustle 2024',
        description: 'AI-powered passive income strategies for 2024',
        url: 'https://www.youtube.com/watch?v=BD9aVGh-vmc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'easiest-passive-income-ai-2025',
        title: 'Easiest Passive Income - Best A.I. Side Hustle in 2025',
        description: 'Latest AI side hustle strategies for passive income',
        url: 'https://www.youtube.com/watch?v=-s-kk3m_xwI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'earn-1000-passive-income',
        title: 'Earn $1000+ / Month in Passive Income With THIS Easy Side Hustle',
        description: 'Proven methods to earn $1000+ monthly in passive income',
        url: 'https://www.youtube.com/watch?v=wFWZkDb9hcU',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'easiest-passive-income-side-hustle',
        title: 'I found the EASIEST passive income side hustle ($300+ daily)',
        description: 'Simple passive income strategies earning $300+ per day',
        url: 'https://www.youtube.com/watch?v=hQ1z0_O-M14',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'best-side-hustle-passive-income',
        title: 'I Found the BEST Side Hustle to Make a Passive Income Online',
        description: 'Top side hustle strategies for making passive income online',
        url: 'https://www.youtube.com/watch?v=zihSs5KClSw',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'life-insurance-explained',
        title: 'Life Insurance, Explained',
        description: 'Term Life Insurance vs Whole Life Insurance explained',
        url: 'https://www.youtube.com/watch?v=yTN5GmyNUAI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'types-life-insurance',
        title: 'Different Types Of Life Insurance Explained',
        description: 'Term Life, Whole Life, Universal Life, Variable Life explained',
        url: 'https://www.youtube.com/watch?v=Sz7mIFuPQp0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'life-insurance-101',
        title: 'Life Insurance 101 (WATCH THIS BEFORE YOU BUY)',
        description: 'Everything you need to know before buying life insurance',
        url: 'https://www.youtube.com/watch?v=gdQ357almxQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'indexed-universal-life',
        title: 'What is Indexed Universal Life Insurance (IUL Explained)',
        description: 'Complete explanation of Indexed Universal Life Insurance',
        url: 'https://www.youtube.com/watch?v=O3YnDObbuD0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'wills-and-trusts-explained',
        title: 'Wills and Trusts Explained',
        description: 'Understanding the basics of wills and trusts for estate planning',
        url: 'https://www.youtube.com/watch?v=_J9hWWQG1cY',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'diy-trusts-wills-danger',
        title: 'The Hidden Danger in Do It Yourself Trusts and Wills',
        description: 'Why DIY estate planning can be risky and costly',
        url: 'https://www.youtube.com/watch?v=EC5SbKJK66c',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'differences-trusts-wills',
        title: 'Differences Between Trusts and Wills',
        description: 'Should you set up a Trust or Will? Key differences explained',
        url: 'https://www.youtube.com/watch?v=DOyWP3GPWJ8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-goals-couple',
        title: 'Can this Couple Achieve their Financial Goals?',
        description: 'Real-world financial planning process and goal setting',
        url: 'https://www.youtube.com/watch?v=aTCi3L9RzZY',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-planning-tools',
        title: '4 Free Tools To Effortlessly Create The Perfect Financial Plan',
        description: 'Free tools for creating comprehensive financial plans',
        url: 'https://www.youtube.com/watch?v=3AA1q4ufFpk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-planning-secrets',
        title: 'FINANCIAL Planning Secrets Revealed!',
        description: 'Values-based financial planning and goal integration',
        url: 'https://www.youtube.com/watch?v=rfVbPW1ylx4',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      },
      {
        id: 'retirement-steps',
        title: '6 Essential Steps Before You Retire - Don\'t Miss These!',
        description: 'Critical steps to take before retirement using financial planning software',
        url: 'https://www.youtube.com/watch?v=h96IyenPZHM',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'pay-off-debt-fast',
        title: 'How To Pay Off Debt Fast (6 Steps)',
        description: 'Proven 6-step method for paying off debt quickly',
        url: 'https://www.youtube.com/watch?v=sjyMYeb9i90',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'paid-off-43000-debt',
        title: 'How I Paid Off $43,000 In Debt',
        description: 'Real-world debt payoff story and strategies',
        url: 'https://www.youtube.com/watch?v=TAmC6aVOOE0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'debt-snowball-method',
        title: 'How to Use the Debt Snowball Method to Pay Off Debt Fast',
        description: 'Complete guide to the debt snowball method for debt elimination',
        url: 'https://www.youtube.com/watch?v=sUXXoHy5v6M',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'debt-management-fall-2024',
        title: 'Debt Management | Fall 2024',
        description: 'Current debt management strategies and plans',
        url: 'https://www.youtube.com/watch?v=jco0IRCwSz0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'analyze-stocks-screener-part1',
        title: 'How to Analyze Stocks on Screener Website? Part 1',
        description: 'Learn stock analysis fundamentals using screener website',
        url: 'https://www.youtube.com/watch?v=9fal90DXuMU',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'analyze-stocks-screener-part2',
        title: 'How to Analyze Stocks on Screener Website? Part 2',
        description: 'Advanced stock analysis techniques using screener tools',
        url: 'https://www.youtube.com/watch?v=rnMsMSjrMgM',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'options-trading-beginners-complete',
        title: 'Options Trading For Beginners: Complete Guide with Examples',
        description: 'Comprehensive options trading guide with detailed examples',
        url: 'https://www.youtube.com/watch?v=NW1ziUDjB7w',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      },
      {
        id: 'options-trading-detailed-examples',
        title: 'Options Trading for Beginners (WITH DETAILED EXAMPLES)',
        description: 'Options trading explained with real-world examples',
        url: 'https://www.youtube.com/watch?v=TyZsemV_0YA',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      },
      {
        id: 'options-trading-full-course',
        title: 'Options Trading for Beginners FULL FREE COURSE (4 Hours)',
        description: 'Complete 4-hour options trading course for beginners',
        url: 'https://www.youtube.com/watch?v=SXd-v1z5AY8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'options-trading-webull',
        title: 'ULTIMATE Guide to Options Trading on WeBull',
        description: 'Complete guide to options trading on WeBull platform',
        url: 'https://www.youtube.com/watch?v=ZJjRnKpwDyw',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Advanced' as const
      },
      {
        id: 'options-trading-2024-guide',
        title: 'Options Trading for Beginners 2024 (The ULTIMATE In-Depth Guide)',
        description: 'Most comprehensive options trading guide for 2024',
        url: 'https://www.youtube.com/watch?v=0GSB5YZx9ZE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: 'money-market-funds-explained',
        title: 'Money Market Funds | Everything You Need to Know',
        description: 'Complete guide to money market funds for emergency funds and savings',
        url: 'https://www.youtube.com/watch?v=vyj8aP0Vmmc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'investing-20s-30s-retirement',
        title: 'How to Start Investing In Your 20s & 30s For Retirement',
        description: 'Investment strategies for young adults planning for retirement',
        url: 'https://www.youtube.com/watch?v=qSIONdvvo_c',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'dividend-investing-strategy-2025',
        title: 'MY DIVIDEND INVESTING STRATEGY EXPLAINED (2025 & Beyond)',
        description: 'Complete dividend investing strategy for 2025 and beyond',
        url: 'https://www.youtube.com/watch?v=9adHRqfVhoU',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'research-dividend-stocks',
        title: 'How to research dividend stocks with Seeking Alpha',
        description: 'Learn to research and analyze dividend stocks effectively',
        url: 'https://www.youtube.com/watch?v=tXE5MheNock',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'dividend-stocks-etfs-40s',
        title: 'DIVIDEND STOCKS (and ETFs): How I\'m Investing In My 40s',
        description: 'Dividend investing strategies for middle-aged investors',
        url: 'https://www.youtube.com/watch?v=yyPlqREqE1I',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'getting-started-investing-2025',
        title: 'Getting Started With Investing In 2025 (2 Dividend Stocks I\'m Buying)',
        description: 'How to start investing in 2025 with specific dividend stock picks',
        url: 'https://www.youtube.com/watch?v=HPDNHLzPSUI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'dividend-stocks-vs-sp500',
        title: 'Dividend Stocks vs S&P 500 | The Power of Dividend Investing',
        description: 'Comparing dividend stocks to S&P 500 index investing',
        url: 'https://www.youtube.com/watch?v=6I5IOrzstXI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'fire-movement-dead',
        title: 'Is the FIRE Movement Dead? (Financial Independence, Retire Early)',
        description: 'Analysis of the FIRE movement and its current relevance',
        url: 'https://www.youtube.com/watch?v=jWlsRqpjoHE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'fire-movement-explained',
        title: 'Financial Independence Retire Early (FIRE) Explained',
        description: 'Complete explanation of the FIRE movement and strategies',
        url: 'https://www.youtube.com/watch?v=isqpzOsMluI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'fire-actually-achievable',
        title: 'Is FIRE actually achievable? Can you retire early?',
        description: 'Realistic assessment of achieving financial independence and early retirement',
        url: 'https://www.youtube.com/watch?v=klVGlU4-VmQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'college-financial-aid-secrets',
        title: '"Dirty Little Secrets" of College Financial Aid',
        description: 'Hidden truths about college financial aid and FAFSA strategies',
        url: 'https://www.youtube.com/watch?v=8Gx-VEahASc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'fafsa-assets-cost-aid',
        title: 'Completing the FAFSA: What Assets Can Cost Students Financial Aid',
        description: 'Understanding how assets affect college financial aid eligibility',
        url: 'https://www.youtube.com/watch?v=Kyantg50lAs',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'college-financial-aid-award',
        title: 'Understanding Your College Financial Aid Award Letter',
        description: 'How to read and understand your college financial aid award letter',
        url: 'https://www.youtube.com/watch?v=QeL_vclb1QU',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'financial-aid-college-admissions',
        title: 'Financial Aid & College Admissions',
        description: 'How financial aid affects college admissions and application strategies',
        url: 'https://www.youtube.com/watch?v=NsSz6S7-r94',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'quickbooks-loan-payments',
        title: 'How to Record a New Loan and Loan Payments in QuickBooks Online',
        description: 'Step-by-step guide to recording business loans in QuickBooks',
        url: 'https://www.youtube.com/watch?v=L-4cET5vFG4',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'small-business-loans-minority',
        title: 'Small Business Loans for Immigrant and Minority-Owned Businesses',
        description: 'Financing options for immigrant and minority-owned small businesses',
        url: 'https://www.youtube.com/watch?v=OA0FNsmzqNM',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'buy-house-2025-step-by-step',
        title: 'How to Buy a House in 2025 Step By Step',
        description: 'Complete guide to buying a house in 2025 for first-time buyers',
        url: 'https://www.youtube.com/watch?v=991Sw9U9nQU',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'first-time-home-buyer-class',
        title: 'Massachusetts First Time Home Buyer Class',
        description: 'Free first-time home buyer education class and mortgage guidance',
        url: 'https://www.youtube.com/watch?v=ORh84jg5ClE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'expert-advice-first-time-buyers',
        title: 'Expert Advice For First Time Home Buyers In 2024',
        description: 'Professional advice for first-time home buyers navigating the market',
        url: 'https://www.youtube.com/watch?v=yqeDffcKdQc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'how-to-buy-home-first-time',
        title: 'How to Buy a Home as a First Time Home Buyer',
        description: 'Complete process of buying your first home step by step',
        url: 'https://www.youtube.com/watch?v=UXXV9RvrOAc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'first-time-homebuyer-programs',
        title: 'First-Time Homebuyer Programs and Down-Payment Assistance',
        description: 'Available programs and assistance for first-time home buyers',
        url: 'https://www.youtube.com/watch?v=g0KdxmuA-V8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'financial-literacy-teens-managing-money',
        title: 'Financial Literacy for Teens: Managing Money with Your Teen',
        description: 'Importance of personal finance for teenagers and how to start',
        url: 'https://www.youtube.com/watch?v=QQrpD9rlJR0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'financial-literacy-kids',
        title: 'Financial Literacy for Kids',
        description: 'Teaching financial concepts including saving versus borrowing',
        url: 'https://www.youtube.com/watch?v=0iRbD5rM5qc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'what-is-money-teens',
        title: 'What Is Money? - Financial Literacy for Teens!',
        description: 'Basic understanding of money and financial concepts for teenagers',
        url: 'https://www.youtube.com/watch?v=BXfRm16S7gk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'banking-basics-fraud-protection',
        title: 'Banking Basics: How to Protect Yourself Against Fraud',
        description: 'Essential fraud protection knowledge for teens and young adults',
        url: 'https://www.youtube.com/watch?v=4zEV8NyXQ-s',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'power-compound-interest-explained',
        title: 'The Power of Compound Interest',
        description: 'Understanding how compound interest can build wealth over time',
        url: 'https://www.youtube.com/watch?v=i0ub12TKBBc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'power-compound-interest-2024',
        title: 'The Power Of Compound Interest',
        description: 'Learn about the power of compound interest for financial planning',
        url: 'https://www.youtube.com/watch?v=PiDLxJQrrqw',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'compound-interest-simple-example',
        title: 'The POWER of Compound Interest Explained with One Simple Example',
        description: 'Simple example demonstrating the power of compound interest',
        url: 'https://www.youtube.com/watch?v=PgKNRq6O6JQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'compound-interest-nerdwallet',
        title: 'Compound Interest Explained | NerdWallet',
        description: 'NerdWallet\'s explanation of compound interest and how it works',
        url: 'https://www.youtube.com/watch?v=WgVPgNFgrAo',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'roth-traditional-401k-ira-comparison',
        title: 'Roth IRA vs Traditional IRA vs 401K (SIMILARITIES & DIFFERENCES)',
        description: 'Complete comparison of retirement account types and their differences',
        url: 'https://www.youtube.com/watch?v=2iUwj4A91Yc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'best-investing-account-401k-ira-taxable',
        title: 'Which Investing Account is Best? (401k vs IRA vs Taxable)',
        description: 'Comparing different investment account types and their benefits',
        url: 'https://www.youtube.com/watch?v=udIhZUOEbOk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'hsa-basics-health-savings',
        title: 'Health Savings Account (HSA) Basics',
        description: 'Complete guide to HSA: what it is, how it works, and how to use it',
        url: 'https://www.youtube.com/watch?v=aJiHmiLcZh0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'complete-guide-hsa',
        title: 'The Complete Guide to Health Savings Accounts (HSA)',
        description: 'Comprehensive HSA guide with tips and strategies to maximize benefits',
        url: 'https://www.youtube.com/watch?v=5RZgszXENvw',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'hsa-explained-dummies',
        title: 'What is a Health Savings Account? HSA Explained for Dummies',
        description: 'Simple explanation of health savings accounts for beginners',
        url: 'https://www.youtube.com/watch?v=sii1kX7awFQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'hsa-dont-do-this',
        title: 'If You Have an HSA, DON\'T Do THIS! - Health Savings Account For Financial Independence',
        description: 'Common HSA mistakes to avoid for financial independence',
        url: 'https://www.youtube.com/watch?v=Tj8MbBWsxzU',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: '529-college-savings-explained',
        title: '529 College Savings Plan Explained',
        description: 'Comprehensive explanation of 529 college savings plans',
        url: 'https://www.youtube.com/watch?v=W1Z5yp6K0q0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: '529-beginners-guide',
        title: '529 College Savings Plan Fully Explained! (Beginner\'s Guide)',
        description: 'Complete beginner\'s guide to 529 college savings plans',
        url: 'https://www.youtube.com/watch?v=niT-I8QAbD0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: '529-tax-advantaged-explained',
        title: '529 Plans EXPLAINED: Tax-Advantaged College Savings Account',
        description: 'Understanding 529 plans as tax-advantaged college savings vehicles',
        url: 'https://www.youtube.com/watch?v=Njo8OvO0IhI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'best-529-investment-strategy',
        title: 'Best Investment Strategy For Your 529 Plan?',
        description: 'Optimal investment strategies for 529 college savings plans',
        url: 'https://www.youtube.com/watch?v=_cCGQwG20UI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'choose-best-529-plan-2023',
        title: 'How to choose the BEST 529 Plan in 2023',
        description: 'Practical tips for choosing the best 529 plan for your needs',
        url: 'https://www.youtube.com/watch?v=vGVtTscbnk0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'etfs-explained-beginners',
        title: 'ETFs Explained for Beginners',
        description: 'Complete beginner\'s guide to Exchange-Traded Funds (ETFs)',
        url: 'https://www.youtube.com/watch?v=zwJ-xK7gJ9s',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'how-to-invest-etfs-beginners',
        title: 'How To Invest In ETFs: Step-by-Step For Beginners',
        description: 'Step-by-step guide to investing in ETFs for beginners',
        url: 'https://www.youtube.com/watch?v=DwxrfBMTCuA',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'etf-investing-vs-mutual-funds',
        title: 'ETF Investing for Beginners | ETF vs Mutual Funds',
        description: 'Beginner\'s guide to ETF investing and comparison with mutual funds',
        url: 'https://www.youtube.com/watch?v=t86OsSL7Opk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'sp500-index-investing-beginners',
        title: 'How to Invest in the S&P 500 Index for Beginners',
        description: 'Complete guide to investing in S&P 500 index funds for beginners',
        url: 'https://www.youtube.com/watch?v=OP6LS30H3eo',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'set-financial-goals-guide',
        title: 'How to Set Financial Goals | Step-by-Step Guide',
        description: 'Learn to formulate SMART financial goals and turn desires into achievements',
        url: 'https://www.youtube.com/watch?v=Duxo4xXeMec',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'smart-financial-goals-2025',
        title: 'How to Set SMART Financial Goals for 2025',
        description: 'Setting specific, measurable, achievable financial goals for 2025',
        url: 'https://www.youtube.com/watch?v=bd_j0cDokQE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'positive-mindset-money-brian-tracy',
        title: 'How to Have a Positive Mindset About Money | Brian Tracy',
        description: 'Developing a positive relationship with money and financial goals',
        url: 'https://www.youtube.com/watch?v=IL44lnpUwEc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'top-5-personal-finance-tips-2025',
        title: 'Top 5 Personal Finance Tips in 2025 how I would approach saving',
        description: 'Current personal finance tips and money management strategies for 2025',
        url: 'https://www.youtube.com/watch?v=tniPAtlMlZc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'money-management-tony-robbins',
        title: '6 Ways to Manage Your Money with Tony Robbins',
        description: 'Money management strategies from renowned success coach Tony Robbins',
        url: 'https://www.youtube.com/watch?v=lQFCGOsyEnY',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'save-money-minimalist',
        title: 'How to Save Money Like a Minimalist',
        description: 'Ultimate frugal living tips, tricks and money-saving hacks',
        url: 'https://www.youtube.com/watch?v=oMwW46V3s5s',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'money-saving-tips-australia-2023',
        title: '10 Tips To Save More Money • Money Saving Tips Australia 2023',
        description: 'Practical frugal living and money saving tips for 2023',
        url: 'https://www.youtube.com/watch?v=OK6wMf97Bfw',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'cut-costs-frugal-tips',
        title: 'Cut Costs Save Money...Easy Frugal Tips',
        description: 'How to save money tips for people on tight budgets',
        url: 'https://www.youtube.com/watch?v=JcpsiiAKLGk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'save-money-nyc-25-year-old',
        title: 'How I Save Money Living In NYC as a 25 Year Old',
        description: 'Money saving strategies for young adults living in expensive cities',
        url: 'https://www.youtube.com/watch?v=c3KatwgK4x8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'khan-academy-finance-capital-markets',
        title: 'Khan Academy - Finance and Capital Markets',
        description: 'Comprehensive course on finance, banking, money, and capital markets',
        url: 'https://www.youtube.com/watch?v=Fm2gU4voIcI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'crash-course-economics-intro',
        title: 'Crash Course Economics #1: Intro to Economics',
        description: 'Introduction to economics and how it affects your daily life',
        url: 'https://www.youtube.com/watch?v=3ez10ADR_gM',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'crash-course-economics-supply-demand',
        title: 'Crash Course Economics #4: Supply and Demand',
        description: 'Understanding supply and demand in economics and markets',
        url: 'https://www.youtube.com/watch?v=kIFBaaPJUO0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'dave-ramsey-baby-steps-explained',
        title: 'Dave Ramsey Baby Steps Explained',
        description: 'Complete explanation of Dave Ramsey\'s 7 Baby Steps to financial freedom',
        url: 'https://www.youtube.com/watch?v=V8h1cXNQWwk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'financial-diet-money-mistakes',
        title: 'The Financial Diet - 10 Money Mistakes Everyone Makes',
        description: 'Common financial mistakes and how to avoid them',
        url: 'https://www.youtube.com/watch?v=jLkXoahASYE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'ted-ed-economics-basics',
        title: 'TED-Ed: How Does the Stock Market Work?',
        description: 'Simple explanation of how the stock market functions',
        url: 'https://www.youtube.com/watch?v=F3QpgXBtDeo',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'ted-ed-compound-interest',
        title: 'TED-Ed: How Does Compound Interest Work?',
        description: 'Visual explanation of compound interest and its power',
        url: 'https://www.youtube.com/watch?v=kIFBaaPJUO0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'personal-finance-101-basics',
        title: 'Personal Finance 101: Everything You Need to Know',
        description: 'Complete beginner\'s guide to personal finance fundamentals',
        url: 'https://www.youtube.com/watch?v=HQzoZfc3GwQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'money-management-tips-2025',
        title: 'Money Management Tips for 2025',
        description: 'Current money management strategies and tips for the new year',
        url: 'https://www.youtube.com/watch?v=tniPAtlMlZc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'budgeting-for-beginners-complete',
        title: 'Budgeting for Beginners - Complete Guide',
        description: 'Step-by-step guide to creating and maintaining a budget',
        url: 'https://www.youtube.com/watch?v=sVKQn2R7yd0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'emergency-fund-how-much',
        title: 'Emergency Fund: How Much Do You Really Need?',
        description: 'Determining the right emergency fund size for your situation',
        url: 'https://www.youtube.com/watch?v=i0ub12TKBBc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'investing-101-stock-market',
        title: 'Investing 101: Stock Market for Beginners',
        description: 'Basic introduction to stock market investing for beginners',
        url: 'https://www.youtube.com/watch?v=hMqNOiqmvbA',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'retirement-planning-20s-30s',
        title: 'Retirement Planning in Your 20s and 30s',
        description: 'Early retirement planning strategies for young adults',
        url: 'https://www.youtube.com/watch?v=qSIONdvvo_c',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'credit-score-improvement-guide',
        title: 'How to Improve Your Credit Score Fast',
        description: 'Proven strategies to improve your credit score quickly',
        url: 'https://www.youtube.com/watch?v=HQzoZfc3GwQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'passive-income-strategies',
        title: '10 Passive Income Ideas for 2025',
        description: 'Multiple passive income strategies and how to implement them',
        url: 'https://www.youtube.com/watch?v=zihSs5KClSw',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'real-estate-investing-beginners',
        title: 'Real Estate Investing for Beginners',
        description: 'Introduction to real estate investment strategies and basics',
        url: 'https://www.youtube.com/watch?v=hMqNOiqmvbA',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-independence-guide',
        title: 'Complete Guide to Financial Independence',
        description: 'Comprehensive guide to achieving financial independence',
        url: 'https://www.youtube.com/watch?v=isqpzOsMluI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      },
      {
        id: 'tax-strategies-optimization',
        title: 'Tax Strategies for Wealth Building',
        description: 'Advanced tax optimization strategies for building wealth',
        url: 'https://www.youtube.com/watch?v=gdQ357almxQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'business-finance-fundamentals',
        title: 'Business Finance Fundamentals',
        description: 'Essential business finance concepts for entrepreneurs',
        url: 'https://www.youtube.com/watch?v=L-4cET5vFG4',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'international-investing-guide',
        title: 'International Investing: A Complete Guide',
        description: 'Guide to investing in international markets and currencies',
        url: 'https://www.youtube.com/watch?v=O3YnDObbuD0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'financial-psychology-behavior',
        title: 'The Psychology of Money and Financial Behavior',
        description: 'Understanding the psychological aspects of financial decision-making',
        url: 'https://www.youtube.com/watch?v=IL44lnpUwEc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'estate-planning-basics',
        title: 'Estate Planning Basics Everyone Should Know',
        description: 'Introduction to estate planning and wealth transfer strategies',
        url: 'https://www.youtube.com/watch?v=_J9hWWQG1cY',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: 'financial-planning-software-tools',
        title: 'Best Financial Planning Software and Tools',
        description: 'Review of top financial planning software and digital tools',
        url: 'https://www.youtube.com/watch?v=3AA1q4ufFpk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'college-funding-strategies',
        title: 'College Funding Strategies for Parents',
        description: 'Comprehensive guide to funding college education',
        url: 'https://www.youtube.com/watch?v=W1Z5yp6K0q0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'small-business-financial-management',
        title: 'Small Business Financial Management',
        description: 'Financial management strategies for small business owners',
        url: 'https://www.youtube.com/watch?v=OA0FNsmzqNM',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'financial-literacy-teens-complete',
        title: 'Complete Financial Literacy Course for Teens',
        description: 'Comprehensive financial education designed specifically for teenagers',
        url: 'https://www.youtube.com/watch?v=QQrpD9rlJR0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'women-financial-empowerment',
        title: 'Financial Empowerment for Women',
        description: 'Addressing unique financial challenges and opportunities for women',
        url: 'https://www.youtube.com/watch?v=IL44lnpUwEc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'retirement-income-planning',
        title: 'Retirement Income Planning Strategies',
        description: 'Creating sustainable income streams in retirement',
        url: 'https://www.youtube.com/watch?v=h96IyenPZHM',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: 'financial-goals-smart-setting',
        title: 'Setting SMART Financial Goals',
        description: 'How to set specific, measurable, achievable financial goals',
        url: 'https://www.youtube.com/watch?v=Duxo4xXeMec',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'financial-stress-management',
        title: 'Managing Financial Stress and Anxiety',
        description: 'Strategies for dealing with financial stress and building confidence',
        url: 'https://www.youtube.com/watch?v=lQFCGOsyEnY',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-education-kids-parents',
        title: 'Teaching Kids About Money: A Parent\'s Guide',
        description: 'How parents can teach children about money and financial responsibility',
        url: 'https://www.youtube.com/watch?v=0iRbD5rM5qc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'financial-technology-fintech',
        title: 'Understanding Financial Technology (FinTech)',
        description: 'How financial technology is changing personal finance',
        url: 'https://www.youtube.com/watch?v=BXfRm16S7gk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'sustainable-investing-esg',
        title: 'Sustainable Investing and ESG Factors',
        description: 'Introduction to environmental, social, and governance investing',
        url: 'https://www.youtube.com/watch?v=9adHRqfVhoU',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Advanced' as const
      },
      {
        id: 'financial-planning-couples',
        title: 'Financial Planning for Couples',
        description: 'How couples can work together on financial goals and planning',
        url: 'https://www.youtube.com/watch?v=aTCi3L9RzZY',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-independence-retire-early',
        title: 'FIRE: Financial Independence, Retire Early',
        description: 'Complete guide to the FIRE movement and early retirement strategies',
        url: 'https://www.youtube.com/watch?v=jWlsRqpjoHE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: 'financial-literacy-immigrants',
        title: 'Financial Literacy for Immigrants',
        description: 'Financial education tailored for immigrants and new residents',
        url: 'https://www.youtube.com/watch?v=OA0FNsmzqNM',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Beginner' as const
      },
      {
        id: 'financial-wellness-workplace',
        title: 'Financial Wellness in the Workplace',
        description: 'How employers and employees can promote financial wellness',
        url: 'https://www.youtube.com/watch?v=4zEV8NyXQ-s',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-planning-millennials',
        title: 'Financial Planning for Millennials',
        description: 'Addressing unique financial challenges facing the millennial generation',
        url: 'https://www.youtube.com/watch?v=c3KatwgK4x8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'financial-planning-gen-z',
        title: 'Financial Planning for Generation Z',
        description: 'Financial strategies and advice tailored for Gen Z',
        url: 'https://www.youtube.com/watch?v=BXfRm16S7gk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'financial-planning-seniors',
        title: 'Financial Planning for Seniors',
        description: 'Financial strategies for older adults and retirees',
        url: 'https://www.youtube.com/watch?v=h96IyenPZHM',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      },
      {
        id: 'financial-recovery-crisis',
        title: 'Financial Recovery After Crisis',
        description: 'Strategies for rebuilding finances after economic hardship',
        url: 'https://www.youtube.com/watch?v=sjyMYeb9i90',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-education-global-perspective',
        title: 'Financial Education: A Global Perspective',
        description: 'How financial education varies across different countries and cultures',
        url: 'https://www.youtube.com/watch?v=klVGlU4-VmQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'financial-literacy-assessment',
        title: 'Assessing Your Financial Literacy',
        description: 'Tools and methods to evaluate your current financial knowledge',
        url: 'https://www.youtube.com/watch?v=Duxo4xXeMec',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'financial-education-future-trends',
        title: 'The Future of Financial Education',
        description: 'Emerging trends and technologies in financial education',
        url: 'https://www.youtube.com/watch?v=bd_j0cDokQE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'financial-coaching-vs-planning',
        title: 'Financial Coaching vs Financial Planning',
        description: 'Understanding the difference between financial coaching and planning',
        url: 'https://www.youtube.com/watch?v=lQFCGOsyEnY',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-education-policy-advocacy',
        title: 'Financial Education Policy and Advocacy',
        description: 'The role of policy in promoting financial education',
        url: 'https://www.youtube.com/watch?v=isqpzOsMluI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      },
      {
        id: 'financial-education-measurement-impact',
        title: 'Measuring the Impact of Financial Education',
        description: 'How to evaluate the effectiveness of financial education programs',
        url: 'https://www.youtube.com/watch?v=jWlsRqpjoHE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: 'warren-buffett-bubble-2024',
        title: 'Warren Buffett on 1999 vs. 2024: Are We in a Bubble?',
        description: 'Warren Buffett\'s insights on market bubbles and investment strategy',
        url: 'https://www.youtube.com/watch?v=ePHIFZ6YeKE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'warren-buffett-apple-stock-sale',
        title: 'Warren Buffett explains Why He Sold Apple Stock',
        description: 'Buffett addresses the recent sale of 115 million Apple shares by Berkshire Hathaway',
        url: 'https://www.youtube.com/watch?v=9fQwp4UHZHQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'warren-buffett-overvalued-market',
        title: 'Warren Buffett: How to Invest in an Overvalued Market',
        description: 'Investment strategies for navigating overvalued market conditions',
        url: 'https://www.youtube.com/watch?v=1Hxy2NBD7J8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Advanced' as const
      },
      {
        id: 'ray-dalio-economic-machine',
        title: 'How The Economic Machine Works by Ray Dalio',
        description: 'Comprehensive explanation of how the economy works in 30 minutes',
        url: 'https://www.youtube.com/watch?v=PHe0bXAIuk0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'ray-dalio-changing-world-order',
        title: 'Principles for Dealing with the Changing World Order by Ray Dalio',
        description: 'Understanding global economic and political changes',
        url: 'https://www.youtube.com/watch?v=xguam0TKMw8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: 'robert-kiyosaki-cashflow-quadrant',
        title: 'The CashFlow Quadrant for Financial Literacy | Robert Kiyosaki',
        description: 'Financial model for understanding different income sources',
        url: 'https://www.youtube.com/watch?v=WyOC4230738',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'cashflow-quadrant-explained',
        title: 'Cash Flow Quadrant by Robert Kiyosaki',
        description: 'Detailed explanation of the four quadrants of income generation',
        url: 'https://www.youtube.com/watch?v=13zmg0BSDk0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Intermediate' as const
      },
      {
        id: 'ramit-sethi-be-rich-10-minutes',
        title: 'I Will Teach You To Be Rich in 10 Minutes',
        description: 'Quick overview of Ramit Sethi\'s wealth-building principles',
        url: 'https://www.youtube.com/watch?v=zAtRt8EU6fg',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'ramit-sethi-google-talk',
        title: 'I Will Teach You to Be Rich | Ramit Sethi | Talks at Google',
        description: 'Comprehensive presentation on personal finance and wealth building',
        url: 'https://www.youtube.com/watch?v=BmAwa1nnB6w',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'ramit-sethi-6-months-finances',
        title: 'You Can Change Your Finances in 6 Months… Here\'s How',
        description: 'Practical steps to transform your financial situation quickly',
        url: 'https://www.youtube.com/watch?v=zzYpMBjbPlc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Beginner' as const
      },
      {
        id: 'graham-stephan-millionaire-girlfriend',
        title: 'Girlfriend Reacts To How I Became A Millionaire',
        description: 'Personal story of wealth building and financial success',
        url: 'https://www.youtube.com/watch?v=UlyxmDkaxzA',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'california-real-estate-million',
        title: 'What $1,000,000 Buys You In California',
        description: 'Real estate market analysis and property investment insights',
        url: 'https://www.youtube.com/watch?v=NJjZlmajrBM',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-independence-early-retirement',
        title: 'The Complete Guide to Financial Independence and Early Retirement',
        description: 'Comprehensive FIRE strategy and implementation guide',
        url: 'https://www.youtube.com/watch?v=isqpzOsMluI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'index-fund-investing-complete',
        title: 'Index Fund Investing: The Complete Guide',
        description: 'Everything you need to know about index fund investing',
        url: 'https://www.youtube.com/watch?v=OP6LS30H3eo',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Beginner' as const
      },
      {
        id: 'dollar-cost-averaging-explained',
        title: 'Dollar Cost Averaging Explained',
        description: 'Investment strategy for reducing market timing risk',
        url: 'https://www.youtube.com/watch?v=Fm2gU4voIcI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Beginner' as const
      },
      {
        id: 'roth-ira-complete-guide',
        title: 'Roth IRA: The Complete Guide',
        description: 'Everything about Roth IRAs including rules, benefits, and strategies',
        url: 'https://www.youtube.com/watch?v=2iUwj4A91Yc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'traditional-401k-vs-roth-401k',
        title: 'Traditional 401k vs Roth 401k: Which is Better?',
        description: 'Comparison of traditional and Roth 401k retirement accounts',
        url: 'https://www.youtube.com/watch?v=udIhZUOEbOk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Intermediate' as const
      },
      {
        id: 'asset-allocation-portfolio-theory',
        title: 'Asset Allocation and Modern Portfolio Theory',
        description: 'Understanding portfolio diversification and risk management',
        url: 'https://www.youtube.com/watch?v=9fal90DXuMU',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'value-investing-principles',
        title: 'Value Investing Principles and Strategies',
        description: 'Fundamental analysis and value investing methodology',
        url: 'https://www.youtube.com/watch?v=rnMsMSjrMgM',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'growth-vs-value-investing',
        title: 'Growth vs Value Investing: Which Strategy Wins?',
        description: 'Comparison of growth and value investment strategies',
        url: 'https://www.youtube.com/watch?v=NW1ziUDjB7w',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'reits-real-estate-investing',
        title: 'REITs: Real Estate Investing for Beginners',
        description: 'Introduction to Real Estate Investment Trusts',
        url: 'https://www.youtube.com/watch?v=TyZsemV_0YA',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'bond-investing-complete-guide',
        title: 'Bond Investing: The Complete Guide',
        description: 'Understanding bonds, yields, and fixed-income investing',
        url: 'https://www.youtube.com/watch?v=SXd-v1z5AY8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'international-diversification',
        title: 'International Diversification: Why and How',
        description: 'Benefits and strategies for global portfolio diversification',
        url: 'https://www.youtube.com/watch?v=ZJjRnKpwDyw',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: 'market-volatility-psychology',
        title: 'Market Volatility and Investor Psychology',
        description: 'Understanding emotional investing and market behavior',
        url: 'https://www.youtube.com/watch?v=0GSB5YZx9ZE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-planning-young-professionals',
        title: 'Financial Planning for Young Professionals',
        description: 'Money management strategies for career starters',
        url: 'https://www.youtube.com/watch?v=vyj8aP0Vmmc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Beginner' as const
      },
      {
        id: 'side-hustle-income-streams',
        title: 'Building Multiple Income Streams: Side Hustle Guide',
        description: 'Creating additional income sources beyond your main job',
        url: 'https://www.youtube.com/watch?v=qSIONdvvo_c',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'freelancing-financial-management',
        title: 'Financial Management for Freelancers and Gig Workers',
        description: 'Managing irregular income and business expenses',
        url: 'https://www.youtube.com/watch?v=9adHRqfVhoU',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'small-business-accounting-basics',
        title: 'Small Business Accounting Basics',
        description: 'Essential accounting principles for small business owners',
        url: 'https://www.youtube.com/watch?v=tXE5MheNock',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'business-credit-vs-personal-credit',
        title: 'Business Credit vs Personal Credit: What You Need to Know',
        description: 'Understanding the differences and building business credit',
        url: 'https://www.youtube.com/watch?v=yyPlqREqE1I',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: 'startup-funding-options',
        title: 'Startup Funding Options: From Bootstrapping to VC',
        description: 'Different ways to fund your startup or business',
        url: 'https://www.youtube.com/watch?v=HPDNHLzPSUI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'financial-ratios-analysis',
        title: 'Financial Ratios Analysis for Investors',
        description: 'Key financial ratios for evaluating company performance',
        url: 'https://www.youtube.com/watch?v=6I5IOrzstXI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'reading-financial-statements',
        title: 'How to Read Financial Statements',
        description: 'Understanding income statements, balance sheets, and cash flow',
        url: 'https://www.youtube.com/watch?v=jWlsRqpjoHE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'economic-indicators-explained',
        title: 'Economic Indicators Every Investor Should Know',
        description: 'Understanding GDP, inflation, unemployment, and market indicators',
        url: 'https://www.youtube.com/watch?v=isqpzOsMluI',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'federal-reserve-monetary-policy',
        title: 'Federal Reserve and Monetary Policy Explained',
        description: 'How the Fed influences the economy and your investments',
        url: 'https://www.youtube.com/watch?v=klVGlU4-VmQ',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      },
      {
        id: 'inflation-hedging-strategies',
        title: 'Inflation Hedging: Protecting Your Wealth',
        description: 'Investment strategies to protect against inflation',
        url: 'https://www.youtube.com/watch?v=8Gx-VEahASc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: 'recession-investing-strategies',
        title: 'How to Invest During a Recession',
        description: 'Investment strategies for economic downturns',
        url: 'https://www.youtube.com/watch?v=Kyantg50lAs',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      },
      {
        id: 'market-cycles-timing',
        title: 'Understanding Market Cycles and Timing',
        description: 'How markets move in cycles and investment timing strategies',
        url: 'https://www.youtube.com/watch?v=QeL_vclb1QU',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'behavioral-finance-biases',
        title: 'Behavioral Finance: Common Investment Biases',
        description: 'Psychological biases that affect investment decisions',
        url: 'https://www.youtube.com/watch?v=NsSz6S7-r94',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Intermediate' as const
      },
      {
        id: 'financial-advisor-choosing',
        title: 'How to Choose a Financial Advisor',
        description: 'What to look for when selecting professional financial help',
        url: 'https://www.youtube.com/watch?v=L-4cET5vFG4',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Intermediate' as const
      },
      {
        id: 'diy-vs-professional-investing',
        title: 'DIY Investing vs Professional Management',
        description: 'Pros and cons of managing your own investments',
        url: 'https://www.youtube.com/watch?v=OA0FNsmzqNM',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Intermediate' as const
      },
      {
        id: 'robo-advisors-explained',
        title: 'Robo-Advisors: Automated Investing Explained',
        description: 'Understanding automated investment platforms and their benefits',
        url: 'https://www.youtube.com/watch?v=991Sw9U9nQU',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Beginner' as const
      },
      {
        id: 'investment-fees-costs',
        title: 'Investment Fees and Costs: What You Need to Know',
        description: 'Understanding how fees impact your investment returns',
        url: 'https://www.youtube.com/watch?v=ORh84jg5ClE',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Intermediate' as const
      },
      {
        id: 'tax-efficient-investing',
        title: 'Tax-Efficient Investing Strategies',
        description: 'Minimizing taxes on your investment gains',
        url: 'https://www.youtube.com/watch?v=yqeDffcKdQc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#1E40AF',
        level: 'Advanced' as const
      },
      {
        id: 'retirement-withdrawal-strategies',
        title: 'Retirement Withdrawal Strategies',
        description: 'How to withdraw money from retirement accounts efficiently',
        url: 'https://www.youtube.com/watch?v=UXXV9RvrOAc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#DC2626',
        level: 'Advanced' as const
      },
      {
        id: 'social-security-optimization',
        title: 'Social Security Optimization Strategies',
        description: 'Maximizing your Social Security benefits',
        url: 'https://www.youtube.com/watch?v=g0KdxmuA-V8',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#059669',
        level: 'Advanced' as const
      },
      {
        id: 'medicare-financial-planning',
        title: 'Medicare and Healthcare Financial Planning',
        description: 'Planning for healthcare costs in retirement',
        url: 'https://www.youtube.com/watch?v=QQrpD9rlJR0',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#8B5CF6',
        level: 'Advanced' as const
      },
      {
        id: 'long-term-care-planning',
        title: 'Long-Term Care Insurance and Planning',
        description: 'Preparing for potential long-term care needs',
        url: 'https://www.youtube.com/watch?v=0iRbD5rM5qc',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#F59E0B',
        level: 'Advanced' as const
      },
      {
        id: 'financial-legacy-planning',
        title: 'Financial Legacy and Wealth Transfer Planning',
        description: 'Strategies for passing wealth to the next generation',
        url: 'https://www.youtube.com/watch?v=BXfRm16S7gk',
        category: 'Educational Video',
        icon: <Video className="w-4 h-4" />,
        color: '#7C3AED',
        level: 'Advanced' as const
      }
    ]
  };

  // Flatten all resources for easy access
  const allResources: FinancialResource[] = useMemo(() =>
    Object.values(resourceCategories).flat(),
    [resourceCategories]
  );
  const totalResources = allResources.length;

  // Convert resources to searchable items
  const searchableItems: SearchableItem[] = useMemo(() => {
    return allResources.map(resource => ({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      category: Object.keys(resourceCategories).find(categoryName =>
        resourceCategories[categoryName].some(r => r.id === resource.id)
      ) || 'Other',
      level: resource.level,
      type: resource.url.includes('youtube.com') || resource.url.includes('youtu.be') ? 'video' : 'website',
      url: resource.url,
      ...resource
    }));
  }, [allResources]);

  // Filter options for search
  const categoryOptions: FilterOption[] = useMemo(() => {
    return Object.keys(resourceCategories).map(categoryName => ({
      value: categoryName,
      label: categoryName,
      count: resourceCategories[categoryName].length
    }));
  }, []);

  const levelOptions: FilterOption[] = [
    { value: 'Beginner', label: 'Beginner', count: allResources.filter(r => r.level === 'Beginner').length },
    { value: 'Intermediate', label: 'Intermediate', count: allResources.filter(r => r.level === 'Intermediate').length },
    { value: 'Advanced', label: 'Advanced', count: allResources.filter(r => r.level === 'Advanced').length }
  ];

  const typeOptions: FilterOption[] = [
    { value: 'website', label: 'Websites', count: allResources.filter(r => !r.url.includes('youtube.com')).length },
    { value: 'video', label: 'Videos', count: allResources.filter(r => r.url.includes('youtube.com')).length }
  ];

  // Handle search results
  const handleSearchResults = useCallback((results: SearchableItem[]) => {
    setSearchResults(results);
  }, []);

  // Get filtered categories based on search results
  const filteredCategories = useMemo(() => {
    if (searchResults.length === 0) {
      return resourceCategories;
    }

    // Group search results by category
    const filtered: Record<string, FinancialResource[]> = {};

    searchResults.forEach(item => {
      const categoryName = item.category;
      if (!filtered[categoryName]) {
        filtered[categoryName] = [];
      }

      // Find the original resource
      const originalResource = allResources.find(r => r.id === item.id);
      if (originalResource) {
        filtered[categoryName].push(originalResource);
      }
    });

    return filtered;
  }, [searchResults, allResources]);




  const openResource = (resource: FinancialResource) => {
    if (resource.url.includes('youtube.com') || resource.url.includes('youtu.be')) {
      // Save current scroll position before opening video
      setPreviousScrollPosition(window.scrollY);
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

          {/* Smart Search Bar */}
          <div className="mb-8">
            <SmartSearchBar
              items={searchableItems}
              onSearchResults={handleSearchResults}
              placeholder={`Search ${totalResources}+ financial resources...`}
              accentColor="green"
              categories={categoryOptions}
              levels={levelOptions}
              types={typeOptions}
              enableIntentDetection={true}
              className="mb-6"
            />
          </div>

          {/* Resource Categories */}
          <div className="space-y-8">
            {Object.entries(filteredCategories).length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700/50 rounded-2xl mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No resources found</h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-all duration-200 border border-green-500/30"
                >
                  <X className="h-4 w-4" />
                  Clear All Filters
                </button>
              </div>
            ) : (
              Object.entries(filteredCategories).map(([categoryName, categoryResources], categoryIndex) => (
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

                  {/* Modern Card Grid - Responsive Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {categoryResources.map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                        className="group"
                      >
                        <button
                          type="button"
                          onClick={() => openResource(resource)}
                          className="w-full h-[200px] bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/20 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 hover:bg-white/10 active:scale-[0.98] text-left relative overflow-hidden group flex flex-col"
                        >
                          {/* Background Gradient */}
                          <div
                            className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(135deg, ${resource.color}20 0%, transparent 50%)`
                            }}
                          />

                          {/* Level Badge */}
                          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${getLevelColor(resource.level)}`}>
                            {resource.level}
                          </div>

                          {/* Icon Container */}
                          <div className="relative mb-3 flex-shrink-0">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                              style={{ backgroundColor: resource.color }}
                            >
                              {resource.icon}
                            </div>

                            {/* Resource Type Indicator */}
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
                              {resource.url.includes('youtube.com') ? (
                                <Video className="w-2.5 h-2.5 text-red-400" />
                              ) : (
                                <ExternalLink className="w-2.5 h-2.5 text-blue-400" />
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col space-y-2">
                            {/* Title */}
                            <h3 className="text-sm font-bold text-white leading-tight group-hover:text-green-300 transition-colors duration-300 line-clamp-2">
                              {resource.title}
                            </h3>

                            {/* Category Tag */}
                            <div className="inline-flex items-center px-2 py-1 bg-gray-700/50 rounded-lg flex-shrink-0">
                              <span className="text-xs font-medium text-gray-300 truncate">
                                {resource.category}
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1">
                              {resource.description}
                            </p>

                            {/* Action Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-700/30 mt-auto">
                              <span className="text-xs font-semibold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                                {resource.url.includes('youtube.com') ? 'Watch Video' : 'Visit Site'}
                              </span>
                              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-300">
                                <ExternalLink size={10} className="text-green-400 group-hover:text-green-300" />
                              </div>
                            </div>
                          </div>

                          {/* Hover Effect Overlay */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
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
