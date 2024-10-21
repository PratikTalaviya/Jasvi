const { sendResponse } = require("../../../functions/sendRes");
const { authentication } = require("../../../Http/axios");
const Utils = require("../../../middleware/authentication")


exports.shiprocketLoginPage = async (req, res) => {
    try {
        res.render('ShiprocketLogin', {
                message: req.flash('message'), error: req.flash('error')
            });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.shiprocketLogAction = async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await Utils.GetToken(email, password);
        const myshiptoken = authentication(token)
        return res.redirect('/admin/Dashboard')
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

