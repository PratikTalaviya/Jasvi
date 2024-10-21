import React, { useState, useEffect } from "react";
import { CategoriesHome } from "../../https/axios";
import Homeproduct from "../Product/Homeproduct";
import Blog from "./Blog";
import BottomBanner from "./BottomBanner";
import CategoryBanner from "./CategoryBanner";
import CenterBanner from "./CenterBanner";
import Customerreview from "./Customerreview";
import ImageBanner from "./ImageBanner";
import LeftBanner from "./LeftBanner";
import MainBanner from "./MainBanner";
import ProductBanner from "./ProductBanner";
import ServiceBanner from "./ServiceBanner";
import SpecialBanner from "./SpecialBanner";
import TopBanner from "./TopBanner";
import ProductSlider from "../Product/ProductSlider";
import CategorySection from "../CategorySection";

const AllBanner = () => {
  return (
    <div>
      <MainBanner />
      <ProductSlider title={"Best Seller"} />
      <CategorySection />
      {/* <Homeproduct /> */}
      {/* <CenterBanner /> */}
      {/* <ImageBanner /> */}
      {/* <CategoryBanner /> */}
      {/* <LeftBanner />
      <ProductBanner /> */}
      {/* <ServiceBanner /> */}
      {/* <TopBanner /> */}
      <BottomBanner />
      {/* <SpecialBanner /> */}
      {/* <Customerreview /> */}
    </div>
  );
};

export default AllBanner;
