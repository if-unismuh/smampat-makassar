import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

export async function GET(request: NextRequest) {
  try {
    // Get the URL from the query string
    const { searchParams } = new URL(request.url)
    const url = searchParams.get("url")
    const id = searchParams.get("id")

    if (!url) {
      return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 })
    }

    // Fetch the image
    try {
      const response = await fetch(url, {
        headers: {
          // Add headers to avoid CORS issues
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      })

      if (!response.ok) {
        console.error(`Failed to fetch image: ${response.status} ${response.statusText}`)

        // If we have an ID, update the database to mark this URL as problematic
        if (id) {
          const cookieStore = await cookies()
          const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(cookieStore) })
          const { data: session } = await supabase.auth.getSession()

          if (session?.session) {
            await supabase
              .from("gallery")
              .update({
                thumbnail_url: "/abstract-colorful-swirls.png",
              })
              .eq("id", id)
          }
        }

        // Return a fallback image
        const fallbackResponse = await fetch(new URL("/abstract-colorful-swirls.png", request.url.toString()))
        const fallbackData = await fallbackResponse.arrayBuffer()
        return new NextResponse(fallbackData, {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=86400",
          },
        })
      }

      // Get the image data
      const imageData = await response.arrayBuffer()

      // Determine the content type
      const contentType = response.headers.get("content-type") || "image/jpeg"

      // Return the image
      return new NextResponse(imageData, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=86400", // Cache for 24 hours
        },
      })
    } catch (error) {
      console.error("Error fetching image:", error)

      // Return a fallback image
      const fallbackResponse = await fetch(new URL("/abstract-colorful-swirls.png", request.url.toString()))
      const fallbackData = await fallbackResponse.arrayBuffer()
      return new NextResponse(fallbackData, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400",
        },
      })
    }
  } catch (error) {
    console.error("Error proxying image:", error)
    return NextResponse.json({ error: "Failed to proxy image" }, { status: 500 })
  }
}
