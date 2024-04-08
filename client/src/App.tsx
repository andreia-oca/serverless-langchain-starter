import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BackendService } from "@genezio-sdk/langchain-starter";
import "./App.css";

export default function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  async function askOpenAI() {
    setResponse(await BackendService.ask(question));
  }

  return (
    <>
      <div>
        <a href="https://genezio.com" target="_blank">
          <img
            src="https://raw.githubusercontent.com/Genez-io/graphics/main/svg/Logo_Genezio_White.svg"
            className="logo genezio light"
            alt="Genezio Logo"
          />
          <img
            src="https://raw.githubusercontent.com/Genez-io/graphics/main/svg/Logo_Genezio_Black.svg"
            className="logo genezio dark"
            alt="Genezio Logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Genezio + OpenAI = ❤️</h1>
      <div className="card">
        <input
          type="text"
          className="input-box"
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What's your question?"
        />
        <br />
        <br />

        <button onClick={() => askOpenAI()}>Get your answer</button>
        <p className="read-the-docs">{response}</p>
      </div>
    </>
  );
}
