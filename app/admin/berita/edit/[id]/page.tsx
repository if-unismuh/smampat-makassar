"use client"

import type React from "react"

import { use } from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Import the editor dynamically to avoid SSR issues
const Editor = dynamic(() => import("@/components/editor"), { ssr: false })

const CATEGORIES = [
  { value: "Prestasi", label: "Prestasi" },
  { value: "Kegiatan", label: "Kegiatan" },
  { value: "Pengumuman", label: "Pengumuman" },
  { value: "Akademik", label: "Akademik" },
  { value: "Ekstrakurikuler", label: "Ekstrakurikuler" },
]

interface NewsItem {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  image_url: string
  published: boolean
}

export default function EditNewsPage({ params }: { params: { id: string } }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const newsId = unwrappedParams.id

  const router = useRouter()
  const [news, setNews] = useState<NewsItem | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [published, setPublished] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Helper function to proxy image URLs
  const getProxiedImageUrl = (url: string) => {
    if (!url) return "/news-collage.png"
    if (url.startsWith("/")) return url
    return `/api/image-proxy?url=${encodeURIComponent(url)}`
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setFetchLoading(true)
        const response = await fetch(`/api/news/${newsId}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch news")
        }

        setNews(data.news)
        setTitle(data.news.title)
        setContent(data.news.content)
        setExcerpt(data.news.excerpt || "")
        setCategory(data.news.category)
        setPublished(data.news.published)
        setImagePreview(data.news.image_url)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        console.error("Error fetching news:", err)
      } finally {
        setFetchLoading(false)
      }
    }

    fetchNews()
  }, [newsId])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar terlalu besar. Maksimal 5MB.")
      e.target.value = ""
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.")
      e.target.value = ""
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate form
      if (!title) throw new Error("Judul harus diisi")
      if (!content) throw new Error("Konten harus diisi")
      if (!category) throw new Error("Kategori harus dipilih")
      if (!imagePreview && !fileInputRef.current?.files?.[0]) throw new Error("Gambar harus diunggah")

      // Create form data
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("excerpt", excerpt)
      formData.append("category", category)
      formData.append("published", published.toString())

      if (fileInputRef.current?.files?.[0]) {
        formData.append("image", fileInputRef.current.files[0])
      }

      // Submit form
      const response = await fetch(`/api/news/${newsId}`, {
        method: "PUT",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Gagal memperbarui berita")
      }

      // Redirect to news management page
      router.push("/admin/berita")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
      console.error("Error updating news:", err)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Berita</h1>
        <div className="flex justify-center items-center h-64">
          <p>Memuat data...</p>
        </div>
      </div>
    )
  }

  if (error && !news) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Berita</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
          <Button onClick={() => router.push("/admin/berita")} className="mt-2">
            Kembali
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" asChild className="mr-4">
          <Link href="/admin/berita">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Berita</h1>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul berita"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Konten</Label>
              <Editor value={content} onChange={setContent} placeholder="Tulis konten berita di sini..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Ringkasan (Opsional)</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Ringkasan singkat berita (akan ditampilkan di halaman utama)"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Gambar</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {imagePreview ? (
                          <div className="mb-4">
                            <img
                              src={imagePreview ? getProxiedImageUrl(imagePreview) : "/placeholder.svg"}
                              alt="Preview"
                              className="mx-auto h-32 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null)
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = ""
                                }
                              }}
                              className="mt-2 text-sm text-red-600 hover:text-red-800"
                            >
                              Ganti gambar
                            </button>
                          </div>
                        ) : (
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Unggah gambar</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              ref={fileInputRef}
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </label>
                          <p className="pl-1">atau drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 5MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="published" className="mr-4">
                      Publikasikan
                    </Label>
                    <Switch id="published" checked={published} onCheckedChange={setPublished} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/berita")} disabled={loading}>
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
