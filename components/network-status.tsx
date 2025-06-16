"use client"

import { useEffect, useState } from "react"
import { Wifi, WifiOff } from "lucide-react"
import { useNetworkState } from "@/lib/network-state"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

export function NetworkStatus() {
  const { isOnline } = useNetworkState()
  const [showOfflineAlert, setShowOfflineAlert] = useState(false)

  // Show the offline alert when the network goes offline
  useEffect(() => {
    if (!isOnline) {
      setShowOfflineAlert(true)
    } else {
      // Hide the alert after a delay when coming back online
      const timer = setTimeout(() => {
        setShowOfflineAlert(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOnline])

  return (
    <AnimatePresence>
      {showOfflineAlert && (
        <motion.div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <Alert variant={isOnline ? "default" : "destructive"} className="flex items-center gap-2 shadow-lg">
            {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            <AlertDescription>
              {isOnline
                ? "Connection restored. You're back online!"
                : "You're offline. Some features may be unavailable."}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
