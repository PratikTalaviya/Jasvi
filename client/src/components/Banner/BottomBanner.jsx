// import React from "react";
// import { Link } from "react-router-dom";

// const BottomBanner = () => {
//   return (
//     <div className="bottom-bnr">
//       <div className="mb-primary rounded-outer">
//         <div className="botbnr-con">
//           <div className="beffect">
//             <Link to="/allproduct" className="d-flex justify-content-end align-items-center rounded-outer">
//               <img
//                 src="./image/bottom-banner/bottom-bnr.jpg"
//                 className="w-full object-cover object-right md:object-center rounded-outer aspect-square md:aspect-[3/1]"
//                 alt="Bottom Banner"
//                 draggable="false"
//               />
//             </Link>
//           </div>
//           <div className="botbnr-dec">
//             <div className="botbnr-text">
//               <h5>Amazing Collection</h5>
//               <h3>Today Best Offer on Special Category</h3>
//               <p>Please Grab Fast Limited Time offer specialLy for special ones only ending soon!!!</p>
//               <Link to="/allproduct" className="btn btn-primary rounded-xl">
//                 <span>shop now</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BottomBanner;

import React from "react";
import { Link } from "react-router-dom";
import bottombnr from "../../images/bottom-bnr.jpg";

const BottomBanner = () => {
  return (
    <div className="w-full mb-primary">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <div className="relative">
            <img
              src={bottombnr}
              className="w-full h-auto object-cover object-center md:aspect-[3/1] aspect-square"
              alt="Amazing Collection"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center p-6 text-white md:w-[45%]">
            <h5 className="text-lg font-semibold mb-2">Amazing Collection</h5>
            <h3 className="text-3xl font-bold mb-4">TODAY BEST OFFER ON SPECIAL CATEGORY</h3>
            <p className="mb-6 text-sm md:text-base">
              Please Grab Fast Limited Time offer specially for special ones only ending soon!!!
            </p>
            <Link
              to="/allproduct"
              className="inline-block bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition duration-300 text-center"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
