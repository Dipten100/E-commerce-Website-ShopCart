import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";
import ProductDisplay from "./ProductDisplay";
import Review from "./Review";
import PopularPost from "./PopularPost";
import Tags from "./Tags";
import axios from "axios";
import ShowSameCategoryProduct from "./ShowSameCategoryProduct";

const SingleProduct = () => {
  const [Product, setProduct] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:9002/auth/products")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const result = Product.filter((p) => p._id === id);

  return (
    <div>
      <PageHeader title={"Our Shop Single"} curPage={"shop/Single Product"} />

      <div className="shop-single padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="product-details">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={"true"}
                            autoplay={{
                              delay: 2000,
                              disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            navigation={{
                              prevEl: ".pro-single-prev",
                              nextEl: ".pro-single-next",
                            }}
                            className="mySwiper"
                          >
                            {result.map((item, i) => (
                              <SwiperSlide key={i}>
                                <div className="single-thumb">
                                  <img src={item.productImages} alt="" />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          <div className="pro-single-next">
                            <i className="icofont-rounded-left"></i>
                          </div>
                          <div className="pro-single-prev">
                            <i className="icofont-rounded-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        {result.map((item) => (
                          <ProductDisplay key={item.id} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* review */}
                <div className="review">
                  <Review />
                </div>
              </article>
            </div>

            {/* down side */}
            {result.map((item) => (
              <ShowSameCategoryProduct category={item.productCategory} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
