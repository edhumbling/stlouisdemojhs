import React from 'react';
import { useBetaAccess } from '../../contexts/BetaAccessContext';
import BetaTestingModal from '../modals/BetaTestingModal';

interface BetaGateProps {
  children: React.ReactNode;
}

const BetaGate: React.FC<BetaGateProps> = ({ children }) => {
  const { hasAccess, isLoading, grantAccess } = useBetaAccess();

  // Show loading state while checking access
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // If user has access, render the app
  if (hasAccess) {
    return <>{children}</>;
  }

  // If no access, show the beta testing modal
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <BetaTestingModal
        isOpen={true}
        onAccessGranted={grantAccess}
      />
    </div>
  );
};

export default BetaGate;
