import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    // Create Supabase client with proper cookie handling
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse the multipart form data
    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]

    if (!validImageTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Supported types are: ${validImageTypes.join(", ")}` },
        { status: 400 },
      )
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 })
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate a unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split(".").pop()
    const fileName = `news-content-${timestamp}.${fileExtension}`

    try {
      // Import the Google Drive upload function
      const { uploadFileToDrive } = await import("@/lib/google-drive")

      // Upload to Google Drive
      const { webViewLink } = await uploadFileToDrive(buffer, fileName, file.type)

      // Return the direct download link
      return NextResponse.json({
        success: true,
        url: webViewLink,
      })
    } catch (driveError) {
      console.error("Google Drive upload failed:", driveError)
      return NextResponse.json({ error: "Failed to upload image to Google Drive" }, { status: 500 })
    }
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
