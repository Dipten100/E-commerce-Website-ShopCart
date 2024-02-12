import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../Components/PageHeader";

import "../UserInformation/UserInformation.css";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const UserInformation = () => {
  const { id } = useParams();
  const _id = id;
  const [UserDetails, setUserDetails] = useState({
    id: id,
    name: "",
    email: "",
  });
  const [Show, setShow] = useState(false);
  const [PasswordType, setPasswordType] = useState("password");
  const [ConfrimPasswordType, setConfrimPasswordType] = useState("password");
  const [Password, setPassword] = useState({
    id: id,
    password: "",
    confirmPassword: "",
  });
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
  useEffect(() => {
    axios
      .post("http://localhost:9002/auth/getDetails", { _id })
      .then((res) => {
        const { name, email } = res.data.user;
        setUserDetails({...UserDetails,
          name,
          email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          .post("http://localhost:9002/auth/updateAdminPass", Password)
          .then((res) => {
            if (res.data.message === "Password change successfully") {
              notifySuccess(res.data.message);
            } else {
              notifyError(res.data.message);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  };

  const handleUpdate=(e)=>{
    e.preventDefault()
    const {name,email}=UserDetails
    if(!name || !email){
      notifyError('Please fill name & email fields')
    }else{
      axios.post("http://localhost:9002/auth/updateProfile",UserDetails).then((res)=>{
        console.log(res)
        if(res.data.message==="Update successfully"){
          notifySuccess(res.data.message)
        }else{
          notifyError(res.data.message)
        }
      })
    }
  }

  return (
    <div>
      <PageHeader title={"User Account Information"} curPage={"information"} />

      <div className="padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm">
              <form action="#" className="user-from">
                <div className="user-details">
                  <h4>User ID: </h4>
                  <input
                    type="text"
                    name="uid"
                    id="uid"
                    className="text-box-format"
                    value={UserDetails?.id}
                    readOnly
                  />
                </div>
                <div className="user-details">
                  <h4>Display Name: </h4>
                  <input
                    type="text"
                    name="displayName"
                    id="displayName"
                    className="text-box-format"
                    value={UserDetails?.name}
                    onChange={(e) =>
                      setUserDetails({ ...UserDetails, name: e.target.value })
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
                    value={UserDetails?.email}
                    onChange={(e) =>
                      setUserDetails({ ...UserDetails, email: e.target.value })
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
                  <button type="submit" className="lab-btn update" onClick={handleUpdate}>
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
