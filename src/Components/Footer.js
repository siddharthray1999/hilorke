import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FaceBook from "../Assets/Images/FaceBook.png";
import InstaGram from "../Assets/Images/InstaGram.png";
import Twitter from "../Assets/Images/Twitter.png";
import { getAllBlogsReq, getFooterLink1Req, getFooterLink2Req } from "../Context/API";
import "../Styles/Components/Footer.css";

const Footer = () => {

  const [allBlogs, setAllBlogs] = useState([]);
  const [link1, setLink1] = useState([]);
  const [link2, setLink2] = useState([]);
  const navigate = useNavigate();

  const getAllBlogs = async() => {
    try {
      const res = await getAllBlogsReq();
      if(res?.data?.success) {
        setAllBlogs(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getFooterLink1 = async() => {
    try {
      const res = await getFooterLink1Req();
      setLink1(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }
  const getFooterLink2 = async() => {
    try {
      const res = await getFooterLink2Req();
      setLink2(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    getAllBlogs();
    getFooterLink1();
    getFooterLink2();
  }, [])



  return (
    <>
      <div className="footerMain">
        <div className="fMainCon1">
          {link1.length > 0 && (
            <div className="Fcontainer1">
              <div
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/customer-policy`, {
                    state: "col1",
                  })
                }
                className="item"
              >
                Policy
              </div>
              {link1?.map((item) => {
                return (
                  <div
                    style={{ cursor: "pointer" }}
                    key={item?._id}
                    onClick={() =>
                      navigate(`/${item?.title}/${item?._id}`, {
                        state: "col1",
                      })
                    }
                    className="item"
                  >
                    {item.title}
                  </div>
                );
              })}
            </div>
          )}
          {link2.length > 0 && (
            <div className="Fcontainer1">
              {link2?.map((item) => {
                return (
                  <div
                    style={{ cursor: "pointer" }}
                    key={item?._id}
                    onClick={() =>
                      navigate(`/${item?.title}/${item?._id}`, {
                        state: "col2",
                      })
                    }
                    className="item"
                  >
                    {item.title}
                  </div>
                );
              })}
            </div>
          )}

          {allBlogs.length > 0 && (
            <div className="Fcontainer1">
              <div
                onClick={() => navigate("/blogs")}
                style={{ cursor: "pointer" }}
                className="Fhead"
              >
                BLOGS
              </div>
              {/* {allBlogs?.map((item) => {
                return (
                  <div
                    style={{ cursor: "pointer" }}
                    key={item?._id}
                    onClick={() => navigate(`/blog/${item?._id}`)}
                    className="item"
                  >
                    {item.title}
                  </div>
                );
              })} */}
            </div>
          )}

          <div className="Fcontainer1">
            {/* <div className="Fhead">GET IN TOUCH</div> */}
            Corporate Office <br /> <br />
            Loop Techno Systems Pvt. Ltd. <br />
            Nukleus 29, Sector 142, Noida <br />
            Uttar Pradesh, India
            <br /> <br />
            <a href="hilorke.com">hilorke.com</a>
          </div>
        </div>
        <hr id="horizLine" style={{ marginTop: "25px" }} />

        <div className="iconContainer">
          <div id="CopyRtext">© 2022 hilorke.com</div>
          <div className="iconContainer">
            <a href="https://www.instagram.com/hilorke_mart/" target="blank" className="icon">
              <img src={InstaGram} alt="InstaGram" />
            </a>
            <a href="https://twitter.com/hilorke_mart" target="blank" className="icon">
              <img src={Twitter} alt="Twitter" />
            </a>
            <a href="https://www.facebook.com/Hilorke-108945465457427" target="blank" className="icon">
              <img src={FaceBook} alt="FaceBook" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
