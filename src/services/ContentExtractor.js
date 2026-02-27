class ContentExtractor {
  constructor() {
    this.selector = '#mainContent';
    this.maxLength = 10000;
  }

  extractContent() {
    const element = document.querySelector(this.selector) || document.querySelector('body');
    
    if (!element) return '';

    const cloned = element.cloneNode(true);
    
    const excludeSelectors = ['nav', 'header', 'footer', 'script', 'style', '.sidebar'];
    excludeSelectors.forEach(selector => {
      cloned.querySelectorAll(selector).forEach(el => el.remove());
    });

    let text = cloned.innerText || cloned.textContent || '';
    
    text = text.replace(/  +/g, ' ');
    text = text.replace(/\n\n+/g, '\n\n');
    text = text.trim();

    if (text.length > this.maxLength) {
      text = text.substring(0, this.maxLength);
      const lastSpace = text.lastIndexOf(' ');
      if (lastSpace > 0) {
        text = text.substring(0, lastSpace);
      }
      text += '...';
    }

    return text;
  }
}

export default ContentExtractor;
