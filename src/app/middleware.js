import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Check if the pathname starts with /dashboard
  const isDashboardRoute = pathname.startsWith("/dashboard")

  // Get the token
  const token = await getToken({ req: request })

  // If it's a dashboard route and there's no token, redirect to login
  if (isDashboardRoute && !token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // If it's login/signup and there's a token, redirect to dashboard
  if ((pathname === "/login" || pathname === "/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
}
