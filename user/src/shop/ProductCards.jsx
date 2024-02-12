import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ratting from "../components/Ratting";
import axios from "axios";
import { AllContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";
import "../shop/ProductCards.css"

const notifyError = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
const notifyMsg = (msg) => {
  toast(msg, {
    position: toast.POSITION.TOP_CENTER,
  });
};
const notifySuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const ProductCards = ({ GridList, Products }) => {
  const {User}=useContext(AllContext)
  const [UserDetails, setUserDetails] = useState()

  useEffect(()=>{
    setUserDetails(User)
  },[User])

  const FindLikeOrNot=(id)=>{
    if(UserDetails?.likeProduct){
      for (let i = 0; i < UserDetails?.likeProduct.length; i++) {
        const element = UserDetails?.likeProduct[i];
        if(element._id===id){
          return true
        }
      }
      return false
    }
  }

  const handleLike=(id)=>{
    if(User || UserDetails){
      axios.post("http://localhost:9002/auth/add/Like/"+UserDetails._id+"/"+id).then((res)=>{
        console.log(res)
        if(res.data.message==="Product added to likes"){
          notifySuccess(res.data.message)
        }else if(res.data.message==="Product removed from likes"){
          notifySuccess(res.data.message)
        }else{
          notifyError(res.data.message)
        }
      }).catch((error)=>console.log(error))
    }else{
      notifyError("Please Login First to like the product")
    }
  }

  return (
    <div
      className={`shop-product-wrap row justify-content-center ${
        GridList ? "grid" : "list"
      }`}
    >
      {Products.map((product, i) => (
        <div key={i} className="col-lg-4 col-md-6 col-12">
          <div className="product-item">
            {/* product images */}
            <div className="product-thumb">
              <div className="pro-thumb">
                <img src={product.productImages} alt="" />
              </div>

              {/* product action links */}
              <div className="product-action-link">
                <Link to={`/shop/${product._id}`}><i className="icofont-eye"></i></Link>
                <a href="#"><i className={`icofont-heart ${FindLikeOrNot(product._id) ? "color-red" : ""}`} onClick={()=>handleLike(product._id)}></i></a>
              </div>
            </div>

            {/* product content */}
            <div className="product-content">
              <h5>
                <Link to={`/shop/${product._id}`}>{product.productName}</Link>
              </h5>
              <p className="productRating">
                <Ratting/>{product.review/product.reviewList.length} ({product.reviewList.length})
              </p>
              <h6><i className="icofont-rupee"></i> {product.productPrice}</h6>
            </div>
          </div>

          {/* list style */}
          <div className="product-list-item">
            {/* product images */}
            <div className="product-thumb">
              <div className="pro-thumb">
                <img src={product.productImages} alt="" />
              </div>

              {/* product action links */}
              <div className="product-action-link">
                <Link to={`/shop/${product._id}`}><i className="icofont-eye"></i></Link>
                <a href="#"><i className={`icofont-heart ${FindLikeOrNot(product._id) ? "color-red" : ""}`} onClick={()=>handleLike(product._id)}></i></a>
                {/* <Link to="/cart-page"><i className="icofont-cart-alt"></i></Link> */}
              </div>
            </div>

            {/* product content */}
            <div className="product-content">
              <h5>
                <Link to={`/shop/${product.id}`}>{product.productName}</Link>
              </h5>
              <p className="productRating">
                <Ratting/>{product.review/product.reviewList.length} ({product.reviewList.length})
              </p>
              <h6><i className="icofont-rupee"></i> {product.productPrice}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
