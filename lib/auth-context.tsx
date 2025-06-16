"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import type { SupabaseClient, User } from "@supabase/supabase-js"
import { useNetworkState } from "@/lib/network-state"
import { useToast } from "@/hooks/use-toast"

// Create a wrapper for fetch to handle offline scenarios
const originalFetch = global.fetch
global.fetch = async (input, init) => {
  try {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      // If we're offline and this is an auth request, throw a specific error
      if (typeof input === "string" && input.includes("supabase.co/auth")) {
        throw new Error("OFFLINE")
      }
    }
    return await originalFetch(input, init)
  } catch (error) {
    if (error.message === "OFFLINE") {
      console.warn("Auth request attempted while offline")
      // Return a mock response for auth requests when offline
      return new Response(JSON.stringify({ error: "Offline mode" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      })
    }
    throw error
  }
}

type AuthContextType = {
  user: User | null
  supabase: SupabaseClient
  loading: boolean
  isOnline: boolean
  signIn: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<{
    error: any | null
    data: any | null
  }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { isOnline } = useNetworkState()
  const supabase = createClientComponentClient()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user || null)
      } catch (error) {
        console.error("Error getting session:", error)
        // If offline, try to get user from localStorage
        if (!isOnline) {
          const storedUser = localStorage.getItem("supabase.auth.user")
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser))
            } catch (e) {
              console.error("Error parsing stored user:", e)
            }
          }
        }
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)

      // Store user in localStorage for offline access
      if (session?.user) {
        localStorage.setItem("supabase.auth.user", JSON.stringify(session.user))
      } else {
        localStorage.removeItem("supabase.auth.user")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, isOnline])

  // Show a toast when network status changes
  useEffect(() => {
    if (!loading) {
      if (!isOnline) {
        toast({
          title: "You're offline",
          description: "Some features may be unavailable until you reconnect.",
          variant: "destructive",
        })
      } else if (user) {
        // Only show this if user is logged in to avoid confusion on initial load
        // toast({
        //   title: "You're back online",
        //   description: "All features are now available.",
        // })
      }
    }
  }, [isOnline, loading, toast, user])

  const signIn = async (email: string, password: string, rememberMe: boolean) => {
    // Check if online before attempting to sign in
    if (!isOnline) {
      return {
        error: { message: "You're offline. Please check your internet connection and try again." },
        data: null,
      }
    }

    // Check if the email is allowed
    if (email !== "smampatmuhammadiyah@gmail.com") {
      return { error: { message: "Email tidak diizinkan" }, data: null }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          // Set session expiry based on "Remember Me" option
          // 1 hour if not remembered, 30 days if remembered
          expiresIn: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60,
        },
      })

      if (!error && data?.user) {
        router.refresh()
        router.push("/admin/dashboard")
      }

      return { data, error }
    } catch (error) {
      console.error("Sign in error:", error)
      return {
        error: {
          message: isOnline
            ? "An unexpected error occurred. Please try again."
            : "You're offline. Please check your internet connection and try again.",
        },
        data: null,
      }
    }
  }

  const signOut = async () => {
    try {
      if (!isOnline) {
        toast({
          title: "You're offline",
          description: "Sign out will complete when you're back online.",
          variant: "destructive",
        })
        // We'll still clear local state
        setUser(null)
        localStorage.removeItem("supabase.auth.user")
        router.refresh()
        router.push("/")
        return
      }

      await supabase.auth.signOut()
      router.refresh()
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
      // If sign out fails due to network, still clear local state
      if (!isOnline) {
        setUser(null)
        localStorage.removeItem("supabase.auth.user")
        router.refresh()
        router.push("/")
      }
    }
  }

  const value = {
    user,
    supabase,
    loading,
    isOnline,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
