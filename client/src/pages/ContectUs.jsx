// import { set } from 'immer/dist/internal'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { ContactUs } from '../https/axios'

const ContectUs = () => {
    const navigate = useNavigate()
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')

    const sendcontectus = async () => {
        try {
            if (firstname || lastname || email || phone || message) {
                const contectus = await ContactUs({ firstname, lastname, email, phone, message })
                if (contectus) {
                    setfirstname('')
                    setlastname('')
                    setPhone('')
                    setEmail('')
                    setMessage('')
                    navigate("/contectus")
                    toast("Message send sucessfully", { theme: "dark", type: "success" })
                }
                else {
                    navigate("/contectus")
                    toast("Please fill details", { theme: "dark", type: "error" })
                }
            } else {
                navigate("/contectus")
                toast("Please fill details", { theme: "dark", type: "error" })
            }
        } catch (error) {
            navigate("/contectus")
            toast("Does not send message", { theme: "dark", type: "error" })
        }
    }
    return (
        <>
            <Header />
            <div className="contact">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/" className="bread-des"><i className="fa fa-home"></i></Link>
                        </li>
                        <li>
                            <Link to="/contectus">Contact Us</Link>
                        </li>
                    </ul>
                    <h5 className="about-txt pb-3">contact us</h5>
                    <div className="contact-detail nt-md-4 mt-3">
                        <i className="fa-solid fa-user"></i>
                        <span className="ms-2">our fashion</span>
                    </div>
                    <div className="contact-detail mt-md-4 mt-3">
                        <i className="fa-solid fa-phone"></i>
                        <span className="ms-2">+261 874 5121</span>
                    </div>
                    <div className="contact-detail mt-md-4 mt-3">
                        <i className="fa-solid fa-location-dot"></i>
                        <span className="ms-2">Surat,Gujarat.</span>
                    </div>
                    <div className="row mt-md-5 mt-3 d-flex align-items-start personal-contact">
                        <div className="col-lg-6 col-md-12">
                            <div className="row">
                                <div className="col-sm-6 fname">
                                    <span className="login-name f-12">first name :</span>
                                    <input type="text" className="w-100 px-3 py-2 mt-1" required value={firstname} onChange={e => { setfirstname(e.target.value) }} placeholder="Your First Name" />
                                </div>
                                <div className="col-sm-6 lname mt-sm-0 mt-3">
                                    <span className="login-name f-12">last name :</span>
                                    <input type="text" className="w-100 px-3 py-2 mt-1" required value={lastname} onChange={e => { setlastname(e.target.value) }} placeholder="Your Last Name" />
                                </div>
                            </div>
                            <span className="login-name mt-3 d-block">Phone Number :</span>
                            <input type="number" className="w-100 px-3 py-2 mt-1" value={phone} required onChange={e => { setPhone(e.target.value) }} placeholder="Your Phone Number" />
                            <span className="login-name f-12 mt-3 d-block">Email :</span>
                            <input type="email" className="w-100 px-3 py-2 mt-1" placeholder="Your Email" required value={email} onChange={e => { setEmail(e.target.value) }} />
                        </div>
                        <div className="col-lg-6 col-md-12 d-flex flex-column mt-lg-0 mt-md-3 mt-3">
                            <span className="login-name">Write Your Message :</span>
                            <textarea name="text" placeholder="Your Message" value={message} required onChange={e => { setMessage(e.target.value) }} className="p-2 mt-2 w-100" rows="8.8"></textarea>
                            <div className="ms-auto"><button onClick={sendcontectus} className="btn">submit</button></div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default ContectUs
