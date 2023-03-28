import React, {lazy, Suspense} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import app from "./firebase/firebase";
import AuthContextComponent from "./Context/AuthContext";
import ProtectedRoutes from "./Context/ProtectedRoutes";
import UnprotectedRoutes from "./Context/UnprotectedRoutes";
import "react-notifications-component/dist/theme.css";
import PageLoader from "./ui/PageLoader/PageLoader";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Blog from "./screens/Blogs";
import FooterLink from "./screens/FooterLink";
import CustomerPolicy from "./screens/CustomerPolicy";

const Login = lazy(() => import("./screens/Login"));
const SignUp = lazy(() => import("./screens/SignUp"))
const ForgotPassword = lazy(() => import("./screens/ForgotPassword"))
const VerifyOtp = lazy(() => import("./screens/VerifyOtp"))
const ForgotForm = lazy(() => import("./screens/ForgotForm"))
const Otp = lazy(() => import("./screens/Otp"))



const Home = lazy(() => import("./screens/Home"))
const MyWallet = lazy(() => import("./screens/MyWallet"))
const MyWishList2 = lazy(() => import("./screens/MyWishList2"))
const Cart2 = lazy(() => import("./screens/Cart2"))
const Orders = lazy(() => import("./screens/MyOrders"))
const UserProfile = lazy(() => import("./screens/UserProfile"))
const AffiliateJoined = lazy(() => import("./screens/AffiliateJoined"))
const EditUserProfile = lazy(() => import("./screens/EditUserProfile"))
const HomeProductDetail = lazy(() => import("./screens/HomeProductDetail"))
const SearchProduct = lazy(() => import("./screens/SearchedProduct"))
const Affiliate = lazy(() => import("./screens/Affiliate"))
const AffiliateProgram = lazy(() => import("./screens/AffiliateProgram"))
const SuccessPage = lazy(() => import("./screens/SuccessPage"))
const RefundPage = lazy(() => import("./screens/RefundPage"));
const ShippingPolicy = lazy(() => import("./screens/ShippingPolicy"));
const TermsAndCondition = lazy(() => import("./screens/TermsAndCondition"));
const TermOfUse = lazy(() => import("./screens/TermOfUse"));
const TrackOrder = lazy(() => import("./screens/TrackOrder"))
const BlogScreen = lazy(() => import("./screens/BlogScreen"))




function App() {

  const user = Cookies.get("auth_token");
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      const decodedJwt = parseJwt(user);
      if (decodedJwt.exp * 1000 < Date.now()) {
        
      }
    }
  }, [])


  return (
    <>
      <AuthContextComponent>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<UnprotectedRoutes />}>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route
                  path="/forgotpassword"
                  element={<ForgotPassword />}
                ></Route>
                <Route path="/verifyotp" element={<VerifyOtp />}></Route>
                <Route path="/passwordchange" element={<ForgotForm />}></Route>
                <Route path="/otp" element={<Otp />}></Route>
                <Route path="*" element={<Home />}></Route>
              </Route>

              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/my-wallet" element={<MyWallet />}></Route>
                <Route path="/my-wishlist" element={<MyWishList2 />}></Route>
                <Route path="/my-cart" element={<Cart2 />}></Route>
                <Route path="/my-orders" element={<Orders />}></Route>
                <Route
                  path="/joined-affiliates"
                  element={<AffiliateJoined />}
                ></Route>
                <Route path="/userprofile" element={<UserProfile />}></Route>
                <Route
                  path="/edit-user-profile"
                  element={<EditUserProfile />}
                ></Route>
                <Route path="/search/:name" element={<SearchProduct />}></Route>
                <Route
                  path="/HomeProductDetail/:id"
                  element={<HomeProductDetail />}
                ></Route>
                <Route path="/affiliate" element={<Affiliate />}></Route>
                <Route
                  path="/AffiliateProgram"
                  element={<AffiliateProgram />}
                ></Route>
                <Route path="/order-success" element={<SuccessPage />}></Route>
                <Route
                  exact
                  path="/customer-policy"
                  element={<CustomerPolicy />}
                ></Route>
                {/* <Route
                  exact
                  path="/refund-and-cancellation-policy"
                  element={<RefundPage />}
                ></Route>
                <Route
                  exact
                  path="/shipping-policy"
                  element={<ShippingPolicy />}
                ></Route>
                <Route
                  exact
                  path="/terms-and-condition"
                  element={<TermsAndCondition />}
                ></Route>
                <Route
                  exact
                  path="/terms-of-use"
                  element={<TermOfUse />}
                ></Route> */}
                <Route exact path="/:name/:id" element={<FooterLink />}></Route>
                <Route exact path="/blog/:id" element={<BlogScreen />}></Route>
                <Route exact path="/blogs" element={<Blog />}></Route>

                <Route
                  path="/track-order/:orderId"
                  element={<TrackOrder />}
                ></Route>
                <Route path="*" element={<Home />}></Route>
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AuthContextComponent>
    </>
  );
}

export default App;
