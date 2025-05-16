"use client";

import Tiptap from "./editor";
import { Navbar } from "./navbar";
import Toolbar from "@/components/toolbar";
import { Room } from "@/components/room";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function DocsPage() {
  
  const params = useParams();
  const docId = params.docId

  const [doc, setDoc] = useState({});
  const [isLoading, setLoading] = useState(false);

  async function fetchDoc(docId) {
    setLoading(true);
    try{
      await axios.get(`/api/v1/document/get-doc/${docId}`)
      .then((res) => {
        console.log(res.data.document);
        setDoc(res.data.document);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching document:", err);
        setLoading(false);
      })
    }
    catch (error) {
      console.error("Error fetching document:", error);
      setLoading(false);
    }
  }
  

  useEffect(() => {
    // console.log(docId);
    fetchDoc(docId);
  },[])

  if(isLoading){
    return (
      <div className="fixed top-0 z-50 w-full">
        Loading...
      </div>
    )
  }

  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <Navbar docDetail={doc} />
        <Toolbar docDetail={doc} />
      </div>
      <div className="mt-28">
        <Room>
            <Tiptap docDetail={doc} />
        </Room>
      </div>
    </>
  );
}
