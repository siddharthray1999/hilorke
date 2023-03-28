import React, { useContext, useEffect, useState } from "react";
import Img from "../Assets/Images/NoPath.png";
import "../Styles/pages/UserProfile.css";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GET_USER_PROFILE2, LOGOUT } from "../Context/Types";
import ProfileSkeleton from "../Components/Skeleton-loading/Profile.skeleton";
import noProf from '../Assets/Images/noprof.png';

const VProfile = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    window.scroll(0,0);
    dispatch({ type: GET_USER_PROFILE2, setProfileData, setIsLoading });
  }, []);


  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
      navigate,
    });
  };

  return !profileData ? (
    <ProfileSkeleton />
  ) : (
    <div className="profile-container">
      <div className="top-image-container">
        <img src={Img} alt="imag" className="top-image" />
      </div>
      <div className="mainCont1 d-flex justify-content-between">
        <div className="detail-container ps-5 pt-5 mt-2 w-75">
          <div className="">
            <div>
              <div className="details">
                <p className="details-first">Name</p>
                <p className="details-second">{profileData?.name}</p>
              </div>
              <div className="details">
                <p className="details-first">Number</p>
                <p className="details-second">{profileData?.number || profileData?.mobile}</p>
              </div>
              <div className="details">
                <p className="details-first">Email</p>
                <p className="details-second">{profileData?.email}</p>
              </div>
              <div className="details">
                <p className="details-first"> location</p>
                <p className="details-second">{profileData?.address[0]?.line1} </p>
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => navigate("/joined-affiliates")} className="details">
                <p className="details-first">Joined Affiliates</p>
                <p className="details-second" style={{ color: 'orange' }}>{">"}</p>
              </div>
            </div>
          </div>
          <div className="logout-cont">
            <button className="btn-profile1" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="img1">
          <img src={profileData?.profile_pic?.length > 0 || profileData?.profile_pic ? profileData?.profile_pic : noProf} alt="/" />
          <div style={{ textAlign: "center" }}>
            <p >
              Hello 
              <br />
              {profileData.name}
            </p>
            <button onClick={() => navigate("/edit-user-profile", { replace: true })}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VProfile;
