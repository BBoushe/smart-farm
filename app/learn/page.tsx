"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, BookOpen, HelpCircle, Lightbulb, Users, Heart, Eye, DollarSign } from "lucide-react"
import { BlogPostForm } from "@/components/blog-post-form"
import { TipModal } from "@/components/tip-modal"
import { DataService, type BlogPost } from "@/lib/data-service"
import { useAuth } from "@/components/auth-context"
import Image from "next/image"
import { BlogDetailModal } from "@/components/blog-detail-modal"

/**
 * Learn section for knowledge sharing, guides, and FAQs
 * Includes blog posts, tips system, and community contributions
 */
export default function LearnPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [showTipModal, setShowTipModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedPostForDetail, setSelectedPostForDetail] = useState<BlogPost | null>(null)

  const { user } = useAuth()
  const dataService = DataService.getInstance()

  useEffect(() => {
    loadBlogPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [blogPosts, searchTerm, selectedCategory])

  const loadBlogPosts = async (): Promise<void> => {
    setLoading(true)
    try {
      const posts = await dataService.getBlogPosts()
      setBlogPosts(posts)
    } catch (error) {
      console.error("Error loading blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = (): void => {
    let filtered = blogPosts

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredPosts(filtered)
  }

  const handleCreatePost = async (postData: Partial<BlogPost>): Promise<void> => {
    if (!user) return

    try {
      await dataService.createBlogPost({
        ...postData,
        userId: user.id,
        isAdminPost: user.isAdmin,
        tipAmount: 0,
        tipCount: 0,
        likes: 0,
        views: 0,
        status: "published",
      } as Omit<BlogPost, "id" | "createdAt" | "updatedAt">)

      loadBlogPosts()
      setShowForm(false)
    } catch (error) {
      console.error("Error creating blog post:", error)
    }
  }

  const handleTip = async (amount: number, message?: string): Promise<void> => {
    if (!user || !selectedPost) return

    try {
      await dataService.addTip({
        blogPostId: selectedPost.id,
        userId: user.id,
        amount,
        message,
      })

      loadBlogPosts()
      setShowTipModal(false)
      setSelectedPost(null)
    } catch (error) {
      console.error("Error adding tip:", error)
    }
  }

  const getCategoryIcon = (category: string): JSX.Element => {
    switch (category) {
      case "guide":
        return <BookOpen className="w-5 h-5" />
      case "faq":
        return <HelpCircle className="w-5 h-5" />
      case "tip":
        return <Lightbulb className="w-5 h-5" />
      case "experience":
        return <Users className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "guide":
        return "bg-blue-100 text-blue-800"
      case "faq":
        return "bg-green-100 text-green-800"
      case "tip":
        return "bg-amber-100 text-amber-800"
      case "experience":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading knowledge base...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">Learn & Share Knowledge</h1>
          <p className="text-stone-600">Discover farming guides, share experiences, and learn from the community</p>
        </div>
        {user && (
          <Button onClick={() => setShowForm(true)} className="bg-amber-600 hover:bg-amber-700">
            <Plus className="w-4 h-4 mr-2" />
            Share Knowledge
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
          <Input
            placeholder="Search guides, tips, and experiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="guide">Guides</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="tip">Tips</TabsTrigger>
            <TabsTrigger value="experience">Experiences</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(post.category)}
                  <Badge variant="secondary" className={getCategoryColor(post.category)}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </Badge>
                </div>
                {post.isAdminPost && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Official
                  </Badge>
                )}
              </div>
              <CardTitle className="text-green-800 line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              {post.images && post.images.length > 0 && (
                <div className="mb-4">
                  <Image
                    src={post.images[0] || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-stone-600 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views}
                  </div>
                </div>
                <div className="text-xs">{post.createdAt.toLocaleDateString()}</div>
              </div>

              <div className="mt-auto space-y-2">
                {!post.isAdminPost && post.tipAmount > 0 && (
                  <div className="flex items-center justify-between text-sm bg-amber-50 p-2 rounded">
                    <span className="text-amber-700">Tips received:</span>
                    <span className="font-semibold text-amber-800">€{post.tipAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedPostForDetail(post)
                      setShowDetailModal(true)
                    }}
                  >
                    Read More
                  </Button>
                  {user && !post.isAdminPost && user.id !== post.userId && (
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700"
                      onClick={() => {
                        setSelectedPost(post)
                        setShowTipModal(true)
                      }}
                    >
                      <DollarSign className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-stone-600 text-lg">No posts found matching your criteria.</p>
          {user && (
            <Button onClick={() => setShowForm(true)} className="mt-4 bg-green-700 hover:bg-green-800">
              Be the first to share knowledge
            </Button>
          )}
        </div>
      )}

      {showDetailModal && selectedPostForDetail && (
        <BlogDetailModal
          post={selectedPostForDetail}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedPostForDetail(null)
          }}
          onTip={() => {
            setShowDetailModal(false)
            setSelectedPost(selectedPostForDetail)
            setShowTipModal(true)
            setSelectedPostForDetail(null)
          }}
          onLike={() => {
            // Handle like functionality
            console.log("Liked post:", selectedPostForDetail.id)
          }}
          showTipButton={user && !selectedPostForDetail.isAdminPost && user.id !== selectedPostForDetail.userId}
        />
      )}

      {/* Modals */}
      {showForm && <BlogPostForm onClose={() => setShowForm(false)} onSubmit={handleCreatePost} />}

      {showTipModal && selectedPost && (
        <TipModal
          post={selectedPost}
          onClose={() => {
            setShowTipModal(false)
            setSelectedPost(null)
          }}
          onTip={handleTip}
        />
      )}
    </div>
  )
}
