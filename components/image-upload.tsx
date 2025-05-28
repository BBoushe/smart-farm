"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Upload, Camera } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  className?: string
}

/**
 * Image upload component with drag & drop, file selection, and preview
 * Handles multiple image uploads with compression and validation
 */
export function ImageUpload({ images, onImagesChange, maxImages = 5, className = "" }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList | null): Promise<void> => {
    if (!files || images.length >= maxImages) return

    setUploading(true)
    const newImages: string[] = []

    for (let i = 0; i < Math.min(files.length, maxImages - images.length); i++) {
      const file = files[i]

      // Validate file type
      if (!file.type.startsWith("image/")) {
        continue
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`)
        continue
      }

      try {
        const compressedImage = await compressImage(file)
        newImages.push(compressedImage)
      } catch (error) {
        console.error("Error processing image:", error)
      }
    }

    onImagesChange([...images, ...newImages])
    setUploading(false)
  }

  const compressImage = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions (max 800px width/height)
        const maxSize = 800
        let { width, height } = img

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height
            height = maxSize
          }
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8)
        resolve(compressedDataUrl)
      }

      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const removeImage = (index: number): void => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const openFileDialog = (): void => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging ? "border-green-500 bg-green-50" : "border-stone-300 hover:border-green-400 hover:bg-stone-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-stone-100 rounded-full">
              {uploading ? (
                <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-6 h-6 text-stone-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-stone-700">
                {uploading ? "Processing images..." : "Drop images here or click to upload"}
              </p>
              <p className="text-xs text-stone-500">
                PNG, JPG up to 5MB each ({images.length}/{maxImages} uploaded)
              </p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={openFileDialog} disabled={uploading}>
              <Camera className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files)}
      />

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square relative overflow-hidden rounded-lg border">
                <Image src={image || "/placeholder.svg"} alt={`Upload ${index + 1}`} fill className="object-cover" />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="w-3 h-3" />
              </Button>
              {index === 0 && (
                <div className="absolute bottom-1 left-1 bg-green-600 text-white text-xs px-2 py-1 rounded">Main</div>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length >= maxImages && (
        <p className="text-sm text-amber-600 text-center">Maximum number of images reached ({maxImages})</p>
      )}
    </div>
  )
}
