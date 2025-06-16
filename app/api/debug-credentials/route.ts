import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Create Supabase client with proper cookie handling
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get session
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get environment variables related to Google Drive
    const envVars = {
      GOOGLE_DRIVE_FOLDER_ID: process.env.GOOGLE_DRIVE_FOLDER_ID || "Not set",
      GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS || "Not set",
      USING_ENV_CREDENTIALS: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE ? "Yes" : "No",
    }

    // Check if credentials file exists
    let fileExists = false
    let fileContent = null
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS

    if (credentialsPath) {
      const resolvedPath = path.isAbsolute(credentialsPath)
        ? credentialsPath
        : path.resolve(process.cwd(), credentialsPath)

      fileExists = fs.existsSync(resolvedPath)

      if (fileExists) {
        try {
          // Read the file but mask sensitive information
          const rawContent = JSON.parse(fs.readFileSync(resolvedPath, "utf8"))
          fileContent = {
            type: rawContent.type,
            project_id: rawContent.project_id,
            private_key_id: maskString(rawContent.private_key_id),
            private_key: maskString(rawContent.private_key),
            client_email: rawContent.client_email,
            client_id: maskString(rawContent.client_id),
            auth_uri: rawContent.auth_uri,
            token_uri: rawContent.token_uri,
            auth_provider_x509_cert_url: rawContent.auth_provider_x509_cert_url,
            client_x509_cert_url: rawContent.client_x509_cert_url,
          }
        } catch (error) {
          fileContent = { error: "Could not parse credentials file" }
        }
      }
    }

    // Check if environment credentials are set
    const envCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_TYPE
      ? {
          type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
          project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
          private_key_id: maskString(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID),
          private_key: maskString(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY),
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
          client_id: maskString(process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID),
          auth_uri: process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_URI,
          token_uri: process.env.GOOGLE_SERVICE_ACCOUNT_TOKEN_URI,
          auth_provider_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
        }
      : null

    return NextResponse.json({
      success: true,
      environment: envVars,
      credentialsFile: {
        path: credentialsPath,
        exists: fileExists,
        content: fileContent,
      },
      envCredentials: envCredentials,
      nodeVersion: process.version,
      cwd: process.cwd(),
    })
  } catch (error) {
    console.error("Error in debug-credentials:", error)
    return NextResponse.json({ error: "Failed to retrieve credential information" }, { status: 500 })
  }
}

// Helper function to mask sensitive strings
function maskString(str?: string): string {
  if (!str) return "Not set"
  if (str.length <= 8) return "*".repeat(str.length)
  return str.substring(0, 4) + "*".repeat(str.length - 8) + str.substring(str.length - 4)
}
