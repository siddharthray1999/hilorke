import React, { useContext, useEffect, useState } from "react";
import "../../Styles/Components/ProductContainer.css";
import "../../Styles/Components/YourWishlistCont.css";
import wishlist_icon from "../../Assets/Images/wishlist.svg";
import active_wishlist_icon from "../../Assets/Images/active-wishlist.svg";
import { AuthContext } from "../../Context/AuthContext";
import { ADD_ITEM_CART, REMOVE_ITEM_TO_WISHLIST } from "../../Context/Types";
import { Link, useNavigate } from "react-router-dom";
import CircularLoading from "../../ui/CircularLoading/CircularLoading";
import StarRating from "../../ui/Rating/Rating";

const YourWishlistCont = ({ cb, item }) => {
  const { dispatch } = useContext(AuthContext);
  const [isWishlist, setIsWishlist] = useState(true);
  const [isAddedToCartLoading, setIsAddedToCartLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if(item?.variants && item?.variants?.length > 0)
    setSelectedSize(item?.variants[0]?.size)
  }, [item])

  const addToCart = async (e, cb) => {
    const values = [
      {
        productId: item?._id,
        quantity: 1,
        size: selectedSize,
        price: item?.variants?.length > 0 ? item?.variants?.filter((item) => item?.size === selectedSize)[0]?.price : item?.price,
        offerprice: item?.variants?.length > 0 ? item?.variants?.filter((item) => item?.size === selectedSize)[0]?.offerprice : item?.offerprice,
        isDiscount: item?.isDiscount ? item?.isDiscount : false,
      },
    ];
    dispatch({
      type: ADD_ITEM_CART,
      payload: values,
      upDateState: setIsAddedToCart,
      setIsLoading: setIsAddedToCartLoading,
      cb,
    });
  };

  const navigate = useNavigate();
  const removeFromWishlist = async (id) => {
    dispatch({
      type: REMOVE_ITEM_TO_WISHLIST,
      payload: id,
      upDateState: setIsWishlist,
      setIsLoading: setIsWishlistLoading,
      cb: cb,
    });
  };

  const buyNow = async (e) => {
    await addToCart();
    await removeFromWishlist(e);
    isAddedToCart && navigate("/my-cart");
  };
  const toCart = async (e) => {
    await addToCart();
    await removeFromWishlist(e);
  };

  return (
    <div className="ProductMainContainer2 mb-5">
      <div className="ProCont1">
        {
          item?.brand ? (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', marginRight: '10px'}}>
                <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={item?.brand?.image} alt="" />
              </div>
              <div style={{color:'gray'}}>{item?.brand?.name}</div>
            </div>
          ) : (
            <Link
              to="/affiliate"
              style={{ color: "inherit", textDecoration: "none" }}
              state={item?.owner}
            >
              <div className="ProHead">{item?.owner?.name}</div>
            </Link>

          )
        }
        <div className="Stars">
          <StarRating rating={item?.ratings}/>
        </div>
      </div>

      <div
        onClick={() => navigate(`/HomeProductDetail/${item?._id}`)}
        style={{ margin: "0 auto", padding: 0, cursor: 'pointer' }}
        className="Images"
      >
        <img
          src={item?.productImage}
          alt=""
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div className="product-title-cont">
        <div title={item?.name} className="discription">
          {item?.name.slice(0, 20)}...
        </div>
        <div
          onClick={() => removeFromWishlist(item?._id)}
          style={{ cursor: "pointer" }}
        >
        {
          isWishlistLoading ? <CircularLoading color="orange"/> : (
            <img
              src={isWishlist ? active_wishlist_icon : wishlist_icon}
              alt="wishlist"
            />

          )
        }
        </div>
      </div>
      {item.isDiscount ? (
        item?.variants?.length > 0 ? (
        <div className="price d-flex w-100 justify-content-between">
          <div style={{ textDecorationLine: "line-through" }}>
            ₹ {item?.variants[0]?.price}
          </div>
          <div style={{ marginLeft: "4px" }}>₹ {item?.variants[0]?.offerprice}</div>
        </div>
        ): (
          <div className="price d-flex w-100 justify-content-between">
          <div style={{ textDecorationLine: "line-through" }}>
            ₹ {item?.variants[0]?.price}
          </div>
          <div style={{ marginLeft: "4px" }}>₹ {item.offerprice}</div>
        </div>
        )
      ) : (
        item?.variants?.length > 0 ? (
          <div className="price">₹ {item?.variants[0]?.price} </div>
        ) : (
          <div className="price">₹ {item?.price} </div>
        )
      )}

      <div id="WishListButtonCont">
        <div>
          <button id="BUYbutton1" onClick={() => toCart(item?._id)}>
            {isAddedToCartLoading ? (
              <CircularLoading color="white"/>
            ) : (
              <>{isAddedToCart ? "Added to cart" : "Add to cart"}</>
            )}
          </button>
        </div>
        <div>
          <button id="BUYbutton2" onClick={() => buyNow(item?._id)}>
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourWishlistCont;
