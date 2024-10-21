import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
const Customerreview = () => {
    const settings = {
		infinite: true,
		lazyLoad: true,
		speed: 300,
		slidesToShow: 3,
		autoplay: true,
		autoplaySpeed: 2500,
		centerMode: true,
		centerPadding: 0,
		arrows:false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
		
	};
    return (
        <div className="testimonial" id="customer">
        <div className="container">
            <h2 className="heading text-center">
                <span>Customer Reviews</span>
            </h2>
            <Slider {...settings}>
                <div className="item">
                    <div className="test-con text-center">
                        <ul>
                            <li>
                                <img className="img-responsive center-block timg img-fluid h-5 w-3" src="./image/testimonial/WhatsApp Image 2023-04-07 at 12.21.31.jpg"
                                    alt="Testimonial" style={{ width: 200, height: 200 ,borderRadius: 25 }} draggable="false"  />
                            </li>
                            <li>
                                <h2>Rashmika Mandanna</h2>
                                <h5>Actress</h5>
                            </li>
                            <div className="testi-content">
                                <div className="rating">
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                </div>
                                <p>Kurtis are a great way to incorporate traditional Indian fashion into your everyday wardrobe. They are perfect for those who want to add a touch of ethnicity to their style.</p>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="item">
                    <div className="test-con text-center">
                        <ul>
                            <li>
                                <img className="img-responsive center-block timg img-fluid" src="./image/testimonial/anu.jpg"
                                    alt="Testimonial" style={{ width: 200, height: 200 ,borderRadius: 25 }} draggable="false" />
                            </li>
                            <li>
                                <h2>Anushka Sharma</h2>
                                <h5>Actress</h5>
                            </li>
                            <div className="testi-content">
                                <div className="rating">
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-regular fa-star"></i></span>
                                </div>
                                <p>Kurtis are the perfect blend of comfort and style. They are so versatile and can be dressed up or down to suit any occasion. I love wearing stylish kurtis with statement jewelry and heels to create a chic look that is both effortless and elegant.</p>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="item">
                    <div className="test-con text-center">
                        <ul>
                            <li>
                                <img className="img-responsive center-block timg img-fluid" src="./image/testimonial/madhuri.jpg"
                                    alt="Testimonial" style={{ width: 200, height: 200 ,borderRadius: 25 }} draggable="false" />
                            </li>
                            <li>
                                <h2>Madhuri Dixit</h2>
                                <h5>Actress</h5>
                            </li>
                            <div className="testi-content">
                                <div className="rating">
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-regular fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-regular fa-star"></i></span>
                                </div>
                                <p>Thank you for letting me be a part of such a fantastic event! Being a volunteer for
                                    this race is much
                                    more than just work, it’s an unforgettable experience.</p>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="item">
                    <div className="test-con text-center">
                        <ul>
                            <li>
                                <img className="img-responsive center-block timg img-fluid" src="./image/testimonial/dipika.jpg"
                                    alt="Testimonial" style={{ width: 200, height: 200 ,borderRadius: 25 }}  draggable="false" />
                            </li>
                            <li>
                                <h2>Dipika Padukone</h2>
                                <h5>Actress</h5>
                            </li>
                            <div className="testi-content">
                                <div className="rating">
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-regular fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-regular fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-regular fa-star"></i></span>
                                </div>
                                <p>Sarees are one of the most beautiful and graceful outfits that a woman can wear. I love how they can be styled in so many different ways to suit various occasions. Sarees are not just a piece of clothing, they are a symbol of our rich culture and heritage.</p>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="item">
                    <div className="test-con text-center">
                        <ul>
                            <li>
                                <img className="img-responsive center-block timg img-fluid" src="./image/testimonial/kiara.jpg"
                                    alt="Testimonial" style={{ width: 200, height: 200 ,borderRadius: 25 }} draggable="false" />
                            </li>
                            <li>
                                <h2>Kiara Advani</h2>
                                <h5>Actress</h5>
                            </li>
                            <div className="testi-content">
                                <div className="rating">
                                    <span className="fa fa-stack"><i className="fa-solid fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-regular fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-regular fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-regular fa-star"></i></span>
                                    <span className="fa fa-stack"><i className="fa-regular fa-star"></i></span>
                                </div>
                                <p>Sarees are timeless and elegant. They have a way of making a woman feel beautiful and confident. I love how each saree tells a unique story through its design and craftsmanship.</p>
                            </div>
                        </ul>
                    </div>
                </div>
                </Slider>
        </div>
    </div>
    )
}

export default Customerreview
