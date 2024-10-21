import React from 'react'
import { Link } from 'react-router-dom'

const TopBanner = () => {
    return (
        <div className="topbnr">
            <div className="container">
                <div className="topbnr-contant">
                    <div className="row">
                        <div className="col-lg-6 ool-md-6 col-sm-6">
                            <div className="tbnr-img text-center">
                                <Link to="/allproduct">
                                    <img src="./image/top-banner/top-bnr.jpg" className="img-fluid" alt="Top Banner"
                                        draggable="false" />
                                </Link>
                                <div className="probnr-thumbtext text-center">
                                    <h4>Fresh Fashion</h4>
                                    <span>Just-In: 800+ New Styles</span>
                                    <Link to="/allproduct" className="btn">shop now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 ool-md-6 col-sm-6">
                            <div className="bnrser-img text-center">
                                <Link to="/allproduct">
                                    <img src="./image/top-banner/top-bnr-1.jpg" className="img-fluid" alt="Top Banner"
                                        draggable="false" />
                                </Link>
                                <div className="probnr-thumbtext text-center">
                                    <h4>Clearance Sale</h4>
                                    <span>Top-Listed Styles On Huge Discounts</span>
                                    <Link to="/allproduct" className="btn">shop now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBanner
