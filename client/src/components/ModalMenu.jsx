import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoriesHome, SubCategories } from "../https/axios";
import { IoMdClose } from "react-icons/io";
import { BiLogoLinkedin, BiLogoFacebook, BiLogoYoutube } from "react-icons/bi";
import { RiTwitterXFill } from "react-icons/ri";
import { RiArrowDownWideFill, RiArrowUpWideFill } from "react-icons/ri";
import { Instagram } from "lucide-react";

const ModalMenu = ({ toggleModal, isSticky }) => {
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [openCategory, setOpenCategory] = useState(null); // Track which category dropdown is open
  const [calculatedHeight, setCalculatedHeight] = useState(0);

  // Helper function to convert rem to pixels
  const remToPixels = (rem) => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  };

  useEffect(() => {
    const remValue = 9.4; // Replace with your desired rem value
    const remInPixels = remToPixels(remValue);

    // Calculate the height (window.innerHeight - rem in pixels)
    const newHeight = window.innerHeight - remInPixels;

    // Store the calculated height in the state
    setCalculatedHeight(newHeight);

    // Update on window resize
    const handleResize = () => {
      const updatedHeight = window.innerHeight - remInPixels;
      setCalculatedHeight(updatedHeight);
    };

    window.addEventListener("resize", handleResize);
    // Disable scroll and compensate for the scrollbar width
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Fetch categories on component mount
    async function fetchCategories() {
      const showcategory = await CategoriesHome({});
      const CategoryStatus = showcategory.data.CategoryList;
      const enabledCategories = CategoryStatus.filter((category) => category.status === true);
      setCategory(enabledCategories);
    }
    fetchCategories();
  }, []);

  const toggleSubcategories = async (categoryName) => {
    if (openCategory === categoryName) {
      setOpenCategory(null); // Close if already open
    } else {
      const subcategoryResponse = await SubCategories({});
      const subcategoryList = subcategoryResponse.data.SubCategoryList;
      const enabledSubcategories = subcategoryList.filter((subcategory) => subcategory.status === true);
      const filteredSubcategories = enabledSubcategories.filter((sub) => sub.category_id.name === categoryName);
      setSubcategory(filteredSubcategories);
      setOpenCategory(categoryName); // Open new category
    }
  };

  return (
    <div
      className={`fixed backdrop-blur-xs inset-0 flex h-full w-full bg-slate-100 bg-opacity-50 transform transition-all duration-300 justify-start z-[1000]`}
      onClick={toggleModal} // Close modal on background click
    >
      <div
        className={`bg-white p-[1.2rem] h-full w-full md:w-[30%] relative p-secondary`}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
      >
        <div className="flex justify-between items-center rounded-outer h-[3.5rem] w-full bg-[#F3F4F6] p-secondary">
          {/* Categories Navigation */}
          <Link to={"/"} className="text-[1.5rem] leading ml-[0.3rem]" onClick={toggleModal}>
            Jasvi Creation
          </Link>

          {/* Close button */}
          <button className="text-2xl text-gray-700" onClick={toggleModal}>
            <div className="text-xl w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-xl hover:bg-gray-50">
              <IoMdClose />
            </div>
          </button>
        </div>
        <div
          className="rounded-outer w-full bg-[#F3F4F6] px-primary py-secondary mt-secondary overflow-scroll hide-scrollbar"
          style={{ height: `${calculatedHeight}px` }}
        >
          {/* <ul className="space-y-4 text-[1.2rem] pt-primary p-secondary"> */}
          <ul className="space-y-1 text-[1rem]">
            {category.map((cat) => (
              <li key={cat._id} className="group">
                {/* Category Item */}
                <div
                  className="flex justify-between items-center cursor-pointer py-2 border-b border-gray-200 hover:text-gray-500"
                  onClick={() => toggleSubcategories(cat.name)}
                >
                  <span>{cat.name}</span>
                  {openCategory === cat.name ? (
                    <RiArrowUpWideFill className="text-gray-700 group-hover:text-gray-500 transition-transform duration-300" />
                  ) : (
                    <RiArrowDownWideFill className="text-gray-700 group-hover:text-gray-500 transition-transform duration-300" />
                  )}
                </div>

                {/* Subcategory Dropdown */}
                {openCategory === cat.name && (
                  <ul className="ml-4 mt-2 space-y-2 text-[0.9rem]">
                    {subcategory.map((subcat) => (
                      <li key={subcat._id}>
                        <Link
                          to={`/products/${subcat.category_id.name}/${subcat.name}/${subcat._id}`}
                          className="block hover:text-gray-500 transition duration-200"
                          onClick={toggleModal} // Close modal after clicking a link
                        >
                          {subcat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-outer w-full h-[3.5rem] bg-[#F3F4F6] p-secondary mt-secondary">
          <div className="flex justify-center space-x-4">
            {[BiLogoFacebook, Instagram, RiTwitterXFill, BiLogoLinkedin, BiLogoYoutube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="bg-gray-300 p-2 rounded-full text-gray-600 hover:bg-gray-400 hover:text-gray-800 transition-colors"
              >
                <Icon size={"1.2rem"} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMenu;
