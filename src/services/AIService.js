class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_AI_API_KEY;
    this.lastRequestTime = 0;
    this.minRequestInterval = 4000;
  }

  async sendQuery({ context, query, conversationHistory = [] }) {
    await this.waitForRateLimit();

    const historyText = conversationHistory
      .slice(-10)
      .map(msg => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const prompt = `You are a helpful page assistant. Your job is to answer questions STRICTLY based on the page content provided below. Do not use any external knowledge.

Page Content:
${context}

${historyText ? `Previous conversation:\n${historyText}\n` : ''}

User Question: ${query}

CRITICAL INSTRUCTIONS:
1. Answer ONLY using information from the page content above
2. If the user asks for "more detail" or "explain more", provide a comprehensive answer with all relevant details from the page
3. If the information is not in the page content, say "I don't have that information on this page"
4. Format your answer with:
   - Clear paragraphs
   - Use bullet points (•) for lists
   - Use **bold** for important numbers and key terms
5. FOLLOW-UP QUESTIONS: At the end, provide EXACTLY 2 concise follow-up questions that:
   - Directly relate to the answer you just provided
   - Help the user explore deeper into related information from the page
   - Are natural next questions the user is likely to ask
   - Are written as short, direct questions (8-15 words max)
   - Are based ONLY on information that exists in the page content

Response Format (MANDATORY):

[Your detailed answer here with proper formatting]

FOLLOW_UP_QUESTIONS:
- [First concise, contextual question]
- [Second concise, contextual question]

REMEMBER: Generate follow-up questions that are highly relevant to your answer and what the user would naturally want to know next. Do not use generic questions.`;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 800
          }
        })
      });

      if (response.status === 429) {
        return this.handleRateLimit();
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', response.status, errorData);
        return {
          content: `API Error: ${errorData.error?.message || 'Unknown error'}`,
          isError: true,
          followUpQuestions: []
        };
      }

      const data = await response.json();
      let aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

      console.log('Raw AI Response:', aiResponse);

      const parts = aiResponse.split('FOLLOW_UP_QUESTIONS:');
      const mainContent = parts[0].trim();
      let followUpQuestions = [];

      if (parts[1]) {
        const questions = parts[1]
          .split('\n')
          .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
          .map(line => line.replace(/^[-•]\s*/, '').trim())
          .filter(q => q.length > 0)
          .slice(0, 2);
        followUpQuestions.push(...questions);
      }

      const defaultQuestions = [
        "Can you explain this in more detail?",
        "What else is related to this topic?",
        "Are there any specific examples?",
        "What are the key points I should know?"
      ];

      while (followUpQuestions.length < 2) {
        followUpQuestions.push(defaultQuestions[followUpQuestions.length]);
      }

      console.log('Final follow-up questions (guaranteed 2):', followUpQuestions);

      return {
        content: mainContent,
        followUpQuestions: followUpQuestions,
        isError: false
      };
    } catch (error) {
      console.error('Full error:', error);
      return {
        content: 'Sorry, I encountered an error. Please try again.',
        isError: true,
        followUpQuestions: []
      };
    }
  }

  async waitForRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minRequestInterval - timeSinceLastRequest)
      );
    }
    
    this.lastRequestTime = Date.now();
  }

  handleRateLimit() {
    return {
      content: 'Too many requests. Please wait a moment and try again.',
      isError: true,
      followUpQuestions: []
    };
  }
}

export default AIService;
