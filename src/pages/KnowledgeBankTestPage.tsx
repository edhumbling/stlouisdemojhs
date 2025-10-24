/**
 * Knowledge Bank Test Page
 * For testing and validating the fallback RAG system
 */

import React, { useState } from 'react';
import { knowledgeBankTester, type TestResult } from '../utils/knowledgeBankTest';
import unifiedAIService from '../services/unifiedAIService';

const KnowledgeBankTestPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [testQuery, setTestQuery] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [knowledgeStats, setKnowledgeStats] = useState<any>(null);

  const runAllTests = async () => {
    setIsLoading(true);
    try {
      await knowledgeBankTester.runAllTests();
      const results = await knowledgeBankTester.runTests();
      setTestResults(results);
      setKnowledgeStats(knowledgeBankTester.getKnowledgeStats());
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testSingleQuery = async () => {
    if (!testQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await unifiedAIService.generateResponse(testQuery);
      setTestResponse(response);
    } catch (error) {
      setTestResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const successCount = testResults.filter(r => r.success).length;
  const totalCount = testResults.length;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Knowledge Bank Test Suite</h1>
        
        {/* Knowledge Stats */}
        {knowledgeStats && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">📚 Knowledge Bank Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded">
                <h3 className="font-bold">Total Chunks</h3>
                <p className="text-2xl">{knowledgeStats.totalChunks}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <h3 className="font-bold">Categories</h3>
                <p className="text-sm">{knowledgeStats.categories?.length || 0}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <h3 className="font-bold">High Priority</h3>
                <p className="text-2xl">{knowledgeStats.highPriorityChunks}</p>
              </div>
            </div>
          </div>
        )}

        {/* Test Controls */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">🧪 Test Controls</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <button
              onClick={runAllTests}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-bold"
            >
              {isLoading ? 'Running Tests...' : 'Run All Tests'}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              placeholder="Enter test query..."
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={testSingleQuery}
              disabled={isLoading || !testQuery.trim()}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-2 rounded-lg font-bold"
            >
              Test Query
            </button>
          </div>
        </div>

        {/* Test Results Summary */}
        {testResults.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">📊 Test Results Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-700 p-4 rounded">
                <h3 className="font-bold">Total Tests</h3>
                <p className="text-2xl">{totalCount}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <h3 className="font-bold">Passed</h3>
                <p className="text-2xl text-green-400">{successCount}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <h3 className="font-bold">Failed</h3>
                <p className="text-2xl text-red-400">{totalCount - successCount}</p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-green-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${(successCount / totalCount) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2">
              Success Rate: {((successCount / totalCount) * 100).toFixed(1)}%
            </p>
          </div>
        )}

        {/* Individual Test Results */}
        {testResults.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">🔍 Individual Test Results</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className={`p-4 rounded-lg ${result.success ? 'bg-green-900' : 'bg-red-900'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{result.query}</h3>
                    <span className={`px-2 py-1 rounded text-sm ${result.success ? 'bg-green-700' : 'bg-red-700'}`}>
                      {result.success ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">
                    Response Time: {result.responseTime}ms
                  </p>
                  {result.error && (
                    <p className="text-sm text-red-300">Error: {result.error}</p>
                  )}
                  {result.response && (
                    <p className="text-sm text-gray-300">
                      Response: {result.response.substring(0, 100)}...
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Single Query Test Response */}
        {testResponse && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">💬 Test Response</h2>
            <div className="bg-gray-700 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{testResponse}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBankTestPage;