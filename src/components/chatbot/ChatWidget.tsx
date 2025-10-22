import React from 'react';
import { ChatWidgetProps } from '../../types/chatbot';

/**
 * ChatWidget - Minimal floating button (just logo) on left side
 * Floats globally above all content with max z-index
 */
const ChatWidget: React.FC<ChatWidgetProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null; // Hide button when chat is open

  return (
    <>
      <style>{`
        @keyframes floatPulse {
          0%, 100% {
            transform: translateY(0) scale(1);
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
          }
          50% {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 8px 24px rgba(59, 130, 246, 0.6);
          }
        }

        .louis-chat-widget {
          position: fixed !important;
          left: 20px !important;
          bottom: 20px !important;
          z-index: 2147483647 !important;
          width: 56px !important;
          height: 56px !important;
          border-radius: 50% !important;
          border: none !important;
          background: transparent !important;
          cursor: pointer !important;
          display: block !important;
          padding: 0 !important;
          margin: 0 !important;
          animation: floatPulse 2.5s ease-in-out infinite !important;
          pointer-events: auto !important;
          transition: transform 0.2s ease !important;
        }

        .louis-chat-widget:hover {
          animation: none !important;
          transform: scale(1.1) !important;
          box-shadow: 0 12px 32px rgba(59, 130, 246, 0.5) !important;
        }

        .louis-chat-widget:active {
          transform: scale(0.95) !important;
        }

        .louis-chat-widget img {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          display: block !important;
          border-radius: 50% !important;
        }

        @media (max-width: 768px) {
          .louis-chat-widget {
            width: 52px !important;
            height: 52px !important;
            left: 16px !important;
            bottom: 16px !important;
          }
        }
      `}</style>
      <button
        onClick={onClick}
        className="louis-chat-widget"
        aria-label="Open Louis AI Assistant"
        type="button"
      >
        <img src="/ai bot.png" alt="Louis AI" />
      </button>
    </>
  );
};

export default ChatWidget;
