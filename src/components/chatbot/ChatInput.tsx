import React, { useState, useRef, KeyboardEvent } from 'react';
import { ChatInputProps } from '../../types/chatbot';

/**
 * ChatInput - Text input area for user queries
 */
const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSend(trimmedMessage);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-expand textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <>
      <style>{`
        .louis-chat-input-container {
          padding: 20px;
          background: #0a0a0a;
          flex-shrink: 0;
        }

        .louis-chat-input-inner {
          max-width: 740px;
          margin: 0 auto;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 24px;
          padding: 12px 16px;
          display: flex;
          gap: 12px;
          align-items: center;
          transition: all 0.2s ease;
        }

        .louis-chat-input-inner:focus-within {
          border-color: #444;
          background: #1f1f1f;
        }

        .louis-chat-input-icon {
          color: #666;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .louis-chat-input-textarea {
          flex: 1;
          background: transparent;
          border: none;
          color: #e5e5e5;
          font-size: 0.95rem;
          font-family: inherit;
          line-height: 1.5;
          resize: none;
          min-height: 24px;
          max-height: 120px;
        }

        .louis-chat-input-textarea:focus {
          outline: none;
        }

        .louis-chat-input-textarea:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .louis-chat-input-textarea::placeholder {
          color: #666;
        }

        .louis-chat-input-search-btn {
          background: transparent;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
          color: #999;
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .louis-chat-input-search-btn:hover {
          background: #222;
          border-color: #444;
        }

        .louis-chat-input-button {
          background: transparent;
          border: none;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          color: #999;
          flex-shrink: 0;
          border-radius: 8px;
        }

        .louis-chat-input-button:hover:not(:disabled) {
          background: #222;
          color: #fff;
        }

        .louis-chat-input-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        .louis-chat-input-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .louis-chat-input-button.active {
          color: #3b82f6;
        }

        @media (max-width: 768px) {
          .louis-chat-input-search-btn {
            display: none;
          }
        }
      `}</style>

      <div className="louis-chat-input-container">
        <div className="louis-chat-input-inner">
          {/* Attachment Icon */}
          <div className="louis-chat-input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </div>

          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask the agent..."
            disabled={disabled}
            className="louis-chat-input-textarea"
            aria-label="Chat message input"
            rows={1}
          />

          {/* Search Button */}
          <button className="louis-chat-input-search-btn" aria-label="Search options">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span>Search</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className={`louis-chat-input-button ${message.trim() ? 'active' : ''}`}
            aria-label="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
