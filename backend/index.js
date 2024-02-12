import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import adminSchema from "./public/Schema/adminSchema.js";
import categorySchema from "./public/Schema/categorySchema.js";
import orderSchema from "./public/Schema/orderSchema.js";
import productSchema from "./public/Schema/productSchema.js";
import userSchema from "./public/Schema/userSchema.js";
import dashboardSchema from "./public/Schema/dashboardSchema.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// mongodeb setup
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(async () => {
    console.log("DB connect");
  })
  .catch((error) => {
    console.log("Error connecting to DB:", error);
  });

// get DashBoard Id

// Model setup
const Admin = new mongoose.model("Admin", adminSchema);
const category = new mongoose.model("category", categorySchema);
const Order = new mongoose.model("Order", orderSchema);
const product = new mongoose.model("product", productSchema);
const User = new mongoose.model("User", userSchema);
const Dashboard = new mongoose.model("Dashboard", dashboardSchema);

// Routes

// check dash board have table or not
let DashBoardId;
const isDashboardHaveTable = async () => {
  const dashboard = await Dashboard.findOne({});
  if (dashboard) {
    DashBoardId = dashboard._id;
    return { message: "dashboard found" };
  } else {
    // create Dashboard
    var newDashBoard = new Dashboard({
      TotalEarnings: 0,
    });
    await newDashBoard.save();
    DashBoardId = newDashBoard._id;

    return { message: "dashboard Create" };
  }
};
// dashboard Setup
app.get("/auth/setup/dashboard", async (req, res) => {
  try {
    const setup = await isDashboardHaveTable();
    // console.log(DashBoardId)
    res.send({ message: setup.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get Dashboard in formation
app.get("/auth/dashboard", async (req, res) => {
  try {
    let dashboard = await Dashboard.findById(DashBoardId);
    if (dashboard) {
      res.send({ message: "Dashboard data receive", dashboard: dashboard });
    } else {
      res.send({ message: "Dashboard data not receive" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Register
app.post("/auth/register", async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  try {
    let user = await Admin.findOne({ email: email });

    if (user) {
      res.send({ message: "User already Registered" });
    } else {
      user = new Admin({
        name,
        email,
        password,
      });

      await user.save();

      // create Dashboard
      // var dashboard = new Dashboard({
      //   TotalEarnings: 0,
      // });
      // await dashboard.save();

      res.send({
        message: "Succcessfully registered",
        message2: "Dashboard create successfully",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// Admin Login
app.post("/auth/login", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  try {
    let user = await Admin.findOne({ email: email });
    if (user) {
      if (password === user.password) {
        res.send({ message: "Successfully log in", user: user });
      } else {
        res.send({ message: "Password didn't matched" });
      }
    } else {
      res.send({ message: "User not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// get Admin details
app.post("/auth/getDetails", async (req, res) => {
  //
  const { _id } = req.body;
  try {
    let customer = await Admin.findOne({ _id });
    if (customer) {
      res.send({ message: "Send user Details", user: customer });
    } else {
      res.send({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// Update Admin Details
app.post("/auth/updateProfile", async (req, res) => {
  const { id, name, email } = req.body;
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.name = name;
    admin.email = email;
    await admin.save();

    res.status(200).json({ message: "Update successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update Admin Password
app.post("/auth/updateAdminPass", async (req, res) => {
  const { id, password } = req.body;
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.password = password;
    await admin.save();

    res.status(200).json({ message: "Password change successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product
app.post("/auth/add/product", async (req, res) => {
  const {
    name,
    price,
    seller,
    Category,
    Sizes,
    Colors,
    coupon,
    description,
    details,
    Features,
    images,
  } = req.body;
  try {
    let pro = new product({
      productName: name,
      productPrice: price,
      productSeller: seller,
      productCategory: Category,
      productSize: Sizes,
      productColor: Colors,
      productCoupon: coupon,
      productDescription: description,
      productDetails: details,
      productFeature: Features,
      productImages: images,
      review: 0,
      reviewList: [],
      sellingAmount: 0,
      Likes: 0,
    });
    await pro.save();
    // Find the category instance in the database
    const categoryInstance = await category.findOne({ categoryName: Category });
    // Update the category with the new product reference
    if (categoryInstance) {
      await categoryInstance.updateOne({ $push: { products: pro._id } });
    }
    res.send({ message: "Product Add Successfully", product: pro });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// Get the product data
app.get("/auth/products", async (req, res) => {
  product
    .find()
    .then((pro) => res.json(pro))
    .catch((error) => res.json(error));
});
// Get the product Details by Id
const getProductDetailsById = async (id) => {
  try {
    const details = await product.findOne({ _id: id });
    if (details) {
      return { message: "Found Data", details: details };
    } else {
      return { message: "Not Found Data" };
    }
  } catch (error) {
    return { message: error.message };
  }
};
// get All products
app.get("/auth/getAllProducts", async (req, res) => {
  product
    .find()
    .then((pro) => res.json(pro))
    .catch((error) => res.json(error));
});
// get some product
app.post("/auth/getProducts", async (req, res) => {
  const pro = req.body;
  const details = [];
  for (let i = 0; i < pro.length; i++) {
    const element = pro[i];
    const data = await getProductDetailsById(element);
    if (data.message === "Found Data") {
      details.push(data.details);
    } else {
      res.send({ message: data.message });
    }
  }
  res.send({ message: "Seccussfully Product Data recieve", details: details });
});
// get product by id
app.get("/auth/get/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await getProductDetailsById(id);
    if (data.message === "Found Data") {
      res.send({
        message: "Seccussfully Product Data recieve",
        details: data.details,
      });
    } else {
      res.send({ message: data.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// update Product Details
app.post("/auth/update/product/:id", async (req, res) => {
  const id = req.params.id;
  const updatedProductData = req.body;
  // console.log(id)
  // console.log(req.body)
  try {
    const productInstance = await product.findById(id);
    if (!productInstance) {
      return res.status(404).json({ message: "Product not found" });
    }

    productInstance.productName = updatedProductData.name;
    productInstance.productPrice = updatedProductData.price;
    productInstance.productSeller = updatedProductData.seller;
    productInstance.productCategory = updatedProductData.Category;
    productInstance.productSize = updatedProductData.Sizes;
    productInstance.productColor = updatedProductData.Colors;
    productInstance.productCoupon = updatedProductData.coupon;
    productInstance.productDescription = updatedProductData.description;
    productInstance.productDetails = updatedProductData.details;
    productInstance.productFeature = updatedProductData.Features;
    productInstance.productImages = updatedProductData.images;

    await productInstance.save();

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct: productInstance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// delete product by Id
app.delete("/auth/delete/product/:id/:categoryName", async (req, res) => {
  const { id, categoryName } = req.params;
  try {
    const categoryInstance = await category.findOne({
      categoryName: categoryName,
    });
    if (!categoryInstance) {
      return res.status(404).json({ message: "Category not found" });
    }
    categoryInstance.products = categoryInstance.products.filter(
      (productId) => productId.toString() !== id
    );
    await categoryInstance.save();
    console.log("delete");
    await product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get Top 5 Selling Products
app.get("/auth/topSellingProducts", async (req, res) => {
  try {
    const topProducts = await product
      .find()
      .sort({ sellingAmount: -1 })
      .limit(5);
    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add Category
app.post("/auth/add/category", async (req, res) => {
  // console.log(req.body)
  const { name, url } = req.body;
  try {
    let cat = new category({
      categoryName: name,
      imageUrl: url,
      products: [],
    });
    await cat.save();
    res.send({ message: "Category Add Successfully", category: cat });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// get all categories
app.get("/auth/getCategory", async (req, res) => {
  category
    .find()
    .then((cat) => res.json(cat))
    .catch((error) => res.json(error));
});
// edit a specific category by id
app.post("/auth/edit/category", async (req, res) => {
  const { id, name, url } = req.body;
  try {
    const cat = await category.findByIdAndUpdate(id, {
      categoryName: name,
      imageUrl: url,
    });
    res.send({ message: "Category Update Successfully", category: cat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// delete a specific category by id
app.delete("/auth/delCat/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Order Details Store
app.post("/auth/add/Order", async (req, res) => {
  const {
    uid,
    cartProducts,
    paymentDetails,
    Price,
    paymentMode,
    selectAddress,
  } = req.body;
  try {
    for (let i = 0; i < cartProducts.length; i++) {
      const element = cartProducts[i];
      const pro = await product.findById(element.id);
      if (pro) {
        const item = pro.sellingAmount;
        pro.sellingAmount = item + element.quantity;
        await pro.save();
      }
    }
    let or;
    const currentDateAndTime = new Date().toISOString();
    if (paymentMode === "Cash on Delivery") {
      or = new Order({
        userId: uid,
        product: cartProducts,
        price: Price,
        currentProductStatus: "Wait for Conformation",
        paymentMode: paymentMode,
        paymentDetails: "Cash on Delivary",
        customer: selectAddress,
        paymentStatus: "Payment Fail",
        activeStatus: true,
        OrderPlaceDate: currentDateAndTime,
      });
    } else {
      or = new Order({
        userId: uid,
        product: cartProducts,
        price: Price,
        currentProductStatus: "Wait for Conformation",
        paymentMode: paymentMode,
        paymentDetails: paymentDetails,
        customer: selectAddress,
        paymentStatus: "Payment Successful",
        activeStatus: true,
        OrderPlaceDate: currentDateAndTime,
      });
    }
    await or.save();
    let customer = await User.findOne({ uid });
    if (customer) {
      await customer.updateOne({ $push: { orderHistory: or._id } });
    } else {
      res.send({ message: "User Not Found" });
    }
    res.send({ message: "Order Placed Successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// get orderDetails by Id
const getOrderDetailsById = async (id) => {
  try {
    const details = await Order.findById(id);
    if (details) {
      return { message: "Found Data", details: details };
    } else {
      return { message: "Not Found Data" };
    }
  } catch (error) {
    return { message: error.message };
  }
};
// Get Order Details
app.get("/auth/getOrderDetails", async (req, res) => {
  Order.find()
    .sort({ OrderPlaceDate: -1 })
    .then((or) => res.json(or))
    .catch((error) => res.json(error));
});
// get all order one by one
app.post("/auth/getAllOrderForUserId", async (req, res) => {
  const order = req.body;
  const result = [];
  for (let i = 0; i < order.length; i++) {
    const element = order[i];
    const data = await getOrderDetailsById(element);
    if (data.message === "Found Data") {
      result.push(data.details);
    } else {
      res.send({ message: data.message });
    }
  }
  res.send({ message: "Seccussfully Order Data recieve", details: result });
});
// get Order Details by Id
app.get("/auth/get/orderDetail/:id", async (req, res) => {
  const { id } = req.params;
  const order = await getOrderDetailsById(id);
  if (order.message === "Found Data") {
    res.status(200).json({ message: "Found Data", result: order.details });
  } else {
    res.status(500).json({ message: order.message });
  }
});
// Update product status in order database
app.post("/auth/update/OrderStatus", async (req, res) => {
  const { oid, value } = req.body;
  try {
    const order = await Order.findById(oid);
    order.currentProductStatus = value;
    order.save();
    res.status(200).json({ message: "Product Status Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/auth/update/PaymentStatus", async (req, res) => {
  const { oid, value } = req.body;
  try {
    const order = await Order.findById(oid);
    order.paymentStatus = value;
    order.save();
    res.status(200).json({ message: "Product Payment Status Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// order Complete
app.post("/auth/OrderCompleted/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await getOrderDetailsById(id);
    if (order.message === "Found Data") {
      const details = order.details;
      details.activeStatus = false;
      details.save();
      let dashboard = await Dashboard.findById(DashBoardId);
      if (!dashboard) {
        await isDashboardHaveTable();
        dashboard = await Dashboard.findById(DashBoardId);
        if (!dashboard) {
          res.status(200).json({ message: "DashBoard not found" });
          return;
        }
      }
      const temp = dashboard.TotalEarnings + Number(details.price);
      dashboard.TotalEarnings = temp;
      dashboard.save();
    } else {
      res.status(200).json({ message: "Data not found" });
    }

    res.status(200).json({ message: "activeStatus feild updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User Register
app.post("/auth/UserRegister", async (req, res) => {
  const { user, inputByUser } = req.body;
  const { provider } = inputByUser;
  const { uid, displayName, email, apiKey, photoURL } = user;
  if (provider === "Google") {
    try {
      let customer = await User.findOne({ email });
      if (customer) {
        res.send({ message: "User already Registered" });
      } else {
        customer = new User({
          uid,
          provider,
          displayName,
          email,
          apiKey,
          photoURL,
        });

        await customer.save();
        res.send({ message: "Succcessfully registered", user: customer });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    const { name, email, password } = inputByUser;
    try {
      let customer = await User.findOne({ email });
      if (customer) {
        res.send({ message: "User already Registered" });
      } else {
        customer = new User({
          uid,
          displayName: name,
          email,
          apiKey,
          photoURL: "noImage",
          password,
          provider,
        });

        await customer.save();
        res.send({ message: "Succcessfully registered", user: customer });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
});
// User Login
app.post("/auth/userLogin", async (req, res) => {
  const { user, inputByUser } = req.body;
  const { uid } = user;
  const { provider } = inputByUser;
  if (provider === "Google") {
    try {
      let customer = await User.findOne({ uid });
      if (customer) {
        res.send({ message: "Log In Successfull", user: customer });
      } else {
        res.send({ message: "Invaild Credential" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    const { email, password } = inputByUser;
    try {
      let customer = await User.findOne({ email });
      if (customer) {
        if (customer.provider === "manual") {
          if (email === customer.email && password === customer.password) {
            res.send({ message: "Log In Successfull", user: customer });
          } else {
            res.send({ message: "Invaild Credential" });
          }
        } else {
          if (email === customer.email) {
            res.send({ message: "Log In Successfull", user: customer });
          } else {
            res.send({ message: "Invaild Credential" });
          }
        }
      } else {
        res.send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
});
app.post("/auth/forgotPassword", async (req, res) => {
  const { email, password } = req.body;
  try {
    let customer = await User.findOne({ email });
    if (!customer) {
      res.send({ message: "User Not Found" });
    } else {
      customer.password = password;
      customer.save();
    }
    res.send({ message: "Password Update Successful" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// get all User details
app.get("/auth/getAllUser", async (req, res) => {
  User.find()
    .then((us) => res.json(us))
    .catch((error) => res.json(error));
});
// get User Details
app.post("/auth/getUserDetails", async (req, res) => {
  const { _id } = req.body;
  try {
    let customer = await User.findById({ _id });
    if (customer) {
      res.send({ message: "Send user Details", user: customer });
    } else {
      res.send({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// change User Password
app.post("/auth/userPasswordUpdate", async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.send({ message: "User Not Found" });
    }
    user.password = password;
    await user.save();
    res.send({ message: "Profile Password Updated Successfully", data: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// update User Profile
app.post("/auth/userDataUpdate", async (req, res) => {
  const { id, displayName, email, photoURL } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.send({ message: "User Not Found" });
    }
    user.displayName = displayName;
    user.email = email;
    user.photoURL = photoURL;
    await user.save();
    res.send({ message: "Profile Updated Successfully", data: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// Add Review in a product
app.post("/auth/add/review", async (req, res) => {
  const { productId, userId, imgUrl, imgAlt, name, email, rating, comment } =
    req.body;
  try {
    const data = await product.findOne({ _id: productId });
    if (data) {
      const currentDateAndTime = new Date().toISOString();
      const rev = {
        userId,
        imgUrl,
        imgAlt,
        name,
        email,
        currentDateAndTime,
        rating,
        comment,
      };
      const num1 = Number(rating);
      const { review } = data;
      const num2 = review + num1;

      await data.updateOne({ $push: { reviewList: rev }, review: num2 });
      res.send({ message: "Review added successfully" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
const removeLikeProductId = async (userId, productId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { message: "User not found" };
    }

    // Remove the product from the user's likeProduct array
    user.likeProduct = user.likeProduct.filter(
      (product) => product._id !== productId
    );

    await user.save();

    const prod = await product.findById(productId);
    if (!prod) {
      res.send({ message: "Product Not Found" });
    }
    prod.Likes = prod.Likes - 1;
    prod.save();

    return { message: "Product removed from likes" };
  } catch (error) {
    return { message: error.message };
  }
};
// add Like or remove like in User
app.post("/auth/add/Like/:userId/:productId", async (req, res) => {
  let userId = req.params.userId;
  let productId = req.params.productId;
  try {
    // find user by id
    const user = await User.findById(userId);
    if (!user) {
      res.send({ message: "User Not Found" });
    }
    // find product by id
    const prod = await product.findById(productId);
    if (!prod) {
      res.send({ message: "Product Not Found" });
    }

    // check whether the user has already liked this product or not
    for (let i = 0; i < user.likeProduct.length; i++) {
      if (user.likeProduct[i]._id === productId) {
        // remove productLikeCount in product database
        prod.Likes = prod.Likes - 1;
        const result = await removeLikeProductId(userId, productId);
        // res.status(200).send({ message: "Product allready likes"});
        if (result.message === "Product removed from likes") {
          res.status(200).send({ message: "Product removed from likes" });
        } else {
          res.send({ message: result.message });
        }
        return;
      }
    }
    user.likeProduct.push({ _id: productId });
    await user.save();

    // add productLikeCount in product database
    prod.Likes = prod.Likes + 1;
    await prod.save();

    res.status(200).json({ message: "Product added to likes" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// store user address in a particular user id
app.post("/auth/storeAddress/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      await user.updateOne({ $push: { Addresses: req.body } });
    }
    res.send({ message: "Address add successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get Categories
app.get("/auth/getCategories", async (req, res) => {
  category
    .find()
    .then((cat) => res.json(cat))
    .catch((error) => res.json(error));
});

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
