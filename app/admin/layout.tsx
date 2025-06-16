import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - SMA MUHAMMADIYAH 4 MAKASSAR",
  description: "Panel admin untuk mengelola website SMA MUHAMMADIYAH 4 MAKASSAR",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
