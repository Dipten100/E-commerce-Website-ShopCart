import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const reviews = 1000;

const notifyMsg = (msg) => {
  toast(msg, {
    position: toast.POSITION.TOP_CENTER,
  });
};

const ProductDisplay = ({ item }) => {
  const {
    productName = "",
    productPrice,
    productSeller,
    productDescription,
    productColor,
    productSize,
    productCoupon,
  } = item;

  const handleClick = (e) => {
    e.preventDefault();
    notifyMsg("This is how look like in User Page");
  };

  return (
    <div>
      <div>
        <h4>{productName}</h4>
        <p className="rating">
          <i class="icofont-star"></i>
          <i class="icofont-star"></i>
          <i class="icofont-star"></i>
          <i class="icofont-star"></i>
          <i class="icofont-star"></i>
          <span>{reviews}</span>
        </p>
        <h4><i className="icofont-rupee"></i> {productPrice}</h4>
        <h4>{productSeller}(Seller name)</h4>
        <h4>{productDescription}(Description)</h4>
      </div>
      <div>
        <form action="#">
          <div className="select-product size">
            <select name="size" id="size">
              {productSize &&
                productSize.map((item, index) => (
                  <option key={index} value={item.size}>
                    {item.size}
                  </option>
                ))}
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <div className="select-product size">
            <select name="color" id="color">
              {productColor &&
                productColor.map((item, index) => (
                  <option key={index} value={item.color}>
                    {item.color}
                  </option>
                ))}
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <div className="cart-plus-minus"></div>
          <div className="discount-code mb-2">
            <h4>{productCoupon}(coupon code)</h4>
          </div>

          {/* Button Section */}
          <button type="submit" className="lab-btn" onClick={handleClick}>
            <span>Add to Cart</span>
          </button>
          <Link to="" className="lab-btn bg-primary" onClick={handleClick}>
            <span>Check Out</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ProductDisplay;
