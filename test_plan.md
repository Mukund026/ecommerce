# Plan: Fix 0 Price Issue on Computers Page

## Information Gathered:
1. **Root Cause**: In `backend/controllers/computersController.js`, products with `price: 0` or missing price are formatted with:
   ```javascript
   price: p.price || 0,
   originalPrice: p.listPrice || p.price || 0,
   ```
   Since `0` is falsy in JavaScript, `p.price || 0` returns `0` when the product has a zero price in the database.

2. **Reference Solution**: `backend/controllers/bestsellerController.js` already has a price-fixing mechanism:
   - Calculates category average prices
   - For products with `price <= 0`, assigns a new price based on category average (80-120% of avg)
   - Updates the database with corrected prices

3. **Impact**: The fix needs to be applied to:
   - `getComputers` function - main product listing
   - `getBrands` function - brand section products
   - `getComputerById` function - single product detail

## Plan:
1. **Edit `backend/controllers/computersController.js`**:
   - Add a helper function `fixZeroPrices(products)` that calculates category averages and fixes zero/missing prices
   - Apply the fix to the products array before formatting in `getComputers()`
   - Apply the fix to brand products in `getBrands()`
   - Apply the fix in `getComputerById()` for single product

2. **Update `TODO.md`** to mark the fix as complete

## Dependent Files:
- `backend/controllers/computersController.js` (main fix)
- `TODO.md` (update progress)

## Follow-up Steps:
- Test the page at `http://localhost:5173/computers` to verify prices are no longer showing 0

