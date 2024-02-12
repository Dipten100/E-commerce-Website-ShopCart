import axios from "axios";
import React, { useEffect, useState } from "react";


const Cards = () => {
  const [UserDetails, setUserDetails] = useState([]);
  const [ProductDetails, setProductDetails] = useState([]);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [RemainOrder, setRemainOrder] = useState(0)
  const [Delevered, setDelevered] = useState(0)
  useEffect(() => {
    axios.get("http://localhost:9002/auth/getAllUser").then((res)=>{
      setUserDetails(res.data)
    }).catch((error)=>console.log(error))
    
    axios.get("http://localhost:9002/auth/getAllProducts").then((res)=>{
      setProductDetails(res.data)
    }).catch((error)=>console.log(error))
    
    axios.get("http://localhost:9002/auth/getOrderDetails").then((res)=>{
      setOrderDetails(res.data)
      const order=res.data
      let delivery=0,remain=0;
      for (let i = 0; i < order.length; i++) {
        const element = order[i];
        if(element.activeStatus){
          remain++
        }else{
          delivery++
        }
      }
      setDelevered(delivery)
      setRemainOrder(remain)
    }).catch((error)=>console.log(error))


    // const inc=setInterval(()=>{
    //   if(User!==user){
    //     setUser((prev)=> prev+1);
    //   }
    //   if(Products!==products){
    //     setProducts((prev)=> prev+1);
    //   }
    //   if(RemainOrder!==remainOrders){
    //     setRemainOrder((prev)=> prev+1);
    //   }
    //   if(Delevered!==delevered){
    //     setDelevered((prev)=> prev+1);
    //   }
    // },10)

    // return ()=>clearInterval(inc)
  },[]);


  return (
    <div className="d-flex" id="wrapper">
      <div id="page-content-wrapper">
        <div className="conatiner-fluid px-4 mt-5">
          <div className="row g-3 my-2">
            <div className="col-md-3 card-item">
              <div className="p-3 bg-white d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 className="fs-2 C-U" id="user">
                    {UserDetails.length}                    
                  </h3>
                  <p className="fs-5 C-B-B">Users</p>
                </div>
                <i className="icofont-ui-user fs-1 rounded-full U-T-B p-3"></i>
              </div>
            </div>
            <div className="col-md-3 card-item">
              <div className="p-3 bg-white d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 className="fs-2 C-P" id="products">
                    {ProductDetails.length}
                  </h3>
                  <p className="fs-5 C-B-B">Products</p>
                </div>
                <i className="icofont-gift fs-1 P-T-B rounded-full p-3"></i>
              </div>
            </div>
            <div className="col-md-3 card-item">
              <div className="p-3 bg-white d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 className="fs-2 C-OR" id="RemainsOrder">
                    {RemainOrder}
                  </h3>
                  <p className="fs-5 C-B-B">Order Remain</p>
                </div>
                <i className="icofont-shopping-cart fs-1 OR-T-B rounded-full p-3"></i>
              </div>
            </div>
            <div className="col-md-3 card-item">
              <div className="p-3 bg-white d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 className="fs-2 C-PD" id="delevered">
                    {Delevered}
                  </h3>
                  <p className="fs-5 C-B-B">Product Delevered</p>
                </div>
                <i className="icofont-fast-delivery fs-1 rounded-full PD-T-B p-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
