import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Client components for animations
import { NewsHero } from "@/components/news/news-hero"
import { NewsGrid } from "@/components/news/news-grid"
import { SearchSection } from "@/components/news/search-section"

export const dynamic = "force-dynamic"
export const revalidate = 3600 // Revalidate every hour

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Properly await cookies
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  // Get the category from search params or default to "semua"
  const categoryParam = typeof searchParams.category === "string" ? searchParams.category : "semua"
  const searchQuery = typeof searchParams.q === "string" ? searchParams.q : ""

  // Fetch all news articles
  let query = supabase.from("news").select("*").eq("published", true).order("published_at", { ascending: false })

  // Apply category filter if not "semua"
  if (categoryParam !== "semua") {
    query = query.eq("category", categoryParam)
  }

  // Apply search filter if provided
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`)
  }

  const { data: allNews, error } = await query

  if (error) {
    console.error("Error fetching news:", error)
  }

  // Group news by category for the tabs
  const kegiatanNews = allNews?.filter((news) => news.category === "Kegiatan") || []
  const prestasiNews = allNews?.filter((news) => news.category === "Prestasi") || []
  const pengumumanNews = allNews?.filter((news) => news.category === "Pengumuman") || []

  return (
    <div>
      {/* Hero Section */}
      <NewsHero />

      {/* Search Section */}
      <SearchSection />

      {/* News Tabs Section */}
      <section className="py-8 md:py-16">
        <div className="container px-4 sm:px-6">
          <Tabs defaultValue={categoryParam} className="mx-auto max-w-5xl">
            <TabsList className="mb-6 md:mb-8 grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="semua" className="text-xs sm:text-sm" asChild>
                <Link href="/berita?category=semua">Semua</Link>
              </TabsTrigger>
              <TabsTrigger value="Kegiatan" className="text-xs sm:text-sm" asChild>
                <Link href="/berita?category=Kegiatan">Kegiatan</Link>
              </TabsTrigger>
              <TabsTrigger value="Prestasi" className="text-xs sm:text-sm" asChild>
                <Link href="/berita?category=Prestasi">Prestasi</Link>
              </TabsTrigger>
              <TabsTrigger value="Pengumuman" className="text-xs sm:text-sm" asChild>
                <Link href="/berita?category=Pengumuman">Pengumuman</Link>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="semua">
              <NewsGrid news={allNews || []} />
            </TabsContent>

            <TabsContent value="Kegiatan">
              <NewsGrid news={kegiatanNews} />
            </TabsContent>

            <TabsContent value="Prestasi">
              <NewsGrid news={prestasiNews} />
            </TabsContent>

            <TabsContent value="Pengumuman">
              <NewsGrid news={pengumumanNews} />
            </TabsContent>
          </Tabs>

          {/* Load More button - can be implemented with pagination later */}
          {allNews && allNews.length > 0 && (
            <div className="mt-10 md:mt-12 flex justify-center">
              <Button variant="outline">Muat Lebih Banyak</Button>
            </div>
          )}

          {/* No results message */}
          {allNews && allNews.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900">Tidak ada berita ditemukan</h3>
              <p className="mt-2 text-muted-foreground">Silakan coba dengan kata kunci atau kategori lain.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
