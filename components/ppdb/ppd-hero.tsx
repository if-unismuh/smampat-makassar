"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Calendar, GraduationCap, Users } from "lucide-react"

export default function PPDHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollY = window.scrollY
      const opacity = Math.max(1 - scrollY / 500, 0)
      const translateY = scrollY * 0.3
      containerRef.current.style.opacity = opacity.toString()
      containerRef.current.style.transform = `translateY(${translateY}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
      <div
        className="absolute inset-0 bg-[url('/abstract-colorful-swirls.png')] bg-cover bg-center opacity-20"
        style={{ backgroundBlendMode: "overlay" }}
      />

      <div
        ref={containerRef}
        className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <GraduationCap size={60} className="mx-auto mb-4" />
          <h1 className="mb-2 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Penerimaan Peserta Didik Baru
          </h1>
          <h2 className="text-xl md:text-2xl">SMA Muhammadiyah 4 Makassar</h2>
          <p className="mt-4 text-lg md:text-xl">Tahun Ajaran 2024/2025</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-6"
        >
          <div className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
            <Calendar className="h-5 w-5" />
            <span>Pendaftaran: 1 Mei - 30 Juni 2024</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
            <Users className="h-5 w-5" />
            <span>Kuota Terbatas</span>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 rounded-full bg-white px-8 py-4 font-semibold text-blue-700 shadow-lg transition-all hover:bg-blue-50"
        >
          Daftar Sekarang
        </motion.button>
      </div>
    </div>
  )
}
