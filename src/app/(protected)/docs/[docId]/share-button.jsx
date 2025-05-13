"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Copy, Globe, Link, Plus, Share2, Users } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import axios from "axios"

// type Person = {
//   id: string
//   name: string
//   email: string
//   permission: "edit" | "view"
//   avatarUrl?: string
// }

export function ShareButton({docDetails}) {

  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [publicPermission, setPublicPermission] = useState("view")
  const [newEmail, setNewEmail] = useState("")
  const [newPermission, setNewPermission] = useState("view")
  const [people, setPeople] = useState([
    {
      id: "1",
      name: "You",
      email: "you@example.com",
      avatarUrl: "/placeholder-user.jpg",
    },
  ])

  const getUserDetails = async (email) => {
    try {
      const res = await axios.post('/api/v1/user/get-user', { email });
      console.log(res.data?.user);
      return res.data.user;  
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const handleCopyLink = () => {
    // In a real app, this would copy the actual sharing link
    navigator.clipboard.writeText("https://example.com/document/share-link")
    setCopied(true)
    toast({
      title: "Link copied to clipboard",
      description: "Anyone with the link can now access this document",
    })

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleAddPerson = async () => {
    if (!newEmail){
        console.log("Please enter an email");
        return;
    }

    // Check if the email is already in the list
    const personExists = people.some((person) => person.email === newEmail)
    if (personExists) {
        console.log("Person already exists");
      toast({
        title: "Person already exists",
        description: "This person already has access to this document",
      })
      return
    }

    // Check in db
    const person = await getUserDetails(newEmail);
    console.log("Person: ", person);

    if( (!person) || (person === null)) {
      console.log("Person not found");
      toast({
        title: "Person not found",
        description: "This person doesn't exist",
        variant: "destructive",
      })
      return
    }


    // In a real app, you would validate the email and check if the user exists
    const newPerson = {
      id: person._id,
      name: person.name,
      email: person.email,
      image: person.image
    }

    setPeople([...people, newPerson])
    setNewEmail("")

    toast({
      title: "Person added",
      description: `${newEmail} can now access this document`,
    })
  }

  const handlePermissionChange = (personId, permission) => {
    setPeople(people.map((person) => (person.id === personId ? { ...person, permission } : person)))
  }

  const getShareLinkText = () => {
    if (!isPublic) return "Only people with access can open with the link"
    return publicPermission === "edit" ? "Anyone with the link can edit" : "Anyone with the link can view"
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Share2 className="h-4 w-4" />
        Share
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{`Share "${docDetails?.title}"`}</DialogTitle>
            <DialogDescription>Anyone with the link can access this document</DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="add-email" className="sr-only">
                Add people
              </Label>
              <div className="flex gap-2">
                <Input
                  id="add-email"
                  placeholder="Add people by email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" size="sm" disabled={!newEmail} onClick={handleAddPerson}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Separator className="my-4" />

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>{getShareLinkText()}</span>
                  </div>
                  <Switch checked={isPublic} onCheckedChange={setIsPublic} />
                </div>

                {isPublic && (
                  <RadioGroup
                    value={publicPermission}
                    onValueChange={(value) => setPublicPermission(value)}
                    className="ml-6 space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="view" id="view" />
                      <Label htmlFor="view">Viewer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="edit" id="edit" />
                      <Label htmlFor="edit">Editor</Label>
                    </div>
                  </RadioGroup>
                )}

                <div className="flex items-center gap-2 mt-4">
                  <Button variant="outline" className="flex-1 gap-2 justify-between" onClick={handleCopyLink}>
                    <div className="flex items-center gap-2">
                      <Link className="h-4 w-4" />
                      <span>Copy link</span>
                    </div>
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="text-sm text-muted-foreground">Advanced sharing options will appear here</div>
            </TabsContent>
          </Tabs>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">People with access</h3>
            </div>

            <div className="space-y-4">
              {people.map((person) => (
                <div key={person.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={person.image || "/placeholder.svg"} alt={person.name} />
                      <AvatarFallback>{person.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{person.name}</p>
                      <p className="text-xs text-muted-foreground">{person.email}</p>
                    </div>
                  </div>

                  {person.id === "1" ? (
                    <div className="text-sm text-muted-foreground">Owner</div>
                  ) : (
                    <Select
                      value={person.permission}
                      onValueChange={(value) => handlePermissionChange(person.id, value )}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">Viewer</SelectItem>
                        <SelectItem value="edit">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={() => setOpen(false)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
