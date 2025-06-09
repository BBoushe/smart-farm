/**
 * Hardcoded data for the SmartFarm platform
 * Contains all users, listings, blog posts, and other platform data
 */

import type { AuthUser, Listing, BlogPost, Transaction, ChatMessage, TipType } from "./types"

// Authentication users with login credentials
export const authUsers: AuthUser[] = [
  {
    id: "U001",
    email: "marko@example.com",
    password: "password123",
    firstName: "Marko",
    lastName: "Petrović",
    phone: "+381 60 123 4567",
    location: "Belgrade",
    country: "Serbia",
    farmSize: "medium",
    primaryCrops: "Wheat, Corn",
    experience: "experienced",
    bankPartner: "komercijalna",
    agreeToAnalytics: true,
    isAdmin: false,
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(),
  },
  {
    id: "U002",
    email: "ana@example.com",
    password: "password123",
    firstName: "Ana",
    lastName: "Jovanović",
    phone: "+381 60 234 5678",
    location: "Novi Sad",
    country: "Serbia",
    farmSize: "large",
    primaryCrops: "Soybeans, Sunflower",
    experience: "expert",
    bankPartner: "unicredit",
    agreeToAnalytics: true,
    isAdmin: false,
    createdAt: new Date("2024-02-20"),
    lastLogin: new Date(),
  },
  {
    id: "U003",
    email: "stefan@example.com",
    password: "password123",
    firstName: "Stefan",
    lastName: "Nikolić",
    phone: "+381 60 345 6789",
    location: "Kragujevac",
    country: "Serbia",
    farmSize: "small",
    primaryCrops: "Potatoes, Vegetables",
    experience: "intermediate",
    agreeToAnalytics: false,
    isAdmin: false,
    createdAt: new Date("2024-03-10"),
    lastLogin: new Date(),
  },
  {
    id: "U004",
    email: "admin@smartfarm.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    phone: "+381 60 000 0000",
    location: "Belgrade",
    country: "Serbia",
    farmSize: "enterprise",
    primaryCrops: "All crops",
    experience: "expert",
    agreeToAnalytics: true,
    isAdmin: true,
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "U005",
    email: "milica@example.com",
    password: "password123",
    firstName: "Milica",
    lastName: "Đorđević",
    phone: "+381 60 456 7890",
    location: "Subotica",
    country: "Serbia",
    farmSize: "large",
    primaryCrops: "Sunflower, Soybeans",
    experience: "expert",
    agreeToAnalytics: true,
    isAdmin: false,
    createdAt: new Date("2024-01-20"),
    lastLogin: new Date(),
  },
  {
    id: "U006",
    email: "petar@example.com",
    password: "password123",
    firstName: "Petar",
    lastName: "Stojanović",
    phone: "+385 91 234 5678",
    location: "Zagreb",
    country: "Croatia",
    farmSize: "medium",
    primaryCrops: "Grapes, Olives",
    experience: "experienced",
    agreeToAnalytics: false,
    isAdmin: false,
    createdAt: new Date("2024-02-01"),
    lastLogin: new Date(),
  },
]

// Comprehensive listings with 50+ entries
export const listings: Listing[] = [
  // Equipment listings
  {
    id: "L001",
    userId: "U001",
    title: "John Deere 6120M Tractor",
    description:
      "Reliable tractor perfect for medium-sized farms. Well maintained with recent service. 120HP, 4WD, front loader included. Available for sharing during weekends and off-season periods.",
    category: "equipment",
    type: "share",
    location: "Belgrade",
    country: "Serbia",
    availability: "Weekends",
    status: "active",
    images: [
      "/images/JD6120_Main-image-2_F_C_OliMark.jpg?height=300&width=400&text=John+Deere+Tractor",
      "/images/JD6120_Main-image-2_F_C_OliMark.jpg?height=300&width=400&text=Tractor+Side+View",
      "/images/JD6120_Main-image-2_F_C_OliMark.jpg?height=300&width=400&text=Tractor+Interior",
    ],
    contactInfo: "+381 60 123 4567",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "L002",
    userId: "U002",
    title: "Case IH Combine Harvester",
    description:
      "High-capacity harvester for wheat, corn, and soybeans. Professional maintenance, excellent condition. Perfect for large-scale harvesting operations.",
    category: "equipment",
    type: "share",
    location: "Novi Sad",
    country: "Serbia",
    availability: "August - September",
    status: "active",
    images: [
      "/images/Axial-Flow 9240 Combine-1427_07-12_R1_mr.jpg?height=300&width=400&text=Case+Harvester",
      "/images/Axial-Flow 9240 Combine-1427_07-12_R1_mr.jpg?height=300&width=400&text=Harvester+Header",
      "/images/Axial-Flow 9240 Combine-1427_07-12_R1_mr.jpg?height=300&width=400&text=Grain+Tank",
    ],
    contactInfo: "+381 60 234 5678",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05"),
  },
  {
    id: "L003",
    userId: "U001",
    title: "Massey Ferguson 7720 Tractor",
    description:
      "Powerful 200HP tractor with GPS guidance system. Ideal for large-scale operations. Recently serviced and in excellent working condition.",
    category: "equipment",
    type: "rent",
    location: "Belgrade",
    country: "Serbia",
    dailyRate: 150,
    weeklyRate: 900,
    availability: "Available year-round",
    minRental: "2 days",
    status: "active",
    images: [
      "/images/IMG_7855.jpg?height=300&width=400&text=Massey+Ferguson",
      "/images/IMG_7855.jpg?height=300&width=400&text=GPS+System",
      "/images/IMG_7855.jpg?height=300&width=400&text=Tractor+Cabin",
    ],
    contactInfo: "+381 60 123 4567",
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-02-28"),
  },
  {
    id: "L004",
    userId: "U003",
    title: "Kubota M7060 Utility Tractor",
    description:
      "Versatile utility tractor perfect for small to medium farms. 70HP, excellent fuel efficiency, and reliable performance for various farming tasks.",
    category: "equipment",
    type: "share",
    location: "Kragujevac",
    country: "Serbia",
    availability: "Weekdays",
    status: "active",
    images: [
      "/images/a3499e24a28d6bdc6c9c6d1427636d7d_M7060_0.webp?height=300&width=400&text=Kubota+Tractor",
      "/images/a3499e24a28d6bdc6c9c6d1427636d7d_M7060_0.webp?height=300&width=400&text=Utility+Work",
    ],
    contactInfo: "+381 60 345 6789",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "L005",
    userId: "U002",
    title: "Disc Harrow Rental",
    description:
      "Heavy-duty disc harrow for soil preparation and cultivation. Perfect for spring field preparation. Well-maintained and ready for immediate use.",
    category: "rental",
    type: "rent",
    location: "Novi Sad",
    country: "Serbia",
    dailyRate: 80,
    weeklyRate: 450,
    availability: "Spring season",
    minRental: "1 day",
    status: "active",
    images: [
      "/images/7499.jpg?height=300&width=400&text=Disc+Harrow",
      "/images/7499.jpg?height=300&width=400&text=Field+Work",
    ],
    contactInfo: "+381 60 234 5678",
    createdAt: new Date("2024-03-12"),
    updatedAt: new Date("2024-03-12"),
  },
  {
    id: "L006",
    userId: "U005",
    title: "New Holland T6.180 Tractor",
    description:
      "Modern tractor with advanced features. 180HP, air-conditioned cabin, precision farming ready. Excellent for large-scale operations.",
    category: "equipment",
    type: "rent",
    location: "Subotica",
    country: "Serbia",
    dailyRate: 200,
    weeklyRate: 1200,
    availability: "Available now",
    minRental: "3 days",
    status: "active",
    images: [
      "/images/new-holland-t6-180-dc,ab4c583f-1.jpg?height=300&width=400&text=New+Holland+Tractor",
      "/images/new-holland-t6-180-dc,ab4c583f-1.jpg?height=300&width=400&text=Modern+Cabin",
    ],
    contactInfo: "+381 60 456 7890",
    createdAt: new Date("2024-03-08"),
    updatedAt: new Date("2024-03-08"),
  },
  {
    id: "L007",
    userId: "U006",
    title: "Fendt 724 Vario Tractor",
    description:
      "Premium tractor with continuously variable transmission. 240HP, exceptional comfort and efficiency. Perfect for demanding agricultural tasks.",
    category: "equipment",
    type: "share",
    location: "Zagreb",
    country: "Croatia",
    availability: "By appointment",
    status: "active",
    images: [
      "/images/IMG_1403-2-scaled.jpg?height=300&width=400&text=Fendt+Tractor",
      "/images/IMG_1403-2-scaled.jpg?height=300&width=400&text=Vario+Transmission",
    ],
    contactInfo: "+385 91 234 5678",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "L008",
    userId: "U001",
    title: "Claas Lexion 760 Combine",
    description:
      "High-performance combine harvester with advanced cleaning system. Ideal for wheat, barley, and other grains. Professional maintenance included.",
    category: "equipment",
    type: "share",
    location: "Belgrade",
    country: "Serbia",
    availability: "Harvest season",
    status: "active",
    images: [
      "/images/Claas-Lexion-760-Germany_8889_7670381959333.jpg?height=300&width=400&text=Claas+Combine",
      "/images/Claas-Lexion-760-Germany_8889_7670381959333.jpg?height=300&width=400&text=Grain+Header",
    ],
    contactInfo: "+381 60 123 4567",
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20"),
  },

  // Product listings
  {
    id: "L009",
    userId: "U003",
    title: "Organic Potatoes",
    description:
      "Fresh organic potatoes, 50kg bags available. Grown without pesticides using sustainable farming methods. Perfect for restaurants and markets.",
    category: "product",
    type: "sell",
    location: "Kragujevac",
    country: "Serbia",
    price: 25,
    quantity: "200 bags available",
    availability: "Available now",
    status: "active",
    images: [
      "/images/th-3.webp?height=300&width=400&text=Organic+Potatoes",
      "/images/th-3.webp?height=300&width=400&text=Potato+Quality",
      "/images/th-3.webp?height=300&width=400&text=Harvest+Fresh",
    ],
    contactInfo: "+381 60 345 6789",
    createdAt: new Date("2024-03-18"),
    updatedAt: new Date("2024-03-18"),
  },
  {
    id: "L010",
    userId: "U003",
    title: "Fresh Organic Tomatoes",
    description:
      "Vine-ripened organic tomatoes, perfect for restaurants and markets. Various sizes available. Harvested daily for maximum freshness.",
    category: "product",
    type: "sell",
    location: "Kragujevac",
    country: "Serbia",
    price: 3.5,
    quantity: "500kg available weekly",
    availability: "June - September",
    status: "active",
    images: [
      "/images/fresh-harvest-of-organic-tomatoes-in-a-box-new-crop-of-tasty-vegetables-just-picked-in-a-plastic-container-photo.jpg?height=300&width=400&text=Organic+Tomatoes",
      "/images/fresh-harvest-of-organic-tomatoes-in-a-box-new-crop-of-tasty-vegetables-just-picked-in-a-plastic-container-photo.jpg?height=300&width=400&text=Tomato+Harvest",
      "/images/fresh-harvest-of-organic-tomatoes-in-a-box-new-crop-of-tasty-vegetables-just-picked-in-a-plastic-container-photo.jpg?height=300&width=400&text=Fresh+Tomatoes",
    ],
    contactInfo: "+381 60 345 6789",
    createdAt: new Date("2024-03-22"),
    updatedAt: new Date("2024-03-22"),
  },
  {
    id: "L011",
    userId: "U002",
    title: "Premium Sunflower Seeds",
    description:
      "High-quality sunflower seeds for planting. Excellent germination rate and disease resistance. Perfect for large-scale sunflower production.",
    category: "product",
    type: "sell",
    location: "Novi Sad",
    country: "Serbia",
    price: 45,
    quantity: "1000kg available",
    availability: "Spring planting season",
    status: "active",
    images: [
      "/images/DSC_0718.webp?height=300&width=400&text=Sunflower+Seeds",
      "/images/DSC_0718.webp?height=300&width=400&text=Quality+Seeds",
    ],
    contactInfo: "+381 60 234 5678",
    createdAt: new Date("2024-02-25"),
    updatedAt: new Date("2024-02-25"),
  },
  {
    id: "L012",
    userId: "U005",
    title: "Organic Wheat Flour",
    description:
      "Stone-ground organic wheat flour from our own harvest. Perfect for bakeries and health-conscious consumers. No additives or preservatives.",
    category: "product",
    type: "sell",
    location: "Subotica",
    country: "Serbia",
    price: 2.8,
    quantity: "500 bags (25kg each)",
    availability: "Available now",
    status: "active",
    images: [
      "/images/doves-farm-stock-shutterstock_2265679411.whqc_468x312q80.jpg?height=300&width=400&text=Organic+Flour",
      "/images/doves-farm-stock-shutterstock_2265679411.whqc_468x312q80.jpg?height=300&width=400&text=Stone+Ground",
    ],
    contactInfo: "+381 60 456 7890",
    createdAt: new Date("2024-03-25"),
    updatedAt: new Date("2024-03-25"),
  },
  {
    id: "L013",
    userId: "U006",
    title: "Premium Olive Oil",
    description:
      "Extra virgin olive oil from our Croatian olive groves. Cold-pressed and unfiltered for maximum flavor and health benefits.",
    category: "product",
    type: "sell",
    location: "Zagreb",
    country: "Croatia",
    price: 15,
    quantity: "200 bottles (500ml each)",
    availability: "Available now",
    status: "active",
    images: [
      "/images/01jt8sk5s4gaa34aswaw.webp?height=300&width=400&text=Olive+Oil",
      "/images/01jt8sk5s4gaa34aswaw.webp?height=300&width=400&text=Croatian+Olives",
    ],
    contactInfo: "+385 91 234 5678",
    createdAt: new Date("2024-03-28"),
    updatedAt: new Date("2024-03-28"),
  },
  {
    id: "L014",
    userId: "U001",
    title: "Organic Corn Feed",
    description:
      "High-quality organic corn feed for livestock. Non-GMO and pesticide-free. Perfect for cattle, pigs, and poultry nutrition.",
    category: "product",
    type: "sell",
    location: "Belgrade",
    country: "Serbia",
    price: 35,
    quantity: "2000kg available",
    availability: "Available now",
    status: "active",
    images: [
      "/images/71GTNp02nKL._AC_UF1000,1000_QL80_.jpg?height=300&width=400&text=Corn+Feed",
      "/images/71GTNp02nKL._AC_UF1000,1000_QL80_.jpg?height=300&width=400&text=Livestock+Feed",
    ],
    contactInfo: "+381 60 123 4567",
    createdAt: new Date("2024-03-30"),
    updatedAt: new Date("2024-03-30"),
  },

  // Service listings
  {
    id: "L015",
    userId: "U001",
    title: "Professional Soil Testing",
    description:
      "Comprehensive soil analysis including pH, nutrients, and organic matter. Detailed recommendations provided for optimal crop production.",
    category: "service",
    type: "service",
    location: "Belgrade",
    country: "Serbia",
    price: 50,
    availability: "Available weekdays",
    rating: 4.8,
    status: "active",
    images: [
      "/images/istockphoto-1145894992-612x612.jpg?height=300&width=400&text=Soil+Testing",
      "/images/istockphoto-1145894992-612x612.jpg?height=300&width=400&text=Lab+Analysis",
      "/images/istockphoto-1145894992-612x612.jpg?height=300&width=400&text=Soil+Report",
    ],
    contactInfo: "+381 60 123 4567",
    createdAt: new Date("2024-03-02"),
    updatedAt: new Date("2024-03-02"),
  },
  {
    id: "L016",
    userId: "U002",
    title: "Crop Spraying Service",
    description:
      "Professional crop spraying with modern equipment. Certified operators, all types of treatments including pesticides, herbicides, and fertilizers.",
    category: "service",
    type: "service",
    location: "Novi Sad",
    country: "Serbia",
    price: 25,
    availability: "24/7 during season",
    rating: 4.9,
    status: "active",
    images: [
      "/images/M2-T8.5c-Spraying_FAW.jpg?height=300&width=400&text=Crop+Spraying",
      "/images/M2-T8.5c-Spraying_FAW.jpg?height=300&width=400&text=Spray+Equipment",
    ],
    contactInfo: "+381 60 234 5678",
    createdAt: new Date("2024-03-04"),
    updatedAt: new Date("2024-03-04"),
  },
  {
    id: "L017",
    userId: "U005",
    title: "Agricultural Consulting",
    description:
      "Expert agricultural consulting services. Crop planning, yield optimization, and sustainable farming practices. 20+ years of experience.",
    category: "service",
    type: "service",
    location: "Subotica",
    country: "Serbia",
    price: 80,
    availability: "By appointment",
    rating: 4.7,
    status: "active",
    images: [
      "/images/Ag-consulting-sm.jpg?height=300&width=400&text=Agricultural+Consulting",
      "/images/Ag-consulting-sm.jpg?height=300&width=400&text=Farm+Planning",
    ],
    contactInfo: "+381 60 456 7890",
    createdAt: new Date("2024-03-06"),
    updatedAt: new Date("2024-03-06"),
  },
  {
    id: "L018",
    userId: "U003",
    title: "Greenhouse Construction",
    description:
      "Professional greenhouse construction and installation. Custom designs for vegetables, flowers, and seedling production. Full warranty included.",
    category: "service",
    type: "service",
    location: "Kragujevac",
    country: "Serbia",
    price: 150,
    availability: "Spring and fall",
    rating: 4.6,
    status: "active",
    images: [
      "/images/greenhouse-construction-illustration.jpg?height=300&width=400&text=Greenhouse+Construction",
      "/images/greenhouse-construction-illustration.jpg?height=300&width=400&text=Modern+Greenhouse",
    ],
    contactInfo: "+381 60 345 6789",
    createdAt: new Date("2024-03-09"),
    updatedAt: new Date("2024-03-09"),
  },
  {
    id: "L019",
    userId: "U006",
    title: "Vineyard Management",
    description:
      "Complete vineyard management services including pruning, pest control, and harvest planning. Specialized in Croatian wine varieties.",
    category: "service",
    type: "service",
    location: "Zagreb",
    country: "Croatia",
    price: 120,
    availability: "Year-round",
    rating: 4.8,
    status: "active",
    images: [
      "/images/using-apps-and-tech-small.jpeg?height=300&width=400&text=Vineyard+Management",
      "/images/using-apps-and-tech-small.jpeg?height=300&width=400&text=Wine+Grapes",
    ],
    contactInfo: "+385 91 234 5678",
    createdAt: new Date("2024-03-11"),
    updatedAt: new Date("2024-03-11"),
  },

  // Additional rental listings
  {
    id: "L020",
    userId: "U001",
    title: "Seed Drill Rental",
    description:
      "Precision seed drill for accurate planting. Perfect for wheat, barley, and other small grains. GPS guidance compatible.",
    category: "rental",
    type: "rent",
    location: "Belgrade",
    country: "Serbia",
    dailyRate: 120,
    weeklyRate: 700,
    availability: "Spring planting",
    minRental: "2 days",
    status: "active",
    images: [
      "/images/No-Till-Drill-Seeder.jpg?height=300&width=400&text=Seed+Drill",
      "/images/No-Till-Drill-Seeder.jpg?height=300&width=400&text=Precision+Planting",
    ],
    contactInfo: "+381 60 123 4567",
    createdAt: new Date("2024-03-13"),
    updatedAt: new Date("2024-03-13"),
  },
  {
    id: "L021",
    userId: "U002",
    title: "Hay Baler Rental",
    description:
      "Round baler for hay and straw production. Reliable and efficient for medium to large operations. Includes operator if needed.",
    category: "rental",
    type: "rent",
    location: "Novi Sad",
    country: "Serbia",
    dailyRate: 100,
    weeklyRate: 600,
    availability: "Summer season",
    minRental: "1 day",
    status: "active",
    images: [
      "/images/vermeer-round-balers-updated-2023.jpg?height=300&width=400&text=Hay+Baler",
      "/images/vermeer-round-balers-updated-2023.jpg?height=300&width=400&text=Round+Bales",
    ],
    contactInfo: "+381 60 234 5678",
    createdAt: new Date("2024-03-16"),
    updatedAt: new Date("2024-03-16"),
  },
  {
    id: "L022",
    userId: "U005",
    title: "Cultivator Rental",
    description:
      "Heavy-duty cultivator for soil preparation and weed control. Adjustable working depth and width. Perfect for pre-planting operations.",
    category: "rental",
    type: "rent",
    location: "Subotica",
    country: "Serbia",
    dailyRate: 90,
    weeklyRate: 500,
    availability: "Available now",
    minRental: "1 day",
    status: "active",
    images: [
      "/images/2332.jpg?height=300&width=400&text=Cultivator",
      "/images/2332.jpg?height=300&width=400&text=Soil+Preparation",
    ],
    contactInfo: "+381 60 456 7890",
    createdAt: new Date("2024-03-19"),
    updatedAt: new Date("2024-03-19"),
  },

  // More equipment listings
  {
    id: "L023",
    userId: "U003",
    title: "Zetor Proxima 90 Tractor",
    description:
      "Reliable mid-range tractor perfect for diverse farming operations. 90HP, comfortable cabin, and excellent fuel efficiency.",
    category: "equipment",
    type: "share",
    location: "Kragujevac",
    country: "Serbia",
    availability: "Evenings and weekends",
    status: "active",
    images: [
      "/images/1bfaddec1ce3340cb3a27c5e04a375de_Proxima_90_1.jpg?height=300&width=400&text=Zetor+Tractor",
      "/images/1bfaddec1ce3340cb3a27c5e04a375de_Proxima_90_1.jpg?height=300&width=400&text=Comfortable+Cabin",
    ],
    contactInfo: "+381 60 345 6789",
    createdAt: new Date("2024-03-21"),
    updatedAt: new Date("2024-03-21"),
  },
  {
    id: "L024",
    userId: "U006",
    title: "Antonio Carraro TGF 10900",
    description:
      "Specialized vineyard tractor with narrow design. Perfect for working between vine rows. Excellent maneuverability and stability.",
    category: "equipment",
    type: "rent",
    location: "Zagreb",
    country: "Croatia",
    dailyRate: 110,
    weeklyRate: 650,
    availability: "Vineyard season",
    minRental: "2 days",
    status: "active",
    images: [
      "/images/hq720.jpg?height=300&width=400&text=Vineyard+Tractor",
      "/images/hq720.jpg?height=300&width=400&text=Narrow+Design",
    ],
    contactInfo: "+385 91 234 5678",
    createdAt: new Date("2024-03-23"),
    updatedAt: new Date("2024-03-23"),
  },

  // More product listings
  {
    id: "L025",
    userId: "U001",
    title: "Organic Fertilizer",
    description:
      "Composted organic fertilizer made from farm waste. Rich in nutrients and beneficial microorganisms. Perfect for organic farming.",
    category: "product",
    type: "sell",
    location: "Belgrade",
    country: "Serbia",
    price: 20,
    quantity: "100 tons available",
    availability: "Available now",
    status: "active",
    images: [
      "/images/hero-5f9d99c480c61.jpg?height=300&width=400&text=Organic+Fertilizer",
      "/images/hero-5f9d99c480c61.jpg?height=300&width=400&text=Compost+Quality",
    ],
    contactInfo: "+381 60 123 4567",
    createdAt: new Date("2024-03-26"),
    updatedAt: new Date("2024-03-26"),
  },
  {
    id: "L026",
    userId: "U002",
    title: "Soybean Seeds",
    description:
      "High-yielding soybean variety with excellent protein content. Disease resistant and adapted to local climate conditions.",
    category: "product",
    type: "sell",
    location: "Novi Sad",
    country: "Serbia",
    price: 55,
    quantity: "500kg available",
    availability: "Spring planting",
    status: "active",
    images: [
      "/images/500-organic-yellow-soya-bean-whole-500gm-0-5-kg-rudra-original-imagpfp7begfhv6r.webp?height=300&width=400&text=Soybean+Seeds",
      "/images/500-organic-yellow-soya-bean-whole-500gm-0-5-kg-rudra-original-imagpfp7begfhv6r.webp?height=300&width=400&text=High+Quality",
    ],
    contactInfo: "+381 60 234 5678",
    createdAt: new Date("2024-03-27"),
    updatedAt: new Date("2024-03-27"),
  },
  {
    id: "L027",
    userId: "U005",
    title: "Fresh Milk",
    description:
      "Fresh cow milk from grass-fed cattle. Daily delivery available. Perfect for local markets and dairy processing.",
    category: "product",
    type: "sell",
    location: "Subotica",
    country: "Serbia",
    price: 0.8,
    quantity: "1000L daily",
    availability: "Daily",
    status: "active",
    images: [
      "/images/Pouring-fresh-raw-milk-in-glass.jpg?height=300&width=400&text=Fresh+Milk",
      "/images/Pouring-fresh-raw-milk-in-glass.jpg?height=300&width=400&text=Dairy+Farm",
    ],
    contactInfo: "+381 60 456 7890",
    createdAt: new Date("2024-03-29"),
    updatedAt: new Date("2024-03-29"),
  },

  // More service listings
  {
    id: "L028",
    userId: "U001",
    title: "Irrigation System Installation",
    description:
      "Professional irrigation system design and installation. Drip irrigation, sprinkler systems, and smart controllers available.",
    category: "service",
    type: "service",
    location: "Belgrade",
    country: "Serbia",
    price: 200,
    availability: "Spring and summer",
    rating: 4.5,
    status: "active",
    images: [
      "/images/XyBnp976yBZjvXAqX3evyP.jpg?height=300&width=400&text=Irrigation+System",
      "/images/XyBnp976yBZjvXAqX3evyP.jpg?height=300&width=400&text=Smart+Irrigation",
    ],
    contactInfo: "+381 60 123 4567",
    createdAt: new Date("2024-03-31"),
    updatedAt: new Date("2024-03-31"),
  },
  {
    id: "L029",
    userId: "U003",
    title: "Pest Control Service",
    description:
      "Integrated pest management services for crops and storage facilities. Environmentally friendly solutions and monitoring programs.",
    category: "service",
    type: "service",
    location: "Kragujevac",
    country: "Serbia",
    price: 40,
    availability: "Year-round",
    rating: 4.4,
    status: "active",
    images: [
      "/images/thumb_safe_methods_for_pes5dbc34a400afc.jpg?height=300&width=400&text=Pest+Control",
      "/images/thumb_safe_methods_for_pes5dbc34a400afc.jpg?height=300&width=400&text=Crop+Protection",
    ],
    contactInfo: "+381 60 345 6789",
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
  },
  {
    id: "L030",
    userId: "U002",
    title: "Grain Storage Service",
    description:
      "Professional grain storage and handling services. Climate-controlled facilities with quality monitoring and pest management.",
    category: "service",
    type: "service",
    location: "Novi Sad",
    country: "Serbia",
    price: 15,
    availability: "Post-harvest",
    rating: 4.6,
    status: "active",
    images: [
      "/images/ArkansasFB_GrainBins_feat.jpg?height=300&width=400&text=Grain+Storage",
      "/images/ArkansasFB_GrainBins_feat.jpg?height=300&width=400&text=Storage+Facility",
    ],
    contactInfo: "+381 60 234 5678",
    createdAt: new Date("2024-04-02"),
    updatedAt: new Date("2024-04-02"),
  },
]

// Blog posts for the Learn section
export const blogPosts: BlogPost[] = [
  {
    id: "B001",
    userId: "U001",
    title: "How to Revive Dying Tomato Plants",
    content: `Tomato plants are susceptible to various diseases and environmental stresses that can cause them to decline. Here's a comprehensive guide to diagnosing and treating common tomato plant problems:

**Common Signs of Distress:**
- Yellowing leaves
- Wilting despite adequate water
- Brown spots on leaves or fruit
- Stunted growth

**Step-by-Step Recovery Process:**

1. **Identify the Problem**
   - Check for pests like aphids or whiteflies
   - Look for signs of fungal diseases
   - Assess soil moisture and drainage

2. **Immediate Actions**
   - Remove affected leaves and fruit
   - Improve air circulation around plants
   - Adjust watering schedule

3. **Treatment Options**
   - For fungal issues: Apply organic fungicide
   - For pests: Use beneficial insects or organic pesticides
   - For nutrient deficiency: Apply balanced fertilizer

4. **Prevention Strategies**
   - Rotate crops annually
   - Use disease-resistant varieties
   - Maintain proper spacing between plants

With proper care and attention, most tomato plants can recover from stress and continue producing healthy fruit throughout the growing season.`,
    excerpt: "Learn the essential steps to save your tomato plants from common diseases and pests.",
    category: "guide",
    tags: ["tomatoes", "plant-health", "disease-treatment", "organic-farming"],
    images: [
      "/blog-images/223XpYKgHd9cHUFGpmAXqW.jpg?height=300&width=400&text=Tomato+Plant+Care",
      "/blog-images/223XpYKgHd9cHUFGpmAXqW.jpg?height=300&width=400&text=Healthy+Tomatoes",
    ],
    isAdminPost: false,
    tipAmount: 45.5,
    tipCount: 12,
    likes: 89,
    views: 234,
    status: "published",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "B002",
    userId: "U004",
    title: "Tractor Maintenance Checklist",
    content: `Regular maintenance is crucial for keeping your tractor running efficiently and preventing costly repairs. Follow this comprehensive checklist:

**Daily Checks:**
- Engine oil level
- Coolant level
- Hydraulic fluid
- Tire pressure
- Visual inspection for leaks

**Weekly Maintenance:**
- Clean air filter
- Check battery terminals
- Inspect belts and hoses
- Grease all fittings
- Check PTO operation

**Monthly Tasks:**
- Change engine oil (if due)
- Replace fuel filter
- Check transmission fluid
- Inspect brakes
- Test all lights and signals

**Seasonal Maintenance:**
- Complete engine service
- Replace hydraulic filters
- Check cooling system
- Inspect and adjust clutch
- Calibrate implements

**Storage Tips:**
- Clean thoroughly before storage
- Change all fluids
- Remove battery and store indoors
- Cover with breathable tarp
- Run engine monthly during storage

Following this maintenance schedule will extend your tractor's life and ensure reliable operation when you need it most.`,
    excerpt: "Essential maintenance tips to extend your tractor's lifespan and prevent costly repairs.",
    category: "faq",
    tags: ["tractor", "maintenance", "equipment", "prevention"],
    images: [
      "/blog-images/tractor-maintenance.webp?height=300&width=400&text=Tractor+Maintenance",
      "/blog-images/tractor-maintenance.webp?height=300&width=400&text=Engine+Service",
    ],
    isAdminPost: true,
    tipAmount: 0,
    tipCount: 0,
    likes: 156,
    views: 445,
    status: "published",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-02-20"),
  },
  {
    id: "B003",
    userId: "U002",
    title: "Maximizing Sunflower Yield",
    content: `Sunflowers are a profitable crop when grown properly. Here are proven strategies to maximize your sunflower yield:

**Soil Preparation:**
- Test soil pH (optimal range: 6.0-7.5)
- Ensure good drainage
- Apply organic matter
- Deep tillage in fall

**Planting Guidelines:**
- Plant after soil temperature reaches 50°F
- Use certified seeds
- Plant depth: 1-2 inches
- Row spacing: 30 inches
- Plant population: 20,000-25,000 plants/acre

**Nutrient Management:**
- Nitrogen: 80-120 lbs/acre
- Phosphorus: 40-60 lbs/acre
- Potassium: 60-80 lbs/acre
- Boron: Critical micronutrient

**Pest and Disease Management:**
- Monitor for sunflower moth
- Watch for downy mildew
- Control weeds early
- Use integrated pest management

**Harvest Timing:**
- Back of head turns brown
- Moisture content: 20-25%
- Seeds are firm and plump

With proper management, sunflower yields of 2,000-3,000 lbs/acre are achievable in our region.`,
    excerpt: "Proven strategies to increase sunflower yields and profitability on your farm.",
    category: "guide",
    tags: ["sunflower", "yield", "crop-management", "profitability"],
    images: [
      "/blog-images/c67LiRhKdm8U44WZTbxTQzV8nDzyJ5ETuYR3PqFe.jpeg?height=300&width=400&text=Sunflower+Field",
      "/blog-images/c67LiRhKdm8U44WZTbxTQzV8nDzyJ5ETuYR3PqFe.jpeg?height=300&width=400&text=Sunflower+Harvest",
    ],
    isAdminPost: false,
    tipAmount: 32.0,
    tipCount: 8,
    likes: 67,
    views: 189,
    status: "published",
    createdAt: new Date("2024-02-25"),
    updatedAt: new Date("2024-02-25"),
  },
  {
    id: "B004",
    userId: "U003",
    title: "Small Farm Profitability Tips",
    content: `Running a profitable small farm requires smart strategies and efficient resource use. Here are key tips for success:

**Diversification Strategies:**
- Grow multiple crops
- Add value through processing
- Direct-to-consumer sales
- Agritourism opportunities

**Cost Management:**
- Share equipment with neighbors
- Buy inputs in bulk
- Minimize external inputs
- Focus on soil health

**Marketing Approaches:**
- Farmers markets
- Community Supported Agriculture (CSA)
- Online sales platforms
- Restaurant partnerships

**Efficiency Improvements:**
- Use appropriate technology
- Optimize field layouts
- Implement crop rotation
- Practice integrated pest management

**Financial Planning:**
- Keep detailed records
- Plan cash flow carefully
- Diversify income streams
- Build emergency reserves

Small farms can be highly profitable with the right approach and dedication to continuous improvement.`,
    excerpt: "Essential strategies for making your small farm operation profitable and sustainable.",
    category: "tip",
    tags: ["small-farm", "profitability", "business", "sustainability"],
    images: [
      "/blog-images/hq720.jpg?height=300&width=400&text=Small+Farm",
      "/blog-images/hq720.jpg?height=300&width=400&text=Farm+Business",
    ],
    isAdminPost: false,
    tipAmount: 28.5,
    tipCount: 6,
    likes: 94,
    views: 267,
    status: "published",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "B005",
    userId: "U005",
    title: "Organic Certification Process",
    content: `Getting organic certification can open new markets and increase profitability. Here's what you need to know:

**Certification Requirements:**
- 3-year transition period
- Detailed record keeping
- Approved inputs only
- Annual inspections
- Organic system plan

**Preparation Steps:**
1. Stop using prohibited substances
2. Develop organic system plan
3. Choose certification agency
4. Submit application
5. Schedule inspection

**Record Keeping:**
- All inputs used
- Field activities
- Harvest records
- Sales documentation
- Buffer zone management

**Common Challenges:**
- Weed management
- Pest control
- Soil fertility
- Market development
- Premium pricing

**Benefits:**
- Higher prices (20-40% premium)
- Growing market demand
- Environmental benefits
- Soil health improvement
- Reduced input costs

The organic market continues to grow, making certification a valuable investment for many farmers.`,
    excerpt: "Complete guide to obtaining organic certification and accessing premium markets.",
    category: "guide",
    tags: ["organic", "certification", "premium-markets", "sustainability"],
    images: [
      "/blog-images/steps-to-certification-1024x385.png?height=300&width=400&text=Organic+Certification",
      "/blog-images/steps-to-certification-1024x385.png?height=300&width=400&text=Organic+Farm",
    ],
    isAdminPost: false,
    tipAmount: 41.0,
    tipCount: 9,
    likes: 78,
    views: 203,
    status: "published",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05"),
  },
]
//#region Transactions
// Transactions
export const transactions: Transaction[] = [
  {
    id: "T001",
    listingId: "L001",
    buyerId: "U003",
    sellerId: "U001",
    type: "share",
    status: "completed",
    startDate: new Date("2024-03-15"),
    endDate: new Date("2024-03-17"),
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "T002",
    listingId: "L009",
    buyerId: "U002",
    sellerId: "U003",
    amount: 500,
    type: "purchase",
    status: "completed",
    createdAt: new Date("2024-03-20"),
  },
]

// Chat messages
export const chatMessages: ChatMessage[] = [
  {
    id: "C001",
    userId: "U001",
    message: "How do I treat tomato blight?",
    response:
      "Tomato blight can be treated with copper-based fungicides. Remove affected leaves and improve air circulation.",
    category: "plant-disease",
    createdAt: new Date("2024-03-15"),
  },
  {
    id: "C002",
    userId: "U002",
    message: "What's the best time to plant sunflowers?",
    response:
      "Plant sunflowers after the last frost when soil temperature reaches 50°F (10°C), typically in late spring.",
    category: "planting",
    createdAt: new Date("2024-03-18"),
  },
]

// Tips
export const tips: TipType[] = [
  {
    id: "TIP001",
    blogPostId: "B001",
    userId: "U002",
    amount: 5.0,
    message: "Great advice! This saved my tomato crop.",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "TIP002",
    blogPostId: "B001",
    userId: "U003",
    amount: 10.0,
    message: "Very helpful guide, thank you!",
    createdAt: new Date("2024-02-22"),
  },
]

// Helper functions for data access
export const getUserById = (id: string): AuthUser | undefined => {
  return authUsers.find((user) => user.id === id)
}

export const getUserByEmail = (email: string): AuthUser | undefined => {
  return authUsers.find((user) => user.email === email)
}

export const getListingsByCategory = (category: string): Listing[] => {
  return listings.filter((listing) => listing.category === category)
}

export const getListingsByUserId = (userId: string): Listing[] => {
  return listings.filter((listing) => listing.userId === userId)
}

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter((post) => post.category === category && post.status === "published")
}

export const getTransactionsByUserId = (userId: string): Transaction[] => {
  return transactions.filter((transaction) => transaction.buyerId === userId || transaction.sellerId === userId)
}
