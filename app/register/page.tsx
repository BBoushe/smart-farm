"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// Add loading state and import useAuth
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"

/**
 * Enhanced user registration page for the SmartFarm platform
 * Includes Balkan countries dropdown and comprehensive required fields
 */
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    country: "",
    farmSize: "",
    primaryCrops: "",
    experience: "",
    bankPartner: "",
    agreeToTerms: false,
    agreeToAnalytics: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.country) newErrors.country = "Country is required"
    if (!formData.farmSize) newErrors.farmSize = "Farm size is required"
    if (!formData.experience) newErrors.experience = "Experience level is required"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const success = await register(formData)
      if (success) {
        router.push("/dashboard")
      } else {
        setErrors({ general: "Registration failed. Please try again." })
      }
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-green-800">Join SmartFarm</CardTitle>
          <CardDescription>
            Create your account and connect with the farming community across the Balkans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={errors.firstName ? "border-red-500" : ""}
                  required
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={errors.lastName ? "border-red-500" : ""}
                  required
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-red-500" : ""}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+381 60 123 4567"
                className={errors.phone ? "border-red-500" : ""}
                required
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">City/Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Belgrade, Zagreb, Sarajevo..."
                  className={errors.location ? "border-red-500" : ""}
                  required
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <Label htmlFor="country">Country *</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
                >
                  <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {balkanCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="farmSize">Farm Size *</Label>
              <Select
                value={formData.farmSize}
                onValueChange={(value) => setFormData({ ...formData, farmSize: value })}
              >
                <SelectTrigger className={errors.farmSize ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your farm size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (1-10 hectares)</SelectItem>
                  <SelectItem value="medium">Medium (10-50 hectares)</SelectItem>
                  <SelectItem value="large">Large (50-200 hectares)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (200+ hectares)</SelectItem>
                </SelectContent>
              </Select>
              {errors.farmSize && <p className="text-red-500 text-sm mt-1">{errors.farmSize}</p>}
            </div>

            <div>
              <Label htmlFor="primaryCrops">Primary Crops/Livestock</Label>
              <Input
                id="primaryCrops"
                value={formData.primaryCrops}
                onChange={(e) => setFormData({ ...formData, primaryCrops: e.target.value })}
                placeholder="e.g., Wheat, Corn, Cattle, Vegetables"
              />
            </div>

            <div>
              <Label htmlFor="experience">Farming Experience *</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => setFormData({ ...formData, experience: value })}
              >
                <SelectTrigger className={errors.experience ? "border-red-500" : ""}>
                  <SelectValue placeholder="Years of experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (3-10 years)</SelectItem>
                  <SelectItem value="experienced">Experienced (10-20 years)</SelectItem>
                  <SelectItem value="expert">Expert (20+ years)</SelectItem>
                </SelectContent>
              </Select>
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>

            <div>
              <Label htmlFor="bankPartner">Banking Partner (Optional)</Label>
              <Select
                value={formData.bankPartner}
                onValueChange={(value) => setFormData({ ...formData, bankPartner: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your bank (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="komercijalna">Komercijalna Banka (Serbia)</SelectItem>
                  <SelectItem value="unicredit">UniCredit Bank</SelectItem>
                  <SelectItem value="raiffeisen">Raiffeisen Bank</SelectItem>
                  <SelectItem value="intesa">Intesa Sanpaolo</SelectItem>
                  <SelectItem value="erste">Erste Bank (Croatia)</SelectItem>
                  <SelectItem value="nlb">NLB Bank (Slovenia)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  className={errors.agreeToTerms ? "border-red-500" : ""}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-green-700 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-green-700 hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    *
                  </Label>
                  {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="analytics"
                  checked={formData.agreeToAnalytics}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToAnalytics: checked as boolean })}
                />
                <Label
                  htmlFor="analytics"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I consent to sharing anonymized usage data with banking partners for personalized financial services
                  (optional)
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800"
              disabled={!formData.agreeToTerms || loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
            {errors.general && <p className="text-red-500 text-sm mt-1">{errors.general}</p>}

            <div className="text-center text-sm text-stone-600">
              Already have an account?{" "}
              <Link href="/login" className="text-green-700 hover:underline">
                Sign in here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
