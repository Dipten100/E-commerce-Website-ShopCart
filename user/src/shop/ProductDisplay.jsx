import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AllContext } from "../contexts/ContextProvider";
import axios from "axios";

const notifyError = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
const notifySuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const ProductDisplay = () => {
  const [Product, setProduct] = useState([]);
  const [preQuantity, setQuantity] = useState(1);
  const [Coupon, setCoupon] = useState("");
  const [Size, setSize] = useState("Select Size");
  const [Color, setColor] = useState("Select Color");

  const { setCartProducts } = useContext(AllContext);
  const { id } = useParams();
  useEffect(()=>{
    axios.get("http://localhost:9002/auth/products").then((res)=>{
      setProduct(res.data)
    }).catch((error)=>console.log(error))
  },[Product])

  const result = Product.filter((p) => p._id === id);
  const {
    productName,
    _id,
    productPrice,
    productSeller,
    productDescription,
    productCategory,
    productSize,
    productColor,
    review,
    reviewList,
    productImages,
    Likes
  } = result[0]||{};
  const avgReview=(review)/(reviewList?.length)


  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const handleDecrease = () => {
    if (preQuantity > 1) {
      setQuantity(preQuantity - 1);
    }
  };
  const handleIncrease = () => {
    if (preQuantity < 10) {
      setQuantity(preQuantity + 1);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if(productCategory==="Earphones"){
      const product = {
        id: _id,
        img: productImages,
        name: productName,
        price: productPrice,
        quantity: preQuantity,
        Size: Size,
        Color: Color,
        Coupon: Coupon,
      };
  
      // add to cart
      setCartProducts((prev) => [...prev, product]);
      notifySuccess("Item add in cart Successfully")
    }else{
      if(Size==="Select Size"){
        notifyError("Please Select a Size")
      }else{
        if(Color==="Select Color"){
          notifyError("Please Select a Color")
        }else{
          const product = {
            id: _id,
            img: productImages,
            name: productName,
            price: productPrice,
            quantity: preQuantity,
            Size: Size,
            Color: Color,
            Coupon: Coupon,
          };
      
          // add to cart
          setCartProducts((prev) => [...prev, product]);
          notifySuccess("Item add in cart Successfully")
        }
      }
    }
    // const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    // var flag = 0;
    // if (product.Size === "Select Size" || product.Color === "Select Color") {
    //   flag = 0;
    // } else {
    //   const existingProductIndex = existingCart.findIndex(
    //     (item) => item.id === id
    //   );
    //   if (existingProductIndex !== -1) {
    //     const proSize = existingCart[existingProductIndex].Size;
    //     const proColor = existingCart[existingProductIndex].Color;

    //     if (proSize === Size && proColor === Color) {
    //       existingCart[existingProductIndex].quantity = preQuantity;
    //       flag = 2;
    //     } else {
    //       existingCart.push(product);
    //       flag = 1;
    //     }
    //   } else {
    //     existingCart.push(product);
    //     flag = 1;
    //   }
    // }
    // if(flag===0){
    //   notifyError("Please Select Size & Color")
    // }else if(flag===1){
    //   notifySuccess("Add item in Cart Successfully")
    // }else{
    //   notifySuccess(`Update Quantity ${product.quantity} Successfully`)
    // }

    // // update local storage
    // localStorage.setItem("cart", JSON.stringify(existingCart));

    // reset form fields
    
    setQuantity(1);
    setSize("Select Size");
    setColor("Select Color");
    setCoupon("");
  };
// <i className={`icofont-heart color-red`}></i>
  return (
    <div>
      <div>
        <h4>{productName} (<img src="/src/assets/images/Likes/heart-flat-icon.png" className="like-img" alt="" />{Likes} Likes)</h4>
        <p className="rating">
          <i class="icofont-star"></i>
          <i class="icofont-star"></i>
          <i class="icofont-star"></i>
          <i class="icofont-star"></i>
          <i class="icofont-star"></i>
          <span>{avgReview} reviews</span>
        </p>
        <h4><i className="icofont-rupee"></i> {productPrice}</h4>
        <h6>{productSeller}</h6>
        <p>{productDescription}</p>
      </div>

      {/* cart components */}
      <div>
        <form onSubmit={handleSubmit}>
          {/* size */}
          <div className="select-product size">
            <select name="" id="" value={Size} onChange={handleSizeChange}>
              <option value={"Select Size"}>Select Size</option>
              {productSize &&
                productSize.map((item, index) => (
                  <option key={index} value={item.size}>
                    {item.size}
                  </option>
                ))}
            </select>
            <i className="icofont-rounded-down"></i>
          </div>

          {/* color */}
          <div className="select-product size">
            <select name="" id="" value={Color} onChange={handleColorChange}>
              <option value={"Select Color"}>Select Color</option>
              {
                productColor && productColor.map((item, index)=>(
                  <option key={index} value={item.color}>{item.color}</option>
                ))
              }
            </select>
            <i className="icofont-rounded-down"></i>
          </div>

          {/* cart number increase and decrease */}
          <div className="cart-plus-minus">
            <div className="dec qtybutton" onClick={handleDecrease}>
              -
            </div>
            <input
              className="cart-plus-minus-box"
              type="text"
              name="qtybutton"
              value={preQuantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
            <div className="inc qtybutton" onClick={handleIncrease}>
              +
            </div>
          </div>

          {/* coupon feild */}
          <div className="discount-code mb-2">
            <input
              type="text"
              placeholder="Enter Discount Code"
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div>

          {/* Button Section */}
          <button type="submit" className="lab-btn">
            <span>Add to Cart</span>
          </button>
          <Link to="/cart-page" className="lab-btn bg-primary">
            <span>Check Out</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ProductDisplay;
