// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Categorynav from "./Categorynav";
// import { GetCart, getdiscountcoupen, getloginuser, loginuser, Logout } from "../https/axios";
// import Addtocartbt from "./Addtocartbt";
// import { setLogIn, setUser } from "../redux/Slice/userSlice";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";

// const Header = ({ products, setFilteredData }) => {
//   const { isLoggedIn } = useSelector((state) => state.userinfo);
//   const [search, setSearch] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [Discountcoupon, setDiscountcoupon] = useState("");
//   const [userinfo, setUserinfo] = useState([]);
//   const [navbtn, setNavbtn] = useState(false);
//   const cartdata = useSelector((state) => state.cart);
//   const [currencydata, setCurrencydata] = useState(JSON.parse(localStorage.getItem("currency")) || "");

//   // useEffect(() => {
//   //   const items = JSON.parse(localStorage.getItem("currency"));
//   //   if (items) {
//   //     setCurrencydata(items);
//   //   }
//   // }, [localStorage.getItem("currency")]);
//   const changeSearch = async (e) => {
//     setSearch(e.target.value);
//     const filterdatas = products.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()));
//     setFilteredData(filterdatas);
//   };
//   useEffect(() => {
//     async function users() {
//       const userdata = await getloginuser();
//       setUserinfo(userdata.data.User);
//     }
//     users();
//   }, []);
//   // useEffect(() => {
//   //   async function cartdata() {
//   //     const cartuser = await GetCart();
//   //     setCartcount(cartuser.data.UserCart);
//   //   }
//   //   cartdata();
//   // }, []);

//   const filterbycurrency = async (e) => {
//     const value = e.target.value ? e.target.value : "INR";
//     localStorage.setItem("currency", JSON.stringify(value));
//     window.location.reload();
//   };

//   const signout = async () => {
//     const logouts = await Logout();
//     console.log("🚀 ~ file: Header.jsx:65 ~ signout ~ logouts", logouts.data.Success);

//     dispatch(setLogIn(false));
//     dispatch(setUser(""));
//     navigate("/");
//     toast("Logout Successfully", { type: "success", theme: "dark" });
//   };

//   useEffect(() => {
//     async function cartdata() {
//       if (userinfo.coupen_expire === "active" && userinfo.discount_status === "on") {
//         const discountcoupen = await getdiscountcoupen();
//         const DisCode = discountcoupen.data.data;
//         if (DisCode[0].status == 1) {
//           const exitingData = DisCode.filter(function (discountcoupenEnable) {
//             return discountcoupenEnable.status === 1;
//           });
//           setDiscountcoupon(exitingData);
//         }
//       }
//     }
//     cartdata();
//   }, [userinfo]);
//   return (
//     <header>
//       <div className="header-container">
//         <div className="head-top">
//           {/* <div
//             className="head-contant text-center f-14"
//             style={{
//               borderRadius: "20px",
//               height: "100px",
//               borderRadius: "20px",
//               height: "100px",
//               position: "fixed",
//               top: "45px  ",
//               left: "30px",
//               width: "calc(100% - 60px)",
//               zIndex: "1000",
//             }}
//           >
//             <span>24*7 Whatsapp Support Number +917779016383</span>
//           </div> */}
//         </div>
//       </div>
//       {Discountcoupon ? (
//         <div className="header-container">
//           <div className="head-top">
//             <div className="head-contant-1 text-center f-14">
//               <span>COD | Use Code- {Discountcoupon[0]?.coupen_code} | On Your Purchase.</span>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}

//       <div className="header-primary-container head-sti">
//         <div className="header-primary header container">
//           <div className="row flex-column flex-lg-row">
//             {/* <div className="row d-flex align-iteams-center">

//                 <div  className="col-6">
//                   <Link to="/" className="mx-auto">
//                     <img
//                       src="/image/logo.png"
//                       draggable="false"
//                       alt="Brand Logo"
//                       className="img-fluid"
//                     />
//                   </Link>
//                 </div>
//                 <div className="col-6">
//                   <div className="search-bar">
//                     <div className="d-flex justify-content-center align-iteams-center">
//                       <i className="fa-solid fa-magnifying-glass pe-2 sea-icon"></i>
//                       <input
//                         type="text"
//                         id="search"
//                         value={search}
//                         onChange={(e) => changeSearch(e)}
//                         placeholder="Search..."
//                         autoComplete="off"
//                         className="w-100"
//                       />
//                     </div>
//                   </div>
//                 </div>

//             </div> */}

//             <div className="col-lg-4 mx-auto order-3 order-lg-0">
//               {/* <div className="search-bar">
//                 <div className="d-flex justify-content-center align-iteams-center">
//                   <i className="fa-solid fa-magnifying-glass pe-2 sea-icon"></i>
//                   <input
//                     type="text"
//                     id="search"
//                     value={search}
//                     onChange={(e) => changeSearch(e)}
//                     placeholder="Search..."
//                     autoComplete="off"
//                     className="w-100"
//                   />
//                 </div>
//               </div> */}
//             </div>
//             <div className="col-lg-4 d-flex mb-3 mt-1 my-lg-0 order-2 order-lg-2">
//               <Link to="/" className="mx-auto">
//                 <img src="/image/logo.png" draggable="false" alt="Brand Logo" className="img-fluid" />
//               </Link>
//             </div>

//             <div className="col-lg-4 col-12 d-flex justify-content-center justify-content-lg-end align-items-center order-0 order-lg-3">
//               <a onClick={(e) => setNavbtn(!navbtn)} className="ms-4">
//                 <i className={`fa-solid fa-bars navbar`}></i>
//               </a>

//               <div className="menu ms-auto">
//                 <ul className="nav d-flex flex-nowrap justify-content-end">
//                   {/* {isLoggedIn === true ? (
//                     <li className="nav-item">
//                       <a onClick={signout} className="nav-link headlog-in">
//                         <i className="fa-solid fa-circle-arrow-left"></i>
//                       </a>
//                     </li>
//                   ) : (
//                     <li className="nav-item">
//                       <a className="nav-link headlog-in" href="/accountinfo">
//                         <i className="fa-solid fa-circle-arrow-right"></i>
//                       </a>
//                     </li>
//                   )} */}
//                   <li className="dropdown">
//                     <a
//                       className="btn btn-secondary dropdown-toggle nav-link headlog-in mt-0"
//                       type="button"
//                       id="dropdownMenuButton1"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       <i className="fa-solid fa-user"></i>
//                     </a>
//                     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
//                       <li>
//                         <a className="dropdown-item" href="/account">
//                           My Profile
//                         </a>
//                       </li>
//                       <li>
//                         <a className="dropdown-item" href="/account">
//                           Order History
//                         </a>
//                       </li>
//                       <li>
//                         <a className="dropdown-item" href="/account">
//                           Wallet
//                         </a>
//                       </li>
//                       <li>
//                         <a className="dropdown-item" href="/wishlist">
//                           Wishlist
//                         </a>
//                       </li>
//                       {isLoggedIn === true ? (
//                         <li>
//                           <Link className="dropdown-item" onClick={signout}>
//                             Log Out
//                           </Link>
//                         </li>
//                       ) : (
//                         <li>
//                           <Link className="dropdown-item" to="/accountinfo">
//                             Log In
//                           </Link>
//                         </li>
//                       )}
//                     </ul>
//                   </li>
//                   {/* <li className="nav-item">
//                     <a className="nav-link headlog-in" href="/account">
//                       <i className="fa-solid fa-user"></i>
//                     </a>
//                   </li> */}
//                   {/* <li className="nav-item">
//                     <a
//                       className="nav-link headlog-in"
//                       data-bs-toggle="modal"
//                       data-bs-target="#addtocart"
//                     >

//                       <i className="fa-solid fa-wallet"></i>
//                     </a>
//                     <div
//                       className="modal fade"
//                       id="addtocart"
//                       tabindex="-1"
//                       aria-labelledby="exampleModalLabel"
//                       aria-hidden="true"
//                     >
//                       <div className="modal-dialog">
//                         <div className="modal-content">
//                           <div className="modal-header">
//                             <h5
//                               className="modal-title mycart"
//                               id="exampleModalLabel"
//                             >
//                               My Wallet
//                             </h5>
//                             <button
//                               type="button"

//                               className="btn-close"
//                               data-bs-dismiss="modal"
//                               aria-label="Close"
//                             ></button>
//                           </div>
//                           <div className="modal-body pb-0">
//                             <div className="d-flex justify-content-between align-items-center">
//                               <div>Total Amount</div>
//                               <div>
//                                 {userinfo?.wallet?.currency === "INR" ?
//                                   <b>₹ {userinfo?.wallet?.amount ? userinfo?.wallet?.amount : 0}</b>
//                                   :
//                                   <b>$ {userinfo?.wallet?.amount ? userinfo?.wallet?.amount : 0}</b>
//                                 }
//                               </div>
//                             </div>

//                             <div className="modal-footer">
//                               <a
//                                 className="btn btn-secondary"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"
//                               >
//                                 OK
//                               </a>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                   <li className="nav-item">
//                     <a className="nav-link head-wishlist" href="/wishlist">
//                       <i className="fa-solid fa-heart"></i>
//                     </a>
//                   </li> */}
//                 </ul>
//               </div>
//               <div className="cart">
//                 <div className="add-to-cart ps-2">
//                   <Link to="/checkout/cart">
//                     <i className="fa-solid fa-bag-shopping bag"></i>
//                     <div className="cart-total">
//                       <span className="cartt">{cartdata.length === 0 ? 0 : cartdata.length}</span>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//               <div className="drop-menu">
//                 <select name="sort" className="filterbox ms-4" onChange={filterbycurrency}>
//                   <option selected={currencydata === "INR" ? true : false}>
//                     <a className="dropdown-item">INR</a>
//                   </option>
//                   <option selected={currencydata === "USD" ? true : false}>
//                     <a className="dropdown-item">USD</a>
//                   </option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Categorynav navbtn={navbtn} setNavbtn={setNavbtn} />
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Categorynav from "./Categorynav";
import { GetCart, getdiscountcoupen, getloginuser, loginuser, Logout } from "../https/axios";
import Addtocartbt from "./Addtocartbt";
import { setLogIn, setUser } from "../redux/Slice/userSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ products, setFilteredData }) => {
  const { isLoggedIn } = useSelector((state) => state.userinfo);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Discountcoupon, setDiscountcoupon] = useState("");
  const [userinfo, setUserinfo] = useState([]);
  const [navbtn, setNavbtn] = useState(false);
  const cartdata = useSelector((state) => state.cart);
  const [currencydata, setCurrencydata] = useState(JSON.parse(localStorage.getItem("currency")) || "");

  // Scroll state to track navbar size change
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener to adjust navbar size
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const changeSearch = async (e) => {
    setSearch(e.target.value);
    const filterdatas = products.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredData(filterdatas);
  };

  useEffect(() => {
    async function users() {
      const userdata = await getloginuser();
      setUserinfo(userdata.data.User);
    }
    users();
  }, []);

  const filterbycurrency = async (e) => {
    const value = e.target.value ? e.target.value : "INR";
    localStorage.setItem("currency", JSON.stringify(value));
    window.location.reload();
  };

  const signout = async () => {
    const logouts = await Logout();
    console.log("🚀 ~ file: Header.jsx:65 ~ signout ~ logouts", logouts.data.Success);

    dispatch(setLogIn(false));
    dispatch(setUser(""));
    navigate("/");
    toast("Logout Successfully", { type: "success", theme: "dark" });
  };

  useEffect(() => {
    async function cartdata() {
      if (userinfo.coupen_expire === "active" && userinfo.discount_status === "on") {
        const discountcoupen = await getdiscountcoupen();
        const DisCode = discountcoupen.data.data;
        if (DisCode[0].status == 1) {
          const exitingData = DisCode.filter(function (discountcoupenEnable) {
            return discountcoupenEnable.status === 1;
          });
          setDiscountcoupon(exitingData);
        }
      }
    }
    cartdata();
  }, [userinfo]);

  return (
    <header>
      <div className={`header-container ${scrolled ? "py-2 shadow-lg bg-white" : "py-6"}`}>
        <div className="head-top"></div>
      </div>

      {Discountcoupon ? (
        <div className="header-container">
          <div className="head-top">
            <div className="head-contant-1 text-center f-14">
              <span>COD | Use Code- {Discountcoupon[0]?.coupen_code} | On Your Purchase.</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div
        className={`header-primary-container head-sti ${scrolled ? "bg-white py-2 shadow-lg" : "bg-transparent py-6"}`}
      >
        <div className="header-primary header container">
          <div className="row flex-column flex-lg-row">
            <div className="col-lg-4 mx-auto order-3 order-lg-0"></div>
            <div className="col-lg-4 d-flex mb-3 mt-1 my-lg-0 order-2 order-lg-2">
              <Link to="/" className="mx-auto">
                <img src="/image/logo.png" draggable="false" alt="Brand Logo" className="img-fluid" />
              </Link>
            </div>

            <div className="col-lg-4 col-12 d-flex justify-content-center justify-content-lg-end align-items-center order-0 order-lg-3">
              <a onClick={(e) => setNavbtn(!navbtn)} className="ms-4">
                <i className={`fa-solid fa-bars navbar`}></i>
              </a>

              <div className="menu ms-auto">
                <ul className="nav d-flex flex-nowrap justify-content-end">
                  <li className="dropdown">
                    <a
                      className="btn btn-secondary dropdown-toggle nav-link headlog-in mt-0"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-user"></i>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li>
                        <a className="dropdown-item" href="/account">
                          My Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/account">
                          Order History
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/account">
                          Wallet
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/wishlist">
                          Wishlist
                        </a>
                      </li>
                      {isLoggedIn === true ? (
                        <li>
                          <Link className="dropdown-item" onClick={signout}>
                            Log Out
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link className="dropdown-item" to="/accountinfo">
                            Log In
                          </Link>
                        </li>
                      )}
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="cart">
                <div className="add-to-cart ps-2">
                  <Link to="/checkout/cart">
                    <i className="fa-solid fa-bag-shopping bag"></i>
                    <div className="cart-total">
                      <span className="cartt">{cartdata.length === 0 ? 0 : cartdata.length}</span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="drop-menu">
                <select name="sort" className="filterbox ms-4" onChange={filterbycurrency}>
                  <option selected={currencydata === "INR" ? true : false}>
                    <a className="dropdown-item">INR</a>
                  </option>
                  <option selected={currencydata === "USD" ? true : false}>
                    <a className="dropdown-item">USD</a>
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Categorynav navbtn={navbtn} setNavbtn={setNavbtn} />
    </header>
  );
};

export default Header;
