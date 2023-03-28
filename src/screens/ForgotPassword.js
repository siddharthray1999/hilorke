import React, { useState } from "react";
import "../Styles/pages/ForgotPass.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { USER_FORGOTPASSWORD } from "../Context/Types";
import CircularLoading from "../ui/CircularLoading/CircularLoading";


const ForgotPassword = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: USER_FORGOTPASSWORD,
      email,
      navigate,
      setIsLoading
    });
  };

  return (
    <>
      <div className="LoginMainContainer">
        <div className="forgotContainer1">
          <div className="forgottopcontainer">

            <div id="loginforgotDiv1">Forget Password?</div>
            <div id="loginforgotDiv2">
              Please type your email to verification.
            </div>
          </div>

              <form onSubmit={onSubmitHandler} className="form-container2">
                <div className="form-container">
                  <div>
                    <input
                      onChange={handleChange}
                      name="email"
                      className="inputBox inputBoxforgot"
                      placeholder="Email"
                      style={{ width: '100%' }}
                      required
                      type="email"
                    />
                  </div>
                  <div className="forgotbuttonContainer">
                    <button className="loginButton my-3" type="submit">
                      {isLoading ? <CircularLoading color="orange"/> : "Continue" }
                    </button>
                  </div>
                </div>
              </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
