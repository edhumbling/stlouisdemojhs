# Requirements Document

## Introduction

The Louis AI Chatbot is an intelligent, globally accessible conversational assistant integrated into the St. Louis Demonstration JHS website. The chatbot leverages Google's Gemini 2.0 Flash API to provide educational support and site-wide information retrieval using Retrieval-Augmented Generation (RAG). The system shall appear as a hovering button with the St. Louis favicon logo, expandable to full-screen on both desktop and mobile devices, and shall maintain context awareness of all site content to answer student queries focused on educational topics.

## Glossary

- **Louis AI System**: The complete chatbot implementation including UI components, API integration, and RAG functionality
- **Chat Widget**: The hovering button interface that triggers the chatbot
- **Chat Panel**: The expanded full-screen interface where conversations occur
- **RAG Engine**: The Retrieval-Augmented Generation system that indexes and retrieves site content
- **Gemini API**: Google's Generative Language API (gemini-2.0-flash model)
- **Site Content Index**: The searchable database of all text content from the website
- **Educational Query**: User questions related to learning, academics, school information, or educational resources

## Requirements

### Requirement 1

**User Story:** As a student visiting the website, I want to see a persistent AI chatbot button on every page, so that I can quickly access help whenever I need it.

#### Acceptance Criteria

1. THE Louis AI System SHALL display a hovering button fixed to the left side of the viewport on all pages
2. WHEN the page loads, THE Chat Widget SHALL render with the St. Louis favicon as the bot logo
3. THE Chat Widget SHALL remain visible and accessible during page scrolling
4. THE Chat Widget SHALL maintain its position across all routes within the application
5. THE Chat Widget SHALL display a visual indicator (such as a pulsing animation or glow effect) to attract user attention

### Requirement 2

**User Story:** As a mobile user, I want the chatbot to expand to full screen when opened, so that I have an optimal conversation experience on my device.

#### Acceptance Criteria

1. WHEN a user clicks the Chat Widget on a mobile device, THE Chat Panel SHALL expand to occupy the full viewport
2. WHEN a user clicks the Chat Widget on a desktop device, THE Chat Panel SHALL expand to occupy the full viewport
3. THE Chat Panel SHALL include a close button that returns the user to the collapsed Chat Widget state
4. WHILE the Chat Panel is open, THE Chat Panel SHALL prevent background page scrolling
5. THE Chat Panel SHALL render with a crisp, sharp design using modern UI principles

### Requirement 3

**User Story:** As a student, I want to ask questions about any content on the website, so that I can quickly find information without manually searching.

#### Acceptance Criteria

1. THE RAG Engine SHALL index all text content from the website including pages, components, and data files
2. WHEN a user submits a query, THE Louis AI System SHALL retrieve relevant context from the Site Content Index
3. THE Louis AI System SHALL send the user query and retrieved context to the Gemini API
4. THE Louis AI System SHALL display the Gemini API response in the Chat Panel
5. THE Louis AI System SHALL maintain conversation history within the current session

### Requirement 4

**User Story:** As a student, I want the AI to focus on educational topics, so that I receive relevant and appropriate responses for learning.

#### Acceptance Criteria

1. THE Louis AI System SHALL filter user queries to identify Educational Queries
2. WHEN a user submits a non-educational query, THE Louis AI System SHALL politely redirect the conversation to educational topics
3. THE Louis AI System SHALL provide responses related to academics, school information, learning resources, career guidance, and educational pathways
4. THE Louis AI System SHALL refuse to engage with inappropriate, harmful, or off-topic content
5. THE Louis AI System SHALL include a system prompt that constrains responses to educational contexts

### Requirement 5

**User Story:** As a developer, I want the chatbot to integrate with the Gemini API securely, so that the system functions reliably without exposing sensitive credentials.

#### Acceptance Criteria

1. THE Louis AI System SHALL use the Gemini 2.0 Flash model endpoint for content generation
2. THE Louis AI System SHALL authenticate API requests using the provided API key
3. THE Louis AI System SHALL handle API errors gracefully with user-friendly error messages
4. THE Louis AI System SHALL implement rate limiting to prevent API quota exhaustion
5. WHERE the API key is stored in the codebase, THE Louis AI System SHALL use environment variables or secure configuration management

### Requirement 6

**User Story:** As a site administrator, I want the chatbot to build knowledge from the entire site automatically, so that it stays up-to-date without manual intervention.

#### Acceptance Criteria

1. THE RAG Engine SHALL scan and index all accessible text content on application initialization
2. THE RAG Engine SHALL update the Site Content Index when new content is detected
3. THE RAG Engine SHALL store indexed content in a searchable format optimized for retrieval
4. THE RAG Engine SHALL implement semantic search to find relevant content based on query meaning
5. THE RAG Engine SHALL prioritize recent and frequently accessed content in search results

### Requirement 7

**User Story:** As a user, I want the chatbot interface to be visually appealing and consistent with the site design, so that it feels like a natural part of the website.

#### Acceptance Criteria

1. THE Chat Widget SHALL use the St. Louis favicon image as the bot avatar
2. THE Chat Panel SHALL implement a modern, clean design with sharp edges and clear typography
3. THE Chat Panel SHALL use colors and styling consistent with the site's theme
4. THE Chat Panel SHALL include smooth animations for opening, closing, and message transitions
5. THE Chat Panel SHALL be fully responsive across all device sizes and orientations
