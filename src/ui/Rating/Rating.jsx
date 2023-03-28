import React from 'react';
import { Rating } from "react-simple-star-rating";

const StarRating = ({rating}) => {
  return (
    <Rating readonly={true} initialValue={rating} size={20} />
  )
}

export default StarRating;