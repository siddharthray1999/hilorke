import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext, notification } from "../Context/AuthContext";
import { useContext } from "react";
import {
  USER_VERIFYCODE,
  USER_FORGOT_RESEND_OTP,
} from "../Context/Types";
import { Store } from "react-notifications-component";
import CircularLoading from "../ui/CircularLoading/CircularLoading";
const VerifyOtp = () => {
  const { dispatch } = useContext(AuthContext);

  const { state } = useLocation();
  const navigate = useNavigate();
  const [otpD, setOtpD] = useState("");
  const [email, setEmail] = useState(state.email);
  const [loading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    setOtpD(e.target.value);
  };

  const resendOtpHandler = () => {
      dispatch({
        type: USER_FORGOT_RESEND_OTP,
        email,
      });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(otpD.length < 4 || otpD.length > 4) {
      Store.addNotification({
        ...notification,
        type: 'warning',
        message: "Otp Should should be 4 numbers only!"
      })
    } else {
      dispatch({
        type: USER_VERIFYCODE, /// type.js se function
        values: {
          email: email,
          code: Number(otpD),
        },
        navigate,
        setIsLoading
      });
    }
  };

  return (
    <>
      <div className="LoginMainContainer">
        <div className="LoginContainer1">
          <div>

            <div id="loginDiv1">Verify Otp</div>
            <div style={{ width: '100%' }} id="loginDiv2">Please Enter the Code for verification.</div>
          </div>
          <div className="form-container2">
            <form style={{ width: '100%' }} id="loginDiv3" onSubmit={onSubmitHandler}>
              <input
                name="email"
                className="inputBox"
                style={{ marginBottom: '30px' }}
                value={state.email}
                placeholder="Email or Phone"
                onChange={(e) => setEmail(e.target.value)}
                disabled={state.email.length === 0 ? false : true}
                type="email"
              />
              <input
                name="code"
                className="inputBox"
                onChange={onChangeHandler}
                placeholder="Enter OTP"
                style={{ marginBottom: '10px' }}
              />
              <span
                onClick={resendOtpHandler}
                style={{
                  marginLeft: "auto",
                  color: "#fd7e14",
                  cursor: "pointer",
                  marginBottom: '30px'
                }}
              >
                Resend OTP
              </span>
              <button className="SignUpButton" type="submit">
                {loading ? <CircularLoading color="orange"/> : "Verify Code"}
              </button>
            </form>
          </div>
          {/* <div id="loginDiv4"></div> */}
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
