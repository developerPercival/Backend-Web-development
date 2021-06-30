const express = require("express");
const router = express.Router();

router.get("/products", (req, res) => {
  try {
    res.json({
      msg: "Get all products.",
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/products/:id", (req, res) => {
  try {
    res.json({
      msg: "Get one product.",
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/products/:id/new", (req, res) => {
  try {
    res.json({
      msg: "Creating new product.",
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/product/:id/delete", (req, res) => {
  try {
    res.json({
      msg: "Delete product",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
