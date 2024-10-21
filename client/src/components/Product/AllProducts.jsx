import React, { useState, useEffect } from 'react'
import { Cart, ChildCategories, Products, ProductsAll, SubCategories, WishList } from '../../https/axios'
import { Link, useLocation } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate';
import CategoryProduct from './CategoryProduct'
import FilterProduct from '../FilterProduct/FilterProduct'

const AllProducts = ({ products, subcategory }) => {

  const { id } = useParams()
  const Per_page = 9;
  const [currentpage, setCurrentpage] = useState('')
  const [childcategory, setChildcategory] = useState('')
  const [filter, setFilter] = useState({})
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);
  const [allproduct, setAllproduct] = useState([])
  // const [productsize, setProductsize] = useState([])
  // const [productcolor, setProductcolor] = useState([])
  // const [productfabric, setProductfabric] = useState([])
  // const [productsleeves, setProductsleeves] = useState([])
  // const [productdiscount, setProductdiscount] = useState([])

  const [pricefilter, setPricefilter] = useState('')
  const [sort, setSort] = useState([])
  const [sortbyprice, setSortbyprice] = useState([])
  const [sortbycate, setSortbycate] = useState([])

  const handalclick = (data) => {
    let currentPage = data.selected;
    window.scrollTo(0, 0);
    setCurrentpage(currentPage)
  }

  const offset = currentpage * Per_page;
  const pagecount = Math.ceil(products.length / Per_page)


  useEffect(() => {
    async function ferchData() {
      const childCategories = await ChildCategories()
      setChildcategory(childCategories.data.ChildCategoryList)
    }
    ferchData()
  }, [])

  const sendcart = async (id) => {
    try {
      const usercart = await Cart({ productid: id })
      if (usercart) {
        toast("Add to cart successfully", { theme: "dark", type: "success" })
      }
    } catch (error) {
      toast("Something went wrong", { theme: "dark", type: "error" })
    }
  }


  const sendwish = async (id) => {
    try {
      const userwish = await WishList({ productid: id })
      if (userwish) {
        toast("Product Added To Wishlist", { theme: "dark", type: "success" })
      }
    } catch (error) {
      toast("Something went wrong", { theme: "dark", type: "error" })
    }
  }
  const filterdata = async (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value
    })
  }
  const filterbysortby = async (e) => {
    const value = e.target.value;
    setSort({
      ...filter,
      [e.target.name]: value,
    })
  }
  const filterpricedata = async (e) => {
    const value = e.target.value;
    setSortbyprice({
      ...filter,
      [e.target.name]: value,
    })
  };
  const filterchildcat = async (e) => {
    const value = e.target.value;
    setSortbycate({
      ...filter,
      [e.target.name]: value,
    })
  }

  useEffect(() => {
    async function ferchData() {
      const childCategories = await ChildCategories({});
      // const data = childCategories.data.ChildCategoryList;  
      // const filter = data.filter((item) => item.Name ===subcategory );
      setChildcategory(childCategories.data.ChildCategoryList);
    }
    ferchData();
  }, [subcategory]);
  // useEffect(() => {
  //   const unique = [...new Set(products.map(a => a.size))];
  //   const mystrings = unique.join();
  //   const arr = mystrings.split(',')
  //   let uniquedata = [...new Set(arr)]
  //   uniquedata = uniquedata.filter(item => item);
  //   setProductsize(uniquedata)
  // }, [products])


  // useEffect(() => {
  //   const unique = [...new Set(products.map(a => a.color))];
  //   const mystrings = unique.join();
  //   const arr = mystrings.split(',')
  //   let uniquedata = [...new Set(arr)]
  //   uniquedata = uniquedata.filter(item => item);
  //   setProductcolor(uniquedata)
  // }, [products])

  // useEffect(() => {
  //   const unique = [...new Set(products.map(a => a.fabric))];
  //   const mystrings = unique.join();
  //   const arr = mystrings.split(',')
  //   let uniquedata = [...new Set(arr)]
  //   uniquedata = uniquedata.filter(item => item);
  //   setProductfabric(uniquedata)
  // }, [products])
  // useEffect(() => {
  //   const unique = [...new Set(products.map(a => a.sleeves))];
  //   const mystrings = unique.join();
  //   const arr = mystrings.split(',')
  //   let uniquedata = [...new Set(arr)]
  //   uniquedata = uniquedata.filter(item => item);
  //   setProductsleeves(uniquedata)
  // }, [products])

  // useEffect(() => {
  //   const unique = [...new Set(products.map(a => a.discount_percentage))];
  //   const mystrings = unique.join();
  //   const arr = mystrings.split(',')
  //   let uniquedata = [...new Set(arr)]
  //   uniquedata = uniquedata.filter(item => item);
  //   setProductdiscount(uniquedata)
  // }, [products])
  return (
    <>
      <div className="category mt-5">
        <div className="container">
          <div className="row">
            <div id="column-right" className="col-lg-12 col-md-12 col-sm-12">
              <div className="cate-top d-flex justify-content-between">
                <div>
                  <h3>{subcategory}</h3>
                </div>
                <div className="drop-menu">
                  <select name="sort" className="filterbox py-2" onChange={filterbysortby} >
                    <option disabled selected>Sort By:</option>
                    <option><a className="dropdown-item" >New Arrivals</a></option>
                    <option><a className="dropdown-item" >Price: High to Low</a></option>
                    <option><a className="dropdown-item" >Price: Low to High</a></option>
                    {/* <option><a className="dropdown-item" >Bestseller</a></option> */}
                  </select>
                </div>
              </div>

              <div className="">
                {
                  products[0] ?
                    <>
                      <section>
                        {
                          filteredData[0] ?
                            <CategoryProduct product={filteredData} sort={sort} sortbycate={sortbycate} sortbyprice={sortbyprice} filter={filter} setProduct={setAllproduct} />
                            :
                            <CategoryProduct product={products} sort={sort} sortbycate={sortbycate} sortbyprice={sortbyprice} filter={filter} setProduct={setAllproduct} />

                        }
                      </section>
                    </>
                    : <>
                      <div className="thankyou mt-md-5 mt-3">
                        <div className="container">
                          <div className="thank-visit text-center">
                            <img src="/image/ThankYou-Visit/Right.png" className="img-circle" alt="cart" draggable="false" />
                            <h1 className="visit mt-4">Out Of Stock</h1>
                            {/* <Link to="/" className="btn btn-primary">Go to Home</Link> */}
                          </div>
                        </div>
                      </div>
                    </>
                }
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllProducts
