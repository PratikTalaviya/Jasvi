import React, { useState, useEffect } from "react";
import { CategoriesHome, ChildCategories } from "../../https/axios";
import Slider from "react-slick";
import "../../App.css";
import { Link } from "react-router-dom";

const CategoryBanner = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function catt() {
      const showcategory = await CategoriesHome({});
      setCategory(showcategory.data.CategoryList);
    }
    catt();
  }, []);
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <i className="fa-solid fa-chevron-left"></i>
        {/* <FaArrowLeft /> */}
      </div>
    );
  };
  // const [imageIndex, setImageIndex] = useState(0);
  const settings = {
    rows: 1,
    infinite: true,
    lazyLoad: true,
    speed: 2000,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,

        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,

        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

        },
      },
    ]
  };

  return (
    <div className="homecategory" id="CATEGORY">
      <div className="container">
        <h2 className="heading text-center ">
          <span>Our Category</span>
        </h2>

        <Slider {...settings}>
          {category &&
            category.map((data, idx) => {
              return (
                // <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                <div className="item">
                  <div className="block-cat-wr text-center">
                    <div className="categorybr">
                      <div className="cat-img mt-5">
                        <a Link to="/allproduct">
                          {/* <img
                          src={`${data.photo}`}
                          className="img-fluid mainimg"
                        /> */}
                          <img src={`${data.photo}`}

                            className="img-fluid w-100 homeproimg"
                            alt="Our Category"
                            draggable="false"
                          />
                          {/* <img src="/image/category/cat-1.jpg"
                         
                            className="img-fluid homeproimg"
                            alt="Our Category"
                            draggable="false"
                          /> */}
                        </a>
                      </div>
                      <div className="category_text">
                        <div className="cat-text">
                          <h2>
                            <Link to="/allproduct">
                              <span>{data.name}</span>
                            </Link>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                //  </div>
              );
            })}
        </Slider>

      </div>
    </div>
  );
};

export default CategoryBanner;
