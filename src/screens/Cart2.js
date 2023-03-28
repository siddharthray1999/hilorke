import React, { useContext, useEffect, useState } from "react";
import CartProductCont from "../Components/Cart/CartProductCont";
import "../Styles/pages/Cart2.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext, notification } from "../Context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import {
  GET_CART_ITEMS,
  ONLINE_PAYMENT,
  GET_USER_ADDRESS,
  DELETE_SAVED_ADDRESS,
  CHANGE_USER_CURRENT_ADDRESS,
  GET_USER_PROFILE2,
  CHECK_COD_AVAILABLE,
  ADD_USER_ADDRESS2,
  PLACE_ORDER_COD,
  GET_SHIPROCKET_COUNTRY,
  GET_SHIPROCKET_STATE,
  GET_SHIPROCKET_CITY,
  EDIT_ADDRESS,
} from "../Context/Types";
import "./Cart2.css";
import { Store } from "react-notifications-component";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CircularLoading from "../ui/CircularLoading/CircularLoading";
import OutlinedButton from "../ui/OutlinedButton/OutlinedButton";
import ContainedButton from "../ui/ContainedButton/ContainedButton";
import CustomModal from "../ui/CustomModal/CustomModal";
import { firebaseAuth } from "../firebase/firebase";

const Cart2 = () => {
  const { dispatch, auth, state } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newadd, setNewadd] = useState(false);
  const [cartItems, setCartitems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState(new Map());
  const [cartProductsQuant, setCartProductsQuant] = useState(new Map());
  const [cartProductsSize, setCartProductsSize] = useState(new Map());
  const [allCountries, setAllCountries] = useState([]);
  const [allLocalities, setAllLocalities] = useState([]);
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    isCurrent: false,
  });
  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(false);
  const [isLoading5, setIsLoading5] = useState(false);
  const [usersAddress, setUsersAddress] = useState([]);
  const [profileData, setProfileData] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewadd(false);
  };
  const [taxAndCharges, setTaxAndCharges] = useState({
    tax: 0,
    charge: 0,
  });
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [pin, setPin] = useState("");
  const [paymentType, setPaymentType] = useState("cod");
  const [isLoading6, setIsLoading6] = useState(false);
  const [isLoading7, setIsLoading7] = useState(false);
  const [isCodAvailable, setIsCodAvailable] = useState();
  const [expectedDate, setExpectedDate] = useState("");
  const [otpValue, setOtpValue] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
    disable: true,
  });
  const [isOtpVerModalOpen, setIsOtpVerModalOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [nextScreen, setNextScreen] = useState({
    isLoading: false,
    isShowNext: false,
    msg: "",
  });

  const [editedAddress, setEditedAddress] = useState({
    id: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    isCurrent: false,
  })


  const [isEditAddress, setIsEditAddress] = useState(false);

  const modalOpener = () => {
    setIsOtpVerModalOpen(true);
  };

  const getCartItems = async () => {
    dispatch({
      type: GET_CART_ITEMS,
      setIsLoading: setIsLoading,
      upDateState: setCartitems,
      setTaxAndCharges,
      taxAndCharges,
    });
  };
  const getAddress = () => {
    dispatch({
      type: GET_USER_ADDRESS,
      setUserAddress: setUsersAddress,
      setIsLoading,
    });
  };

  const cost = () => {
    setTotalCost(0);
    let price = 0;
    let quant = 1;
    cartItems?.forEach((item) => {
        price +=
        Number(cartProducts.get(item._id)) || item?.isDiscount
          ? Number(item?.offerprice)
          // ? Number(item?.offerprice)
          : Number(item?.price);
          // : Number(item?.price);
      cartProducts.set(
        item?._id,
        item?.productId?.isDiscount
          ? Number(item?.offerprice)
          // ? Number(item?.offerprice)
          : Number(item?.price)
          // : Number(item?.price)
      );
      quant += Number(cartProducts.get(item._id) && item.quantity);
      cartProductsQuant.set(item?._id, item.quantity);
      cartProductsSize.set(item?._id, item?.size);
    });

    setTotalQuantity(quant);
    setTotalCost(price);
  };

  const getShiprocketCountries = async () => {
    dispatch({
      type: GET_SHIPROCKET_COUNTRY,
      setAllCountries,
    });
  };

  const getShiprocketLocalities = async (e) => {
    const value = JSON.parse(e.target.value);
    setAddress((prev) => {
      return { ...prev, country: value.name };
    });

    setEditedAddress((prev) => {
      return {...prev, country: value.name}
    })
    dispatch({
      type: GET_SHIPROCKET_STATE,
      id: value?.id,
      setAllLocalities,
    });
  };

  const stateHandler = (e) => {
    setAddress((prev) => {
      return { ...prev, state: e.target.value };
    });
    setEditedAddress((prev) => {
      return {...prev, state: e.target.value}
    })
  };

  const addNewAddressHandler = (e) => {
    setAddress((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const updateAddress = () => {    
    dispatch({
      type: ADD_USER_ADDRESS2,
      address,
      setIsLoading2: setIsLoading3,
      setUsersAddress,
      setNewadd
    });
  };

  const deleteSavedAddress = (id) => {
    dispatch({
      type: DELETE_SAVED_ADDRESS,
      id,
      setUsersAddress,
      usersAddress,
    });
  };

  const changeCurrentAddress = (id) => {
    dispatch({
      type: CHANGE_USER_CURRENT_ADDRESS,
      id,
      setUsersAddress,
    });
  };

  const TotalCartCost = () => {
    let price = 0;
    let priceArr = Array.from(cartProducts.values());



    priceArr.forEach((item) => {
      price += Number(item);
    });

    setTotalCost(price);
  };
  const TotalCartQuantity = () => {
    let quantity = 1;
    let quantityArr = Array.from(cartProducts.values());

    quantityArr.forEach((item) => {
      quantity += Number(item);
    });
    setTotalQuantity(quantity);
  };
  useEffect(() => {
    window.scroll(0, 0);
    setTotalCost(0);
    setTotalQuantity(1);
    if (auth) {
      getAddress();
      getCartItems();
      getShiprocketCountries();
      // getChargesOnOrder();
      dispatch({
        type: GET_USER_PROFILE2,
        setProfileData,
        setIsLoading: setIsLoading4,
      });
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: GET_SHIPROCKET_CITY,
      userPincode: usersAddress?.filter((add) => add?.isCurrent === true)[0]
        ?.pincode,
      cartItem: cartItems,
      setTaxAndCharges,
      usersAddress,
    });
  }, [cartItems, dispatch, usersAddress]);

  const saveAndUpdateHandler = (e) => {
    e.preventDefault();
    updateAddress();
  };

  const checkCodAvailableHandler = (e) => {
    e.preventDefault();
    if (pin.length > 0) {
      dispatch({
        type: CHECK_COD_AVAILABLE,
        pincode: pin,
        setIsCodAvailable,
        setIsLoading: setIsLoading5,
        setExpectedDate,
      });
    } else {
      Store.addNotification({
        ...notification,
        type: "warning",
        message: "Enter Pincode!",
      });
    }
  };

  useEffect(() => {
    cost();
  }, [cartItems]);

  const handlePay = () => {
    let product = [];
    cartItems.forEach((item, index) => {
      product.push({
        productId: item.productId._id,
        quantity: cartProductsQuant.get(item._id),
        price: cartProducts.get(item._id),
        size: cartProductsSize.get(item._id) 
      });
    });

    if (paymentType === "cod") {
      dispatch({
        type: PLACE_ORDER_COD,
        productIds: product,
        cost: totalCost + taxAndCharges?.charge,
        address: usersAddress?.filter((add) => add?.isCurrent === true),
        affiliateKey: profileData?.affiliateKey,
        navigate,
        setIsLoading6,
      });
    } else {
      dispatch({
        type: ONLINE_PAYMENT,
        productIds: product,
        cost: totalCost + taxAndCharges?.charge,
        address: usersAddress?.filter((add) => add?.isCurrent === true),
        affiliateKey: profileData?.affiliateKey,
        navigate,
        setIsLoading6,
      });
    }
  };

  const paymentTypeSelector = (e) => {
    setPaymentType(e.target.value);
  };

  const handleInputChange = (e) => {
    setOtpValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const generateRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: otpVerifyHandler,
        },
        firebaseAuth
      );
    }
  };
  const otpSendHandler = (e) => {
    e.preventDefault();

    const newNumber = mobile.length > 0 ? mobile : profileData?.mobile;
    // const auth = getAuth();
    setNextScreen({
      isLoading: true,
      isShowNext: false,
      msg: "",
    });

    if (newNumber === "" || newNumber === undefined) {
      setNextScreen({
        isShowNext: false,
        isLoading: false,
        msg: "Enter valid Number",
      });
    }
    
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(firebaseAuth, "+91" + newNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setNextScreen({
          isShowNext: true,
          isLoading: false,
          msg: "OTP sent to your mobile",
        });
        Store.addNotification({
          ...notification,
          type: "success",
          message: "OTP sent to your mobile",
        });
      })
      .catch((error) => {
        console.log(error);
        setNextScreen({
          isShowNext: false,
          isLoading: false,
          msg: "OTP sent Failed!",
        });
        Store.addNotification({
          ...notification,
          type: "danger",
          message: "OTP sent Failed!",
        });
      });
  };

    

  const otpVerifyHandler = (e) => {
    e.preventDefault();
    setNextScreen((prev) => {
      return { ...prev, isLoading: true };
    });
    let otp =
      otpValue.otp1 +
      otpValue.otp2 +
      otpValue.otp3 +
      otpValue.otp4 +
      otpValue.otp5 +
      otpValue.otp6;

    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(Number(otp))
      .then((result) => {
        setIsOtpVerModalOpen(false);
        setNextScreen((prev) => {
          return { ...prev, isLoading: false };
        });
        Store.addNotification({
          ...notification,
          type: "success",
          message: "OTP Verified",
        });
        window.recaptchaVerifier = "";
        handlePay();
      })
      .catch((error) => {
        console.log(error);
        Store.addNotification({
          ...notification,
          type: "danger",
          message: "OTP Verified Failed",
        });
        setNextScreen((prev) => {
          return { ...prev, isLoading: false };
        });
      });
  };

  const otpModalCloseHandler = () => {
    setNextScreen({
      isShowNext: false,
      isLoading: false,
      msg: "OTP sent Failed!",
    });
    setIsOtpVerModalOpen(false);
  }

  const editAddressHandler = (e) => {
    setEditedAddress((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const updateAddressHandler = (e) => {
    e.preventDefault();
    setUsersAddress([...usersAddress?.filter((item) => item?._id !== editedAddress?.id), editedAddress]);
    dispatch({
      type: EDIT_ADDRESS,
      address: editedAddress,
      handleClose,
      setIsLoading: setIsLoading7,
      setIsEditAddress
    });
  }

  const editModalHandler = (item) => {
    setEditedAddress({
      line1: item?.line1,
      line2: item?.line2,
      city: item?.city,
      state: item?.state,
      pincode: item?.pincode,
      country: item?.country,
      isCurrent: item?.isCurrent,
      id: item?._id
    });
    setIsEditAddress(true);
  }

  return (
    <>
      <div id="recaptcha-container"></div>
      <h1 className="cart-heading-mobile">Cart</h1>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "grid",
            placeItems: "center",
            marginBottom: "30px",
          }}
        >
          <CircularLoading color="orange" />
        </div>
      ) : !auth ? (
        <div style={{ height: "90vh" }} className="wishlist-msg">
          <p>Login to get your orders!</p>
          <OutlinedButton navigateNow="/login" text="Login" />
        </div>
      ) : cartItems?.length === 0 ? (
        <div style={{ height: "90vh" }} className="wishlist-msg">
          <p>No item in cart!</p>
        </div>
      ) : (
        <div style={{ marginBottom: "100px" }} id="">
          <div id="CartDiv2main">
            <div id="cartDiv2">
              <div className="row flex align-items-center mb-3">
                <p style={{ margin: 0 }} className="col-6">
                  SHIPPING ADDRESS
                </p>
                <div className="col-6">
                  <ContainedButton onClick={handleOpen}>Change</ContainedButton>
                </div>
                <CustomModal open={open} handleClose={handleClose}>
                  <div style={{ width: "100%" }}>
                    <ClearIcon
                      onClick={()=>{handleClose(); setIsEditAddress(false)}}
                      style={{
                        float: "right",
                        cursor: "pointer",
                        color: "gray",
                      }}
                    />
                  </div>
                  {!newadd ? (
                    isEditAddress ? (
                      <>
                      <div>
                        <p style={{ color: "black" }}>Edit</p>
                      </div>
                      <div className="w-80">
                        <form>
                          <div className="alignS">
                            <p style={{color: "#808080"}}>Address line 1</p>
                            <input
                              onChange={editAddressHandler}
                              type="text"
                              name="line1"
                              id="address"
                              defaultValue={editedAddress?.line1}
                              style={{padding: '0 10px'}}
                              required
                              minLength={6}
                            />
                          </div>
                          <div className="alignS mt-2">
                            <p style={{color: "#808080"}}>Address line 2 ( Optional )</p>
                            <input
                              onChange={editAddressHandler}
                              type="text"
                              name="line2"
                              id="address_2"
                              defaultValue={editedAddress?.line2}
                              style={{padding: '0 10px'}}
                              required
                            />
                          </div>
                          <div className="alignS mt-2">
                            <p style={{color: "#808080"}}>City</p>
                            <input
                              onChange={editAddressHandler}
                              type="text"
                              name="city"
                              id="city"
                              defaultValue={editedAddress?.city}
                              style={{padding: '0 10px'}}
                              required
                            />
                          </div>

                          <div className="alignS mt-2">
                            <p style={{color: "#808080"}}>Country</p>
                            {/* <input type="text" /> */}
                            <select
                              onChange={getShiprocketLocalities}
                              name="country"
                              id="country"
                              className="mycountrycart"
                              defaultValue={editedAddress?.country}
                              style={{padding: '0 10px'}}
                              required
                            >
                              <option value={editedAddress?.country}>{editedAddress?.country}</option>
                              {allCountries?.map((country) => (
                                <option
                                  value={JSON.stringify({
                                    id: country.id,
                                    name: country?.name,
                                  })}
                                  key={country.id}
                                >
                                  {country?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="alignS mt-2">
                            <p style={{color: "#808080"}}>State</p>
                            {/* <input type="text" /> */}
                            <select
                              onChange={stateHandler}
                              name="state"
                              id="state"
                              className="mycountrycart"
                              defaultValue={editedAddress?.state}
                              required
                            >
                              <option value={editedAddress?.state}>{editedAddress?.state}</option>
                              {allLocalities?.map((localities) => (
                                <option value={localities?.name} key={localities?.id}>
                                  {localities?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="alignS mt-2">
                            <p style={{color: "#808080"}}>Zip Code</p>
                            <input
                              onChange={editAddressHandler}
                              type="text"
                              name="pincode"
                              id="zip_code"
                              defaultValue={editedAddress?.pincode}
                              style={{padding: '0 10px'}}
                              required
                            />
                          </div>
                          <div
                            style={{ width: "70%" }}
                            className="Button-align"
                          >
                            <button
                              onClick={updateAddressHandler}
                              className="AddButton"
                            >
                              {isLoading7 ? <CircularLoading color="white" /> : "Update"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </>
                    ) : (
                    <>
                      <div>
                        <p style={{ color: "black" }}>Current Addresses</p>
                      </div>
                      <div className="w-90 px-3">
                        {usersAddress?.filter(
                          (curAdd) => curAdd?.isCurrent === true
                        )?.length > 0 ? (
                          usersAddress
                            ?.filter((curAdd) => curAdd?.isCurrent === true)
                            ?.map((item, index) => {
                              return (
                                <div key={index} className="modal-grid row d-flex  justify-content-between">
                                  <div className="col-9">
                                    {item?.line1}, {item?.line2}, <br />{" "}
                                    {item?.city} - {item?.pincode}, <br />{" "}
                                    {item?.state}, {item?.country}
                                  </div>
                                  <div className="col-3 d-flex flex-column justify-content-between">
                                    <div className="alignE current-item"></div>
                                    <div className="d-flex align-items-center  justify-content-end">
                                    <EditIcon onClick={()=>editModalHandler(item)} style={{color:'gray', marginRight: '10px', cursor:'pointer'}}/>
                                      <div>
                                        <DeleteIcon
                                          style={{
                                            cursor: "pointer",
                                            color: "gray",
                                          }}
                                          onClick={() =>
                                            deleteSavedAddress(item?._id)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                        ) : (
                          <div
                            style={{
                              height: "200px",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span>No Current Address</span>
                          </div>
                        )}
                        <div style={{ marginLeft: "-17px" }}>
                          <p style={{ color: "black" }}>Saved Addresses</p>
                        </div>
                        {usersAddress?.filter(
                          (curAdd) => curAdd?.isCurrent !== true
                        )?.length > 0 ? (
                          usersAddress
                            ?.filter((curAdd) => curAdd?.isCurrent !== true)
                            ?.map((item, index) => {
                              return (
                                <div key={index} className="modal-grid2 row d-flex  justify-content-between">
                                  <div className="col-8">
                                    {item?.line1}, {item?.line2}, <br />{" "}
                                    {item?.city} - {item?.pincode}, <br />{" "}
                                    {item?.state}, {item?.country}
                                  </div>
                                  <div className="col-3 d-flex flex-column justify-content-between">
                                    <div
                                      onClick={() =>
                                        changeCurrentAddress(item?._id)
                                      }
                                      className="alignE saved-item"
                                    ></div>
                                    <div className="d-flex align-items-center justify-content-end">
                                      <EditIcon onClick={()=>editModalHandler(item)} style={{color:'gray', marginRight: '10px', cursor:'pointer'}}/>
                                      <div>
                                        <DeleteIcon
                                          style={{
                                            cursor: "pointer",
                                            color: "gray",
                                          }}
                                          onClick={() =>
                                            deleteSavedAddress(item?._id)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                        ) : (
                          <div
                            style={{
                              height: "200px",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span>No Saved Address</span>
                          </div>
                        )}
                        <div className="Button-align">
                          <button
                            onClick={() => setNewadd(true)}
                            className="AddButton"
                          >
                            Add New
                          </button>
                        </div>
                      </div>
                    </>

                    )
                  ) : (
                    <>
                      <div>
                        <p style={{ color: "black" }}>Add New Address</p>
                      </div>
                      <div className="w-80">
                        <form onSubmit={saveAndUpdateHandler}>
                          <div className="alignS">
                            <p style={{color: "#808080"}}>Address line 1</p>
                            <input
                              onChange={addNewAddressHandler}
                              type="text"
                              name="line1"
                              id="address"
                              style={{padding: '0 10px'}}
                              required
                              minLength={6}
                            />
                          </div>
                          <div className="alignS mt-2">
                            <p style={{color: "#808080"}}>Address line 2 ( Optional )</p>
                            <input
                              onChange={addNewAddressHandler}
                              type="text"
                              name="line2"
                              id="address_2"
                              style={{padding: '0 10px'}}
                              required
                            />
                          </div>
                          <div className="alignS mt-2">
                            <p style={{color: "#808080"}}>City</p>
                            <input
                              onChange={addNewAddressHandler}
                              type="text"
                              name="city"
                              id="city"
                              style={{padding: '0 10px'}}
                              required

                            />
                          </div>

                          <div className="alignS mt-2">
                            <p style={{color: "#808080"}}>Country</p>
                            {/* <input type="text" /> */}
                            <select
                              onChange={getShiprocketLocalities}
                              name="country"
                              id="country"
                              className="mycountrycart"
                              style={{padding: '0 10px'}}
                              required
                            >
                              {allCountries?.map((country) => (
                                <option
                                  value={JSON.stringify({
                                    id: country.id,
                                    name: country?.name,
                                  })}
                                  key={country?.id}
                                >
                                  {country?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="alignS mt-2">
                            <p style={{color: "#808080"}}>State</p>
                            {/* <input type="text" /> */}
                            <select
                              onChange={stateHandler}
                              name="state"
                              id="state"
                              className="mycountrycart"
                              style={{padding: '0 10px'}}
                              required
                            >
                              {allLocalities?.map((localities, index) => (
                                <option key={index} value={localities?.name}>
                                  {localities?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="alignS mt-2">
                            <p style={{color: "#808080"}}>Zip Code</p>
                            <input
                              onChange={addNewAddressHandler}
                              type="text"
                              name="pincode"
                              id="zip_code"
                              style={{padding: '0 10px'}}
                              required
                            />
                          </div>
                          <div
                            style={{ width: "70%" }}
                            className="Button-align"
                          >
                            <button
                              type="submit"
                              className="AddButton"
                            >
                              Save & Update
                            </button>
                          </div>
                        </form>
                      </div>
                    </>
                  )}
                </CustomModal>
              </div>
              <div>
                {usersAddress?.map((item, index) => {
                  if (item.isCurrent) {
                    return (
                      <div key={index} id="cart2">
                        <div id="add">
                          {item.line1} {item.line2} {item.city}
                          {"\n"}
                          {item.state} {item.country}-{item.pincode}
                        </div>
                      </div>
                    );
                  }
                })}
                <p>Mobile No: {profileData?.mobile}</p>
              </div>

              <div className="mt-5">
                <div className="changeField">
                  <form
                    style={{ paddding: "0 10px" }}
                    onSubmit={checkCodAvailableHandler}
                    className=""
                  >
                    <div className="d-flex align-items-center justify-content-around py-2">
                      <div style={{ width: "60%" }}>
                        <input
                          style={{
                            margin: 0,
                            height: "40px",
                            paddingLeft: "10px",
                            color: "#808080"
                          }}
                          className="inputText"
                          type="text"
                          onChange={(e) => setPin(e.target.value)}
                          placeholder="Enter Pincode"
                        />
                      </div>
                      <button style={{borderRadius:'6px'}} type="submit" className="changeButton">
                        {isLoading5 ? (
                          <CircularLoading
                            color="white"
                          />
                        ) : (
                          "Check"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {!isCodAvailable ? (
                <span></span>
              ) : (
                <>
                  <div className="mt-3 color-cart-gray" id="add">
                    Expected delivery by {String(expectedDate).slice(0, 15)}
                  </div>
                  <div className="mt-1 color-cart-gray" id="add">
                    {isCodAvailable?.isAvailable
                      ? "COD Available"
                      : "COD Not Available"}
                  </div>
                  <div className="mt-1 color-cart-gray" id="add">
                    Return Available with 15 days
                  </div>
                </>
              )}

              <FormControl style={{ marginTop: "40px" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Payment Mode
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onChange={paymentTypeSelector}
                >
                  <FormControlLabel
                    checked={paymentType === "cod" ? true : false}
                    value="cod"
                    control={<Radio style={{ color: "orange" }} />}
                    label="Cash On Delivery"
                  />
                  <FormControlLabel
                    checked={paymentType !== "cod" ? true : false}
                    value="prepaid"
                    control={<Radio style={{ color: "orange" }} />}
                    label="Razorpay"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div id="cartDiv2Other">
              <div
                className="ColCart1"
                style={{ marginTop: "0", paddingTop: "0" }}
              >
                <div id="CartIn2">
                  {cartItems.map((item, idx, originalArr) => {
                    return (
                      <CartProductCont
                        key={item._id}
                        item={item}
                        setTotalQuantity={setTotalQuantity}
                        cartProducts={cartProducts}
                        cartProductsQuant={cartProductsQuant}
                        cartProductsSize={cartProductsSize}
                        TotalCartCost={TotalCartCost}
                        TotalCartQuantity={TotalCartQuantity}
                        getCartItems={getCartItems}
                      />
                    );
                  })}
                </div>
                <div id="CartIn3">
                  <div className="CartRow">
                    <div>Subtotal</div>
                    <div>₹ {totalCost}</div>
                  </div>
                  <div className="CartRow">
                    <div>Delivery Charge</div>
                    <div>+ ₹ {taxAndCharges?.charge}</div>
                  </div>
                  <div className="CartRow">
                    <div className="DarkcartText">Total</div>
                    <div className="DarkcartText">
                      ₹ {totalCost + taxAndCharges?.charge}
                    </div>
                  </div>
                  <div className="Button-align">
                    {/* <NavLink to="/order-success"> */}
                    <button
                      onClick={() =>
                        paymentType === "cod" ? modalOpener() : handlePay()
                      }
                      className="checkoutButton"
                    >
                      {isLoading6 ? (
                        <CircularLoading
                          color="white"
                        />
                      ) : (
                        "Checkout"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isOtpVerModalOpen && (
        <div className="overlay-background">
          <div className="modal-container">
            <div className="modal-top-bar">
              <ContainedButton onClick={otpModalCloseHandler}><CloseIcon style={{ color: "red", borderRadius: "10px" }}/></ContainedButton>
            </div>

            <div className="modal-center-item">
              {nextScreen.isShowNext ? (
                <>
                  <h5 className="modal-center-item-header">
                    Enter the OTP to verify your number
                  </h5>
                  <form>
                    <div className="otp-formCOntainer">
                      <input
                        name="otp1"
                        type="text"
                        autoComplete="off"
                        className="OtpinputBox"
                        value={otpValue.otp1}
                        onChange={handleInputChange}
                        placeholder=""
                        autoFocus={true}
                        // maxlength="1"
                        tabIndex="1"
                        maxLength="1"
                        onKeyUp={(e) => inputfocus(e)}
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
                        tabIndex="2"
                        maxLength="1"
                        onKeyUp={(e) => inputfocus(e)}
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
                        tabIndex="3"
                        maxLength="1"
                        onKeyUp={(e) => inputfocus(e)}
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
                        tabIndex="4"
                        maxLength="1"
                        onKeyUp={(e) => inputfocus(e)}
                      />
                      <input
                        name="otp5"
                        type="text"
                        autoComplete="off"
                        className="OtpinputBox"
                        value={otpValue.otp5}
                        onChange={handleInputChange}
                        placeholder=""
                        // maxlength="1"
                        tabIndex="5"
                        maxLength="1"
                        onKeyUp={(e) => inputfocus(e)}
                      />
                      <input
                        name="otp6"
                        type="text"
                        autoComplete="off"
                        className="OtpinputBox"
                        value={otpValue.otp6}
                        onChange={handleInputChange}
                        placeholder=""
                        // maxlength="1"
                        tabIndex="6"
                        maxLength="1"
                        onKeyUp={(e) => inputfocus(e)}
                      />
                    </div>
                    <div className="modal-button-container">
                      <ContainedButton onClick={otpVerifyHandler}>
                        {nextScreen.isLoading ? (
                            <CircularLoading
                              color="orange"
                            />
                          ) : (
                            "Verify and Place Order"
                          )}
                      </ContainedButton>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h5 className="modal-center-item-header">
                    Enter your mobile number to verify
                  </h5>
                  <form>
                    <label htmlFor="mobile">Mobile</label>
                    <input
                      style={{ height: "60px", paddingLeft: "10px" }}
                      onChange={(e) => setMobile(e.target.value)}
                      defaultValue={profileData?.mobile}
                      type="mobile"
                      required
                      id="mobile"
                      placeholder="Enter your mobile number"
                    />
                    <div className="modal-button-container">
                      <ContainedButton onClick={otpSendHandler}>
                        {nextScreen.isLoading ? (
                          <CircularLoading
                            color="orange"
                          />
                        ) : (
                          "Request for OTP"
                        )}
                      </ContainedButton>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart2;
