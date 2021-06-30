const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  price: Number,
  farm: [
    {
      type: Schema.Types.ObjectId,
      ref: "FarmShop",
    },
  ],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
