const express = require('express')
const routes = express.Router()
const passport = require('passport');

require("../middleware/localStretagy");
const session = require('express-session');
const { checkAdmin, checklogin } = require('../middleware/checkLogin');
const logincontroller = require('../controller/admin/logincontroller');
const categoryController = require('../controller/admin/Categories/categoryController');
const subcategoryController = require('../controller/admin/Categories/subcategoryController');
const ImageUpload = require("../middleware/ImageUpload");
const DashboardController = require('../controller/admin/DashboardController');
const childCategoryController = require('../controller/admin/Categories/childCategoryController');
const ContactUsController = require('../controller/admin/Other/ContactUsController');
const SocialController = require('../controller/admin/Other/SocialController');
const UserController = require('../controller/admin/Other/UserController');
const taxController = require('../controller/admin/Other/taxController');
const listController = require('../controller/admin/Other/listController');
const MiddleBannerController = require('../controller/admin/Banner/MiddleBannerController');
const MainbannerController = require('../controller/admin/Banner/MainbannerController');
const DiscountController = require('../controller/admin/Discount/DiscountController');
const ReviewsController = require('../controller/admin/Other/ReviewsController');
const ProductsController = require('../controller/admin/Product/ProductsController');
const ProductReviewsController = require('../controller/admin/Product/ProductReviewsController');
const OrdersController = require('../controller/admin/Order/OrdersController');
const ManageShippingController = require('../controller/admin/Shipping/ManageShippingController');
const ReturnOrdersController = require('../controller/admin/Order/ReturnOrdersController');
const walletConroller = require('../controller/admin/Order/WalletController');
const addcolorController = require('../controller/admin/Product/addcolorController');
const ShipingController = require('../controller/admin/shiprocket/ShipingController');

routes.use(session({
    name: "admin",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY_ADMIN,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))
routes.use(passport.initialize())
routes.use(passport.session())

routes.get("/login", checkAdmin, logincontroller.loginadmin)
routes.post('/logindata', passport.authenticate('local', { failureRedirect: "/admin/Login" }), logincontroller.loginadminpass)
routes.get("/Dashboard", DashboardController.Dashboard)
routes.get("/logout", logincontroller.logout)

routes.post("/cerateOtpForSignup", logincontroller.cerateOtpForSignup)

routes.get('/Categories', categoryController.Categories);
routes.get('/AddCategories', categoryController.AddCategories);
routes.post('/AddCategoriesAction', ImageUpload.CategoryImage, categoryController.AddCategoriesAction);
routes.get('/DeleteCategories/:id', categoryController.DeleteCategories);
routes.get('/UpdateCategoriesStatus/:id/:status', categoryController.UpdateCategoriesStatus);
routes.get('/EditCategories/:id', categoryController.EditCategories);
routes.post('/EditCategoriesAction/:id', ImageUpload.CategoryImage, categoryController.EditCategoriesAction);

routes.get('/SubCategories', subcategoryController.SubCategories);
routes.get('/AddSubCategories', subcategoryController.AddSubCategories);
routes.post('/AddSubCategoriesAction', subcategoryController.AddSubCategoriesAction);
routes.get('/DeleteSubCategories/:id', subcategoryController.DeleteSubCategories);
routes.get('/UpdateSubCategoriesStatus/:id/:status', subcategoryController.UpdateSubCategoriesStatus);
routes.get('/EditSubCategories/:id', subcategoryController.EditSubCategories);
routes.post('/EditSubCategoriesAction/:id', subcategoryController.EditSubCategoriesAction);

routes.get('/ChildCategories', childCategoryController.ChildCategories);
routes.get('/AddChildCategories', childCategoryController.AddChildCategories);
routes.post('/AddChildCategoriesAction', childCategoryController.AddChildCategoriesAction);
routes.get('/UpdateChildCategoriesStatus/:id/:status', childCategoryController.UpdateChildCategoriesStatus);
routes.get('/EditChildCategories/:id', childCategoryController.EditChildCategories);
routes.post('/EditChildCategoriesAction/:id', childCategoryController.EditChildCategoriesAction);
routes.get('/DeleteChildCategories/:id', childCategoryController.DeleteChildCategories);

//render
routes.get('/Contactus', ContactUsController.ContactUs);
routes.get('/ContactusDelete/:id', ContactUsController.ContactusDelete);

//render
routes.get('/SocialMedia', SocialController.SocialsInfo);
routes.get('/AddSocialMedia', SocialController.AddSocialMedia);
routes.post('/AddSocialMediaActions', SocialController.AddSocialMediaActions);
routes.get('/EditSocialMedia/:id', SocialController.EditSocialMedia);
routes.post('/EditSocialMediaActions/:id', SocialController.EditSocialMediaActions);
routes.get('/DeleteSocialMediaAction/:id', SocialController.DeleteSocialMediaAction);

routes.get('/Tax', taxController.TaxInfo);
routes.get('/AddTax', taxController.AddTax);
routes.post('/AddTaxActions', taxController.AddTaxActions);
routes.get('/EditTax/:id', taxController.EditTax);
routes.post('/EditTaxAction/:id', taxController.EditTaxAction);
routes.get('/UpdateTaxStatus/:id/:status', taxController.UpdateTaxStatus);
routes.get('/DeleteTaxAction/:id', taxController.DeleteTaxAction);

routes.post('/AdminRegister', UserController.AdminRegister);
routes.get('/Users', UserController.UserInfo);
routes.get('/AdminAddressInfo', UserController.AdminAddressInfo);
routes.get('/InsertAdminAddress', UserController.InsertAdminAddress);
routes.post('/AdminAdressInsert', UserController.AdminAdressInsert);
routes.get('/SellerSoftDelete/:id', UserController.SellerSoftDelete);
routes.get('/EditSellerPage/:id', UserController.EditSellerPage);
routes.post('/EditSellerActions/:id', UserController.EditSellerActions);
routes.get('/NewSletter', UserController.NewSletter);
routes.get('/DeleteNewsLetter/:id', UserController.NewSletterDelete);
routes.get('/PaymentService', UserController.PaymentService);
routes.get('/ClearCache', UserController.ClearCache);
routes.post('/DiscountApply', UserController.DiscountApply);

routes.get('/WebReviews', ReviewsController.ReviewsInfo);

routes.get('/DiscountCoupen', DiscountController.DiscountCoupen);
routes.get('/AddDiscountCoupen', DiscountController.AddDiscountCoupen);
routes.post('/AddDiscountCoupenAction', DiscountController.AddDiscountCoupenAction);
routes.get('/UpdateDiscountStatus/:id/:status', DiscountController.UpdateDiscountStatus);
routes.get('/DeleteDiscountCoupen/:id', DiscountController.DeleteDiscountCoupen);

//ajax
routes.post('/GetSubCatList', listController.GetSubCatList);
routes.post('/GetChildCatList', listController.GetChildCatList);

//banner
routes.get('/Banner', MainbannerController.Banner);
routes.get('/AddBanner', MainbannerController.AddBanner);
routes.post('/AddBannerActions', ImageUpload.BannerImage, MainbannerController.AddBannerActions);
routes.get('/EditBanner/:id', MainbannerController.EditBanner);
routes.post('/EditBannerActions/:id', ImageUpload.BannerImage, MainbannerController.EditBannerActions);
routes.get('/DeleteBannerAction/:id', MainbannerController.DeleteBannerAction);

routes.get('/MiddleBanner', MiddleBannerController.MiddleBanner);
routes.get('/AddMiddleBanner', MiddleBannerController.AddMiddleBanner);
routes.post('/AddMiddleBannerActions', ImageUpload.MiddleBannerImage, MiddleBannerController.AddMiddleBannerActions);
routes.get('/EditMiddleBanner/:id', MiddleBannerController.EditMiddleBanner);
routes.post('/EditMiddleBannerActions/:id', ImageUpload.MiddleBannerImage, MiddleBannerController.EditMiddleBannerActions);
routes.get('/DeleteMiddleBannerAction/:id', MiddleBannerController.DeleteMiddleBannerAction);

routes.get('/AllProduct', ProductsController.AllProduct);
routes.get('/AddProduct', ProductsController.AddProduct);
routes.post('/AddProductAction', ImageUpload.AddMain_product, ProductsController.AddProductAction);
routes.get("/addproductcolor", addcolorController.addproductcolorpage)
routes.get('/AllColor', addcolorController.AllColor);
routes.post("/addproductcolorAction", ImageUpload.addproctcolor, addcolorController.postcoloadd)
routes.get('/EditColor/:id', addcolorController.EditColor);
routes.post('/productfilterbycolor', addcolorController.ProductFilterDatacolor);
routes.post('/EditColorAction/:id', ImageUpload.AddProduct_Gallery, addcolorController.EditColorAction);

routes.get('/UpdateProductStatus/:id/:status', ProductsController.UpdateProductStatus);
routes.get('/EditProduct/:id', ProductsController.EditProduct);
routes.post('/EditProductAction/:id', ImageUpload.AddProduct_Gallery, ProductsController.EditProductAction);
routes.get('/DeleteProduct/:id', ProductsController.DeleteProduct);
routes.get('/CSVImportExport', ProductsController.CSVImportExport);
// routes.post('/CSVFileImport', ImageUpload.CSVFile1, ProductsController.CSVFileImport);  //csv import baki
routes.get('/ViewProduct/:id', ProductsController.ViewProduct);
routes.post('/ProductFilterData', ImageUpload.AddProduct_Gallery, ProductsController.ProductFilterData);
routes.get('/DeleteSoftProduct/:id', ProductsController.DeleteSoftProduct);

routes.get('/ProductReviews', ProductReviewsController.ProductReviews);  //user show and item show baki
routes.get('/ViewProductReview/:id', ProductReviewsController.ViewProductReview);
routes.get('/UpdateReviewStatus/:id/:status', ProductReviewsController.UpdateReviewStatus);
routes.get('/DeleteReview/:id', ProductReviewsController.DeleteProductReview);


routes.get('/ResetPassword', UserController.ResetPassword);
routes.post('/ResetPasswordAction', UserController.ResetPasswordAction);
routes.get('/ChangePassword', UserController.ChangePassword);
routes.post('/ChangePasswordAction', UserController.ChangePasswordAction);

routes.get('/AllOrders', OrdersController.AllOrders);
routes.post('/AdminUpdateConfirmStatus', OrdersController.AdminUpdateConfirmStatus);
routes.get('/ViewOrders/:id', OrdersController.ViewOrders);
routes.get('/UpdateOrderStatus/:id/:status', OrdersController.UpdateOrderStatus);
routes.get('/PendingOrders', OrdersController.PendingOrders);
routes.get('/ConfirmOrders', OrdersController.ConfirmOrders);
routes.get('/CancelledOrders', OrdersController.CancelledOrders);
routes.get('/AdminConfirmCancel/:id', OrdersController.AdminConfirmCancel);
routes.get('/DeleteOrderAction/:id', OrdersController.DeleteOrderAction);

routes.get('/ReturnOrders', ReturnOrdersController.ReturnOrders);
// routes.get('/ReplaceOrders/:replace', ReturnOrdersController.ReplaceOrders);//not useable
// routes.get('/RefundOrder', ReturnOrdersController.RefundOrder);  //not useble
routes.get('/UpdateReturnStatus/:id', ReturnOrdersController.UpdateReturnStatus);  //comple but testing baki

routes.get('/AcceptWallet', walletConroller.AcceptWallet); // error
routes.get('/AdminAddWallet/:id', walletConroller.AdminAddWallet);
// routes.get('/UpdatePaymentStatus/:id/:payment_status', walletConroller.UpdatePaymentStatus);   //not usealble
// routes.get('/UpdateRefundStatus/:id/:refund', OrdersController.UpdateRefundStatus);  //no

//Manage Shipping
routes.get('/AllOrderShow', ManageShippingController.AllOrderShow);
routes.get('/SpecificOrder/:id', ManageShippingController.SpecificOrder);
routes.get('/TrackingOrder/:id', ManageShippingController.TrackingOrder);
routes.get('/TrackWithShipment/:id', ManageShippingController.TrackWithShipment);
routes.get("/TrackWithOrdid", ManageShippingController.TrackWithOrdid)
routes.get("/ShippingReturn", ManageShippingController.ShippingReturn)
routes.get("/ShippingDelivered", ManageShippingController.ShippingDelivered)
routes.get("/ShippingCancel", ManageShippingController.ShippingCancel)
routes.get("/CancelShippingOrder/:id", ManageShippingController.CancelShippingOrder)

routes.get('/ShpingLoginPage', ShipingController.shiprocketLoginPage);
routes.post("/shiprocketLogAction", ShipingController.shiprocketLogAction)



module.exports = routes;