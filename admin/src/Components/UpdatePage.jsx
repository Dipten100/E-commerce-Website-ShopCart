import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "./PageHeader";

import "../Components/update.css";
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

const UpdatePage = () => {
  const { id } = useParams();
  const [Products, setProducts] = useState([]);
  const [IdForSize, setIdForSize] = useState(0);
  const [IdForColor, setIdForColor] = useState(0);
  const [IdForFeature, setIdForFeature] = useState(0);
  const [Size, setSize] = useState("");
  const [Color, setColor] = useState("");
  const [Feature, setFeature] = useState("");
  const [IsSizeEdit, setIsSizeEdit] = useState(-1);
  const [IsColorEdit, setIsColorEdit] = useState(-1);
  const [IsFeatureEdit, setIsFeatureEdit] = useState(-1);
  const [FormData, setFormData] = useState({
    name: "",
    price: "",
    seller: "",
    Category: "",
    Sizes: [],
    Colors: [],
    coupon: "",
    description: "",
    details: "",
    Features: [],
    images: "",
  });
  // let IdForColor,IdForSize,IdForFeature
  useEffect(() => {
    axios
      .get("http://localhost:9002/auth/get/product/" + id)
      .then((res) => {
        if (res.data.message === "Seccussfully Product Data recieve") {
          setProducts(res.data.details);
          const product = res.data.details;
          setFormData({
            ...FormData,
            name: product.productName,
            price: product.productPrice,
            seller: product.productSeller,
            Category: product.productCategory,
            Sizes: product.productSize,
            Colors: product.productColor,
            coupon: product.productCoupon,
            description: product.productDescription,
            details: product.productDetails,
            Features: product.productFeature,
            images: product.productImages,
          });
          let IdForSize =
            product.productSize[product.productSize.length - 1].id + 1;
          setIdForSize(IdForSize);
          let IdForColor =
            product.productColor[product.productColor.length - 1].id + 1;
          setIdForColor(IdForColor);
          let IdForFeature =
            product.productFeature[product.productFeature.length - 1].id + 1;
          setIdForFeature(IdForFeature);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const addSize = () => {
    if (Size.length > 0) {
      setFormData({
        ...FormData,
        Sizes: [...FormData.Sizes, { id: IdForSize, size: Size }],
      });
      setSize("");
      setIdForSize(IdForSize + 1);
    }
  };
  const addColor = () => {
    if (Color.length > 0) {
      setFormData({
        ...FormData,
        Colors: [...FormData.Colors, { id: IdForColor, color: Color }],
      });
      setColor("");
      setIdForColor(IdForColor + 1);
    }
  };
  const addFeature = () => {
    if (Feature.length > 0) {
      setFormData({
        ...FormData,
        Features: [
          ...FormData.Features,
          { id: IdForFeature, feature: Feature },
        ],
      });
      setFeature("");
      setIdForFeature(IdForFeature + 1);
    }
  };
  const removeSize = (id) => {
    setFormData({
      ...FormData,
      Sizes: FormData.Sizes.filter((s) => s.id !== id),
    });
  };
  const removeColor = (id) => {
    setFormData({
      ...FormData,
      Colors: FormData.Colors.filter((c) => c.id !== id),
    });
  };
  const removeFeatures = (id) => {
    setFormData({
      ...FormData,
      Features: FormData.Features.filter((f) => f.id !== id),
    });
  };
  const editSize = (id) => {
    setIsSizeEdit(id);
    const temp = FormData.Sizes.filter(({ id: sId }) => sId === id);
    setSize(temp?.[0]?.size || "");
  };
  const editColor = (id) => {
    setIsColorEdit(id);
    const temp = FormData.Colors.filter(({ id: cId }) => cId === id);
    setColor(temp?.[0]?.color || "");
  };
  const editFeature = (id) => {
    setIsFeatureEdit(id);
    const temp = FormData.Features.filter(({ id: fId }) => fId === id);
    setFeature(temp?.[0]?.feature || "");
  };
  
  const handleUpdateSize = () => {
    FormData.Sizes.map((item)=>{
      if(item.id===IsSizeEdit){
        item.size=Size
      }
    })
    setIsSizeEdit(-1)
    setSize("")
  };
  const handleUpdateColor = () => {
    FormData.Colors.map((item)=>{
      if(item.id===IsColorEdit){
        item.color=Color
      }
    })
    setIsColorEdit(-1)
    setColor("")
  };
  const handleUpdateFeature = () => {
    FormData.Features.map((item)=>{
      if(item.id===IsFeatureEdit){
        item.feature=Feature
      }
    })
    setIsFeatureEdit(-1)
    setFeature("")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9002/auth/update/product/" + id, FormData)
      .then((res) => {
        if (res.data.message === "Product updated successfully") {
          notifySuccess(res.data.message);
        } else {
          notifyError(res.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <PageHeader title={"There You can update you product details"} />

      <div className="update-section padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <h3>
              Update Product <span className="show-id">#{id}</span> Details
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <label htmlFor="">Product Name</label>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={FormData.name}
                  onChange={(e) =>
                    setFormData({ ...FormData, name: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <label htmlFor="">Product Price</label>
                <input
                  type="text"
                  placeholder="Product Price"
                  value={FormData.price}
                  onChange={(e) =>
                    setFormData({ ...FormData, price: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <label htmlFor="">Product Seller</label>
                <input
                  type="text"
                  placeholder="Product Seller"
                  value={FormData.seller}
                  onChange={(e) =>
                    setFormData({ ...FormData, seller: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <label htmlFor="">Product Category (You can not change product category)</label>
                <input type="text" placeholder="Product Category" value={FormData.Category} readOnly />
              </div>
              <div className="input-box">
                <label htmlFor="">Product Size</label>
                <input
                  type="text"
                  placeholder="Product Size"
                  value={Size}
                  onChange={(e) => setSize(e.target.value)}
                />
                {IsSizeEdit !== -1 ? (
                  <button
                    type="button"
                    className="btn-plus"
                    onClick={handleUpdateSize}
                  >
                    Edit
                  </button>
                ) : (
                  <button type="button" className="btn-plus" onClick={addSize}>
                    +
                  </button>
                )}
                <div className="grid-container">
                  {FormData.Sizes &&
                    FormData.Sizes.map((item, i) => (
                      <div key={i} className="grid-item">
                        <span>{item.size}</span>
                        <i
                          className="icofont-ui-delete del"
                          onClick={() => removeSize(item.id)}
                        ></i>
                        <i
                          className="icofont-edit del"
                          onClick={() => editSize(item.id)}
                        ></i>
                      </div>
                    ))}
                </div>
              </div>
              <div className="input-box">
                <label htmlFor="">Product Color</label>
                <input
                  type="text"
                  placeholder="Product Color"
                  value={Color}
                  onChange={(e) => setColor(e.target.value)}
                />
                {IsColorEdit !== -1 ? (
                  <button
                    type="button"
                    className="btn-plus"
                    onClick={handleUpdateColor}
                  >
                    Edit
                  </button>
                ) : (
                  <button type="button" className="btn-plus" onClick={addColor}>
                    +
                  </button>
                )}
                <div className="grid-container">
                  {FormData.Colors &&
                    FormData.Colors.map((item, i) => (
                      <div key={i} className="grid-item">
                        <span>{item.color}</span>
                        <i
                          className="icofont-ui-delete del"
                          onClick={() => removeColor(item.id)}
                        ></i>
                        <i
                          className="icofont-edit del"
                          onClick={() => editColor(item.id)}
                        ></i>
                      </div>
                    ))}
                </div>
              </div>
              <div className="input-box">
                <label htmlFor="">Product Coupon</label>
                <input
                  type="text"
                  placeholder="Product Coupon"
                  value={FormData.coupon}
                  onChange={(e) =>
                    setFormData({ ...FormData, coupon: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <label htmlFor="">Product Description</label>
                <textarea
                  type="text"
                  placeholder="Product Description"
                  value={FormData.description}
                  onChange={(e) =>
                    setFormData({ ...FormData, description: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <label htmlFor="">Product Details</label>
                <textarea
                  type="text"
                  placeholder="Product Details"
                  value={FormData.details}
                  onChange={(e) =>
                    setFormData({ ...FormData, details: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <label htmlFor="">Product Features</label>
                <textarea
                  type="text"
                  placeholder="Product Features"
                  value={Feature}
                  onChange={(e) => setFeature(e.target.value)}
                />
                {IsFeatureEdit !== -1 ? (
                  <button
                    type="button"
                    className="btn-plus"
                    onClick={handleUpdateFeature}
                  >
                    Edit
                  </button>
                ) : (
                  <button type="button" className="btn-plus" onClick={addFeature}>
                    +
                  </button>
                )}
                <div className="grid-container">
                  {FormData.Features &&
                    FormData.Features.map((item, i) => (
                      <div key={i} className="grid-item">
                        <p>{item.feature}</p>
                        <i
                          className="icofont-ui-delete del"
                          onClick={() => removeFeatures(item.id)}
                        ></i>
                        <i
                          className="icofont-edit del"
                          onClick={() => editFeature(item.id)}
                        ></i>
                      </div>
                    ))}
                </div>
              </div>
              <div className="input-box-img">
                <label htmlFor="">Product Image</label>
                <textarea
                  type="text"
                  placeholder="Product Image"
                  value={FormData.images}
                  onChange={(e) =>
                    setFormData({ ...FormData, images: e.target.value })
                  }
                />
                <div className="grid-container">
                  {FormData.images && (
                    <div className="grid-item img">
                      <h3>Preview</h3>
                      <img src={FormData.images} alt="" />
                    </div>
                  )}
                </div>
              </div>
              <button type="submit" className="lab-btn">
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
