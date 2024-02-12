import React, { useContext, useState } from "react";

import "../components/Register.css";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
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

const Register = () => {
  const [activeForm, setActiveForm] = useState("sign-up");
  const [SignUPData, setSignUPData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [SignINData, setSignINData] = useState({
    email: "",
    password: "",
  });
  const { signUpWithGmail, createUser, login } = useContext(AuthContext);
  const { setUser } = useContext(AllContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // Store data in localstorage
  const store = (user) => {
    const { uid, _id } = user;
    const details = { uid, _id, isActive: true };
    localStorage.setItem("user", JSON.stringify(details));
    setUser(user);
  };

  // Sign Up Form Handling
  const afterSuccessfulSignUp = (user, inputByUser) => {
    const merge = { user, inputByUser };
    axios
      .post("http://localhost:9002/auth/UserRegister", merge)
      .then((res) => {
        // console.log(res);
        if (res.data.message === "Succcessfully registered") {
          store(res.data.user);
          notifySuccess(res.data.message);
          navigate(from, { replace: true });
        } else if (res.data.message === "User already Registered") {
          notifyMsg(res.data.message);
        } else {
          notifyError(res.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = SignUPData;
    if (password.length < 6) {
      notifyError("Password Length must be greater equal to 6");
    } else {
      if (password !== confirmPassword) {
        notifyError("Pasword did not matched!!!");
      } else {
        createUser(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            const inputByUser = { provider: "manual", name, email, password };
            afterSuccessfulSignUp(user, inputByUser);
          })
          .catch((error) => {
            notifyError(error.message);
          });
      }
    }
  };
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const inputByUser = { provider: "Google" };
        afterSuccessfulSignUp(user, inputByUser);
      })
      .catch((error) => {
        console.log(error);
        notifyError("Please provide valid email & password!");
      });
  };

  // Sign In Form Handling
  const afterSuccessfulSignIn = (user, inputByUser) => {
    const merge = { user, inputByUser };
    axios
      .post("http://localhost:9002/auth/userLogin", merge)
      .then((res) => {
        if (res.data.message === "Log In Successfull") {
          store(res.data.user);
          notifySuccess(res.data.message);
          navigate(from, { replace: true });
        } else {
          notifyError(res.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSubmitSignIn = (e) => {
    e.preventDefault();
    const { email, password } = SignINData;
    // const inputByUser = { provider: "manual", email, password };
    const user = {};
    const inputByUser = { provider: "manual", email, password };
    afterSuccessfulSignIn(user,inputByUser);
    // login(email, password)
    //   .then((result) => {
    //     const user = result.user;
    //     const inputByUser = { provider: "manual", email, password };
    //     afterSuccessfulSignIn(user, inputByUser);
    //   })
    //   .catch((error) => {
    //     const errorMsg = error.message;
    //     notifyError("Please provide valid email & password!");
    //   });
  };
  const handleLogIn = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const inputByUser = { provider: "Google" };
        afterSuccessfulSignIn(user, inputByUser);
      })
      .catch((error) => {
        console.log(error);
        notifyError("Please provide valid email & password!");
      });
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
              <div className="social-icons">
                <a href="#">
                  <i
                    className="icofont-brand-google fa-brands"
                    onClick={handleRegister}
                  ></i>
                </a>
              </div>
              <span>or use your email for registeration</span>
              <input
                type="text"
                placeholder="UserName"
                onChange={(e) =>
                  setSignUPData({ ...SignUPData, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setSignUPData({ ...SignUPData, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setSignUPData({ ...SignUPData, password: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Confrim Password"
                onChange={(e) =>
                  setSignUPData({
                    ...SignUPData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
              <button type="submit">SignUp</button>
            </form>
          </div>

          <div className="form-container sign-in">
            <form onSubmit={handleSubmitSignIn}>
              <h1>SignIn</h1>
              <div className="social-icons">
                <a href="#">
                  <i
                    className="icofont-brand-google fa-brands"
                    onClick={handleLogIn}
                  ></i>
                </a>
              </div>
              <span>or use your email and password</span>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setSignINData({ ...SignINData, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setSignINData({ ...SignINData, password: e.target.value })
                }
                required
              />{" "}
              <button type="submit">SignIn</button>
              <Link to={"/forgotpass"}>Forgot Password</Link>
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

export default Register;
