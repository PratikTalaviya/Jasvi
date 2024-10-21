import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const RightModal = ({ toggleRight }) => {
  useEffect(() => {
    // Disable scroll and compensate for the scrollbar width
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className={`fixed backdrop-blur-xs inset-0 flex h-full w-full bg-slate-100 bg-opacity-50 transform transition-all duration-300 justify-end z-[1000]`}
      onClick={toggleRight} // Close modal on background click
    >
      <div
        className={`bg-white p-[1.2rem] h-full w-full md:w-[35%] relative p-secondary`}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
      >
        <div className="rounded-outer h-full w-full bg-[#F3F4F6] p-secondary">
          {/* Close button */}
          <button className="text-2xl absolute top-[1.3rem] left-[1.3rem] text-gray-700" onClick={toggleRight}>
            <div className="text-xl w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-xl hover:bg-gray-50">
              <IoMdClose />
            </div>
          </button>
          <div className="h-full w-full flex justify-center align-center flex-col">
            <div className="text-center text-[1.5rem]">You Caught Us !!</div>
            <span className="text-center text-[1.2rem] w-[75%] mx-auto">
              We are Underdevelopment Will launch this feature very soon.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightModal;
