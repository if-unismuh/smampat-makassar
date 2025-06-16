"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const timelineEvents = [
  {
    date: "1 Mei 2024",
    title: "Pembukaan Pendaftaran",
    description: "Pendaftaran dibuka secara online melalui website resmi sekolah.",
  },
  {
    date: "15 Mei - 15 Juni 2024",
    title: "Seleksi Berkas",
    description: "Verifikasi berkas pendaftaran dan seleksi administrasi.",
  },
  {
    date: "20 - 22 Juni 2024",
    title: "Tes Akademik & Wawancara",
    description: "Tes potensi akademik dan wawancara dengan calon siswa dan orang tua.",
  },
  {
    date: "25 Juni 2024",
    title: "Pengumuman Hasil Seleksi",
    description: "Pengumuman hasil seleksi melalui website dan SMS.",
  },
  {
    date: "26 - 30 Juni 2024",
    title: "Daftar Ulang",
    description: "Daftar ulang bagi siswa yang diterima.",
  },
  {
    date: "15 Juli 2024",
    title: "Masa Orientasi Siswa",
    description: "Pengenalan lingkungan sekolah untuk siswa baru.",
  },
]

export default function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Jadwal Penerimaan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Berikut adalah timeline lengkap proses penerimaan peserta didik baru SMA Muhammadiyah 4 Makassar untuk tahun
          ajaran 2024/2025.
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-blue-200"></div>

        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className={`md:w-1/2 p-4 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                  <h3 className="text-xl font-bold text-blue-600">{event.title}</h3>
                  <time className="text-sm font-semibold text-gray-500 block mb-2">{event.date}</time>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>

              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg z-10">
                {index + 1}
              </div>

              <div className="md:w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
