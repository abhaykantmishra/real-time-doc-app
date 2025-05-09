"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { FileText, ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would call your API to send a password reset email
      // For demo purposes, we'll just simulate a successful request
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "Check your email for a link to reset your password.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold">FunkyDocs</span>
          </Link>

          {!isSubmitted ? (
            <>
              <h1 className="text-2xl font-bold mb-2">Forgot your password?</h1>
              <p className="text-gray-500">No worries! Enter your email and we'll send you a reset link.</p>
            </>
          ) : (
            <>
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Mail className="h-8 w-8 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Check your email</h1>
              <p className="text-gray-500">
                We've sent a password reset link to <span className="font-medium">{email}</span>
              </p>
            </>
          )}
        </div>

        {!isSubmitted ? (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-purple-100 focus-visible:ring-purple-500"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? "Sending reset link..." : "Send reset link"}
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                The link will expire in 10 minutes. If you don't see the email, check your spam folder.
              </p>

              <Button variant="outline" className="w-full h-12" onClick={() => setIsSubmitted(false)}>
                Try a different email
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
