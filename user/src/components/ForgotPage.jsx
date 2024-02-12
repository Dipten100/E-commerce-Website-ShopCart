import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "../components/ForgotPage.css";
import axios from "axios";

const title = "Forgot Password";
const btnText = "Submit";
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
const notifyMsg = (msg) =>
  toast(msg, {
    position: toast.POSITION.TOP_CENTER,
  });

const ForgotPage = () => {
  const [PasswordType, setPasswordType] = useState("password");
  const [ConfrimPasswordType, setConfrimPasswordType] = useState("password");
  const [ShowSignButton, setShowSignButton] = useState(false);
  const [FromData, setFromData] = useState({
    email: "",
    password: "",
    confrimPassword: "",
  });

  const showConfrimPassword = () => {
    if (ConfrimPasswordType === "password") {
      setConfrimPasswordType("text");
    } else {
      setConfrimPasswordType("password");
    }
  };
  const showPassword = () => {
    if (PasswordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const { email, password, confrimPassword } = FromData;
    if (email) {
      if (password.length < 6) {
        notifyError("Password should be greater equal to 6");
      } else {
        if (password === confrimPassword) {
          axios
            .post("http://localhost:9002/auth/forgotPassword", FromData)
            .then((res) => {
              if (res.data.message === "Password Update Successful") {
                notifySuccess(res.data.message);
                notifyMsg(
                  "Please click sign In button for go to the sign in page to sign in"
                );
                setShowSignButton(true);
                // navigate("/Register")
              } else {
                notifyError(res.data.message);
              }
            })
            .catch((error) => console.log(error));
        } else {
          notifyError("Password does not matched");
        }
      }
    } else {
      notifyError("Please Enter Email");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form
              action=""
              className="account-form"
              onSubmit={handleForgotPassword}
            >
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={FromData.email}
                  onChange={(e) =>
                    setFromData({ ...FromData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type={PasswordType}
                  placeholder="New Password *"
                  value={FromData.password}
                  onChange={(e) =>
                    setFromData({ ...FromData, password: e.target.value })
                  }
                  required
                />
                {PasswordType === "password" ? (
                  <i
                    className="icofont-eye-blocked fs-2 cursor-pointer"
                    onClick={showPassword}
                  ></i>
                ) : (
                  <i
                    className="icofont-eye fs-2 cursor-pointer"
                    onClick={showPassword}
                  ></i>
                )}
              </div>
              <div className="input-box">
                <input
                  type={ConfrimPasswordType}
                  placeholder="Confrim password *"
                  value={FromData.confrimPassword}
                  onChange={(e) =>
                    setFromData({
                      ...FromData,
                      confrimPassword: e.target.value,
                    })
                  }
                  required
                />
                {ConfrimPasswordType === "password" ? (
                  <i
                    className="icofont-eye-blocked fs-2 cursor-pointer"
                    onClick={showConfrimPassword}
                  ></i>
                ) : (
                  <i
                    className="icofont-eye fs-2 cursor-pointer"
                    onClick={showConfrimPassword}
                  ></i>
                )}
              </div>
              {/* showing message */}
              <div className="form-group">
                <button type="submit" className="d-block lab-btn">
                  <span>{btnText}</span>
                </button>
                {ShowSignButton ? (
                  <Link to={"/Register"}>
                    <button type="button" className="d-block lab-btn">
                      <span>Sign In</span>
                    </button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
