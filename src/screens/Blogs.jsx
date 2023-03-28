import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularLoading from "../ui/CircularLoading/CircularLoading";
import Footer from "../Components/Footer";
import { getAllBlogsReq1 } from "../Context/API";
import "./Blogs.css"
function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setcurrPage] = useState(1);
  const [postPerPage] = useState(2);
  const [size, setsize] = useState(0);

  // const indexOfLastPost = currPage * postPerPage ;
  // const indexOfFirstPost = indexOfLastPost - postPerPage ;
  // const currenPosts = blogs.slice(indexOfFirstPost,indexOfLastPost)

  const paginate = (pageNumber) => {
    setcurrPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(size.length / postPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(currPage);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await getAllBlogsReq1();
        setBlogs(res?.data?.data)
        setLoading(false);
      } catch (error) {
        console.log("error");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currPage]);

  return (
    <>
          {!loading ? (
            <div className="blog-container_wrapper">
              <div className="blogTOp d-flex justify-content-between">
                <div className="heading">All Blogs</div>
              </div>

              <div className="bottom">
                {blogs.map((data, id) => {
                  return (
                    <div key={id} className="row blog-container2">
                      <div className="col-lg-4 col-12">
                        <div className="blog-img2">
                          <img src={data.image} alt="cover" />
                        </div>
                      </div>

                      <div className="col blog-txt2">
                        <h5>
                          {data.heading} {data.createdAt.slice(0, 10)}
                        </h5>
                        <h3>{data.title}</h3>
                        <p>{data.description?.slice(0, 190)}...</p>
                        <span
                          onClick={() =>
                            navigate(
                              `/blog/${data?._id}`
                            )
                          }
                        >
                          READ MORE
                        </span>
                      </div>
                      {/* <div
                    dangerouslySetInnerHTML={{
                      __html: data.content,
                    }}
                  /> */}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <CircularLoading color="orange"/>
          )}
      <Footer />
    </>
  );
}

export default Blog;
