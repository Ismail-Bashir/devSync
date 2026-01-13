import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const socket = io.connect("http://localhost:5000");

const Editor = ({ roomId }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("update-content", (newContent) => {
      setCode(newContent);
    });

    return () => socket.off("update-content");
  }, [roomId]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCode(newText);
    socket.emit("edit-content", { roomId, content: newText });
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white p-4 font-sans">
      {/* Editor Pane */}
      <div className="w-1/2 border-r border-gray-700 p-2">
        <h2 className="text-blue-400 font-bold mb-2">Code Editor</h2>
        <textarea
          className="w-full h-[90%] bg-gray-800 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          value={code}
          onChange={handleTextChange}
          placeholder="Start collaborating..."
        />
      </div>

      {/* Markdown Preview Pane */}
      <div className="w-1/2 p-2 overflow-y-auto">
        <h2 className="text-green-400 font-bold mb-2">Live Preview</h2>
        <div className="prose prose-invert max-w-none bg-gray-800 p-4 rounded-lg h-[90%]">
          <ReactMarkdown>{code}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Editor;
