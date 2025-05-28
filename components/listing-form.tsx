"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import type { Listing } from "@/lib/database"
import { ImageUpload } from "@/components/image-upload"

type ListingCategory = "equipment" | "product" | "service" | "rental"

interface ListingFormProps {
  onClose: () => void
  onSubmit: (data: Partial<Listing>) => void
  listing?: Listing
  category: ListingCategory
}

interface FormData {
  title: string
  description: string
  category: string
  type: string
  location: string
  country: string
  price: string
  dailyRate: string
  weeklyRate: string
  quantity: string
  availability: string
  minRental: string
  contactInfo: string
  images: string[]
}

interface TypeOption {
  value: string
  label: string
}

/**
 * Universal form component for creating and editing listings
 * Handles all listing types with appropriate fields
 */
export function ListingForm({ onClose, onSubmit, listing, category }: ListingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: category,
    type: "",
    location: "",
    country: "",
    price: "",
    dailyRate: "",
    weeklyRate: "",
    quantity: "",
    availability: "",
    minRental: "",
    contactInfo: "",
    images: [] as string[],
  })

  const balkanCountries = [
    "Serbia",
    "Croatia",
    "Bosnia and Herzegovina",
    "Montenegro",
    "North Macedonia",
    "Albania",
    "Slovenia",
    "Bulgaria",
  ]

  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title,
        description: listing.description,
        category: listing.category,
        type: listing.type,
        location: listing.location,
        country: listing.country,
        price: listing.price?.toString() || "",
        dailyRate: listing.dailyRate?.toString() || "",
        weeklyRate: listing.weeklyRate?.toString() || "",
        quantity: listing.quantity || "",
        availability: listing.availability,
        minRental: listing.minRental || "",
        contactInfo: listing.contactInfo,
        images: listing.images || [],
      })
    }
  }, [listing])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const submitData: Partial<Listing> = {
      ...formData,
      price: formData.price ? Number(formData.price) : undefined,
      dailyRate: formData.dailyRate ? Number(formData.dailyRate) : undefined,
      weeklyRate: formData.weeklyRate ? Number(formData.weeklyRate) : undefined,
      status: "active",
      userId: "U001", // In real app, get from auth context
    }

    onSubmit(submitData)
    onClose()
  }

  const addImagePlaceholder = () => {
    const newImage = `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(formData.title || "Image")}`
    setFormData({ ...formData, images: [...formData.images, newImage] })
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const getTypeOptions = (): TypeOption[] => {
    switch (category) {
      case "equipment":
        return [
          { value: "share", label: "Share" },
          { value: "rent", label: "Rent" },
        ]
      case "product":
        return [{ value: "sell", label: "Sell" }]
      case "service":
        return [{ value: "service", label: "Service" }]
      case "rental":
        return [{ value: "rent", label: "Rent" }]
      default:
        return []
    }
  }

  const getCategoryOptions = (): string[] => {
    switch (category) {
      case "equipment":
        return ["Tractors", "Harvesters", "Planting", "Tillage", "Irrigation", "Other"]
      case "product":
        return ["Vegetables", "Grains", "Fruits", "Fertilizer", "Feed", "Seeds", "Other"]
      case "service":
        return ["Testing", "Spraying", "Harvesting", "Consulting", "Maintenance", "Other"]
      case "rental":
        return ["Tractors", "Harvesters", "Planting", "Tillage", "Transport", "Other"]
      default:
        return []
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-green-800">
                {listing ? "Edit" : "Create"} {category.charAt(0).toUpperCase() + category.slice(1)} Listing
              </CardTitle>
              <CardDescription>
                {listing ? "Update your listing information" : "Add a new listing to the marketplace"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., John Deere Tractor, Organic Potatoes"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {getTypeOptions().map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCategoryOptions().map((option) => (
                      <SelectItem key={option} value={option.toLowerCase()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <Label htmlFor="country">Country *</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {balkanCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your listing in detail"
                rows={3}
                required
              />
            </div>

            {/* Pricing fields based on category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(category === "product" || category === "service") && (
                <div>
                  <Label htmlFor="price">Price (€)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0"
                  />
                </div>
              )}

              {(category === "equipment" || category === "rental") && (
                <>
                  <div>
                    <Label htmlFor="dailyRate">Daily Rate (€)</Label>
                    <Input
                      id="dailyRate"
                      type="number"
                      value={formData.dailyRate}
                      onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weeklyRate">Weekly Rate (€)</Label>
                    <Input
                      id="weeklyRate"
                      type="number"
                      value={formData.weeklyRate}
                      onChange={(e) => setFormData({ ...formData, weeklyRate: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </>
              )}

              {category === "product" && (
                <div>
                  <Label htmlFor="quantity">Quantity Available</Label>
                  <Input
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g., 50 bags, 100kg"
                  />
                </div>
              )}

              {(category === "equipment" || category === "rental") && (
                <div>
                  <Label htmlFor="minRental">Minimum Rental</Label>
                  <Input
                    id="minRental"
                    value={formData.minRental}
                    onChange={(e) => setFormData({ ...formData, minRental: e.target.value })}
                    placeholder="e.g., 1 day, 3 days"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="availability">Availability *</Label>
                <Input
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  placeholder="e.g., Weekends, Spring season, Available now"
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact">Contact Information *</Label>
                <Input
                  id="contact"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  placeholder="Phone number or email"
                  required
                />
              </div>
            </div>

            {/* Image management */}
            <div>
              <Label>Images</Label>
              <ImageUpload
                images={formData.images}
                onImagesChange={(images) => setFormData({ ...formData, images })}
                maxImages={5}
                className="mt-2"
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" className="flex-1 bg-green-700 hover:bg-green-800">
                {listing ? "Update" : "Create"} Listing
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
