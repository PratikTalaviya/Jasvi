import React from "react";
import AllBanner from "../components/Banner/AllBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Homeproduct from "../components/Product/Homeproduct";
import ProductSlider from "../components/Product/ProductSlider";
import ProductDisplay from "../components/Product/ProductDisplay";
import CategorySection from "../components/CategorySection";

const Home = () => {
  return (
    <>
      <AllBanner />
      <ProductDisplay />
      <ProductSlider title={"Influencers Choice"} />
      <Footer />
    </>
  );
};

export default Home;
