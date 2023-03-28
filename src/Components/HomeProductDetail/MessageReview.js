import React from "react";
import "../../Styles/Components/MessageReview.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MessageReviewCard from "./MessageReviewCard";

const MessageReview = ({ productDetails }) => {

  const handleBackward = () => {
    document.getElementById("scroll-img").scrollLeft -= 300;
  };
  const handleForward = () => {
    document.getElementById("scroll-img").scrollLeft += 300;
  };
  return (
    <>
      {
        productDetails?.reviews?.length > 0 && (
          <div className="MSPmainContainer MSPmainContainer2">
        <div className="review-section">
          <h4 className="rating-heading">Image and Videos for Customer</h4>
          <div className="flex">
            <div className="scroll-arrow-img" style={{ marginRight: "-15px" }}>
              <ArrowBackIosNewIcon onClick={handleBackward} />
            </div>
            <div className="review-img-container">
              <div className="image-carsol" id="scroll-img">
                {productDetails?.reviews.map((e) => (
                  <div className="message-img">
                    <img src={e?.image[0]} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div className="scroll-arrow-img" style={{ marginLeft: "-15px" }}>
              <ArrowForwardIosIcon onClick={handleForward} />
            </div>
          </div>

          <div className="comment-section">
            {productDetails?.reviews.map((item, index) => (
              <MessageReviewCard item={item} />
            ))}
          </div>
        </div>
      </div>
        )
      }

    </>
  );
};

export default MessageReview;
