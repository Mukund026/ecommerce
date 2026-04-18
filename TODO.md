# Task: Update smartphones page to fetch DB with db.products.find({name: /smartphones/i})

## Steps:
- [x] 1. Edit backend/controllers/smartphoneController.js to change default query to { name: { $regex: /smartphones/i } }
- [x] 2. Restart backend server if running
- [x] 3. Verify at http://localhost:5173/smartphones: page loads smartphones from DB
- [x] 4. Complete task
