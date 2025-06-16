"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchSection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [isPending, startTransition] = useTransition()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const category = searchParams.get("category") || "semua"
    const params = new URLSearchParams()

    if (category !== "semua") {
      params.set("category", category)
    }

    if (searchQuery) {
      params.set("q", searchQuery)
    }

    startTransition(() => {
      router.push(`/berita?${params.toString()}`)
    })
  }

  return (
    <section className="py-6 md:py-8">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari berita atau artikel..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isPending}
            />
          </form>
        </div>
      </div>
    </section>
  )
}
