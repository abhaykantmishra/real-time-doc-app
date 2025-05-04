// client/lib/yjs-setup.js
import * as Y from 'yjs';
import { socket } from './socket';

// Create a Y.js document
export const ydoc = new Y.Doc();
export const ytext = ydoc.getText('content');

// Initialize syncing with the server
export function initYjsSync() {
  // Handle initial document state from server
  socket.on('sync-document', ({ initialState, awarenessStates }) => {
    Y.applyUpdate(ydoc, new Uint8Array(initialState));
    return { awarenessStates };
  });
  
  // Apply updates from the server
  socket.on('document-update', (update) => {
    Y.applyUpdate(ydoc, new Uint8Array(update));
  });
  
  // Listen for local changes and send to server
  ydoc.on('update', (update) => {
    socket.emit('document-update', Array.from(update));
  });
}