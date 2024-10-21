import *  as Yup from "yup"

export const otpverify = Yup.object({
    phone:Yup.string().min(10).max(12).required("please Enter phone"),
    OTP:Yup.string().min(6).max(6).required("please Enter otp code"),
})