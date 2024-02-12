import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const CustomerDetails = (customer) => {
    const [Show, setShow] = useState(false)
    const handleShow=()=>setShow(true)
    const handleClose=()=>setShow(false)
    const {Customer}=customer
  return (
    <div>
      <i
        className="icofont-eye-alt fs-2 cursor-pointer"
        onClick={() => handleShow()}
      ></i>
      <Modal
        show={Show}
        onHide={handleClose}
        animation={false}
        className="modal fade"
        centered
      >
        <div className="modal-body">
          <h5 className="px-3 m-3 bb-3 p-3">User Details</h5>
          <div className="d-flex p-3 tag-section">
            <span className="tag">Customer Name</span>
            <span className="tag-value">{Customer?.name}</span>
          </div>
          <div className="d-flex p-3 tag-section">
            <span className="tag">Customer Contact Number</span>
            <span className="tag-value">{Customer?.mobile}</span>
          </div>
          <div className="d-flex p-3 tag-section">
            <span className="tag">Customer Address</span>
            <span className="tag-value">{Customer?.address}</span>
          </div>
          <div className="d-flex p-3 tag-section">
            <span className="tag">Landmark</span>
            <span className="tag-value">{Customer?.landmarks}</span>
          </div>
          <div className="d-flex p-3 tag-section">
            <span className="tag">Pin Code</span>
            <span className="tag-value">{Customer?.pinCode}</span>
          </div>
          <div className="d-flex p-3 tag-section">
            <span className="tag">State</span>
            <span className="tag-value">{Customer?.state}</span>
          </div>
          <div className="d-flex p-3 tag-section">
            <span className="tag">Country</span>
            <span className="tag-value">{Customer?.country}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerDetails;
