const { raw } = require("body-parser");
const { sendResponse } = require("../../../functions/sendRes");
const { trackingordshipmentid, Specificorder } = require("../../../Http/axios");
const DiscountCoupen = require("../../../model/DiscountCoupen");
const Galleries = require("../../../model/Galleries");
const Item = require("../../../model/Item");
const Orders = require("../../../model/Orders");
const Payment = require("../../../model/Payment");
const ProductReviews = require("../../../model/ProductReviews");
const User = require("../../../model/User");



exports.GetProductsList = async (req, res) => {
    try {
        const data = await Item.find({ status: 1 });

        Object.keys(data).forEach(function (key) {
            var row = data[key];
            row.photo = "http://localhost:8080/assets/AddProductImage/Photos/" + row.photo
        });

        return res.json({
            Success: 1,
            Message: 'Products List',
            ProductsList: data
        });
    } catch (error) {
        console.log("error:-", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
}
exports.GetProductDetails = async (req, res) => {
    try {
        const id = req?.body?.productid;
        const data = await Item.findById({ _id: id });

        Object.keys(data).forEach(function (key) {
            var row = data[key];
            row.photo = "http://localhost:8080/assets/AddProductImage/Photos/" + row.photo
        });
        return res.json({
            Success: 1,
            Message: 'Products Details',
            ProductsDetails: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
}

exports.Alleriesdata = async (req, res) => {
    try {
        const results = await Galleries.find({})
        if (results) {
            Object.keys(results).forEach(function (key) {
                var row = results[key];
                const multipledata = row.photo
                let imagdata = []
                row.coverphoto = "http://localhost:8080/assets/AddProductImage/Gallery/" + row.coverphoto
                multipledata.forEach(async element => {
                    imagdata.push("http://localhost:8080/assets/AddProductImage/Gallery/" + element)
                });
                row.photo = imagdata
            });
            return res.json({
                Success: 1,
                Message: 'Galleries',
                SearchProduct: results
            });
        } else {
            sendResponse(res, 400, { message: error.message });
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.filtercolorproduct = async (req, res) => {
    const { color, subcategory } = req.body
    try {
        const productdata = await Item.find({})
        const data = await Galleries.find({ color: color })
        const array = [];
        for (let i = 0; i < data.length; i++) {
            const productdatas = await Item.findOne({ _id: data[i]?.item_id, subcategory_id: subcategory })
            if (productdatas) {
                array.push(productdatas)
            }
        }
        Object.keys(array).forEach(function (key) {
            var row = array[key];
            row.photo = "http://localhost:8080/assets/AddProductImage/Photos/" + row.photo
        });
        return res.json({
            Success: 1,
            Message: 'Galleries',
            colorProduct: array
        });


        // res.json(array)

    } catch (error) {
        sendResponse(res, 400, { message: error.message, Success: 0 });
    }
}


exports.Galleries = async (req, res) => {
    const item_id = req.body.item_id
    try {
        const results = await Galleries.find({ item_id: item_id })
        if (results) {
            Object.keys(results).forEach(function (key) {
                var row = results[key];
                const multipledata = row.photo
                let imagdata = []
                row.coverphoto = "http://localhost:8080/assets/AddProductImage/Gallery/" + row.coverphoto
                multipledata.forEach(async element => {
                    imagdata.push("http://localhost:8080/assets/AddProductImage/Gallery/" + element)
                });
                row.photo = imagdata
            });
            return res.json({
                Success: 1,
                Message: 'Galleries',
                SearchProduct: results
            });
        } else {
            sendResponse(res, 400, { message: error.message });
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.gallaryimgcolor = async (req, res) => {
    const { productid, color } = req.body
    if (!productid || !color) {
        return res.json({
            Success: 0,
            Message: "Something went to wrong",
        });
    }
    try {
        const results = await Galleries.find({ $and: [{ item_id: { $eq: productid } }, { color: { $eq: color } }] })
        if (results) {
            Object.keys(results).forEach(function (key) {
                var row = results[key];
                const multipledata = row.photo
                let imagdata = []
                multipledata.forEach(async element => {
                    imagdata.push("http://localhost:8080/assets/AddProductImage/Gallery/" + element)
                });
                row.photo = imagdata
            });
        }
        return res.json({
            Success: 1,
            Message: 'Galleries',
            SearchProduct: results
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.ProductDiscountCoupen = async (req, res) => {
    try {
        const results = await DiscountCoupen.find({ status: 1 })
        return res.json({
            Success: 1,
            Message: 'Discount Coupen List',
            DiscountCoupen: results
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.AddProductReview = async (req, res) => {
    const { item_id, subject, review, rating } = req.body;
    const user_id = req.user
    try {
        const exist = await ProductReviews.exists({ item_id, user_id })
        if (!exist) {
            const daata = new ProductReviews({ user_id, item_id, subject, review, rating })
            const savedata = await daata.save()
            if (savedata) {
                res.json({
                    Success: 1,
                    Message: 'Your Review Submit Successfully!'
                });
            } else {
                res.json({
                    Success: 0,
                    Message: "Something Wrong"
                });
            }
        } else {
            sendResponse(res, 201, { Success: 0, message: "Already Submit your Review" });
        }
        
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.GetProductReviewCount = async (req, res) => {
    const { item_id } = req.body;
    try {
        const datas = await ProductReviews.find({ $and: [{ item_id: { $eq: item_id } }, { status: { $eq: 1 } }] })

        return res.json({
            Success: 1,
            Message: 'Count Product Reviews',
            CountReviews: datas
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.AddUserOrder = async (req, res) => {
    const user_id = req.user._id;
    const { is_coupen, is_wallet, shipping_is_billing, shipping_customer_name, shipping_last_name, shipping_address, shipping_address_2, shipping_city, shipping_pincode, shipping_country, shipping_state, shipping_email, shipping_phone, billing_customer_name, billing_last_name, billing_address, billing_address_2, billing_city, billing_pincode, billing_state, billing_country, billing_email, billing_phone, payment_method, amount, productid, payment_id, currency, customStaching, productspecification } = req.body
    const date = new Date()

    try {
        if (is_coupen === 1) {
            const loginuser = await User.findByIdAndUpdate({ _id: user_id }, {
                $set: {
                    coupen_expire: "expired"
                }
                    .then((data) => {
                        return res.json({ Success: 1, Message: "Coupen Expired successfully" });
                    }).catch((error) => {
                        return res.json({ Success: 0, Message: "Something Wrong" });
                    })
            })
        }
        if (is_wallet === true) {
            const userdata = await User.findById(user_id)
            if (userdata) {
                const changewallet = userdata?.wallet?.amount - amount;
                const updatewallet = await User.findByIdAndUpdate({ _id: user_id }, {
                    $set: { wallet: { amount: changewallet < 0 ? 0 : changewallet, currency: currency } }
                }).then(() => {
                    console.log("Changle wallet amount ")
                }).catch((error) => {
                    console.log("update error", error.message)
                    return res.json({ Success: 0, Message: "Something Wrong" });
                })
            }
        }
        try {
            if (shipping_is_billing === false) {
                const insertorder = new Orders({ user_id, shipping_is_billing: false, shipping_customer_name, shipping_last_name, shipping_address, shipping_address_2, shipping_city, shipping_pincode, shipping_country, shipping_state, shipping_email, shipping_phone, billing_customer_name, billing_last_name, billing_address, billing_address_2, billing_city, billing_pincode, billing_state, billing_country, billing_email, billing_phone, status: "pending", product_id: productid, payment_method, amount, payment_id, date, currency, customStaching, productspecification })
                const savedata = await insertorder.save();
                sendResponse(res, 200, { Success: 1, message: "Add Order Successfully!", orderdetails: savedata });
            } else {
                const insertorder = new Orders({ user_id, shipping_is_billing: true, shipping_customer_name: "", shipping_last_name: "", shipping_address: "", shipping_address_2: "", shipping_city: "", shipping_pincode: "", shipping_country: "", shipping_state: "", shipping_email: "", shipping_phone: "", billing_customer_name, billing_last_name, billing_address, billing_address_2, billing_city, billing_pincode, billing_state, billing_country, billing_email, billing_phone, status: "pending", product_id: productid, payment_method, amount, payment_id, date, currency, customStaching, productspecification })
                const savedata = await insertorder.save();
                sendResponse(res, 200, { Success: 1, message: "Add Order Successfully!", orderdetails: savedata });
            }
        } catch (error) {
            res.status(400).json({ message: error.message, Success: 0 })
        }
    } catch (error) {
        res.status(400).json({ message: error.message, Success: 0 })
    }
}
exports.CancelUserOrder = async (req, res) => {
    const { orderid } = req.body;
    try {
        const orderdata = await Orders.findById(orderid)
        if (!orderdata) {
            return res.json({
                Success: 0,
                Message: 'OOPS! Order not Cancelled'
            });
        } else {
            if (orderdata.status === 'pending') {
                const updateorder = await Orders.findByIdAndUpdate({
                    _id: orderid
                }, {
                    $set: {
                        status: 'cancel request'
                    }
                }).then(() => {
                    return res.json({
                        Success: 1,
                        Message: 'Send Cancel Order Request Successfully!'
                    });
                }).catch((error) => {
                    return res.json({
                        Success: 0,
                        Message: 'OOPS! Order not Cancelled'
                    });
                })
            } else {
                return res.json({
                    Success: 0,
                    Message: 'OOPS! Order not Cancelled'
                });
            }
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.GetUserOrderList = async (req, res) => {
    const user_id = req.user;
    try {
        const orderdata = await Orders.find({})
        // const orderdata = await Orders.find({
        //     $and: [{ user_id: { $eq: user_id?._id } } || { status: { $eq: 'confirm' } } || { status: { $eq: 'pending' } } || { status: { $eq: 'replace' } } || { status: { $eq: 'delivered' } } || { status: { $eq: 'return request' } } || { status: { $eq: 'return confirm' } }]
        // })
        return res.json({
            Success: 1,
            Message: 'User Order',
            UserOrderlist: orderdata
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.ReturnOrderRequest = async (req, res) => {
    const { orderid, checked } = req.body
    const userorder = await Orders.findById(orderid)
    try {
        const data = await Specificorder(userorder.ship_orderid);
        const myorder = await data?.data?.data;
        console.log("🚀 ~ file: ProductController.js:339 ~ exports.ReturnOrderRequest= ~ myorder", myorder?.status_code)
        if (myorder.status_code === 7) {
            const updateorder = await Orders.findByIdAndUpdate({
                _id: orderid._id
            }, {
                $set: {
                    status: 'return request',
                    returnproduct: checked
                },
            }).then(async () => {
                return res.json({
                    Success: 1,
                    Message: 'Send Return Order Request Successfully!'
                });
            }).catch((error) => {
                return res.json({
                    Success: 0,
                    Message: 'OOPS! Order not Cancelled'
                });
            })
        } else {
            return res.json({
                Success: 0,
                Message: "Your Order is Not Able to Return!"
            });
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.GetUserPayment = async (req, res) => {
    try {
        let user_id = req.userData._id;
        const data = await Payment.find({ _id: user_id });
        res.status(200).json({
            message: "Update Successfully",
            status: 200,
            Success: 1,
            UsersPaymentList: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Update Not Successfully",
            status: 500,
            Success: 0
        })
    }
}
exports.updateDeliveredOrder = async (req, res) => {
    try {
        const DeliveredOrderid = req.params.id;

        const updateUserData = Orders.findByIdAndUpdate(
            { _id: DeliveredOrderid },
            {
                $set: { status: 'Delivered' }
            }).
            then(() => {
                res.status(200).json({
                    message: "Update Delivered Order Successfully!",
                    status: 200,
                    Success: 1
                })
            }).catch((error) => {
                sendResponse(res, 400, { message: error.message });
            });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.specificorder = async (req, res) => {
    const { shipId } = req.body
    try {
        const data = await Specificorder(shipId)
        const ordersdata = data?.data?.myorder?.status_code
        return res.json({ Success: 1, myorder: data.data.data });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.trackorders = async (req, res) => {
    const { ship_orderid } = req.body
    try {
        await trackingordshipmentid(ship_orderid).then((data) => {
            res.status(200).json({
                message: "order track now!",
                status: 200,
                Success: 1,
                orderdata: data?.data
            })
        }).catch(error => {
            sendResponse(res, 400, { message: error.message, Success: 0 });
        })
    } catch (error) {
        sendResponse(res, 400, { message: error.message, Success: 0 });
    }
}

exports.rutuenordersspecific = async (req, res) => {
    const { id } = req.body
    try {
        const data = await Orders.findById(id)
        sendResponse(res, 200, { message: "orde Details", Success: 1, ordesdata: data });
    } catch (error) {
        sendResponse(res, 400, { message: error.message, Success: 0 });
    }
}


exports.searchproduct = async (req, res) => {
    const keyword = req?.query?.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {}

    try {
        const product = await Item.find(keyword)
        res.status(200).json(product)
    } catch (error) {
        console.log("🚀 ~ file: userController.js:75 ~ searchuser ~ error:", error.message)
        res.status(400).json({ Success: 0, message: "Something went wrong" })
    }
}



