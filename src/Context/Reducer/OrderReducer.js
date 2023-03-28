import { Store } from "react-notifications-component";
import {
  CODAvailableReq,
  getMyOrderRequest,
  getShiprocketOrderDetailsRequest,
  getShiprocketOrderStatus,
  returnItemRequest,
  updateOrderRequest,
} from "../API";
import { notification } from "../AuthContext";


export const checkCODAvailable = async(pincode, setIsCodAvailable, setIsLoading, setExpectedDate) => {
  let start = new Date(new Date().setDate(new Date().getDate() + 10) ) 
  //get date range from 9 to 15
  // let start = new Date().setDate(new Date().getDate() + 9)
  // function randomNumber(min, max) { 
  //   let a = Math.ceil(Math.random() * (max - min) + min);
  //   return new Date(new Date(start).setDate(new Date(start).getDate() + a))
  // }    
  try {
    setIsLoading(true)
    const res = await CODAvailableReq(pincode);
    setIsCodAvailable(res?.data)
    setExpectedDate(start);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
}
export const getMyOrder = async (setIsLoading, setAllDeliveredOrders, setAllNewOrders) => {
  setIsLoading(true);
  let removed = ["Delivered", "Cancelled"];
  try {
    const res = await getMyOrderRequest();
    if(res?.status === 200) {
      setAllNewOrders(res?.data?.data?.filter((item) => !removed.includes(item?.status) ));
      setAllDeliveredOrders(res?.data?.data?.filter((item) => item?.status === "Delivered" || item?.status === "Cancelled"));
    }
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
  }
};
export const cancelOrderHandler = async(id, setIsLoading, setAllNewOrders, allNewOrders, setAllDeliveredOrders, allDeliveredOrders) => {
  try {
    setIsLoading(true)
    const res = await updateOrderRequest({
      order_id: id,
      status: "Cancelled"
    });
    if(res?.data?.success) {
      setAllNewOrders(allNewOrders?.filter((newOrder) => newOrder?._id !== res?.data?.data?._id));
      Store.addNotification({
        ...notification,
        type: "success",
        message: "Order Cancelled Success"
      })
    }
    setIsLoading(false)
  } catch (error) {
    console.log(error);
    Store.addNotification({
      ...notification,
      type: "danger",
      message: "Something went wrong!"
    })
    setIsLoading(false);
  }
}
export const returnITem = async (values, upDateState, setIsLoading) => {
  setIsLoading(true);
  try {
    const res = await returnItemRequest(values);
    upDateState(true);
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    console.log(err);
    Store.addNotification({
      ...notification,
      type: "danger",
      message: err.response.data,
    });
  }
};
export const shiprocketOrderStatusHandler = async(allNewOrders, setAllNewOrders, setTrackdata) => {
  let mydata = [];
  allNewOrders?.forEach(async(order) => {
    if(order?.SKUshipmentId?.length > 0) {
      try {
        const res = await getShiprocketOrderStatus(order?.SKUshipmentId);
        if(res?.status === 200) {
          setTrackdata((prev) => [...prev, {data: res?.data?.tracking_data?.shipment_track_activities?.filter((data) => (
            data["sr-status-label"] === "PICKED UP" || data["sr-status-label"] === "IN TRANSIT" || data["sr-status-label"] === "OUT FOR DELIVERY"
            )), orderId: order?._id}])
          }
      } catch (error) {
        console.log(error);
      }
    }
  })
}
export const getShiprocketOrderDetails = async(orderId, setOrderDetails, setLoading) => {
  try {
    setLoading(true);
    const res = await getShiprocketOrderDetailsRequest("254474426");
    // const res = await getShiprocketOrderDetailsRequest(orderId);
    if(res?.status === 200) {
      setOrderDetails(res?.data?.data);
    }else {
      Store.addNotification({
        ...notification,
        type: "warning",
        message: "Some error occured"
      })
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
}