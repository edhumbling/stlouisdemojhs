import React, { useState, useEffect, useCallback } from 'react';
import { Message } from '../../types/chatbot';
import ChatWidget from './ChatWidget';
import ChatPanel from './ChatPanel';
import { ragEngine } from '../../services/ragEngine';
import { geminiService } from '../../services/geminiService';
import { chatStorage } from '../../services/chatStorage';
import { EDUCATIONAL_KEYWORDS } from '../../config/chatbot';

/**
 * LouisAIChatbot - Main chatbot component
 * Coordinates between UI components and services
 */
const LouisAIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize RAG engine on mount
  useEffect(() => {
    const initializeRAG = async () => {
      try {
        await ragEngine.initialize();
        console.log('Louis AI Chatbot initialized');
      } catch (err) {
        console.error('Failed to initialize chatbot:', err);
      }
    };

    initializeRAG();

    // Load existing session
    const session = chatStorage.getCurrentSession();
    if (session.messages.length > 0) {
      setMessages(session.messages);
    }
  }, []);

  // Save messages to storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      const session = chatStorage.getCurrentSession();
      session.messages = messages;
      session.lastActivity = new Date();
      chatStorage.saveSession(session);
    }
  }, [messages]);

  /**
   * Check if query is educational
   */
  const isEducationalQuery = (query: string): boolean => {
    const queryLower = query.toLowerCase();
    return EDUCATIONAL_KEYWORDS.some(keyword => queryLower.includes(keyword));
  };

  /**
   * Handle sending a message
   */
  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Create user message
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Check if query is educational
      if (!isEducationalQuery(content)) {
        const redirectMessage: Message = {
          id: `msg-${Date.now()}-assistant`,
          role: 'assistant',
          content: `I'm here to help with educational topics related to St. Louis Demonstration JHS! 
          I can answer questions about our school, academics, admissions, programs, and learning resources. 
          How can I help you with your education today?`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, redirectMessage]);
        setIsLoading(false);
        return;
      }

      // Retrieve relevant context from RAG engine
      const contextChunks = await ragEngine.search(content, 5);
      const context = contextChunks.map(chunk => chunk.content);

      // Generate AI response
      const aiResponse = await geminiService.generateResponse(
        content,
        context,
        messages
      );

      // Create AI message
      const aiMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        metadata: {
          retrievedContext: context,
        },
      };

      // Add AI message to chat
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error generating response:', err);
      
      // Create error message
      const errorMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: (err as Error).message || 'I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setError((err as Error).message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  /**
   * Toggle chatbot open/closed
   */
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  /**
   * Close chatbot
   */
  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ChatWidget onClick={toggleChat} isOpen={isOpen} />
      <ChatPanel
        isOpen={isOpen}
        onClose={closeChat}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default LouisAIChatbot;
