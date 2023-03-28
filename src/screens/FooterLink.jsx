import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../Components/Footer';
import { getLink2ByIdReq, getLinkByIdReq } from '../Context/API';
import CircularLoading from '../ui/CircularLoading/CircularLoading';

const FooterLink = () => {
     const {id, name} = useParams();
     const {state} = useLocation();
     console.log(state);
     const [link, setLink] = useState([]);
     const [loading, setLoading] = useState(true);
     const ref = useRef();
     const fetchLink = async () => {
       try {
         const res = await getLinkByIdReq(id);
         setLink(res.data.data);
         setLoading(false);
         ref.current.scrollIntoView({ behavior: "smooth" });
       } catch (error) {
         console.log("error");
         setLoading(false);
       }
     };
     const fetchLink2 = async () => {
       try {
         const res = await getLink2ByIdReq(id);
         setLink(res.data.data);
         setLoading(false);
         ref.current.scrollIntoView({ behavior: "smooth" });
       } catch (error) {
         console.log("error");
         setLoading(false);
       }
     };
     useEffect(() => {
        if(state === "col1") {
            fetchLink();

        } else {
            fetchLink2();
        }
     }, [id?.id]);
     return (
       <>
         <div className="adminSettingContainer">
           <div className="adminSettingWrapper">
             {!loading ? (
               <div className="container" ref={ref}>
                 <div className="top d-flex justify-content-between">
                   <div className="heading"></div>
                   <div></div>
                 </div>
                 <div className="bottom w-100">
                   <div className="blog-txt text-center d-flex align-items-center justify-content-center my-5">
                     <img style={{width: '40px', height: '40px', borderRadius:'50%', marginRight: '10px'}} src={link?.image} alt="" />
                     <h5>{link?.heading}</h5>
                   </div>

                   <div className="blog-txt">
                     <p
                       dangerouslySetInnerHTML={{
                         __html: link?.content,
                       }}
                     />
                   </div>
                 </div>
               </div>
             ) : (
               <CircularLoading color="orange" />
             )}
           </div>
         </div>
         <Footer />
       </>
     );
}

export default FooterLink