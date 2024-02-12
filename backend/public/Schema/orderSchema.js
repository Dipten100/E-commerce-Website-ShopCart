import mongoose from "mongoose";

// Structure define in Data base for product
const orderSchema = new mongoose.Schema({
  userId:String,
  product:Array,
  price: String,
  currentProductStatus:String,
  paymentStatus:String,
  paymentMode:String,
  paymentDetails:Object,
  customer: Object,
  activeStatus:Boolean,
  OrderPlaceDate:String,
});
 export default orderSchema