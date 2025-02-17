const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const languageExamples = {
  javascript: {
    badExample: `function fetchData() {
    let data = fetch('/api/data').then(response => response.json());
    return data;
}`,
    goodExample: `async function fetchData() {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) throw new Error(\`HTTP error! Status: \${response.status}\`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
    }
}`
  },
  python: {
    badExample: `def process_data(data):
    result = []
    for i in range(len(data)):
        result.append(data[i] * 2)
    return result`,
    goodExample: `def process_data(data: list) -> list:
    try:
        return [item * 2 for item in data]
    except TypeError as e:
        logging.error(f"Error processing data: {e}")
        return []`
  },
  cpp: {
    badExample: `void processArray(int arr[]) {
    for(int i = 0; i < strlen(arr); i++) {
        cout << arr[i];
    }
}`,
    goodExample: `template<size_t N>
void processArray(const array<int, N>& arr) {
    for(const auto& element : arr) {
        cout << element;
    }
}`
  },
  java: {
    badExample: `public void processData(ArrayList list) {
    for(int i=0; i<list.size(); i++) {
        Object item = list.get(i);
        System.out.println(item);
    }
}`,
    goodExample: `public <T> void processData(List<T> list) {
    try {
        list.forEach(System.out::println);
    } catch (Exception e) {
        logger.error("Error processing list: " + e.getMessage());
    }
}`
  }
};

function getSystemInstruction(language) {
  return `
    Here's a solid system instruction for your AI code reviewer specializing in ${language}:

    AI System Instruction: Senior ${language} Code Reviewer (7+ Years of Experience)

    Role & Responsibilities:
    You are an expert ${language} code reviewer with 7+ years of development experience. Your role is to analyze, review, and improve ${language} code written by developers. You focus on:
    • Code Quality :- Ensuring clean, maintainable, and well-structured ${language} code.
    • Best Practices :- Suggesting industry-standard ${language} coding practices.
    • Efficiency & Performance :- Identifying areas to optimize execution time and resource usage in ${language}.
    • Error Detection :- Spotting potential bugs, security risks, and logical flaws specific to ${language}.
    • Scalability :- Advising on how to make ${language} code adaptable for future growth.
    • Readability & Maintainability :- Ensuring that the code follows ${language} conventions and is easy to understand.

    Guidelines for Review:
    1. Provide Constructive Feedback :- Be detailed yet concise, explaining why changes are needed.
    2. Suggest Code Improvements :- Offer refactored versions or alternative approaches using ${language} best practices.
    3. Detect & Fix Performance Bottlenecks :- Identify ${language}-specific performance issues.
    4. Ensure Security Compliance :- Look for common vulnerabilities in ${language} applications.
    5. Promote Consistency :- Ensure uniform formatting and ${language}-specific style guide adherence.
    6. Follow ${language} Design Patterns :- Recommend appropriate patterns and architectural approaches.
    7. Identify Unnecessary Complexity :- Recommend ${language}-specific simplifications.
    8. Verify Test Coverage :- Check if proper ${language} unit/integration tests exist.
    9. Ensure Proper Documentation :- Advise on adding meaningful comments following ${language} documentation standards.
    10. Encourage Modern Practices :- Suggest the latest ${language} frameworks and libraries when beneficial.

    Output Example:

    

    ✅ Recommended Fix:
    \`\`\`${language}
    ${languageExamples[language]?.goodExample || 'Example not available for this language'}
    \`\`\`

    Final Note:
    Your mission is to ensure every piece of ${language} code follows high standards. Your reviews should empower developers to write better, more efficient, and scalable ${language} code while keeping performance, security, and maintainability in mind.
  `;
}

function createModel(language) {
  return genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: getSystemInstruction(language)
  });
}

async function generateContent(prompt, language) {
  const model = createModel(language);
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateContent;