/**
 * Utility to map content categories to website page URLs
 */

export interface PageInfo {
  url: string;
  displayName: string;
}

/**
 * Map category and source to actual page URLs
 */
export function getPageURL(category: string, source: string): PageInfo {
  const categoryLower = category.toLowerCase();
  const sourceLower = source.toLowerCase();

  // Map based on category
  if (categoryLower.includes('contact') || categoryLower.includes('location')) {
    return { url: '/contact', displayName: 'Contact Page' };
  }
  
  if (categoryLower.includes('admission')) {
    return { url: '/admissions', displayName: 'Admissions Page' };
  }
  
  if (categoryLower.includes('academic')) {
    return { url: '/academics', displayName: 'Academics Page' };
  }
  
  if (categoryLower.includes('program') || categoryLower.includes('stem')) {
    if (sourceLower.includes('stem')) {
      return { url: '/stem', displayName: 'STEM Page' };
    }
    return { url: '/academics', displayName: 'Academics Page' };
  }
  
  if (categoryLower.includes('facilit')) {
    return { url: '/about', displayName: 'About Page' };
  }
  
  if (categoryLower.includes('faculty') || categoryLower.includes('staff')) {
    return { url: '/faculty', displayName: 'Faculty Page' };
  }
  
  if (categoryLower.includes('activit') || categoryLower.includes('extracurricular')) {
    return { url: '/learnhub', displayName: 'Students Hub' };
  }
  
  if (categoryLower.includes('guidance') || categoryLower.includes('career')) {
    return { url: '/educational-guide', displayName: 'Educational Guide' };
  }
  
  if (categoryLower.includes('student resource')) {
    return { url: '/learnhub', displayName: 'Students Hub' };
  }
  
  if (categoryLower.includes('financial') || categoryLower.includes('fee') || categoryLower.includes('donation')) {
    return { url: '/donate', displayName: 'Donation Page' };
  }
  
  if (categoryLower.includes('community') || categoryLower.includes('pta') || categoryLower.includes('alumni')) {
    if (sourceLower.includes('alumni')) {
      return { url: '/alumni', displayName: 'Alumni Page' };
    }
    if (sourceLower.includes('pta')) {
      return { url: '/pta', displayName: 'PTA Page' };
    }
    return { url: '/about', displayName: 'About Page' };
  }
  
  if (categoryLower.includes('technology') || categoryLower.includes('innovation')) {
    return { url: '/learnhub', displayName: 'Students Hub' };
  }
  
  if (categoryLower.includes('event')) {
    return { url: '/calendar', displayName: 'Calendar Page' };
  }
  
  if (categoryLower.includes('general')) {
    return { url: '/about', displayName: 'About Page' };
  }

  // Default fallback
  return { url: '/about', displayName: 'School Website' };
}

/**
 * Extract unique sources from message metadata
 */
export function getUniqueSources(sources: Array<{ title: string; source: string; category: string }>): Array<{ title: string; url: string; displayName: string; category: string }> {
  const uniqueMap = new Map<string, { title: string; url: string; displayName: string; category: string }>();
  
  sources.forEach(source => {
    const key = `${source.category}-${source.title}`;
    if (!uniqueMap.has(key)) {
      const pageInfo = getPageURL(source.category, source.source);
      uniqueMap.set(key, {
        title: source.title,
        url: pageInfo.url,
        displayName: pageInfo.displayName,
        category: source.category,
      });
    }
  });
  
  return Array.from(uniqueMap.values());
}

