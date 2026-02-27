import './Message.css';

const Message = ({ message }) => {
  const { type, content, timestamp } = message;

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatContent = (text) => {
    if (type !== 'ai') return text;

    const lines = text.split('\n');
    const elements = [];
    let listItems = [];

    lines.forEach((line, index) => {
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        const listText = line.replace(/^[•\-]\s*/, '').trim();
        listItems.push(<li key={`li-${index}`}>{formatInlineStyles(listText)}</li>);
      } else {
        if (listItems.length > 0) {
          elements.push(<ul key={`ul-${elements.length}`} className="message__list">{listItems}</ul>);
          listItems = [];
        }
        
        if (line.trim()) {
          elements.push(
            <p key={`p-${index}`} className="message__paragraph">
              {formatInlineStyles(line)}
            </p>
          );
        }
      }
    });

    if (listItems.length > 0) {
      elements.push(<ul key={`ul-${elements.length}`} className="message__list">{listItems}</ul>);
    }

    return elements.length > 0 ? elements : text;
  };

  const formatInlineStyles = (text) => {
    const parts = [];
    let lastIndex = 0;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className={`message message--${type}`}>
      <div className="message__content">
        {type === 'ai' ? formatContent(content) : content}
      </div>
      <div className="message__timestamp">
        {formatTime(timestamp)}
      </div>
    </div>
  );
};

export default Message;
