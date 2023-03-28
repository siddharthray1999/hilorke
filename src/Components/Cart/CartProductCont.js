import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import "../../Styles/pages/Cart2.css";
import { AuthContext } from "../../Context/AuthContext";
import { DELETE_ITEM_FROM_CART } from "../../Context/Types";
import DeleteIcon from '@mui/icons-material/Delete';
import CircularLoading from "../../ui/CircularLoading/CircularLoading";
import { useNavigate } from "react-router-dom";

const Counter = ({ counter, setCounter }) => {
  return (
    <div className="counter-cont">
      <div
        className="counter-minus"
        onClick={() => {
          setCounter((prev) => (prev > 1 ? prev - 1 : 1));
        }}
      >
        -
      </div>
      <div className="counter-value">{counter}</div>
      <div
        className="counter-plus"
        onClick={() => {
          setCounter((prev) => (prev >= 1 ? prev + 1 : 1));
        }}
      >
        +
      </div>
    </div>
  );
};

const CartProductCont = ({
  item,
  setTotalQuantity,
  cartProducts,
  cartProductsQuant,
  cartProductsSize,
  TotalCartCost,
  getCartItems,
}) => {
  const { dispatch } = useContext(AuthContext);
  const [itemCost, setItemCost] = useState(item?.productId?.price);
  const [counter, setCounter] = useState(item?.quantity);
  const [deletFormCartLoading, setDeletFromCartLoading] = useState(false);
  const navigate = useNavigate();
  const deleteFromCart = async (id, cartProdId) => {
    dispatch({
      type: DELETE_ITEM_FROM_CART,
      payload: { productId: [id] },
      cb: getCartItems,
      setIsLoading: setDeletFromCartLoading,
      cartProducts,
      cartProdId,
    });
  };
  useEffect(() => {
    if(item?.isDiscount) {
      setItemCost(item?.offerprice)
      debugger
    }else {
      setItemCost(item?.price)
    }
  }, [item])

  const calculateCost = () => {

    setItemCost((prev) => counter * (item?.isDiscount ? Number(item?.offerprice) : Number(item?.price)));
    cartProducts.set(item._id, counter * (item?.isDiscount ? Number(item?.offerprice) : Number(item?.price)));
    cartProductsQuant.set(item._id, counter)
    cartProductsSize.set(item?._id, item?.size);
    TotalCartCost();
    setTotalQuantity()
  };

  useEffect(() => {
    calculateCost();
  }, [calculateCost, counter]);
  return (
    <div className="cart-prod-cont">
      <div onClick={() => navigate(`/HomeProductDetail/${item?.productId?._id}`)} className="cart-prod-image">
        <img src={item?.productId?.productImage[0]} alt="" />
      </div>
      <div className="cart-prod-details">
        <div className="cart-prod-title">{item?.productId?.name}</div>
        {
          (item?.size && item?.size?.length > 0) && <span className="cart-prod-title2">Size: {item?.size}</span>
        }
 
        <div className="cart-prod-price" data-price={itemCost}>
          {item?.isDiscount ? (
            <div className="price d-flex">
              <div style={{ textDecorationLine: "line-through", color: '#808080' }}>
                ₹ {item?.price}
              </div>
              <div style={{ marginLeft: "6px" }}>
                ₹ {item?.offerprice}
              </div>
            </div>
          ) : (
              <div className="price">₹ {item?.price} </div>
          )}
        </div>
        <div className="cart-prod-counter">
          <Counter counter={counter} setCounter={setCounter} />
        </div>
      </div>
      <div className="cart-prod-delete">
        {deletFormCartLoading ? (
          <CircularLoading color="orange"/>
        ) : (
          <DeleteIcon style={{color:'orange', cursor: 'pointer'}} onClick={() => deleteFromCart(item.productId._id, item._id)}/>
        )}
      </div>
    </div>
  );
};

export default CartProductCont;
