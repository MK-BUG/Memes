import { ChangeEvent } from 'react'

interface UploadProps {
  onFileSelect: (file: File) => void
}

export function Upload({ onFileSelect }: UploadProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
          ⬆️
        </div>
        <p className="text-gray-600">
          点击选择图片/视频文件
        </p>
        <p className="text-sm text-gray-500 mt-2">
          支持 PNG、JPG、MP4、WebM 格式
        </p>
      </label>
    </div>
  )
} 