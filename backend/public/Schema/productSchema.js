import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    productSeller: String,
    productCategory: String,
    productSize: Array,
    productColor: Array,
    productCoupon: String,
    productDescription: String,
    productDetails: String,
    productFeature: Array,
    productImages: String,
    review: Number,
    reviewList:Array,
    sellingAmount:Number,
    Likes:Number,
  });

  export default productSchema