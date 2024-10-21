import *  as Yup from "yup"

export const signUpuser = Yup.object({
    email: Yup.string().email().required("Please Enter Your email"),
    password: Yup.string().min(6).required("please Enter password"),
    confirmpassword:Yup.string().required().oneOf([Yup.ref('password'),null],"password must match"),
    phone:Yup.string().min(10).max(12).required("please Enter phone"),
})