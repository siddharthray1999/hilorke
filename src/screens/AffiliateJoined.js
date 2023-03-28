import React from 'react'
import Footer from '../Components/Footer';
import '../Styles/pages/AffiliateJoined.css';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { GET_CUSTOMER_AFFILIATES, LEAVE_AFFILIATE } from '../Context/Types';
import { useState } from 'react';
import CircularLoading from '../ui/CircularLoading/CircularLoading';
import ContainedButton from '../ui/ContainedButton/ContainedButton';


const AffiliateJoined = () => {

  const { dispatch } = useContext(AuthContext);

  const [allAffiliates, setAllAffiliates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);


  const getAffiates = () => {
    dispatch({
      type: GET_CUSTOMER_AFFILIATES,
      setAllAffiliates,
      setIsLoading
    })
  }

  const leaveAffHandler = (id) => {
    dispatch({
      type: LEAVE_AFFILIATE,
      id,
      allAffiliates,
      setAllAffiliates,
      setIsLoading: setIsLoading2
    })
  }


  useEffect(() => {
    getAffiates();
  }, [])



  return (

    <>
    <div className='affContainer'>
        <div className="headingAffContainer">
            <h4>JOINED AFFILIATES</h4>
        </div>

        {
          isLoading ? (
            <div style={{width: '100%', height: '60vh', display: 'grid', placeItems: 'center'}}>
                <CircularLoading color="orange"/>
              </div>
          ) : (
            allAffiliates?.length === 0 ? (
              <div style={{width: '100%', height: '60vh', display: 'grid', placeItems: 'center'}}>
                <p>No Affiliate Joined yet</p>
              </div>
            ) : (
              allAffiliates?.map((aff) => {
                return (
                  <div className='affiliateitemContainer'>
                      <div className='affiliateImgContainer'>
                          <img src={aff?.vendor?.profilePic} alt="profile" />
                      </div>

                      <span className='affname'>{aff?.vendor?.name}</span>
                      <span className='affname'>Joined on {aff?.updatedAt.slice(0,10)}</span>

                      <ContainedButton onClick={()=>leaveAffHandler(aff?._id)}>Leave</ContainedButton>
                  </div>
                )
              })

            )

          )
        }

    </div>

    <Footer />
    </>
  )
}

export default AffiliateJoined