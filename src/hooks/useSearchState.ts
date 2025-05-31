import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface SearchState {
  searchTerm: string;
  selectedCategory: string;
  selectedLevel: string;
  selectedType: string;
  showFilters: boolean;
}

const defaultSearchState: SearchState = {
  searchTerm: '',
  selectedCategory: '',
  selectedLevel: '',
  selectedType: '',
  showFilters: false
};

export const useSearchState = (pageKey: string) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize state from URL params or session storage
  const [searchState, setSearchState] = useState<SearchState>(() => {
    // First, try to get from URL params (for back navigation)
    const urlParams = new URLSearchParams(location.search);
    const urlSearchTerm = urlParams.get('search') || '';
    const urlCategory = urlParams.get('category') || '';
    const urlLevel = urlParams.get('level') || '';
    const urlType = urlParams.get('type') || '';
    const urlShowFilters = urlParams.get('filters') === 'true';

    if (urlSearchTerm || urlCategory || urlLevel || urlType) {
      return {
        searchTerm: urlSearchTerm,
        selectedCategory: urlCategory,
        selectedLevel: urlLevel,
        selectedType: urlType,
        showFilters: urlShowFilters
      };
    }

    // Fallback to session storage
    try {
      const saved = sessionStorage.getItem(`searchState_${pageKey}`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Failed to parse saved search state:', error);
    }

    return defaultSearchState;
  });

  // Save to session storage whenever state changes
  useEffect(() => {
    try {
      sessionStorage.setItem(`searchState_${pageKey}`, JSON.stringify(searchState));
    } catch (error) {
      console.warn('Failed to save search state:', error);
    }
  }, [searchState, pageKey]);

  // Update URL params when search state changes (for back navigation)
  useEffect(() => {
    const urlParams = new URLSearchParams();
    
    if (searchState.searchTerm) {
      urlParams.set('search', searchState.searchTerm);
    }
    if (searchState.selectedCategory) {
      urlParams.set('category', searchState.selectedCategory);
    }
    if (searchState.selectedLevel) {
      urlParams.set('level', searchState.selectedLevel);
    }
    if (searchState.selectedType) {
      urlParams.set('type', searchState.selectedType);
    }
    if (searchState.showFilters) {
      urlParams.set('filters', 'true');
    }

    const newSearch = urlParams.toString();
    const currentSearch = location.search.substring(1);

    // Only update URL if params have changed
    if (newSearch !== currentSearch) {
      const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
      // Use replace to avoid creating new history entries for search changes
      navigate(newUrl, { replace: true });
    }
  }, [searchState, location.pathname, navigate]);

  // Update individual search state properties
  const updateSearchTerm = useCallback((searchTerm: string) => {
    setSearchState(prev => ({ ...prev, searchTerm }));
  }, []);

  const updateSelectedCategory = useCallback((selectedCategory: string) => {
    setSearchState(prev => ({ ...prev, selectedCategory }));
  }, []);

  const updateSelectedLevel = useCallback((selectedLevel: string) => {
    setSearchState(prev => ({ ...prev, selectedLevel }));
  }, []);

  const updateSelectedType = useCallback((selectedType: string) => {
    setSearchState(prev => ({ ...prev, selectedType }));
  }, []);

  const updateShowFilters = useCallback((showFilters: boolean) => {
    setSearchState(prev => ({ ...prev, showFilters }));
  }, []);

  // Clear all search state
  const clearSearchState = useCallback(() => {
    setSearchState(defaultSearchState);
    // Also clear from session storage
    try {
      sessionStorage.removeItem(`searchState_${pageKey}`);
    } catch (error) {
      console.warn('Failed to clear search state:', error);
    }
  }, [pageKey]);

  // Handle external link clicks (preserve state for back navigation)
  const handleExternalLinkClick = useCallback((url: string) => {
    // Save current state before navigating away
    try {
      sessionStorage.setItem(`searchState_${pageKey}_beforeExternal`, JSON.stringify(searchState));
    } catch (error) {
      console.warn('Failed to save search state before external navigation:', error);
    }
    
    // Open external link
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [searchState, pageKey]);

  // Restore state after returning from external link
  useEffect(() => {
    const handleFocus = () => {
      try {
        const savedBeforeExternal = sessionStorage.getItem(`searchState_${pageKey}_beforeExternal`);
        if (savedBeforeExternal) {
          const restoredState = JSON.parse(savedBeforeExternal);
          setSearchState(restoredState);
          // Clean up the temporary storage
          sessionStorage.removeItem(`searchState_${pageKey}_beforeExternal`);
        }
      } catch (error) {
        console.warn('Failed to restore search state after external navigation:', error);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [pageKey]);

  return {
    searchState,
    updateSearchTerm,
    updateSelectedCategory,
    updateSelectedLevel,
    updateSelectedType,
    updateShowFilters,
    clearSearchState,
    handleExternalLinkClick
  };
};
