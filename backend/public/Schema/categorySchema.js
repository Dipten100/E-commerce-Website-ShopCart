import mongoose from "mongoose";

// Structure define in Data base for product
const categorySchema = new mongoose.Schema({
    categoryName: String,
    imageUrl: String,
    products: Array,
  });
  export default categorySchema