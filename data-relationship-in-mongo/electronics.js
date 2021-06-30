const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/electronics", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Error");
  });

//Product
const ComputerPartSchema = new mongoose.Schema({
  productName: {
    type: String,
    uppercase: true,
  },
  productType: {
    type: String,
    enum: ["CPU", "Motherboard", "RAM", "GPU"],
  },
});

//Shop
const ElectronicShop = new mongoose.Schema({
  nameOfShop: String,
  city: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `ComputerPartSchema`,
    },
  ],
});

const ComputerPart = mongoose.model("ComputerPart", ComputerPartSchema);
const Shop = mongoose.model("Shop", ElectronicShop);

// ComputerPart.insertMany([
//   {
//     productName: "ryzen 2500",
//     productType: "CPU",
//   },

//   {
//     productName: "msi b450",
//     productType: "Motherboard",
//   },

//   {
//     productName: "Gskill 3400 32gb",
//     productType: "RAM",
//   },
// ]);

const makeShop = async () => {
  const newShop = new Shop({
    nameOfShop: "Amazon Gadget",
    city: "Seattle, Washington USA",
  });

  const ryzen = await ComputerPart.findOne({ productName: "msi b450" });

  newShop.products.push(ryzen);

  const res = await newShop.save();

  console.log(res);
};

makeShop();
