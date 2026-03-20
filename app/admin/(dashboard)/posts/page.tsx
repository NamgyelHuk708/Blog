"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PenSquare, Pencil, Trash2 } from "lucide-react"
import { UnitBadge } from "@/components/unit-badge"
import { DeleteModal } from "@/components/delete-modal"
import { ToastNotification } from "@/components/toast-notification"
import { deletePost } from "@/app/actions/posts"
import type { Post } from "@/components/post-card"

export default function AdminPostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteModalPost, setDeleteModalPost] = useState<Post | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    type: "success" | "error"
  } | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/admin/posts")
        const data = await res.json()
        setPosts(data.posts)
      } catch (error) {
        console.error("[v0] Error fetching posts:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleDelete = async () => {
    if (!deleteModalPost) return

    setIsDeleting(true)
    const result = await deletePost(deleteModalPost.slug)

    if (result.success) {
      setPosts(posts.filter((p) => p.slug !== deleteModalPost.slug))
      setToast({ message: "Post deleted successfully", type: "success" })
    } else {
      setToast({ message: result.error || "Failed to delete post", type: "error" })
    }

    setIsDeleting(false)
    setDeleteModalPost(null)
    router.refresh()
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-[#1a1a1a] rounded w-32 mb-8" />
        <div className="h-64 bg-[#1a1a1a] rounded-xl" />
      </div>
    )
  }

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">All Posts</h1>
          <p className="text-sm text-[#555] mt-1">{posts.length} posts total</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition"
        >
          <PenSquare className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Posts Table */}
      {posts.length > 0 ? (
        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="text-left py-3 px-5 text-xs text-[#666] uppercase tracking-wide font-medium">
                  Title
                </th>
                <th className="text-left py-3 px-5 text-xs text-[#666] uppercase tracking-wide font-medium">
                  Unit
                </th>
                <th className="text-left py-3 px-5 text-xs text-[#666] uppercase tracking-wide font-medium">
                  Date
                </th>
                <th className="text-left py-3 px-5 text-xs text-[#666] uppercase tracking-wide font-medium">
                  Status
                </th>
                <th className="text-left py-3 px-5 text-xs text-[#666] uppercase tracking-wide font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr
                  key={post.slug}
                  className={`hover:bg-[#141414] transition ${
                    index !== posts.length - 1
                      ? "border-b border-[#1a1a1a]"
                      : ""
                  }`}
                >
                  <td className="py-4 px-5 text-sm text-[#f0f0f0] font-medium">
                    {post.title}
                  </td>
                  <td className="py-4 px-5">
                    <UnitBadge unit={post.unit} />
                  </td>
                  <td className="py-4 px-5 text-sm text-[#666]">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-5">
                    {post.published ? (
                      <span className="bg-green-950 text-green-400 border border-green-900 rounded-md px-2 py-0.5 text-xs">
                        Published
                      </span>
                    ) : (
                      <span className="bg-[#1a1a1a] text-[#666] border border-[#2a2a2a] rounded-md px-2 py-0.5 text-xs">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/posts/${post.slug}/edit`}
                        className="inline-flex items-center gap-1.5 border border-[#2a2a2a] hover:border-indigo-500/50 bg-transparent rounded-lg px-3 py-1.5 text-xs text-[#888] hover:text-white transition"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteModalPost(post)}
                        className="inline-flex items-center gap-1.5 border border-red-900 hover:bg-red-950 text-red-400 rounded-lg px-3 py-1.5 text-xs transition"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-8 text-center">
          <p className="text-sm text-[#555]">
            No posts yet. Write your first one.
          </p>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition mt-4"
          >
            <PenSquare className="w-4 h-4" />
            New Post
          </Link>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalPost && (
        <DeleteModal
          postTitle={deleteModalPost.title}
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteModalPost(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
