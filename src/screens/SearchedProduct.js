import React, { useContext, useEffect, useState } from "react";
import "../Styles/Components/MyProduct.css";
import Footer from "../Components/Footer";
import { AuthContext } from "../Context/AuthContext";
import { SEARCG_PRODUCT } from "../Context/Types";
import ProductsLoading from "../Components/Skeleton-loading/Products-loading";
import { useParams } from "react-router-dom";
import ProductContainer2 from "../Components/HomeComponents/ProductContainer2";

const VmyProduct = () => {
  const { dispatch } = useContext(AuthContext);
  let { name } = useParams();

  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scroll(0,0);
    setIsLoading(true);
    dispatch({
      type: SEARCG_PRODUCT,
      name: name,
      catId: "",
      upDateState: setAllProducts,
      setIsLoading,
    });
  }, [name]);

  return (
    <>
      <div style={{ margin: "2% 1%" }}>
        <div className="d-flex mt-3 align-items-center justify-content-center flex-wrap mx-auto">
          {isLoading ? (
            <>
              <ProductsLoading />
              <ProductsLoading />
              <ProductsLoading />
              <ProductsLoading />
            </>
          ) : allProducts?.length !== 0 ? (
            allProducts?.map((item, index) => {
              return (
                <ProductContainer2 {...item} key={item?._id}/>

              );
            })
          ) : (
            <div style={{width: '100%', height: '90vh', display: 'grid', placeItems: 'center'}}>
              <p>No Product Found!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VmyProduct;
