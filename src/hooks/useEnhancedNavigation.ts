import { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationState {
  scrollPosition: number;
  timestamp: number;
  fromPath: string;
  viewportHeight: number;
  documentHeight: number;
}

interface NavigationHistory {
  [path: string]: NavigationState;
}

export const useEnhancedNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRestoringRef = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Enhanced save with more context
  const savePageState = useCallback(() => {
    if (isRestoringRef.current) return;

    const state: NavigationState = {
      scrollPosition: window.scrollY,
      timestamp: Date.now(),
      fromPath: location.pathname,
      viewportHeight: window.innerHeight,
      documentHeight: document.documentElement.scrollHeight
    };

    // Save individual state
    sessionStorage.setItem(`pageState_${location.pathname}`, JSON.stringify(state));

    // Save to navigation history for better tracking
    const historyKey = 'navigationHistory';
    const existingHistory = sessionStorage.getItem(historyKey);
    let history: NavigationHistory = {};

    if (existingHistory) {
      try {
        history = JSON.parse(existingHistory);
      } catch (e) {
        history = {};
      }
    }

    history[location.pathname] = state;
    sessionStorage.setItem(historyKey, JSON.stringify(history));

    // Also save for backward compatibility
    sessionStorage.setItem(`scrollPosition_${location.pathname}`, window.scrollY.toString());
  }, [location.pathname]);

  // Debounced save to prevent excessive saves during scrolling
  const debouncedSavePageState = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      savePageState();
    }, 100);
  }, [savePageState]);

  // Enhanced restore with multiple fallbacks
  const restorePageState = useCallback((pathname?: string) => {
    const pathToRestore = pathname || location.pathname;
    isRestoringRef.current = true;

    // Try multiple sources for scroll position
    const sources = [
      () => {
        const savedState = sessionStorage.getItem(`pageState_${pathToRestore}`);
        if (savedState) {
          const state: NavigationState = JSON.parse(savedState);
          return state.scrollPosition;
        }
        return null;
      },
      () => {
        const historyData = sessionStorage.getItem('navigationHistory');
        if (historyData) {
          const history: NavigationHistory = JSON.parse(historyData);
          return history[pathToRestore]?.scrollPosition || null;
        }
        return null;
      },
      () => {
        const fallbackPosition = sessionStorage.getItem(`scrollPosition_${pathToRestore}`);
        return fallbackPosition ? parseInt(fallbackPosition, 10) : null;
      }
    ];

    let scrollPosition: number | null = null;

    for (const source of sources) {
      try {
        scrollPosition = source();
        if (scrollPosition !== null && !isNaN(scrollPosition)) {
          break;
        }
      } catch (error) {
        console.warn('Error reading scroll position from source:', error);
      }
    }

    if (scrollPosition !== null && scrollPosition >= 0) {
      // Multiple restoration attempts with increasing delays
      const restoreAttempts = [0, 50, 150, 300, 500];

      restoreAttempts.forEach((delay, index) => {
        setTimeout(() => {
          requestAnimationFrame(() => {
            const currentScroll = window.scrollY;
            const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            const targetScroll = Math.min(scrollPosition!, maxScroll);

            // Only scroll if we're not already at the target position
            if (Math.abs(currentScroll - targetScroll) > 5) {
              window.scrollTo({
                top: targetScroll,
                behavior: 'instant'
              });
            }

            // Mark restoration as complete after the last attempt
            if (index === restoreAttempts.length - 1) {
              setTimeout(() => {
                isRestoringRef.current = false;
              }, 100);
            }
          });
        }, delay);
      });

      return true;
    }

    isRestoringRef.current = false;
    return false;
  }, [location.pathname]);

  // Enhanced back navigation that preserves exact state
  const navigateBackWithState = useCallback((fallbackPath?: string, options?: {
    preserveScroll?: boolean;
    resetState?: boolean;
  }) => {
    const { preserveScroll = true, resetState = false } = options || {};

    // Save current state before navigating
    if (preserveScroll) {
      savePageState();
    }

    // Clear state if requested
    if (resetState) {
      sessionStorage.removeItem(`pageState_${location.pathname}`);
      sessionStorage.removeItem(`scrollPosition_${location.pathname}`);

      // Also clear from navigation history
      const historyData = sessionStorage.getItem('navigationHistory');
      if (historyData) {
        try {
          const history: NavigationHistory = JSON.parse(historyData);
          delete history[location.pathname];
          sessionStorage.setItem('navigationHistory', JSON.stringify(history));
        } catch (e) {
          // Ignore errors
        }
      }
    }

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
  }, [navigate, location.pathname, savePageState]);

  // Navigate to a specific path while preserving current state
  const navigateToWithState = useCallback((path: string, options?: {
    preserveScroll?: boolean;
    replace?: boolean;
  }) => {
    const { preserveScroll = true, replace = false } = options || {};

    // Save current state before navigating
    if (preserveScroll) {
      savePageState();
    }

    // Navigate to the new path
    navigate(path, { replace });
  }, [navigate, savePageState]);

  // Handle internal page state changes (like modal open/close)
  const handleInternalStateChange = useCallback((stateResetCallback?: () => void) => {
    // Save current scroll position
    savePageState();

    // Execute state reset if provided
    if (stateResetCallback) {
      stateResetCallback();
    }

    // Restore scroll position after state change
    setTimeout(() => {
      restorePageState();
    }, 100);
  }, [savePageState, restorePageState]);

  // Clear all saved states for cleanup
  const clearAllStates = useCallback(() => {
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith('pageState_') || key.startsWith('scrollPosition_') || key === 'navigationHistory') {
        sessionStorage.removeItem(key);
      }
    });
  }, []);

  // Auto-save scroll position on scroll events
  useEffect(() => {
    const handleScroll = () => {
      debouncedSavePageState();
    };

    const handleBeforeUnload = () => {
      savePageState();
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [debouncedSavePageState, savePageState]);

  return {
    savePageState,
    restorePageState,
    navigateBackWithState,
    navigateToWithState,
    handleInternalStateChange,
    clearAllStates,
    debouncedSavePageState
  };
};

export default useEnhancedNavigation;
