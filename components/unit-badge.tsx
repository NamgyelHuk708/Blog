import { cn } from "@/lib/utils"

interface UnitBadgeProps {
  unit: number
  className?: string
}

const unitColors = [
  { bg: "bg-indigo-950", text: "text-indigo-400", border: "border-indigo-900" },
  { bg: "bg-violet-950", text: "text-violet-400", border: "border-violet-900" },
  { bg: "bg-emerald-950", text: "text-emerald-400", border: "border-emerald-900" },
  { bg: "bg-amber-950", text: "text-amber-400", border: "border-amber-900" },
  { bg: "bg-rose-950", text: "text-rose-400", border: "border-rose-900" },
]

export function UnitBadge({ unit, className }: UnitBadgeProps) {
  const colorIndex = (unit - 1) % 5
  const colors = unitColors[colorIndex]

  return (
    <span
      className={cn(
        "rounded-md px-2.5 py-0.5 text-xs font-medium border",
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      Unit {unit}
    </span>
  )
}
