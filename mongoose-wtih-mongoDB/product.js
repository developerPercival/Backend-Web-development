const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/productList", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("SUCCESSFULLY CONNECTED TO DATABASE!");
  })
  .catch((error) => {
    console.log(`Something went wrong. Erro: ${error}`);
  });

//Schema with validation and option
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 10,
  },
  price: {
    type: Number,
    required: true,
    default: 1,
    min: 2,
    max: 10,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: false,
  },

  typesOfProduct: {
    type: [String],
    default: ["Agricultural", "Seasonal Harvest"],
  },

  characteristic: {
    typeOfVegetable: {
      type: String,
      default: "Legume",
    },

    typeOfSeason: {
      type: String,
      default: "Summer",
    },
  },
});

const Product = mongoose.model("Product", productSchema);

const apple = new Product({
  name: "Apple",
  price: 3,
  isAvailable: true,
  typesOfProduct: ["Fruits", "Yearly Harvest"],
  characteristic: {
    typeOfVegetable: "Tree fruit",
    typeOfSeason: "Autumn",
  },
});

apple
  .save()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
