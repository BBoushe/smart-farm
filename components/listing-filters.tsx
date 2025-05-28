"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import type { ListingFilters, BalkanCountry } from "@/lib/types"

interface ListingFiltersProps {
  onFiltersChange: (filters: ListingFilters) => void
  categories: string[]
  types: string[]
  showPriceFilter?: boolean
  showStatusFilter?: boolean
}

/**
 * Comprehensive filtering component for all listing pages
 * Provides category, location, price, and status filtering
 */
export function ListingFilters({
  onFiltersChange,
  categories,
  types,
  showPriceFilter = true,
  showStatusFilter = false,
}: ListingFiltersProps) {
  const [filters, setFilters] = useState<ListingFilters>({})
  const [isExpanded, setIsExpanded] = useState(false)

  const balkanCountries: BalkanCountry[] = [
    "Serbia",
    "Croatia",
    "Bosnia and Herzegovina",
    "Montenegro",
    "North Macedonia",
    "Albania",
    "Slovenia",
    "Bulgaria",
  ]

  const handleFilterChange = (key: keyof ListingFilters, value: string | number | undefined): void => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = (): void => {
    setFilters({})
    onFiltersChange({})
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-green-800">
            <Filter className="w-5 h-5 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-amber-100 text-amber-800">
                {activeFilterCount}
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Hide" : "Show"} Filters
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select onValueChange={(value) => handleFilterChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={(value) => handleFilterChange("country", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All countries</SelectItem>
                  {balkanCountries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City or region"
                value={filters.location || ""}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>

            {showPriceFilter && (
              <>
                <div>
                  <Label htmlFor="priceMin">Min Price (€)</Label>
                  <Input
                    id="priceMin"
                    type="number"
                    placeholder="0"
                    value={filters.priceMin || ""}
                    onChange={(e) =>
                      handleFilterChange("priceMin", e.target.value ? Number(e.target.value) : undefined)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="priceMax">Max Price (€)</Label>
                  <Input
                    id="priceMax"
                    type="number"
                    placeholder="1000"
                    value={filters.priceMax || ""}
                    onChange={(e) =>
                      handleFilterChange("priceMax", e.target.value ? Number(e.target.value) : undefined)
                    }
                  />
                </div>
              </>
            )}

            {showStatusFilter && (
              <div>
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value) => handleFilterChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {activeFilterCount > 0 && (
            <div className="mt-4 flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(
                  ([key, value]) =>
                    value && (
                      <Badge key={key} variant="outline" className="flex items-center gap-1">
                        {key}: {value}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => handleFilterChange(key as keyof ListingFilters, undefined)}
                        />
                      </Badge>
                    ),
                )}
              </div>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
