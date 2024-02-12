import React, { useContext, useEffect, useState } from "react";
import { AllContext } from "../contexts/ContextProvider";
import { useParams } from "react-router-dom";

import "./PerticularOrderPage.css";
import axios from "axios";

const PerticularOrderPage = () => {
  const { User } = useContext(AllContext);
  const { id } = useParams();
  const [OrederDetails, setOrederDetails] = useState();
  const [ProductDetails, setProductDetails] = useState([]);
  const [DeliveryAddress, setDeliveryAddress] = useState();
  const [CurrentProductStatus, setCurrentProductStatus] = useState("");
  const [Active, setActive] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:9002/auth/get/orderDetail/" + id)
      .then((res) => {
        if (res.data.message === "Found Data") {
          const order = res.data.result;
          setOrederDetails(order);
          setCurrentProductStatus(order.currentProductStatus);
          if (order.product && Array.isArray(order.product)) {
            setProductDetails(order.product);
            setDeliveryAddress(order.customer);
          } else {
            setProductDetails([]);
            setDeliveryAddress({});
          }
        } else {
          console.log(res.data.message);
          setOrederDetails(null);
          setProductDetails([]);
          setDeliveryAddress({});
          setCurrentProductStatus("");
        }
      });
    if (CurrentProductStatus === "Order Confrim") {
      setActive(2);
    } else if (CurrentProductStatus === "Out for Delevery") {
      setActive(3);
    } else if (CurrentProductStatus === "Delevered") {
      setActive(4);
    } else if (CurrentProductStatus === "Wait for Conformation") {
      setActive(1);
    } else {
      setActive(0);
    }
  }, [User, id]);

  return (
    <div className="particularPage">
      <div className="perticularPage-container">
        <header>
          <p>
            Order Id <span className="C-B-B">#{id}</span>
          </p>
        </header>
        <div className="progressBar">
          <div className="step">
            <p className={`${Active === 0 ? "active" : ""}`}>
              <i className="icofont-sand-clock icon"></i>
              <br />
              Order <br />
              Rejected
            </p>
            <div className={`bullet ${Active === 0 ? "active" : ""}`}>
              <span>0</span>
            </div>
            <i
              className={`icofont-not-allowed check ${
                Active === 0 ? "active" : ""
              }`}
            ></i>
          </div>
          <div className="step">
            <p className={`${Active >= 1 ? "active" : ""}`}>
              <i className="icofont-sand-clock icon"></i>
              <br />
              Wait for <br />
              Conformation
            </p>
            <div className={`bullet ${Active >= 1 ? "active" : ""}`}>
              <span>1</span>
            </div>
            <i
              className={`icofont-verification-check check ${
                Active >= 1 ? "active" : ""
              }`}
            ></i>
          </div>
          <div className="step">
            <p className={`${Active >= 2 ? "active" : ""}`}>
              <i className="icofont-list icon"></i>
              <br />
              Order <br />
              Conform
            </p>
            <div className={`bullet ${Active >= 2 ? "active" : ""}`}>
              <span>2</span>
            </div>
            <i
              className={`icofont-verification-check check ${
                Active >= 2 ? "active" : ""
              }`}
            ></i>
          </div>
          <div className="step">
            <p className={`${Active >= 3 ? "active" : ""}`}>
              <i className="icofont-fast-delivery icon"></i>
              <br />
              Out for <br />
              Delever
            </p>
            <div className={`bullet ${Active >= 3 ? "active" : ""}`}>
              <span>3</span>
            </div>
            <i
              className={`icofont-verification-check check ${
                Active >= 3 ? "active" : ""
              }`}
            ></i>
          </div>
          <div className="step">
            <p className={`${Active === 4 ? "active" : ""}`}>
              <i className="icofont-checked icon"></i>
              <br />
              Order <br />
              Delevered
            </p>
            <div className={`bullet ${Active === 4 ? "active" : ""}`}>
              <span>4</span>
            </div>
            <i
              className={`icofont-verification-check check ${
                Active === 4 ? "active" : ""
              }`}
            ></i>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product Quantity</th>
                </tr>
              </thead>
              <tbody>
                {ProductDetails &&
                  ProductDetails.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <img
                          src={item.img}
                          alt=""
                          height={"120px"}
                          width={"120px"}
                        />{" "}
                        {item.name} <span className="C-B-B">Size:</span>{" "}
                        {item.Size} <span className="C-B-B">Color:</span>{" "}
                        {item.Color}
                      </td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                {!ProductDetails && (
                  <tr>
                    <td colSpan="3">No products found</td>
                  </tr>
                )}
                {OrederDetails && (
                  <tr>
                    <td colSpan="2">Total Price:</td>
                    <td>{OrederDetails.price}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4 col-12">
            <div className="delvery-address">
              <header>Delevery Address</header>
              <ul className="lab-ul">
                <li>
                  <span>Name:</span> {DeliveryAddress?.name}
                </li>
                <li>
                  <span>Address:</span> {DeliveryAddress?.address},{" "}
                  {DeliveryAddress?.pinCode}; {DeliveryAddress?.state},{" "}
                  {DeliveryAddress?.country}
                </li>
                <li>
                  <span>Landmarks:</span> {DeliveryAddress?.landmarks}
                </li>
                <li>
                  <span>Phone no.:</span> {DeliveryAddress?.mobile}
                </li>
              </ul>
            </div>
            <div className="Payment">
              <header>Payment Details</header>
              <ul className="lab-ul">
                <li>
                  <span>Payment Mode:</span> {OrederDetails?.paymentMode}
                </li>
                {OrederDetails?.paymentStatus === "Payment Successful" && (
                  <li>
                    <span>Payment Status:</span> Success
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerticularOrderPage;
