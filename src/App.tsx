/*
 * @Date: 2024-12-17 22:10:49
 * @LastEditors: MK
 * @LastEditTime: 2024-12-17 23:07:02
 * @FilePath: /Memes/src/App.tsx
 */
import React, { useState } from 'react'
import { Upload } from './components/Upload'
import { Editor } from './components/Editor'
import { Download } from './components/Download'

interface MediaFile {
  file: File
  preview: string
}

function App() {
  const [mediaFile, setMediaFile] = useState<MediaFile | null>(null)
  const [outputSize, setOutputSize] = useState({ width: 240, height: 240 })
  const [gifResult, setGifResult] = useState<Blob | null>(null)

  const handleFileSelect = (file: File) => {
    setMediaFile({
      file,
      preview: URL.createObjectURL(file)
    })
  }

  const handleSizeChange = (size: { width: number; height: number }) => {
    setOutputSize(size)
  }

  const handleComplete = (gif: Blob) => {
    setGifResult(gif)
  }

  const handleReset = () => {
    setMediaFile(null)
    setGifResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          动态表情包制作工具
        </h1>
        
        <div className="max-w-2xl mx-auto space-y-8">
          {!mediaFile ? (
            <Upload onFileSelect={handleFileSelect} />
          ) : !gifResult ? (
            <Editor
              file={mediaFile.file}
              outputSize={outputSize}
              onSizeChange={handleSizeChange}
              onComplete={handleComplete}
            />
          ) : (
            <Download gifBlob={gifResult} onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App 