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
          padding: 12px;
          background: #0f0f0f;
          border-top: 1px solid #222;
          flex-shrink: 0;
        }

        .louis-chat-input-inner {
          max-width: 740px;
          margin: 0 auto;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 10px;
          padding: 8px 10px;
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .louis-chat-input-textarea {
          flex: 1;
          background: transparent;
          border: none;
          color: #e5e5e5;
          font-size: 0.875rem;
          font-family: inherit;
          line-height: 1.5;
          resize: none;
          min-height: 36px;
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

        .louis-chat-input-button {
          background: #2563eb;
          border: none;
          border-radius: 6px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          color: #fff;
          flex-shrink: 0;
        }

        .louis-chat-input-button:hover:not(:disabled) {
          background: #3b82f6;
        }

        .louis-chat-input-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        .louis-chat-input-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>

      <div className="louis-chat-input-container">
        <div className="louis-chat-input-inner">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about St. Louis Demo JHS..."
            disabled={disabled}
            className="louis-chat-input-textarea"
            aria-label="Chat message input"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className="louis-chat-input-button"
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
