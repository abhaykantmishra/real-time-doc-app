"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Star, Clock, Folder, Grid3X3, List, Search, MoreHorizontalIcon, Globe } from 'lucide-react'
import { DashboardHeader } from "./header"
import { DashboardSidebar } from "./sidebar"
import { withAuthProtection } from "@/lib/auth-protector-hoc"
import { useEffect, useState } from "react"
import axios from "axios";

import { MoreHorizontal, Download, Trash, Share, Copy, Edit } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  // Mock data for documents
  // const recentDocs = [
  //   { id: 1, title: "Project Proposal", updatedAt: "Edited 2 hours ago", color: "purple" },
  //   { id: 2, title: "Meeting Notes", updatedAt: "Edited yesterday", color: "pink" },
  //   { id: 3, title: "Weekly Report", updatedAt: "Edited 3 days ago", color: "blue" },
  //   { id: 4, title: "Research Document", updatedAt: "Edited 5 days ago", color: "green" },
  //   { id: 5, title: "Marketing Plan", updatedAt: "Edited 1 week ago", color: "orange" },
  // ]

  // const starredDocs = [
  //   // { id: 2, title: "Meeting Notes", updatedAt: "Edited yesterday", color: "pink" },
  //   // { id: 5, title: "Marketing Plan", updatedAt: "Edited 1 week ago", color: "orange" },
  //   // { id: 6, title: "Product Roadmap", updatedAt: "Edited 2 weeks ago", color: "indigo" },
  // ]

  const [allUserDocs, setAllUserDocs] = useState([]);
  const [starredDocs, setStarredDocs] = useState([]);
  const [sharedDocs, setSharedDocs] = useState([]);


  useEffect(() => {
    getUserDocs()
    getStarredDocs()
    getSharedDocs()
  }, [])

  async function getUserDocs(){
    try {
      await axios.get("/api/v1/document/get-user-docs")
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          const docs = res.data.documents;
          // setRecentDocs(docs);
          setAllUserDocs(docs)
        }
      })
      .catch((err) => {
        console.error("Error fetching user documents:", err);
        // Handle error
      });
    } catch (error) {
      console.error("Error fetching user documents:", error);
    }
  }

  async function getStarredDocs(){
    try {
      await axios.get("/api/v1/document/get-starred-docs")
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          const docs = res.data.documents;
          // setRecentDocs(docs);
          setStarredDocs(docs)
        }
      })
      .catch((err) => {
        console.error("Error fetching user documents:", err);
        // Handle error
      });
    } catch (error) {
      console.error("Error fetching user documents:", error);
    }
  }

  async function getSharedDocs(){

  }

  async function createNewDocument(){
    try {
      await axios.post("/api/v1/document/create", { title: "Untitled Document" })
      .then((res) => {
        console.log(res.data);
        if (res.status === 201) {
          alert(res.data.msg)
          const newDoc = res.data.document;
          setAllUserDocs((prevDocs) => [...prevDocs, newDoc]);
          // setRecentDocs((prevDocs) => [...prevDocs, newDoc]);
        }
      })
      .catch((err) => {
        console.error("Error creating new document:", err);
        // Handle error
      })
    } catch (error) {
      console.error("Error creating new document:", error);
    }
  }

  async function toggleStarred(docId){
    try {
      await axios.post("/api/v1/document/toggle-starred", { docId })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          alert(res.data.msg)
          getStarredDocs();
        }

      })
      .catch((err) => {
        console.error("Error starring document:", err);
        // Handle error
      })
    } catch (error) {
      console.error("Error starring document:", error);
    }
  }

  async function duplicateDocument(docId){
    try {
      await axios.post("/api/v1/document/duplicate", { docId })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          alert(res.data.msg)
          getUserDocs();
        }
      })
      .catch((err) => {
        console.error("Error duplicating document:", err);
        // Handle error
      })
    } catch (error) {
      console.error("Error duplicating document:", error);
    }
  }

  async function makeDocPublic(docId){
    try {
      await axios.post("/api/v1/document/make-public", { docId })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          alert(res.data.msg)
        }
      })
      .catch((err) => {
        console.error("Error making document public:", err);
        // Handle error
      })
    } catch (error) {
      console.error("Error making document public:", error);
    }
  }

  async function deleteDocument(docId){
    try {
      await axios.post("/api/v1/document/delete", {  docId })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          alert(res.data.msg)
          getUserDocs();
        }
      })
      .catch((err) => {
        console.error("Error deleting document:", err);
        // Handle error
      })
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <div className="max-w-1/5">
        <DashboardSidebar />
        </div>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Create and manage your documents</p>
            </div>

            <div className="mb-8 flex flex-wrap items-center gap-4">
              <Button 
                onClick={createNewDocument}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
              >
                <Plus className="mr-2 h-4 w-4" /> New Document
              </Button>
              <Button variant="outline">
                <Folder className="mr-2 h-4 w-4" /> New Folder
              </Button>
              <div className="relative ml-auto flex-1 md:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search documents..."
                  className="h-10 w-full rounded-md border border-input bg-white pl-8 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="flex items-center gap-1 rounded-md border bg-white p-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="recent" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="recent" className="text-sm">
                  <Clock className="mr-2 h-4 w-4" /> Recent
                </TabsTrigger>
                <TabsTrigger value="starred" className="text-sm">
                  <Star className="mr-2 h-4 w-4" /> Starred
                </TabsTrigger>
              </TabsList>
              {/* Recent Document tab  */}
              <TabsContent value="recent" className="mt-0">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {allUserDocs.map((doc) => (
                      <Card key={doc._id} className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1">
                        <div
                          className={`h-1 w-full bg-${doc.color}-500`}
                          style={{
                            backgroundColor:
                              doc.color === "purple"
                                ? "#a855f7"
                                : doc.color === "pink"
                                ? "#ec4899"
                                : doc.color === "blue"
                                ? "#3b82f6"
                                : doc.color === "green"
                                ? "#22c55e"
                                : doc.color === "orange"
                                ? "#f97316"
                                : doc.color === "indigo"
                                ? "#6366f1"
                                : "#a855f7",
                          }}
                        ></div>
                        <CardContent className="p-4">
                          <div className="flex flex-row justify-between">
                            <Link href={`/docs/${doc._id || doc.id}`} className="mb-2 flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{doc.title}</span>
                            </Link>
                            <DropdownMenu key={doc._id}>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                  <span className="sr-only">Open options</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="cursor-pointer">
                                  <Link href={`/docs/${doc._id || doc.id}`} className="flex flex-row items-center">
                                  <Edit className="mr-4 h-4 w-4" />
                                  <span>Edit</span>
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={ () => {duplicateDocument(doc._id)} } className="cursor-pointer">
                                  <Copy className="mr-2 h-4 w-4" />
                                  <span>Duplicate</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => { doc.isStarred = !doc.isStarred;  toggleStarred(doc._id)}}>
                                  <Star className={`mr-2 h-4 w-4 ${doc.isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                                  <span>{doc.isStarred ? "Unstar" : "Star"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  if(doc.isPublic){
                                    navigator.clipboard.writeText(`${window.location.origin}/docs/${doc._id || doc.id}`);
                                    alert("Link copied to clipboard");
                                  }else{
                                    // Make document public
                                    doc.isPublic = true;
                                    makeDocPublic(doc._id);
                                  }
                                }} className="cursor-pointer">
                                  {doc.isPublic ? (
                                    <>
                                    <Copy className="mr-2 h-4 w-4" />
                                    <span className="flex flex-row items-center">Copy Link<Globe className="ml-2 h-4 w-4" /></span>
                                    </>
                                  ) : (
                                    <>
                                    <Globe className="mr-2 h-4 w-4" />
                                    <span>Make Public</span>
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer">
                                  <Download className="mr-2 h-4 w-4" />
                                  <span>Download</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => deleteDocument(doc._id)} className="cursor-pointer text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <p className="text-xs text-muted-foreground">Last updated {new Date(doc.updatedAt).toLocaleDateString()} - {new Date(doc.updatedAt).toLocaleTimeString()}</p>
                        </CardContent>
                      </Card>
                 
                  ))}
                  <Card className="flex h-[104px] flex-col items-center justify-center gap-1 border-dashed text-muted-foreground transition-all hover:border-purple-300 hover:bg-purple-50 hover:text-purple-500">
                    <Plus className="h-8 w-8" />
                    <span className="text-sm">Create new document</span>
                  </Card>
                </div>
              </TabsContent>

              {/* Starred Document tab  */}
              <TabsContent value="starred" className="mt-0">
                <div  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {
                    starredDocs.length  === 0 ? (
                      <Card className="flex h-[104px] flex-col items-center justify-center gap-1 border-dashed text-muted-foreground transition-all hover:border-purple-300 hover:bg-purple-50 hover:text-purple-500">
                        <Star className="h-8 w-8" />
                        <span className="text-sm">No starred documents</span>
                      </Card>
                     ) : (
                      starredDocs.map((doc) => (
                        <Link key={doc.id} href={`/document/${doc._id || doc.id}`}>
                          <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1">
                            <div
                              className={`h-1 w-full bg-${doc.color}-500`}
                              style={{
                                backgroundColor:
                                  doc.color === "purple"
                                    ? "#a855f7"
                                    : doc.color === "pink"
                                    ? "#ec4899"
                                    : doc.color === "blue"
                                    ? "#3b82f6"
                                    : doc.color === "green"
                                    ? "#22c55e"
                                    : doc.color === "orange"
                                    ? "#f97316"
                                    : doc.color === "indigo"
                                    ? "#6366f1"
                                    : "#a855f7",
                              }}
                            ></div>
                            <CardContent className="p-4">
                              <div className="mb-2 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{doc.title}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Last updated {new Date(doc.updatedAt).toLocaleDateString()} - {new Date(doc.updatedAt).toLocaleTimeString()}</p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))
                    )
                  }
                </div>
              </TabsContent>
            </Tabs>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Templates</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: "Blank", color: "from-purple-500 to-pink-500" },
                  { title: "Project Proposal", color: "from-blue-500 to-purple-500" },
                  { title: "Meeting Notes", color: "from-pink-500 to-orange-500" },
                  { title: "Weekly Report", color: "from-green-500 to-teal-500" },
                ].map((template, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1"
                  >
                    <div
                      className={`flex h-32 items-center justify-center bg-gradient-to-br ${template.color} p-4 text-white`}
                    >
                      <FileText className="h-12 w-12" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{template.title}</h3>
                      <p className="text-xs text-muted-foreground">Start with this template</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">Folders</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: "Work", count: 12 },
                  { title: "Personal", count: 8 },
                  { title: "Projects", count: 15 },
                  { title: "Archive", count: 24 },
                ].map((folder, index) => (
                  <Card
                    key={index}
                    className="transition-all hover:shadow-md hover:-translate-y-1"
                  >
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="rounded-full bg-purple-100 p-2">
                        <Folder className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{folder.title}</h3>
                        <p className="text-xs text-muted-foreground">{folder.count} documents</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

