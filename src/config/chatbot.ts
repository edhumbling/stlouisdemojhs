/**
 * Configuration for Louis AI Chatbot
 */

export const CHATBOT_CONFIG = {
  // API Configuration
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  
  // Message limits
  maxMessages: 50,
  maxContextChunks: 5,
  
  // Rate limiting
  rateLimit: {
    maxRequests: 10,
    windowMs: 60000, // 1 minute
  },
  
  // UI Configuration
  ui: {
    widgetPosition: {
      desktop: { left: 24, bottom: 24 },
      mobile: { left: 16, bottom: 16 },
    },
    widgetSize: {
      desktop: 64,
      mobile: 56,
    },
    animationDuration: 300,
  },
  
  // RAG Configuration
  rag: {
    searchDebounceMs: 300,
    cacheKey: 'louis-ai-content-index',
    cacheVersion: '1.0.0',
  },
  
  // Storage Configuration
  storage: {
    sessionKey: 'louis-ai-session',
    maxStoredSessions: 10,
  },
};

// System prompt template
export const SYSTEM_PROMPT = `You are Louis AI, an educational assistant for St. Louis Demonstration JHS in Ghana. 
Your purpose is to help students, parents, and visitors learn about the school and educational topics.

Guidelines:
1. Focus exclusively on educational content (academics, school information, learning resources, career guidance)
2. Provide accurate information based on the provided context
3. Be friendly, encouraging, and supportive
4. Redirect non-educational queries politely to educational topics
5. Cite sources when possible from the context provided
6. Admit when you don't know something rather than making up information
7. Keep responses concise and helpful
8. Use simple, clear language appropriate for students

Context from the website:
{context}

Conversation history:
{history}

User question: {question}

Please provide a helpful, educational response.`;

// Educational keywords for content filtering
export const EDUCATIONAL_KEYWORDS = [
  'school', 'education', 'learning', 'study', 'academic', 'course', 'subject',
  'teacher', 'student', 'class', 'lesson', 'exam', 'test', 'homework',
  'admission', 'enrollment', 'curriculum', 'program', 'faculty', 'staff',
  'career', 'university', 'college', 'scholarship', 'tuition', 'fee',
  'science', 'math', 'english', 'history', 'art', 'music', 'sports',
  'stem', 'robotics', 'technology', 'computer', 'library', 'resource',
];

// Non-educational topics to redirect
export const NON_EDUCATIONAL_TOPICS = [
  'weather', 'sports scores', 'entertainment', 'celebrity', 'gossip',
  'politics', 'religion', 'dating', 'shopping', 'gaming',
];
