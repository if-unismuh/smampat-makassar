import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(dateString: string): string {
    if (!dateString) return ""

    const date = new Date(dateString)

    // Check if date is valid
    if (isNaN(date.getTime())) return ""

    // Format: "10 April 2024"
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    }

    return date.toLocaleDateString("id-ID", options)
  }
