/*
 * @Date: 2024-12-17 22:11:08
 * @LastEditors: MK
 * @LastEditTime: 2024-12-17 23:41:57
 * @FilePath: /Memes/src/components/Download.tsx
 */
import React from 'react'
import { Button } from '../components/ui/button'

interface DownloadProps {
  gifBlob: Blob
  onReset: () => void
}

export function Download({ gifBlob, onReset }: DownloadProps) {
  const fileSize = gifBlob.size
  const fileSizeFormatted = fileSize < 1024 * 1024 
    ? `${(fileSize / 1024).toFixed(2)} KB`
    : `${(fileSize / (1024 * 1024)).toFixed(2)} MB`

  const handleDownload = () => {
    const url = URL.createObjectURL(gifBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sticker_${new Date().getTime()}.gif`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square max-w-md mx-auto border rounded-lg overflow-hidden bg-gray-50">
        <img
          src={URL.createObjectURL(gifBlob)}
          alt="Preview"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="space-y-2 text-center text-sm text-gray-500">
        <div>文件大小: {fileSizeFormatted}</div>
        {fileSize > 1024 * 1024 && (
          <div className="text-yellow-500">
            注意：文件较大，部分平台可能不支持上传
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button onClick={handleDownload} className="flex-1">
          下载 GIF
        </Button>
        <Button onClick={onReset} variant="outline" className="flex-1">
          重新制作
        </Button>
      </div>
    </div>
  )
} 