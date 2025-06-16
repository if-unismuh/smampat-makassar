"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Kapan pendaftaran dibuka?",
    answer: "Pendaftaran dibuka mulai tanggal 1 Mei 2024 dan ditutup pada tanggal 30 Juni 2024.",
  },
  {
    question: "Berapa biaya pendaftaran?",
    answer:
      "Biaya pendaftaran sebesar Rp 300.000 yang dapat dibayarkan melalui transfer bank atau pembayaran langsung di sekolah.",
  },
  {
    question: "Apakah ada jalur prestasi?",
    answer:
      "Ya, kami menyediakan jalur prestasi untuk calon siswa yang memiliki prestasi akademik maupun non-akademik. Persyaratan khusus berlaku untuk jalur ini.",
  },
  {
    question: "Bagaimana tahapan seleksi yang dilakukan?",
    answer:
      "Tahapan seleksi meliputi seleksi berkas administrasi, tes potensi akademik, dan wawancara dengan calon siswa dan orang tua/wali.",
  },
  {
    question: "Apakah ada beasiswa yang tersedia?",
    answer:
      "Ya, kami menyediakan beasiswa untuk siswa berprestasi dan siswa dari keluarga kurang mampu. Informasi lebih lanjut dapat ditanyakan saat pendaftaran.",
  },
  {
    question: "Bagaimana cara mendaftar secara online?",
    answer:
      "Pendaftaran online dapat dilakukan melalui website resmi sekolah dengan mengisi formulir yang tersedia dan mengunggah dokumen yang diperlukan.",
  },
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section ref={ref} className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Pertanyaan Umum</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Berikut adalah jawaban untuk pertanyaan yang sering diajukan mengenai penerimaan peserta didik baru.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-4"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between rounded-lg bg-white p-4 text-left font-medium shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform ${
                  activeIndex === index ? "rotate-180 transform" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-b-lg border-x border-b p-4 text-gray-700">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
