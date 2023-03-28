import React, { useState } from "react";
import { useContext } from "react";
import { Store } from "react-notifications-component";
import { AuthContext, notification } from "../../Context/AuthContext";
import { CHECK_COD_AVAILABLE } from "../../Context/Types";
import "../../Styles/Components/MiddleComp.css";
import ReportProduct from "./ReportProduct";
import CircularLoading from "../../ui/CircularLoading/CircularLoading";

const MiddleComp = ({ id, productDetails }) => {
  const { dispatch } = useContext(AuthContext);
  const [activeReport, setActiveReport] = useState(false);
  const [pin, setPin] = useState("");
  const [isCodAvailable, setIsCodAvailable] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [expectedDate, setExpectedDate] = useState("");
  const handleClick = () => {
    setActiveReport(true);
  };

  const checkCodAvailableHandler = (e) => {
    e.preventDefault();
    //Expected date finder with 9 to 15 days

    if(pin.length > 0) {
      dispatch({
        type: CHECK_COD_AVAILABLE,
        pincode: pin,
        setIsCodAvailable,
        setIsLoading,
        setExpectedDate
      });
    }else {
      Store.addNotification({
        ...notification,
        type: "warning",
        message: "Enter Pincode!"
      })
    }
  };

  return (
    <>
      <div className="middle-section d-flex justify-content-between">
        <div className="container-about col-5">
          <div id="MidChead">
            <div className="about-item">About</div>
            <div onClick={handleClick} className="report-item">
              Report this product
            </div>
          </div>
          <div id="About">
            {
              productDetails?.description
            }
          </div>
        </div>
        <div className="container-pincode col-7">

        <div style={{backgroundColor: 'rgb(244, 241, 241)', borderRadius: '6px', width: '100%'}} className="d-flex align-items-center justify-content-around py-2">
                      <div style={{ width: "60%" }}>
                        <input
                          style={{
                            margin: 0,
                            height: "40px",
                            paddingLeft: "10px",
                            border: 'none'
                          }}
                          className="inputText"
                          type="text"
                          onChange={(e) => setPin(e.target.value)}
                          placeholder="Enter Pincode"
                        />
                      </div>
                      <button style={{borderRadius: '6px'}}  onClick={checkCodAvailableHandler} type="submit" className="changeButton">
                        {isLoading ? (
                          <CircularLoading
                            color="white"
                          />
                        ) : (
                          "Check"
                        )}
                      </button>
          </div>
          <div className="location-details">

              {
                !isCodAvailable ? (
                  <span></span>
                ) : (
                  <>
                  <div className="mt-3 color-cart-gray" id="add">
                    Expected delivery by {String(expectedDate).slice(0,15)}
                  </div>
                  <div className="mt-1 color-cart-gray" id="add">
                  {isCodAvailable?.isAvailable ? "COD Available" : "COD Not Available"}
                  </div>
                  <div className="mt-1 color-cart-gray" id="add">
                    Return Available with 15 days
                  </div>
                  </>
                )
              }
          </div>
        </div>
      </div>
      {activeReport && (
        <ReportProduct id={id} setActiveReport={setActiveReport} />
      )}
    </>
  );
};

export default MiddleComp;
