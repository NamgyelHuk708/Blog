import type { MDXComponents } from "mdx/types"

export function useMDXComponents(): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-[#f0f0f0] mt-12 mb-4 pl-3 border-l-2 border-indigo-500 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-[#e0e0e0] mt-8 mb-3 tracking-tight">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[#c0c0c0] leading-[1.85] mb-6">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-indigo-400 underline underline-offset-4 hover:text-indigo-300 transition"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children, className }) => {
      const isInline = !className
      if (isInline) {
        return (
          <code className="bg-[#1a1a1a] text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        )
      }
      return <code className={className}>{children}</code>
    },
    pre: ({ children }) => (
      <pre className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-5 overflow-x-auto mb-6 relative font-mono text-sm text-[#c0c0c0]">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 text-[#888] italic my-6">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="text-[#c0c0c0] pl-6 mb-6 space-y-2 list-disc">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-[#c0c0c0] pl-6 mb-6 space-y-2 list-decimal">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead>{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="bg-[#111] text-[#888] text-xs uppercase tracking-wide py-3 px-4 text-left border-b border-[#1a1a1a]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="py-3 px-4 text-sm border-b border-[#1a1a1a] text-[#c0c0c0]">
        {children}
      </td>
    ),
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ""}
        className="rounded-xl border border-[#1a1a1a] w-full my-8"
      />
    ),
    hr: () => <hr className="border-[#1a1a1a] my-10" />,
    strong: ({ children }) => (
      <strong className="text-[#f0f0f0] font-semibold">{children}</strong>
    ),
  }
}
