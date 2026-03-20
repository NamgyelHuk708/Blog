"use client"

import { useState, useEffect, useCallback } from "react"
import { PostCard, type Post } from "@/components/post-card"
import { cn } from "@/lib/utils"

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [units, setUnits] = useState<number[]>([])
  const [activeFilter, setActiveFilter] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts")
        const data = await res.json()
        setPosts(data.posts)
        setUnits(data.units)
      } catch (error) {
        console.error("[v0] Error fetching posts:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const filteredPosts = activeFilter
    ? posts.filter((post) => post.unit === activeFilter)
    : posts

  const handleFilterChange = useCallback((unit: number | null) => {
    setActiveFilter(unit)
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#1a1a1a] rounded w-24" />
          <div className="h-4 bg-[#1a1a1a] rounded w-64" />
          <div className="flex gap-2 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-[#1a1a1a] rounded-lg w-20" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 bg-[#1a1a1a] rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in duration-300 max-w-[1100px] mx-auto px-6 md:px-8 py-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Blog</h1>
        <p className="text-[#888] mt-2">
          Unit-by-unit notes from DBS302 — Database Systems
        </p>
      </div>

      {/* Unit Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => handleFilterChange(null)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm transition",
            activeFilter === null
              ? "bg-indigo-950 border border-indigo-800 text-indigo-300"
              : "bg-[#111] border border-[#1a1a1a] text-[#666] hover:border-[#2a2a2a]"
          )}
        >
          All
        </button>
        {units.map((unit) => (
          <button
            key={unit}
            onClick={() => handleFilterChange(unit)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm transition",
              activeFilter === unit
                ? "bg-indigo-950 border border-indigo-800 text-indigo-300"
                : "bg-[#111] border border-[#1a1a1a] text-[#666] hover:border-[#2a2a2a]"
            )}
          >
            Unit {unit}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <PostCard post={post} showFullExcerpt />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-sm text-[#555]">No posts for this unit yet.</p>
        </div>
      )}
    </div>
  )
}
