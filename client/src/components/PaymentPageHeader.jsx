import React from 'react'

const PaymentPageHeader = () => {
    return (
        <header>
            <div className="header-primary-container head-sti">
                <div className="header-primary-paymentpage header container">
                    <div className="d-flex justify-content-center align-items-center">
                        <a href="/" className="mx-auto">
                            <img
                                src="/image/logo.png"
                                draggable="false"
                                alt="Brand Logo"
                                className="img-fluid"
                            />
                        </a>
                    </div>
                    <hr className='darkline'/>
                </div>
            </div>
        </header>
    )
}

export default PaymentPageHeader