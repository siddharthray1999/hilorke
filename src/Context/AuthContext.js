import { createContext, useEffect, useReducer, useState } from "react";
import {
  userAccActivate,
  userLogin,
  userResendOtp,
  userSignup,
  userForgotPass,
  userVerifyOtp,
  resetUserPassword,
  userForgotResendOtp,
} from "./Reducer/AuthReducer";
import {
  USER_LOGIN,
  USER_SIGNUP,
  USER_ACCOUNT_ACTIVATE,
  USER_RESEND_OTP,
  USER_FORGOTPASSWORD,
  USER_VERIFYCODE,
  RESET_USER_PASSWORD,
  GET_CUSTOMER_ADS,
  GET_ALL_CATEGORY,
  GET_PRODUCT_BY_CATEGORY,
  GET_ALL_PRODUCTS,
  GET_SUBCATEGORY,
  GET_SUB_PRODUCTS,
  JOIN_AFFILIATE,
  GET_CUSTOMER_AFFILIATES,
  GET_WISHLIST_ITEMS,
  ADD_ITEM_CART,
  REMOVE_ITEM_TO_WISHLIST,
  GET_TOP_PRODUCTS,
  GET_PRODUCT_DETAILS,
  ADD_ITEM_TO_WISHLIST,
  CHECK_WISHLIST_STATUS,
  CHECK_ITEM_IN_CART,
  SEND_PRODUCT_REVIEW,
  REPORT_PRODUCT,
  GET_CART_ITEMS,
  GET_USER_ADDRESS,
  ADD_USER_ADDRESS2,
  DELETE_SAVED_ADDRESS,
  CHANGE_USER_CURRENT_ADDRESS,
  GET_USER_PROFILE2,
  CHECK_COD_AVAILABLE,
  DELETE_ITEM_FROM_CART,
  PLACE_ORDER_COD,
  ONLINE_PAYMENT,
  LOGOUT,
  SEARCG_PRODUCT,
  UPLOAD_PROFILE_PIC,
  GET_USER_PROFILE,
  ADD_USER_ADDRESS,
  UPDATE_USER_PROFILE,
  GET_WALLET_DETAILS,
  GET_MY_ORDERS,
  CANCEL_ORDER,
  RETURN_ITEM,
  GET_USER_NOTIFICATION,
  GET_ALL_PRODUCT_BY_AFF,
  LEAVE_AFFILIATE,
  GET_SHIPROCKET_COUNTRY,
  GET_SHIPROCKET_STATE,
  GET_SHIPROCKET_CITY,
  SHIPROCKET_ORDER_STATUS,
  GET_PRODUCT_BY_SUBCATEGORY,
  USER_FORGOT_RESEND_OTP,
  GET_SHIPROCKET_ORDER_DETAILS,
  EDIT_ADDRESS,
} from "./Types";
import { ReactNotifications } from "react-notifications-component";
import Cookies from "js-cookie";
import {
  addItemToCart,
  addItemToWishlist,
  checkItemInCart,
  checkProductWishlistStatus,
  deleteItemFromCart,
  getALlCategory,
  getALLproducts,
  getTopProducts,
  getCartItems,
  getProductDetails,
  getWishlistItems,
  removeItemFromWishlist,
  getProductByCatId,
  searchProducts,
  getCustomersAds,
  getSub,
  getSubProductDetail,
  getMyWalletInfo,
  sendReport,
  sendReview,
  getProductBySubCatId,
} from "./Reducer/ProductReducer";
import {
  getCustomerAffiliateReq,
  getProductByAff,
  leaveAffiliate,
} from "./Reducer/AffiliateReducer";
import {
  addUserAddressData,
  changeCurrentUserAdd,
  userProfile,
  updateUserProfiles,
  userLogout,
  uploadProfilePic,
  deleteSavedAdd,
  userProfile2,
  addUserAddressData2,
  getUserNotificationReq,
  getUserAddress,
  editAddress,
} from "./Reducer/ProfileReducer";
import {
  cancelOrderHandler,
  checkCODAvailable,
  getMyOrder,
  getShiprocketOrderDetails,
  returnITem,
  shiprocketOrderStatusHandler,
} from "./Reducer/OrderReducer";
import { joinAffliate } from "./Reducer/AffiliateReducer";
import { makeOrderCod, onlinePayment } from "./Reducer/PaymentReducer";
import {
  getShiprocketCity,
  getShiprocketCountry,
  getShiprocketState,
} from "./Reducer/shiprocketReducer";
export const AuthContext = createContext();
export const notification = {
  insert: "top",
  container: "top-right",
  animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
  animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
  dismiss: {
    duration: 5000,
    showIcon: true,
  },
};
const AuthContextComponent = ({ children }) => {
  const [auth, setAuth] = useState(Cookies.get("auth_token"));
  const [AuthRole, setAuthRole] = useState(Cookies.get("role"));
  const [initialState, setInitialState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    cartData: [],
  });
  const [currentUser, setCurrentUser] = useState({
    id: null,
  });

  useEffect(() => {
    setCurrentUser({
      id: Cookies.get("auth_token"),
    });
  }, [auth]);

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      //Authenticatin Screens Cases
      case USER_LOGIN:
        userLogin(
          action.payload,
          action.setIsLoading,
          action.navigate,
          setAuth,
          setInitialState
        );
        break;

      case USER_SIGNUP:
        userSignup(action.payload, action.setIsLoading, action.navigate);
        return state;

      case USER_ACCOUNT_ACTIVATE:
        userAccActivate(
          action.payload,
          action.id,
          action.setIsLoading,
          action.navigate
        );
        return state;

      case USER_RESEND_OTP:
        userResendOtp(action.payload, action.setIsLoading);
        return state;

      case USER_FORGOTPASSWORD:
        userForgotPass(action.email, action.navigate, action.setIsLoading);
        return state;

      case USER_FORGOT_RESEND_OTP:
        userForgotResendOtp(action.email);
        return state;

      case USER_VERIFYCODE:
        userVerifyOtp(action.values, action.navigate, action.setIsLoading);
        return state;

      case RESET_USER_PASSWORD:
        resetUserPassword(action.data, action.navigate, action.setIsLoading);
        return state;

      //Home Screen Cases
      case GET_CUSTOMER_ADS:
        getCustomersAds(action.setAllAds, action.setIsLoading);
        return state;

      case GET_ALL_CATEGORY:
        getALlCategory(action.upDateState, action.setIsLoading);
        return state;

      case GET_PRODUCT_BY_CATEGORY:
        getProductByCatId(
          action.catId,
          action.setAllProducts,
          action.setIsLoading
        );
        return state;
      case GET_PRODUCT_BY_SUBCATEGORY:
        getProductBySubCatId(
          action.catId,
          action.setAllProducts,
          action.setIsLoading
        );
        return state;

      case GET_ALL_PRODUCTS:
        getALLproducts(action.upDateState);
        return state;

      case GET_SUBCATEGORY:
        getSub(action.id, action.upDateState, action.subCategoryData);
        return state;

      case GET_SUB_PRODUCTS:
        getSubProductDetail(action.id, action.upDateState);
        return state;

      //Affiliate Screen Cases
      case GET_ALL_PRODUCT_BY_AFF:
        getProductByAff(action.id, action.setAllProducts, action.setIsLoading);
        return state;

      //Affiliate Program Screen Cases
      case JOIN_AFFILIATE:
        joinAffliate(action.payload, action.upDateState, action.setIsLoading);
        return state;

      //Affiliate Joined Screen Cases
      case GET_CUSTOMER_AFFILIATES:
        getCustomerAffiliateReq(action.setAllAffiliates, action.setIsLoading);
        return state;

      case LEAVE_AFFILIATE:
        leaveAffiliate(
          action.id,
          action.allAffiliates,
          action.setAllAffiliates,
          action.setIsLoading
        );
        return state;

      //Wishlist Screen Cases
      case GET_WISHLIST_ITEMS:
        getWishlistItems(action.upDateState, action.setIsLoading);
        return state;

      case ADD_ITEM_CART:
        addItemToCart(
          action.payload,
          action.upDateState,
          action.setIsLoading,
          action.cb
        );
        return {
          ...state,
          cartData: action.payload,
        };

      case REMOVE_ITEM_TO_WISHLIST:
        removeItemFromWishlist(
          action.payload,
          action.upDateState,
          action.setIsLoading,
          action.cb
        );
        return state;

      //Product Detail Screen Cases
      case GET_TOP_PRODUCTS:
        getTopProducts(
          action.upDateState,
          action.page,
          action.limit,
          action.setIsLoading
        );
        return state;

      case GET_PRODUCT_DETAILS:
        getProductDetails(
          action.payload,
          action.upDateState,
          action.setIsLoading,
          action.setSubCatId
        );
        return state;

      case ADD_ITEM_TO_WISHLIST:
        addItemToWishlist(
          action.payload,
          action.upDateState,
          action.setIsLoading,
          action.navigate
        );
        return state;

      case CHECK_WISHLIST_STATUS:
        checkProductWishlistStatus(action.payload, action.upDateState);
        return state;

      case CHECK_ITEM_IN_CART:
        checkItemInCart(
          action.payload,
          action.upDateState,
          action.setIsLoading
        );
        return state;

      case SEND_PRODUCT_REVIEW:
        sendReview(
          action.id,
          action.productQuality,
          action.packaging,
          action.delivery,
          action.comment,
          action.image,
          action.video
        );
        return state;

      case REPORT_PRODUCT:
        sendReport(
          action.product,
          action.issueName,
          action.description,
          action.setActiveReport
        );
        return state;

      //Cart Screen Cases
      case GET_CART_ITEMS:
        getCartItems(
          action.setIsLoading,
          action.upDateState,
          action.setTaxAndCharges,
          action.taxAndCharges
        );
        return state;

      case GET_USER_ADDRESS:
        getUserAddress(action.setUserAddress, action.setIsLoading);
        return state;

      case ADD_USER_ADDRESS2:
        addUserAddressData2(
          action.address,
          action.setIsLoading2,
          action.setUsersAddress,
          action.setNewadd
        );
        return state;

      case DELETE_SAVED_ADDRESS:
        deleteSavedAdd(action.id, action.setUsersAddress, action.usersAddress);
        return state;

      case CHANGE_USER_CURRENT_ADDRESS:
        changeCurrentUserAdd(action.id, action.setUsersAddress);
        return state;

      case GET_USER_PROFILE2:
        userProfile2(action.setProfileData, action.setIsLoading);
        return state;

      case CHECK_COD_AVAILABLE:
        checkCODAvailable(
          action.pincode,
          action.setIsCodAvailable,
          action.setIsLoading,
          action.setExpectedDate
        );
        return state;

      case DELETE_ITEM_FROM_CART:
        deleteItemFromCart(
          action.payload,
          action.cb,
          action.setIsLoading,
          action.cartProducts,
          action.cartProdId
        );
        return {
          ...state,
          cartData: state?.cartData?.filter(
            (item) => item?.productId !== action.payload?.productId[0]
          ),
        };

      case PLACE_ORDER_COD:
        makeOrderCod(
          action.productIds,
          action.cost,
          action.address,
          action.affiliateKey,
          action.navigate,
          action.setIsLoading6
        );
        return state;

      case ONLINE_PAYMENT:
        onlinePayment(
          action.productIds,
          action.cost,
          action.address,
          action.affiliateKey,
          action.navigate,
          action.setIsLoading6
        );
        return state;

      case GET_SHIPROCKET_CITY:
        getShiprocketCity(
          action.userPincode,
          action.cartItem,
          action.setTaxAndCharges,
          action.usersAddress
        );
        return state;

      //User Profile Screen Cases
      case LOGOUT:
        userLogout(action.navigate, setAuth);
        return {
          isAuthenticated: false,
          user: null,
          token: null,
          cartData: [],
        };

      //Search Screen Cases
      case SEARCG_PRODUCT:
        searchProducts(
          action.name,
          action.catId,
          action.upDateState,
          action.setIsLoading
        );
        return state;

      //Edit Profile Screen Cases
      case UPLOAD_PROFILE_PIC:
        uploadProfilePic(action.data);
        return state;

      case GET_USER_PROFILE:
        userProfile(
          action.upDateState,
          action.setImage,
          action.setUpdatePf,
          action.setIsLoading
        );
        return state;

      case ADD_USER_ADDRESS:
        addUserAddressData(
          action.address,
          action.setIsLoading2,
          action.handleClose,
          action.setUsersAddress
        );
        return state;

      case UPDATE_USER_PROFILE:
        updateUserProfiles(action.data, action.setIsLoading2, setInitialState, initialState);
        break;

      case GET_SHIPROCKET_COUNTRY:
        getShiprocketCountry(action.setAllCountries);
        return state;

      case GET_SHIPROCKET_STATE:
        getShiprocketState(action.id, action.setAllLocalities);
        return state;

      case EDIT_ADDRESS:
        editAddress(
          action.address,
          action.handleClose,
          action.setIsLoading,
          action.setIsEditAddress
        );
        return state;

      //MyWallet Screen Cases
      case GET_WALLET_DETAILS:
        getMyWalletInfo(action.setWalletData, action.setIsLoading);
        return state;

      //MyOrders Screen Cases
      case GET_MY_ORDERS:
        getMyOrder(
          action.setIsLoading,
          action.setAllDeliveredOrders,
          action.setAllNewOrders
        );
        return state;

      case CANCEL_ORDER:
        cancelOrderHandler(
          action.id,
          action.setIsLoading,
          action.setAllNewOrders,
          action.allNewOrders,
          action.setAllDeliveredOrders,
          action.allDeliveredOrders
        );
        return state;

      case RETURN_ITEM:
        returnITem(action.payload, action.upDateState, action.setIsLoading);
        return state;

      case SHIPROCKET_ORDER_STATUS:
        shiprocketOrderStatusHandler(
          action.allNewOrders,
          action.setAllNewOrders,
          action.setTrackdata
        );
        return state;

      case GET_SHIPROCKET_ORDER_DETAILS:
        getShiprocketOrderDetails(
          action.orderId,
          action.setOrderDetails,
          action.setLoading
        );
        return state;

      //Notification Cases
      case GET_USER_NOTIFICATION:
        getUserNotificationReq(action.setMyNotification);
        return state;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const values = {
    auth,
    dispatch,
    setAuth,
    AuthRole,
    setAuthRole,
    currentUser,
    state,
  };

  return (
    <AuthContext.Provider value={values}>
      <ReactNotifications />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComponent;
