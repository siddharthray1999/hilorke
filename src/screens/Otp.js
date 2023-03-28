import React, { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import {
  USER_ACCOUNT_ACTIVATE,
  USER_RESEND_OTP,
} from "../Context/Types";
import "../Styles/pages/Otp.css";
// import "../Styles/pages/ForgotPass.css";
import "../Styles/pages/Login.css"
import CircularLoading from "../ui/CircularLoading/CircularLoading";

const Otp = () => {
  const { dispatch } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    disable: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otpIsLoading, setOtpIsLoading] = useState(false);


  if (location.state?.isSigned !== true)
    return <Navigate to="/" />;

  const handleInputChange = (e) => {
    setOtpValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const optSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: USER_ACCOUNT_ACTIVATE,
      payload: otpValue,
      id: location.state?.id,
      setIsLoading,
      navigate,
    });
  };
  const resendOtp = () => {

    dispatch({
      type: USER_RESEND_OTP,
      payload: location.state?.id,
      setIsLoading: setOtpIsLoading,
    });
  };

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus()
      }
    }
    else { 
        const next = elmnt.target.tabIndex;
        if (next < 4) {
          elmnt.target.form.elements[next].focus()
        }
    }

  }

  return (
    <>
      <div className="LoginMainContainer">
        <div className="LoginContainer1">
          <div className="otpscreenTopCon">

            <div id="OtpDiv1">Enter the code to Verify your phone</div>
            <div id="loginDiv2">
              Please type the verification code sent to {location.state?.email}
            </div>
          </div>
          <div>
            <form id="loginDiv3" onSubmit={optSubmit}>
              <div id="OtpDiv4">
                <div></div>
                <input
                  name="otp1"
                  type="text"
                  autoComplete="off"
                  className="OtpinputBox"
                  value={otpValue.otp1}
                  onChange={handleInputChange}
                  placeholder=""
                  // maxlength="1"
                  tabIndex="1" maxLength="1" onKeyUp={e => inputfocus(e)}
                />
                <input
                  name="otp2"
                  type="text"
                  autoComplete="off"
                  className="OtpinputBox"
                  value={otpValue.otp2}
                  onChange={handleInputChange}
                  placeholder=""
                  // maxlength="1"
                  autoFocus={true}
                  tabIndex="2" maxLength="1" onKeyUp={e => inputfocus(e)}
                />
                <input
                  name="otp3"
                  type="text"
                  autoComplete="off"
                  className="OtpinputBox"
                  value={otpValue.otp3}
                  onChange={handleInputChange}
                  placeholder=""
                  // maxlength="1"
                  tabIndex="3" maxLength="1" onKeyUp={e => inputfocus(e)}
                />
                <input
                  name="otp4"
                  type="text"
                  autoComplete="off"
                  className="OtpinputBox"
                  value={otpValue.otp4}
                  onChange={handleInputChange}
                  placeholder=""
                  // maxlength="1"
                  tabIndex="4" maxLength="1" onKeyUp={e => inputfocus(e)}
                />
              </div>

              <div id="Resend" onClick={resendOtp}>
                {otpIsLoading ? (
                  <CircularLoading color="white"/>
                ) : (
                  "Resend OTP"
                )}
              </div>
              <button className="SignUpButton" type="submit">
                {isLoading ? (
                  <CircularLoading color="white"/>
                ) : (
                  "Verify Now"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
