import React from 'react';
import { AIMessageProps } from '../../types/chatbot';
import { getUniqueSources } from '../../utils/pageMapping';

/**
 * AIMessage - Display AI-generated responses with markdown support and source citations
 */
const AIMessage: React.FC<AIMessageProps> = ({ content, timestamp, sources }) => {
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

  // Get unique sources for citation
  const uniqueSources = sources && sources.length > 0 ? getUniqueSources(sources) : [];

  return (
    <>
      <style>{`
        .louis-ai-message-container {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 16px;
        }

        .louis-ai-message-avatar {
          width: 42px;
          height: 42px;
          border-radius: 16px;
          object-fit: contain;
          background: rgba(30, 41, 59, 0.85);
          padding: 6px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.35);
        }

        .louis-ai-message {
          max-width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .louis-ai-message-bubble {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.92), rgba(17, 24, 39, 0.96));
          color: rgba(226, 232, 240, 0.96);
          padding: clamp(14px, 3vw, 18px) clamp(18px, 3.5vw, 24px);
          border-radius: 20px;
          font-size: 1.02rem;
          line-height: 1.75;
          word-wrap: break-word;
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.35);
          backdrop-filter: blur(4px);
        }

        .louis-ai-message-bubble strong {
          color: #ffffff;
          font-weight: 600;
        }

        .louis-ai-message-bubble em {
          color: rgba(148, 163, 184, 0.95);
          font-style: italic;
        }

        .louis-ai-sources {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(37, 99, 235, 0.12);
          border-radius: 14px;
          border: 1px solid rgba(59, 130, 246, 0.22);
          backdrop-filter: blur(6px);
        }

        .louis-ai-sources-title {
          color: rgba(191, 219, 254, 0.9);
          font-weight: 600;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-right: 6px;
        }

        .louis-ai-source-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #60a5fa;
          text-decoration: underline;
          text-underline-offset: 3px;
          font-size: 0.88rem;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .louis-ai-source-link::before {
          content: '↗';
          font-size: 0.75rem;
        }

        .louis-ai-source-link:hover {
          color: #93c5fd;
        }

        .louis-ai-message-time {
          font-size: 0.78rem;
          color: rgba(148, 163, 184, 0.6);
          margin-top: 2px;
          padding-left: 6px;
        }

        @media (max-width: 768px) {
          .louis-ai-message-container {
            gap: 12px;
          }

          .louis-ai-message-avatar {
            width: 36px;
            height: 36px;
            border-radius: 12px;
          }

          .louis-ai-message-bubble {
            font-size: 0.95rem;
            line-height: 1.65;
          }

          .louis-ai-source-link {
            font-size: 0.8rem;
          }
        }
      `}</style>

      <div className="louis-ai-message-container">
        <img
          src="/ai bot.png"
          alt="Louis AI"
          className="louis-ai-message-avatar"
        />
        <div className="louis-ai-message">
          <div
            className="louis-ai-message-bubble"
            dangerouslySetInnerHTML={{ __html: formatContent(content) }}
          />
          
          {/* Display source citations */}
          {uniqueSources.length > 0 && (
            <div className="louis-ai-sources">
              <div className="louis-ai-sources-title">📚 Sources:</div>
              {uniqueSources.map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  className="louis-ai-source-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${source.title} - ${source.category}`}
                >
                  {source.displayName}
                </a>
              ))}
            </div>
          )}

          <div className="louis-ai-message-time">{formatTime(timestamp)}</div>
        </div>
      </div>
    </>
  );
};

export default AIMessage;
