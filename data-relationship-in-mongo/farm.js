//One to many data relationship pattern
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/farm-shop", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Success");
  })
  .catch(() => {
    console.log("Failed");
  });

//Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

//Model
const Product = mongoose.model("VegeProduct", productSchema);

const farmSchema = new mongoose.Schema({
  name: String,
  city: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VegeProduct",
    },
  ],
});

//Model
const Farm = mongoose.model("FarmShop", farmSchema);

//Mongoose operation

// Product.insertMany([
//   {
//     name: "Golden Melon",
//     price: 9.99,
//   },
//   {
//     name: "Violet Cabbage",
//     price: 2.22,
//   },
//   {
//     name: "Cucumber",
//     price: 1.5,
//   },
// ]);

//Const make farm
const makeFarm = async () => {
  try {
    const farm = new Farm({
      name: "Golden Hill Vegetable Shop",
      city: "El paso, California",
    });

    const searchProduct = await Product.findOne({ name: "Violet Cabbage" });

    farm.products.push(searchProduct);

    // const res = await farm.save();
  } catch (err) {
    console.log(err);
  }
};

const addToFarm = async () => {
  try {
    const farm = await Farm.findOne({ name: "Golden Hill Vegetable Shop" });
    const search = await Product.findOne({ name: "Cucumber" });
    farm.products.push(search);
    farm.save();
    console.log(search);
  } catch (err) {
    console.log(err);
  }
};

//Populate

Farm.findOne({ name: "Golden Hill Vegetable Shop" })
  .populate("products")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
