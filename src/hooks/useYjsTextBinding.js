// useYjsBinding.js
"use client";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export function useYjsBinding(roomName = "default-room") {
  const [doc, setDoc] = useState(null);
  const [text, setText] = useState("");
  const [provider, setProvider] = useState(null);
  const [status, setStatus] = useState("initializing");
  const [error, setError] = useState(null);

  // Initialize Yjs
  useEffect(() => {
    let yDoc;
    let wsProvider;
    let yText;

    try {
      // Create a new document
      yDoc = new Y.Doc();
      
      // Create a WebSocket provider with explicit options
      wsProvider = new WebsocketProvider("ws://localhost:1234", roomName, yDoc, {
        connect: true,
        maxBackoffTime: 5000
      });
      
      // Get the shared text
      yText = yDoc.getText("shared-text");
      
      // Set initial state
      setDoc(yDoc);
      setProvider(wsProvider);
      setText(yText.toString());
      
      // Handle connection status
      wsProvider.on('status', ({ status }) => {
        setStatus(status);
      });
      
      // Handle errors
      wsProvider.on('connection-error', (err) => {
        console.error("WebSocket connection error:", err);
        setError(err.message || "Connection error");
        setStatus("error");
      });
      
      // Set up observer for text changes
      const observer = () => {
        try {
          setText(yText.toString());
        } catch (err) {
          console.error("Error in text observer:", err);
          setError(err.message || "Observation error");
        }
      };
      
      yText.observe(observer);
      
      // Cleanup function
      return () => {
        try {
          yText.unobserve(observer);
          wsProvider.disconnect();
          wsProvider.destroy();
          yDoc.destroy();
        } catch (err) {
          console.error("Error cleaning up Yjs:", err);
        }
      };
    } catch (err) {
      console.error("Fatal Yjs initialization error:", err);
      setError(err.message || "Initialization error");
      setStatus("error");
      return () => {};
    }
  }, [roomName]);

  // Function to update the shared text
  const updateText = (newText) => {
    if (!doc) return;
    
    try {
      const yText = doc.getText("shared-text");
      doc.transact(() => {
        yText.delete(0, yText.length);
        yText.insert(0, newText);
      });
      setText(newText);
    } catch (err) {
      console.error("Error updating text:", err);
      setError(err.message || "Update error");
    }
  };

  // Function to reconnect
  const reconnect = () => {
    if (provider) {
      try {
        provider.disconnect();
        provider.connect();
        setStatus("connecting");
        setError(null);
      } catch (err) {
        console.error("Error reconnecting:", err);
        setError(err.message || "Reconnection error");
      }
    }
  };

  return {
    text,
    updateText,
    status,
    error,
    reconnect,
    isConnected: status === "connected"
  };
}