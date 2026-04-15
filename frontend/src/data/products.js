// Fresh categories data (updated with slugs matching backend groceryTypeMap)
export const freshCategories = [
  { id: 1, name: 'Fruits & Vegetables', slug: 'fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&h=200&fit=crop' },
  { id: 2, name: 'Rice, Atta & Dal', slug: 'rice-atta-dal', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop' },
  { id: 3, name: 'Oil & Ghee', slug: 'oil-ghee', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd83c5?w=200&h=200&fit=crop' },
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
  }
];
