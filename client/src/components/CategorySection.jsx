import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { CategoriesHome } from "../https/axios";

export default function Component() {
  const [categories, setCategory] = useState([]);

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

  return (
    <div className="bg-[#F3F4F6] p-primary rounded-outer mb-primary">
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[0.6rem]">
          {categories.slice(0, -1).map((category, index) => (
            <div
              key={index}
              className={`bg-gray-200 rounded-lg p-4 w-full h-[5rem] flex items-center justify-between `}
            >
              <span className="text-gray-800 font-medium">{category.name}</span>
              <ArrowRight className="text-gray-600" size={30} />
            </div>
          ))}

          {categories.length > 0 && (
            <>
              <div
                key={categories.length}
                className="hidden md:flex bg-gray-200 rounded-lg col-span-2 p-4 w-full h-[5rem] flex items-center justify-between"
              >
                <span className="text-gray-800 font-medium">All Products</span>
                <ArrowRight className="text-gray-600" size={30} />
              </div>
              <div
                key={categories.length + 1}
                className="bg-gray-200 rounded-lg p-4 w-full h-[5rem] flex items-center justify-between"
              >
                <span className="text-gray-800 font-medium">{categories[categories.length - 1].name}</span>
                <ArrowRight className="text-gray-600" size={30} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
