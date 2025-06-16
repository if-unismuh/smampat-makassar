import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { NetworkStatus } from "@/components/network-status"
import { Toaster } from "@/components/ui/toaster"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
    title: "SMAM 4 MAKASSAR",
    description:
      "SMAM 4 MAKASSAR (SMA Muhammadiyah 4 Makassar) adalah lembaga pendidikan yang berkomitmen untuk memberikan pendidikan berkualitas dengan nilai-nilai Islam.",
      generator: 'SMA Muhammadiyah 4 Makassar',
    keywords: [
      "SMAM 4 MAKASSAR",
      "SMA Muhammadiyah 4 Makassar",
      "Pendidikan Islam",
      "Sekolah Menengah Atas",
      "Sekolah Menengah Atas Muhammadiyah",
      "Sekolah Muhammadiyah",
      "Sekolah Menengah Atas Terbaik",
      "Sekolah Menengah Atas Terbaik di Makassar",
      "Sekolah Menengah Atas Terbaik di Indonesia",
      "Sekolah Menengah Atas Terbaik di Sulawesi Selatan",
    ]
  }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", spaceGrotesk.variable)}>
        <AuthProvider>
          <ThemeProvider defaultTheme="light" storageKey="smam4-theme">
            <div className="relative flex min-h-screen flex-col">
              {/* Only show header and footer on non-admin pages */}
              {!children.props?.childProp?.segment?.startsWith("admin") && <Header />}
              <main className="flex-1">{children}</main>
              {!children.props?.childProp?.segment?.startsWith("admin") && <Footer />}
              <NetworkStatus />
              <Toaster />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
