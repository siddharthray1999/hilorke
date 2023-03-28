import React, { useEffect, useState } from "react";
import ProductDetail from "../Components/HomeProductDetail/ProductDetail";
import BroughtTogetherCont from "../Components/HomeProductDetail/BroughtTogetherCont";
import RelatedProducts from "../Components/HomeProductDetail/RelatedProducts";
import MiddleComp from "../Components/HomeProductDetail/MiddleComp";
import Footer from "../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import CustomerReview from "../Components/HomeProductDetail/CustomerReview";
import MessageReview from "../Components/HomeProductDetail/MessageReview";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { GET_CUSTOMER_ADS, GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_BY_SUBCATEGORY, GET_PRODUCT_DETAILS, GET_TOP_PRODUCTS, UPDATE_USER_PROFILE } from "../Context/Types";
import "../Styles/pages/HomeProductDetail.css";
import LandingPageBanner from '../Components/HomeComponents/LandingPageBanner';

const HomeProductDetail = () => {
  const { id } = useParams();
  const { dispatch, state } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDEtails] = useState("");
  const [allAds, setAllAds] = useState([]);
  const [isLoading3, setIsLoading3] = useState(false);
  const [subCatId, setSubCatId] = useState("");
  const [bought, setBought] = useState([])
  const [related, setRelated] = useState([])
  const [isAdult, setIsAdult] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
    dispatch({
      type: GET_PRODUCT_DETAILS,
      payload: id,
      upDateState: setProductDEtails,
      setIsLoading,
      setSubCatId
    });
  }, [id]);

  const getAllAds = () => {
    dispatch({
      type: GET_CUSTOMER_ADS,
      setAllAds,
      setIsLoading: setIsLoading3,
    });
  };

  const getBoughtTogetherProd = () => {
    if(productDetails?.subcategory || productDetails?.subcategory?.length > 0) {
      dispatch({
        type: GET_PRODUCT_BY_SUBCATEGORY,
        catId: productDetails?.subcategory,
        setAllProducts: setBought,
        setIsLoading: setIsLoading3,
      });
    } else {
      dispatch({
        type: GET_PRODUCT_BY_CATEGORY,
        catId: productDetails?.category?._id,
        setAllProducts: setBought,
        setIsLoading: setIsLoading3,
      });
    }
  }

  const getRelatedProduct = () => {
    dispatch({
      type: GET_PRODUCT_BY_CATEGORY,
      catId: productDetails?.category?._id,
      setAllProducts: setRelated,
      setIsLoading: setIsLoading3,
    });
  }

  useEffect(() => {
    getBoughtTogetherProd();
    getRelatedProduct()
  }, [productDetails])

  useEffect(() => {
    window.scroll(0,0);
    getAllAds();
  }, []);
  const isAdultOpened = localStorage.getItem("catAdult2");
  useEffect(() => {
    if(window.location.pathname.includes("HomeProductDetail") && productDetails?.category?.name === "Adult Toy") {
      if((!isAdultOpened || isAdultOpened === null || Number(isAdultOpened) !== 1) && !state?.user?.adultCheck) {
        setIsAdult(true);
      } else {
        setIsAdult(false);
      }
    }
  }, [productDetails])



  const overAgeHandeler = () => {
    localStorage.setItem("catAdult2", "1");
    setIsAdult(false);
    dispatch({
      type: UPDATE_USER_PROFILE,
      data: {
        adultCheck: true,
      },
      setIsLoading2: setIsLoading3
    })
  }


  return (
    <>
        <div>
          <ProductDetail id={id} productDetails={productDetails} />
          <MiddleComp id={id} productDetails={productDetails} />
          <LandingPageBanner isLoading={isLoading3} allAds={allAds}/>
          <BroughtTogetherCont
            allProducts={bought}
            isLoading={isLoading}
          />
          <RelatedProducts allProducts={related} isLoading={isLoading} />
          <CustomerReview productDetails={productDetails} id={id} />
          <MessageReview productDetails={productDetails} />

          {
        isAdult && (
          <div className="isAdultWrapper-backdrop">
            <div className="isAdult-modal">
              <h4>You must be 18+ to view this section</h4>
              <button onClick={overAgeHandeler} className="isAdult-button1">I'm over 18</button>
              <button onClick={() => {setIsAdult(false); navigate(-1)}} className="isAdult-button2">I'm under 18</button>
            </div>
          </div>
        )
      }
          <Footer />
        </div>
    </>
  );
};

export default HomeProductDetail;
