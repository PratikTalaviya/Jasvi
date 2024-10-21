import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick";

const Blog = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        swipeToSlide: true,
        autoplaySpeed: 2500,
        autoplay: true,
        arrows: false,
        dots: true,
    };
    return (
        <div className="blog">
            <div className="container">
                <div className="head-text text-center">
                    <h2 className="heading text-center">
                        <span>#myfashionuutsav</span>
                    </h2>
                    <p>Show us how you celebrate with utsav and get featured. We are celebrating your love for Indian
                        Fashion Follow us & get a <strong>₹500 Off Coupon.</strong> To claim, message us on Instagram!</p>
                </div>
                <div className="webi-blog">
                    <div className="blog-slider">
                        <Slider {...settings}>
                            <div className="item paddingright">
                                <div className="pro-img text-center">
                                    <div className="blog-left">
                                        <div className="webi-blog-img">
                                            <Link to="/bloginfo">
                                                <img src="./image/blog/blog-1.jpg" className="w-100 img-fluid" alt="Blog"
                                                    draggable="false" />
                                            </Link>
                                            <div className="webi-post-hover">
                                                <div className="blog-ic">
                                                    <Link to="/bloginfo">
                                                        <i className="fa-brands fa-instagram"></i>
                                                    </Link>
                                                    <span>shop this look</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item paddingright">
                                <div className="pro-img text-center">
                                    <div className="blog-left">
                                        <div className="webi-blog-img">
                                            <Link to="/bloginfo">
                                                <img src="./image/blog/blog-2.jpg" className="w-100 img-fluid" alt="Blog"
                                                    draggable="false" />
                                            </Link>
                                            <div className="webi-post-hover">
                                                <div className="blog-ic">
                                                    <Link to="/bloginfo">
                                                        <i className="fa-brands fa-instagram"></i>
                                                    </Link>
                                                    <span>Morbi vel risus</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item paddingright">
                                <div className="pro-img text-center">
                                    <div className="blog-left">
                                        <div className="webi-blog-img">
                                            <Link to="/bloginfo">
                                                <img src="./image/blog/blog-3.jpg" className="w-100 img-fluid" alt="Blog"
                                                    draggable="false" />
                                            </Link>
                                            <div className="webi-post-hover">
                                                <div className="blog-ic">
                                                    <Link to="/bloginfo">
                                                        <i className="fa-brands fa-instagram"></i>
                                                    </Link>
                                                    <span>Pellentesque non</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item paddingright">
                                <div className="pro-img text-center">
                                    <div className="blog-left">
                                        <div className="webi-blog-img">
                                            <Link to="/bloginfo">
                                                <img src="./image/blog/blog-4.jpg" className="w-100 img-fluid" alt="Blog"
                                                    draggable="false" />
                                            </Link>
                                            <div className="webi-post-hover">
                                                <div className="blog-ic">
                                                    <Link to="/bloginfo">
                                                        <i className="fa-brands fa-instagram"></i>
                                                    </Link>
                                                    <span>malesuada dapibus</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item paddingright">
                                <div className="pro-img text-center">
                                    <div className="blog-left">
                                        <div className="webi-blog-img">
                                            <Link to="/bloginfo">
                                                <img src="./image/blog/blog-5.jpg" className="w-100 img-fluid" alt="Blog"
                                                    draggable="false" />
                                            </Link>
                                            <div className="webi-post-hover">
                                                <div className="blog-ic">
                                                    <Link to="/bloginfo">
                                                        <i className="fa-brands fa-instagram"></i>
                                                    </Link>
                                                    <span>Sed viverra hendrerit</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog
