// Fresh categories data (updated with slugs for routing)
export const freshCategories = [
  { id: 1, name: 'Fruits & Vegetables', slug: 'fruits-vegetables', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&h=200&fit=crop' },
  { id: 2, name: 'Rice, Atta & Dal', slug: 'rice-atta-dal', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop' },
  { id: 3, name: 'Oil & Ghee', slug: 'oil-ghee', image: 'https://www.bing.com/images/search?view=detailV2&ccid=G5xvUkef&id=444E8ED5837B790EA48670E8C1F8B88A565997D6&thid=OIP.G5xvUkefojJLVkQJ_i2K2AHaEK&mediaurl=https%3a%2f%2fasmy.org.au%2fapp%2fuploads%2f2022%2f05%2fHomemade-Ghee.jpg&exph=1080&expw=1920&q=ghee&FORM=IRPRST&ck=4A82FC1944AADE710B6475F8DDD1A323&selectedIndex=10&itb=0' },
  { id: 4, name: 'Milk & Dairy', slug: 'milk-dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop' },
  { id: 5, name: 'Bakery & Bread', slug: 'bakery-bread', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop' },
  { id: 6, name: 'Eggs, Meat & Fish', slug: 'eggs-meat-fish', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=200&h=200&fit=crop' },
  { id: 7, name: 'Spices & Seasonings', slug: 'spices-seasonings', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop' },
  { id: 8, name: 'Snacks & biscuits', slug: 'snacks-biscuits', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&h=200&fit=crop' },
];

// Fresh navbar categories (unchanged)
export const freshNavCategories = [
  'fresh',
  'Past Purchases',
  'Alexa lists',
  'Deals',
  'Fruits & vegetables',
  'Atta, rice & grains',
  'Oil & ghee',
  'Milk & dairy',
  'Chips & biscuits',
  'Eggs, meat & fish',
  'Bath & body',
  'Laundry detergents',
  'Baby care'
];

// All products in API format {id, name, image, price, rating, reviews, originalPrice, isBestSeller}
export const allFreshProducts = [
  {
    id: 1,
    slug: "lays-classic-chips",
    name: "Lay's Classic Chips",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop",
    price: 39,
    rating: 4.5,
    reviews: 2345,
    originalPrice: 50,
    isBestSeller: true
  },
  {
    id: 2,
    slug: "kelloggs-corn-flakes",
    name: "Kellogg's Corn Flakes",
    image: "https://images.unsplash.com/photo-1584462477584-c6cbf9f96200?w=200&h=200&fit=crop",
    price: 259,
    rating: 4.3,
    reviews: 1567,
    originalPrice: 320,
    isBestSeller: false
  },
  {
    id: 3,
    slug: "parle-g-biscuits",
    name: "Parle-G Biscuits",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop",
    price: 30,
    rating: 4.6,
    reviews: 8901,
    originalPrice: 35,
    isBestSeller: true
  },
  {
    id: 4,
    name: "Cadbury Dairy Milk",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&h=200&fit=crop",
    price: 75,
    rating: 4.7,
    reviews: 4567,
    originalPrice: 90,
    isBestSeller: true
  },
  {
    id: 5,
    name: "Oral-B Dental Floss",
    image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=200&h=200&fit=crop",
    price: 149,
    rating: 4.4,
    reviews: 1234,
    originalPrice: 199,
    isBestSeller: false
  },
  {
    id: 6,
    name: "Maggi Noodles",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200&h=200&fit=crop",
    price: 12,
    rating: 4.2,
    reviews: 7890,
    originalPrice: 15,
    isBestSeller: true
  },
  {
    id: 7,
    name: "Sunfeast Dark Fantasy",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    price: 120,
    rating: 4.5,
    reviews: 2341,
    originalPrice: 150,
    isBestSeller: false
  },
  {
    id: 8,
    name: "Britannia Good Day",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?w=200&h=200&fit=crop",
    price: 35,
    rating: 4.4,
    reviews: 3456,
    originalPrice: 45,
    isBestSeller: true
  },
  {
    id: 9,
    name: "Tide Detergent Powder",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200&h=200&fit=crop",
    price: 199,
    rating: 4.6,
    reviews: 2789,
    originalPrice: 280,
    isBestSeller: true
  },
  {
    id: 10,
    name: "Lizol Floor Cleaner",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop",
    price: 180,
    rating: 4.3,
    reviews: 1678,
    originalPrice: 220,
    isBestSeller: false
  },
  {
    id: 11,
    name: "Colgate Toothpaste",
    image: "https://images.unsplash.com/photo-1559650656-5e7e3f496f97?w=200&h=200&fit=crop",
    price: 159,
    rating: 4.5,
    reviews: 4562,
    originalPrice: 200,
    isBestSeller: true
  },
  {
    id: 12,
    name: "Dettol Hand Wash",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop",
    price: 99,
    rating: 4.4,
    reviews: 2345,
    originalPrice: 120,
    isBestSeller: false
  },
  {
    id: 13,
    name: "Godrej Air Freshener",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=200&fit=crop",
    price: 250,
    rating: 4.2,
    reviews: 1234,
    originalPrice: 320,
    isBestSeller: true
  },
  {
    id: 14,
    name: "Scotch-Brite Scrub",
    image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=200&h=200&fit=crop",
    price: 80,
    rating: 4.6,
    reviews: 3456,
    originalPrice: 100,
    isBestSeller: false
  },
  {
    id: 15,
    name: "Harpic Toilet Cleaner",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=200&fit=crop",
    price: 140,
    rating: 4.5,
    reviews: 2890,
    originalPrice: 180,
    isBestSeller: true
  },
  {
    id: 16,
    name: "Frooti Mango Drink",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop",
    price: 30,
    rating: 4.3,
    reviews: 1678,
    originalPrice: 40,
    isBestSeller: true
  },
  {
    id: 17,
    name: "Lakme Rose Powder",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
    price: 230,
    rating: 4.4,
    reviews: 2345,
    originalPrice: 280,
    isBestSeller: false
  },
  {
    id: 18,
    name: "Maybelline Lipstick",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop",
    price: 299,
    rating: 4.6,
    reviews: 4567,
    originalPrice: 399,
    isBestSeller: true
  },
  {
    id: 19,
    name: "Lotus Sunscreen SPF 50",
    image: "https://images.unsplash.com/photo-1571781348782-8423285d8c8f?w=200&h=200&fit=crop",
    price: 399,
    rating: 4.7,
    reviews: 3456,
    originalPrice: 550,
    isBestSeller: true
  },
  {
    id: 20,
    name: "VLCC Face Wash",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
    price: 180,
    rating: 4.5,
    reviews: 2789,
    originalPrice: 240,
    isBestSeller: false
  },
  {
    id: 21,
    name: "Olay Night Cream",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=200&h=200&fit=crop",
    price: 699,
    rating: 4.4,
    reviews: 1890,
    originalPrice: 899,
    isBestSeller: true
  },
  {
    id: 22,
    name: "Dove Shampoo",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=200&h=200&fit=crop",
    price: 349,
    rating: 4.6,
    reviews: 4567,
    originalPrice: 420,
    isBestSeller: true
  },
  {
    id: 23,
    name: "L'Oreal Hair Serum",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=200&h=200&fit=crop",
    price: 399,
    rating: 4.5,
    reviews: 2345,
    originalPrice: 520,
    isBestSeller: false
  },
  {
    id: 24,
    name: "Neutrogena Face Wash",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca078?w=200&h=200&fit=crop",
    price: 245,
    rating: 4.3,
    reviews: 1678,
    originalPrice: 320,
    isBestSeller: true
  },
  {
    id: 25,
    name: "Amul Gold Milk",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
    price: 68,
    rating: 4.7,
    reviews: 8901,
    originalPrice: 85,
    isBestSeller: true
  },
  {
    id: 26,
    name: "Bananas (1kg)",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop",
    price: 49,
    rating: 4.8,
    reviews: 12345,
    originalPrice: 60,
    isBestSeller: true
  },
  {
    id: 27,
    name: "Red Apples (1kg)",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop",
    price: 199,
    rating: 4.6,
    reviews: 3456,
    originalPrice: 250,
    isBestSeller: false
  },
  {
    id: 28,
    name: "Basmati Rice (5kg)",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
    price: 899,
    rating: 4.5,
    reviews: 2789,
    originalPrice: 1200,
    isBestSeller: true
  },
  {
    id: 29,
    name: "Fortune Sunflower Oil",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd83c5?w=200&h=200&fit=crop",
    price: 189,
    rating: 4.4,
    reviews: 2345,
    originalPrice: 240,
    isBestSeller: false
  },
  {
    id: 30,
    name: "Tata Salt (1kg)",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop",
    price: 25,
    rating: 4.7,
    reviews: 5678,
    originalPrice: 32,
    isBestSeller: true
  },
  {
    id: 31,
    slug: "organic-apples-1kg",
    name: "Organic Apples (1kg)",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    price: 249,
    rating: 4.7,
    reviews: 1234,
    originalPrice: 299,
    discount: 17,
    category: "Fruits & Vegetables",
    description: "Fresh organic apples sourced from premium orchards. Crisp, juicy, and pesticide-free.",
    isBestSeller: true
  }
];
