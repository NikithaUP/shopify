const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter the product name"],
    trim: true,
    maxLength: [100, "Name size exists"],
  },
  price: {
    type: Number,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Enter the product description"],
  },
  ratings: {
    type: String,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      }
    }
  ],
  category: {
    type: String,
    required: [true, "Enter the product category"],
    enum: {
      values: [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Enter the seller name"],
  },
  stock: {
    type: Number,
    required: [true, "Enter the product stock"],
    maxLength: [20, "Stock exists"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let schema = mongoose.model("Product", productSchema);

module.exports = schema;
