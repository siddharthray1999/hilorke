import React, { useContext, useEffect, useRef, useState } from "react";
import notification_icon from "../Assets/Images/notification.svg";
import "../Styles/Components/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import search_icon from "../Assets/Images/search.svg";
import {
  GET_CUSTOMER_AFFILIATES,
  GET_USER_NOTIFICATION,
  LOGOUT,
} from "../Context/Types";
import logo from "../Assets/Images/hilorke.jpeg";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = () => {
  const { auth, dispatch } = useContext(AuthContext);
  const [isNotifi, setIsNotifi] = useState(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    handleClose()
  }, [])
  const [search, setSearch] = React.useState("");
  const [allAffiliates, setAllAffiliates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [myNotification, setMyNotification] = useState([]);
  const inputRef = useRef();
  const imageRef = useRef();
  const [isSidebarShow, setIsSidebarShow] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

  const handelChange = (e) => {
    setSearch(e.target.value);
  };

  const user_nav_data = [
    {
      id: "001",
      name: "Home",
      navigation: "/",
    },
    {
      id: "002",
      name: "My Wallet",
      navigation: "/my-wallet",
    },
    {
      id: "003",
      name: "My Wishlist",
      navigation: "/my-wishlist",
    },
    {
      id: "004",
      name: "My Cart",
      navigation: "/my-cart",
    },
    {
      id: "005",
      name: "My Orders",
      navigation: "/my-orders",
    },
  ];
  const user_nav_data2 = [
    {
      id: "001",
      name: "Home",
      navigation: "/",
    },
    {
      id: "003",
      name: "My Wishlist",
      navigation: "/my-wishlist",
    },
    {
      id: "004",
      name: "My Cart",
      navigation: "/my-cart",
    },
    {
      id: "005",
      name: "My Orders",
      navigation: "/my-orders",
    },
  ];

  const data = !auth
    ? user_nav_data2
    : allAffiliates?.length > 0
    ? user_nav_data
    : user_nav_data2;

  useEffect(() => {
    if (auth) {
      dispatch({
        type: GET_CUSTOMER_AFFILIATES,
        setAllAffiliates,
        setIsLoading,
      });
      dispatch({
        type: GET_USER_NOTIFICATION,
        setMyNotification,
      });
    }
  }, []);

  const NotificationRow = ({ not }) => {
    return (
      <div className="noti-row">
        <div className="noti-row-details">{not?.message}</div>
        <div className="noti-row-time">{not?.updatedAt.slice(0, 10)}</div>
      </div>
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if(search.length === 0) {
      return;
    }else {
      handleSubmit();
    }
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsNotifi(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleNotification = () => {
    setIsNotifi(!isNotifi);
  };


  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
      navigate,
    });
  };

  const openProfile = () => {
                    setAnchorEl(null)
                    navigate("/userprofile");
  }

  const handleSubmit = () => {
    navigate(`search/${search}`);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if(search.length === 0) {
      return;
    }else {
      setIsSidebarShow(false);
      handleSubmit();
    }
  };

  const handleShowSidebar = (show) => {
    if (show) {
      setIsSidebarShow(true);
    } else {
      setIsSidebarShow(false);
    }
  };

  return (
    <div className="mainBar">
      <div className="mobile-navbar">
        <div
          onClick={() => handleShowSidebar(true)}
          className="burger-icon-container"
        >
          <span className="burger-line1"></span>
          <span className="burger-line2"></span>
          <span className="burger-line3"></span>
        </div>
        <div onClick={() => navigate("/")} className="mobile-logo-container">
          <img src={logo} alt="logo" />
        </div>
      </div>

      {isSidebarShow && (
        <div id="sidebar-mobile" className="mobile-navbar-container">
          <div className="mobile-navbar-left">
            <div className="mobile-left-top">
              <div
                onClick={() => {
                  navigate("/");
                  setIsSidebarShow(false);
                }}
                className="mobile-logo-container"
              >
                <img src={logo} alt="logo" />
              </div>
              <KeyboardArrowLeftIcon
                onClick={() => handleShowSidebar(false)}
                style={{ color: "orange", fontSize: "50px" }}
              />
            </div>
            <div className="mobile-left-middle">
              <form onSubmit={searchHandler} className="mobile-search">
                <input
                  onChange={handelChange}
                  ref={inputRef}
                  placeholder="Search Product..."
                  type="text"
                  name="search"
                  id="search"
                  style={{ paddingLeft: "5px" }}
                />
                <button type="submit" className="search-icon-container">
                  <SearchIcon
                    style={{ color: "orange", backgroundColor: "white" }}
                  />
                </button>
              </form>
              {data?.map((item) => {
                return (
                  <NavLink
                    key={item.id}
                    to={item.navigation}
                    className={({ isActive }) =>
                      (isActive ? "active2" : "inactive") + " linkT"
                    }
                  >
                    <div
                      onClick={() => setIsSidebarShow(false)}
                      className="NavLink"
                    >
                      <span className="nav-text">{item.name}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
            <hr />
            <div className="mobile-left-bottom">
              {auth ? (
                <>
                  <NavLink
                    to="/userprofile"
                    className={({ isActive }) =>
                      (isActive ? "active2" : "inactive") + " linkT"
                    }
                  >
                    <div
                      onClick={() => setIsSidebarShow(false)}
                      style={{ paddingLeft: "1.1rem" }}
                      className="NavLink"
                    >
                      <span className="nav-text">Profile</span>
                    </div>
                  </NavLink>
                  <div
                    onClick={() => {
                      setIsSidebarShow(false);
                      handleLogout();
                    }}
                    style={{ paddingLeft: "1.1rem", cursor: "pointer" }}
                    className="NavLink"
                  >
                    <span className="nav-text">Logout</span>
                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      (isActive ? "active2" : "inactive") + " linkT"
                    }
                  >
                    <div style={{ paddingLeft: "1.1rem" }} className="NavLink">
                      <span className="nav-text">Login</span>
                    </div>
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div
            onClick={() => setIsSidebarShow(false)}
            className="mobile-navbar-right"
          ></div>
        </div>
      )}

      <div className="NavMain">
        <div className="Nav1">
          <NavLink to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <div id="logo" className="log-heading">
              <img src={logo} alt="logo" />
            </div>
          </NavLink>
        </div>
        <form onSubmit={submitHandler} className="search-container-item-cont">
          <label
            htmlFor="search-input"
            className="d-flex align-items-center search-container-item"
          >
            <img src={search_icon} className="search_icon" alt="search-icon" />
            <input
              id="search-input"
              ref={inputRef}
              className="input-search border border-0 search-css"
              type="text"
              placeholder="Search for Products,Brands..."
              aria-label="Search"
              // value={search}
              onChange={handelChange}
            />
            <Button type="submit" style={{ color: "orange" }}>
              Search
            </Button>
          </label>
        </form>
        <div className="Nav2">
          {data.map((item) => {
            return (
              <NavLink
                key={item.id}
                to={item.navigation}
                className={({ isActive }) =>
                  (isActive ? "active1" : "inactive") + " linkT"
                }
              >
                <div className="NavLink">
                  <span className="nav-text">{item.name}</span>
                </div>
              </NavLink>
            );
          })}

          {auth && (
            <div className="linkT  pointer notification-container" tabIndex={1}>
              <img
                ref={wrapperRef}
                className="nav-img not-icon-img"
                src={notification_icon}
                alt="Profile"
                onClick={handleNotification}
              />
              <div
                className="notificaiton-box"
                id="notificaiton-box"
                tabIndex={1}
                style={{ display: isNotifi ? "block" : "none" }}
              >
                <div className="notificaiton-box-title">Notifications</div>
                <div className="notificaiton-box-details">
                  {/* <div className="notificaiton-box-details-title">
                      <div>Today</div>
                      <div>Clear</div>
                    </div> */}
                  <div>
                    {myNotification?.length === 0 ? (
                      <div
                        style={{
                          width: "100%",
                          height: "40%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span>No Notification!</span>
                      </div>
                    ) : (
                      myNotification?.reverse()?.map((not, index) => {
                        return <NotificationRow not={not} key={index} />;
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="linkT NavICon"
          >
            <i className="fa-regular fa-user profile-icon"></i>
          </Button>
          {auth ? (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <>
                <MenuItem
                  onClick={openProfile}
                >
                  Profile
                </MenuItem>

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            </Menu>
          ) : (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
