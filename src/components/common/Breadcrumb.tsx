import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  path: string;
  description?: string;
  isActive?: boolean;
}

interface UnifiedBreadcrumbProps {
  customItems?: BreadcrumbItem[];
  className?: string;
  theme?: 'light' | 'dark';
  showOnHomepage?: boolean;
}

const UnifiedBreadcrumb: React.FC<UnifiedBreadcrumbProps> = ({
  customItems,
  className = "",
  theme = 'light',
  showOnHomepage = false
}) => {
  const location = useLocation();

  // Comprehensive route mapping for Google-optimized breadcrumbs
  const routeMap: Record<string, BreadcrumbItem> = {
    // Main Navigation
    '/': { name: 'Home', path: '/', description: 'St. Louis Demonstration JHS Homepage' },
    '/about': { name: 'About Us', path: '/about', description: 'About our school, mission, and values' },
    '/academics': { name: 'Academics', path: '/academics', description: 'Academic programs and curriculum' },
    '/admissions': { name: 'Admissions', path: '/admissions', description: 'School admissions information and requirements' },
    '/faculty': { name: 'Faculty & Staff', path: '/faculty', description: 'Our dedicated teachers and staff members' },
    '/contact': { name: 'Contact Us', path: '/contact', description: 'Contact information and school location' },
    '/gallery': { name: 'Gallery', path: '/gallery', description: 'Photo and video gallery of school activities' },
    '/news': { name: 'News & Events', path: '/news', description: 'Latest school news, events, and announcements' },

    // Academic Subjects & Programs
    '/core-academic': { name: 'Core Academic', path: '/core-academic', description: 'Core academic subjects and curriculum' },
    '/language-communication': { name: 'Language & Communication', path: '/language-communication', description: 'Language and communication skills development' },
    '/creative-arts': { name: 'Creative Arts', path: '/creative-arts', description: 'Creative arts and design programs' },
    '/character-education': { name: 'Character Education', path: '/character-education', description: 'Character and values education program' },

    // Subject Pages
    '/subject/english-language': { name: 'English Language', path: '/subject/english-language', description: 'English language curriculum and resources' },
    '/subject/mathematics': { name: 'Mathematics', path: '/subject/mathematics', description: 'Mathematics curriculum and learning resources' },
    '/subject/integrated-science': { name: 'Integrated Science', path: '/subject/integrated-science', description: 'Integrated science curriculum and experiments' },
    '/subject/social-studies': { name: 'Social Studies', path: '/subject/social-studies', description: 'Social studies curriculum and cultural education' },
    '/subject/religious-moral-education': { name: 'Religious & Moral Education', path: '/subject/religious-moral-education', description: 'Religious and moral education curriculum' },
    '/subject/ghanaian-language': { name: 'Ghanaian Language', path: '/subject/ghanaian-language', description: 'Ghanaian language studies and cultural heritage' },
    '/subject/french': { name: 'French', path: '/subject/french', description: 'French language learning and communication' },
    '/subject/career-technology': { name: 'Career Technology', path: '/subject/career-technology', description: 'Career and technology education' },
    '/subject/computing-ict': { name: 'Computing & ICT', path: '/subject/computing-ict', description: 'Computing and Information Communication Technology' },
    '/subject/creative-arts-design': { name: 'Creative Arts & Design', path: '/subject/creative-arts-design', description: 'Creative arts and design curriculum' },
    '/subject/music': { name: 'Music', path: '/subject/music', description: 'Music education and performance' },

    // STEM & Technology
    '/stem': { name: 'STEM Education', path: '/stem', description: 'Science, Technology, Engineering & Mathematics programs' },
    '/stem-education': { name: 'STEM Education', path: '/stem-education', description: 'STEM programs and educational resources' },
    '/stem-deep-learning': { name: 'STEM Deep Learning', path: '/stem-deep-learning', description: 'Advanced STEM learning and research' },
    '/robotics': { name: 'Robotics', path: '/robotics', description: 'Robotics education and programming' },
    '/space-exploration': { name: 'Space Exploration', path: '/space-exploration', description: 'Space science and exploration studies' },

    // AI & Digital Learning
    '/ai': { name: 'AI Learning', path: '/ai', description: 'Artificial Intelligence education and resources' },
    '/ai-search': { name: 'AI Search', path: '/ai-search', description: 'Intelligent search system for school information' },
    '/mayamiles-ai': { name: 'MayaMiles AI', path: '/mayamiles-ai', description: 'AI-powered learning assistant' },
    '/ask-louis': { name: 'Ask Louis', path: '/ask-louis', description: 'AI assistant for school information and guidance' },

    // Student Resources
    '/students-hub': { name: 'Students Hub', path: '/students-hub', description: 'Digital learning platform and student resources' },
    '/learnhub': { name: 'Students Hub', path: '/learnhub', description: 'Digital learning platform and educational tools' },
    '/tech-resources': { name: 'Tech Resources', path: '/tech-resources', description: 'Technology learning resources and tools' },
    '/ai-teaching-guide': { name: 'AI Teaching Guide', path: '/ai-teaching-guide', description: 'AI teaching resources for educators' },
    '/jhs-textbooks': { name: 'JHS Textbooks', path: '/jhs-textbooks', description: 'Junior High School textbooks and materials' },
    '/dream-hive-resources': { name: 'Dream Hive Resources', path: '/dream-hive-resources', description: 'Dream Hive learning and development resources' },
    '/career-reel-resources': { name: 'Career Reel Resources', path: '/career-reel-resources', description: 'Career guidance video resources and content' },
    '/money-smart-links': { name: 'Money Smart Links', path: '/money-smart-links', description: 'Financial education links and resources' },
    '/advice-speeches': { name: 'Advice Speeches', path: '/advice-speeches', description: 'Inspirational speeches and motivational content' },
    '/staff-resources': { name: 'Staff Resources', path: '/staff-resources', description: 'Resources and tools for staff members' },

    // Financial & Career Guidance
    '/financial-literacy': { name: 'Financial Literacy', path: '/financial-literacy', description: 'Financial education and literacy programs' },
    '/financialliteracy': { name: 'Financial Literacy', path: '/financialliteracy', description: 'Financial education and money management' },
    '/scholarship-opportunities': { name: 'Scholarship Opportunities', path: '/scholarship-opportunities', description: 'Available scholarships and funding opportunities' },
    '/educational-pathway-guide': { name: 'Educational Pathway Guide', path: '/educational-pathway-guide', description: 'Educational pathway guidance and career planning' },
    '/leadership-excellence': { name: 'Leadership Excellence', path: '/leadership-excellence', description: 'Leadership development and excellence programs' },
    '/shs-database': { name: 'SHS Database', path: '/shs-database', description: 'Senior High School database and information' },
    '/results-placement': { name: 'Results & Placement', path: '/results-placement', description: 'Academic results and school placement information' },

    // Support & Engagement
    '/donate': { name: 'Support Our School', path: '/donate', description: 'Donate to support school development and programs' },
    '/donate-one-dollar': { name: 'Donate Just $1', path: '/donate-one-dollar', description: 'Simple $1 donation to support our school' },
    '/donation': { name: 'Support Our School', path: '/donation', description: 'Donation options and support opportunities' },
    '/apply-now': { name: 'Apply Now', path: '/apply-now', description: 'School application process and requirements' },
    '/schedule-visit': { name: 'Schedule Visit', path: '/schedule-visit', description: 'Schedule a visit to our school campus' },
    '/partner': { name: 'Partner With Us', path: '/partner', description: 'Partnership opportunities and collaboration' },
    '/alumni': { name: 'Alumni', path: '/alumni', description: 'Alumni network and community resources' },
    '/media': { name: 'Media & Press', path: '/media', description: 'Media resources and press releases' },
    '/tiktok': { name: 'TikTok', path: '/tiktok', description: 'TikTok content and student submissions' },

    // Legal & Information
    '/privacy-policy': { name: 'Privacy Policy', path: '/privacy-policy', description: 'Privacy policy and data protection information' },
    '/terms-of-service': { name: 'Terms of Service', path: '/terms-of-service', description: 'Terms of service and website usage policies' },
    '/sitemap': { name: 'Sitemap', path: '/sitemap', description: 'Website sitemap and navigation guide' }
  };

  // Generate breadcrumb items from current path with intelligent hierarchy
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) {
      return [{ name: 'Home', path: '/', description: 'St. Louis Demonstration JHS Homepage' }, ...customItems];
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', path: '/', description: 'St. Louis Demonstration JHS Homepage' }
    ];

    // Handle special cases for better hierarchy
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      const mappedItem = routeMap[currentPath];
      if (mappedItem) {
        breadcrumbs.push({
          ...mappedItem,
          isActive: isLast
        });
      } else {
        // Handle subject pages with proper parent hierarchy
        if (currentPath.startsWith('/subject/')) {
          // Add Academics as parent for subject pages if not already present
          const hasAcademics = breadcrumbs.some(b => b.path === '/academics');
          if (!hasAcademics && breadcrumbs.length === 1) {
            breadcrumbs.push({
              name: 'Academics',
              path: '/academics',
              description: 'Academic programs and curriculum'
            });
          }
        }

        // Handle donation pages hierarchy
        if (currentPath.startsWith('/donate-') || currentPath.includes('monthly')) {
          const hasDonate = breadcrumbs.some(b => b.path === '/donate');
          if (!hasDonate && breadcrumbs.length === 1) {
            breadcrumbs.push({
              name: 'Support Our School',
              path: '/donate',
              description: 'Donate to support school development'
            });
          }
        }

        // Handle SHS database PDF pages
        if (currentPath.startsWith('/shs-database/pdf/')) {
          const hasDatabase = breadcrumbs.some(b => b.path === '/shs-database');
          if (!hasDatabase && breadcrumbs.length === 1) {
            breadcrumbs.push({
              name: 'SHS Database',
              path: '/shs-database',
              description: 'Senior High School database and information'
            });
          }
        }

        // Handle financial library pages
        if (currentPath.startsWith('/financial-library/')) {
          const hasFinancial = breadcrumbs.some(b => b.path === '/financial-literacy');
          if (!hasFinancial && breadcrumbs.length === 1) {
            breadcrumbs.push({
              name: 'Financial Literacy',
              path: '/financial-literacy',
              description: 'Financial education and literacy programs'
            });
          }
        }

        // Fallback for unmapped paths with intelligent naming
        const fallbackName = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        breadcrumbs.push({
          name: fallbackName,
          path: currentPath,
          description: `${fallbackName} page`,
          isActive: isLast
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on homepage unless explicitly requested
  if (location.pathname === '/' && !showOnHomepage && !customItems) {
    return null;
  }

  // Generate Google-optimized structured data for breadcrumbs with enhanced metadata
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "name": "St. Louis Demonstration JHS Navigation",
    "description": "Breadcrumb navigation for St. Louis Demonstration Junior High School website",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "@id": `https://stlouisdemojhs.com${item.path === '/' ? '' : item.path}#breadcrumb-${index + 1}`,
      "position": index + 1,
      "name": item.name,
      "description": item.description,
      "item": {
        "@type": "WebPage",
        "@id": `https://stlouisdemojhs.com${item.path === '/' ? '' : item.path}`,
        "url": `https://stlouisdemojhs.com${item.path === '/' ? '' : item.path}`,
        "name": item.name,
        "description": item.description,
        "inLanguage": "en-US",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://stlouisdemojhs.com",
          "name": "St. Louis Demonstration Junior High School",
          "url": "https://stlouisdemojhs.com"
        }
      }
    }))
  };

  // Theme-based styling
  const getThemeClasses = () => {
    if (theme === 'dark') {
      return {
        nav: 'bg-black/20 backdrop-blur-sm border-b border-white/10 py-2 sm:py-3',
        container: 'container mx-auto px-4',
        list: 'flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm',
        separator: 'text-gray-500 mx-1 sm:mx-2 flex-shrink-0',
        activeItem: 'text-white font-medium truncate max-w-[120px] sm:max-w-none flex items-center',
        linkItem: 'text-gray-300 hover:text-white transition-colors duration-200 truncate max-w-[120px] sm:max-w-none flex items-center'
      };
    } else {
      return {
        nav: 'bg-gray-50 border-b border-gray-200 py-2 sm:py-3',
        container: 'container mx-auto px-4',
        list: 'flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm',
        separator: 'text-gray-400 mx-1 sm:mx-2 flex-shrink-0',
        activeItem: 'text-gray-600 font-medium truncate max-w-[120px] sm:max-w-none flex items-center',
        linkItem: 'text-blue-600 hover:text-blue-800 transition-colors duration-200 truncate max-w-[120px] sm:max-w-none flex items-center'
      };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <>
      {/* Google-optimized Structured Data for Breadcrumbs */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>

        {/* Additional Google optimization meta tags */}
        <meta name="breadcrumb" content={breadcrumbs.map(b => b.name).join(' > ')} />
        <meta property="og:breadcrumb" content={breadcrumbs.map(b => b.name).join(' > ')} />

        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://stlouisdemojhs.com" />
      </Helmet>

      {/* Breadcrumb Navigation with enhanced accessibility */}
      <nav
        className={`${themeClasses.nav} ${className}`}
        aria-label="Breadcrumb navigation"
        role="navigation"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <div className={themeClasses.container}>
          <ol className={themeClasses.list} role="list">
            {breadcrumbs.map((item, index) => (
              <li
                key={item.path}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                role="listitem"
              >
                {/* Hidden structured data for each breadcrumb item */}
                <meta itemProp="position" content={String(index + 1)} />

                {index > 0 && (
                  <ChevronRight
                    size={14}
                    className={themeClasses.separator}
                    aria-hidden="true"
                    role="presentation"
                  />
                )}

                {item.isActive || index === breadcrumbs.length - 1 ? (
                  <span
                    className={themeClasses.activeItem}
                    aria-current="page"
                    title={item.description}
                    itemProp="name"
                    role="text"
                  >
                    {index === 0 && (
                      <Home
                        size={14}
                        className="inline mr-1"
                        aria-label="Home"
                        role="img"
                      />
                    )}
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className={themeClasses.linkItem}
                    title={item.description}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    itemProp="item"
                    itemScope
                    itemType="https://schema.org/WebPage"
                    aria-label={`Navigate to ${item.name}: ${item.description}`}
                  >
                    <span itemProp="name">
                      {index === 0 && (
                        <Home
                          size={14}
                          className="inline mr-1"
                          aria-label="Home"
                          role="img"
                        />
                      )}
                      {item.name}
                    </span>
                    <meta itemProp="url" content={`https://stlouisdemojhs.com${item.path}`} />
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default UnifiedBreadcrumb;
