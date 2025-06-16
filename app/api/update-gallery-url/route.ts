import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { id, url } = body

    if (!id || !url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check authentication
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the gallery item
    const { data: item, error: fetchError } = await supabase.from("gallery").select("*").eq("id", id).single()

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Update the gallery item
    const { data, error: updateError } = await supabase
      .from("gallery")
      .update({
        media_url: url,
        thumbnail_url: item.type === "image" ? url : item.thumbnail_url,
      })
      .eq("id", id)
      .select()

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("Error updating gallery URL:", error)
    return NextResponse.json({ error: "Failed to update gallery URL" }, { status: 500 })
  }
}
