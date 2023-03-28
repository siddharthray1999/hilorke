import React from "react";
import ProductContainer2 from "../HomeComponents/ProductContainer2";
import ProductContainerSkeleton from "../Skeleton-loading/prductConatiner.skeleton";
import '../../Styles/Components/MostSellingProductContainer.css'

const RelatedProducts = ({ allProducts, isLoading }) => {
  const handleLeft = () => {

    document.getElementById("bought-together-slide2").scrollLeft -= 300;

  }

  const handleRight = () => {
    document.getElementById("bought-together-slide2").scrollLeft += 300;
  }

  return (
    <>
      <div className="MSPmainContainer">
        <div style={{textAlign: 'center', width: '100%'}} className="MSPcontiner1">Related Products</div>
        <div style={{width: '100%'}} className="scroll-action-container">
          <div className="scroll-action">
            <div id="scroll-action-left1" onClick={handleLeft} className="scroll-action-left">{"<"}</div>
            <div id="scroll-action-right1" onClick={handleRight} className="scroll-action-right">{">"}</div>
          </div>
        </div>
        <div>
          <div id="bought-together-slide2" className="card-list">
            {!isLoading ? (
              allProducts?.map((item) => {
                return <ProductContainer2 {...item} key={item?._id} />;
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
    </>
  );
};

export default RelatedProducts;
