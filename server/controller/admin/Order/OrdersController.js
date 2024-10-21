const { sendResponse } = require("../../../functions/sendRes");
const { allorder, createorder } = require("../../../Http/axios");
const Orders = require("../../../model/Orders");
const User = require("../../../model/User");


exports.AllOrders = async (req, res) => {
    try {
        const results = await Orders.find({ isDeleted: false }).populate("user_id")
        res.render('AllOrders/AllOrders', { data: results, message: req.flash('message'), error: req.flash('error') });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.PendingOrders = async (req, res) => {
    try {
        const results = await Orders.find({ status: "pending" })
        res.render('PendingOrders/PendingOrders', { data: results, message: req.flash('message'), error: req.flash('error') });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.CancelledOrders = async (req, res) => {
    try {
        const status = ["Canceled", "cancel request"]
        // const results = await Orders.find({}).in(status).exec()
        const results = await Orders.find({
            "status": {
                "$in": [
                    "Canceled", "cancel request"
                ]
            }
        })
        res.render('CancelledOrders/CancelledOrders', { data: results, message: req.flash('message'), error: req.flash('error') });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.ConfirmOrders = async (req, res) => {
    try {
        const results = await Orders.find({ status: "confirm" })
        res.render('ConfirmOrders/ConfirmOrders', { data: results, message: req.flash('message'), error: req.flash('error') });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.UpdateOrderStatus = async (req, res) => {
    const id = req.params.id
    const status = req.params.status;
    if (!id || !status) {
        req.flash('error', 'Please Enter details');
        return res.redirect('back')
    }
    try {
        const data = await Orders.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    status: status
                }
            }
        )
            .then(() => {
                res.redirect("back")
            })
            .catch((err) => {
                sendResponse(res, 400, { message: err.message });
            })

    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.ViewOrders = async (req, res) => {
    const id = req.params.id
    const alldata = [];
    try {

        const vieworder = await Orders.findById(id)
        console.log("🚀 ~ file: OrdersController.js:92 ~ exports.ViewOrders= ~ vieworder", vieworder)
        res.render('AllOrders/ViewOrders', {
            data: vieworder, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message })
    }
}

exports.AdminConfirmCancel = async (req, res) => {
    const id = req.params.id;
    try {
        const userorderdata = await Orders.findById(id).populate('user_id')
        const data = await Orders.findByIdAndUpdate({ _id: id }, {
            $set: { status: "cancel confirm", isDeleted: true }
        })
            .then(async () => {
                if (userorderdata.payment_method === 'online') {
                    const totalamount = userorderdata?.amount + userorderdata?.user_id?.wallet?.amount;
                    const data = await User.findByIdAndUpdate(
                        {
                            _id: userorderdata?.user_id?._id
                        },
                        {
                            $set: {
                                wallet: {
                                    currency: userorderdata?.currency,
                                    amount: totalamount
                                }
                            }
                        }
                    )
                        .then(() => {
                            req.flash('message', "Order Cancel Successfully");
                            return res.redirect('back')
                        })
                        .catch((err) => {
                            req.flash('error', err.message);
                            return res.redirect('back')
                        })
                } else {
                    req.flash('message', "Order Cancel Successfully");
                    return res.redirect('back')
                }
            })
            .catch((err) => {
                sendResponse(res, 400, { message: err.message });
            })

    } catch (error) {
        sendResponse(res, 400, { message: error.message })
    }
}
// exports.AdminUpdateConfirmStatus = async (req, res) => {
//     const brand1 = JSON.parse(req.body.allcheckid);
//     try {
//         await brand1.forEach(async (element) => {
//             const data = await Orders.findByIdAndUpdate(
//                 {
//                     _id: element
//                 },
//                 {
//                     $set: {
//                         status: "confirm"
//                     }
//                 }
//             )
//                 .then(async () => {
//                     try {
//                         const results = await Orders.findById(element)
//                         if (results) {
//                             let getresult = '';
//                             let characters = '0123456789';
//                             const charactersLength = characters.length;
//                             for (var i = 0; i < 12; i++) {
//                                 getresult += characters.charAt(Math.floor(Math.random() * charactersLength));
//                             }
//                             const date = new Date();
//                             const orderlist = {
//                                 "order_id": getresult,
//                                 "order_date": date,
//                                 "pickup_location": "FAB",
//                                 "channel_id": "",
//                                 "comment": "Reseller: M/s Goku",
//                                 "billing_customer_name": results?.billing_customer_name,
//                                 "billing_last_name": results?.billing_last_name,
//                                 "billing_address": results?.billing_address,
//                                 "billing_address_2": results?.billing_address_2,
//                                 "billing_city": results?.billing_city,
//                                 "billing_pincode": results?.billing_pincode,
//                                 "billing_state": results?.billing_state,
//                                 "billing_country": results?.billing_country,
//                                 "billing_email": results.billing_email,
//                                 "billing_phone": results?.billing_phone,
//                                 "shipping_is_billing": Boolean(results?.shipping_is_billing),
//                                 "shipping_customer_name": results?.shipping_customer_name,
//                                 "shipping_last_name": results?.shipping_last_name,
//                                 "shipping_address": results?.shipping_address,
//                                 "shipping_address_2": results?.shipping_address_2,
//                                 "shipping_city": results?.shipping_city,
//                                 "shipping_pincode": results?.shipping_pincode === null ? "" : results?.shipping_pincode,
//                                 "shipping_country": results?.shipping_country,
//                                 "shipping_state": results?.shipping_state,
//                                 "shipping_email": results?.shipping_email,
//                                 "shipping_phone": results?.shipping_phone === null ? "" : results?.shipping_phone,
//                                 "order_items": results?.product_id,
//                                 "payment_method": "Prepaid",
//                                 "shipping_charges": 0,
//                                 "giftwrap_charges": 0,
//                                 "transaction_charges": 0,
//                                 "total_discount": 0,
//                                 "sub_total": 0,
//                                 "length": 10,
//                                 "breadth": 15,
//                                 "height": 20,
//                                 "weight": 2.5
//                             }
//                             const postdata = await createorder(orderlist).then(async (data) => {
//                                 console.log("🚀 ~ file: OrdersController.js:203 ~ postdata ~ data", data?.data)
//                                 const ship_orderid = await data?.data?.order_id;
//                                 const ship_shipment = await data?.data?.shipment_id;
//                                 if (ship_orderid && ship_shipment) {
//                                     const oredrupdate = await Orders.findByIdAndUpdate({ _id: element }, {
//                                         $set: {
//                                             ship_shipmentid: ship_shipment,
//                                             ship_orderid: ship_orderid
//                                         }
//                                     })
//                                         .then(() => {
//                                         })
//                                         .catch((err) => {
//                                             console.log("select products", err.message)
//                                         })
//                                 } else {
//                                     res.redirect("/admin/ShpingLoginPage")
//                                 }
//                             }).catch((error) => {
//                                 res.redirect("/admin/ShpingLoginPage")
//                             })

//                         } else {
//                             req.flash('error', "Select Products");
//                             return res.redirect('back')
//                         }
//                     } catch (error) {
//                         req.flash('error', error.message);
//                         return res.redirect('back')
//                     }
//                 })
//                 .catch((err) => {
//                     req.flash('error', err.message);
//                     return res.redirect('back')
//                 })
//         })
//         // return res.json({
//         //     brand: brand1
//         // });
//     } catch (error) {
//         sendResponse(res, 400, { message: error.message })

//     }
// }


exports.AdminUpdateConfirmStatus = async (req, res) => {
    const gettoken = process?.env?.SHIP_TOKEN
    const brand1 = JSON.parse(req.body.allcheckid);
    try {

        var success = [];

        await brand1.forEach(async (element) => {
            const results = await Orders.findById(element)
            if (results) {
                let getresult = '';
                let characters = '0123456789';
                const charactersLength = characters.length;
                for (var i = 0; i < 12; i++) {
                    getresult += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                const date = new Date();
                const orderlist = {
                    "order_id": getresult,
                    "order_date": date,
                    "pickup_location": "FAB",
                    "channel_id": "",
                    "comment": "Reseller: M/s Goku",
                    "billing_customer_name": results?.billing_customer_name,
                    "billing_last_name": results?.billing_last_name,
                    "billing_address": results?.billing_address,
                    "billing_address_2": results?.billing_address_2,
                    "billing_city": results?.billing_city,
                    "billing_pincode": results?.billing_pincode,
                    "billing_state": results?.billing_state,
                    "billing_country": results?.billing_country,
                    "billing_email": results.billing_email,
                    "billing_phone": results?.billing_phone,
                    "shipping_is_billing": Boolean(results?.shipping_is_billing),
                    "shipping_customer_name": results?.shipping_customer_name,
                    "shipping_last_name": results?.shipping_last_name,
                    "shipping_address": results?.shipping_address,
                    "shipping_address_2": results?.shipping_address_2,
                    "shipping_city": results?.shipping_city,
                    "shipping_pincode": results?.shipping_pincode === null ? "" : results?.shipping_pincode,
                    "shipping_country": results?.shipping_country,
                    "shipping_state": results?.shipping_state,
                    "shipping_email": results?.shipping_email,
                    "shipping_phone": results?.shipping_phone === null ? "" : results?.shipping_phone,
                    "order_items": results?.product_id,
                    "payment_method": "Prepaid",
                    "shipping_charges": 0,
                    "giftwrap_charges": 0,
                    "transaction_charges": 0,
                    "total_discount": 0,
                    "sub_total": 0,
                    "length": 10,
                    "breadth": 15,
                    "height": 20,
                    "weight": 2.5
                }

                const postdata = await createorder(orderlist).then(async (data) => {
                    console.log("🚀 ~ file: OrdersController.js:203 ~ postdata ~ data", data?.data)
                    const ship_orderid = await data?.data?.order_id;
                    const ship_shipment = await data?.data?.shipment_id;
                    if (ship_orderid && ship_shipment) {
                        const oredrupdate = await Orders.findByIdAndUpdate({ _id: element }, {
                            $set: {
                                status: "confirm",
                                ship_shipmentid: ship_shipment,
                                ship_orderid: ship_orderid
                            }
                        })
                            .then(async () => {
                                success.push(true)
                            })
                            .catch((err) => {
                                success.push(false)
                            })
                    }
                }).catch((error) => {
                    success.push(false)
                })

            }
        })
        if (success.some(x => x == true)) {
            
        } else {
            res.redirect("/admin/ShpingLoginPage")
        }
        return res.json({
            brand: brand1
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message })
    }
}



exports.DeleteOrderAction = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        req.flash('error', 'This Orders Is Not Available');
        return res.redirect('back')
    }
    try {
        const data = await Orders.findByIdAndUpdate(
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
                res.redirect("back")
            })
            .catch((err) => {
                sendResponse(res, 400, { message: err.message });
            })
    } catch (error) {
        sendResponse(res, 400, { message: error.message })

    }
}