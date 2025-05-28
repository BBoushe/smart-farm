"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

/**
 * Carousel component displaying featured listings
 * Rotates through equipment, products, and services automatically
 */
export function ListingsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const listings = [
    {
      id: 1,
      title: "John Deere Tractor for Rent",
      description: "High-performance tractor available for seasonal rental",
      image: "/placeholder.svg?height=300&width=400",
      type: "Equipment Rental",
    },
    {
      id: 2,
      title: "Organic Potatoes for Sale",
      description: "Fresh organic potatoes, 50kg bags available",
      image: "/placeholder.svg?height=300&width=400",
      type: "Product Sale",
    },
    {
      id: 3,
      title: "Combine Harvester Share",
      description: "Share harvester costs with neighboring farms",
      image: "/placeholder.svg?height=300&width=400",
      type: "Equipment Share",
    },
    {
      id: 4,
      title: "Soil Testing Service",
      description: "Professional soil analysis and recommendations",
      image: "/placeholder.svg?height=300&width=400",
      type: "Service",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % listings.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + listings.length) % listings.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-800">Featured Listings</h2>
        <div className="relative max-w-2xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={listings[currentSlide].image || "/placeholder.svg"}
                  alt={listings[currentSlide].title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm">
                    {listings[currentSlide].type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-green-800">{listings[currentSlide].title}</h3>
                <p className="text-stone-600">{listings[currentSlide].description}</p>
              </div>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
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
      </div>
    </section>
  )
}
