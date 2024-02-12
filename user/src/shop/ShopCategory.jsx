import React, { useEffect, useState } from "react";
// import Data from "../products.json";
import axios from "axios";

const ShopCategory = ({
  filterItem,
  setItem,
  menuItems,
  setProducts,
  SelectedCategory,
}) => {
  const [Data, setData] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:9002/auth/products").then((res)=>{
      setData(res.data)
    }).catch((error)=>console.log(error))
  },[])

  return (
    <>
      <div className="widget-header">
        <h5 className="ms-2">All Categories</h5>
      </div>
      <div>
        <button
          onClick={() => setProducts(Data)}
          className={`m-2 ${SelectedCategory === "All" ? "bg-warning" : ""}`}
        >
          {" "}
          All
        </button>
        {menuItems.map((val, id) => {
          return (
            <button
              className={`m-2 ${SelectedCategory === val ? "bg-warning" : ""}`}
              key={id}
              onClick={() => filterItem(val)}
            >
              {val}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ShopCategory;
