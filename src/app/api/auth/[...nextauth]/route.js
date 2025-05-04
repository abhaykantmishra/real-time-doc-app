import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is where you would typically verify against your database
        // For demo purposes, we'll just check for a demo account
        if (credentials?.email === "demo@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
            image: "/placeholder.svg?height=32&width=32",
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id 
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after sign in
      if (url.startsWith(baseUrl)) return `${baseUrl}/dashboard`
      // Redirect to requested url
      else if (new URL(url).origin === baseUrl) return url
      // Redirect to base url
      return baseUrl
    },
  },
  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST }
