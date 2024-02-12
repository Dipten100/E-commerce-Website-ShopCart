import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import delImgUrl from "../assets/images/shop/del.png";
import "/src/assets/css/onlyAddressPage.css";
import CheckOutPage from "./CheckOutPage";
import { toast } from "react-toastify";
import { AllContext } from "../contexts/ContextProvider";
import axios from "axios";

const notifySuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
const notifyError = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const CartPage = () => {
  const [CartItems, setCartItems] = useState([]);
  const {
    cartProducts,
    setPrice,
    User,
    selectAddress,
    setSelectAddress,
    setCartProducts,
  } = useContext(AllContext);
  const [SelectAddressIndex, setSelectAddressIndex] = useState(-1);
  const [Address, setAddress] = useState({
    country: "",
    state: "",
    pinCode: "",
    name: "",
    mobile: "",
    address: "",
    landmarks: "",
  });
  const { _id, uid, Addresses } = User || {};

  //   calculate prices
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
  // cart subtotal
  const cartSubTotal = CartItems.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // order Total
  const orderTotal = cartSubTotal;

  // shiping charge
  const shippingCharge = 0.0;

  useEffect(() => {
    setCartItems(cartProducts);
    if (SelectAddressIndex >= 0) {
      setSelectAddress(Addresses[SelectAddressIndex]);
    }else{
      setSelectAddress(null)
    }
    setPrice(orderTotal);
  });

  //   handle quantity increase
  const handleIncrease = (item) => {
    if (item.quantity < 10) {
      item.quantity += 1;
      setCartItems([...CartItems]);

      // update localstorage with new cart items
      // localStorage.setItem("cart", JSON.stringify(CartItems));
    } else {
      // error section when can't be increase
    }
  };
  //   handle quantity decrease
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems([...CartItems]);

      // update localstorage with new cart items
      // localStorage.setItem("cart", JSON.stringify(CartItems));
    } else {
      // error section when can't be decrease
    }
  };

  //   handle item remove

  const handleRemoveItem = (item) => {
    const updatedCart = CartItems.filter((cartItem) => {
      return !(
        cartItem.id === item.id &&
        cartItem.Color === item.Color &&
        cartItem.Size === item.Size
      );
    });
    // update new cart
    setCartItems(updatedCart);
    setCartProducts(updatedCart);

    // updateLocalStorage(updatedCart);

    notifySuccess("Item deleted Successfully");
  };

  // const updateLocalStorage = (cart) => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };

  // handle item remove
  const handleSubmitAddress = (e) => {
    e.preventDefault();
    const { country, state, pinCode, name, mobile, address, landmarks } =
      Address;
    if (
      !country ||
      !state ||
      !pinCode ||
      !name ||
      !mobile ||
      !address ||
      !landmarks
    ) {
      notifyError("Please fill all the feild before add address");
    } else {
      if (User) {
        axios
          .post("http://localhost:9002/auth/storeAddress/" + _id, Address)
          .then((res) => {
            if (res.data.message === "Address add successfully") {
              notifySuccess(res.data.message);
            } else {
              notifyError(res.data.message);
            }
          })
          .catch((error) => console.log(error));
      } else {
        notifyError("Please Login First");
      }
    }
  };

  return (
    <div>
      <PageHeader title={"Shop Cart"} curPage={"Cart Page"} />

      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* cart top */}
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-price">Price</th>
                    <th className="cat-quantity">Quantity</th>
                    <th className="cat-toprice">Total</th>
                    <th className="cat-edit">Edit</th>
                  </tr>
                </thead>

                {/* table body */}
                <tbody>
                  {CartItems.map((item, indx) => (
                    <tr key={indx}>
                      <td className="product-item cat-product">
                        <div className="p-thumb">
                          <Link to="/shop">
                            <img src={item.img} alt="" />
                          </Link>
                        </div>
                        <div className="p-content">
                          <Link to="/shop">{item.name}</Link>
                          <p>
                            <b>Color:</b> {item.Color} <b>Size:</b> {item.Size}
                          </p>
                        </div>
                      </td>
                      <td className="cat-price">
                        <i className="icofont-rupee"></i> {item.price}
                      </td>
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <div
                            className="dec qtybutton"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </div>
                          <input
                            type="text"
                            className="cart-plus-minus-box"
                            name="qtybutton"
                            value={item.quantity}
                          />
                          <div
                            className="inc qtybutton"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td className="cat-toprice">
                        <i className="icofont-rupee"></i>
                        {calculateTotalPrice(item)}
                      </td>
                      <td className="cat-edit">
                        <a href="#" onClick={() => handleRemoveItem(item)}>
                          <img src={delImgUrl} alt="" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* cart top end */}
            {/* cart button */}
            <div className="cart-bottom">
              {/* checkout box */}
              <div className="cart-checkout-box">
                <form className="coupon">
                  <input
                    type="text"
                    className="cart-page-input-text"
                    name="coupon"
                    id="coupon"
                    placeholder="Coupon code......"
                  />
                  <input type="submit" value="Apply Coupon" />
                </form>

                <form action="" className="cart-checkout">
                  <input type="submit" value="Update Cart" />
                  <div>
                    <CheckOutPage />
                  </div>
                </form>
              </div>

              {/* checkout box end */}

              {/* shopping box */}
              <div className="shiping-box">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="calculate-shiping">
                      <h3>Pick up from save Address *</h3>
                      {
                        Addresses && Addresses.map((item,i)=>(
                          <div key={i} className={`show-address ${SelectAddressIndex===i ? "on-select" : ""}`} onClick={()=>setSelectAddressIndex(i)}>
                            <p>Name: <span>{item.name}</span></p>
                            <p>Mobile: <span>{item.mobile}</span></p>
                            <p>Address: <span>{item.address}</span></p>
                            <p>Pincode: <span>{item.pinCode}</span></p>
                            <p>Landmarks: <span>{item.landmarks}</span></p>
                            <p>State: <span>{item.state}</span></p>
                            <p>Country: <span>{item.country}</span></p>
                          </div>
                        ))
                      }
                      {/* <div className="outline-select">
                        <select
                          onChange={(e) =>
                            setSelectAddressIndex(e.target.value)
                          }
                        >
                          <option value={-1}>Select Address</option>
                          {Addresses &&
                            Addresses.map((item, i) => (
                              <option key={i} value={i}>
                                Name:{item.name} <br />
                                Mobile:{item.mobile}
                                Address:{item.address}; Near {item.landmarks};
                                PinCode {item.pinCode}; {item.state};{" "}
                                {item.country}
                              </option>
                            ))}
                        </select>
                        <span className="select-icon">
                          <i className="icofont-rounded-down"></i>
                        </span>
                      </div> */}
                      <form onSubmit={handleSubmitAddress}>
                        <h3>Add new Address</h3>
                        <div className="outline-select shipping-select">
                          <select
                            onChange={(e) =>
                              setAddress({
                                ...Address,
                                country: e.target.value,
                              })
                            }
                          >
                            <option value="Select Country *">
                              Select Country *
                            </option>
                            <option value="India">India</option>
                          </select>
                          <span className="select-icon">
                            <i className="icofont-rounded-down"></i>
                          </span>
                        </div>
                        <div className="outline-select shipping-select">
                          <select
                            onChange={(e) =>
                              setAddress({ ...Address, state: e.target.value })
                            }
                          >
                            <option value="Select State/Region *">
                              Select State/Region *
                            </option>
                            <option value="Westbengal">Westbengal</option>
                            <option value="Delhi">Delhi</option>
                          </select>
                          <span className="select-icon">
                            <i className="icofont-rounded-down"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          placeholder="6 digits [0-9] PIN code *"
                          className="a-input-text address-ui-widgets-desktop-form-field-full-width"
                          onChange={(e) =>
                            setAddress({ ...Address, pinCode: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter Your Name *"
                          className="a-input-text address-ui-widgets-desktop-form-field-full-width"
                          onChange={(e) =>
                            setAddress({ ...Address, name: e.target.value })
                          }
                        />
                        <input
                          type="number"
                          name="mobile"
                          id="mobile"
                          placeholder="Enter Your Mobile Number *"
                          className="a-input-text address-ui-widgets-desktop-form-field-full-width"
                          onChange={(e) =>
                            setAddress({ ...Address, mobile: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Enter Delivered Address *"
                          className="a-input-text address-ui-widgets-desktop-form-field-full-width"
                          onChange={(e) =>
                            setAddress({ ...Address, address: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          name="landMark"
                          id="landMark"
                          placeholder="LandMarks(E.g. near apollo Hospital)"
                          className="a-input-text address-ui-widgets-desktop-form-field-full-width"
                          onChange={(e) =>
                            setAddress({
                              ...Address,
                              landmarks: e.target.value,
                            })
                          }
                        />
                        <button type="submit" className="lab-btn">
                          Add this Address
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="cart-overview">
                      <h3>Cart Totals</h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left"> Cart Subtotal</span>
                          <p className="pull-right">
                            <i className="icofont-rupee"></i> {cartSubTotal}
                          </p>
                        </li>
                        <li>
                          <span className="pull-left">
                            Shipping and Handling
                          </span>
                          <p className="pull-right">
                            <i className="icofont-rupee"></i> {shippingCharge}
                          </p>
                        </li>
                        <li>
                          <span className="pull-left">Order Total</span>
                          <p className="pull-right">
                            <i className="icofont-rupee"></i>{" "}
                            {orderTotal.toFixed(2)}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
