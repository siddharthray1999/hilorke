import { Store } from "react-notifications-component";
import { getOrderID, placeOrder, placeOrderCod } from "../API";
import { notification } from "../AuthContext";


export const makeOrderCod = async(productIds, cost, address, affiliateKey, navigate, setIsLoading6) => {
  setIsLoading6(true);
  const data = {
    products: productIds,
    totalPrice: cost,
    isCOD: true,
    address: {
      line1: address[0]?.line1,
      line2: address[0]?.line2,
      city: address[0]?.city,
      state: address[0]?.state,
      pincode: address[0]?.pincode,
      country: address[0]?.country
    },
    affiliateKey: affiliateKey
  }
  try {
    const res = await placeOrderCod(data);
    if(res?.status === 200) {
      Store.addNotification({
        ...notification,
        type: "success",
        message: "Order Placed!",
      });
      navigate("/my-orders", {state: res?.data?.newOrder})
    }
    setIsLoading6(false);
  } catch (error) {
    console.log(error);
    setIsLoading6(false);
  }
}
export const onlinePayment = async (
  productIds,
  cost,
  address,
  affiliateKey,
  navigate,
  setIsLoading6
) => {
  setIsLoading6(true);
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.onerror = () => {
    alert("Razorpay SDK failed to load. Are you online?");
  };
  script.onload = async () => {
    try {
      const result = await getOrderID(cost);
      const { amount, id, currency } = result.data.response;


      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: amount.toString(),
        currency: currency,
        name: "Hiloramart",
        description: "Hiloramart is e-commerce Platform",
        order_id: id,
        handler: async function (response) {
          const result = await placeOrder(response, productIds, amount, address, affiliateKey);
          if(result?.status === 200) {
            Store.addNotification({
              ...notification,
              type: "success",
              message: "Order Placed!",
            });
            // navigate("/order-success", {state: result?.data?.uporder});
            navigate("/my-orders", {state: result?.data?.uporder});
          }
          setIsLoading6(false);
          // handleClose();
          // setTimeout(() => {
          //   navigate("/checkout-successfull", {
          //     replace: true,
          //     state: { isSuccess: true },
          //   });
          // }, 2000);
        },
        
        // prefill: {
        //   name: "example name",
        //   email: "email@example.com",
        //   contact: "111111",
        // },
        // notes: {
        //   address: "example address",
        // },
        theme: {
          color: "#ff8d22",          
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      // alert(err);
      setIsLoading6(false);
      Store.addNotification({
        ...notification,
        type: "danger",
        message: "Order Transaction Failed!",
      });

    }
  };
  document.body.appendChild(script);
  setIsLoading6(false);
};


