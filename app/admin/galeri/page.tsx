"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Trash2, ImageIcon, Film, Loader2, AlertTriangle, Bug, ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type GalleryItem = {
  id: string
  title: string
  type: "image" | "video"
  media_url: string
  thumbnail_url: string | null
  created_at: string
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

export default function GalleryAdminPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [newUrl, setNewUrl] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const fetchGalleryItems = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setGalleryItems(data || [])
    } catch (error) {
      console.error("Error fetching gallery items:", error)
      toast({
        title: "Error",
        description: "Gagal memuat data galeri",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const handleDelete = async (id: string) => {
    setIsDeleting(id)
    try {
      const { error } = await supabase.from("gallery").delete().eq("id", id)

      if (error) throw error

      setGalleryItems((prev) => prev.filter((item) => item.id !== id))
      toast({
        title: "Berhasil",
        description: "Media telah dihapus dari galeri",
      })
    } catch (error) {
      console.error("Error deleting gallery item:", error)
      toast({
        title: "Error",
        description: "Gagal menghapus media",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
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

  const fixGalleryUrls = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/fix-gallery-urls")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fix gallery URLs")
      }

      setDebugInfo(data)

      toast({
        title: "URLs Fixed",
        description: `Successfully fixed ${data.fixedItems.length} gallery items.`,
      })

      // Refresh the gallery items
      fetchGalleryItems()
    } catch (error) {
      console.error("Error fixing gallery URLs:", error)
      toast({
        title: "Error",
        description: "Failed to fix gallery URLs",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const debugGalleryItem = async (id: string) => {
    try {
      const response = await fetch(`/api/debug-gallery-item?id=${id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to debug gallery item")
      }

      setDebugInfo(data)
      setSelectedItem(data.item)
      setNewUrl(data.item.media_url || "")
    } catch (error) {
      console.error("Error debugging gallery item:", error)
      toast({
        title: "Error",
        description: "Failed to debug gallery item",
        variant: "destructive",
      })
    }
  }

  const updateGalleryUrl = async () => {
    if (!selectedItem || !newUrl) return

    setIsUpdating(true)
    try {
      const response = await fetch("/api/update-gallery-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedItem.id,
          url: newUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update gallery URL")
      }

      toast({
        title: "URL Updated",
        description: "Successfully updated gallery item URL.",
      })

      // Refresh the gallery items
      fetchGalleryItems()
      setSelectedItem(null)
    } catch (error) {
      console.error("Error updating gallery URL:", error)
      toast({
        title: "Error",
        description: "Failed to update gallery URL",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Manajemen Galeri</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={fixGalleryUrls} disabled={isLoading} className="w-full sm:w-auto">
            <AlertTriangle className="mr-2 h-4 w-4" />
            <span className="whitespace-nowrap">Perbaiki URL Gambar</span>
          </Button>
          <Button onClick={() => router.push("/admin/galeri/upload")} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            <span className="whitespace-nowrap">Unggah Media Baru</span>
          </Button>
        </div>
      </div>

      {debugInfo && (
        <Card className="mb-6 overflow-auto">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Debug Information</h3>
              <Button variant="ghost" size="sm" onClick={() => setDebugInfo(null)}>
                Close
              </Button>
            </div>
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto max-h-60">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : galleryItems.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Belum ada media</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Unggah gambar atau video untuk ditampilkan di galeri sekolah
            </p>
            <Button className="mt-4" onClick={() => router.push("/admin/galeri/upload")}>
              <Plus className="mr-2 h-4 w-4" />
              Unggah Media Baru
            </Button>
          </div>
        </Card>
      ) : (
        <motion.div
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {galleryItems.map((item) => (
            <motion.div key={item.id} variants={fadeIn}>
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative aspect-video bg-muted">
                  {item.type === "image" ? (
                    <div className="h-full w-full relative">
                      <img
                        src={getProxiedImageUrl(item.media_url, item.id) || "/abstract-colorful-swirls.png"}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          console.error("Image failed to load:", item.media_url)
                          ;(e.target as HTMLImageElement).src = "/abstract-colorful-swirls.png"
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-black">
                      <Film className="h-12 w-12 text-white opacity-70" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white">
                    {item.type === "image" ? <ImageIcon className="h-4 w-4" /> : <Film className="h-4 w-4" />}
                  </div>
                </div>
                <CardContent className="flex-grow p-4">
                  <h3 className="font-medium line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => debugGalleryItem(item.id)}>
                      <Bug className="h-3 w-3 mr-1" />
                      Debug
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(getProxiedImageUrl(item.media_url, item.id), "_blank")}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Open URL
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="w-full">
                        {isDeleting === item.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Media</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus "{item.title}"? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(item.id)}>Hapus</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Edit URL Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Gallery Item URL</DialogTitle>
            <DialogDescription>
              Update the URL for this gallery item. Make sure the URL is accessible and points to the correct image or
              video.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={selectedItem.title} disabled />
                </div>
                <div>
                  <Label htmlFor="current-url">Current URL</Label>
                  <div className="flex gap-2">
                    <Input id="current-url" value={selectedItem.media_url} disabled className="flex-1" />
                    <Button variant="outline" size="sm" onClick={() => window.open(selectedItem.media_url, "_blank")}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="new-url">New URL</Label>
                  <Input
                    id="new-url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="Enter new URL"
                  />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Preview</h4>
                  {selectedItem.type === "image" ? (
                    <div className="aspect-video bg-muted rounded-md overflow-hidden">
                      <img
                        src={getProxiedImageUrl(newUrl || selectedItem.media_url, selectedItem.id)}
                        alt={selectedItem.title}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          console.error("Preview image failed to load")
                          ;(e.target as HTMLImageElement).src = "/abstract-colorful-swirls.png"
                        }}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-black rounded-md flex items-center justify-center">
                      <Film className="h-12 w-12 text-white opacity-70" />
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedItem(null)}>
                  Cancel
                </Button>
                <Button onClick={updateGalleryUrl} disabled={isUpdating || !newUrl}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Update URL
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
