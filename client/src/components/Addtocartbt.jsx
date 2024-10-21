import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAddToCart } from '../https/axios'
import { toast } from 'react-toastify'
import { remove } from '../redux/Slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import Footer from './Footer'

const Addtocartbt = () => {
    const [myattocart, setMyattocart] = useState('')
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state)
    console.log("🚀 ~ file: Addtocartbt.jsx:14 ~ cart", cart)
    const [currency, setCurrency] = useState(JSON.parse(localStorage.getItem("currency")) || '');



    // useEffect(() => {
    //     async function mycart() {
    //         const mycartdata = await getAddToCart();
    //         setMyattocart(mycartdata.data.UserCart)
    //     }
    //     mycart();
    // }, [])
    const deletedata = async (id) => {
        try {
            dispatch(remove(id))
        } catch (error) {
            toast("", { theme: "dark", type: "error" })
        }
    }

    return (
        <>
            <Header />
            <div className="my-cart mt-md-5 mt-3">
                <div className="container">
                    <h3 className="heading">my cart</h3>
                    <table className="table-responsive table mt-4 cusOvr">
                        <tbody>
                            <tr className="list-contant text-center">
                                <th>image</th>
                                <th>product details</th>
                                <th>price</th>
                                <th>quantity</th>
                                <th>total</th>
                                <th>delete</th>
                            </tr>{

                                cart && cart.map((datas) =>

                                    <tr className="list-contant">
                                        <td className="text-center wish-img">
                                            <a href="#">
                                                <img src={`${datas.products?.photo}`} alt="" className="img-circle" draggable="false" />
                                            </a>
                                        </td>
                                        <td className="text-left">
                                            <div className="cartname">
                                                <a href="product.html" className="catpro-name">
                                                    {datas.products?.title}
                                                </a>
                                                <span className="d-block">color: {datas.color}</span>
                                                <span className="d-block">size:{datas.size}</span>
                                            </div>
                                        </td>
                                        {
                                            currency === "INR" ?

                                                <td className="text-center">₹{datas.products?.In_price}</td>
                                                :
                                                <td className="text-center">${datas.products?.outIn_price}</td>
                                        }
                                        <td className="text-center">{datas.quantity}</td>

                                        {/* <div className="qty-name add-pro my-4 my-md-2">
                                            <button
                                                className="down"
                                                onClick={() => decrement(datas)}
                                            >
                                                -
                                            </button>
                                            <span className="number">{datas.quantity}</span>
                                            <button
                                                className="down-1"
                                                onClick={() => increment(datas)}
                                            >
                                                +
                                            </button>
                                        </div> */}
                                        <td>
                                            {
                                                currency === "INR" ?

                                                    <div className="text-center wish-price">₹{datas.products?.In_price * datas.quantity}</div>
                                                    :
                                                    <div className="text-center wish-price">${datas.products?.outIn_price * datas.quantity}</div>
                                            }
                                        </td>
                                        <td className="text-center wish-btn-group ms-auto pull-right">
                                            {/* <a href="">
                                                <i className="fa-solid fa-pencil"></i>
                                            </a> */}
                                            <a onClick={() => deletedata(datas)} className="ms-2">
                                                <i className="fa-solid fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }


                        </tbody>
                    </table>
                    <div className="modal-footer">
                        <a href="/payment/addressselect" className="btn btn-secondary">purchase</a>
                    </div>
                </div>
            </div>
            <Footer />
        </>

        // <div className="cart ms-auto ms-lg-0">
        //     <div className="add-to-cart ps-2">
        //         <a href="#" data-bs-toggle="modal" data-bs-target="#addtocart">
        //             <i className="fa-solid fa-bag-shopping bag"></i>
        //             <div className="cart-total">
        //                 <span className="cartt">{isLoggedIn == true ? cart.length == 0 ? 0 : cart.length : 0}</span>
        //             </div>
        //         </a>
        //         <div className="modal fade" id="addtocart" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        //             <div className="modal-dialog">
        //                 <div className="modal-content">
        //                     <div className="modal-header">
        //                         <h5 className="modal-title mycart" id="exampleModalLabel">My Cart</h5>
        //                         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        //                     </div>
        //                     <div className="modal-body pb-0">
        //                         {
        //                             //  cart && cart.map((datas) => {
        //                             myattocart && myattocart.map((datas) => {
        //                                 return (
        //                                     <div className="cartdrop d-flex align-items-center">
        //                                         <div className="pull-left">
        //                                             <a href="#">
        //                                             <img src={`${datas.photo}`} className="img-circle" alt="cart" draggable="false" />
        //                                             </a>
        //                                         </div>
        //                                         <div className="cartname">
        //                                             <a href="" className="catpro-name">
        //                                                 {datas.name}
        //                                             </a>

        //                                             <span className="d-block">color: {datas.color}</span>
        //                                             <span className="d-block">size: {datas.size}</span>
        //                                             <span>quantity: {datas.quantity}</span>

        //                                         </div>
        //                                         <div className="ms-auto pull-right">
        //                                             <a href="">
        //                                                 <i className="fa-solid fa-pencil"></i>
        //                                             </a>
        //                                             <a onClick={() => deletedata(datas.item_id)} className="ms-2">
        //                                                 <i className="fa-solid fa-trash"></i>
        //                                             </a>
        //                                         </div>
        //                                     </div>
        //                                 )
        //                             })
        //                         }

        //                     </div>
        //                     <div className="modal-footer">
        //                         <a href="/payment" className="btn btn-secondary">purchase</a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Addtocartbt
