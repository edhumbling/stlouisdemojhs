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
          padding: clamp(16px, 3vw, 32px);
          background: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08), transparent 45%),
                      radial-gradient(circle at 80% 0%, rgba(16, 185, 129, 0.08), transparent 42%),
                      rgba(10, 14, 22, 0.92);
        }

        .louis-message-list::-webkit-scrollbar {
          width: 10px;
        }

        .louis-message-list::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.35);
        }

        .louis-message-list::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.65), rgba(37, 99, 235, 0.85));
          border-radius: 999px;
        }

        .louis-message-list::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.85), rgba(29, 78, 216, 0.95));
        }

        .louis-message-stream {
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 2vw, 20px);
        }

        .louis-welcome-message {
          text-align: center;
          padding: clamp(32px, 6vw, 56px);
          color: rgba(226, 232, 240, 0.85);
          background: linear-gradient(145deg, rgba(37, 99, 235, 0.12), rgba(13, 148, 136, 0.1));
          border-radius: 24px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          box-shadow: 0 18px 48px rgba(15, 23, 42, 0.35);
        }

        .louis-welcome-title {
          font-size: clamp(1.4rem, 3vw, 1.8rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .louis-welcome-text {
          font-size: clamp(0.95rem, 2.2vw, 1.05rem);
          line-height: 1.7;
          margin-bottom: 28px;
        }

        .louis-welcome-suggestions {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .louis-welcome-suggestion {
          background: rgba(15, 23, 42, 0.55);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 16px;
          padding: 16px 18px;
          text-align: left;
          color: rgba(226, 232, 240, 0.92);
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .louis-welcome-suggestion:hover {
          background: rgba(30, 41, 59, 0.75);
          border-color: rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
        }

        .louis-loading-indicator {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          margin: 12px auto 0;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.22);
          border-radius: 14px;
          max-width: 220px;
          backdrop-filter: blur(6px);
        }

        .louis-loading-avatar {
          width: 30px;
          height: 30px;
          border-radius: 12px;
          object-fit: contain;
        }

        .louis-loading-dots {
          display: flex;
          gap: 6px;
        }

        .louis-loading-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.85);
          animation: louisLoadingDot 1.4s ease-in-out infinite;
        }

        .louis-loading-dot:nth-child(1) { animation-delay: 0s; }
        .louis-loading-dot:nth-child(2) { animation-delay: 0.18s; }
        .louis-loading-dot:nth-child(3) { animation-delay: 0.32s; }

        @keyframes louisLoadingDot {
          0%, 80%, 100% {
            opacity: 0.28;
            transform: scale(0.7);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .louis-message-list {
            padding: 18px 14px 20px;
          }

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
                I’m here to help you explore St. Louis Demonstration JHS. Ask about academics, admissions, programs, facilities, or anything else you’d like to discover!
              </p>
              <div className="louis-welcome-suggestions">
                <div className="louis-welcome-suggestion">💡 What makes St. Louis Demo JHS unique?</div>
                <div className="louis-welcome-suggestion">📚 Show me the subjects offered at the school.</div>
                <div className="louis-welcome-suggestion">🎓 How do I apply for admission?</div>
                <div className="louis-welcome-suggestion">🤖 Tell me about the STEM & robotics programs.</div>
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
