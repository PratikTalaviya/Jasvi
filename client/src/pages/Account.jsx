import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Account = () => {
    return (
        <>
            <Header/>
            <div className="account-page">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/" className="bread-des"><i className="fa fa-home"></i></Link>
                        </li>
                        <li>
                            <Link to="/" className="bread-des">Home</Link>
                        </li>
                        <li>
                            <a href="#">account</a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-6">
                                    <Link to="/accountinfo" className="account-detail d-flex align-items-center">
                                        <span className="acc-icon"><i className="fa-solid fa-user"></i></span>
                                        <h6>
                                            your account information
                                            <span className="d-block">your account</span>
                                        </h6>
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/resetpassword" className="account-detail d-flex align-items-center">
                                        <span className="acc-icon"><i className="fa-solid fa-bag-shopping"></i></span>
                                        <h6>
                                            change your password
                                            <span className="d-block">change password</span>
                                        </h6>
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/trackorder" className="account-detail d-flex align-items-center">
                                        <span className="acc-icon"><i className="fa-solid fa-arrow-right-arrow-left"></i></span>
                                        <h6>
                                            view your order history
                                            <span className="d-block">see your order history</span>
                                        </h6>
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/return" className="account-detail d-flex align-items-center">
                                        <span className="acc-icon"><i className="fa-solid fa-clock-rotate-left"></i></span>
                                        <h6>
                                            view your return requests
                                            <span className="d-block">see your return</span>
                                        </h6>
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/transaction" className="account-detail d-flex align-items-center mb-0">
                                        <span className="acc-icon"><i className="fa-solid fa-file-invoice"></i></span>
                                        <h6>
                                            your transactions
                                            <span className="d-block">see your transaction</span>
                                        </h6>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mt-sm-4">
                            <div className="order-hiastory">
                                <h4>account setting</h4>
                                <Link to="/accountinfo">my account</Link>
                                <Link to="/resetpassword">change password</Link>
                                <Link to="/trackorder">order history</Link>
                                <Link to="/return">return history</Link>
                                <Link to="/transaction">transaction</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Account