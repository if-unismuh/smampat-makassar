import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-school-blue-light/30 to-white">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-school-blue" />
        <p className="text-school-blue font-medium">Memuat dashboard...</p>
      </div>
    </div>
  )
}
