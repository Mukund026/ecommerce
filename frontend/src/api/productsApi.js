import API from "./axios";

export const getProductsByCategory = async (categoryName, page = 1, limit = 20, sort = "newest") => {
  const response = await API.get("/products", {
    params: { categoryName, page, limit, sort },
  });
  return response.data;
};

export const getProductsByCategoryWithFilters = async (categoryName, filters = {}) => {
  const response = await API.get("/products", {
    params: { categoryName, ...filters },
  });
  return response.data;
};

// Fashion-specific category getters
export const getWomenProducts = (page, limit, sort) => getProductsByCategory("Women", page, limit, sort);
export const getWomenAccessories = (page, limit, sort) => getProductsByCategory("Women's Accessories", page, limit, sort);
export const getWomenClothing = (page, limit, sort) => getProductsByCategory("Women's Clothing", page, limit, sort);
export const getWomenHandbags = (page, limit, sort) => getProductsByCategory("Women's Handbags", page, limit, sort);
export const getWomenHealth = (page, limit, sort) => getProductsByCategory("Women's Health  Family Planning", page, limit, sort);
export const getWomenJewelry = (page, limit, sort) => getProductsByCategory("Women's Jewelry", page, limit, sort);
export const getWomenShoes = (page, limit, sort) => getProductsByCategory("Women's Shoes", page, limit, sort);
export const getWomenWatches = (page, limit, sort) => getProductsByCategory("Women's Watches", page, limit, sort);

export const getMenProducts = (page, limit, sort) => getProductsByCategory("Men", page, limit, sort);
export const getMenAccessories = (page, limit, sort) => getProductsByCategory("Men's Accessories", page, limit, sort);
export const getMenClothing = (page, limit, sort) => getProductsByCategory("Men's Clothing", page, limit, sort);
export const getMenJewelry = (page, limit, sort) => getProductsByCategory("Men's Jewelry", page, limit, sort);
export const getMenShoes = (page, limit, sort) => getProductsByCategory("Men's Shoes", page, limit, sort);
export const getMenWatches = (page, limit, sort) => getProductsByCategory("Men's Watches", page, limit, sort);

export const getSportingApparel = (page, limit, sort) => getProductsByCategory("Sporting Apparel", page, limit, sort);
export const getSportClothing = (page, limit, sort) => getProductsByCategory("Sport Specific Clothing", page, limit, sort);
export const getShavingProducts = (page, limit, sort) => getProductsByCategory("Shaving  Hair Removal Products", page, limit, sort);
export const getShelfBrackets = (page, limit, sort) => getProductsByCategory("Shelf Brackets  Supports", page, limit, sort);
export const getJewelryAccessories = (page, limit, sort) => getProductsByCategory("Shoe, Jewelry  Watch Accessories", page, limit, sort);
export const getPerfume = (page, limit, sort) => getProductsByCategory("Perfume  Cologne", page, limit, sort);
export const getKidsProducts = (page, limit, sort) => getProductsByCategory("Kids' Slumber Bags", page, limit, sort);
export const getLuggageProducts = (page, limit, sort) => getProductsByCategory("Luggage  Travel Gear", page, limit, sort);
export const getFashionDeals = (page, limit, sort) => getProductsByCategory("Fashion", page, limit, sort);
