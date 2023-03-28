import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  GET_ALL_CATEGORY,
  GET_PRODUCT_BY_CATEGORY,
  GET_SUBCATEGORY,
  GET_SUB_PRODUCTS,
  UPDATE_USER_PROFILE,
} from "../Context/Types";
import "../Styles/Components/CategorySection.css";
import Detectors from "./HomeComponents/Detectors";
import AllIcon from "../Assets/Images/AllIcon-New.png";
import CircularLoading from "../ui/CircularLoading/CircularLoading";
import noImage from '../Assets/Images/no-image.png';

function CategorySection() {
  const { dispatch, state } = useContext(AuthContext);
  const [allCategory, setAllCategory] = useState();
  const [subCategory, SetSubCategory] = useState();
  const [subCategoryData, SetSubCategoryData] = useState();
  const [productId, setProductId] = useState("all");
  const [selectedCat, setSelectedCat] = useState("all");
  const [selectedCat2, setSelectedCat2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [productsByCat, setProductsByCat] = useState([]);
  const [isAdult, setIsAdult] = useState(false);
  useEffect(() => {
    dispatch({
      type: GET_ALL_CATEGORY,
      upDateState: setAllCategory,
      setIsLoading,
    });
  }, []);

  const isAdultOpened = localStorage.getItem("catAdult2");
  const handleClick = (name, id) => {
    setProductId(name);
    if(name === "Adult Toy") {
      if((Number(isAdultOpened) !== 1 && isAdultOpened === null) && !state?.user?.adultCheck) {
        setIsAdult(true);
      } else {
        setIsAdult(false);
      }
    }else {
      setIsAdult(false);
    }
    
    if (name === "all") {
      setSelectedCat("all");
      setSelectedCat2(name);
    } else {
      setSelectedCat("");
      setSelectedCat2(name);
      dispatch({
        type: GET_PRODUCT_BY_CATEGORY,
        catId: id,
        setAllProducts: setProductsByCat,
        setIsLoading: setIsLoading2,
      });
      dispatch({ type: GET_SUBCATEGORY, id: id, upDateState: SetSubCategory });
      id &&
        dispatch({
          type: GET_SUB_PRODUCTS,
          id: id,
          upDateState: SetSubCategoryData,
        });
    }
  };

  const overAgeHandeler = () => {
    setSelectedCat("");
    setSelectedCat2("Adult Toy");
    setIsAdult(false);
    localStorage.setItem("catAdult", "1");
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

      <div className="cat-cont">
        {isLoading ? (
          <div className="category-container1">
            <CircularLoading color="orange"/>
          </div>
        ) : (
          <>
            <div
              className={`cat-li-cont ${
                selectedCat === "all" && "selected-cat"
              }`}
              onClick={() => handleClick("all")}
            >
              <div className="img-category-section-all">
                <img
                  src={AllIcon}
                  className="cat-image img-category"
                  alt="all-cat"
                />
              </div>
              <div className="category-text">All</div>
            </div>
            {allCategory?.map((item, index) => {
              return (
                <div key={index}>
                {
                  item?.isView && (
                      <div
                        className={`cat-li-cont ${
                          selectedCat2 === item?.name && "selected-cat"
                        }`}
                        onClick={() => handleClick(item?.name, item?._id)}

                      >
                        <div className="img-category-section">
                          <img src={item?.image?.length === 0 ? noImage : item?.image} className="cat-image img-category" alt="category" />
                        </div>
                        <div className="category-text">{item?.name}</div>
                      </div>
                  )
                }
                </div>
              );
            })}
          </>
        )}
      </div>
      <Detectors
        id={productId}
        subCategory={subCategory}
        subData={subCategoryData}
        productsByCat={productsByCat}
        isLoading2={isLoading2}
      />

      {
        isAdult && (
          <div className="isAdultWrapper-backdrop">
            <div className="isAdult-modal">
              <h4>You must be 18+ to view this section</h4>
              <button onClick={overAgeHandeler} className="isAdult-button1">I'm over 18</button>
              <button onClick={() => {setSelectedCat("all"); setSelectedCat2("all"); setProductId("all"); setIsAdult(false)}} className="isAdult-button2">I'm under 18</button>
            </div>
          </div>
        )
      }
    </>
  );
}

export default CategorySection;
