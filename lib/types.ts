import type React from "react"
/**
 * Comprehensive type definitions for the SmartFarm platform
 * Ensures type safety across all components and database operations
 */

// Base entity interface
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// User-related types
export type FarmSize = "small" | "medium" | "large" | "enterprise"
export type ExperienceLevel = "beginner" | "intermediate" | "experienced" | "expert"
export type BankPartner = "komercijalna" | "unicredit" | "raiffeisen" | "intesa" | "erste" | "nlb" | "other"

export interface User extends BaseEntity {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  country: string
  farmSize: FarmSize
  primaryCrops: string
  experience: ExperienceLevel
  bankPartner?: BankPartner
  agreeToAnalytics: boolean
  lastActive: Date
}

export interface AuthUser extends User {
  password: string
  isAdmin: boolean
  lastLogin: Date
}

// Listing-related types
export type ListingCategory = "equipment" | "product" | "service" | "rental"
export type ListingType = "share" | "sell" | "rent" | "service"
export type ListingStatus = "active" | "inactive" | "completed"

export interface Listing extends BaseEntity {
  userId: string
  title: string
  description: string
  category: ListingCategory
  type: ListingType
  location: string
  country: string
  price?: number
  dailyRate?: number
  weeklyRate?: number
  quantity?: string
  availability: string
  minRental?: string
  rating?: number
  status: ListingStatus
  images: string[]
  contactInfo: string
}

// Blog-related types
export type BlogCategory = "guide" | "tip" | "experience" | "faq"
export type BlogStatus = "published" | "draft"

export interface BlogPost extends BaseEntity {
  userId: string
  title: string
  content: string
  excerpt: string
  category: BlogCategory
  tags: string[]
  images: string[]
  isAdminPost: boolean
  tipAmount: number
  tipCount: number
  likes: number
  views: number
  status: BlogStatus
}

export interface TipType extends BaseEntity {
  blogPostId: string
  userId: string
  amount: number
  message?: string
}

// Transaction-related types
export type TransactionType = "rental" | "purchase" | "share" | "service"
export type TransactionStatus = "pending" | "completed" | "cancelled"

export interface Transaction extends BaseEntity {
  listingId: string
  buyerId: string
  sellerId: string
  amount?: number
  type: TransactionType
  status: TransactionStatus
  startDate?: Date
  endDate?: Date
}

// Chat-related types
export interface ChatMessage extends BaseEntity {
  userId: string
  message: string
  response: string
  category: string
}

// Filter types
export interface ListingFilters {
  category?: ListingCategory
  type?: ListingType
  location?: string
  country?: string
  userId?: string
  priceMin?: number
  priceMax?: number
  status?: ListingStatus
}

export interface BlogFilters {
  category?: BlogCategory
  userId?: string
  tags?: string[]
}

// Analytics types
export interface UserAnalytics {
  totalListings: number
  totalTransactions: number
  preferredCategories: string[]
  activityScore: number
  riskAssessment: "low" | "medium" | "high"
}

export interface PlatformAnalytics {
  totalUsers: number
  totalListings: number
  totalTransactions: number
  popularCategories: { category: string; count: number }[]
  monthlyGrowth: number
}

// Form data types
export interface ListingFormData {
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

export interface BlogFormData {
  title: string
  content: string
  excerpt: string
  category: BlogCategory
  tags: string[]
  images: string[]
}

export interface UserRegistrationData {
  firstName: string
  lastName: string
  email: string
  password?: string
  phone: string
  location: string
  country: string
  farmSize: FarmSize
  primaryCrops: string
  experience: ExperienceLevel
  bankPartner?: BankPartner
  agreeToTerms: boolean
  agreeToAnalytics: boolean
}

// Component prop types
export interface ModalProps {
  onClose: () => void
}

export interface FormProps<T> extends ModalProps {
  onSubmit: (data: Partial<T>) => void
}

export interface EditFormProps<T> extends FormProps<T> {
  item?: T
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Event handler types
export type ClickHandler = () => void
export type SubmitHandler<T> = (data: T) => void | Promise<void>
export type ChangeHandler<T> = (value: T) => void
export type AsyncHandler = () => Promise<void>

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
export type CreateInput<T> = Omit<T, "id" | "createdAt" | "updatedAt">
export type UpdateInput<T> = Partial<Omit<T, "id" | "createdAt" | "updatedAt">>

// Country and location types
export type BalkanCountry =
  | "Serbia"
  | "Croatia"
  | "Bosnia and Herzegovina"
  | "Montenegro"
  | "North Macedonia"
  | "Albania"
  | "Slovenia"
  | "Bulgaria"

// Image upload types
export interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  className?: string
}

// Navigation types
export interface NavigationItem {
  href: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

// Theme and styling types
export type ColorVariant = "primary" | "secondary" | "success" | "warning" | "error" | "info"
export type SizeVariant = "sm" | "md" | "lg" | "xl"

// Error types
export interface FormError {
  field: string
  message: string
}

export interface ValidationError {
  errors: FormError[]
  isValid: boolean
}
