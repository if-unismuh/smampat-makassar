"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, BookOpen, Calendar, ChevronRight, GraduationCap, Users } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { IM_Fell_Great_Primer_SC } from "next/font/google"

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

export default function Home() {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false)
        toast({
          title: "Pesan Terkirim",
          description: "Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.",
        })

        // Reset form
        const form = e.target as HTMLFormElement
        form.reset()
      }, 1500)
    }
  return (
    <div>
      {/* Hero Section - Modernized with asymmetric layout and 3D elements */}
      <section className="relative overflow-hidden bg-gradient-to-b from-school-blue-light via-white to-white pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="container relative z-10">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
            <motion.div
              className="flex flex-col justify-center space-y-4 lg:col-span-3"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <motion.div
                className="inline-flex items-center rounded-full border border-school-blue/20 bg-school-blue/10 px-3 py-1 text-sm text-school-blue"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="font-medium">Penerimaan Siswa Baru 2024/2025</span>
              </motion.div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                Pendidikan Islam{" "}
                <span className="text-school-blue bg-gradient-to-r from-school-blue to-school-blue-dark bg-clip-text text-transparent">
                  Modern
                </span>{" "}
                <span className="md:inline">dan </span>
                <span className="text-school-gold bg-gradient-to-r from-school-gold to-school-gold-dark bg-clip-text text-transparent">
                  Berkualitas
                </span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-base md:text-xl">
                Membentuk generasi unggul yang berakhlak mulia, berwawasan luas, dan siap menghadapi tantangan global.
              </p>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button size="lg" asChild className="group relative overflow-hidden rounded-xl w-full sm:w-auto">
                    <Link href="/program">
                      <span className="relative z-10 flex items-center">
                        Jelajahi Program
                        <motion.span
                          className="ml-1 inline-block"
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            duration: 1,
                            ease: "easeInOut",
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.span>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-school-blue via-school-blue-dark to-school-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="rounded-xl border-school-blue/30 w-full sm:w-auto"
                  >
                    <Link href="/kontak">Hubungi Kami</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="relative mx-auto lg:col-span-2 lg:mx-0 mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-school-blue-light to-white shadow-card">
                <Image
                  src="/modern-school-students.png"
                  alt="SMA MUHAMMADIYAH 4 MAKASSAR"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Stats badges - repositioned for better mobile display */}
              <div className="flex flex-wrap justify-center gap-4 mt-6 lg:justify-start lg:mt-0">
                <motion.div
                  className="rounded-xl bg-white p-4 shadow-card dark:bg-school-neutral-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-school-blue to-school-blue-dark text-white">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Siswa Aktif</p>
                      <p className="text-2xl font-bold">500+</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="rounded-xl bg-white p-4 shadow-card dark:bg-school-neutral-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-school-gold to-school-gold-dark text-white">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prestasi</p>
                      <p className="text-2xl font-bold">50+</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="mx-auto mb-10 md:mb-12 max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight sm:text-4xl">Keunggulan Kami</h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              SMA MUHAMMADIYAH 4 MAKASSAR menawarkan pendidikan berkualitas dengan berbagai keunggulan
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <BookOpen className="h-10 w-10" />,
                title: "Kurikulum Terintegrasi",
                description:
                  "Memadukan kurikulum nasional dengan nilai-nilai Islam untuk pendidikan yang komprehensif.",
              },
              {
                icon: <GraduationCap className="h-10 w-10" />,
                title: "Tenaga Pengajar Profesional",
                description:
                  "Guru-guru berpengalaman dan berkualifikasi tinggi yang berdedikasi pada perkembangan siswa.",
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Lingkungan Kondusif",
                description: "Suasana belajar yang nyaman, aman, dan mendukung perkembangan akademik dan karakter.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full transition-all hover:shadow-card rounded-2xl border-school-blue/10 dark:border-school-blue/5">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-school-blue-light to-school-blue/30 text-school-blue dark:from-school-blue/20 dark:to-school-blue/10 dark:text-white">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="bg-gradient-to-br from-school-neutral-50 to-white py-12 md:py-24 dark:from-school-neutral-900 dark:to-school-neutral-800">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="mx-auto mb-10 md:mb-12 max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight sm:text-4xl">Program Unggulan</h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Berbagai program pendidikan yang dirancang untuk mengembangkan potensi siswa secara maksimal
            </p>
          </motion.div>
          <Tabs defaultValue="jurusan" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-3 rounded-xl p-1 mb-4">
              <TabsTrigger value="jurusan" className="rounded-lg text-xs sm:text-sm">
                Jurusan
              </TabsTrigger>
              <TabsTrigger value="ekstrakurikuler" className="rounded-lg text-xs sm:text-sm">
                Ekstrakurikuler
              </TabsTrigger>
              <TabsTrigger value="unggulan" className="rounded-lg text-xs sm:text-sm">
                Program Khusus
              </TabsTrigger>
            </TabsList>
            <TabsContent value="jurusan" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full rounded-2xl overflow-hidden border-school-blue/10 shadow-card">
                    <CardHeader>
                      <CardTitle>Jurusan IPA</CardTitle>
                      <CardDescription>Fokus pada ilmu alam dan eksakta</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Program yang menekankan pada penguasaan ilmu-ilmu alam seperti Fisika, Kimia, Biologi, dan
                        Matematika.
                      </p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-school-blue" />
                          <span>Laboratorium lengkap</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-school-blue" />
                          <span>Praktikum rutin</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-school-blue" />
                          <span>Persiapan olimpiade sains</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="group rounded-lg border-school-blue/30">
                        <Link href="/program#ipa" className="flex items-center">
                          Selengkapnya
                          <motion.span
                            className="ml-1 inline-block"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full rounded-2xl overflow-hidden border-school-blue/10 shadow-card">
                    <CardHeader>
                      <CardTitle>Jurusan IPS</CardTitle>
                      <CardDescription>Fokus pada ilmu sosial dan humaniora</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Program yang menekankan pada penguasaan ilmu-ilmu sosial seperti Ekonomi, Sosiologi, Geografi,
                        dan Sejarah.
                      </p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-school-blue" />
                          <span>Studi kasus sosial</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-school-blue" />
                          <span>Kunjungan lapangan</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-school-blue" />
                          <span>Pengembangan keterampilan analitis</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="group rounded-lg border-school-blue/30">
                        <Link href="/program#ips" className="flex items-center">
                          Selengkapnya
                          <motion.span
                            className="ml-1 inline-block"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
            <TabsContent value="ekstrakurikuler" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: "Tapak Suci",
                    description: "Seni bela diri khas Muhammadiyah yang mengajarkan kedisiplinan dan ketangkasan.",
                  },
                  {
                    title: "Hizbul Wathan",
                    description: "Gerakan kepanduan Islam yang mengembangkan jiwa kepemimpinan dan kemandirian.",
                  },
                  {
                    title: "Klub Sains",
                    description: "Wadah bagi siswa untuk mengembangkan minat dan bakat di bidang sains dan teknologi.",
                  },
                  {
                    title: "English Club",
                    description: "Pengembangan kemampuan berbahasa Inggris melalui berbagai kegiatan interaktif.",
                  },
                  {
                    title: "Klub Olahraga",
                    description: "Berbagai cabang olahraga untuk mengembangkan kebugaran dan sportivitas.",
                  },
                  {
                    title: "Seni & Budaya",
                    description:
                      "Pengembangan bakat seni dan pelestarian budaya lokal melalui berbagai kegiatan kreatif.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Card className="h-full rounded-2xl border-school-blue/10 shadow-card hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                              <CardTitle className="text-lg">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Klik untuk informasi lebih lanjut</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="unggulan" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full rounded-2xl overflow-hidden border-school-blue/10 shadow-card">
                    <CardHeader>
                      <CardTitle>Tahfidz Al-Qur'an</CardTitle>
                      <CardDescription>Program hafalan Al-Qur'an</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Program unggulan yang memfasilitasi siswa untuk menghafal Al-Qur'an dengan bimbingan dari guru
                        yang berpengalaman.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="group rounded-lg border-school-blue/30">
                        <Link href="/program#tahfidz" className="flex items-center">
                          Selengkapnya
                          <motion.span
                            className="ml-1 inline-block"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full rounded-2xl overflow-hidden border-school-blue/10 shadow-card">
                    <CardHeader>
                      <CardTitle>English Immersion</CardTitle>
                      <CardDescription>Program penguasaan bahasa Inggris</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Program intensif untuk meningkatkan kemampuan berbahasa Inggris siswa melalui berbagai kegiatan
                        interaktif.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="group rounded-lg border-school-blue/30">
                        <Link href="/program#english" className="flex items-center">
                          Selengkapnya
                          <motion.span
                            className="ml-1 inline-block"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="mx-auto mb-10 md:mb-12 max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight sm:text-4xl">Berita Terbaru</h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Informasi terkini seputar kegiatan dan prestasi SMA MUHAMMADIYAH 4 MAKASSAR
            </p>
          </motion.div>
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                image: "/placeholder.svg?key=1mvvs",
                date: "10 April 2024",
                title: "Tim Robotik SMAM4 Juara Nasional",
                excerpt:
                  "Tim robotik SMA MUHAMMADIYAH 4 MAKASSAR berhasil meraih juara pertama dalam kompetisi robotik tingkat nasional.",
              },
              {
                image: "/classroom-discussion.png",
                date: "5 April 2024",
                title: "Workshop Pengembangan Karakter",
                excerpt: "SMA MUHAMMADIYAH 4 MAKASSAR mengadakan workshop pengembangan karakter untuk seluruh siswa.",
              },
              {
                image: "/placeholder.svg?key=fjk82",
                date: "28 Maret 2024",
                title: "Pengumuman Kelulusan 2024",
                excerpt:
                  "SMA MUHAMMADIYAH 4 MAKASSAR mengumumkan kelulusan siswa angkatan 2024 dengan hasil yang membanggakan.",
              },
            ].map((news, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full overflow-hidden rounded-2xl border-school-blue/10 shadow-card">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{news.date}</span>
                    </div>
                    <CardTitle className="line-clamp-2">{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-muted-foreground">{news.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="px-0 group" asChild>
                      <Link href="/berita" className="flex items-center">
                        Baca selengkapnya
                        <motion.span
                          className="ml-1 inline-block"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-12 text-center">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Button variant="outline" asChild className="rounded-xl border-school-blue/30">
                <Link href="/berita">Lihat Semua Berita</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-school-blue to-school-blue-dark py-12 md:py-24 text-white">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight sm:text-4xl">Bergabunglah dengan Kami</h2>
              <p className="mt-4 text-sm md:text-base text-white/80">
                Jadilah bagian dari SMA MUHAMMADIYAH 4 MAKASSAR dan raih masa depan cerah dengan pendidikan berkualitas.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button size="lg" variant="secondary" asChild className="rounded-xl w-full sm:w-auto">
                    <Link href="/kontak">Hubungi Kami</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-xl border-white text-white hover:bg-white hover:text-school-blue w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/program">Pelajari Program</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-school-blue/10 to-white py-12 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Kontak Kami
            </motion.h1>
            <motion.p
              className="mt-4 text-base md:text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hubungi kami untuk informasi lebih lanjut tentang SMA MUHAMMADIYAH 4 MAKASSAR
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-xl md:text-2xl">Kirim Pesan</CardTitle>
                  <CardDescription>Isi formulir di bawah ini untuk mengirim pesan kepada kami</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" placeholder="Masukkan nama lengkap" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Masukkan email" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subjek</Label>
                      <Input id="subject" placeholder="Masukkan subjek pesan" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Pesan</Label>
                      <Textarea id="message" placeholder="Masukkan pesan Anda" className="min-h-[150px]" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">Mengirim...</span>
                          <Send className="h-4 w-4 animate-pulse" />
                        </>
                      ) : (
                        <>
                          Kirim Pesan
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Card className="h-full">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-xl md:text-2xl">Informasi Kontak</CardTitle>
                  <CardDescription>Cara lain untuk menghubungi kami</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-school-blue" />
                    <div>
                      <h3 className="font-medium">Alamat</h3>
                      <p className="text-sm text-muted-foreground">
                        Jl Gagak, Lorong 4 No.4, Mariso, Kec. Mariso, Kota Makassar, Sulawesi Selatan 90121
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 text-school-blue" />
                    <div>
                      <h3 className="font-medium">Telepon</h3>
                      <p className="text-sm text-muted-foreground">(0411) 123-456</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-school-blue" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">smampatmuhammadiyah@gmail.com</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="font-medium">Media Sosial</h3>
                    <div className="mt-3 flex gap-4">
                      <a
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-school-blue/10 text-school-blue transition-colors hover:bg-school-blue hover:text-white"
                      >
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Facebook</span>
                      </a>
                      <a
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-school-blue/10 text-school-blue transition-colors hover:bg-school-blue hover:text-white"
                      >
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </a>
                      <a
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-school-blue/10 text-school-blue transition-colors hover:bg-school-blue hover:text-white"
                      >
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </a>
                      <a
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-school-blue/10 text-school-blue transition-colors hover:bg-school-blue hover:text-white"
                      >
                        <Youtube className="h-4 w-4" />
                        <span className="sr-only">Youtube</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 md:py-16">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="mx-auto max-w-3xl overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40049.84029066528!2d119.39254676498803!3d-5.192127266971202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbf1d5d8c26f0e7%3A0x592f692b3ea94888!2sSMA%20Muhammadiyah%204!5e0!3m2!1sid!2sid!4v1746526797973!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
