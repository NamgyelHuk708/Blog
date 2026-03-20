"use client"

import { Trash2, Loader2 } from "lucide-react"

interface DeleteModalProps {
  postTitle: string
  isDeleting: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteModal({
  postTitle,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-48"
      onClick={onCancel}
    >
      <div
        className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Trash2 className="w-8 h-8 text-red-400 mb-3" />
        <h3 className="text-lg font-semibold text-white">Delete this post?</h3>
        <p className="text-sm text-[#888] mt-1">&ldquo;{postTitle}&rdquo;</p>
        <p className="text-xs text-[#555] mt-2">
          This action cannot be undone.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 border border-[#2a2a2a] hover:border-indigo-500/50 bg-transparent rounded-lg px-5 py-2.5 text-sm text-[#888] hover:text-white transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
