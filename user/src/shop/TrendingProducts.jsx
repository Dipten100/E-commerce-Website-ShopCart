import React, { useEffect, useState } from "react";
import "../shop/TrendingProducts.css";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const TrendingProducts = () => {
  const [TopProducts, setTopProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9002/auth/topSellingProducts")
      .then((res) => {
        setTopProducts(res.data);
      })
      .catch((error) => console.log(error));
  });

  return (
    <div className="trending-section padding-tb">
      <div className="container">
        <div className="row justify-content-center">
          <Carousel data-bs-theme="dark">
          {
            TopProducts.map((item,i)=>(
            <Carousel.Item>
              <img
                className="d-block topProductsImage"
                src={item.productImages}
                alt="First slide"
              />
              <Carousel.Caption>
                <h5 className="topProductsName">{item.productName}</h5>
                <p className="topProductsTags">
                  Product Price <span><i className="icofont-rupee"></i> {item.productPrice}</span> <br />
                  <Link to={`/shop/${item._id}`}>
                  <button type="button" className="lab-btn">Buy Now</button>
                  </Link>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            ))
          }
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
