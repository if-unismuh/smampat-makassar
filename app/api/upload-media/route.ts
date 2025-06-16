import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { uploadFileToDrive } from "@/lib/google-drive"

export async function POST(request: NextRequest) {
  try {
    // Check authentication - properly await cookies()
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse the multipart form data
    const formData = await request.formData()
    const title = formData.get("title") as string
    const type = formData.get("type") as "image" | "video"
    const file = formData.get("media") as File

    if (!title || !type || !file) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate file type
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    const validVideoTypes = ["video/mp4", "video/webm", "video/ogg"]

    const validTypes = type === "image" ? validImageTypes : validVideoTypes

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Supported types for ${type} are: ${validTypes.join(", ")}` },
        { status: 400 },
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 })
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate a unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split(".").pop()
    const fileName = `${type}_${timestamp}.${fileExtension}`

    // Upload file to Google Drive
    const { fileId, webViewLink } = await uploadFileToDrive(buffer, fileName, file.type)

    // Ensure we have a direct download link
    const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`

    // Log the links for debugging
    console.log("File ID:", fileId)
    console.log("Direct link:", directLink)

    // Store metadata in Supabase
    try {
      const { data, error } = await supabase
        .from("gallery")
        .insert({
          title,
          type,
          media_url: directLink,
          thumbnail_url: type === "video" ? null : directLink,
        })
        .select()
        .single()

      if (error) {
        console.error("Supabase error details:", error)
        return NextResponse.json({ error: `Failed to store metadata: ${error.message}` }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        data,
      })
    } catch (supabaseError) {
      console.error("Supabase exception:", supabaseError)
      return NextResponse.json({ error: "Exception when storing metadata in Supabase" }, { status: 500 })
    }
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
