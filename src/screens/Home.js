import React, { useContext, useEffect, useState } from "react";
import LandingPageBanner from "../Components/HomeComponents/LandingPageBanner";
import Footer from "../Components/Footer";
import CategorySection from "../Components/CategorySection";
import "./Home.css";
import { AuthContext } from "../Context/AuthContext";
import { GET_CUSTOMER_ADS } from "../Context/Types";

const Home = () => {
  const { dispatch, state } = useContext(AuthContext);
  const [allAds, setAllAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllAds = () => {
    dispatch({
      type: GET_CUSTOMER_ADS,
      setAllAds,
      setIsLoading,
    });
  };

  useEffect(() => {
    window.scroll(0,0);
    getAllAds();

  }, []);



  return (
    <>
      <div className="home-container">
        <LandingPageBanner isLoading={isLoading} allAds={allAds}/>
        <CategorySection />
        <Footer />
      </div>
    </>
  );
};

export default Home;
