/*
 * @Date: 2024-12-18 11:27:30
 * @LastEditors: MK
 * @LastEditTime: 2024-12-18 11:31:15
 * @FilePath: /Memes/src/components/DecorationItem.tsx
 */
import React, { useState, useEffect } from 'react'

interface DecorationItemProps {
  id: string
  type: 'sticker' | 'frame' | 'text'
  content: string
  position: { x: number; y: number }
  scale: number
  rotation: number
  animation?: {
    type: 'bounce' | 'spin' | 'shake' | 'pulse' | 'wave'
    duration?: number
    delay?: number
  }
  onUpdate: (id: string, updates: Partial<DecorationItemProps>) => void
  onDelete: (id: string) => void
}

export function DecorationItem({
  id,
  type,
  content,
  position,
  scale,
  rotation,
  animation,
  onUpdate,
  onDelete
}: DecorationItemProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    const container = document.querySelector('.aspect-square')
    if (container) {
      setContainerRect(container.getBoundingClientRect())
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isDragging && containerRect) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      
      // 限制在容器内
      const boundedX = Math.max(0, Math.min(newX, containerRect.width))
      const boundedY = Math.max(0, Math.min(newY, containerRect.height))

      onUpdate(id, {
        position: { x: boundedX, y: boundedY }
      })
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
    if (e.shiftKey) {
      // 旋转
      onUpdate(id, {
        rotation: rotation + (e.deltaY > 0 ? 5 : -5)
      })
    } else {
      // 缩放
      onUpdate(id, {
        scale: Math.max(0.1, scale + (e.deltaY > 0 ? -0.1 : 0.1))
      })
    }
  }

  const getAnimationClass = () => {
    if (!animation) return ''
    
    const classes: Record<string, string> = {
      bounce: 'animate-bounce-gentle',
      spin: 'animate-spin-slow',
      pulse: 'animate-pulse',
      shake: 'animate-shake',
      wave: 'animate-wave'
    }
    
    return classes[animation.type] || ''
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
        zIndex: isDragging ? 1000 : 1,
        animationDuration: animation?.duration ? `${animation.duration}s` : undefined,
        animationDelay: animation?.delay ? `${animation.delay}s` : undefined
      }}
      className={getAnimationClass()}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div className="relative group">
        {type === 'text' ? (
          <div className="text-2xl whitespace-nowrap">{content}</div>
        ) : (
          <span className="text-4xl select-none">{content}</span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(id)
          }}
          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full 
                   flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>
    </div>
  )
} 