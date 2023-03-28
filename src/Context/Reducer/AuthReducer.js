import {
  userAccActivateRequest,
  userLoginRequest,
  userResendOtpRequest,
  userSignUpRequest,
  userForgotpasswordRequest,
  userVerifyCode,
  resetUserPasswordRequest,
  shiprocketLogin,
} from "../API";
import { Store } from "react-notifications-component";
import { notification } from "../AuthContext";
import Cookies from "js-cookie";
import { addItemToCartLogin } from "./ProductReducer";


export const userLogin = async (
  values,
  setIsLoading,
  navigate,
  setAuth,
  setInitialState
) => {
  setIsLoading(true);
  try {
    const res = await userLoginRequest(values);
    if (res.data) {
        Cookies.set("auth_token", res.data.token);
        Cookies.set("role", "user");
        setAuth((prev) => true);
        if(localStorage.getItem("cartSave")) {
          const values = JSON.parse(localStorage.getItem("cartSave"));
          addItemToCartLogin(values, navigate)
        }else {
          navigate("/", { replace: true });
        }
        setInitialState((prev) => {
          return {
            ...prev,
            isAuthenticated: true,
            user: res?.data?.user,
            token: res?.data?.token,
          }
        })
      }
    } catch (err) {
    Store.addNotification({
      ...notification,
      type: "danger",
      message: err.response.data,
    });
  }
};
export const userSignup = async (values, setIsLoading, navigate) => {
  setIsLoading(true);
  // eslint-disable-next-line no-new-object
  let formValues = new Object({
    name: String(values.name),
    email: String(values.email),
    mobile: String(values.mobile),
    password: String(values.password),
  });

  // const data = encodeURIComponent(formValues);

  try {
    const res = await userSignUpRequest(formValues);
    if (res.data.message === "Account Activation Mail Sent!") {
      Store.addNotification({
        ...notification,
        type: "success",
        message: "Account Activation Mail Sent.",
      });
      navigate("/otp", {
        state: {
          isSigned: true,
          id: res.data.user._id,
          email: res.data.user.email,
          role: "user",
        },
      });
    }
  } catch (err) {
    setIsLoading(false);
    Store.addNotification({
      ...notification,
      type: "danger",
      message: err?.response?.data,
    });
  }
};
export const userAccActivate = async (values, id, setIsLoading, navigate) => {
  setIsLoading(true);
  const otp = Number(values.otp1 + values.otp2 + values.otp3 + values.otp4);
  const formvalues = {
    id: id,
    code: otp,
  };
  try {
    const res = await userAccActivateRequest(formvalues);
    if (res.data) {
      Store.addNotification({
        ...notification,
        type: "success",
        message: "Account Activated",
      });
      navigate("/login", {
        state: {
          role: "user",
        },
        replace: true,
      });
    }
  } catch (err) {
    Store.addNotification({
      ...notification,
      type: "danger",
      message: "Something went wrong!",
    });
  } finally {
    setIsLoading(false);
  }
};
export const userResendOtp = async (id, setIsLoading) => {
  setIsLoading(true);
  const values = {
    id: id,
  };
  try {
    const res = await userResendOtpRequest(values);
    if (res.data) {
      Store.addNotification({
        ...notification,
        type: "success",
        message: "OTP sent to you registered email",
      });
    }
  } catch (err) {
    console.log(err);
    Store.addNotification({
      ...notification,
      type: "danger",
      message: err.response.data,
    });
  } finally {
    setIsLoading(false);
  }
};
export const userForgotPass = async (email, navigate, setIsLoading) => {
  try {
    setIsLoading(true)
    const res = await userForgotpasswordRequest(email);
    if (res.data.message==="Email Sent") {
      setIsLoading(false);
      Store.addNotification({
        ...notification,
        type: "success",
        message: "OTP Sent to your email.",
      });
      navigate("/verifyotp", { state: { email: email, role: "user" } });
    } else {
      setIsLoading(false);
      Store.addNotification({
        ...notification,
        type: "danger",
        message: "OTP Send Failed!",
      });
    }
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    Store.addNotification({
      ...notification,
      type: "danger",
      message: err?.response?.data,
    });
  }
};
export const userForgotResendOtp = async (email) => {
  try {
    const res = await userForgotpasswordRequest(email);
    if (res.data.message==="Email Sent") {
      Store.addNotification({
        ...notification,
        type: "success",
        message: "OTP Sent to your email.",
      });
    } else {
      Store.addNotification({
        ...notification,
        type: "danger",
        message: "OTP Send Failed!",
      });
    }
  } catch (err) {
    console.log(err);
    Store.addNotification({
      ...notification,
      type: "danger",
      message: "OTP Send Failed!",
    });
  }
};
export const userVerifyOtp = async (values, navigate, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await userVerifyCode(values);
    if (res.data.message === "Verification Successful") {
      Store.addNotification({
        ...notification,
        type: 'success',
        message: "Otp Verified."
      })
      navigate("/passwordchange", {
        state: { email: values.email, role: "user" },
      });
    } else {
      Store.addNotification({
        ...notification,
        type: 'danger',
        message: "Otp Verification Failed."
      })
    }
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    Store.addNotification({
      ...notification,
      type: 'danger',
      message: err?.response?.data?.message
    })
  }
};
export const resetUserPassword = async (data, navigate, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await resetUserPasswordRequest(data);
    if (res.data.message === "Password Reset Successful") {
      navigate("/login", { state: { role: "user" } });
    }
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    Store.addNotification({
      ...notification,
      type: 'danger',
      message: "Something went wrong!"
    })
  }
};