import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  // baseURL: "https://hiloramart-nu.vercel.app/",
  baseURL: "https://api.hilorke.com/",
});

API.interceptors.request.use((req) => {
  if (Cookies.get("auth_token")) {
    req.headers["authorization"] = `${Cookies.get("auth_token")}`;
    req.headers["token"] = `${Cookies.get("auth_token")}`;
  }
  return req;
});



export const getCustomerAffiliates = () => {
  return API.get("/profile/getMyAffiliateRequest");
};
export const joinAffliateRequest = (id) => {
  return API.post("/profile/sendAffiliateRequest", {
    vendor_id: id,
  });
};
export const userAccActivateRequest = (values) => {
  return API.post("auth/activate", values);
};
export const userLoginRequest = (values) => {
  return API.post("/auth/login", values);
};
export const userResendOtpRequest = (values) => {
  return API.post("auth/resendOtp", values);
};
export const userSignUpRequest = (values) => {
  return API.post("/auth/register", values);
};
export const userForgotpasswordRequest = (value) => {
  return API.post("/auth/forgotPassword", { email: value });
};
export const userVerifyCode = (values) => {
  return API.post("/auth/verifyCode", values);
};
export const resetUserPasswordRequest = (data) => {
  return API.post("/auth/resetPassword", data);
};
export const shiprocketLogin = () => {
  return API.get("/auth/shiprocketToken");
};
export const CODAvailableReq = (pincode) => {
  return API.post("/orders/codAvailable", {
    pincode: String(pincode),
  });
};
export const getMyOrderRequest = () => {
  return API.get("/orders/myOrders");
};
export const returnItemRequest = (data) => {
  return API.post("/orders/return", data);
};
export const updateOrderRequest = (data) => {
  return API.post("/ord/updateOrder", data);
};
export const getOrderID = (cost) => {
  return API.post("orders/createOrderId", {
    price: cost,
  });
};
export const placeOrder = (
  response,
  productIds,
  amount,
  address,
  affiliateKey
) => {
  const formValues = {
    razorpayPaymentId: response.razorpay_payment_id,
    orderCreationId: response.razorpay_order_id,
    razorpaySignature: response.razorpay_signature,
    products: productIds,
    totalPrice: Number(amount / 100),
    isCOD: false,
    address: {
      line1: address[0]?.line1,
      line2: address[0]?.line2,
      city: address[0]?.city,
      state: address[0]?.state,
      pincode: address[0]?.pincode,
      country: address[0]?.country,
    },
    affiliateKey: affiliateKey,
  };
  return API.post("/orders/placeOrder", formValues);
};
export const placeOrderCod = (data) => {
  return API.post("/orders/placeOrder", data);
};
export const deleteSavedAddress = (id) => {
  return API.delete(`/address/remove?addressId=${id}`);
};
export const userProfileRequest = () => {
  return API.get("/profile");
};
export const getUserAddresss = () => {
  return API.get("/address");
};
export const changeCurrentUserAddress = (id) => {
  return API.post(`/address/changeCurrentAddress`, { addressId: id });
};
export const addUserAddress = (data) => {
  return API.post("/address/add", data);
};
export const updateUserProfilePic = (data) => {
  return API.post(`profile/updateProfilePic`, data);
};
export const updateUserProfile = (data) => {
  return API.post(`profile/updateAll`, data);
};
export const editUserAddress = (id, data) => {
  return API.post(`/address/edit?addressId=${id}`, data);
};
export const userLogoutRequest = () => {
  return API.get("/auth/logout");
};
export const getUserNotification = () => {
  return API.get("/profile/getMyNotifications");
};
export const addItemToCartRequest = (values) => {
  return API.post("cart/add", values);
};
export const addItemToWishlistRequest = (id) => {
  return API.post(`/wishlist/add`, {
    product_id: id,
  });
};
export const checkItemInCartRequest = (id) => {
  return API.get(`cart/checkItem?productId=${id}`);
};
export const checkItemWishlistStatus = (id) => {
  return API.get(`wishlist/checkItem?product_id=${id}`);
};
export const deleteItemFromCartRequest = (values) => {
  return API.delete("/cart/remove", {
    data: values,
  });
};
export const getAllCategoryRequest = () => {
  return API.get("/product/getProductCategory");
};
export const getAllProductsRequest = () => {
  return API.get("product/getProducts");
};
export const getCartItemsRequest = () => {
  return API.get("/cart");
};
export const getProductDetailsRequest = (id) => {
  return API.get(`product/getProductsbyId/${id}`);
};
export const getWishlistItemsRequest = async (id) => {
  return API.get(`/wishlist`);
};
export const removeItemFromWishlistRequest = (id) => {
  const data = { products: [id] };
  return API.delete(`/wishlist/remove`, { data: data });
};
export const getProductByCategory = (catId) => {
  return API.post(`/product/getProductsbyCategoryId`, { category: [catId] });
};
export const getProductBySubCategory = (catId) => {
  return API.post(`/product/getProductsbySubCategory`, { subcategory: [catId] });
};
export const getTopSellingProduct = (page, limit) => {
  return API.get(`/product/getSellingProducts?pageno=${page}&limit=${limit}`);
};
export const searchProduct = (name, categoryId) => {
  return API.get(`product/searchProducts?name=${name}&category=${categoryId}`);
};
export const getCustomerAds = () => {
  return API.get("/ad/");
};
export const getSubcategory = (category) => {
  return API.get(`/product/getSubCategoryByCategory?category=${category}`);
};
export const getSubProducts = (value) => {
  return API.post("/product/getProductsbySubCategory", { category: value });
};
export const getMyWallet = () => {
  return API.get("/orders/myWallet");
};
export const reportProduct1 = (id, issue, desc) => {
  return API.post(`/profile/report`, {
    products: id,
    issueName: issue,
    description: desc,
  });
};
export const sendProductReview = (id, productQuality, packaging, delivery, comment, image, video) => {
  return API.post("/orders/addReview", {
    productId: id,
    productQuality,
    packaging,
    delivery,
    comment,
    image,
    video,
  });
};
export const getProductByAffiliate = (id) => {
  return API.get(`/product/allproducts/${id}`)
} 
export const leaveAffRequest = (id) => {
  return API.get(`/profile/leaveAffiliate?id=${id}`);
}


export const getShiprocketCountriesReq = () => {
  return API.get("/ship/getCountries");
}
export const getShiprocketStateReq = (id) => {
  return API.get(`/ship/getAllZones?country_id=${id}`);
}
export const getShiprocketCityReq = (postcode) => {
  return API.get(`/ship/getLocalities?postcode=${postcode}`);
}
export const getShiprocketOrderStatus = (shipmentId) => {
  return API.get(`/ship/trackOrder?shipmentId=${shipmentId}`)
}
export const getShiprocketOrderDetailsRequest = (orderId) => {
  return API.get(`/ship/getOrderDetails?orderId=${orderId}`)
}
export const getShipmentDetails = (shipId) => {
  return API.get(`/ship/shipment?shipment_id=${shipId}`)
}


export const getAllBlogsReq = () => API.get("/admin/blogs?footer=true");
export const getAllBlogsReq1 = () => API.get("/admin/blogs");
export const getBlogByIdReq = (id) => API.get(`/admin/blogById?id=${id}`);


export const getFooterLink1Req = () => API.get("/admin/links?footer=true");
export const getFooterLink2Req = () => API.get("/admin/links2?footer=true");
export const getLinkByIdReq = (id) => API.get(`/admin/linkById?id=${id}`);
export const getLink2ByIdReq = (id) => API.get(`/admin/link2ById?id=${id}`);
