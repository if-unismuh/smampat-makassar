"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

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

type NewsItem = {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  image_url: string
  published_at: string
}

export function NewsGrid({ news }: { news: NewsItem[] }) {
  // Function to get proxied image URL
  const getProxiedImageUrl = (url: string, id: string) => {
    if (!url) return "/news-collage.png"

    // If it's already a local URL, return as is
    if (url.startsWith("/")) return url

    // Otherwise, use the image proxy
    return `/api/image-proxy?url=${encodeURIComponent(url)}&id=${id}`
  }

  return (
    <motion.div
      className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {news.map((item) => (
        <motion.div key={item.id} variants={fadeIn}>
          <Card className="h-full overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <Image
                src={getProxiedImageUrl(item.image_url, item.id) || "/placeholder.svg"}
                alt={item.title}
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader className="p-4 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full bg-school-blue/10 px-2.5 py-0.5 text-xs font-medium text-school-blue">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(item.published_at)}</span>
                </div>
              </div>
              <CardTitle className="line-clamp-2 text-base md:text-lg mt-2">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
              <p className="line-clamp-3 text-sm md:text-base text-muted-foreground">{item.excerpt}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 md:p-6 md:pt-0">
              <Button variant="link" className="px-0" asChild>
                <Link href={`/berita/${item.slug}`}>
                  Baca selengkapnya <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
