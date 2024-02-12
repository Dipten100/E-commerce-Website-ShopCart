import React, { useEffect, useState } from "react";
import PageHeader from "../Components/PageHeader";
import AddNewCategory from "./AddNewCategory";
import axios from "axios";

import "../AddCategory/AddCategory.css";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

const AddCategory = () => {
  const [Categories, setCategories] = useState([]);
  const [Show, setShow] = useState(false);
  const [Details, setDetails] = useState([]);
  const [ShowDetail, setShowDetail] = useState();
  const [Open, setOpen] = useState(false)
  const [Data, setData] = useState({
    id: "",
    name: "",
    url: "",
  });
  useEffect(() => {
    axios.get("http://localhost:9002/auth/getCategory").then((res) => {
      setCategories(res.data);
    });
  }, [Categories]);
  const handleEdit = (id) => {
    const category = Categories.find((cat) => cat._id === id);
    if (category) {
      setData({
        ...Data,
        id,
        name: category.categoryName,
        url: category.imageUrl,
      });
    }
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const handleDelete = (id) => {
    axios.delete("http://localhost:9002/auth/delCat/" + id).then((res) => {
      if (res.data.message === "Category deleted successfully") {
        notifySuccess(res.data.message);
        notifyMsg(
          "If any product have in this category it will show in All Category section"
        );
      } else {
        notifyError(res.data.message);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9002/auth/edit/category", Data).then((res) => {
      if (res.data.message === "Category Update Successfully") {
        notifySuccess(res.data.message);
      } else {
        notifyError(res.data.message);
      }
    });
  };

  const handleShowData = (id, name) => {
    const cat = Categories.filter((val) => val._id === id);
    const catPro = cat[0].products;
    axios
      .post("http://localhost:9002/auth/getProducts", catPro)
      .then(async (res) => {
        setDetails(res.data.details);
      })
      .catch((error) => console.log(error));
    setShowDetail(name);
    if(Open){
      setOpen(false)
    }else{
      setOpen(true)
    }
  };

  return (
    <div>
      <PageHeader title={"Add Category"} />
      {/* add product */}
      <div className="padding-tb">
        <div className="container">
          <div className="row">
            <article>
              <AddNewCategory />
            </article>
          </div>
        </div>
      </div>

      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* table top */}
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-categoryName">Category Name</th>
                    <th className="cat-categoryProductCount">
                      Category Products Count
                    </th>
                    <th className="cat-edit">Edit</th>
                    <th className="cat-delete">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {Categories.map((item, i) => (
                    <>
                      <tr key={i}>
                        <td
                          className="cat-name"
                          onClick={() =>
                            handleShowData(item._id, item.categoryName)
                          }
                        >
                          <span>
                            <img
                              src={item.imageUrl}
                              className="cat-img"
                              alt=""
                            />
                          </span>
                          <span className="cat-text">{item.categoryName}</span>
                        </td>
                        <td>{item.products.length}</td>
                        <td
                          className="cat-edit"
                          onClick={() => handleEdit(item._id)}
                        >
                          <i className="icofont-edit"></i>
                        </td>
                        <td
                          className="cat-delete"
                          onClick={() => handleDelete(item._id)}
                        >
                          <i className="icofont-ui-delete"></i>
                        </td>
                      </tr>
                      {item.categoryName === ShowDetail && Open &&
                        Details.map((pro, p) => (
                          <tr key={p}>
                            <Link to={`/show/`+pro._id}>
                            <td className="cat-name">
                              <span>
                                <img
                                  src={pro.productImages}
                                  className="cat-img"
                                  alt=""
                                />
                              </span>
                              <span className="cat-text">
                                {pro.productName}
                              </span>
                            </td>
                            </Link>
                          </tr>
                        ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modalCard">
              <Modal
                show={Show}
                onHide={handleClose}
                animation={false}
                className="modal fade"
                centered
              >
                <div className="modal-body">
                  <h5 className="px-3 m-3 p-3">Update Category</h5>
                  <form className="wrapper" onSubmit={handleSubmit}>
                    <div className="input-data">
                      <input
                        type="text"
                        name="categoryName"
                        id="categoryName"
                        value={Data.name}
                        onChange={(e) =>
                          setData({ ...Data, name: e.target.value })
                        }
                        required
                      />
                      <div className="underline"></div>
                      <label htmlFor="">Category Name</label>
                    </div>
                    <div className="input-data">
                      <input
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        value={Data.url}
                        onChange={(e) =>
                          setData({ ...Data, url: e.target.value })
                        }
                        required
                      />
                      <div className="underline"></div>
                      <label htmlFor="">Image URL</label>
                    </div>
                    <div className="preview">
                      <img src={Data.url} className="preview" alt="" />
                    </div>
                    <button type="submit" className="lab-btn mt-3">
                      Submit
                    </button>
                  </form>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
