import { useEffect, useRef } from 'react';
import SidebarHeader from './SidebarHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatSidebar.css';

const ChatSidebar = ({ isOpen, onClose, onClear, messages, isLoading, onSendMessage }) => {
  const sidebarRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="chat-backdrop" onClick={onClose} aria-hidden="true" />
      
      <div 
        ref={sidebarRef}
        className={`chat-sidebar ${isOpen ? 'chat-sidebar--open' : ''}`}
        role="dialog"
        aria-label="Chat with page"
        aria-modal="true"
      >
        <SidebarHeader onClose={onClose} onClear={onClear} />
        <MessageList 
          messages={messages} 
          isLoading={isLoading}
          onQuestionClick={onSendMessage}
        />
        <MessageInput 
          ref={inputRef}
          onSend={onSendMessage} 
          disabled={isLoading} 
        />
      </div>
    </>
  );
};

export default ChatSidebar;
