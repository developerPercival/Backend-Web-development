const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/farm-products", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo database is connected");
  })
  .catch(() => {
    console.log("Something went wrong");
  });

const productSchema = new Schema({
  name: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

Product.insertMany([
  {
    name: "Cucumber",
    price: 2.0,
  },
  {
    name: "Melon",
    price: 1.0,
  },
  {
    name: "Apple",
    price: 4.0,
  },
]);
