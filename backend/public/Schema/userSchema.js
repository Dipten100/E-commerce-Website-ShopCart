import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: String,
  provider: String,
  photoURL: String,
  displayName: String,
  email: String,
  password: String,
  apiKey: String,
  Addresses:Array,
  orderHistory:Array,
  likeProduct:Array,
});
export default userSchema
