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
          padding: 12px;
          background: #0a0a0a;
        }

        .louis-message-list::-webkit-scrollbar {
          width: 6px;
        }

        .louis-message-list::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        .louis-message-list::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 3px;
        }

        .louis-message-list::-webkit-scrollbar-thumb:hover {
          background: #444;
        }

        .louis-message-stream {
          max-width: 740px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .louis-welcome-message {
          text-align: center;
          padding: 24px 16px;
          color: #aaa;
        }

        .louis-welcome-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 8px;
        }

        .louis-welcome-text {
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .louis-welcome-suggestions {
          display: grid;
          gap: 8px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }

        .louis-welcome-suggestion {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 10px 12px;
          text-align: left;
          color: #ccc;
          font-size: 0.8rem;
          transition: all 0.15s ease;
        }

        .louis-welcome-suggestion:hover {
          background: #222;
          border-color: #3b82f6;
        }

        .louis-loading-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          max-width: fit-content;
        }

        .louis-loading-avatar {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          object-fit: contain;
        }

        .louis-loading-dots {
          display: flex;
          gap: 4px;
        }

        .louis-loading-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3b82f6;
          animation: dotBounce 1.2s ease-in-out infinite;
        }

        .louis-loading-dot:nth-child(1) { animation-delay: 0s; }
        .louis-loading-dot:nth-child(2) { animation-delay: 0.15s; }
        .louis-loading-dot:nth-child(3) { animation-delay: 0.3s; }

        @keyframes dotBounce {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 768px) {
          .louis-welcome-suggestions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="louis-message-list">
        <div className="louis-message-stream">
          {messages.length === 0 ? (
            <div className="louis-welcome-message">
              <h3 className="louis-welcome-title">👋 Welcome to Louis AI!</h3>
              <p className="louis-welcome-text">
                I'm here to help you explore St. Louis Demonstration JHS. Ask about academics, admissions, programs, facilities, or anything else!
              </p>
              <div className="louis-welcome-suggestions">
                <div className="louis-welcome-suggestion">💡 What makes St. Louis Demo JHS unique?</div>
                <div className="louis-welcome-suggestion">📚 Show me the subjects offered</div>
                <div className="louis-welcome-suggestion">🎓 How do I apply for admission?</div>
                <div className="louis-welcome-suggestion">🤖 Tell me about STEM programs</div>
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
                    sources={message.metadata?.sources}
                  />
                )
              )}
            </>
          )}

          {isLoading && (
            <div className="louis-loading-indicator">
              <img
                src="/ai bot.png"
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
      </div>
    </>
  );
};

export default MessageList;
