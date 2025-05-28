"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { DataService } from "@/lib/data-service"
import { useEffect, useState } from "react"
import type { PlatformAnalytics, UserAnalytics } from "@/lib/types"

/**
 * Analytics dashboard for bank integration and user insights
 * Displays user behavior patterns and financial opportunities
 */
export default function AnalyticsPage() {
  const { user, loading } = useAuth()
  const [platformAnalytics, setPlatformAnalytics] = useState<PlatformAnalytics | null>(null)
  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics | null>(null)
  const [dataLoading, setDataLoading] = useState(true)

  const dataService = DataService.getInstance()

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const platformData = await dataService.getPlatformAnalytics()
        setPlatformAnalytics(platformData)

        if (user) {
          const userData = await dataService.getUserAnalytics(user.id)
          setUserAnalytics(userData)
        }
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setDataLoading(false)
      }
    }

    if (!loading) {
      fetchAnalytics()
    }
  }, [user, loading, dataService])

  if (loading || dataLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading analytics...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>Please log in to view analytics.</p>
        </div>
      </div>
    )
  }

  // Mock analytics data - in production, this would come from database
  const analyticsData = {
    totalUsers: platformAnalytics?.totalUsers || 1247,
    activeListings: platformAnalytics?.totalListings || 89,
    monthlyTransactions: platformAnalytics?.totalTransactions || 156,
    popularCategories: [
      { name: "Tractors", count: 45, trend: "+12%" },
      { name: "Harvesters", count: 23, trend: "+8%" },
      { name: "Organic Products", count: 67, trend: "+15%" },
      { name: "Soil Equipment", count: 34, trend: "+5%" },
    ],
    userBehavior: {
      frequentRenters: 89,
      equipmentSharers: 156,
      productSellers: 234,
      serviceProviders: 78,
    },
    financialInsights: [
      {
        userId: "U001",
        name: "Marko Petrović",
        activity: "Frequent tractor rentals",
        recommendation: "Tractor purchase loan",
        riskScore: "Low",
        potentialLoan: "€25,000",
      },
      {
        userId: "U002",
        name: "Ana Jovanović",
        activity: "Multiple equipment purchases",
        recommendation: "Equipment expansion credit",
        riskScore: "Medium",
        potentialLoan: "€15,000",
      },
      {
        userId: "U003",
        name: "Stefan Nikolić",
        activity: "Consistent product sales",
        recommendation: "Business development loan",
        riskScore: "Low",
        potentialLoan: "€30,000",
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Platform Analytics</h1>
        <p className="text-stone-600">Insights for financial institutions and platform optimization</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{analyticsData.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{analyticsData.activeListings}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{analyticsData.monthlyTransactions}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loan Opportunities</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">€70,000</div>
            <p className="text-xs text-muted-foreground">Potential monthly volume</p>
          </CardContent>
        </Card>
      </div>

      {/* User Behavior Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">User Behavior Patterns</CardTitle>
            <CardDescription>Activity distribution across platform features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Frequent Renters</span>
                <Badge variant="secondary">{analyticsData.userBehavior.frequentRenters}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Equipment Sharers</span>
                <Badge variant="secondary">{analyticsData.userBehavior.equipmentSharers}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Product Sellers</span>
                <Badge variant="secondary">{analyticsData.userBehavior.productSellers}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Service Providers</span>
                <Badge variant="secondary">{analyticsData.userBehavior.serviceProviders}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">Popular Categories</CardTitle>
            <CardDescription>Most active equipment and product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.popularCategories.map((category, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{category.name}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{category.count}</Badge>
                    <Badge variant="secondary" className="text-green-700">
                      {category.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Analytics Section */}
      {userAnalytics && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-green-800">Your Activity Summary</CardTitle>
            <CardDescription>Personal analytics and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">{userAnalytics.totalListings}</div>
                <p className="text-sm text-stone-600">Total Listings</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">{userAnalytics.totalTransactions}</div>
                <p className="text-sm text-stone-600">Transactions</p>
              </div>
              <div className="text-center">
                <Badge
                  variant={userAnalytics.riskAssessment === "low" ? "default" : "secondary"}
                  className={userAnalytics.riskAssessment === "low" ? "bg-green-100 text-green-800" : ""}
                >
                  {userAnalytics.riskAssessment.toUpperCase()} RISK
                </Badge>
                <p className="text-sm text-stone-600 mt-1">Credit Assessment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Financial Insights for Banks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-800">Financial Opportunities</CardTitle>
          <CardDescription>AI-powered loan recommendations based on user behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">User</th>
                  <th className="text-left p-2">Activity Pattern</th>
                  <th className="text-left p-2">Recommendation</th>
                  <th className="text-left p-2">Risk Score</th>
                  <th className="text-left p-2">Potential Loan</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.financialInsights.map((insight, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{insight.name}</td>
                    <td className="p-2 text-stone-600">{insight.activity}</td>
                    <td className="p-2">{insight.recommendation}</td>
                    <td className="p-2">
                      <Badge
                        variant={insight.riskScore === "Low" ? "default" : "secondary"}
                        className={insight.riskScore === "Low" ? "bg-green-100 text-green-800" : ""}
                      >
                        {insight.riskScore}
                      </Badge>
                    </td>
                    <td className="p-2 font-semibold text-green-700">{insight.potentialLoan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
