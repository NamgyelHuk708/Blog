import { NextResponse } from "next/server"
import { getPublishedPosts, getUnitsWithPosts } from "@/lib/posts"

export async function GET() {
  try {
    const posts = getPublishedPosts()
    const units = getUnitsWithPosts()

    return NextResponse.json({ posts, units })
  } catch (error) {
    console.error("[v0] Error fetching posts:", error)
    return NextResponse.json({ posts: [], units: [] })
  }
}
