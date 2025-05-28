import { Button } from "@/components/ui/button"
import Link from "next/link"

/**
 * Hero section component displaying the main value proposition
 * Features call-to-action and platform introduction
 */
export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-green-700 to-green-600 text-white py-24 px-4">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-amber-100">Welcome to SmartFarm</h1>
        <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
          Your comprehensive platform for equipment sharing, product sales, rentals, and agricultural services. Connect
          with fellow farmers and grow your business sustainably.
        </p>
        <div className="space-x-4">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
            <Link href="/register">Get Started Today</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-amber-200 text-amber-200 hover:bg-amber-200 hover:text-green-800 px-8 py-3"
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
