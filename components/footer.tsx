"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import { motion } from "framer-motion"
import { Logo } from "@/components/logo"

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-school-blue to-school-blue-dark text-white">
      <div className="container px-4 sm:px-6 py-12 md:py-16">
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="space-y-4" variants={fadeIn}>
            <Logo />
            <p className="text-sm text-white/80 max-w-xs">
              SMA MUHAMMADIYAH 4 MAKASSAR adalah sekolah menengah atas yang berfokus pada pendidikan Islam modern dan
              berkualitas.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </motion.div>
          <motion.div variants={fadeIn}>
            <h3 className="text-lg font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-white/80 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-sm text-white/80 hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/program" className="text-sm text-white/80 hover:text-white transition-colors">
                  Program Sekolah
                </Link>
              </li>
              <li>
                <Link href="/berita" className="text-sm text-white/80 hover:text-white transition-colors">
                  Berita & Artikel
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-sm text-white/80 hover:text-white transition-colors">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-sm text-white/80 hover:text-white transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={fadeIn}>
            <h3 className="text-lg font-bold mb-4">Program</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/program#ipa" className="text-sm text-white/80 hover:text-white transition-colors">
                  Jurusan IPA
                </Link>
              </li>
              <li>
                <Link href="/program#ips" className="text-sm text-white/80 hover:text-white transition-colors">
                  Jurusan IPS
                </Link>
              </li>
              <li>
                <Link
                  href="/program#ekstrakurikuler"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Ekstrakurikuler
                </Link>
              </li>
              <li>
                <Link href="/program#unggulan" className="text-sm text-white/80 hover:text-white transition-colors">
                  Program Unggulan
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={fadeIn}>
            <h3 className="text-lg font-bold mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm text-white/80">
                <MapPin className="h-5 w-5 shrink-0 text-school-gold" />
                <span>Jl Gagak, Lorong 4 No.4, Mariso, Kec. Mariso, Kota Makassar, Sulawesi Selatan 90121</span>
              </li>
              <li className="flex gap-2 text-sm text-white/80">
                <Phone className="h-5 w-5 shrink-0 text-school-gold" />
                <span>(0411) 123-456</span>
              </li>
              <li className="flex gap-2 text-sm text-white/80">
                <Mail className="h-5 w-5 shrink-0 text-school-gold" />
                <span>smampatmuhammadiyah@gmail.com</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
      <div className="border-t border-white/10">
        <div className="container px-4 sm:px-6 py-6 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} SMA MUHAMMADIYAH 4 MAKASSAR. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
