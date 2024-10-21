import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { DeleteCart, getAddToCart, GetCart, getdiscountcoupen, getloginuser, orderapi, payments, Shiproacket, UpdateAddress, verifys } from '../https/axios'
import { toast } from 'react-toastify'
import Logo from "../images/logo.png";
import Personaldetails from '../components/Personaldetails'
import { useSelector } from 'react-redux';
import { remove } from '../redux/Slice/cartSlice'
import { useParams } from 'react-router-dom';
import PaymentPageHeader from '../components/PaymentPageHeader'
import PaymentPageFooter from '../components/PaymentPageFooter'
import Blog from './Blog';


const PaymentPage = () => {
    const { action } = useParams();
    const navigate = useNavigate()
    const [userinfo, setUserinfo] = useState('')
    const dispatch = useDispatch();
    const [verify, setVerify] = useState('')
    const [totalamount, setTotalamount] = useState()
    const [mycart, setMycart] = useState('')
    const [COD, setCOD] = useState(false)
    const [payment, setPayment] = useState(false)
    const [payactive, setPayactive] = useState('')
    const [mycoupndode, setMycoupndode] = useState('')
    const [discountvalue, setDiscountvalue] = useState(0)
    const [Discountcoupon, setDiscountcoupon] = useState('')
    const [coupenuse, setCoupenuse] = useState(false)
    const [shipping_is_billing, setShipping_is_billing] = useState(true)

    const [cutwalletamt, setCutwalletamt] = useState(false)
    const [usershowoption, setUsershowoption] = useState(false)

    const [shipping_customer_name, setShipping_customer_name] = useState('')
    const [shipping_last_name, setShipping_last_name] = useState('')
    const [shipping_address, setShipping_address] = useState('')
    const [shipping_address_2, setShipping_address_2] = useState('')
    const [shipping_city, setShipping_city] = useState('')
    const [shipping_pincode, setShipping_pincode] = useState('')
    const [shipping_country, setShipping_country] = useState('')
    const [shipping_state, setShipping_state] = useState('')
    const [shipping_email, setShipping_email] = useState('')
    const [shipping_phone, setShipping_phone] = useState('')
    const [billing_customer_name, setBilling_customer_name] = useState('')
    const [billing_last_name, setBilling_last_name] = useState('')
    const [billing_address, setBilling_address] = useState('')
    const [billing_address_2, setBilling_address_2] = useState('')
    const [billing_city, setBilling_city] = useState('')
    const [billing_pincode, setBilling_pincode] = useState('')
    const [billing_country, setBilling_country] = useState('')
    const [billing_state, setBilling_state] = useState('')
    const [billing_email, setBilling_email] = useState('')
    const [billing_phone, setBilling_phone] = useState('')

    const { cart } = useSelector(state => state)
    const cartdata = cart.slice(-1)
    const [currency, setCurrency] = useState(JSON.parse(localStorage.getItem("currency")) || '');
    useEffect(() => {
        async function users() {
            const userdata = await getloginuser();
            setUserinfo(userdata?.data?.User)
        }
        users();
    }, [])
    useEffect(() => {
        async function cartdata() {
            const discountcoupen = await getdiscountcoupen()
            const mydats = discountcoupen.data.data;
            const filteredData = mydats.filter(item => item.status == 1)
            setDiscountcoupon(filteredData[0])
            
        }
        cartdata()
    }, [])
    useEffect(() => {
        async function mytotals() {
            let total = 0;
            let totals = 0;
            if (currency === "INR") {
                cart.map(data => {
                    parseInt(data?.In_price)
                    
                    total = total +  data.products?.In_price * data?.quantity
                    
                })
                let totals = parseInt(total)
                console.log("that",totals);
                setTotalamount(totals)
            } else {
                cart.map(data => {
                    parseInt(data?.outIn_price)
                    total = total + data.products?.outIn_price * data?.quantity
                })
                let totals = parseInt(total)
                setTotalamount(totals)
            }


            if (cutwalletamt === true) {
                if (userinfo.wallet.amount) {
                    let remainsamounts = 0;

                    let wallletamount = userinfo.wallet?.amount - totalamount
                    if (userinfo.wallet?.amount >= totalamount) {
                        setUsershowoption(false)
                        setTotalamount(0)
                    } else {
                        setUsershowoption(true)
                        setTotalamount(totalamount - userinfo.wallet?.amount)
                    }
                }
            }

        }
        mytotals()
    }, [mycart, userinfo, cutwalletamt])


    const handlePayment = async () => {
        try {
            if (cart.length > 0) {
                if (payactive === "Online") {

                    let name = userinfo
                    if (billing_customer_name === "" && billing_last_name === "" && billing_address === "" && billing_address_2 === "" && billing_city === "" && billing_pincode === "" && billing_country === "" && billing_state === "" && billing_email === "" && billing_phone === "") {
                        toast("Please Fill All details", { theme: "dark", type: "error" })
                    } else {
                        const pays = payments({ currency: currency, amount: totalamount, name: name }).then((pays) => {
                            initPayment(pays.data.data);
                        }).catch(error => {
                            console.log(error.message)
                        })

                    }
                } else if (payactive === "Cod") {
                    const mcartarr = [];
                    const specification = [];
                    for (let i = 0; i < cart.length; i++) {
                        let order_items = {
                            "name": cart[i]?.products?.title,
                            "sku": cart[i]?.products?.sku_code + (cart[i]?.color ? "_" + cart[i]?.color : "") + (cart[i]?.size ? "_" + cart[i]?.size : ""),
                            "units": parseInt(cart[i].quantity),
                            "tax": "",
                            "selling_price": currency === "INR" ? (cart[i]?.products?.In_price * cart[i].quantity).toString() : (cart[i]?.products?.outIn_price * cart[i].quantity).toString(),
                            "discount": "0",
                            "hsn": 441122
                        }
                        mcartarr.push(order_items)


                        let order_items_specification = {
                            "name": cart[i]?.products?.title,
                            "product_id": cart[i].products?._id,
                            "product_sku_code": cart[i]?.products?.sku_code,
                            "sku": cart[i]?.products?.sku_code + (cart[i]?.color ? "_" + cart[i]?.color : "") + (cart[i]?.size ? "_" + cart[i]?.size : ""),
                            "units": parseInt(cart[i].quantity),
                            "tax": "",
                            "selling_price": currency === "INR" ? (cart[i]?.products?.In_price * cart[i].quantity).toString() : (cart[i]?.products?.outIn_price * cart[i].quantity).toString(),
                            "discount": "0",
                            "hsn": 441122,
                            "teching": cart[i]?.customizeteching
                        }
                        specification.push(order_items_specification)
                    }
                    let is_coupen = 0;
                    if (is_coupen === 0) {
                        if (coupenuse === true) {
                            is_coupen = 1
                        } else {
                            is_coupen = 0
                        }
                    }
                    try {
                        if (billing_customer_name === "" && billing_last_name === "" && billing_address === "" && billing_address_2 === "" && billing_city === "" && billing_pincode === "" && billing_country === "" && billing_state === "" && billing_email === "" && billing_phone === "") {
                            toast("Please Fill All details", { theme: "dark", type: "error" })
                        } else {
                            const orders = await orderapi({ payment_method: "COD", productspecification: specification, amount: totalamount, productid: mcartarr, is_wallet: cutwalletamt, payment_id: "COD", is_coupen, shipping_is_billing, shipping_customer_name, shipping_last_name, shipping_address, shipping_address_2, shipping_city, shipping_pincode, shipping_country, shipping_state, shipping_email, shipping_phone, billing_customer_name, billing_last_name, billing_address, billing_address_2, billing_city, billing_pincode, billing_country, billing_state, billing_email, billing_phone, currency: currency })
                            if (orders.data.Success === 1) {
                                toast("order placed Successfully", { theme: "dark", type: "success" })
                                navigate("/thankyou")
                                for (let i = 0; i < cart.length; i++) {
                                    dispatch(remove(cart[i]))
                                }
                                setCoupenuse(false)
                                setVerify(true)
                                setPayment(true)
                            } else {
                                toast("order not placed", { theme: "dark", type: "success" })
                            }

                        }
                    } catch (error) {
                        toast("Something went to wrong", { theme: "dark", type: "error" })
                    }
                } else if (payactive === "Wallet Online") {
                    console.log("yess Brooo")
                    let name = userinfo
                    if (billing_customer_name === "" && billing_last_name === "" && billing_address === "" && billing_address_2 === "" && billing_city === "" && billing_pincode === "" && billing_country === "" && billing_state === "" && billing_email === "" && billing_phone === "") {
                        toast("Please Fill All details", { theme: "dark", type: "error" })
                    } else {
                        const pays = payments({ currency: currency, amount: totalamount, name: name }).then((pays) => {
                            initPayment(pays.data.data);
                        }).catch(error => {
                            console.log(error.message)
                        })

                    }
                } else {
                    toast("Please select Product", { theme: "dark", type: "error" })
                }
            }
        } catch (error) {
            toast(error.message, { theme: "dark", type: "error" })
        }

    }

    const applycoupen = async (value) => {
        if (userinfo.coupen_expire === "active" && userinfo.discount_status === "on") {
            if (mycoupndode === Discountcoupon.coupen_code) {
                if (coupenuse === false) {
                    if (Discountcoupon.amt) {
                        const data = totalamount - (Discountcoupon.amt);
                        setDiscountvalue(totalamount - data)
                        setCoupenuse(true)
                        setTotalamount(data)
                    } else if (Discountcoupon.percentage) {
                        const data = totalamount - totalamount * Discountcoupon.percentage / 100;
                        const change = parseInt(data)
                        setDiscountvalue(totalamount - change)
                        setCoupenuse(true)
                        setTotalamount(change)
                    } else {
                        toast("Please Enter Vaild coupen code", { theme: "dark", type: "error" })
                    }
                } else {
                    toast("Already apply this coupen", { theme: "dark", type: "error" })
                }
            } else {
                toast("Invaild Discount coupon code", { theme: "dark", type: "error" })
            }
        } else {
            toast("Please wait Next Offer", { theme: "dark", type: "error" })
        }
    }

    const initPayment = async (data) => {
        const options = {
            key: "rzp_test_cO7pDg41QK3SGE",
            amount: data.amount,
            currency: data.currency,
            name: "Shivansh Fab",
            image: { Logo },
            description: "Test Transaction",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifydata = await verifys(response)
                    console.log('verifydata', verifydata.data.paymentid)
                    toast("Payment Successfully", { theme: "dark", type: "success" })
                    if (!verifydata.data) {
                        toast("Payment Fail", { theme: "dark", type: "error" })
                    } else {
                        const mcartarr = [];
                        let specification = [];
                        for (let i = 0; i < cart.length; i++) {
                            let productid = cart[i].id
                            let order_items = {
                                "name": cart[i]?.products?.title,
                                "sku": cart[i]?.products?.sku_code + (cart[i]?.color ? "_" + cart[i]?.color : "") + (cart[i]?.size ? "_" + cart[i]?.size : ""),
                                "units": parseInt(cart[i].quantity),
                                "tax": "",
                                "selling_price": currency === "INR" ? (cart[i]?.products?.In_price * cart[i].quantity).toString() : (cart[i]?.products?.outIn_price * cart[i].quantity).toString(),
                                "discount": "0",
                                "hsn": 441122
                            }
                            mcartarr.push(order_items)

                            let order_items_specification = {
                                "name": cart[i]?.products?.title,
                                "product_id": cart[i].products?._id,
                                "product_sku_code": cart[i]?.products?.sku_code,
                                "sku": cart[i]?.products?.sku_code + (cart[i]?.color ? "_" + cart[i]?.color : "") + (cart[i]?.size ? "_" + cart[i]?.size : ""),
                                "units": parseInt(cart[i].quantity),
                                "tax": "",
                                "selling_price": currency === "INR" ? (cart[i]?.products?.In_price * cart[i].quantity).toString() : (cart[i]?.products?.outIn_price * cart[i].quantity).toString(),
                                "discount": "0",
                                "hsn": 441122,
                                "teching": cart[i]?.customizeteching
                            }
                            specification.push(order_items_specification)
                        }


                        let is_coupen = 0;
                        if (is_coupen === 0) {
                            if (coupenuse === true) {
                                is_coupen = 1
                            } else {
                                is_coupen = 0
                            }
                        }

                        try {
                            const orders = await orderapi({ payment_method: "online", productspecification: specification, productid: mcartarr, amount: totalamount, is_wallet: cutwalletamt, payment_id: verifydata.data.paymentid, is_coupen, shipping_is_billing, shipping_customer_name, shipping_last_name, shipping_address, shipping_address_2, shipping_city, shipping_pincode, shipping_country, shipping_state, shipping_email, shipping_phone, billing_customer_name, billing_last_name, billing_address, billing_address_2, billing_city, billing_pincode, billing_country, billing_state, billing_email, billing_phone, sub_total: totalamount, currency: currency })
                            if (orders.data.Success === 1) {
                                toast("order placed Successfully", { theme: "dark", type: "success" })
                                setCoupenuse(false)
                                setVerify(true)
                                setPayment(true)
                                navigate("/thankyou")
                                for (let i = 0; i < cart.length; i++) {
                                    dispatch(remove(cart[i]))
                                }
                            } else {
                                toast("order not placed ", { theme: "dark", type: "error" })
                            }
                        } catch (error) {
                            toast("Something went to wrong", { theme: "dark", type: "error" })
                        }

                    }
                } catch (error) {
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        const abcd = await rzp1.open();
        rzp1.on('payment.failed', function (response) {
            toast("payment Fail", { theme: "dark", type: "error" })
        });
    };
    const wallterapply = async () => {
        try {
            const mcartarr = [];
            let specification = [];
            for (let i = 0; i < cart.length; i++) {
                let productid = cart[i].id
                let order_items = {
                    "name": cart[i]?.products?.title,
                    "sku": cart[i]?.products?.sku_code + (cart[i]?.color ? "_" + cart[i]?.color : "") + (cart[i]?.size ? "_" + cart[i]?.size : ""),
                    "units": parseInt(cart[i].quantity),
                    "tax": "",
                    "selling_price": currency === "INR" ? (cart[i]?.products?.In_price * cart[i].quantity).toString() : (cart[i]?.products?.outIn_price * cart[i].quantity).toString(),
                    "discount": "0",
                    "hsn": 441122
                }
                mcartarr.push(order_items)

                let order_items_specification = {
                    "name": cart[i]?.products?.title,
                    "product_id": cart[i].products?._id,
                    "product_sku_code": cart[i]?.products?.sku_code,
                    "sku": cart[i]?.products?.sku_code + (cart[i]?.color ? "_" + cart[i]?.color : "") + (cart[i]?.size ? "_" + cart[i]?.size : ""),
                    "units": parseInt(cart[i].quantity),
                    "tax": "",
                    "selling_price": currency === "INR" ? (cart[i]?.products?.In_price * cart[i].quantity).toString() : (cart[i]?.products?.outIn_price * cart[i].quantity).toString(),
                    "discount": "0",
                    "hsn": 441122,
                    "teching": cart[i]?.customizeteching
                }
                specification.push(order_items_specification)
            }

            let orderamount = 0;
            if (currency === "INR") {
                cart.map((data) => {
                    console.log("🚀 ~ file: PaymentPage.jsx:307 ~ cart.map ~ data", data)
                    orderamount = orderamount + data?.products?.In_price * data.quantity
                })
            } else {
                cart.map((data) => {
                    console.log("🚀 ~ file: PaymentPage.jsx:307 ~ cart.map ~ data", data)
                    orderamount = orderamount + data?.products?.outIn_price * data.quantity
                })

            }


            let is_coupen = 0;
            if (is_coupen === 0) {
                if (coupenuse === true) {
                    is_coupen = 1
                } else {
                    is_coupen = 0
                }
            }

            try {
                if (billing_customer_name === "" && billing_last_name === "" && billing_address === "" && billing_address_2 === "" && billing_city === "" && billing_pincode === "" && billing_country === "" && billing_state === "" && billing_email === "" && billing_phone === "") {
                    toast("Please Fill All details", { theme: "dark", type: "error" })
                } else {
                    const orders = await orderapi({ payment_method: "online", productspecification: specification, productid: mcartarr, amount: orderamount, is_wallet: cutwalletamt, payment_id: "Wallet", is_coupen, shipping_is_billing, shipping_customer_name, shipping_last_name, shipping_address, shipping_address_2, shipping_city, shipping_pincode, shipping_country, shipping_state, shipping_email, shipping_phone, billing_customer_name, billing_last_name, billing_address, billing_address_2, billing_city, billing_pincode, billing_country, billing_state, billing_email, billing_phone, sub_total: totalamount, currency: currency })
                    if (orders.data.Success === 1) {
                        toast("order placed Successfully", { theme: "dark", type: "success" })
                        setCoupenuse(false)
                        setVerify(true)
                        setPayment(true)
                        navigate("/thankyou")
                        for (let i = 0; i < cart.length; i++) {
                            dispatch(remove(cart[i]))
                        }
                    } else {
                        toast("order not placed ", { theme: "dark", type: "error" })
                    }
                }
            } catch (error) {
                toast("Something went to wrong", { theme: "dark", type: "error" })
            }
        } catch (error) {
            toast("Please select Product", { theme: "dark", type: "error" })
        }
    }


    useEffect(() => {
        async function getdata() {
            for (let i = 0; i < cart.length; i++) {
                let order_items_specification = {
                    "name": cart[i]?.products?.title,
                    "product_id": cart[i].products?._id,
                    "product_sku_code": cart[i]?.products?.sku_code,
                    "sku": cart[i]?.products?.sku_code + (cart[i]?.color ? "_" + cart[i]?.color : "") + (cart[i]?.size ? "_" + cart[i]?.size : ""),
                    "units": parseInt(cart[i].quantity),
                    "tax": "",
                    "selling_price": currency === "INR" ? (cart[i]?.products?.In_price * cart[i].quantity).toString() : (cart[i]?.products?.outIn_price * cart[i].quantity).toString(),
                    "discount": "0",
                    "hsn": 441122,
                    "teching": cart[i]?.customizeteching
                }
                console.log("🚀 ~ file: PaymentPage.jsx:329 ~ wallterapply ~ order_items_specification", order_items_specification)
            }
        }
        getdata()
    }, [cart])


    return (
        <>
            <PaymentPageHeader />
            {/* <Header /> */}
            <div className="shopping-cart">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 cart-details">
                            {/* <h3>shopping cart</h3> */}
                            <div className="address  d-flex align-items-start">
                                <div className="modal-body pb-0">
                                    <h5>SHIPPING ADDRESS</h5>
                                    <hr />
                                    <div className='row'>
                                        <div className='col-6'><span className="login-name">First Name :</span>
                                            <input name="text" placeholder="Enter Your First Name" className="p-2 mt-2 w-100" value={billing_customer_name} onChange={e => { setBilling_customer_name(e.target.value) }} required /></div>
                                        <div className='col-6'> <span className="login-name d-block">Last Name :</span>
                                            <input name="text" placeholder="Enter Your Last Name" className="p-2 mt-2 w-100" value={billing_last_name} onChange={e => { setBilling_last_name(e.target.value) }} required /></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'><span className="login-name mt-2 d-block">Email :</span>
                                            <input type="email" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={billing_email} onChange={e => { setBilling_email(e.target.value) }} required /></div>
                                        <div className='col-6'><span className="login-name mt-2 d-block">Number :</span>
                                            <input type="number" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={billing_phone} onChange={e => { setBilling_phone(e.target.value) }} required /></div>
                                    </div>
                                    <span className="login-name mt-2 d-block">Your Address :</span>
                                    <input type="numeric" placeholder="Enter Your Address" className="p-2 mt-2 w-100" value={billing_address} onChange={e => { setBilling_address(e.target.value) }} required />
                                    <span className="login-name mt-2 d-block">Your Address2 :</span>
                                    <input type="numeric" placeholder="Enter Your Address2" className="p-2 mt-2 w-100" value={billing_address_2} onChange={e => { setBilling_address_2(e.target.value) }} required />
                                    <div className='row'>
                                        <div className='col-6'><span className="login-name mt-2 d-block">City :</span>
                                            <input type="text" placeholder="Enter Your City" className="p-2 mt-2 w-100" value={billing_city} onChange={e => { setBilling_city(e.target.value) }} required /></div>
                                        <div className='col-6'><span className="login-name mt-2 d-block">Your State :</span>
                                            <input type="text" placeholder="Enter Your State" className="p-2 mt-2 w-100" value={billing_state} onChange={e => { setBilling_state(e.target.value) }} required /></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'><span className="login-name mt-2 d-block">Zip/ Postal code :</span>
                                            <input type="number" placeholder="Enter Your Pincode" className="p-2 mt-2 w-100" value={billing_pincode} onChange={e => { setBilling_pincode(e.target.value) }} required /></div>
                                        <div className='col-6'><span className="login-name mt-2 d-block">Country :</span>
                                            <input type="text" placeholder="Enter Your Country" className="p-2 mt-2 w-100" value={billing_country} onChange={e => { setBilling_country(e.target.value) }} required /></div>
                                    </div>

                                    <div className='mt-3'>  <input type="checkbox" value={shipping_is_billing} onClick={(e) => setShipping_is_billing(!shipping_is_billing)} checked={shipping_is_billing === true ? true : false} /> My billing and shipping address are the same </div>
                                </div>
                            </div>
                            <div className={`address mt-3 d-flex align-items-start truActive ${shipping_is_billing ? "trueNone" : ""}`} >
                                <div className="modal-body pb-0">
                                    <h5>BILLING ADDRESS</h5>
                                    <hr />
                                    <div className='row'>
                                        <div className='col-6'><span className="login-name">First Name :</span>
                                            <input name="text" placeholder="Enter Your First Name" className="p-2 mt-2 w-100" value={shipping_customer_name} onChange={e => { setShipping_customer_name(e.target.value) }} /></div>
                                        <div className='col-6'> <span className="login-name d-block">Last Name :</span>
                                            <input name="text" placeholder="Enter Your Last Name" className="p-2 mt-2 w-100" value={shipping_last_name} onChange={e => { setShipping_last_name(e.target.value) }} /></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'><span className="login-name mt-2 d-block">Email :</span>
                                            <input type="email" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={shipping_email} onChange={e => { setShipping_email(e.target.value) }} /></div>
                                        <div className='col-6'><span className="login-name mt-2 d-block">Number :</span>
                                            <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={shipping_phone} onChange={e => { setShipping_phone(e.target.value) }} /></div>
                                    </div>
                                    <span className="login-name mt-2 d-block">Your Address :</span>
                                    <input type="numeric" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={shipping_address} onChange={e => { setShipping_address(e.target.value) }} />
                                    <span className="login-name mt-2 d-block">Your Address2 :</span>
                                    <input type="numeric" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={shipping_address_2} onChange={e => { setShipping_address_2(e.target.value) }} />
                                    <div className='row'>
                                        <div className='col-6'><span className="login-name mt-2 d-block">City :</span>
                                            <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={shipping_city} onChange={e => { setShipping_city(e.target.value) }} /></div>
                                        <div className='col-6'><span className="login-name mt-2 d-block">Your State :</span>
                                            <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={shipping_state} onChange={e => { setShipping_state(e.target.value) }} /></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'><span className="login-name mt-2 d-block">Zip/ Postal code :</span>
                                            <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={shipping_pincode} onChange={e => { setShipping_pincode(e.target.value) }} /></div>
                                        <div className='col-6'><span className="login-name mt-2 d-block">Country :</span>
                                            <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={shipping_country} onChange={e => { setShipping_country(e.target.value) }} /></div>
                                    </div>

                                </div>

                            </div>

                            {/* <div className="payment-detail mt-4 d-flex flex-column">
                                <h5 className="payment">payment mathod</h5>
                                <a onClick={() => setPayactive("Online")} className={payactive === "Online" ? "mt-4 mx-4 d-flex active justify-content-between pay" : "mt-4 mx-4 d-flex align-items-center pay"}>
                                    <span className="">Razorpay Secure  (UPI, Cards, Wallets, NetBanking)</span>
                                    <div className='mx-2'>
                                        <img src="./image/upi.png" className="img-fluid mx-1" alt="phonepe" draggable="false" />
                                        <img src="./image/google.png" className="img-fluid mx-1" alt="phonepe" draggable="false" />
                                        <i className="fa-solid fa-credit-card mx-1"></i>
                                    </div>
                                </a>
                                <a onClick={() => setPayactive("Cod")} className={payactive === "Cod" ? "mt-4 mx-4 d-flex align-items-center active pay" : "mt-4 mx-4 d-flex align-items-center  pay"}>
                                    <i className="fa-sharp fa-solid fa-money-bill-1-wave"></i>
                                    <span className="ms-3">cash on delivery</span>
                                </a>
                                <a onClick={handlePayment} className="mt-4 mx-4 btn">
                                    Pay Now
                                </a>
                            </div> */}
                        </div>
                        <div className="col-lg-4 col-md-5 order-detail">
                            <div className="address  ">
                                <div className="payment-detail mt-3 d-flex flex-column">
                                    <h5 className="payment">payment mathod</h5>
                                    {cutwalletamt === true ?
                                        <>
                                            {
                                                usershowoption === true ?
                                                    <>

                                                        <a onClick={() => setPayactive("Wallet Online")} className={payactive === "Online" ? "mt-4 mx-4 d-flex active justify-content-between pay" : "mt-4 mx-4 d-flex align-items-center pay"}>
                                                            <span className="">Razorpay Secure  (UPI, Cards, Wallets, NetBanking)</span>
                                                            <div className='mx-2'>
                                                                <img src="/image/upi.png" className="img-fluid mx-1" alt="phonepe" draggable="false" />
                                                                <img src="/image/google.png" className="img-fluid mx-1" alt="phonepe" draggable="false" />
                                                                <i className="fa-solid fa-credit-card mx-1"></i>
                                                            </div>
                                                        </a>
                                                        <a onClick={handlePayment} className="mt-4 mx-4 btn">
                                                            Pay Now
                                                        </a>

                                                    </>
                                                    :
                                                    <>
                                                        {/* <div className="payment-detail mt-4 d-flex flex-column"> */}
                                                        <a onClick={wallterapply} className="mt-4 mx-4 btn">
                                                            Order Now
                                                        </a>
                                                        {/* </div> */}
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            <a onClick={() => setPayactive("Online")} className={payactive === "Online" ? "mt-4 mx-4 d-flex active justify-content-between pay" : "mt-4 mx-4 d-flex align-items-center pay"}>
                                                <span className="">Razorpay Secure  (UPI, Cards, Wallets, NetBanking)</span>
                                                <div className='mx-2'>
                                                    <img src="/image/upi.png" className="img-fluid mx-1" alt="phonepe" draggable="false" />
                                                    <img src="/image/google.png" className="img-fluid mx-1" alt="phonepe" draggable="false" />
                                                    <i className="fa-solid fa-credit-card mx-1"></i>
                                                </div>
                                            </a>
                                            {
                                                currency === "INR" ?
                                                    <a onClick={() => setPayactive("Cod")} className={payactive === "Cod" ? "mt-4 mx-4 d-flex align-items-center active pay" : "mt-4 mx-4 d-flex align-items-center  pay"}>
                                                        <i className="fa-sharp fa-solid fa-money-bill-1-wave"></i>
                                                        <span className="ms-3">cash on delivery</span>
                                                    </a>
                                                    :
                                                    <>
                                                    </>

                                            }
                                            <a onClick={handlePayment} className="mt-4 mx-4 btn">
                                                Pay Now
                                            </a>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 order-detail">

                            <div className="your-order">
                                <h5>your order</h5>

                                <div className="maxProhght">
                                    {
                                        action === "payselect" ?
                                            <>
                                                <div className="youroder-details d-flex align-items-center">
                                                    <div className="pull-left">
                                                        <a href="#">
                                                            <img src={cartdata[0]?.products?.photo} className="img-circle" alt="cart"
                                                                draggable="false" />
                                                        </a>
                                                    </div>
                                                    <div className="cartname ps-3">
                                                        <a className="catpro-name">
                                                            {cartdata[0]?.products?.title}
                                                        </a>
                                                        <div className="d-block fw-bold">color: {cartdata[0]?.color}</div>
                                                        <div className="d-block fw-bold">size:{cartdata[0]?.size}</div>
                                                        <div className="d-block fw-bold">quantity: {cartdata[0]?.quantity}</div>
                                                    </div>
                                                    {
                                                        currency === "INR" ?
                                                            <span className="order-price ms-auto">₹{cartdata[0]?.products?.In_price  * cartdata[0].quantity  }</span>
                                                            :
                                                            <span className="order-price ms-auto">${cartdata[0]?.products?.outIn_price * cartdata[0].quantity}</span>
                                                    }
                                                </div>
                                            </>
                                            :
                                            <>
                                                {
                                                    cart.map((data) =>
                                                        <div className="youroder-details d-flex align-items-center my-2">
                                                            <div className="pull-left">
                                                                <a href="#">
                                                                    <img src={data?.products?.photo} className="img-circle" alt="cart"
                                                                        draggable="false" />
                                                                </a>
                                                            </div>
                                                            <div className="cartname px-2">
                                                                <a className="catpro-name">
                                                                    {data?.products?.title}
                                                                </a>
                                                                <div className="d-block"><span className="fw-bold">color:</span> {data?.color}</div>
                                                                {data?.size ?
                                                                    <div className="d-block fw-bold">size:{data?.size}</div>
                                                                    :
                                                                    <div className="d-block fw-bold"></div>

                                                                }
                                                                <div >quantity: {data?.quantity}</div>
                                                            </div>
                                                            {
                                                                currency === "INR" ?
                                                                    <span className="order-price ms-auto">₹{data?.products?.In_price * data.quantity}</span>
                                                                    :
                                                                    <span className="order-price ms-auto">${data?.products?.outIn_price * data.quantity}</span>
                                                            }
                                                        </div>
                                                    )}
                                            </>

                                    }
                                </div>



                                <div className="discount d-flex align-items-center mt-2">
                                    <input type="text" placeholder="Discount Code" onChange={e => { setMycoupndode(e.target.value) }} className="px-3 py-2 w-100" />
                                    <a onClick={applycoupen} className="ms-3 btn">apply</a>
                                </div>
                                <div className="total mt-4">
                                    <table className="table table-bordered mb-0">
                                        <tbody>
                                            <tr>
                                                <td className="text-start"><strong>Discount</strong></td>
                                                <td className="text-end">₹{discountvalue}</td>
                                            </tr>
                                            <tr>
                                                {
                                                    userinfo.wallet?.currency === currency && userinfo.wallet?.amount ?
                                                        <>
                                                            <td className="text-start"><strong>Wallet Amount</strong></td>
                                                            <td className="text-end">{currency === "INR" ? "₹" : "$"} {userinfo.wallet?.amount}
                                                                <div className='mt-3'>  <input type="checkbox" value={cutwalletamt} onClick={(e) => setCutwalletamt(!cutwalletamt)} /> Cut amount from wallet           </div>
                                                            </td>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }

                                            </tr>
                                            {/* <tr>
                                                <td className="text-start"><strong>Remain amount</strong></td>
                                                <td className="text-end">{remainamount}</td>
                                                <td className="text-end">₹{totalamount * 5 / 100}</td>
                                            </tr> */}
                                            <tr>
                                                <td className="text-start"><strong>Total <hr />Include All Tax</strong></td>
                                                {
                                                    currency === "INR" ?
                                                        <td className="text-end">₹{totalamount}</td>
                                                        :
                                                        <td className="text-end">${totalamount}</td>
                                                }
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PaymentPageFooter />
            {/* <Footer /> */}
        </>
    )
}

export default PaymentPage
