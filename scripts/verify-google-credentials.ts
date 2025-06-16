import { google } from "googleapis"
import { getGoogleCredentialsPath, getGoogleDriveFolderId } from "../lib/google-drive-config"

async function verifyGoogleDriveCredentials() {
  try {
    console.log("Verifying Google Drive credentials...")

    const credentialsPath = getGoogleCredentialsPath()
    console.log(`Using credentials from: ${credentialsPath}`)

    const folderId = getGoogleDriveFolderId()
    console.log(`Target folder ID: ${folderId || "Not set (will use root folder)"}`)

    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ["https://www.googleapis.com/auth/drive"],
    })

    const drive = google.drive({ version: "v3", auth })

    // Test API access by listing files
    const response = await drive.files.list({
      pageSize: 10,
      fields: "files(id, name)",
    })

    console.log("Successfully connected to Google Drive API!")
    console.log(`Found ${response.data.files?.length || 0} files in the root directory`)

    // If folder ID is set, verify it exists
    if (folderId) {
      try {
        const folder = await drive.files.get({
          fileId: folderId,
          fields: "id, name, mimeType",
        })

        if (folder.data.mimeType === "application/vnd.google-apps.folder") {
          console.log(`Target folder verified: "${folder.data.name}" (${folder.data.id})`)
        } else {
          console.warn(`Warning: The specified ID is not a folder: ${folder.data.mimeType}`)
        }
      } catch (error) {
        console.error(`Error: Could not access the specified folder ID: ${folderId}`)
        console.error(error)
      }
    }

    console.log("Verification complete!")
  } catch (error) {
    console.error("Error verifying Google Drive credentials:")
    console.error(error)
    process.exit(1)
  }
}

verifyGoogleDriveCredentials()
