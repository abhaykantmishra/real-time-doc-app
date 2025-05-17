"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

// import { Liveblocks } from "@liveblocks/node";

import { createClient } from "@liveblocks/client";

export function Room({ children }) {


    // const liveblocks = new Liveblocks({
    //   secret: process.env.LIVEBLOCKS_SECRET_KEY,
    // });

    const { docId } = useParams()
    const roomId = docId;

    const client = createClient({
      publicApiKey: "pk_dev_R7nc48q-hdxq0TdWuUcXvnYMu4SZv5Fnm1QQUJmbCbAlU6s4Jb12WA-3b2RnUKOL",
      userId: "user-123", // optional, useful for identification
      userInfo: {
        name: "Alice",       // Name you want to show
        color: "#FFA500",    // Cursor color
        avatar: "https://example.com/avatar.png" // Optional avatar
      },
    });

    // const session = liveblocks.prepareSession(
    //   "one@email.com",   // Required, user ID from your DB
    //   {
    //     // Optional, custom static metadata for the session
    //     userInfo: {
    //       name: "Marie",
    //       avatar: "https://example.com/avatar/marie.jpg",
    //     },
    //   }
    // );
    
  return (
    <LiveblocksProvider 
      publicApiKey={"pk_dev_R7nc48q-hdxq0TdWuUcXvnYMu4SZv5Fnm1QQUJmbCbAlU6s4Jb12WA-3b2RnUKOL"}
      client={client}
    >
      <RoomProvider id={roomId} client={client}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}