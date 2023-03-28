import React, { useContext, useEffect, useState } from "react";
import MyOrderCard from "../Components/MyOrderCard";
import { AuthContext } from "../Context/AuthContext";
import { CANCEL_ORDER, GET_MY_ORDERS, SHIPROCKET_ORDER_STATUS } from "../Context/Types";
import "../Styles/pages/MyOrder.css";
import Footer from "../Components/Footer";
import CircularLoading from "../ui/CircularLoading/CircularLoading";
import OutlinedButton from "../ui/OutlinedButton/OutlinedButton";
import { useNavigate } from "react-router-dom";
function MyOrders() {
  const { dispatch, auth } = useContext(AuthContext);
  const [allDeliveredOrders, setAllDeliveredOrders] = useState([]);
  const [allNewOrders, setAllNewOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [trackdata, setTrackdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0,0);
    if(auth) {
    dispatch({
      type: GET_MY_ORDERS,
      setIsLoading,
      setAllDeliveredOrders,
      setAllNewOrders
    });
  }
  }, [auth, dispatch]);

  const cancelOrderHandler = (id) => {
    dispatch({
      type: CANCEL_ORDER,
      id,
      setIsLoading: setIsLoading2,
      setAllNewOrders,
      allNewOrders,
      setAllDeliveredOrders,
      allDeliveredOrders
    })
  }

  const getTheStatusOfOrder = () => {
    dispatch({
      type: SHIPROCKET_ORDER_STATUS,
      allNewOrders,
      setAllNewOrders,
      setTrackdata
    })
  }

  const orderDetailsHandler = (orderId) => {
    navigate(`/track-order/${orderId}`)
  }
  useEffect(() => {
    getTheStatusOfOrder();
  }, [allNewOrders]);

  useEffect(() => {
    setAllDeliveredOrders([]);
    setAllNewOrders([])
  }, [])

  return (
    <div style={{width: '100%', height: '90vh'}}>
      <h1 className="orders-heading-mobile">Orders</h1>
      {isLoading ? (
        <div style={{width: '100%', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <CircularLoading color="orange" />
        </div>
      ) : !auth ? (
        <div style={{ height: "90vh" }} className="wishlist-msg">
          <p>Login to get your orders!</p>
          <OutlinedButton navigateNow="/login" text="Login"/>
        </div>
      ) : (
        <div className="w-93 mt-3 mb-5" style={{ border: "none", minHeight: '90vh' }}>
          {
            allNewOrders?.map((order, index) => {
              return (
                <div key={index}>
                  <span>Order ID: {order?._id}</span>
                  <div className="w-93 mb-4" style={{ border: "1px solid gray" }}>
                    <div className="row d-flex align-tracker">
                      <div className="col-md-3 col-xs-12 col-sm-10 orderimgContainer">
                        <img src={order?.productId?.productImage[0]} alt="prodimg" />
                      </div>
                      <div className="col-md-9 col-12 col-sm-12 py-4">
                        <div className="row padding-small">
                          <div className="col-lg-10 col-sm-10 col-md-10 col-8 col-l textS">
                            <p className="fs-16">{order?.productId?.name}</p>
                            <div>
                              <p title={order?.productId?.description} className="fs-14">
                                {order?.productId?.description.slice(0,90)}...
                              </p>
                              <p className="fs-14">Quantity: {order?.quantity}</p>
                            </div>
                            <div className="row">
                              <div className="">
                                <p className="fs-16">₹ {order?.orderPrice}</p>
                                <p className="fs-16">{order?.isCOD ? "Cash On Delivery" : "Prepaid"}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 col-sm-2 col-md-2 col-4 textE p-0">
                            {
                              order?.SKUorderId && order?.SKUorderId.length > 0 ? (
                                <p onClick={()=>orderDetailsHandler(order?.SKUorderId)} className="cancel-margin m-0" style={{ color: "#F7BE16", cursor: 'pointer' }}>
                                  See
                                </p>
                              ) : (
                                <p onClick={()=>cancelOrderHandler(order?._id)} className="cancel-margin m-0" style={{ color: "#F7BE16", cursor: 'pointer' }}>
                                  {isLoading2 ? <CircularLoading color="orange"/> : "Cancel"}
                                </p>

                              )
                            }
                          </div>
                        </div>
                        <div className="mb-2 mx-1">
                          <div className="">
                            <div className="row">
                              <div className="col-12 col-md-10  pb20">
                                <div className="row">
                                  <div className="order-tracking col-3 completed">
                                    <span className="is-complete"></span>
                                    <p>
                                      Ordered
                                      <br />
                                      <span>{new Date(order?.updatedAt).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) }</span>
                                      <br />
                                      <span>{new Date(order?.updatedAt).getHours() + ":" + new Date(order?.updatedAt).getMinutes()}</span>
                                    </p>
                                  </div>
                                  <div className={`order-tracking col-3 ${
                                                                          trackdata?.filter((data) => data.orderId === order?._id)[0]?.data?.filter((track) => (
                                        track.activity.includes("Shipment picked up")
                                      )) && "completed"
                                  }`}>
                                    <span className="is-complete"></span>
                                    <p>
                                    Assigned
                                    {
                                      trackdata?.filter((data) => data.orderId === order?._id)[0]?.data?.filter((track) => (
                                        track.activity.includes("Shipment picked up")
                                      )) && (
                                        <>
                                          <br />
                                          <span>{                                      trackdata?.filter((data) => data.orderId === order?._id)[0]?.data?.filter((track) => (
                                        track.activity.includes("Shipment picked up")
                                      ))[0]?.date.slice(0,10)}</span>
                                          <br />
                                          <span>{                                      trackdata?.filter((data) => data.orderId === order?._id)[0]?.data?.filter((track) => (
                                        track.activity.includes("Shipment picked up")
                                      ))[0]?.date.slice(11,16)}</span>
                                        </>
                                      )
                                    }
                                    </p>
 
                                  </div>
                                  <div className={`order-tracking col-3 ${
                                                                          trackdata?.filter((data) => data.orderId === order?._id)[0]?.data?.filter((track) => (
                                        track.activity.includes("Shipment Received at Facility")
                                      )) && "completed"
                                  }`}>
                                    <span className="is-complete"></span>
                                    <p>
                                    Shipped
                                    {
                                      trackdata?.filter((data) => data.orderId === order?._id)[0]?.data?.filter((track) => (
                                        track.activity.includes("Shipment Received at Facility")
                                      )) && (
                                        <>
                                          <br />
                                          <span>{                                      trackdata?.filter((data) => data.orderId === order?._id)[0]?.data?.filter((track) => (
                                        track.activity.includes("Shipment Received at Facility")
                                      ))[0]?.date.slice(0,10)}</span>
                                          <br />
                                          <span>{                                      trackdata?.filter((data) => data.orderId === order?._id)[0]?.data?.filter((track) => (
                                        track.activity.includes("Shipment Received at Facility")
                                      ))[0]?.date.slice(11,16)}</span>
                                        </>
                                      )
                                    }
                                    </p>
                                  </div>
                                  <div className={`order-tracking col-3 ${
                                                                          trackdata?.filter((data) => data.orderId === order?._id)[0]?.data?.filter((track) => (
                                        track.activity.includes("Out for delivery")
                                      )) && "completed"
                                  }`}>
                                    <span className="is-complete"></span>
                                    <p>
                                    Out for Delivery
                                    {
                                      trackdata?.filter((data) => data.orderId === order?._id)[0]?.data?.filter((track) => (
                                        track.activity.includes("Out for delivery")
                                      )) && (
                                        <>
                                          <br />
                                          <span>{                                      trackdata?.filter((data) => data.orderId === order?._id)[0]?.data?.filter((track) => (
                                        track.activity.includes("Out for delivery")
                                      ))[0]?.date.slice(0,10)}</span>
                                          <br />
                                          <span>{                                      trackdata?.filter((data) => data.orderId === order?._id)[0]?.data?.filter((track) => (
                                        track.activity.includes("Out for delivery")
                                      ))[0]?.date.slice(11,16)}</span>
                                        </>
                                      )
                                    }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }



          <div className="my-order-container">
            <div className="my-order-container-title">ORDER HISTORY</div>
            <div className="my-order-card-conatiner">

              { allDeliveredOrders?.length > 0 ? (
                allDeliveredOrders.map((item, index) => {
                return <MyOrderCard data={item} key={index}/>;
                })
              ) : (
                <div style={{width: '100%'}}>
                  <h6 style={{textAlign: 'center'}}>No Previous Orders</h6>
                </div>
              )
              }
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default MyOrders;
