import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Products, WishList } from "../../https/axios";
import Slider from "react-slick";
import { toast } from "react-toastify";

const Homeproduct = () => {
  const [product, setProduct] = useState([]);
  const [productid, setProductid] = useState("");
  const [currency, setCurrency] = useState(JSON.parse(localStorage.getItem("currency")) || "");

  useEffect(() => {
    async function fetchproduct() {
      const showproduct = await Products();
      setProduct(showproduct.data.ProductsList);
      console.log("Hello");
      console.log(showproduct.data.ProductsList);
    }
    fetchproduct();
  }, []);

  const sendwish = async (id) => {
    try {
      const userwish = await WishList({ productid: id });
      if (userwish) {
        toast("Product Added To Wishlist", { theme: "dark", type: "success" });
      }
    } catch (error) {
      toast("Something went wrong", { theme: "dark", type: "error" });
    }
  };
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
      </div>
    );
  };

  // useEffect(() => {
  //     async function getcurency() {
  //         setCurrency(JSON.parse(localStorage.getItem("currency")))
  //     }
  //     getcurency()
  // }, []);

  const settings = {
    rows: 1,
    infinite: true,
    lazyLoad: true,
    speed: 2000,
    slidesToShow: 5,
    // autoplay: true,
    // autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
    ],
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    // beforeChange: (current, next) => setImageIndex(next),
  };

  return (
    <div className="container">
      <h2 className="heading text-center tbmrg">
        <span>SHOP BY ROLE</span>
      </h2>

      <Slider {...settings}>
        {product &&
          product.map((data, idx) => {
            return (
              // <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
              <a>
                <div className="item paddingright">
                  <div className="pro-img text-left p-2">
                    <a>
                      <img
                        className="w-100 img-fluid homeproimg rounded-lg"
                        src={`${data.photo}`}
                        alt="product"
                        draggable="false"
                      />
                    </a>
                    <div className="caption">
                      <h4 className="text-center" onChange={(data) => setProductid(data._id)}>
                        {data.title}{" "}
                      </h4>
                      {currency === "INR" ? (
                        <div className="price text-center">
                          <span className="new-price text-center pe-1">₹{data.In_price}</span>
                          <span className="old-price text-center">₹{data.In_price * 2}</span>
                        </div>
                      ) : (
                        <div className="price text-center">
                          <span className="new-price text-center pe-1">${data.outIn_price}</span>
                          <span className="old-price text-center">${data.outIn_price * 2}</span>
                        </div>
                      )}
                      <div className="button-group">
                        <a href={`/product/${data.title}/${data._id}`} className="quickview pro-btn text-center">
                          <svg>
                            <path d="M12 16q1.875 0 3.188-1.312Q16.5 13.375 16.5 11.5q0-1.875-1.312-3.188Q13.875 7 12 7q-1.875 0-3.188 1.312Q7.5 9.625 7.5 11.5q0 1.875 1.312 3.188Q10.125 16 12 16Zm0-1.925q-1.075 0-1.825-.75t-.75-1.825q0-1.075.75-1.825T12 8.925q1.075 0 1.825.75t.75 1.825q0 1.075-.75 1.825t-1.825.75Zm0 5.1q-3.725 0-6.762-2.088Q2.2 15 .825 11.5 2.2 8 5.238 5.912 8.275 3.825 12 3.825q3.725 0 6.763 2.087Q21.8 8 23.175 11.5 21.8 15 18.763 17.087 15.725 19.175 12 19.175Zm0-7.675Zm0 5.5q2.825 0 5.175-1.488 2.35-1.487 3.6-4.012-1.25-2.525-3.6-4.013Q14.825 6 12 6 9.175 6 6.825 7.487q-2.35 1.488-3.6 4.013 1.25 2.525 3.6 4.012Q9.175 17 12 17Z" />
                          </svg>
                          <span className="d-none ms-2">Quickview</span>
                        </a>
                        <a onClick={() => sendwish(data._id)} className="wishlist pro-btn text-center">
                          <svg>
                            <path d="m12 21.275-1.6-1.425q-2.55-2.3-4.212-3.963Q4.525 14.225 3.55 12.9q-.975-1.325-1.362-2.45Q1.8 9.325 1.8 8.15q0-2.45 1.625-4.075T7.5 2.45q1.3 0 2.463.525 1.162.525 2.037 1.5.85-.975 2.025-1.5Q15.2 2.45 16.5 2.45q2.425 0 4.062 1.625Q22.2 5.7 22.2 8.15q0 1.175-.388 2.288-.387 1.112-1.362 2.437-.975 1.325-2.65 3-1.675 1.675-4.225 3.975Zm0-3.075q2.375-2.15 3.925-3.663 1.55-1.512 2.438-2.65.887-1.137 1.224-2.012.338-.875.338-1.725 0-1.475-.975-2.45-.975-.975-2.45-.975-1.15 0-2.137.662-.988.663-1.363 1.688h-2q-.375-1.025-1.363-1.688-.987-.662-2.137-.662-1.475 0-2.45.975-.975.975-.975 2.45 0 .875.35 1.75t1.238 2q.887 1.125 2.425 2.65Q9.625 16.075 12 18.2Zm0-6.725Z" />
                          </svg>
                          <span className="d-none ms-2">Wishlist</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              //    </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default Homeproduct;

// import React, { useState, useEffect } from "react";
// import { Products, WishList } from "../../https/axios";
// import { toast } from "react-toastify";
// import ProductSlider from "./ProductSlider"; // Import the new ProductSlider component

// const HomeProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [currency, setCurrency] = useState(JSON.parse(localStorage.getItem("currency")) || "");

//   // Fetch products when the component mounts
//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const showProduct = await Products();
//         setProducts(showProduct.data.ProductsList); // Set fetched products
//         console.log(showProduct.data.ProductsList);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     }
//     fetchProducts();
//   }, []);

//   // Add product to wishlist
//   const sendWish = async (id) => {
//     try {
//       const userWish = await WishList({ productid: id });
//       if (userWish) {
//         toast("Product Added To Wishlist", { theme: "dark", type: "success" });
//       }
//     } catch (error) {
//       toast("Something went wrong", { theme: "dark", type: "error" });
//     }
//   };

//   // Mapping through the products to create the card
//   const productCards = products.map((product) => ({
//     title: product.title,
//     originalPrice: currency === "INR" ? `₹${product.In_price * 2}` : `$${product.outIn_price * 2}`,
//     discountedPrice: currency === "INR" ? `₹${product.In_price}` : `$${product.outIn_price}`,
//     imgSrc: product.photo,
//     productLink: `/product/${product.title}/${product._id}`,
//     onWishlistClick: () => sendWish(product._id),
//   }));

//   return (
//     <div className="container">
//       <h2 className="heading text-center tbmrg">
//         <span>SHOP BY ROLE</span>
//       </h2>

//       {/* Integrate the ProductSlider component */}
//       <ProductSlider title="Best Sellers" products={productCards} />
//     </div>
//   );
// };

// export default HomeProduct;
