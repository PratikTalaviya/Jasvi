import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { VscMenu } from "react-icons/vsc";
import { PiShoppingCartSimple, PiUser } from "react-icons/pi";
import { RiSearchLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import ModalMenu from "./ModalMenu"; // Import the ModalMenu component
import RightModal from "./RightModal";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRightModal, setIsRightModal] = useState(false);

  // Scroll event listener to handle sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleRight = () => {
    setIsRightModal(!isRightModal);
  };

  return (
    <>
      {/* White background container beside the navbar */}
      <div
        className={`transform transition-all duration-0 ${
          isSticky ? "fixed top-0 right-0  w-full h-[3rem] bg-white z-[999] px-[0.6rem]" : ""
        }`}
      ></div>
      <nav
        className={`${
          isSticky ? "sticky top-[0.6rem]" : "relative"
        }  py-[0.3rem] bg-white shadow-lg rounded-outer w-full mx-auto transform transition-all duration-300 z-[1000] mb-3`}
      >
        <div className="flex justify-between items-center px-[1rem] md:px-[2rem] py-[0.5rem]">
          {/* Hamburger Menu Button on Left */}
          <button
            className="text-xl w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-xl hover:bg-gray-50"
            onClick={toggleModal}
          >
            {/* ☰ */}
            <VscMenu />
          </button>

          {/* Logo in the Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-[1.5rem] tracking-[0.01rem] font-semibold">
            <Link to="/" className="hover:!text-black">
              Jasvi Creation
            </Link>
          </div>

          {/* Icons (Search, Profile, Cart) on the Right */}
          <div className="flex items-center  md:space-x-2">
            <div
              className="hidden md:flex text-xl w-[2.3rem] h-[2.3rem] justify-center items-center rounded-xl hover:bg-gray-50"
              onClick={toggleRight}
            >
              <IoSearchOutline className="text-lg cursor-pointer" />
            </div>
            <div
              className="text-xl w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-xl hover:bg-gray-50"
              onClick={toggleRight}
            >
              <PiUser className="text-lg cursor-pointer" />
            </div>
            <div
              className="text-xl w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-xl hover:bg-gray-50"
              onClick={toggleRight}
            >
              <PiShoppingCartSimple className="text-lg cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      {/* Modal for Hamburger Menu */}
      {isModalOpen && <ModalMenu toggleModal={toggleModal} isSticky={isSticky} />}
      {isRightModal && <RightModal toggleRight={toggleRight} />}
    </>
  );
};

export default Navbar;
