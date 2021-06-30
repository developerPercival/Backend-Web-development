const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const PORT = 8000;
const Product = require("./model/product");
const AppError = require("./AppError.js");

const seed = [
  {
    name: "Corn",
    price: 1.5,
    category: "vegetable",
  },

  {
    name: "Sweet potato",
    price: 2.5,
    category: "vegetable",
  },

  {
    name: "Peanut",
    price: 4.5,
    category: "fruit",
  },

  {
    name: "Rice",
    price: 4.5,
    category: "fruit",
  },

  {
    name: "Coconut",
    price: 1.9,
    category: "fruit",
  },
];

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Restful convention

//Get form (sync operation should be on top)
app.get("/product/form", (req, res) => {
  res.render("product/form.ejs");
});

//Get form for updating
app.get("/product/:id/update", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("product/update.ejs", { product });
});

//Create
app.post("/product/create", async (req, res) => {
  const { name, price, category } = req.body;

  const product = {
    name: name,
    price: price,
    category: category,
  };

  const newProduct = Product(product);

  await newProduct.save();

  res.redirect(`/product/${newProduct._id}`);
});

//Read all
app.get("/product", async (req, res) => {
  const products = await Product.find({});
  res.render("product/index.ejs", { products });
});

//Show
app.get("/product/:id", async (req, res, next) => {
  const { id } = req.params;
  const productDetail = await Product.findById(id);
  if (!productDetail) {
    next(new AppError(401, "INCORRECT ID, PLEASE TRY AGAIN!"));
  } else {
    res.render("product/detail.ejs", { productDetail });
  }
});

//Update
app.put("/product/:id", async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.redirect(`/product/${product._id}`);
});

//Delete
app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;

  const deleted = await Product.findByIdAndDelete(id);

  res.redirect("/product");
});

//Error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).send(message);
});

//Start server
app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);

  mongoose
    .connect("mongodb://localhost:27017/farmStand", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongoose connected!");
    })
    .catch(() => {
      console.log("Mongoose failed to connect!");
    });
});
