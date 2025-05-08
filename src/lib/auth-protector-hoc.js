// lib/withAuthProtection.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuthProtection(Component) {
  return function AuthProtected(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.replace("/login"); // Redirect to login if not authenticated
      }
    }, [status, router]);

    if (status === "loading") {
      return <div>Loading...</div>; // Show a loading state while checking session
    }

    if (status === "authenticated") {
      return <Component {...props} />;
    }

    return null; // This should never reach here if authenticated
  };
}
