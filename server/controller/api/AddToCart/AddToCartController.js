const Item = require("../../../model/Item");
const AddtoCart = require("../../../model/AddtoCart");
const { sendResponse } = require("../../../functions/sendRes");
const Wishlists = require("../../../model/Wishlists");

exports.getAddToCart = async (req, res) => {
    try {
        let user_id = req.userData._id;

        const datas = await AddtoCart.find({ _id: user_id }).populate('user_id').populate('item_id');

        Object.keys(datas).forEach(function (key) {
            var row = datas[key];
            row.photo = "http://localhost:8080/assets/AddProductImage/Photos/" + row.photo
        });
        return res.send({
            Success: 1,
            Message: 'User Cart Products',
            UserCart: results
        });
        // res.status(200).json({
        //     Success: 1,
        //     message: "User Cart Products",
        //     status: 200,
        //     Total: datas.length,
        //     data: datas
        // })
    } catch (error) {
        sendResponse(res, 400, { message: error.message });

        // console.log("error:-", error);
        // res.status(500).json({
        //     message: "Something Went Wrong",
        //     status: 500
        // })
    }
}
exports.AddToCart = async (req, res) => {
    try {
        let item_id = req.body.item_id;
        let user_id = req.userData.user_id;

        const data = await AddtoCart.find({
            $and: [{ user_id: { $eq: user_id } }, { item_id: { $eq: item_id } }]
        });

        if (!data) {
            return res.send({
                Success: 0,
                Message: "Something Wrong"
            });
        } else {
            if (data.length <= 0) {
                let quantity = req.body.quantity;
                let size = req.body.size;
                let sku_code = req.body.sku_code;
                let color = req.body.color;

                const addToCartDetails = new AddtoCart({ item_id, user_id, quantity, size, sku_code, color })

                res.status(200).json({
                    Success: 1,
                    message: "Product Added Into Cart Successfully",
                    status: 200,
                    data: addToCartDetails
                })
            } else {
                return res.send({
                    Success: 0,
                    Message: 'OOPS!, Product Already Added Into Cart'
                });
            }
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.AddtoWishlist = async (req, res) => {
    try {
        let item_id = req.body.productid;
        let user_id = req.user._id;

        const data = await Wishlists.find({
            $and: [{ user_id: { $eq: user_id } }, { item_id: { $eq: item_id } }]
        });

        if (!data) {
            return res.send({
                Success: 0,
                Message: "Something Wrong"
            });
        } else {
            if (data.length <= 0) {
                const WishlistsDetails = new Wishlists({ item_id, user_id })
                const savedata = await WishlistsDetails.save();
                console.log("🚀 ~ file: AddToCartController.js:96 ~ exports.AddtoWishlist= ~ savedata", savedata)
                res.status(200).json({
                    Success: 1,
                    message: "Product Added Into Wishlist Successfully",
                    status: 200,
                    data: savedata
                })
            } else {
                return res.send({
                    Success: 0,
                    Message: 'OOPS!, Product Already Added Into Wishlist'
                });
            }
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.GetUserWishlist = async (req, res) => {
    try {
        let user_id = req?.user?._id;

        const datas = await Wishlists.find({ user_id: user_id }).populate('user_id').populate('item_id');
        Object.keys(datas).forEach(function (key) {
            var row = datas[key];
            console.log("🚀 ~ file: AddToCartController.js:123 ~ row", row?.item_id?.photo)
            row.item_id.photo = "http://localhost:8080/assets/AddProductImage/mainimages/" + row?.item_id?.photo
        });
        return res.send({
            Success: 1,
            Message: 'User Wishlist Products',
            UserWishlist: datas
        });
        // res.status(200).json({
        //     Success: 1,
        //     message: "User Wishlist Products",
        //     status: 200,
        //     Total: datas.length,
        //     data: datas
        // })
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
        // console.log("error:-", error);
        // res.status(500).json({
        //     message: "Something Went Wrong",
        //     status: 500
        // })
    }
}
exports.DeleteWishlistProducts = async (req, res) => {
    const { productid } = req.body
    try {
        let item_id = productid?._id;
        console.log("🚀 ~ file: AddToCartController.js:149 ~ exports.DeleteWishlistProducts ~ item_id", item_id)
        let user_id = req.user._id;
        const data = await Wishlists.findOne({
            $and: [{ user_id: { $eq: user_id } }, { item_id: { $eq: item_id } }]
        })
        console.log("🚀 ~ file: AddToCartController.js:153 ~ exports.DeleteWishlistProducts ~ data", data._id)
        if (!data) {
            res.send({
                Success: 0,
                Message: "Something Wrong",
            });
        } else {
            const del = Wishlists.findByIdAndDelete(data._id);
            del.exec(function (err, data) {
                if (err) throw err;
                res.send({
                    Success: 1,
                    Message: 'Delete Products from Wishlist Successfully',
                    // itemid: item_id
                });
            });
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}


exports.DeleteCartProducts = async (req, res) => {
    try {
        let id = req.params._id;
        let item_id = req.body.item_id;
        let user_id = req.userData.user_id;
        const data = await AddtoCart.find({
            $and: [{ user_id: { $eq: user_id } }, { item_id: { $eq: item_id } }]
        })
        if (!data || !id) {
            res.send({
                Success: 0,
                Message: "Something Wrong",
            });
        } else {
            const del = AddtoCart.findByIdAndDelete(id);
            del.exec(function (err, data) {
                if (err) throw err;
                res.send({
                    Success: 1,
                    Message: 'Delete Products from Cart Successfully',
                    itemid: item_id
                });
            });
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

