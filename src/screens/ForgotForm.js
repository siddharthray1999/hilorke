import React, { useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext, notification } from "../Context/AuthContext";
import { RESET_USER_PASSWORD } from "../Context/Types";
import { Store } from "react-notifications-component";
import CircularLoading from "../ui/CircularLoading/CircularLoading";
import PasswordVisibityOff from "../ui/PasswordVisibiltyOff/PasswordVisibityOff";
import PasswordVisibilityOn from "../ui/PasswordVisiblityOn/PasswordVisibilityOn";

const ForgotForm = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState(state.email);
  const [pass, setPass] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
      if (pass === confirmpass) {
        dispatch({
          type: RESET_USER_PASSWORD,
          data: {
            email,
            password: pass,
          },
          navigate,
          setIsLoading
        });
      } else {
        Store.addNotification({
          ...notification,
          type: 'warning',
          message: "Password and Confirm Password mismatch!"
        })
      }
  };


  return (
    <>
      <div className="LoginMainContainer">
        <div className="LoginContainer1">
          <div>

            <div id="loginDiv1">Password Change</div>
            <div id="loginDiv2">Please type the New Password Carefully.</div>
          </div>

          <div className="form-container2">
            <div>
              <form id="loginDiv3" onSubmit={onSubmitHandler}>
                <div className="forgotform-input-div">

                <input
                  name="email"
                  className="inputBox"
                  value={state.email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or Phone"
                  disabled={state.email.length === 0 ? false : true}
                  type="email"
                />
                </div>
                <div className="forgotform-input-div">
                <input
                  type={isShow ? "text" : "password"}
                  name="password"
                  className="inputBox"
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Password"
                />
                    {
                      isShow ? <PasswordVisibityOff setIsShow={setIsShow} isShow={isShow} /> : <PasswordVisibilityOn setIsShow={setIsShow} isShow={isShow}/>
                    }
                </div>
                <div className="forgotform-input-div">

                <input
                  type={isShow2 ? "text" : "password"}
                  name="confirmpassword"
                  className="inputBox"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm Password"
                />
                    {
                      isShow2 ? <PasswordVisibityOff setIsShow={setIsShow2} isShow={isShow2} /> : <PasswordVisibilityOn setIsShow={setIsShow2} isShow={isShow2}/>
                    }
                </div>
                <button className="SignUpButton" type="submit">
                  {isLoading? <CircularLoading color="white"/> : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotForm;
