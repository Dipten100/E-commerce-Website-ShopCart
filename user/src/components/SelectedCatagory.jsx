import axios from "axios";
import React, { useEffect, useState } from "react";

const SelectedCatagory = (select) => {
  const [CategoryList, setCategoryList] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:9002/auth/getCategories").then((res)=>{
      setCategoryList(res.data);
    }).catch((error)=>console.log(error))
  })
  console.log(select)

  return (
    <select>
      <option value="all">All Categories</option>
      {
        CategoryList.map((item,i)=>(
          <option key={i} value={item.categoryName}>{item.categoryName}</option>
        ))
      }
    </select>
  );
};

export default SelectedCatagory;
