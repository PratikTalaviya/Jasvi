const { sendResponse } = require("../../../functions/sendRes");
const { createorder, ReturnOrder } = require("../../../Http/axios");
const Orders = require("../../../model/Orders");
const Seller = require("../../../model/Seller");


// exports.ReturnOrders = async (req, res) => {
//     try {
//         const results = await Orders.find({ status: "return request" })
//         res.render('AllOrders/ReturnOrder', { data: results, message: req.flash('message'), error: req.flash('error') });
//     } catch (error) {
//         sendResponse(res, 400, { message: error.message });
//     }
// }
exports.ReturnOrders = async (req, res) => {
    try {
        const results = await Orders.find({ status: "return request" })
        res.render('AllOrders/ReturnOrder', { data: results, message: req.flash('message'), error: req.flash('error') });
    } catch (error) {
        // sendResponse(res, 400, { message: error.message })
        req.flash('error', error.message);
        return res.redirect('back')
    }
}



exports.UpdateReturnStatus = async (req, res) => {
    const orderid = req.params.id;
    const Sellerdata = await Seller.findOne()
    console.log("🚀 ~ file: ReturnOrdersController.js:31 ~ exports.UpdateReturnStatus= ~ Sellerdata:", Sellerdata)
    try {
        const orderdata = await Orders.findById(orderid).then((results) => {
            let getresult = '';
            let characters = '0123456789';
            const charactersLength = characters.length;
            for (var i = 0; i < 12; i++) {
                getresult += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            const date = new Date();
            // const orderlist = {
            //     "order_id": "r121579B09ap3o",
            //     "order_date": "2021-12-30",
            //     "channel_id": "27202",
            //     "pickup_customer_name": "iron man",
            //     "pickup_last_name": "",
            //     "company_name": "Shivanshfab",
            //     "pickup_address": "b 123",
            //     "pickup_address_2": "",
            //     "pickup_city": "Delhi",
            //     "pickup_state": "New Delhi",
            //     "pickup_country": "India",
            //     "pickup_pincode": 110030,
            //     "pickup_email": "deadpool@red.com",
            //     "pickup_phone": "9810363552",
            //     "pickup_isd_code": "91",
            //     "shipping_customer_name": "Jax",
            //     "shipping_last_name": "Doe",
            //     "shipping_address": "Castle",
            //     "shipping_address_2": "Bridge",
            //     "shipping_city": "ghaziabad",
            //     "shipping_country": "India",
            //     "shipping_pincode": 201005,
            //     "shipping_state": "Uttarpardesh",
            //     "shipping_email": "kumar.abhishek@shiprocket.com",
            //     "shipping_isd_code": "91",
            //     "shipping_phone": 8888888888,
            //     "order_items": [
            //         {
            //             "sku": "WSH234",
            //             "name": "shoes",
            //             "units": 2,
            //             "selling_price": 100,
            //             "discount": 0,
            //             "qc_enable": true,
            //             "hsn": "123",
            //             "brand": "",
            //             "qc_size": "43"
            //         }
            //     ],
            //     "payment_method": "PREPAID",
            //     "total_discount": "0",
            //     "sub_total": 400,
            //     "length": 11,
            //     "breadth": 11,
            //     "height": 11,
            //     "weight": 0.5
            // }

            const orderlist = {
                "order_id": results?.ship_orderid,
                "order_date": date,
                "channel_id": Sellerdata?.channelId,
                "pickup_customer_name": results?.billing_customer_name,
                "pickup_last_name": results?.billing_last_name,
                "company_name": "iorn pvt ltd",
                "pickup_address": results?.billing_address,
                "pickup_address_2": results?.billing_address_2,
                "pickup_city": results?.billing_city,
                "pickup_state": results?.billing_state,
                "pickup_country": results?.billing_country,
                "pickup_pincode": results?.billing_pincode,
                "pickup_email": results.billing_email,
                "pickup_phone": results?.billing_phone,
                "shipping_customer_name": Sellerdata?.Adminname,
                "shipping_last_name": Sellerdata?.AdminlastNname,
                "shipping_address": Sellerdata?.Adminaddress,
                "shipping_address_2": Sellerdata?.Adminaddress2,
                "shipping_city": Sellerdata?.AdminCity,
                "shipping_country": Sellerdata?.AdminCountry,
                "shipping_pincode": Sellerdata?.AdminPincode,
                "shipping_state": Sellerdata?.AdminState,
                "shipping_email": Sellerdata?.AdminEmail,
                "shipping_phone": Sellerdata?.Adminphone,
                "order_items": results?.returnproduct,
                "payment_method": "PREPAID",
                "total_discount": "0",
                "sub_total": 400,
                "length": 11,
                "breadth": 11,
                "height": 11,
                "weight": 0.5
            }
            try {
                const postdata = ReturnOrder(orderlist).then(async (data) => {
                    console.log("🚀 ~ file: ReturnOrdersController.js:91 ~ postdata ~ data", data?.data.order_id)
                    const ship_orderid = await data?.data.order_id;
                    const oredrupdate = await Orders.findByIdAndUpdate(
                        {
                            _id: element
                        },
                        {
                            $set: {
                                ship_orderid: ship_orderid,
                                status: 'return confirm'
                            }
                        })
                        .then(() => {
                            console.log("order update sucessfully")
                        })
                        .catch((err) => {
                            console.log("select products", err.message)
                        })
                }).catch((error) => {
                    console.log("🚀 ~ file: ReturnOrdersController.js:145 ~ postdata ~ error:", error.message)
                    if (error.message === "Request failed with status code 500") {
                        res.redirect("/admin/ShpingLoginPage")
                    }
                })
            } catch (error) {
                console.log("catch error", error.message)
                // if(error.message ==="Request failed with status code 500" ){
                //     console.log("true")
                // console.log("ship try catch error", error.message)
                // }
            }
        })

    } catch (error) {
        // sendResponse(res, 400, { message: error.message })
        req.flash('error', error.message);
        return res.redirect('back')
    }
}

exports.ReplaceOrders = async (req, res) => {
    let replace = req.params.replace;
    if (error) {
        req.flash('error', error.message);
        return res.redirect('back')
    }
    try {
        res.render('ReplaceOrders/ReplaceOrders', { data: results, message: req.flash('message'), error: req.flash('error') });

    } catch (error) {
        sendResponse(res, 400, { message: error.message })
    }
}