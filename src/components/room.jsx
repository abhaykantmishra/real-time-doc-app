"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }) {
    const { docId } = useParams()
    const roomId = docId;
    
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_R7nc48q-hdxq0TdWuUcXvnYMu4SZv5Fnm1QQUJmbCbAlU6s4Jb12WA-3b2RnUKOL"}>
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}