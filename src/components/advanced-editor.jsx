"use client";
import React, { useRef, useEffect } from "react";
import { useYjsBinding } from "@/hooks/useYjsTextBinding";

export default function Editor() {
  const { text, updateText, status, error, reconnect } = useYjsBinding("my-room");
  const editorRef = useRef(null);

  // Sync the textarea with the text state
  useEffect(() => {
    if (editorRef.current && editorRef.current.value !== text) {
      editorRef.current.value = text;
    }
  }, [text]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div>
          Status: <span className={status === "connected" ? "text-green-600" : "text-red-600"}>{status}</span>
          {error && <p className="text-red-500 text-sm mt-1">Error: {error}</p>}
        </div>
        <button 
          onClick={reconnect}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Reconnect
        </button>
      </div>
      <textarea
        ref={editorRef}
        value={text}
        onChange={(e) => updateText(e.target.value)}
        className="w-full h-96 p-4 border rounded resize-none font-mono text-sm"
        placeholder="Start typing..."
      />
    </div>
  );
}