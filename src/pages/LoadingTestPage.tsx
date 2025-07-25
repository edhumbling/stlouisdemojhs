import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLoading, useGlobalLoading } from '../contexts/LoadingContext';
import SEOHead from '../components/seo/SEOHead';

const LoadingTestPage: React.FC = () => {
  const { startLoading, stopLoading } = useLoading();
  const { showGlobalLoading, hideGlobalLoading, setLoadingMessage, isGlobalLoading } = useGlobalLoading();
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testSimpleLoading = async () => {
    addResult('Starting simple loading test...');
    startLoading('Testing simple loading...');
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    stopLoading();
    addResult('Simple loading test completed!');
  };

  const testComplexLoading = async () => {
    addResult('Starting complex loading test...');
    
    setLoadingMessage('Initializing...');
    showGlobalLoading();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoadingMessage('Processing data...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoadingMessage('Finalizing...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    hideGlobalLoading();
    addResult('Complex loading test completed!');
  };

  const testQuickLoading = async () => {
    addResult('Testing quick loading (1 second)...');
    startLoading('Quick test...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    stopLoading();
    addResult('Quick loading test completed!');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <>
      <SEOHead 
        title="Loading Screen Test - St. Louis Demo JHS"
        description="Test page for the global loading screen functionality"
      />
      
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Global Loading Screen Test
            </h1>
            <p className="text-gray-300 text-lg">
              Test the beautiful loading screen with tiny logo, revolving circles, and light beams
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Test Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold mb-6 text-blue-400">Test Controls</h2>
              
              <div className="space-y-4">
                <button
                  onClick={testSimpleLoading}
                  disabled={isGlobalLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
                >
                  Test Simple Loading (3s)
                </button>
                
                <button
                  onClick={testComplexLoading}
                  disabled={isGlobalLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
                >
                  Test Complex Loading (4.5s)
                </button>
                
                <button
                  onClick={testQuickLoading}
                  disabled={isGlobalLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
                >
                  Test Quick Loading (1s)
                </button>
                
                <button
                  onClick={clearResults}
                  disabled={isGlobalLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
                >
                  Clear Results
                </button>
              </div>

              {isGlobalLoading && (
                <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-300 text-sm">
                    ⚡ Global loading screen is currently active
                  </p>
                </div>
              )}
            </motion.div>

            {/* Test Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold mb-6 text-green-400">Test Results</h2>
              
              <div className="bg-black/50 rounded-lg p-4 h-64 overflow-y-auto">
                {testResults.length === 0 ? (
                  <p className="text-gray-500 italic">No tests run yet...</p>
                ) : (
                  <div className="space-y-2">
                    {testResults.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-gray-300 font-mono"
                      >
                        {result}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Features Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-6 text-purple-400">Loading Screen Features</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-400 text-xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2">Tiny Logo</h3>
                <p className="text-gray-400 text-sm">School logo displayed in the center with subtle animations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-400 text-xl">🔄</span>
                </div>
                <h3 className="font-semibold mb-2">Revolving Circles</h3>
                <p className="text-gray-400 text-sm">Multiple animated circles rotating at different speeds</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-400 text-xl">✨</span>
                </div>
                <h3 className="font-semibold mb-2">Light Beams</h3>
                <p className="text-gray-400 text-sm">Beautiful rotating beams and sparkle effects</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoadingTestPage;
