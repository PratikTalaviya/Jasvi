const Contactus = require("../../../model/Contactus");
const NewsLetter = require("../../../model/NewsLatter");
const Reviews = require("../../../model/Reviews");
const Socials = require("../../../model/Socials");
const DiscountCoupen = require("../../../model/DiscountCoupen");
const User = require("../../../model/User");
const otp = require("../../../model/otp");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { sendResponse } = require("../../../functions/sendRes");
const twilio = require('twilio');
const otpGenerator = require('otp-generator')
const nodemailer = require("nodemailer");
const stateCity = require("../../../model/stateCitiesData");

exports.Register = async (req, res) => {
    const { phone, email, password, confirmpassword } = req.body
    try {

        if (password === confirmpassword) {
            const dataa = new User({ email, password, phone, token: "" })
            res.cookie("userinformation", phone, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
                httpOnly: true
            })
            const usersave = await dataa.save()
            try {
                let rendom = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
                const accountSid = process.env.TWILIO_ACCOUNT_SID;
                const authToken = process.env.TWILIO_AUTH_TOKEN;
                const client = new twilio(accountSid, authToken);

                client.messages.create({
                    body: `Your Website verisication code is:` + rendom,
                    from: '+14782416135',
                    to: phone
                }).then(saveuser()).catch((error) => {
                    res.status(400).json(
                        {
                            message: "Otp not send sucessfully",
                            status: 400,
                            success: 0
                        }
                    )
                });
                function saveuser() {
                    const newuser = new otp({ userId: usersave._id, phone, otp: rendom.toString() })
                    newuser.save(function (err) {
                        if (err) {
                            res.status(400).json(
                                {
                                    message: "Otp not send sucessfully",
                                    status: 400,
                                    success: 0
                                }
                            )
                        } else {
                            res.status(200).json(
                                {
                                    message: "Otp  send sucessfully",
                                    status: 200,
                                    success: 1
                                }
                            )
                        }
                    })
                }
            } catch (error) {
                sendResponse(res, 400, { message: err.message });
            }
        } else {
            sendResponse(res, 400, { message: err.message });
        }


    } catch (error) {
        res.status(400).json(
            {

                message: error.message,
                success: 0,

                status: 400
            }
        )
    }
}
exports.verify = async (req, res) => {
    const { phone, otpcode } = req.body
    if (!phone || !otpcode) {
        sendResponse(res, 400, { message: "Please enter phoneno and otp", success: 0, status: 400 });
    }
    try {
        const verifyuser = await otp.findOne({ phone: phone, isDeleted: false })
        console.log("verifyuser?.otp === otpcode.toString()")
        if (verifyuser?.otp === otpcode.toString()) {
            await otp.findByIdAndUpdate({ _id: verifyuser?._id },
                { $set: { isDeleted: true } })
                .then(async () => {
                    await User.findByIdAndUpdate({ _id: verifyuser?.userId }, { $set: { is_verifyed: true } })
                        .then(() => {
                            sendResponse(res, 200, { message: "verify Successfully", Success: 1 });
                        })
                        .catch((err) => { sendResponse(res, 400, { message: err.message }); })
                }).catch((err) => { sendResponse(res, 400, { message: err.message, success: 0, status: 400 }); })
        } else {
            sendResponse(res, 400, { message: "otp is not match", success: 0, status: 400 })
        }
    } catch (error) {
        sendResponse(res, 400, { message: "SomeThing went to wrong!", success: 0, status: 400 })
        // res.status(400).json(
        //     {
        //         message: "SomeThing went to wrong!",
        //         status: 400,
        //         Success: 0,
        //     }
        // )
    }
}

exports.resendotp = async (req, res) => {
    const phone = req?.cookies?.userinformation;
    const userdata = await User.findOne({ phone: phone })
    try {
        let rendom = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = new twilio(accountSid, authToken);

        client.messages.create({
            body: `Your Website verisication code is:` + rendom,
            from: '+14782416135',
            to: phone
        }).then(saveuser()).catch((error) => {
            res.status(400).json(
                {
                    message: "Otp not send sucessfully",
                    status: 400,
                    success: 0
                }
            )
        });
        async function saveuser() {
            const verifyuser = await otp.findOne({ phone: phone, isDeleted: false })
            if (verifyuser) {
                const exipreallotpcode = otp.findByIdAndUpdate({
                    _id: verifyuser._id
                }, {
                    $set: {
                        isDeleted: true
                    }
                }).then(async () => {
                    const newuser = new otp({ userId: userdata._id, phone, otp: rendom })
                    newuser.save(function (err) {
                        if (err) {
                            res.status(400).json(
                                {
                                    message: "Otp not send sucessfully",
                                    status: 400,
                                    success: 0
                                }
                            )
                        } else {
                            res.status(200).json(
                                {
                                    message: "Otp  send sucessfully",
                                    status: 200,
                                    success: 1
                                }
                            )
                        }
                    })
                }).catch(error => {
                    res.status(400).json(
                        {
                            message: "Otp not send sucessfully",
                            status: 400,
                            success: 0
                        }
                    )
                })
            } else {
                const newuser = new otp({ userId: userdata._id, phone, otp: rendom })
                newuser.save(function (err) {
                    if (err) {
                        res.status(400).json(
                            {
                                message: "Otp not send sucessfully",
                                status: 400,
                                success: 0
                            }
                        )
                    } else {
                        res.status(200).json(
                            {
                                message: "Otp  send sucessfully",
                                status: 200,
                                success: 1
                            }
                        )
                    }
                })
            }

        }
    } catch (error) {
        res.status(400).json(
            {
                message: "SomeThing went to wrong!",
                status: 400,
                Success: 0,
            }
        )
    }
}

// exports.Register = async (req, res) => {
//     try {
//         const password = req.body.password
//         const confirmpassword = req.body.confirmpassword
//         if (password === confirmpassword) {

//             const userDetails = new User({
//                 first_name: req.body.first_name,
//                 last_name: req.body.last_name,
//                 email: req.body.email,
//                 password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
//                 phone: req.body.phone,
//                 wallet: req.body.wallet,
//                 coupen_expire: req.body.coupen_expire,
//                 discount_status: req.body.discount_status,
//                 ship_address1: req.body.ship_address1,
//                 ship_address2: req.body.ship_address2,
//                 ship_zip: req.body.ship_zip,
//                 ship_city: req.body.ship_city,
//                 state: req.body.state,
//                 ship_country: req.body.ship_country,
//                 otp: req.body.otp,
//                 otp_For: req.body.otp_For
//             });
//             const token = await userDetails.generateAuthToken();
//             res.cookie("jwt", token, {
//                 expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
//                 httpOnly: true
//             })
//             const saveUserData = await userDetails.save();
//             res.status(201).json(
//                 {
//                     message: "Registered!",
//                     status: 201,
//                     User: saveUserData,
//                     Success: 1,
//                 }
//             )
//         }
//     } catch (error) {
//         // sendResponse(res, 400, { message: error.message });
//         console.log("doctorDetails--error:::", error);
//         res.status(400).json(
//             {
//                 message: "Doctor Not Registered",
//                 status: 400
//             }
//         )
//     }
// };
exports.Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await User.findOne({ email: email });
        if (data?.is_verifyed === true) {
            const isMatch = await bcrypt.compare(password, data.password)
            if (!data) {
                sendResponse(res, 404, { message: "Please try to login with correct credentials", success: 0 });
            } else {
                if (isMatch) {
                    const token = await data.generateAuthToken();
                    console.log("🚀 ~ file: UserApiController.js:280 ~ exports.Login= ~ token:", token)
                    res.cookie("jwt", token, {
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                        httpOnly: true
                    })
                    sendResponse(res, 200, { message: "Login Succesfully", User: data, success: 1 });
                    // await User.findByIdAndUpdate({ _id: data?._id }, { $set: { token: token } })
                    //     .then(async () => {
                    //         res.cookie("jwt", token, {
                    //             expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
                    //             httpOnly: true
                    //         })       
                    //         sendResponse(res, 200, { message: "Login Succesfully", User: data, success: 1 });
                    //     })
                    //     .catch((err) => { sendResponse(res, 400, { message: err.message, success: 0 }); })
                } else {
                    sendResponse(res, 400, { message: error.message, success: 0 });
                }
            }
        } else {
            sendResponse(res, 400, { message: "phone number is not verify", success: 0 });
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message, success: 0 });

    }
}
exports.logout = async (req, res) => {
    try {
        req.user.token = null;
        res.clearCookie("jwt");
        await req.user.save();
        res.status(200).json({ message: " Logout syuceessfully", Success: 1 })
    } catch (error) {
        res.status(400).json(
            {
                message: "Internal Server Error ",
                status: 400,
                Success: 0
            }
        )
    }
}
exports.getLoginUser = async (req, res) => {
    const userId = await req?.user;

    try {
        if (userId) {
            const user = await User.findById(userId).select("-password")
            res.status(200).json(
                {
                    Success: 1,
                    status: 200,
                    message: 'Login User',
                    User: user,
                }
            )
        } else {
            res.status(400).json(
                {
                    message: "Something Went to wrong",
                    status: 400
                }
            )
        }
    } catch (error) {
        console.log("🚀 ~ file: UserApiController.js:346 ~ exports.getLoginUser= ~ error:", error)

        res.status(400).json(
            {
                message: "Internal Server Error",
                status: 400
            }
        )
    }
}
exports.UpdateShippingAddress = async (req, res) => {
    try {
        let id = req?.user?.id;
        const { ship_address1, ship_address2, ship_zip, ship_city, ship_country, state } = req.body;
        const datas = await User.find({ _id: id });

        if (datas) {
            const updateUserData = User.findByIdAndUpdate(
                { _id: id },
                {
                    $set: { ship_address1, ship_address2, ship_zip, ship_city, ship_country, state }
                }).
                then(() => {
                    res.status(200).json({
                        message: "Update Successfully",
                        status: 200,
                        Success: 1
                    })
                }).catch((error) => {
                    sendResponse(res, 400, { message: error.message });
                    // res.status(400).json({
                    //     message: "Update Not Successfully",
                    //     status: 400,
                    //     Success: 0
                    // })
                });
        } else {
            res.status(400).json({
                message: "Update Not Successfully",
                status: 400,
                Success: 0
            })
            // sendResponse(res, 400, { message: error.message });

        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.ResetPassword = async (req, res) => {
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
                html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/changepassword?token=' + token + '">link</a> to reset your password</p>'
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
        const data = await User.findOne({ email: email });

        if (!data) {
            res.status(400).json({
                message: "Email Id Is Not Exist..",
                status: 400
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
                // const data = { email_token: token }
                // console.log("🚀 ~ file: UserApiController.JS:330 ~ exports.ResetPassword= ~ data", data)
                const dataa = await User.findByIdAndUpdate(
                    {
                        _id: req.user?._id
                    },
                    {
                        $set: {
                            email_token: token
                        }
                    }
                )
                    .then(() => {
                        res.status(200).json(
                            {
                                message: "The reset password link has been sent to your email address",
                                status: 200,
                                Success: 1,
                            }
                        )
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: err.message,
                            status: 400
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
    const { token, password, cpassword } = req.body
    try {
        const success = [];
        if (password == cpassword) {
            const userdata = await User.findOne({ email_token: token });
            if (userdata) {
                var saltRounds = 10;
                bcrypt.genSalt(saltRounds, async function (err, salt) {
                    bcrypt.hash(password, salt, async function (err, hash) {
                        const data = {
                            password: hash
                        }
                        const dataa = await User.findByIdAndUpdate(
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
                                console.log("🚀 ~ file: UserApiController.JS:394 ~ err", err.message)
                                success.push(false)
                            })
                    });
                });
            }
            success.push(true)
        } else {
            success.push(false)
        }
        if (success.some(x => x == true)) {
            return res.json({ Success: 1, Message: "Your password has been updated successfully" });
        } else {
            res.status(400).json({
                message: "Something Went Wrong",
                status: 400
            })
        }
    } catch (error) {
        res.status(400).json({
            Success: 0,
            message: error.message,
            status: 400
        })
    }
}
exports.AddAccountDetails = async (req, res) => {
    try {
        let userid = req.user._id;
        if (userid) {
            const { name, review, rating } = req.body;
            const AddAccountDetails = new User({ name, review, rating });
            const saveAddAccountDetailsData = await AddAccountDetails.save();
            res.status(200).json(
                {
                    message: "Your Review Submit Successfully!",
                    status: 200,
                    Success: 1,
                    data: saveAddAccountDetailsData
                }
            )
        } else {
            res.status(401).json(
                {
                    message: "Please try to AddAccount with correct credentials",
                    status: 401,
                    success: 0
                }
            )
        }
    } catch (error) {
        res.status(400).json(
            {
                message: "Something Wrong!",
                status: 400,
                Success: 0
            }
        )
    }
}
exports.UpdateLoginUser = async (req, res) => {
    try {
        const id = req.user._id;
        const { first_name, last_name } = req.body;

        const datas = await User.findById(id);

        if (datas) {
            const updateUserData = User.findByIdAndUpdate(
                { _id: id },
                {
                    $set: { first_name, last_name }
                }).
                then(() => {
                    res.status(200).json({
                        message: "Update Successfully",
                        status: 200,
                        Success: 1
                    })
                }).catch((error) => {
                    sendResponse(res, 400, { message: error.message });
                });
        } else {
            res.status(400).json({
                message: "Update Not Successfully",
                status: 400,
                Success: 0
            })
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.ContactUs = async (req, res) => {
    try {
        const ContactusDetails = new Contactus({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,

        });
        const saveContactuseData = await ContactusDetails.save();

        res.status(201).json(
            {
                message: "Contactus Registered",
                status: 201,
                data: saveContactuseData
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                message: "Contactus Not Registered",
                status: 400
            }
        )
    }
}
exports.AddReview = async (req, res) => {
    const userid = req.user.Id;

    try {
        const ReviewsDetails = new Reviews({
            user_id: userid,
            review: req.body.review,
            subject: req.body.subject,
            rating: req.body.rating,
        });

        const saveReviewseData = await ReviewsDetails.save();

        res.status(201).json(
            {
                message: "Reviews Registered",
                status: 201,
                data: saveReviewseData
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                message: "Reviews Not Registered",
                status: 400
            }
        )
    }
}
exports.AddNewsletter = async (req, res) => {
    try {
        const exist = await NewsLetter.exists({ email: req.body.email })
        if (!exist) {
            const NewsLetterDetails = new NewsLetter({
                email: req.body.email,
            });
            const saveNewsLettereData = await NewsLetterDetails.save();

            res.status(201).json(
                {
                    Success: 1,
                    message: "NewsLetter Registered",
                    status: 200,
                    data: saveNewsLettereData
                }
            )
        } else {
            res.status(201).json(
                {
                    Success: 0,
                    message: "Already Register",
                    status: 200,
                }
            )
        }
    } catch (error) {
        res.status(400).json(
            {
                message: "NewsLetter Not Registered",
                status: 400
            }
        )
    }
}
exports.SocialMedia = async (req, res) => {
    try {
        const datas = await Socials.find().select('-__v');
        return res.send({
            Success: 1,
            Message: 'Social Media Link',
            SearchProduct: datas
        });


    } catch (error) {
        res.status(400).json({
            message: "Something Went Wrong",
            status: 400
        })
    }
}
exports.DiscountCoupens = async (req, res) => {
    try {
        const datas = await DiscountCoupen.find().select('-__v');
        res.status(200).json({
            message: "Get All DiscountCoupen Data",
            status: 200,
            Total: datas.length,
            data: datas
        })
    } catch (error) {
        res.status(400).json({
            message: "Something Went Wrong",
            status: 400
        })
    }
}




