import React from 'react';
import { ChatWidgetProps } from '../../types/chatbot';

/**
 * ChatWidget - Hovering button that triggers the Louis AI Chatbot
 * Floats globally in the bottom-right corner on every page
 */
const ChatWidget: React.FC<ChatWidgetProps> = ({ onClick, isOpen }) => {
  return (
    <>
      <style>{`
        @keyframes louisPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 6px 28px rgba(59, 130, 246, 0.35), 0 12px 48px rgba(8, 12, 20, 0.55);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 10px 40px rgba(59, 130, 246, 0.55), 0 18px 60px rgba(8, 12, 20, 0.65);
          }
        }

        .louis-chat-widget {
          position: fixed !important;
          right: clamp(16px, 3vw, 28px) !important;
          bottom: clamp(16px, 3vh, 28px) !important;
          z-index: 2147483000 !important;
          width: 72px;
          height: 72px;
          border-radius: 20px;
          border: 1px solid rgba(59, 130, 246, 0.25);
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(30, 64, 175, 0.92));
          box-shadow: 0 6px 28px rgba(59, 130, 246, 0.35), 0 12px 48px rgba(8, 12, 20, 0.55);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          padding: 0;
          overflow: hidden;
          animation: louisPulse 2.6s ease-in-out infinite;
          pointer-events: auto;
        }

        .louis-chat-widget:hover {
          animation: none;
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 14px 42px rgba(59, 130, 246, 0.45), 0 26px 70px rgba(8, 12, 20, 0.7);
        }

        .louis-chat-widget:active {
          transform: scale(0.97);
        }

        .louis-chat-widget-icon {
          margin-bottom: 6px;
          filter: drop-shadow(0 4px 8px rgba(8, 12, 20, 0.35));
        }

        .louis-chat-widget-label {
          color: rgba(226, 232, 240, 0.92);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .louis-chat-widget {
            animation: none;
          }
        }

        /* Tablet styles */
        @media (max-width: 1024px) {
          .louis-chat-widget {
            right: clamp(16px, 4vw, 24px) !important;
            bottom: clamp(16px, 4vh, 24px) !important;
            width: 68px;
            height: 68px;
          }

          .louis-chat-widget-label {
            font-size: 9px;
          }
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .louis-chat-widget {
            width: 64px;
            height: 64px;
            border-radius: 18px;
          }

          .louis-chat-widget-label {
            font-size: 9px;
          }
        }
      `}</style>
      <button
        onClick={onClick}
        className="louis-chat-widget"
        aria-label="Open Louis AI Assistant"
        aria-expanded={isOpen}
      >
        <img 
          src="/ai bot.png" 
          alt="Louis AI" 
          className="louis-chat-widget-icon"
          style={{ width: '40px', height: '40px', objectFit: 'contain' }}
        />
        <span className="louis-chat-widget-label">Louis AI</span>
      </button>
    </>
  );
};

export default ChatWidget;
