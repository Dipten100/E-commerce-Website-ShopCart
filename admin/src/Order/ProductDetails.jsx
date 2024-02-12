import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ProductDetails = (Product) => {
  const [Show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { product } = Product;

  return (
    <div>
      <i
        className="icofont-eye-alt fs-2 cursor-pointer"
        onClick={handleShow}
      ></i>
      <Modal
        show={Show}
        onHide={handleClose}
        animation={false}
        className=""
        centered
      >
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Sl No.</th>
              <th scope="col">Name</th>
              <th scope="col">Color</th>
              <th scope="col">Size</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
          {
            product && product.map((item,i)=>(
                <tr key={i}>
                    <td>{i+1}</td>
                    <td><img src={item.img} alt="" className="p-img" /> {item.name}</td>
                    <td>{item.Color}</td>
                    <td>{item.Size}</td>
                    <td>{item.quantity}</td>
                </tr> 
            ))
          }
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default ProductDetails;
