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
        @keyframes overlayFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .louis-chat-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 2147483646 !important;
          background: rgba(0, 0, 0, 0.75) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
          animation: overlayFade 0.2s ease-out !important;
          overflow: hidden !important;
        }

        .louis-chat-panel {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          background: #0a0a0a !important;
          display: flex !important;
          flex-direction: column !important;
          overflow: hidden !important;
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
