/*
 * @Date: 2024-12-17 22:23:44
 * @LastEditors: MK
 * @LastEditTime: 2024-12-17 23:43:31
 * @FilePath: /Memes/src/components/ui/button.tsx
 */
import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
}

export function Button({ 
  children, 
  className = '', 
  variant = 'default',
  ...props 
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors"
  const variantStyles = variant === 'default' 
    ? "bg-blue-500 text-white hover:bg-blue-600" 
    : "border border-gray-300 hover:bg-gray-50"

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
} 