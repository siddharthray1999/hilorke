import React from "react";
import Footer from "../Components/Footer";
import logo from "../Assets/Images/hiloralogo.jpeg";
import "../Styles/pages/RefundPage.css";
import { useEffect } from "react";

const RefundPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
  return (
    <>
      <div className="refund--container">
        <div className="refund--container__heading">
          <div className="refund__imgContainer">
            <img src={logo} alt="" />
          </div>
          <h4>Refund and Cancellation Policy</h4>
        </div>

        <p>
          Our focus is complete customer satisfaction. In the event, if you are
          displeased with the services provided, we will refund back the money,
          provided the reasons are genuine and proved after investigation.
          Please read the fine prints of each deal before buying it, it provides
          all the details about the services or the product you purchase. In
          case of dissatisfaction from our services, clients have the liberty to
          cancel their projects and request a refund from us. Our Policy for the
          cancellation and refund will be as follows:
        </p>

        <h5>Cancellation Policy: </h5>
        <p>
          For Cancellations please contact the us via contact us link. Requests
          received later than 7 business days prior to the end of the current
          service period will be treated as cancellation of services for the
          next service period.
        </p>

        <h5>Refund Policy: </h5>
        <p>
        In case any client is not completely satisfied with salers products we can provide a refund. If paid by credit card, refunds will be issued to the original credit card provided at the time of purchase and in case of payment gateway name payments refund will be made to the same account.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default RefundPage;
