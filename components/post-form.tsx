"use client"

import { useState, useCallback, KeyboardEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, Loader2 } from "lucide-react"
import { PostCard } from "@/components/post-card"
import { ToastNotification } from "@/components/toast-notification"
import { createPost, updatePost, deletePost } from "@/app/actions/posts"
import { DeleteModal } from "@/components/delete-modal"

interface PostFormProps {
  mode: "new" | "edit"
  initialData?: {
    slug: string
    title: string
    unit: number
    date: string
    excerpt: string
    tags: string[]
    readTime: string
    published: boolean
    content: string
  }
}

export function PostForm({ mode, initialData }: PostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    type: "success" | "error"
  } | null>(null)
  const [error, setError] = useState("")

  // Form state
  const [title, setTitle] = useState(initialData?.title || "")
  const [unit, setUnit] = useState(initialData?.unit || 1)
  const [date, setDate] = useState(
    initialData?.date || new Date().toISOString().split("T")[0]
  )
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [tagsInput, setTagsInput] = useState("")
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [readTime, setReadTime] = useState(initialData?.readTime || "5 min read")
  const [published, setPublished] = useState(initialData?.published ?? false)
  const [content, setContent] = useState(initialData?.content || "")

  // Update tags from initial data when editing
  useEffect(() => {
    if (initialData?.tags) {
      setTags(initialData.tags)
    }
  }, [initialData?.tags])

  // Handle tag input
  const handleTagsInputChange = (value: string) => {
    setTagsInput(value)
    
    // Check for comma to add tag
    if (value.endsWith(",")) {
      const newTag = value.slice(0, -1).trim()
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag])
      }
      setTagsInput("")
    }
  }

  const handleTagsKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagsInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagsInput.trim())) {
        setTags([...tags, tagsInput.trim()])
      }
      setTagsInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  // Handle tab key for content textarea
  const handleContentKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      setContent(content.substring(0, start) + "  " + content.substring(end))

      // Reset cursor position after state update
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2
      }, 0)
    }
  }

  // Submit handler
  const handleSubmit = useCallback(
    async (saveAsDraft: boolean = false) => {
      setError("")
      setIsSubmitting(true)

      const formData = {
        title,
        unit,
        date,
        excerpt,
        tags,
        readTime,
        published: saveAsDraft ? false : published,
        content,
      }

      try {
        let result

        if (mode === "new") {
          result = await createPost(formData)
        } else if (initialData?.slug) {
          result = await updatePost(initialData.slug, formData)
        } else {
          throw new Error("No slug for update")
        }

        if (result.success) {
          setToast({
            message:
              mode === "new"
                ? saveAsDraft
                  ? "Post saved as draft"
                  : "Post published successfully"
                : "Post updated successfully",
            type: "success",
          })
          setTimeout(() => {
            router.push("/admin/posts")
            router.refresh()
          }, 1000)
        } else {
          setError(result.error || "Something went wrong")
        }
      } catch {
        setError("Failed to save post")
      } finally {
        setIsSubmitting(false)
      }
    },
    [title, unit, date, excerpt, tags, readTime, published, content, mode, initialData?.slug, router]
  )

  const handleDelete = async () => {
    if (!initialData?.slug) return

    setIsDeleting(true)
    const result = await deletePost(initialData.slug)

    if (result.success) {
      setToast({ message: "Post deleted successfully", type: "success" })
      setTimeout(() => {
        router.push("/admin/posts")
        router.refresh()
      }, 1000)
    } else {
      setToast({ message: result.error || "Failed to delete", type: "error" })
    }

    setIsDeleting(false)
    setShowDeleteModal(false)
  }

  // Preview data
  const previewPost = {
    slug: "preview",
    title: title || "Post Title",
    unit: unit || 1,
    date: date || new Date().toISOString().split("T")[0],
    excerpt: excerpt || "Post excerpt will appear here...",
    tags,
    readTime: readTime || "5 min read",
    published,
  }

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          {mode === "new" ? "New Post" : "Edit Post"}
        </h1>
        {mode === "edit" && initialData?.slug && (
          <p className="text-xs text-[#555] mt-1">{initialData.slug}</p>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column - Form Fields */}
        <div className="lg:col-span-3 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs text-[#888] uppercase tracking-wide mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-xl font-medium text-[#f0f0f0] placeholder-[#444] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition"
              placeholder="Enter post title"
            />
          </div>

          {/* Unit and Date Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#888] uppercase tracking-wide mb-1.5">
                Unit Number
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={unit}
                onChange={(e) => setUnit(parseInt(e.target.value) || 1)}
                className="w-24 bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm text-[#f0f0f0] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs text-[#888] uppercase tracking-wide mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm text-[#f0f0f0] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs text-[#888] uppercase tracking-wide mb-1.5">
              Excerpt
            </label>
            <textarea
              rows={3}
              maxLength={160}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#444] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition resize-none"
              placeholder="A short description for the blog cards..."
            />
            <p
              className={`text-xs mt-1 ${
                excerpt.length > 140 ? "text-red-400" : "text-[#555]"
              }`}
            >
              {excerpt.length} / 160 characters
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs text-[#888] uppercase tracking-wide mb-1.5">
              Tags
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => handleTagsInputChange(e.target.value)}
              onKeyDown={handleTagsKeyDown}
              className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#444] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition"
              placeholder="databases, DBMS, DBS302"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-indigo-950 text-indigo-400 border border-indigo-900 rounded-md px-2 py-0.5 text-xs"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-white transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Read Time */}
          <div>
            <label className="block text-xs text-[#888] uppercase tracking-wide mb-1.5">
              Read Time
            </label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#444] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition"
              placeholder="5 min read"
            />
          </div>

          {/* Published Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                published ? "bg-indigo-600" : "bg-[#2a2a2a]"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                  published
                    ? "left-7 bg-white"
                    : "left-1 bg-[#666]"
                }`}
              />
            </button>
            <span className="text-sm text-[#888]">
              {published ? "Published" : "Draft"}
            </span>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:col-span-2">
          <label className="block text-xs text-[#555] uppercase tracking-wide mb-3">
            Card Preview
          </label>
          <div className="pointer-events-none">
            <PostCard post={previewPost} showFullExcerpt />
          </div>
        </div>
      </div>

      {/* Content Textarea */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs text-[#555] uppercase tracking-wide">
            Content
          </label>
          <span className="text-xs text-[#444]">Markdown + MDX supported</span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleContentKeyDown}
          className="w-full min-h-[400px] bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-5 text-sm font-mono text-[#c0c0c0] placeholder-[#333] leading-relaxed resize-y focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition"
          placeholder="Write your post content in MDX..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-8">
        <div>
          {mode === "edit" && (
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              disabled={isSubmitting}
              className="border border-red-900 hover:bg-red-950 text-red-400 rounded-lg px-4 py-2 text-sm transition disabled:opacity-50"
            >
              Delete Post
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting}
            className="border border-[#2a2a2a] hover:border-indigo-500/50 bg-transparent rounded-lg px-5 py-2.5 text-sm text-[#888] hover:text-white transition disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save as Draft"
            )}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {mode === "new" ? "Publishing..." : "Updating..."}
              </>
            ) : mode === "new" ? (
              "Publish"
            ) : (
              "Update Post"
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-400 text-right mt-3">{error}</p>
      )}

      {/* Delete Modal */}
      {showDeleteModal && initialData && (
        <DeleteModal
          postTitle={initialData.title}
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
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
