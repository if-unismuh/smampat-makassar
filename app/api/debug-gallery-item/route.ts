import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

export async function GET(request: Request) {
  try {
    // Get the item ID from the query string
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 })
    }

    // Check authentication
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(cookieStore) })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the gallery item
    const { data: item, error } = await supabase.from("gallery").select("*").eq("id", id).single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Test if the image URL is accessible
    let imageStatus = "unknown"
    try {
      if (item.media_url) {
        const response = await fetch(item.media_url, { method: "HEAD" })
        imageStatus = response.ok ? "accessible" : "inaccessible"
      }
    } catch (error) {
      imageStatus = "error"
      console.error("Error checking image URL:", error)
    }

    return NextResponse.json({
      item,
      imageStatus,
    })
  } catch (error) {
    console.error("Error debugging gallery item:", error)
    return NextResponse.json({ error: "Failed to debug gallery item" }, { status: 500 })
  }
}
