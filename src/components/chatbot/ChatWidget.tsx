import React from 'react';
import { ChatWidgetProps } from '../../types/chatbot';

/**
 * ChatWidget - Hovering button that triggers the Louis AI Chatbot
 * Positioned on the left side of the viewport with St. Louis favicon logo
 * Responsive design: 64px (desktop), 56px (mobile)
 */
const ChatWidget: React.FC<ChatWidgetProps> = ({ onClick, isOpen }) => {
  return (
    <>
      <style>{`
        @keyframes louisPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4), 0 8px 40px rgba(0, 0, 0, 0.2);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 6px 30px rgba(59, 130, 246, 0.6), 0 10px 50px rgba(0, 0, 0, 0.3);
          }
        }

        .louis-chat-widget {
          position: fixed;
          left: 24px;
          bottom: 24px;
          z-index: 9999;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4), 0 8px 40px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0;
          overflow: hidden;
          animation: louisPulse 2s ease-in-out infinite;
        }

        .louis-chat-widget:hover {
          animation: none;
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(59, 130, 246, 0.5), 0 10px 50px rgba(0, 0, 0, 0.3);
        }

        .louis-chat-widget:active {
          transform: scale(0.95);
        }

        .louis-chat-widget img {
          width: 36px;
          height: 36px;
          object-fit: contain;
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
            left: 20px;
            bottom: 20px;
            width: 60px;
            height: 60px;
          }

          .louis-chat-widget img {
            width: 34px;
            height: 34px;
          }
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .louis-chat-widget {
            left: 16px;
            bottom: 16px;
            width: 56px;
            height: 56px;
          }

          .louis-chat-widget img {
            width: 32px;
            height: 32px;
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
          src="/favicon-32x32.png"
          alt="Louis AI"
        />
      </button>
    </>
  );
};

export default ChatWidget;
