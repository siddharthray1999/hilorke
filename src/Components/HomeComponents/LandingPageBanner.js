import React from "react";
import "../../Styles/Components/LandingPageBanner.css";
import { useNavigate } from "react-router-dom";
import BannerLoading from "../Skeleton-loading/Banner";
import Carousel from 'react-material-ui-carousel'

const ImageGallaryComponent = ({ isLoading, allAds }) => {
  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        <BannerLoading />
      ) : (
        <Carousel
          cycleNavigation
        >
        {allAds?.map((ads, index) => {
                return (
                  <div
                    style={{ cursor: "pointer", backgroundColor: "#02B796", width: '100%'}}
                    onClick={() => navigate(`/HomeProductDetail/${ads?._id}`)}
                    key={index}
                  >
                    <div id="banner-container" className="white-border-new">
                      <div id="LPmainCont">
                        <div id="LPtextCont" style={{ color: "white" }}>
                          <h1 id="LPtext1">{ads?.category?.name}</h1>
                          <div id="LPtext2">
                            {/* <h4 className="banner-top-heading" >MAN</h4> */}
                            <h2 className="banner-middle-heading">
                              {ads?.name}
                            </h2>
                            {
                              ads?.variants?.length > 0 ? (
                                <h3 className="banner-low-heading">
                                  ₹ {ads?.variants[0]?.price}
                                </h3>

                              ) : (
                                <h3 className="banner-low-heading">
                                  ₹ {ads?.price}
                                </h3>

                              )
                            }
                          </div>
                          <h2 id="LPtext3" title={ads?.description}>
                            {ads?.description.slice(0, 100)}
                          </h2>
                        </div>
                        <div className="banner-img-section">
                          <img
                            src={ads?.productImage[0]}
                            alt="img"
                            className="banner-img"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </Carousel>
      )}
    </>
  );
};

export default ImageGallaryComponent;


