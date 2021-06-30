const express = require("express");
const path = require("path");
const methoOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const Product = require("./model/model");
const FarmShop = require("./model/model1");

//Middleware
app.use(methoOverride("_method"));
app.use(express.urlencoded({ extended: true }));

//Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//FARM

//Get all farms
app.get("/farm", async (req, res) => {
  try {
    const farms = await FarmShop.find({});

    res.render("farm/farm.ejs", { farms });
  } catch (err) {}
});

//Get new farm page
app.get("/farm/new", (req, res) => {
  res.render("farm/newFarm.ejs");
});

//Create new farm
app.post("/farm/create", async (req, res) => {
  try {
    const { farm } = req.body;

    const newFarm = await new FarmShop(farm);

    await newFarm.save();

    res.redirect("/farm");
  } catch (err) {
    console.log(err);
  }
});

//Show detail of farm
app.get("/farm/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const farm = await FarmShop.findById(id).populate("products");

    const { products } = farm;

    res.render("farm/show.ejs", { farm, products });
  } catch (err) {
    console.log(err);
  }
});

//PRODUCTS

//Read all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});

    res.render("components/products.ejs", { products });
  } catch (err) {
    console.log(err);
  }
});

//Read new page
app.get("/products/new", (req, res) => {
  res.render("components/new.ejs");
});

//Read one product
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    res.render("components/show.ejs", { product });
  } catch (err) {}
});

//Create new product
app.post("/products", async (req, res) => {
  try {
    const { product } = req.body;

    const newProduct = new Product(product);

    console.log(newProduct);

    await newProduct.save();

    res.redirect("/products");
  } catch (err) {
    console.log(err);
  }
});

//Read update page
app.get("/products/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    res.render("components/update.ejs", { product });
  } catch (err) {}
});

//Update one product
app.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { product } = req.body;

    const response = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    res.redirect(`/products/${response._id}`);
  } catch (err) {
    console.log(err);
  }
});

//Delete one product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Product.findByIdAndDelete(id);

    res.redirect("/products");
  } catch (err) {
    console.log(err);
  }
});

//ADD PRODUCTS TO FARM

//Get product page form
app.get("/farm/:id/product/new", async (req, res) => {
  try {
    const { id } = req.params;

    const farm = await FarmShop.findById(id);

    const { name } = farm;

    res.render("components/new.ejs", { id, name });
  } catch (err) {
    console.log(err);
  }
});

// Add product to farm
app.post("/farm/:id/product", async (req, res) => {
  try {
    const { id } = req.params;
    const { product } = req.body;

    const farm = await FarmShop.findById(id);
    const newProduct = new Product(product);

    farm.products.push(newProduct);
    newProduct.farm.push(farm);

    await farm.save();
    await newProduct.save();

    res.redirect(`/farm/${farm._id}`);
  } catch (err) {
    console.log(err);
  }
});

//Delete farm and it's products
app.delete("/farm/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await FarmShop.findByIdAndDelete(id);

    res.redirect("/farm");
  } catch (err) {
    console.log(err);
  }
});

//Start server
app.listen(3000, () => {
  //console test
  console.log("Server connected in port: 3000");

  //Start up mongodb with mongoose
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
});

//Add some data relationship to this CRUD App
