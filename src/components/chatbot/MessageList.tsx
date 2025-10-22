import React, { useEffect, useRef } from 'react';
import { MessageListProps } from '../../types/chatbot';
import UserMessage from './UserMessage';
import AIMessage from './AIMessage';

/**
 * MessageList - Scrollable container displaying conversation history
 */
const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <>
      <style>{`
        .louis-message-list {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: #1a1a1a;
        }

        .louis-message-list::-webkit-scrollbar {
          width: 8px;
        }

        .louis-message-list::-webkit-scrollbar-track {
          background: #2a2a2a;
        }

        .louis-message-list::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }

        .louis-message-list::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }

        .louis-welcome-message {
          text-align: center;
          padding: 48px 24px;
          color: #a0a0a0;
        }

        .louis-welcome-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .louis-welcome-text {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .louis-welcome-suggestions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 400px;
          margin: 0 auto;
        }

        .louis-welcome-suggestion {
          background: #2a2a2a;
          border: 1px solid #333333;
          border-radius: 8px;
          padding: 12px 16px;
          text-align: left;
          color: #e0e0e0;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .louis-welcome-suggestion:hover {
          background: #333333;
          border-color: #3b82f6;
        }

        .louis-loading-indicator {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #2a2a2a;
          border-radius: 12px;
          max-width: fit-content;
        }

        .louis-loading-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: contain;
        }

        .louis-loading-dots {
          display: flex;
          gap: 4px;
        }

        .louis-loading-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3b82f6;
          animation: louisLoadingDot 1.4s ease-in-out infinite;
        }

        .louis-loading-dot:nth-child(1) {
          animation-delay: 0s;
        }

        .louis-loading-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .louis-loading-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes louisLoadingDot {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .louis-message-list {
            padding: 16px;
          }

          .louis-welcome-message {
            padding: 32px 16px;
          }

          .louis-welcome-title {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <div className="louis-message-list">
        {messages.length === 0 ? (
          <div className="louis-welcome-message">
            <h3 className="louis-welcome-title">👋 Welcome to Louis AI!</h3>
            <p className="louis-welcome-text">
              I'm here to help you learn about St. Louis Demonstration JHS.
              Ask me anything about our school, academics, admissions, or educational resources!
            </p>
            <div className="louis-welcome-suggestions">
              <div className="louis-welcome-suggestion">
                💡 What programs does St. Louis Demo JHS offer?
              </div>
              <div className="louis-welcome-suggestion">
                📚 Tell me about the academic curriculum
              </div>
              <div className="louis-welcome-suggestion">
                🎓 How can I apply for admission?
              </div>
              <div className="louis-welcome-suggestion">
                🏫 What makes St. Louis Demo JHS special?
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) =>
              message.role === 'user' ? (
                <UserMessage
                  key={message.id}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ) : (
                <AIMessage
                  key={message.id}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              )
            )}
          </>
        )}

        {isLoading && (
          <div className="louis-loading-indicator">
            <img
              src="/favicon-32x32.png"
              alt="Louis AI"
              className="louis-loading-avatar"
            />
            <div className="louis-loading-dots">
              <div className="louis-loading-dot"></div>
              <div className="louis-loading-dot"></div>
              <div className="louis-loading-dot"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default MessageList;
