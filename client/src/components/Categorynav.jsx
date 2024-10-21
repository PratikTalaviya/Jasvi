import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoriesHome, SubCategories } from "../https/axios";

const Categorynav = ({ navbtn, setNavbtn }) => {
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [cart, setCart] = useState([]);
  const [cat, setCat] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const showcategory = await CategoriesHome({});
      const CategoryStatus = showcategory.data.CategoryList;
      const exitingData = CategoryStatus.filter(function (CategoryEnable) {
        return CategoryEnable.status == true;
      });
      setCategory(exitingData);
    }
    fetchdata();
  }, []);

  const onsub = async (data) => {
    const subcategorys = await SubCategories({});
    const subcategorysStatus = subcategorys.data.SubCategoryList;
    const exitingData = subcategorysStatus.filter(function (subcategorysEnable) {
      return subcategorysEnable.status == true;
    });
    setSubcategory(exitingData);
    const nq = subcategory.filter((ele, index) => {
      return ele?.category_id?.name == data;
    });
    setCat(nq);
  };
  return (
    <div className="second-menu" style={{ cursor: "pointer" }}>
      <ul className="d-flex justify-content-center f-16 first-menu">
        {category.map((data) => {
          return (
            <li className="nav-item">
              <a
                className="nav-link"
                onMouseEnter={() => {
                  onsub(data.name);
                }}
              >
                {data.name}
              </a>
              <ul className="submenu">
                {cat.map((datas) => {
                  return (
                    <li>
                      {/* <a href="/products">{datas.Name}</a> */}
                      <Link
                        // to={`/products/${datas.id}`}
                        to={`/products/${datas?.category_id?.name}/${datas.name}/${datas._id}`}
                        className="dropdown-item f-14"
                      >
                        {datas.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <br />
      {/* <hr /> */}

      {/* <div className="LineBGColor mb-3">
        <div className="container">
          <div className="row py-2">
            <div className="col-4 d-flex justify-content-center align-items-center hedLineTxt"> <a href={`/allproduct`}>1500+ New Products Added Weekly</a> </div>
            <div className="col-4 d-flex justify-content-center align-items-center hedLineTxt"><a href="#CATEGORY">Top Trending Styles</a></div>
            <div className="col-4 d-flex justify-content-center align-items-center hedLineTxt"> View Your<strong className="ps-1"> <a href="#Personalized">Personalized Favorites</a> </strong></div>
          </div>
        </div>
      </div> */}

      {/* <hr /> */}
      <div className="second-menuTwo text-left">
        <ul className={`resNav d-flex flex-column f-16 ${navbtn ? "navActive" : ""}`}>
          <li className="nav-item close-nav mb-3" onClick={(e) => setNavbtn(!navbtn)}>
            <span className="me-auto">Categories</span>
            <i className="fa-solid fa-xmark closeBtn  d-flex justify-content-center align-items-center"></i>
          </li>
          {category.map((data) => {
            return (
              <li className="nav-item">
                <a
                  className="nav-link"
                  onMouseEnter={() => {
                    onsub(data.name);
                  }}
                >
                  {data.name}
                </a>
                <ul className="submenu">
                  {cat.map((datas) => {
                    return (
                      <li>
                        {/* <a href="/products">{datas.Name}</a> */}
                        <Link to={`/products/${datas.id}`} className="dropdown-item f-14">
                          {datas.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        <div className={`overlay ${navbtn ? "overlayActive" : ""}`}></div>
      </div>
    </div>
  );
};

export default Categorynav;
