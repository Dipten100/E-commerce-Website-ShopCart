import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AllContext } from "../contexts/ContextProvider";
import ProductDetails from "./ProductDetails";
import axios from "axios";

const CurrentOrder = () => {
  const {User}=useContext(AllContext)
  const {orderHistory}=User||{}
  const [Orders, setOrders] = useState()
  const navigate = useNavigate();
  useEffect(()=>{
    axios.post("http://localhost:9002/auth/getAllOrderForUserId",orderHistory).then((res)=>{
        if(res.data.message==="Seccussfully Order Data recieve"){
          setOrders(res.data.details)
        }
      }).catch((error)=>console.log(error))
  },[orderHistory])
  // if(orderHistory){
  //   current=true
  // }else{
  //   current=false
  // }
  const handleShowOrderPage=(i)=>{
    console.log(i)
    navigate("/perticularOrderPage/"+i)
  }

  return (
    <>
      {Orders && (
        <div className={`cart-top`}>
          <div className="header">
            <h3>Current Order List</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th className="cat-product">Product Details</th>
                <th className="cat-quantity">Payment Details</th>
                <th className="cat-price">Price</th>
                <th className="cat-status">Status</th>
              </tr>
            </thead>
            {/* table body */}
            <tbody>
              {
                Orders.map((item,i)=>item.activeStatus && (
                  <tr key={i}>
                    <td>
                      <ProductDetails product={item.product} />
                    </td>
                    <td className="cursor-pointer" onClick={()=>handleShowOrderPage(item._id)}>{item.paymentMode}</td>
                    <td className="cursor-pointer" onClick={()=>handleShowOrderPage(item._id)}><i className="icofont-rupee"></i> {item.price}</td>
                    <td className="cursor-pointer" onClick={()=>handleShowOrderPage(item._id)}>{item.currentProductStatus}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )}
      {!Orders && (
        <div className="no-item">
          <h3>
            Currently you don't have any item. Please go to the shop item for
            Buy something
          </h3>
          <Link to={"/shop"}>
          <button type="button" className="lab-btn">
            Go to Shop Page <i className="icofont-hand-drag1"></i>
          </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default CurrentOrder;
