import React from "react";

function ProductDisplay() {
  return (
    <div className="flex flex-col md:flex-row p-primary bg-gray-200 rounded-outer w-full  space-y-4 md:space-y-0 md:space-x-[0.6rem] mb-primary">
      {/* Left Vertical Text */}
      <div className="w-full md:w-[4rem] md:h-auto h-[4rem] flex justify-center items-center bg-white rounded-lg">
        {/* <div className="w-full h-full"> */}
        <div className="md:vertical md:transform md:-rotate-180 text-lg font-medium">Where Fashion Meets Trend</div>
        {/* </div> */}
      </div>

      {/* Right Content */}
      <div className="md:w-full grid grid-cols-1 md:grid-cols-5 gap-[0.6rem]">
        {/* Left Image */}
        <div className="md:row-span-2 md:col-span-2 bg-gray-300 rounded-lg aspect-square md:aspect-none md:h-full md:w-full">
          {/* Placeholder for large image */}
        </div>

        <div className="flex gap-[0.6rem] md:col-span-3">
          <div className="bg-gray-300 rounded-lg w-[32.18%] aspect-square">
            <img src="/placeholder.svg" alt="" layout="fill" objectFit="cover" className="rounded-lg" />
          </div>

          <div className="bg-gray-300 rounded-lg w-[32.18%] aspect-square">
            <img src="/placeholder.svg" alt="" layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
          <div className="bg-gray-300 rounded-lg w-[32.18%] aspect-square">
            <img src="/placeholder.svg" alt="" layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
        </div>

        {/* Product Info */}
        <div className="md:col-span-3 bg-white rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold">Product Name</h2>
            <div className="flex space-x-2 mt-2 text-sm">
              <span className="border-b">[In Stock]</span>
              <span className="border-b">[New Arrival]</span>
              <span className="border-b">[Best Seller]</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-3xl font-semibold">₹</span>
              <span className="text-5xl font-semibold">1000</span>
            </div>
            <button className="p-3 bg-gray-200 rounded-full translate -rotate-45">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto">
    //   <div className="bg-gray-100 w-16 flex items-center justify-center">
    //     <h2 className="transform -rotate-90 text-xl font-bold whitespace-nowrap">Where Fashion Meets Trend</h2>
    //   </div>

    //   <div className="flex-grow p-4 space-y-4">
    //     <div className="flex space-x-4">
    //       <div className="w-2/3">
    //         <div className="aspect-w-4 aspect-h-3">
    //           <img
    //             src="/placeholder.svg"
    //             alt="Main product image"
    //             layout="fill"
    //             objectFit="cover"
    //             className="rounded-lg"
    //           />
    //         </div>
    //       </div>

    //       <div className="w-1/3 space-y-4">
    //         <div className="aspect-square">
    //           <img
    //             src="/placeholder.svg"
    //             alt="Additional product image 1"
    //             layout="fill"
    //             objectFit="cover"
    //             className="rounded-lg"
    //           />
    //         </div>
    //         <div className="aspect-square">
    // <img
    //   src="/placeholder.svg"
    //   alt="Additional product image 2"
    //   layout="fill"
    //   objectFit="cover"
    //   className="rounded-lg"
    //   />
    // </div>
    //       </div>
    //     </div>

    //     <div className="bg-gray-50 p-4 rounded-lg">
    //       <h3 className="text-2xl font-bold mb-2">Product Name</h3>
    //       <div className="flex flex-wrap gap-2 mb-4">
    //         <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">[In Stock]</span>
    //         <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">[New Arrival]</span>
    //         <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">[Best Seller]</span>
    //       </div>
    //       <div className="flex justify-between items-center">
    //         <span className="text-3xl font-bold">₹1000</span>
    //         <button className="bg-gray-300 rounded-full p-2">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-6 w-6"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ProductDisplay;
