// Mock data for Amazon Fashion page
export const fashionCategories = [
  { name: "Women", active: true, href: "/fashion/women" },
  { name: "Men", active: false, href: "/fashion/men" },
  { name: "Kids", active: false, href: "/fashion/kids" },
  { name: "Bags & Luggage", active: false, href: "/fashion/bags-luggage" },
  { name: "Sportswear", active: false, href: "/fashion/sporting-apparel" },
  { name: "Sales & Deals", active: false, href: "/fashion/deals" },
  { name: "Jewellery", active: false, href: "/fashion/jewelry-accessories" },
  { name: "Watches", active: false, href: "/fashion/women-watches" },
  { name: "Handbags", active: false, href: "/fashion/women-handbags" }
];

export const offerCards = [
  {
    title: "Flat 10% off with HDFC Cards",
    icon: "💳",
    bank: "HDFC"
  },
  {
    title: "No Cost EMI on Fashion",
    icon: "💰",
    bank: "All Banks"
  },
  {
    title: "Upto ₹500 off on Zomato",
    icon: "🍕",
    bank: "Zomato"
  },
  {
    title: "Flat ₹200 Amazon Pay cashback",
    icon: "💸",
    bank: "Amazon Pay"
  },
  {
    title: "10% cashback up to ₹100",
    icon: "🏦",
    bank: "ICICI"
  }
];

export const heroSlides = [
  {
    image: "https://tse3.mm.bing.net/th/id/OIP.mxXv3LUHnZNXRjTKTfV5QwHaEO?w=1006&h=575&rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Under ₹699",
    subtitle: "Bags & backpacks",
    cta: "Shop now"
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=320&fit=crop",
    title: "Summer Sale",
    subtitle: "Upto 50% off",
    cta: "Explore"
  }
];

export const premiumEdits = [
  { name: "Chrome Yellow", color: "#FFD700", images: ["toy1.jpg", "toy2.jpg"] },
  { name: "Aqua Rush", color: "#00BFFF", images: ["toy3.jpg", "toy4.jpg"] },
  { name: "Matcha Milk", color: "#90EE90", images: ["toy5.jpg", "toy6.jpg"] },
  { name: "Pink Pink", color: "#FFC0CB", images: ["toy7.jpg", "toy8.jpg"] },
  { name: "Cloud White", color: "#F5F5F5", images: ["toy9.jpg", "toy10.jpg"] },
  { name: "Back to Black", color: "#000000", images: ["toy11.jpg", "toy12.jpg"] },
  { name: "Mocha Glow", color: "#8B4513", images: ["toy13.jpg", "toy14.jpg"] }
];

export const nikeBestSellers = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    title: "Nike Air Zoom Pegasus 40",
    rating: 4.7,
    price: "₹9,995"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1543275829-c9f4938b4df7?w=200&h=200&fit=crop",
    title: "Nike Metcon 9 Training Shoe",
    rating: 4.6,
    price: "₹11,495"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1541781774458-6d99b287793e?w=200&h=200&fit=crop",
    title: "Nike Pro Dri-FIT T-Shirt",
    rating: 4.5,
    price: "₹1,799"
  }
];

export const topBrandDeals = [
  {
    name: "Liberty",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=150&fit=crop",
    offer: "Under ₹499"
  },
  {
    name: "Zivame",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=150&fit=crop",
    offer: "Under ₹999"
  },
  {
    name: "Lavie",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=150&fit=crop",
    offer: "Starting ₹199"
  },
  {
    name: "Lakme",
    image: "https://images.unsplash.com/photo-1592362694907-0f4f330c52c7?w=300&h=150&fit=crop",
    offer: "Under ₹299"
  },
  {
    name: "Allen Solly",
    image: "https://images.unsplash.com/photo-1520975952826-f4773f3edafa?w=300&h=150&fit=crop",
    offer: "20% off"
  },
  {
    name: "Voylla",
    image: "https://images.unsplash.com/photo-1558618047-3c8c98bd6c29?w=300&h=150&fit=crop",
    offer: "Buy 1 Get 1"
  }
];

export const fashionProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1483985988355-763728e01a71?w=250&h=250&fit=crop",
    title: "Women's Floral Maxi Dress",
    rating: 4.2,
    reviews: 320,
    price: 799,
    originalPrice: 1299,
    discount: 38,
    brand: "Zivame"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=250&h=250&fit=crop",
    title: "Casual Denim Jacket",
    rating: 4.5,
    reviews: 456,
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    brand: "Allen Solly"
  },
  // Add more 20+ products...
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=250&h=250&fit=crop",
    title: "Laptop Backpack",
    rating: 4.4,
    reviews: 789,
    price: 899,
    originalPrice: 1499,
    discount: 40,
    brand: "Lavie"
  }
];
