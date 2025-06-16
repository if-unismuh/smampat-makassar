"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, WifiOff } from "lucide-react"
import { Logo } from "@/components/logo"
import Link from "next/link"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, isOnline } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Check if online before attempting to sign in
    if (!isOnline) {
      setError("You're offline. Please check your internet connection and try again.")
      setIsLoading(false)
      return
    }

    try {
      // Client-side email validation
      if (email !== "smampatmuhammadiyah@gmail.com") {
        setError("Email tidak diizinkan")
        setIsLoading(false)
        return
      }

      const { error } = await signIn(email, password, rememberMe)

      if (error) {
        setError(error.message || "Login gagal. Silakan periksa kredensial Anda.")
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-school-blue-light via-white to-white px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-md space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4">
            <Logo />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">SMA Muhammadiyah 4 Makassar</h2>
          <p className="text-sm text-muted-foreground mt-2">Login untuk mengakses dashboard admin</p>
        </div>

        <Card className="border-school-blue/10 shadow-card">
          <CardHeader>
            <CardTitle>Login Admin</CardTitle>
            <CardDescription>Masukkan email dan password untuk mengakses dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {!isOnline && (
              <Alert variant="destructive" className="mb-4">
                <WifiOff className="h-4 w-4" />
                <AlertDescription>Anda sedang offline. Beberapa fitur mungkin tidak tersedia.</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="border-school-blue/20 focus:border-school-blue focus:ring-school-blue"
                  disabled={isLoading || !isOnline}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="border-school-blue/20 focus:border-school-blue focus:ring-school-blue"
                  disabled={isLoading || !isOnline}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  disabled={isLoading || !isOnline}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ingat saya
                </Label>
              </div>
              <motion.div
                whileHover={{ scale: isOnline && !isLoading ? 1.02 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-school-blue to-school-blue-dark hover:from-school-blue-dark hover:to-school-blue"
                  disabled={isLoading || !isOnline}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memproses...
                    </>
                  ) : !isOnline ? (
                    <>
                      <WifiOff className="mr-2 h-4 w-4" />
                      Offline
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Kembali ke{" "}
              <Link href="/" className="text-school-blue hover:underline">
                Beranda
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
