"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface EquipmentFormProps {
  onClose: () => void
}

/**
 * Form component for listing new equipment
 * Handles equipment details, availability, and sharing preferences
 */
export function EquipmentForm({ onClose }: EquipmentFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    availability: "",
    contactInfo: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement database storage
    console.log("Equipment listing submitted:", formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-green-800">List Equipment for Sharing</CardTitle>
              <CardDescription>Share your equipment with the farming community</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Equipment Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., John Deere Tractor"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select equipment category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tractors">Tractors</SelectItem>
                  <SelectItem value="harvesters">Harvesters</SelectItem>
                  <SelectItem value="planting">Planting Equipment</SelectItem>
                  <SelectItem value="tillage">Tillage Equipment</SelectItem>
                  <SelectItem value="irrigation">Irrigation Systems</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your equipment, its condition, and any special requirements"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Region"
                required
              />
            </div>

            <div>
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                placeholder="e.g., Weekends, Spring season, By appointment"
                required
              />
            </div>

            <div>
              <Label htmlFor="contact">Contact Information</Label>
              <Input
                id="contact"
                value={formData.contactInfo}
                onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                placeholder="Phone number or email"
                required
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" className="flex-1 bg-green-700 hover:bg-green-800">
                List Equipment
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
