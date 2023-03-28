import React, { useContext, useEffect, useState } from "react";
import Cart from "../../Assets/Images/ProductDetail/Cart.png";
import "../../Styles/Components/ProductDetail.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import {
  ADD_ITEM_CART,
  ADD_ITEM_TO_WISHLIST,
  CHECK_ITEM_IN_CART,
  CHECK_WISHLIST_STATUS,
  REMOVE_ITEM_TO_WISHLIST,
} from "../../Context/Types";
import wishlist_icon from "../../Assets/Images/wishlist.svg";
import active_wishlist_icon from "../../Assets/Images/active-wishlist.svg";
import { Button } from "@mui/material";
import CircularLoading from "../../ui/CircularLoading/CircularLoading";
import StarRating from "../../ui/Rating/Rating";
import CustomModal from "../../ui/CustomModal/CustomModal";

const ProductDetail = ({ id, productDetails }) => {
  const { auth, dispatch, state } = useContext(AuthContext);
  const { cartData } = state;
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToCartLoading, setIsAddedToCartLoading] = useState(false);
  const [nonloginCart, setNonLoginCart] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (productDetails?.variants && productDetails?.variants?.length > 0)
      setSelectedSize(productDetails?.variants[0]?.size);
  }, [productDetails]);

  useEffect(() => {
    setCounter(
      cartData?.filter((item) => item?.productId === id)[0]?.quantity || 1
    );
  }, [cartData, id]);

  const [counter, setCounter] = useState(1);
  const incrementCounter = () => setCounter((prev) => prev + 1);
  const decrementCounter = () => {
    if (counter >= 2) setCounter((prev) => prev - 1);
  };

  const addToCart = async (details, cb) => {

    const values = [
      {
        productId: id,
        quantity: counter,
        size: selectedSize,
        price:
          details?.variants?.length > 0
            ? details?.variants?.filter(
                (item) => item?.size === selectedSize
              )[0]?.price
            : details?.price,
        offerprice:
          details?.variants?.length > 0
            ? details?.variants?.filter(
                (item) => item?.size === selectedSize
              )[0]?.offerprice
            : details?.offerprice,
        isDiscount: details?.isDiscount ? details?.isDiscount : false,
      },
    ];

    console.log(values);
    if (auth) {
      dispatch({
        type: ADD_ITEM_CART,
        payload: values,
        upDateState: setIsAddedToCart,
        setIsLoading: setIsAddedToCartLoading,
        cb,
      });
    } else {
      localStorage.setItem(
        "cartSave",
        JSON.stringify({
          productId: id,
          quantity: counter,
          size: selectedSize,
          price: details?.variants?.filter(
            (item) => item?.size === selectedSize
          )[0]?.price,
          offerprice: details?.variants?.filter(
            (item) => item?.size === selectedSize
          )[0]?.offerprice,
          isDiscount: details?.isDiscount,
          image: details?.productImage[0],
        })
      );
      setNonLoginCart({
        productId: id,
        quantity: counter,
        name: details?.name,
        size: selectedSize,
        price: details?.variants?.filter(
          (item) => item?.size === selectedSize
        )[0]?.price,
        offerprice: details?.variants?.filter(
          (item) => item?.size === selectedSize
        )[0]?.offerprice,
        isDiscount: details?.isDiscount,
        image: details?.productImage[0],
      });
      handleOpen();
    }
  };

  const addToWishlist = (e) => {
    dispatch({
      type: ADD_ITEM_TO_WISHLIST,
      payload: id,
      upDateState: setIsWishlist,
      setIsLoading: setIsWishlistLoading,
      navigate,
    });
  };
  const removeFromWishlist = () => {
    dispatch({
      type: REMOVE_ITEM_TO_WISHLIST,
      payload: id,
      upDateState: setIsWishlist,
      setIsLoading: setIsWishlistLoading,
    });
  };
  const handleBuy = () => {
    addToCart(productDetails);
    navigate("/my-cart", {
      state: {
        productDetails,
        quantity: counter,
        size: selectedSize,
      },
    });
  };
  useEffect(() => {
    dispatch({
      type: CHECK_WISHLIST_STATUS,
      payload: id,
      upDateState: setIsWishlist,
    });
    dispatch({
      type: CHECK_ITEM_IN_CART,
      payload: id,
      upDateState: setIsAddedToCart,
      setIsLoading: setIsAddedToCartLoading,
    });
  }, []);

  const modalCloseHandler = () => {
    handleClose();
    localStorage.removeItem("cartSave");
  };

  return productDetails ? (
    <>
      <div className="productDetail-container">
        <div className="col-5 img-section">
          <div className="imageAndVideo">
            <div className="videoContainer">
              <div
                className="wishlist-cont"
                onClick={!isWishlist ? addToWishlist : removeFromWishlist}
              >
                {isWishlistLoading ? (
                  <CircularLoading color="orange" />
                ) : (
                  <div>
                    <img
                      src={isWishlist ? active_wishlist_icon : wishlist_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
              {productDetails?.productVideos[0] ? (
                selectedImage ? (
                  <img src={selectedImage} alt="" className="active-preview" />
                ) : (
                  <video
                    src={productDetails?.productVideos[0]}
                    autoPlay
                    className="active-preview"
                    loop
                    // controls
                  />
                )
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={productDetails?.productImage[0]}
                    alt=""
                    className="active-preview"
                  />
                </div>
              )}
            </div>
            <div className="SmallImageCont">
              {productDetails?.productImage?.map((item, index) => {
                return (
                  <img
                    src={item}
                    alt=""
                    className="product-preview-image"
                    onClick={() => {
                      setSelectedImage(item);
                    }}
                    key={index}
                  />
                );
              })}

              {productDetails?.productVideos?.length > 0 && (
                <video
                  onClick={() => setSelectedImage(false)}
                  src={productDetails[0]?.productVideos[0]}
                  className="product-preview-image"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "10px",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-7 pBottom-section">
          <div className="ProdInfo ">
            <div className="product-details-container">
              <div>
                <div className="ProCont1 prodc-cont">
                  <div id="ProHead">
                    <div className="top-head">
                      {productDetails?.brand ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              marginRight: "10px",
                            }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                              src={productDetails?.brand?.image}
                              alt=""
                            />
                          </div>
                          <div style={{ color: "gray" }}>
                            {productDetails?.brand?.name}
                          </div>
                        </div>
                      ) : (
                        <h5>{productDetails?.owner?.name}</h5>
                      )}
                    </div>

                    <div className="middle-head">
                      <h4>{productDetails?.name}</h4>
                    </div>
                    {productDetails?.variants?.length > 0 && (
                      <div
                        className="middle-head"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <h5 style={{ margin: 0, color: "#848484" }}>Size: </h5>
                        <select
                          onChange={(e) => setSelectedSize(e.target.value)}
                          style={{
                            width: "100px",
                            outline: "none",
                            borderColor: "orange",
                            borderRadius: "6px",
                            color: "orange",
                            marginLeft: "10px",
                          }}
                          name="size"
                          id="size"
                        >
                          {productDetails?.variants?.map((item) => {
                            return (
                              <option value={item?.size}>{item?.size}</option>
                            );
                          })}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="Stars">
                    <StarRating rating={productDetails?.ratings} />
                  </div>
                </div>
                <div id="PriceCont">
                  {productDetails?.isDiscount ? (
                    productDetails?.variants?.length > 0 ? (
                      <div id="ProdPrice d-flex">
                        <div
                          style={{
                            color: "#808080",
                            textDecorationLine: "line-through",
                          }}
                        >
                          RS.{" "}
                          {productDetails?.variants?.filter(
                            (item) => item?.size === selectedSize
                          )[0]?.price * counter}{" "}
                        </div>
                        <div>
                          {" "}
                          RS.{" "}
                          {productDetails?.variants?.filter(
                            (item) => item?.size === selectedSize
                          )[0]?.offerprice * counter}
                        </div>
                      </div>
                    ) : (
                      <div id="ProdPrice d-flex">
                        <div
                          style={{
                            color: "#808080",
                            textDecorationLine: "line-through",
                          }}
                        >
                          RS. {productDetails?.price * counter}
                        </div>
                        <div> RS. {productDetails?.offerprice * counter}</div>
                      </div>
                    )
                  ) : productDetails?.variants?.length > 0 ? (
                    <div id="ProdPrice">
                      Rs{" "}
                      {productDetails?.variants?.filter(
                        (item) => item?.size === selectedSize
                      )[0]?.price * counter}
                    </div>
                  ) : (
                    <div id="ProdPrice">
                      Rs {productDetails?.price * counter}
                    </div>
                  )}

                  <div className="d-flex flex-column">
                    <div className="quantity-heading">
                      <h4>Quantity</h4>
                    </div>
                    <div id="counter" className="counter">
                      <ButtonDecrement onClickFunc={decrementCounter} />
                      <Display message={counter} />
                      <ButtonIncrement onClickFunc={incrementCounter} />
                    </div>
                  </div>
                </div>

                {productDetails?.variants?.length > 0 ? (
                  <div id="ProdPrice d-flex">
                    <div
                      style={{
                        color: "#808080",
                      }}
                    >
                      Stock:{" "}
                      {
                        productDetails?.variants?.filter(
                          (item) => item?.size === selectedSize
                        )[0]?.stock
                      }
                    </div>
                  </div>
                ) : (
                  <div id="ProdPrice d-flex">
                    <div
                      style={{
                        color: "#808080",
                      }}
                    >
                      Stock: {productDetails?.stock}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: "1rem" }}>
                  <p style={{ margin: 0 }} title={productDetails?.description}>
                    {productDetails?.description.slice(0, 200)}...
                  </p>
                </div>
              </div>
              {productDetails?.variants?.length > 0 ? (
                <div id="buttonContainer">
                  <div className="cart-div">
                    <button
                      id="AddToCart"
                      disabled={
                        productDetails?.variants?.filter(
                          (item) => item?.size === selectedSize
                        )[0]?.stock === 0
                          ? true
                          : false
                      }
                      onClick={() => {
                        isAddedToCart
                          ? navigate("/my-cart")
                          : addToCart(productDetails);
                      }}
                    >
                      {isAddedToCartLoading ? (
                        <CircularLoading color="orange" />
                      ) : (
                        <>
                          <img src={Cart} alt="" />
                          {

                          isAddedToCart ? (<span>View Cart</span>) : (
                          productDetails?.variants?.filter(
                            (item) => item?.size === selectedSize
                          )[0]?.stock === 0 ? (
                            <span>Out of Stock</span>
                          ) : (
                            <span>Add to Cart</span>
                          )
                          )
                          }
                        </>
                      )}
                    </button>
                  </div>
                  <div className="buyNow-div">
                    <button
                      disabled={
                        productDetails?.variants?.filter(
                          (item) => item?.size === selectedSize
                        )[0]?.stock === 0
                          ? true
                          : false
                      }
                      id="BuyNow"
                      onClick={handleBuy}
                    >
                      {productDetails?.variants?.filter(
                        (item) => item?.size === selectedSize
                      )[0]?.stock === 0
                        ? "Out of Stock"
                        : "Buy Now"}
                    </button>
                  </div>
                </div>
              ) : (
                <div id="buttonContainer">
                  <div className="cart-div">
                    <button
                      id="AddToCart"
                      disabled={productDetails?.stock === 0 ? true : false}
                      onClick={() => {
                        isAddedToCart
                          ? navigate("/my-cart")
                          : addToCart(productDetails);
                      }}
                    >
                      {isAddedToCartLoading ? (
                        <CircularLoading color="orange" />
                      ) : (
                        <>
                          <img src={Cart} alt="" />
                          {
                            
                          isAddedToCart ? (<span>View Cart</span>) : (
                          productDetails?.stock === 0 ? (
                            <span>Out of Stock</span>
                          ) : (
                            <span>Add to Cart</span>
                          )
                          )
                          }
                        </>
                      )}
                    </button>
                  </div>
                  <div className="buyNow-div">
                    <button
                      disabled={productDetails?.stock === 0 ? true : false}
                      id="BuyNow"
                      onClick={handleBuy}
                    >
                      {productDetails?.stock === 0 ? "Out of Stock" : "Buy Now"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <CustomModal open={open} handleClose={handleClose}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5>Item Added in Cart</h5>
          </div>
          <hr />
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
                borderRadius: "10px",
                overflow: "hidden",
                marginRight: "10px",
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={nonloginCart?.image}
                alt=""
              />
            </div>

            <div>
              <h6>{nonloginCart?.name}</h6>
              <span>Quantity: {nonloginCart?.quantity}</span>
            </div>
          </div>
          <hr />
          <div>
            <Button
              onClick={() => navigate("/login")}
              variant="contained"
              style={{ backgroundColor: "orange", marginRight: "20px" }}
            >
              Login
            </Button>
            <Button
              onClick={modalCloseHandler}
              variant="outlined"
              style={{ borderColor: "orange", color: "orange" }}
            >
              Cancel
            </Button>
          </div>
        </CustomModal>
      </div>
    </>
  ) : (
    <div
      style={{
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularLoading color="orange" />
    </div>
  );
};

function ButtonIncrement(props) {
  return (
    <button className="increment-qty" onClick={props.onClickFunc}>
      <div className="value">+</div>
    </button>
  );
}
function ButtonDecrement(props) {
  return (
    <button className="decrement-qty" onClick={props.onClickFunc}>
      <div className="value">-</div>
    </button>
  );
}
function Display(props) {
  return <label className="value value-size">{props.message}</label>;
}

export default ProductDetail;
