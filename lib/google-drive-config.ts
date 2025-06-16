import * as fs from "fs"
import * as path from "path"

// Function to get credentials either from file or environment variables
export function getGoogleCredentials() {
  // Check if we have credentials in environment variables
  if (process.env.GOOGLE_SERVICE_ACCOUNT_TYPE) {
    // Return credentials object constructed from environment variables
    return {
      type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
      project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
      private_key_id: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
      auth_uri: process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_URI,
      token_uri: process.env.GOOGLE_SERVICE_ACCOUNT_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
      universe_domain: process.env.GOOGLE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
    }
  }

  // Fallback to file-based credentials if environment variables are not set
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (credentialsPath) {
    // If it's an absolute path, use it directly
    if (path.isAbsolute(credentialsPath)) {
      if (fs.existsSync(credentialsPath)) {
        return JSON.parse(fs.readFileSync(credentialsPath, "utf8"))
      }
      console.warn(`Warning: GOOGLE_APPLICATION_CREDENTIALS points to non-existent file: ${credentialsPath}`)
    } else {
      // If it's a relative path, resolve it from project root
      const resolvedPath = path.resolve(process.cwd(), credentialsPath)
      if (fs.existsSync(resolvedPath)) {
        return JSON.parse(fs.readFileSync(resolvedPath, "utf8"))
      }
      console.warn(`Warning: GOOGLE_APPLICATION_CREDENTIALS points to non-existent file: ${resolvedPath}`)
    }
  }

  throw new Error(
    "Google Drive credentials not found. Please set GOOGLE_APPLICATION_CREDENTIALS environment variable or provide credentials via environment variables.",
  )
}

export function getGoogleDriveFolderId(): string {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID
  if (!folderId) {
    console.warn(
      "Warning: GOOGLE_DRIVE_FOLDER_ID is not set. Files will be uploaded to the root of the service account Drive.",
    )
    return ""
  }
  return folderId
}
