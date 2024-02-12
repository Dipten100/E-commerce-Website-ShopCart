import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AllContext } from "../contexts/ContextProvider";
import axios from "axios";

const ShowItems = () => {
  const {Products, setProducts } = useContext(AllContext);
  useEffect(() => {
    axios
      .get("http://localhost:9002/auth/products")
      .then((pro) => setProducts(pro.data))
      .catch((error) => console.log(error));
  });

  return (
    <div className={`shop-product-wrap row justify-content-center grid`}>
      {Products.map((product, i) => (
        <div key={i} className="col-lg-4 col-md-6 col-12">
          <div className="product-item">
            {/* product images */}
            <div className="product-thumb">
              <div className="pro-thumb">
                <img src={product.productImages} alt="" />
              </div>

              {/* product action links */}
              <div className="product-action-link">
                <Link to={`/show/${product._id}`}>
                  <i className="icofont-eye-open"></i>
                </Link>
              </div>
            </div>

            {/* product content */}
            <div className="product-content">
              <h5>
                <Link to={`/show/${product._id}`}>{product.productName}</Link>
              </h5>
              <h6>${product.productPrice}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowItems;
