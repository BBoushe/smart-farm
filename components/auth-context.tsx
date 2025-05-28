"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { DataService } from "@/lib/data-service"
import type { AuthUser } from "@/lib/types"
import type { UserRegistrationData } from "@/lib/types"

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: UserRegistrationData) => Promise<boolean>
  logout: () => void
  loading: boolean
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Authentication context provider for managing user sessions
 * Handles login, registration, and session persistence
 */
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const dataService = DataService.getInstance()

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("smartfarm_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const authenticatedUser = await dataService.authenticateUser(email, password)
      if (authenticatedUser) {
        setUser(authenticatedUser)
        localStorage.setItem("smartfarm_user", JSON.stringify(authenticatedUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (userData: UserRegistrationData): Promise<boolean> => {
    try {
      const newUser = await dataService.registerUser(userData)
      setUser(newUser)
      localStorage.setItem("smartfarm_user", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = (): void => {
    setUser(null)
    localStorage.removeItem("smartfarm_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
