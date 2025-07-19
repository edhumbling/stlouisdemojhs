/**
 * Comprehensive breadcrumb route mapping for Google SEO optimization
 * This file contains all route mappings for consistent breadcrumb navigation
 * across the St. Louis Demonstration JHS website
 */

export interface BreadcrumbRoute {
  name: string;
  path: string;
  description: string;
  category?: string;
}

export const breadcrumbRoutes: Record<string, BreadcrumbRoute> = {
  // Main Navigation
  '/': { 
    name: 'Home', 
    path: '/', 
    description: 'St. Louis Demonstration JHS Homepage',
    category: 'main'
  },
  '/about': { 
    name: 'About Us', 
    path: '/about', 
    description: 'About our school, mission, and values',
    category: 'main'
  },
  '/academics': { 
    name: 'Academics', 
    path: '/academics', 
    description: 'Academic programs and curriculum',
    category: 'main'
  },
  '/admissions': { 
    name: 'Admissions', 
    path: '/admissions', 
    description: 'School admissions information and requirements',
    category: 'main'
  },
  '/faculty': { 
    name: 'Faculty & Staff', 
    path: '/faculty', 
    description: 'Our dedicated teachers and staff members',
    category: 'main'
  },
  '/contact': { 
    name: 'Contact Us', 
    path: '/contact', 
    description: 'Contact information and school location',
    category: 'main'
  },

  // Academic Subjects
  '/core-academic': { 
    name: 'Core Academic', 
    path: '/core-academic', 
    description: 'Core academic subjects and curriculum',
    category: 'academics'
  },
  '/language-communication': { 
    name: 'Language & Communication', 
    path: '/language-communication', 
    description: 'Language and communication skills development',
    category: 'academics'
  },
  '/creative-arts': { 
    name: 'Creative Arts', 
    path: '/creative-arts', 
    description: 'Creative arts and design programs',
    category: 'academics'
  },
  '/character-education': { 
    name: 'Character Education', 
    path: '/character-education', 
    description: 'Character and values education program',
    category: 'academics'
  },

  // Subject Pages
  '/subject/english-language': { 
    name: 'English Language', 
    path: '/subject/english-language', 
    description: 'English language curriculum and resources',
    category: 'subjects'
  },
  '/subject/mathematics': { 
    name: 'Mathematics', 
    path: '/subject/mathematics', 
    description: 'Mathematics curriculum and learning resources',
    category: 'subjects'
  },
  '/subject/integrated-science': { 
    name: 'Integrated Science', 
    path: '/subject/integrated-science', 
    description: 'Integrated science curriculum and experiments',
    category: 'subjects'
  },
  '/subject/social-studies': { 
    name: 'Social Studies', 
    path: '/subject/social-studies', 
    description: 'Social studies curriculum and cultural education',
    category: 'subjects'
  },
  '/subject/religious-moral-education': { 
    name: 'Religious & Moral Education', 
    path: '/subject/religious-moral-education', 
    description: 'Religious and moral education curriculum',
    category: 'subjects'
  },
  '/subject/ghanaian-language': { 
    name: 'Ghanaian Language', 
    path: '/subject/ghanaian-language', 
    description: 'Ghanaian language studies and cultural heritage',
    category: 'subjects'
  },
  '/subject/french': { 
    name: 'French', 
    path: '/subject/french', 
    description: 'French language learning and communication',
    category: 'subjects'
  },
  '/subject/career-technology': { 
    name: 'Career Technology', 
    path: '/subject/career-technology', 
    description: 'Career and technology education',
    category: 'subjects'
  },
  '/subject/computing-ict': { 
    name: 'Computing & ICT', 
    path: '/subject/computing-ict', 
    description: 'Computing and Information Communication Technology',
    category: 'subjects'
  },
  '/subject/creative-arts-design': { 
    name: 'Creative Arts & Design', 
    path: '/subject/creative-arts-design', 
    description: 'Creative arts and design curriculum',
    category: 'subjects'
  },
  '/subject/music': { 
    name: 'Music', 
    path: '/subject/music', 
    description: 'Music education and performance',
    category: 'subjects'
  },

  // STEM & Technology
  '/stem': { 
    name: 'STEM Education', 
    path: '/stem', 
    description: 'Science, Technology, Engineering & Mathematics programs',
    category: 'stem'
  },
  '/stem-education': { 
    name: 'STEM Education', 
    path: '/stem-education', 
    description: 'STEM programs and educational resources',
    category: 'stem'
  },
  '/stem-deep-learning': { 
    name: 'STEM Deep Learning', 
    path: '/stem-deep-learning', 
    description: 'Advanced STEM learning and research',
    category: 'stem'
  },
  '/robotics': { 
    name: 'Robotics', 
    path: '/robotics', 
    description: 'Robotics education and programming',
    category: 'stem'
  },
  '/space-exploration': { 
    name: 'Space Exploration', 
    path: '/space-exploration', 
    description: 'Space science and exploration studies',
    category: 'stem'
  },

  // AI & Digital Learning
  '/ai': { 
    name: 'AI Learning', 
    path: '/ai', 
    description: 'Artificial Intelligence education and resources',
    category: 'digital'
  },
  '/ai-search': { 
    name: 'AI Search', 
    path: '/ai-search', 
    description: 'Intelligent search system for school information',
    category: 'digital'
  },
  '/mayamiles-ai': { 
    name: 'MayaMiles AI', 
    path: '/mayamiles-ai', 
    description: 'AI-powered learning assistant',
    category: 'digital'
  },
  '/ask-louis': { 
    name: 'Ask Louis', 
    path: '/ask-louis', 
    description: 'AI assistant for school information and guidance',
    category: 'digital'
  },

  // Student Resources
  '/students-hub': { 
    name: 'Students Hub', 
    path: '/students-hub', 
    description: 'Digital learning platform and student resources',
    category: 'resources'
  },
  '/learnhub': { 
    name: 'Students Hub', 
    path: '/learnhub', 
    description: 'Digital learning platform and educational tools',
    category: 'resources'
  },
  '/tech-resources': { 
    name: 'Tech Resources', 
    path: '/tech-resources', 
    description: 'Technology learning resources and tools',
    category: 'resources'
  },
  '/ai-teaching-guide': { 
    name: 'AI Teaching Guide', 
    path: '/ai-teaching-guide', 
    description: 'AI teaching resources for educators',
    category: 'resources'
  },
  '/jhs-textbooks': { 
    name: 'JHS Textbooks', 
    path: '/jhs-textbooks', 
    description: 'Junior High School textbooks and materials',
    category: 'resources'
  },
  '/dream-hive-resources': { 
    name: 'Dream Hive Resources', 
    path: '/dream-hive-resources', 
    description: 'Dream Hive learning and development resources',
    category: 'resources'
  },
  '/career-reel-resources': { 
    name: 'Career Reel Resources', 
    path: '/career-reel-resources', 
    description: 'Career guidance video resources and content',
    category: 'resources'
  },
  '/money-smart-links': { 
    name: 'Money Smart Links', 
    path: '/money-smart-links', 
    description: 'Financial education links and resources',
    category: 'resources'
  },
  '/advice-speeches': { 
    name: 'Advice Speeches', 
    path: '/advice-speeches', 
    description: 'Inspirational speeches and motivational content',
    category: 'resources'
  },
  '/staff-resources': { 
    name: 'Staff Resources', 
    path: '/staff-resources', 
    description: 'Resources and tools for staff members',
    category: 'resources'
  },

  // Financial & Career Guidance
  '/financial-literacy': { 
    name: 'Financial Literacy', 
    path: '/financial-literacy', 
    description: 'Financial education and literacy programs',
    category: 'guidance'
  },
  '/financialliteracy': { 
    name: 'Financial Literacy', 
    path: '/financialliteracy', 
    description: 'Financial education and money management',
    category: 'guidance'
  },
  '/scholarship-opportunities': { 
    name: 'Scholarship Opportunities', 
    path: '/scholarship-opportunities', 
    description: 'Available scholarships and funding opportunities',
    category: 'guidance'
  },
  '/educational-pathway-guide': { 
    name: 'Educational Pathway Guide', 
    path: '/educational-pathway-guide', 
    description: 'Educational pathway guidance and career planning',
    category: 'guidance'
  },
  '/leadership-excellence': { 
    name: 'Leadership Excellence', 
    path: '/leadership-excellence', 
    description: 'Leadership development and excellence programs',
    category: 'guidance'
  },
  '/shs-database': { 
    name: 'SHS Database', 
    path: '/shs-database', 
    description: 'Senior High School database and information',
    category: 'guidance'
  },
  '/results-placement': { 
    name: 'Results & Placement', 
    path: '/results-placement', 
    description: 'Academic results and school placement information',
    category: 'guidance'
  },

  // Media & Communication
  '/news': {
    name: 'News & Events',
    path: '/news',
    description: 'Latest school news, events, and announcements',
    category: 'media'
  },
  '/blog': {
    name: 'Blog',
    path: '/blog',
    description: 'Latest news, updates, and articles from St. Louis Demonstration JHS',
    category: 'media'
  },
  '/gallery': { 
    name: 'Gallery', 
    path: '/gallery', 
    description: 'Photo and video gallery of school activities',
    category: 'media'
  },
  '/media': { 
    name: 'Media & Press', 
    path: '/media', 
    description: 'Media resources and press releases',
    category: 'media'
  },
  '/tiktok': { 
    name: 'TikTok', 
    path: '/tiktok', 
    description: 'TikTok content and student submissions',
    category: 'media'
  },

  // Support & Engagement
  '/donate': { 
    name: 'Support Our School', 
    path: '/donate', 
    description: 'Donate to support school development and programs',
    category: 'support'
  },
  '/donation': { 
    name: 'Support Our School', 
    path: '/donation', 
    description: 'Donation options and support opportunities',
    category: 'support'
  },
  '/apply-now': { 
    name: 'Apply Now', 
    path: '/apply-now', 
    description: 'School application process and requirements',
    category: 'support'
  },
  '/schedule-visit': { 
    name: 'Schedule Visit', 
    path: '/schedule-visit', 
    description: 'Schedule a visit to our school campus',
    category: 'support'
  },
  '/partner': { 
    name: 'Partner With Us', 
    path: '/partner', 
    description: 'Partnership opportunities and collaboration',
    category: 'support'
  },
  '/alumni': { 
    name: 'Alumni', 
    path: '/alumni', 
    description: 'Alumni network and community resources',
    category: 'support'
  },

  // Legal & Information
  '/privacy-policy': { 
    name: 'Privacy Policy', 
    path: '/privacy-policy', 
    description: 'Privacy policy and data protection information',
    category: 'legal'
  },
  '/terms-of-service': { 
    name: 'Terms of Service', 
    path: '/terms-of-service', 
    description: 'Terms of service and website usage policies',
    category: 'legal'
  },
  '/sitemap': { 
    name: 'Sitemap', 
    path: '/sitemap', 
    description: 'Website sitemap and navigation guide',
    category: 'legal'
  }
};

/**
 * Get breadcrumb route by path
 */
export const getBreadcrumbRoute = (path: string): BreadcrumbRoute | null => {
  return breadcrumbRoutes[path] || null;
};

/**
 * Get all routes by category
 */
export const getRoutesByCategory = (category: string): BreadcrumbRoute[] => {
  return Object.values(breadcrumbRoutes).filter(route => route.category === category);
};

/**
 * Generate fallback breadcrumb for unmapped routes
 */
export const generateFallbackBreadcrumb = (path: string): BreadcrumbRoute => {
  const segments = path.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || '';
  const name = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');
  
  return {
    name,
    path,
    description: `${name} page`
  };
};
