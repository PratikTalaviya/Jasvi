import React,{useState,} from 'react'
import { ResetPass } from '../https/axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const senddata = async () => {
        try {
            if(email){
                const resetpass = await ResetPass({email})
                if(resetpass.data.Success === 1){
                    toast("The reset password link has been sent to your email address", { theme: "dark", type: "success" })
                    navigate("/login")
                }else {
                  navigate("/resetpassword")
                  toast("Please Enter Correct Email Address", { theme: "dark", type: "error" })
                 }
            }else {
              // navigate("/resetpassword")
              toast("Login Fail", { theme: "dark", type: "error" })
             }
        } catch (error) {
            toast("Email Fail", { theme: "dark", type: "error" })
            // navigate("/resetpassword")
        }
    }
    

  return (
    <>
      <div className="sign-in">
        <div className="login">
          <div className="container">
            <div className="row cusHeight d-flex justify-content-center align-items-center">
              <div className="row m-0 justify-content-center">
                {/* <div className="col-lg-6 col-md-12 col-sm-12 p-0 sign-bnr d-none d-lg-block"></div> */}
                <div className="col-lg-6 col-md-12 col-sm-12 left-side login-bg">
                  <div className="p-5">
                    <h3 className="signin text-center">Reset Password</h3>
                    <span className="login-name f-12">Email :</span>
                    <input type="text" placeholder="Enter Your Email" value={email} onChange={e => { setEmail(e.target.value) }} />
                    <button  className="btn sign-btn w-100 mt-0">
                      <span onClick={senddata} >submit</span>
                    </button>
                    <h6 className="an-account text-center">Don't have an account? <Link to="/register"
                      className="ms-2"><strong>Create Account</strong></Link></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
