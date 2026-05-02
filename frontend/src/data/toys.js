// Toys & Games Category Data - Amazon Clone

// SECTION 1: Category Icons Row (8 circular icons)
export const toyCategories = [
  { id: 1, name: 'Plush Toys', slug: 'plush-toys', apiParams: { search: 'plush soft toy' }, image: 'https://m.media-amazon.com/images/I/81I+DO5FqcL._AC_UL320_.jpg  ' },
  { id: 2, name: 'Remote Cars', slug: 'remote-cars', apiParams: { search: 'remote control car' }, image: 'https://m.media-amazon.com/images/I/71HCJEsNFsL._AC_UL320_.jpg' },
  { id: 3, name: 'Building Blocks', slug: 'building-blocks', apiParams: { search: 'building block construction' }, image: 'https://m.media-amazon.com/images/I/81pDDx7enML._AC_UL320_.jpg' },
  { id: 4, name: 'Educational Toys', slug: 'educational-toys', apiParams: { search: 'educational learning toy' }, image: 'https://m.media-amazon.com/images/I/81jXp-l5rKS._AC_UL320_.jpg' },
  { id: 5, name: 'Dolls', slug: 'dolls', apiParams: { search: 'doll accessory' }, image: 'https://m.media-amazon.com/images/I/71Er6Krn06L._AC_UL320_.jpg' },
  { id: 6, name: 'Board Games', slug: 'board-games', apiParams: { search: 'board game' }, image: 'https://m.media-amazon.com/images/I/81ErdwB86fL._AC_UL320_.jpg' },
  { id: 7, name: 'Outdoor Toys', slug: 'outdoor-toys', apiParams: { category: "Outdoor Play Toys,Sandboxes & Beach Toys,Toy Sports Equipment,Pogo Sticks & Hopping Toys" }, image: 'https://m.media-amazon.com/images/I/810V-KPoFiL._AC_UL320_.jpg' },
  { id: 8, name: 'Baby Toys', slug: 'baby-toys', apiParams: { search: 'baby toy' }, image: 'https://m.media-amazon.com/images/I/51tn+m0troL._AC_UL320_.jpg' },
  { id: 9, name: 'Remote Control Jeep', slug: 'remote-control-jeep', apiParams: { search: 'remote control car' }, image: 'https://m.media-amazon.com/images/I/51qNoIcBz3S._AC_UL320_.jpg' },
];

export const toyFilterSections = {
  category: [
    { id: 'toys-games', label: 'Toys & Games', count: 125000 },
    { id: 'learning', label: 'Learning & Education', count: 45000 },
    { id: 'building', label: 'Building Toys', count: 28000 },
    { id: 'dolls', label: 'Dolls & Accessories', count: 32000 },
    { id: 'outdoor', label: 'Outdoor Toys', count: 18000 },
    { id: 'puzzles', label: 'Puzzles', count: 8500 },
    { id: 'arts', label: 'Arts & Crafts', count: 22000 },
    { id: 'board-games', label: 'Board Games', count: 15000 },
  ],
  ageRange: [
    { id: '0-2', label: '0–2 years' },
    { id: '3-5', label: '3–5 years' },
    { id: '6-8', label: '6–8 years' },
    { id: '9-12', label: '9–12 years' },
    { id: '12+', label: '12+ years' },
  ],
  brands: [
    { id: 'lego', label: 'Lego' },
    { id: 'funskool', label: 'Funskool' },
    { id: 'barbie', label: 'Barbie' },
    { id: 'nerf', label: 'Nerf' },
    { id: 'fisher-price', label: 'Fisher Price' },
    { id: 'hot-wheels', label: 'Hot Wheels' },
  ],
  price: [
    { id: 'under-500', label: 'Under ₹500' },
    { id: '500-1000', label: '₹500–₹1000' },
    { id: '1000-3000', label: '₹1000–₹3000' },
    { id: '3000+', label: '₹3000+' },
  ],
  reviews: [
    { id: 4, label: '4★ & Up' },
    { id: 3, label: '3★ & Up' },
    { id: 2, label: '2★ & Up' },
  ],
  discount: [
    { id: '10-off', label: '10% Off' },
    { id: '25-off', label: '25% Off' },
    { id: '50-off', label: '50% Off' },
  ],
};

// SECTION 3: Featured Toys (3 cards)
export const featuredToys = [
  { id: 1, title: 'Soft Plush Teddy Bear 30cm', image: 'https://images.unsplash.com/photo-1572146302395-4e42819c26d7?w=300&h=300&fit=crop', price: 299, originalPrice: 599, discount: 50, rating: 4.5 },
  { id: 2, title: 'Remote Control Car Set', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=300&fit=crop', price: 899, originalPrice: 1799, discount: 50, rating: 4.4 },
  { id: 3, title: 'Colorful Building Blocks 100pcs', image: 'https://images.unsplash.com/photo-1587654780321-6fc9a91ef8f6?w=300&h=300&fit=crop', price: 499, originalPrice: 999, discount: 50, rating: 4.6 },
];

// SECTION 11/12: Main Product Listings (~50 for multiple rows, 4-col grid)
export const toyProducts = [
  { id: 1, title: 'LEGO Classic Medium Creative Brick Box', image: 'https://images.unsplash.com/photo-1587654780321-6fc9a91ef8f6?w=200&h=200&fit=crop', rating: 4.7, reviews: 12500, price: 1499, originalPrice: 2999, discount: 50, isPrime: true, age: '6-8' },
  { id: 2, title: 'Hot Wheels 50 Car Pack', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=200&fit=crop', rating: 4.6, reviews: 8900, price: 999, originalPrice: 1999, discount: 50, isPrime: true, age: '3-5' },
  { id: 3, title: 'Fisher-Price Laugh & Learn Smart Stages Puppy', image: 'https://images.unsplash.com/photo-1618049352891-7b5a53dd305b?w=200&h=200&fit=crop', rating: 4.5, reviews: 34000, price: 1299, originalPrice: 2599, discount: 50, isPrime: true, age: '0-2' },
  { id: 4, title: 'Barbie Dreamhouse Playset', image: 'https://images.unsplash.com/photo-1572146302395-4e42819c26d7?w=200&h=200&fit=crop', rating: 4.4, reviews: 23000, price: 4999, originalPrice: 9999, discount: 50, age: '6-8' },
  { id: 5, title: 'Nerf Elite 2.0 Commander RD-6 Blaster', image: 'https://images.unsplash.com/photo-1596755094514-f87e34018b7e?w=200&h=200&fit=crop', rating: 4.6, reviews: 15600, price: 1799, originalPrice: 3599, discount: 50, isPrime: true, age: '9-12' },
  // Add 45+ more similar entries for full grid (wooden blocks, puzzles, RC cars, dolls, science kits, etc.)
  // Truncated for brevity; full file will have 50+ with varied images/titles/prices from Unsplash toys
  ...Array.from({ length: 46 }, (_, i) => ({
    id: i + 6,
    title: `Toy Product ${i + 6} - Fun Learning Kit`,
    image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 160000)}?w=200&h=200&fit=crop`,
    rating: 4.3 + Math.random(),
    reviews: Math.floor(Math.random() * 50000),
    price: Math.floor(199 + Math.random() * 4801),
    originalPrice: Math.floor(399 + Math.random() * 9601),
    discount: Math.floor(40 + Math.random() * 31),
    isPrime: Math.random() > 0.5,
    age: ['0-2', '3-5', '6-8', '9-12', '12+'][Math.floor(Math.random() * 5)]
  }))
];

// SECTION 6: Top Brands Logos
export const topToyBrands = [
  { id: 1, name: 'Lego', image: 'https://images.unsplash.com/photo-1587654780294-9bcc3347ca66?w=120&h=60&fit=crop', link: '#' },
  { id: 2, name: 'Barbie', image: 'https://images.unsplash.com/photo-1572146302395-4e42819c26d7?w=120&h=60&fit=crop', link: '#' },
  { id: 3, name: 'Hot Wheels', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=120&h=60&fit=crop', link: '#' },
  { id: 4, name: 'Funskool', image: 'https://images.unsplash.com/photo-1618236872930-91d96ff397ae?w=120&h=60&fit=crop', link: '#' },
  { id: 5, name: 'Nerf', image: 'https://images.unsplash.com/photo-1596755094514-f87e34018b7e?w=120&h=60&fit=crop', link: '#' },
];

// SECTION 7: What's Big in Playtime (circular icons)
export const playtimeIcons = [
  { name: 'Play Kitchen', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=150&h=150&fit=crop&round' },
  { name: 'Doctor Set', image: 'https://images.unsplash.com/photo-1582744492192-32ed1e3c7e77?w=150&h=150&fit=crop&round' },
  // +7 more...
];

// SECTION 8: Outdoor Toys
export const outdoorToys = [
  { title: 'Ride-on Car', image: 'https://images.unsplash.com/photo-1541781774459-9d5a3fe17d34?w=250&h=250&fit=crop', price: 8999 },
  { title: 'Toy Scooter', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=250&h=250&fit=crop', price: 1499 },
  // +2 more...
];

// Placeholder banners data (SECTION 2,5,9,10)
export const heroBannerData = { title: 'Toy Vehicles Sale!', bg: 'yellow' };
export const customerLovedData = [{ title: 'Heart Pillow', image: 'https://placekitten.com/300/300' }];
export const amazonBrandData = [{ title: 'Amazon Basics Building Blocks', image: 'https://images.unsplash.com/photo-1587654780321-6fc9a91ef8f6' }];
export const bookBazaarData = { title: 'Book Bazaar Up to 50% Off' };

// SECTION 4: Toy Rooms
export const toyRooms = [
  { title: 'Kids Room Toys', image: 'https://images.unsplash.com/photo-1615535157158-96d39f5e1fe5?w=400&h=250&fit=crop' },
];

// Product grid categories (SECTION 7 grids)
export const toyGridCategories = [
  { title: 'UNO Cards', image: 'https://images.unsplash.com/photo-1618236872930-91d96ff397ae', products: 5000 },
  { title: 'Rubik Cubes', image: 'https://images.unsplash.com/photo-1583756233258-92b34f375919', products: 12000 },
  // +10 more for multiple rows...
];

// ===========================
// FILTER MAPPING HELPERS
// Maps sidebar filter IDs to backend query values
// ===========================

/** Category ID → DB categoryName (normalized with double spaces) or search fallback */
export const categoryIdToNames = {
  'toys-games': ['Toys  Games', 'Handmade Toys  Games'],
  'learning': null, // handled as search
  'building': ['Building  Construction Toys'],
  'dolls': ['Stuffed  Plush Animals', 'Collectible Toys'],
  'outdoor': ['Outdoor Play Toys', 'Sandboxes  Beach Toys', 'Toy Sports Equipment', 'Pogo Sticks  Hopping Toys', 'Swimming Pool  Outdoor Water Toys', 'Play Sets  Playground Equipment'],
  'puzzles': null,
  'arts': null,
  'board-games': null,
};

export const categoryIdToSearch = {
  'learning': 'learning educational',
  'puzzles': 'puzzle',
  'arts': 'art craft',
  'board-games': 'board game',
};

/** Price ID → { minPrice, maxPrice } */
export const priceIdToRange = {
  'under-500': { minPrice: 0, maxPrice: 500 },
  '500-1000': { minPrice: 500, maxPrice: 1000 },
  '1000-3000': { minPrice: 1000, maxPrice: 3000 },
  '3000+': { minPrice: 3000 },
};

/** Brand ID → backend comma-separated brand names for regex search */
export const brandIdToNames = {
  'lego': 'Lego',
  'funskool': 'Funskool',
  'barbie': 'Barbie',
  'nerf': 'Nerf',
  'fisher-price': 'Fisher-Price',
  'hot-wheels': 'Hot Wheels',
};

/** Age Range ID → backend search keywords */
export const ageRangeIdToSearch = {
  '0-2': 'baby infant toddler newborn 0-2 month year',
  '3-5': 'kids child preschool 3-5 year',
  '6-8': 'kids children 6-8 year',
  '9-12': 'kids boys girls 9-12 year teen',
  '12+': 'teen teenager adult 12+ year',
};

/** Discount ID → minimum discount % */
export const discountIdToPercent = {
  '10-off': 10,
  '25-off': 25,
  '50-off': 50,
};

/**
 * Converts frontend filters object into axios params for /toys
 * @param {object} filters - the filters state from Toys/ToysCategory
 * @param {object} baseParams - optional base params (e.g. categoryMeta.apiParams)
 * @returns {object} params ready for axios
 */
export function buildToysQueryParams(filters, baseParams = {}) {
  const params = { ...baseParams };

  // --- Category ---
  const selectedCats = filters.category || [];
  const dbCats = [];
  const searchTerms = [];

  selectedCats.forEach((id) => {
    const names = categoryIdToNames[id];
    const srch = categoryIdToSearch[id];
    if (names) dbCats.push(...names);
    if (srch) searchTerms.push(srch);
  });

  if (dbCats.length) {
    params.category = dbCats.join(',');
  }
  if (searchTerms.length) {
    params.search = searchTerms.join(' ');
  }

  // --- Price ---
  if (filters.price && priceIdToRange[filters.price]) {
    const { minPrice, maxPrice } = priceIdToRange[filters.price];
    if (minPrice !== undefined) params.minPrice = minPrice;
    if (maxPrice !== undefined) params.maxPrice = maxPrice;
  }

  // --- Rating ---
  if (filters.rating) {
    params.rating = filters.rating;
  }

  // --- Brands ---
  const selectedBrands = filters.brands || [];
  if (selectedBrands.length) {
    params.brands = selectedBrands.map((id) => brandIdToNames[id]).filter(Boolean).join(',');
  }

  // --- Discount ---
  const selectedDiscounts = filters.discount || [];
  if (selectedDiscounts.length) {
    const minDiscount = Math.min(...selectedDiscounts.map((id) => discountIdToPercent[id]).filter((v) => v !== undefined));
    if (minDiscount !== Infinity) {
      params.discount = minDiscount;
    }
  }

  // --- Age Range ---
  const selectedAges = filters.ageRange || [];
  if (selectedAges.length) {
    params.ageRange = selectedAges.map((id) => ageRangeIdToSearch[id]).filter(Boolean).join(' ');
  }

  // --- Out of Stock ---
  if (filters.outOfStock) {
    params.outOfStock = 'true';
  }

  return params;
}
