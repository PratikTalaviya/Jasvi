const { sendResponse } = require("../../../functions/sendRes");
const DiscountCoupen = require("../../../model/DiscountCoupen")


exports.DiscountCoupen = async (req, res) => {
    try {
        const datas = await DiscountCoupen.find({});
        return res.render('Discount/Discount', {
            data: datas,
            message: req.flash('message'),
            error: req.flash('error')
        })
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
        // req.flash('error', error.message);
        // res.status(500).json({
        //     message: "Something Went Wrong",
        //     status: 500,
        // });
    }
}

// routes

exports.AddDiscountCoupen = async (req, res) => {
    try {
        return res.render('Discount/AddDiscount', { message: req.flash('message'), error: req.flash('error') });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
        // req.flash('error', error.message);
        // return res.redirect('back');
    }
}

exports.AddDiscountCoupenAction = async (req, res) => {
    try {
        var coupen_name = req.body.coupen_name;
        var coupen_code = req.body.coupen_code;
        if (req.body.percentage) {
            var percentage = req.body.percentage;
        }
        else {
            var percentage = ""
        }
        if (req.body.amt) {
            var amt = req.body.amt;
        }
        else {
            var amt = ""
        }
        var status = 0;
        if (!coupen_name || !coupen_code) {
            req.flash('message', 'Please Enter Details')
            return res.redirect('back')
        }

        const DiscountDetails = new DiscountCoupen({
            coupen_name, coupen_code, status: status, percentage: percentage, amt: amt
        })
        const saveDiscountData = await DiscountDetails.save();

        req.flash('message', 'Discount Coupen Added Successfully.')
        return res.redirect('/admin/DiscountCoupen');
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}


exports.UpdateDiscountStatus = async (req, res) => {
    try {
        let id = req.params.id;
        const status = req.params.status;


        const updateSocialStatus = DiscountCoupen.findByIdAndUpdate(
            {
                _id: id
            },
            {
                status: status
            }
        ).
            then(() => {
                req.flash('message', 'Discount Coupen Status Update Successfully')
                return res.redirect('/admin/DiscountCoupen')

            }).catch((error) => {
                req.flash('error', "Not Updated");
                return res.redirect('back')
            });

    } catch (error) {
        sendResponse(res, 400, { message: error.message });

        // req.flash('error', error.message)
        // return res.redirect('back')
    }
}


exports.DeleteDiscountCoupen = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            req.flash('error', 'This Tax Is Not Available')
            return res.redirect('back')
        } else {
            const data = await DiscountCoupen.find({ id: id });
            const del = DiscountCoupen.findByIdAndDelete(id);
            del.exec(function (err, data) {
                if (err) throw err;
                req.flash("message", `Discount Coupen Delete succesfully`)
                res.redirect('/admin/DiscountCoupen');
            });
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });

        // req.flash('error', 'This Discount Coupen Is Not Available')
        // return res.redirect('back')
    }
}