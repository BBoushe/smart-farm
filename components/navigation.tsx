"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Main navigation component for the SmartFarm platform
 * Provides responsive navigation with mobile menu support
 */
export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-green-800 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-amber-200">
            SmartFarm
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link href="/equipment" className="hover:text-amber-200 transition-colors">
              Equipment
            </Link>
            <Link href="/products" className="hover:text-amber-200 transition-colors">
              Products
            </Link>
            <Link href="/rentals" className="hover:text-amber-200 transition-colors">
              Rentals
            </Link>
            <Link href="/services" className="hover:text-amber-200 transition-colors">
              Services
            </Link>
            <Link href="/learn" className="hover:text-amber-200 transition-colors">
              Learn
            </Link>
            <Link href="/chat" className="hover:text-amber-200 transition-colors">
              AI Assistant
            </Link>
            <Link href="/dashboard" className="hover:text-amber-200 transition-colors">
              Dashboard
            </Link>
          </div>

          <div className="hidden md:flex space-x-2">
            <Button variant="outline" className="text-green-800 border-amber-200 hover:bg-amber-200">
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Link href="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/equipment" className="block py-2 hover:text-amber-200">
              Equipment
            </Link>
            <Link href="/products" className="block py-2 hover:text-amber-200">
              Products
            </Link>
            <Link href="/rentals" className="block py-2 hover:text-amber-200">
              Rentals
            </Link>
            <Link href="/services" className="block py-2 hover:text-amber-200">
              Services
            </Link>
            <Link href="/learn" className="block py-2 hover:text-amber-200">
              Learn
            </Link>
            <Link href="/chat" className="block py-2 hover:text-amber-200">
              AI Assistant
            </Link>
            <Link href="/dashboard" className="block py-2 hover:text-amber-200">
              Dashboard
            </Link>
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full text-green-800 border-amber-200">
                <Link href="/login">Login</Link>
              </Button>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
