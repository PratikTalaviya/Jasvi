// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import { Products, WishList } from "../../https/axios";
// import ProductCard from "./ProductCard";
// import { toast } from "react-toastify";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

// const ProductSlider = ({ title }) => {
//   const [product, setProduct] = useState([]);
//   const [currency, setCurrency] = useState(JSON.parse(localStorage.getItem("currency")) || "INR");

//   useEffect(() => {
//     async function fetchProduct() {
//       const showProduct = await Products();
//       setProduct(showProduct.data.ProductsList);
//     }
//     fetchProduct();
//   }, []);

//   const addToWishlist = async (id) => {
//     try {
//       const userWish = await WishList({ productid: id });
//       if (userWish) {
//         toast("Product Added To Wishlist", { theme: "dark", type: "success" });
//       }
//     } catch (error) {
//       toast("Something went wrong", { theme: "dark", type: "error" });
//     }
//   };

//   const sliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: { slidesToShow: 3, slidesToScroll: 3 },
//       },
//       {
//         breakpoint: 768,
//         settings: { slidesToShow: 2, slidesToScroll: 2 },
//       },
//       {
//         breakpoint: 480,
//         settings: { slidesToShow: 1, slidesToScroll: 1 },
//       },
//     ],
//   };

//   return (
//     <div className="bg-gray-100 p-6 rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">{title}</h2>

//       <Slider {...sliderSettings}>
//         {product.map((item) => (
//           <ProductCard key={item._id} product={item} currency={currency} addToWishlist={addToWishlist} />
//         ))}
//       </Slider>
//     </div>
//   );
// };

// // Next Arrow Component
// const NextArrow = ({ onClick }) => {
//   return (
//     <div
//       className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-200 transition"
//       onClick={onClick}
//     >
//       <ChevronRightIcon className="h-6 w-6 text-gray-600" />
//     </div>
//   );
// };

// // Prev Arrow Component
// const PrevArrow = ({ onClick }) => {
//   return (
//     <div
//       className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-200 transition"
//       onClick={onClick}
//     >
//       <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
//     </div>
//   );
// };

// export default ProductSlider;

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// import { Products, WishList } from "../../https/axios";
// import { toast } from "react-toastify";
// import ProductCard from "./ProductCard"; // Using the older ProductCard component

// const ProductSlider = ({ title }) => {
//   const [product, setProduct] = useState([]);
//   const [currency, setCurrency] = useState(JSON.parse(localStorage.getItem("currency")) || "INR");
//   const [scrollX, setScrollX] = useState(0);
//   const sliderRef = React.useRef();

//   // Fetch products when component mounts
//   useEffect(() => {
//     async function fetchProduct() {
//       const showProduct = await Products();
//       setProduct(showProduct.data.ProductsList);
//     }
//     fetchProduct();
//   }, []);

//   // Add product to wishlist
//   const addToWishlist = async (id) => {
//     try {
//       const userWish = await WishList({ productid: id });
//       if (userWish) {
//         toast("Product Added To Wishlist", { theme: "dark", type: "success" });
//       }
//     } catch (error) {
//       toast("Something went wrong", { theme: "dark", type: "error" });
//     }
//   };

//   // Handle scroll for arrow buttons
//   const handleScroll = (direction) => {
//     const sliderWidth = sliderRef.current.offsetWidth;
//     const scrollDistance = direction === "left" ? -sliderWidth : sliderWidth;
//     setScrollX((prev) => prev + scrollDistance);
//     sliderRef.current.scrollTo({
//       left: sliderRef.current.scrollLeft + scrollDistance,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="w-full bg-gray-200 py-[0.6rem] px-[1rem] rounded-xl">
//       {/* Title and Divider Line */}
//       <div className="flex flex-col justify-between items-center mb-6">
//         {/* <h2 className="text-2xl font-bold">{title}</h2> */}
//         {/* <div className="h-1 w-full bg-black mt-2"></div> */}
//       </div>

//       {/* Product Slider */}
//       <div className="relative">
//         {/* Left Arrow */}
//         <div className="absolute -top-[2rem] right-[2.5rem] transform -translate-y-1/2">
//           <button
//             onClick={() => handleScroll("left")}
//             className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
//           >
//             <BsArrowLeft size={24} />
//           </button>
//         </div>

//         {/* Right Arrow */}
//         <div className="absolute -top-[2rem] right-0 transform -translate-y-1/2">
//           <button
//             onClick={() => handleScroll("right")}
//             className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
//           >
//             <BsArrowRight size={24} />
//           </button>
//         </div>

//         {/* Draggable and Scrollable Cards */}
//         <motion.div
//           ref={sliderRef}
//           drag="x"
//           dragConstraints={{ left: -1000, right: 0 }}
//           className="flex space-x-4 overflow-x-auto scrollbar-hide hide-scrollbar overflow-auto"
//         >
//           {product.map((item) => (
//             <div className="m-[0.6rem]">
//               <ProductCard key={item._id} product={item} currency={currency} addToWishlist={addToWishlist} />
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ProductSlider;

// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
// import { Products, WishList } from "../../https/axios";
// import { toast } from "react-toastify";
// import ProductCard from "./ProductCard";

// const ProductSlider = ({ title }) => {
//   const [products, setProducts] = useState([]);
//   const [currency, setCurrency] = useState(JSON.parse(localStorage.getItem("currency") || '"INR"'));
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const response = await Products();
//         setProducts(response.data.ProductsList);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         toast("Failed to fetch products", { theme: "dark", type: "error" });
//       }
//     }
//     fetchProducts();
//   }, []);

//   const addToWishlist = async (id) => {
//     try {
//       const userWish = await WishList({ productid: id });
//       if (userWish) {
//         toast("Product Added To Wishlist", { theme: "dark", type: "success" });
//       }
//     } catch (error) {
//       toast("Something went wrong", { theme: "dark", type: "error" });
//     }
//   };

//   const handleScroll = (direction) => {
//     const container = containerRef.current;
//     if (!container) return;

//     const cardWidth = 196; // 12rem + 0.5rem margin
//     const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

//     container.scrollBy({
//       left: scrollAmount,
//       behavior: "smooth",
//     });

//     // Update currentIndex based on scroll position
//     setCurrentIndex((prevIndex) => {
//       const newIndex = prevIndex + (direction === "left" ? -1 : 1);
//       return Math.max(0, Math.min(newIndex, products.length - 1));
//     });
//   };

//   return (
//     <div className="w-full bg-gray-200 p-[0.6rem] rounded-xl">
//       <div className="flex justify-between items-center mb-1.5">
//         <h2 className="text-[1.5rem] font-bold">{title}</h2>
//         <div className="flex space-x-0.5">
//           <button
//             onClick={() => handleScroll("left")}
//             className="p-0.5 bg-white rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
//             disabled={currentIndex === 0}
//           >
//             <ChevronLeft size="1.5rem" />
//           </button>
//           <button
//             onClick={() => handleScroll("right")}
//             className="p-0.5 bg-white rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
//             disabled={currentIndex === products.length - 1}
//           >
//             <ChevronRight size="1.5rem" />
//           </button>
//         </div>
//       </div>

//       <div
//         ref={containerRef}
//         className="flex space-x-1 overflow-x-auto scrollbar-hide"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         {products.map((product) => (
//           <ProductCard key={product._id} product={product} currency={currency} addToWishlist={addToWishlist} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductSlider;

import React, { useState, useEffect, useRef } from "react";
import { Products, WishList } from "../../https/axios";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function ProductSlider({ title }) {
  const [product, setProduct] = useState([]);
  const [currency, setCurrency] = useState(JSON.parse(localStorage.getItem("currency")) || "INR");
  const sliderRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  // useEffect(() => {
  //   async function fetchProduct() {
  //     const showProduct = await Products();
  //     setProduct(showProduct.data.ProductsList);
  //   }
  //   fetchProduct();

  //   const updateVisibleCards = () => {
  //     if (sliderRef.current) {
  //       const containerWidth = sliderRef.current.offsetWidth;
  //       const newCardWidth = 300; // Adjust this value based on your card's width
  //       const newVisibleCards = Math.floor(containerWidth / newCardWidth);
  //       setCardWidth(newCardWidth);
  //       setVisibleCards(newVisibleCards);
  //     }
  //   };

  //   updateVisibleCards();
  //   window.addEventListener("resize", updateVisibleCards);
  //   return () => window.removeEventListener("resize", updateVisibleCards);
  // }, []);
  // useEffect(() => {
  //   async function fetchProduct() {
  //     const showProduct = await Products();
  //     setProduct(showProduct.data.ProductsList);
  //   }
  //   fetchProduct();

  //   const updateVisibleCards = () => {
  //     if (sliderRef.current) {
  //       const containerWidth = sliderRef.current.offsetWidth;

  //       // Get the root font-size (1 rem = root font-size)
  //       const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

  //       // Define card width in rem units (e.g., 18.75 rem)
  //       const cardWidthInRem = 13; // Adjust this value based on your design

  //       // Convert card width from rem to px
  //       const newCardWidth = cardWidthInRem * rootFontSize;

  //       // Calculate the number of visible cards
  //       const newVisibleCards = Math.floor(containerWidth / newCardWidth);

  //       // Set the values in state
  //       setCardWidth(newCardWidth);
  //       setVisibleCards(newVisibleCards);
  //     }
  //   };

  //   updateVisibleCards();
  //   window.addEventListener("resize", updateVisibleCards);
  //   return () => window.removeEventListener("resize", updateVisibleCards);
  // }, []);
  useEffect(() => {
    async function fetchProduct() {
      const showProduct = await Products();
      setProduct(showProduct.data.ProductsList);
    }
    fetchProduct();
    const updateVisibleCards = () => {
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.offsetWidth;

        // Get the root font-size (1 rem = root font-size)
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

        // Define card width in rem units (e.g., 18.75 rem)
        const cardWidthInRem = 13; // Adjust this value based on your design

        // Convert card width from rem to px

        // Determine the number of visible cards based on breakpoints
        let newVisibleCards;
        if (containerWidth <= 280) newVisibleCards = 1;
        else if (containerWidth <= 500) newVisibleCards = 2;
        else if (containerWidth <= 680) newVisibleCards = 3;
        else if (containerWidth <= 1000) newVisibleCards = 4;
        else if (containerWidth <= 1920) newVisibleCards = 5;
        else if (containerWidth <= 2560) newVisibleCards = 6;
        else newVisibleCards = 7;

        const newCardWidth = containerWidth / newVisibleCards;
        // Set the values in state
        setCardWidth(newCardWidth);
        setVisibleCards(newVisibleCards);
      }
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const addToWishlist = async (id) => {
    try {
      const userWish = await WishList({ productid: id });
      if (userWish) {
        toast("Product Added To Wishlist", { theme: "dark", type: "success" });
      }
    } catch (error) {
      toast("Something went wrong", { theme: "dark", type: "error" });
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -cardWidth * visibleCards, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: cardWidth * visibleCards, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mb-primary">
      <div className="flex justify-between items-center mb-[1rem]">
        <h2 className="ml-[2rem] text-[1.8rem] font-semibold">{title}</h2>
        <div className="flex gap-2 mr-[2rem]">
          <button onClick={scrollLeft} className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition">
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
          <button onClick={scrollRight} className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition">
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="p-[1rem] bg-gray-100 rounded-outer">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar scrollbar-hide"
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {product.map((item) => (
            <div key={item._id} className="flex-shrink-0 snap-start" style={{ width: `${cardWidth}px` }}>
              <div className="m-[0.3rem]">
                <ProductCard product={item} currency={currency} addToWishlist={addToWishlist} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
