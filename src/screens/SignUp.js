import React, { memo, useContext, useState } from "react";
import "../Styles/pages/SignUp.css";
import { Link, } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext, notification } from "../Context/AuthContext";
import { USER_SIGNUP } from "../Context/Types";
import { Store } from "react-notifications-component";
import CircularLoading from "../ui/CircularLoading/CircularLoading";
import PasswordVisibityOff from "../ui/PasswordVisibiltyOff/PasswordVisibityOff";
import PasswordVisibilityOn from "../ui/PasswordVisiblityOn/PasswordVisibilityOn";

const SignUp = () => {
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleChange = (e) => {
    setIsPasswordMatch(true);
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(userDetails.password !== userDetails.confirmPassword) {
      Store.addNotification({
        ...notification,
        type: 'warning',
        message: "Password and Confirmed Password mismatched!"
      })
      setIsPasswordMatch(false);
    } else {
      dispatch({
        type: USER_SIGNUP,
        payload: userDetails,
        setIsLoading,
        navigate,
      });
    }
  };

  return (
    <>
      <div style={{ height: "100vh" }} className="LoginMainContainer">
        <div className="LoginContainer1">
          <div>

            <div id="loginDiv1">
              Create Account
            </div>
            <div id="loginDiv2">Sign up to Your Account</div>
          </div>
              <form onSubmit={handleSubmit} className="form-container2">
                <div className="form-container">
                  <div className="inputContainerlogin">
                    <input
                      onChange={handleChange}
                      name="name"
                      className="inputBox"
                      placeholder="Name *"
                      required
                      type="text"
                      minLength="6"
                    />
                  </div>
                  <div className="inputContainerlogin">
                    <input
                      onChange={handleChange}
                      name="mobile"
                      className="inputBox"
                      placeholder="Phone *"
                      style={{ width: '100%' }}
                      type="text"
                      required
                      minLength="10"
                      maxLength="10"
                    />
                  </div>
                  <div className="inputContainerlogin">
                    <input
                      onChange={handleChange}
                      name="email"
                      className="inputBox"
                      placeholder="Email *"
                      type="email"
                      required
                    />
                  </div>
                  <div className="inputContainerlogin">
                    <input
                      onChange={handleChange}
                      name="password"
                      className="inputBox"
                      placeholder="Password *"
                      type={isShow ? "text" : "password"}
                      required
                      min="6"
                    />
                                        {
                      isShow ? <PasswordVisibityOff setIsShow={setIsShow} isShow={isShow} /> : <PasswordVisibilityOn setIsShow={setIsShow} isShow={isShow}/>
                    }
                  </div>
                  <div className="inputContainerlogin">
                    <input
                      onChange={handleChange}
                      name="confirmPassword"
                      className={`inputBox inputBoxlast ${!isPasswordMatch && "isWrong"}`}
                      placeholder="Confirm Password *"
                      style={{ width: '100%' }}
                      type={isShow2 ? "text" : "password"}
                      required
                      min="6"
                    />
                    {
                      isShow2 ? <PasswordVisibityOff setIsShow={setIsShow2} isShow={isShow2} /> : <PasswordVisibilityOn setIsShow={setIsShow2} isShow={isShow2}/>
                    }
                  </div>

                  <div className="loginbuttonContainer">

                    <button
                      className="SignUpButton"
                      type="submit"
                    >
                      {isLoading ? (
                        <CircularLoading color="white"/>
                      ) : (
                        "Sign up"
                      )}
                    </button>
                  </div>
                  <div className="loginbuttonContainer">
                    <label className="account-label">Already have  an account?</label>
                    <Link to="/login">
                      <button className="already-button"
                        style={{
                          cursor: "pointer",
                          border: "none",
                          backgroundColor: "white",
                          color: "#FF8D22",
                          fontWeight: "bold",
                          marginLeft: "8px"
                        }}
                      >
                        Login
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
        </div>
      </div>
    </>
  );
};

export default memo(SignUp);
