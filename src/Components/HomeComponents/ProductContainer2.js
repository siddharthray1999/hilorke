import React from "react";
import "../../Styles/Components/ProductContainer.css";
import { Link, useNavigate } from "react-router-dom";
import noimage from '../../Assets/Images/no-image.png';
import StarRating from "../../ui/Rating/Rating";


const ProductContainer2 = ({price, offerprice, variants, isDiscount, title, description, ratings, productImage, name, owner, _id, brand}) => {

  const navigate = useNavigate();

  return (
    <div style={{cursor: 'pointer'}} className="ProductMainContainer px-4 py-2 d-flex flex-column mb-5">
      <div className="ProCont1">
        {
          brand ? (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', marginRight: '10px'}}>
                <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={brand?.image} alt="" />
              </div>
              <div style={{color:'gray'}}>{brand?.name}</div>
            </div>
          ) : (
            <Link
              to="/affiliate"
              style={{ color: "inherit", textDecoration: "none" }}
              state={owner}
            >
              <div className="ProHead">{owner?.name}</div>
            </Link>

          )
        }
        <div onClick={() => navigate(`/HomeProductDetail/${_id}`)} className="Stars">
          <StarRating rating={ratings}/>
        </div>
      </div>
        <div onClick={() => navigate(`/HomeProductDetail/${_id}`)} className="Images">
          <img
            src={productImage ? productImage : noimage}
            alt=""
            style={{ height: "100%", width: "100%",borderRadius:'6px' }}
          />
        </div>
      <div  onClick={() => navigate(`/HomeProductDetail/${_id}`)} className="discription">{name}</div>
      {isDiscount ? (
        <>
          <div
           onClick={() => navigate(`/HomeProductDetail/${_id}`)}
            className="d-flex product-container-offer-price"
            style={{ width: "100%" }}
          >
            <div className={`product-container-mrp-price ${isDiscount && "priceDecoration price"}`}>
              ₹ {variants[0]?.price || price}{" "}
            </div>
            <div className="price">₹ {variants[0]?.offerprice || offerprice}</div>
          </div>
        </>
      ) : (
        <div onClick={() => navigate(`/HomeProductDetail/${_id}`)} className="price">₹ {variants[0]?.price || price}</div>
      )}
    </div>
  );
};

export default ProductContainer2;
