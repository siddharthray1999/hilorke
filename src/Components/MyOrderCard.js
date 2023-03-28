import React, { useContext, useState } from "react";
import "../Styles/pages/MyOrder.css";
import { AuthContext } from "../Context/AuthContext";
import { RETURN_ITEM } from "../Context/Types";
import { useNavigate } from "react-router-dom";
import CircularLoading from "../ui/CircularLoading/CircularLoading";

function MyOrderCard({ data }) {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isReturnLoading, setIsReturnLoading] = useState(false);
  const [isReturn, setIsReturn] = useState(false);

  const buyIt = () => {
    const productDetails = [data.productId];
    navigate(`/HomeProductDetail/${productDetails[0]._id}`)
  };
  const returnhandle = () => {
    const values = {
      orderId: data?._id,
      reason: "abc",
    };
    dispatch({
      type: RETURN_ITEM,
      payload: values,
      upDateState: setIsReturn,
      setIsLoading: setIsReturnLoading,
    });
  };

  const handleInvoice = () => {
    window.open(data?.invoice);
  };


  return (
    <div className="my-order-card-cont">
      <div className="my-order-card-product-details">
        <div className="my-order-card-image-cont">
          <img
            src={data?.productId?.productImage[0]}
            className="my-order-card-image"
            alt="productimg"
          />
        </div>
        <div className="my-order-card-text">
          <div>{data?.productId?.name}</div>
          <div>{data?.status}: {data?.updatedAt?.slice(0,10)}</div>
        </div>
      </div>
      <div className="my-order-card-order-details">
        <div className="my-order-card-heading-col">
          <div>
            <div>Order Date</div>
            <div className="my-order-card-value-col">{data?.createdAt?.slice(0,10)}</div>
          </div>
          <div>
            <div>Order ID</div>
            <div className="my-order-card-value-col">{data?._id}</div>
          </div>
          <div>
            <div>Total Pay</div>
            <div className="my-order-card-value-col">₹ {data?.totalPrice}</div>
          </div>
          <div>
            <div>Shipping Address</div>
            <div className="my-order-card-value-col">
              {" "}
              {data?.address?.line1 +
                "," +
                " " +
                data?.address?.city +
                "," +
                " " +
                data?.address?.state}
            </div>
          </div>
        </div>
      </div>
      <div className="my-order-card-btn-cont">
        <div>
          <button style={{border:'1px solid orange', borderRadius:'6px', backgroundColor: 'orange', color: 'white'}} className="SignUpButton" onClick={buyIt}>
            Buy it again
          </button>
        </div>
        {
          data?.status !== "Cancelled" && (
            <div>
              <button id="BUYbutton2" style={{border:'1px solid orange', borderRadius:'6px', backgroundColor: 'white', color: 'orange'}}  className="return-btn" onClick={returnhandle}>
                {isReturnLoading ? (
                  <CircularLoading color="orange" />
                ) : (
                  "Return"
                )}
              </button>
            </div>

          )
        }
      </div>
      {
        data?.status !== "Cancelled" && (
          <div className="my-order-download-btn-cont">
            <button className="download-btn" onClick={handleInvoice}>
              Download Invoice
            </button>
          </div>

        ) 
      }
    </div>
  );
}

export default MyOrderCard;
