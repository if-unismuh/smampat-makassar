import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"
import slugify from "slugify"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const offset = (page - 1) * limit

    // Build query
    let query = supabase.from("news").select("*", { count: "exact" }).order("created_at", { ascending: false })

    // Apply filters if provided
    if (category && category !== "semua") {
      query = query.eq("category", category)
    }

    if (search) {
      query = query.ilike("title", `%${search}%`)
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error("Error fetching news:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`Fetched ${data?.length || 0} news articles`)

    return NextResponse.json({
      data,
      meta: {
        total: count || 0,
        page,
        limit,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
    })
  } catch (error) {
    console.error("Error in news GET route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    // Parse form data
    const formData = await request.formData()
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const excerpt = formData.get("excerpt") as string
    const category = formData.get("category") as string
    const published = formData.get("published") === "true"
    const imageFile = formData.get("image") as File

    // Validate required fields
    if (!title || !content || !category || !imageFile) {
      return NextResponse.json({ error: "Title, content, category, and image are required" }, { status: 400 })
    }

    // Generate slug from title
    let slug = slugify(title, { lower: true, strict: true })

    // Check if slug already exists
    const { data: existingSlug } = await supabase.from("news").select("slug").eq("slug", slug).single()

    // If slug exists, append a random string
    if (existingSlug) {
      slug = `${slug}-${uuidv4().substring(0, 8)}`
    }

    // Upload image to Google Drive
    const arrayBuffer = await imageFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const fileName = `news-${Date.now()}-${imageFile.name}`

    // Import the Google Drive upload function
    const { uploadFileToDrive } = await import("@/lib/google-drive")

    // Upload to Google Drive
    const { webViewLink } = await uploadFileToDrive(buffer, fileName, imageFile.type)

    // Prepare data for insertion
    const now = new Date().toISOString()
    const newsData = {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      category,
      image_url: webViewLink,
      published,
      created_at: now,
      updated_at: now,
      published_at: published ? now : null,
    }

    // Insert into database
    const { data, error } = await supabase.from("news").insert(newsData).select().single()

    if (error) {
      console.error("Error inserting news:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in news POST route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
