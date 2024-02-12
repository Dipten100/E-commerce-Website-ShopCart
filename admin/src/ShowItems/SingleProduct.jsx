import React, { useEffect, useState } from "react";
import PageHeader from "../Components/PageHeader";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ProductDisplay from "./ProductDisplay";
import Description from "./Description";
import axios from "axios";
import { toast } from "react-toastify";

const notifyError = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
const notifyMsg = (msg) => {
  toast(msg, {
    position: toast.POSITION.TOP_CENTER,
  });
};
const notifySuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const SingleProduct = () => {
  const [Product, setProduct] = useState([]);
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/add";

  useEffect(() => {
    axios
      .get("http://localhost:9002/auth/products")
      .then((pro) => setProduct(pro.data))
      .catch((error) => console.log(error));
  }, [id]);
  
  const result = Product && Product.filter((p) => p._id === id);

  const handleDelete=(id)=>{
    axios.delete("http://localhost:9002/auth/delete/product/"+id+"/"+result[0].productCategory).then((res)=>{
      if(res.data.message==="Product deleted successfully"){
        notifySuccess(res.data.message)
        navigate(from, { replace: true });
      }else{
        notifyError(res.data.message)
      }
    }).catch((error)=>console.log(error))
  }

  return (
    <div>
      <PageHeader
        title={
          "There is Single product display page where you can give more information about specific product"
        }
      />
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
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        {result.map((item) => (
                          <ProductDisplay key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="review">
                  {result.map((item) => (
                    <Description key={item._id} item={item} />
                  ))}
                </div>
              </article>
              {/* button for update data */}
              {/* Button Section */}
              <span className="m-3">
              <Link to={"/update/" + id}>
                <button type="button" className="lab-btn">
                  <span>Update Data</span>
                </button>
              </Link>
              </span>
              <button type="button" className="lab-btn" onClick={()=>handleDelete(id)}>
                <span>Delete Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
