"use client";

import Tiptap from "./editor";
import { Navbar } from "./navbar";
import Toolbar from "@/components/toolbar";
import { Room } from "@/components/room";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import { useSession } from "next-auth/react";

export default function DocsPage() {

  const session = useSession();
  const user = session.data?.user
  
  const params = useParams();
  const docId = params.docId

  const [doc, setDoc] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isAccesstoCurrentUser, setIsAccesstoCurrentUser] = useState(false);

  async function fetchDoc(docId) {
    setLoading(true);
    try{
      await axios.get(`/api/v1/document/get-doc/${docId}`)
      .then((res) => {
        console.log(res.data.document);
        setDoc(res.data.document);
        const isaccess = handleAccesstoCurrentUser(res.data.document);
        console.log("isAccesstoCurrentUser: ", isaccess);
        setIsAccesstoCurrentUser(isaccess);
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

  function handleAccesstoCurrentUser(doc){
    console.log("userId:", user?.id , " owner: ", doc.owner);
    if(user.id === doc.owner){
      return true;
    }
    else if( doc?.sharedWith.some(person => person._id === user.id) === true ){
      return true;
    }
    else{
      return false;
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
    {
      isAccesstoCurrentUser === true ? (
        <>
        <div className="fixed top-0 z-50 w-full">
          <Navbar docDetail={doc} />
          <Toolbar docDetail={doc} />
        </div>
        <div className="mt-28">
          <Room currentUser={{name:user.name, image:user.image, color:"#FFA500"}}>
              <Tiptap docDetail={doc} />
          </Room>
        </div>
        </>
      ) : (
        <></>
      ) 
    }
    </>
  );
}
