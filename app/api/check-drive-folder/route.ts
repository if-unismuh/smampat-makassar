import { NextResponse } from "next/server"
import { checkDriveFolder } from "@/lib/check-drive-folder"
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

    const result = await checkDriveFolder()

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error checking Drive folder:", error)
    return NextResponse.json({ error: "Failed to check Drive folder" }, { status: 500 })
  }
}
