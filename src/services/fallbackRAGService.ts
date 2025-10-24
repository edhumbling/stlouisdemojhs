/**
 * Fallback RAG Service
 * Generates responses directly from the knowledge bank when AI APIs fail
 */

import { ragEngine, type RAGResult } from './ragEngine';
import { type KnowledgeChunk } from '../data/knowledgeBase';

export interface FallbackResponse {
  content: string;
  sources: string[];
  confidence: number;
  method: 'fallback_rag';
}

class FallbackRAGService {
  private ragEngine: typeof ragEngine;

  constructor() {
    this.ragEngine = ragEngine;
  }

  /**
   * Generate a response using only the knowledge bank
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<string> {
    try {
      // Search the knowledge base for relevant content
      const ragResult: RAGResult = await this.ragEngine.search(userMessage, 3);
      
      if (ragResult.chunks.length === 0) {
        return this.generateGenericResponse(userMessage);
      }

      // Generate a structured response from the knowledge chunks
      const response = this.buildResponseFromChunks(userMessage, ragResult.chunks);
      
      console.log('📚 Fallback RAG: Generated response from knowledge bank');
      return response;
      
    } catch (error) {
      console.error('❌ Fallback RAG Error:', error);
      return this.generateGenericResponse(userMessage);
    }
  }

  /**
   * Build a structured response from knowledge chunks
   */
  private buildResponseFromChunks(userMessage: string, chunks: KnowledgeChunk[]): string {
    const query = userMessage.toLowerCase();
    
    // Determine the type of response needed
    if (this.isContactQuery(query)) {
      return this.buildContactResponse(chunks);
    } else if (this.isAdmissionQuery(query)) {
      return this.buildAdmissionResponse(chunks);
    } else if (this.isAcademicQuery(query)) {
      return this.buildAcademicResponse(chunks);
    } else if (this.isFacilityQuery(query)) {
      return this.buildFacilityResponse(chunks);
    } else if (this.isGeneralQuery(query)) {
      return this.buildGeneralResponse(chunks);
    } else {
      return this.buildComprehensiveResponse(chunks);
    }
  }

  /**
   * Build contact information response
   */
  private buildContactResponse(chunks: KnowledgeChunk[]): string {
    const contactChunk = chunks.find(c => c.category === 'Contact & Location');
    const generalChunk = chunks.find(c => c.category === 'General Information');
    
    let response = "Here's the contact information for St. Louis Demonstration JHS:\n\n";
    
    if (contactChunk) {
      response += contactChunk.content + "\n\n";
    }
    
    if (generalChunk) {
      response += `**About the School:**\n${generalChunk.content}`;
    }
    
    return response;
  }

  /**
   * Build admission information response
   */
  private buildAdmissionResponse(chunks: KnowledgeChunk[]): string {
    const admissionChunk = chunks.find(c => c.category === 'Admissions');
    const enrollmentChunk = chunks.find(c => c.id === 'enrollment-age');
    
    let response = "Here's information about admissions to St. Louis Demo JHS:\n\n";
    
    if (admissionChunk) {
      response += admissionChunk.content + "\n\n";
    }
    
    if (enrollmentChunk) {
      response += `**Enrollment Details:**\n${enrollmentChunk.content}`;
    }
    
    return response;
  }

  /**
   * Build academic information response
   */
  private buildAcademicResponse(chunks: KnowledgeChunk[]): string {
    const academicChunk = chunks.find(c => c.category === 'Academics');
    const stemChunk = chunks.find(c => c.category === 'Programs');
    
    let response = "Here's information about our academic programs:\n\n";
    
    if (academicChunk) {
      response += academicChunk.content + "\n\n";
    }
    
    if (stemChunk) {
      response += `**Special Programs:**\n${stemChunk.content}`;
    }
    
    return response;
  }

  /**
   * Build facility information response
   */
  private buildFacilityResponse(chunks: KnowledgeChunk[]): string {
    const facilityChunk = chunks.find(c => c.category === 'Facilities');
    
    let response = "Here's information about our school facilities:\n\n";
    
    if (facilityChunk) {
      response += facilityChunk.content;
    } else {
      response += "Our school features modern facilities including classrooms, laboratories, computer labs, library, sports facilities, and more. For detailed information, please contact the school office.";
    }
    
    return response;
  }

  /**
   * Build general information response
   */
  private buildGeneralResponse(chunks: KnowledgeChunk[]): string {
    const generalChunk = chunks.find(c => c.category === 'General Information');
    const contactChunk = chunks.find(c => c.category === 'Contact & Location');
    
    let response = "Here's information about St. Louis Demonstration JHS:\n\n";
    
    if (generalChunk) {
      response += generalChunk.content + "\n\n";
    }
    
    if (contactChunk) {
      response += `**Contact Information:**\n${contactChunk.content}`;
    }
    
    return response;
  }

  /**
   * Build comprehensive response from multiple chunks
   */
  private buildComprehensiveResponse(chunks: KnowledgeChunk[]): string {
    let response = "Based on our school information, here's what I can tell you:\n\n";
    
    chunks.forEach((chunk, index) => {
      response += `**${chunk.title}:**\n${chunk.content}\n\n`;
    });
    
    response += "For more specific information, please contact our school office or visit our website.";
    
    return response;
  }

  /**
   * Generate a generic response when no relevant content is found
   */
  private generateGenericResponse(userMessage: string): string {
    return `I understand you're asking about "${userMessage}". While I don't have specific information about that topic in our knowledge base, I can help you with general information about St. Louis Demonstration JHS.

**General School Information:**
- We are a Catholic Demonstration Junior High School in Kumasi, Ghana
- Founded in 1977, we provide quality education for JHS students
- We offer comprehensive academic programs and extracurricular activities
- Located in Suame Mbrom, Kumasi, Ashanti Region

**Contact Information:**
- Phone: +233 20 870 5290
- Email: Contact through our website
- Location: P.O. Box 3041, Mbrom-Kumasi, Ashanti Region, Ghana

For more specific information, please contact our school office or visit our website at www.stlouisdemojhs.com.`;
  }

  /**
   * Check if query is about contact information
   */
  private isContactQuery(query: string): boolean {
    const contactKeywords = ['contact', 'phone', 'email', 'address', 'location', 'where', 'call', 'reach'];
    return contactKeywords.some(keyword => query.includes(keyword));
  }

  /**
   * Check if query is about admissions
   */
  private isAdmissionQuery(query: string): boolean {
    const admissionKeywords = ['admission', 'enroll', 'apply', 'join', 'requirements', 'how to', 'process'];
    return admissionKeywords.some(keyword => query.includes(keyword));
  }

  /**
   * Check if query is about academics
   */
  private isAcademicQuery(query: string): boolean {
    const academicKeywords = ['subject', 'course', 'curriculum', 'academic', 'study', 'learn', 'education', 'program'];
    return academicKeywords.some(keyword => query.includes(keyword));
  }

  /**
   * Check if query is about facilities
   */
  private isFacilityQuery(query: string): boolean {
    const facilityKeywords = ['facility', 'building', 'classroom', 'lab', 'library', 'sports', 'equipment'];
    return facilityKeywords.some(keyword => query.includes(keyword));
  }

  /**
   * Check if query is general
   */
  private isGeneralQuery(query: string): boolean {
    const generalKeywords = ['about', 'what', 'who', 'when', 'school', 'information', 'tell me'];
    return generalKeywords.some(keyword => query.includes(keyword));
  }

  /**
   * Get knowledge base statistics
   */
  getKnowledgeStats(): {
    totalChunks: number;
    categories: string[];
    highPriorityChunks: number;
  } {
    const categories = this.ragEngine.getCategories();
    const highPriorityChunks = this.ragEngine.getByCategory('General Information').length;
    
    return {
      totalChunks: this.ragEngine.getTotalChunks(),
      categories,
      highPriorityChunks
    };
  }
}

// Export singleton instance
const fallbackRAGService = new FallbackRAGService();
export default fallbackRAGService;