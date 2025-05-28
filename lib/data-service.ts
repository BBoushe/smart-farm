/**
 * Data service for the SmartFarm platform
 * Provides CRUD operations using hardcoded data
 */

import {
  authUsers,
  listings,
  blogPosts,
  transactions,
  tips,
  getUserById,
  getListingsByUserId,
  getTransactionsByUserId,
} from "./data"

import type {
  AuthUser,
  Listing,
  BlogPost,
  TipType,
  ListingFilters,
  BlogFilters,
  UserAnalytics,
  PlatformAnalytics,
  CreateInput,
  UpdateInput,
  UserRegistrationData,
} from "./types"

/**
 * Data service class with CRUD operations using hardcoded data
 */
export class DataService {
  private static instance: DataService

  private constructor() {}

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService()
    }
    return DataService.instance
  }

  // Authentication methods
  async authenticateUser(email: string, password: string): Promise<AuthUser | null> {
    const user = authUsers.find((u) => u.email === email && u.password === password)
    if (user) {
      // Update last login
      user.lastLogin = new Date()
      return user
    }
    return null
  }

  async registerUser(userData: UserRegistrationData): Promise<AuthUser> {
    const newUser: AuthUser = {
      ...userData,
      id: `U${String(authUsers.length + 1).padStart(3, "0")}`,
      password: userData.password || "defaultpass",
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date(),
      lastActive: new Date(),
    }
    authUsers.push(newUser)
    return newUser
  }

  // User CRUD operations
  async getUserById(id: string): Promise<AuthUser | null> {
    return getUserById(id) || null
  }

  async updateUser(id: string, updates: UpdateInput<AuthUser>): Promise<AuthUser | null> {
    const userIndex = authUsers.findIndex((user) => user.id === id)
    if (userIndex === -1) return null

    authUsers[userIndex] = {
      ...authUsers[userIndex],
      ...updates,
      updatedAt: new Date(),
      lastActive: new Date(),
    }
    return authUsers[userIndex]
  }

  // Listing CRUD operations
  async createListing(listingData: CreateInput<Listing>): Promise<Listing> {
    const listing: Listing = {
      ...listingData,
      id: `L${String(listings.length + 1).padStart(3, "0")}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    listings.push(listing)
    return listing
  }

  async getListingById(id: string): Promise<Listing | null> {
    return listings.find((listing) => listing.id === id) || null
  }

  async updateListing(id: string, updates: Partial<Listing>): Promise<Listing | null> {
    const listingIndex = listings.findIndex((listing) => listing.id === id)
    if (listingIndex === -1) return null

    listings[listingIndex] = {
      ...listings[listingIndex],
      ...updates,
      updatedAt: new Date(),
    }
    return listings[listingIndex]
  }

  async deleteListing(id: string): Promise<boolean> {
    const listingIndex = listings.findIndex((listing) => listing.id === id)
    if (listingIndex === -1) return false

    listings.splice(listingIndex, 1)
    return true
  }

  async getListings(filters?: ListingFilters): Promise<Listing[]> {
    let filteredListings = [...listings]

    if (filters) {
      if (filters.category) {
        filteredListings = filteredListings.filter((l) => l.category === filters.category)
      }
      if (filters.type) {
        filteredListings = filteredListings.filter((l) => l.type === filters.type)
      }
      if (filters.location) {
        filteredListings = filteredListings.filter((l) =>
          l.location.toLowerCase().includes(filters.location!.toLowerCase()),
        )
      }
      if (filters.country) {
        filteredListings = filteredListings.filter((l) => l.country === filters.country)
      }
      if (filters.userId) {
        filteredListings = filteredListings.filter((l) => l.userId === filters.userId)
      }
      if (filters.priceMin !== undefined) {
        filteredListings = filteredListings.filter(
          (l) => (l.price && l.price >= filters.priceMin!) || (l.dailyRate && l.dailyRate >= filters.priceMin!),
        )
      }
      if (filters.priceMax !== undefined) {
        filteredListings = filteredListings.filter(
          (l) => (l.price && l.price <= filters.priceMax!) || (l.dailyRate && l.dailyRate <= filters.priceMax!),
        )
      }
      if (filters.status) {
        filteredListings = filteredListings.filter((l) => l.status === filters.status)
      }
    }

    return filteredListings.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  async getUserListings(userId: string): Promise<Listing[]> {
    return getListingsByUserId(userId)
  }

  // Blog post CRUD operations
  async createBlogPost(postData: CreateInput<BlogPost>): Promise<BlogPost> {
    const post: BlogPost = {
      ...postData,
      id: `B${String(blogPosts.length + 1).padStart(3, "0")}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    blogPosts.push(post)
    return post
  }

  async getBlogPosts(filters?: BlogFilters): Promise<BlogPost[]> {
    let filtered = blogPosts.filter((post) => post.status === "published")

    if (filters) {
      if (filters.category) {
        filtered = filtered.filter((p) => p.category === filters.category)
      }
      if (filters.userId) {
        filtered = filtered.filter((p) => p.userId === filters.userId)
      }
      if (filters.tags) {
        filtered = filtered.filter((p) => filters.tags!.some((tag) => p.tags.includes(tag)))
      }
    }

    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  async addTip(tipData: CreateInput<TipType>): Promise<void> {
    const tip: TipType = {
      ...tipData,
      id: `T${String(tips.length + 1).padStart(3, "0")}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    tips.push(tip)

    // Update blog post tip amount
    const post = blogPosts.find((p) => p.id === tipData.blogPostId)
    if (post) {
      post.tipAmount += tipData.amount
      post.tipCount += 1
    }
  }

  // Analytics methods
  async getUserAnalytics(userId: string): Promise<UserAnalytics> {
    const userListings = getListingsByUserId(userId)
    const userTransactions = getTransactionsByUserId(userId)

    const categories = userListings.map((l) => l.category)
    const preferredCategories = [...new Set(categories)]

    const activityScore = userListings.length + userTransactions.length
    let riskAssessment: "low" | "medium" | "high" = "medium"

    if (activityScore > 10) riskAssessment = "low"
    else if (activityScore < 3) riskAssessment = "high"

    return {
      totalListings: userListings.length,
      totalTransactions: userTransactions.length,
      preferredCategories,
      activityScore,
      riskAssessment,
    }
  }

  async getPlatformAnalytics(): Promise<PlatformAnalytics> {
    const categoryCount = listings.reduce(
      (acc, listing) => {
        acc[listing.category] = (acc[listing.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const popularCategories = Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)

    return {
      totalUsers: authUsers.length,
      totalListings: listings.length,
      totalTransactions: transactions.length,
      popularCategories,
      monthlyGrowth: 12,
    }
  }
}
