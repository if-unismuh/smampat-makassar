"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Moon, Sun, User } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/lib/auth-context"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/tentang" },
  { name: "Program Sekolah", href: "/program" },
  { name: "Berita & Artikel", href: "/berita" },
  { name: "Galeri", href: "/galeri" },
  { name: "Kontak", href: "/kontak" },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-soft dark:bg-school-neutral-900/95" : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container px-4 sm:px-6 flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex gap-6">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-school-blue",
                pathname === item.href ? "text-school-blue dark:text-white" : "text-muted-foreground",
              )}
            >
              {pathname === item.href && (
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-school-blue dark:bg-white"
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mr-2"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <>
            <Button className="group relative overflow-hidden" size="sm" asChild>
              <Link href="/ppdb">
                <span className="relative z-10 flex items-center">
                  PPDB 2024
                  <motion.span
                    className="ml-1 inline-block"
                    animate={{ x: [0, 2, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 1,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-school-blue via-school-blue-dark to-school-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>

            {user ? (
              <Button className="group relative overflow-hidden ml-2" size="sm" asChild>
                <Link href="/admin/dashboard">
                  <span className="relative z-10 flex items-center">
                    Dashboard Admin
                    <motion.span
                      className="ml-1 inline-block"
                      animate={{ x: [0, 2, 0] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        duration: 1,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-school-blue via-school-blue-dark to-school-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="icon" className="rounded-full ml-2" asChild>
                <Link href="/login">
                  <User className="h-4 w-4" />
                  <span className="sr-only">Login</span>
                </Link>
              </Button>
            )}
          </>
        </div>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="rounded-xl">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-l-school-blue/20 w-[80%] sm:w-[350px]">
            <div className="grid gap-6 py-6">
              <Logo />
              <nav className="grid gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-school-blue",
                      pathname === item.href ? "text-school-blue dark:text-white" : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <div className="flex gap-2 w-full">
                  <Button className="flex-1" asChild>
                    <Link href="/ppd">PPDB 2024</Link>
                  </Button>
                  {user ? (
                    <Button className="flex-1" asChild>
                      <Link href="/admin/dashboard">Dashboard Admin</Link>
                    </Button>
                  ) : (
                    <Button variant="outline" size="icon" className="rounded-full" asChild>
                      <Link href="/login">
                        <User className="h-4 w-4" />
                        <span className="sr-only">Login</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
