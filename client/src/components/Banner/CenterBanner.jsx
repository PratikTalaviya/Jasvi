import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetMiddleBanner } from '../../https/axios'

const CenterBanner = () => {
	const [middlebaner, setMiddlebaner] = useState([])
	useEffect(() => {
		async function getbanner() {
			const data = await GetMiddleBanner()
			if (data) {
				setMiddlebaner(data.data.MiddleBannerList[0])
			}
		}
		getbanner();
	}, [])

	return (

		<div className="container">
			<h2 className="heading text-center tbmrg">
				<span>Budget Shopping</span>
			</h2>
			<div className="row justify-content-between d-flex align-items-center">
				<div className="col-xl-6 col-lg-5 d-flex justify-content-center justify-content-lg-start">
					<Link to={'/allproduct'}>
						<img src={`${middlebaner?.image ? middlebaner?.image : "./image/banner-service/imgbanner.jpg"} `} alt="Budget shopping Banner" draggable="false" className="img-fluid" />
					</Link>
					{/* <div className="bud-shop">
								<img src={`${middlebaner?.image ? middlebaner?.image : "./image/banner-service/imgbanner.jpg"} `} style={{ maxHeight: "488px", maxWidth: "567px" }} alt="" />
								<a href={`/products/${category?.name}/${category?.Name}/${category?.id}`} className="mt-3 d-block">

									shop now
								</a>
							</div> */}
				</div>

				<div className="col-xl-6 col-lg-7 mt-3 mt-lg-0">
					<div className="row text-center justify-content-center">
						<div className="col-6  p-0 bodRgt">
							<div className="center-bnr-contant text-center">
								<a href="#Personalized">
									<i className="fa-solid fa-gift"></i>
								</a>
								<div className="center-bnr-txt">

									<h5>sign up</h5>
									<span>Get INR 20% off*</span>
								</div>
							</div>
							<hr />

							<div className="center-bnr-contant text-center">
								<a href={`/checkout/cart`}>
									<i className="fa-solid fa-truck-fast"></i>
								</a>
								<div className="center-bnr-txt">

									<h5>Ready to cart</h5>
									<span>save your time</span>
								</div>
							</div>
						</div>

						<div className="col-6  p-0">
							<div className="center-bnr-contant text-center">
								<a href={`/allproduct`}>
									<i className="fa-brands fa-canadian-maple-leaf"></i>
								</a>
								<div className="center-bnr-txt">
									<h5>just arrived</h5>
									<span>stylish trends</span>
								</div>
							</div>
							<hr />

							<div className="center-bnr-contant text-center">
								<a href="#customer">
									<i className="fa-solid fa-star"></i>
								</a>
								<div className="center-bnr-txt">

									<h5>bestsellers</h5>
									<span>the global favs</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* </div> */}
		</div>
	)
}

export default CenterBanner
