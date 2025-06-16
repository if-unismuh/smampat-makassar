"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Info, Loader2, Upload, ImageIcon, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export default function UploadMediaPage() {
  const [title, setTitle] = useState("")
  const [type, setType] = useState<"image" | "video">("image")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [folderStatus, setFolderStatus] = useState<{
    success?: boolean
    exists?: boolean
    message?: string
    folder?: any
    fallback?: string
  } | null>(null)
  const [isCheckingFolder, setIsCheckingFolder] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check Google Drive folder status
    const checkFolder = async () => {
      try {
        const response = await fetch("/api/check-drive-folder")
        if (!response.ok) {
          throw new Error(`Failed to check folder status: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setFolderStatus(data)

        // If there's an error in the response, log it
        if (data.error) {
          console.error("Drive folder check error:", data.error)
        }
      } catch (err) {
        console.error("Error checking folder:", err)
        setFolderStatus({
          success: false,
          message: "Error checking folder status",
        })
      } finally {
        setIsCheckingFolder(false)
      }
    }

    checkFolder()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validate file type
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    const validVideoTypes = ["video/mp4", "video/webm", "video/ogg"]
    const validTypes = type === "image" ? validImageTypes : validVideoTypes

    if (!validTypes.includes(selectedFile.type)) {
      setError(
        `Tipe file tidak valid. Tipe yang didukung untuk ${type === "image" ? "gambar" : "video"} adalah: ${validTypes.join(", ")}`,
      )
      setFile(null)
      setPreview(null)
      return
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (selectedFile.size > maxSize) {
      setError("Ukuran file melebihi batas 10MB")
      setFile(null)
      setPreview(null)
      return
    }

    setFile(selectedFile)
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleTypeChange = (value: "image" | "video") => {
    setType(value)
    // Clear file and preview when type changes
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const simulateProgress = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 200)
    return interval
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim()) {
      setError("Judul tidak boleh kosong")
      return
    }

    if (!file) {
      setError("Silakan pilih file terlebih dahulu")
      return
    }

    setIsUploading(true)
    const progressInterval = simulateProgress()

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("type", type)
      formData.append("media", file)

      const response = await fetch("/api/upload-media", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Upload error details:", errorData)
        throw new Error(errorData.error || `Gagal mengunggah media: ${response.status} ${response.statusText}`)
      }

      setUploadProgress(100)

      // Show success toast
      toast({
        title: "Berhasil!",
        description: "Media telah berhasil diunggah ke galeri.",
        duration: 5000,
      })

      // Reset form
      setTimeout(() => {
        setTitle("")
        setFile(null)
        setPreview(null)
        setUploadProgress(0)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }

        // Redirect to gallery page
        router.push("/admin/galeri")
        router.refresh()
      }, 1000)
    } catch (err) {
      clearInterval(progressInterval)
      setUploadProgress(0)
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat mengunggah media")
      console.error("Upload error:", err)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="outline" onClick={() => router.back()} className="mr-2">
          Kembali
        </Button>
        <h1 className="text-2xl font-bold">Unggah Media Baru</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Unggah Media ke Galeri</CardTitle>
          <CardDescription>Unggah gambar atau video untuk ditampilkan di halaman galeri sekolah</CardDescription>
        </CardHeader>
        <CardContent>
          {isCheckingFolder ? (
            <Alert className="mb-6">
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertTitle>Memeriksa konfigurasi penyimpanan...</AlertTitle>
            </Alert>
          ) : folderStatus && !folderStatus.success ? (
            <Alert variant="warning" className="mb-6">
              <Info className="h-4 w-4" />
              <AlertTitle>Informasi Penyimpanan</AlertTitle>
              <AlertDescription>
                Unggahan akan disimpan menggunakan penyimpanan alternatif. Semua fitur tetap berfungsi dengan normal.
              </AlertDescription>
            </Alert>
          ) : null}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul media"
                disabled={isUploading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tipe Media</Label>
              <RadioGroup
                value={type}
                onValueChange={(value) => handleTypeChange(value as "image" | "video")}
                className="flex flex-col space-y-1"
                disabled={isUploading}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="image" id="image" />
                  <Label htmlFor="image" className="flex items-center gap-2 cursor-pointer">
                    <ImageIcon className="h-4 w-4" />
                    Gambar
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video" className="flex items-center gap-2 cursor-pointer">
                    <Film className="h-4 w-4" />
                    Video
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="media">File Media</Label>
              <div className="grid gap-4">
                <Input
                  ref={fileInputRef}
                  id="media"
                  type="file"
                  accept={type === "image" ? "image/*" : "video/*"}
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="cursor-pointer"
                  required
                />

                {preview && (
                  <div className="relative aspect-video rounded-md overflow-hidden border bg-muted">
                    {type === "image" ? (
                      <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-contain" />
                    ) : (
                      <video src={preview} controls className="h-full w-full" />
                    )}
                  </div>
                )}

                {!preview && (
                  <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="mt-2 text-sm font-medium">
                      Klik input di atas untuk memilih file {type === "image" ? "gambar" : "video"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {type === "image" ? "JPG, PNG, GIF, WEBP" : "MP4, WEBM, OGG"} hingga 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Progres Unggahan</Label>
                  <span className="text-xs text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isUploading || !file || !title.trim()}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengunggah...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Unggah Media
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
