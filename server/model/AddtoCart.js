const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddToCartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    item_id: {
        type: Schema.Types.ObjectId,
        ref: "item",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    sku_code:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const AddToCart = mongoose.model("addToCart", AddToCartSchema)

module.exports = AddToCart;