import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { getDirectDownloadLink } from "@/lib/google-drive"

export async function GET() {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all gallery items
    const { data: galleryItems, error } = await supabase.from("gallery").select("*")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Track fixed items
    const fixedItems = []
    const allItems = []

    // Fix each item's URL if needed
    for (const item of galleryItems) {
      // Add to all items for debugging
      allItems.push({
        id: item.id,
        title: item.title,
        media_url: item.media_url,
        type: item.type,
      })

      // Check if the URL needs fixing
      if (
        item.media_url &&
        (item.media_url.includes("drive.google.com") ||
          item.media_url.includes("googleusercontent.com") ||
          item.media_url.includes("googleapis.com"))
      ) {
        // Get the direct download link
        const fixedUrl = getDirectDownloadLink(item.media_url)

        // Only update if the URL has changed
        if (fixedUrl !== item.media_url) {
          const { data, error: updateError } = await supabase
            .from("gallery")
            .update({
              media_url: fixedUrl,
              thumbnail_url: item.type === "image" ? fixedUrl : item.thumbnail_url,
            })
            .eq("id", item.id)
            .select()

          if (updateError) {
            console.error(`Error updating item ${item.id}:`, updateError)
          } else {
            fixedItems.push({ id: item.id, oldUrl: item.media_url, newUrl: fixedUrl })
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Fixed ${fixedItems.length} gallery items`,
      fixedItems,
      allItems, // Include all items for debugging
    })
  } catch (error) {
    console.error("Error fixing gallery URLs:", error)
    return NextResponse.json({ error: "Failed to fix gallery URLs" }, { status: 500 })
  }
}
