import React from 'react'

const Stitchingbanner = () => {
    return (
        <div className="ser-bnr">
            <div className="container">
                <div className="ser-bnr-contant">
                    <div className="head-text text-center">
                        <h2 className="heading text-center">
                            <span>STITCHING STORIES</span>
                        </h2>
                        <p>50% off on Ready-to-wear Stitching</p>
                    </div>
                    <div className="ser-con">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4">
                                <div className="service-img text-center">
                                    <a href="#">
                                        <img src="./image/service/service.jpg" className="img-fluid w-100"
                                            alt="STITCHING STORIES" draggable="false" />
                                    </a>
                                    <h5 className="f-14">SAREE BLOUSE</h5>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 my-5 my-sm-0">
                                <div className="service-img text-center">
                                    <a href="#">
                                        <img src="./image/service/service-1.jpg" className="img-fluid w-100"
                                            alt="STITCHING STORIES" draggable="false" />
                                    </a>
                                    <h5 className="f-14">SALWAR KAMEEZ</h5>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4">
                                <div className="service-img text-center">
                                    <a href="#">
                                        <img src="./image/service/service-2.jpg" className="img-fluid w-100"
                                            alt="STITCHING STORIES" draggable="false" />
                                    </a>
                                    <h5 className="f-14">LEHENGA CHOLI</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stitchingbanner
