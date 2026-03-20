import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PostCard } from "@/components/post-card"
import { getPublishedPosts } from "@/lib/posts"

export default function HomePage() {
  const posts = getPublishedPosts().slice(0, 3)

  return (
    <div className="animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 text-center">
        {/* Faint indigo radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(99, 102, 241, 0.05) 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-[1100px] mx-auto px-6 md:px-8">
          <p className="text-xs tracking-[0.2em] uppercase text-indigo-400">
            Software Engineering · CST, RUB
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-white mt-3">
            Namgyel Wangchuk
          </h1>
          <p className="text-lg text-[#888] max-w-xl mx-auto mt-4 leading-relaxed">
            Documenting my journey in software engineering. Here you will find
            technical insights on database systems, algorithms, and full-stack development.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <Link
              href="/blog"
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition"
            >
              Read the Blog
            </Link>
            <Link
              href="/about"
              className="border border-[#2a2a2a] hover:border-indigo-500/50 bg-transparent rounded-lg px-5 py-2.5 text-sm text-[#888] hover:text-white transition"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-8 pb-24">
        <div className="flex items-center mb-8">
          <span className="border-l-2 border-indigo-500 pl-3 text-xs tracking-[0.15em] uppercase text-[#555]">
            Latest Posts
          </span>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-[#555]">No posts yet. Check back soon!</p>
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-[#888] hover:text-white transition"
          >
            View all posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
