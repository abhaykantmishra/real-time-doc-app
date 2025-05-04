"use client";

import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Editor = () => {
  const [text, setText] = useState("");
  const editorRef = useRef(null);
  const socketRef = useRef(null); // 👈 useRef for socket

  useEffect(() => {
    socketRef.current = io("http://localhost:3001");

    // Receive the initial document
    socketRef.current.on("load-document", (docText) => {
      setText(docText);
    });

    // Listen for updates from others
    socketRef.current.on("receive-changes", (incomingText) => {
      setText(incomingText);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    if (socketRef.current) {
      socketRef.current.emit("send-changes", value);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <textarea
        ref={editorRef}
        value={text}
        onChange={handleChange}
        className="w-full h-96 p-4 border rounded resize-none font-mono text-sm"
        placeholder="Start typing..."
      />
    </div>
  );
};

export default Editor;
