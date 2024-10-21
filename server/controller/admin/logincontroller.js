const customErrorHandler = require("../../service/customErrorHandler")
const { sendResponse } = require("../../functions/sendRes")
const { sendEmail } = require("../../functions/emailService")
const User = require("../../model/User")
const MainAdmin = require("../../model/MainAdmin")


class logincontroller {
    async loginadmin(req, res, next) {
        try {
            return res.render('Login', {
                message: req.flash('message'),
                error: req.flash('error')
            })
        } catch (err) {
            return next(err)
        }
    }
    async loginadminpass(req, res, next) {
        try {
            return res.redirect('/admin/Dashboard')
        } catch (error) {
            return next(err)
        }
    }
    async logout(req, res, next) {
        try {
            req.logout((err) => {
                res.json(err)
            });
            res.redirect("/admin/login");
        } catch (err) {
            next(err)
        }
    }
    async cerateOtpForSignup(req, res) {
        try {
            if (Object.keys(req?.body).length > 0) {

                const { email } = req?.body;

                const Otp = Math.floor(1000 + Math.random() * 9000)

                await User.create({ email, otp: Otp }).then((res) => {
                    const obj = {
                        name: email,
                        otp: res?.otp,
                        propose: "Account verification code"
                    }
                    sendEmail(email, "Login", obj)
                    sendResponse(res, 400, { message: "Otp send success fully" });
                }).catch((error) => {
                    sendResponse(res, 400, { message: error.message });
                })

            } else {
                sendResponse(res, 400, { message: "Fileds are required" });
            }
        } catch (error) {
            sendResponse(res, 400, { message: error.message });
        }
    }
   
}



// signupWithEmailOtp

module.exports = new logincontroller();

