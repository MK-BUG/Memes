import React from 'react'

export interface DecorationItem {
  id: string
  src: string
  type: 'sticker' | 'frame' | 'text'
  category: 'emoji' | 'meme' | 'frame' | 'text'
  animation?: {
    type: 'bounce' | 'spin' | 'shake' | 'pulse' | 'wave'
    duration?: number
    delay?: number
  }
}

const decorations: DecorationItem[] = [
  // 表情类别 - 添加弹跳和旋转动画
  {
    id: 'emoji-1',
    src: '😀',
    type: 'sticker',
    category: 'emoji',
    animation: { type: 'bounce', duration: 1 }
  },
  {
    id: 'emoji-2',
    src: '😂',
    type: 'sticker',
    category: 'emoji',
    animation: { type: 'shake', duration: 0.8 }
  },
  {
    id: 'emoji-3',
    src: '🤣',
    type: 'sticker',
    category: 'emoji',
    animation: { type: 'bounce', duration: 1.2 }
  },
  {
    id: 'emoji-4',
    src: '😅',
    type: 'sticker',
    category: 'emoji',
    animation: { type: 'shake', duration: 1 }
  },
  {
    id: 'emoji-5',
    src: '😊',
    type: 'sticker',
    category: 'emoji',
    animation: { type: 'pulse', duration: 1.5 }
  },
  {
    id: 'emoji-6',
    src: '🥰',
    type: 'sticker',
    category: 'emoji',
    animation: { type: 'wave', duration: 2 }
  },
  // 梗图类别 - 添加闪烁和波动动画
  {
    id: 'meme-1',
    src: '👍',
    type: 'sticker',
    category: 'meme',
    animation: { type: 'bounce', duration: 1.5 }
  },
  {
    id: 'meme-2',
    src: '🎉',
    type: 'sticker',
    category: 'meme',
    animation: { type: 'spin', duration: 3 }
  },
  {
    id: 'meme-3',
    src: '🔥',
    type: 'sticker',
    category: 'meme',
    animation: { type: 'pulse', duration: 1 }
  },
  {
    id: 'meme-4',
    src: '💯',
    type: 'sticker',
    category: 'meme',
    animation: { type: 'shake', duration: 1.2 }
  },
  {
    id: 'meme-5',
    src: '🌟',
    type: 'sticker',
    category: 'meme',
    animation: { type: 'spin', duration: 2 }
  },
  // 边框类别 - 添加旋转和缩放动画
  {
    id: 'frame-1',
    src: '⭐',
    type: 'frame',
    category: 'frame',
    animation: { type: 'spin', duration: 4 }
  },
  {
    id: 'frame-2',
    src: '💫',
    type: 'frame',
    category: 'frame',
    animation: { type: 'pulse', duration: 2 }
  },
  {
    id: 'frame-3',
    src: '🌟',
    type: 'frame',
    category: 'frame',
    animation: { type: 'wave', duration: 3 }
  },
  {
    id: 'frame-4',
    src: '✨',
    type: 'frame',
    category: 'frame',
    animation: { type: 'spin', duration: 5 }
  }
]

interface DecorationsProps {
  onSelect: (item: DecorationItem) => void
}

export function Decorations({ onSelect }: DecorationsProps) {
  const [category, setCategory] = React.useState<'emoji' | 'meme' | 'frame' | 'text'>('emoji')

  const categories = [
    { id: 'emoji', name: '表情' },
    { id: 'meme', name: '梗图' },
    { id: 'frame', name: '边框' },
    { id: 'text', name: '文字' }
  ] as const

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              category === cat.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {category === 'text' ? (
          <button
            onClick={() => onSelect({ 
              id: 'text-new', 
              src: '', 
              type: 'text', 
              category: 'text',
              animation: { type: 'wave', duration: 2 }
            })}
            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg
                     hover:border-blue-500 hover:bg-blue-50 transition-colors
                     flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-2xl mb-1">Aa</div>
              <div className="text-sm text-gray-500">添加文字</div>
            </div>
          </button>
        ) : (
          decorations
            .filter(item => item.category === category)
            .map(item => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className={`aspect-square border rounded-lg hover:border-blue-500 hover:bg-blue-50
                         transition-colors flex items-center justify-center text-3xl
                         ${getAnimationClass(item.animation)}`}
              >
                {item.src}
              </button>
            ))
        )}
      </div>
    </div>
  )
}

function getAnimationClass(animation?: DecorationItem['animation']) {
  if (!animation) return ''
  
  const classes: Record<string, string> = {
    bounce: 'animate-bounce',
    spin: 'animate-spin',
    pulse: 'animate-pulse',
    shake: 'animate-shake',
    wave: 'animate-wave'
  }
  
  return classes[animation.type] || ''
} 