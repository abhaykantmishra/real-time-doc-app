"use client"


import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { FileText, ArrowLeft, Check, Eye, EyeOff } from "lucide-react"

export default function ResetPasswordPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResetComplete, setIsResetComplete] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Password validation states
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  })

  // Validate password as user types
  const validatePassword = (value) => {
    setValidations({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
    })
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    validatePassword(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    // Check if all validations pass
    const allValid = Object.values(validations).every(Boolean)
    if (!allValid) {
      toast({
        title: "Password requirements not met",
        description: "Please ensure your password meets all the requirements.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would call your API to reset the password using the token
      // For demo purposes, we'll just simulate a successful request
      const token = params.token;
      console.log("token: ", token, " new password: ", password)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsResetComplete(true)
      toast({
        title: "Password reset successful",
        description: "Your password has been reset successfully.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later or request a new reset link.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginClick = () => {
    router.push("/login")
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

          {!isResetComplete ? (
            <>
              <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
              <p className="text-gray-500">Create a new password for your account</p>
            </>
          ) : (
            <>
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Password reset complete</h1>
              <p className="text-gray-500">Your password has been reset successfully</p>
            </>
          )}
        </div>

        {!isResetComplete ? (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="h-12 pr-10 border-purple-100 focus-visible:ring-purple-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-12 w-12 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 pr-10 border-purple-100 focus-visible:ring-purple-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-12 w-12 text-gray-400"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Password requirements:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${validations.length ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      <span className={validations.length ? "text-green-700" : "text-gray-500"}>
                        At least 8 characters
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${validations.uppercase ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      <span className={validations.uppercase ? "text-green-700" : "text-gray-500"}>
                        At least one uppercase letter
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${validations.lowercase ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      <span className={validations.lowercase ? "text-green-700" : "text-gray-500"}>
                        At least one lowercase letter
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${validations.number ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      <span className={validations.number ? "text-green-700" : "text-gray-500"}>
                        At least one number
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? "Resetting password..." : "Reset password"}
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="space-y-4">
              <p className="text-sm text-gray-500">You can now use your new password to log in to your account.</p>

              <Button
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
                onClick={handleLoginClick}
              >
                Go to login
              </Button>
            </div>
          </div>
        )}

        {!isResetComplete && (
          <div className="mt-6 text-center">
            <Link href="/login" className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
