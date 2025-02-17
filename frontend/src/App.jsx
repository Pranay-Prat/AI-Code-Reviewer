import { useState } from 'react'
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-c"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-java"
import "prismjs/components/prism-ruby"

import Editor from "react-simple-code-editor"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1\n}`)
  const [review, setReview] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [loading, setLoading] = useState(false)

  const languages = [
    { id: 'javascript', name: 'JavaScript', initial: 'function example() {\n  return "Hello World";\n}' },
    { id: 'python', name: 'Python', initial: 'def example():\n    return "Hello World"' },
    { id: 'java', name: 'Java', initial: 'public class Example {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}' },
    { id: 'cpp', name: 'C++', initial: '#include <iostream>\n\nint main() {\n    std::cout << "Hello World";\n    return 0;\n}' },
    { id: 'csharp', name: 'C#', initial: 'public class Program {\n    public static void Main() {\n        Console.WriteLine("Hello World");\n    }\n}' },
    { id: 'ruby', name: 'Ruby', initial: 'def example\n  puts "Hello World"\nend' }
  ]

  async function reviewCode() {
    setLoading(true)  // Set loading state to true when the API call is made
    const response = await axios.post('http://localhost:3000/ai/get-review', { 
      code,
      language 
    })
    setReview(response.data)
    setLoading(false)  // Set loading state to false after receiving the response
  }

  function handleLanguageChange(e) {
    const newLanguage = e.target.value
    setLanguage(newLanguage)
    const selectedLang = languages.find(lang => lang.id === newLanguage)
    setCode(selectedLang.initial)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="language-selector">
            <select value={language} onChange={handleLanguageChange}>
              {languages.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => Prism.highlight(code, Prism.languages[language], language)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          {loading ? (
            <div className="loading-message">Reviewing your code...</div> 
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
          )}
        </div>
      </main>
    </>
  )
}

export default App
