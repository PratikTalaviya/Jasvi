import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Thankyoupage = () => {
  return (
    <div>
      <Header />

      <div className="thankyou mt-md-5 mt-3">
        <div className="container">
          <div className="thank-visit text-center">
            <img src="/image/ThankYou-Visit/Right.png" className="img-circle" alt="cart" draggable="false" />
            <h1 className="visit mt-4">thank you for visit</h1>
            <Link to="/" className="btn btn-primary">continue shopping</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default Thankyoupage