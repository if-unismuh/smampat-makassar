"use client"

import { motion } from "framer-motion"

export function NewsHero() {
  return (
    <section className="bg-gradient-to-b from-school-blue/10 to-white py-12 md:py-24">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Berita & Artikel
          </motion.h1>
          <motion.p
            className="mt-4 text-base md:text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Informasi terkini seputar kegiatan dan prestasi SMA MUHAMMADIYAH 4 MAKASSAR
          </motion.p>
        </div>
      </div>
    </section>
  )
}
