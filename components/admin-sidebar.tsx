"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { LayoutDashboard, FileText, PenSquare, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/posts/new", label: "New Post", icon: PenSquare },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col">
      {/* Logo */}
      <div className="px-4 mt-6 mb-8">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center text-white text-xs font-bold">
            ST
          </div>
          <span className="text-xs text-[#555] uppercase tracking-widest">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 text-sm rounded-lg px-3 py-2.5 mx-0 transition mb-1",
                active
                  ? "bg-[#141414] text-white border-l-2 border-indigo-500 pl-[10px]"
                  : "text-[#888] hover:text-white hover:bg-[#141414]"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 pb-6">
        {session?.user?.email && (
          <p className="text-xs text-[#444] truncate mb-2">
            {session.user.email}
          </p>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 border border-red-900 hover:bg-red-950 text-red-400 rounded-lg px-4 py-2 text-sm transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
