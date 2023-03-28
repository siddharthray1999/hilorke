import React, { useContext, useState } from "react";
import "../Styles/pages/TrackOrder.css";
import item from "../../src/Assets/Images/deemo.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { GET_SHIPROCKET_ORDER_DETAILS } from "../Context/Types";
import { getShipmentDetails, getShiprocketOrderStatus } from "../Context/API";
import CircularLoading from "../ui/CircularLoading/CircularLoading";

function TrackOrder() {
  const {orderId} = useParams();
  const { dispatch } = useContext(AuthContext);
  const [orderDetails, setOrderDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [trackdata, setTrackdata] = useState([]);

  const getOrderDetails = async() => {
    dispatch({
      type: GET_SHIPROCKET_ORDER_DETAILS,
      orderId,
      setOrderDetails,
      setLoading
    })

    try {
      setLoading(true);
      setTrackdata([])
      const res = await getShiprocketOrderStatus("253861686");
      if(res?.status === 200) {
        setTrackdata((prev) => [...prev, {data: res?.data?.tracking_data?.shipment_track_activities?.filter((data) => (
          data["sr-status-label"] === "PICKED UP" || data["sr-status-label"] === "IN TRANSIT" || data["sr-status-label"] === "OUT FOR DELIVERY"
          ))}])
        }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  useEffect(() => {
    getOrderDetails()
  }, [orderId])
  return (
    <>
    {
      loading ? (

        <div style={{width: '100%', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <CircularLoading color="orange" />
        </div>
      ) : (
        <div className="tracking-box w-93">
        <div className="alignC">
          <h2>Tracking</h2>
          <p>ESTIMATED DATE</p>
          <p>{orderDetails?.etd_date.split(" ")[0]}</p>
          {
            orderDetails?.cod === 1 ? <p>Cash On Delivery</p> : <p>Prepaid</p>
  
          }
        </div>
        <div className="mb-2 align-tracker">
          <div class="">
            <div class="row">
              <div class="col-12 col-md-12  pb20">
                <div class="row">
                  <div class="order-tracking col-3 completed">
                    <span class="is-complete"></span>
                    <p>
                      Ordered
                      <br />
                      <span>{orderDetails?.order_date}</span>
                    </p>
                  </div>
                  <div class={`order-tracking col-3 ${
                                                                            trackdata?.filter((data) => data.orderId === orderId)[0]?.data?.filter((track) => (
                                          track.activity.includes("Shipment picked up")
                                        )) && "completed"
                                    }`}>
                                      <span class="is-complete"></span>
                                      <p>
                                      Assigned
                                      {
                                        trackdata?.filter((data) => data.orderId === orderId)[0]?.data?.filter((track) => (
                                          track.activity.includes("Shipment picked up")
                                        )) && (
                                          <>
                                            <br />
                                            <span>{                                      trackdata?.filter((data) => data.orderId === orderId)[0]?.data?.filter((track) => (
                                          track.activity.includes("Shipment picked up")
                                        ))[0]?.date.slice(0,10)}</span>
                                            <br />
                                            <span>{                                      trackdata?.filter((data) => data.orderId === orderId)[0]?.data?.filter((track) => (
                                          track.activity.includes("Shipment picked up")
                                        ))[0]?.date.slice(11,16)}</span>
                                          </>
                                        )
                                      }
                                      </p>
   
                                    </div>
                                    <div class={`order-tracking col-3 ${
                                                                            trackdata?.filter((data) => data.orderId === orderId)[0]?.data?.filter((track) => (
                                          track.activity.includes("Shipment Received at Facility")
                                        )) && "completed"
                                    }`}>
                                      <span class="is-complete"></span>
                                      <p>
                                      Shipped
                                      {
                                        trackdata?.filter((data) => data.orderId === orderId)[0]?.data?.filter((track) => (
                                          track.activity.includes("Shipment Received at Facility")
                                        )) && (
                                          <>
                                            <br />
                                            <span>{                                      trackdata?.filter((data) => data.orderId === orderId)[0]?.data?.filter((track) => (
                                          track.activity.includes("Shipment Received at Facility")
                                        ))[0]?.date.slice(0,10)}</span>
                                            <br />
                                            <span>{                                      trackdata?.filter((data) => data.orderId === orderId)[0]?.data?.filter((track) => (
                                          track.activity.includes("Shipment Received at Facility")
                                        ))[0]?.date.slice(11,16)}</span>
                                          </>
                                        )
                                      }
                                      </p>
                                    </div>
                                    <div class={`order-tracking col-3 ${
                                                                            trackdata?.filter((data) => data.orderId === orderId)[0]?.data?.filter((track) => (
                                          track.activity.includes("Out for delivery")
                                        )) && "completed"
                                    }`}>
                                      <span class="is-complete"></span>
                                      <p>
                                      Out for Delivery
                                      {
                                        trackdata?.filter((data) => data.orderId === orderId)[0]?.data?.filter((track) => (
                                          track.activity.includes("Out for delivery")
                                        )) && (
                                          <>
                                            <br />
                                            <span>{                                      trackdata?.filter((data) => data.orderId === orderId)[0]?.data?.filter((track) => (
                                          track.activity.includes("Out for delivery")
                                        ))[0]?.date.slice(0,10)}</span>
                                            <br />
                                            <span>{                                      trackdata?.filter((data) => data.orderId === orderId)[0]?.data?.filter((track) => (
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
  
        {/* <div className="Button-align">
          <button className="checkoutButton">Download Invoice</button>
        </div> */}
  
        <div className="alignC details-box">
          <h4>Details of Order #{orderDetails?.id}</h4>
          <div className="row d-flex justify-content-center addressAlign mt-4">
            <div className="col-9 addAlignC">
              <h4>Shipping and Billing Address:</h4>
              <div className="mt-4 details-size ">
                <p>{orderDetails?.customer_address}, {orderDetails?.customer_address_2} </p>
                <p>{orderDetails?.customer_city} - {orderDetails?.customer_pincode}</p>
                <p>{orderDetails?.customer_state}</p>
                <p>{orderDetails?.customer_country}</p>
              </div>
            </div>
            {/* <div className="col-6 addAlignC">
              <h4> Billing to:</h4>
              <div className="mt-4 details-size">
                <p>Shop No1 ,2 .1 St Floor, The Jewel Society,</p>
                <p>Chokshi Chambers, Opp:kharakuwa,</p>
                <p> Zaveri Bazar., Crawford</p>
                <p> Mumbai, Maharashtra</p>
                <p>Country India</p>
              </div>
            </div> */}
          </div>
        </div>
        {
          orderDetails?.products?.map((item) => {
            return (
              <div style={{border: '1px solid orange', padding: '10px', borderRadius: '10px', boxShadow: '0 0 1px orange'}}>
          <div className="row ">
            <div className="col-3 alignS">Order Id</div>
            <div className="col-3 alignS">Item</div>
            <div className="col-3 alignC">Quantity</div>
            <div className="col-3 alignE">Total</div>
          </div>
          <div className="row mt-4 mb-4 ">
            <div className="col-3 d-flex align-items-center fontAlign">
              {item?.order_id}
            </div>
            <div className="col-3">
              <div className="d-flex ">
                {/* <img className="item-style" src={item} /> */}
                <div className="order-box ">
                  <p className="details-size">{item?.name}</p>
                </div>
              </div>
            </div>
            <div className="col-3 d-flex align-items-center justify-content-center fontAlign">
              {item?.quantity}
            </div>
            <div className="col-3 d-flex align-items-center justify-content-end fontAlign">
              ₹ {item?.selling_price}
            </div>
          </div>
              </div>
            )
          })
        }
  
      </div>
      )
    }
    </>

  );
}

export default TrackOrder;
