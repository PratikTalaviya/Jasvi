const express = require('express')
const routes = express.Router();
const CategoriesController = require('../controller/api/Categories/CategoriesController');
const UserApiController = require('../controller/api/User/UserApiController');
const BannerController = require('../controller/api/Banner/BannerController');
const AddToCartController = require('../controller/api/AddToCart/AddToCartController');
const PaymentApiController = require('../controller/api/Payments/PaymentApiController');
const Productcontroller = require('../controller/api/Item/ProductController');
const CountrydataController = require('../controller/api/User/CountrydataController');
const userAuth = require("../middleware/userAuth")

routes.get('/GetCategoriesList', CategoriesController.GetCategoriesList);
routes.get('/GetSubCategoriesList', CategoriesController.GetSubCategoriesList);
routes.get('/GetChildCategoriesList', CategoriesController.GetChildCategoriesList);


routes.post('/ContactUs', UserApiController.ContactUs);
routes.post('/AddReview', UserApiController.AddReview);
routes.post('/AddNewsletter', UserApiController.AddNewsletter);
routes.get('/SocialMedia', UserApiController.SocialMedia);
routes.get('/DiscountCoupen', UserApiController.DiscountCoupens);       //, JwtApi.isLoggedIn, 
routes.post('/Register',UserApiController.Register);
routes.post('/Login',UserApiController.Login);
routes.post('/ChangePassword',UserApiController.ChangePassword);
routes.post('/ResetPassword',UserApiController.ResetPassword);
routes.post('/UpdateShippingAddress',UserApiController.UpdateShippingAddress);//JwtApi.isLoggedIn,
routes.get('/logout',userAuth,UserApiController.logout);
routes.post('/UpdateLoginUser',userAuth,UserApiController.UpdateLoginUser);


//, JwtApi.isLoggedIn, 
routes.post('/verify', UserApiController.verify);
routes.post("/resendotp",UserApiController.resendotp)

routes.get('/GetLoginUser', userAuth, UserApiController.getLoginUser);      //JwtApi.isLoggedIn,

routes.get('/GetBanner', BannerController.GetBanner);
routes.get('/GetMiddleBanner', BannerController.GetMiddleBanner);


routes.get('/getAddToCart', userAuth, AddToCartController.getAddToCart); // , JwtApi.isLoggedIn, 
routes.post('/AddToCart', userAuth, AddToCartController.AddToCart);
routes.post('/AddtoWishlist', userAuth, AddToCartController.AddtoWishlist);
routes.get('/GetUserWishlist', userAuth, AddToCartController.GetUserWishlist);   //JwtApi.isLoggedIn,
routes.post('/DeleteWishlistProducts', userAuth, AddToCartController.DeleteWishlistProducts);    //JwtApi.isLoggedIn,
routes.post('/DeleteCartProducts', userAuth, AddToCartController.DeleteCartProducts);    //JwtApi.isLoggedIn,
// routes.get('/GetUserCart',JwtApi.isLoggedIn,ProductApiController.GetUserCart); // 123


routes.post('/payment', userAuth, PaymentApiController.payment);   //JwtApi.isLoggedIn,
routes.post('/verifypayment', userAuth, PaymentApiController.verify);   //JwtApi.isLoggedIn,

routes.get('/GetProductsList', Productcontroller.GetProductsList);
routes.post('/GetProductDetails', Productcontroller.GetProductDetails);

routes.get("/Allgallary",Productcontroller.Alleriesdata)
routes.post("/filtercolorproduct",Productcontroller.filtercolorproduct)
routes.post('/Galleries', Productcontroller.Galleries);
routes.post("/getgallarycolor", Productcontroller.gallaryimgcolor)

// routes.get('/DiscountCoupen', Productcontroller.DiscountCoupen);
routes.post('/AddProductReview', userAuth, Productcontroller.AddProductReview);  //JwtApi.isLoggedIn
routes.post('/AddUserOrder', userAuth, Productcontroller.AddUserOrder);  //JwtApi.isLoggedIn
routes.get('/GetUserOrderList', userAuth, Productcontroller.GetUserOrderList); //123 //JwtApi.isLoggedIn
routes.post('/CancelUserOrder', userAuth, Productcontroller.CancelUserOrder); //JwtApi.isLoggedIn,
routes.post("/ReturnOrderRequest", Productcontroller.ReturnOrderRequest)

routes.post("/trackorder", Productcontroller.trackorders)

routes.post("/specificorder", Productcontroller.specificorder)
routes.post("/rutuenorderdata",userAuth,Productcontroller.rutuenordersspecific)
routes.post('/GetUserPayment', Productcontroller.GetUserPayment); //JwtApi.isLoggedIn
routes.get('/updateDeliveredOrder/:id', userAuth, Productcontroller.updateDeliveredOrder); //,JwtApi.isLoggedIn,

routes.post('/GetProductReviewCount', Productcontroller.GetProductReviewCount);

// routes.get("/countryViewAll", CountrydataController.countryViewAll);
// routes.get("/stateCitiesViewAll", CountrydataController.stateCitiesViewAll);
routes.get("/countrydata", CountrydataController.CountrystateData);



module.exports = routes;
