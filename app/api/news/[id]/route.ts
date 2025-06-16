import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { uploadFileToDrive } from "@/lib/google-drive"
import { google } from "googleapis"

// GET - Fetch a single news article
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { data: news, error } = await supabase.from("news").select("*").eq("id", params.id).single()

    if (error) {
      console.error("Error fetching news:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ news })
  } catch (error) {
    console.error(`Error in GET /api/news/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

// PUT - Update a news article
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get form data
    const formData = await request.formData()
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const excerpt = formData.get("excerpt") as string
    const category = formData.get("category") as string
    const published = formData.get("published") === "true"

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    // Get the current news article to check if we need to update the image
    const { data: currentNews, error: fetchError } = await supabase
      .from("news")
      .select("image_url")
      .eq("id", params.id)
      .single()

    if (fetchError) {
      console.error("Error fetching current news:", fetchError)
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    // Handle image upload if a new image is provided
    let image_url = currentNews.image_url
    const imageFile = formData.get("image") as File

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      const fileName = `news-${Date.now()}-${imageFile.name}`

      try {
        // Upload new image
        const uploadResult = await uploadFileToDrive(buffer, fileName, imageFile.type)
        image_url = uploadResult.webViewLink

        // Optionally delete old image if it exists
        if (currentNews.image_url) {
          try {
            // Extract file ID from Google Drive URL
            const oldFileId = extractFileIdFromUrl(currentNews.image_url)
            if (oldFileId) {
              await deleteFileFromDrive(oldFileId)
            }
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError)
            // Continue even if delete fails
          }
        }
      } catch (uploadError) {
        console.error("Error uploading image to Google Drive:", uploadError)
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
      }
    }

    // Update timestamp
    const now = new Date().toISOString()

    // Prepare update data
    const updateData: any = {
      title,
      slug,
      content,
      excerpt,
      category,
      image_url,
      updated_at: now,
    }

    // Only update published_at if the published status changes
    if (published && !currentNews.published_at) {
      updateData.published_at = now
    }
    updateData.published = published

    // Update in database
    const { data, error } = await supabase.from("news").update(updateData).eq("id", params.id).select()

    if (error) {
      console.error("Error updating news:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, news: data[0] })
  } catch (error) {
    console.error(`Error in PUT /api/news/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update news" }, { status: 500 })
  }
}

// DELETE - Delete a news article
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the current news article to get the image URL
    const { data: news, error: fetchError } = await supabase
      .from("news")
      .select("image_url")
      .eq("id", params.id)
      .single()

    if (fetchError) {
      console.error("Error fetching news:", fetchError)
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    // Delete the image from Google Drive if it exists
    if (news.image_url) {
      try {
        const fileId = extractFileIdFromUrl(news.image_url)
        if (fileId) {
          await deleteFileFromDrive(fileId)
        }
      } catch (deleteError) {
        console.error("Error deleting image from Google Drive:", deleteError)
        // Continue even if image deletion fails
      }
    }

    // Delete from database
    const { error } = await supabase.from("news").delete().eq("id", params.id)

    if (error) {
      console.error("Error deleting news:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error in DELETE /api/news/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 })
  }
}

// Helper function to extract file ID from Google Drive URL
function extractFileIdFromUrl(url: string): string | null {
  if (!url) return null

  // Handle different Google Drive URL formats
  if (url.includes("drive.google.com/file/d/")) {
    return url.split("/file/d/")[1].split("/")[0]
  } else if (url.includes("drive.google.com/open?id=")) {
    return url.split("open?id=")[1].split("&")[0]
  } else if (url.includes("drive.google.com/uc?export=view&id=")) {
    return url.split("id=")[1].split("&")[0]
  }

  return null
}

// Helper function to delete a file from Google Drive
async function deleteFileFromDrive(fileId: string): Promise<void> {
  try {
    const { getGoogleCredentials } = await import("@/lib/google-drive-config")
    const credentials = getGoogleCredentials()
    const auth = new google.auth.JWT(credentials.client_email, undefined, credentials.private_key, [
      "https://www.googleapis.com/auth/drive",
    ])

    const drive = google.drive({ version: "v3", auth })
    await drive.files.delete({ fileId })
  } catch (error) {
    console.error("Error deleting file from Google Drive:", error)
    throw error
  }
}
