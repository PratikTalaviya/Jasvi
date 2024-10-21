import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { Cart, filtercolorproduct, WishList } from '../../https/axios';
import { toast } from 'react-toastify'
import Filterproducts from './Filterproducts';

const CategoryProduct = ({ product, filter, sort, sortbyprice, sortbycate, filterbycolor, subcategory }) => {
    const [filterdata, setFilterdata] = useState('')
    const [currency, setCurrency] = useState(JSON.parse(localStorage.getItem("currency")) || '');
    const [colorproduct, setColorproduct] = useState([])

    useEffect(() => {
        async function getdata() {
            const colorproducts = await filtercolorproduct({ color: filterbycolor, subcategory: subcategory })
            if (colorproducts.data.Success === 1) {
                setColorproduct(colorproducts?.data?.colorProduct)
            }
        }
        getdata()
    }, [filterbycolor])


    useEffect(() => {
        async function ferchData() {
            let applyFilter = product;

            if (filter) {
                const filtersdata = applyFilter.filter(item => {
                    return Object.entries(filter).every(([key, value]) => {
                        return item[key].includes(value)
                    })
                })
                applyFilter = filtersdata

            }

            if (filterbycolor) {
                applyFilter = colorproduct
            }

            if (currency === "INR") {
                if (sortbyprice) {
                    if (sortbyprice.price === "5000") {
                        const pricefilter = applyFilter.filter((item) => item.In_price >= 5000);
                        applyFilter = pricefilter
                    } else if (sortbyprice.price === "1000") {
                        const pricefilters = applyFilter.filter((item) => item.In_price <= 1000);
                        applyFilter = pricefilters
                    } else if (sortbyprice.price) {
                        const arr = sortbyprice.price.split("-");
                        let data1 = arr[0];
                        let data2 = arr[1];
                        const pricefiltersamt = applyFilter.filter(
                            (item) => item.In_price >= data1 && item.In_price <= data2
                        );
                        applyFilter = pricefiltersamt
                    }
                }
            } else {
                if (sortbyprice) {
                    if (sortbyprice.price === "500") {
                        const pricefilter = applyFilter.filter((item) => item.outIn_price >= 500);
                        applyFilter = pricefilter
                    } else if (sortbyprice.price === "100") {
                        const pricefilters = applyFilter.filter((item) => item.outIn_price <= 100);
                        applyFilter = pricefilters
                    } else if (sortbyprice.price) {
                        const arr = sortbyprice.price.split("-");
                        let data1 = arr[0];
                        let data2 = arr[1];
                        const pricefiltersamt = applyFilter.filter(
                            (item) => item.outIn_price >= data1 && item.outIn_price <= data2
                        );
                        applyFilter = pricefiltersamt
                    }
                }
            }
            setFilterdata(applyFilter)
        }
        ferchData()
    }, [product, filter, sortbyprice, filterbycolor, colorproduct])





    useEffect(() => {
        if (sort.sort === 'New Arrivals') {
            setFilterdata((prev) => [...prev].sort((a, b) => a.createAt - b.createAt))
        } else if (sort.sort === 'Price: High to Low') {
            setFilterdata((prev) => [...prev].sort((a, b) => b.discount_price - a.discount_price))
        } else if (sort.sort === 'Price: Low to High') {
            setFilterdata((prev) => [...prev].sort((a, b) => a.discount_price - b.discount_price))
        }
    }, [product, sort])


    useEffect(() => {
        if (!sortbycate.childcategory) {
            setFilterdata(product);
        } else {
            const filter = product.filter(
                (item) => item.childcategory_id == sortbycate.childcategory
            );
            setFilterdata(filter);
        }
    }, [product, sortbycate])



    return (
        <div>
            {
                filterdata ?
                    <>
                        <section>
                            {
                                filterdata.length === 0 ?
                                    <Filterproducts products={product} ></Filterproducts>
                                    :
                                    <Filterproducts products={filterdata} ></Filterproducts>
                            }
                        </section>
                    </>
                    : <>
                        {/* <div className="thankyou mt-md-5 mt-3">
                                <div className="container">
                                    <div className="thank-visit text-center">
                                        <img src="/image/ThankYou-Visit/Right.png" className="img-circle" alt="cart" draggable="false" />
                                        <h1 className="visit mt-4">Out Of Stock</h1>
                                    </div>
                                </div>
                            </div> */}
                    </>
            }
        </div>
    )
}

export default CategoryProduct
