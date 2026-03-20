import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#1a1a1a] py-8">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">Namgyel Wangchuk</span>
            <span className="text-xs text-[#444]">DBS302 Blog · CST, RUB</span>
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/NamgyelHuk708"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666] hover:text-white transition"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/namgyel-wangchuk-0575182a5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666] hover:text-white transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Center Bottom - Admin Link */}
        <div className="mt-4 text-center">
          <Link
            href="/admin/login"
            className="text-xs text-[#222] hover:text-[#555] transition"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
