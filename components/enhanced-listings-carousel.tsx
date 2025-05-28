"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, MapPin, DollarSign } from "lucide-react"
import Image from "next/image"
import { DataService, type Listing } from "@/lib/data-service"

/**
 * Enhanced carousel component displaying 5-7 featured listings
 * Shows larger cards with more detailed information
 */
export function EnhancedListingsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  const dataService = DataService.getInstance()

  useEffect(() => {
    loadFeaturedListings()
  }, [])

  const loadFeaturedListings = async () => {
    try {
      const allListings = await dataService.getListings()
      // Get 7 random featured listings
      const shuffled = allListings.sort(() => 0.5 - Math.random())
      setListings(shuffled.slice(0, 7))
    } catch (error) {
      console.error("Error loading featured listings:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % listings.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + listings.length) % listings.length)
  }

  useEffect(() => {
    if (listings.length > 0) {
      const timer = setInterval(nextSlide, 6000) // Slower rotation for more content
      return () => clearInterval(timer)
    }
  }, [listings.length])

  const getTypeColor = (type: string) => {
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

  const formatPrice = (listing: Listing) => {
    if (listing.price) return `€${listing.price}`
    if (listing.dailyRate) return `€${listing.dailyRate}/day`
    return "Contact for price"
  }

  if (loading || listings.length === 0) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-800">Featured Listings</h2>
          <div className="text-center">Loading featured listings...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-800">Featured Listings</h2>
        <div className="relative max-w-6xl mx-auto">
          <Card className="overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <div className="relative h-96">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  {/* Image Section */}
                  <div className="relative">
                    <Image
                      src={listings[currentSlide]?.images?.[0] || "/placeholder.svg"}
                      alt={listings[currentSlide]?.title || "Featured listing"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="secondary" className={getTypeColor(listings[currentSlide]?.type || "")}>
                        {listings[currentSlide]?.type?.charAt(0).toUpperCase() + listings[currentSlide]?.type?.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="bg-white/90">
                        {listings[currentSlide]?.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-4 text-green-800">{listings[currentSlide]?.title}</h3>
                    <p className="text-stone-600 mb-6 text-lg leading-relaxed">{listings[currentSlide]?.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-stone-600">
                        <MapPin className="w-5 h-5 mr-3" />
                        <span className="text-lg">
                          {listings[currentSlide]?.location}, {listings[currentSlide]?.country}
                        </span>
                      </div>

                      <div className="flex items-center text-amber-600">
                        <DollarSign className="w-5 h-5 mr-3" />
                        <span className="text-xl font-semibold">{formatPrice(listings[currentSlide])}</span>
                      </div>

                      {listings[currentSlide]?.quantity && (
                        <div className="text-stone-600">
                          <span className="font-medium">Available: </span>
                          {listings[currentSlide]?.quantity}
                        </div>
                      )}
                    </div>

                    <Button className="bg-green-700 hover:bg-green-800 text-lg py-3">View Details</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {listings.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-amber-600" : "bg-stone-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          {/* Listing Counter */}
          <div className="text-center mt-4 text-stone-600">
            {currentSlide + 1} of {listings.length} featured listings
          </div>
        </div>
      </div>
    </section>
  )
}
