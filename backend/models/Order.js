const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],

    totalPrice: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delevered"],
      default: "Pending"
    }
  },
  {timestamp: true}
);

module.exports = mongoose.model("Order", orderSchema);

// place an order
// {
//   "products": [
//     {
//       "product": "6988d47aed99bdd9084ad4bb",
//       "quantity": 2,
//       "price": 4000
//     }
//   ],
//   "totalPrice": 8000
// }


// update order status
// {
//   "status": "Shipped"
// }


// create product
//  {
//  "name": "iPhone",
//  "price": 80000,
//  "category": "Brand New"
//  }