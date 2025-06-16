"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Users, BookOpen, Calendar, Settings, FileText, ImageIcon } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function Dashboard() {
  const { user, signOut } = useAuth()

  const adminMenuItems = [
    {
      title: "Manajemen Siswa",
      description: "Kelola data siswa dan pendaftaran",
      icon: <Users className="h-8 w-8 text-school-blue" />,
      link: "/admin/siswa",
    },
    {
      title: "Program Sekolah",
      description: "Kelola program dan kurikulum",
      icon: <BookOpen className="h-8 w-8 text-school-blue" />,
      link: "/admin/program",
    },
    {
      title: "Berita & Artikel",
      description: "Kelola konten berita dan artikel",
      icon: <FileText className="h-8 w-8 text-school-blue" />,
      link: "/admin/berita",
    },
    {
      title: "Galeri",
      description: "Kelola foto dan video kegiatan",
      icon: <ImageIcon className="h-8 w-8 text-school-blue" />,
      link: "/admin/galeri",
    },
    {
      title: "Jadwal Kegiatan",
      description: "Kelola jadwal dan agenda sekolah",
      icon: <Calendar className="h-8 w-8 text-school-blue" />,
      link: "/admin/jadwal",
    },
    {
      title: "Pengaturan",
      description: "Kelola pengaturan website",
      icon: <Settings className="h-8 w-8 text-school-blue" />,
      link: "/admin/pengaturan",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-school-blue-light/30 to-white">
      <header className="bg-white shadow-sm border-b border-school-blue/10">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-school-blue">Dashboard Admin</h1>
          <Button
            variant="outline"
            onClick={signOut}
            className="border-school-blue/30 text-school-blue hover:bg-school-blue hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <motion.div
          className="mb-8 p-6 bg-white rounded-xl shadow-card border border-school-blue/10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-xl font-semibold">Selamat Datang, Admin!</h2>
          <p className="text-muted-foreground mt-2">
            Anda telah login sebagai {user?.email}. Gunakan panel admin ini untuk mengelola konten website SMA
            MUHAMMADIYAH 4 MAKASSAR.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {adminMenuItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link href={item.link}>
                <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300 border-school-blue/10">
                  <CardHeader>
                    <div className="mb-2">{item.icon}</div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="p-0 text-school-blue">
                      Kelola &rarr;
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
