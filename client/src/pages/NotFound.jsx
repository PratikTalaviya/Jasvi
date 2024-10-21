import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const NotFound = () => {
  return (
    <>
    <Header/>
       <div className="error mt-md-5 mt-3">
        <div className="container">
            <div className="row justify-content-center">                
                <div className="col-lg-6 col-md-8">
                    <img src="/image/404/404-Error.png" draggable="false" alt="Brand Logo" className="img-fluid"/>
                    <Link to="/" className='d-flex text-center'>Go To Home Page</Link>
                </div>                
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default NotFound