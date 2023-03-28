import React, { useContext, useState } from "react";
import "../../Styles/Components/CustomerReview.css";
import { Rating } from "react-simple-star-rating";
import { uploadFile3, uploadFile4 } from "../../firebase/fileUpload";
import DoneIcon from "@mui/icons-material/Done";
import { AuthContext } from "../../Context/AuthContext";
import { SEND_PRODUCT_REVIEW } from "../../Context/Types";

const CustomerReview = ({ id, productDetails }) => {
  const [rating, setRating] = useState(0);
  const [rating02, setRating02] = useState(0);
  const [rating03, setRating03] = useState(0);
  const { auth, dispatch } = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [text, setText] = useState("");
  var rating1 = 0;
  var rating2 = 0;
  var rating3 = 0;
  var rating4 = 0;
  var rating5 = 0;
  var total1 = 0;
  var total2 = 0;
  var total3 = 0;
  var total4 = 0;
  var total5 = 0;

  const handleRating = (rate) => {
    setRating(rate / 20);

    // other logic
  };
  const handleRating2 = (rate) => {
    setRating02(rate / 20);

    // other logic
  };
  const handleRating3 = (rate) => {
    setRating03(rate / 20);

    // other logic
  };

    productDetails?.reviews?.forEach((item) => {
      if (item.rating === 1) {
        rating1 = rating1 + item.rating;
        total1++;
      }
      if (item.rating === 2) {
        rating2 = rating2 + item.rating;
        total2++;
      }
      if (item.rating === 3) {
        rating3 = rating3 + item.rating;

        total3++;
      }
      if (item.rating === 4) {
        rating4 = rating4 + item.rating;
        total4++;
      }
      if (item.rating === 5) {
        rating5 = rating5 + item.rating;
        total5++;
      }
    });

  const handleSubmit = () => {

    if (text.length > 0 && rating > 0) {
      dispatch({
        type: SEND_PRODUCT_REVIEW,
        id,
        productQuality: rating,
        packaging: rating02,
        delivery: rating03,
        comment: text,
        image: [imgUrl],
        video: [videoUrl],
      });
    } else {
      alert("rating and comment is mandetory");
    }
  };
  return (
    <div className="MSPmainContainer MSPmainContainer2">
      <div style={{textAlign:'center', width: '100%'}} className="MSPcontiner1">Customer Review</div>
      <div className="review-section">
        <div className="flex cum-review">
          <div className="rating">
            <h4 className="rating-heading">Rating {productDetails?.rating ? productDetails?.rating : "0"} out of 5</h4>
            <div className="rating-section">
              <ul>
                <li className="list-height">
                  <div>
                    <label className="rating-value">5</label>
                    <span className="rating-star">
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>{" "}
                </li>
                <li className="list-height">
                  <div>
                    <label className="rating-value">4</label>
                    <span className="rating-star">
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>
                </li>
                <li className="list-height">
                  <div>
                    <label className="rating-value">3</label>
                    <span className="rating-star">
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>
                </li>
                <li className="list-height">
                  <div>
                    <label className="rating-value">2</label>
                    <span className="rating-star">
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>
                </li>
                <li className="list-height">
                  <div>
                    <label className="rating-value">1</label>
                    <span className="rating-star">
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>
                </li>
              </ul>
              <ul>
                <li className="measure-list list-height">
                  <div>
                    <div className="measure-line">
                      <div
                        className={`bar-5 bar-size`}
                      ></div>
                    </div>
                  </div>
                </li>
                <li className="measure-list list-height">
                  <div>
                    <div className="measure-line">
                      <div className="bar-4 bar-size"></div>
                    </div>
                  </div>
                </li>
                <li className="measure-list list-height">
                  <div>
                    <div className="measure-line">
                      <div className="bar-3 bar-size"></div>
                    </div>
                  </div>
                </li>
                <li className="measure-list list-height">
                  <div>
                    <div className="measure-line">
                      <div className="bar-2 bar-size"></div>
                    </div>
                  </div>
                </li>
                <li className="measure-list list-height">
                  <div>
                    <div className="measure-line">
                      <div className="bar-1 bar-size"></div>
                    </div>
                  </div>
                </li>
              </ul>
              <ul style={{ paddingLeft: "15px" }}>
                <li className="list-height">
                  <div className="rating-num">{total1}</div>
                </li>
                <li className="list-height">
                  <div className="rating-num">{total2}</div>
                </li>
                <li className="list-height">
                  <div className="rating-num">{total3}</div>
                </li>
                <li className="list-height">
                  <div className="rating-num">{total4}</div>
                </li>
                <li className="list-height">
                  <div className="rating-num">{total5}</div>
                </li>
              </ul>
            </div>
          </div>

          {
            auth && (
            productDetails?.isPurchase && (
              <div className="comment-container-details">
            <div className="flex dflex-column layout-comment">
              <div className="customer-heading">
                <h4>Write a product review</h4>
              </div>
              <div>
                <div className="d-flex justify-content-between mb-4">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "40%",
                      justifyContent: "left",
                    }}
                  >
                    <div className="upload-btn-wrapper">
                      <button style={{ padding: 0, width: "100%" }} className="btn">
                        Upload Image
                      </button>
                      <input
                        onChange={(e) => uploadFile3(e, setImgUrl)}
                        type="file"
                      />
                    </div>
                    {imgUrl?.length > 0 && (
                      <DoneIcon
                        style={{ color: "green", marginRight: "10px" }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "40%",
                      justifyContent: "right",
                    }}
                  >
                    {videoUrl?.length > 0 && (
                      <DoneIcon
                        style={{ color: "green", marginRight: "10px" }}
                      />
                    )}
                    <div className="upload-btn-wrapper">
                      <button style={{ padding: 0, width: "100%" }} className="btn">
                        Upload Video
                      </button>
                      <input
                        onChange={(e) => uploadFile4(e, setVideoUrl)}
                        type="file"
                      />
                    </div>
                  </div>
                </div>
                <textarea
                  style={{ padding: "2%", outline: "none" }}
                  onChange={(e) => setText(e.target.value)}
                  className="comment-area"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="flex comment-low justify-content-between">
                  <div className="head-star">
                    <h4>Product Quality</h4>
                    <div>
                      <Rating
                        onClick={handleRating}
                        size={20}
                        iconsCount={5}
                        allowHalfIcon={true}
                        ratingValue={rating}
                      />
                    </div>
                  </div>
                  <div className="head-star">
                    <h4>Packaging</h4>
                    <div>
                      <Rating
                        onClick={handleRating2}
                        size={20}
                        iconsCount={5}
                        allowHalfIcon={true}
                        ratingValue={rating02}
                      />
                    </div>
                  </div>
                  <div className="head-star">
                    <h4>Delivery</h4>
                    <div>
                      <Rating
                        onClick={handleRating3}
                        size={20}
                        iconsCount={5}
                        allowHalfIcon={true}
                        ratingValue={rating02}
                      />
                    </div>
                  </div>
              </div>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={() => handleSubmit()}
                    className="button-submit"
                  >
                    Submit
                  </button>
                </div>
            </div>
              </div>
            )
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
