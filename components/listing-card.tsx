"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, DollarSign, Package, Clock, Star, Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"
import type { Listing } from "@/lib/types"
import { ListingDetailModal } from "@/components/listing-detail-modal"

interface ListingCardProps {
  listing: Listing
  showActions?: boolean
  onEdit?: (listing: Listing) => void
  onDelete?: (id: string) => void
  onView?: (listing: Listing) => void
}

/**
 * Reusable listing card component with CRUD actions
 * Displays listing information with optional edit/delete controls
 */
export function ListingCard({ listing, showActions = false, onEdit, onDelete, onView }: ListingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showDetailModal, setShowDetailModal] = useState(false)

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

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getCategoryIcon(listing.category)}</span>
            <CardTitle className="text-green-800 text-lg">{listing.title}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className={getTypeColor(listing.type)}>
              {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {listing.category}
            </Badge>
          </div>
        </div>
        <CardDescription className="line-clamp-2">{listing.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Image Gallery */}
        {listing.images && listing.images.length > 0 && (
          <div className="relative mb-4">
            <Image
              src={listing.images[currentImageIndex] || "/placeholder.svg"}
              alt={listing.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            {listing.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {listing.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="space-y-2 text-sm text-stone-600 flex-1">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            {listing.location}, {listing.country}
          </div>

          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {listing.availability}
          </div>

          {listing.quantity && (
            <div className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              {listing.quantity}
            </div>
          )}

          {listing.minRental && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Min rental: {listing.minRental}
            </div>
          )}

          {listing.rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 fill-current text-amber-500" />
              {listing.rating}/5.0
            </div>
          )}

          <div className="text-xl font-bold text-amber-600 mt-2">
            <DollarSign className="w-5 h-5 inline mr-1" />
            {formatPrice()}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {showActions ? (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => onView?.(listing)}>
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit?.(listing)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete?.(listing.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button className="w-full bg-green-700 hover:bg-green-800" onClick={() => setShowDetailModal(true)}>
              View Details
            </Button>
          )}
        </div>
      </CardContent>
      {showDetailModal && (
        <ListingDetailModal
          listing={listing}
          onClose={() => setShowDetailModal(false)}
          onContact={() => {
            // Handle contact action
            console.log("Contact owner:", listing.contactInfo)
          }}
          onEdit={() => {
            setShowDetailModal(false)
            onEdit?.(listing)
          }}
          onDelete={() => {
            setShowDetailModal(false)
            onDelete?.(listing.id)
          }}
          showActions={showActions}
        />
      )}
    </Card>
  )
}
