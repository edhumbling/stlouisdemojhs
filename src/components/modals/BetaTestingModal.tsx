import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, CheckCircle, AlertCircle } from 'lucide-react';

interface BetaTestingModalProps {
  isOpen: boolean;
  onAccessGranted: () => void;
}

const BetaTestingModal: React.FC<BetaTestingModalProps> = ({ isOpen, onAccessGranted }) => {
  const [step, setStep] = useState<'agreement' | 'code'>('agreement');
  const [agreed, setAgreed] = useState(false);
  const [betaCode, setBetaCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 7 Random Beta Tester Codes
  const validCodes = [
    'BETA2024STL',
    'DEMO7X9K2',
    'TESTER4M8P',
    'ALPHA3Q7W',
    'PREVIEW5N1',
    'ACCESS8R6T',
    'TRIAL9Y4U'
  ];

  const handleAgreementSubmit = () => {
    if (!agreed) {
      setError('You must agree to the beta testing terms to continue.');
      return;
    }
    setError('');
    setStep('code');
  };

  const handleCodeSubmit = () => {
    setIsLoading(true);
    setError('');

    // Simulate loading delay
    setTimeout(() => {
      if (validCodes.includes(betaCode.toUpperCase().trim())) {
        // Store beta access in localStorage
        localStorage.setItem('betaAccess', 'granted');
        localStorage.setItem('betaAccessTime', Date.now().toString());
        onAccessGranted();
      } else {
        setError('Invalid beta tester code. Please check your code and try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (step === 'agreement') {
        handleAgreementSubmit();
      } else {
        handleCodeSubmit();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(12px)' }}
      >
        {/* Blurred Background Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
        
        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md mx-auto"
        >
          <div className="bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl border border-gray-600/30 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 text-center border-b border-gray-600/30">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Beta Testing Access</h2>
              <p className="text-sm text-gray-300">
                You're seeing this because you've been onboarded as a beta tester
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 'agreement' ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                    <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Beta Testing Agreement
                    </h3>
                    <div className="space-y-2 text-xs text-gray-300 leading-relaxed">
                      <p>• You are authorized to interact with this beta version solely for testing purposes</p>
                      <p>• Provide feedback to the developer through the channel you received this link</p>
                      <p>• <strong className="text-red-400">Never share this link</strong> with unauthorized individuals</p>
                      <p>• Report any bugs, issues, or suggestions for improvement</p>
                      <p>• This beta access may be revoked at any time</p>
                      <p>• All content and features are subject to change</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-xl">
                    <input
                      type="checkbox"
                      id="agreement"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="agreement" className="text-xs text-gray-300 cursor-pointer">
                      I agree to the beta testing terms and conditions above. I understand my responsibilities as a beta tester.
                    </label>
                  </div>

                  {error && (
                    <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-2">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleAgreementSubmit}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    I Agree - Continue
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">Enter Beta Code</h3>
                    <p className="text-xs text-gray-400">
                      Please enter your beta tester access code to continue
                    </p>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={betaCode}
                      onChange={(e) => setBetaCode(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your beta code..."
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      disabled={isLoading}
                    />

                    {error && (
                      <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-2">
                        {error}
                      </div>
                    )}

                    <button
                      onClick={handleCodeSubmit}
                      disabled={isLoading || !betaCode.trim()}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white text-sm font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Access Beta
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => setStep('agreement')}
                    className="w-full text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300"
                  >
                    ← Back to Agreement
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BetaTestingModal;
