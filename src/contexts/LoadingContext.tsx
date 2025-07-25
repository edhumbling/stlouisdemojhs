import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isGlobalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
  showGlobalLoading: () => void;
  hideGlobalLoading: () => void;
  loadingMessage?: string;
  setLoadingMessage: (message?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>(undefined);

  const setGlobalLoading = (loading: boolean) => {
    setIsGlobalLoading(loading);
  };

  const showGlobalLoading = () => {
    setIsGlobalLoading(true);
  };

  const hideGlobalLoading = () => {
    setIsGlobalLoading(false);
    setLoadingMessage(undefined);
  };

  return (
    <LoadingContext.Provider value={{ 
      isGlobalLoading, 
      setGlobalLoading, 
      showGlobalLoading, 
      hideGlobalLoading,
      loadingMessage,
      setLoadingMessage
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useGlobalLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useGlobalLoading must be used within a LoadingProvider');
  }
  return context;
};

// Convenience hook for simple loading operations
export const useLoading = () => {
  const { showGlobalLoading, hideGlobalLoading, setLoadingMessage } = useGlobalLoading();
  
  const startLoading = (message?: string) => {
    if (message) setLoadingMessage(message);
    showGlobalLoading();
  };

  const stopLoading = () => {
    hideGlobalLoading();
  };

  return { startLoading, stopLoading };
};
