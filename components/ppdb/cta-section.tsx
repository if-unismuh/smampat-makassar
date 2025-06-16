"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 md:p-12"
      >
        <div className="absolute inset-0 bg-[url('/modern-school-students.png')] bg-cover bg-center opacity-10"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Menjadi Bagian dari SMA Muhammadiyah 4 Makassar?
          </h2>
          <p className="text-blue-100 max-w-2xl mb-8">
            Jangan lewatkan kesempatan untuk mendapatkan pendidikan berkualitas dengan fasilitas modern dan lingkungan
            belajar yang kondusif. Daftar sekarang dan wujudkan masa depan cerah bersama kami!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg hover:bg-blue-50 transition-colors"
            >
              Daftar Sekarang <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-950 transition-colors"
            >
              Pelajari Selengkapnya
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
