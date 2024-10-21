import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GetCart, Logout } from '../https/axios'
import { setLogIn, setUser } from '../redux/Slice/userSlice'
import Addtocartbt from './Addtocartbt'
import Categorynav from './Categorynav'

const HedarSingle = ({products, setFilteredData}) => {
  const { isLoggedIn } = useSelector((state) => state.userinfo)
  // const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cartcount, setCartcount] = useState([])

  // const changeSearch = async (e) => {
  //   setSearch(e.target.value)
  //   const filterdatas = products.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
  //   setFilteredData(filterdatas)
  // }

  useEffect(() => {
    async function cartdata() {
      const cartuser = await GetCart()
      setCartcount(cartuser.data.UserCart)
    }
    cartdata()
  }, [])

  const signout = () => {
    const logouts = Logout()
    dispatch(setLogIn(false))
    dispatch(setUser(''))
    navigate("/login")
    toast("Logout Successfully", { type: 'success', theme: "dark" })
  }


  return (
    <>
      <header >
        <div className="header-container">
          <div className="head-top">
            <div className="head-contant text-center f-14">
              <span>Up to 70% Off + 50% Off Stitching* & Cashback</span>
            </div>
          </div>
        </div>
        <div className="header-primary-container head-sti">
          <div className="header-primary header container">
            <div className="row flex-column flex-lg-row">
              
              <div className="col-lg-4 d-flex my-3 my-lg-0 order-2 order-lg-2">
                <Link to="/" className="mx-auto">
                  <img src="/image/logo.png" draggable="false" alt="Brand Logo" className="img-fluid" />
                </Link>
              </div>
              <div
                className="col-lg-4 d-flex justify-content-center justify-content-lg-end align-items-center order-0 order-lg-3">
                <div className="menu">
                  <ul className="nav d-flex flex-nowrap justify-content-end">
                    {
                      isLoggedIn === true ?
                        <li className="nav-item">
                          <a onClick={signout} className="nav-link">Logout</a>
                        </li>
                        :
                        <li className="nav-item">
                          <a className="nav-link" href="/login">Log in</a>
                        </li>
                    }


                    <li className="nav-item">
                      <a className="nav-link" href="/wishlist">Wishlist</a>
                    </li>
                  </ul>

                </div>
                <Addtocartbt />
                <div className="ms-4">
                  <i className="fa-solid fa-bars navbar"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Categorynav />
      </header>
    </>
  )
}

export default HedarSingle