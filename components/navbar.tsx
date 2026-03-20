"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

import Image from "next/image"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 w-full h-14 bg-[#080808]/90 backdrop-blur border-b border-[#1a1a1a]">
      <div className="max-w-[1100px] mx-auto h-full px-6 md:px-8 flex items-center justify-between">
        {/* Left - Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 relative">
             <Image src="/nw-logo.svg" alt="NW Logo" fill className="object-contain" />
          </div>
          <span className="text-sm font-medium text-white">Namgyel Wangchuk</span>
        </Link>

        {/* Center - Nav Links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition relative py-1",
                isActive(link.href)
                  ? "text-white"
                  : "text-[#888] hover:text-white"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
              )}
            </Link>
          ))}
        </div>

        {/* Right - Auth Button */}
        {status === "loading" ? (
          <div className="w-24 h-8 bg-[#1a1a1a] rounded-lg animate-pulse" />
        ) : session ? (
          <Link
            href="/admin"
            className="flex items-center gap-2 border border-indigo-500/50 bg-transparent rounded-lg px-4 py-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Dashboard
          </Link>
        ) : (
          <Link
            href="/admin/login"
            className="flex items-center gap-2 border border-[#2a2a2a] hover:border-indigo-500/50 bg-transparent rounded-lg px-4 py-1.5 text-xs text-[#666] hover:text-indigo-400 transition"
          >
            <Lock className="w-3 h-3" />
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
