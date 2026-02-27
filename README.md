Chat with Page - ReactJS Project
=================================

This is a chatbot that answers questions about the page content using AI.

Tech Stack
----------
- React 19
- Vite
- Google Gemini API
- CSS

Setup
-----
1. Install dependencies:
   npm install

2. Get an API key from Google:
   - Visit https://makersuite.google.com/app/apikey
   - Sign in and create a new API key
   - Copy the key

3. Create a .env file in the root folder:
   VITE_AI_API_KEY=your_api_key_here

4. Run the app:
   npm run dev

How to Use
----------
Click the blue robot button in the bottom-right corner to open the chat.
Type your question and press Enter.
The AI will answer based on the page content.

Why Google Gemini?
------------------
I chose Google Gemini because:
- It's free (15 requests per minute)
- No credit card needed
- Easy to use
- Good for this project size

Features
--------
- Floating chat button
- Sidebar that slides in from the right
- AI answers based on page content
- Message history
- Voice input
- Mobile responsive

Project Structure
-----------------
src/
  components/     - All React components
  services/       - AI and content extraction
  App.jsx         - Main app
  main.jsx        - Entry point

Notes
-----
- The chat reads content from the #mainContent div
- History clears when you refresh the page
- Maximum 50 messages are stored
- API timeout is 30 seconds

Troubleshooting
---------------
If you get "Authentication failed", check your API key in .env
If you get "Too many requests", wait 1-2 minutes
If changes don't work, restart the dev server
