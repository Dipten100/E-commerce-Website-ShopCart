import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import noImage from "../assets/images/no image/noImage.jpg";
import "../components/NavItem.css";
import { AllContext } from "../contexts/ContextProvider";
import axios from "axios";

const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const { cartProducts,User, setUser,SelectAddress,setSelectAddress } = useContext(AllContext);
  const [LogInStatus, setLogInStatus] = useState(false);
  // check is user login or not?
  // authInfo
  const item=JSON.parse(localStorage.getItem("user"))
  useEffect(()=>{
    if(item && item.isActive){
      setLogInStatus(true)
      axios.post("http://localhost:9002/auth/getUserDetails",item).then(res=>{
        if(res.data.message==="Send user Details"){
          setUser(res.data.user)
        }else{
          console.log(res.data.message)
        }
      })
    }else{
      setLogInStatus(false)
    }
  },[item])

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  });
  const handleLogOut=()=>{
    setLogInStatus(false)
    setUser(null)
    localStorage.removeItem('user')
  }

  const name = "User Name";

  return (
    <header
      className={`header-section style-4 ${
        headerFixed ? "header-fixed fadeInUp" : ""
      }`}
    >
      {/* header top start */}
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            <Link to="/Register" className="lab-btn me-3">
              <span>Register</span>
            </Link>
          </div>
        </div>
      </div>
      {/* header bottom */}
      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            {/* logo */}
            <div className="logo-search-acte">
              <div className="logo">
                <Link to={"/"}>
                  <img src={logo} alt="" />
                </Link>
              </div>
            </div>

            {/* menu area */}
            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/cart-page">Cart ({cartProducts.length})</Link>
                  </li>
                </ul>
              </div>

              {/* sign in & log in */}
              <div className={`${LogInStatus ? "hidden" : ""}`}>
                <Link to="/Register" className="lab-btn me-3 d-none d-md-block">
                  Register
                </Link>
              </div>

              {/* Show LogIn */}
              <div className={`dropdown ${LogInStatus ? "" : "hidden"}`}>
                <button type="button" className="dropbtn">
                  <img className="login-img" src={User?.photoURL || noImage} alt="" />
                  {User?.displayName}
                  <i className="icofont-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link to={`info/` + User?.uid}>
                    <a href="#">Account Information</a>
                  </Link>
                  <Link to={`orderList/` + User?.uid}>
                    <a href="#">Order List</a>
                  </Link>
                  <Link to={`/`}>
                  <a href="#" id="logout" onClick={handleLogOut}>Log Out</a>
                  </Link>
                </div>
              </div>

              {/* menu toggler */}
              <div
                onClick={() => setMenuToggle(!menuToggle)}
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              {/* social toggler */}
              <div
                className={`ellepsis-bar d-md-none ${
                  LogInStatus ? "hidden" : ""
                }`}
                onClick={() => setSocialToggle(!socialToggle)}
              >
                <i className="icofont-info-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavItems;
