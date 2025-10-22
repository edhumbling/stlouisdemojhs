import React from 'react';
import { UserMessageProps } from '../../types/chatbot';

/**
 * UserMessage - Display user-sent messages
 */
const UserMessage: React.FC<UserMessageProps> = ({ content, timestamp }) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <>
      <style>{`
        .louis-user-message-container {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
        }

        .louis-user-message {
          max-width: 70%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .louis-user-message-bubble {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #ffffff;
          padding: 12px 16px;
          border-radius: 16px 16px 4px 16px;
          font-size: 1rem;
          line-height: 1.5;
          word-wrap: break-word;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .louis-user-message-time {
          font-size: 0.75rem;
          color: #666666;
          margin-top: 4px;
          padding: 0 4px;
        }

        @media (max-width: 768px) {
          .louis-user-message {
            max-width: 85%;
          }

          .louis-user-message-bubble {
            font-size: 0.9375rem;
            padding: 10px 14px;
          }
        }
      `}</style>

      <div className="louis-user-message-container">
        <div className="louis-user-message">
          <div className="louis-user-message-bubble">{content}</div>
          <div className="louis-user-message-time">{formatTime(timestamp)}</div>
        </div>
      </div>
    </>
  );
};

export default UserMessage;
