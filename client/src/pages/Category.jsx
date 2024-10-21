import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Cart, ChildCategories, Products, ProductsAll, SubCategories, WishList } from "../https/axios";
import { toast } from "react-toastify";
import CategoryProduct from "../components/Product/CategoryProduct";
import FilterProduct from "../components/FilterProduct/FilterProduct";

const Category = () => {
  const params = useParams();
  const id = params.id;
  const location = useLocation();
  const [wish, setWish] = useState("");
  const [product, setProduct] = useState([]);
  const [childcategory, setChildcategory] = useState("");
  const [subcategory, setSubcategory] = useState();
  const [filter, setFilter] = useState([]);
  const cat = location.pathname.split("/")[2];
  const [filteredData, setFilteredData] = useState([]);
  const [sort, setSort] = useState([]);
  const [pricefilter, setPricefilter] = useState([]);
  const [sortbyprice, setSortbyprice] = useState([]);
  const [sortbycate, setSortbycate] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [filterbycolor, setFilterbycolor] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const dataproduct = await Products();
      const dataof = dataproduct.data.ProductsList;
      const filteredData = dataof.filter((item) => item.subcategory_id === id);
      setProduct(filteredData);
    }
    fetchdata();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      const subcategories = await SubCategories(id);
      const mysub = subcategories.data.SubCategoryList;
      const filteredData = mysub.filter((item) => item.id == id);
      setSubcategory(filteredData[0]?.Name);
    }
    fetchData();
  }, [id]);
  useEffect(() => {
    async function ferchData() {
      const childCategories = await ChildCategories({});
      const data = childCategories.data.ChildCategoryList;
      const childCategoriesStatus = childCategories.data.ChildCategoryList;
      const exitingData = childCategoriesStatus.filter(function (childCategoriesEnable) {
        return childCategoriesEnable.status == true;
      });
      const filter = exitingData.filter((item) => {
        return item.Name === subcategory;
      });
      setChildcategory(filter);
    }
    ferchData();
  }, [subcategory]);
  const filterbysortby = async (e) => {
    const value = e.target.value;
    setSort({
      ...filter,
      [e.target.name]: value,
    });
  };

  return (
    <>
      {/* <Header products={product} setFilteredData={setFilteredData} /> */}
      <div className="category mt-5">
        <div className="container">
          <div className="row align-items-start">
            <div id="column-left" className="col-lg-3 col-md-3">
              <FilterProduct
                products={product}
                childcategory={childcategory}
                filter={filter}
                setSortbycate={setSortbycate}
                setFilter={setFilter}
                sortbyprice={sortbyprice}
                setFilterbycolor={setFilterbycolor}
                setSortbyprice={setSortbyprice}
              />
            </div>
            <div id="column-right" className="col-lg-9 col-md-9 col-sm-12 row">
              <div className="cate-top d-flex justify-content-between">
                <div>
                  <h3>{subcategory}</h3>
                </div>
                {/* <div className="drop-menu"> */}
                <select name="sort" className="styleDrop py-2" onChange={filterbysortby}>
                  <option disabled selected>
                    Sort By:
                  </option>
                  <option>
                    <a className="dropdown-item">New Arrivals</a>
                  </option>
                  <option>
                    <a className="dropdown-item">Price: High to Low</a>
                  </option>
                  <option>
                    <a className="dropdown-item">Price: Low to High</a>
                  </option>
                  {/* <option><a className="dropdown-item" >Bestseller</a></option> */}
                </select>
                {/* </div> */}
              </div>
              {product[0] ? (
                <>
                  <section>
                    {filteredData[0] ? (
                      <CategoryProduct
                        cat={cat}
                        sort={sort}
                        product={filteredData}
                        sortbycate={sortbycate}
                        filter={filter}
                        sortbyprice={sortbyprice}
                        filterbycolor={filterbycolor}
                        setProduct={setProduct}
                        subcategory={id}
                      />
                    ) : (
                      <CategoryProduct
                        cat={cat}
                        sort={sort}
                        product={product}
                        sortbycate={sortbycate}
                        filter={filter}
                        sortbyprice={sortbyprice}
                        filterbycolor={filterbycolor}
                        setProduct={setProduct}
                        subcategory={id}
                      />
                    )}
                  </section>
                </>
              ) : (
                <>
                  <div className="thankyou mt-md-5 mt-3">
                    <div className="container">
                      <div className="thank-visit text-center">
                        <img
                          src="/image/ThankYou-Visit/Right.png"
                          className="img-circle"
                          alt="cart"
                          draggable="false"
                        />
                        <h1 className="visit mt-4">Out Of Stock</h1>
                        <Link to="/" className="btn btn-primary">
                          Go to Home
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
