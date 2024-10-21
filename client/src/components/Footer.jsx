// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { Addnewletter, socialmedia } from '../https/axios'

// const Footer = () => {
// 	const [email, setEmail] = useState('')
// 	const [sociallinks, setSociallinks] = useState([])

// 	useEffect(() => {
// 		async function getsociallink() {
// 			const data = await socialmedia()
// 			setSociallinks(data.data.SearchProduct)
// 		}
// 		getsociallink()
// 	}, [])

// 	const sendemail = async () => {
// 		try {
// 			if (email) {

// 				const sendemails = await Addnewletter({ email })
// 				if (sendemails.data.Success === 1) {
// 					setEmail('')
// 					toast("News letter email send Successfully", { theme: "dark", type: "success" })
// 				} else {
// 					toast("Please Enter email", { theme: "dark", type: "error" })
// 				}
// 			} else {
// 				toast("Please Enter email", { theme: "dark", type: "error" })
// 			}

// 		} catch (error) {
// 			toast("Please Enter email", { theme: "dark", type: "error" })

// 		}
// 	}
// 	return (
// 		<footer>
// 			<div className="middle-footer">
// 				<svg className="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100"
// 					preserveAspectRatio="none">
// 					<path className="footer-wave-path"
// 						d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
// 						fill="#fff">
// 					</path>
// 				</svg>
// 				<div className="footer-con">
// 					<div className="container">
// 						<div className="row">
// 							<div className="col-lg-6 col-md-12 col-sm-12">
// 								<div className="f-logo">
// 									<Link to="/">
// 										<img src="/image/logo.png" />
// 									</Link>
// 									<p>Here for you, no matter which part of the globe you belong to. You can buy our fashionable collection online with ease and can save time & money.
// While we promise to offer the traditional art & beauty of India, we also mix and blend contemporary chicness to set trends. At Utsav, we’ve got perfect styles for festivals, wedding season, parties, etc. Casual wear and Bollywood-inspired styles also are on display. Make them all yours!</p>
// 									<div className="social-media">
// 										<a href={sociallinks[0]?.link}><i className="fa-brands fa-facebook-f"></i></a>
// 										{/* <a href='https://www.facebook.com/Shivanshfab'><i className="fa-brands fa-facebook-f"></i></a> */}
// 										<a href={sociallinks[1]?.link}><i className="fa-brands fa-twitter"></i></a>
// 										<a href={sociallinks[2]?.link}><i className="fa-brands fa-pinterest-p"></i></a>
// 										<a href={sociallinks[3]?.link}><i className="fa-brands fa-instagram"></i></a>
// 										<a href={sociallinks[4]?.link}><i className="fa-brands fa-youtube"></i></a>
// 										{/* <a href='https://twitter.com/Shivanshfab'><i className="fa-brands fa-twitter"></i></a>
// 													<a href='https://in.pinterest.com/Shivansh_fab'><i className="fa-brands fa-pinterest-p"></i></a>
// 													<a href='https://www.instagram.com/shivanshfab'><i className="fa-brands fa-instagram"></i></a>
// 													<a href='https://www.youtube.com/channel/UC21SkRr-gFgReD3dD-XqJcQ'><i className="fa-brands fa-youtube"></i></a> */}

// 										{/* <a href='https://www.tumblr.com/shivanshfab'><i className="fa-brands fa-youtube"></i></a> */}

// 										<a href={sociallinks[5]?.link}><i className="fa-brands fa-tumblr"></i></a>
// 									</div>
// 								</div>
// 							</div>
// 							<div className="col-lg-6 col-md-12 col-sm-12">
// 								<div className="row fother-con">
// 									<div className="col-lg-6 col-md-12 col-sm-12">
// 										<div className="accordion" id="accordionExample">
// 											<div className="accordion-item">
// 												<h5 className="accordion-header" id="headingOne">
// 													<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
// 														data-bs-target="#info" aria-expanded="true"
// 														aria-controls="collapseOne">
// 														Information
// 													</button>
// 												</h5>
// 												<div id="info" className="accordion-collapse collapse"
// 													aria-labelledby="headingOne" data-bs-parent="#accordionExample">
// 													<ul className="list-unstyled ps-2">
// 														<li><a href="/aboutus">About Us</a></li>
// 														{/* <li><a href="#">Brands</a></li> */}
// 														<li><a href="/contectus">Contact Us</a></li>
// 														<li><a href="/return">Returns</a></li>
// 													</ul>
// 												</div>
// 											</div>
// 										</div>
// 										<div className="footer-text">
// 											<h5>Information</h5>
// 											<ul className="list-unstyled ps-2">
// 												<li><a href="/aboutus">About Us</a></li>
// 												{/* <li><a href="#">Brands</a></li> */}
// 												<li><a href="/contectus">Contact Us</a></li>
// 												<li><a href="/trackorder">Returns</a></li>
// 											</ul>
// 										</div>
// 									</div>
// 									<div className="col-lg-6 col-md-12 col-sm-12">
// 										<div className="accordion" id="accordionExample">
// 											<div className="accordion-item">
// 												<h5 className="accordion-header" id="headingOne">
// 													<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
// 														data-bs-target="#account" aria-expanded="true"
// 														aria-controls="collapseOne">
// 														My Account
// 													</button>
// 												</h5>
// 												<div id="account" className="accordion-collapse collapse"
// 													aria-labelledby="headingOne" data-bs-parent="#accordionExample">
// 													<ul className="list-unstyled ps-2">
// 														<li><a href="/account">My Account</a></li>
// 														<li><a href="/wishlist">Wishlist</a></li>
// 														<li><a href="/trackorder">Order History</a></li>
// 													</ul>
// 												</div>
// 											</div>
// 										</div>
// 										<div className="footer-text">
// 											<h5>My Account</h5>
// 											<ul className="list-unstyled ps-2">
// 												<li><a href="/account">My Account</a></li>
// 												<li><a href="/wishlist">Wishlist</a></li>
// 												<li><a href="/trackorder">Order History</a></li>
// 												<li><a href="/returnpolicy">Return Policy</a></li>

// 											</ul>
// 										</div>
// 									</div>
// 									{/* <div className="col-lg-4 col-md-12 col-sm-12">
// 										<div className="accordion" id="accordionExample">
// 											<div className="accordion-item">
// 												<h5 className="accordion-header" id="headingOne">
// 													<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
// 														data-bs-target="#other" aria-expanded="true"
// 														aria-controls="collapseOne">
// 														Other
// 													</button>
// 												</h5>
// 												<div id="other" className="accordion-collapse collapse"
// 													aria-labelledby="headingOne" data-bs-parent="#accordionExample">
// 													<ul className="list-unstyled ps-2">
// 														<li><a href="#">Affiliate</a></li>
// 														<li><a href="#">Specials</a></li>
// 														<li><a href="#">Site Map</a></li>
// 														<li><a href="#">Gift Certificates</a></li>
// 													</ul>
// 												</div>
// 											</div>
// 										</div>
// 										<div className="footer-text">
// 											<h5>Other</h5>
// 											<ul className="list-unstyled ps-2">
// 												<li><a href="#">Affiliate</a></li>
// 												<li><a href="#">Specials</a></li>
// 												<li><a href="#">Site Map</a></li>
// 												<li><a href="#">Gift Certificates</a></li>
// 											</ul>
// 										</div>
// 									</div> */}
// 								</div>
// 							</div>
// 						</div>
// 						<div className="newsletter">
// 							<div className="input-group">
// 								<input type="text" className="form-control input-md inputNew"
// 									value={email} onChange={e => { setEmail(e.target.value) }}
// 									onBlur="javascript:if(this.value=='')this.value='Your email address';"
// 									onFocus="javascript:if(this.value=='Your email address')this.value='';"
// 									size="18" name="email" placeholder="Your email address" />
// 								<div className="input-group-btn">

// 									<button type="submit" onClick={sendemail} name="submitNewsletter" className="newsbtn btn btn-primary">
// 										<span>Subscribe Now</span>
// 									</button>
// 								</div>
// 							</div>
// 						</div>
// 						<div className="copy text-center">
// 							<span>© 2003-2022 <strong>SHIVANSH FAB PVT. LTD.</strong> ALL RIGHTS RESERVED.</span>
// 						</div>
// 						<a href="#" id="scroll" style={{ display: "none" }}><span></span></a>
// 					</div>
// 				</div>
// 			</div>
// 		</footer>

// 	)
// }

// export default Footer

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Instagram } from "lucide-react";
import { BiLogoLinkedin, BiLogoFacebook, BiLogoYoutube } from "react-icons/bi";
import { RiTwitterXFill } from "react-icons/ri";
import { Addnewletter } from "../https/axios";
import { toast } from "react-toastify";
import Logo from "./Logo";

export default function Footer() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    // async function getsociallink() {
    // 	const data = await socialmedia()
    // 	setSociallinks(data.data.SearchProduct)
    // }
    // getsociallink()
  }, []);

  const sendemail = async () => {
    try {
      if (email) {
        const sendemails = await Addnewletter({ email });
        if (sendemails.data.Success === 1) {
          setEmail("");
          toast("News letter email send Successfully", { theme: "dark", type: "success" });
        } else {
          toast("Please Enter email", { theme: "dark", type: "error" });
        }
      } else {
        toast("Please Enter email", { theme: "dark", type: "error" });
      }
    } catch (error) {
      toast("Please Enter email", { theme: "dark", type: "error" });
    }
  };

  return (
    <footer className="bg-[#F3F4F6] text-gray-800 p-primary pb-[0.6rem] mt-0 rounded-outer ">
      <div className="w-full">
        {/* Upper Section */}
        <div className="mb-[2rem] md:mb-[0]">
          {/* <h2 className="text-4xl font-bold mb-2">Jasvi Creation</h2>
          <p className="text-sm">"Where Fashion Meets Trends"</p> */}
          <Logo />
        </div>

        {/* Middle Section */}
        <div className="flex">
          <div className="w-0 md:w-[40%]"></div>
          <div className="w-full md:w-[60%] grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/women-ethnic">Women Ethnic</Link>
                </li>
                <li>
                  <Link to="/salwaar-kameez">Salwaar Kameez</Link>
                </li>
                <li>
                  <Link to="/lehenga">Lehenga</Link>
                </li>
                <li>
                  <Link to="/indowestern">Indowestern</Link>
                </li>
                <li>
                  <Link to="/baby-kids">Baby & Kids</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Customer Care</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/faqs">FAQs</Link>
                </li>
                <li>
                  <Link to="/order-status">Order Status</Link>
                </li>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/terms-conditions">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/return-policy">Return Policy</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/shipping-policy">Shipping Policy</Link>
                </li>
                <li>
                  <Link to="/exchange-policy">Exchange Policy</Link>
                </li>
              </ul>
            </div>
            <div className="md:hidden">
              <h3 className="font-semibold mb-4">Contact Details</h3>
              <ul className="space-y-2 text-sm">
                <div className="flex-col items-center justify-start md:justify-end mb-1">
                  <p>Call Us On:</p>
                  <p>+91 99999 99999</p>
                </div>
                <div className="flex-col items-center justify-start md:justify-end">
                  <p>Email Us:</p>
                  <p>info@jasvicreation.com</p>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[0.3rem]">
            {/* Newsletter Subscription */}
            <div className="w-full md:w-[40%] mb-8 md:mb-1 ">
              <p className="text-sm mb-[0.4rem] text-justify">
                Stay ahead of the trends – sign up for exclusive updates, new arrivals, and special offers straight to
                your inbox!
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="flex-grow px-3 py-2 rounded-lg bg-gray-300 outline-none focus:outline-none focus:ring-0 border"
                  required
                />
                <button
                  type="submit"
                  onClick={sendemail}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
            {/* Social Media and Contact */}
            <div className="w-full md:w-auto">
              <div className="flex justify-center md:justify-end space-x-4 mb-4">
                {[BiLogoFacebook, Instagram, RiTwitterXFill, BiLogoLinkedin, BiLogoYoutube].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="bg-gray-300 p-2 rounded-full text-gray-600 hover:bg-gray-400 hover:text-gray-800 transition-colors"
                  >
                    <Icon size={"1.2rem"} />
                  </a>
                ))}
              </div>
              <div className="hidden md:block tracking-wide">
                <div className="flex items-center justify-center md:justify-end">
                  {/* <Phone size={16} className="mr-2" /> */}
                  <span className="text-sm">Call Us On +91 99999 99999</span>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  {/* <Mail size={16} className="mr-2" /> */}
                  <span className="text-sm">Email Us info@jasvicreation.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-300 pt-[0.3rem] text-xs tracking-wider">
            <p>&copy;2024 Jasvi Creation</p>
            <p>Design and Developed by Pratik Talaviya</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
