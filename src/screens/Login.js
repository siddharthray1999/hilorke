import React, { useContext, useState } from "react";
import "../Styles/pages/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, notification } from "../Context/AuthContext";
import { USER_LOGIN } from "../Context/Types";
import axios from "axios";
import { provider, firebaseAuth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import googleIcon from "../Assets/Images/google.png";
import googleIcon2 from "../Assets/Images/googlelogo2.gif";
import { Store } from "react-notifications-component";
import { addItemToCartLogin } from "../Context/Reducer/ProductReducer";
import CircularLoading from "../ui/CircularLoading/CircularLoading";
import PasswordVisibityOff from "../ui/PasswordVisibiltyOff/PasswordVisibityOff";
import PasswordVisibilityOn from "../ui/PasswordVisiblityOn/PasswordVisibilityOn";

const Login = () => {
  const { dispatch, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginCred, setLoginCred] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: USER_LOGIN,
      payload: loginCred,
      setIsLoading,
      navigate,
    });
  };

  const handleChange = (e) => {
    setLoginCred((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleGoogleAuth = () => {
    setGoogleLoading(true);
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;

        axios
          .post("https://api.hilorke.com/auth/socialLogin", {
            firebaseId: user.accessToken,
          })
          .then(async(res) => {
              Cookies.set("auth_token", res.data.token);
              Cookies.set("role", "user");
              setAuth((prev) => true);
              setGoogleLoading(false);
              if(localStorage.getItem("cartSave")) {
                const values = JSON.parse(localStorage.getItem("cartSave"));
                addItemToCartLogin(values, navigate)
              }else {
                navigate("/", { replace: true });
              }
          })
          .catch((err) => {
            console.log(err)
            Store.addNotification({
              ...notification,
              type: "danger",
              message: "Login Failed!",
            });
            setGoogleLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setGoogleLoading(false);
      });
  };

  return (
    <>
      <div className="LoginMainContainer">
        <div className="LoginContainer1">
          <div>
            <div id="loginDiv1">Welcome</div>
            <div id="loginDiv2">Log In to Your Account</div>
          </div>
              <form onSubmit={handleSubmit} className="form-container2">
                <div className="form-container">
                  <div className="inputContainerlogin">
                    <input
                      onChange={handleChange}
                      name="email"
                      className="inputBox"
                      placeholder="Email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="password-input">
                    <input
                      onChange={handleChange}
                      name="password"
                      className="inputBox"
                      type={isShow ? "text" : "password"}
                      placeholder="Password"
                      required
                    />
                    {
                      isShow ? <PasswordVisibityOff setIsShow={setIsShow} isShow={isShow} /> : <PasswordVisibilityOn setIsShow={setIsShow} isShow={isShow}/>
                    }
                  </div>
                  <div>
                    <Link
                      to="/forgotpassword"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <div id="forgotPas">Forgot Password?</div>
                    </Link>
                  </div>
                  <div className="loginbuttonContainer">
                    <button className="loginButton" type="submit">
                      {isLoading ? (
                        <CircularLoading color="orange"/>
                      ) : (
                        "Log in"
                      )}
                    </button>
                  </div>
                  <div className="loginbuttonContainer">
                    <Link to="/signup">
                      <button className="SignUpButton">Sign up</button>
                    </Link>
                  </div>
                </div>
              </form>
          <div onClick={handleGoogleAuth} className="google align-items-center">
            {
              googleLoading ? (
                <div className="google-login-cont">
                  <div className="google-logo-container">
                    <img src={googleIcon2} alt="google-icon" />
                  </div>
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="google-login-cont">
                  <div className="google-logo-container">
                    <img src={googleIcon} alt="google-icon" />
                  </div>
                  <span>Login with Google</span>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
