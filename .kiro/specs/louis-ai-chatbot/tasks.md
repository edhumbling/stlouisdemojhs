# Implementation Plan: Louis AI Chatbot

- [x] 1. Set up project structure and configuration


  - Create directory structure for chatbot components in `src/components/chatbot/`
  - Create service files in `src/services/` for RAG engine, Gemini API, and chat storage
  - Create types file `src/types/chatbot.ts` with all TypeScript interfaces
  - Create configuration file `src/config/chatbot.ts` with API settings and UI constants
  - Add environment variable `VITE_GEMINI_API_KEY` to `.env` file
  - _Requirements: 5.1, 5.2, 5.3_


- [ ] 2. Implement core TypeScript types and interfaces
  - Define `Message`, `ChatSession`, `ContentChunk` interfaces in `src/types/chatbot.ts`
  - Define component prop interfaces for all chatbot components
  - Define service interfaces for RAG engine and Gemini API
  - Export all types for use across the application

  - _Requirements: 1.1, 3.1, 5.1_



- [ ] 3. Build ChatWidget component (hovering button)
  - [ ] 3.1 Create `ChatWidget.tsx` component with fixed positioning on left side
    - Implement button with St. Louis favicon logo from `/favicon-32x32.png`


    - Add click handler to toggle chatbot open state
    - Style with gradient background and elevated shadow
    - Position at `left: 24px`, `bottom: 24px` with `z-index: 9999`


    - _Requirements: 1.1, 1.2, 1.3, 7.1_
  - [ ] 3.2 Add responsive styling for mobile and tablet devices
    - Adjust button size: 64px (desktop), 56px (mobile)

    - Adjust positioning: 24px (desktop), 16px (mobile) from edges
    - Ensure button remains accessible on all screen sizes


    - _Requirements: 1.3, 2.1, 7.5_
  - [ ] 3.3 Implement pulse animation to attract user attention
    - Add CSS keyframe animation for subtle pulsing effect
    - Apply glow effect on hover

    - Ensure animation respects `prefers-reduced-motion`
    - _Requirements: 1.5, 7.4_

- [ ] 4. Build ChatPanel component (full-screen overlay)
  - [x] 4.1 Create `ChatPanel.tsx` with full-screen overlay layout

    - Implement fixed positioning covering entire viewport
    - Add semi-transparent dark background with backdrop blur
    - Set `z-index: 10000` to appear above widget
    - Implement slide-in animation from left side
    - _Requirements: 2.1, 2.2, 7.3, 7.4_


  - [ ] 4.2 Add close functionality and background scroll prevention
    - Implement close button in header
    - Prevent body scrolling when panel is open using CSS `overflow: hidden`
    - Add click-outside-to-close functionality (optional)

    - Handle Escape key to close panel
    - _Requirements: 2.3, 2.4_
  - [x] 4.3 Ensure responsive design for desktop and mobile


    - Full viewport coverage on all devices
    - Adjust padding and spacing for mobile (16px) vs desktop (24px)
    - Test landscape and portrait orientations
    - _Requirements: 2.1, 2.5, 7.5_



- [ ] 5. Build ChatHeader component
  - Create `ChatHeader.tsx` with logo, title, and close button
  - Display St. Louis favicon (32px) and title "Louis AI Assistant"


  - Add subtitle "Ask me anything about St. Louis Demo JHS"
  - Implement close button with X icon from lucide-react
  - Style with clean, modern design matching site theme
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 6. Build message display components


  - [ ] 6.1 Create `MessageList.tsx` component
    - Implement scrollable container for messages
    - Add auto-scroll to latest message on new message
    - Display loading indicator when AI is responding

    - Show welcome message when conversation is empty
    - _Requirements: 3.5, 7.3_
  - [ ] 6.2 Create `UserMessage.tsx` component
    - Display user messages aligned to right side


    - Style with blue gradient background
    - Add timestamp below message
    - Use sharp, modern border radius
    - _Requirements: 3.4, 7.3_

  - [ ] 6.3 Create `AIMessage.tsx` component
    - Display AI messages aligned to left side
    - Show St. Louis favicon avatar (24px)
    - Style with dark gray background and subtle border
    - Add timestamp below message

    - Support basic markdown formatting (bold, italic, lists)
    - _Requirements: 3.4, 7.1, 7.3_

- [ ] 7. Build ChatInput component
  - Create `ChatInput.tsx` with text input and send button

  - Implement multi-line auto-expanding textarea

  - Add send button with icon from lucide-react
  - Handle Enter key to send (Shift+Enter for new line)
  - Disable input during loading state
  - Add input validation for empty messages
  - _Requirements: 3.2, 4.4_



- [ ] 8. Implement RAG Engine service
  - [ ] 8.1 Create `ragEngine.ts` service class
    - Implement `RAGEngine` class with content indexing methods

    - Create `initialize()` method to build content index on app load
    - Create `indexContent()` method to scan and extract text from site files
    - Create `search()` method to find relevant content chunks
    - _Requirements: 3.1, 3.2, 6.1, 6.3_
  - [x] 8.2 Implement content extraction methods

    - Create method to extract text from React component files
    - Create method to extract text from data files (JSON, TypeScript)
    - Create method to extract text from markdown files
    - Handle file reading and parsing errors gracefully
    - _Requirements: 3.1, 6.1_
  - [x] 8.3 Implement search and relevance ranking


    - Create keyword-based search algorithm (TF-IDF or simple matching)

    - Implement relevance scoring for content chunks
    - Return top 5 most relevant chunks for each query
    - Cache search results for performance
    - _Requirements: 3.2, 6.4, 6.5_
  - [ ] 8.4 Add content index caching
    - Store content index in memory during session


    - Persist index to localStorage for faster subsequent loads
    - Implement cache invalidation strategy
    - _Requirements: 6.2, 6.3_


- [ ] 9. Implement Gemini API service
  - [ ] 9.1 Create `geminiService.ts` service class
    - Implement `GeminiService` class with API integration methods
    - Create `generateResponse()` method to send requests to Gemini API
    - Format request payload according to Gemini API specification

    - Parse API response and extract generated text
    - _Requirements: 3.3, 3.4, 5.1, 5.2_
  - [ ] 9.2 Implement system prompt with educational focus
    - Create system prompt that constrains AI to educational topics
    - Include retrieved RAG context in prompt

    - Include conversation history for context continuity
    - Format prompt to encourage helpful, friendly responses
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [ ] 9.3 Add error handling and rate limiting
    - Handle network errors, authentication errors, and API failures


    - Implement rate limiting (max 10 requests per minute)
    - Return user-friendly error messages
    - Implement retry logic for transient errors (max 3 attempts)
    - _Requirements: 5.3, 5.4_


- [ ] 10. Implement chat storage service
  - Create `chatStorage.ts` service class

  - Implement methods to save/load chat sessions from localStorage
  - Create method to get current active session
  - Create method to clear session history
  - Create method to export conversation as text
  - _Requirements: 3.5_

- [x] 11. Create main LouisAIChatbot component

  - [ ] 11.1 Create `LouisAIChatbot.tsx` root component
    - Implement component state management for open/closed, messages, loading, errors
    - Initialize RAG engine on component mount
    - Coordinate between ChatWidget and ChatPanel components
    - _Requirements: 1.1, 1.4, 3.1_

  - [ ] 11.2 Implement message sending logic
    - Handle user message submission
    - Call RAG engine to retrieve relevant context
    - Call Gemini API service to generate response
    - Update message list with user message and AI response
    - Handle loading states during API calls


    - _Requirements: 3.2, 3.3, 3.4, 3.5_
  - [ ] 11.3 Implement error handling and recovery
    - Display user-friendly error messages in chat
    - Implement automatic retry for failed requests
    - Allow users to retry failed messages manually
    - Log errors to console for debugging
    - _Requirements: 5.3, 5.4_
  - [x] 11.4 Add educational content filtering


    - Validate user queries before sending to API
    - Filter out non-educational or inappropriate content
    - Provide polite redirection messages for off-topic queries
    - _Requirements: 4.1, 4.2, 4.3, 4.4_


- [ ] 12. Integrate chatbot into Layout component
  - Add `LouisAIChatbot` component to `Layout.tsx`
  - Ensure chatbot appears on all pages globally
  - Verify chatbot doesn't interfere with existing UI elements
  - Test z-index stacking with header, footer, and other components

  - _Requirements: 1.1, 1.4_

- [x] 13. Implement accessibility features


  - Add ARIA labels to all interactive elements
  - Implement keyboard navigation (Tab, Enter, Escape)

  - Add focus management (focus input when panel opens)
  - Implement screen reader announcements for new messages
  - Ensure color contrast meets WCAG AA standards (4.5:1)
  - Respect `prefers-reduced-motion` for animations
  - _Requirements: 7.3, 7.4, 7.5_


- [ ] 14. Add styling and animations
  - [ ] 14.1 Create CSS styles for all chatbot components
    - Define color palette in CSS variables
    - Style ChatWidget with gradient and shadow


    - Style ChatPanel with backdrop blur and overlay
    - Style messages with appropriate backgrounds and spacing
    - _Requirements: 2.5, 7.2, 7.3_


  - [ ] 14.2 Implement animations
    - Add slide-in animation for ChatPanel
    - Add pulse animation for ChatWidget
    - Add smooth transitions for all interactive elements
    - Add loading animation for AI responses
    - _Requirements: 7.4_

- [ ] 15. Performance optimization
  - Implement lazy loading for chatbot components
  - Add code splitting to separate chatbot bundle
  - Optimize RAG engine search with debouncing (300ms)
  - Limit message history to 50 messages in memory
  - Implement virtual scrolling for long conversations (optional)
  - _Requirements: 6.3, 6.4_

- [ ] 16. Testing and quality assurance
  - [ ] 16.1 Test responsive design across devices
    - Test on desktop (1920x1080, 1366x768)
    - Test on tablet (iPad, Android tablet)
    - Test on mobile (iPhone, Android phone)
    - Test landscape and portrait orientations
    - _Requirements: 1.3, 2.1, 7.5_
  - [ ] 16.2 Test chatbot functionality
    - Test opening and closing chatbot
    - Test sending messages and receiving responses
    - Test RAG context retrieval accuracy
    - Test error handling for API failures
    - Test rate limiting behavior
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.3, 5.4_
  - [ ] 16.3 Test accessibility features
    - Test keyboard navigation
    - Test screen reader compatibility
    - Test color contrast
    - Test reduced motion preferences
    - _Requirements: 7.3, 7.4, 7.5_
  - [ ] 16.4 Test educational content filtering
    - Test with educational queries (school info, academics, learning)
    - Test with non-educational queries (weather, sports, entertainment)
    - Verify AI stays on-topic and redirects appropriately
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 17. Documentation and deployment
  - [ ] 17.1 Add inline code comments
    - Document complex logic in RAG engine
    - Document API integration in Gemini service
    - Document component props and state
    - _Requirements: All_
  - [ ] 17.2 Create user guide
    - Document how to use the chatbot
    - Provide example queries
    - Explain educational focus
    - _Requirements: 4.1, 4.2, 4.3_
  - [ ] 17.3 Verify environment variables
    - Ensure `.env` file has `VITE_GEMINI_API_KEY`
    - Test API key is loaded correctly
    - Verify API key is not exposed in client bundle
    - _Requirements: 5.1, 5.2, 5.5_
