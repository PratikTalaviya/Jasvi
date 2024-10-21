import React,{useEffect, useState} from 'react'
import { ChangePass, getloginuser } from '../https/axios'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ChangePassword = () => {
    const location = useLocation()
    const token = (location.search).split("=")[1]
    const [password, setpassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const navigate = useNavigate()

    
    const senddata = async () => {
        try {
            if(password || cpassword){
                const changepass = await ChangePass({password,cpassword,token})
                if(changepass.data.Success === 1){
                      toast("Password Changed Sucessfully", { theme: "dark", type: "success" })
                      navigate("/login")
                }else {
                    toast("Login Fail", { theme: "dark", type: "error" })
                   }
            }else{
                toast("Please fill details", { theme: "dark", type: "error" })
            }
        } catch (error) {
            toast("Change Password Fail", { theme: "dark", type: "error" })
        }
    }

  return (
    <>
          <div className="sign-in" >
              <div className="login">
                  <div className="container">
                      <div className="row cusHeight d-flex justify-content-center align-items-center">
                          <div className="row m-0 justify-content-center">
                              <div className="col-lg-6 col-md-12 col-sm-12 left-side login-bg">
                                  <div className="p-5">
                                      <h3 className="signin text-center">Change Password</h3>
                                      <span className="login-name f-12">New Password :</span>
                                      <input type="password" placeholder="Enter Your New password"  value={password} onChange={e => { setpassword(e.target.value) }} />
                                      <span className="login-name f-12">Confim Password :</span>
                                      <input type="password" placeholder="Enter Password" value={cpassword} onChange={e => { setCpassword(e.target.value) }} />
                                      <a onClick={senddata} className="btn sign-btn w-100 mt-0">
                                          <span>submit</span>
                                      </a>
                                      <h6 className="an-account text-center">Don't have an account? <a href="register.html"
                                          className="ms-2"><strong>Create Account</strong></a></h6>
                                  </div>
                                  <div className="col-lg-6 col-md-12 col-sm-12 p-0 sign-bnr d-none d-lg-block"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </>
  )
}

export default ChangePassword
