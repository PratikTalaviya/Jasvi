import React from 'react'
import { Link } from 'react-router-dom'

const LeftBanner = () => {
	return (
		<div className="left-bnr">
			<div className="leftbnr-contant">
				<div className="container left-text d-flex flex-column justify-content-center align-items-start ">
					<h5>Branded Clothes</h5>
					<h3>Today Best Offer On All Product</h3>
					<Link className="btn btn-primary" to="/allproduct" tabIndex="-1"><span>Shop Now</span></Link>
				</div>
			</div>
		</div>
	)
}

export default LeftBanner
