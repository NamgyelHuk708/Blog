import { notFound } from "next/navigation"
import { getPostBySlug } from "@/lib/posts"
import { PostForm } from "@/components/post-form"

interface EditPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <PostForm
      mode="edit"
      initialData={{
        slug: post.slug,
        title: post.title,
        unit: post.unit,
        date: post.date,
        excerpt: post.excerpt,
        tags: post.tags,
        readTime: post.readTime,
        published: post.published,
        content: post.content,
      }}
    />
  )
}
