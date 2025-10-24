/**
 * Knowledge Bank Test Utility
 * Tests the fallback RAG system to ensure it works correctly
 */

import fallbackRAGService from '../services/fallbackRAGService';
import unifiedAIService from '../services/unifiedAIService';

export interface TestResult {
  query: string;
  response: string;
  success: boolean;
  error?: string;
  responseTime: number;
}

export class KnowledgeBankTester {
  private testQueries: string[] = [
    'What is the school address?',
    'How can I contact the school?',
    'What subjects are taught?',
    'How do I apply for admission?',
    'What facilities does the school have?',
    'What are the school hours?',
    'Tell me about the school',
    'What programs are available?',
    'How old should students be?',
    'What extracurricular activities are there?'
  ];

  /**
   * Run comprehensive tests on the knowledge bank
   */
  async runTests(): Promise<TestResult[]> {
    console.log('🧪 Starting Knowledge Bank Tests...');
    const results: TestResult[] = [];

    for (const query of this.testQueries) {
      const startTime = Date.now();
      
      try {
        const response = await fallbackRAGService.generateResponse(query);
        const responseTime = Date.now() - startTime;
        
        results.push({
          query,
          response,
          success: true,
          responseTime
        });
        
        console.log(`✅ Test passed: "${query}" (${responseTime}ms)`);
        
      } catch (error) {
        const responseTime = Date.now() - startTime;
        
        results.push({
          query,
          response: '',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          responseTime
        });
        
        console.log(`❌ Test failed: "${query}" - ${error}`);
      }
    }

    return results;
  }

  /**
   * Test the unified AI service with fallback
   */
  async testUnifiedService(): Promise<void> {
    console.log('🧪 Testing Unified AI Service with Fallback...');
    
    try {
      // Test with a simple query
      const response = await unifiedAIService.generateResponse('What is the school address?');
      console.log('✅ Unified AI Service test passed');
      console.log('Response:', response.substring(0, 100) + '...');
      
      // Get knowledge stats
      const stats = unifiedAIService.getKnowledgeStats();
      console.log('📊 Knowledge Bank Stats:', stats);
      
    } catch (error) {
      console.log('❌ Unified AI Service test failed:', error);
    }
  }

  /**
   * Get knowledge bank statistics
   */
  getKnowledgeStats() {
    return fallbackRAGService.getKnowledgeStats();
  }

  /**
   * Test specific query types
   */
  async testQueryTypes(): Promise<void> {
    console.log('🧪 Testing Different Query Types...');
    
    const queryTypes = [
      { type: 'Contact', query: 'How can I contact the school?' },
      { type: 'Admission', query: 'How do I apply for admission?' },
      { type: 'Academic', query: 'What subjects are taught?' },
      { type: 'Facility', query: 'What facilities does the school have?' },
      { type: 'General', query: 'Tell me about the school' }
    ];

    for (const { type, query } of queryTypes) {
      try {
        const response = await fallbackRAGService.generateResponse(query);
        console.log(`✅ ${type} query test passed`);
        console.log(`Response length: ${response.length} characters`);
      } catch (error) {
        console.log(`❌ ${type} query test failed:`, error);
      }
    }
  }

  /**
   * Run all tests and generate report
   */
  async runAllTests(): Promise<void> {
    console.log('🚀 Running Complete Knowledge Bank Test Suite...\n');
    
    // Test fallback RAG service
    const results = await this.runTests();
    const successCount = results.filter(r => r.success).length;
    const totalCount = results.length;
    
    console.log(`\n📊 Test Results: ${successCount}/${totalCount} tests passed`);
    
    // Test unified service
    await this.testUnifiedService();
    
    // Test query types
    await this.testQueryTypes();
    
    // Show knowledge stats
    const stats = this.getKnowledgeStats();
    console.log('\n📚 Knowledge Bank Statistics:');
    console.log(`- Total chunks: ${stats.totalChunks}`);
    console.log(`- Categories: ${stats.categories.join(', ')}`);
    console.log(`- High priority chunks: ${stats.highPriorityChunks}`);
    
    console.log('\n✅ Knowledge Bank Test Suite Complete!');
  }
}

// Export test utility
export const knowledgeBankTester = new KnowledgeBankTester();
export default knowledgeBankTester;