"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, X } from "lucide-react"

interface ToastNotificationProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export function ToastNotification({
  message,
  type,
  onClose,
}: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation
    setIsVisible(true)

    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      <div
        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
          type === "success"
            ? "bg-[#111] border border-green-900 text-green-400"
            : "bg-[#111] border border-red-900 text-red-400"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="w-4 h-4" />
        ) : (
          <XCircle className="w-4 h-4" />
        )}
        {message}
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="ml-2 hover:opacity-70 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
