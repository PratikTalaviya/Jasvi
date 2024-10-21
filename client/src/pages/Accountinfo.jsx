import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { getloginuser, UpdateUser } from '../https/axios'
import { toast } from 'react-toastify'
const Accountinfo = () => {

  const [userdata, setUserdata] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [phone, setPhone] = useState('')
  const [date_of_birth, setDate_of_birth] = useState('')
  useEffect(() => {
    async function user() {
      const udetail = await getloginuser()
      console.log("🚀 ~ file: Accountinfo.jsx:16 ~ user ~ udetail", udetail)
      setUserdata(udetail.data.User)
    }
    user()
  }, [])
  const updatedata = async () => {
    const updateuserd = await UpdateUser({ first_name, last_name })
    if (updateuserd.data?.Success === 1) {
      setFirst_name('')
      setLast_name('')
      setPhone('')
      setDate_of_birth('')
      toast("Update Detail Successfully", { theme: "dark", type: "success" })
      window.location.reload();
    }
  }

  return (
    <>
      <Header />
      <div className="container">

        <div className="shop-login mt-4 d-flex align-items-start">
          <i className="fa-solid fa-user icon mt-1"></i>
          <div className="login-details ms-4">
            <h5 className="d-block detail-title">login details</h5>
            <div className="your-detail mt-2">

              <div>
                <span><strong>First Name  :</strong> {userdata?.first_name}</span>
                <span><strong>last Name :</strong> {userdata?.last_name}</span>
                <span><strong>number :</strong> {userdata?.phone}</span>
              </div>


            </div>
          </div>
          <a href="#" className="ms-auto change-detail" data-bs-toggle="modal" data-bs-target="#personal-detail">EDIT</a>
          <div className="modal fade" id="personal-detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title edit-add" id="exampleModalLabel">Edit Your New details</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body pb-0">
                  <span className="login-name">Your First Name :</span>
                  <input name="text" placeholder="Enter Your First Name" className="p-2 mt-2 w-100" value={first_name} onChange={e => { setFirst_name(e.target.value) }} />
                  <span className="login-name mt-3 d-block">Your Last Name :</span>
                  <input name="text" placeholder="Enter Your Last Name" className="p-2 mt-2 w-100" value={last_name} onChange={e => { setLast_name(e.target.value) }} />
                  {/* <span className="login-name mt-3 d-block">Your Number :</span> */}
                  {/* <input type="numeric" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setPhone(e.target.value) }} /> */}
                  {/* <span className="login-name mt-3 d-block">Your Date Of Birth :</span> */}
                  {/* <input type="date" placeholder="dd / mm / yyyy" className="p-2 mt-2 w-100" value={date_of_birth} onChange={e => { setDate_of_birth(e.target.value) }} /> */}
                </div>
                <div className="modal-footer">
                  <a onClick={updatedata} className="btn btn-secondary">Enter</a>
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

export default Accountinfo
