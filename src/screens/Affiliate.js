import React, { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import "../Styles/pages/AffiliateProgram.css";
import arrow from "../Assets/Images/white-arrow.svg";
import { useLocation, useNavigate } from "react-router-dom";
import ProductsLoading from "../Components/Skeleton-loading/Products-loading";
import ProductContainer2 from "../Components/HomeComponents/ProductContainer2";
import { AuthContext } from "../Context/AuthContext";
import { GET_ALL_PRODUCT_BY_AFF } from "../Context/Types";
const Affiliate = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const owner = location.state;
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scroll(0,0);
    dispatch({
      type: GET_ALL_PRODUCT_BY_AFF,
      id: owner?._id,
      setAllProducts,
      setIsLoading
    })
  }, [dispatch, owner?._id])

  return (
    <div>
      <div className="affliate-cont">
        <div className="vendor-title">{owner?.name}</div>
        <div className="vendor-affiliate-detail">
          <div>
            <p>Total Products</p>
            <p>{owner?.products}</p>
          </div>
          <div
            onClick={() => {
              navigate("/AffiliateProgram", {
                state: {
                  owner,
                },
              });
            }}
          >
            <div>My Affiliate Program</div>
            <div>
              <img src={arrow} className="affiliate-arrow" alt=""/>
            </div>
          </div>
          <div>
            <p>Active affilates</p>
            <p>{owner?.affiliates}</p>
          </div>
        </div>
      </div>
      {/* <Detectors /> */}
      <div className="d-flex mt-3 flex-wrap mx-auto">
          {isLoading ? (
            <>
              <ProductsLoading />
              <ProductsLoading />
              <ProductsLoading />
              <ProductsLoading />
            </>
          ) : allProducts?.length !== 0 ? (
            allProducts?.map((item, index) => {
              return (
                <ProductContainer2 {...item} key={item?._id}/>

              );
            })
          ) : (
            <div style={{width: '100%', height: '90vh', display: 'grid', placeItems: 'center'}}>
              <p>No Product Found!</p>
            </div>
          )}
        </div>
      <Footer />
    </div>
  );
};

export default Affiliate;
