import *  as Yup from "yup"

export const LoginUser = Yup.object({
    email: Yup.string().email().required("Please Enter Your email"),
    password: Yup.string().required("please Enter password"),
})