import { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ScrollPositionOptions {
  saveOnScroll?: boolean;
  saveOnUnload?: boolean;
  restoreOnMount?: boolean;
  debounceMs?: number;
}

export const useScrollPosition = (options: ScrollPositionOptions = {}) => {
  const {
    saveOnScroll = true,
    saveOnUnload = true,
    restoreOnMount = true,
    debounceMs = 100
  } = options;

  const location = useLocation();
  const navigate = useNavigate();

  // Debounce function for scroll events
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  }, []);

  const saveScrollPosition = useCallback(() => {
    const scrollPosition = window.scrollY;
    const pathname = window.location.pathname;
    sessionStorage.setItem(`scrollPosition_${pathname}`, scrollPosition.toString());
  }, []);

  const restoreScrollPosition = useCallback(() => {
    const pathname = location.pathname;
    const savedPosition = sessionStorage.getItem(`scrollPosition_${pathname}`);

    if (savedPosition) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: 'instant'
        });
      });
      return true; // Position was restored
    }
    return false; // No saved position
  }, [location.pathname]);

  const clearScrollPosition = useCallback((pathname?: string) => {
    const pathToClean = pathname || location.pathname;
    sessionStorage.removeItem(`scrollPosition_${pathToClean}`);
  }, [location.pathname]);

  const scrollToPosition = useCallback((position: number, behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({
      top: position,
      behavior
    });
  }, []);

  // Enhanced back navigation that preserves scroll position
  const navigateBack = useCallback((fallbackPath?: string) => {
    // Save current scroll position before navigating
    saveScrollPosition();

    // Try to go back in history
    if (window.history.length > 1) {
      navigate(-1);
    } else if (fallbackPath) {
      // If no history, navigate to fallback path
      navigate(fallbackPath);
    } else {
      // Default fallback to home
      navigate('/');
    }
  }, [navigate, saveScrollPosition]);

  useEffect(() => {
    // Debounced scroll handler
    const debouncedSaveScroll = debounce(saveScrollPosition, debounceMs);

    // Save scroll position before page unload
    const handleBeforeUnload = () => {
      if (saveOnUnload) {
        saveScrollPosition();
      }
    };

    // Save scroll position while scrolling
    const handleScroll = () => {
      if (saveOnScroll) {
        debouncedSaveScroll();
      }
    };

    // Restore scroll position on mount
    if (restoreOnMount) {
      const restored = restoreScrollPosition();
      if (!restored) {
        // Only scroll to top if no saved position (new page visit)
        window.scrollTo(0, 0);
      }
    }

    // Add event listeners
    if (saveOnUnload) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
    if (saveOnScroll) {
      window.addEventListener('scroll', handleScroll);
    }

    // Cleanup
    return () => {
      if (saveOnUnload) {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }
      if (saveOnScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [
    location.pathname,
    saveOnScroll,
    saveOnUnload,
    restoreOnMount,
    debounceMs,
    saveScrollPosition,
    restoreScrollPosition,
    debounce
  ]);

  return {
    saveScrollPosition,
    restoreScrollPosition,
    clearScrollPosition,
    scrollToPosition,
    navigateBack
  };
};

export default useScrollPosition;
