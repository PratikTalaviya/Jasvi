import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetMiddleBanner, SubCategories } from '../../https/axios'

const SpecialBanner = () => {
    const [middlebaner, setMiddlebaner] = useState([])
    const [category7, setCategory7] = useState('')
    const [category8, setcategory8] = useState('')
    const [category9, setcategory9] = useState('')
    useEffect(() => {
        async function getbanner() {
            const data = await GetMiddleBanner()
            setMiddlebaner(data.data.MiddleBannerList)
        }
        getbanner();
    }, [])
    useEffect(() => {
        async function fetchData() {
            const subcategories = await SubCategories();
            const mysub = subcategories.data.SubCategoryList;
            if(mysub){
                const filteredData1 = mysub.filter((item) => item.id === middlebaner[7]?.subcategory_id);
                setCategory7(filteredData1[0])
                const filteredData2 = mysub.filter((item) => item.id === middlebaner[8]?.subcategory_id);
                setcategory8(filteredData2[0])
                const filteredData3 = mysub.filter((item) => item.id === middlebaner[9]?.subcategory_id);
                setcategory9(filteredData3[0])
            }
        }
        fetchData();
    }, [middlebaner]);
    return (
        <div className="special-bnr">
            <div className="container">
                <h2 className="heading text-center">
                    <span>hidden gems</span>
                </h2>
                <div className="spebnr-con">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <div className="spe-bnr">
                                <a href={`/products/${category7?.name}/${category7?.Name}/${category7?.id}`}>
                                    {
                                        middlebaner[7] ?
                                            <img src={`${middlebaner[7]?.image}`} className="w-100 img-fluid"
                                                alt="Festive Favorites" draggable="false" />
                                            :
                                            <img src="./image/product-banner/product-bnr.jpg" className="w-100 img-fluid"
                                                alt="Festive Favorites" draggable="false" />
                                    }
                                </a>

                                <div className="probnr-thumbtext text-center">
                                    <span className="f-18">{middlebaner[7] ? middlebaner[7]?.title : "Festive Special"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 my-5 my-sm-0">
                            <div className="spe-bnr">
                                <a href={`/products/${category8?.name}/${category8?.Name}/${category8?.id}`}>
                                    {
                                        middlebaner[8] ?
                                            <img src={`${middlebaner[8]?.image}`} className="w-100 img-fluid"
                                                alt="Festive Favorites" draggable="false" />
                                            :
                                            <img src="./image/product-banner/product-bnr.jpg" className="w-100 img-fluid"
                                                alt="Festive Favorites" draggable="false" />
                                    }
                                </a>
                                <div className="probnr-thumbtext text-center">
                                    <span className="f-18">{middlebaner[8] ? middlebaner[8]?.title : "Long Necklace Sets"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <div className="spe-bnr">
                                <a href={`/products/${category9?.name}/${category9?.Name}/${category9?.id}`}>
                                    {
                                        middlebaner[9] ?
                                            <img src={`${middlebaner[9]?.image}`} className="w-100 img-fluid"
                                                alt="Festive Favorites" draggable="false" />
                                            :
                                            <img src="./image/product-banner/product-bnr.jpg" className="w-100 img-fluid"
                                                alt="Festive Favorites" draggable="false" />
                                    }
                                </a>
                                <div className="probnr-thumbtext text-center">
                                    <span className="f-18">{middlebaner[9] ? middlebaner[9]?.title : "Partywear Sarees"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialBanner
