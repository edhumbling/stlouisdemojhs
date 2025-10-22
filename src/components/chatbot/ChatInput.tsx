import React, { useState, useRef, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
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
          padding: 16px 24px;
          background: #1f1f1f;
          border-top: 1px solid #333333;
          flex-shrink: 0;
        }

        .louis-chat-input-wrapper {
          display: flex;
          gap: 12px;
          align-items: flex-end;
        }

        .louis-chat-input-textarea {
          flex: 1;
          background: #2a2a2a;
          border: 1px solid #333333;
          border-radius: 12px;
          padding: 12px 16px;
          color: #ffffff;
          font-size: 1rem;
          font-family: inherit;
          line-height: 1.5;
          resize: none;
          min-height: 48px;
          max-height: 120px;
          transition: border-color 0.2s ease;
        }

        .louis-chat-input-textarea:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .louis-chat-input-textarea:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .louis-chat-input-textarea::placeholder {
          color: #666666;
        }

        .louis-chat-input-button {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 12px;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #ffffff;
          flex-shrink: 0;
        }

        .louis-chat-input-button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .louis-chat-input-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        .louis-chat-input-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .louis-chat-input-container {
            padding: 12px 16px;
          }

          .louis-chat-input-textarea {
            font-size: 0.9375rem;
            padding: 10px 14px;
          }

          .louis-chat-input-button {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>

      <div className="louis-chat-input-container">
        <div className="louis-chat-input-wrapper">
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
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
