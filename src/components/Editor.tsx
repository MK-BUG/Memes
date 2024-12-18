import React, { useState, useEffect } from 'react'
import { Slider } from './ui/slider'
import { Button } from './ui/button'
import { Toast, ToastClose } from './ui/toast'
import { Decorations } from './Decorations'

interface EditorProps {
  file: File
  outputSize: { width: number; height: number }
  onSizeChange: (size: { width: number; height: number }) => void
  onComplete: (gif: Blob) => void
}

// 动态装饰元素
const DYNAMIC_DECORATIONS = [
  {
    id: 'happy-eyes',
    name: '开心眼睛',
    src: '😄',
    animation: 'bounce'
  },
  {
    id: 'love-eyes',
    name: '爱心眼',
    src: '😍',
    animation: 'pulse'
  },
  {
    id: 'star-eyes',
    name: '星星眼',
    src: '🤩',
    animation: 'spin'
  },
  {
    id: 'laugh-tears',
    name: '笑哭',
    src: '😂',
    animation: 'shake'
  },
  {
    id: 'heart',
    name: '爱心',
    src: '❤️',
    animation: 'pulse'
  },
  {
    id: 'star',
    name: '星星',
    src: '⭐',
    animation: 'spin'
  },
  {
    id: 'sparkles',
    name: '闪闪',
    src: '✨',
    animation: 'wave'
  }
]

export function Editor({ file, outputSize, onSizeChange, onComplete }: EditorProps) {
  const [preview, setPreview] = useState('')
  const [decorations, setDecorations] = useState<Array<{
    id: string
    type: string
    content: string
    position: { x: number; y: number }
    scale: number
    rotation: number
    animation: string
  }>>([])
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const handleAddDecoration = (decoration: any) => {
    setDecorations(prev => [
      ...prev,
      {
        id: `${decoration.id}-${Date.now()}`,
        type: 'sticker',
        content: decoration.src,
        position: { x: outputSize.width / 2, y: outputSize.height / 2 },
        scale: 1,
        rotation: 0,
        animation: decoration.animation
      }
    ])
  }

  const handleUpdateDecoration = (id: string, updates: any) => {
    setDecorations(prev =>
      prev.map(d => (d.id === id ? { ...d, ...updates } : d))
    )
  }

  const handleDeleteDecoration = (id: string) => {
    setDecorations(prev => prev.filter(d => d.id !== id))
  }

  const handleProcess = async () => {
    if (!decorations.length) {
      setError('请先添加一些装饰')
      return
    }

    setProcessing(true)
    try {
      const canvas = document.createElement('canvas')
      canvas.width = outputSize.width
      canvas.height = outputSize.height
      const ctx = canvas.getContext('2d')

      if (ctx) {
        // 绘制原图
        const img = new Image()
        img.src = preview
        await new Promise((resolve) => {
          img.onload = resolve
        })
        ctx.drawImage(img, 0, 0, outputSize.width, outputSize.height)

        // 绘制装饰
        for (const decoration of decorations) {
          ctx.save()
          ctx.translate(decoration.position.x, decoration.position.y)
          ctx.rotate((decoration.rotation * Math.PI) / 180)
          ctx.scale(decoration.scale, decoration.scale)
          ctx.font = '48px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(decoration.content, 0, 0)
          ctx.restore()
        }

        canvas.toBlob((blob) => {
          if (blob) {
            onComplete(blob)
          }
        }, 'image/gif')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '处理失败')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="aspect-square max-w-md mx-auto border rounded-lg overflow-hidden relative">
        {/* 预览区域 */}
        <div className="relative w-full h-full">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
          />
          
          {/* 装饰层 */}
          <div className="absolute inset-0">
            {decorations.map(decoration => (
              <div
                key={decoration.id}
                className={`absolute transform ${getAnimationClass(decoration.animation)}`}
                style={{
                  left: decoration.position.x,
                  top: decoration.position.y,
                  transform: `translate(-50%, -50%) rotate(${decoration.rotation}deg) scale(${decoration.scale})`
                }}
              >
                <div className="relative group cursor-move">
                  <span className="text-4xl select-none">{decoration.content}</span>
                  <button
                    onClick={() => handleDeleteDecoration(decoration.id)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full 
                             flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 装饰选择区 */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-4">添加动态装饰</h3>
        <div className="grid grid-cols-4 gap-3">
          {DYNAMIC_DECORATIONS.map(decoration => (
            <button
              key={decoration.id}
              onClick={() => handleAddDecoration(decoration)}
              className={`aspect-square border rounded-lg hover:border-blue-500 
                       flex items-center justify-center text-3xl
                       ${getAnimationClass(decoration.animation)}`}
            >
              {decoration.src}
            </button>
          ))}
        </div>
      </div>

      {/* 控制区域 */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">输出尺寸</label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <input
              type="number"
              value={outputSize.width}
              onChange={(e) => onSizeChange({
                ...outputSize,
                width: Math.min(1000, Math.max(32, Number(e.target.value)))
              })}
              className="w-full px-3 py-2 border rounded"
              min="32"
              max="1000"
            />
            <input
              type="number"
              value={outputSize.height}
              onChange={(e) => onSizeChange({
                ...outputSize,
                height: Math.min(1000, Math.max(32, Number(e.target.value)))
              })}
              className="w-full px-3 py-2 border rounded"
              min="32"
              max="1000"
            />
          </div>
        </div>

        <Button
          onClick={handleProcess}
          disabled={processing}
          className="w-full"
        >
          {processing ? '处理中...' : '生成表情'}
        </Button>
      </div>

      {error && (
        <Toast>
          <div className="text-red-500">{error}</div>
          <ToastClose onClick={() => setError('')} />
        </Toast>
      )}
    </div>
  )
}

function getAnimationClass(animation: string) {
  const classes: Record<string, string> = {
    bounce: 'animate-bounce',
    spin: 'animate-spin',
    pulse: 'animate-pulse',
    shake: 'animate-shake',
    wave: 'animate-wave'
  }
  return classes[animation] || ''
} 