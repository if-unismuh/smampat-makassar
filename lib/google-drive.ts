import { google } from "googleapis"
import { Readable } from "stream"
import { getGoogleCredentials, getGoogleDriveFolderId } from "./google-drive-config"

// Initialize the Google Drive API client
const initDriveClient = () => {
  const SCOPES = ["https://www.googleapis.com/auth/drive"]

  try {
    // Get credentials from environment variables or file
    const credentials = getGoogleCredentials()

    // Create a new JWT client using the credentials
    const auth = new google.auth.JWT(credentials.client_email, undefined, credentials.private_key, SCOPES)

    return google.drive({ version: "v3", auth })
  } catch (error) {
    console.error("Error initializing Google Drive client:", error)
    throw error
  }
}

// Function to upload a file to Google Drive
export const uploadFileToDrive = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
): Promise<{ fileId: string; webViewLink: string }> => {
  try {
    const drive = initDriveClient()

    // FIXED: Don't use parents parameter if no folder ID is provided
    // or if we're not sure the folder exists
    const requestBody: any = {
      name: fileName,
      mimeType: mimeType,
    }

    // Only add the folder if it's specified
    const folderId = getGoogleDriveFolderId()
    if (folderId && folderId.trim() !== "") {
      requestBody.parents = [folderId]
    }

    // Create a readable stream from the buffer
    const bufferStream = new Readable()
    bufferStream.push(fileBuffer)
    bufferStream.push(null)

    try {
      // Upload the file to Google Drive
      const response = await drive.files.create({
        requestBody,
        media: {
          mimeType: mimeType,
          body: bufferStream,
        },
        fields: "id, webViewLink",
      })

      // Make the file publicly accessible
      await drive.permissions.create({
        fileId: response.data.id as string,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      })

      // Return the direct download link
      return {
        fileId: response.data.id as string,
        webViewLink: `https://drive.google.com/uc?export=view&id=${response.data.id}`,
      }
    } catch (error) {
      console.error("Error uploading file to Google Drive:", error)
      throw error
    }
  } catch (error) {
    console.error("Error initializing Google Drive client:", error)
    throw error
  }
}

// Function to get a direct download link for a file
export const getDirectDownloadLink = (fileIdOrUrl: string): string => {
  // If it's already a file ID, convert it directly
  if (!fileIdOrUrl.includes("/")) {
    return `https://drive.google.com/uc?export=view&id=${fileIdOrUrl}`
  }

  // Convert the Google Drive link to a direct download link
  if (fileIdOrUrl.includes("drive.google.com/file/d/")) {
    const fileId = fileIdOrUrl.split("/file/d/")[1].split("/")[0]
    return `https://drive.google.com/uc?export=view&id=${fileId}`
  } else if (fileIdOrUrl.includes("drive.google.com/open?id=")) {
    const fileId = fileIdOrUrl.split("open?id=")[1].split("&")[0]
    return `https://drive.google.com/uc?export=view&id=${fileId}`
  } else if (fileIdOrUrl.includes("googleusercontent.com")) {
    // Already a direct link
    return fileIdOrUrl
  } else if (fileIdOrUrl.includes("drive.google.com/uc?export=view&id=")) {
    // Already in the correct format
    return fileIdOrUrl
  }

  return fileIdOrUrl
}
