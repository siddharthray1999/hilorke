import { Store } from "react-notifications-component";
import {
  getCustomerAffiliates,
  getProductByAffiliate,
  joinAffliateRequest,
  leaveAffRequest,
} from "../API";
import { notification } from "../AuthContext";

export const joinAffliate = async (id, upDateState, setIsLoading) => {
  setIsLoading(true);
  try {
    const res = await joinAffliateRequest(id);
    if (res.data.message === "Send Successfully") {
      upDateState(true);
      Store.addNotification({
        ...notification,
        type: "success",
        message: res.data.message,
      });
    } else {
      Store.addNotification({
        ...notification,
        type: "warning",
        message: res.data.message,
      });
    }
  } catch (err) {
    Store.addNotification({
      ...notification,
      type: "danger",
      message: err.response.data.message,
    });
  } finally {
    setIsLoading(false);
  }
};
export const getCustomerAffiliateReq = async(setAllAffiliates, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await getCustomerAffiliates();
    if(res?.status === 200) {
      setAllAffiliates(res?.data?.request?.filter((item) => item?.status === "Accepted"));
    }
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
}
export const getProductByAff = async(id, setAllProducts, setIsLoading) => {
  try {
    setIsLoading(true)
    const res = await getProductByAffiliate(id);
    if(res?.status === 200) {
      setAllProducts(res?.data?.data?.data)
    }
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false)
  }
}
export const leaveAffiliate = async(id, allAffiliates, setAllAffiliates, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await leaveAffRequest(id);
    if(res?.data?.message === "Deleted Successfully") {
      setAllAffiliates(allAffiliates?.filter((item) => item?._id !== res?.data?.request?._id))
      Store.addNotification({
        ...notification,
        type: "success",
        message: "Affiliate Removed Success"
      })

    }
  } catch (error) {
    console.log(error);
    Store.addNotification({
      ...notification,
      type: "danger",
      message: "Failed to leave affiliate!"
    })
  }
}


