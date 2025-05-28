import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { EnhancedListingsCarousel } from "@/components/enhanced-listings-carousel"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <EnhancedListingsCarousel />
      <Footer />
    </main>
  )
}
