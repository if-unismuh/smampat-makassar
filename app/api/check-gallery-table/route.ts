import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

export async function GET() {
  try {
    // Check authentication - properly await cookies()
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if gallery table exists
    const { data: tableExists, error: tableError } = await supabase.from("gallery").select("id").limit(1).maybeSingle()

    if (tableError && tableError.code !== "PGRST116") {
      // PGRST116 is "no rows returned" which is fine
      return NextResponse.json({
        exists: false,
        error: tableError.message,
        code: tableError.code,
        details: tableError,
      })
    }

    // Get table structure
    const { data: tableInfo, error: infoError } = await supabase.rpc("get_table_info", {
      table_name: "gallery",
    })

    return NextResponse.json({
      exists: true,
      tableInfo: tableInfo || "Table exists but couldn't fetch structure",
      error: infoError?.message,
    })
  } catch (error) {
    console.error("Error checking gallery table:", error)
    return NextResponse.json({ error: "Failed to check gallery table" }, { status: 500 })
  }
}
