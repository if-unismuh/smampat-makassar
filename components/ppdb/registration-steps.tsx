"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ClipboardList, CreditCard, FileCheck, Users, GraduationCap, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "Pendaftaran Online",
    description: "Isi formulir pendaftaran secara online melalui website resmi sekolah.",
  },
  {
    icon: CreditCard,
    title: "Pembayaran Biaya Pendaftaran",
    description: "Lakukan pembayaran biaya pendaftaran melalui rekening yang telah ditentukan.",
  },
  {
    icon: FileCheck,
    title: "Verifikasi Berkas",
    description: "Unggah dokumen persyaratan dan tunggu verifikasi dari panitia.",
  },
  {
    icon: Users,
    title: "Tes dan Wawancara",
    description: "Ikuti tes potensi akademik dan wawancara sesuai jadwal yang ditentukan.",
  },
  {
    icon: CheckCircle,
    title: "Pengumuman Hasil",
    description: "Cek pengumuman hasil seleksi melalui website atau SMS.",
  },
  {
    icon: GraduationCap,
    title: "Daftar Ulang",
    description: "Lakukan daftar ulang bagi yang diterima sesuai dengan jadwal yang ditentukan.",
  },
]

export default function RegistrationSteps() {
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
        <h2 className="text-3xl font-bold mb-4">Langkah Pendaftaran</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ikuti langkah-langkah berikut untuk mendaftar sebagai calon peserta didik baru SMA Muhammadiyah 4 Makassar.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4">
                <step.icon size={20} />
              </div>
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm mr-3">
                  {index + 1}
                </span>
                <h3 className="font-bold">{step.title}</h3>
              </div>
            </div>
            <p className="text-gray-600 ml-12 pl-4">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
