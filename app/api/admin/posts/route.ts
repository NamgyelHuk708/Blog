import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/posts"

export async function GET() {
  try {
    const posts = getAllPosts()
    return NextResponse.json({ posts })
  } catch (error) {
    console.error("[v0] Error fetching admin posts:", error)
    return NextResponse.json({ posts: [] })
  }
}
