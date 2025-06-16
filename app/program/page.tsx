"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Award, BookOpen, ChevronRight, GraduationCap, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

export default function ProgramPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-school-blue/10 to-white py-12 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Program Sekolah
            </motion.h1>
            <motion.p
              className="mt-4 text-base md:text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Berbagai program pendidikan yang dirancang untuk mengembangkan potensi siswa
            </motion.p>
          </div>
        </div>
      </section>

      {/* Jurusan Section */}
      <section className="py-12 md:py-24" id="jurusan">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="mx-auto mb-10 md:mb-12 max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight sm:text-4xl">Jurusan</h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Program pendidikan yang dapat dipilih sesuai dengan minat dan bakat siswa
            </p>
          </motion.div>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              id="ipa"
            >
              <Card className="h-full overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="/placeholder.svg?key=kugr9"
                    alt="Jurusan IPA"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Jurusan IPA</CardTitle>
                  <CardDescription>Ilmu Pengetahuan Alam</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Program yang menekankan pada penguasaan ilmu-ilmu alam seperti Fisika, Kimia, Biologi, dan
                    Matematika. Jurusan ini cocok bagi siswa yang memiliki minat di bidang sains, teknologi, kesehatan,
                    dan teknik.
                  </p>
                  <div className="mt-6">
                    <h4 className="font-semibold">Mata Pelajaran Unggulan:</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Fisika</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Kimia</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Biologi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Matematika Peminatan</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              id="ips"
            >
              <Card className="h-full overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="/placeholder.svg?key=uck3w"
                    alt="Jurusan IPS"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Jurusan IPS</CardTitle>
                  <CardDescription>Ilmu Pengetahuan Sosial</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Program yang menekankan pada penguasaan ilmu-ilmu sosial seperti Ekonomi, Sosiologi, Geografi, dan
                    Sejarah. Jurusan ini cocok bagi siswa yang memiliki minat di bidang sosial, ekonomi, hukum, dan
                    pendidikan.
                  </p>
                  <div className="mt-6">
                    <h4 className="font-semibold">Mata Pelajaran Unggulan:</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Ekonomi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Sosiologi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Geografi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Sejarah Peminatan</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ekstrakurikuler Section */}
      <section className="bg-gray-50 py-12 md:py-24" id="ekstrakurikuler">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="mx-auto mb-10 md:mb-12 max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight sm:text-4xl">Ekstrakurikuler</h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Kegiatan di luar jam pelajaran untuk mengembangkan minat dan bakat siswa
            </p>
          </motion.div>
          <motion.div
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <Award className="h-10 w-10" />,
                title: "Tapak Suci",
                description: "Seni bela diri khas Muhammadiyah yang mengajarkan kedisiplinan dan ketangkasan.",
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Hizbul Wathan",
                description: "Gerakan kepanduan Islam yang mengembangkan jiwa kepemimpinan dan kemandirian.",
              },
              {
                icon: <BookOpen className="h-10 w-10" />,
                title: "Klub Sains",
                description: "Wadah bagi siswa untuk mengembangkan minat dan bakat di bidang sains dan teknologi.",
              },
              {
                icon: <GraduationCap className="h-10 w-10" />,
                title: "English Club",
                description: "Pengembangan kemampuan berbahasa Inggris melalui berbagai kegiatan interaktif.",
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Klub Olahraga",
                description: "Berbagai cabang olahraga untuk mengembangkan kebugaran dan sportivitas.",
              },
              {
                icon: <Award className="h-10 w-10" />,
                title: "Seni & Budaya",
                description: "Pengembangan bakat seni dan pelestarian budaya lokal melalui berbagai kegiatan kreatif.",
              },
              {
                icon: <BookOpen className="h-10 w-10" />,
                title: "Jurnalistik",
                description: "Pengembangan kemampuan menulis dan jurnalistik melalui penerbitan majalah sekolah.",
              },
              {
                icon: <GraduationCap className="h-10 w-10" />,
                title: "Robotik",
                description: "Pengembangan kreativitas dan inovasi teknologi melalui pemrograman dan pembuatan robot.",
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "PMR",
                description:
                  "Palang Merah Remaja untuk mengembangkan kepedulian sosial dan keterampilan pertolongan pertama.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeIn}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card className="h-full transition-all hover:shadow-md">
                        <CardHeader>
                          <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-school-blue/10 text-school-blue">
                            {item.icon}
                          </div>
                          <CardTitle>{item.title}</CardTitle>
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
          </motion.div>
        </div>
      </section>

      {/* Program Unggulan Section */}
      <section className="py-12 md:py-24" id="unggulan">
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
              Program khusus yang menjadi keunggulan SMA MUHAMMADIYAH 4 MAKASSAR
            </p>
          </motion.div>
          <Tabs defaultValue="tahfidz" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="tahfidz" className="text-xs sm:text-sm">
                Tahfidz Al-Qur'an
              </TabsTrigger>
              <TabsTrigger value="english" className="text-xs sm:text-sm">
                English Immersion
              </TabsTrigger>
              <TabsTrigger value="leadership" className="text-xs sm:text-sm">
                Leadership Training
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tahfidz" className="mt-6" id="tahfidz">
              <div className="grid gap-6 md:gap-8 md:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src="/placeholder.svg?key=2xi8c" alt="Program Tahfidz" fill className="object-cover" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold">Program Tahfidz Al-Qur'an</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Program unggulan yang memfasilitasi siswa untuk menghafal Al-Qur'an dengan bimbingan dari guru yang
                    berpengalaman. Program ini dirancang untuk membentuk generasi Qur'ani yang memiliki pemahaman
                    mendalam tentang Al-Qur'an.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Keunggulan Program:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Bimbingan intensif dari guru tahfidz berpengalaman</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Metode menghafal yang efektif dan menyenangkan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Jadwal yang terintegrasi dengan kegiatan akademik</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="english" className="mt-6" id="english">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?key=mausk"
                    alt="Program English Immersion"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Program English Immersion</h3>
                  <p className="text-muted-foreground">
                    Program intensif untuk meningkatkan kemampuan berbahasa Inggris siswa melalui berbagai kegiatan
                    interaktif. Program ini dirancang untuk mempersiapkan siswa menghadapi persaingan global.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Keunggulan Program:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Pembelajaran dengan metode komunikatif</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Native speaker sebagai pengajar tamu</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>English Day setiap minggu</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Persiapan ujian TOEFL/IELTS</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Program pertukaran pelajar internasional</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="leadership" className="mt-6">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?key=lh7rp"
                    alt="Program Leadership Training"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Program Leadership Training</h3>
                  <p className="text-muted-foreground">
                    Program pengembangan kepemimpinan yang dirancang untuk membentuk karakter pemimpin yang
                    berintegritas, visioner, dan mampu bekerja sama dalam tim.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Keunggulan Program:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Pelatihan kepemimpinan berkala</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Outbound dan team building</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Proyek sosial kemasyarakatan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Mentoring dari tokoh-tokoh inspiratif</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-school-blue" />
                        <span>Kesempatan memimpin berbagai kegiatan sekolah</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
