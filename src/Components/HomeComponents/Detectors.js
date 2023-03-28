import React, { useContext, useEffect, useRef, useState } from "react";
import ProductContainer2 from "./ProductContainer2";
import "../../Styles/Components/MostSellingProductContainer.css";
import { AuthContext } from "../../Context/AuthContext";
import {
  GET_ALL_CATEGORY,
  GET_ALL_PRODUCTS,
} from "../../Context/Types";
import ProductContainerSkeleton from "../Skeleton-loading/prductConatiner.skeleton";
import CircularLoading from "../../ui/CircularLoading/CircularLoading";

const Detectors = ({
  id,
  subCategory,
  subData,
  productsByCat,
  isLoading2,
}) => {
  const { dispatch } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState([]);

  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const carousalRef = useRef();
  useEffect(() => {
    dispatch({ type: GET_ALL_PRODUCTS, upDateState: setAllProducts });
  }, []);

  const handleBackward = (name) => {
    document.getElementById(name).scrollLeft -= 300;
  };
  const handleForward = (name) => {
    document.getElementById(name).scrollLeft += 300;
  };
  useEffect(() => {
    dispatch({
      type: GET_ALL_CATEGORY,
      upDateState: setAllCategory,
      setIsLoading,
    });

  }, []);

  useEffect(() => {

  },[])

  return (
    <>
      {isLoading ? (
        <div className="category-container2">
        <CircularLoading color="orange"/>
        </div>
      ) : (
        <>
          {id === "all" ? (
            allCategory?.map((cat, index) => (
              <div key={index}>
                {
                  cat?.isView && (
                    <div key={index} className="MSPmainContainer3">
                      <div className="MSPCont2">
                        <div className="arrow-scroll-cont d-flex justify-content-between">
                          <div className="MSPcontiner1">{cat?.name}</div>
                          
                          <div className="scroll-action-container">
                            <div className="scroll-action">
                              <div id="scroll-action-left1" onClick={()=>handleBackward(cat?.name || "alls")} className="scroll-action-left">{"<"}</div>
                              <div id="scroll-action-right1" onClick={()=>handleForward(cat?.name || "alls")} className="scroll-action-right">{">"}</div>
                            </div>
                          </div>
                        </div>
                          <div
                            id={cat?.name || "alls"}
                            className="row-container"
                            ref={carousalRef}
                          >
                            {allProducts ? (
                          
                              allProducts.map((item) => {
                                if (item?.category?._id === cat?._id) 
                                  return (
                                    <ProductContainer2 {...item} key={item?._id} />
                                  );
                              })
                            ) : (
                              <div className="d-flex gap-5">
                                <ProductContainerSkeleton />
                                <ProductContainerSkeleton />
                                <ProductContainerSkeleton />
                                <ProductContainerSkeleton />
                              </div>
                            )}
                          </div>
                        </div>
                    </div>
                  )
                }
              </div>
            ))
          ) : (
            <>
              <div className="MSPCont2">
                <div className="arrow-scroll-cont d-flex justify-content-between">
                  <div className="MSPcontiner1">All</div>
                  <div className="scroll-action-container">
                    <div className="scroll-action">
                      <div id="scroll-action-left1" onClick={handleBackward} className="scroll-action-left">{"<"}</div>
                      <div id="scroll-action-right1" onClick={handleForward} className="scroll-action-right">{">"}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    style={{ width: "100%" }}
                    id="all"
                    className="row-container"
                    ref={carousalRef}
                  >
                    {isLoading2 ? (
                      <div className="d-flex gap-5">
                        <ProductContainerSkeleton />
                        <ProductContainerSkeleton />
                        <ProductContainerSkeleton />
                        <ProductContainerSkeleton />
                      </div>
                    ) : productsByCat?.length > 0 ? (
                      productsByCat.map((item) => {
                        return <ProductContainer2 {...item} key={item?._id} />;
                      })
                    ) : (
                      <div className="d-flex gap-5">
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {subCategory?.map((cat, index) => (
                <div key={index} className="MSPmainContainer mx-3">
                  <div className="MSPCont2">
                    <div className="arrow-scroll-cont d-flex justify-content-between">
                      <div
                        className="MSPcontiner1"
                        style={{ fontWeight: "300" }}
                      >
                        {cat?.name}
                      </div>
                      <div className="scroll-action-container">
                        <div className="scroll-action">
                          <div id="scroll-action-left1" onClick={handleBackward} className="scroll-action-left">{"<"}</div>
                          <div id="scroll-action-right1" onClick={handleForward} className="scroll-action-right">{">"}</div>
                        </div>
                      </div>
                    </div>
                      <div
                        style={{ width: "100%" }}
                        id={cat?.name}
                        className="row-container"
                        ref={carousalRef}
                      >
                        {subData ? (
                          // eslint-disable-next-line array-callback-return
                          subData.map((item) => {
                            if (item?.subcategory?._id === cat?._id)
                              return (
                                <ProductContainer2 {...item} key={item?._id} />
                              );
                          })
                        ) : (
                          <div className="d-flex gap-5">
                            <ProductContainerSkeleton />
                            <ProductContainerSkeleton />
                            <ProductContainerSkeleton />
                            <ProductContainerSkeleton />
                          </div>
                        )}
                      </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Detectors;
