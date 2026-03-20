import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "posts")

export interface PostFrontmatter {
  title: string
  unit: number
  date: string
  excerpt: string
  tags: string[]
  readTime: string
  published: boolean
}

export interface Post extends PostFrontmatter {
  slug: string
  content: string
}

export function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }
}

export function getAllPosts(): Post[] {
  ensurePostsDirectory()
  
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        title: data.title || "",
        unit: data.unit || 1,
        date: data.date || new Date().toISOString().split("T")[0],
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        readTime: data.readTime || "5 min read",
        published: data.published !== false,
      } as Post
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((post) => post.published)
}

export function getPostBySlug(slug: string): Post | null {
  ensurePostsDirectory()
  
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    title: data.title || "",
    unit: data.unit || 1,
    date: data.date || new Date().toISOString().split("T")[0],
    excerpt: data.excerpt || "",
    tags: data.tags || [],
    readTime: data.readTime || "5 min read",
    published: data.published !== false,
  }
}

export function getAdjacentPosts(slug: string): { prev: Post | null; next: Post | null } {
  const posts = getPublishedPosts()
  const currentIndex = posts.findIndex((post) => post.slug === slug)

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  }
}

export function getUnitsWithPosts(): number[] {
  const posts = getPublishedPosts()
  const units = [...new Set(posts.map((post) => post.unit))]
  return units.sort((a, b) => a - b)
}

export function getPostStats(): { total: number; published: number; drafts: number } {
  const posts = getAllPosts()
  const published = posts.filter((p) => p.published).length
  return {
    total: posts.length,
    published,
    drafts: posts.length - published,
  }
}
