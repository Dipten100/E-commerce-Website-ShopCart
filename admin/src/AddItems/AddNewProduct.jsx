import React, { useContext, useEffect, useRef, useState } from "react";

// import modal.css
import "../AddItems/AddNewProduct.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AllContext } from "../contexts/ContextProvider";
import PageHeader from "../Components/PageHeader";
import { useNavigate } from "react-router-dom";

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

const AddNewProduct = () => {
  const [Category, setCategory] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    axios
    .get("http://localhost:9002/auth/getCategory")
      .then((res) => setCategory(res.data))
      .catch((error) => console.log(error));
  }, []);
  // ..............................................
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
    review: 0,
  });
  // ..............................................
  const { setProducts } = useContext(AllContext);
  // console.log(FormData)
  
  const [Size, setSize] = useState("");
  const [Color, setColor] = useState("");
  const [Feature, setFeature] = useState("");
  const [IdForColor, setIdForColor] = useState(0);
  const [IdForSize, setIdForSize] = useState(0);
  const [IdForFeature, setIdForFeature] = useState(0);
  const [IsSizeEdit, setIsSizeEdit] = useState(-1);
  const [IsColorEdit, setIsColorEdit] = useState(-1);
  const [IsFeatureEdit, setIsFeatureEdit] = useState(-1);

  const handleAddSize = () => {
    if (Size.length > 0) {
      setFormData({
        ...FormData,
        Sizes: [...FormData.Sizes, { id: IdForSize, size: Size }],
      });
      setSize("");
      setIdForSize(IdForSize + 1);
    }
  };
  const handleAddColor = () => {
    if (Color.length > 0) {
      setFormData({
        ...FormData,
        Colors: [...FormData.Colors, { id: IdForColor, color: Color }],
      });
      setColor("");
      setIdForColor(IdForColor + 1);
    }
  };
  const handleAddFeature = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (FormData.Category === "") {
      notifyMsg(
        "Select Category Name or If Category name is not in there then create category first"
      );
    } else {
      await axios
        .post("http://localhost:9002/auth/add/product", FormData)
        .then((res) => {
          if (res.data.message === "Product Add Successfully") {
            const product = res.data.product;
            setProducts((prev) => [...prev, product]);
            notifySuccess(res.data.message);
            navigate("/add")
          } else {
            notifyError(res.data.message);
          }
        });
    }
  };

  return (
    <>
      <PageHeader title={`There you can add your product`} />

      <div className="add-product-section padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <h5 className="px-3 m-3 bb-3 p-3">Add New Product</h5>
            <form className="" onSubmit={handleSubmit}>
              <div className="form-group row">
                <label
                  htmlFor="productName"
                  className="col-sm-2 col-form-label"
                >
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    className="form-control-text-box"
                    placeholder="Product Name"
                    value={FormData.name}
                    onChange={(e) =>
                      setFormData({ ...FormData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="underline"></div>
              </div>
              <div className="form-group row">
                <label htmlFor="" className="col-sm-2 col-form-label">
                  Price
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    name="productPrice"
                    id="productPrice"
                    className="form-control-text-box"
                    placeholder="Product Price"
                    value={FormData.price}
                    onChange={(e) =>
                      setFormData({ ...FormData, price: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="" className="col-sm-2 col-form-label">
                  Seller
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="productSeller"
                    id="productSeller"
                    className="form-control-text-box"
                    placeholder="Product Seller Name"
                    onChange={(e) =>
                      setFormData({ ...FormData, seller: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="" className="col-sm-2 col-form-label">
                  Category
                </label>
                <div className="col-sm-10">
                  <select
                    name="category"
                    id="category"
                    value={FormData.Category}
                    onChange={(e) =>
                      setFormData({ ...FormData, Category: e.target.value })
                    }
                  >
                    <option value="">Select Category</option>
                    {Category &&
                      Category.map((item, i) => (
                        <option value={item.categoryName} key={i}>
                          {item.categoryName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="form-group row size">
                <label htmlFor="" className="col-sm-2 col-form-label">
                  Size
                </label>
                <div className="col-sm-10 ">
                  <input
                    type="text"
                    name="productSize"
                    id="productSize"
                    className="form-control-text-box"
                    placeholder="Enter product size and press '+' to save "
                    value={Size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
                {IsSizeEdit !== -1 ? (
                  <button
                    type="button"
                    className="lab-btn mt-3 "
                    onClick={handleUpdateSize}
                  >
                    Edit
                  </button>
                ) : (
                  <button type="button" className="lab-btn mt-3 " onClick={handleAddSize}>
                    +
                  </button>
                )}
                {/* <button
                  type="button"
                  className="lab-btn mt-3 "
                  onClick={handleAddSize}
                >
                  +
                </button> */}
                {/* input data show */}
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
              <div className="form-group row">
                <label htmlFor="" className="col-sm-2 col-form-label">
                  Color
                </label>
                <div className="col-sm-10 size">
                  <input
                    type="text"
                    name="productColor"
                    id="productColor"
                    className="form-control-text-box"
                    placeholder="Enter product color and press '+' to save "
                    value={Color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
                {IsColorEdit !== -1 ? (
                  <button
                    type="button"
                    className="lab-btn mt-3"
                    onClick={handleUpdateColor}
                  >
                    Edit
                  </button>
                ) : (
                  <button type="button" className="lab-btn mt-3" onClick={handleAddColor}>
                    +
                  </button>
                )}
                {/* <button
                  type="button"
                  className="lab-btn mt-3"
                  onClick={handleAddColor}
                >
                  +
                </button> */}
                {/* input data show */}
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
              <div className="form-group row">
                <label htmlFor="" className="col-sm-2 col-form-label">
                  Coupon Code
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="productCoupon"
                    id="productCoupon"
                    className="form-control-text-box"
                    placeholder="It's Apply Only For this Product"
                    value={FormData.coupon}
                    onChange={(e) =>
                      setFormData({ ...FormData, coupon: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="" className="col-sm-2 col-form-label">
                  Description
                </label>
                <div className="col-sm-10">
                  <textarea
                    type="text"
                    name="productDesc"
                    id="productDesc"
                    className="form-control-text-box"
                    placeholder="Product description"
                    value={FormData.description}
                    onChange={(e) =>
                      setFormData({ ...FormData, description: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="" className="col-sm-2 col-form-label">
                  Details
                </label>
                <div className="col-sm-10">
                  <textarea
                    type="text"
                    name="productDetails"
                    id="productDetails"
                    className="form-control-text-box"
                    placeholder="More Details about Product for Description Section"
                    value={FormData.details}
                    onChange={(e) =>
                      setFormData({ ...FormData, details: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="" className="col-sm-2 col-form-label">
                  Features
                </label>
                <div className="col-sm-10 size">
                  <textarea
                    type="text"
                    name="productFeatures"
                    id="productFeatures"
                    className="form-control-text-box"
                    placeholder="Enter product feature and press '+' to save "
                    value={Feature}
                    onChange={(e) => setFeature(e.target.value)}
                  />
                </div>
                {IsFeatureEdit !== -1 ? (
                  <button
                    type="button"
                    className="lab-btn mt-3"
                    onClick={handleUpdateFeature}
                  >
                    Edit
                  </button>
                ) : (
                  <button type="button" className="lab-btn mt-3" onClick={handleAddFeature}>
                    +
                  </button>
                )}
                {/* <button
                  type="button"
                  className="lab-btn mt-3"
                  onClick={handleAddFeature}
                >
                  +
                </button> */}
                {/* input data show */}
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
              <div className="form-group row">
                <label htmlFor="" className="col-sm-2 col-form-label">
                  URL
                </label>
                <div className="col-sm-10">
                  <textarea
                    type="text"
                    name="productImg"
                    id="productImg"
                    className="form-control-text-box"
                    placeholder="Product Image URl"
                    value={FormData.images}
                    onChange={(e) =>
                      setFormData({ ...FormData, images: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid-container">
                  {FormData.images && (
                    <div className="grid-item img">
                      <h3>Preview</h3>
                      <img
                        src={FormData.images}
                        width="300"
                        height="100"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
              <button type="submit" className="lab-btn mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewProduct;
