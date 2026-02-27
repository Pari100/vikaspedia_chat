import { useState, forwardRef, useEffect, useRef } from 'react';
import './MessageInput.css';

const MessageInput = forwardRef(({ onSend, disabled }, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !disabled) {
      onSend(trimmedValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const isButtonDisabled = !inputValue.trim() || disabled;

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <textarea
        ref={ref}
        className="message-input__field"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type or use voice..."
        disabled={disabled}
        rows={1}
        aria-label="Message input"
      />
      <button
        type="button"
        className={'message-input__voice' + (isListening ? ' listening' : '')}
        onClick={toggleVoiceInput}
        disabled={disabled}
        aria-label="Voice input"
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          {isListening ? (
            <circle cx="12" cy="12" r="8" fill="#f44336" />
          ) : (
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
          )}
        </svg>
      </button>
      <button
        type="submit"
        className="message-input__send"
        disabled={isButtonDisabled}
        aria-label="Send message"
        title="Send"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </form>
  );
});

MessageInput.displayName = 'MessageInput';

export default MessageInput;