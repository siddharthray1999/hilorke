import React from "react";
import "../../Styles/Components/MessageReviewCard.css";

const MessageReviewCard = ({ item }) => {

  return (
    <>
      <div className="comment-container">
        <div className="comment-top">
          <div className="comment-top-left">
            <div className="prof-img">
              <img src={item?.profilePic} alt="" />
            </div>
            <div className="person-name">
              <h4>{item?.name}</h4>
            </div>
          </div>
          <div
            className="comment-top-right"
            style={{
              backgroundColor: `${
                (Math.round((item?.productQuality + item?.packaging + item?.delivery) / 3) >= 4 && "green") ||
                (Math.round((item?.productQuality + item?.packaging + item?.delivery) / 3) >= 3 && "yellow") ||
                (Math.round((item?.productQuality + item?.packaging + item?.delivery) / 3) >= 0 && "red")
              }`,
            }}
          >
            <label className="comment-rate-value">{Math.round((item?.productQuality + item?.packaging + item?.delivery) / 3)}</label>
            <span className="comment-rate-star">
              <i class="fa-solid fa-star"></i>
            </span>
          </div>
        </div>
        <div className="comment-middle">
          <div className="text-img">
            {/* <div className="comment-head">
              <h4>{item?.comment}</h4>
            </div> */}
            {item?.image?.map((e) => (
              <div className="product-img">
                <img src={e} alt="hi" />
              </div>
            ))}
          </div>
          <div className="extra-text">
            <p>{item?.comment}</p>
          </div>
        </div>
        <div className="comment-lower-side">
          <div className="comment-date">
            <h5 className="comment-lower-heading">July 2015</h5>
          </div>
          <div className="comment-sign">
            <div className="comment-like">
              <span className="comment-thums">
                <i class="fa-solid fa-thumbs-up"></i>
              </span>
              <label>20</label>
            </div>
            <div className="comment-dislike">
              <span className="comment-thums">
                <i class="fa-solid fa-thumbs-down"></i>
              </span>
              <label>23</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageReviewCard;
