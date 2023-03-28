import React, { useContext, useState } from "react";
import { REPORT_PRODUCT } from "../../Context/Types";
import "../../Styles/Components/ReportProduct.css";
import { AuthContext } from "../../Context/AuthContext";

const ReportProduct = ({ setActiveReport, id }) => {
  const { dispatch } = useContext(AuthContext);
  const [state1, setState1] = useState({
    one: false,
    two: false,
    three: false,
    text: "",
  });


  const sendText = (e) => {
    setState1(() => {
      return {
        one: false,
        two: false,
        three: false,
        text: e.target.value,
      };
    });
  };
  const handleSubmit = () => {
    if (
      !state1.one &&
      !state1.two &&
      !state1.three &&
      state1.text.length === 0
    ) {
      alert("need to click");
    } else if (
      state1.one &&
      !state1.two &&
      !state1.three &&
      state1.text.length === 0
    ) {
      var message = "Inappropriate product";
      dispatch({
        type: REPORT_PRODUCT,
        product: id,
        issueName: message,
        description: "",
        setActiveReport
      });
    } else if (
      !state1.one &&
      state1.two &&
      !state1.three &&
      state1.text.length === 0
    ) {
      var message = "Always out of stock";
      dispatch({
        type: REPORT_PRODUCT,
        product: id,
        issueName: message,
        description: "",
        setActiveReport
      });
    } else if (
      !state1.one &&
      !state1.two &&
      state1.three &&
      state1.text.length === 0
    ) {
      var message = "Too expensive";
      dispatch({
        type: REPORT_PRODUCT,
        product: id,
        issueName: message,
        description: "",
        setActiveReport
      });
    } else if (
      !state1.one &&
      !state1.two &&
      !state1.three &&
      !state1.text.length == 0
    ) {
      var message = state1.text;
      dispatch({
        type: REPORT_PRODUCT,
        product: id,
        issueName: message,
        description: "",
        setActiveReport
      });
    }
  };

  return (
    <>
      <div class="report-service">
        <div>
          <div class="report-service-content">
            <div className="report-cross">
              <span
                onClick={() => setActiveReport(false)}
                className="report-cross-icon"
              >
                <i style={{cursor:'pointer'}} class="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
            <h4 class="report-service-heading">
              Why you want to report this product?
            </h4>
            <div className="option-report">
              <div className="option">
                <label>Inappropriate product</label>
                <input
                  onChange={() =>
                    setState1(() => {
                      return {
                        one: true,
                        two: false,
                        three: false,
                        text: "",
                      };
                    })
                  }
                  checked={state1.one}
                  type="radio"
                  name="report"
                />
              </div>
              <div className="option">
                <label>Always out of stock</label>
                <input
                  onChange={() =>
                    setState1(() => {
                      return {
                        one: false,
                        two: true,
                        three: false,
                        text: "",
                      };
                    })
                  }
                  checked={state1.two}
                  type="radio"
                  name="report"
                />
              </div>
              <div className="option">
                <label>Too expensive</label>
                <input
                  onChange={() =>
                    setState1(() => {
                      return {
                        one: false,
                        two: false,
                        three: true,
                        text: "",
                      };
                    })
                  }
                  checked={state1.three}
                  type="radio"
                  name="report"
                />
              </div>
            </div>
            <div class="report-service-below">
              <div className="report-message">
                <textarea
                  className="report-textarea"
                  onChange={(e) => sendText(e)}
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="If any other reason, please type here"
                ></textarea>
              </div>
              <div class="report-button">
                <button onClick={() => handleSubmit()}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportProduct;
