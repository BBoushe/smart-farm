"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TrendingUp, Package, Wrench, ShoppingCart } from "lucide-react"
import { ListingCard } from "@/components/listing-card"
import { ListingForm } from "@/components/listing-form"
import { DataService, type Listing } from "@/lib/data-service"

/**
 * User dashboard for managing listings and viewing analytics
 * Provides overview of user's activity and quick access to CRUD operations
 */
export default function DashboardPage() {
  const [userListings, setUserListings] = useState<Listing[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingListing, setEditingListing] = useState<Listing | undefined>()
  const [formCategory, setFormCategory] = useState<"equipment" | "product" | "service" | "rental">("equipment")
  const [loading, setLoading] = useState(true)

  const dataService = DataService.getInstance()
  const currentUserId = "U001" // In real app, get from auth context

  useEffect(() => {
    loadUserListings()
  }, [])

  const loadUserListings = async () => {
    setLoading(true)
    try {
      const listings = await dataService.getUserListings(currentUserId)
      setUserListings(listings)
    } catch (error) {
      console.error("Error loading user listings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateListing = async (data: Partial<Listing>) => {
    try {
      await dataService.createListing({
        ...data,
        category: formCategory,
        status: "active",
        userId: currentUserId,
        images: data.images || [],
        contactInfo: data.contactInfo || "",
        country: data.country || "",
      } as Omit<Listing, "id" | "createdAt" | "updatedAt">)

      loadUserListings()
      setShowForm(false)
    } catch (error) {
      console.error("Error creating listing:", error)
    }
  }

  const handleEditListing = async (data: Partial<Listing>) => {
    if (!editingListing) return

    try {
      await dataService.updateListing(editingListing.id, data)
      loadUserListings()
      setEditingListing(undefined)
    } catch (error) {
      console.error("Error updating listing:", error)
    }
  }

  const handleDeleteListing = async (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      try {
        await dataService.deleteListing(id)
        loadUserListings()
      } catch (error) {
        console.error("Error deleting listing:", error)
      }
    }
  }

  const getListingsByCategory = (category: string) => {
    return userListings.filter((listing) => listing.category === category)
  }

  const getStatsCards = () => {
    const equipmentCount = getListingsByCategory("equipment").length
    const productCount = getListingsByCategory("product").length
    const serviceCount = getListingsByCategory("service").length
    const rentalCount = getListingsByCategory("rental").length

    return [
      {
        title: "Equipment Shared",
        count: equipmentCount,
        icon: <Wrench className="w-5 h-5" />,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      },
      {
        title: "Products Listed",
        count: productCount,
        icon: <Package className="w-5 h-5" />,
        color: "text-green-600",
        bgColor: "bg-green-100",
      },
      {
        title: "Services Offered",
        count: serviceCount,
        icon: <TrendingUp className="w-5 h-5" />,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
      },
      {
        title: "Rentals Available",
        count: rentalCount,
        icon: <ShoppingCart className="w-5 h-5" />,
        color: "text-amber-600",
        bgColor: "bg-amber-100",
      },
    ]
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">My Dashboard</h1>
          <p className="text-stone-600">Manage your listings and track your farming marketplace activity</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {getStatsCards().map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor} ${stat.color}`}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stat.count}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-green-800">Quick Actions</CardTitle>
          <CardDescription>Create new listings across all categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => {
                setFormCategory("equipment")
                setShowForm(true)
              }}
              className="h-20 flex flex-col bg-blue-600 hover:bg-blue-700"
            >
              <Wrench className="w-6 h-6 mb-2" />
              List Equipment
            </Button>
            <Button
              onClick={() => {
                setFormCategory("product")
                setShowForm(true)
              }}
              className="h-20 flex flex-col bg-green-600 hover:bg-green-700"
            >
              <Package className="w-6 h-6 mb-2" />
              List Product
            </Button>
            <Button
              onClick={() => {
                setFormCategory("service")
                setShowForm(true)
              }}
              className="h-20 flex flex-col bg-purple-600 hover:bg-purple-700"
            >
              <TrendingUp className="w-6 h-6 mb-2" />
              Offer Service
            </Button>
            <Button
              onClick={() => {
                setFormCategory("rental")
                setShowForm(true)
              }}
              className="h-20 flex flex-col bg-amber-600 hover:bg-amber-700"
            >
              <ShoppingCart className="w-6 h-6 mb-2" />
              List Rental
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Listings Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-800">My Listings</CardTitle>
          <CardDescription>Manage all your marketplace listings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All ({userListings.length})</TabsTrigger>
              <TabsTrigger value="equipment">Equipment ({getListingsByCategory("equipment").length})</TabsTrigger>
              <TabsTrigger value="product">Products ({getListingsByCategory("product").length})</TabsTrigger>
              <TabsTrigger value="service">Services ({getListingsByCategory("service").length})</TabsTrigger>
              <TabsTrigger value="rental">Rentals ({getListingsByCategory("rental").length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    showActions={true}
                    onEdit={setEditingListing}
                    onDelete={handleDeleteListing}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="equipment" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getListingsByCategory("equipment").map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    showActions={true}
                    onEdit={setEditingListing}
                    onDelete={handleDeleteListing}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="product" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getListingsByCategory("product").map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    showActions={true}
                    onEdit={setEditingListing}
                    onDelete={handleDeleteListing}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="service" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getListingsByCategory("service").map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    showActions={true}
                    onEdit={setEditingListing}
                    onDelete={handleDeleteListing}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rental" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getListingsByCategory("rental").map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    showActions={true}
                    onEdit={setEditingListing}
                    onDelete={handleDeleteListing}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {userListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-600 text-lg mb-4">You haven't created any listings yet.</p>
              <Button onClick={() => setShowForm(true)} className="bg-green-700 hover:bg-green-800">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Listing
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {(showForm || editingListing) && (
        <ListingForm
          category={editingListing?.category || formCategory}
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
