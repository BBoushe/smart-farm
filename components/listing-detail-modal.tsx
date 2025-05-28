"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  X,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Clock,
  Star,
  User,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Flag,
} from "lucide-react"
import Image from "next/image"
import type { Listing } from "@/lib/types"

interface ListingDetailModalProps {
  listing: Listing
  onClose: () => void
  onContact?: () => void
  onEdit?: () => void
  onDelete?: () => void
  showActions?: boolean
}

/**
 * Detailed modal view for listings with image gallery and comprehensive information
 * Includes contact options, sharing, and action buttons
 */
export function ListingDetailModal({
  listing,
  onClose,
  onContact,
  onEdit,
  onDelete,
  showActions = false,
}: ListingDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const getTypeColor = (type: string): string => {
    switch (type) {
      case "share":
        return "bg-blue-100 text-blue-800"
      case "sell":
        return "bg-green-100 text-green-800"
      case "rent":
        return "bg-amber-100 text-amber-800"
      case "service":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case "equipment":
        return "🚜"
      case "product":
        return "🌾"
      case "service":
        return "🔧"
      case "rental":
        return "📅"
      default:
        return "📦"
    }
  }

  const formatPrice = (): string => {
    if (listing.price) return `€${listing.price}`
    if (listing.dailyRate && listing.weeklyRate) {
      return `€${listing.dailyRate}/day • €${listing.weeklyRate}/week`
    }
    if (listing.dailyRate) return `€${listing.dailyRate}/day`
    return "Contact for price"
  }

  const nextImage = (): void => {
    if (listing.images && listing.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images.length)
    }
  }

  const prevImage = (): void => {
    if (listing.images && listing.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length)
    }
  }

  const handleShare = async (): Promise<void> => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing.title,
          text: listing.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[95vh] overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[95vh]">
            {/* Image Gallery Section */}
            <div className="relative bg-stone-100">
              {listing.images && listing.images.length > 0 ? (
                <>
                  <div className="relative h-64 lg:h-full">
                    <Image
                      src={listing.images[currentImageIndex] || "/placeholder.svg"}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />

                    {/* Image Navigation */}
                    {listing.images.length > 1 && (
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
                      </>
                    )}

                    {/* Image Counter */}
                    {listing.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {listing.images.length}
                      </div>
                    )}
                  </div>

                  {/* Image Thumbnails */}
                  {listing.images.length > 1 && (
                    <div className="absolute bottom-4 left-4 right-4 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:p-4">
                      <div className="flex gap-2 overflow-x-auto">
                        {listing.images.map((image, index) => (
                          <button
                            key={index}
                            className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                              index === currentImageIndex ? "border-green-500" : "border-white"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Thumbnail ${index + 1}`}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="h-64 lg:h-full flex items-center justify-center bg-stone-200">
                  <span className="text-stone-500">No images available</span>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col h-64 lg:h-full">
              {/* Header */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getCategoryIcon(listing.category)}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-green-800">{listing.title}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className={getTypeColor(listing.type)}>
                          {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
                        </Badge>
                        <Badge variant="outline">{listing.category}</Badge>
                        {listing.status === "active" && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Available
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsLiked(!isLiked)}
                      className={isLiked ? "text-red-500" : "text-stone-400"}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleShare}>
                      <Share2 className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Flag className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-3xl font-bold text-amber-600 mb-2">
                  <DollarSign className="w-6 h-6 inline mr-1" />
                  {formatPrice()}
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Description</h3>
                  <p className="text-stone-700 leading-relaxed">{listing.description}</p>
                </div>

                <Separator />

                {/* Details */}
                <div>
                  <h3 className="font-semibold text-green-800 mb-3">Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-stone-500" />
                      <span>
                        {listing.location}, {listing.country}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-stone-500" />
                      <span>{listing.availability}</span>
                    </div>

                    {listing.quantity && (
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-2 text-stone-500" />
                        <span>{listing.quantity}</span>
                      </div>
                    )}

                    {listing.minRental && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-stone-500" />
                        <span>Min rental: {listing.minRental}</span>
                      </div>
                    )}

                    {listing.rating && (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2 text-amber-500 fill-current" />
                        <span>{listing.rating}/5.0</span>
                      </div>
                    )}

                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-stone-500" />
                      <span>Listed {listing.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h3 className="font-semibold text-green-800 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-stone-500" />
                      <span>Listing Owner</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-stone-500" />
                      <span>{listing.contactInfo}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t bg-stone-50">
                <div className="flex gap-3">
                  {showActions ? (
                    <>
                      <Button variant="outline" className="flex-1" onClick={onEdit}>
                        Edit Listing
                      </Button>
                      <Button variant="destructive" onClick={onDelete}>
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="flex-1 bg-green-700 hover:bg-green-800" onClick={onContact}>
                        <Phone className="w-4 h-4 mr-2" />
                        Contact {listing.type === "service" ? "Provider" : "Owner"}
                      </Button>
                      <Button variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
