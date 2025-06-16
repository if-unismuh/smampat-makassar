"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export default function TentangPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-school-blue-light via-white to-white py-12 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Tentang Kami
            </motion.h1>
            <motion.p
              className="mt-4 text-base md:text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Mengenal lebih dekat SMA MUHAMMADIYAH 4 MAKASSAR
            </motion.p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 sm:px-6">
          <Tabs defaultValue="profil" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-3 rounded-xl p-1">
              <TabsTrigger value="profil" className="rounded-lg text-xs sm:text-sm">
                Profil
              </TabsTrigger>
              <TabsTrigger value="visi-misi" className="rounded-lg text-xs sm:text-sm">
                Visi & Misi
              </TabsTrigger>
              <TabsTrigger value="sejarah" className="rounded-lg text-xs sm:text-sm">
                Sejarah
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profil" className="mt-6">
              <motion.div
                className="grid gap-8 md:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-xl md:text-2xl font-bold">Profil Sekolah</h2>
                  <p className="mt-4 text-sm md:text-base text-muted-foreground">
                    SMA MUHAMMADIYAH 4 MAKASSAR adalah lembaga pendidikan menengah atas yang berada di bawah naungan
                    Muhammadiyah. Sekolah ini berdiri dengan tujuan untuk memberikan pendidikan berkualitas yang
                    memadukan kurikulum nasional dengan nilai-nilai Islam.
                  </p>
                  <p className="mt-4 text-sm md:text-base text-muted-foreground">
                    Dengan fasilitas modern dan tenaga pengajar yang profesional, SMA MUHAMMADIYAH 4 MAKASSAR
                    berkomitmen untuk menghasilkan lulusan yang tidak hanya unggul secara akademis, tetapi juga memiliki
                    akhlak mulia dan siap menghadapi tantangan global.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative aspect-video overflow-hidden rounded-2xl shadow-card"
                >
                  <Image
                    src="/placeholder.svg?key=tf9gw"
                    alt="SMA MUHAMMADIYAH 4 MAKASSAR"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </TabsContent>
            <TabsContent value="visi-misi" className="mt-6">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold">Visi</h2>
                  <div className="mt-4 rounded-xl bg-gradient-to-r from-school-blue-light to-white p-6 shadow-soft dark:from-school-blue/10 dark:to-transparent">
                    <p className="text-muted-foreground">
                      "Menjadi lembaga pendidikan Islam terkemuka yang menghasilkan generasi unggul, berakhlak mulia,
                      berwawasan global, dan berkontribusi positif bagi masyarakat, bangsa, dan agama."
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold">Misi</h2>
                  <ul className="mt-4 space-y-4">
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-school-blue to-school-blue-dark text-white">
                        1
                      </span>
                      <p className="text-muted-foreground">
                        Menyelenggarakan pendidikan yang mengintegrasikan ilmu pengetahuan umum dengan nilai-nilai
                        Islam.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-school-blue to-school-blue-dark text-white">
                        2
                      </span>
                      <p className="text-muted-foreground">
                        Mengembangkan potensi siswa secara optimal melalui program pendidikan yang komprehensif.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-school-blue to-school-blue-dark text-white">
                        3
                      </span>
                      <p className="text-muted-foreground">
                        Membangun karakter siswa berdasarkan nilai-nilai Islam dan budaya bangsa.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-school-blue to-school-blue-dark text-white">
                        4
                      </span>
                      <p className="text-muted-foreground">
                        Membekali siswa dengan keterampilan yang relevan dengan perkembangan zaman.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-school-blue to-school-blue-dark text-white">
                        5
                      </span>
                      <p className="text-muted-foreground">
                        Menciptakan lingkungan belajar yang kondusif, aman, dan nyaman.
                      </p>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </TabsContent>
            <TabsContent value="sejarah" className="mt-6">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold">Sejarah Singkat</h2>
                <motion.div
                  className="relative aspect-video overflow-hidden rounded-2xl shadow-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Image
                    src="/placeholder.svg?key=f3hul"
                    alt="Sejarah SMA MUHAMMADIYAH 4 MAKASSAR"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <p className="text-muted-foreground">
                    SMA MUHAMMADIYAH 4 MAKASSAR didirikan pada tahun 1985 oleh Pimpinan Daerah Muhammadiyah Makassar.
                    Pada awalnya, sekolah ini hanya memiliki beberapa ruang kelas dengan jumlah siswa yang terbatas.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    Seiring berjalannya waktu, SMA MUHAMMADIYAH 4 MAKASSAR terus berkembang dan meningkatkan kualitas
                    pendidikannya. Berbagai prestasi telah diraih oleh siswa-siswi sekolah ini, baik di tingkat lokal,
                    nasional, maupun internasional.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    Pada tahun 2010, sekolah ini melakukan renovasi besar-besaran dan menambah berbagai fasilitas modern
                    untuk mendukung proses pembelajaran. Hingga saat ini, SMA MUHAMMADIYAH 4 MAKASSAR terus berkomitmen
                    untuk memberikan pendidikan berkualitas dan membentuk generasi unggul yang berakhlak mulia.
                  </p>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Structure Section */}
      <section className="bg-gradient-to-br from-school-neutral-50 to-white py-16 md:py-24 dark:from-school-neutral-900 dark:to-school-neutral-800">
        <div className="container">
          <motion.div
            className="mx-auto mb-12 max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Struktur Organisasi</h2>
            <p className="mt-4 text-muted-foreground">Jajaran pimpinan dan staf SMA MUHAMMADIYAH 4 MAKASSAR</p>
          </motion.div>
          <motion.div
            className="mx-auto max-w-5xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Dr. H. Ahmad Fauzi, M.Pd.",
                  position: "Kepala Sekolah",
                  image: "/placeholder.svg?key=78l0t",
                },
                {
                  name: "Dra. Hj. Siti Rahmah, M.Pd.",
                  position: "Wakil Kepala Sekolah Bidang Kurikulum",
                  image: "/placeholder.svg?key=1dw3k",
                },
                {
                  name: "H. Muhammad Rizal, S.Pd., M.Si.",
                  position: "Wakil Kepala Sekolah Bidang Kesiswaan",
                  image: "/placeholder.svg?key=r5mqa",
                },
                {
                  name: "Ir. Abdul Karim, M.T.",
                  position: "Wakil Kepala Sekolah Bidang Sarana Prasarana",
                  image: "/placeholder.svg?key=g39ox",
                },
                {
                  name: "Hj. Fatimah Azzahra, S.Ag., M.Pd.I.",
                  position: "Wakil Kepala Sekolah Bidang Keislaman",
                  image: "/placeholder.svg?key=20yhg",
                },
                {
                  name: "Drs. Hamzah Usman, M.M.",
                  position: "Kepala Tata Usaha",
                  image: "/placeholder.svg?key=kw7in",
                },
              ].map((person, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="overflow-hidden rounded-2xl border-school-blue/10 shadow-card">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-4 text-center">
                      <h3 className="font-bold">{person.name}</h3>
                      <p className="text-sm text-muted-foreground">{person.position}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            className="mx-auto mb-12 max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pertanyaan Umum</h2>
            <p className="mt-4 text-muted-foreground">
              Jawaban atas pertanyaan yang sering diajukan tentang SMA MUHAMMADIYAH 4 MAKASSAR
            </p>
          </motion.div>
          <motion.div
            className="mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-school-blue/10">
                <AccordionTrigger className="text-left">
                  Bagaimana cara mendaftar di SMA MUHAMMADIYAH 4 MAKASSAR?
                </AccordionTrigger>
                <AccordionContent>
                  Pendaftaran dapat dilakukan secara online melalui website resmi sekolah atau langsung datang ke
                  sekolah. Periode pendaftaran biasanya dibuka pada bulan April-Juni setiap tahunnya. Dokumen yang
                  diperlukan antara lain ijazah SMP/sederajat, rapor, dan dokumen pendukung lainnya.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-school-blue/10">
                <AccordionTrigger className="text-left">Apa saja fasilitas yang tersedia di sekolah?</AccordionTrigger>
                <AccordionContent>
                  SMA MUHAMMADIYAH 4 MAKASSAR dilengkapi dengan berbagai fasilitas modern seperti ruang kelas ber-AC,
                  laboratorium (Fisika, Kimia, Biologi, Komputer), perpustakaan, masjid, lapangan olahraga, kantin,
                  ruang kesehatan, dan area parkir yang luas.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-school-blue/10">
                <AccordionTrigger className="text-left">Apakah ada beasiswa untuk siswa berprestasi?</AccordionTrigger>
                <AccordionContent>
                  Ya, SMA MUHAMMADIYAH 4 MAKASSAR menyediakan beasiswa untuk siswa berprestasi, baik di bidang akademik
                  maupun non-akademik. Selain itu, tersedia juga beasiswa khusus untuk siswa dari keluarga kurang mampu.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-school-blue/10">
                <AccordionTrigger className="text-left">
                  Bagaimana kurikulum yang diterapkan di sekolah?
                </AccordionTrigger>
                <AccordionContent>
                  Sekolah menerapkan Kurikulum Nasional yang diintegrasikan dengan nilai-nilai Islam. Selain mata
                  pelajaran wajib, sekolah juga menyelenggarakan program pengembangan diri dan ekstrakurikuler untuk
                  mengembangkan potensi siswa secara optimal.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-school-blue/10">
                <AccordionTrigger className="text-left">Apakah ada asrama untuk siswa?</AccordionTrigger>
                <AccordionContent>
                  Saat ini, SMA MUHAMMADIYAH 4 MAKASSAR belum menyediakan asrama untuk siswa. Namun, sekolah memiliki
                  kerjasama dengan beberapa asrama di sekitar lokasi sekolah yang dapat menjadi rekomendasi bagi siswa
                  yang berasal dari luar kota.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
