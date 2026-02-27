import { useState, useEffect, useRef } from 'react';
import FloatingActionButton from './FloatingActionButton';
import ChatSidebar from './ChatSidebar';
import AIService from '../services/AIService';
import ContentExtractor from '../services/ContentExtractor';
import { nanoid } from 'nanoid';

const ChatFeature = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageContext, setPageContext] = useState('');
  
  const aiServiceRef = useRef(null);
  const contentExtractorRef = useRef(null);
  const fabRef = useRef(null);

  useEffect(() => {
    aiServiceRef.current = new AIService();
    contentExtractorRef.current = new ContentExtractor();
    
    try {
      const content = contentExtractorRef.current.extractContent();
      setPageContext(content);
    } catch (error) {
      console.error('Content extraction error:', error);
    }
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage({
        id: nanoid(),
        type: 'ai',
        content: 'Hi! I\'m Vikas 👋\n\nI can help you understand this page. Ask me anything!',
        timestamp: new Date(),
      });
    }
  }, [isOpen]);

  const openSidebar = () => setIsOpen(true);

  const closeSidebar = () => {
    setIsOpen(false);
    setTimeout(() => fabRef.current?.focus(), 300);
  };

  const clearChat = () => {
    setMessages([]);
    addMessage({
      id: nanoid(),
      type: 'ai',
      content: 'Hi! I\'m Vikas 👋\n\nI can help you understand this page. Ask me anything!',
      timestamp: new Date(),
    });
  };

  const addMessage = (message) => {
    setMessages(prev => {
      const newMessages = [...prev, message];
      return newMessages.length > 50 ? newMessages.slice(-50) : newMessages;
    });
  };

  const handleSendMessage = async (query) => {
    if (!query.trim()) return;

    const userMessage = {
      id: nanoid(),
      type: 'user',
      content: query,
      timestamp: new Date(),
    };
    addMessage(userMessage);

    setIsLoading(true);

    try {
      const conversationHistory = messages
        .filter(msg => msg.type === 'user' || msg.type === 'ai')
        .slice(-10);

      const response = await aiServiceRef.current.sendQuery({
        context: pageContext || 'No page content available.',
        query,
        conversationHistory,
      });

      const aiMessage = {
        id: nanoid(),
        type: response.isError ? 'error' : 'ai',
        content: response.content,
        followUpQuestions: response.followUpQuestions || [],
        timestamp: new Date(),
      };
      addMessage(aiMessage);
    } catch (error) {
      addMessage({
        id: nanoid(),
        type: 'error',
        content: 'An unexpected error occurred. Please try again.',
        followUpQuestions: [],
        timestamp: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FloatingActionButton 
        ref={fabRef}
        onClick={openSidebar} 
        isOpen={isOpen} 
      />
      <ChatSidebar
        isOpen={isOpen}
        onClose={closeSidebar}
        onClear={clearChat}
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};

export default ChatFeature;
