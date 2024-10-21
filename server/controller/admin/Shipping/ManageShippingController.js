const { sendResponse } = require("../../../functions/sendRes");
const { allorder, Specificorder, trackingord, trackingordshipmentid, trackingordorderid, admincancelorder } = require("../../../Http/axios");


exports.AllOrderShow = async (req, res) => {
    try {
        const data = await allorder()
            const orderdata = await data.data.data
            res.render("ManageShipping/ManageShipping", {
                myorderdata: orderdata, message: req.flash('message'), error: req.flash('error')
        })
    } catch (error) {
        res.redirect("/admin/ShpingLoginPage")
        // console.log("🚀 ~ file: ManageShippingController.js:16 ~ exports.AllOrderShow= ~ error", error.message)
        // sendResponse(res, 400, { message: error.message });
    }
}

exports.SpecificOrder = async (req, res) => {
    const id = req.params.id
    try {
        const data = await Specificorder(id);
        const myorder = data.data.data
        res.render("ManageShipping/SpecificOrder", {
            myorderdata: myorder, message: req.flash('message'), error: req.flash('error')
        })
    } catch (error) {
        res.redirect("/admin/ShpingLoginPage")
        // sendResponse(res, 400, { message: error.message });
    }
}

exports.TrackingOrder = async (req, res) => {
    try {
        const data = await trackingord(awb);
        res.json(data.data.tracking_data)
    } catch (error) {
        // res.redirect("/admin/ShpingLoginPage")
        sendResponse(res, 400, { message: error.message });
    }
}

exports.TrackWithShipment = async (req, res) => {
    const shipment_id = req.params.id;
    try {
        const data = await trackingordshipmentid(shipment_id)
        res.json(data?.data)
        // res.json(data.data)
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.TrackWithOrdid = async (req, res) => {
    try {
        const data = await trackingordorderid(req.query)
        res.json(data.data[0])
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.ShippingReturn = async (req, res) => {
    try {
        const data = await allorder()
        const orderdata = await data.data.data
        res.render("ManageShipping/ReturnOrder", {
            myorderdata: orderdata, message: req.flash('message'), error: req.flash('error')
        })
    } catch (error) {
        res.redirect("/admin/ShpingLoginPage")
        // sendResponse(res, 400, { message: error.message });

    }
}

exports.ShippingCancel = async (req, res) => {
    try {
        const data = await allorder()
        const orderdata = await data.data.data
        res.render("ManageShipping/CancelOrder", {
            myorderdata: orderdata, message: req.flash('message'), error: req.flash('error')
        })
    } catch (error) {
        res.redirect("/admin/ShpingLoginPage")
        // sendResponse(res, 400, { message: error.message });
    }
}
exports.ShippingDelivered = async (req, res) => {
    try {
        const data = await allorder()
        const orderdata = await data.data.data
        res.render("ManageShipping/DeliveredOrder", {
            myorderdata: orderdata, message: req.flash('message'), error: req.flash('error')
        })
    } catch (error) {
        res.redirect("/admin/ShpingLoginPage")
        // sendResponse(res, 400, { message: error.message });

    }
}

exports.CancelShippingOrder = async (req, res) => {
    try {
        try {
            const data = await admincancelorder(req.params.id) // and ids: "order_id": 286539038,
            return res.send({ Success: 1, Message: "order cancel successfully", data: data.data });
        }
        catch (e) {
            res.json(e?.response?.data || e)
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
