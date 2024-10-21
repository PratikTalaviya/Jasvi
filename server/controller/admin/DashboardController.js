const Categories = require("../../model/Categories");
const ChieldCategories = require("../../model/ChieldCategories");
const Contactus = require("../../model/Contactus");
const Item = require("../../model/Item");
const Orders = require("../../model/Orders");
const Payment = require("../../model/Payment");
const Subcategories = require("../../model/Subcategories");
const Tax = require("../../model/Tax");
const User = require("../../model/User");
const NewsLatter = require("../../model/NewsLatter");
const Socials = require("../../model/Socials");


class DashboardController {
    async Dashboard(req, res, next) {
        const Categoriesdata = await Categories.find({isDeleted: false})
        const Subcategoriesdata = await Subcategories.find({isDeleted: false})
        const ChieldCategoriesdata = await ChieldCategories.find({isDeleted: false})
        const Ordersresults = await Orders.find({isDeleted: false})
        const Itemdata = await Item.find({isDeleted: false})
        const Contactusdata = await Contactus.find({isDeleted:false});
        const Userdata = await User.find({});
        const Taxdata = await Tax.find({  isDeleted: false});
        const Paymentdatas = await Payment.find({});
        const NewsLatterdatas = await NewsLatter.find({isDeleted:false});
        const Socialsdata = await Socials.find({isDeleted:false});




        try {
            res.render('Dashboard',
                {
                    Categoriesdata: Categoriesdata,
                    Subcategoriesdata: Subcategoriesdata,
                    ChieldCategoriesdata: ChieldCategoriesdata,
                    Itemdata: Itemdata,
                    Ordersresults: Ordersresults,
                    Contactusdata: Contactusdata,
                    Userdata: Userdata,
                    Taxdata: Taxdata,
                    Paymentdatas: Paymentdatas,
                    NewsLatterdatas: NewsLatterdatas,
                    Socialsdata: Socialsdata,
                    message: req.flash('message'), error: req.flash('error')
                });

        } catch (error) {
            next(error)
        }
    }
}
module.exports = new DashboardController()