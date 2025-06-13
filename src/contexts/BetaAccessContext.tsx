import React, { createContext, useContext, useState, useEffect } from 'react';

interface BetaAccessContextType {
  hasAccess: boolean;
  isLoading: boolean;
  grantAccess: () => void;
  revokeAccess: () => void;
}

const BetaAccessContext = createContext<BetaAccessContextType | undefined>(undefined);

export const useBetaAccess = () => {
  const context = useContext(BetaAccessContext);
  if (context === undefined) {
    throw new Error('useBetaAccess must be used within a BetaAccessProvider');
  }
  return context;
};

interface BetaAccessProviderProps {
  children: React.ReactNode;
}

export const BetaAccessProvider: React.FC<BetaAccessProviderProps> = ({ children }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has beta access stored in localStorage
    const checkBetaAccess = () => {
      try {
        const betaAccess = localStorage.getItem('betaAccess');
        const betaAccessTime = localStorage.getItem('betaAccessTime');
        
        if (betaAccess === 'granted' && betaAccessTime) {
          const accessTime = parseInt(betaAccessTime);
          const currentTime = Date.now();
          const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
          
          // Check if access is still valid (within 24 hours)
          if (currentTime - accessTime < twentyFourHours) {
            setHasAccess(true);
          } else {
            // Access expired, remove from localStorage
            localStorage.removeItem('betaAccess');
            localStorage.removeItem('betaAccessTime');
            setHasAccess(false);
          }
        } else {
          setHasAccess(false);
        }
      } catch (error) {
        console.error('Error checking beta access:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkBetaAccess();
  }, []);

  const grantAccess = () => {
    setHasAccess(true);
    localStorage.setItem('betaAccess', 'granted');
    localStorage.setItem('betaAccessTime', Date.now().toString());
  };

  const revokeAccess = () => {
    setHasAccess(false);
    localStorage.removeItem('betaAccess');
    localStorage.removeItem('betaAccessTime');
  };

  const value = {
    hasAccess,
    isLoading,
    grantAccess,
    revokeAccess
  };

  return (
    <BetaAccessContext.Provider value={value}>
      {children}
    </BetaAccessContext.Provider>
  );
};
