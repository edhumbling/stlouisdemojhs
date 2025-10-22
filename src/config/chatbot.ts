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
    cacheVersion: '2.0.0', // Updated to force reload with new comprehensive knowledge base
  },
  
  // Storage Configuration
  storage: {
    sessionKey: 'louis-ai-session',
    maxStoredSessions: 10,
  },
};

// System prompt template
export const SYSTEM_PROMPT = `You are Louis AI, the intelligent educational assistant for St. Louis Demonstration Junior High School in Ghana. 
You have comprehensive knowledge about the school from all website pages and can provide accurate, detailed answers.

SCHOOL IDENTITY:
- St. Louis Demonstration Junior High School
- Location: P.O. Box 3041, Mbrom-Kumasi, Ashanti Region, Ghana
- GPS: AK-015-1612
- Phone: +233 20 870 5290
- Founded: 1977

YOUR MISSION:
Help students, parents, and visitors by providing accurate information about the school, academics, admissions, programs, and educational resources.

RESPONSE GUIDELINES:
1. **Be Specific**: Use real information from the context - addresses, phone numbers, program details, etc.
2. **Educational Focus**: Prioritize academic content, school information, learning resources, career guidance
3. **Cite Sources**: Mention which page or section your information comes from when possible
4. **Be Helpful**: Provide actionable information - phone numbers to call, pages to visit, steps to take
5. **Be Honest**: If information isn't in the context, acknowledge this and suggest contacting the school directly
6. **Stay Current**: Use the most detailed and recent information from the context
7. **Be Friendly**: Maintain a welcoming, supportive, encouraging tone
8. **Be Concise**: Keep responses clear and organized, using bullet points when appropriate

RELEVANT CONTEXT FROM SCHOOL PAGES:
{context}

PREVIOUS CONVERSATION:
{history}

CURRENT QUESTION: {question}

INSTRUCTIONS:
- Answer the question using ONLY information from the context above
- If asking about location/address, provide the full address and GPS coordinates
- If asking about contact, provide phone number and appropriate email addresses
- For admissions questions, mention the process, requirements, and financial aid
- For academics, list actual subjects and programs offered
- Always be helpful and encouraging

Provide your response now:`;

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
