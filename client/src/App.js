import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "./pages/Category";
import PaymentPage from "./pages/PaymentPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import AboutUs from "./pages/AboutUs";
import ContectUs from "./pages/ContectUs";
import TrackOrder from "./pages/TrackOrder";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import Blog from "./pages/Blog";
import Product from "./pages/Product";
import Account from "./pages/Account";
import Accountinfo from "./pages/Accountinfo";
import Transaction from "./pages/Transaction";
import Return from "./pages/Return";
import { useDispatch, useSelector } from "react-redux";
import { getloginuser } from "./https/axios";
import { setLogIn, setUser } from "./redux/Slice/userSlice";
import { useEffect, useState } from "react";
import loders from "./images/833.gif";
import NotFound from "./pages/NotFound";
import ReturnPage from "./pages/ReturnPage";
import Thankyoupage from "./pages/Thankyoupage";
import Addtocartbt from "./components/Addtocartbt";
import Singleproduct from "./components/Product/Singleproduct";
import Replace from "./components/Product/Replace";
import Otpverify from "./pages/Otpverify";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { isLoggedIn } = useSelector((state) => state.userinfo);
  const { user } = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const userdata = await getloginuser();
      if (userdata) {
        if (userdata?.data?.User?.token === undefined) {
          dispatch(setLogIn(false));
        } else {
          dispatch(setUser(userdata.data));
          dispatch(setLogIn(true));
        }
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <p className="flex text-[0.7rem] justify-center items-center h-[1.6rem]">
        COD | Use Code - Flat20 | On Your Purchase.
      </p>
      <div className="bg-white rounded-[1.2rem] pt-0 p-primary ">
        <Router>
          <ScrollToTop />
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/verify" element={<Otpverify />}></Route>
            <Route exact path="/products/:category/:subcategory/:id" element={<Category />}></Route>
            <Route exact path="/payment/:action" element={<PaymentPage />}></Route>
            <Route exact path="/product/:productname/:id" element={<Singleproduct />}></Route>
            <Route
              exact
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            ></Route>
            <Route
              exact
              path="/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            ></Route>
            <Route
              exact
              path="/wishlist"
              element={
                <PrivateRoute>
                  <Wishlist />
                </PrivateRoute>
              }
            ></Route>
            <Route exact path="/aboutus" element={<AboutUs />}></Route>
            <Route exact path="/contectus" element={<ContectUs />}></Route>
            <Route
              exact
              path="/trackorder"
              element={
                <PrivateRoute>
                  <TrackOrder />
                </PrivateRoute>
              }
            ></Route>
            <Route exact path="/allproduct" element={<Product />}></Route>
            <Route exact path="/resetpassword" element={<ResetPassword />}></Route>
            <Route exact path="/checkout/cart" element={<Addtocartbt />}></Route>
            <Route exact path="/changepassword" element={<ChangePassword />}></Route>
            <Route exact path="/bloginfo" element={<Blog />}></Route>
            <Route
              exact
              path="/account"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            ></Route>
            <Route
              exact
              path="/accountinfo"
              element={
                <PrivateRoute>
                  <Accountinfo />
                </PrivateRoute>
              }
            ></Route>
            <Route
              exact
              path="/transaction"
              element={
                <PrivateRoute>
                  <Transaction />
                </PrivateRoute>
              }
            ></Route>
            <Route
              exact
              path="/return"
              element={
                <PrivateRoute>
                  <Return />
                </PrivateRoute>
              }
            ></Route>
            <Route exact path="/returnpolicy" element={<ReturnPage />}></Route>
            <Route exact path="*" element={<NotFound />}></Route>
            <Route exact path="/thankyou" element={<Thankyoupage />}></Route>
            {/* <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/products/:category/:subcategory/:id' element={<Category />}></Route>
        <Route exact path='/payment' element={<PrivateRoute><PaymentPage /></PrivateRoute>}></Route>
        <Route exact path='/product/:productname/:id' element={<Singleproduct />}></Route>
        <Route exact path='/login' element={<AuthRoute><Login /></AuthRoute>}></Route>
        <Route exact path='/register' element={<AuthRoute><Register /></AuthRoute>}></Route>
        <Route exact path='/wishlist' element={<PrivateRoute><Wishlist /></PrivateRoute>}></Route>
        <Route exact path='/aboutus' element={<AboutUs />}></Route>
        <Route exact path='/contectus' element={<ContectUs />}></Route>
        <Route exact path='/trackorder' element={<PrivateRoute><TrackOrder /></PrivateRoute>}></Route>
        <Route exact path='/allproduct' element={<Product />}></Route>
        <Route exact path='/resetpassword' element={<ResetPassword />}></Route>
        <Route exact path='/checkout/cart' element={<PrivateRoute>< Addtocartbt /></PrivateRoute>}></Route>
        <Route exact path='/changepassword' element={<ChangePassword />}></Route>
        <Route exact path='/bloginfo' element={<Blog />}></Route>
        <Route exact path='/account' element={<PrivateRoute><Account /></PrivateRoute>}></Route>
        <Route exact path='/accountinfo' element={<PrivateRoute><Accountinfo /></PrivateRoute>}></Route>
        <Route exact path='/transaction' element={<PrivateRoute><Transaction /></PrivateRoute>}></Route>
        <Route exact path='/return' element={<PrivateRoute><Return /></PrivateRoute>}></Route>
        <Route exact path='/returnpolicy' element={<ReturnPage />}></Route>
        <Route exact path='*' element={<NotFound />}></Route>
        {/* <Route exact path='/thankyou' element={<Thankyoupage />}></Route> */}
          </Routes>
        </Router>
      </div>
    </>
  );
}

const PrivateRoute = ({ children }) => {
  const [fetchData, setFetchData] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.userinfo);
  let location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      setFetchData(true);
    }, 500);
  }, []);
  if (fetchData) {
    if (isLoggedIn === true) {
      return children;
    }
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  } else {
    return (
      <>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <img src={loders} className="h-25" alt={"loader"} />
          </div>
        </div>
      </>
    );
  }
};
const AuthRoute = ({ children }) => {
  const [fetchData, setFetchData] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.userinfo);

  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      setFetchData(true);
    }, 500);
  }, []);
  if (fetchData) {
    if (isLoggedIn !== true) {
      return children;
    }
    return <Navigate to={{ pathname: "/", state: { from: location } }} />;
  } else {
    return (
      <>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <img src={loders} className="h-25" alt={"loader"} />
          </div>
        </div>
      </>
    );
  }
};
export default App;
