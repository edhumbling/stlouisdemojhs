import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatWidgetProps } from '../../types/chatbot';

/**
 * ChatWidget - Hovering button that triggers the Louis AI Chatbot
 * Positioned on the left side of the viewport with green message icon
 * Responsive design: 70px (desktop), 64px (mobile)
 */
const ChatWidget: React.FC<ChatWidgetProps> = ({ onClick, isOpen }) => {
  return (
    <>
      <style>{`
        @keyframes louisPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4), 0 8px 40px rgba(0, 0, 0, 0.2);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 6px 30px rgba(16, 185, 129, 0.6), 0 10px 50px rgba(0, 0, 0, 0.3);
          }
        }

        .louis-chat-widget {
          position: fixed !important;
          left: 24px !important;
          bottom: 24px !important;
          z-index: 999999 !important;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4), 0 8px 40px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0;
          overflow: visible;
          animation: louisPulse 2s ease-in-out infinite;
          pointer-events: auto;
        }

        .louis-chat-widget:hover {
          animation: none;
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(16, 185, 129, 0.5), 0 10px 50px rgba(0, 0, 0, 0.3);
        }

        .louis-chat-widget:active {
          transform: scale(0.95);
        }

        .louis-chat-widget-icon {
          color: #ffffff;
          margin-bottom: 2px;
        }

        .louis-chat-widget-label {
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
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
            left: 20px !important;
            bottom: 20px !important;
            width: 66px;
            height: 66px;
          }

          .louis-chat-widget-label {
            font-size: 8.5px;
          }
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .louis-chat-widget {
            left: 16px !important;
            bottom: 16px !important;
            width: 64px;
            height: 64px;
          }

          .louis-chat-widget-label {
            font-size: 8px;
          }
        }
      `}</style>
      <button
        onClick={onClick}
        className="louis-chat-widget"
        aria-label="Open Louis AI Assistant"
        aria-expanded={isOpen}
      >
        <MessageCircle size={28} className="louis-chat-widget-icon" strokeWidth={2.5} />
        <span className="louis-chat-widget-label">Louis AI</span>
      </button>
    </>
  );
};

export default ChatWidget;
