import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook specifically for handling page refresh scroll restoration
 * This ensures that when users refresh the page, they return to the exact same position
 */
export const usePageRefreshRestore = () => {
  const location = useLocation();
  const hasRestoredRef = useRef(false);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    // Only run on initial page load (refresh or direct access)
    if (!isInitialLoadRef.current) return;
    
    isInitialLoadRef.current = false;

    const restoreScrollOnRefresh = () => {
      if (hasRestoredRef.current) return;

      // Try multiple sources for scroll position
      const sources = [
        () => {
          const savedState = sessionStorage.getItem(`pageState_${location.pathname}`);
          if (savedState) {
            try {
              const state = JSON.parse(savedState);
              return state.scrollPosition;
            } catch (e) {
              return null;
            }
          }
          return null;
        },
        () => {
          const historyData = sessionStorage.getItem('navigationHistory');
          if (historyData) {
            try {
              const history = JSON.parse(historyData);
              return history[location.pathname]?.scrollPosition || null;
            } catch (e) {
              return null;
            }
          }
          return null;
        },
        () => {
          const fallbackPosition = sessionStorage.getItem(`scrollPosition_${location.pathname}`);
          return fallbackPosition ? parseInt(fallbackPosition, 10) : null;
        }
      ];

      let scrollPosition: number | null = null;
      
      for (const source of sources) {
        try {
          scrollPosition = source();
          if (scrollPosition !== null && !isNaN(scrollPosition) && scrollPosition >= 0) {
            break;
          }
        } catch (error) {
          console.warn('Error reading scroll position:', error);
        }
      }

      if (scrollPosition !== null && scrollPosition > 0) {
        hasRestoredRef.current = true;
        
        // Multiple restoration attempts with increasing delays
        const restoreAttempts = [0, 100, 300, 600, 1000];
        
        restoreAttempts.forEach((delay, index) => {
          setTimeout(() => {
            requestAnimationFrame(() => {
              const currentScroll = window.scrollY;
              const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
              const targetScroll = Math.min(scrollPosition!, maxScroll);
              
              // Only scroll if we're not already close to the target position
              if (Math.abs(currentScroll - targetScroll) > 10) {
                window.scrollTo({
                  top: targetScroll,
                  behavior: 'instant'
                });
                
                // Log successful restoration for debugging
                if (index === 0) {
                  console.log(`🔄 Page refresh: Restored scroll to ${targetScroll}px on ${location.pathname}`);
                }
              }
            });
          }, delay);
        });
      }
    };

    // Wait for content to load before attempting restoration
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', restoreScrollOnRefresh);
    } else {
      // Document already loaded, restore immediately
      setTimeout(restoreScrollOnRefresh, 50);
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', restoreScrollOnRefresh);
    };
  }, [location.pathname]);

  return {
    hasRestored: hasRestoredRef.current
  };
};

export default usePageRefreshRestore;
