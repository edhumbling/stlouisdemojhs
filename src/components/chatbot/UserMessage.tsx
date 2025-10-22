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
        }

        .louis-user-message {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          max-width: 80%;
        }

        .louis-user-message-bubble {
          background: #2563eb;
          color: #fff;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 0.875rem;
          line-height: 1.5;
          word-wrap: break-word;
        }

        .louis-user-message-time {
          font-size: 0.7rem;
          color: #666;
          padding-right: 2px;
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
