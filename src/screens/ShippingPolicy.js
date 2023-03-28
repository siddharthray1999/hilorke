import React from 'react'
import Footer from '../Components/Footer';
import logo from "../Assets/Images/hiloralogo.jpeg";
import '../Styles/pages/ShippingPolicy.css'
import { useEffect } from 'react';

const ShippingPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
  return (
    <>
    <div className="shipping--container">
        <div className="shipping--container__heading">
          <div className="shipping__imgContainer">
            <img src={logo} alt="" />
          </div>
          <h4>Shipping Policy</h4>
        </div>

        <div>
            <h5><span>Q1. </span>When will I receive my first shipment?</h5>
            <p><span>Answer:</span> Between 7-21 working days depending on the product and delivery option selected.</p>
        </div>
        <div>
            <h5><span>Q2. </span>Does Hilora ship internationally?</h5>
            <p><span>Answer:</span> coming soon</p>
        </div>
        <div>
            <h5><span>Q3. </span>How much shipping do I have to pay?</h5>
            <p><span>Answer:</span> It varies from product to product and offer. Please check the individual product page for details on shipping cost. It varies from free to flat to variable cost.</p>
        </div>
        <div>
            <h5><span>Q4. </span>Do you offer same day, next day or express delivery options?</h5>
            <p><span>Answer:</span> Yes, we do.</p>
        </div>
      </div>
        <Footer />
    </>
  )
}

export default ShippingPolicy