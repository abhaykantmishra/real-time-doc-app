"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { FileText, Bell, Settings, User, LogOut, Menu, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export function DashboardHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const session = useSession();
  const user = session.data?.user

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {/* <Menu className="h-5 w-5" /> */}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="hidden font-bold md:inline-block">FunkyDocs</span>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-purple-500"></span>
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image} alt="User" />
                <AvatarFallback className="bg-purple-100 text-purple-600">{user.name.at(0).toLocaleUpperCase()}</AvatarFallback>
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
    </header>
  )
}
