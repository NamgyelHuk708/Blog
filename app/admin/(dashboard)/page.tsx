import Link from "next/link"
import { PenSquare } from "lucide-react"
import { getAllPosts, getPostStats } from "@/lib/posts"
import { UnitBadge } from "@/components/unit-badge"

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

export default function AdminDashboardPage() {
  const stats = getPostStats()
  const recentPosts = getAllPosts().slice(0, 5)

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-sm text-[#555]">{today}</p>
          <h1 className="text-2xl font-bold text-white mt-1">{getGreeting()}</h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition"
        >
          <PenSquare className="w-4 h-4" />
          Write New Post
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5">
          <p className="text-3xl font-bold text-white">{stats.total}</p>
          <p className="text-xs text-[#555] uppercase tracking-wide mt-1">
            Total Posts
          </p>
        </div>
        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5">
          <p className="text-3xl font-bold text-white">{stats.published}</p>
          <p className="text-xs text-[#555] uppercase tracking-wide mt-1">
            Published
          </p>
        </div>
        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5">
          <p className="text-3xl font-bold text-white">{stats.drafts}</p>
          <p className="text-xs text-[#555] uppercase tracking-wide mt-1">
            Drafts
          </p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="border-t border-[#1a1a1a] pt-8">
        <h2 className="text-sm text-[#555] uppercase tracking-wide mb-4">
          Recent Posts
        </h2>

        {recentPosts.length > 0 ? (
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
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post, index) => (
                  <tr
                    key={post.slug}
                    className={`hover:bg-[#141414] transition ${
                      index !== recentPosts.length - 1
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
      </div>
    </div>
  )
}
