import React, { useEffect, useState } from "react";
import PageHeader from "../Components/PageHeader";
import "../Order/order.css";
import axios from "axios";
import ProductDetails from "./ProductDetails";
import CustomerDetails from "./CustomerDetails";
import { toast } from "react-toastify";

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
const notifyMsg = (msg) =>
  toast(msg, {
    position: toast.POSITION.TOP_CENTER,
  });

const OrderList = () => {
  const [OrderDetails, setOrderDetails] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9002/auth/getOrderDetails")
      .then((res) => {
        setOrderDetails(res.data);
      })
      .catch((error) => console.log(error));
    // checkOrderComplete()
  });

  const checkOrderComplete = async (_id) => {
    await axios
      .post("http://localhost:9002/auth/OrderCompleted/" + _id)
      .then((res) => {
        if (res.data.message === "activeStatus feild updated") {
          notifySuccess("Order Completed");
        } else {
          notifyError(res.data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  // Product status Update
  const handleProductStatus = async (i, value) => {
    const oid = OrderDetails[i]._id;
    await axios
      .post("http://localhost:9002/auth/update/OrderStatus", { oid, value })
      .then((res) => {
        if (res.data.message === "Product Status Updated") {
          notifySuccess(res.data.message);
        } else {
          notifyError(res.data.message);
        }
      })
      .catch((error) => console.log(error));
    if (
      value === "Delevered" &&
      OrderDetails[i].paymentStatus === "Payment Successful"
    ) {
      await checkOrderComplete(oid);
    }
  };

  // payment status update
  const handlePaymentStatus = async (i, value) => {
    const oid = OrderDetails[i]._id;
    await axios
      .post("http://localhost:9002/auth/update/PaymentStatus", { oid, value })
      .then((res) => {
        if (res.data.message === "Product Payment Status Updated") {
          notifySuccess(res.data.message);
        } else {
          notifyError(res.data.message);
        }
      })
      .catch((error) => console.log(error));
    if (
      value === "Payment Successful" &&
      OrderDetails[i].currentProductStatus === "Delevered"
    ) {
      await checkOrderComplete(oid);
    }
  };

  return (
    <div>
      <PageHeader title={"Customer Order List"} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* table top */}
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-productName">Product Details</th>
                    <th className="cat-currentProductStatus">
                      Current Product Status
                    </th>
                    <th className="cat-completeProductPrice">
                      Complete Product Price
                    </th>
                    <th className="cat-paymentStatus">Payment Status</th>
                    <th className="cat-userDetails">User Details</th>
                  </tr>
                </thead>

                {/* table body */}
                <tbody>
                  {OrderDetails.map(
                    (item, i) =>
                      item.activeStatus && (
                        <tr key={i}>
                          <td>
                            <ProductDetails product={item.product} />
                          </td>
                          <td>
                            <select
                              value={item.currentProductStatus}
                              onChange={(e) =>
                                handleProductStatus(i, e.target.value)
                              }
                              className={`select ${
                                item.currentProductStatus === "Delevered"
                                  ? "successsful"
                                  : ""
                              } ${
                                item.currentProductStatus === "Order Rejected"
                                  ? "fail"
                                  : ""
                              }`}
                            >
                              <option
                                value="Wait for Conformation"
                                className="option"
                              >
                                Wait for Conformation
                              </option>
                              <option value="Order Confrim" className="option">
                                Order Confrim
                              </option>
                              <option
                                value="Out for Delevery"
                                className="option"
                              >
                                Out for Delevery
                              </option>
                              <option value="Delevered" className="option">
                                Delevered
                              </option>
                              <option value="Order Rejected" className="option">
                                Order Rejected
                              </option>
                            </select>
                          </td>
                          <td><i className="icofont-rupee"></i> {item.price}</td>
                          <td>
                            <select
                              value={item.paymentStatus}
                              onChange={(e) =>
                                handlePaymentStatus(i, e.target.value)
                              }
                              className={`select ${
                                item.paymentStatus === "Payment Successful"
                                  ? "successsful"
                                  : "fail"
                              }`}
                            >
                              <option value="Payment Fail">Payment Fail</option>
                              <option value="Payment Successful">
                                Payment Successful
                              </option>
                            </select>
                          </td>
                          <td>
                            <CustomerDetails Customer={item.customer} />
                            {item.currentProductStatus ===
                            "Wait for Conformation" ? (
                              <p className="color-red">New</p>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
