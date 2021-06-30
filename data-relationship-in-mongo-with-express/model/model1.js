const mongoose = require("mongoose");
const Product = require("./model");
const { Schema } = mongoose;

const FarmShopSchema = new Schema({
  name: String,
  location: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

FarmShopSchema.post("findOneAndDelete", async (farm) => {
  if (farm.products.length) {
    const res = await Product.deleteMany({ _id: { $in: farm.products } });
    console.log(res);
  }
});

const FarmShop = mongoose.model("FarmShop", FarmShopSchema);
module.exports = FarmShop;
