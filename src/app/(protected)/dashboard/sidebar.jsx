"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Star, Clock, Trash, Settings, Users, HelpCircle, PlusCircle, ChevronDown } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile trigger - visible only on small screens */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <SidebarTrigger />
      </div>

      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <div className="p-2">
            <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>New Document</span>
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                    <Link href="/dashboard">
                      <FileText className="h-4 w-4" />
                      <span>My Documents</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/starred">
                      <Star className="h-4 w-4" />
                      <span>Starred</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/recent">
                      <Clock className="h-4 w-4" />
                      <span>Recent</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/trash">
                      <Trash className="h-4 w-4" />
                      <span>Trash</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center">
                  Folders
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {["Work", "Personal", "Projects", "Archive"].map((folder) => (
                      <SidebarMenuItem key={folder}>
                        <SidebarMenuButton asChild>
                          <Link href={`/dashboard/folders/${folder.toLowerCase()}`}>
                            <span>{folder}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>

          <SidebarGroup>
            <Collapsible className="group/collapsible">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center">
                  Shared with me
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {["Team Documents", "Client Proposals", "Shared Notes"].map((shared) => (
                      <SidebarMenuItem key={shared}>
                        <SidebarMenuButton asChild>
                          <Link href={`/dashboard/shared/${shared.toLowerCase().replace(/\s+/g, "-")}`}>
                            <span>{shared}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/team">
                  <Users className="h-4 w-4" />
                  <span>Team</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/help">
                  <HelpCircle className="h-4 w-4" />
                  <span>Help & Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  )
}
