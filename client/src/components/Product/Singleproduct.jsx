import React, { useState, useEffect, useRef } from "react";
import Footer from "../Footer";
import {
  gallaryproduct,
  gallaryproductcolor,
  Products,
  reviewcount,
  SingleProducts,
  WishList,
} from "../../https/axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductReview from "./ProductReview";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import "../../App.css";
import Header from "../Header";
import ColorButton from "./ColorButton";
import ButtonGroup from "./ButtonGroup";
import { add, remove } from "../../redux/Slice/cartSlice";

const Singleproduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [data, setData] = useState("");
  const [count, setCount] = useState(1);
  const [productreview, setProductreview] = useState(0);
  const [size, setSize] = useState("");
  console.log("🚀 ~ file: Singleproduct.jsx:31 ~ Singleproduct ~ size", size === "");
  const [datasize, setDatasize] = useState([]);
  console.log("🚀 ~ file: Singleproduct.jsx:33 ~ Singleproduct ~ datasize", datasize);
  const [values, setValues] = useState({});
  const [color, setcolor] = useState("");
  const [colordata, setColordata] = useState([]);
  const [gallaryimg, setGallaryimg] = useState([]);
  const [gallaryimgdata, setGallaryimgdata] = useState([]);
  const [index, setIndex] = useState(0);
  const [imges, setImges] = useState([]);
  const [similarproduct, setSimilarproduct] = useState([]);
  const [sortDiscription, setSortDiscription] = useState("");
  const [currency, setCurrency] = useState(JSON.parse(localStorage.getItem("currency")) || "");

  const [custometeching, setCustometeching] = useState("none");
  const [techingsize, setTechingsize] = useState("");

  const sendcart = async (product) => {
    try {
      const cartsdaata = JSON.parse(localStorage.getItem("persist:root"));
      const mycartdatacheck = JSON.parse(cartsdaata.cart);
      const exist = mycartdatacheck.filter((item) => item.id === id + color + size);

      if (datasize.length === 0) {
        if (color === "") {
          const exist = mycartdatacheck.filter((item) => item.id === id + gallaryimg[0].color + size);
          if (exist.length === 0) {
            dispatch(
              add({
                id: id + gallaryimg[0].color + size,
                products: product,
                quantity: count,
                color: gallaryimg[0].color,
                size: size,
                customizeteching:
                  custometeching === "none" ? "none" : { custometeching: custometeching, techingsize: techingsize },
              })
            );
            toast("Add to cart successfully", { theme: "dark", type: "success" });
          } else {
            toast("This Product already added", { theme: "dark", type: "error" });
          }
        } else {
          const exist = mycartdatacheck.filter((item) => item.id === id + color + size);
          if (exist.length === 0) {
            dispatch(
              add({
                id: id + color + size,
                products: product,
                quantity: count,
                color: color,
                size: size,
                customizeteching: custometeching === "none" ? "none" : { custometeching: techingsize },
              })
            );
            toast("Add to cart successfully", { theme: "dark", type: "success" });
          } else {
            toast("This Product already added", { theme: "dark", type: "error" });
          }
        }
      } else {
        if (size === "") {
          toast("Please select size", { theme: "dark", type: "error" });
        } else {
          if (color === "") {
            const exist = mycartdatacheck.filter((item) => item.id === id + gallaryimg[0].color + size);
            if (exist.length === 0) {
              dispatch(
                add({
                  id: id + gallaryimg[0].color + size,
                  products: product,
                  quantity: count,
                  color: gallaryimg[0].color,
                  size: size,
                  customizeteching:
                    custometeching === "none" ? "none" : { custometeching: custometeching, techingsize: techingsize },
                })
              );
              toast("Add to cart successfully", { theme: "dark", type: "success" });
            } else {
              toast("This Product already added", { theme: "dark", type: "error" });
            }
          } else {
            const exist = mycartdatacheck.filter((item) => item.id === id + color + size);
            if (exist.length === 0) {
              dispatch(
                add({
                  id: id + color + size,
                  products: product,
                  quantity: count,
                  color: color,
                  size: size,
                  customizeteching: custometeching === "none" ? "none" : { custometeching: techingsize },
                })
              );
              toast("Add to cart successfully", { theme: "dark", type: "success" });
            } else {
              toast("This Product already added", { theme: "dark", type: "error" });
            }
          }
        }
      }
    } catch (error) {
      toast("This Product already added", { theme: "dark", type: "error" });
    }
  };

  const sendbuynow = async (product) => {
    try {
      const cartsdaata = JSON.parse(localStorage.getItem("persist:root"));
      const mycartdatacheck = JSON.parse(cartsdaata.cart);
      // const exist = mycartdatacheck.filter((item) => item.id === id + color + size)
      if (datasize.length === 0) {
        if (color === "") {
          const exist = mycartdatacheck.filter((item) => item.id === id + gallaryimg[0].color + size);
          if (exist.length === 0) {
            dispatch(
              add({
                id: id + gallaryimg[0].color + size,
                products: product,
                quantity: count,
                color: gallaryimg[0].color,
                size: size,
                customizeteching:
                  custometeching === "none" ? "none" : { custometeching: custometeching, techingsize: techingsize },
              })
            );
            toast("Buy now successfully", { theme: "dark", type: "success" });
            nevigate("/payment/payselect");
          } else {
            dispatch(remove(product));
            nevigate("/payment/payselect");
            toast("Buy now successfully", { theme: "dark", type: "success" });
          }
        } else {
          const exist = mycartdatacheck.filter((item) => item.id === id + color + size);
          if (exist.length === 0) {
            dispatch(
              add({
                id: id + color + size,
                products: product,
                quantity: count,
                color: color,
                size: size,
                customizeteching:
                  custometeching === "none" ? "none" : { custometeching: custometeching, techingsize: techingsize },
              })
            );
            nevigate("/payment/payselect");
            toast("Buy now successfully", { theme: "dark", type: "success" });
          } else {
            dispatch(remove(product));
            nevigate("/payment/payselect");
            toast("Buy now successfully", { theme: "dark", type: "success" });
          }
        }
      } else {
        if (size === "") {
          toast("Please select size", { theme: "dark", type: "error" });
        } else {
          if (color === "") {
            const exist = mycartdatacheck.filter((item) => item.id === id + gallaryimg[0].color + size);
            if (exist.length === 0) {
              dispatch(
                add({
                  id: id + gallaryimg[0].color + size,
                  products: product,
                  quantity: count,
                  color: gallaryimg[0].color,
                  size: size,
                  customizeteching:
                    custometeching === "none" ? "none" : { custometeching: custometeching, techingsize: techingsize },
                })
              );
              toast("Buy now successfully", { theme: "dark", type: "success" });
              nevigate("/payment/payselect");
            } else {
              dispatch(remove(product));
              nevigate("/payment/payselect");
              toast("Buy now successfully", { theme: "dark", type: "success" });
            }
          } else {
            const exist = mycartdatacheck.filter((item) => item.id === id + color + size);
            if (exist.length === 0) {
              dispatch(
                add({
                  id: id + color + size,
                  products: product,
                  quantity: count,
                  color: color,
                  size: size,
                  customizeteching:
                    custometeching === "none" ? "none" : { custometeching: custometeching, techingsize: techingsize },
                })
              );
              nevigate("/payment/payselect");
              toast("Buy now successfully", { theme: "dark", type: "success" });
            } else {
              dispatch(remove(product));
              nevigate("/payment/payselect");
              toast("Buy now successfully", { theme: "dark", type: "success" });
            }
          }
        }
      }
    } catch (error) {
      toast("This Product already added", { theme: "dark", type: "error" });
    }
  };

  useEffect(() => {
    async function fetchcart() {
      const procart = await SingleProducts({ productid: id });
      console.log("🚀 ~ file: Singleproduct.jsx:109 ~ fetchcart ~ procart", procart);
      setData(procart.data.ProductsDetails);
      const sizetrue = procart.data.ProductsDetails.size;
      if (sizetrue === "") {
        setDatasize([]);
      } else {
        setDatasize(sizetrue.split(","));
      }
      setColordata(procart.data.ProductsDetails.color.split(","));
    }
    fetchcart();
  }, [id]);

  useEffect(() => {
    async function fetchcart() {
      setSortDiscription({ __html: data.sort_details });
    }
    fetchcart();
  }, [data]);

  useEffect(() => {
    async function fetchcart() {
      const gallary = await gallaryproduct({ item_id: id });
      setGallaryimg(gallary.data.SearchProduct);
    }
    fetchcart();
  }, [id]);

  useEffect(() => {
    async function fetchcart() {
      const reviews = await reviewcount({ item_id: id });
      const reviewsdata = reviews?.data?.CountReviews;
      let totalreview = 0;
      reviewsdata.forEach((data) => {
        totalreview = totalreview + data?.rating;
      });
      if (totalreview === 0) {
        setProductreview(0);
      } else {
        setProductreview((totalreview / reviewsdata.length).toFixed(1));
      }
    }
    fetchcart();
  }, []);

  const increment = () => {
    setCount(parseInt(count) + parseInt(1));
  };
  const decrement = () => {
    if (count > 1) {
      setCount(parseInt(count) - parseInt(1));
    }
  };
  const printButtonLabel = (event) => {
    setSize(event.target.name ? event.target.name : datasize[0]);
  };
  const printColorButtonLabel = (event) => {
    setcolor(event.target.name);
  };

  useEffect(() => {
    async function getdata() {
      if (color === "") {
        const data = await gallaryproductcolor({ productid: id, color: gallaryimg[0]?.color });
        setGallaryimgdata(data?.data?.SearchProduct[0]?.photo);
        setImges(data?.data?.SearchProduct[0]?.photo[0]);
      } else {
        const data = await gallaryproductcolor({ productid: id, color: color });
        setGallaryimgdata(data?.data?.SearchProduct[0]?.photo);
        setImges(data?.data?.SearchProduct[0]?.photo[0]);
      }
    }
    getdata();
  }, [id, gallaryimg, color]);

  const handleTab = async (index) => {
    var myimgs = gallaryimgdata[index];
    setImges(myimgs);
    setIndex(index);
  };

  useEffect(() => {
    async function fetchproduct() {
      const showproduct = await Products();
      const pagedata = showproduct.data.ProductsList;
      const filter = pagedata.filter((item) => item.subcategory_id === data.subcategory_id);
      setSimilarproduct(filter);
    }
    fetchproduct();
  }, [data]);

  const sendwish = async (id) => {
    try {
      const userwish = await WishList({ productid: id });
      if (userwish) {
        toast("Product Added To Wishlist", { theme: "dark", type: "success" });
      }
    } catch (error) {
      toast("Something went wrong", { theme: "dark", type: "error" });
    }
  };

  const techingdata = async (e) => {
    const value = e.target.value;
    setTechingsize(value);
  };

  const settings = {
    rows: 1,
    infinite: true,
    lazyLoad: true,
    speed: 2000,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <ul className="breadcrumb">
          <li>
            <a className="bread-des">
              <i className="fa fa-home"></i>
            </a>
          </li>
          <li>
            <a>{data.title}</a>
          </li>
        </ul>
      </div>
      <div id="product-page" className="container">
        <div className="row d-flex align-items-start order-1 order-md-0">
          <div className="col-md-6 col-sm-12">
            <div className="fluid__image-container cusMaxHgt">
              {imges ? (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: imges,
                    },
                    largeImage: {
                      src: imges,
                      width: 1200,
                      height: 1800,
                    },
                    shouldUsePositiveSpaceLens: true,
                  }}
                />
              ) : (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: gallaryimgdata[0],
                    },
                    largeImage: {
                      src: gallaryimgdata[0],
                      width: 1200,
                      height: 1800,
                    },
                    shouldUsePositiveSpaceLens: true,
                  }}
                />
              )}
            </div>
            <div className="zoom-thumb left_1">
              <div id="gallery" className="mt-3 d-flex justify-content-center">
                {gallaryimgdata &&
                  gallaryimgdata.map((data, index) => (
                    <div className="item text-center">
                      <a className="card">
                        <img
                          src={`${data}`}
                          key={index}
                          onClick={() => handleTab(index)}
                          className="img-fluid img-src"
                          id="imagechange"
                          alt="Festive Favorites"
                          draggable="false"
                        />
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 pro-content">
            {/* <div className="col-lg-6 col-xs-12 "> */}
            <h1>{data.title}</h1>
            <div className="producthr mt-3"></div>
            <ul className="rating d-flex justify-content-start align-items-center py-2">
              <li className="d-inline-block">
                <a id="ratecount" href="/tab-review" onClick="">
                  {productreview}
                  <span> reviews</span>
                </a>
              </li>
              <li className=" mx-3">|</li>
              <li className="d-inline-block">
                <a id="ratep" href="/tab-review" onClick="">
                  Write a review
                </a>
              </li>
            </ul>
            <div className="producthr mb-3 d-block"></div>

            {currency === "INR" ? (
              <div className="pro_count product-price">
                <ul className="list-unstyled d-flex align-items-end">
                  <li className="text-decor-bold">
                    <h2 className="price-new">₹ {data.In_price * count}</h2>
                  </li>
                  <li data-update="" className="price-old ps-2">
                    <span>₹ {data.In_price * 2 * count}</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="pro_count product-price">
                <ul className="list-unstyled d-flex align-items-end">
                  <li className="text-decor-bold">
                    <h1 className="price-new">$ {data.outIn_price * count}</h1>
                  </li>
                  <li data-update="" className="price-old ps-2">
                    <span>$ {data.outIn_price * 2 * count}</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="color-size">
              <div className="color mt-3">
                <span className="fw-bold proHeadsize">Color :</span>
                <div className="d-flex align-items-center">
                  <ColorButton productid={id} colors={gallaryimg} doSomethingAfterClick={printColorButtonLabel} />
                </div>
              </div>
              <div className="mt-3">{/* <span>Stock: {data.stock}</span> */}</div>

              {data.size ? (
                <div className="size mt-3">
                  <span className="mb-2 fw-bold proHeadsize">Size :</span>
                  <div className="d-flex align-items-center">
                    <ButtonGroup productid={id} sizebtn={datasize} doSomethingAfterClick={printButtonLabel} />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="d-flex justify-content-start align-items-center procounter my-4">
              <a className="proMinus" onClick={(e) => decrement(e.target.value)}>
                -
              </a>
              <div className="proNumber">{count}</div>
              <a className="proPlus" onClick={(e) => increment(e.target.value)}>
                +
              </a>
            </div>

            {data.customStaching === true ? (
              <div className="mt-3">
                <h5 className="mb-2 fw-bold">Tailoring Services: Blouse</h5>
                <div>
                  <input
                    type="radio"
                    onClick={(e) => setCustometeching(e.target.value)}
                    id="age1"
                    name="age"
                    value="none"
                    checked={custometeching === "none" ? true : false}
                  />

                  <label htmlFor="age1" className="ps-2">
                    Unstitched Fabric + ₹0.00
                  </label>
                </div>
                <div>
                  <div>
                    <input
                      type="radio"
                      id="age3"
                      name="age"
                      value="Ready to Wear"
                      onClick={(e) => setCustometeching(e.target.value)}
                    />

                    <label htmlFor="age3" className="ps-2">
                      Ready to Wear + ₹1000.00
                    </label>
                  </div>
                  {custometeching === "Ready to Wear" ? (
                    <>
                      <div className="tailorpad">
                        <select name="blousesize" className="w-25 dropdrop" onChange={techingdata}>
                          <option value="28">28" blouse size</option>
                          <option value="30">30" blouse size</option>
                          <option value="32">32" blouse size</option>
                          <option value="34">34" blouse size</option>
                          <option value="36">36" blouse size</option>
                          <option value="38">38" blouse size</option>
                          <option value="40">40" blouse size</option>
                        </select>
                      </div>
                      <div className="tailorpad">
                        <a className="linkDesign me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                          Size Chart
                        </a>

                        <a className="linkDesign" data-bs-toggle="modal" data-bs-target="#exampleModaltwo">
                          How To Measure
                        </a>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* <!-- START Modal --> */}
            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Size Chart
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div className="modal-body">
                    <div>
                      <div className="modalhead text-center">
                        Garment measurement shown may have tolerance of 0.5 inch to 1 inch.
                      </div>
                    </div>

                    <div className="d-flex justify-content-center my-2">
                      <div className="bhgu">
                        <input type="radio" id="html" name="fav_language" value="HTML" checked="checked" />

                        <label htmlFor="html" className="ps-2">
                          Size in cm
                        </label>
                      </div>
                      <div className="bhgu ms-2">
                        <input type="radio" id="css" name="fav_language" value="CSS" />
                        <label htmlFor="css" className="ps-2">
                          Size in inches
                        </label>
                      </div>
                    </div>

                    <div className="custblHgt">
                      <table className="table mt-3">
                        <thead className="table-dark">
                          <tr>
                            <th>Size</th>
                            <th>Bust</th>
                            <th>Around Above Waist</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>71.12</td>
                            <td>55.88</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* <div className="modal-footer d-flex flex-lg-nowrap">
                    <button type="button" className="btn btn-secondary w-100 w-lg-50" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary w-100 w-lg-50">Save changes</button>
                  </div> */}
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="exampleModaltwo"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Size Chart
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div className="modal-body">
                    <div className="d-flex justify-content-center">
                      <img src="/image/mesurement.webp" alt="How to Measure Saree Blouse" />
                    </div>

                    <div className="measurement">Important Notes while taking measurement:</div>
                    <div className="measurementcontent mt-2">
                      1. Please follow the instructions below to get your exact body size and then compare it to our
                      body measurement chart to see which size fits you best.
                      <br />
                      <div className="my-2">2. Keep Measurement tape firm, but not tight.</div>
                      <div className="mb-2">3. Ask someone to assist you while taking measurement.</div>
                      <div className="mb-2">
                        <span className="fw-bold">Bust:</span> Measure the fullest part of your bust while keeping the
                        measurement tape a bit loose.
                      </div>
                      <div className="mb-2">
                        <span className="fw-bold">Around Above Waist:</span> Measure it between the ribcage &amp; above
                        the navel or at 15 inches from the shoulder point.
                      </div>
                      <div className="mb-2">
                        <span className="fw-bold">Blouse Length:</span> measure length from the shoulder point to your
                        desired length like shown in the image
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- END Modal --> */}

            <div className="d-flex my-2 w-100 mt-3">
              <a onClick={() => sendcart(data)} className=" add-cartis w-100 text-center">
                Add to cart
              </a>
            </div>
            <div className="d-flex my-2 w-100">
              <a onClick={() => sendbuynow(data)} className=" add-cartis w-100 text-center">
                Buy Now
              </a>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="product-tab mt-5">
          <div className="tab-content">
            <h5>Specification</h5>
            <div className="tab-pane" id="tab-specification">
              <div dangerouslySetInnerHTML={{ __html: data?.sort_details }} className="px-3" />
            </div>

            <div className="product">
              <div className="container">
                <Slider {...settings}>
                  {similarproduct &&
                    similarproduct.map((data, idx) => {
                      return (
                        // <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                        <a href={`/product/${data.title}/${data._id}`}>
                          <div className="item paddingright">
                            <div className="pro-img text-left p-2">
                              <a>
                                <img
                                  className="w-100 img-fluid homeproimg"
                                  src={`${data.photo}`}
                                  alt="product"
                                  draggable="false"
                                />
                              </a>
                              <div className="caption">
                                <h4 className="text-center">{data.title} </h4>
                                {currency === "INR" ? (
                                  <div className="price text-center">
                                    <span className="old-price text-center">₹{data.In_price * 2}</span>
                                    <span className="new-price text-center">₹{data.In_price}</span>
                                  </div>
                                ) : (
                                  <div className="price text-center">
                                    <span className="old-price text-center">${data.outIn_price * 2}</span>
                                    <span className="new-price text-center">${data.outIn_price}</span>
                                  </div>
                                )}
                                <div className="button-group">
                                  <a
                                    href={`/product/${data.title}/${data._id}`}
                                    className="quickview pro-btn text-center"
                                  >
                                    <svg>
                                      <path d="M12 16q1.875 0 3.188-1.312Q16.5 13.375 16.5 11.5q0-1.875-1.312-3.188Q13.875 7 12 7q-1.875 0-3.188 1.312Q7.5 9.625 7.5 11.5q0 1.875 1.312 3.188Q10.125 16 12 16Zm0-1.925q-1.075 0-1.825-.75t-.75-1.825q0-1.075.75-1.825T12 8.925q1.075 0 1.825.75t.75 1.825q0 1.075-.75 1.825t-1.825.75Zm0 5.1q-3.725 0-6.762-2.088Q2.2 15 .825 11.5 2.2 8 5.238 5.912 8.275 3.825 12 3.825q3.725 0 6.763 2.087Q21.8 8 23.175 11.5 21.8 15 18.763 17.087 15.725 19.175 12 19.175Zm0-7.675Zm0 5.5q2.825 0 5.175-1.488 2.35-1.487 3.6-4.012-1.25-2.525-3.6-4.013Q14.825 6 12 6 9.175 6 6.825 7.487q-2.35 1.488-3.6 4.013 1.25 2.525 3.6 4.012Q9.175 17 12 17Z" />
                                    </svg>
                                    <span className="d-none ms-2">Quickview</span>
                                  </a>
                                  <a onClick={() => sendwish(data.id)} className="wishlist pro-btn text-center">
                                    <svg>
                                      <path d="m12 21.275-1.6-1.425q-2.55-2.3-4.212-3.963Q4.525 14.225 3.55 12.9q-.975-1.325-1.362-2.45Q1.8 9.325 1.8 8.15q0-2.45 1.625-4.075T7.5 2.45q1.3 0 2.463.525 1.162.525 2.037 1.5.85-.975 2.025-1.5Q15.2 2.45 16.5 2.45q2.425 0 4.062 1.625Q22.2 5.7 22.2 8.15q0 1.175-.388 2.288-.387 1.112-1.362 2.437-.975 1.325-2.65 3-1.675 1.675-4.225 3.975Zm0-3.075q2.375-2.15 3.925-3.663 1.55-1.512 2.438-2.65.887-1.137 1.224-2.012.338-.875.338-1.725 0-1.475-.975-2.45-.975-.975-2.45-.975-1.15 0-2.137.662-.988.663-1.363 1.688h-2q-.375-1.025-1.363-1.688-.987-.662-2.137-.662-1.475 0-2.45.975-.975.975-.975 2.45 0 .875.35 1.75t1.238 2q.887 1.125 2.425 2.65Q9.625 16.075 12 18.2Zm0-6.725Z" />
                                    </svg>
                                    <span className="d-none ms-2">Wishlist</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                        //    </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
            <h5 id="tab-review">Reviews (0)</h5>
            <ProductReview productid={id} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Singleproduct;
