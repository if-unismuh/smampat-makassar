"use client"

import { BookOpen } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

export function Logo() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Link href="/" className="flex items-center gap-2">
      <motion.div
        className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-school-blue text-white overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-school-blue to-school-blue-dark" />
        <BookOpen className="relative z-10 h-5 w-5" />
        <motion.div
          className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-school-gold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <div className="flex flex-col">
        <span className="text-sm font-bold leading-none text-school-blue dark:text-white">SMAM4</span>
        <span className="text-xs font-medium text-muted-foreground">MAKASSAR</span>
      </div>
    </Link>
  )
}
