import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  customItems?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ customItems, className = "" }) => {
  const location = useLocation();
  
  // Generate breadcrumb items from current path if no custom items provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;
    
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' }
    ];
    
    // Route name mappings for better display
    const routeNames: Record<string, string> = {
      'about': 'About Us',
      'academics': 'Academics',
      'admissions': 'Admissions',
      'faculty': 'Faculty & Staff',
      'gallery': 'Gallery',
      'news': 'News & Events',
      'contact': 'Contact Us',
      'learnhub': 'Students Hub',
      'stem-education': 'STEM Education',
      'ai-search': 'AI Search',
      'core-academic': 'Core Academic',
      'language-communication': 'Language & Communication',
      'creative-arts': 'Creative Arts',
      'character-education': 'Character Education',
      'apply-now': 'Apply Now',
      'schedule-visit': 'Schedule Visit',
      'alumni': 'Alumni',
      'media': 'Media & Press',
      'partner': 'Partner With Us',
      'staff-resources': 'Staff Resources',
      'privacy-policy': 'Privacy Policy',
      'terms-of-service': 'Terms of Service',
      'sitemap': 'Sitemap',
      'tiktok': 'TikTok',
      'donation': 'Support Our School'
    };
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      breadcrumbs.push({
        label: routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        path: currentPath,
        isActive: isLast
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }
  
  // Generate structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://stlouisdemojhs.com${item.path}`
    }))
  };
  
  return (
    <>
      {/* Structured Data for Breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>
      
      {/* Breadcrumb Navigation */}
      <nav 
        className={`bg-gray-50 border-b border-gray-200 py-2 sm:py-3 ${className}`}
        aria-label="Breadcrumb"
      >
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
            {breadcrumbs.map((item, index) => (
              <li key={item.path} className="flex items-center">
                {index > 0 && (
                  <ChevronRight 
                    size={14} 
                    className="text-gray-400 mx-1 sm:mx-2 flex-shrink-0" 
                  />
                )}
                
                {item.isActive ? (
                  <span 
                    className="text-gray-600 font-medium truncate max-w-[120px] sm:max-w-none"
                    aria-current="page"
                  >
                    {index === 0 && <Home size={14} className="inline mr-1" />}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 truncate max-w-[120px] sm:max-w-none flex items-center"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {index === 0 && <Home size={14} className="inline mr-1" />}
                    {item.label}
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

export default Breadcrumb;
