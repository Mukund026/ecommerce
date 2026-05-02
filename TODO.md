# TODO - Display Products from Database in Home Page

## Task: Integrate products from database into the frontend Home page

### Step 1: Backend - Add new API routes
- [ ] Add `/api/products/bestsellers` route - fetch isBestSeller products
- [ ] Add `/api/products/fresh-fruits` route - fetch fruits/grocery products
- [ ] Add `/api/products/snacks-beverages` route - fetch snacks and beverages
- [ ] Add `/api/products/house-essentials` route - fetch household items

### Step 2: Frontend - Modify Home.jsx
- [ ] Create React state for storing products by category
- [ ] Add useEffect to fetch products from API on component mount
- [ ] Replace hardcoded static data with fetched products
- [ ] Handle loading and error states
- [ ] Display products using GroceryProductCard component

### Step 3: Test
- [ ] Verify products display correctly on http://localhost:5173
- [ ] Check all categories: Bestseller, Fresh Fruits, Snacks & Beverages, House Essentials
