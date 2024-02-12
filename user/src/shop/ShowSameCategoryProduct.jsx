import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useParams } from "react-router-dom";
import CategorySectionCard from "./CategorySectionCard";

const title = "Popular Products";

const handleDragStart = (e) => e.preventDefault();

// const items = [
//     <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
//     <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
//     <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
//   ];

const ShowSameCategoryProduct = () => {
  const [Product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:9002/auth/products")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => console.log(error));
  }, [Product]);
  useEffect(() => {
    const result = Product.filter((p) => p._id === id);
    if (result) {
      const { productCategory } = result[0] || {};
      setData(Product.filter((p) => p.productCategory === productCategory));
    }
  });
  const items = data
    .slice(0, 10)
    .map((item) => <CategorySectionCard product={item} />);

  //   responsive

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  return (
    <div className="border">
      <h2 className="text-2xl font-extrabold text-gray-800 py-5">
        {title}
      </h2>
      <div className="relative p-5">
        {/* <AliceCarousel mouseTracking items={items}/> */}
        <AliceCarousel
          items={items}
          disableButtonsControls
          responsive={responsive}
          //   disableDotsControls
          //   onSlideChange={syncActiveIndex}
          //   activeIndex={activeIndex}
        />
      </div>
    </div>
  );
};

export default ShowSameCategoryProduct;
