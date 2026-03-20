import { Github, Linkedin } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | DBS302 Blog",
  description: "Learn more about me and my software engineering journey.",
}

const infoChips = [
  "Software Engineering",
  "CST, RUB",
  "Bhutan",
  "React",
  "Next.js",
  "TypeScript",
  "Full Stack",
]

const currentlyStudying = [
  { code: "DBS302", name: "Database Systems", color: "bg-indigo-500" },
]

export default function AboutPage() {
  return (
    <div className="animate-in fade-in duration-300 max-w-2xl mx-auto px-6 md:px-8 pt-20 pb-24">
      {/* Avatar */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white">
          NW
        </div>
      </div>

      {/* Name & Role */}
      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Namgyel Wangchuk
        </h1>
        <p className="text-sm text-indigo-400 mt-1">Software Engineer</p>
      </div>

      {/* Bio */}
      <p className="text-[#888] leading-relaxed mt-4 max-w-lg mx-auto text-center">
        Passionate software engineer focused on building scalable applications and documenting technical insights. Currently pursuing a degree in Software Engineering at the College of Science and Technology, Royal University of Bhutan.
      </p>

      {/* Info Chips */}
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        {infoChips.map((chip) => (
          <span
            key={chip}
            className="bg-[#111] border border-[#1a1a1a] rounded-lg px-3 py-1.5 text-xs text-[#888]"
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-[#1a1a1a] mt-10" />

      {/* Social Links */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <a
          href="https://github.com/NamgyelHuk708"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#2a2a2a] hover:border-indigo-500/50 bg-transparent rounded-lg px-5 py-2.5 text-sm text-[#888] hover:text-white transition"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/namgyel-wangchuk-0575182a5"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#2a2a2a] hover:border-indigo-500/50 bg-transparent rounded-lg px-5 py-2.5 text-sm text-[#888] hover:text-white transition"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
      </div>

      {/* Currently Studying */}
      <div className="mt-10">
        <h2 className="text-sm text-[#555] uppercase tracking-wide mb-4 text-center">
          Currently Studying
        </h2>
        <div className="space-y-3">
          {currentlyStudying.map((module) => (
            <div
              key={module.code}
              className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 flex items-center gap-3"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${module.color}`} />
              <span className="text-sm text-[#888]">
                <span className="text-[#f0f0f0] font-medium">{module.code}</span>
                {" — "}
                {module.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
