import {
  addItemToCartRequest,
  addItemToWishlistRequest,
  checkItemInCartRequest,
  checkItemWishlistStatus,
  deleteItemFromCartRequest,
  getAllCategoryRequest,
  getAllProductsRequest,
  getCartItemsRequest,
  getProductDetailsRequest,
  getWishlistItemsRequest,
  removeItemFromWishlistRequest,
  getProductByCategory,
  getTopSellingProduct,
  searchProduct,
  getCustomerAds,
  getSubcategory,
  getSubProducts,
  getMyWallet,
  reportProduct1,
  sendProductReview,
  getProductBySubCategory,
} from "../API";
import { Store } from "react-notifications-component";
import { notification } from "../AuthContext";


export const getCustomersAds = async (setAllAds, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await getCustomerAds();
    setAllAds(res?.data?.data);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};
export const getALlCategory = async (upDateState, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await getAllCategoryRequest();
    upDateState(res.data.data);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
  }
};
export const getProductByCatId = async (
  catId,
  setAllProducts,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await getProductByCategory(catId);
    setAllProducts(res?.data?.data);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};
export const getProductBySubCatId = async (
  catId,
  setAllProducts,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await getProductBySubCategory(catId);
    setAllProducts(res?.data?.data);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};
export const getALLproducts = async (upDateState) => {
  try {
    const res = await getAllProductsRequest();
    if (res.data) {
      upDateState(res.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};
export const getSub = async (id, upDateState, subCategoryData) => {
  try {
    const res = await getSubcategory(id);
    if (res.data) {
      upDateState(res?.data?.data);
    }
  } catch (err) {
    console.log(err);
  }
};
export const getSubProductDetail = async (id, upDateState) => {
  try {
    const res = await getSubProducts(id);
    if (res.data) {
      upDateState(res?.data?.data);
    }
  } catch (err) {
    console.log(err);
  }
};
export const getWishlistItems = async (upDateState, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await getWishlistItemsRequest();
    upDateState(res.data);
    setIsLoading(false);
  } catch (e) {
    setIsLoading(false);
  }
};
export const addItemToCart = async (
  values,
  upDateState,
  setIsLoading,
  navigate
) => {
  setIsLoading(true);
  try {
    const res = await addItemToCartRequest({
      products: values,
    });
    if (res.data.message === "Added Successfully") {
      upDateState(true);
      Store.addNotification({
        ...notification,
        type: "success",
        message: "Item Added To Cart!",
      });
    }
  } catch (err) {
    console.log(err);
    Store.addNotification({
      ...notification,
      type: "danger",
      message:
        err.response.data === "Access Denied"
          ? "Please Login to add the product in cart"
          : "Something went wrong!",
    });
  } finally {
    setIsLoading(false);
  }
};
export const removeItemFromWishlist = async (
  id,
  upDateState,
  setIsLoading,
  cb
) => {
  setIsLoading(true);
  try {
    const res = await removeItemFromWishlistRequest(id);
    if (res.data.message === "Removed Successfully") {
      upDateState(false);
      if (cb) cb();
    }
  } catch (e) {
    console.log(e);
  } finally {
    setIsLoading(false);
  }
};
export const getTopProducts = async (
  upDateState,
  page,
  limit,
  setIsLoading
) => {
  setIsLoading(true);
  try {
    const res = await getTopSellingProduct(page, limit);
    if (res.data) {
      upDateState(res.data.data);
      setIsLoading(false);
    }
  } catch (err) {
    console.log(err);
    setIsLoading(false);
  }
};
export const getProductDetails = async (id, upDateState, setIsLoading, setSubCatId) => {
  setIsLoading(true)
  try {
    const res = await getProductDetailsRequest(id);
    if (res.data) {
      upDateState(res.data.data);
      if(res?.data?.data?.subcategory || res?.data?.data?.subcategory.length > 0) {
        setSubCatId(res?.data?.data?.subcategory);
      }else {
        setSubCatId(res?.data?.data?.category?._id);
      }
    }
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
  }
};
export const addItemToWishlist = async (id, upDateState, setIsLoading, navigate) => {
  setIsLoading(true);
  try {
    const res = await addItemToWishlistRequest(id);
    if (res.data === "Item Added!") {
      upDateState(true);
    }

  } catch (e) {
    console.log(e);
    if(e?.response?.data === "Access Denied") {
      Store.addNotification({
        ...notification,
        type: 'warning',
        message: "Please login to add the item in wishlist!"
      })
      navigate("/login")
    }
  } finally {
    setIsLoading(false);
  }
};
export const checkProductWishlistStatus = async (id, upDateState) => {
  try {
    const res = await checkItemWishlistStatus(id);
    upDateState(res.data.status);
  } catch (e) {
    console.log(e);
  }
};
export const checkItemInCart = async (values, upDateState, setIsLoading) => {
  setIsLoading(true);
  try {
    const res = await checkItemInCartRequest(values);
    if (res.data) {
      upDateState(true);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};
export const sendReview = async (id, productQuality, packaging, delivery, comment, image, video) => {
  try {
    const res = await sendProductReview(id, productQuality, packaging, delivery, comment, image, video);
    if(res?.status === 200) {
      Store.addNotification({
        ...notification,
        type: "success",
        message: 'Review Added'
      })
    }
  } catch (error) {
    console.log(error);
  }
};
export const sendReport = async (product, issueName, description, setActiveReport) => {
  try {
    const res = await reportProduct1(product, issueName, description);
    setActiveReport(false);
    Store.addNotification({
      ...notification,
      type: "success",
      message: 'Report Product Success'
    })
  } catch (e) {
    console.log(e);
    Store.addNotification({
      ...notification,
      type: "danger",
      message: 'Something went wrong!'
    })
  }
};
export const getCartItems = async (setIsLoading, upDateState, setTaxAndCharges, taxAndCharges, tempCharges) => {
  setIsLoading(true);
  try {
    const res = await getCartItemsRequest();
    if (res.data) {
      let tempCharge = 0;
      upDateState(res.data.cartItems);
      res?.data?.cartItems?.forEach((item) => {
        // if(item?.productId?.isDiscount) {
          tempCharge = tempCharge + Number(item?.productId?.localcharge);
          setTaxAndCharges((prev) => ({...prev, charge: tempCharge}))
        // } 
      })
    }
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
  }
};
export const deleteItemFromCart = async (
  values,
  cb,
  setIsLoading,
  cartProducts,
  cartProdId
) => {
  setIsLoading(true);
  try {
    const res = await deleteItemFromCartRequest(values);
    if (res.data.message === "Deleted Successfully") {
      Store.addNotification({
        ...notification,
        type: "success",
        message: "Removed from Cart Success",
      });
      cartProducts.delete(cartProdId);
      cb();

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
export const searchProducts = async (
  name,
  catId,
  upDateState,
  setIsLoading
) => {
  try {
    const res = await searchProduct(name, catId);
    if (res.data.success) {
      upDateState(res.data.data);
      setIsLoading(false);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};
export const getMyWalletInfo = async (setWalletData, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await getMyWallet();
    setWalletData(res?.data)
    setIsLoading(false);
  } catch (e) {
    console.log(e);
    setIsLoading(false);
  }
};
export const addItemToCartLogin = async (
  values,
  navigate
) => {
  try {
    const res = await addItemToCartRequest({
      products: [{
        productId: values?.productId,
        quantity: values?.quantity,
        size: values?.size,
        price: values?.price,
        offerprice: values?.offerprice,
        isDiscount: values?.isDiscount
      }],
    });
    if (res.data.message === "Added Successfully") {
      Store.addNotification({
        ...notification,
        type: "success",
        message: "Item Added To Cart!",
      });
      navigate("/my-cart", {replace: true});
      localStorage.removeItem("cartSave");
    }
  } catch (err) {
    console.log(err);
    Store.addNotification({
      ...notification,
      type: "danger",
      message:
        err.response.data === "Access Denied"
          ? "Please Login to add the product in cart"
          : "Something went wrong!",
    });
  }
};

