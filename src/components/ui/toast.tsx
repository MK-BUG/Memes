import * as React from "react"

interface ToastProps {
  children: React.ReactNode
  className?: string
}

export function Toast({ children, className = '' }: ToastProps) {
  return (
    <div className={`fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg border ${className}`}>
      {children}
    </div>
  )
}

export function ToastClose({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
    >
      ×
    </button>
  )
} 