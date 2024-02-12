import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { useEffect } from "react";
import "../Components/Navber.css";
import noImage from "../assets/images/no image/noImage.jpg";
import { AllContext } from "../contexts/ContextProvider";
import axios from "axios";

const Navber = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [LogIn, setLogIn] = useState(false);
  const { Admin, setAdmin } = useContext(AllContext);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  });
  const items = JSON.parse(localStorage.getItem("admin"));
  useEffect(() => {
    if (items && items.isActive) {
      setLogIn(true);
      // set Admin
      axios.post("http://localhost:9002/auth/getDetails", items).then((res) => {
        if (res.data.message === "Send user Details") {
          setAdmin(res.data.user);
        } else {
          console.log(res.data.message);
        }
      });
    } else {
      setLogIn(false);
    }
  }, [items]);

  const handleLogOut = () => {
    setLogIn(false);
    setAdmin(null);
    localStorage.removeItem("admin");
  };

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
            <Link to="/Reg" className="lab-btn me-3">
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
            <div className={`menu-area`}>
              <div className={`menu ${Admin ? "":"hidden"}`}>
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <Link to={"/"}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to={"/add"}>Add Items</Link>
                  </li>
                  <li>
                    <Link to={"/addCategory"}>Add Items Category</Link>
                  </li>
                  <li>
                    <Link to="/order">Order List</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              {/* sign in & log in */}
              <div className={`${LogIn ? "hidden" : ""}`}>
                <Link to="/Reg" className={`lab-btn me-3 d-none d-md-block`}>
                  Register
                </Link>
              </div>
              <div className={`dropdown ${LogIn ? "" : "hidden"}`}>
                <button type="button" className="dropbtn">
                  <img className="login-img" src={noImage} alt="" />
                  {Admin?.name}
                  <i className="icofont-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link to={`info/` + Admin?._id}>
                    <a href="#">Account Information</a>
                  </Link>
                  <Link to={`/`}>
                    <a href="#" id="logout" onClick={handleLogOut}>
                      Log Out
                    </a>
                  </Link>
                </div>
              </div>

              {/* menu toggler */}
              <div
                onClick={() => setMenuToggle(!menuToggle)}
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""} ${Admin ? "":"hidden"}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              {/* social toggler */}
              {!LogIn && (
                <div
                  className="ellepsis-bar d-md-none"
                  onClick={() => setSocialToggle(!socialToggle)}
                >
                  <i className="icofont-info-square"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navber;
