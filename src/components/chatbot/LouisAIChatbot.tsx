import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import ChatWidget from './ChatWidget';
import { ragEngine } from '../../services/ragEngine';

/**
 * LouisAIChatbot - Main chatbot component
 * Now redirects to dedicated page instead of opening panel
 * Uses React Portal to render outside the Layout DOM hierarchy
 */
const LouisAIChatbot: React.FC = () => {
  const navigate = useNavigate();

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
  }, []);

  /**
   * Navigate to dedicated chat page
   */
  const openChatPage = () => {
    navigate('/louis-ai');
  };

  // Render chatbot widget using portal to escape Layout DOM hierarchy
  return createPortal(
    <ChatWidget onClick={openChatPage} isOpen={false} />,
    document.body
  );
};

export default LouisAIChatbot;
