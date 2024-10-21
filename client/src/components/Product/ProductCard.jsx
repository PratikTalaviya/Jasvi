import React, { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, currency, addToWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.title}/${product._id}`);
  };

  return (
    <div
      className="bg-white rounded-[0.8rem] w-full shadow-md flex-shrink-0 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      <div className="relative p-[0.3rem] pb-0">
        <div className="w-full">
          <motion.img
            initial={{ scale: 1 }}
            // animate={{ scale: isHovered ? 1.05 : 1 }}
            // transition={{ duration: 0.3 }}
            src={product.photo}
            alt={product.title}
            className="w-full object-cover object-top rounded-[0.6rem] aspect-[3/4]"
          />
        </div>
        <button
          className="absolute top-[0.6rem] right-[0.6rem] bg-white rounded-md p-[0.3rem] text-gray-600 hover:text-red-400 hover:shadow-button"
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist(product._id);
          }}
        >
          <Heart size="1.1rem" />
        </button>
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-white p-[0.3rem] pb-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 12 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="w-full text-sm p-1 bg-transparent border-[0.1rem] border-[#E5E7EB] text-[#1F2937] font-normal rounded-[0.6rem] transition-colors duration-300 hover:!bg-[#E5E7EB]"
            onClick={(e) => {
              e.stopPropagation();
              // handleProductClick();
              window.open("https://www.amazon.com", "_blank");
              // navigate("products/Women%20Ethnic/Saree/642957ac49742a371e3d6eb9");
            }}
          >
            Buy Now
          </button>
        </motion.div>
      </div>
      <div className="p-[0.3rem]">
        <div className="px-2 py-[0.3rem] flex border-2 rounded-[0.6rem]">
          <div className="flex flex-col truncate">
            <h3 className="text-sm font-semibold truncate">{product.title}</h3>
            <div className="mt-0.5 text-xs">
              {currency === "INR" ? (
                <>
                  <span className="ml-0.5 text-gray-500 line-through mr-1">₹{product.In_price * 2}</span>
                  <span className="text-black font-bold">₹{product.In_price}</span>
                </>
              ) : (
                <>
                  <span className="ml-0.5 text-gray-500 line-through mr-1">${product.outIn_price * 2}</span>
                  <span className="text-black font-bold">${product.outIn_price}</span>
                </>
              )}
            </div>
          </div>
          {/* <div className="w-[2.5rem] pr-[0.3rem] border-2 rounded-[0.2rem]"></div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
