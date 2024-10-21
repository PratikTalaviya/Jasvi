import React, { useEffect, useState } from 'react'
import { allgalarydata, ChildCategories } from '../../https/axios';


const FilterProduct = ({ products, childcategory, setSortbycate, filter, setFilter, sortbyprice, setSortbyprice, setFilterbycolor }) => {

    const [productsize, setProductsize] = useState([])
    const [productcolor, setProductcolor] = useState([])
    const [productfabric, setProductfabric] = useState([])
    const [productsleeves, setProductsleeves] = useState([])
    const [productdiscount, setProductdiscount] = useState([])
    const [currency, setCurrency] = useState(JSON.parse(localStorage.getItem("currency")) || '');

    useEffect(() => {
        async function getgallarydata() {
            const gallarydata = await allgalarydata()
            const allgallerdata = gallarydata.data.SearchProduct
            const unique = [...new Set(allgallerdata.map(a => a.color))];
            setProductcolor(unique)
        }
        getgallarydata()
    }, [])

    const filterpricedata = async (e) => {
        const value = e.target.value;
        setSortbyprice({
            ...filter,
            [e.target.name]: value,
        })
    };
    const filterbycolor = async (e) => {
        const value = e.target.value;
        setFilterbycolor(value)
    };
    const filterdata = async (e) => {
        const value = e.target.value;
        setFilter({
            ...filter,
            [e.target.name]: value
        })
    }
    useEffect(() => {
        const unique = [...new Set(products.map(a => a.size))];
        const mystrings = unique.join();
        const arr = mystrings.split(',')
        let uniquedata = [...new Set(arr)]
        uniquedata = uniquedata.filter(item => item);
        setProductsize(uniquedata)
    }, [products])

    useEffect(() => {
        const unique = [...new Set(products.map(a => a.fabric))];
        const mystrings = unique.join();
        const arr = mystrings.split(',')
        let uniquedata = [...new Set(arr)]
        uniquedata = uniquedata.filter(item => item);
        setProductfabric(uniquedata)
    }, [products])
    useEffect(() => {
        const unique = [...new Set(products.map(a => a.sleeves))];
        const mystrings = unique.join();
        const arr = mystrings.split(',')
        let uniquedata = [...new Set(arr)]
        uniquedata = uniquedata.filter(item => item);
        setProductsleeves(uniquedata)
    }, [products])

    useEffect(() => {
        const unique = [...new Set(products.map(a => a.discount_percentage))];
        const mystrings = unique.join();
        const arr = mystrings.split(',')
        let uniquedata = [...new Set(arr)]
        uniquedata = uniquedata.filter(item => item);
        setProductdiscount(uniquedata)
    }, [products])
    return (
        <>
            <div className="dropdown">
                <h4 className="pb-2">Filter</h4>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#size"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            <span className="filter select">size</span>
                        </button>
                    </h2>
                    <div
                        id="size"
                        className="accordion-collapse collapse "
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                    >

                        <div className="accordion-body p-0">
                            <ul className="filterbox py-2">
                                {productsize.map((data) => (
                                    <li className=" selctFilterOther d-flex align-items-center">
                                        <input
                                            type="radio"
                                            name="size"
                                            onChange={filterdata}
                                            value={data}
                                        />
                                        <label htmlFor="chk_L">{data}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#color"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            <span className="filter select">Color</span>
                        </button>
                    </h2>
                    <div
                        id="color"
                        className="accordion-collapse collapse "
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body p-0">
                            <ul className="filterbox py-2">
                                {productcolor.map((data) => (
                                    <li className=" selctFilterOther d-flex align-items-center">
                                        <input
                                            type="radio"
                                            name="color"
                                            onChange={filterbycolor}
                                            value={data}
                                        />
                                        <label htmlFor="chk_L">{data}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#fabric"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            <span className="filter select">fabric</span>
                        </button>
                    </h2>
                    <div
                        id="fabric"
                        className="accordion-collapse collapse "
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body p-0">
                            <ul className="filterbox py-2">
                                {productfabric.map((data) => (
                                    <li className=" selctFilterOther d-flex align-items-center">
                                        <input
                                            type="radio"
                                            name="fabric"
                                            onChange={filterdata}
                                            value={data}
                                        />
                                        <label htmlFor="chk_L">{data}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#pattern"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            <span className="filter select">sleeves</span>
                        </button>
                    </h2>
                    <div
                        id="pattern"
                        className="accordion-collapse collapse "
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body p-0">
                            <ul className="filterbox py-2">
                                {productsleeves.map((data) => (
                                    <li className=" selctFilterOther d-flex align-items-center">
                                        <input
                                            type="radio"
                                            name="sleeves"
                                            onChange={filterdata}
                                            value={data}
                                        />
                                        <label htmlFor="chk_L">{data}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#discount"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            <span className="filter select">discount</span>
                        </button>
                    </h2>
                    <div
                        id="discount"
                        className="accordion-collapse collapse "
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body p-0">
                            <ul className="filterbox py-2">
                                {productdiscount.map((data) => (
                                    <li className=" selctFilterOther d-flex align-items-center">
                                        <input
                                            type="radio"
                                            name="discount_percentage"
                                            onChange={filterdata}
                                            value={data}
                                        />
                                        <label htmlFor="chk_L">{data}</label>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>
                </div>
                {
                    currency === "INR" ?
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#price"
                                    aria-expanded="false"
                                    aria-controls="collapseThree"
                                >
                                    <span className="filter select">price</span>
                                </button>
                            </h2>
                            <div
                                id="price"
                                className="accordion-collapse collapse "
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body p-0">
                                    <ul className="filterbox py-2">
                                        <li className="selctFilterOther d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={filterpricedata}
                                                value="1000"
                                            />
                                            <label htmlFor="chk_L"> Under ₹1000</label>
                                        </li>

                                        <li className="selctFilterOther d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={filterpricedata}
                                                value="1000-2000"
                                            />
                                            <label htmlFor="chk_L">₹1000-₹2000</label>
                                        </li>
                                        <li className="selctFilterOther d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={filterpricedata}
                                                value="2000-3000"
                                            />
                                            <label htmlFor="chk_L">₹2000-₹3000</label>
                                        </li>
                                        <li className="selctFilterOther d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={filterpricedata}
                                                value="3000-4000"
                                            />
                                            <label htmlFor="chk_L">₹3000-₹4000</label>
                                        </li>
                                        <li className="selctFilterOther d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={filterpricedata}
                                                value="4000-5000"
                                            />
                                            <label htmlFor="chk_L">₹4000-₹5000</label>
                                        </li>
                                        <li className="selctFilterOther d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={filterpricedata}
                                                value="5000"
                                            />
                                            <label htmlFor="chk_L">Over ₹5000</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#price"
                                    aria-expanded="false"
                                    aria-controls="collapseThree"
                                >
                                    <span className="filter select">price</span>
                                </button>
                            </h2>
                            <div
                                id="price"
                                className="accordion-collapse collapse "
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body p-0">
                                    <ul className="filterbox py-2">
                                        <li className="selctFilterOther d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={filterpricedata}
                                                value="100"
                                            />
                                            <label htmlFor="chk_L"> Under ₹100</label>
                                        </li>

                                        <li className="selctFilterOther d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={filterpricedata}
                                                value="100-200"
                                            />
                                            <label htmlFor="chk_L">$100-$200</label>
                                        </li>
                                        <li className="selctFilterOther d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={filterpricedata}
                                                value="200-300"
                                            />
                                            <label htmlFor="chk_L">$200-$300</label>
                                        </li>
                                        <li className="selctFilterOther d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={filterpricedata}
                                                value="300-400"
                                            />
                                            <label htmlFor="chk_L">$300-$400</label>
                                        </li>
                                        <li className="selctFilterOther d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={filterpricedata}
                                                value="400-500"
                                            />
                                            <label htmlFor="chk_L">$400-₹$00</label>
                                        </li>
                                        <li className="selctFilterOther d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={filterpricedata}
                                                value="500"
                                            />
                                            <label htmlFor="chk_L">Over $500</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                }
            </div>
        </>
    )
}

export default FilterProduct