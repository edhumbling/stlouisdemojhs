import { ContentChunk, RAGEngineInterface } from '../types/chatbot';
import { CHATBOT_CONFIG } from '../config/chatbot';

/**
 * RAG Engine - Retrieval-Augmented Generation system
 * Indexes site content and retrieves relevant context for AI responses
 */
export class RAGEngine implements RAGEngineInterface {
  private contentIndex: ContentChunk[] = [];
  private isInitialized = false;

  /**
   * Initialize the RAG engine and build content index
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('RAG Engine already initialized');
      return;
    }

    try {
      // Try to load from cache first
      const cached = this.loadFromCache();
      if (cached && cached.length > 0) {
        this.contentIndex = cached;
        this.isInitialized = true;
        console.log(`RAG Engine initialized with ${cached.length} cached chunks`);
        return;
      }

      // Build new index
      await this.indexContent();
      this.isInitialized = true;
      console.log(`RAG Engine initialized with ${this.contentIndex.length} chunks`);
    } catch (error) {
      console.error('Failed to initialize RAG Engine:', error);
      throw error;
    }
  }

  /**
   * Index all site content
   */
  async indexContent(): Promise<void> {
    try {
      this.contentIndex = [];

      // Index static content about the school
      this.indexStaticContent();

      // Save to cache
      this.saveToCache();

      console.log(`Indexed ${this.contentIndex.length} content chunks`);
    } catch (error) {
      console.error('Failed to index content:', error);
      throw error;
    }
  }

  /**
   * Search for relevant content chunks
   */
  async search(query: string, limit: number = 5): Promise<ContentChunk[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2);

    // Score each chunk based on relevance
    const scoredChunks = this.contentIndex.map(chunk => ({
      chunk,
      score: this.calculateRelevance(queryWords, chunk),
    }));

    // Sort by score and return top results
    return scoredChunks
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.chunk);
  }

  /**
   * Index static content about St. Louis Demo JHS
   */
  private indexStaticContent(): void {
    const staticContent = [
      {
        id: 'about-school',
        source: 'About Page',
        content: `St. Louis Demonstration Junior High School is a premier educational institution in Ghana. 
        We provide quality education with modern facilities, experienced teachers, and comprehensive academic programs. 
        Our school focuses on academic excellence, character development, and preparing students for success.`,
        metadata: {
          title: 'About St. Louis Demo JHS',
          category: 'General Information',
          keywords: ['school', 'education', 'ghana', 'jhs', 'about'],
        },
      },
      {
        id: 'academics',
        source: 'Academics Page',
        content: `Our academic curriculum includes English Language, Mathematics, Integrated Science, Social Studies, 
        Religious and Moral Education, Ghanaian Language, French, Career Technology, Computing/ICT, Creative Arts & Design, 
        and Music. We offer comprehensive programs in STEM education, robotics, and technology.`,
        metadata: {
          title: 'Academic Programs',
          category: 'Academics',
          keywords: ['curriculum', 'subjects', 'stem', 'academics', 'programs'],
        },
      },
      {
        id: 'admissions',
        source: 'Admissions Page',
        content: `Admissions to St. Louis Demo JHS are open throughout the year. We welcome students who are eager to learn 
        and grow. The admission process includes application submission, entrance assessment, and interview. 
        We offer scholarships and financial aid to qualified students.`,
        metadata: {
          title: 'Admissions Information',
          category: 'Admissions',
          keywords: ['admission', 'enrollment', 'apply', 'scholarship', 'financial aid'],
        },
      },
      {
        id: 'stem-programs',
        source: 'STEM Page',
        content: `St. Louis Demo JHS offers cutting-edge STEM programs including robotics, space exploration, 
        coding, and technology education. Our STEM labs are equipped with modern tools and resources. 
        Students participate in competitions, projects, and hands-on learning experiences.`,
        metadata: {
          title: 'STEM Programs',
          category: 'Programs',
          keywords: ['stem', 'robotics', 'technology', 'science', 'coding', 'space'],
        },
      },
      {
        id: 'facilities',
        source: 'About Page',
        content: `Our school features modern classrooms, science laboratories, computer labs, library, 
        sports facilities, and a conducive learning environment. We have well-equipped STEM labs, 
        robotics workshop, and multimedia resources for enhanced learning.`,
        metadata: {
          title: 'School Facilities',
          category: 'Facilities',
          keywords: ['facilities', 'labs', 'library', 'classroom', 'equipment'],
        },
      },
      {
        id: 'faculty',
        source: 'Faculty Page',
        content: `Our dedicated faculty consists of experienced and qualified teachers who are passionate about education. 
        They provide personalized attention, mentorship, and guidance to help students achieve their full potential. 
        Our staff includes subject specialists, counselors, and support staff.`,
        metadata: {
          title: 'Faculty and Staff',
          category: 'Faculty',
          keywords: ['teachers', 'faculty', 'staff', 'educators', 'mentors'],
        },
      },
      {
        id: 'extracurricular',
        source: 'Students Hub',
        content: `Students can participate in various extracurricular activities including sports, music, drama, 
        debate, science clubs, robotics club, and community service. We encourage holistic development through 
        diverse activities beyond academics.`,
        metadata: {
          title: 'Extracurricular Activities',
          category: 'Activities',
          keywords: ['activities', 'clubs', 'sports', 'music', 'extracurricular'],
        },
      },
      {
        id: 'career-guidance',
        source: 'Educational Guide',
        content: `We provide comprehensive career guidance and educational pathway planning. Students receive counseling 
        on SHS placement, university options, scholarship opportunities, and career choices. Our resources include 
        information on nursing institutions, teacher training, universities, TVET schools, and professional institutes.`,
        metadata: {
          title: 'Career Guidance',
          category: 'Guidance',
          keywords: ['career', 'guidance', 'university', 'scholarship', 'shs', 'pathway'],
        },
      },
      {
        id: 'values',
        source: 'About Page',
        content: `St. Louis Demo JHS is built on core values of excellence, integrity, respect, responsibility, 
        and innovation. We emphasize character education, leadership development, and moral values alongside 
        academic achievement.`,
        metadata: {
          title: 'School Values',
          category: 'Values',
          keywords: ['values', 'character', 'integrity', 'leadership', 'excellence'],
        },
      },
      {
        id: 'contact',
        source: 'Contact Page',
        content: `You can contact St. Louis Demo JHS through our website contact form, visit us in person, 
        or reach out via phone or email. We welcome inquiries from prospective students, parents, and partners. 
        Our staff is available to answer questions and provide information.`,
        metadata: {
          title: 'Contact Information',
          category: 'Contact',
          keywords: ['contact', 'reach', 'visit', 'inquire', 'information'],
        },
      },
    ];

    this.contentIndex.push(...staticContent);
  }

  /**
   * Calculate relevance score for a content chunk
   */
  private calculateRelevance(queryWords: string[], chunk: ContentChunk): number {
    let score = 0;
    const contentLower = chunk.content.toLowerCase();
    const titleLower = chunk.metadata.title?.toLowerCase() || '';
    const keywords = chunk.metadata.keywords || [];

    // Check query words in content
    queryWords.forEach(word => {
      // Title match (highest weight)
      if (titleLower.includes(word)) {
        score += 10;
      }

      // Keyword match (high weight)
      if (keywords.some(keyword => keyword.includes(word))) {
        score += 5;
      }

      // Content match (base weight)
      const contentMatches = (contentLower.match(new RegExp(word, 'g')) || []).length;
      score += contentMatches * 2;
    });

    return score;
  }

  /**
   * Load content index from localStorage cache
   */
  private loadFromCache(): ContentChunk[] | null {
    try {
      const cached = localStorage.getItem(CHATBOT_CONFIG.rag.cacheKey);
      if (!cached) return null;

      const data = JSON.parse(cached);
      if (data.version !== CHATBOT_CONFIG.rag.cacheVersion) {
        return null; // Cache version mismatch
      }

      return data.chunks;
    } catch (error) {
      console.error('Failed to load cache:', error);
      return null;
    }
  }

  /**
   * Save content index to localStorage cache
   */
  private saveToCache(): void {
    try {
      const data = {
        version: CHATBOT_CONFIG.rag.cacheVersion,
        chunks: this.contentIndex,
        timestamp: Date.now(),
      };
      localStorage.setItem(CHATBOT_CONFIG.rag.cacheKey, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save cache:', error);
    }
  }
}

// Export singleton instance
export const ragEngine = new RAGEngine();
