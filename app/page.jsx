"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [link, setLink] = useState(
    "https://utfs.io/f/6e1b32d0-6ebf-4203-9b06-a02cbbf75ae3-twehpl.pdf"
  );
  const [text, setText] = useState("Output:");

  const fetchText = async () => {
    const res = await fetch(`api/pdf_text?url=${link}`);
    const data = await res.json();
    setText(data.text);
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
    </div>
  );
};

export default Page;
