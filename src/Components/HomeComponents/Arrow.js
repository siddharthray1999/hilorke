import React from 'react';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import '../../Styles/Components/Arrow.css';

const Arrow = ({isDisabledArrowRight, isDisabledArrowLeft, handleBackward, handleForward}) => {
  return (
    <div className="d-flex my-arrow">
    <div className={`scroll-arrow me-4 ${isDisabledArrowLeft && "arrow-disabled"}`}>
      <ArrowBackIosNewIcon style={{color: isDisabledArrowLeft && "#ff8d2249"}} onClick={handleBackward} />
    </div>
    <div className={`scroll-arrow ${isDisabledArrowRight && "arrow-disabled"}`}>
      <ArrowForwardIosIcon style={{color: isDisabledArrowRight && "#ff8d2249"}} onClick={handleForward} />
    </div>
  </div>
  )
}

export default Arrow;
