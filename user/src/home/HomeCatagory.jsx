import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const subTitle = "Choose Any Products";
const title = "Buy Everything with Us";
const btnText = "Get Started Now";
const iconName= "icofont-brand-windows"

const HomeCatagory = () => {
  const [CategoryList, setCategoryList] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:9002/auth/getCategories").then((res)=>{
      setCategoryList(res.data);
    }).catch((error)=>console.log(error))
  })

  return (
    <div className="category-section style-4 padding-tb">
      <div className="container">
        {/* section header */}
        <div className="section-header text-center">
          <span className="subtitle">{subTitle} </span>
          <h2 className="title">{title}</h2>
        </div>

        {/* section card */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-md-3 row-cols-sm-2 row-cols-1">
            {CategoryList.map((val, i) => (
              <div key={i} className="col">
                <Link to="/shop" className="category-item">
                  <div className="category-inner">
                    {/* image thumbnail */}
                    <div className="catagory-thumb">
                      <img src={val.imageUrl} alt="" />
                    </div>

                    {/* content */}
                    <div className="category-content">
                        <div className="cate-icon">
                            <i className={iconName}></i>
                        </div>
                        <Link to="/shop"><h6>{val.categoryName}</h6></Link>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/shop" className="lab-btn"><span>{btnText}</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCatagory;
