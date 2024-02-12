import React from "react";
import PageHeader from "../Components/PageHeader";
import ShowItems from "../ShowItems/ShowItems";
import { Link } from "react-router-dom";

const AddProducts = () => {
  return (
    <div>
      <PageHeader
        title={
          "There you can Add product details which show in shop page in our Website"
        }
      />
      {/* add product */}
      <div className="padding-tb">
        <div className="container">
          <div className="row">
            <article>
              <Link to={`/add/product`}>
                <button type="button" className="lab-btn">
                  Add New Product
                </button>
              </Link>
            </article>
          </div>
        </div>
      </div>

      {/* show products */}
      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <article>
              {/* title */}
              <div className="shop-title d-flex flex-wrap justify-centent-between">
                <p>All Products Here</p>
              </div>
              <div>
                <ShowItems />
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
