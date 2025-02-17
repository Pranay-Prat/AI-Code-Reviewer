# AI Code Reviewer

An AI-powered code reviewer application that helps developers improve their code by providing instant feedback. The app supports multiple programming languages and uses the Google Gemini API for AI-powered analysis and code review.

## Features

- **Code Editor**: Use an interactive code editor to write or edit code in multiple programming languages.
- **Language Support**: The app supports a variety of languages including JavaScript, Python, Java, C++, C#, and Ruby.
- **AI-Powered Reviews**: Submit your code for review, and receive detailed feedback on best practices, performance, error detection, and more.
- **Loading State**: While the AI is processing the review, a "Reviewing your code..." message is shown to inform the user of the progress.
- **Syntax Highlighting**: Syntax highlighting is enabled for all supported programming languages, making it easier to read and understand your code.

## Tech Stack

- **Frontend**: React.js, React Simple Code Editor, Prism.js for syntax highlighting, Markdown for displaying AI reviews
- **Backend**: Google Gemini AI API (via `@google/generative-ai` package), Node.js
- **CSS**: Styled with custom CSS for an enhanced user experience

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **Google Gemini API Key**: You'll need a valid API key to access the Google Gemini service.

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Pranay-Prat/ai-code-reviewer.git
   cd ai-code-reviewer

2. Install backend dependencies:

   ```bash
   npm install

3. Set up environment variables:
Create a .env file in the root of your project and add the following:

   ```bash
   GOOGLE_GEMINI_KEY=your_google_gemini_api_key_here

4. Start the server

   ```bash
   npm start

### Frontend Setup

1. Navigate to the frontend directory (or wherever your React app is located).
   ```bash
   cd frontend

2. Install dependencies:
   ```bash
   npm install

3. Start the frontend server:
   ```bash
   npm start

Backend Explanation
-------------------

### Code Review Process

1.  **Frontend**: The frontend allows users to input code into a code editor. The user can choose the programming language and submit the code for review.
    
2.  **API Call**: When the user clicks the "Review" button, the frontend makes an API request to the backend (/ai/get-review).
    
3.  **Backend Service**: The backend uses the Google Gemini AI model to review the submitted code. It constructs a system instruction tailored for the specific programming language, and sends the request to Gemini.
    
4.  **Code Review**: The backend receives a response from Gemini and sends the AI-generated review back to the frontend.
    

### AI System Instruction

The backend service uses specific instructions for each language to ensure the AI model provides a comprehensive code review. These instructions include:

*   **Code Quality**: Ensures the code is clean and maintainable.
    
*   **Best Practices**: Suggests industry-standard coding practices.
    
*   **Error Detection**: Identifies potential errors, bugs, and security issues.
    
*   **Scalability**: Provides recommendations for making the code more scalable.
    
*   **Performance**: Suggests optimizations for better performance.
    

Each language has predefined good and bad example code snippets that help the AI provide better feedback.



