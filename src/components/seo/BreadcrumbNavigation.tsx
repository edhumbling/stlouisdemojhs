import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  path: string;
  description?: string;
}

interface BreadcrumbNavigationProps {
  customBreadcrumbs?: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  customBreadcrumbs,
  className = ""
}) => {
  const location = useLocation();

  // Default breadcrumb mapping
  const breadcrumbMap: Record<string, BreadcrumbItem> = {
    '/': { name: 'Home', path: '/', description: 'St. Louis Demonstration JHS Homepage' },
    '/about': { name: 'About', path: '/about', description: 'About our school' },
    '/academics': { name: 'Academics', path: '/academics', description: 'Academic programs' },
    '/admissions': { name: 'Admissions', path: '/admissions', description: 'School admissions' },
    '/contact': { name: 'Contact', path: '/contact', description: 'Contact information' },
    '/faculty': { name: 'Faculty', path: '/faculty', description: 'Our teachers and staff' },
    '/news': { name: 'News & Events', path: '/news', description: 'Latest school news' },
    '/stem': { name: 'STEM Education', path: '/stem', description: 'Science, Technology, Engineering & Math' },
    '/students-hub': { name: 'Students Hub', path: '/students-hub', description: 'Digital learning resources' },
    '/learnhub': { name: 'Students Hub', path: '/learnhub', description: 'Digital learning resources' },
    '/ai-search': { name: 'AI Search', path: '/ai-search', description: 'Intelligent search' },
    '/gallery': { name: 'Gallery', path: '/gallery', description: 'Photos and videos' },
    '/apply-now': { name: 'Apply Now', path: '/apply-now', description: 'School application' },
    '/donate': { name: 'Donate', path: '/donate', description: 'Support our school' },
    '/sitemap': { name: 'Sitemap', path: '/sitemap', description: 'Website sitemap' },
    '/privacy-policy': { name: 'Privacy Policy', path: '/privacy-policy', description: 'Privacy policy' },
    '/terms-of-service': { name: 'Terms of Service', path: '/terms-of-service', description: 'Terms of service' }
  };

  // Generate breadcrumbs
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customBreadcrumbs) {
      return [{ name: 'Home', path: '/', description: 'St. Louis Demonstration JHS Homepage' }, ...customBreadcrumbs];
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [{ name: 'Home', path: '/', description: 'St. Louis Demonstration JHS Homepage' }];

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const breadcrumbItem = breadcrumbMap[currentPath];
      if (breadcrumbItem) {
        breadcrumbs.push(breadcrumbItem);
      } else {
        // Fallback for unmapped paths
        breadcrumbs.push({
          name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
          path: currentPath,
          description: `${segment.replace(/-/g, ' ')} page`
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Generate structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": `https://stlouisdemojhs.com${breadcrumb.path === '/' ? '' : breadcrumb.path}`
    }))
  };

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/' && !customBreadcrumbs) {
    return null;
  }

  return (
    <>
      {/* Structured Data for Breadcrumbs */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>

      {/* Visual Breadcrumb Navigation */}
      <nav 
        className={`flex items-center space-x-2 text-sm text-gray-300 mb-6 ${className}`}
        aria-label="Breadcrumb navigation"
      >
        <ol className="flex items-center space-x-2">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-500 mx-2" aria-hidden="true" />
              )}
              
              {index === breadcrumbs.length - 1 ? (
                // Current page (not clickable)
                <span 
                  className="text-white font-medium flex items-center"
                  aria-current="page"
                >
                  {index === 0 && <Home className="w-4 h-4 mr-1" />}
                  {breadcrumb.name}
                </span>
              ) : (
                // Clickable breadcrumb links
                <Link
                  to={breadcrumb.path}
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  title={breadcrumb.description}
                >
                  {index === 0 && <Home className="w-4 h-4 mr-1" />}
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default BreadcrumbNavigation;
