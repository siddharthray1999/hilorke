import React, { useContext, useEffect } from "react";
import "../Styles/Components/MyProduct.css";
import Footer from "../Components/Footer";
import { AuthContext } from "../Context/AuthContext";
import price from "../Assets/Images/wallet.png";
import {
  GET_WALLET_DETAILS,
} from "../Context/Types";
import { useState } from "react";
import CircularLoading from "../ui/CircularLoading/CircularLoading";


const VmyWallet = () => {
  const { dispatch } = useContext(AuthContext);
  const [walletData, setWalletData] = useState({});
  const [isLoading2, setIsLoading2] = useState(false);


  useEffect(() => {
    window.scroll(0,0);
    dispatch({
      type: GET_WALLET_DETAILS,
      setWalletData,
      setIsLoading: setIsLoading2
    });
  }, []);
  


  return (
    <>
      {
        isLoading2 ? (
          <div style={{width: '100%', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularLoading color="orange"/>
          </div>
        ) : (
          <div className="w-93 mb-4 min-vh-100 mx-4" style={{ border: "none" }}>
        <div className="Profit-card mt-4 mb-4">
          <div className="d-flex justify-content-between w-100">
            <div className="wallet-image-container">
            <img style={{marginLeft: 0}} className="pricecard-img" src={price} alt=""/>
            </div>
            <div className="mx-4 d-flex align-items-center justify-content-center flex-column">
              <h3>Total Profit</h3>
              <h3>{walletData?.totalProfit ? "₹ " + walletData?.totalProfit : "₹ 0"}</h3>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <h5>From Your Affiliates</h5>
        </div>
        {
          walletData?.details?.map((item) => {
            return (
              <div class="row mt-4 d-flex justify-content-between px-4">
                <h5 className="col-md-4 col-4" style={{fontSize: '15px'}}>{item?.vendor?.name}</h5>

                <h5 className="col-md-4 col-4 alignC" style={{fontSize: '15px'}}>Total Profit: ₹ {item?.profit ? item?.profit : "0"}</h5>
              </div>
            )
          })
        }
      </div>
        )
      }

      <Footer />
    </>
  );
};

export default VmyWallet;
