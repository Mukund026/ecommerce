# Add Prev/Next Buttons to SmartphonesListPage (/smartphones/more)

## Plan Breakdown & Progress

### 1. ✅ Create this TODO.md tracker
### 2. ✅ Update Pagination.jsx - always render prev/next + page info (removed if(totalPages<=1), added Page X of Y, styled Next orange)
### 3. ✅ Update SmartphonesListPage.jsx - added border wrapper for visibility
### 4. ✅ Fixed navigation: ?page=N 
### 5. ✅ Fixed useSmartphones.js: useEffect deps [params.page], now refetches on page change (was always page=1)
### 6. Task complete: Click Next → new 20 products from DB

**Details:** Force buttons visible even if totalPages=1, use Link ?page= N for navigation, 20/page from backend.

Next step: Edit files per plan.
