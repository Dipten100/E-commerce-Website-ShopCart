import React, { useContext, useState } from "react";

import "../registration/Registration.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AllContext } from "../contexts/ContextProvider";

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

const Registration = () => {
  const { setAdmin } = useContext(AllContext);
  const [activeForm, setActiveForm] = useState("sign-up");
  const [PasswordType, setPasswordType] = useState("password");
  const [SignUpPasswordType, setSignUpPasswordType] = useState("password");
  const [ConfrimPasswordType, setConfrimPasswordType] = useState("password");
  const [SignUP, setSignUP] = useState({
    name: "",
    email: "",
    password: "",
    confrimPassword: "",
  });
  const [SignIN, setSignIN] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const afterSuccessful = (user) => {
    const { _id } = user;
    const details = { _id, isActive: true };
    localStorage.setItem("admin", JSON.stringify(details));
    setAdmin(user);
  };

  const showSignUpPassword = () => {
    if (SignUpPasswordType === "password") {
      setSignUpPasswordType("text");
    } else {
      setSignUpPasswordType("password");
    }
  };
  const showSignUpConfrimPassword = () => {
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

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    const { password, confrimPassword } = SignUP;
    if (password.length < 6) {
      notifyError("Password length should be greater than equal 6");
    } else {
      if (password !== confrimPassword) {
        notifyError("Invalid Credential");
      } else {
        axios
          .post("http://localhost:9002/auth/register", SignUP)
          .then((res) => {
            // console.log(res)
            if (res.data.message === "User already Registered") {
              notifyMsg(res.data.message);
            } else if (res.data.message === "Succcessfully registered") {
              const user = res.data.user;
              afterSuccessful(user);
              notifySuccess(res.data.message);
              navigate(from, { replace: true });
            } else {
              notifyError(res.data.message);
            }
          });
      }
    }
  };
  const handleSubmitSignIn = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9002/auth/login", SignIN)
      .then((res) => {
        console.log(res);
        if (res.data.message === "Successfully log in") {
          const admin = res.data.user;
          afterSuccessful(admin);
          notifySuccess(res.data.message);
          navigate(from, { replace: true });
        } else if (res.data.message === "User not Found") {
          notifyMsg(res.data.message);
        } else {
          notifyError(res.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <ToastContainer />
      <div className="body">
        <div
          className={`login-container ${
            activeForm === "sign-up" ? "active" : ""
          }`}
          id="container"
        >
          <div className="form-container sign-up">
            <form onSubmit={handleSubmitSignUp}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="UserName"
                onChange={(e) => setSignUP({ ...SignUP, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setSignUP({ ...SignUP, email: e.target.value })
                }
                required
              />
              <div className="password-block">
                <input
                  type={SignUpPasswordType}
                  placeholder="Password"
                  onChange={(e) =>
                    setSignUP({ ...SignUP, password: e.target.value })
                  }
                  required
                />
                {SignUpPasswordType === "password" ? (
                  <i
                    className="icofont-eye-blocked fs-2 cursor-pointer"
                    onClick={showSignUpPassword}
                  ></i>
                ) : (
                  <i
                    className="icofont-eye fs-2 cursor-pointer"
                    onClick={showSignUpPassword}
                  ></i>
                )}
              </div>
              <div className="password-block">
                <input
                  type={ConfrimPasswordType}
                  placeholder="Confrim Password"
                  onChange={(e) =>
                    setSignUP({ ...SignUP, confrimPassword: e.target.value })
                  }
                  required
                />
                {ConfrimPasswordType === "password" ? (
                  <i
                    className="icofont-eye-blocked fs-2 cursor-pointer"
                    onClick={showSignUpConfrimPassword}
                  ></i>
                ) : (
                  <i
                    className="icofont-eye fs-2 cursor-pointer"
                    onClick={showSignUpConfrimPassword}
                  ></i>
                )}
              </div>
              <button type="submit">SignUp</button>
            </form>
          </div>

          <div className="form-container sign-in">
            <form onSubmit={handleSubmitSignIn}>
              <h1>SignIn</h1>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setSignIN({ ...SignIN, email: e.target.value })
                }
                required
              />
              <div className="password-block">
                <input
                  type={PasswordType}
                  placeholder="Password"
                  onChange={(e) =>
                    setSignIN({ ...SignIN, password: e.target.value })
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
              <button type="submit">SignIn</button>
            </form>
          </div>

          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back</h1>
                <p>Enter your details to access feature of this site</p>
                <button
                  className={`login-hidden`}
                  onClick={() => setActiveForm("sign-in")}
                >
                  SignIn
                </button>
              </div>
              <div className="toggle-button">
                <i className="icofont-angle-double-right"></i>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello Dear</h1>
                <p>Enter your details and let's get start it</p>
                <button
                  className={`login-hidden`}
                  onClick={() => setActiveForm("sign-up")}
                >
                  SignIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
