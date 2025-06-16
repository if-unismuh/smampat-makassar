"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const contactInfo = [
    {
      icon: Phone,
      title: "Telepon",
      details: "+62 411 123456",
      action: "tel:+62411123456",
      actionText: "Hubungi Kami",
    },
    {
      icon: Mail,
      title: "Email",
      details: "smampatmuhammadiyah@gmail.com",
      action: "mailto:ppdb@smam4makassar.sch.id",
      actionText: "Kirim Email",
    },
    {
      icon: MapPin,
      title: "Alamat",
      details: "Jl Gagak, Lorong 4 No.4, Mariso, Kec. Mariso, Kota Makassar, Sulawesi Selatan 90121",
      action: "https://www.google.com/maps/place/SMA+Muhammadiyah+4/@-5.1606999,119.4080851,17z/data=!3m1!4b1!4m6!3m5!1s0x2dbf1d5d8c26f0e7:0x592f692b3ea94888!8m2!3d-5.1607052!4d119.41066!16s%2Fg%2F11c5s9674h?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D",
      actionText: "Lihat Peta",
    },
  ]

  return (
    <section ref={ref} className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Hubungi Kami</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Jika Anda memiliki pertanyaan lebih lanjut tentang penerimaan peserta didik baru, silakan hubungi kami melalui
          kontak berikut.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactInfo.map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <contact.icon size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
            <p className="text-gray-600 mb-4">{contact.details}</p>
            <a
              href={contact.action}
              className="inline-block px-4 py-2 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
              target={contact.icon === MapPin ? "_blank" : undefined}
              rel={contact.icon === MapPin ? "noopener noreferrer" : undefined}
            >
              {contact.actionText}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
