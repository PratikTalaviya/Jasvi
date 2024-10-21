import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { otpverifyUser, resendotpUser } from '../https/axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { otpverify } from './../schemas/otpverify';

const initialValues = {
    phone: "",
    OTP: ""
}
const Otpverify = () => {
    const navigate = useNavigate()

    // const [timer, setTimer] = useState(false)
    // const [count, setCount] = useState(0)
    // const [movieLink, setMovieLink] = useState(false)

    const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: otpverify,
        onSubmit: async (values, action) => {
            try {
                const otpverifyuser = await otpverifyUser({ otpcode: Number(values.OTP), phone: "+" + values.phone })
                if (otpverifyuser.data.Success === 1) {
                    navigate("/login")
                    toast("User Verify successfully", { theme: "dark", type: "success" })
                }
            } catch (error) {
                toast("OTP exipre", { theme: "dark", type: "error" })
            }
            action.resetForm();
        }
    })

    const resendotp = async () => {
        try {
            const otpverifyuser = await resendotpUser({})
            if(otpverifyuser.data.success === 1){
                toast("OTP send successfully", { theme: "dark", type: "success" })
            }else{
                toast("User Not verify", { theme: "dark", type: "error" })    
            }
        } catch (error) {
            toast("User Not verify", { theme: "dark", type: "error" })
        }
    }


    // const show = {
    //     display: "block"
    // }
    // const hide = {
    //     display: "none"
    // }
    // const startCounter = async () => {
    //     setWatchMore(false);
    //     setTimer(true);
    //     let countdown = 30
    //     const thisInterwal = setInterval(function counter() {
    //         if (countdown > 0) {
    //             countdown--;
    //             setCount(countdown)
    //         } else {
    //             clearInterval(thisInterwal)
    //             getMovie();
    //             setTimer(false);
    //         }
    //     }, 1000)
    // }
    // const getMovie = () => {
    //     setTimer(false);
    //     setMovieLink(true)
    // }
    return (
        <div className='sign-in'>
            <div className="login">
                <div className="container">
                    <div className="row cusHeight d-flex justify-content-center align-items-center">
                        <div className="row m-0 justify-content-center">
                            <div className="col-lg-6 col-md-12 col-sm-12 right-side login-bg">
                                <div className="p-5">
                                    <a href="/"><img src="/image/logo.png" alt="Brand Logo" draggable="flase" className="img-fluid d-flex mx-auto mb-5 RegLogo" />
                                    </a>
                                    <form onSubmit={handleSubmit}>
                                        {/* <h3 className="signin text-center fw-bold">Register</h3> */}

                                        <span className="login-name">phone number :</span>
                                        <input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Enter Your Phone Number"
                                            name='phone' value={values.phone} onChange={handleChange} onBlur={handleBlur} required />
                                        {errors.phone && touched.phone ? <p className='form-error'>{errors.phone}</p> : null}
                                        <span className="login-name f-12">OTP :</span>
                                        <input type="text" placeholder="Enter Your One Time Password"
                                            name='OTP' value={values.OTP} onChange={handleChange} onBlur={handleBlur} required />
                                        {errors.OTP && touched.OTP ? <p className='form-error'>{errors.OTP}</p> : null}
                                        <h6 className="forgot text-end">
                                            <a onClick={resendotp} >Resend OTP?</a>
                                        </h6>
                                        {/* <div className="otp-input-fields">
                                        <input type="number" className="otp__digit otp__field__1 m-0" minlength="1" maxlength="1"/>
                                        <input type="number" className="otp__digit otp__field__2 m-0" minlength="1" maxlength="1"/>
                                        <input type="number" className="otp__digit otp__field__3 m-0" minlength="1" maxlength="1"/>
                                        <input type="number" className="otp__digit otp__field__4 m-0" minlength="1" maxlength="1"/>
                                        <input type="number" className="otp__digit otp__field__5 m-0" minlength="1" maxlength="1"/>
                                        <input type="number" className="otp__digit otp__field__6 m-0" minlength="1" maxlength="1"/>
                                    </div> */}


                                        <button type='submit' className="btn sign-btn w-100 mt-4">
                                            <span>Submit</span>
                                        </button>
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

export default Otpverify