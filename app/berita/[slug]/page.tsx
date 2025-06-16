import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { ArrowLeft, Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic"
export const revalidate = 3600 // Revalidate every hour

// Function to get proxied image URL
const getProxiedImageUrl = (url: string, id: string) => {
  if (!url) return "/news-collage.png"

  // If it's already a local URL, return as is
  if (url.startsWith("/")) return url

  // Otherwise, use the image proxy
  return `/api/image-proxy?url=${encodeURIComponent(url)}&id=${id}`
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Properly await cookies
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  // Fetch the news article
  const { data: article, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !article) {
    console.error("Error fetching article:", error)
    notFound()
  }

  // Fetch related articles from the same category
  const { data: relatedArticles } = await supabase
    .from("news")
    .select("*")
    .eq("category", article.category)
    .eq("published", true)
    .neq("id", article.id)
    .order("published_at", { ascending: false })
    .limit(3)

  return (
    <div className="bg-gradient-to-b from-school-blue/5 to-white">
      <div className="container px-4 sm:px-6 py-8 md:py-12">
        {/* Back button */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/berita" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Berita
            </Link>
          </Button>
        </div>

        {/* Article header */}
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full bg-school-blue/10 px-2.5 py-0.5 text-xs font-medium text-school-blue">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.published_at)}</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            {article.title}
          </h1>

          {/* Featured image */}
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <Image
              src={getProxiedImageUrl(article.image_url, article.id) || "/placeholder.svg"}
              alt={article.title}
              width={1200}
              height={600}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* Article content */}
          <div className="prose prose-blue max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>

        {/* Related articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Artikel Terkait</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((item) => (
                <Card key={item.id} className="h-full overflow-hidden">
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
