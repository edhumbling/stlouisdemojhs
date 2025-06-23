/**
 * Media Utilities for St. Louis Media Files
 * Provides automatic view count increment system for all media files
 */

export interface MediaVideo {
  id: string;
  title: string;
  description: string;
  driveUrl: string;
  embedUrl: string;
  thumbnail: string;
  duration: string;
  baseViews: number; // Base view count - will auto-increment by 1K daily
  uploadDate: string;
  category: string;
}

/**
 * Convert Google Drive URLs to embed format
 */
export const convertToEmbedUrl = (driveUrl: string): string => {
  const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return driveUrl;
};

/**
 * Generate thumbnail URL from Google Drive
 */
export const generateThumbnail = (driveUrl: string): string => {
  const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w320-h180`;
  }
  return '/api/placeholder/320/180';
};

/**
 * Calculate current view count with automatic daily increment
 * Adds 1K views per day since upload date
 * 
 * @param baseViews - Initial view count when video was uploaded
 * @param uploadDate - Upload date string (e.g., "3 days ago", "12 hours ago")
 * @returns Formatted view count string (e.g., "4.2K", "1.5M")
 */
export const calculateCurrentViews = (baseViews: number, uploadDate: string): string => {
  // Parse upload date to determine days since upload
  let daysSinceUpload = 0;
  
  if (uploadDate.includes('hours ago') || uploadDate.includes('hour ago')) {
    daysSinceUpload = 0;
  } else if (uploadDate.includes('1 day ago')) {
    daysSinceUpload = 1;
  } else if (uploadDate.includes('2 days ago')) {
    daysSinceUpload = 2;
  } else if (uploadDate.includes('3 days ago')) {
    daysSinceUpload = 3;
  } else if (uploadDate.includes('4 days ago')) {
    daysSinceUpload = 4;
  } else if (uploadDate.includes('5 days ago')) {
    daysSinceUpload = 5;
  } else if (uploadDate.includes('6 days ago')) {
    daysSinceUpload = 6;
  } else if (uploadDate.includes('1 week ago')) {
    daysSinceUpload = 7;
  } else if (uploadDate.includes('2 weeks ago')) {
    daysSinceUpload = 14;
  } else if (uploadDate.includes('3 weeks ago')) {
    daysSinceUpload = 21;
  } else if (uploadDate.includes('1 month ago')) {
    daysSinceUpload = 30;
  } else if (uploadDate.includes('days ago')) {
    const match = uploadDate.match(/(\d+) days ago/);
    daysSinceUpload = match ? parseInt(match[1]) : 0;
  } else if (uploadDate.includes('weeks ago')) {
    const match = uploadDate.match(/(\d+) weeks ago/);
    daysSinceUpload = match ? parseInt(match[1]) * 7 : 0;
  } else if (uploadDate.includes('months ago')) {
    const match = uploadDate.match(/(\d+) months ago/);
    daysSinceUpload = match ? parseInt(match[1]) * 30 : 0;
  }
  
  // Add 1K views per day since upload (1000 views per day)
  const currentViews = baseViews + (daysSinceUpload * 1000);
  
  // Format the view count
  if (currentViews >= 1000000) {
    return `${(currentViews / 1000000).toFixed(1)}M`;
  } else if (currentViews >= 1000) {
    return `${(currentViews / 1000).toFixed(1)}K`;
  } else {
    return currentViews.toString();
  }
};

/**
 * Create a new media video object with automatic URL conversion
 * Use this function when adding new videos to ensure consistency
 * 
 * @param videoData - Video data object
 * @returns Complete MediaVideo object with converted URLs
 */
export const createMediaVideo = (videoData: {
  id: string;
  title: string;
  description: string;
  driveUrl: string;
  duration: string;
  baseViews: number;
  uploadDate: string;
  category: string;
}): MediaVideo => {
  return {
    ...videoData,
    embedUrl: convertToEmbedUrl(videoData.driveUrl),
    thumbnail: generateThumbnail(videoData.driveUrl),
  };
};

/**
 * Example usage for future videos:
 * 
 * const newVideo = createMediaVideo({
 *   id: '5',
 *   title: 'Election Diaries 2025 - Episode 5',
 *   description: 'Post-election coverage and student reactions',
 *   driveUrl: 'https://drive.google.com/file/d/YOUR_FILE_ID/view',
 *   duration: '1:15',
 *   baseViews: 500, // Starting view count
 *   uploadDate: '2 hours ago',
 *   category: 'Election Diaries 2025'
 * });
 * 
 * // The view count will automatically increment by 1K per day
 * // Day 0 (upload): 500 views
 * // Day 1: 1,500 views (500 + 1000)
 * // Day 2: 2,500 views (500 + 2000)
 * // Day 3: 3,500 views (500 + 3000)
 * // etc.
 */
