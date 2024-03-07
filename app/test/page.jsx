"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [link, setLink] = useState(
    "https://utfs.io/f/6e1b32d0-6ebf-4203-9b06-a02cbbf75ae3-twehpl.pdf"
  );
  const [text, setText] = useState("Output:");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("response");
  const [isLoading, setIsLoading] = useState(false); // new state variable

  const fetchText = async () => {
    setIsLoading(true);
    const res = await fetch(`api/pdf_text?url=${link}`);
    const data = await res.json();
    setText(data.text);
    setIsLoading(false);
  };

  const fetchResponse = async () => {
    setIsLoading(true);
    const response = await fetch(
      `api/ask_ollama?question=${question}&pdf_content=${text}`
    );
    const data = await response.json();
    setResponse(data.result);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col p-8 gap-3">
      {/* input to link with link */}
      <input
        type="text"
        value={link}
        className="text-black rounded-md"
        onChange={(e) => setLink(e.target.value)}
      />
      {/* button to fetch text */}
      <button
        onClick={fetchText}
        className="bg-blue-500 text-white rounded-md p-2"
      >
        Fetch
      </button>
      <span>{text}</span>

      {/* input for question */}
      <input
        type="text"
        value={question}
        placeholder="Ask a question"
        className="text-black rounded-md"
        onChange={(e) => setQuestion(e.target.value)}
      />
      {/* button to ask question */}
      <button
        onClick={fetchResponse}
        className="bg-blue-500 text-white rounded-md p-2"
      >
        Ask
      </button>
      {isLoading ? <p>Loading...</p> : <pre>{response}</pre>}
    </div>
  );
};

export default Page;