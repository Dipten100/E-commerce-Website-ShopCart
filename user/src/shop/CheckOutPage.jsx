import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../components/modal.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AllContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";
import axios from "axios";

const notifySuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
const notifyError = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const CheckOutPage = () => {
  const { cartProducts,setCartProducts,User,Price,selectAddress } = useContext(AllContext);
  const [Show, setShow] = useState(false);
  const [ActiveTab, setActiveTab] = useState("visa");
  const [CreditCardDetails, setCreditCardDetails] = useState({
    CardHolderName:"",
    CardNumber:"",
    ExpirationDate:"",
    CVV:""
  })
  const [PaypalDetails, setPaypalDetails] = useState({
    PaypalEmail : "",
    PaypalName:"",
    ExtraInfo:""
  })

  const {uid}=User||{}

  // hanlde Tab Change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleShow = () => {
    if(User){
      if (selectAddress === null) {
        notifyError("Please Select Address first");
      } else {
        setShow(true);
      }
    }else{
      notifyError("Please Sign In to pay the amount")
    }
  };
  const handleClose = () => setShow(false);

  //   direct to home page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/shop";

  const OrderPlaced=(paymentMode,paymentDetails)=>{
    const OrderDetails={uid,cartProducts,Price,selectAddress,paymentMode,paymentDetails}
    axios.post("http://localhost:9002/auth/add/Order",OrderDetails).then((res)=>{
      if(res.data.message==="Order Placed Successfully"){
        notifySuccess(res.data.message)
      }else{
        notifyError(res.data.message)
      }
    }).catch((error)=>console.log(error))
    setCartProducts([])
    navigate(from, { replace: true });
  }

  const handleSubmitVisa = (e) => {
    e.preventDefault();
    const paymentMode="Card"
    OrderPlaced(paymentMode,CreditCardDetails)
  };
  const handleSubmitPaypal = (e) => {
    e.preventDefault();
    const paymentMode="Paypal"
    OrderPlaced(paymentMode,PaypalDetails)
  };
  const handleSubmitCOD = (e) => {
    e.preventDefault();
    const paymentMode="Cash on Delivery"
    OrderPlaced(paymentMode)
  };

  return (
    <div className="modalCard">
      <Button variant="primary" className="py-2" onClick={handleShow}>
        Proceed to Checkout
      </Button>

      <Modal
        show={Show}
        onHide={handleClose}
        animation={false}
        className="modal fade"
        centered
      >
        <div className="modal-dialog">
          <h5 className="px-3 mb-3">Select Your Payment Method</h5>
          <div className="modal-content">
            <div className="modal-body">
              <div className="tabs mt-3">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      href="#visa"
                      className={`nav-link ${
                        ActiveTab === "visa" ? "active" : ""
                      }`}
                      id="visa-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="visa"
                      aria-selected={ActiveTab === "visa"}
                      onClick={() => handleTabChange("visa")}
                    >
                      <img
                        src="https://i0.wp.com/bukhamsen.com/wp-content/uploads/2019/03/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png?fit=788%2C235&ssl=1"
                        alt=""
                        width="80"
                      />
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      href="#paypal"
                      className={`nav-link ${
                        ActiveTab === "paypal" ? "active" : ""
                      }`}
                      id="paypal-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="paypal"
                      aria-selected={ActiveTab === "paypal"}
                      onClick={() => handleTabChange("paypal")}
                    >
                      <img
                        src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg"
                        alt=""
                        width="80"
                      />
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      href="#cod"
                      className={`nav-link ${
                        ActiveTab === "cod" ? "active" : ""
                      }`}
                      id="cod-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="cod"
                      aria-selected={ActiveTab === "cod"}
                      onClick={() => handleTabChange("cod")}
                    >
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLL57S9Egxw4bzPZjlwu56fRc4FkQBjScAZA&usqp=CAU"
                        alt=""
                        width="80"
                      />
                    </a>
                  </li>
                </ul>

                {/* content */}

                <div className="tab-content" id="myTabContent">
                  {/* visa content */}
                  <div
                    className={`tab-pane fade ${
                      ActiveTab === "visa" ? "show active" : ""
                    }`}
                    id="visa"
                    role="tabpanel"
                    aria-labelledby="visa-tab"
                  >
                    {/* visa tab content */}
                    <div className="mt-4 mx-4">
                      <div className="text-center">
                        <h5>Credit card</h5>
                      </div>
                      <form onSubmit={handleSubmitVisa}>
                        <div className="form mt-3">
                          <div className="inputbox">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              onChange={(e)=>setCreditCardDetails({...CreditCardDetails,CardHolderName:e.target.value})}
                              required
                            />
                            <span>Cardholder Name</span>
                          </div>
                          <div className="inputbox">
                            <input
                              type="text"
                              name="number"
                              id="number"
                              maxLength={16}
                              className="form-control"
                              onChange={(e)=>setCreditCardDetails({...CreditCardDetails,CardNumber:e.target.value})}
                              required
                            />
                            <span>Card Number</span>
                            <i className="fa fa-eye"></i>
                          </div>
                          <div className="d-flex flex-row">
                            <div className="inputbox">
                              <input
                                type="text"
                                name="number"
                                id="number"
                                maxLength={5}
                                className="form-control"
                                onChange={(e)=>setCreditCardDetails({...CreditCardDetails,ExpirationDate:e.target.value})}
                                required
                              />
                              <span>Expiration Date</span>
                            </div>
                            <div className="inputbox">
                              <input
                                type="password"
                                name="number"
                                id="number"
                                maxLength={3}
                                className="form-control"
                                onChange={(e)=>setCreditCardDetails({...CreditCardDetails,CVV:e.target.value})}
                                required
                              />
                              <span>CVV</span>
                            </div>
                          </div>
                          <div className="px-5 pay">
                            <button
                              type="submit"
                              className="btn btn-success btn-block"
                            >
                              Order Now
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* paypal content */}
                  <div
                    className={`tab-pane fade ${
                      ActiveTab === "paypal" ? "show active" : ""
                    }`}
                    id="paypal"
                    role="tabpanel"
                    aria-labelledby="paypal-tab"
                  >
                    <div className="mt-4 mx-4">
                      <div className="text-center">
                        <h5>Paypal Account Info</h5>
                      </div>
                      <form onSubmit={handleSubmitPaypal}>
                        <div className="form mt-3">
                          <div className="inputbox">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              onChange={(e)=>setPaypalDetails({...PaypalDetails,PaypalEmail:e.target.value})}
                              required
                            />
                            <span>Enter Your Email</span>
                          </div>
                          <div className="inputbox">
                            <input
                              type="text"
                              name="number"
                              id="number"
                              min="1"
                              max="999"
                              className="form-control"
                              onChange={(e)=>setPaypalDetails({...PaypalDetails,PaypalName:e.target.value})}
                              required
                            />
                            <span>Your Name</span>
                          </div>
                          <div className="d-flex flex-row">
                            <div className="inputbox">
                              <input
                                type="text"
                                name="number"
                                id="number"
                                min="1"
                                max="999"
                                className="form-control"
                                onChange={(e)=>setPaypalDetails({...PaypalDetails,ExtraInfo:e.target.value})}
                                required
                              />
                              <span>Extra info</span>
                            </div>
                          </div>
                          <div className="px-5 pay">
                            <button
                              type="submit"
                              className="btn btn-success btn-block"
                            >
                              Add Paypal
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* cod content */}
                  <div
                    className={`tab-pane fade ${
                      ActiveTab === "cod" ? "show active" : ""
                    }`}
                    id="COD"
                    role="tabpanel"
                    aria-labelledby="COD-tab"
                  >
                    <div className="mt-4 mx-4">
                      <div className="text-center">
                        <h5>Cash on Delivery</h5>
                      </div>
                      <form onSubmit={handleSubmitCOD}>
                        <div className="form mt-3">
                          {/* <div className="inputbox">
                            <input
                              type="text"
                              className="form-control"
                              required
                              hidden
                            />
                            <span></span>
                          </div> */}
                          <div className="px-5 pay">
                            <button
                              type="submit"
                              className="btn btn-success btn-block"
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* payment desclaimer */}
                <p className="mt-3 px-4 p-disclaimer">
                  <em>Payment Disclaimer: </em>In no event shall payment or
                  partial payment by Owner for any meterial or service
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckOutPage;
