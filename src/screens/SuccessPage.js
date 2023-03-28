import React from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessPage.css";
import success from "../Assets/Images/success.png";
function SuccessPage() {

  const navigate = useNavigate();

  return (
    <div className="product-success-cont">
      <div className="product-success-second">
        <div>THANK YOU FOR YOUR ORDER</div>
      </div>
      <div className="product-success-first">
        <div className="success-img-container">
          <img className="successImg" src={success} alt=""/>
        </div>
      </div>
      <div className="product-success-second">
        <div>Estimated Delivery</div>
        <div>30 Apr 2022</div>
      </div>

      <div className="product-success-first fontalignSuccess">
        <div style={{ opacity: 0.5, padding: "0 20px" }}>
          We have emailed you a confirmation and we'll notify you when your
          order has shipped.
        </div>
      </div>

      <div className="alignButton">
        <button onClick={() => navigate("/track-order")} className="AddButton1">Track Order</button>
      </div>
    </div>
  );
}

export default SuccessPage;
