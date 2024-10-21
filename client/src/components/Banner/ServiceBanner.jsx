import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetMiddleBanner } from '../../https/axios'

const ServiceBanner = () => {
	const [middlebaner, setMiddlebaner] = useState([])
	const [category5, setcategory5] = useState('')
	const [category6, setcategory6] = useState('')
	const [category7, setcategory7] = useState('')
	useEffect(() => {
		async function getbanner() {
			const data = await GetMiddleBanner()
			setMiddlebaner(data.data.MiddleBannerList)
		}
		getbanner();
	}, [])
	useEffect(() => {
		async function fetchData() {
				setcategory5(middlebaner[5])
				setcategory6(middlebaner[6])
				setcategory7(middlebaner[7])
		}
		fetchData();
	}, [middlebaner]);
	return (

		<div className="ser-bnr" id='Personalized'>
			<div className="container">
				<div className="ser-bnr-contant">
					<div className="head-text text-center">
						<h2 className="heading text-center">
							<span>STITCHING STORIES</span>
						</h2>
						<p>20% off on Ready-to-wear Stitching</p>
					</div>

					<div className="ser-con">
						<div className="row">
							<div className="col-lg-4 col-md-4 col-sm-4">
								<div className="service-img text-center">
									<a href={`/products/${category5?.category_id?.name}/${category5?.subcategory_id?.name}/${category5?.subcategory_id?._id}`}>
										{
											category5 ?
												<img src={`${category5?.image}`} className="w-100 img-fluid"
													alt="Festive Favorites" draggable="false" />
												:
												<img src="./image/service/service.jpg" className="img-fluid w-100"
													alt="STITCHING STORIES" draggable="false" />
										}

									</a>
									<h5 className="f-14">{category5 ? category5?.title : "SAREE BLOUSE"}</h5>
								</div>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-4 my-5 my-sm-0">
								<div className="service-img text-center">
									<a href={`/products/${category6?.category_id?.name}/${category6?.subcategory_id?.name}/${category6?.subcategory_id?._id}`}>
										{
											category6 ?
												<img src={`${category6?.image}`} className="w-100 img-fluid"
													alt="Festive Favorites" draggable="false" />
												:
												<img src="./image/service/service-1.jpg" className="img-fluid w-100"
													alt="STITCHING STORIES" draggable="false" />
										}
									</a>
									<h5 className="f-14">{category6? category6?.title : "SALWAR KAMEEZ"}</h5>
								</div>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-4">
								<div className="service-img text-center">
									<a href={`/products/${category7?.category_id?.name}/${category7?.subcategory_id?.name}/${category7?.subcategory_id?._id}`}>
										{
											category7 ?
												<img src={`${category7?.image}`} className="w-100 img-fluid"
													alt="Festive Favorites" draggable="false" />
												:
												<img src="./image/service/service-2.jpg" className="img-fluid w-100"
													alt="STITCHING STORIES" draggable="false" />
										}
									</a>
									<h5 className="f-14">{category7 ? category7?.title : "LEHENGA CHOLI"}</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ServiceBanner
