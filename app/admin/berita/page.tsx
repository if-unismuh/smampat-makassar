"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Plus, Eye, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface NewsItem {
  id: string
  title: string
  slug: string
  category: string
  published: boolean
  created_at: string
  published_at: string | null
}

export default function NewsManagementPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [newsToDelete, setNewsToDelete] = useState<NewsItem | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      console.log("Fetching news directly from Supabase...")

      // Fetch news directly from Supabase
      const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false })

      if (error) {
        throw new Error(error.message)
      }

      console.log("Fetched news data:", data)
      setNews(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error("Error fetching news:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!newsToDelete) return

    try {
      // Delete directly with Supabase
      const { error } = await supabase.from("news").delete().eq("id", newsToDelete.id)

      if (error) {
        throw new Error(error.message)
      }

      // Remove the deleted news from the state
      setNews(news.filter((item) => item.id !== newsToDelete.id))
      setDeleteDialogOpen(false)
      setNewsToDelete(null)
    } catch (err) {
      console.error("Error deleting news:", err)
      alert(err instanceof Error ? err.message : "Failed to delete news")
    }
  }

  const confirmDelete = (item: NewsItem) => {
    setNewsToDelete(item)
    setDeleteDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  if (loading) {
    return (
      <div className="container py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Manajemen Berita</h1>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Manajemen Berita</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
          <Button onClick={fetchNews} className="mt-2">
            Coba Lagi
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 px-4">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Manajemen Berita</h1>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/berita/tambah">
            <Plus className="mr-2 h-4 w-4" /> Tambah Berita
          </Link>
        </Button>
      </div>

      {news.length === 0 ? (
        <Card className="p-8 text-center">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500 mb-4">Belum ada berita yang ditambahkan</p>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/admin/berita/tambah">
                  <Plus className="mr-2 h-4 w-4" /> Tambah Berita Pertama
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white rounded-md shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead className="hidden md:table-cell">Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Tanggal Dibuat</TableHead>
                <TableHead className="hidden lg:table-cell">Tanggal Publikasi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.category}</TableCell>
                  <TableCell>
                    {item.published ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Dipublikasikan</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(item.created_at)}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {item.published_at ? formatDate(item.published_at) : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild title="Lihat" className="hidden sm:flex">
                        <Link href={`/berita/${item.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild title="Edit">
                        <Link href={`/admin/berita/edit/${item.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => confirmDelete(item)}
                        className="text-red-500 hover:text-red-700"
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus berita &quot;
              {newsToDelete?.title}&quot;? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="mt-0">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
