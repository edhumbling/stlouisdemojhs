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
            <p className="text-gray-300 text-lg mb-4">
              Test the beautiful loading screen with tiny logo, revolving circles, and light beams
            </p>
            <div className="bg-orange-900/30 border border-orange-500/30 rounded-lg p-4 mb-6">
              <p className="text-orange-300 text-sm">
                📊 <strong>Scroll Progress Indicator:</strong> This page also demonstrates the orange scroll progress bar at the top!
                Scroll down to see it in action as you read through the content.
              </p>
            </div>
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

          {/* Additional Content to Test Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 space-y-8"
          >
            <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-6 text-orange-400">Scroll Progress Indicator Demo</h2>

              <div className="space-y-6 text-gray-300">
                <p>
                  The orange scroll progress indicator at the top of this page shows your reading progress through the content.
                  As you scroll down, the orange bar fills up to indicate how much of the page you've read.
                </p>

                <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-4">
                  <h3 className="text-orange-300 font-semibold mb-2">Features of the Scroll Indicator:</h3>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Orange gradient:</strong> Beautiful orange-to-red gradient that matches the website theme</li>
                    <li>• <strong>Smooth animations:</strong> Powered by Framer Motion for buttery smooth progress tracking</li>
                    <li>• <strong>Smart visibility:</strong> Only appears when you start scrolling (after 50px)</li>
                    <li>• <strong>Sparkle effect:</strong> Animated sparkle at the progress point for visual appeal</li>
                    <li>• <strong>Percentage display:</strong> Shows progress percentage for longer content</li>
                    <li>• <strong>Shimmer animation:</strong> Subtle shimmer effect across the progress bar</li>
                  </ul>
                </div>

                <p>
                  This scroll indicator appears on "reading pages" - content-heavy pages where users typically scroll through
                  to read articles, educational content, policies, or other long-form text. It helps users understand their
                  progress through the content and provides a visual cue about how much more there is to read.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
                    <h3 className="text-blue-300 font-semibold mb-2">Pages with Scroll Indicator:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Educational content pages</li>
                      <li>• Subject pages</li>
                      <li>• Policy and legal pages</li>
                      <li>• Resource pages</li>
                      <li>• Long-form articles</li>
                      <li>• Career guidance pages</li>
                    </ul>
                  </div>

                  <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
                    <h3 className="text-green-300 font-semibold mb-2">Pages without Indicator:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Homepage</li>
                      <li>• Gallery and media pages</li>
                      <li>• Application forms</li>
                      <li>• Donation pages</li>
                      <li>• Interactive tools</li>
                      <li>• Short confirmation pages</li>
                    </ul>
                  </div>
                </div>

                <p>
                  The indicator uses different colors based on the page type - orange for general content,
                  blue/cyan for AI and tech pages, green for educational content, and purple for legal pages.
                  This provides visual consistency while helping users understand the type of content they're reading.
                </p>

                <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4">
                  <h3 className="text-purple-300 font-semibold mb-2">Technical Implementation:</h3>
                  <p className="text-sm mb-3">
                    The scroll indicator is built with modern web technologies for optimal performance:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>React & TypeScript:</strong> Type-safe component architecture</li>
                    <li>• <strong>Framer Motion:</strong> Smooth animations and transitions</li>
                    <li>• <strong>Tailwind CSS:</strong> Responsive design and styling</li>
                    <li>• <strong>Performance optimized:</strong> Uses requestAnimationFrame for smooth scrolling</li>
                    <li>• <strong>Accessibility friendly:</strong> Doesn't interfere with screen readers</li>
                  </ul>
                </div>

                <p>
                  Keep scrolling to see the progress bar fill up completely! The indicator provides immediate
                  visual feedback about your reading progress and helps you gauge how much content remains.
                </p>

                <div className="h-96 bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">Scroll Progress Tracking</h3>
                    <p className="text-gray-400">Watch the orange bar at the top fill as you scroll!</p>
                  </div>
                </div>

                <p>
                  The scroll progress indicator enhances the reading experience by providing clear visual feedback
                  about progress through content. It's particularly useful for longer articles, educational materials,
                  and documentation where users need to understand how much content remains.
                </p>

                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-2xl font-semibold text-green-400 mb-2">Congratulations!</h3>
                  <p className="text-gray-300">
                    You've reached the end of the content. The scroll indicator should now be at 100%!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoadingTestPage;
