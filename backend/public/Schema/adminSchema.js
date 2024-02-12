 import mongoose from "mongoose";

 // mongoDb schema for admin register and login
 const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });
  export default adminSchema