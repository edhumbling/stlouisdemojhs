import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationState {
  scrollPosition?: number;
  timestamp?: number;
  fromPath?: string;
}

export const useEnhancedNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Save current page state including scroll position
  const savePageState = useCallback(() => {
    const state: NavigationState = {
      scrollPosition: window.scrollY,
      timestamp: Date.now(),
      fromPath: location.pathname
    };
    
    // Save to sessionStorage with current path as key
    sessionStorage.setItem(`pageState_${location.pathname}`, JSON.stringify(state));
    
    // Also save scroll position for the scroll position manager
    sessionStorage.setItem(`scrollPosition_${location.pathname}`, window.scrollY.toString());
  }, [location.pathname]);

  // Restore page state including scroll position
  const restorePageState = useCallback((pathname?: string) => {
    const pathToRestore = pathname || location.pathname;
    const savedState = sessionStorage.getItem(`pageState_${pathToRestore}`);
    
    if (savedState) {
      try {
        const state: NavigationState = JSON.parse(savedState);
        
        if (state.scrollPosition !== undefined) {
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            setTimeout(() => {
              window.scrollTo({
                top: state.scrollPosition!,
                behavior: 'instant'
              });
            }, 50); // Small delay to ensure content is loaded
          });
          return true;
        }
      } catch (error) {
        console.warn('Failed to restore page state:', error);
      }
    }
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
      if (key.startsWith('pageState_') || key.startsWith('scrollPosition_')) {
        sessionStorage.removeItem(key);
      }
    });
  }, []);

  return {
    savePageState,
    restorePageState,
    navigateBackWithState,
    navigateToWithState,
    handleInternalStateChange,
    clearAllStates
  };
};

export default useEnhancedNavigation;
