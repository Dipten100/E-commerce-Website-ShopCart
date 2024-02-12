import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import "../userInfromation/UserInformation.css";
import { AllContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

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

const UserInformation = () => {
  const { User , setUser } = useContext(AllContext);
  const { _id } = User || {};
  const [UserDetails, setUserDetails] = useState({
    id: _id,
    displayName: "",
    email: "",
    photoURL: "",
  });
  const [Done, setDone] = useState(false);
  const [Show, setShow] = useState(false);
  const [PasswordType, setPasswordType] = useState("password");
  const [ConfrimPasswordType, setConfrimPasswordType] = useState("password");
  const [Password, setPassword] = useState({
    id: _id,
    password: "",
    confirmPassword: "",
  });
  
  useEffect(()=>{
    if(User && !Done){
      setUserDetails({
        ...UserDetails,
        displayName: User?.displayName,
        email: User?.email,
        photoURL: User?.photoURL,
      });
      setDone(true)
    }
  },[User])
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const showPassword = () => {
    if (PasswordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const showConfrimPassword = () => {
    if (ConfrimPasswordType === "password") {
      setConfrimPasswordType("text");
    } else {
      setConfrimPasswordType("password");
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = Password;
    if (password.length < 6) {
      notifyError("Password length should be greater than equal 6");
    } else {
      if (password !== confirmPassword) {
        notifyError("password didn't match");
      } else {
        axios
          .post("http://localhost:9002/auth/userPasswordUpdate", Password)
          .then((res) => {
            if (res.data.message === "Profile Password Updated Successfully") {
              notifySuccess(res.data.message);
              setUser(res.data.data)
            } else {
              notifyError(res.data.message);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(UserDetails)
    const { displayName, email } = UserDetails;
    if (!displayName || !email) {
      notifyError("Please fill name & email fields");
    } else {
      axios.post("http://localhost:9002/auth/userDataUpdate", UserDetails).then((res) => {
        console.log(res);
        if (res.data.message === "Profile Updated Successfully") {
          notifySuccess(res.data.message);
          setUser(res.data.data)
        } else {
          notifyError(res.data.message);
        }
      });
    }
  };

  return (
    <div>
      <PageHeader title={"User Account Information"} curPage={"information"} />

      <div className="padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm">
              <form className="user-from" onSubmit={handleUpdate}>
                <div className="user-details">
                  <h4>User ID: </h4>
                  <input
                    type="text"
                    name="uid"
                    id="uid"
                    className="text-box-format"
                    value={User?.uid}
                    readOnly
                  />
                </div>
                {/* <div className="user-details">
                  <img src={UserDetails.photoURL} className="user-img" alt="" />
                  <h4>Image URL: </h4>
                  <span>
                    <input
                      type="text"
                      name="photoURL"
                      id="photoURL"
                      className="text-box-format"
                      value={UserDetails.photoURL}
                      onChange={(e) =>
                        setUserDetails({
                          ...UserDetails,
                          photoURL: e.target.value,
                        })
                      }
                    />
                  </span>
                </div> */}
                <div className="user-details">
                  <h4>Display Name: </h4>
                  <input
                    type="text"
                    name="displayName"
                    id="displayName"
                    className="text-box-format"
                    value={UserDetails.displayName}
                    onChange={(e) =>
                      setUserDetails({
                        ...UserDetails,
                        displayName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="user-details">
                  <h4>Email: </h4>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="text-box-format"
                    value={UserDetails.email}
                    onChange={(e) =>
                      setUserDetails({
                        ...UserDetails,
                        emailcc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="update-btn">
                  <button
                    type="button"
                    className="lab-btn update"
                    onClick={handleShow}
                  >
                    Change Password
                  </button>
                  <button type="submit" className="lab-btn update">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={Show}
        onHide={handleClose}
        animation={false}
        className="modal fade"
        centered
      >
        <div className="modal-body justify-content-center align-items-center">
          <h5 className="px-3 m-3 bb-3 p-3">Change Password</h5>
          <form onSubmit={handleChangePassword}>
            <div className="d-flex p-3">
              <label htmlFor="" className="C-B-B">
                New Password
              </label>
              <input
                type={PasswordType}
                placeholder="Enter your New Password"
                className="fs-6"
                onChange={(e) =>
                  setPassword({ ...Password, password: e.target.value })
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
            <div className="d-flex p-3">
              <label htmlFor="" className="C-B-B">
                Confrim Password
              </label>
              <input
                type={ConfrimPasswordType}
                placeholder="Confrim Password"
                className="fs-6"
                onChange={(e) =>
                  setPassword({ ...Password, confirmPassword: e.target.value })
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
            <button type="submit" className="lab-btn">
              Change password
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UserInformation;
