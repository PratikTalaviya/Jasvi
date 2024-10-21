import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { loginuser } from '../https/axios'
import { setLogIn, setUser } from '../redux/Slice/userSlice'
import { LoginUser } from '../schemas/Login'



const initialValues = {
    email: "",
    password: "",
}
const Login = () => {
    const dispatch = useDispatch()
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: LoginUser,
        onSubmit: async (values, action) => {
            try {
                if (values.email && values.password) {
                    const userlogin = await loginuser({ email: values.email, password: values.password })
                    if (userlogin?.data?.success === 1) {
                        dispatch(setUser(userlogin?.data?.User))
                        dispatch(setLogIn(true))
                        toast("Login Sucessfully", { theme: "dark", type: "success" })
                        navigate("/")
                    } else {
                        navigate("/login")
                        toast("Login Fail", { theme: "dark", type: "error" })
                    }
                } else {
                    toast("Please fill details", { theme: "dark", type: "error" })
                    navigate("/login")
                }
            } catch (error) {
                toast("Login Fail", { theme: "dark", type: "error" })
                navigate("/login")
            }
            action.resetForm();
        }
    })
    return (
        <div className="sign-in">
            <div className="login">
                <div className="container">
                    <div className="row cusHeight d-flex justify-content-center align-items-center">
                        <div className="row m-0 justify-content-center">
                            {/* <div className="col-lg-6 col-md-12 col-sm-12 p-0 sign-bnr d-none d-lg-block"></div> */}
                            <div className="col-lg-6 col-md-12 col-sm-12 left-side login-bg">
                                <div className="p-5">
                                    <img src="/image/logo.png" alt="Brand Logo" draggable="flase" className="img-fluid d-flex mx-auto mb-5 RegLogo" />

                                    <form onSubmit={handleSubmit}>
                                        {/* <h3 className="signin text-center">sign in</h3> */}
                                        <span className="login-name f-12">Email</span>
                                        <input type="text" placeholder="Enter Your Email Address"
                                            name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} required />
                                        {errors.email && touched.email ? <p className='form-error'>{errors.email}</p> : null}
                                        {/* <input type="text" placeholder="Enter Your Email" value={email} onChange={e => { setEmail(e.target.value) }} required /> */}
                                        <span className="login-name f-12">password</span>
                                        <input type="password" placeholder="Enter Your Password"
                                            name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} required />
                                        {errors.password && touched.password ? <p className='form-error'>{errors.password}</p> : null}
                                        {/* <input type="password" placeholder="Enter Your Password" value={password} onChange={e => { setPassword(e.target.value) }} required /> */}
                                        {/* <div className="remember d-flex justify-content-between align-items-center"> */}
                                            {/* <div className="check">
                                                <label>
                                                    <input type="checkbox" id="" name="" value="" className="text-left check" />
                                                    <span className="ms-2">remember for 30 days</span>
                                                </label>
                                            </div> */}
                                            <h6 className="forgot text-end">
                                                <Link to="/resetpassword">forgot password?</Link>
                                            </h6>
                                        {/* </div> */}
                                        <button type='submit' className="btn sign-btn w-100 mt-4" >
                                            <spen>sign in</spen>
                                        </button>
                                        <h6 className="an-account text-center">Don't have an account? <Link to="/register" className="ms-2"><strong>Create Account</strong></Link></h6>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
