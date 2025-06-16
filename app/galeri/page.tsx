"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Film, Loader2, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type GalleryItem = {
  id: string
  title: string
  type: "image" | "video"
  media_url: string
  thumbnail_url: string | null
  created_at: string
}

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
      staggerChildren: 0.1,
    },
  },
}

// Function to convert Google Drive URL to our proxy URL
function getProxiedImageUrl(url: string, id: string): string {
  if (!url) return "/abstract-colorful-swirls.png"

  // If it's already a local URL, return it as is
  if (url.startsWith("/")) return url

  // If it's a Google Drive URL, proxy it
  if (url.includes("drive.google.com") || url.includes("googleusercontent.com")) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}&id=${id}`
  }

  // Otherwise, return the original URL
  return url
}

export default function GaleriPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"semua" | "foto" | "video">("semua")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>({})
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchGalleryItems = async () => {
      setIsLoading(true)
      setLoadError(null)
      try {
        const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })

        if (error) throw error
        setGalleryItems(data || [])

        // Log the data for debugging
        console.log("Gallery items:", data)
      } catch (error) {
        console.error("Error fetching gallery items:", error)
        setLoadError("Gagal memuat data galeri. Silakan coba lagi nanti.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryItems()
  }, [supabase])

  const handleImageError = (id: string, url: string) => {
    console.error(`Image failed to load: ${url} for item ${id}`)
    setImageLoadErrors((prev) => ({ ...prev, [id]: true }))
  }

  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === "semua") return true
    if (activeTab === "foto") return item.type === "image"
    if (activeTab === "video") return item.type === "video"
    return true
  })

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
              Galeri
            </motion.h1>
            <motion.p
              className="mt-4 text-base md:text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Dokumentasi kegiatan dan momen berkesan di SMA MUHAMMADIYAH 4 MAKASSAR
            </motion.p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 sm:px-6">
          <Tabs
            defaultValue="semua"
            className="mx-auto max-w-5xl"
            onValueChange={(value) => setActiveTab(value as any)}
          >
            <TabsList className="mb-6 md:mb-8 grid w-full grid-cols-3">
              <TabsTrigger value="semua" className="text-xs sm:text-sm">
                Semua
              </TabsTrigger>
              <TabsTrigger value="foto" className="text-xs sm:text-sm">
                Foto
              </TabsTrigger>
              <TabsTrigger value="video" className="text-xs sm:text-sm">
                Video
              </TabsTrigger>
            </TabsList>

            {loadError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{loadError}</AlertDescription>
              </Alert>
            )}

            <TabsContent value="semua">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Belum ada media yang diunggah</p>
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  {filteredItems.map((item) => (
                    <GalleryItemCard
                      key={item.id}
                      item={item}
                      onSelect={setSelectedItem}
                      hasError={!!imageLoadErrors[item.id]}
                      onError={() => handleImageError(item.id, item.media_url)}
                    />
                  ))}
                </motion.div>
              )}
            </TabsContent>
            <TabsContent value="foto">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Belum ada foto yang diunggah</p>
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  {filteredItems.map((item) => (
                    <GalleryItemCard
                      key={item.id}
                      item={item}
                      onSelect={setSelectedItem}
                      hasError={!!imageLoadErrors[item.id]}
                      onError={() => handleImageError(item.id, item.media_url)}
                    />
                  ))}
                </motion.div>
              )}
            </TabsContent>
            <TabsContent value="video">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Belum ada video yang diunggah</p>
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  {filteredItems.map((item) => (
                    <GalleryItemCard
                      key={item.id}
                      item={item}
                      onSelect={setSelectedItem}
                      hasError={!!imageLoadErrors[item.id]}
                      onError={() => handleImageError(item.id, item.media_url)}
                    />
                  ))}
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Media Viewer Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedItem.title}</DialogTitle>
              <DialogDescription>
                {new Date(selectedItem.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              {selectedItem.type === "image" ? (
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <img
                    src={getProxiedImageUrl(selectedItem.media_url, selectedItem.id) || "/placeholder.svg"}
                    alt={selectedItem.title}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      console.error("Image failed to load:", selectedItem.media_url)
                      ;(e.target as HTMLImageElement).src = "/abstract-colorful-swirls.png"
                    }}
                  />
                </div>
              ) : (
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <video src={selectedItem.media_url} controls className="h-full w-full" autoPlay />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Gallery Item Card Component
function GalleryItemCard({
  item,
  onSelect,
  hasError,
  onError,
}: {
  item: GalleryItem
  onSelect: (item: GalleryItem) => void
  hasError?: boolean
  onError: () => void
}) {
  // Use our proxy function to get the image URL
  const imageUrl = getProxiedImageUrl(hasError ? "/abstract-colorful-swirls.png" : item.media_url, item.id)

  return (
    <motion.div
      variants={fadeIn}
      className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
      onClick={() => onSelect(item)}
    >
      {item.type === "image" ? (
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={onError}
        />
      ) : (
        <div className="relative h-full w-full bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <Film className="h-12 w-12 text-white opacity-70" />
          </div>
          {item.thumbnail_url ? (
            <img
              src={getProxiedImageUrl(item.thumbnail_url, item.id) || "/placeholder.svg"}
              alt={item.title}
              className="h-full w-full object-cover opacity-50"
              onError={onError}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gray-700 to-gray-900" />
          )}
        </div>
      )}
      <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="font-bold line-clamp-2">{item.title}</p>
        <p className="text-sm text-white/80 mt-1">
          {new Date(item.created_at).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </motion.div>
  )
}
