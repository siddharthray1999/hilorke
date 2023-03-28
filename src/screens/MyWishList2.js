import React, { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import YourWishlistCont from "../Components/MyWishList/YourWishlistCont";
import "../Styles/pages/MyWishList.css";
import { AuthContext } from "../Context/AuthContext";
import {
  GET_WISHLIST_ITEMS,
} from "../Context/Types";
import CircularLoading from "../ui/CircularLoading/CircularLoading";
import OutlinedButton from "../ui/OutlinedButton/OutlinedButton";

const MyWishList2 = () => {
  const { auth, dispatch } = useContext(AuthContext);
  const [wishListItems, setWishListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [msg, setMsg] = useState("");

  const getWishlist = async () => {
    dispatch({ type: GET_WISHLIST_ITEMS, upDateState: setWishListItems, setIsLoading });
  };

  useEffect(() => {
    window.scroll(0,0);
    if(auth) {
      getWishlist();
    } else {
      setMsg("Please login to add item in wishlist!");
    }
  }, []);


  return (
    <div className="wishlist-container">
      <h1 className="wishlist-heading-mobile">Wishlist</h1>
      <div className="wishlist-items-cont">
        {
          isLoading ? (
            <div className="wishlist-msg">
              <CircularLoading color="orange"/>
            </div>
          ) : (
          wishListItems?.length > 0 ? (
          wishListItems.map((item, idx) => (
            <YourWishlistCont item={item} key={item?._id} cb={getWishlist} />
          ))
        ) : (
          msg.length !== 0 ? (
            <div className="wishlist-msg">
              <p>{msg}</p>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <OutlinedButton navigateNow="/login" text="Login"/>
              </div>
            </div>
          ) : (
            <div className="wishlist-msg">
              <p>No item in wishlist!</p>
            </div>
          )
        )
          )
        }
      </div>

      <Footer />
    </div>
  );
};

export default MyWishList2;
