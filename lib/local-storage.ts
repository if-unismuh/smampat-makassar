/**
 * Local storage fallback for when Google Drive is not available
 * This provides temporary storage while Google Drive issues are being resolved
 */

import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "public", "uploads")

export async function ensureUploadsDirExists() {
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }
    return true
  } catch (error) {
    console.error("Error creating uploads directory:", error)
    return false
  }
}

export async function saveFileToLocalStorage(file: Buffer, filename: string): Promise<string | null> {
  try {
    await ensureUploadsDirExists()

    // Generate a unique filename
    const uniqueFilename = `${uuidv4()}-${filename}`
    const filePath = path.join(uploadsDir, uniqueFilename)

    // Write the file
    fs.writeFileSync(filePath, file)

    // Return the public URL
    return `/uploads/${uniqueFilename}`
  } catch (error) {
    console.error("Error saving file to local storage:", error)
    return null
  }
}

export async function deleteFileFromLocalStorage(fileUrl: string): Promise<boolean> {
  try {
    // Extract filename from URL
    const filename = path.basename(fileUrl)
    const filePath = path.join(uploadsDir, filename)

    // Check if file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlinkSync(filePath)
      return true
    }
    return false
  } catch (error) {
    console.error("Error deleting file from local storage:", error)
    return false
  }
}
