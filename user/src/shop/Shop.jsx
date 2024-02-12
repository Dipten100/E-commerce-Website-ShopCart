import React, { useEffect, useState } from "react";

const showResults = "Showing 01 - 12 of 139 Results";
// import Data from "../products.json";
import ProductCards from "./ProductCards";
import Pagination from "./Pagination";
// import Search from "./Search";
import ShopCategory from "./ShopCategory";
import PopularPost from "./PopularPost";
import Tags from "./Tags";
import axios from "axios";
import Search from "./Search";
import TrendingProducts from "./TrendingProducts";

const Shop = () => {
  const [GridList, setGridList] = useState(true);
  const [Products, setProducts] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:9002/auth/products").then((res)=>{
      setProducts(res.data)
    }).catch((error)=>console.log(error))
  },[])
  // console.log(Products)

  const [CurrentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexOfLastProduct = CurrentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // filter products based on category
  const [SelectedCategory, setSelectedCategory] = useState("All");
  const menuItems = [...new Set(Products.map((val) => val.productCategory))];

  const filterItem = (curcat) => {
    const newItem = Products.filter((newVal) => {
      return newVal.productCategory === curcat;
    });

    setSelectedCategory(curcat);
    setProducts(newItem);
  };

  return (
    <div>
      {/* <PageHeader title="Our Shop Page" curPage="Shop" /> */}
      <TrendingProducts/>
      {/* shop page */}
      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                {/* layout and title here */}
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <p>{showResults}</p>
                  <div
                    className={`product-view-mode ${
                      GridList ? "gridActive" : "listActive"
                    }`}
                  >
                    <a className="grid" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-ghost"></i>
                    </a>
                    <a className="list" onClick={() => setGridList(!GridList)}>
                      <i class="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>

                <div>
                  <ProductCards
                    GridList={GridList}
                    Products={currentProducts}
                  />
                </div>

                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={Products.length}
                  paginate={paginate}
                  activePage={CurrentPage}
                />
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Search Products={Products} GridList={GridList} />
                <ShopCategory
                  filterItem={filterItem}
                  setItem={setProducts}
                  menuItems={menuItems}
                  setProducts={setProducts}
                  SelectedCategory={SelectedCategory}
                />
                <PopularPost/>
                <Tags/>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
