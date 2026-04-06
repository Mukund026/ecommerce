export const homeKitchenProducts = [
  {
    id: 1,
    name: "Kitchen Storage Container Set - 5 Pieces",
    image: "/assets/kitchen-container.png",
    price: 499,
    originalPrice: 999,
    discount: 50,
    rating: 4.2,
    reviews: 12543,
    prime: true,
    delivery: "FREE delivery Tomorrow, 15 Oct",
    brand: "Amazon Basics"
  },
  {
    id: 2,
    name: "Furniture Dust Cover - Waterproof",
    image: "/assets/furniture-cover.png",
    price: 299,
    originalPrice: 599,
    discount: 50,
    rating: 4.1,
    reviews: 8567,
    prime: true,
    delivery: "FREE delivery Tomorrow, 15 Oct",
    brand: "Generic"
  },
  {
    id: 3,
    name: "Cordless Vegetable Chopper - 500ml",
    image: "/assets/veggie-chopper.png",
    price: 749,
    originalPrice: 1499,
    discount: 50,
    rating: 4.3,
    reviews: 3421,
    prime: true,
    delivery: "FREE delivery Tomorrow, 15 Oct",
    brand: "Agaro"
  },
  {
    id: 4,
    name: "Stainless Steel Measuring Spoons Set",
    image: "/assets/measuring-spoons.png",
    price: 199,
    originalPrice: 399,
    discount: 50,
    rating: 4.4,
    reviews: 7890,
    prime: false,
    delivery: "Get it by 16 Oct",
    brand: "Bergner"
  },
  {
    id: 5,
    name: "Digital LED Alarm Clock with Dual USB",
    image: "/assets/alarm-clock.png",
    price: 399,
    originalPrice: 799,
    discount: 50,
    rating: 4.0,
    reviews: 2345,
    prime: true,
    delivery: "FREE delivery Tomorrow, 15 Oct",
    brand: "Pebble"
  },
  {
    id: 6,
    name: "High Speed Ceiling Fan 48 inch",
    image: "/assets/ceiling-fan.png",
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    rating: 4.2,
    reviews: 5678,
    prime: true,
    delivery: "FREE delivery Tomorrow, 15 Oct",
    brand: "Halonix"
  },
  {
    id: 7,
    name: "6 Socket Extension Board with USB",
    image: "/assets/extension-board.png",
    price: 599,
    originalPrice: 1199,
    discount: 50,
    rating: 4.3,
    reviews: 11234,
    prime: true,
    delivery: "FREE delivery Tomorrow, 15 Oct",
    brand: "Amazon Basics"
  },
  {
    id: 8,
    name: "Electric Mosquito Bat Rechargeable",
    image: "/assets/mosquito-bat.png",
    price: 349,
    originalPrice: 699,
    discount: 50,
    rating: 4.1,
    reviews: 4567,
    prime: true,
    delivery: "FREE delivery Tomorrow, 15 Oct",
    brand: "Pexpo"
  },
// Generate 20+ more products for main grid
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 9,
    name: `Home Kitchen Product ${i + 9}`,
    image: `/assets/product${i + 1}.png`,
    price: 299 + i * 50,
    originalPrice: 599 + i * 100,
    discount: 40 + i % 20,
    rating: 4.0 + (i % 5) * 0.1,
    reviews: 1000 + i * 500,
    prime: i % 2 === 0,
    delivery: i % 3 === 0 ? "FREE delivery Tomorrow, 15 Oct" : "Get it by 16 Oct",
    brand: ["Narwal", "Aldon", "Interio", "Agaro", "Cricut"][i % 5]
  }))
];

export const homeKitchenFilters = {
  loveFromIndia: [
    { id: 'local', label: 'Handcrafted Items', count: 2345 },
    { id: 'support', label: 'Support Local Makers', count: 1234 }
  ],
  categories: [
    { id: 'storage', label: 'Home Storage', count: 12567 },
    { id: 'kitchen', label: 'Kitchen & Dining', count: 23456 },
    { id: 'cookware', label: 'Cookware', count: 34567 },
    { id: 'furniture', label: 'Furniture', count: 45678 },
    { id: 'bedding', label: 'Bedding', count: 56789 },
    { id: 'decor', label: 'Home Decor', count: 67890 },
    { id: 'cleaning', label: 'Cleaning Supplies', count: 78901 }
  ],
  ratings: [
    { id: 4, label: '4★ & Up', count: 89012 },
    { id: 3, label: '3★ & Up', count: 90123 },
    { id: 2, label: '2★ & Up', count: 12345 }
  ],
  prices: [
    { id: '250-750', label: '₹250–₹750', count: 23456 },
    { id: '750-2000', label: '₹750–₹2000', count: 34567 },
    { id: '2000-5000', label: '₹2000–₹5000', count: 45678 },
    { id: '5000+', label: '₹5000+', count: 56789 }
  ],
  discounts: [
    { id: 10, label: '10% off or more', count: 67890 },
    { id: 25, label: '25% off or more', count: 78901 },
    { id: 35, label: '35% off or more', count: 89012 },
    { id: 50, label: '50% off or more', count: 90123 }
  ],
  deals: [
    { id: 'today', label: "Today's Deals", count: 12345 },
    { id: 'lightning', label: 'Lightning Deals', count: 2345 }
  ]
};
