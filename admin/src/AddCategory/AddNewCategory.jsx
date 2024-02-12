import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const notifyError = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
const notifySuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const AddNewCategory = () => {
  const [Show, setShow] = useState(false);
  const [Data, setData] = useState({
    name:"",
    url:"",
  })
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:9002/auth/add/category",Data).then((res)=>{
      if(res.data.message==="Category Add Successfully"){
        notifySuccess(res.data.message)
      }else{
        notifyError(res.data.message)
      }
    })
  }
  return (
    <div className="modalCard">
      <Button variant="primary" className="py-2" onClick={handleShow}>
        Add New Category
      </Button>
      <Modal
        show={Show}
        onHide={handleClose}
        animation={false}
        className="modal fade"
        centered
      >
        <div className="modal-body">
          <h5 className="px-3 m-3 bb-3 p-3">Add New Category</h5>
          <form className="wrapper" onSubmit={handleSubmit}>
            <div className="input-data">
              <input
                type="text"
                name="categoryName"
                id="categoryName"
                onChange={(e)=>setData({...Data,name:e.target.value})}
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Category Name</label>
            </div>
            <div className="input-data">
              <input type="text" name="imageUrl" id="imageUrl" onChange={(e)=>setData({...Data,url:e.target.value})} required />
              <div className="underline"></div>
              <label htmlFor="">Iamge URL</label>
            </div>
            <div className="grid-container">
                {Data.url && (
                  <div className="grid-item img">
                    <h3>Preview</h3>
                    <img
                      src={Data.url}
                      alt=""
                    />
                  </div>
                )}
              </div>
            <button type="submit" className="lab-btn mt-3">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddNewCategory;
