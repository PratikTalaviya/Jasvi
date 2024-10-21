import React, { useEffect, useState } from 'react'
import { GetMiddleBanner } from '../../https/axios'

const ProductBanner = () => {
    const [middlebaner, setMiddlebaner] = useState([])
    const [category1, setCategory1] = useState('')
    const [category2, setcategory2] = useState('')
    const [category3, setcategory3] = useState('')
    const [category4, setcategory4] = useState('')

    useEffect(() => {
        async function getbanner() {
            const data = await GetMiddleBanner()
            setMiddlebaner(data.data.MiddleBannerList)
        }
        getbanner();
    }, [])
    useEffect(() => {
        async function fetchData() {
            setCategory1(middlebaner[1])
            setcategory2(middlebaner[2])
            setcategory3(middlebaner[3])
            setcategory4(middlebaner[4])
        }
        fetchData();
    }, [middlebaner]);
    return (
        <div className="tbmrg">
            <div className="container">

                <h2 className="heading text-center tbmrg">
                    <span>HIDDEN GEMS</span>
                </h2>

                <div className="row">
                    <div className="col-sm-3">
                        <div className="probnr-contant">
                            <a href={`/products/${category1?.category_id?.name}/${category1?.subcategory_id?.name}/${category1?.subcategory_id?._id}`}>
                                {
                                    category1 ?
                                        <img src={`${category1?.image}`} className="w-100 img-fluid"
                                            alt="Festive Favorites" draggable="false" />
                                        :
                                        <img src="./image/product-banner/product-bnr.jpg" className="w-100 img-fluid"
                                            alt="Festive Favorites" draggable="false" />
                                }
                            </a>
                            <div className="probnr-thumbtext text-center">

                                <div className="text-center">Festive Favorites</div>
                                <a href={`/products/${category1?.category_id?.name}/${category1?.subcategory_id?.name}/${category1?.subcategory_id?._id}`} className="btn">shop now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 my-5 my-sm-0">
                        <div className="probnr-contant">
                            <a href={`/products/${category2?.category_id?.name}/${category2?.subcategory_id?.name}/${category2?.subcategory_id?._id}`}>
                                {
                                    category2 ?
                                        <img src={`${category2?.image}`} className="w-100 img-fluid"
                                            alt="Festive Favorites" draggable="false" />
                                        :
                                        <img src="./image/product-banner/product-bnr-1.jpg" className="w-100 img-fluid"
                                            alt="Festive Favorites" draggable="false" />
                                }

                            </a>
                            <div className="probnr-thumbtext text-center">
                                <div className="text-center">Bling It Up</div>
                                {/* <span>{middlebaner[2] ? middlebaner[2]?.title : ""}</span> */}
                                <a href={`/products/${category2?.category_id?.name}/${category2?.subcategory_id?.name}/${category2?.subcategory_id?._id}`} className="btn">shop now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="probnr-contant">
                            <a href={`/products/${category3?.category_id?.name}/${category3?.subcategory_id?.name}/${category3?.subcategory_id?._id}`}>
                                {
                                    category3 ?
                                        <img src={`${category3?.image}`} className="w-100 img-fluid"
                                            alt="Festive Favorites" draggable="false" />
                                        :
                                        <img src="./image/product-banner/product-bnr-2.jpg" className="w-100 img-fluid"
                                            alt="Festive Favorites" draggable="false" />
                                }

                            </a>
                            <div className="probnr-thumbtext text-center">
                                <div className="text-center">Fusion Paradise</div>
                                {/* <span>{middlebaner[3] ? middlebaner[3]?.title : ""}</span> */}
                                <a href={`/products/${category3?.category_id?.name}/${category3?.subcategory_id?.name}/${category3?.subcategory_id?._id}`} className="btn">shop now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="probnr-contant">
                            <a href={`/products/${category4?.category_id?.name}/${category4?.subcategory_id?.name}/${category4?.subcategory_id?._id}`}>
                                {
                                    category4 ?
                                        <img src={`${category4?.image}`} className="w-100 img-fluid"
                                            alt="Festive Favorites" draggable="false" />
                                        :
                                        <img src="./image/product-banner/product-bnr.jpg" className="w-100 img-fluid"
                                            alt="Festive Favorites" draggable="false" />
                                }
                            </a>
                            <div className="probnr-thumbtext text-center">
                                <div className="text-center">Festive Favorites</div>
                                {/* <span>{middlebaner[1] ? middlebaner[1]?.title : ""}</span> */}
                                <a href={`/products/${category4?.category_id?.name}/${category4?.subcategory_id?.name}/${category4?.subcategory_id?._id}`} className="btn">shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductBanner
