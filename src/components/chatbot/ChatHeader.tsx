import React from 'react';
import { X } from 'lucide-react';
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
          padding: 24px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .louis-chat-header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .louis-chat-header-logo {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }

        .louis-chat-header-text {
          display: flex;
          flex-direction: column;
        }

        .louis-chat-header-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin: 0;
        }

        .louis-chat-header-subtitle {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          margin-top: 2px;
        }

        .louis-chat-header-close {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #ffffff;
        }

        .louis-chat-header-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .louis-chat-header-close:active {
          transform: scale(0.95);
        }

        @media (max-width: 768px) {
          .louis-chat-header {
            padding: 16px;
          }

          .louis-chat-header-title {
            font-size: 1.125rem;
          }

          .louis-chat-header-subtitle {
            font-size: 0.8125rem;
          }
        }
      `}</style>

      <div className="louis-chat-header">
        <div className="louis-chat-header-content">
          <img
            src="/favicon-32x32.png"
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
          <X size={20} />
        </button>
      </div>
    </>
  );
};

export default ChatHeader;
