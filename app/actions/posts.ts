"use server"

import fs from "fs"
import path from "path"
import { revalidatePath } from "next/cache"
import { ensurePostsDirectory, getAllPosts } from "@/lib/posts"

const postsDirectory = path.join(process.cwd(), "posts")

function generateSlug(title: string, unit: number): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()

  return `unit-${unit}-${baseSlug}`
}

function ensureUniqueSlug(slug: string): string {
  ensurePostsDirectory()
  
  const existingSlugs = getAllPosts().map((p) => p.slug)
  
  if (!existingSlugs.includes(slug)) {
    return slug
  }

  let counter = 2
  let newSlug = `${slug}-${counter}`
  while (existingSlugs.includes(newSlug)) {
    counter++
    newSlug = `${slug}-${counter}`
  }

  return newSlug
}

interface PostFormData {
  title: string
  unit: number
  date: string
  excerpt: string
  tags: string[]
  readTime: string
  published: boolean
  content: string
}

export async function createPost(data: PostFormData) {
  try {
    ensurePostsDirectory()

    if (!data.title || !data.content) {
      return { success: false, error: "Title and content are required" }
    }

    const slug = ensureUniqueSlug(generateSlug(data.title, data.unit))
    const filePath = path.join(postsDirectory, `${slug}.mdx`)

    const frontmatter = `---
title: "${data.title}"
unit: ${data.unit}
date: "${data.date}"
excerpt: "${data.excerpt}"
tags: ${JSON.stringify(data.tags)}
readTime: "${data.readTime}"
published: ${data.published}
---

${data.content}`

    fs.writeFileSync(filePath, frontmatter, "utf8")

    revalidatePath("/")
    revalidatePath("/blog")
    revalidatePath("/admin")
    revalidatePath("/admin/posts")

    return { success: true, slug }
  } catch (error) {
    console.error("[v0] Error creating post:", error)
    return { success: false, error: "Failed to create post" }
  }
}

export async function updatePost(slug: string, data: PostFormData) {
  try {
    ensurePostsDirectory()

    const filePath = path.join(postsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return { success: false, error: "Post not found" }
    }

    const frontmatter = `---
title: "${data.title}"
unit: ${data.unit}
date: "${data.date}"
excerpt: "${data.excerpt}"
tags: ${JSON.stringify(data.tags)}
readTime: "${data.readTime}"
published: ${data.published}
---

${data.content}`

    fs.writeFileSync(filePath, frontmatter, "utf8")

    revalidatePath("/")
    revalidatePath("/blog")
    revalidatePath(`/blog/${slug}`)
    revalidatePath("/admin")
    revalidatePath("/admin/posts")
    revalidatePath(`/admin/posts/${slug}/edit`)

    return { success: true, slug }
  } catch (error) {
    console.error("[v0] Error updating post:", error)
    return { success: false, error: "Failed to update post" }
  }
}

export async function deletePost(slug: string) {
  try {
    ensurePostsDirectory()

    const filePath = path.join(postsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return { success: false, error: "Post not found" }
    }

    fs.unlinkSync(filePath)

    revalidatePath("/")
    revalidatePath("/blog")
    revalidatePath("/admin")
    revalidatePath("/admin/posts")

    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting post:", error)
    return { success: false, error: "Failed to delete post" }
  }
}
