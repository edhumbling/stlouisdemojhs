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
        @keyframes louisOverlayFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes louisPanelPop {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .louis-chat-overlay {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 100000;
          background: linear-gradient(135deg, rgba(12, 18, 28, 0.95), rgba(8, 12, 20, 0.92));
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: louisOverlayFade 0.25s ease-out;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(12px, 3vw, 32px);
        }

        .louis-chat-panel {
          position: relative;
          width: min(960px, 100%);
          height: min(92vh, 860px);
          background: rgba(8, 12, 20, 0.92);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: clamp(0px, 2vw, 28px);
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.45);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: louisPanelPop 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (max-width: 1024px) {
          .louis-chat-panel {
            width: 95vw;
            height: 90vh;
          }
        }

        @media (max-width: 768px) {
          .louis-chat-overlay {
            padding: 0;
          }

          .louis-chat-panel {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
            border-left: none;
            border-right: none;
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
