import { forwardRef } from 'react';
import './FloatingActionButton.css';

const FloatingActionButton = forwardRef(({ onClick, isOpen }, ref) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="fab__greeting">
          Hi! I'm Vikas 👋
        </div>
      )}
      
      <button
        ref={ref}
        className={`fab ${isOpen ? 'fab--hidden' : ''}`}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-label="Open chat with page"
        title="Chat with Page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="none"
          width="40"
          height="40"
          className="fab__robot"
        >
          <rect x="30" y="20" width="40" height="35" rx="8" fill="white" stroke="white" strokeWidth="3"/>
          <circle cx="42" cy="35" r="5" fill="#1976d2" className="fab__eye"/>
          <circle cx="58" cy="35" r="5" fill="#1976d2" className="fab__eye"/>
          <path d="M 40 45 Q 50 50 60 45" stroke="#1976d2" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <line x1="50" y1="20" x2="50" y2="12" stroke="white" strokeWidth="3"/>
          <circle cx="50" cy="10" r="4" fill="#ffeb3b" className="fab__antenna"/>
          <rect x="35" y="55" width="30" height="25" rx="5" fill="white" stroke="white" strokeWidth="3"/>
          <rect x="20" y="58" width="12" height="18" rx="4" fill="white" className="fab__arm-left"/>
          <rect x="68" y="58" width="12" height="18" rx="4" fill="white" className="fab__arm-right"/>
          <rect x="38" y="80" width="10" height="12" rx="3" fill="white"/>
          <rect x="52" y="80" width="10" height="12" rx="3" fill="white"/>
        </svg>
      </button>
    </>
  );
});

FloatingActionButton.displayName = 'FloatingActionButton';

export default FloatingActionButton;
