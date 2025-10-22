import React, { useEffect } from 'react';
import { ChatPanelProps } from '../../types/chatbot';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

/**
 * ChatPanel - Full-screen overlay containing the chat interface
 * Slides in from the left with backdrop blur effect
 */
const ChatPanel: React.FC<ChatPanelProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  isLoading,
  error,
}) => {
  // Prevent body scrolling when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key to close panel
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .louis-chat-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10000;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: fadeIn 0.3s ease-out;
        }

        .louis-chat-panel {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 100%;
          max-width: 480px;
          background: #1f1f1f;
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          animation: slideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .louis-chat-overlay,
          .louis-chat-panel {
            animation: none;
          }
        }

        @media (max-width: 768px) {
          .louis-chat-panel {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="louis-chat-overlay" onClick={onClose}>
        <div className="louis-chat-panel" onClick={(e) => e.stopPropagation()}>
          <ChatHeader onClose={onClose} />
          <MessageList messages={messages} isLoading={isLoading} />
          <ChatInput onSend={onSendMessage} disabled={isLoading} />
        </div>
      </div>
    </>
  );
};

export default ChatPanel;
