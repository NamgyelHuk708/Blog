import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPublishedPosts, getPostBySlug, getAdjacentPosts } from "@/lib/posts"
import { UnitBadge } from "@/components/unit-badge"
import { useMDXComponents } from "@/components/mdx-components"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getPublishedPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post || !post.published) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | DBS302 Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post || !post.published) {
    notFound()
  }

  const { prev, next } = getAdjacentPosts(slug)
  const components = useMDXComponents()

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="animate-in fade-in duration-300 max-w-[1100px] mx-auto px-6 md:px-8 py-16">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-white transition mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        All Posts
      </Link>

      {/* Post Header */}
      <header className="max-w-[768px] mx-auto">
        <div className="flex items-center gap-3">
          <UnitBadge unit={post.unit} />
          <span className="text-xs text-[#555]">{formattedDate}</span>
          <span className="text-xs text-[#555]">{post.readTime}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white mt-4 mb-2">
          {post.title}
        </h1>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#111] border border-[#1a1a1a] rounded-md px-2 py-0.5 text-xs text-[#666]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="border-t border-[#1a1a1a] mt-8 mb-10" />
      </header>

      {/* MDX Content */}
      <article className="max-w-[768px] mx-auto prose prose-invert">
        <MDXRemote source={post.content} components={components} />
      </article>

      {/* Post Navigation */}
      {(prev || next) && (
        <nav className="max-w-[768px] mx-auto mt-16 border-t border-[#1a1a1a] pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="group rounded-xl bg-[#111] border border-[#1a1a1a] p-5 hover:border-indigo-500/20 hover:bg-[#141414] transition"
              >
                <span className="text-xs text-[#555]">← Previous Post</span>
                <div className="mt-2">
                  <UnitBadge unit={prev.unit} />
                </div>
                <p className="text-sm font-medium text-[#f0f0f0] mt-2 group-hover:text-white">
                  {prev.title}
                </p>
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="group rounded-xl bg-[#111] border border-[#1a1a1a] p-5 hover:border-indigo-500/20 hover:bg-[#141414] transition md:text-right md:ml-auto"
              >
                <span className="text-xs text-[#555]">Next Post →</span>
                <div className="mt-2 md:flex md:justify-end">
                  <UnitBadge unit={next.unit} />
                </div>
                <p className="text-sm font-medium text-[#f0f0f0] mt-2 group-hover:text-white">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  )
}
