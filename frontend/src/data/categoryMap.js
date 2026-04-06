// Map frontend routes/sections → Backend API params
// Used by pages to auto-generate correct queries
export const categoryMap = {
  // Fresh/Grocery
  fresh: { categoryName: 'Grocery' },
  'fresh/atta-rice-grains': { categoryName: 'Grocery', subcategory: 'atta rice grains' },
  fruits: { categoryName: 'Grocery', subcategory: 'fruits' },
  
  // Electronics/Computers  
  computers: { categoryName: 'Computers', subcategory: 'accessories' },
  electronics: { categoryName: 'Electronics' },
  smartphones: { categoryName: 'Smartphones' },
  
  // Shopping Categories
  fashion: { categoryName: 'Fashion' },
  books: { categoryName: 'Books' },
  toys: { categoryName: 'Toys' },
  'home-kitchen': { category: 'Home & Kitchen' },
  
  // Deals/Special
  bestsellers: { sort: 'stars:desc', limit: 40 },
  'hot-new-releases': { sort: 'newest', limit: 40 },
  
  // Defaults
  default: { limit: 20 }
};

// Helper to get params from current path
export const getParamsFromPath = (pathname) => {
  const path = pathname.toLowerCase().replace('/pages/', '').split('?')[0];
  
  // Direct matches
  if (categoryMap[path]) return categoryMap[path];
  
  // Sub-path matching
  for (const [key, params] of Object.entries(categoryMap)) {
    if (path.includes(key)) return params;
  }
  
  return categoryMap.default;
};
