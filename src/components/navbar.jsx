"use client"

import * as React from "react"
import { History, Star, MessageSquare, Lock, Video, FileEdit, Globe, User, Mail, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import axios from "axios"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"


const MenuItem = ({ label, children }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="px-2">
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar( {docDetail} ) {

  const [doc, setDoc] = React.useState(docDetail);
  const [documentTitle, setDocumentTitle] = React.useState(doc?.title || "Untitled Doc")
  const [isEditingTitle, setIsEditingTitle] = React.useState(false)
  const [isStarred, setIsStarred] = React.useState(false)
  const inputRef = React.useRef(null)

  const session = useSession();
  const user = session.data?.user

  const handleTitleClick = () => {
    setIsEditingTitle(true)
    // Focus the input after state update
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }, 0)
  }

  const handleTitleChange = (e) => {
    setDocumentTitle(e.target.value)

    setDoc((prev) => (
      {
        ...prev, 
        title:e.taget.value
      }
    ))
  }

  const handleTitleBlur = () => {
    setIsEditingTitle(false)
    if (documentTitle.trim() === "") {
      setDocumentTitle("Untitled document")
    }
  }

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false)
      if (documentTitle.trim() === "") {
        setDocumentTitle("Untitled document")
      }
    }
  }

  const toggleStar = async () => {
    setIsStarred(!isStarred)
    try {
      await axios.post("/api/v1/document/toggle-starred", { docId })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          alert(res.data.msg)
          // getStarredDocs();
        }
      })
      .catch((err) => {
        console.error("Error starring document:", err);
        // Handle error
        alert(err)
      })
    } catch (error) {
      console.error("Error starring document:", error);
      alert(error)
    }
  }

  return (
    <TooltipProvider >
      <div className="flex flex-col w-full bg-white print:hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <FileEdit className="h-6 w-6 text-blue-600" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {isEditingTitle ? (
                  <Input
                    ref={inputRef}
                    value={documentTitle}
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                    onKeyDown={handleTitleKeyDown}
                    className="h-7 py-0 text-base font-medium border-none focus-visible:ring-1"
                  />
                ) : (
                  <button onClick={handleTitleClick} className="text-base font-medium hover:bg-gray-100 rounded px-1">
                    {documentTitle}
                  </button>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleStar}>
                      <Star
                        className={cn("h-4 w-4", isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-400")}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isStarred ? "Remove star" : "Star"}</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="flex text-xs space-x-4 text-gray-600">
                <MenuItem label="File">
                    <DropdownMenuGroup>
                    <DropdownMenuItem>New</DropdownMenuItem>
                    {/* <DropdownMenuItem>Open</DropdownMenuItem> */}
                    <DropdownMenuItem>Make a copy</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Save</DropdownMenuItem>
                    {/* <DropdownMenuItem>Email</DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Print</DropdownMenuItem>
                    </DropdownMenuGroup>
                </MenuItem>
                <button className="hover:bg-gray-100 rounded px-1">
                    {`last saved ${doc?.updatedAt || "seconds ago"}`}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <History className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Version history</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Comments</p>
              </TooltipContent>
            </Tooltip>

            <Button variant="outline" size="sm" className="gap-1 rounded-full border-gray-300">
                {
                    doc?.isPublic === true ? (
                        <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard") }} className="flex justify-center items-center">
                            <Globe className="h-3.5 w-3.5 text-gray-500 mr-2" />
                            Copy Link
                        </button>
                    ) : (
                        <button className="flex justify-center items-center">
                            <Lock className="h-3.5 w-3.5 text-gray-500 mr-2" />
                            Share
                        </button>
                    )
                }
              
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image || ""} alt="User" />
                    <AvatarFallback className="bg-purple-100 text-purple-600">{user?.name?.at(0).toLocaleUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>{user?.name}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>{user?.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

      </div>
    </TooltipProvider>
  )
}
