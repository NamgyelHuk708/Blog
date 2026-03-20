"use client"

import Link from "next/link"
import { UnitBadge } from "@/components/unit-badge"
import { ArrowRight } from "lucide-react"

export interface Post {
  slug: string
  title: string
  unit: number
  date: string
  excerpt: string
  tags: string[]
  readTime: string
  published: boolean
}

interface PostCardProps {
  post: Post
  showFullExcerpt?: boolean
}

export function PostCard({ post, showFullExcerpt = false }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group rounded-xl bg-[#111] border border-[#1a1a1a] p-5 hover:border-indigo-500/20 hover:bg-[#141414] transition duration-200 cursor-pointer">
        <div className="flex items-center justify-between">
          <UnitBadge unit={post.unit} />
          <span className="text-xs text-[#555]">{formattedDate}</span>
        </div>
        <h3 className="text-lg font-semibold text-[#f0f0f0] mt-3 tracking-tight">
          {post.title}
        </h3>
        <p className={`text-sm text-[#777] leading-relaxed mt-1 ${!showFullExcerpt ? "line-clamp-2" : ""}`}>
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-[#555]">{post.readTime}</span>
          <ArrowRight className="w-4 h-4 text-[#555] group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-200" />
        </div>
      </article>
    </Link>
  )
}
