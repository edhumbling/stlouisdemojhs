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
          padding: clamp(18px, 3vw, 26px);
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(17, 24, 39, 0.9));
          border-bottom: 1px solid rgba(148, 163, 184, 0.18);
          flex-shrink: 0;
          box-shadow: 0 12px 32px rgba(8, 12, 20, 0.45);
        }

        .louis-chat-header-content {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .louis-chat-header-logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
          border-radius: 14px;
          background: rgba(30, 41, 59, 0.65);
          padding: 6px;
          box-shadow: 0 12px 28px rgba(8, 12, 20, 0.35);
        }

        .louis-chat-header-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .louis-chat-header-title {
          font-size: clamp(1.1rem, 2.8vw, 1.45rem);
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
        }

        .louis-chat-header-subtitle {
          font-size: clamp(0.82rem, 2.2vw, 0.95rem);
          color: rgba(226, 232, 240, 0.7);
          margin: 0;
        }

        .louis-chat-header-close {
          background: rgba(51, 65, 85, 0.55);
          border: 1px solid rgba(148, 163, 184, 0.32);
          border-radius: 14px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #e2e8f0;
          box-shadow: 0 10px 26px rgba(8, 12, 20, 0.35);
        }

        .louis-chat-header-close:hover {
          background: rgba(59, 130, 246, 0.25);
          border-color: rgba(59, 130, 246, 0.45);
          transform: translateY(-2px);
        }

        .louis-chat-header-close:active {
          transform: scale(0.95);
        }

        @media (max-width: 768px) {
          .louis-chat-header {
            padding: 18px;
          }

          .louis-chat-header-logo {
            width: 36px;
            height: 36px;
          }
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
          <X size={20} />
        </button>
      </div>
    </>
  );
};

export default ChatHeader;
