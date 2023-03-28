import React from "react";
import "../../Styles/pages/Cart2.css";
import "../../Styles/Components/skeleton.css";

function BannerLoading() {
  return (
    <div className="CPCmain22" style={{ width: '100%', height: "400px", display: 'flex', justifyContent: 'space-between' }}>
      <div className="skeleton skeleton-body" style={{height: '100%', width: '100vw'}}>
      </div>
    </div>
  );
}

export default BannerLoading;
