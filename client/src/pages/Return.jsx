import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Return = () => {
    return (
        <>
            <Header/>
            <div className="track-order">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/" className="bread-des"><i className="fa fa-home"></i></Link>
                        </li>
                        <li>
                            <Link to="/" className="bread-des">Home</Link>
                        </li>
                        <li>
                            <a href="#">Return History</a>
                        </li>
                    </ul>
                    <h5 className="about-txt pb-3">Your Return Product</h5>

                    <div className="row mt-lg-4 mt-2">
                        <div className="col-md-8">
                            <div className="your-order">
                                <h5>your return order history</h5>
                                <div className="youroder-details your-order-active mt-3 d-flex align-items-center">
                                    <div className="pull-left">
                                        <a href="#">
                                            <img src="./image/product/1.jpg" alt="cart" className="img-circle" 
                                                draggable="false"/>
                                        </a>
                                    </div>
                                    <div className="cartname px-2">
                                        <a className="catpro-name">
                                            Pure Kerala Kasavu Handloom Cotton Saree in Cream
                                        </a>
                                        <span className="d-block">order id: 987456254</span>
                                        <span className="d-block">color: red</span>
                                        <span className="d-block">size: m</span>
                                        <span>quantity: 2</span>
                                    </div>
                                    <span className="order-price ms-auto">₹600.00</span>
                                </div>
                                <div className="youroder-details mt-3 d-flex align-items-center">
                                    <div className="pull-left">
                                        <img src="./image/product/2.jpg" className="img-circle" alt="cart" draggable="false"/>
                                    </div>
                                    <div className="cartname px-2">
                                        <a className="catpro-name">
                                            Woven South Cotton Saree in Teal Green
                                        </a>
                                        <span className="d-block">order id: 454612389</span>
                                        <span className="d-block">color: brown</span>
                                        <span className="d-block">size: s</span>
                                        <span>quantity: 1</span>
                                    </div>
                                    <span className="order-price ms-auto">₹355.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-4">
                            <div
                                className="dots d-flex flex-column justify-content-center align-items-start align-items-md-center text-center">
                                <div className="order-history">
                                    <span className="order-confirmed order-active">
                                        <i className="fa-sharp fa-solid fa-basket-shopping"></i>
                                    </span>
                                    <h4 className="return-date mt-2">12 aug</h4>
                                    <h6 className="mt-2">return pickup scheduled</h6>
                                </div>

                                <div className="order-line order-line-active my-3"></div>
                                <div className="order-history">
                                    <span className="order-confirmed order-active">
                                        <i className="fa-solid fa-truck-fast"></i>
                                    </span>
                                    <h4 className="return-date mt-2">13 aug</h4>
                                    <h6 className="mt-2">pickup</h6>
                                </div>

                                <div className="order-line my-3"></div>
                                <div className="order-history">
                                    <span className="order-confirmed">
                                        <i className="fa-solid fa-gears"></i>
                                    </span>
                                    <h4 className="return-date mt-2">16 aug</h4>
                                    <h6 className="mt-2">return initiated</h6>
                                </div>

                                <div className="order-line my-3"></div>
                                <div className="order-history">
                                    <span className="order-confirmed">
                                        <i className="fa-solid fa-credit-card"></i>
                                    </span>
                                    <h4 className="return-date mt-2">16 aug</h4>
                                    <h6 className="mt-2">refund creadied to your phone</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Return
