import Link from "next/link"

/**
 * Footer component with platform information and links
 * Includes contact information and legal pages
 */
export function Footer() {
  return (
    <footer className="bg-stone-800 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-200">SmartFarm</h3>
            <p className="text-stone-300">
              Connecting farmers across Europe for sustainable agriculture and shared prosperity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-amber-200">Platform</h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <Link href="/equipment" className="hover:text-amber-200">
                  Equipment
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="hover:text-amber-200">
                  Rentals
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-200">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-amber-200">Support</h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <Link href="/help" className="hover:text-amber-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-amber-200">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-amber-200">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-amber-200">Legal</h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <Link href="/privacy" className="hover:text-amber-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-200">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-8 pt-8 text-center text-stone-400">
          <p>&copy; 2025 SmartFarm Platform. All rights reserved. Supporting sustainable agriculture across Europe.</p>
        </div>
      </div>
    </footer>
  )
}
