import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const AboutUs = () => {
    return (
        <>
            <Header />
            <div className="about-us">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/" className="bread-des"><i className="fa fa-home"></i></Link>
                        </li>
                        <li>
                            <a href="/aboutus">About Us</a>
                        </li>
                    </ul>
                    <h5 className="about-txt pb-3">about us</h5>
                    <p className="mt-3 mb-0">The journey of Shivansh Fab began in the year 2000 with the opening of our first wholesale and retail outlet in Gujarat, India. After the success of this store, Shivansh Fab launched its online store in 2003, never looking back since then. Today, it is the world's preferred choice for Indian Ethnic Fashion and sets new standards of customer delight every day.</p>
                    <div className="about-shop">
                        <h5 className="shop-txt text-center tbmrg">about our shop</h5>
                        <div className="row d-flex align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <img className="about-img img-fluid" src="./image/about-us/1.jpg" alt="Testimonial" draggable="false" />
                            </div>
                            <div className="col-lg-6 col-md-12 about-text about-headtxt">
                                <h6 className="shop-txt">WHAT’S SPECIAL </h6>
                                <p className="mt-4">Consumers find a product of interest by visiting the website of the retailer directly or by searching among alternative vendors using a shopping search engine. Users can compare and evaluate products using product information on the website, as well on other websites such as websites about product tests. </p>
                                <p className="mb-0">Online customers must have access to the Internet and a valid method of payment in order to complete a transaction. Generally, higher levels of education and personal income correspond to more favorable perceptions of shopping online. Increased exposure to technology also increases the probability of developing favorable attitudes towards new shopping channels..</p>
                            </div>
                        </div>
                    </div>
                    <div className="about-shop">
                        {/* <h5 className="shop-txt tbmrg text-center">about our shop</h5> */}
                        <div className="row d-flex align-items-center mt-5">
                            <div className="col-lg-6 col-md-12 about-text">
                                <h6 className="shop-txt">What We Do</h6>
                                <p className="mt-4">Although our business has evolved over the years, one constant is customers’ desire for lower prices, better selection, and convenient services. Today, Amazon shoppers can find what they’re looking for online and in person. From delivering fresh produce to their doorstep to creating and distributing movies, music, and more, we are always finding new ways to delight our customers. </p>
                                <p className="mb-0">We are proud to highlight the awards and recognition we have received across the region. Come and make history with us.</p>
                            </div>
                            <div className="col-lg-6 col-md-12 about-headimg">
                                <img className="about-img img-fluid" src="./image/about-us/4.jpg" alt="Testimonial" draggable="false" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs