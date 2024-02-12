import React from "react";
import { useState } from "react";

const Description = ({ item }) => {
  const { productDetails, productFeature, productImages } = item;
  return (
    <>
      <div className="review-content description-show">
        <div className="description">
          <p>{productDetails}</p>
          <div className="post-item">
            <div className="post-thumb">
              <img src={productImages} alt="" />
            </div>
            <div className="post-content">
              <ul className="lab-ul">
                {productFeature.map((item, i) => (
                  <li key={i}>{item.feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
