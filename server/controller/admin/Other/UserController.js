const User = require("../../../model/User")
const NewsLatter = require("../../../model/NewsLatter")
const Payment = require("../../../model/Payment")
const nodemailer = require('nodemailer');
const MainAdmin = require("../../../model/MainAdmin");
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../../../functions/sendRes");
const Seller = require("../../../model/Seller");


exports.AdminRegister = async (req, res) => {
    try {
        const AdminDetails = new MainAdmin({

            email: req.body.email,
            password: req.body.password,

        });
        const saveAdminData = await AdminDetails.save();
        res.status(201).json(
            {
                message: "Admin Registered",
                status: 201,
                data: saveAdminData
            }
        )
    } catch (error) {
        console.log("doctorDetails--error:::", error);
        res.status(400).json(
            {
                message: "Admin Not Registered",
                status: 400
            }
        )
    }
}

exports.AdminAddressInfo = async (req, res) => {
    try {
        const data = await Seller.find({ isDeleted: false });
        return res.render('Seller/ManageSeller', {
            AdminData: data,
            message: req.flash('message'), error: req.flash('error')
        })
    } catch (error) {
        req.flash('error', error.message);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
}
exports.InsertAdminAddress = async (req, res) => {
    try {
        const data = await Seller.find({});
        return res.render('Seller/AddSellerAddress', {
            AdminData: data,
            message: req.flash('message'), error: req.flash('error')
        })
    } catch (error) {
        req.flash('error', error.message);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
}



exports.AdminAdressInsert = async (req, res) => {
    try {
        const { Adminname, AdminlastNname, Adminaddress, Adminaddress2, AdminCity, AdminCountry, AdminPincode, AdminState, AdminEmail, channelId,Adminphone } = req.body;
        const insertData = new Seller({ Adminname, AdminlastNname, Adminaddress, Adminaddress2, AdminCity, AdminCountry, AdminPincode, AdminState, AdminEmail, channelId, Adminphone })
        await insertData.save();
        req.flash('message', 'New Seller Address Added Successfully.')
        return res.redirect('/admin/AdminAddressInfo');
    } catch (error) {
        req.flash("messages", `Something Went Wrong`)
        res.redirect("back")
    }
}

exports.EditSellerPage = async (req, res) => {
    const id = req.params.id
    try {
        const data = await Seller.findById(id)
        res.render('Seller/EditSeller', {
            data: data,
            message: req.flash('message'),
            error: req.flash('error')
        })
    } catch (error) {
        req.flash('error', error.message)
        return res.redirect('back')
    }
};

exports.EditSellerActions = async (req, res) => {
    try {
        let id = req.params.id
        const olddata = await Seller.findById(id)
        const updateSeller = Seller.findByIdAndUpdate(
            {
                _id: id
            },  
            {
                Adminname: req.body.Adminname ? req.body.Adminname : olddata.Adminname,
                AdminlastNname: req.body.AdminlastNname ? req.body.AdminlastNname : olddata.AdminlastNname,
                Adminaddress: req.body.Adminaddress ? req.body.Adminaddress : olddata.Adminaddress,
                Adminaddress2: req.body.Adminaddress2 ? req.body.Adminaddress2 : olddata.Adminaddress2,
                AdminCity: req.body.AdminCity ? req.body.AdminCity : olddata.AdminCity,
                AdminCountry: req.body.AdminCountry ? req.body.AdminCountry : olddata.AdminCountry,
                AdminPincode: req.body.AdminPincode ? req.body.AdminPincode : olddata.AdminPincode,
                AdminState: req.body.AdminState ? req.body.AdminState : olddata.AdminState,
                AdminEmail: req.body.AdminEmail ? req.body.AdminEmail : olddata.AdminEmail,
                channelId: req.body.channelId ? req.body.channelId : olddata.channelId,
                Adminphone: req.body.Adminphone ? req.body.Adminphone : olddata.Adminphone,
            }
        ).
            then(() => {
                req.flash('message', 'Seller update successfully')
                return res.redirect('/admin/AdminAddressInfo')

            }).catch((error) => {
                req.flash('error', "Not Updated");
                return res.redirect('back')
            });

    } catch (error) {
        req.flash('error', error.message)
        return res.redirect('back')
    }
}

exports.SellerSoftDelete = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            req.flash('error', 'This Seller Is Not Available')
            return res.redirect('back')
        } else {
            const datas = await Seller.findByIdAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        isDeleted: true
                    }
                }
            )
                .then(() => {
                    res.redirect('/admin/AdminAddressInfo');
                    req.flash('message', 'Delete Successfully!')
                })
                .catch((err) => {
                    sendResponse(res, 400, { message: err.message });
                })
        }
    } catch (error) {
        req.flash('error', 'This Seller Is Not Available')
        return res.redirect('back')
    }
}


exports.UserInfo = async (req, res) => {
    try {
        const data = await User.find({});
        return res.render('Users/Users', {
            UserData: data,
            message: req.flash('message'), error: req.flash('error')
        })
    } catch (error) {
        req.flash('error', error.message);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
}
exports.NewSletter = async (req, res) => {
    try {
        const datas = await NewsLatter.find({ isDeleted: false });
        return res.render('NewSletter/NewSletter', {
            data: datas,
            message: req.flash('message'), error: req.flash('error')
        })
    } catch (error) {
        req.flash('error', error.message);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
}
exports.NewSletterDelete = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            req.flash('error', 'This News letter Is Not Available')
            return res.redirect('back')
        } else {
            const datas = await NewsLatter.findByIdAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        isDeleted: true
                    }
                }
            )
                .then(() => {
                    res.redirect('/admin/NewSletter');
                    req.flash('message', 'Delete Successfully!')
                })
                .catch((err) => {
                    sendResponse(res, 400, { message: err.message });
                })
        }
    } catch (error) {
        req.flash('error', 'This NewSletter Is Not Available')
        return res.redirect('back')
    }
}
exports.PaymentService = async (req, res) => {
    try {
        const datas = await Payment.find({}).populate('user_id');
        // console.log('error', datas );
        return res.render('PaymentService/PaymentService', {
            data: datas,
            message: req.flash('message'), error: req.flash('error')
        })
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
}
exports.ClearCache = async (req, res) => {
    try {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        return res.redirect('/admin/Dashboard');
    } catch (error) {
        return res.redirect('back')
    }
}

exports.ResetPassword = async (req, res) => {
    try {
        res.render('ResetPassword', {
            message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.ResetPasswordAction = async (req, res) => {
    try {
        function sendEmail(email, token) {
            var email = email;
            var token = token;
            var mail = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'mailto:bhargavkorat6014@gmail.com', // Your email id
                    pass: 'zezshkzmpwiwwoxn', // Your password
                }
            });
            var mailOptions = {
                from: 'mailto:bhargavkorat6014@gmail.com',
                to: email,
                subject: 'Reset Password Link -Ecom Node',
                html: '<p>You requested for reset password, kindly use this <a href="http://localhost:8080/admin/changepassword?token=' + token + '">link</a> to reset your password</p>'
                // html: '<p>You requested for reset password, kindly use this <a href="http://128.199.29.219:3000/reset-password?token=' + token + '">link</a> to reset your password</p>'
            };
            mail.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(0)
                }
            });
        }
        const email = req.body.email;
        const data = await MainAdmin.findOne({ email: email });

        if (!data) {
            res.status(500).json({
                message: "Email Id Is Not Exist..",
                status: 500
            })
        } else {
            var token = jwt.sign({
                email: data[0]?.email,
                password: data[0]?.id,
            },
                'SECRETKEY', {
                expiresIn: '7d'
            },
            );
            var sent = sendEmail(email, token);
            if (sent != '0') {

                const dataa = await MainAdmin.findByIdAndUpdate(
                    {
                        _id: data?._id
                    },
                    {
                        $set: {
                            email_token: token
                        }
                    }
                )
                    .then(() => {
                        res.redirect('/admin/login');
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: err.message,
                            status: 500
                        })
                    })
            } else {
                res.status(404).json(
                    {
                        message: "Please try to login with correct credentials",
                        status: 404,
                        success: 0
                    }
                )
            }
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.ChangePassword = async (req, res) => {
    try {
        const token = req.query.token;
        res.render('ChangePassword', {
            message: req.flash('message'), error: req.flash('error'), token
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.ChangePasswordAction = async (req, res) => {
    const { token, password, cpassword } = req.body
    try {
        const success = [];
        if (password == cpassword) {
            const userdata = await MainAdmin.findOne({ email_token: token });
            if (userdata) {
                const data = {
                    password: password
                }
                const dataa = await MainAdmin.findByIdAndUpdate(
                    {
                        _id: userdata?._id
                    }, {
                    $set: {
                        password: data?.password
                    }
                })
                    .then(() => {
                        success.push(true)

                    })
                    .catch((err) => {
                        success.push(false)
                    })

            }
            success.push(true)
        } else {
            success.push(false)
        }
        if (success.some(x => x == true)) {
            res.redirect('/admin/login');
        } else {
            res.status(500).json({
                message: "Something Went Wrong",
                status: 500
            })
        }
    } catch (error) {
        res.status(500).json({
            Success: 0,
            message: error.message,
            status: 500
        })
    }
}




exports.DiscountApply = async (req, res) => {
    try {
        var disc_type = req.body.disc_type;
        const data = await User.find({});
        var success = [];
        if (disc_type == 'All') {

            for (const discountData of data) {
                const updateDiscount = await User.findByIdAndUpdate(
                    {
                        _id: discountData._id
                    },
                    {
                        coupen_expire: "active",
                        discount_status: "on"
                    }
                ).then(() => {
                    success.push(true);
                }).catch((err) => {
                    success.push(false);
                })
            }
            if (success.some(x => x == true)) {
                req.flash('message', 'Discount Apply Successfully');
                return res.redirect('back')

            } else {
                return res.redirect('back')

            }
        } else if (disc_type == req.body.disc_type) {
            const datas = await User.find({});
            if (!datas) {
                req.flash('error', err.message);
                return res.redirect('back')
            } else {
                if (datas) {
                    for (const discountData of data) {
                        const updateDiscount = await User.findByIdAndUpdate(
                            {
                                _id: discountData._id
                            },
                            {
                                coupen_expire: "expired",
                                discount_status: "off"
                            }
                        ).then(() => {
                            success.push(true);
                        }).catch((err) => {
                            success.push(false);
                        })
                    }
                    if (success.some(x => x == true)) {
                        req.flash('message', 'Discount Apply Successfully');
                        return res.redirect('back')
                    } else {
                        return res.redirect('back')

                    }
                } else {
                    for (let i = 0; i < datas.length; i++) {
                        const findDataUser = await User.find({ _id: datas[i]._id });
                        if (!findDataUser) {
                            req.flash('error', err.message);
                            return res.redirect('back')
                        } else {
                            console.log(findDataUser.length)
                            if (findDataUser.length >= req.body.disc_type) {
                                for (const discountData of data) {
                                    const updateDiscount = await User.findByIdAndUpdate(
                                        {
                                            _id: findDataUser[i]._id
                                        },
                                        {
                                            coupen_expire: "active",
                                            discount_status: "on"
                                        }
                                    ).then(() => {
                                        success.push(true);
                                    }).catch((err) => {
                                        success.push(false);
                                    })
                                }
                                if (success.some(x => x == true)) {
                                    req.flash('message', 'Discount Apply Successfully');
                                    return res.redirect('back')
                                } else {
                                    return res.redirect('back')
                                }
                            }
                        }
                    }
                }
            }
            req.flash('message', 'Discount Apply Successfully');
            return res.redirect('back')
        }

    } catch (error) {

    }
}

