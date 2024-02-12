import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AllContext } from "../contexts/ContextProvider";
import ProductDetails from "./ProductDetails";
import axios from "axios";

const OrderHistory = () => {
  const {User}=useContext(AllContext)
  const {orderHistory}=User||{}
  const [Orders, setOrders] = useState()
  useEffect(()=>{
    axios.post("http://localhost:9002/auth/getAllOrderForUserId",orderHistory).then((res)=>{
        if(res.data.message==="Seccussfully Order Data recieve"){
          setOrders(res.data.details)
        }
      }).catch((error)=>console.log(error))
  },[orderHistory])
  return (
    <>
      {Orders && (
        <div className={`cart-top`}>
        <div className="header">
          <h3>Order History</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th className="cat-product">Product Details</th>
              <th className="cat-price">Price</th>
              <th className="cat-price">Payment Status</th>
              <th className="cat-status">Status</th>
            </tr>
          </thead>
          {/* table body */}
          <tbody>
            {
              Orders.map((item,i)=>!item.activeStatus && (
                <tr key={i}>
                  <td className="product-item cat-product">
                    <ProductDetails product={item.product} />
                  </td>
                  <td><i className="icofont-rupee"></i> {item.price}</td>
                  <td>{item.paymentStatus}</td>
                  <td>{item.currentProductStatus}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      )}
    </>
  );
};

export default OrderHistory;
