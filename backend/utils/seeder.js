require("dotenv").config({ path: __dirname + "../../config/config.env" });
const connectDatabase = require("../config/database");
const product = require("../models/product");
const products = require("../data/products");

connectDatabase();

const seedProducts = async () => {
  try {
    await product.deleteMany();
    console.log("Products are Deleted");

    await product.insertMany(products);
    console.log("All Products are added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
