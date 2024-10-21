const { sendResponse } = require("../../../functions/sendRes");
const { allorder, allreturnorder } = require("../../../Http/axios");
const Orders = require("../../../model/Orders");
const User = require("../../../model/User");



exports.AdminAddWallet = async (req, res) => {
    const orderid = req.params.id;
    try {
        await Orders.findById(orderid).then(async (itemsdata) => {
            await User.findById(itemsdata?.user_id).then(async (userdata) => {
                const totalwalt = userdata?.wallet?.amount + itemsdata?.amount;
                try {
                    await User.findByIdAndUpdate(
                        {
                            _id: userdata._id
                        },
                        {
                            $set: {
                                wallet: {
                                    currency: itemsdata?.currency,
                                    amount: totalwalt
                                }
                            }
                        })
                        .then(async () => {
                            await Orders.findByIdAndUpdate(
                                {
                                    _id: itemsdata?._id
                                },
                                {
                                    $set: {
                                        status: "return delivered"
                                    }
                                })
                                .then(() => {
                                    req.flash('message', "Add Amount into Wallet Successfully!");
                                    return res.redirect('back')
                                })
                                .catch((err) => {
                                    req.flash('error', err.message);
                                    return res.redirect('back')
                                })
                        })
                        .catch((err) => {
                            req.flash('error', err.message);
                            return res.redirect('back')
                        })

                } catch (error) {

                }
            }).catch((error) => {
                req.flash('error', error.message);
                return res.redirect('back')
            })
        }).catch((error) => {
            req.flash('error', error.message);
            return res.redirect('back')
        })
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('back')
    }
}


exports.AcceptWallet = async (req, res) => {
    try {

        const returnorder = await allreturnorder().then(async data => {
            const allreturn = data?.data?.data
            const sddata = allreturn.filter( (row) => row.status_code === 21).map(x => x.id)
            const orderdata = await Orders.find({ status: "return confirm" })
            let getdata = [];
            if (!sddata) {
                getdata = []
            } else {
                for (let x in sddata) {
                    const filterreturndata = orderdata.filter(item => item?.return?.returnOrder_id === sddata[x])
                    if (filterreturndata.length === 1) {
                        getdata.push(filterreturndata[0])
                    }
                }
            }
            res.render("AllOrders/AcceptWallet", {
                myorderdata: getdata,
                message: req.flash('message'),
                error: req.flash('error')
            })
        }).catch(error => {
            console.log("🚀 ~ file: WalletController.js:88 ~ returnorder ~ error:", error)
            res.status(400).json({
                message: "something went wrong"
            })
        })
    } catch (error) {
        console.log("🚀 ~ file: WalletController.js:93 ~ exports.AcceptWal ~ error:", error.message)
    }
}

// exports.AcceptWallet = async (req, res, next) => {
//     try {
//         const data = await allorder().then(async (data) => {
//             const orderdata = await data?.data?.data
//             const sd = orderdata.filter((row) => row.status_code === 21).map(x => x.id);
//             console.log("🚀 ~ file: WalletController.js:75 ~ data ~ sd:", sd)
//             const getdelivered = [];

//             // if (sd == "") {
//             //     res.render("AllOrders/AcceptWallet", {
//             //         myorderdata: [],
//             //         message: req.flash('message'),
//             //         error: req.flash('error')
//             //     })
//             // }
//             // else {
//             // await sd.forEach(async (element) => {
//             //     const shiporder = await Orders.findOne({ $and: [{ 'return.returnOrder_id': { $eq: element } }, { status: { $eq: "return confirm" } }] })
//             //         .then(async (results) => {
//             //             getdelivered.push(results)
//             //         }).catch((error) => {
//             //             res.redirect("back")
//             //         })
//             // })
//             // await sd.forEach(async (element) => {
//             //     const shiporder = await Orders.findOne({ $and: [{ 'return.returnOrder_id': { $eq: element } }, { status: { $eq: "return confirm" } }] })
//             //     getdelivered.push(shiporder)
//             // })
//             for (let i = 0; i < sd.length; i++) {
//                 await Orders.find({ $and: [{ 'return.returnOrder_id': { $in: sd[i] } }, { status: { $eq: "return confirm" } }] }).then(data => {
//                     console.log("🚀 ~ file: WalletController.js:100 ~ awaitOrders.find ~ data:", data)
//                     getdelivered.push(data)
//                 }).catch(error => {
//                 console.log("🚀 ~ file: WalletController.js:102 ~ awaitOrders.find ~ error:", error)
//                 })
//                 // getdelivered.push(shiporder)
//             }
//             console.log("🚀 ~ file: WalletController.js:99 ~ data ~ getdelivered:", getdelivered)
//             // if (getdelivered[0] === null) {
//             //     res.render("AllOrders/AcceptWallet", {
//             //         myorderdata: [],
//             //         message: req.flash('message'),
//             //         error: req.flash('error')
//             //     })
//             // } else {
//             //     res.render("AllOrders/AcceptWallet", {
//             //         myorderdata: getdelivered,
//             //         message: req.flash('message'),
//             //         error: req.flash('error')
//             //     })
//             // }
//         }).catch(error => {
//             res.redirect("/admin/ShpingLoginPage")
//         })

//     } catch (error) {
//         res.redirect("back")
//     }
// }
// exports.UpdatePaymentStatus = async (req, res) => {
//     const id = req.params.id;
//     const payment_status = req.params.payment_status;
//     if (!id || !payment_status) {
//         req.flash('error', 'Please Enter details');
//         return res.redirect('back')
//     }
//     try {
//         const data = await Orders.findByIdAndUpdate(
//             {
//                 _id: id
//             },
//             {
//                 $set: {
//                     payment_status: payment_status
//                 }
//             }
//         )
//             .then(() => {
//                 return res.redirect('/admin/AllOrders');
//             })
//             .catch((err) => {
//                 req.flash('error', err.message);
//                 return res.redirect('back')
//             })
//     } catch (error) {
//         sendResponse(res, 400, { message: error.message })

//     }
// }