import React from 'react'
import { Link } from 'react-router-dom'


const ImageBanner = () => {
	return (
		<div className="img-bnr">
			<div className="container">
				<div className="imgbnr-contant">
					<Link to="/allproduct">
						<img src="/image/img-banner/img-banner.jpg" className="w-100 img-fluid" alt="Img Banner"
							draggable="false" />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ImageBanner
