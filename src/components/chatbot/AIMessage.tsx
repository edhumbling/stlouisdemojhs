import React from 'react';
import { AIMessageProps } from '../../types/chatbot';

/**
 * AIMessage - Display AI-generated responses with markdown support
 */
const AIMessage: React.FC<AIMessageProps> = ({ content, timestamp }) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // Simple markdown formatting
  const formatContent = (text: string) => {
    // Bold: **text** or __text__
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Italic: *text* or _text_
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Line breaks
    text = text.replace(/\n/g, '<br />');
    
    return text;
  };

  return (
    <>
      <style>{`
        .louis-ai-message-container {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 12px;
        }

        .louis-ai-message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: contain;
          flex-shrink: 0;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          padding: 6px;
        }

        .louis-ai-message {
          max-width: 70%;
          display: flex;
          flex-direction: column;
        }

        .louis-ai-message-bubble {
          background: #2a2a2a;
          color: #e0e0e0;
          padding: 12px 16px;
          border-radius: 16px 16px 16px 4px;
          font-size: 1rem;
          line-height: 1.6;
          word-wrap: break-word;
          border: 1px solid #333333;
        }

        .louis-ai-message-bubble strong {
          color: #ffffff;
          font-weight: 600;
        }

        .louis-ai-message-bubble em {
          color: #a0a0a0;
          font-style: italic;
        }

        .louis-ai-message-time {
          font-size: 0.75rem;
          color: #666666;
          margin-top: 4px;
          padding: 0 4px;
        }

        @media (max-width: 768px) {
          .louis-ai-message-avatar {
            width: 28px;
            height: 28px;
            padding: 5px;
          }

          .louis-ai-message {
            max-width: 85%;
          }

          .louis-ai-message-bubble {
            font-size: 0.9375rem;
            padding: 10px 14px;
          }
        }
      `}</style>

      <div className="louis-ai-message-container">
        <img
          src="/favicon-32x32.png"
          alt="Louis AI"
          className="louis-ai-message-avatar"
        />
        <div className="louis-ai-message">
          <div
            className="louis-ai-message-bubble"
            dangerouslySetInnerHTML={{ __html: formatContent(content) }}
          />
          <div className="louis-ai-message-time">{formatTime(timestamp)}</div>
        </div>
      </div>
    </>
  );
};

export default AIMessage;
