import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tractor, ShoppingCart, Wrench, MessageCircle } from "lucide-react"
import Link from "next/link"

/**
 * Features section showcasing the four main platform capabilities
 * Each feature card links to its respective functionality page
 */
export function FeaturesSection() {
  const features = [
    {
      icon: <Tractor className="w-12 h-12 text-amber-600" />,
      title: "Share Equipment",
      description: "Connect with fellow farmers to share equipment and reduce operational costs.",
      link: "/equipment",
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-amber-600" />,
      title: "Sell Products",
      description: "List and sell your surplus produce to a community that values freshness and quality.",
      link: "/products",
    },
    {
      icon: <Wrench className="w-12 h-12 text-amber-600" />,
      title: "Rent Equipment",
      description: "Find reliable equipment rentals for your farming needs at competitive prices.",
      link: "/rentals",
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-amber-600" />,
      title: "AI Assistant",
      description: "Get instant support and expert advice from our AI-powered agricultural assistant.",
      link: "/chat",
    },
  ]

  return (
    <section className="py-16 px-4 bg-stone-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-800">Everything You Need in One Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link key={index} href={feature.link}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-stone-200 hover:border-amber-300">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl text-green-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-stone-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
