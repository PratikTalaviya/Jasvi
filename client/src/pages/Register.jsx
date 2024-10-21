import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Registeruser } from '../https/axios'
import { useFormik } from 'formik'
import { signUpuser } from '../schemas/register'

const initialValues = {
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
}
const Register = () => {

    const navigate = useNavigate()
    const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpuser,
        onSubmit: async (values, action) => {
            try {
                const userregister = await Registeruser({ email: values.email, password: values.password, confirmpassword: values.confirmpassword, phone: "+"+values.phone })
                if (userregister.data.success===1) {
                    navigate("/verify")
                    toast("Otp available foe only 30 second", { theme: "dark", type: "success" })
                }else{
                    toast("User is not Register ", { theme: "dark", type: "error" })
                }
            } catch (error) {
                navigate("/register")
                toast("User Not Register", { theme: "dark", type: "error" })
            }
            action.resetForm();
        }
    })
    return (
        <div className='sign-in'>
            <div className="login">
                <div className="container">
                    <div className="row cusHeight d-flex justify-content-center align-items-center">
                        <div className="row m-0 justify-content-center">
                            <div className="col-lg-6 col-md-12 col-sm-12 right-side login-bg">
                                <div className="p-5">
                                    <img src="/image/logo.png" alt="Brand Logo" draggable="flase" className="img-fluid d-flex mx-auto mb-5 RegLogo" />
                                    <form onSubmit={handleSubmit}>
                                        <span className="login-name">phone number :</span>
                                        <input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Enter Your Phone Number"
                                            name='phone' value={values.phone} onChange={handleChange} onBlur={handleBlur} required />
                                        {errors.phone && touched.phone ? <p className='form-error'>{errors.phone}</p> : null}
                                        <span className="login-name f-12">Email :</span>
                                        <input type="text" placeholder="Enter Your Email Address"
                                            name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} required />
                                        {errors.email && touched.email ? <p className='form-error'>{errors.email}</p> : null}

                                        <span className="login-name f-12">password :</span>
                                        <input type="password" placeholder="Enter Your Password"
                                            name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} required />
                                        {errors.password && touched.password ? <p className='form-error'>{errors.password}</p> : null}

                                        <span className="login-name f-12">confirm password :</span>
                                        <input type="password" placeholder="Confirm Your Password"
                                            name='confirmpassword' value={values.confirmpassword} onChange={handleChange} onBlur={handleBlur} required />
                                        {errors.confirmpassword && touched.confirmpassword ? <p className='form-error'>{errors.confirmpassword}</p> : null}

                                        <button type='submit' className="btn sign-btn w-100 mt-4">
                                            <span>Submit</span>
                                        </button>
                                        <Link to='/login' >
                                            <h6 className="an-account text-center">Already a user? </h6>
                                        </Link>
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

export default Register
