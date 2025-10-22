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
          align-items: flex-start;
        }

        .louis-user-message {
          max-width: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .louis-user-message-bubble {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.92), rgba(59, 130, 246, 0.92));
          color: #ffffff;
          padding: clamp(13px, 3vw, 18px) clamp(18px, 3.5vw, 24px);
          border-radius: 20px;
          font-size: 1.02rem;
          line-height: 1.65;
          word-wrap: break-word;
          box-shadow: 0 16px 36px rgba(37, 99, 235, 0.32);
          border: 1px solid rgba(191, 219, 254, 0.22);
          max-width: min(720px, 100%);
        }

        .louis-user-message-time {
          font-size: 0.78rem;
          color: rgba(226, 232, 240, 0.55);
          padding-right: 8px;
        }

        @media (max-width: 768px) {
          .louis-user-message-bubble {
            font-size: 0.96rem;
            line-height: 1.6;
            padding: 12px 18px;
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
