import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AllProducts from "../components/Product/AllProducts";
import { Products } from "../https/axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const abc = async () => {
      const { data } = await Products();
      setProducts(data.ProductsList);
    };
    abc();
  }, []);
  return (
    <div>
      {/* <Header products={products} setFilteredData={setFilteredData} /> */}
      {products[0] ? (
        <>
          <section>
            {filteredData[0] ? (
              <AllProducts products={filteredData}></AllProducts>
            ) : (
              <AllProducts products={products}></AllProducts>
            )}
          </section>
        </>
      ) : (
        <>
          <div>Lodding</div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Product;
