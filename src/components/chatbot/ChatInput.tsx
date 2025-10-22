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
          padding: clamp(14px, 2.6vw, 24px);
          background: rgba(8, 12, 20, 0.95);
          border-top: 1px solid rgba(148, 163, 184, 0.18);
          flex-shrink: 0;
          box-shadow: 0 -12px 36px rgba(8, 12, 20, 0.6);
        }

        .louis-chat-input-inner {
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.22);
          border-radius: 22px;
          padding: clamp(12px, 2.4vw, 18px);
          display: flex;
          gap: 12px;
          align-items: flex-end;
          backdrop-filter: blur(8px);
        }

        .louis-chat-input-textarea {
          flex: 1;
          background: transparent;
          border: none;
          color: #e2e8f0;
          font-size: 1rem;
          font-family: inherit;
          line-height: 1.6;
          resize: none;
          min-height: 48px;
          max-height: 140px;
        }

        .louis-chat-input-textarea:focus {
          outline: none;
        }

        .louis-chat-input-textarea:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .louis-chat-input-textarea::placeholder {
          color: rgba(148, 163, 184, 0.55);
        }

        .louis-chat-input-button {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(37, 99, 235, 0.95));
          border: none;
          border-radius: 16px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #ffffff;
          flex-shrink: 0;
          box-shadow: 0 12px 26px rgba(37, 99, 235, 0.35);
        }

        .louis-chat-input-button:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 16px 36px rgba(37, 99, 235, 0.45);
        }

        .louis-chat-input-button:active:not(:disabled) {
          transform: scale(0.96);
        }

        .louis-chat-input-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .louis-chat-input-inner {
            border-radius: 18px;
            gap: 10px;
          }

          .louis-chat-input-button {
            width: 46px;
            height: 46px;
          }
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
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
