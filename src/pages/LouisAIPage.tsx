import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Message } from '../types/chatbot';
import ChatHeader from '../components/chatbot/ChatHeader';
import MessageList from '../components/chatbot/MessageList';
import ChatInput from '../components/chatbot/ChatInput';
import { ragEngine } from '../services/ragEngine';
import { geminiService } from '../services/geminiService';
import { chatStorage } from '../services/chatStorage';
import { EDUCATIONAL_KEYWORDS } from '../config/chatbot';
import { useNavigate } from 'react-router-dom';

/**
 * LouisAIPage - Dedicated full-screen page for Louis AI chatbot
 * Provides an immersive chat experience without the widget interface
 */
const LouisAIPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize RAG engine on mount
  useEffect(() => {
    const initializeRAG = async () => {
      try {
        await ragEngine.initialize();
        console.log('Louis AI Page initialized');
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
      
      // Extract source information for citations
      const contextSources = contextChunks.map(chunk => ({
        title: chunk.metadata.title || 'School Information',
        source: chunk.source || 'School Website',
        category: chunk.metadata.category || 'General',
      }));

      // Generate AI response with source information
      const aiResponse = await geminiService.generateResponse(
        content,
        context,
        messages,
        contextSources
      );

      // Create AI message with source citations
      const aiMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        metadata: {
          retrievedContext: context,
          sources: contextSources,
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
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  /**
   * Handle closing the page (navigate back)
   */
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>Louis AI - Your Educational Assistant | St. Louis Demo JHS</title>
        <meta name="description" content="Chat with Louis AI, your intelligent educational assistant for St. Louis Demonstration JHS. Get instant answers about academics, admissions, programs, and more." />
      </Helmet>

      <style>{`
        .louis-ai-page {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9999;
        }
      `}</style>

      <div className="louis-ai-page">
        <ChatHeader onClose={handleClose} />
        <MessageList 
          messages={messages} 
          isLoading={isLoading}
          onSuggestionClick={handleSendMessage}
        />
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </>
  );
};

export default LouisAIPage;
