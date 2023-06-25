import { useState } from 'react'
import './App.css'

const OPENAI_API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [prompt, setPrompt] = useState("")
  const [tweetSentiment, setTweetSentiment] = useState("");

  const APIBody = {
    "model": "text-davinci-003",
    "prompt": "What is the sentiment of this tweet? " + prompt,
    "temperature": 0,
    "max_tokens": 60,
    "top_p": 1.0,
    "frequency_penalty": 0.0,
    "presence_penalty": 0.0
  }

  async function callOpenAIAPI() {
    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data.choices[0].text);
      setTweetSentiment(data.choices[0].text);
    })
  }

  return (
    <div className="App">
      <h2 className="primary">Twitter: Positive or Negative? 🤔</h2>
      <div>
        <textarea
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Enter a tweet here!'
          cols={50} rows={10} />
      </div>

      <div>
        <button onClick={callOpenAIAPI} className="btn btn-primary">OpenAI API Call</button>
        {
          tweetSentiment !== "" ?
            <h4>Result: {tweetSentiment}</h4>
            : null
        }
      </div>
    </div>
  )
}

export default App
