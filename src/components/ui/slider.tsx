/*
 * @Date: 2024-12-17 22:23:46
 * @LastEditors: MK
 * @LastEditTime: 2024-12-17 23:44:01
 * @FilePath: /Memes/src/components/ui/slider.tsx
 */
import React from 'react'

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min: number
  max: number
  step: number
  className?: string
}

export function Slider({ 
  value, 
  onValueChange, 
  min, 
  max, 
  step, 
  className = '' 
}: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      className={`w-full ${className}`}
    />
  )
} 