import React from 'react';
import { ChatHeaderProps } from '../../types/chatbot';

/**
 * ChatHeader - Top bar with branding and close button
 */
const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <>
      <style>{`
        .louis-chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #0f0f0f;
          border-bottom: 1px solid #222;
          flex-shrink: 0;
        }

        .louis-chat-header-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .louis-chat-header-logo {
          width: 32px;
          height: 32px;
          object-fit: contain;
          border-radius: 8px;
        }

        .louis-chat-header-text {
          display: flex;
          flex-direction: column;
        }

        .louis-chat-header-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }

        .louis-chat-header-subtitle {
          font-size: 0.75rem;
          color: #888;
          margin: 0;
        }

        .louis-chat-header-close {
          background: transparent;
          border: 1px solid #333;
          border-radius: 6px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          color: #999;
        }

        .louis-chat-header-close:hover {
          background: #1a1a1a;
          border-color: #444;
          color: #fff;
        }

        .louis-chat-header-close:active {
          transform: scale(0.96);
        }
      `}</style>

      <div className="louis-chat-header">
        <div className="louis-chat-header-content">
          <img
            src="/ai bot.png"
            alt="Louis AI"
            className="louis-chat-header-logo"
          />
          <div className="louis-chat-header-text">
            <h2 className="louis-chat-header-title">Louis AI Assistant</h2>
            <p className="louis-chat-header-subtitle">
              Ask me anything about St. Louis Demo JHS
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="louis-chat-header-close"
          aria-label="Close chat"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default ChatHeader;
