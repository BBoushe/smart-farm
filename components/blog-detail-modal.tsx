"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Heart,
  Eye,
  DollarSign,
  Share2,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Users,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react"
import Image from "next/image"
import type { BlogPost } from "@/lib/database"

interface BlogDetailModalProps {
  post: BlogPost
  onClose: () => void
  onTip?: () => void
  onLike?: () => void
  showTipButton?: boolean
}

/**
 * Detailed modal view for blog posts with full content and interaction options
 * Includes image gallery, tip functionality, and social features
 */
export function BlogDetailModal({ post, onClose, onTip, onLike, showTipButton = true }: BlogDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const getCategoryIcon = (category: string): JSX.Element => {
    switch (category) {
      case "guide":
        return <BookOpen className="w-5 h-5" />
      case "faq":
        return <HelpCircle className="w-5 h-5" />
      case "tip":
        return <Lightbulb className="w-5 h-5" />
      case "experience":
        return <Users className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "guide":
        return "bg-blue-100 text-blue-800"
      case "faq":
        return "bg-green-100 text-green-800"
      case "tip":
        return "bg-amber-100 text-amber-800"
      case "experience":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const nextImage = (): void => {
    if (post.images && post.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % post.images.length)
    }
  }

  const prevImage = (): void => {
    if (post.images && post.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length)
    }
  }

  const handleLike = (): void => {
    setIsLiked(!isLiked)
    onLike?.()
  }

  const handleShare = async (): Promise<void> => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[95vh] overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col h-full max-h-[95vh]">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(post.category)}
                    <Badge variant="secondary" className={getCategoryColor(post.category)}>
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </Badge>
                    {post.isAdminPost && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Official
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-green-800 mb-2">{post.title}</h1>
                  <p className="text-stone-600 text-lg">{post.excerpt}</p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLike}
                    className={isLiked ? "text-red-500" : "text-stone-400"}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleShare}>
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Meta Information */}
              <div className="flex items-center justify-between text-sm text-stone-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.createdAt.toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.likes} likes
                  </div>
                </div>

                {!post.isAdminPost && post.tipAmount > 0 && (
                  <div className="flex items-center gap-1 text-amber-600">
                    <DollarSign className="w-4 h-4" />€{post.tipAmount.toFixed(2)} in tips
                  </div>
                )}
              </div>
            </div>

            {/* Image Gallery */}
            {post.images && post.images.length > 0 && (
              <div className="relative bg-stone-100">
                <div className="relative h-64">
                  <Image
                    src={post.images[currentImageIndex] || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />

                  {/* Image Navigation */}
                  {post.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>

                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {post.images.length}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-stone max-w-none">
                <div className="whitespace-pre-wrap text-stone-700 leading-relaxed">{post.content}</div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-green-800 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t bg-stone-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={handleLike}
                    className={isLiked ? "border-red-200 bg-red-50 text-red-700" : ""}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                    {isLiked ? "Liked" : "Like"} ({post.likes + (isLiked ? 1 : 0)})
                  </Button>

                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {showTipButton && !post.isAdminPost && (
                  <Button className="bg-amber-600 hover:bg-amber-700" onClick={onTip}>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Tip Author
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
