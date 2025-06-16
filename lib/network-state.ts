// Utility to track and handle network state
"use client"

import { useState, useEffect } from "react"

// Simple custom hook for network state
export function useNetworkState() {
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true)
  const [lastOnlineAt, setLastOnlineAt] = useState<Date | null>(null)

  useEffect(() => {
    // Handler for online status
    const handleOnline = () => {
      setIsOnline(true)
      setLastOnlineAt(new Date())
      console.log("🌐 Network connection restored")
    }

    // Handler for offline status
    const handleOffline = () => {
      setIsOnline(false)
      console.log("🔌 Network connection lost")
    }

    // Set up event listeners for online/offline events
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Clean up event listeners
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return { isOnline, lastOnlineAt }
}

// Helper function to handle fetch errors related to network connectivity
export async function safeFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  try {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      throw new Error("You are currently offline. Please check your internet connection.")
    }

    const response = await fetch(input, init)
    return response
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      // This is likely a network error
      throw new Error("Network error. Please check your internet connection.")
    }
    throw error
  }
}
