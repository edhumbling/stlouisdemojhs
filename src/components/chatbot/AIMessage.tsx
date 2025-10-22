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
          gap: 10px;
          align-items: flex-start;
        }

        .louis-ai-message-avatar {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .louis-ai-message {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .louis-ai-message-bubble {
          background: #1a1a1a;
          color: #e5e5e5;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 0.875rem;
          line-height: 1.6;
          word-wrap: break-word;
          border: 1px solid #2a2a2a;
        }

        .louis-ai-message-bubble strong {
          color: #fff;
          font-weight: 600;
        }

        .louis-ai-message-bubble em {
          color: #999;
          font-style: italic;
        }

        .louis-ai-sources {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          background: rgba(59, 130, 246, 0.08);
          border-radius: 6px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .louis-ai-sources-title {
          color: #999;
          font-weight: 600;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .louis-ai-source-link {
          color: #60a5fa;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-size: 0.75rem;
          font-weight: 500;
          transition: color 0.15s ease;
        }

        .louis-ai-source-link:hover {
          color: #93c5fd;
        }

        .louis-ai-message-time {
          font-size: 0.7rem;
          color: #666;
          padding-left: 2px;
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
