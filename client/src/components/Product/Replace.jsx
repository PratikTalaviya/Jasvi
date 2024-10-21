import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Cart, gallaryproduct, OrderHistory, reviewcount, SingleProducts, updateorder } from '../../https/axios';
import Header from '../Header';
import ReactImageMagnify from 'react-image-magnify';
import { toast } from 'react-toastify'
import Footer from '../Footer';
import ProductReview from './ProductReview';
import ButtonGroup from './ButtonGroup';
import ColorButton from './ColorButton';
const Replace = () => {
    const { id } = useParams();
    const nevigate = useNavigate()
    const dispatch = useDispatch();
    const [data, setData] = useState('')
    const [count, setCount] = useState(1);
    const [productreview, setProductreview] = useState('')
    const [size, setSize] = useState('')
    const [datasize, setDatasize] = useState('')
    const [values, setValues] = useState({});
    const [color, setcolor] = useState('')
    const [colordata, setColordata] = useState([])
    const [gallaryimg, setGallaryimg] = useState([])
    const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value })
    const [index, setIndex] = useState(0)
    const [imges, setImges] = useState(gallaryimg[0]);
    const [orderId, setOrderId] = useState("")
    const [productid, setProductid] = useState('')
    const [orderamount, setOrderamount] = useState('')
    const handleTab = async (index) => {
        var myimgs = gallaryimg[index].photo
        setImges(myimgs);
        setIndex(index)
    }
    // const sendcart = async () => {
    //     try {
    //         const usercart = await updateorder({ productid: data.id, size: size, color: color, orderId })
    //         if (usercart.data.Success === 1) {
    //             nevigate("/trackorder")
    //             toast("Order Update Successfully", { theme: "dark", type: "success" })
    //         } else {
    //             toast("Order Not Updated", { theme: "dark", type: "error" })
    //         }
    //     } catch (error) {
    //         
    //         toast("Try again", { theme: "dark", type: "error" })
    //     }
    // }

    useEffect(() => {
        async function orders() {
            const uorder = await OrderHistory()
            const orders = uorder.data.UserOrderlist
            const filter = orders.filter(item => item.id == id)
            setOrderamount(filter[0].amount)
            setProductid(filter[0].product_id)
            setOrderId(filter[0].id)
        }
        orders()
    }, [id])
    useEffect(() => {
        async function fetchcart() {
            const procart = await SingleProducts({ productid })
            setData(procart.data.ProductsDetails[0])
            setDatasize(procart.data.ProductsDetails[0].size.split(","))
            setColordata(procart.data.ProductsDetails[0].color.split(","))
        }
        fetchcart()
    }, [productid])

    useEffect(() => {
        async function fetchcart() {
            const gallary = await gallaryproduct({})
            const data = gallary.data.SearchProduct
            const filter = data.filter(item => item.item_id == productid)
            setGallaryimg(filter)
        }
        fetchcart()
    }, [productid])
    useEffect(() => {
        async function fetchcart() {
            const reviews = await reviewcount({ itemid: id })
            setProductreview(reviews.data.CountReviews)
        }
        fetchcart()
    }, [])

    const printButtonLabel = (event) => {
        setSize(event.target.name)
    };
    const printColorButtonLabel = (event) => {
        setcolor(event.target.name)
    };

    return (
        <>
            <Header />
            <div className="container">
                <ul className="breadcrumb">
                    <li>
                        <a href="#" className="bread-des"><i className="fa fa-home"></i></a>
                    </li>
                    <li>
                        <a href="#"> Pure Kerala Kasavu Handloom Cotton Saree in Cream</a>
                    </li>
                </ul>
            </div>
            <div class="row d-flex align-items-start order-1 order-md-0">
                <div id="product-page" className="container">
                    <div className="row d-flex align-items-start order-1 order-md-0">
                        <div className="col-6 ">
                            <div className="fluid__image-container">
                                {
                                    imges ?
                                        <ReactImageMagnify {...{
                                            smallImage: {
                                                alt: 'Wristwatch by Ted Baker London',
                                                isFluidWidth: true,
                                                src: imges,
                                            },
                                            largeImage: {
                                                src: imges,
                                                width: 1200,
                                                height: 1800
                                            },
                                            shouldUsePositiveSpaceLens: true
                                        }} />
                                        :
                                        <ReactImageMagnify {...{
                                            smallImage: {
                                                alt: 'Wristwatch by Ted Baker London',
                                                isFluidWidth: true,
                                                src: gallaryimg[0]?.photo,
                                            },
                                            largeImage: {
                                                src: gallaryimg[0]?.photo,
                                                width: 1200,
                                                height: 1800
                                            },
                                            shouldUsePositiveSpaceLens: true
                                        }} />
                                }
                            </div>
                            <div className="zoom-thumb left_1">

                                <div id="gallery" className="mt-3 d-flex">
                                    {
                                        gallaryimg && gallaryimg.map((data, index) =>
                                            <div className="item text-center">
                                                <a href="#" className="card">
                                                    <img src={`${data.photo}`} key={index} onClick={() => handleTab(index)} className="img-fluid img-src" id="imagechange"
                                                        alt="Festive Favorites" draggable="false" />
                                                </a>
                                            </div>

                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-6 ">
                            <div className="col-lg-6 col-md-6 col-xs-12 pro-content">
                                <h1>{data.name}</h1>
                                <div className="producthr pt-2 mt-3"></div>
                                <div className="rating">

                                    <li className="proreview d-inline-block">
                                        <a id="ratecount" href="/tab-review" onClick="">{productreview} reviews</a>
                                    </li>
                                    <li className="d-inline-block">
                                        <a id="ratep" href="/tab-review" onClick="">Write a review</a>
                                    </li>
                                </div>
                                <div className="producthr pt-3 d-block"></div>
                                <div className="pro_count product-price">
                                    <ul className="list-unstyled d-flex align-items-end">
                                        <li className="text-decor-bold">
                                            <h2 className="price-new">₹ {orderamount}</h2>
                                        </li>
                                        {/* <li data-update="" className="price-old ps-2">
                                        <span>₹ {(data.previous_price * count)}</span>
                                    </li> */}
                                    </ul>
                                </div>
                                <div className="color-size">
                                    <div className="color mt-3">
                                        <span>Color :</span>
                                        <div className="color-code d-flex align-items-center">
                                            <ColorButton
                                                productid={id}
                                                colors={colordata}
                                                doSomethingAfterClick={printColorButtonLabel}
                                            />

                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        {/* <span>Stock: {data.stock}</span> */}
                                    </div>
                                    <div className="size mt-3">
                                        <span className="mb-2">Size :</span>
                                        <div className="color-code d-flex align-items-center">
                                            <ButtonGroup
                                                productid={id}
                                                sizebtn={datasize}
                                                doSomethingAfterClick={printButtonLabel}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="add-cart qty-name">
                                    {/* <a onClick={sendcart} className="cart-btn pro-btn text-center">
                                    Update Order
                                </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-tab mt-5">
                        <div className="tab-content">
                            <h5>Description</h5>
                            <div className="tab-pane" id="tab-description">
                                <p className="mb-0">{data.details}</p>
                            </div>
                            <h5>Specification</h5>
                            <div className="tab-pane" id="tab-specification">
                                {data.sort_details}

                            </div>
                            {/* <h5 id="tab-review">Reviews (0)</h5> */}
                            {/* <ProductReview productid={data.id} /> */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default Replace