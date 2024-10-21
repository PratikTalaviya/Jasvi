import axios from 'axios';
import { otpverify } from './../schemas/otpverify';

const api = axios.create({
    // baseURL: "http://159.89.172.240:8020",
    baseURL: "http://localhost:8080",
    // baseURL: "http://localhost:8020",
    // baseURL: "http://128.199.29.219:8020",
    // baseURL: "http://192.168.29.217:8020",

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
})
export const getloginuser = () => api.get("/api/GetLoginUser")
export const Registeruser = (data) => api.post("/api/Register", data)
export const otpverifyUser = (data) => api.post("/api/verify", data)
export const resendotpUser = (data) => api.post("/api/resendotp", data)


export const loginuser = (data) => api.post("/api/Login", data)
export const CategoriesHome = () => api.get("/api/GetCategoriesList")
export const SubCategories = () => api.get("/api/GetSubCategoriesList")
export const Products = () => api.get("/api/GetProductsList")
export const Cart = (data) => api.post("/api/AddToCart", data)  // remove karvani c6
export const SingleProducts = (data) => api.post(`/api/GetProductDetails`, data)
export const ChildCategories = () => api.get("/api/GetChildCategoriesList")
export const ContactUs = (data) => api.post("/api/ContactUs", data)
export const ResetPass = (data) => api.post("/api/ResetPassword", data)
export const ChangePass = (data) => api.post("/api/ChangePassword", data)
export const WishList = (data) => api.post("/api/AddtoWishlist", data)
export const GetWishList = () => api.get("/api/GetUserWishlist")
export const DeleteWishList = (data) => api.post("/api/DeleteWishlistProducts", data)
export const DeleteCart = (data) => api.post("/api/DeleteCartProducts", data)
export const UpdateAddress = (data) => api.post("/api/UpdateShippingAddress", data) //double
export const Logout = () => api.get("/api/logout")

export const gallaryproduct = (data) => api.post("/api/Galleries", data)
export const filtercolorproduct = (data) => api.post("/api/filtercolorproduct", data)
export const allgalarydata = () => api.get("/api/Allgallary")
export const gallaryproductcolor = (data) => api.post("/api/getgallarycolor", data)

export const trackorderdata = (data) => api.post("/api/trackorder", data)

export const GetCart = () => api.get("/api/GetUserCart")
export const getAddToCart = () => api.get("/api/getAddToCart")

export const Userreview = (data) => api.post("/api/AddProductReview", data)
export const payments = (data) => api.post("/api/payment", data)
export const verifys = (data) => api.post("/api/verifypayment", data)
export const orderapi = (data) => api.post("/api/AddUserOrder", data)
export const UpdateUser = (data) => api.post("/api/UpdateLoginUser", data)

export const OrderHistory = () => api.get("/api/GetUserOrderList")
export const Cancelorder = (data) => api.post("/api/CancelUserOrder", data)
export const Addnewletter = (data) => api.post("/api/AddNewsletter", data)
export const reviewcount = (data) => api.post("api/GetProductReviewCount", data)
export const socialmedia = () => api.get("/api/SocialMedia")
export const transcationhistory = () => api.get("/api/GetUserPayment")
// export const updateorder = (data) => api.post("/api/UpdateUserOrder", data)
export const getdiscountcoupen = () => api.get("/api/DiscountCoupen")
// export const ReplaceUserOrders = (data) => api.post("/api/ReplaceUserOrders", data)
export const GetBanner = () => api.get("/api/GetBanner")
export const GetMiddleBanner = () => api.get("/api/GetMiddleBanner")
export const specificorder = (id) => api.get(`/api/specificorder/${id}`)
export const updateDeliveredOrder = (id) => api.get(`/api/updateDeliveredOrder/${id}`)
export const rutuenorderdata = (data) => api.post("/api/rutuenorderdata", data)
export const ReturnOrderRequest = (data) => api.post("/api/ReturnOrderRequest", data)
