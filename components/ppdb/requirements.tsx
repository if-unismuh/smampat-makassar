"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, FileText, FileCheck, FileSpreadsheet } from "lucide-react"

const requirements = [
  {
    icon: FileText,
    title: "Dokumen Pribadi",
    items: [
      "Fotokopi Akta Kelahiran",
      "Fotokopi Kartu Keluarga",
      "Fotokopi KTP Orang Tua/Wali",
      "Pas Foto berwarna 3x4 (4 lembar)",
    ],
  },
  {
    icon: FileCheck,
    title: "Dokumen Akademik",
    items: [
      "Fotokopi Ijazah SMP/MTs (legalisir)",
      "Fotokopi SKHUN SMP/MTs (legalisir)",
      "Fotokopi Raport SMP/MTs kelas 7-9",
      "Sertifikat prestasi (jika ada)",
    ],
  },
  {
    icon: FileSpreadsheet,
    title: "Administrasi",
    items: [
      "Formulir pendaftaran (diisi online)",
      "Bukti pembayaran biaya pendaftaran",
      "Surat keterangan sehat dari dokter",
      "Surat pernyataan orang tua/wali",
    ],
  },
]

export default function Requirements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section ref={ref} className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Persyaratan Pendaftaran</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Berikut adalah persyaratan yang harus disiapkan untuk mendaftar sebagai calon peserta didik SMA Muhammadiyah 4
          Makassar.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {requirements.map((req, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <req.icon size={24} />
              </div>
              <h3 className="text-xl font-bold">{req.title}</h3>
            </div>
            <ul className="space-y-3">
              {req.items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
