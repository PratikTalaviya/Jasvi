import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Cancelorder, OrderHistory, ReturnOrderRequest, rutuenorderdata, specificorder, trackorderdata, updateDeliveredOrder } from '../https/axios'
import { toast } from 'react-toastify'

const TrackOrder = () => {
    const [order, setOrder] = useState([])
    const [trackorders, setTrackorders] = useState([])
    const [Delivered, setDelivered] = useState(false)
    const [Intraist, setIntraist] = useState(false)
    const [shipped, setShipped] = useState(false)
    const [OutforDelivery, setOutforDelivery] = useState(false)
    const [Booked, setBooked] = useState(false)
    const [shiporderid, setShiporderid] = useState(1)

    const [returnproduct, setReturnproduct] = useState([])
    const [checked, setChecked] = useState([]);


    useEffect(() => {
        async function orders() {
            const uorder = await OrderHistory()
            setOrder(uorder.data.UserOrderlist)
        }
        orders()
    }, [])
    const cancelOrder = async (id) => {
        try {
            const changepass = await Cancelorder({ orderid: id })
            toast("Cancel Order request Sucessfully", { theme: "dark", type: "success" })

        } catch (error) {
            toast("Cancel Order Not Sucessfully", { theme: "dark", type: "error" })
        }
    }

    useEffect(() => {
        async function orders() {
            for (let i = 0; i < order.length; i++) {
                const element = order[i].ship_orderid;
                console.log("🚀 ~ file: TrackOrder.jsx:39 ~ orders ~ element", element)
                const uorder = await specificorder(element)
                console.log("🚀 ~ file: TrackOrder.jsx:41 ~ orders ~ uorder", uorder)
            }
            // for (let i = 0; i < order.length; i++) {
            //     const element = order[i].ship_orderid;
            //     const uorder = await specificorder(order[i].ship_orderid)
            //     if (uorder?.data?.myorder?.status === "NEW") {
            //         const uorder = await updateDeliveredOrder(order[i].id)
            //     }
            // }
        }
        orders()
    }, [order])

    const replaceorder = async (data) => {
        console.log("🚀 ~ file: TrackOrder.jsx:58 ~ replaceorder ~ data", data._id)
        try {
            const returnoredrs = await rutuenorderdata({ id: data?._id })
            setReturnproduct(returnoredrs?.data?.ordesdata.product_id)
        } catch (error) {
            toast(error.message, { theme: "dark", type: "error" })
        }


    }
    useEffect(() => {
        async function trackorder() {
            if (shiporderid === 1) {
                const ordertrackda = await trackorderdata({ ship_orderid: order[0]?.ship_orderid })
                setTrackorders(ordertrackda?.data?.orderdata?.tracking_data?.shipment_track_activities)
            } else {
                const ordertrackda = await trackorderdata({ ship_orderid: shiporderid })
                setTrackorders(ordertrackda?.data?.orderdata?.tracking_data?.shipment_track_activities)
            }
        }
        trackorder()
    }, [order, shiporderid])

    useEffect(() => {
        async function getdata() {
            const unique = [...new Set(trackorders?.map(a => a?.["sr-status"]))];
            const findDeliverd = unique.find(data => data === "7")
            const Intransit = unique.find(data => data === "18")
            const Bookedorder = unique.find(data => data === "42")
            const Shippped = unique.find(data => data === "6")
            const outofDelivery = unique.find(data => data === "19")
            setDelivered(findDeliverd ? true : false)
            setIntraist(Intransit ? true : false)
            setBooked(Bookedorder ? true : false)
            setOutforDelivery(outofDelivery ? true : false)
            setShipped(Shippped ? true : false)
        }
        getdata()
    }, [trackorders])

    const senddata = async (data) => {
        try {
            if (data.status === "confirm") {
                setShiporderid(data.ship_orderid)
            } else {
                setShiporderid(1)
            }
        } catch (error) {
            toast("Your Order is Not Able to Return!", { theme: "dark", type: "error" })
        }
    }

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const sendretuenorderreq = async (data) => {
        try {
            var array = []
            for (let i = 0; i < checked.length; i++) {
                array.push(JSON.parse(checked[i]))
            }
            const retuenorder = await ReturnOrderRequest({ orderid: data, checked: array })
            if (retuenorder.data.Success === 1) {
                toast("Send Your Return Order Request Successfully", { theme: "dark", type: "success" })
            } else {
                toast("Your Order is Not Able to Return!", { theme: "dark", type: "error" })
            }
        } catch (error) {
            toast("Return order requst send Sucessfully", { theme: "dark", type: "error" })
        }
    }

    return (
        <>
            <Header />
            <div className="track-order">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/" className="bread-des"><i className="fa fa-home"></i></Link>
                        </li>
                        <li>
                            <Link to="/" className="bread-des">Home</Link>
                        </li>
                        <li>
                            <a >Track Your Order</a>
                        </li>
                    </ul>
                    <h5 className="about-txt pb-3">Track Your Order</h5>

                    <div className="row mt-lg-4 mt-2">
                        <div className="col-md-8">
                            <div className="your-order">
                                <h5>your order history</h5>
                                {
                                    order && order.map((data, i) => {
                                        return (
                                            <a onClick={e => senddata(data)}>
                                                <div className="youroder-details your-order-active mt-3 d-flex flex-column" >
                                                    <div className="d-flex align-items-center">
                                                        <div key={i}>
                                                            {
                                                                data?.product_id?.map((element, index) => {
                                                                    return (
                                                                        <div className="cartname  pt-0 pb-0 pe-5" key={index}>
                                                                            <a className="catpro-name">
                                                                                {element?.name}
                                                                            </a>
                                                                            {/* <span className="d-block">color: {element?.color}</span> */}
                                                                            <span className="d-block">sku: {element?.sku}</span>
                                                                            <span className="d-block">quantity: {element?.units}</span>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <span>Payment method: {data.payment_method}</span>
                                                        <span className="order-price ms-auto">₹{data.amount}</span>
                                                        <span className="order-price ms-auto">₹{data.status}</span>
                                                    </div>
                                                    <div className="replace-btn mt-3">
                                                        <div className="d-flex align-center"></div>

                                                        {
                                                            data.status === "pending" ?
                                                                <>
                                                                    {/* <a onClick={() => replaceorder(data.id)} className="btn ms-2 refund">Replace Order</a>
                                                                <Link to={`/updateorder/${data.id}`} className="btn ms-2 refund">Update Order</Link> */}
                                                                    <a onClick={() => cancelOrder(data._id)} className="btn ms-2 refund">Cancel Order</a>
                                                                </>
                                                                :
                                                                <></>
                                                        }
                                                        {/* {
                                                            data.status === "confirm" ?
                                                                <>
                                                                    <a onClick={() => replaceorder(data.ship_orderid
                                                                    )} className="btn ms-2 refund">Replace Order</a>
                                                                </>
                                                                :
                                                                <></>
                                                        } */}
                                                        {
                                                            data.status === "replace" ?
                                                                <>
                                                                    <div className="alert alert-warning mt-5" role="alert">
                                                                        <i className="fa-sharp fa-solid fa-brake-warning"></i>
                                                                        if your payment method is cash on delivery then order is cancel and if your payment method is online
                                                                        then Your payment credited within 14 working days in your account !
                                                                    </div>
                                                                </>
                                                                :
                                                                <></>
                                                        }
                                                        {
                                                            data.status === "cancel request" ?
                                                                <>
                                                                    <div className="alert alert-warning mt-5" role="alert">
                                                                        <i className="fa-sharp fa-solid fa-brake-warning"></i>
                                                                        if cancel requst confirm then your order is cancel and your payment method is online then your amount add your wallet and if your order payment method is cod then your order directly cancel !
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                        {
                                                            data.status === "Delivered" ?
                                                                <>
                                                                    {/* <a onClick={() => replaceorder(data._id)} className="btn ms-2 refund">Return Order</a> */}
                                                                    <a onClick={() => replaceorder(data)} className="btn ms-2 refund" data-bs-toggle="modal" data-bs-target="#refund">Return Order</a>
                                                                    <div className="modal fade" id="refund" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h4 className="modal-title edit-add" id="exampleModalLabel">Return Your product</h4>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body pb-0">
                                                                                    <span className="login-name pb-1 mt-4 d-block">Select Product :</span>
                                                                                    {
                                                                                        returnproduct && returnproduct.map((data, index) =>
                                                                                            <>
                                                                                                <div key={index}>
                                                                                                    <input value={JSON.stringify(data)} type="checkbox" onChange={handleCheck} />
                                                                                                    <span >name: {data?.name}</span><br />
                                                                                                    <span >Units: {data?.units}</span><br />
                                                                                                    <span >Price: {data?.selling_price}</span>
                                                                                                </div>

                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <a onClick={() => sendretuenorderreq(data)} className="btn btn-secondary">Submit</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-md-4 mt-4">
                            <div className="dots d-flex flex-column justify-content-center align-items-start align-items-md-center text-center">
                                <div className="order-history">
                                    <span className={`order-confirmed  ${Booked === true ? "order-active" : ""} `}>
                                        <i className="fa-sharp fa-solid fa-basket-shopping"></i>
                                    </span>
                                    <h6 className="mt-2">shipping soon</h6>
                                </div>

                                <div className={`order-line my-3  ${shipped === true ? " order-line-active" : ""} `}></div>
                                <div className="order-history">
                                    <span className={`order-confirmed  ${shipped === true ? "order-active" : ""} `}>
                                        <i className="fa-sharp fa-solid fa-sailboat"></i>
                                    </span>
                                    <h6 className="mt-2">shipped</h6>
                                </div>

                                <div className={`order-line my-3  ${Intraist === true ? " order-line-active" : ""} `} ></div>
                                <div className="order-history">
                                    <span className={`order-confirmed  ${Intraist === true ? "order-active" : ""} `}>
                                        <i className="fa-solid fa-road"></i>
                                    </span>
                                    <h6 className="mt-2">on the way</h6>
                                </div>

                                <div className={`order-line my-3  ${OutforDelivery === true ? " order-line-active" : ""} `}></div>
                                <div className="order-history">
                                    <span className={`order-confirmed  ${OutforDelivery === true ? "order-active" : ""} `}>
                                        <i className="fa-solid fa-truck-fast"></i>
                                    </span>
                                    <h6 className="mt-2">out of delivery</h6>
                                </div>

                                <div className={`order-line my-3  ${Delivered === true ? " order-line-active" : ""} `}></div>
                                <div className="order-history">
                                    <span className={`order-confirmed  ${Delivered === true ? "order-active" : ""} `}>
                                        <i className="fa-solid fa-gift"></i>
                                    </span>
                                    <h6 className="mt-2">delivered</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default TrackOrder
