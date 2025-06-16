import { google } from "googleapis"
import { getGoogleCredentials, getGoogleDriveFolderId } from "./google-drive-config"

export async function checkDriveFolder() {
  try {
    const SCOPES = ["https://www.googleapis.com/auth/drive"]
    const folderId = getGoogleDriveFolderId()

    if (!folderId) {
      console.log("No folder ID specified. Files will be uploaded to alternative storage.")
      return {
        success: false,
        message: "No folder ID specified",
        usingAlternativeStorage: true,
      }
    }

    try {
      // Get credentials from environment variables or file
      const credentials = getGoogleCredentials()

      // Create a new JWT client using the credentials
      const auth = new google.auth.JWT(credentials.client_email, undefined, credentials.private_key, SCOPES)

      const drive = google.drive({ version: "v3", auth })

      try {
        const response = await drive.files.get({
          fileId: folderId,
          fields: "id,name,mimeType",
        })

        const file = response.data
        if (file.mimeType !== "application/vnd.google-apps.folder") {
          console.log("The provided ID is not a folder. Using alternative storage.")
          return {
            success: false,
            message: "The provided ID is not a folder",
            usingAlternativeStorage: true,
          }
        }

        console.log(`Folder found: ${file.name}`)
        return {
          success: true,
          message: `Folder found: ${file.name}`,
          folder: file,
        }
      } catch (error: any) {
        console.log("Error checking folder. Using alternative storage:", error.message)
        return {
          success: false,
          message: `Error checking folder: ${error.message}`,
          usingAlternativeStorage: true,
        }
      }
    } catch (error: any) {
      console.log("Error initializing Google Drive client. Using alternative storage:", error.message)
      return {
        success: false,
        message: `Error initializing Google Drive client: ${error.message}`,
        usingAlternativeStorage: true,
      }
    }
  } catch (error: any) {
    console.log("Unexpected error. Using alternative storage:", error.message)
    return {
      success: false,
      message: `Unexpected error: ${error.message}`,
      usingAlternativeStorage: true,
    }
  }
}
