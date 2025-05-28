"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ListingFilters } from "@/components/listing-filters"
import { ListingCard } from "@/components/listing-card"
import { ListingForm } from "@/components/listing-form"
import { DataService, type Listing } from "@/lib/data-service"

/**
 * Enhanced equipment rental marketplace page with full CRUD functionality
 * Allows farmers to rent equipment for short-term use
 */
export default function RentalsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingListing, setEditingListing] = useState<Listing | undefined>()
  const [listings, setListings] = useState<Listing[]>([])
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  const dataService = DataService.getInstance()

  useEffect(() => {
    loadListings()
  }, [])

  const loadListings = async () => {
    setLoading(true)
    try {
      const data = await dataService.getListings({ category: "rental" })
      setListings(data)
      setFilteredListings(data)
    } catch (error) {
      console.error("Error loading listings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFiltersChange = async (filters: any) => {
    const data = await dataService.getListings({
      category: "rental",
      ...filters,
    })
    setFilteredListings(data)
  }

  const handleCreateListing = async (data: Partial<Listing>) => {
    try {
      await dataService.createListing({
        ...data,
        category: "rental",
        status: "active",
        userId: "U001",
        images: data.images || [],
        contactInfo: data.contactInfo || "",
        country: data.country || "",
      } as Omit<Listing, "id" | "createdAt" | "updatedAt">)

      loadListings()
      setShowForm(false)
    } catch (error) {
      console.error("Error creating listing:", error)
    }
  }

  const handleEditListing = async (data: Partial<Listing>) => {
    if (!editingListing) return

    try {
      await dataService.updateListing(editingListing.id, data)
      loadListings()
      setEditingListing(undefined)
    } catch (error) {
      console.error("Error updating listing:", error)
    }
  }

  const handleDeleteListing = async (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      try {
        await dataService.deleteListing(id)
        loadListings()
      } catch (error) {
        console.error("Error deleting listing:", error)
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading rental listings...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">Equipment Rentals</h1>
          <p className="text-stone-600">Rent professional farming equipment for short-term projects</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" />
          List for Rent
        </Button>
      </div>

      <ListingFilters
        onFiltersChange={handleFiltersChange}
        categories={["tractors", "harvesters", "planting", "tillage", "transport"]}
        types={["rent"]}
        showPriceFilter={true}
      />

      {/* Update the grid to match other pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            showActions={listing.userId === "U001"}
            onEdit={setEditingListing}
            onDelete={handleDeleteListing}
          />
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-stone-600 text-lg">No rental listings found matching your criteria.</p>
          <Button onClick={() => setShowForm(true)} className="mt-4 bg-green-700 hover:bg-green-800">
            Be the first to list equipment for rent
          </Button>
        </div>
      )}

      {(showForm || editingListing) && (
        <ListingForm
          category="rental"
          listing={editingListing}
          onClose={() => {
            setShowForm(false)
            setEditingListing(undefined)
          }}
          onSubmit={editingListing ? handleEditListing : handleCreateListing}
        />
      )}
    </div>
  )
}
