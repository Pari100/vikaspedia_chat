import { useEffect, useRef } from 'react';
import Message from './Message';
import QuickQuestions from './QuickQuestions';
import FollowUpQuestions from './FollowUpQuestions';
import './MessageList.css';

const MessageList = ({ messages, isLoading, onQuestionClick }) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    console.log('Messages updated:', messages.map(m => ({
      type: m.type,
      hasFollowUp: !!m.followUpQuestions,
      followUpCount: m.followUpQuestions?.length || 0
    })));
  }, [messages]);

  const quickQuestions = [
    "What's the 2050 population?",
    "Which region grows most?",
    "Current global population?",
    "Tell me about urbanization"
  ];

  const showQuickQuestions = messages.length === 1 && messages[0].type === 'ai';

  return (
    <div 
      ref={listRef}
      className="message-list"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {messages.length === 0 && !isLoading && (
        <div className="message-list__empty">
          <p>Ask me anything about this page!</p>
        </div>
      )}
      
      {messages.map((message, index) => {
        const isFirstAIMessage = index === 0 && message.type === 'ai';
        const shouldShowQuickQuestions = isFirstAIMessage && showQuickQuestions;
        const shouldShowFollowUp = (message.type === 'ai' || message.type === 'error') && !isFirstAIMessage && message.followUpQuestions && message.followUpQuestions.length > 0;
        
        console.log(`Message ${index}:`, {
          type: message.type,
          isFirstAIMessage,
          shouldShowQuickQuestions,
          shouldShowFollowUp,
          followUpCount: message.followUpQuestions?.length || 0
        });
        
        return (
          <div key={message.id}>
            <Message message={message} />
            {shouldShowQuickQuestions && (
              <QuickQuestions 
                questions={quickQuestions}
                onQuestionClick={onQuestionClick}
              />
            )}
            {shouldShowFollowUp && (
              <FollowUpQuestions
                questions={message.followUpQuestions}
                onQuestionClick={onQuestionClick}
              />
            )}
          </div>
        );
      })}
      
      {isLoading && (
        <div className="message message--ai">
          <div className="message__content">
            <div className="message__loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
