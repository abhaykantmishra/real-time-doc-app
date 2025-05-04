"use client";

import Tiptap from "@/components/editor";
import { Navbar } from "@/components/navbar";
import Toolbar from "@/components/toolbar";
import { Room } from "@/components/room";

export default function docsPage() {
  
  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
        <Toolbar />
      </div>
      <div className="mt-28">
        <Room>
            <Tiptap />
        </Room>
      </div>
    </>
  );
}
