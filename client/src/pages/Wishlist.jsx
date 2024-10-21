import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Cart, DeleteWishList, GetWishList } from '../https/axios'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const Wishlist = () => {
    const [mywishlists, setMywishlists] = useState('')
    const dispatch = useDispatch();
    const [cart, setCart] = useState('')
    const [currency, setCurrency] = useState(JSON.parse(localStorage.getItem("currency")) || '');


    const sendcart = async (id) => {
        try {
            const usercart = await Cart({ productid: id })
            if (usercart) {
                toast("Add to cart successfully", { theme: "dark", type: "success" })
            }
        } catch (error) {
            toast("Try again", { theme: "dark", type: "error" })
        }
    }

    useEffect(() => {
        async function wishlist() {
            const wishdata = await GetWishList({})
            setMywishlists(wishdata.data.UserWishlist)
        }
        wishlist()
    }, [])


    const deletedata = async (id) => {
        try {
            const deletewish = await DeleteWishList({ productid: id })
            if (deletewish) {
                toast("Delete Products from Wishlist Successfully", { theme: "dark", type: "success" })
            }
        } catch (error) {
            toast("Try again", { theme: "dark", type: "error" })
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <ul className="breadcrumb">
                    <li>
                        <Link to="/" className="bread-des"><i className="fa fa-home"></i></Link>
                    </li>
                    <li>
                        <Link to="#" className="bread-des">account</Link>
                    </li>
                    <li>
                        <Link to="/wishlist">wishlist</Link>
                    </li>
                </ul>

                <div className="infobg cusOvr">
                    <h3 className="text-center">wishlist</h3>
                    <table className="table-responsive table mt-4">
                        <tbody>
                        <tr className="list-contant text-center">
                            <th>image</th>
                            <th>product name</th>
                            {/* <th>model</th>
                            <th>stock</th> */}
                            <th>price</th>
                            <th>action</th>
                        </tr>
                            {
                                mywishlists && mywishlists.map((data) => {
                                    return (
                                        <tr className="list-contant text-center">
                                            <td className="text-center wish-img">
                                                <a href="#">
                                                    <img src={data?.item_id?.photo} className="img-fluid" alt="wishlist" draggable="false" />
                                                    {/* <img src={`http://localhost:8080/assets/AddProductImage/mainimages/${data?.item_id?.photo}`} className="img-fluid" alt="wishlist" draggable="false" /> */}
                                                </a>
                                            </td>
                                            <td className="text-left">
                                                <a href="#">
                                                    <strong>{data?.item_id?.title}</strong>
                                                </a>
                                            </td>
                                            {/* <td className="text-left">{data.item_type}</td>
                                        <td className="text-left">{data.stock} </td> */}
                                            <td>
                                                {
                                                    currency === "INR" ?
                                                        <div className="wish-price">{data.item_id?.In_price}</div>
                                                        :
                                                        <div className="wish-price">{data.item_id?.outIn_price}</div>
                                                }
                                            </td>
                                            <td className="text-center wish-btn-group">
                                                <a href={`/product/${data?.item_id?.title}/${data?.item_id?._id}`} className="btn wish-cart">
                                                    <i className="fa-solid fa-cart-shopping"></i>
                                                </a>
                                                <button onClick={() => deletedata(data.item_id)} className="btn wish-close ms-2">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Wishlist
