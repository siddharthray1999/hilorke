import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer';
import { getBlogByIdReq } from '../Context/API';
import CircularLoading from '../ui/CircularLoading/CircularLoading';
import "./BlogScreen.css"

const BlogScreen = () => {
      const id = useParams();
      const [blog, setBlog] = useState([]);
      const [loading, setLoading] = useState(true);
      const ref = useRef();
      const fetchBlogs = async () => {
        try {
          const res = await getBlogByIdReq(id.id);
          setBlog(res.data.data);
          setLoading(false);
          ref.current.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
          console.log("error");
          setLoading(false);
        }
      };
      useEffect(() => {
        fetchBlogs();
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
              <div className="bottom">
                <div className="blog-txt text-center">
                  <h5>{blog?.heading}</h5>
                  <h5>{blog?.createdAt?.slice(0, 10)}</h5>
                </div>
                <div className="blog-img">
                  <img src={blog?.image} alt="cover" />
                </div>

                <div className="blog-txt">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: blog?.content,
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

export default BlogScreen